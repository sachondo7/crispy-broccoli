require 'application_system_test_case'

class ProductsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin_user = User.create!(name: 'Admin User', password: 'Admin123!', email: 'admin@example.com', role: 'admin')
    @product = Product.create!(nombre: 'John1', precio: 4000, stock: 1, user_id: @admin_user.id, categories: 'Cancha',
                               horarios: '10:00;20:00')
    @product_sin_h = Product.create!(nombre: 'John1', precio: 4000, stock: 1, user_id: @admin_user.id,
                                     categories: 'Cancha', horarios: nil)
    @review = Review.create!(tittle: 'Review Title', description: 'Review Description', calification: '5',
                             product_id: @product.id, user_id: @admin_user.id)
    @reg_user = User.create!(name: 'John1', password: '123456', email: 'test@example.com', role: 'regular')
    @product2 = Product.create!(nombre: 'John1', precio: 4000, stock: 1, user_id: @reg_user.id, categories: 'Cancha',
                                horarios: '10:00;20:00')
  end

  # Probamos GET happy path
  test 'should get index' do
    # Login
    login_as(@admin_user, scope: :user)

    get "/products/leer/#{@product[:id]}"
    assert_response :success

    # Logout
    sign_out @admin_user
  end

  # Probamos GET sin autenticacion, debiese funcionar igual
  test 'should get index without authentication' do
    get "/products/leer/#{@product[:id]}"
    assert_response :success
  end

  # Probamos POST de un product
  test 'should create product' do
    # Login
    login_as(@admin_user, scope: :user)

    post products_insertar_path, params: {
      product: {
        nombre: 'New Product',
        precio: 200,
        stock: 5,
        categories: 'Cancha'
      }
    }

    # Verificar que se haya creado
    product = Product.find_by(nombre: 'New Product')
    assert_not_nil product

    # Logout
    sign_out @admin_user
  end

  # Probamos POST de un product, con atributos invalidos
  test 'should not create product, with invalid atributes' do
    # Login
    login_as(@admin_user, scope: :user)

    post products_insertar_path, params: {
      product: {
        nombre: 'test_prod',
        precio: -200,
        stock: 5,
        categories: 'Canchaaaaaaa'
      }
    }

    # Verificar que se haya creado
    product = Product.find_by(nombre: 'test_prod')
    assert_nil product

    # Logout
    sign_out @admin_user
  end

  # Probamos POST de un product, sin ser admins
  test 'should not create product, without admin' do
    # Login
    login_as(@reg_user, scope: :user)

    post products_insertar_path, params: {
      product: {
        nombre: 'New Product',
        precio: 200,
        stock: 5,
        categories: 'Cancha'
      }
    }

    # Verificar que se haya creado
    product = Product.find_by(nombre: 'New Product')
    assert_nil product
  end

  # Probamos PATCH de un product
  test 'should update product' do
    # Login
    login_as(@admin_user, scope: :user)

    url_p = "/products/actualizar/#{@product[:id]}"

    patch url_p, params: {
      product: {
        nombre: 'Product 2',
        precio: 200,
        stock: 5,
        categories: 'Cancha'
      }
    }

    # Verificar que se haya modificado
    product = Product.find_by(nombre: 'Product 2')
    assert_not_nil product
  end

  # Probamos PATCH de un product, con atributos invalidos
  test 'should not update product with invalid data' do
    # Login
    login_as(@admin_user, scope: :user)

    url_p = "/products/actualizar/#{@product[:id]}"

    patch url_p, params: {
      product: {
        nombre: 'Product 2',
        precio: 'hola',
        stock: -5,
        categories: 'Canchaaaaaaa'
      }
    }

    # Verificar que se haya modificado
    product = Product.find_by(nombre: 'Product 2')
    assert_nil product
  end

  # Probamos PATCH de un product, con reg user
  test 'should not update product with regular user' do
    # Login
    login_as(@reg_user, scope: :user)

    url_p = "/products/actualizar/#{@product2[:id]}"

    patch url_p, params: {
      product: {
        nombre: 'Product 2',
        precio: 'hola',
        stock: -5,
        categories: 'Canchaaaaaaa'
      }
    }

    # Verificar que no se haya modificado
    product = Product.find_by(nombre: 'Product 2')
    assert_nil product
  end

  # Probamos DELETE de un product
  test 'should delete product' do
    # Login
    login_as(@admin_user, scope: :user)

    delete "/products/eliminar/#{@product[:id]}"

    # Verificar que se haya eliminado
    product = Product.find_by(nombre: 'John1')

    assert_not_nil product
  end

  # Probamos DELETE de un product, sin ser admins
  test 'should not delete product, without admin' do
    # Login
    login_as(@reg_user, scope: :user)

    delete "/products/eliminar/#{@product2[:id]}"

    # Verificar que NO se haya eliminado
    product = Product.find_by(nombre: 'John1')
    assert_not_nil product
  end

  # ---------------------------------------------------
  # Comenzamos a probar metodos
  # ---------------------------------------------------

  # Get index
  test 'should get index of prod' do
    get '/products/index'
    assert_response :success
  end

  # Get index with :category
  test 'should get index with category' do
    get '/products/index', params: { category: 'Cancha' }
    assert_response :success
  end

  # Get index with :search
  test 'should get index with search' do
    get '/products/index', params: { search: 'John1' }
    assert_response :success
  end

  # Get index with :search and :category
  test 'should get index with search and category' do
    get '/products/index', params: { search: 'John1', category: 'Cancha' }
    assert_response :success
  end

  test 'should get create products view' do
    login_as(@admin_user, scope: :user)

    get '/products/crear'

    assert_response :success

    # Logout
    sign_out @admin_user
  end

  # Get de product sin horarios y sin reviews
  test 'should get product without horarios' do
    get "/products/leer/#{@product_sin_h[:id]}"
    assert_response :success
  end

  # Insertar producto en deseados
  test 'should insert product in deseados' do
    # Login
    login_as(@reg_user, scope: :user)

    post "/products/insert_deseado/#{@product_sin_h[:id]}"
  end

  # Insertar producto en deseados, sin product id
  test 'should insert product in deseados without id' do
    # Login
    login_as(@reg_user, scope: :user)

    post "/products/insert_deseado/id_invalido"
  end

  # Insertar producto en deseados, sin lista de deseados
  test 'should insert product in deseados without deseados list' do
    # Login
    login_as(@reg_user, scope: :user)

    @reg_user.deseados = nil

    post "/products/insert_deseado/#{@product_sin_h[:id]}"
  end


  test 'should get update products view' do
    login_as(@admin_user, scope: :user)

    # Get id of product @product
    id = @product[:id]

    get '/products/actualizar/' + id.to_s

    assert_response :success

    # Logout
    sign_out @admin_user
  end




end
