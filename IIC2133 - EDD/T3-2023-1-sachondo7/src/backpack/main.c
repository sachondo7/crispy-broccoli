#include <stdio.h>
#include <stdlib.h>
#include "item.h"

int main(int argc, char** argv)
{
  if(argc != 3)
  {
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
  if(!input_stream)
  {
    printf("El archivo %s no existe o no se puede leer\n", argv[1]);
    return 2;
  }
  if(!output_stream)
  {
    printf("El archivo %s no se pudo crear o no se puede escribir\n", argv[2]);
    printf("Recuerda que \"fopen\" no puede crear carpetas\n");
    fclose(input_stream);
    return 3;
  }

  // [Aqui va tu tarea]
  int capacidad = 0;
  int numItems = 0;
  //leemos la capacidad de los agentes
  fscanf(input_stream, "%d", &capacidad);
  //leemos el numero de items
  fscanf(input_stream, "%d", &numItems);
  
  //leemos los items
  Item* items = crearItems(numItems);

  for (int i = 0; i < numItems; i++)
  {
    fscanf(input_stream, "%d", &items[i].peso);
    items[i].id = i;
  }

  asignarMochilas(items, numItems, capacidad, output_stream);
  destruirItems(items);


  






  // Cerrar archivo de input
  fclose(input_stream);

  // Cerrar archivo de output
  fclose(output_stream);

  return 0;
}
