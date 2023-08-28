#pragma once
#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include "node.h"

typedef struct hashitem_t {
    unsigned long key;
    Node* node;
    struct hashitem_t *next;
} HashItem;





bool esPrimo(int numero);

void printHash(HashItem** hash_table, int table_range);

void freeHash(HashItem** hash_table, int table_range);

unsigned long hashFunction(Node* root, int altura_actual);

void calcularHashSubarboles(HashItem** hash_table, int table_range, Node* root, int altura_actual);

void insertarElemento(HashItem** item, unsigned long hash, Node* node, int table_range);

void imprimirTabla(HashItem** items, int size);

void verificarSubarbol(int tam_subarbol, HashItem** tabla_hash, int tam_tabla, Node* query_root, FILE* output_stream);

bool checkEqual(Node* buscado, Node* query_root, int iteracion, int altura_inicial, int hijo);