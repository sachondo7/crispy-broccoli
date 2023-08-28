#include "hashtable.h"
#include <stdbool.h>
#include <math.h>
#include "node.h"

void print_tree(Node* root) {
    printf("SOY EL NODO DE ID %d, TENGO VALOR %d y ALTURA %d\n", root->ID, root->value, root->height);
	if (root->left_child) {
		print_tree(root->left_child);
	};
	if (root->right_child) {
		print_tree(root->right_child);
	};
}

void free_tree(Node* root) {
    if (root->left_child) {
        free_tree(root->left_child);
    };
    if (root->right_child) {
        free_tree(root->right_child);
    };
    free(root);
}

Node* inicializarNodo(int ID, int valor, int altura) {
    Node* nodo = (Node*)malloc(sizeof(Node));
    nodo->ID = ID;
    nodo->value = valor;
    nodo->height = altura;
    nodo->num_nodos = pow(2, altura) - 1;
    nodo->left_child = NULL;
    nodo->right_child = NULL;
    return nodo;
}

// Función para construir un árbol completo a partir de un arreglo de valores
Node* construirArbolCompleto(int valores[], int num_nodos, int indice, int altura) {
    if (indice >= num_nodos) {
        return NULL;
    }
    Node* nodo = inicializarNodo(indice + 1, valores[indice], altura);
    int indice_hijo_izq = 2 * indice + 1;
    int indice_hijo_der = 2 * indice + 2;
    int altura_hijos = altura - 1;

    if (indice_hijo_izq < num_nodos) {
        nodo->left_child = construirArbolCompleto(valores, num_nodos, indice_hijo_izq, altura_hijos);
    }
    if (indice_hijo_der < num_nodos) {
        nodo->right_child = construirArbolCompleto(valores, num_nodos, indice_hijo_der, altura_hijos);
    }
    return nodo;
}

// Función para recorrer el árbol y eliminar los nodos hojas
void recorrerYEliminarHojas(Node** nodo) {
    if (*nodo == NULL)
        return;

    // Caso base: nodo hoja
    if ((*nodo)->left_child == NULL && (*nodo)->right_child == NULL) {
        free(*nodo);
        *nodo = NULL;
        return;
    }

    // Recorrer y eliminar nodos hojas en los subárboles izquierdo y derecho
    recorrerYEliminarHojas(&(*nodo)->left_child);
    recorrerYEliminarHojas(&(*nodo)->right_child);

    // Actualizar la altura y la cantidad de nodos después de eliminar los nodos hojas
    if (*nodo != NULL) {
        (*nodo)->num_nodos = 1;

        if ((*nodo)->left_child != NULL) {
            (*nodo)->num_nodos += (*nodo)->left_child->num_nodos;
        }

        if ((*nodo)->right_child != NULL) {
            (*nodo)->num_nodos += (*nodo)->right_child->num_nodos;
        }

        (*nodo)->height = log2((*nodo)->num_nodos + 1);
    }
}