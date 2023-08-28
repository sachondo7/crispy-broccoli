#include "voter.h"

Voter* voter_init(int voter_ID){
    Voter* voter = malloc(sizeof(Voter));
    *voter = (Voter){
        .voter_ID = voter_ID
    };
    return voter;
}

void vote_added(Voter* voter, FILE* output_file){
    fprintf(output_file, "VOTO REGISTRADO %d\n", voter->voter_ID);
}

void vote_destroy(Voter* voter){
    free(voter);
}