#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include "candidato.h"
#include "voter.h"


/* Retorna true si ambos strings son iguales */
bool string_equals(char *string1, char *string2) {
  return !strcmp(string1, string2);
}

/* Revisa que los parametros del programa sean válidos */
bool check_arguments(int argc, char **argv) {
  if (argc != 3) {
    printf("Modo de uso: %s INPUT OUTPUT\n", argv[0]);
    printf("Donde:\n");
    printf("\tINPUT es la ruta del archivo de input\n");
    printf("\tOUTPUT es la ruta del archivo de output\n");
    return false;
  }
  return true;
}

int main(int argc, char **argv) {
  /* Si los parámetros del programa son inválidos */
  if (!check_arguments(argc, argv)) {
    /* Salimos del programa indicando que no terminó correctamente */
    return 1;
  }

  /* Abrimos el archivo de input */
  FILE* input_file = fopen(argv[1], "r"); //Puntero que señala al archivo de input
  /* Abrimos el archivo de output */
  FILE* output_file = fopen(argv[2], "w"); //Puntero que señala al archivo de input

  /* Leemos la cantidad de candidatos y de eventos */
  int N_CANDIDATES;
  int N_EVENTS;
  int i;
  fscanf(input_file, "%d", &N_CANDIDATES);
  /*  [Por implementar] Debes crear una estructura para almacenar los candidatos */
  //Crearemos un array que almacene a los candidatos (la cantidad es fija)
  Candidato* CANDIDATOS[N_CANDIDATES];
  
  fscanf(input_file, "%d", &N_EVENTS);
  
  /* String para guardar la instrucción actual*/
  char command[32];
  //Inicializamos cada candidato
  for (i = 0; i < N_CANDIDATES ; i++)
  {
    Candidato* candidato = candidato_init(i);
    CANDIDATOS[i] = candidato;
  }
  
  for (int event = 0; event < N_EVENTS; event++) {
    /* Leemos el evento */
    fscanf(input_file, "%s", command);

    if (string_equals(command, "REGISTRAR-VOTO")) {
      int voter_ID, candidate_ID;
      fscanf(input_file, "%d %d", &voter_ID, &candidate_ID);
      //Inicializamos el voter
      Voter* voter = voter_init(voter_ID);
      //Inicializamos el voto al candidato deseado 
      Candidate_votes* voto = candidate_votes_init(candidate_ID, voter);
      //Agregamos el voto al candidato
      candidate_add_voter(CANDIDATOS[candidate_ID], voto);
      vote_added(voter, output_file);
    }
    
    else if (string_equals(command, "CONTEO-PARCIAL")) {
      int totalvotos= 0;
      fprintf(output_file, "CONTEO-PARCIAL\n");
      for (i = 0; i < N_CANDIDATES; i++)
      {
        fprintf(output_file, "\tCANDIDATE %d\n", i);
        if (CANDIDATOS[i]-> num_votos == 0){
          fprintf(output_file, "\t\tNO HAY VOTOS REGISTRADOS\n");
        }
        else
        {
          Candidate_votes* voto_actual = CANDIDATOS[i]->inicio;
          for (int j = 0 ; j < CANDIDATOS[i]->num_votos; j ++) 
          {
            if (j == 0)
            {
              fprintf(output_file, "\t\tVOTE %d\n", CANDIDATOS[i]->inicio->voter->voter_ID);
            }
            else if (CANDIDATOS[i]->inicio->next != NULL)
            {
              voto_actual = voto_actual->next;
              fprintf(output_file, "\t\tVOTE %d\n", voto_actual->voter->voter_ID);  
            } 
            totalvotos += 1;
          }
          
        }
      }
      fprintf(output_file, "TOTAL PARCIAL DE VOTOS: %d\n", totalvotos);
    }
          
    else if (string_equals(command, "CONTEO-TOTAL")) {
      /* [Por implementar] */
      fprintf(output_file, "CONTEO-TOTAL\n");
      int votos = 0, totalvotos = 0; 
      for (i = 0; i < N_CANDIDATES ; i++)
      {
        votos = CANDIDATOS[i]-> num_votos;
        fprintf(output_file, "\tCANDIDATO %d: %d\n", i, votos);
        totalvotos += votos;
      }
      fprintf(output_file, "TOTAL VOTOS: %d\n", totalvotos);
      
    }

    else if (string_equals(command, "CONTEO-RANGO")) {
      int min_votes, max_votes;
      int total = 0; 
      fscanf(input_file, "%d %d", &min_votes, &max_votes);
      fprintf(output_file, "CONTEO-RANGO %d %d\n", min_votes, max_votes);
      /* [Por implementar] */
      for (i = 0; i < N_CANDIDATES; i++)
      {
        if (CANDIDATOS[i]->num_votos <= max_votes && CANDIDATOS[i]->num_votos >=min_votes)
        {
          fprintf(output_file, "CANDIDATO %d: %d\n", i, CANDIDATOS[i]->num_votos);
          total += CANDIDATOS[i]->num_votos;
        }
      }
      fprintf(output_file, "TOTAL DE VOTOS RANGO: %d\n", total);
    }

    else if (string_equals(command, "ORDENAR-CANDIDATOS")) {
      Candidato* swap;
      int total = 0, position = 0;
      for (int step = 1; step < N_CANDIDATES; step++)
      {
        Candidato* key = CANDIDATOS[step];
        int j = step - 1; 
        while (key->num_votos > CANDIDATOS[j]->num_votos && j>=0)
        {
          CANDIDATOS[j+1] = CANDIDATOS[j];
          j--;
        }
        CANDIDATOS[j+1] = key;
      }
      fprintf(output_file, "CANDIDATOS-ORDENADOS\n");
      for (i = 0 ; i < N_CANDIDATES ; i++)
      {
        fprintf(output_file, "\tCANDIDATO %d: %d\n", CANDIDATOS[i]->candidate_ID, CANDIDATOS[i]->num_votos);
        total += CANDIDATOS[i]->num_votos;
      }
      fprintf(output_file, "TOTAL DE VOTOS: %d\n", total);
      //Ahora volvemos a ordenar a los candidatos según su numero de ID pa que no se chingue
      for (i = 0; i < (N_CANDIDATES - 1) ; i++)
      {
        position = i;
        for (int j = (i + 1); j < N_CANDIDATES; j++)
        {
          if (CANDIDATOS[position]->candidate_ID > CANDIDATOS[j]->candidate_ID)
          {
            position = j;
          }
        }
        if (position != i)
        {
          swap = CANDIDATOS[i];
          CANDIDATOS[i] = CANDIDATOS[position];
          CANDIDATOS[position] = swap;
        } 
      }
    }

    else if (string_equals(command, "ANULAR-VOTO")) {
      int voter_ID, candidate_ID;
      bool borro = false;
      fscanf(input_file, "%d %d", &voter_ID, &candidate_ID);
      /* [Por implementar] */
      Candidato* candidato = CANDIDATOS[candidate_ID];
      Candidate_votes* voto_iterando = CANDIDATOS[candidate_ID]->inicio;
      if (voto_iterando->voter->voter_ID == voter_ID)
      {
        candidate_remove_voter(candidato, voto_iterando, voto_iterando);
        fprintf(output_file, "VOTO ELIMINADO CORRECTAMENTE\n");
        borro = true;
      }
      else{
      while (voto_iterando -> next != NULL)
      {
        Candidate_votes* voto_siguiente = voto_iterando->next;
        if (voto_siguiente->voter->voter_ID == voter_ID)
        {
          candidate_remove_voter(candidato, voto_siguiente, voto_iterando);
          fprintf(output_file, "VOTO ELIMINADO CORRECTAMENTE\n");
          borro = true;
          break;
        }
        else{
          voto_iterando = voto_iterando->next;
        }
      }
      }
      if (borro == false)
      {
        fprintf(output_file, "NO SE ENCONTRO UN VOTO VALIDO CON ID %d\n", voter_ID);
      }
      
    }

    else if (string_equals(command, "ELIMINAR-CANDIDATO")) {
      int min = 7000; 
      int dis1, dis2, min_dis = 7000, id_borrado, id_beneficiado;
      int cant_votos; 
      //Encontramos al candidato con menos votos
      for (i = 0; i < N_CANDIDATES; i++)
      {
        if (CANDIDATOS[i]->num_votos < min && CANDIDATOS[i]->active == true && CANDIDATOS[i]->winner == false)
        {
          min = CANDIDATOS[i]->num_votos;
        }
      }
      //Eliminamos al candidato seteando que sea true
      for (i = 0; i < N_CANDIDATES; i++)
      {
        if (CANDIDATOS[i]->num_votos == min && CANDIDATOS[i]->active == true && CANDIDATOS[i]->winner == false)
        {
          fprintf(output_file, "CANDIDATO %d HA SIDO ELIMINADO\n", i);
          CANDIDATOS[i]->active = false;
          id_borrado = i;
          cant_votos = CANDIDATOS[i]->num_votos;
          CANDIDATOS[i]->num_votos = 0;
          break;
        }
      }
      for (i = 0; i < N_CANDIDATES; i++)
      {
        if (i == id_borrado || CANDIDATOS[i]->active == false || CANDIDATOS[i]->winner == true)
        {
          continue;
        }
        dis1 = N_CANDIDATES - abs(id_borrado - i);
        dis2 = abs(id_borrado -i);
        if (dis1 < min_dis || dis2 < min_dis)
        {
          if (dis1 < dis2)
          {
            min_dis = dis1;
            id_beneficiado = i;
          }
          else
          {
            min_dis = dis2;
            id_beneficiado = i;
          }
        dis1 = 0;
        dis2 = 0;
        }
      }
      fprintf(output_file, "CANDIDATO %d HA RECIBIDO %d VOTOS\n", id_beneficiado, cant_votos);
      Candidato* candidato1 = CANDIDATOS[id_borrado];
      Candidato* candidato2 = CANDIDATOS[id_beneficiado];
      candidate_give_all_votes(candidato1 , candidato2);
    }
    
    else if (string_equals(command, "TRASPASAR-EXCESO-VOTOS")) {
      int M,  cand, dis1 = 7000, dis2 = 7000;
      int min_dis = 7000;
      int id_beneficiado = 0;
      fscanf(input_file, "%d %d" , &cand, &M);
      Candidato* ganador = CANDIDATOS[cand];
      if (ganador->active == true)
      {
        fprintf(output_file, "CANDIDATO %d HA SIDO ELEGIDO\n", cand);
        ganador->winner = true;
        if (ganador->num_votos >= M)
        {
          //Encontramos a quien darle la cantidad de votos
          for (i = 0; i < N_CANDIDATES; i++)
          {
            if (i == ganador->candidate_ID || CANDIDATOS[i]->active == false)
            {
              continue;
            }
              dis1 = N_CANDIDATES - abs(ganador->candidate_ID - i);
              dis2 = abs(ganador->candidate_ID -i);
            if (dis1 < min_dis || dis2 < min_dis)
            {
              if (dis1 < dis2)
              {
                min_dis = dis1;
                id_beneficiado = i;
              }
              else
              {
                min_dis = dis2;
                id_beneficiado = i;
              }
              dis1 = 0;
              dis2 = 0;
            }
          }
          Candidato* candidato2 = CANDIDATOS[id_beneficiado];
          fprintf(output_file, "CANDIDATO %d HA RECIBIDO %d VOTOS\n", candidato2->candidate_ID, (ganador->num_votos-M));
          candidate_give_votes(ganador , candidato2, (ganador->num_votos-M));
        }
      }
    }
  
    else
    {
      fprintf(output_file, "-----------\n");
    }
  }

  fclose(input_file);
  fclose(output_file);

//Queremos borrar todos los candidatos, votos y votantes
  for (i = 0; i < N_CANDIDATES; i++)
  {
    if (CANDIDATOS[i] != NULL)
    {
      Candidate_votes* current_vote = CANDIDATOS[i]->inicio;
      while (current_vote != NULL)
      {
        Candidate_votes* voto_borrar = current_vote;
        Voter* votante = voto_borrar->voter;
        current_vote = current_vote->next;
        CANDIDATOS[i]->inicio = current_vote;
        free(votante);
        free(voto_borrar);
      }
      free(CANDIDATOS[i]);
    }
  }
  

  return 0;
}
