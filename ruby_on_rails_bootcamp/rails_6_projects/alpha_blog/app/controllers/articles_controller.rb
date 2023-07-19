class ArticlesController < ApplicationController
    # para cada metodo que se cree en el controlador se debe crear una vista con el mismo nombre
    def show #para buscar un articulo en especifico
        @article = Article.find(params[:id])
    end

    def index #para mostrar todos los articulos
        @articles = Article.all
    end

    def new #para crear un nuevo articulo
        @article = Article.new
    end

    def edit #para editar un articulo
        @article = Article.find(params[:id])
    end

    def create #para guardar un nuevo articulo
        # render plain: params[:article].inspect #para mostrar en pantalla los parametros que se envian desde el formulario
        @article = Article.new(params.require(:article).permit(:title, :description)) #se crea un nuevo articulo con los parametros que se envian desde el formulario
        if @article.save #se guarda el articulo
            flash[:notice] = "Article was created successfully" #se crea un mensaje de exito
            redirect_to @article #se redirecciona a la pagina de articulos para ver los detalles del articulo creado
        else
            render 'new' #si no se guarda el articulo se redirecciona a la pagina de creacion de articulos
        end
    end

    def update #para actualizar un articulo
        @article = Article.find(params[:id]) 
        if @article.update(params.require(:article).permit(:title, :description)) #se actualiza el articulo con los parametros que se envian desde el formulario
            flash[:notice] = "Article was updated successfully" #se crea un mensaje de exito
            redirect_to @article #se redirecciona a la pagina de articulos para ver los detalles del articulo actualizado
        else
            render 'edit' #si no se actualiza el articulo se redirecciona a la pagina de edicion de articulos
        end 
    end

    def destroy #para eliminar un articulo
        @article = Article.find(params[:id])
        @article.destroy
        redirect_to articles_path #se redirecciona a la pagina de articulos para ver los articulos restantes
    end

end