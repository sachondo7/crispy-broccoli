require 'application_system_test_case'

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(name: 'John1', password: '123456', email: 'test@example.com', role: 'regular')
  end

  # Probamos GET happy path
  test 'visiting index' do
    login_as(@user, scope: :user)
    get '/users/show'
    # Receive a 200 code
    assert_response :success

    # sign_out with device
    sign_out @user
  end

  # Probamos GET sin autenticacion
  test 'visiting index without login' do
    assert_raises ActionView::Template::Error do
      get '/users/show'
    end
  end

  # Probamos POST de user
  test 'create user' do
    get new_user_registration_path
    assert_response :success

    post user_registration_path, params: {
      user: {
        email: 'nuevo_usuario@example.com',
        name: 'nuevo_usuario',
        password: 'contraseña123',
        password_confirmation: 'contraseña123'
      }
    }

    # Verifica que el usuario se haya creado en la base de datos
    user = User.find_by(email: 'nuevo_usuario@example.com')
    assert_not_nil user

    # Verificar que se muestra el mensaje correcto en el notice
    assert_equal '¡Bienvenid@! Te has registrado exitosamente.', flash[:notice]
  end

  # Probamos POST de user con error, con contraseña muy corta
  test 'create user short password' do
    get new_user_registration_path
    assert_response :success

    post user_registration_path, params: {
      user: {
        email: 'nuevo_usuario@example.com',
        name: 'nuevo_usuario',
        password: 'c',
        password_confirmation: 'c'
      }
    }

    # Verifica que el usuario no se haya creado en la base de datos
    user = User.find_by(email: 'nuevo_usuario@example.com')
    assert_nil user
  end

  # Probamos POST de user con error, con usuario muy corto
  test 'create user short name' do
    get new_user_registration_path
    assert_response :success

    post user_registration_path, params: {
      user: {
        email: 'nuevo_usuario@example.com',
        name: 'n',
        password: '123456',
        password_confirmation: '123456'
      }
    }

    # Verifica que el usuario no se haya creado en la base de datos
    user = User.find_by(email: 'nuevo_usuario@example.com')
    assert_nil user
  end

  # Probamos PATCH de user para modificar información
  test 'update user' do
    # Log in as user
    login_as(@user, scope: :user)

    # Send a PATCH request to update the user's information
    patch user_registration_path, params: {
      user: {
        name: 'updated_name',
        email: 'update@update.cl',
        current_password: '123456',
        current_password_confirmation: '123456'
      }
    }

    # Reload the user from the database to get the latest data
    @user.reload

    assert_equal 'updated_name', @user.name
    assert_equal 'update@update.cl', @user.email

    # Log out (if applicable)
    sign_out @user
  end

  # Probamos DELETE de user
  test 'delete user' do
    # Log in as user
    login_as(@user, scope: :user)

    # Send a DELETE request to delete the user
    delete user_registration_path

    # Verifica que el usuario no existe
    User.find_by(email: 'test@example.com')

    sign_out @user
  end

  # Probamos DELETE cuando un usuario loggeado quiere eliminar a uno que no es el mismo
  test 'delete user with login but not the same user' do
    # Creamos un usuario nuevo
    user2 = User.create!(name: 'John2', password: '123456', email: 'test2@example.com', role: 'regular')

    # Log in as user
    login_as(@user, scope: :user)

    # Send a DELETE request to delete the user2
    delete user_registration_path(user2)

    # Verifica que el usuario aun existe
    User.find_by(email: 'test2@example.com')

    # Log out
    sign_out @user
  end

  # ---------------------------------------------------
  # Comenzamos a probar metodos
  # ---------------------------------------------------

  # Probamos el metodo 'deseados'
  test 'deseados' do
    # Log in as user
    login_as(@user, scope: :user)

    # Send a GET request to deseados
    get '/users/deseados'

    # Receive a 200 code
    assert_response :success

    # sign_out with device
    sign_out @user
  end

  # Probamos el metodo mensajes
  test 'mensajes' do
    # Log in as user
    login_as(@user, scope: :user)

    # Send a GET request to mensajes
    get '/users/mensajes'

    # Receive a 200 code
    assert_response :success

    # sign_out with device
    sign_out @user
  end

  # Probamos metodo actualizar_imagen
  test 'actualizar_imagen' do
    # Log in as user
    login_as(@user, scope: :user)

    # Send a POST request to actualizar_imagen
    patch user_actualizar_imagen_path, params: {
      image: fixture_file_upload('test_image.jpg', 'image/png')
    }

    # Receive a 302 code
    assert_response :redirect

    # sign_out with device
    sign_out @user
  end

  # Probamos metodo actualizar_imagen, con un error en el formato de imagen
  test 'actualizar_imagen error' do
    # Log in as user
    login_as(@user, scope: :user)

    # Send a POST request to actualizar_imagen, with invalid type
    patch user_actualizar_imagen_path, params: {
      image: fixture_file_upload('test_image.bin', 'image/bin')
    }

    # Check that falsh[:error] is not empty
    assert_not_empty flash[:error]
  end

  # Probamos metodo eliminar_deseado
  test 'eliminar_deseado' do
    # Creamos un usuario admin
    @user2 = User.create!(name: 'John1', password: '123456', email: 'test2@example.com', role: 'admin')

    # Creamos un producto
    producto = Product.create(nombre: 'John1', precio: 4000, stock: 1, user_id: @user2.id, categories: 'Cancha')

    # Log in as user
    login_as(@user, scope: :user)

    # Agregamos el producto a la lista de deseados
    @user.deseados << producto

    # Send a DELETE request to eliminar_deseado
    delete user_eliminar_deseado_path(producto.id)

    # Check that flash[:notice] is 'Producto quitado de la lista de deseados'
    assert_equal 'Producto quitado de la lista de deseados', flash[:notice]

    # sign_out with device
    sign_out @user
  end

  # Probamos metodo eliminar_deseado, cuando el usuario no tiene deseados
  test 'eliminar_deseado error' do
    # Creamos un usuario admin
    @user2 = User.create!(name: 'John1', password: '123456', email: 'test2@example.com', role: 'admin')

    # Creamos un producto
    producto = Product.create(nombre: 'John1', precio: 4000, stock: 1, user_id: @user2.id, categories: 'Cancha')

    # Log in as user
    login_as(@user, scope: :user)

    # No agregamos el producto a la lista de deseados
    # @user.deseados << producto

    # Send a DELETE request to eliminar_deseado
    delete user_eliminar_deseado_path(producto.id)

    # Check
    assert_equal 'Hubo un error al quitar el producto de la lista de deseados', flash[:error]

    # sign_out with device
    sign_out @user
  end
end
