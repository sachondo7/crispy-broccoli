#include "node.h"

Node* node_create(int value){
    Node* node = (Node*)calloc(1, sizeof(Node));
    node->value = value;
    return node;
}

void insert_node(Node* root, Node* node){
    Node* actual_node = root;
    bool is_node_inserted = false;
    while(!is_node_inserted){
        if (actual_node->value > node->value){
            if (actual_node->left_child){
                actual_node = actual_node->left_child;
            } else {
                actual_node->left_child = node;
                is_node_inserted = true;
            }
        } else {
            if (actual_node->right_child){
                actual_node = actual_node->right_child;
            } else {
                actual_node->right_child = node;
                is_node_inserted = true;
            }
        }
    }
}

void print_tree(Node* node){
    printf("%d ", node->value);
    if (node->left_child) { print_tree(node->left_child); }
    if (node->right_child) { print_tree(node->right_child); }
}

void find_parent(Node* root, int value){
    Node* actual_node = root;
    while(actual_node){
        if (actual_node->value > value){
            if (actual_node->left_child->value == value){
                printf("%d", actual_node->value);
                break;
            }
            actual_node = actual_node->left_child;
        } else {
            if (actual_node->right_child->value == value){
                printf("%d", actual_node->value);
                break;
            }
            actual_node = actual_node->right_child;
        }
    }
}

void find_path(FILE* output_file , Node* root, int value){
    //Comenzamos desde la raíz
    Node* nodo_actual = root;
    bool encontro = false;
    while (nodo_actual != NULL)
    {
        if (nodo_actual-> value == value)
        {  
            fprintf(output_file, "%d ", nodo_actual->value);
            encontro = true;
            break;
        }
        else if (nodo_actual->value < value)
        {
            fprintf(output_file, "%d ", nodo_actual->value);
            nodo_actual = nodo_actual->right_child;
        }
        else
        { 
            fprintf(output_file, "%d ", nodo_actual->value);
            nodo_actual = nodo_actual->left_child;
        }
    }
    if (encontro == false)
    {
        fprintf(output_file, "X");
    }
}

void find_deep(FILE* output_file, Node* root, int value){
    Node* nodo_actual = root; 
    int profundidad = 0; 
    bool encontro = false;
    while (nodo_actual != NULL)
    {
        if (nodo_actual-> value == value)
        {  
            encontro = true; 
            break;
        }
        else if (nodo_actual->value < value)
        {
            nodo_actual = nodo_actual->right_child;
            profundidad += 1;
        }
        else
        { 
            nodo_actual = nodo_actual->left_child;
            profundidad += 1;
        }
    }
    if (encontro == false)
    {
        fprintf(output_file, "-1");
    }
    else
    {
        fprintf(output_file, "%d", profundidad);
    }
}

void order(FILE* output_file, Node* root){
    Node* nodo_actual = root;
    if (nodo_actual == NULL) {
		return;
	}
	order(output_file, root->left_child);
	fprintf(output_file, "%d ", root->value);
	order(output_file, root->right_child);
}

bool printLevel(FILE* output_file, Node* root, int level){
    if (root == NULL)
    {
        return false;
    }
    if (level == 0)
    {
        fprintf(output_file, "%d ", root->value);
        return true;
    }
    bool left = printLevel(output_file ,root->left_child, level - 1);
    bool right = printLevel(output_file, root->right_child, level - 1);
    return left || right;
}

void deep_order(FILE* output_file, Node* root){
    int level = 0;
    while (printLevel(output_file, root, level))
    {
        level++;
    }
}

void invert(FILE* output_file, Node* root){
    //hay que hacer alguna función para reasignar los punteros
    Node* nodo_actual = root;
    if (nodo_actual == NULL)
    {
        return;
    }
    Node* aux = root->left_child;
    root->left_child = root->right_child;
    root->right_child = aux;
    invert(output_file, root->left_child);
    invert(output_file, root->right_child);
}
