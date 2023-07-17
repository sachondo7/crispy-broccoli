# frozen_string_literal: true

ActiveAdmin.register Publicacion do
  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # Uncomment all parameters which should be permitted for assignment
  #
  # permit_params :post_customer_name, :post_day, :post_direccion_salida, :post_direccion_llegada, :post_hora, :post_type, :post_limit_personas, :user_id
  #
  # or
  #
  # permit_params do
  #   permitted = [:post_customer_name, :post_day, :post_direccion_salida, :post_direccion_llegada, :post_hora, :post_type, :post_limit_personas, :user_id]
  #   permitted << :other if params[:action] == 'create' && current_user.admin?
  #   permitted
  # end
end
