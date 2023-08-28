#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "simulation.h"
#include "../visualizer/visualizer.h"

int main(int argc, char **argv)
{
  // Por defecto se abre la ventana
  bool visualize = true;
  if (argc == 4 && !strcmp(argv[3], "--novis"))
  {
    visualize = false;
  }
  else if (argc < 3 || argc >= 4)
  {
    printf("Modo de uso: %s INPUT OUTPUT [--novis]\n", argv[0]);
    printf("Donde:\n");
    printf("\tINPUT es la ruta al archivo de input que describe la escena\n");
    printf("\tOUTPUT es la ruta al archivo en donde se reportarán las colisiones\n");
    printf("\tEl flag opcional --novis indica que no se debe abrir la visualización del programa\n");
    // Exit code 1: Programa llamado sin todos los argumentos
    return 1;
  }

  // Inicializa los elementos de la simulación, y abre la ventana si visualize es true
  Simulation *sim = simulation_init_from_file(argv[1], visualize);
  // *sim es un puntero que me entrega la cantidad de frames, y un puntero a los arreglos de particulas y segmentos.

  // El archivo donde iremos reportando las colisiones
  FILE *output_file = fopen(argv[2], "w");


  //Inicializamos el arbol y recursivamente lo armamos con median
  kdTree *tree = calloc(1, sizeof(kdTree));
  tree->indice_inicial = 0;
  tree->indice_final = sim->segment_count - 1;
  tree->num_segmentos = tree->indice_final - tree->indice_inicial + 1; 
  tree->segmentos = sim->segments;
  sort_tree(sim->segments, sim->segment_count, tree, 1, 0);
  

    

  // Para cada frame
  for (int f = 0; f < sim->frames; f++)
  {
    // Para cada particula
    for (int p = 0; p < sim->particle_count; p++)
    {
      // Inicialmente, esta particula no ha chocado con ningun segmento
      sim->particles[p].intersected_segment = NULL;

      //CAMBIAR ACAAAAA//
      Collision collision;
      collision.choque = false;
      collision.choque = colision_search(tree, sim->particles[p], &collision);
      if (collision.choque != false)
      {
        if (!sim->particles[p].intersected_segment || collision.segmento->ID < sim->particles[p].intersected_segment->ID)
        {
          sim->particles[p].intersected_segment = collision.segmento;
        }
      } 
      // Si hubo intersección
      if (sim->particles[p].intersected_segment)
      {
        // Desviamos la partícula según el segmento con el que chocó
        particle_bounce_against_segment(&sim->particles[p], *sim->particles[p].intersected_segment);
        // Reportamos la colisión en el archivo de output
        fprintf(output_file, "%d %d %d\n", f, sim->particles[p].ID, sim->particles[p].intersected_segment->ID);
      }
      // Finalmente, la particula avanza
      particle_move(&sim->particles[p]);
    }
    // Si la ventana está abierta, dibujar las particulas en sus nuevas posiciones
    visualizer_draw_particles(sim->particles, sim->particle_count);
  }
  // Hace free de todo lo que se creo en simulation_init. Cierra la ventana.
  simulation_destroy(sim);

  fclose(output_file);

  return 0;
}
