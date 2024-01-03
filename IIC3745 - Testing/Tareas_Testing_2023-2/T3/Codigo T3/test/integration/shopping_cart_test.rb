require 'application_system_test_case'
require 'mocha/minitest'

class ShoppingCartControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin_user = User.create!(name: 'John1', password: 'Nonono123!', email: 'asdf@gmail.com', role: 'admin')
    @reg_user = User.create!(name: 'John2', password: 'Nonono123!', email: 'asdf2@gmail.com', role: 'regular')
    @product1 = @reg_user.products.create!(categories: 'Cancha', nombre: 'Cancha de futbol', stock: 100, precio: 1000)
    @product2 = @reg_user.products.create!(categories: 'Suplementos', nombre: 'Proteina', stock: 50, precio: 500)
    @products = { @product1.id => 1, @product2.id => 2 }
    @shopping_cart = ShoppingCart.create!(user_id: @reg_user.id, products: {})
  end

  # Probamos metodo show sin productos
  test 'should redirect to carro' do
    # Iniciar sesion como usuario regular
    login_as(@reg_user, scope: :user)
    get '/carro/detalle'
    assert_response :redirect
  end

  # Probamos metodo show con productos
  test 'should show carro' do
    @shopping_cart.products = @products
    @reg_user.shopping_cart = @shopping_cart
    login_as(@reg_user, scope: :user)
    get '/carro/detalle'
    assert_response :success
  end

  # Probamos metodo show con productos, without login
  test 'should show carro without login' do
    get '/carro/detalle'
    assert_equal 'Debes iniciar sesión para comprar.', flash[:alert]
  end

  # Vista del carro de compras
  test 'should show carro view' do
      login_as(@admin_user, scope: :user)
      get '/carro'
      assert_response :success
  end

  # Vista del carro de compras
  test 'should show carro view without login' do
    login_as(@admin_user, scope: :user)

    get '/carro'
    assert_response :success
  end

  # Prueba de la acción 'details' sin inicio de sesión
  test 'should not show cart details without login' do
    get carro_detalle_path
    assert_response :redirect
    assert_redirected_to root_path
  end

  # Prueba de la acción 'insertar_producto' con usuario no autenticado
  test 'should not insert product without login' do
    post carro_insertar_producto_path, params: { product_id: @product1.id, add: { amount: 1 } }
    assert_response :redirect
    assert_equal 'Debes iniciar sesión para agregar productos al carro de compras.', flash[:alert]
  end

  # Prueba de la acción 'insertar_producto' con id de producto ya existente
  test 'should insert products' do
    login_as(@reg_user, scope: :user)
    post carro_insertar_producto_path, params: { product_id: @product1.id, add: { amount: 1 } }
    post carro_insertar_producto_path, params: { product_id: @product1.id, add: { amount: 1 } }
    assert_response :redirect

  end

  # Prueba de la acción 'insertar_producto' con mas de 8 productos
  test 'should insert products with limit' do
    # Iniciar sesion como usuario regular
    login_as(@reg_user, scope: :user)
    10.times do
      product_parcial = @admin_user.products.create!(categories: 'Cancha', nombre: 'Cancha de futbol', stock: 100, precio: 1000)
      post carro_insertar_producto_path, params: { product_id: product_parcial.id, add: { amount: 1 } }
    end
    assert_equal 'Has alcanzado el máximo de productos en el carro de compras (8). Elimina productos para agregar más o realiza el pago de los productos actuales.', flash[:alert]

  end

  # Prueba de la acción 'eliminar_producto' con producto inexistente en el carro
  test 'should not delete non-existent product' do
    login_as(@reg_user, scope: :user)
    assert_raises ActiveRecord::RecordNotFound do
      delete "/carro/eliminar_producto/#{Product.last.id + 1}"
    end
  end

  # Prueba de la acción 'limpiar' sin inicio de sesión
  test 'should not clear cart without login' do
    assert_raises NoMethodError do
      delete carro_limpiar_path
    end
  end

  # Prueba de la acción 'comprar_ahora' sin inicio de sesión
  test 'should not buy now without login' do
    post carro_comprar_ahora_path
    assert_response :redirect
    assert_equal 'Debes iniciar sesión para agregar productos al carro de compras.', flash[:alert]
  end

  # Prueba de la acción 'realizar_compra' sin inicio de sesión
  test 'should not complete purchase without login' do

    # post '/carro/realizar_compra' should raise error NoMethodError: undefined method `id' for nil:NilClass
    assert_raises NoMethodError do
      post '/carro/realizar_compra'
    end
    
  end

  # Prueba de la acción 'realizar_compra' con carro vacío
  test 'should not complete purchase with empty cart' do
    login_as(@reg_user, scope: :user)
    @shopping_cart.products = {} # Simula un carro vacío
    @shopping_cart.save!
    post '/carro/realizar_compra'
    assert_response :redirect
    assert_redirected_to '/carro'
    assert_equal 'No tienes productos en el carro de compras', flash[:alert]
  end

  # Prueba de la acción 'realizar_compra' con productos no disponibles
  test 'should not complete purchase with insufficient stock' do
    login_as(@reg_user, scope: :user)
    @product1.stock = 0 # Simula un producto sin stock
    @product1.save!

    @shopping_cart.products = { @product1.id => 1 } # Simula un carro con un producto sin stock
    @shopping_cart.save!

    @reg_user.shopping_cart = @shopping_cart

    post '/carro/realizar_compra'
    assert_response :redirect
    assert_redirected_to '/carro'
    assert_equal "Compra cancelada: El producto '#{@product1.nombre}' no tiene suficiente stock para realizar la compra. Por favor, elimina el producto del carro de compras o reduce la cantidad.", flash[:alert]
  end

  # Prueba de la acción 'comprar_ahora' con producto inexistente
  test 'should not buy now with non-existent product' do
    login_as(@reg_user, scope: :user)
    assert_raises ActionController::ParameterMissing do
      post '/carro/comprar_ahora', params: { product_id: 'nonexistent_id' }
    end
  end

  test 'should not add product to cart if insufficient stock' do
    login_as(@reg_user, scope: :user)
    @product1.stock = 1 # Asegúrate de que haya menos stock del que se intenta agregar
    @product1.save!  
    post carro_insertar_producto_path, params: { product_id: @product1.id, add: { amount: 2 } }
    assert_redirected_to root_path
    assert_equal "El producto '#{@product1.nombre}' no tiene suficiente stock para agregarlo al carro de compras.", flash[:alert]
  end

  test 'should not add product to cart if exceeds units limit per product' do
    login_as(@reg_user, scope: :user)
    @product1.stock = 200
    @product1.save!
    post carro_insertar_producto_path, params: { product_id: @product1.id, add: { amount: 101 } }
    assert_redirected_to root_path
    assert_equal "El producto '#{@product1.nombre}' tiene un máximo de 100 unidades por compra.", flash[:alert]
  end

  test 'should redirect to cart details when buy now' do
    login_as(@reg_user, scope: :user)
    post carro_comprar_ahora_path, params: { product_id: @product1.id, add: { amount: 1 } }
    assert_redirected_to '/carro/detalle'
  end

  test 'should not add product to cart if update fails' do
    login_as(@reg_user, scope: :user)
    ShoppingCart.any_instance.stubs(:update).returns(false)
    post carro_insertar_producto_path, params: { product_id: @product1.id, add: { amount: 1 } }
    assert_response :unprocessable_entity
    assert_equal 'Hubo un error al agregar el producto al carro de compras', flash[:alert]
    ShoppingCart.any_instance.unstub(:update)
  end

  test 'should delete existing product from cart' do
    login_as(@reg_user, scope: :user)
    @shopping_cart.products = { @product1.id.to_s => 1 }
    @shopping_cart.save!
    delete "/carro/eliminar_producto/#{@product1.id}"
    assert_redirected_to '/carro'
    assert_equal 'Producto eliminado del carro de compras', flash[:notice]
    @shopping_cart.reload
    assert_not @shopping_cart.products.key?(@product1.id.to_s)
  end

  test 'should not delete non-existent product from cart' do
    login_as(@reg_user, scope: :user)
    @shopping_cart.products = {}
    @shopping_cart.save!
    delete "/carro/eliminar_producto/#{@product1.id}"
    assert_redirected_to '/carro'
    assert_equal 'El producto no existe en el carro de compras', flash[:alert]
  end

  test 'should not delete product from cart if update fails' do
    login_as(@reg_user, scope: :user)
    @shopping_cart.products = { @product1.id.to_s => 1 }
    @shopping_cart.save!
    ShoppingCart.any_instance.stubs(:update).returns(false)
    delete "/carro/eliminar_producto/#{@product1.id}"
    assert_redirected_to '/carro'
    assert_equal 'Hubo un error al eliminar el producto del carro de compras', flash[:alert]
    ShoppingCart.any_instance.unstub(:update)
  end

  test 'should alert if no shopping cart found' do
    login_as(@reg_user, scope: :user)
    ShoppingCart.where(user_id: @reg_user.id).destroy_all
    post '/carro/realizar_compra'
    assert_redirected_to '/carro'
    assert_equal 'No se encontró tu carro de compras. Contacte un administrador.', flash[:alert]
  end

  test 'should complete purchase successfully and clear cart' do
    login_as(@reg_user, scope: :user)
    @shopping_cart.products = { @product1.id.to_s => 1 }
    @shopping_cart.save!
    ShoppingCart.any_instance.stubs(:crear_solicitudes).returns(true)
    post '/carro/realizar_compra'
    assert_redirected_to '/solicitud/index'
    assert_equal 'Compra realizada exitosamente', flash[:notice]
    ShoppingCart.any_instance.unstub(:crear_solicitudes)
  end

  test 'should alert if shopping cart update fails after purchase' do
    login_as(@reg_user, scope: :user)
    @shopping_cart.products = { @product1.id.to_s => 1 }
    @shopping_cart.save!
    ShoppingCart.any_instance.stubs(:crear_solicitudes).returns(true)
    ShoppingCart.any_instance.stubs(:update).returns(false)
    post '/carro/realizar_compra'
    assert_redirected_to '/carro'
    assert_equal 'Hubo un error al actualizar el carro. Contacte un administrador.', flash[:alert]
    ShoppingCart.any_instance.unstub(:crear_solicitudes)
    ShoppingCart.any_instance.unstub(:update)
  end

  test 'should clear shopping cart successfully' do
    login_as(@reg_user, scope: :user)
    @shopping_cart.products = { @product1.id.to_s => 1 }
    @shopping_cart.save!
    delete '/carro/limpiar'
    assert_redirected_to '/carro'
    assert_equal 'Carro de compras limpiado exitosamente', flash[:notice]
    @shopping_cart.reload
    assert_empty @shopping_cart.products
  end

  test 'should alert if shopping cart clearing fails' do
    login_as(@reg_user, scope: :user)
    @shopping_cart.products = { @product1.id.to_s => 1 }
    @shopping_cart.save!
    ShoppingCart.any_instance.stubs(:update).returns(false)  
    delete '/carro/limpiar'
    assert_redirected_to '/carro'
    assert_equal 'Hubo un error al limpiar el carro de compras. Contacte un administrador.', flash[:alert]
    ShoppingCart.any_instance.unstub(:update)
  end

  test 'should alert if purchase fails' do
    login_as(@reg_user, scope: :user)
    @shopping_cart.products = { @product1.id.to_s => 1 }
    @shopping_cart.save!
    Solicitud.any_instance.stubs(:save).returns(false)
    post '/carro/realizar_compra'
    assert_redirected_to '/carro'
    assert_equal 'Hubo un error al realizar la compra. Contacte un administrador.', flash[:alert]
    Solicitud.any_instance.unstub(:save)
  end

  test 'should complete purchase with address params' do
    login_as(@reg_user, scope: :user)
    @shopping_cart.products = { @product1.id.to_s => 1 }
    @shopping_cart.save!
    post '/carro/realizar_compra', params: { address: { nombre: 'Test Name', direccion: '123 Calle', comuna: 'Comuna Test', region: 'Region Test' } }
    solicitud = Solicitud.last
    assert_equal 'Aprobada', solicitud.status
  end

  test 'should handle error when creating a shopping cart' do
    # Save the original implementation of ShoppingCart#save
    original_save_method = ShoppingCart.instance_method(:save)
  
    # Stub the save method for any instance of ShoppingCart
    ShoppingCart.define_method(:save) { false }
  
    begin
      # The shopping cart is created when the user logs in
      @reg2_user = User.create!(name: 'John3', password: 'Nonono123!', email: 'asdf3@gmail.com', role: 'regular')

      login_as(@reg2_user, scope: :user)

      # Get carro path
      get '/carro'
  
      assert_redirected_to root_path
      assert_equal 'Hubo un error al crear el carro. Contacte un administrador.', flash[:alert]
    ensure
      # Restore the original implementation of ShoppingCart#save after the test
      ShoppingCart.define_method(:save, original_save_method)
    end
  end

end
