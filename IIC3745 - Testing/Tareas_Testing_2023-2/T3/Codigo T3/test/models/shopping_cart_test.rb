require 'test_helper'

class ShoppingCartTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'John1', password: 'Nonono123!', email: 'asdf@gmail.com', role: 'admin')

    @product1 = @user.products.create!(categories: 'Cancha', nombre: 'Cancha de futbol', stock: 10, precio: 1000)
    @product2 = @user.products.create!(categories: 'Suplementos', nombre: 'Proteina', stock: 5, precio: 500)

    # Create products jsonb, with {product_id => quantity}
    @products = { @product1.id => 1, @product2.id => 2 }

    @shopping_cart = ShoppingCart.create!(user_id: @user.id, products: @products)
  end

  test 'is valid with valid attributes' do
    assert @shopping_cart.valid?
  end

  test 'calculates total price' do
    expected_total = ((@product1.precio * @products[@product1.id]) + (@product2.precio * @products[@product2.id])).to_i
    assert_equal expected_total, @shopping_cart.precio_total
  end

  test 'calculates shipping cost' do
    cost_product_one = (@product1.precio * @products[@product1.id] * 0.05).to_i.round(0)
    cost_product_two = (@product2.precio * @products[@product2.id] * 0.05).to_i.round(0)
    expected_cost = 1000 + cost_product_one + cost_product_two
    assert_equal expected_cost, @shopping_cart.costo_envio
  end

  test 'belongs to a user' do
    assert_equal @user, @shopping_cart.user
  end
end
