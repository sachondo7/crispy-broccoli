#include "hashtable.h"
#include <stdbool.h>
#include <math.h>

bool esPrimo(int numero) {
    if (numero == 0 || numero == 1){
        return false;
    }
    if (numero == 4) {
        return false;
    }
    for (int x = 2; x < numero / 2; x++) 
    {
        if (numero % x == 0) 
        {
            return false;
        }
    }
    // Si no se pudo dividir por ninguno de los de arriba, sí es primo
    return true;
}

void printHash(HashItem** hash_table, int table_range){
    for (int i = 0; i < table_range; i++)
    {
        HashItem* current = hash_table[i];
        printf("Hash %d: ", i);
        while (current != NULL)
        {
            printf("%lu -> ", current->key);
            current = current->next;
        }
        printf("\n");
    }
    
}

void freeHash(HashItem** hash_table, int table_range){
    for (int i = 0; i < table_range; i++)
    {
        HashItem* current = hash_table[i];
        while (current != NULL)
        {
            HashItem* temp = current;
            current = current->next;
            free(temp);
        }
    }
    free(hash_table);
}

unsigned long hashFunction(Node* root, int h) {
    //printf("OBTENIENDO HASH DEL Nodo con ID %d y altura %d\n", root->ID, h);
    unsigned long hval = 5381;
    for (int i = 0; i < h; i++){
        hval = ((hval << 5) + hval) << root->value << i;
    } 
    return hval;
}

void calcularHashSubarboles(HashItem** hash_table, int table_range, Node* root, int altura_actual) {
    // Caso base: si el subárbol actual es un nodo hoja, no hacer nada
    if (altura_actual < 2) {
        return;
    }
    // Calcular el valor de hash para el subárbol actual
    unsigned long subarbolHash = hashFunction(root, altura_actual);
    insertarElemento(hash_table, subarbolHash, root, table_range);
    //printf("Hash del subárbol del nodo con ID %d y altura %d: %lu\n", root->ID, root->height, subarbolHash);
    // Recursivamente calcular los valores de hash para los subárboles izquierdo y derecho
    calcularHashSubarboles(hash_table, table_range, root->left_child, altura_actual - 1);
    calcularHashSubarboles(hash_table, table_range, root->right_child, altura_actual - 1);
}

// Inserta un nuevo elemento en la tabla de hash
void insertarElemento(HashItem** hash_table, unsigned long hash, Node* root, int table_range) {
    int index = hash % table_range;
    HashItem* item = hash_table[index];
    if (item == NULL){
        item = calloc(1, sizeof(HashItem));
        item->key = hash;
        item->node = root;
        item->next = NULL;
        hash_table[index] = item;
    }
    else{
        while(item->next != NULL){
            item = item->next;
        }
        item->next = calloc(1, sizeof(HashItem));
        item->next->key = hash;
        item->next->node = root;
        item->next->next = NULL;
    }
    //printf("Insertado NODO DE ID %d en el índice %d\n", root->ID, index);
}

// Imprime los elementos de la tabla de hash
void imprimirTabla(HashItem** hash_table, int size) {
    for (size_t i = 0; i < size; ++i) {
        HashItem* currentItem = hash_table[i];
        printf("Elementos en índice %lu: ", i);
        while (currentItem != NULL) {
            printf("Nodo %d, hash %lu -> ", currentItem->node->ID, currentItem->key);
            currentItem = currentItem->next;
        }
        printf("\n");
    }
}

// Verificar si el subárbol está contenido en el árbol original
void verificarSubarbol(int tam_subarbol, HashItem** tabla_hash, int tam_tabla, Node* query_root, FILE* output_stream) {
    unsigned long subarbolHash = hashFunction(query_root, query_root->height);
    int indice = (subarbolHash % tam_tabla);
    int contador = 0;
    bool encontro = false;
    //printf("\n");
    //printf("QUERY: ESTOY BUSCANDO UN SUB_ARBOL CON HASH: %lu y LO VOY A BUSCAR EN EL INDICE %d\n", subarbolHash, indice);
    //printf("\n");
    //printf("Hash del subárbol: %lu y estoy en el índice %zu\n", subarbolHash, indice);
    // Buscar el valor de hash en la tabla de hash
    HashItem* currentItem = tabla_hash[indice];
    while (currentItem != NULL) {
        if (currentItem->key == subarbolHash && currentItem->node->value == query_root->value) {
            bool iguales = checkEqual(currentItem->node, query_root, contador, query_root->height, 0);
            if (iguales)
            {
                encontro = true;
                //printf("El subárbol está contenido en el árbol original en el nodo %d, y en el índice %d de la tabla de hash. \n", currentItem->node->ID, indice);
                fprintf(output_stream, "%d ", currentItem->node->ID);
            }
        }
        currentItem = currentItem->next;
    }
    if (!encontro){
        //printf("El subárbol no está contenido en el árbol original\n");
        fprintf(output_stream, "-1");
    }
    fprintf(output_stream, "\n");
    return; // El subárbol no está contenido en el árbol original
}

bool checkEqual(Node* buscado, Node* query_root, int iteracion, int altura_inicial, int cual_hijo){
    //printf("NODO %d\n", buscado->ID);
    //printf("ENTRE A CHECKEAR SI SON IGUALES EL %d, con el %d y en la iteracion %d\n", buscado->value, query_root->value, iteracion);
    int valor_comparacion = buscado->value;
    //Caso base
    if (valor_comparacion != query_root->value)
    {
        //printf("EL QUERY_ROOT NO ES IGUAL al HASH DEL NODO %d\n", buscado->ID);
        return false;
    }
    if (iteracion == altura_inicial-1){
        return true;
    }
    return checkEqual(buscado->left_child, query_root->left_child, iteracion + 1, altura_inicial, 1) && checkEqual(buscado->right_child, query_root->right_child, iteracion + 1, altura_inicial, 2);
}