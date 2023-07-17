# frozen_string_literal: true

ActiveAdmin.register_page 'Dashboard' do
  menu priority: 1, label: proc { I18n.t('active_admin.dashboard') }

  
  content title: proc { I18n.t('active_admin.dashboard') } do
    div id: 'dashboard_default_message' do
      span do
      end
    end

      panel "Descripción" do
      para "¡Bienvenidos a la interfaz del Administrador! Acá podrás manejar todos los modelos de nuestra aplicación, tales como los Usuarios, Publicaciones, Reseñas y Solicitudes. Como Administrador, tienes el privilegio de ser capaz de editar, eliminar y crear elementos en cada uno de estos modelos. Con un gran poder viene una gran responsabilidad."
    end

    columns do
      column do
        panel "Usuarios" do
          ul do
            User.all.map do |user|
              li link_to(user.username, admin_user_path(user))
            end
          end
        end
      end
     end

     columns do
      column do
        panel "Publicaciones" do
          ul do
            Publicacion.all.map do |publicacion|
              li link_to(publicacion.user_id, admin_publicacion_path(publicacion))
            end
          end
        end
      end
     end
  end
end
