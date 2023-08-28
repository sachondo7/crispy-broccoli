#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "node.h"

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

  // TODO: Implementar
  // Puedes utilizar string_equals para comparar strings
  int NUM_NODOS, N_EVENTS; 
  char command[32];
  fscanf(input_file, "%d", &NUM_NODOS);

  int value;
  int num_inverted = 0;
  Node* root; 
  Node* node;

  fscanf(input_file, "%d", &value);
  root = node_create(value);

  for (int i = 1 ; i < NUM_NODOS; i++)
  {
    fscanf(input_file, "%d", &value);
    node = node_create(value);
    insert_node(root, node);
  }
  
  fscanf(input_file, "%d", &N_EVENTS);

  for (int event = 0; event < N_EVENTS; event ++)
  {
    fscanf(input_file, "%s", command);
    if (string_equals(command, "PATH"))
    {
      fscanf(input_file, "%d", &value);
      find_path(output_file, root, value);
      fprintf(output_file, "\n");
    }
    else if (string_equals(command, "DEEP"))
    {
      fscanf(input_file, "%d", &value);
      find_deep(output_file, root, value);
      fprintf(output_file, "\n");
    }
    else if (string_equals(command, "ORDER"))
    {
      order(output_file, root);
      fprintf(output_file, "\n");
    }
    else if (string_equals(command, "DEEP-ORDER"))
    {
      deep_order(output_file, root);
      fprintf(output_file, "\n");
    }
    else if (string_equals(command, "INVERT"))
    {
      //Vemos si el arbol viene invertido o no
      if (num_inverted % 2 == 0)
      {
        //Esto quiere decir que no viene invertido
        invert(output_file, root); //Se invierte
        deep_order(output_file, root); //Se imprime
        fprintf(output_file, "\n"); 
        invert(output_file, root); //Lo vuelvo a invertir para no chingar las otros comandos
        num_inverted ++; 
        //Le sumo para que a la proxima no entre acá
      }
      else{
        deep_order(output_file, root);
        fprintf(output_file, "\n");
        num_inverted ++;
      }
    }
  
      
  }
  
  fclose(input_file);
  fclose(output_file);
  return 0;
}
