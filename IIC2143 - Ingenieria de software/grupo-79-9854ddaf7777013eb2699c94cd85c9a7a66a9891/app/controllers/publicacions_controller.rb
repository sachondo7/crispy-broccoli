# frozen_string_literal: true

# rubocop:disable Rails/I18nLocaleTexts

class PublicacionsController < ApplicationController
  def new
    @publicacion = Publicacion.new
    @user = current_user
    @publicacion.user = @user
  end

  def create
    @publicacions_params = params.require(:publicacion).permit(:post_customer_name, :post_direccion_salida,
                                                               :post_direccion_llegada, :post_hora, :post_day, :post_limit_personas)
    @publicacion = Publicacion.create(@publicacions_params)
    @publicacion.user = current_user
    if @publicacion.save
      redirect_to profile_path(id: current_user.id), notice: 'Publicacion Creada'
    else
      redirect_to profile_path(id: current_user.id), notice: 'Error al crear Publicacion'
    end
  end

  def index
    @q = Publicacion.ransack(params[:q])
    @publicacions = @q.result
    @user = current_user
    @requests = Request.all
  end

  def show
    @user = current_user
    @publicacion = Publicacion.find(params[:id])
    @requests = Request.all
    @rooms = Room.all
  end

  def edit
    @publicacion = Publicacion.find(params[:id])
  end

  def update
    @publicacion = Publicacion.find(params[:id])
    @publicacion_new_params = params.require(:publicacion).permit(:post_customer_name, :post_direccion_salida,
                                                                  :post_direccion_llegada, :post_hora, :post_day, :post_limit_personas)

    if @publicacion.update(@publicacion_new_params)
      redirect_to profile_path(current_user.id), notice: 'Publicacion Editada'
    else
      redirect_to profile_path(current_user.id), notice: 'Error al editar Publicacion'
    end
  end

  def delete
    @publicacion = Publicacion.find(params[:id])
    @publicacion.destroy

    redirect_to profile_path(current_user.id), notice: 'Se elimino esta publicacion'
  end
end
# rubocop:enable Rails/I18nLocaleTexts
