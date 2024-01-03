require 'application_system_test_case'

class ContactMessageControllerTest < ActionDispatch::IntegrationTest
  def setup
    @message = ContactMessage.create!(
      title: 'Title',
      body: 'Message body.',
      name: 'John Doe',
      mail: 'john@example.com',
      phone: '+56419518523'
    )
  end

  # Test crear method
  test 'should create message' do

    post "/contacto/crear", params: {
      contact: {
        title: 'New Title',
        body: 'New Message body.',
        name: 'New John Doe',
        mail: 'a@a.cl',
        phone: '+56419518523'
      }
    }

    # Check if the message was created
    message = ContactMessage.last
    assert_equal 'New Title', message.title
  end

  # Test crear method con error
  test 'should not create message' do

    post "/contacto/crear", params: {
      contact: {
        title: 'New Title',
        body: 'New Message body.',
        name: 'New John Doe',
        mail: 'a@a.cl',
        phone: 'esto no es un numero valido'
      }
    }

    # Check that the last message does not have the new title
    message = ContactMessage.last
    assert_equal 'Title', message.title
  end

  # Test mostrar method
  test 'should show contact message' do
    get contacto_path
    assert_response :success
  end

  test 'should not delete contact message' do

    @regular_user = User.create!(name: 'Admin User', password: 'Admin123!', email: 'admin@example.com', role: 'regular')

    login_as(@regular_user, scope: :user)

    delete "/contacto/eliminar/#{@message.id}"
    
    # Flash alert debe ser 'Debes ser un administrador para eliminar un mensaje de contacto.'
    assert_equal 'Debes ser un administrador para eliminar un mensaje de contacto.', flash[:alert]
  end

  test 'should delete contact message' do
    # Login as admin
    @admin_user = User.create!(name: 'Admin User', password: 'Admin123!', email: 'admin@example.com', role: 'admin')
    login_as(@admin_user, scope: :user)
    delete "/contacto/eliminar/#{@message.id}"
    
    # Flash notice debe ser 'Mensaje de contacto eliminado correctamente'
    assert_equal 'Mensaje de contacto eliminado correctamente', flash[:notice]
  end

  test 'should not delete contact message, because invalid id' do
    # Login as admin
    @admin_user = User.create!(name: 'Admin User', password: 'Admin123!', email: 'admin@example.com', role: 'admin')
    login_as(@admin_user, scope: :user)
    delete "/contacto/eliminar/id_invalido"
    
    # Flash notice debe ser 'Mensaje de contacto eliminado correctamente'
    assert_equal 'Error al eliminar el mensaje de contacto', flash[:alert]
  end

  test 'should not clean contact message' do

    @regular_user = User.create!(name: 'Admin User', password: 'Admin123!', email: 'admin@example.com', role: 'regular')

    login_as(@regular_user, scope: :user)
    
    delete "/contacto/limpiar"
    
    # Flash alert debe ser 'Debes ser un administrador para eliminar un mensaje de contacto.'
    assert_equal 'Debes ser un administrador para eliminar los mensajes de contacto.', flash[:alert]
  end

  test 'should limpiar contact message' do
    # Login as admin
    @admin_user = User.create!(name: 'Admin User', password: 'Admin123!', email: 'admin@example.com', role: 'admin')
    login_as(@admin_user, scope: :user)
    delete "/contacto/limpiar/"
    
    # Flash notice debe ser 'Mensaje de contacto eliminado correctamente'
    assert_equal 'Mensajes de contacto eliminados correctamente', flash[:notice]
  end

  test 'should not delete contact message, because no hay' do
    # Login as admin
    @admin_user = User.create!(name: 'Admin User', password: 'Admin123!', email: 'admin@example.com', role: 'admin')
    login_as(@admin_user, scope: :user)

    ContactMessage.destroy_all

    delete "/contacto/limpiar"
    
    # Flash notice debe ser 'Mensaje de contacto eliminado correctamente'
    assert_equal 'Error al eliminar los mensajes de contacto', flash[:alert]
  end

end
