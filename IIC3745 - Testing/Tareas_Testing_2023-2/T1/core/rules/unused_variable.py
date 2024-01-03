from ..rule import *


class UnusedVariableVisitor(WarningNodeVisitor):
    #  Implementar Clase
    def __init__(self):
        super().__init__()
        self.variables = []
        self.secondFunctionFounded = False
        self.moduleLenght = 0
        self.lastWarning = False

    def visit(self, node):
        # Get the lenght of the module
        if isinstance(node, Module):
            self.moduleLenght = node.body[0].end_lineno

        # Check if the node is a function def
        elif isinstance(node, FunctionDef):
            if self.secondFunctionFounded:
                # Logic for new warnings
                for variable in self.variables:
                    self.addWarning('UnusedVariable', variable[1], f'variable {variable[0]} has not been used')
                self.variables = []
            self.secondFunctionFounded = True

        # Check if the node is a variable creation
        elif isinstance(node, Assign):
            for target in node.targets:
                if isinstance(target, Name):
                    self.variables.append([target.id, node.lineno])

        # # check if is a function that uses a variable
        elif isinstance(node, Call):
            for arg in node.args:
                if isinstance(arg, Name):
                    # Remove arg.id from variables
                    self.variables = [variable for variable in self.variables if variable[0] != arg.id]

        # Check if the node is a OPERATION that uses a variable
        elif isinstance(node, BinOp):
            if isinstance(node.left, Name):
                # Remove node.left.id from variables
                self.variables = [variable for variable in self.variables if variable[0] != node.left.id]
            if isinstance(node.right, Name):
                # Remove node.right.id from variables
                self.variables = [variable for variable in self.variables if variable[0] != node.right.id]

        # Check if this is the last node to iter
        if hasattr(node, 'lineno') and isinstance(node, Call):
            if node.lineno == self.moduleLenght:
                for variable in self.variables:
                    self.addWarning('UnusedVariable', variable[1], f'variable {variable[0]} has not been used')
                self.lastWarning = True

        # Visit the children
        if not self.lastWarning:
            self.generic_visit(node)

class UnusedVariableTestRule(Rule):
    #  Implementar Clase
    def analyze(self, node):
        visitor = UnusedVariableVisitor()
        visitor.visit(node)
        self.warningsList = visitor.warningsList()
        return self.warnings()

    @classmethod
    def name(cls):
        return 'not-used-variable'
