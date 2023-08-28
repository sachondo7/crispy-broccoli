#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>
#include "chess.h"
#define BOARD_SIZE 8

// Función para imprimir el tablero
void printBoard(int board[BOARD_SIZE][BOARD_SIZE]) {
    printf("Tablero de ajedrez:\n");
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            printf("%2d ", board[i][j]);
        }
        printf("\n");
    }
}

// Función para imprimir el tablero
void fprintBoard(FILE* output_stream, int board[BOARD_SIZE][BOARD_SIZE]) {
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            fprintf(output_stream, "%d ", board[i][j]);
        }
        if (i != BOARD_SIZE - 1){
            fprintf(output_stream, "\n");
        }
    }
}

// Función para verificar si una posición está dentro del tablero
bool isValidPosition(int x, int y) {
    return (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE);
}

// Función para verificar si una casilla ya fue visitada
bool isVisited(int board[BOARD_SIZE][BOARD_SIZE], int x, int y) {
    return (board[x][y] != 0);
}

// Función para realizar los movimientos del caballo recursivamente
bool knightTour(int board[BOARD_SIZE][BOARD_SIZE], int x, int y, int moveCount, int lista_inputs[], int contador) {
    // Verificar si todas las casillas han sido visitadas
    if (moveCount == (BOARD_SIZE * BOARD_SIZE)+1)
    {
        if (verificarSumaFilasColumnas(board, 260) == 1){
            return true;
        }
        else{
            return false;
        }
    }

    // Movimientos posibles del caballo en el tablero
    int moves[8][2] = { {2, 1}, {1, 2}, {-1, 2}, {-2, 1},
                        {-2, -1}, {-1, -2}, {1, -2}, {2, -1} };


    // Intentar realizar los movimientos posibles
    for (int i = 0; i < 8; i++)
    {
        bool semovio = false;
        int nextX = x + moves[i][0];
        int nextY = y + moves[i][1];

        // Verificar si el movimiento es válido y la casilla no ha sido visitada
        if (isValidPosition(nextX, nextY))
        {
            //Esto significa que llegamos a una casilla que ya estaba completada antes
            if (board[nextX][nextY] != 0)
            {
            //Esto significa que el movimiento n-esimo es igual al que le tocaba
                if (moveCount == lista_inputs[contador])
                {
                    if (lista_inputs[contador] != board[nextX][nextY])
                    {
                    //intento con otro posible movimiento
                    continue;
                    }
                    else
                    {
                    //Realizo el movimiento
                    semovio = true;
                    board[nextX][nextY] = moveCount;
                    //printf("Movimiento %d: (%d, %d)\n", moveCount, nextX, nextY);
                    //printBoard(board);
                    contador ++;
                    }
                }
            }
            else
            {
                if (moveCount != lista_inputs[contador])
                {
                //Realizo el movimiento
                semovio = true;
                board[nextX][nextY] = moveCount;
                //printf("Movimiento %d: (%d, %d)\n", moveCount, nextX, nextY);
                //printBoard(board);
                }
            }
            if (semovio == true)
            {
            // Verificar si el movimiento lleva a la solución
            if (knightTour(board, nextX, nextY, moveCount + 1, lista_inputs, contador))
            {
                return true;
            } 
            if (buscarElemento(lista_inputs, 64, moveCount) == 0)
            {
                // Deshacer el movimiento si no lleva a la solución
                board[nextX][nextY] = 0;            
                //printf("Movimiento %d DESHECHO: (%d, %d)\n", moveCount, nextX, nextY);
                //printBoard(board);
            }
            else {
                return false;
            }
            }
        }
    }
    return false;
    }


void sumarFilasColumnas(int matriz[][8], int filas, int columnas) {
    int sumaFilas[filas];
    int sumaColumnas[columnas];

    // Sumar los valores de las filas
    for (int i = 0; i < filas; i++) {
        sumaFilas[i] = 0;
        for (int j = 0; j < columnas; j++) {
            sumaFilas[i] += matriz[i][j];
        }
    }

    // Sumar los valores de las columnas
    for (int j = 0; j < columnas; j++) {
        sumaColumnas[j] = 0;
        for (int i = 0; i < filas; i++) {
            sumaColumnas[j] += matriz[i][j];
        }
    }
    
    //Imprimir resultados
    for (int i = 0; i < filas; i++) {
        printf("La suma de la fila %d es: %d\n", i, sumaFilas[i]);
    }
    for (int j = 0; j < columnas; j++) {
        printf("La suma de la columna %d es: %d\n", j, sumaColumnas[j]);
    }
}

int compararEnteros(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int buscarElemento(int arreglo[], int tamano, int elemento){
    for (int i = 0; i < tamano; i++) {
        if (arreglo[i] == elemento) {
            return 1; // El elemento se encontró en el arreglo
        }
    }
    return 0; // El elemento no se encontró en el arreglo
}

int verificarSumaFilasColumnas(int matriz[BOARD_SIZE][BOARD_SIZE], int objetivo) {
    // Verificar suma de filas
    for (int i = 0; i < BOARD_SIZE; i++) {
        int sumaFila = 0;
        for (int j = 0; j < BOARD_SIZE; j++) {
            sumaFila += matriz[i][j];
        }
        if (sumaFila != objetivo) {
            return 0; // La suma de una fila no es igual al objetivo
        }
    }

    // Verificar suma de columnas
    for (int j = 0; j < BOARD_SIZE; j++) {
        int sumaColumna = 0;
        for (int i = 0; i < BOARD_SIZE; i++) {
            sumaColumna += matriz[i][j];
        }
        if (sumaColumna != objetivo) {
            return 0; // La suma de una columna no es igual al objetivo
        }
    }

    return 1; // La suma de todas las filas y columnas es igual al objetivo
}