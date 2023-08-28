#include "candidato.h"

//Función para inicializar un candidato
Candidato* candidato_init(int candidate_ID){
    Candidato* candidato = malloc(sizeof(Candidato));
    *candidato = (Candidato){
        .candidate_ID = candidate_ID,
        .inicio = NULL,
        .final = NULL,
        .active = true,
        .winner = false,
        .num_votos = 0,
    };
    return candidato;
    free(candidato);
}

//Función para inicializar cierto voto a un candidato
Candidate_votes* candidate_votes_init(int candidate_ID, Voter* voter){
    Candidate_votes* candidate_votes = malloc(sizeof(Candidate_votes));
    *candidate_votes = (Candidate_votes){
        .candidate_ID = candidate_ID,
        .voter = voter, 
        .next = NULL
    };
    return candidate_votes;
}

//Función que me agregue un votante a cierto candidato
void candidate_add_voter(Candidato* candidato, Candidate_votes* voto_candidato){
    if (candidato->inicio==NULL)
    {
        candidato->inicio = voto_candidato; 
        candidato->final = voto_candidato;  
    }
    else{
        candidato->final->next = voto_candidato;
        candidato->final = voto_candidato;
        candidato->final->next = NULL;
    }
    candidato -> num_votos ++;
    
}

void candidate_remove_voter(Candidato* candidato, Candidate_votes* voto_borrar, Candidate_votes* voto_anterior){
    //Si queremos eliminar el primer voto
    if (voto_anterior == voto_borrar)
    {
        candidato->inicio = voto_borrar->next;
    }
    //Si queremos eliminar un voto entre la lista ligada
    else{
        voto_anterior->next = voto_borrar->next;
    }
    //En el caso que queramos borrar el último voto
    if (voto_borrar->next==NULL)
    {
        candidato->final = voto_anterior;
    }
    candidato->num_votos -= 1;
}

//Funcion que me encuentra la distancia mínima
/*int find_min_dist(Candidato* candidato_fijo, Candidato* candidato_variable, int N_candidates){
    int dis1, dis2;
    int min_dis = 700;
    for (int i = 0; i < N_candidates; i++)
    {
        if (i == candidato_fijo->candidate_ID|| candidato_variable->active == false)
        {
            continue;
        }
        dis1 = N_candidates - abs(candidato_fijo->candidate_ID - i);
        dis2 = abs(candidato_fijo->candidate_ID - i);
        if (dis1 < min_dis || dis2 < min_dis)
        {
        if (dis1 < dis2)
        {
            min_dis = dis1;
        }
        else
        {
            min_dis = dis2;
        }
        candidato_variable->candidate_ID = i;
        dis1 = 0;
        dis2 = 0;
        }
    }
    return min_dis, candidato_fijo->candidate_ID, candidato_variable->candidate_ID;
}*/

//Función que le da los votantes de el candidato1 al candidato2
void candidate_give_votes(Candidato* candidato1, Candidato* candidato2, int cant_votos){    
    //Hay que pasar los cant_votos finales del candidato1 al candidato2
    Candidate_votes* voto_cand1 = candidato1->inicio;
    int restantes = candidato1->num_votos-cant_votos;
    //Tener en cuenta que cant_votos siempre sera menor que candidato1->num_votos;
    //Con este if obtengo el último voto del candidato1
    if (0 < restantes)
    {
        for (int i = 0; i < (restantes-1); i++)
        {
            voto_cand1 = voto_cand1->next;
        }
    }
    candidato2->final->next = voto_cand1->next;
    candidato1->num_votos = restantes;
    candidato1->final = voto_cand1;
    voto_cand1 = voto_cand1->next;
    voto_cand1->candidate_ID = candidato2->candidate_ID;
    //cambiamos los id de quienes le pertenecen los votos
    while (voto_cand1->next != NULL)
    {
        voto_cand1->candidate_ID = candidato2->candidate_ID;
        voto_cand1 = voto_cand1->next;
    }
    voto_cand1->candidate_ID = candidato2->candidate_ID;
    candidato1->final->next = NULL;
    for (int i = 0; i < cant_votos; i++)
    {
        candidato2->final = candidato2->final->next;
    }
    candidato2->num_votos += cant_votos;
    candidato2->final->next = NULL;    
}

//Función para eliminar candidato, donde todos los votos del candidato uno pasan al candidato 2 
void candidate_give_all_votes(Candidato* candidato1, Candidato* candidato2){
    Candidate_votes* voto_traspaso = candidato1->inicio;
    while (voto_traspaso->next != NULL)
    {
        voto_traspaso->candidate_ID = candidato2->candidate_ID;
        candidato2->final->next = voto_traspaso;
        candidato2->num_votos += 1;
        candidato2->final = voto_traspaso;
        voto_traspaso = voto_traspaso->next;
    } 
    candidato2->final->next->candidate_ID = candidato2->candidate_ID;
    candidato2->final = candidato2->final->next;
    candidato2->num_votos += 1;
    candidato2->final->next = NULL;
    candidato1->inicio = NULL;
    candidato1->final = NULL;
}


