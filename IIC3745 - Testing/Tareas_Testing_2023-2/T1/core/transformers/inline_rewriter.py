import ast
from core.rewriter import RewriterCommand

class InlineCommand(RewriterCommand):
    class VariableInlineTransformer(ast.NodeTransformer):
        def __init__(self):
            self.variable_assignments = {}

        def visit_Assign(self, node):
            if len(node.targets) == 1 and isinstance(node.targets[0], ast.Name):
                var_name = node.targets[0].id
                self.variable_assignments[var_name] = node.value
                return None  # Eliminar la asignación de variable
            return node

        def visit_Name(self, node):
            if node.id in self.variable_assignments:
                return self.variable_assignments[node.id]
            return node

        def visit_BinOp(self, node):
            node.left = self.visit(node.left)
            node.right = self.visit(node.right)
            return node

    def apply(self, node):
        transformer = self.VariableInlineTransformer()
        # Aplicar la transformación al árbol AST
        new_node = transformer.visit(node)
        # Aplicar la transformación nuevamente para manejar variables usadas más de una vez en expresiones
        new_node = transformer.visit(new_node)
        
        return new_node