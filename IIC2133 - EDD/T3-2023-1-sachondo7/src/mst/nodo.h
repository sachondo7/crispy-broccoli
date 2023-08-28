#pragma once
#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>

typedef struct nodo{
    int x; 
    int y;    
} Nodo;

typedef struct arista{
    int src; 
    int dest;
    int costo;
} Arista;

int costo_arista(int x_1, int y_1, int x_2, int y_2);

void calculateMST(Nodo* nodos, int numNodos, FILE* output_stream);

int compararAristas(const void* a, const void* b);

int encontrar(int padre[], int i);

void unionSet(int padre[], int rango[], int x, int y);

