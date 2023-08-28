#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>

#define BOARD_SIZE 8

void printBoard(int board[BOARD_SIZE][BOARD_SIZE]);

bool isValidPosition(int x, int y);

bool isVisited(int board[BOARD_SIZE][BOARD_SIZE], int x, int y);

bool knightTour(int board[BOARD_SIZE][BOARD_SIZE], int x, int y, int moveCount, int lista_inputs[], int contador);

void sumarFilasColumnas(int matriz[][8], int filas, int columnas);

int compararEnteros(const void *a, const void *b);

int buscarElemento(int arreglo[], int tamano, int elemento);

void fprintBoard(FILE* output_stream, int board[BOARD_SIZE][BOARD_SIZE]);

int verificarSumaFilasColumnas(int matriz[BOARD_SIZE][BOARD_SIZE], int objetivo);