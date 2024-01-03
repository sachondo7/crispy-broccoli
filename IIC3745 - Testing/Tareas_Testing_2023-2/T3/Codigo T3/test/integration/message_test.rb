require 'application_system_test_case'

class MessageControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin_user = User.create!(name: 'John1', password: 'Nonono123!', email: 'asdf@gmail.com', role: 'admin')
    @regular_user = User.create!(name: 'John1', password: 'Nonono123!', email: 'asdft@gmail.com', role: 'regular')
    @product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 1, user_id: @regular_user.id, categories: 'Cancha')
    @message = Message.create!(body: 'Message Body', product_id: @product.id, user_id: @admin_user.id)
  end

  # Test insertar method
  test 'should insert message' do

    # Login as admin
    login_as(@admin_user, scope: :user)

    post '/message/insertar', params: { 
      message: { 
        body: "Message Body",
        ancestry: nil
      },
      product_id: @product.id
    }

    # Accept redirect
    follow_redirect!

    # Check if message was created
    message = Message.last

    assert_equal 'Message Body', message.body

  end

  # Test insertar method
  test 'should insert message error campos faltantes' do

    # Login as admin
    login_as(@admin_user, scope: :user)

    post '/message/insertar', params: { 
      message: { 
        ancestry: "hola"
      },
      product_id: @product.id
    }

    # Accept redirect
    follow_redirect!

    assert_equal 'Hubo un error al guardar la pregunta. ¡Completa todos los campos solicitados!', flash[:error]
  end

  # Test eliminar method
  test 'should delete message' do
    # Login as admin
    login_as(@admin_user, scope: :user)

    # Delete message
    delete "/message/eliminar", params: { message_id: @message.id, product_id: @product.id }

    # Expect redirect
    assert_redirected_to "/products/leer/#{@product[:id]}"
  end
end
