#pragma once
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct voter
{
    int voter_ID;
} Voter;

Voter* voter_init(int voter_ID);
void vote_added(Voter* voter, FILE* output_file);
void vote_destroy(Voter* vote);