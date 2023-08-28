#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include "nodo.h"

int costo_arista(int x_1, int y_1, int x_2, int y_2){
    int costo;
    costo = abs(x_1 - x_2) + abs(y_1 - y_2);
    return costo;
}

int compararAristas(const void* a, const void* b){
    Arista* aristaA = (Arista*)a;
    Arista* aristaB = (Arista*)b;
    return (aristaA->costo > aristaB->costo) - (aristaA->costo < aristaB->costo);
}

int encontrar(int padre[], int i){
    if (padre[i] == i){
        return i;
    }
    return encontrar(padre, padre[i]);
}

void unionSet(int padre[], int rango[], int x, int y){
    int xRaiz = encontrar(padre, x);
    int yRaiz = encontrar(padre, y);

    if (rango[xRaiz] < rango[yRaiz]){
        padre[xRaiz] = yRaiz;
    }
    else if (rango[xRaiz] > rango[yRaiz]){
        padre[yRaiz] = xRaiz;
    }
    else{
        padre[yRaiz] = xRaiz;
        rango[xRaiz]++;
    }
}

void calculateMST(Nodo* nodos, int numNodos, FILE* output_stream){
    int maxAristas = numNodos * (numNodos - 1) / 2;
    Arista* aristas = (Arista*)malloc(sizeof(Arista) * maxAristas);
    int numAristas = 0;
    //Construir todas las aristas posibles
    for (int i = 0; i < numNodos; i++){
        for (int j = i + 1; j < numNodos; j++){
            aristas[numAristas].src = i;
            aristas[numAristas].dest = j;
            aristas[numAristas].costo = costo_arista(nodos[i].x, nodos[i].y, nodos[j].x, nodos[j].y);
            numAristas++;
            //printf("COSTO DE LA ARISTA DEL NODO (%d,%d) AL NODO (%d,%d): %d\n", nodos[i].x, nodos[i].y, nodos[j].x, nodos[j].y, costo_arista(nodos[i].x, nodos[i].y, nodos[j].x, nodos[j].y));
        }
    }
    printf("\n");
    //Ordenar las aristas de menor a mayor
    qsort(aristas, numAristas, sizeof(Arista), compararAristas);

    //Crear el arreglo de aristas del MST
    Arista* MST = (Arista*)malloc(sizeof(Arista) * (numNodos - 1));
    int numAristasMST = 0;
    int* parent = (int*)malloc(sizeof(int) * numNodos);
    int* rango = (int*)malloc(sizeof(int) * numNodos);

    //Inicializar los arreglos
    for (int i = 0; i < numNodos; i++){
        parent[i] = i;
        rango[i] = 0;
    }

    //Construir el MST
    int i = 0;
    while (numAristasMST < numNodos-1){
        Arista siguienteArista = aristas[i++];
        int x = encontrar(parent, siguienteArista.src);
        int y = encontrar(parent, siguienteArista.dest);
        if (x != y){
            MST[numAristasMST++] = siguienteArista;
            unionSet(parent, rango, x, y);
        }
    }

    printf("ARISTAS DEL MST:\n");
    int costoTotal = 0;
    for (int i = 0; i < numAristasMST; i++){
        int src = MST[i].src;
        int dest = MST[i].dest;
        printf("Arista %d: Desde el punto (%d, %d) hasta el punto (%d, %d)\n", i + 1, nodos[src].x, nodos[src].y, nodos[dest].x, nodos[dest].y);
        costoTotal += MST[i].costo;
    }
    printf("COSTO TOTAL DEL MST: %d\n", costoTotal);
    fprintf(output_stream, "%d\n", costoTotal);
    for (int i = 0; i < numAristasMST; i++){
        int src = MST[i].src;
        int dest = MST[i].dest;
        fprintf(output_stream, "%d %d %d %d\n" , nodos[src].x, nodos[src].y, nodos[dest].x, nodos[dest].y);
    }

    int* grados = (int*)malloc(sizeof(int) * numNodos);
    for (int i = 0; i < numAristasMST; i++){
        grados[MST[i].src]++;
        grados[MST[i].dest]++;
    }
    int gradoMax = 0; 
    for (int i = 0; i < numNodos; i++){
        if (grados[i] > gradoMax){
            gradoMax = grados[i];
        }
    }
    printf("GRADO MAXIMO DEL MST: %d\n", gradoMax);

    free(aristas);
    free(MST);
    free(parent);
    free(rango);
    free(grados);

}