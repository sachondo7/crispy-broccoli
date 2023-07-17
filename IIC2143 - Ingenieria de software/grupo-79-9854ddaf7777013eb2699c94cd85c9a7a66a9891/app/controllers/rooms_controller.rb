# frozen_string_literal: true

# rubocop: disable Rails/I18nLocaleTexts
# rubocop: disable Metrics/MethodLength
class RoomsController < ApplicationController
  # GET /rooms
  def index
    @rooms = Room.all
    @publicacions = Publicacion.all
    @requests = Request.all
    @user = current_user
  end

  # GET /rooms/1
  def show
    @room = Room.find(params[:id])
    @user = current_user
    @messages = Message.all
    @users = User.all
  end

  # GET /rooms/new
  def new
    @room = Room.new
    @publicacion = Publicacion.find(params[:id])
  end

  # POST /rooms
  def create
    @room_params = params.require(:room).permit(:name, :id)
    @id = @room_params['id']
    @publicacion = Publicacion.find(@id)
    @room_params = { 'name' => @room_params['name'] }
    @room = Room.create(@room_params)
    @room.publicacion = @publicacion
    if @room.save
      redirect_to profile_path(current_user.id), notice: 'El chat se creó correctamente.'
    else
      render :new, notice: 'No se pudo crear el chat.'
    end
  end
end
# rubocop: enable Rails/I18nLocaleTexts
# rubocop: enable Metrics/MethodLength
