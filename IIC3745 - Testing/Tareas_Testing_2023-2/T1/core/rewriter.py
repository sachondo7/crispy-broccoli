from ast import *
from pprint import pprint
from astunparse import unparse

class RewriterCommand:
    def apply(self, ast):
        # Por defecto retorna el mismo AST sin ninguna modificacion
        return ast


def rewrite(commandClass, sourceCode):
    tree = parse(sourceCode)
    warnings = []
    # Se analiza el AST (tree) segun las reglas definidas en rewriter/__init__.py
    command = commandClass()
    tree = command.apply(tree)
    return unparse(tree)
