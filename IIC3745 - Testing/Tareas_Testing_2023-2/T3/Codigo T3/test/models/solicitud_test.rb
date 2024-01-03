require 'test_helper'

class SolicitudTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'John1', password: 'Nonono123!', email: 'asdf@gmail.com', role: 'admin')
    @product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 10, user_id: @user.id, categories: 'Cancha')

    @solicitud = Solicitud.new(stock: 5, status: 'Pending', user_id: @user.id, product_id: @product.id)
  end

  test 'is valid with valid attributes' do
    assert @solicitud.valid?
  end

  test 'is not valid without stock' do
    @solicitud.stock = nil
    assert_not @solicitud.valid?
  end

  test 'is not valid with a non-integer stock' do
    @solicitud.stock = 5.5
    assert_not @solicitud.valid?
  end

  test 'is not valid with a stock less than or equal to 0' do
    @solicitud.stock = 0
    assert_not @solicitud.valid?
  end

  test 'is not valid without a status' do
    @solicitud.status = nil
    assert_not @solicitud.valid?
  end
end
