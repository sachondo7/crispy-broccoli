from ..rule import *


class AssertionLessVisitor(WarningNodeVisitor):
    # Implementar Clase
    def __init__(self):
        super().__init__()
        self.lastDeclarationWasFunction = False
        self.lastDeclarationLine = 0
        self.moduleLenght = 0
        self.lastWarning = False

    def visit(self, node):

        if isinstance(node, Module):
            self.moduleLenght = node.body[0].end_lineno

        # Check if the node is a function def
        if isinstance(node, FunctionDef):
            if self.lastDeclarationWasFunction:
                self.addWarning('AssertionLessWarning', self.lastDeclarationLine, 'it is an assertion less test')
                self.lastDeclarationLine = node.lineno
            self.lastDeclarationWasFunction = True
            self.lastDeclarationLine = node.lineno

        # Check if the node is an assert
        elif isinstance(node, Expr) and isinstance(node.value, Call) and isinstance(node.value.func, Attribute):
                functionName = node.value.func.attr
                # If functionName starts with assert, then add a warning
                if functionName.startswith('assert'):
                    self.lastDeclarationWasFunction = False

        # Check if this is the last node to iter
        if hasattr(node, 'lineno'):
            if node.lineno == self.moduleLenght:
                if self.lastDeclarationWasFunction:
                    self.addWarning('AssertionLessWarning', self.lastDeclarationLine, 'it is an assertion less test')
                    self.lastWarning = True

        # Visit the children
        if not self.lastWarning:
            self.generic_visit(node)

class AssertionLessTestRule(Rule):
    #  Implementar Clase
    def analyze(self, node):
        visitor = AssertionLessVisitor()
        visitor.visit(node)
        self.warningsList = visitor.warningsList()
        return self.warnings()
        
    @classmethod
    def name(cls):
        return 'assertion-less'
