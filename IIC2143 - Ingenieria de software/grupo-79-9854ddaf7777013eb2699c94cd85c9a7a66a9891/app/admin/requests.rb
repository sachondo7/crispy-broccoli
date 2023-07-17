# frozen_string_literal: true

ActiveAdmin.register Request do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :requesting_name, :requested_name, :descripcion, :user_id, :estado, :publicacion_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:requesting_name, :requested_name, :descripcion, :user_id, :estado, :publicacion_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
end
