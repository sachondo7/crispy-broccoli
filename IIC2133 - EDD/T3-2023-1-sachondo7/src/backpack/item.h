#pragma once
#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>

typedef struct item{
    int id;
    int peso;
} Item;

Item* crearItems(int numItems);
void destruirItems(Item* items);
void asignarMochilas(Item* items, int numItems, int capacidad, FILE* archivoSalida);
int compararPesos(const void* a, const void* b);