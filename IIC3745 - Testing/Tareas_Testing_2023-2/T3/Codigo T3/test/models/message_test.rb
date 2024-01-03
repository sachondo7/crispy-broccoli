require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'John1', password: 'Nonono123!', email: 'asdf@gmail.com', role: 'admin')
    @product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 1, user_id: @user.id, categories: 'Cancha')

    @message = Message.new(body: 'Message Body', product_id: @product.id, user_id: @user.id)
  end

  test 'is valid with valid attributes' do
    assert @message.valid?
  end

  test 'is not valid without a body' do
    @message.body = nil
    assert_not @message.valid?
  end

  test 'is not valid without a product_id' do
    @message.product_id = nil
    assert_not @message.valid?
  end

  test 'is not valid without a user_id' do
    @message.user_id = nil
    assert_not @message.valid?
  end
end
