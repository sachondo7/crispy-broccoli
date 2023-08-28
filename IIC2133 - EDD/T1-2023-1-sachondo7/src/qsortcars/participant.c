#include "participant.h"

//Función para inicializar un candidato
Participant* participant_init(float participant_ID, float participant_MODEL, float average_lap_TIME, float victory_COUNT){
    Participant* participant = malloc(sizeof(Participant));
    *participant = (Participant){
        .participant_id = participant_ID,
        .participant_model = participant_MODEL,
        .average_lap_time = average_lap_TIME,
        .victory_count = victory_COUNT
    };
    return participant;
}

void quickSort(Participant *arreglo[], int low, int high, FILE* output_file, int parametro){
  if (low < high)
  {
    if (parametro == 0)
    {
      int indice_partition = partition_victory(arreglo,low, high, output_file);
      quickSort(arreglo, low, indice_partition - 1, output_file, 0);
      quickSort(arreglo, indice_partition, high, output_file, 0);
    }
    else if (parametro == 1)
    {
      int indice_partition = partition_lap(arreglo,low, high, output_file);
      quickSort(arreglo, low, indice_partition - 1, output_file, 1);
      quickSort(arreglo, indice_partition, high, output_file, 1);
    }
    else if (parametro == 2)
    {
      int indice_partition = partition_model(arreglo,low, high, output_file);
      quickSort(arreglo, low, indice_partition - 1, output_file, 2);
      quickSort(arreglo, indice_partition, high, output_file, 2);
    }
    else if (parametro == 3)
    {
      int indice_partition = partition_id(arreglo,low, high, output_file);
      quickSort(arreglo, low, indice_partition - 1, output_file, 3);
      quickSort(arreglo, indice_partition, high, output_file, 3);
    }
  }
  return;
}

int partition_victory(Participant *arreglo_partition[],int low, int high, FILE* output_file){
  float pivote = arreglo_partition[high]->victory_count;
  int i = (low-1);
  for (int j = low; j < high; j++)
  {
    if (arreglo_partition[j]->victory_count >= pivote)
    {
      i ++;
      swap(arreglo_partition, i, j);
    }
  }
  swap(arreglo_partition, (i+1) , high);
  return (i+1);
}

int partition_lap(Participant *arreglo_partition[],int low, int high, FILE* output_file){
  float pivote = arreglo_partition[high]->average_lap_time;
  int i = (low-1);
  for (int j = low; j < high; j++)
  {
    if (arreglo_partition[j]->average_lap_time <= pivote)
    {
      i ++;
      swap(arreglo_partition, i, j);
    }
  }
  swap(arreglo_partition, (i+1) , high);
  return (i+1);
}

int partition_model(Participant *arreglo_partition[],int low, int high, FILE* output_file){
  float pivote = arreglo_partition[high]->participant_model;
  int i = (low-1);
  for (int j = low; j < high; j++)
  {
    if (arreglo_partition[j]->participant_model <= pivote)
    {
      i ++;
      swap(arreglo_partition, i, j);
    }
  }
  swap(arreglo_partition, (i+1) , high);
  return (i+1);
}

int partition_id(Participant *arreglo_partition[],int low, int high, FILE* output_file){
  float pivote = arreglo_partition[high]->participant_id;
  int i = (low-1);
  for (int j = low; j < high; j++)
  {
    if (arreglo_partition[j]->participant_id <= pivote)
    {
      i ++;
      swap(arreglo_partition, i, j);
    }
  }
  swap(arreglo_partition, (i+1) , high);
  return (i+1);
}

void swap(Participant** participantes, int index1, int index2){
    Participant *temp = participantes[index1];
    participantes[index1] = participantes[index2];
    participantes[index2] = temp;
}

//Función que me retorna un array desde el indice menor repetido hasta el mayor repetido
int find_repeated(Participant* arreglo[], int low, int high, int criterio){
  int i = low;
  int j = low;
  int repeated[2] = {i,0};
  bool termino = false;
  while (!termino)
  {
    if (criterio == 0)
    {
      if (arreglo[i]->victory_count == arreglo[j]->victory_count)
      {
        repeated[1] = j;
        j++;
      }
      else
      {
        termino = true;
      }
    }
    else if (criterio == 1)
    {
      if (arreglo[i]->average_lap_time == arreglo[j]->average_lap_time)
      {
        repeated[1] = j;
        j++;
      }
      else
      {
        termino = true;
      }
    }
    else if (criterio == 2)
    {
      if (arreglo[i]->participant_model == arreglo[j]->participant_model)
      {
        repeated[1] = j;
        j++;
      }
      else
      {
        termino = true;
      }
    }
    else if (criterio == 3)
    {
      if (arreglo[i]->participant_id == arreglo[j]->participant_id)
      {
        repeated[1] = j;
        j++;
      }
      else
      {
        termino = true;
      }
    }
  }
  return repeated[1];
}