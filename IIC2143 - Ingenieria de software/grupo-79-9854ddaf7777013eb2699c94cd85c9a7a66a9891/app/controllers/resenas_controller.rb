# frozen_string_literal: true

# rubocop:disable Rails/I18nLocaleTexts
# rubocop:disable Metrics/AbcSize
class ResenasController < ApplicationController
  def index; end

  def new
    @resena = Resena.new
    @user = current_user
    @user_calificado = params[:receptor]
  end

  def create
    # Esto que esta abajo es la solucion del problema que teniamos, alfinal cree los parametros a mano
    @resena_params = { 'calificacion' => params[:calificacion], 'texto' => params[:texto], 'emisor' => params[:emisor], 'receptor' => params[:receptor] }
    @user = current_user
    @resena = Resena.create(@resena_params)
    @resena.user = @user
    if @resena.save
      redirect_to profiles_path, notice: 'Se envió la reseña correctamente.'
    else

      redirect_to profiles_path, notice: @resena.errors
    end
  end

  def edit
    @resena = Resena.find(params[:id])
  end

  def update
    @resena = Resena.find(params[:id])
    @resena_new_params = params.require(:resena).permit(:calificacion, :texto, :emisor, :receptor, :user_id)
    if @resena.update(@resena_new_params)
      redirect_to profiles_path, notice: 'Reseña Editada'
    else
      redirect_to profiles_path, notice: 'Error al editar Reseña'
    end
  end

  def delete
    @resena = Resena.find(params[:id])
    @resena.destroy

    redirect_to profiles_path, notice: 'Se elimino la reseña'
  end
end
# rubocop:enable Rails/I18nLocaleTexts
# rubocop:enable Metrics/AbcSize
