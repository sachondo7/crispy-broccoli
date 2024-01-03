require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'John1', password: 'Nonono123!', email: 'asdf@gmail.com', role: 'admin')
    @product = Product.new(nombre: 'John1', precio: 4000, stock: 1, user_id: @user.id, categories: 'Cancha')
  end

  test 'is valid with valid attributes' do
    assert @product.valid?
  end

  test 'is not valid without a name' do
    @product.nombre = nil
    assert_not @product.valid?
  end

  test 'is not valid with a negative stock' do
    @product.stock = -1
    assert_not @product.valid?
  end

  test 'is not valid with a negative price' do
    @product.precio = -1
    assert_not @product.valid?
  end

  test 'is not valid without a user_id' do
    @product.user_id = nil
    assert_not @product.valid?
  end

  test 'is not valid with an invalid category' do
    @product.categories = 'Invalid Category'
    assert_not @product.valid?
  end
end
