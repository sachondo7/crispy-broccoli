# frozen_string_literal: true

class MessagesController < ApplicationController
  # POST /messages
  def create
    @messages_params = params.permit(:content, :room_id, :user_id)
    @message = Message.create(@messages_params)
    @user = current_user
    @room = Room.find(params[:room_id])
    @message.save
    redirect_to rooms_show_path(id: @room.id)
  end
end
