class UsersController < ApplicationController
    
    def new
        @user = User.new
    end

    def create
        @user = User.new(user_params) #se crea un nuevo usuario con los parametros que se envian desde el formulario
        if @user.save #se guarda el usuario
            flash[:notice] = "User was created successfully, welcome #{@user.username}!" #se crea un mensaje de exito
            redirect_to articles_path #se redirecciona a la pagina de articulos para ver los articulos restantes
        else
            render 'new' #si no se guarda el usuario se redirecciona a la pagina de creacion de usuarios
        end
    end

    def edit
        @user = User.find(params[:id]) #se busca el usuario que se quiere editar
    end

    def update
        @user = User.find(params[:id]) #se busca el usuario que se quiere actualizar
        if @user.update(user_params) #se actualiza el usuario con los parametros que se envian desde el formulario
            flash[:notice] = "User was updated successfully" #se crea un mensaje de exito
            redirect_to articles_path #se redirecciona a la pagina de articulos para ver los articulos restantes
        else
            render 'edit' #si no se actualiza el usuario se redirecciona a la pagina de edicion de usuarios
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password) #se definen los parametros que se pueden enviar desde el formulario
    end

end