#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#include "../visualizer/visualizer.h"
#include "simulation.h"

/** Avisa que el archivo de input no era válido para este programa */
static void invalid_file()
{
  printf("Archivo de input inválido :(\n");
  exit(2);
}

/** Lee una simulación a partir de un archivo, y abre la interfaz gráfica para visualizarla
 * @param input_file ruta al archivo que describe la simulación
 * @param visualize indica si debe abrirse o no la interfaz gráfica
 * @returns objeto Simulation* que contiene los segmentos y partículas de la simulación
 */
Simulation* simulation_init_from_file(char* input_file, bool visualize)
{
  FILE* f = fopen(input_file, "r");  
  if(!f)
  {
    printf("Archivo no existe o no se puede leer: %s\n", input_file);
    exit(2);
  }

  Simulation* sim = malloc(sizeof(Simulation));

  fscanf(f, "%d", &sim->frames) ?: invalid_file();

  int height, width;
  fscanf(f, "%d %d", &height, &width) ?: invalid_file();

  double particle_radius;
  fscanf(f, "%d %lf", &sim -> particle_count, &particle_radius) ?: invalid_file();
  sim -> particles = calloc(sim -> particle_count, sizeof(Particle));

  if(visualize)
  {
    printf("Abriendo la ventana del visualizador...\n");
    printf("Si logro abrir la ventana, tu programa se caerá silenciosamente :/\n");
    printf("Si no se abre nada y estás en WSL, asegurate de tener abierto xserver y haber hecho export DISPLAY\n");
    printf("Si no quieres abrir la ventana, llama al programa con el flag --novis al final\n");
    visualizer_open(height, width, sim -> particle_count);
  }

  for(int i = 0; i < sim -> particle_count; i++)
  {
    Particle p;
    p.body.radius = particle_radius;
    p.ID = i;
    p.intersected_segment = NULL;
    fscanf(f, "%lf %lf %lf %lf", &p.body.center.x, &p.body.center.y, &p.velocity.x, &p.velocity.y) ?: invalid_file();
    sim -> particles[i] = p;
  }

  visualizer_draw_particles(sim->particles, sim->particle_count);

  fscanf(f, "%d", &sim -> segment_count) ?: invalid_file();
  sim -> segments = calloc(sim -> segment_count, sizeof(Segment));

  visualizer_set_color(1,1,1);

  for(int i = 0; i < sim->segment_count; i++)
  {
    Segment seg;
    seg.ID = i;
    fscanf(f, "%lf %lf %lf %lf", &seg.pi.x, &seg.pi.y, &seg.pf.x, &seg.pf.y) ?: invalid_file();
    sim->segments[i] = seg;
    visualizer_draw_segment(sim->segments[i]);
  }

  fclose(f);

  return sim;
}

/** Libera todos los recursos asociados a la simulacion 
 * @param sim simulación construida por la función simulation_init_from_file()
 */
void   simulation_destroy(Simulation* sim)
{
  free(sim->particles);
  free(sim->segments);
  free(sim);
  visualizer_close();
}



// FUNCIONES CREADAS POR MI 

int partition(Segment* arreglo_partition ,int low, int high, int parametro){
  float comparar = 0;
  int i = (low-1);
  if (parametro == 0)
  {
    float pivote = (arreglo_partition[high].pi.x);
    for (int j = low; j < high; j++)
    {
      comparar = (arreglo_partition[j].pi.x);
      if (comparar <= pivote)
      {
        i ++;
        swap(&arreglo_partition[i], &arreglo_partition[j]);
      }
    }
  }
  else
  {
    float pivote = (arreglo_partition[high].pi.y);
    for (int j = low; j < high; j++)
    {
      comparar = (arreglo_partition[j].pi.y);
      if (comparar <= pivote)
      {
        i ++;
        swap(&arreglo_partition[i], &arreglo_partition[j]);
      }
    }
  }
  swap(&arreglo_partition[i+1], &arreglo_partition[high]);
  return (i+1);
}

void swap(Segment* a, Segment* b)
{
    Segment temp = *a;
    *a = *b;
    *b = temp;
}

// Funcion que calcula la mediana de un arreglo de segmentos, me retorna el ID del segmento que es la mediana
void median(Segment* segmentos, int lim_inf, int lim_sup, int largo_lista, int parametro){
  int i = 0; 
  int f = largo_lista;
  int index_median = largo_lista/2;
  int indice_partition = 0;
  indice_partition = partition(segmentos, i, f, parametro);
  while (indice_partition != index_median)
  {
    if (indice_partition < index_median)
    {
      i = indice_partition + 1;
    }
    else
    {
      f = indice_partition - 1;
    }
    indice_partition = partition(segmentos, i, f, parametro);
  }
  return;
}

BoundingBox find_max_min(Segment* segmentos, int largo_lista){
  float min_x = segmentos[0].pi.x , min_y = segmentos[0].pi.y , max_x = segmentos[0].pi.x , max_y = segmentos[0].pi.y;
  Vector min, max;
  BoundingBox box;

  for(int i = 0 ; i <= largo_lista; i++) {
    if(segmentos[i].pi.x < min_x)
    {
      min_x = segmentos[i].pi.x;
    }
    else if(segmentos[i].pi.x > max_x)
    {
      max_x = segmentos[i].pi.x;
    }
    if(segmentos[i].pi.y < min_y)
    {
      min_y = segmentos[i].pi.y;
    }
    else if(segmentos[i].pi.y > max_y)
    {
      max_y = segmentos[i].pi.y;
    }
    if(segmentos[i].pf.x < min_x)
    {
      min_x = segmentos[i].pf.x;
    }
    else if(segmentos[i].pf.x > max_x)
    {
      max_x = segmentos[i].pf.x;
    }
    if(segmentos[i].pf.y < min_y)
    {
      min_y = segmentos[i].pf.y;
    }
    else if(segmentos[i].pf.y > max_y)
    {
      max_y = segmentos[i].pf.y;
    }
  }
  max.x = max_x; max.y = max_y; min.x = min_x; min.y = min_y;
  box.max_point = max;
  box.min_point = min;
  srand(time(NULL));
  double r1 = (float) rand() / RAND_MAX , r2 = (float) rand() / RAND_MAX  , r3 = (float) rand() / RAND_MAX ;
  visualizer_set_color(r1,r2,r3);
  visualizer_draw_box(box);
  return box;
  
}

void sort_tree(Segment* segmentos, int numero_segmentos , kdTree* arbol, int parametro, int tipo_arbol){
  BoundingBox caja = find_max_min(segmentos, numero_segmentos-1);
  arbol->box_value = caja;
  arbol->num_segmentos = numero_segmentos;
  arbol->segmentos = segmentos;
  median(segmentos, arbol->indice_inicial, arbol->indice_final, numero_segmentos , parametro);
  if (numero_segmentos < 15){
    return;
  }
  if (parametro == 0)
  {
    parametro = 1;
  }
  else
  {
    parametro = 0;
  }
  kdTree* new_left_node = calloc(1, sizeof(kdTree));
  kdTree* new_right_node = calloc(1, sizeof(kdTree));
  arbol->left_son = new_left_node;
  arbol->right_son = new_right_node;
  arbol->left_son->indice_inicial = arbol->indice_inicial;
  arbol->right_son->indice_final = arbol->indice_final;
  if (arbol->indice_inicial == 0 || arbol->indice_final == numero_segmentos - 1)
  {
    arbol->left_son->indice_final = (numero_segmentos - 1)/2;
    arbol->right_son->indice_inicial = (numero_segmentos - 1)/2 + 1;
  }
  else 
  {
    if (tipo_arbol == 1)
    {
      arbol->left_son->indice_final = (arbol->indice_final - arbol->indice_inicial)/2;
      arbol->right_son->indice_inicial = (arbol->indice_final - arbol->indice_inicial)/2 + 1;
    }
    else if (tipo_arbol == 2)
    {
      arbol->left_son->indice_final = (arbol->indice_final + arbol->indice_inicial)/2;
      arbol->right_son->indice_inicial = (arbol->indice_final + arbol->indice_inicial)/2 + 1;
    }
  }
  if(numero_segmentos % 2 == 1){
    sort_tree(&segmentos[(numero_segmentos - 1)/2], (numero_segmentos - 1)/2 + 1, arbol->right_son, parametro, 2);
    sort_tree(segmentos, (numero_segmentos - 1)/2, arbol->left_son, parametro, 1);
  }
  else{
    sort_tree(&segmentos[numero_segmentos / 2], numero_segmentos/2, arbol->right_son, parametro, 2);
    sort_tree(segmentos, numero_segmentos/2, arbol->left_son, parametro, 1);
  }
  return;
}

bool colision_search(kdTree* node, Particle particle, Collision* colision){
  //Buscamos recursivamente las colisiones dentro del arbol
  bool esta_chocando_caja = particle_boundingbox_collision(particle, node->box_value);
  bool esta_chocanco_segmento = false;
  int contador = 0;
  if (esta_chocando_caja)
  {
    if (node->right_son != NULL)
    {
      colision_search(node->right_son, particle, colision);
    }
    if (node->left_son != NULL)
    {
      colision_search(node->left_son, particle, colision);
    }
    else
    {
      if (node->indice_inicial == 0)
      {
        contador = node->num_segmentos;
      }
      else
      {
        contador = node->num_segmentos - 1;
      }
      for (int i = 0; i <= contador; i++)
      {
        esta_chocanco_segmento = particle_segment_collision(particle, node->segmentos[i]);
        if (esta_chocanco_segmento)
        {
          if (!colision->choque || node->segmentos[i].ID < colision->segmento->ID)
          {
            colision->segmento = &node->segmentos[i];
            colision->choque = true;
          } 
        }
      }
    }
    if (colision->choque)
    {
      return true;
    }  
  }
  return false;
}
