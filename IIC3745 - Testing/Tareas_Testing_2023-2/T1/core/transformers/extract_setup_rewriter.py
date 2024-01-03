from ast import *
import ast
from core.rewriter import RewriterCommand

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

class AddSelfVisitor(NodeVisitor):
    #  Implementar Clase
    def __init__(self, variables):
        super().__init__()
        self.variables = variables

    def visit(self, node):
        # Check if the node is a variable in the list
        if isinstance(node, Name) and node.id in self.variables:
            # Change the node to self.variable
            node.id = "self." + node.id
        
        # Visit the children
        self.generic_visit(node)

class ExtractSetupVisitor(NodeVisitor):
    #  Implementar Clase
    def __init__(self):
        super().__init__()
        self.variables_functions = []
        self.variables_parciales = []
        self.repeated_lines = []
        self.functionFounded = False
        self.moduleLenght = 0

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
        elif isinstance(node, Assign) or isinstance(node, BinOp):

            # If the node is not a instance of Call, we need to check if the node is a variable creation
            self.variables_parciales.append(unparse(node).strip())

        # Check if this is the last node to iter (a asset)
        if hasattr(node, 'lineno') and isinstance(node, Call):
            if node.lineno == self.moduleLenght:
                self.variables_functions.append(self.variables_parciales)
                self.repeated_lines = common_prefix_lists(self.variables_functions)

        # Visit the children if they represent other line than the father
        self.generic_visit(node)

class ExtractSetupCommand(RewriterCommand):
    # Implementar comando, recuerde que puede necesitar implementar además clases NodeTransformer y/o NodeVisitor.
    def apply(self, node):

        # Get the variables to extract
        visitor = ExtractSetupVisitor()
        visitor.visit(node)
        repeated_lines = visitor.repeated_lines

        print(repeated_lines)

        # Check if there are variables to extract
        if len(repeated_lines) == 0:
            return node
        
         # Go through the node and delete the lines that are equal to the setup
        for line in repeated_lines:
            for son in node.body[0].body:
                # Visit his sons
                for subson in son.body:
                    # Check if the line is equal to the setup
                    #print(unparse(subson).strip())
                    if unparse(subson).strip() == line:
                        # Delete the line
                        son.body.remove(subson)

        # Create the setup, that is a function with all the repeated lines
        setup = FunctionDef(
            name='setUp',
            body=[],
            args=[arg(arg='self', annotation=None)],
            decorator_list=[],
            lineno=1,
            returns=None
        )

        # Get the name of the variables in repeated_lines
        variables = []
        for line in repeated_lines:
            variables.append(line.split("=")[0].strip())

        # Add the repeated lines to the setup
        for line in repeated_lines:
            # Parse the line
            line = parse(line)
            # Add the line to the setup
            setup.body.append(line.body[0])

        # Add the setup to the node
        node.body[0].body.insert(0, setup)

        # Agregamos self. a las variables con otro visitor
        newVis = AddSelfVisitor(variables)
        newVis.visit(node)

        print(unparse(node))

        return node
        
    @classmethod
    def name(cls):
        return 'extract-setup'