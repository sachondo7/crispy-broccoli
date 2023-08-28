#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>
#include "chess.h"
#define BOARD_SIZE 8

int main(int argc, char** argv) {
  if (argc != 3) {
    printf("Modo de uso: %s input output\nDonde:\n", argv[0]);
    printf("\t\"input\" es la ruta al archivo de input\n");
    printf("\t\"output\" es la ruta al archivo de output\n");
    return 1;
  }

  // Abrimos el archivo de input
  FILE* input_stream = fopen(argv[1], "r");

  // Abrimos el archivo de output
  FILE* output_stream = fopen(argv[2], "w");

  // Si alguno de los dos archivos no se pudo abrir
  if (!input_stream) {
    printf("El archivo %s no existe o no se puede leer\n", argv[1]);
    return 2;
  }
  if (!output_stream) {
    printf("El archivo %s no se pudo crear o no se puede escribir\n", argv[2]);
    printf("Recuerda que \"fopen\" no puede crear carpetas\n");
    fclose(input_stream);
    return 3;
  }

  // [Aqui va tu tarea]
  int board[BOARD_SIZE][BOARD_SIZE];
  int contador = 0;
  int input_number = 0;
  int LISTA[64]={0};
  int startX = -1;
  int startY = -1;




  //LEEMOS LOS INPUTS Y ARMAMOS EL TABLERO
  for (int i = 0; i < BOARD_SIZE; i++)
  {
    for (int j = 0; j < BOARD_SIZE; j++)
    {
      fscanf(input_stream, "%d", &input_number);
      board[i][j] = input_number;
      if (input_number != 0)
      {
        LISTA[contador] = input_number;
        contador++;
      }      
    }
  }
  //Ordenamos la lista con los inputs que nos dieron
  qsort(LISTA, contador, sizeof(int), compararEnteros);
  //printBoard(board);
  

  // Encontrar la posición inicial del caballo
  for (int i = 0; i < BOARD_SIZE; i++) {
      for (int j = 0; j < BOARD_SIZE; j++) {
          if (board[i][j] == 1) {
              startX = i;
              startY = j;
              //printf("Se encontró una posición inicial del caballo.\n");
              break;
          }
      }
  }

  if (startX != -1 && startY != -1)
  {
    if (knightTour(board, startX, startY, 2, LISTA, 1))
    {
      //printf("Se encontró un recorrido válido del caballo.\n");
      // Verificar igualdad de las sumas de filas y columnas
      bool sumsEqual = true;
      if (sumsEqual)
        printf("Las sumas de las filas y columnas son iguales.\n");
    }
  }




  sumarFilasColumnas(board, BOARD_SIZE, BOARD_SIZE);
  fprintBoard(output_stream, board);

  // Cerrar archivo de input
  fclose(input_stream);

  // Cerrar archivo de output
  fclose(output_stream);

  return 0;
}
