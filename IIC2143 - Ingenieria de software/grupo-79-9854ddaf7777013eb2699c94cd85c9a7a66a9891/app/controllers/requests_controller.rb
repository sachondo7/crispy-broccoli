# frozen_string_literal: true

# rubocop:disable Rails/I18nLocaleTexts
# rubocop:disable Metris/AbcSize
class RequestsController < ApplicationController
  def index
    @requests = Request.all
  end

  def new
    @request = Request.new
    # @publicacion = Publicacion.find(params[:id])

    @request.publicacion = Publicacion.find(params[:id])
  end

  def create
    @requests_params = params.require(:request).permit(:publicacion_id, :requesting_name,
                                                       :requested_name, :descripcion, :estado)
    @request = Request.create(@requests_params)
    @request.user = current_user
    if @request.save
      redirect_to publicacions_index_path, notice: 'Se creo la solicitud al turno'
    else
      redirect_to publicacions_index_path, notice: 'Error al crear solicitud para el turno'
    end
  end

  def delete
    @request = Request.find(params[:id])
    @request.destroy

    redirect_to requests_index_path, notice: 'Se elimino la solicitud'
  end

  def show
    @request = Request.find(params[:id])
    @publicacion = params[:id]
  end

  def update
    @request = Request.find(params[:id])
    @estado = params[:estado]
    @request.estado = @estado
    @request_new_params = { 'publicacion_id' => @request.publicacion_id, 'requesting_name' => @request.requesting_name, 'requested_name' => @request.requested_name,
                            'descripcion' => @request.descripcion, 'estado' => params[:estado] }

    if @request.update(@request_new_params)
      redirect_to profile_path(current_user.id), notice: 'Solicitud actualizada!'
    else
      redirect_to profile_path(current_user.id), notice: 'No se pudo actualizar la solicitud'
    end
  end
end
# rubocop:enable Rails/I18nLocaleTexts
# rubocop:enable Metris/AbcSize
