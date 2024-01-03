import ast
from ..rule import *

def common_prefix_lists(lists):
    if not lists:
        return []

    common_prefix = lists[0]

    for lst in lists[1:]:
        i = 0
        while i < len(common_prefix) and i < len(lst) and common_prefix[i] == lst[i]:
            i += 1
        common_prefix = common_prefix[:i]

    return common_prefix

class DuplicatedSetupVisitor(WarningNodeVisitor):
    #  Implementar Clase
    def __init__(self):
        super().__init__()
        self.variables_functions = []
        self.variables_parciales = []
        self.functionFounded = False
        self.moduleLenght = 0
        self.lastWarning = False

    def visit(self, node):
        # Get the lenght of the module
        if isinstance(node, Module):
            self.moduleLenght = node.body[0].end_lineno

        # Check if the node is a function def
        elif isinstance(node, FunctionDef):
            if self.functionFounded:
                # Add the variables of the second function to the list
                self.variables_functions.append(self.variables_parciales)
                self.variables_parciales = []
            self.functionFounded = True

        # Check if the node is a variable creation
        elif isinstance(node, Assign) or isinstance(node, Call) or isinstance(node, BinOp):
            self.variables_parciales.append(unparse(node).strip())

        # Check if this is the last node to iter (a asset)
        if hasattr(node, 'lineno') and isinstance(node, Call):
            if node.lineno == self.moduleLenght:
                self.variables_functions.append(self.variables_parciales)
                nrepetidos = len(common_prefix_lists(self.variables_functions))
                if nrepetidos > 0:
                    self.addWarning('DuplicatedSetup', nrepetidos, f'there are {nrepetidos} duplicated setup statements')
                self.lastWarning = True

        # Visit the children
        if not self.lastWarning:
            self.generic_visit(node)


class DuplicatedSetupRule(Rule):
    #  Implementar Clase
    def analyze(self, node):
        visitor = DuplicatedSetupVisitor()
        visitor.visit(node)
        self.warningsList = visitor.warningsList()
        return self.warnings()

    @classmethod
    def name(cls):
        return 'duplicate-setup'
