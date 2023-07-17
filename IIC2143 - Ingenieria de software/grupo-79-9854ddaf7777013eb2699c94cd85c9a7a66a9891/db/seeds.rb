# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

User.create(username: 'Seba', email: 'seba@gmail.com', password: '123456', address: 'Camino de Seba 123', phone: '988776655')
User.create(username: 'Mati', email: 'mati@gmail.com', password: '123456', address: 'Camino de Mati 123', phone: '988776655')
Publicacion.create(post_customer_name: 'Seba', post_day: '2022-06-18 00:00:00', post_direccion_salida: 'Casa Seba', post_direccion_llegada: 'San Joaquin', post_hora: '18:34:00', post_limit_personas: 2, created_at: "2022-06-07 22:31:55.466671", updated_at: '2022-06-07 22:31:55.466671', user_id: 1)
Publicacion.create(post_customer_name: 'Mati', post_day: '2022-06-18 00:00:00', post_direccion_salida: 'Casa Mati', post_direccion_llegada: 'Casa Central', post_hora: '18:34:00', post_limit_personas: 1, created_at: "2022-06-07 22:31:55.466671", updated_at: '2022-06-07 22:31:55.466671', user_id: 2)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
AdminUser.create!(email: 'admin1@example.com', password: 'password1', password_confirmation: 'password1')
AdminUser.create!(email: 'admin2@example.com', password: 'password2', password_confirmation: 'password2')
