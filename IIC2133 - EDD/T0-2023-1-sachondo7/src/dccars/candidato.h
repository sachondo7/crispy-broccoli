#pragma once
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include "voter.h"


// creo elemento de lista ligada, que será del tipo Voter 
//Esto es mejor porque cada voto lo almaceno como una lista ligada, ya que cada votante tiene cantidad 
//variable de votos. 
typedef struct candidate_votes
{
    int candidate_ID;
    Voter* voter;
    struct candidate_votes* next;
} Candidate_votes;

//El struct de candidatos, como la cantidad es fija lo almacenamos en lista
typedef struct candidato
{
    int candidate_ID;
    Candidate_votes* inicio;
    Candidate_votes* final;
    bool active;
    bool winner;
    int num_votos; 
} Candidato;

Candidato* candidato_init(int candidate_ID);
Candidate_votes* candidate_votes_init(int candidate_ID, Voter* voter);
void candidate_add_voter(Candidato* candidato, Candidate_votes* voto_candidato);
void candidate_remove_voter(Candidato* candidato, Candidate_votes* voto_borrar, Candidate_votes* voto_anterior);
//int find_min_dist(Candidato* candidato_fijo, Candidato* candidato_variable, int N_candidates);
void candidate_give_votes(Candidato* candidato1, Candidato* candidato2, int cant_votos);
void candidate_give_all_votes(Candidato* candidato1, Candidato* candidato2);


