from ..rule import *

class AssertionTrueVisitor(WarningNodeVisitor):

    def __init__(self):
        self.variables = {}
        super().__init__()

    def visit(self, node):
        # If node is a instance of a WarningNodeVisitor
        if isinstance(node, Expr) and isinstance(node.value, Call) and isinstance(node.value.func, Attribute):
                if node.value.func.attr == 'assertTrue':
                    # If inside the assertTrue is a boolean true or a variable that is a boolean true
                    # then add a warning
                    if isinstance(node.value.args[0], NameConstant) and node.value.args[0].value == True:
                         self.addWarning('AssertTrueWarning', node.lineno, 'useless assert true detected')
                    elif isinstance(node.value.args[0], Name) and self.variables[node.value.args[0].id] == True:
                            self.addWarning('AssertTrueWarning', node.lineno, 'useless assert true detected')
        # If the node is a variable, then add it to the list of variables
        elif isinstance(node, Assign) and isinstance(node.value, NameConstant):
            # If the variable is a boolean, then add it to the list of variables
            self.variables[node.targets[0].id] = node.value.value
                                  
        self.generic_visit(node)
        
class AssertionTrueTestRule(Rule):
    #  Implementar Clase
    def analyze(self, node):
        visitor = AssertionTrueVisitor()
        visitor.visit(node)
        self.warningsList = visitor.warningsList()
        return self.warnings()
        
    @classmethod
    def name(cls):
        return 'assertion-true'
