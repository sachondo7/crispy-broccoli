require 'application_system_test_case'

class SystemTest < ApplicationSystemTestCase
  def setup
    
    @regular_user = User.create!(name: 'John1', password: 'Nonono123!', email: 'asdf@gmail.com',
                         role: 'regular')

    @admin_user = User.create!(name: 'John2', password: 'Nonono123!', email: 'asdf2@gmail.com', role: 'admin')
  end

  # ------------------- TESTS DE NAVEGACION ----------------------
  test 'register from landing page, and then visit my profile' do
    visit '/'
    # Find the button that said 'Regístrate'
    click_on 'Regístrate'

    # Fill the form
    fill_in 'user_name', with: 'John'
    fill_in 'user_email', with: 'jhon@gmail.com'
    fill_in 'user_password', with: 'Nonono123!'
    fill_in 'user_password_confirmation', with: 'Nonono123!'

    # Click on the button that says 'Registrarse'
    click_on 'Registrarse'

    # Find h1 that sais 'Mi cuenta'
    element = find('h1', text: 'Mi cuenta')

    # hover over the element and search for the a tag that sais 'Mi perfil'
    element.click

    # Should find h2 that sais 'Mis datos'
    assert_selector 'h2', text: 'Mis datos'
    
  end
  
  test 'login as regular user, send contact message and stay in the same page' do
    visit '/'

    # Click the a tag that sais 'Iniciar Sesión'
    click_on 'Iniciar Sesión'

    fill_in 'user_email', with: 'asdf@gmail.com'
    fill_in 'user_password', with: 'Nonono123!'
    find(:xpath, "//input[@name='commit']").click

    # Click the a tag that sais 'Contacto'
    click_on 'Contacto'

    # Fill the form
    # Fill the input contact[name]
    fill_in 'contact[name]', with: 'John'
    # Fill the input contact[mail]
    fill_in 'contact[mail]', with: 'asdf@gmail.com'
    # Fill the input contact[phone]
    fill_in 'contact[phone]', with: '+56987507237'
    # Fill the input contact[title]
    fill_in 'contact[title]', with: 'Hola'
    # Fill the input contact[body]
    fill_in 'contact[body]', with: 'Hola'

    # Click on the button that says 'Enviar'
    click_on 'Enviar'

    # We need to check that we stayed in the same page
    assert_selector 'h1', text: 'Contacto'
  end

  test 'login as admin user and check messages' do

    visit '/'
    click_on 'Iniciar Sesión'
    fill_in 'user_email', with: 'asdf2@gmail.com'
    fill_in 'user_password', with: 'Nonono123!'
    find(:xpath, "//input[@name='commit']").click

    # Hover in 'Mi cuenta'
    element = find('h1', text: 'Mi cuenta')
    element.hover

    # Click on the a tag that sais 'Mis mensajes'
    find('a', text: 'Mis mensajes').click

    # Check that there is a h1 with the text 'Buzón de mensajes'
    assert_selector 'h1', text: 'Buzón de mensajes'
  end

  # ------------------------------------------------------------------
  


  # ------------------- TESTS FORMULARIOS ----------------------------

  # FORMULARIO CREACION DE PRODUCTOS
    test 'login as admin, create product and check that it is in the index' do
        visit '/'
        click_on 'Iniciar Sesión'
        fill_in 'user_email', with: 'asdf2@gmail.com'
        fill_in 'user_password', with: 'Nonono123!'
        find(:xpath, "//input[@name='commit']").click

        # Hover on dropdown that sais 'Productos'
        element = find('a', text: 'Productos')
        element.hover

        # Click on the button that sais 'Crear Producto'
        find('a', text: 'Crear producto').click

        # Fill product[nombre], product[precio], product[stock]
        fill_in 'product[nombre]', with: 'Producto1'
        fill_in 'product[precio]', with: '1000'
        fill_in 'product[stock]', with: '10'

        # Click on the button that sais 'Guardar'
        click_on 'Guardar'

        #Find p with text 'Producto1'
        assert_selector 'p', text: 'Producto1'
    end


    test 'login as admin, create product with no name and check it raises a error' do
        visit '/'
        click_on 'Iniciar Sesión'
        fill_in 'user_email', with: 'asdf2@gmail.com'
        fill_in 'user_password', with: 'Nonono123!'
        
        # Click on iniciar sesion button
        find(:xpath, "//input[@name='commit']").click

        # Hover on dropdown that sais 'Productos'
        element = find('a', text: 'Productos')
        element.hover

        # Click on the button that sais 'Crear Producto'
        find('a', text: 'Crear producto').click

        # Fill product[nombre], product[precio], product[stock]
        fill_in 'product[precio]', with: '1000'
        fill_in 'product[stock]', with: '10'

        # Click on the button that sais 'Guardar'
        click_on 'Guardar'

        # Check that there is not a div that sais 'Mensaje de contacto enviado correctamente'
        assert_no_selector 'div', text: 'Mensaje de contacto enviado correctamente'
    end

    test 'login as admin, create product with negative price and check it raises a error' do
        visit '/'
        click_on 'Iniciar Sesión'
        fill_in 'user_email', with: 'asdf2@gmail.com'
        fill_in 'user_password', with: 'Nonono123!'
        find(:xpath, "//input[@name='commit']").click

        # Hover on dropdown that sais 'Productos'
        element = find('a', text: 'Productos')
        element.hover

        # Click on the button that sais 'Crear Producto'
        find('a', text: 'Crear producto').click

        # Fill product[nombre], product[precio], product[stock]
        fill_in 'product[nombre]', with: 'Producto1'
        fill_in 'product[precio]', with: '-1000'
        fill_in 'product[stock]', with: '10'

        # Click on the button that sais 'Guardar'
        click_on 'Guardar'

        # Check that appears a div that sais 'Hubo un error al guardar el producto: Precio: debe ser mayor que o igual a 0'
        assert_selector 'div', text: 'Hubo un error al guardar el producto: Precio: debe ser mayor que o igual a 0'
    end

    test 'login as admin, create product with stock as a string and check it raises a error' do
        visit '/'
        click_on 'Iniciar Sesión'
        fill_in 'user_email', with: 'asdf2@gmail.com'
        fill_in 'user_password', with: 'Nonono123!'
        find(:xpath, "//input[@name='commit']").click

        # Hover on dropdown that sais 'Productos'
        element = find('a', text: 'Productos')
        element.hover

        # Click on the button that sais 'Crear Producto'
        find('a', text: 'Crear producto').click

        # Fill product[nombre], product[precio], product[stock]
        fill_in 'product[nombre]', with: 'Producto1'
        fill_in 'product[precio]', with: '-1000'
        fill_in 'product[stock]', with: 'error'

        # Click on the button that sais 'Guardar'
        click_on 'Guardar'

        # Check that appears a div that sais 'Hubo un error al guardar el producto: Precio: debe ser mayor que o igual a 0'
        assert_selector 'div', text: 'Hubo un error al guardar el producto: Stock: no es un número'
    end

    # FORMULARIO CONTACT MESSAGE
    test 'login as regular user, and send contact message' do
        visit '/'
        click_on 'Iniciar Sesión'
        fill_in 'user_email', with: 'asdf@gmail.com'
        fill_in 'user_password', with: 'Nonono123!'
        find(:xpath, "//input[@name='commit']").click
    
        # Click the a tag that sais 'Contacto'
        click_on 'Contacto'
    
        # Fill the form
        # Fill the input contact[name]
        fill_in 'contact[name]', with: 'John'
        # Fill the input contact[mail]
        fill_in 'contact[mail]', with: 'asdf@gmail.com'
        # Fill the input contact[phone]
        fill_in 'contact[phone]', with: '+56987507237'
        # Fill the input contact[title]
        fill_in 'contact[title]', with: 'Hola'
        # Fill the input contact[body]
        fill_in 'contact[body]', with: 'Hola'
    
        # Click on the button that says 'Enviar'
        click_on 'Enviar'
    
        # Check that there is a div that sais 'Mensaje de contacto enviado correctamente'
        assert_selector 'div', text: 'Mensaje de contacto enviado correctamente'
      end

      test 'login as regular user, and send contact message with incorrect phone number' do
        visit '/'
        click_on 'Iniciar Sesión'
        fill_in 'user_email', with: 'asdf@gmail.com'
        fill_in 'user_password', with: 'Nonono123!'
        find(:xpath, "//input[@name='commit']").click
    
        # Click the a tag that sais 'Contacto'
        click_on 'Contacto'
    
        # Fill the form
        # Fill the input contact[name]
        fill_in 'contact[name]', with: 'John'
        # Fill the input contact[mail]
        fill_in 'contact[mail]', with: 'asdf@gmail.com'
        # Fill the input contact[phone]
        fill_in 'contact[phone]', with: '123456'
        # Fill the input contact[title]
        fill_in 'contact[title]', with: 'Hola'
        # Fill the input contact[body]
        fill_in 'contact[body]', with: 'Hola'
    
        # Click on the button that says 'Enviar'
        click_on 'Enviar'
    
        # Check that there is a div that sais 'Error al enviar el mensaje de contacto: Phone: El formato del teléfono debe ser +56XXXXXXXXX'
        assert_selector 'div', text: 'Error al enviar el mensaje de contacto: Phone: El formato del teléfono debe ser +56XXXXXXXXX'
      end

      test 'login as regular user, and send contact message with incorrect mail' do
        visit('/')
        click_on('Iniciar Sesión')
        fill_in('user_email', with: 'asdf@gmail.com')
        fill_in('user_password', with: 'Nonono123!')
        find(:xpath, "//input[@name='commit']").click
      
        # Click the a tag that sais 'Contacto'
        click_on('Contacto')
      
        # Fill the form
        # Fill the input contact[name]
        fill_in('contact[name]', with: 'John')
        # Fill the input contact[mail] with an empty value
        fill_in('contact[mail]', with: '')
        # Fill the input contact[phone]
        fill_in('contact[phone]', with: '+56987507237')
        # Fill the input contact[title]
        fill_in('contact[title]', with: 'Hola')
        # Fill the input contact[body]
        fill_in('contact[body]', with: 'Hola')
      
        # Click on the button that says 'Enviar'
        click_on('Enviar')
      
        # Check that there is not a div that sais 'Mensaje de contacto enviado correctamente'
        assert_no_selector 'div', text: 'Mensaje de contacto enviado correctamente'
      end

end
