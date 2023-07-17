# frozen_string_literal: true

class UsersController < ApplicationController
  def profile
    return redirect_to new_user_session_url if current_user.nil?

    @user = User.find(params[:id])
    @publicacions = Publicacion.all
    @resenas = Resena.all
  end

  def profiles
    @users = User.all
    @user = current_user
    @resenas = Resena.all
  end

  def delete
    @user = User.find(params[:id])
    @user.destroy
    redirect_to root_path
  end
end
