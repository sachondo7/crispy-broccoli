require 'application_system_test_case'
require 'mocha/minitest'

class SolicitudControllerTest < ActionDispatch::IntegrationTest

  def setup
    @user = User.create!(name: 'John1', password: 'Nonono123!', email: 'asdf@gmail.com', role: 'admin')
    @reg_user = User.create!(name: 'John2', password: 'Nonono123!', email: 'asdf2@gmail.com', role: 'regular')
    @product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 10, user_id: @user.id, categories: 'Cancha')
    @solicitud = Solicitud.create!(stock: 5, status: 'Pending', user_id: @user.id, product_id: @product.id)
    @horario_disponible = "12/12/2023,10:00,12:00"
    @other_product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 10, user_id: @user.id, categories: 'Cancha', horarios: @horario_disponible)
  end

  # Probamos GET
  test 'should get index' do
    login_as(@reg_user, scope: :user)
    get '/solicitud/index'
    assert_response :success
  end

  test 'should not create solicitud with excessive stock' do
    login_as(@reg_user, scope: :user)
    post '/solicitud/insertar', params: { product_id: @product.id, solicitud: { stock: 11 } }
    assert_redirected_to "/products/leer/#{@product.id}"
    assert_equal 'No hay suficiente stock para realizar la solicitud!', flash[:error]
  end  

  test 'should not create solicitud and set error flash if validation fails' do
    login_as(@user, scope: :user)
    invalid_stock = 0 
    post '/solicitud/insertar', params: { product_id: @product.id, solicitud: { stock: invalid_stock, status: 'Pendiente' } }
    assert_redirected_to "/products/leer/#{@product.id}"
    assert_equal 'Hubo un error al guardar la solicitud!', flash[:error]
    assert_not Solicitud.exists?(stock: invalid_stock, user_id: @user.id, product_id: @product.id)
  end
  

  test 'should not create solicitud with invalid reservation time' do
    login_as(@reg_user, scope: :user)
    invalid_datetime = "2023-12-12T00:00:00" # Un horario que sabes que no es válido
    post '/solicitud/insertar', params: { product_id: @product.id, solicitud: { stock: 1, reservation_datetime: invalid_datetime } }
    assert_redirected_to "/products/leer/#{@product.id}"
    assert_equal 'El horario seleccionado no está disponible!', flash[:error]
  end

  test 'should set reservation_info with valid reservation time' do
    login_as(@user, scope: :user)
    valid_datetime = "2023-12-12T10:30:00" # Una hora que sabes que es válida según @horario_disponible
    post '/solicitud/insertar', params: { product_id: @other_product.id, solicitud: { stock: 1, reservation_datetime: valid_datetime } }
    assert_redirected_to "/products/leer/#{@other_product.id}"
    assert_not_nil assigns(:solicitud).reservation_info
    assert_equal "Solicitud de reserva para el día 12/12/2023, a las 10:30 hrs", assigns(:solicitud).reservation_info
  end
  

  test 'should update solicitud status' do
    login_as(@user, scope: :user) 
    @solicitud.save!
    patch "/solicitud/actualizar/#{@solicitud.id}", params: { solicitud: { status: 'Aprobada' } }
    assert_redirected_to '/solicitud/index'
    assert_equal 'Solicitud aprobada correctamente!', flash[:notice]
    @solicitud.reload
    assert_equal 'Aprobada', @solicitud.status
  end

  test 'should not update solicitud if database update fails' do
    login_as(@user, scope: :user)
    @solicitud.save!
    Solicitud.any_instance.stubs(:update).returns(false)
    patch "/solicitud/actualizar/#{@solicitud.id}"
    assert_redirected_to '/solicitud/index'
    assert_equal 'Hubo un error al aprobar la solicitud!', flash[:error]
    Solicitud.any_instance.unstub(:update)
  end
    

  test 'should delete solicitud and update product stock' do
    initial_stock = @product.stock
    login_as(@user, scope: :user)
    @solicitud.save!
    assert_difference 'Solicitud.count', -1 do
      delete "/solicitud/eliminar/#{@solicitud.id.to_s}"
    end
    assert_redirected_to '/solicitud/index'
    assert_equal 'Solicitud eliminada correctamente!', flash[:notice]
    @product.reload
    assert_equal initial_stock.to_i + @solicitud.stock, @product.stock.to_i
  end

  
  test 'should not delete solicitud if product update fails' do
    login_as(@user, scope: :user) 
    @solicitud.save!
    @product.nombre = nil
    @product.save(validate: false)
    delete "/solicitud/eliminar/#{@solicitud.id}"
    assert_redirected_to '/solicitud/index'
    assert_equal 'Hubo un error al eliminar la solicitud!', flash[:error]
  end
  
  


  
  
  
  

  
end
