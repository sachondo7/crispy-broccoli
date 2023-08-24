class ArticlesController < ApplicationController
    # para cada metodo que se cree en el controlador se debe crear una vista con el mismo nombre

    before_action :require_login, except: [:show, :index] 
    #se ejecuta el metodo require_login antes de ejecutar los metodos show, index, new, edit, create, update y destroy
    before_action :require_same_user, only: [:edit, :update, :destroy]

    def show #para buscar un articulo en especifico
        @article = Article.find(params[:id])
    end

    def index #para mostrar todos los articulos
        #@articles = Article.all #se buscan todos los articulos
        @articles = Article.paginate(page: params[:page], per_page: 5) #se buscan todos los articulos y se muestran de 5 en 5
    end

    def new #para crear un nuevo articulo
        @article = Article.new
    end

    def edit #para editar un articulo
        @article = Article.find(params[:id])
    end

    def create #para guardar un nuevo articulo
        # render plain: params[:article].inspect #para mostrar en pantalla los parametros que se envian desde el formulario
        @article = Article.new(params.require(:article).permit(:title, :description, category_ids: [])) #se crea un nuevo articulo con los parametros que se envian desde el formulario
        @article.user = current_user #se asigna el usuario que creo el articulo
        if @article.save #se guarda el articulo
            flash[:notice] = "Article was created successfully" #se crea un mensaje de exito
            redirect_to @article #se redirecciona a la pagina de articulos para ver los detalles del articulo creado
        else
            render 'new' #si no se guarda el articulo se redirecciona a la pagina de creacion de articulos
        end
    end

    def update #para actualizar un articulo
        @article = Article.find(params[:id]) 
        if @article.update(params.require(:article).permit(:title, :description, category_ids: [])) #se actualiza el articulo con los parametros que se envian desde el formulario
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

    private #metodos privados

    def require_same_user #metodo para verificar que el usuario que crea un articulo sea el mismo que lo edita
        if current_user != @article.user && !current_user.admin?
            flash[:alert] = "You can only edit or delete your own article"
            redirect_to @article
        end
    end

end