#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>
#include <time.h>
#include "hashtable.h"
#include "node.h"

int main(int argc, char** argv) {

  clock_t start = clock();

  if (argc != 3) {
    printf("Modo de uso: %s input output\nDonde:\n", argv[0]);
    printf("\t\"input\" es la ruta al archivo de input\n");
    printf("\t\"output\" es la ruta al archivo de output\n");
    return 1;
  }

  // Abrimos el archivo de input
  FILE* input_stream = fopen(argv[1], "r");

  // Abrimos el archivo de output
  FILE* output_stream = fopen(argv[2], "w");

  // Si alguno de los dos archivos no se pudo abrir
  if (!input_stream) {
    printf("El archivo %s no existe o no se puede leer\n", argv[1]);
    return 2;
  }
  if (!output_stream) {
    printf("El archivo %s no se pudo crear o no se puede escribir\n", argv[2]);
    printf("Recuerda que \"fopen\" no puede crear carpetas\n");
    fclose(input_stream);
    return 3;
  }

  // [Aqui va tu tarea]

  //Primero leemos el número de nodos e inicializamos el arbol del input
  int N_NODES, NODE_VALUE, N_QUERIES; 
  int N_NODES_SUBTREE, NODE_VALUE_SUBTREE;
  fscanf(input_stream, "%d", &N_NODES);

  //Hacemos una lista de ints con todos los valores del arbol 
  int ARBOL_PRINCIPAL[N_NODES];
  for (int i = 0; i < N_NODES; i++)
  {
    fscanf(input_stream, "%d", &NODE_VALUE);
    ARBOL_PRINCIPAL[i] = NODE_VALUE;
  }

  int tree_height = (log10(N_NODES+1) / log10(2));
  //Inicializamos el arbol
  Node *root, *query_root;

  root = construirArbolCompleto(ARBOL_PRINCIPAL, N_NODES, 0, tree_height);
    
  //Creamos la tabla de HASH
  int table_range = N_NODES + 1;
  //Usamos una función aux para determinar el rango de la tabla, construido por el numero primo más cercano al rango de nodos. 
  bool rangoListo = esPrimo(table_range);
  while (!rangoListo)
  {
    table_range++;
    rangoListo = esPrimo(table_range);
  }

  HashItem **hash_table = calloc(table_range, sizeof(HashItem*));

  //Llenamos la tabla de hash
  int cont = 0;
  for (int i = root->height ; i >= 2; i--)
  {
    calcularHashSubarboles(hash_table, table_range, root, root->height - cont);
    cont++;
  }
  
  
  
  imprimirTabla(hash_table, table_range);

  //Leemos la cantidad de consultas
  fscanf(input_stream, "%d", &N_QUERIES);

  //Ahora hacemos la cantidad de consultas que se pidieron
  for (int i = 0; i < N_QUERIES; i++)
  {
    N_NODES_SUBTREE = 0;
    fscanf(input_stream, "%d", &N_NODES_SUBTREE);
    //Repetimos el proceso para cada sub-arbol
    int SUB_TREE[N_NODES_SUBTREE];
    int SUB_TREE_HEIGHT = (log10(N_NODES_SUBTREE+1) / log10(2));
    for (int j = 0; j < N_NODES_SUBTREE; j++)
    {
      fscanf(input_stream, "%d", &NODE_VALUE_SUBTREE);
      SUB_TREE[j] = NODE_VALUE_SUBTREE;
    }
    query_root = construirArbolCompleto(SUB_TREE, N_NODES_SUBTREE, 0, SUB_TREE_HEIGHT);
    verificarSubarbol(N_NODES_SUBTREE, hash_table, table_range, query_root, output_stream);
    //print_tree(query_root);
    free_tree(query_root);
  }

  free_tree(root);
  freeHash(hash_table, table_range);

  // Cerrar archivo de input
  fclose(input_stream);

  // Cerrar archivo de output
  fclose(output_stream);

  clock_t end = clock();

  printf("Tiempo de ejecución: %f segundos\n", (double)(end - start) / CLOCKS_PER_SEC);

  return 0;
}
