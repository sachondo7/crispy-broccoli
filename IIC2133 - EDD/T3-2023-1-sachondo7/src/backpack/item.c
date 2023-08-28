#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include "item.h"

Item* crearItems(int numItems) {
    Item* items = malloc(numItems * sizeof(Item));
    return items;
}

void destruirItems(Item* items) {
    free(items);
}

int compararPesos(const void* a, const void* b) {
    const Item* itemA = (const Item*)a;
    const Item* itemB = (const Item*)b;
    return itemB->peso - itemA->peso;
}

void asignarMochilas(Item* items, int numItems, int capacidad, FILE* archivoSalida) {
    int numMochilas = 0;
    int* mochilas = (int*)malloc(numItems * sizeof(int));
    int* pesos = (int*)calloc(numItems, sizeof(int));

    qsort(items, numItems, sizeof(Item), compararPesos);

    for (int i = 0; i < numItems; i++) {
        int asignado = 0;
        for (int j = 0; j < numMochilas; j++) {
            if (pesos[j] + items[i].peso <= capacidad) {
                mochilas[i] = j;
                pesos[j] += items[i].peso;
                asignado = 1;
                break;
            }
        }
        if (!asignado) {
            mochilas[i] = numMochilas;
            pesos[numMochilas] = items[i].peso;
            numMochilas++;
        }
    }

    fprintf(archivoSalida, "%d\n", numMochilas);

    for (int i = 0; i < numMochilas; i++) {
        printf("Agente %d: ", i + 1);
        int primerElemento = 1;
        for (int j = 0; j < numItems; j++) {
            if (mochilas[j] == i) {
                if (primerElemento) {
                    printf("%d", items[j].id);
                    fprintf(archivoSalida, "%d ", items[j].id);
                    primerElemento = 0;
                } else {
                    printf(", %d", items[j].id);
                    fprintf(archivoSalida, "%d ", items[j].id);
                }
            }
        }
        printf("\n");
        fprintf(archivoSalida, "\n");
    }

    free(mochilas);
    free(pesos);
}
