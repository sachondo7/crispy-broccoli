#pragma once

#include "../engine/particle.h"

typedef struct simulation
{
  /** Cantidad total de frames que debe durar la simulación */
  int frames;
  /** Arreglo de partículas */
  Particle* particles;
  /** Largo del arreglo "particles" */
  int particle_count;
  /** Arreglo de segmentos */
  Segment* segments;
  /** Largo del arreglo "segments" */
  int segment_count;
} Simulation;

typedef struct kdTree 
{
  BoundingBox box_value; 
  struct kdTree *left_son;
  struct kdTree *right_son;
  int indice_inicial;
  int indice_final;
  int num_segmentos; 
  Segment* segmentos;
}kdTree;

typedef struct collision
{
  bool choque;
  Segment* segmento;
} Collision;


/** Lee una simulación a partir de un archivo, y abre la interfaz gráfica para visualizarla
 * @param input_file ruta al archivo que describe la simulación
 * @param visualize indica si debe abrirse o no la interfaz gráfica
 * @returns objeto Simulation* que contiene las entidades de la simulación
 */
Simulation* simulation_init_from_file(char* input_file, bool visualize);

/** Libera todos los recursos asociados a la simulación 
 * @param sim simulación construida por la función simulation_init_from_file()
 */
void   simulation_destroy(Simulation* sim);


//FUNCIONES CREADAS POR MI 

//Nota, el parametro es para saber si voy a buscar por x (parametro = 0) o por y (parametro = 1)
int partition(Segment* arreglo_partition, int low, int high, int parametro);

void swap(Segment* a, Segment* b);


//la gracia esque ordena el arreglo de tal forma que los menores a la mediana esten a la izquierda y los mayores a la derecha
//parametro hace referencia a si buscaremos en partition con x o y
void median(Segment* segmentos, int lim_inf, int lim_sup, int largo_lista, int parametro);

BoundingBox find_max_min(Segment* segmentos, int largo_lista);

void sort_tree(Segment* segmentos, int numero_segmentos, kdTree* arbol, int parametro, int tipo_arbol);

bool colision_search(kdTree* nodo, Particle particle, Collision* colision);