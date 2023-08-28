#pragma once
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

typedef struct participant
{
    float participant_id;
    float participant_model;
    float average_lap_time;
    float victory_count; 
}Participant;

Participant* participant_init(float participant_id, float participant_model, float average_lap_time, float victory_count);

void quickSort(Participant *arreglo[], int low, int high, FILE* output_file, int parametro);

int partition_victory(Participant *arreglo_partition[], int low, int high, FILE* output_file);

int partition_lap(Participant *arreglo_partition[],int low, int high, FILE* output_file);

int partition_model(Participant *arreglo_partition[],int low, int high, FILE* output_file);

int partition_id(Participant *arreglo_partition[],int low, int high, FILE* output_file);

int find_repeated(Participant *arreglo[], int low, int high, int criterio);

void swap(Participant** participantes, int index1, int index2);
