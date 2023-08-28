#pragma once
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

typedef struct node_t {
    int value;
    int ID;
    int height;
    int num_nodos;
    struct node_t *left_child;
    struct node_t *right_child;
} Node;

void print_tree(Node *root);

void free_tree(Node* root);

Node* inicializarNodo(int ID, int valor, int altura);

Node* construirArbolCompleto(int valores[], int num_nodos, int indice, int altura);

void recorrerYEliminarHojas(Node** root);