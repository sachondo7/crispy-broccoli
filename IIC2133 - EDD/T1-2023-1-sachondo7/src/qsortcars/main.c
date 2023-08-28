#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "participant.h"

/* Retorna true si ambos strings son iguales */
bool string_equals(char* string1, char* string2) {
  return !strcmp(string1, string2);
}

/* Revisa que los parametros del programa sean válidos */
bool check_arguments(int argc, char** argv) {
  if (argc != 3) {
    printf("Modo de uso: %s INPUT OUTPUT\n", argv[0]);
    printf("Donde:\n");
    printf("\tINPUT es la ruta del archivo de input\n");
    printf("\tOUTPUT es la ruta del archivo de output\n");
    exit(1);
  }

  return true;
}


int main(int argc, char** argv) {
  check_arguments(argc, argv);
  FILE* input_file = fopen(argv[1], "r");
  FILE* output_file = fopen(argv[2], "w");
  int N, contador = 0;
  fscanf(input_file, "%d", &N);
  //Crearemos un array que almacene a los participantes (la cantidad es fija)
  Participant* PARTICIPANTES[N];
  float id, model, average_lap_time, victory_count;
  for (int i = 0; i < N; i++) {
    fscanf(input_file, "%f %f %f %f", &id, &model, &average_lap_time, &victory_count);
    //Llamamos a la función para inicializar cada candidato 
    PARTICIPANTES[i] = participant_init(id, model, average_lap_time, victory_count);
  }
  
  quickSort(PARTICIPANTES, 0, (N-1), output_file, 0);

  //Llamamos a la función que necesitamos para ir encontrando los duplicados
  int matriz_repetidos[2] = {0,0}; //Matriz que almacena los participantes repetidos
  int menor_busqueda = 0;
  //Hacemos quickSort para cada grupo de victorias repetidas
  while (menor_busqueda < N)
  {
    //Ponemos en la columna de matriz repetido el primer indice
    matriz_repetidos[0] = menor_busqueda;
    //buscamos el ultimo indice repetido
    int indice_ultimo_repetido = find_repeated(PARTICIPANTES, menor_busqueda, N, 0);
    //Ponemos en la columna de matriz repetido el ultimo indice repetido
    matriz_repetidos[1] = indice_ultimo_repetido;
    //actualizamos menor indice de busqueda
    quickSort(PARTICIPANTES, matriz_repetidos[0], matriz_repetidos[1], output_file, 1);
    menor_busqueda = indice_ultimo_repetido + 1;
  }

  //Repetimos para el segundo orden de tiempo de vuelta
  matriz_repetidos[0] = 0;
  matriz_repetidos[1] = 0;
  menor_busqueda = 0;
  while (menor_busqueda < N)
  {
    //Ponemos en la columna de matriz repetido el primer indice
    matriz_repetidos[0] = menor_busqueda;
    //buscamos el ultimo indice repetido
    int indice_ultimo_repetido = find_repeated(PARTICIPANTES, menor_busqueda, N, 1);
    //Ponemos en la columna de matriz repetido el ultimo indice repetido
    matriz_repetidos[1] = indice_ultimo_repetido;
    //actualizamos menor indice de busqueda
    quickSort(PARTICIPANTES, matriz_repetidos[0], matriz_repetidos[1], output_file, 2);
    menor_busqueda = indice_ultimo_repetido + 1;
  }

  //Y finalmente para el tercer orden de modelo
  matriz_repetidos[0] = 0;
  matriz_repetidos[1] = 0;
  menor_busqueda = 0;
  while (menor_busqueda < N)
  {
    //Ponemos en la columna de matriz repetido el primer indice
    matriz_repetidos[0] = menor_busqueda;
    //buscamos el ultimo indice repetido
    int indice_ultimo_repetido = find_repeated(PARTICIPANTES, menor_busqueda, N, 2);
    //Ponemos en la columna de matriz repetido el ultimo indice repetido
    matriz_repetidos[1] = indice_ultimo_repetido;
    //actualizamos menor indice de busqueda
    quickSort(PARTICIPANTES, matriz_repetidos[0], matriz_repetidos[1], output_file, 3);
    menor_busqueda = indice_ultimo_repetido + 1;
  }
  

  //fprintf(output_file, "DESPUES DEL SEGUNDO ORDEN: \n");
  for (int i = 0; i < N; i++)
  {
    fprintf(output_file, "%.1f %.4f %.1f %.1f\n", PARTICIPANTES[i]->participant_id, PARTICIPANTES[i]->participant_model, PARTICIPANTES[i]->average_lap_time, PARTICIPANTES[i]->victory_count);
  }
  
  fclose(input_file);
  fclose(output_file);

  //Liberamos memoria 
  for (int i = 0; i < N; i++)
  {
    free(PARTICIPANTES[i]);
  }
  return 0;
  }