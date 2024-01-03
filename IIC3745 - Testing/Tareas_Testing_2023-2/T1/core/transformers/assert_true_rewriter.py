import ast
from core.rewriter import RewriterCommand

class AssertTrueRewriter(ast.NodeTransformer):
    def visit_Call(self, node):
        # Verifica si es una llamada a self.assertEquals(x, True)
        if (
            isinstance(node.func, ast.Attribute)
            and isinstance(node.func.value, ast.Name)
            and node.func.value.id == "self"
            and node.func.attr == "assertEquals"
            and len(node.args) == 2
            and isinstance(node.args[1], ast.NameConstant)
            and node.args[1].value is True
        ):
            # Crea una nueva llamada a self.assertTrue(x)
            new_node = ast.Call(
                func=ast.Attribute(
                    value=ast.Name(id="self", ctx=ast.Load()),
                    attr="assertTrue",
                    ctx=ast.Load(),
                ),
                args=[node.args[0]],
                keywords=[],
            )
            return ast.copy_location(new_node, node)

        return node

class AssertTrueCommand(RewriterCommand):
    def apply(self, node):
        rewriter = AssertTrueRewriter()
        return rewriter.visit(node)
