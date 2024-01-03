require 'test_helper'

class AbilityTest < ActiveSupport::TestCase
  def setup
    @admin_user = User.create!(name: 'Admin', password: 'Admin123!', email: 'admin@example.com', role: 'admin')
    @regular_user = User.create!(name: 'RegularUser', password: 'Regular123!', email: 'regular@example.com',
                                 role: 'regular')
    @nil_user = nil
  end

  test 'admin can manage all resources' do
    admin_ability = Ability.new(@admin_user)
    assert admin_ability.can?(:manage, :all)
  end

  test 'regular user can manage their own products' do
    product = Product.create!(nombre: 'Regular Product', precio: 100, stock: 10, user_id: @regular_user.id,
                              categories: 'Cancha')
    ability = Ability.new(@regular_user)

    assert ability.can?(:eliminar, product)
    assert ability.can?(:actualizar_producto, product)
  end

  test 'regular user cannot manage other users' do
    another_user = User.create!(name: 'AnotherUser', password: 'Another123!', email: 'another@example.com',
                                role: 'regular')
    another_product = Product.create!(nombre: 'Another Product', precio: 100, stock: 10, user_id: another_user.id,
                                      categories: 'Cancha')
    ability = Ability.new(@regular_user)

    assert_not ability.can?(:eliminar, another_product)
    assert_not ability.can?(:actualizar_producto, another_product)
  end

  test 'regular user can insert deseado for any product except their own' do
    another_user = User.create!(name: 'AnotherUser', password: 'Another123!', email: 'another@example.com',
                                role: 'regular')
    product = Product.create!(nombre: 'Sample Product', precio: 100, stock: 10, user_id: another_user.id,
                              categories: 'Cancha')
    ability = Ability.new(@regular_user)

    assert ability.can?(:insert_deseado, product)
  end

  test 'regular user cannot insert deseado for their own product' do
    user_product = Product.create!(nombre: 'User Product', precio: 100, stock: 10, user_id: @regular_user.id,
                                   categories: 'Cancha')
    ability = Ability.new(@regular_user)

    assert_not ability.can?(:insert_deseado, user_product)
  end

  test 'regular user can read their own solicitud' do
    @product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 10, user_id: @regular_user.id,
                               categories: 'Cancha')
    solicitud = Solicitud.create!(stock: 5, status: 'Pending', user_id: @regular_user.id, product_id: @product.id)
    ability = Ability.new(@regular_user)

    assert ability.can?(:leer, solicitud)
  end

  test 'regular user cannot read other users solicitud' do
    another_user = User.create!(name: 'AnotherUser', password: 'Another123!', email: 'another@example.com',
                                role: 'regular')
    @product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 10, user_id: another_user.id,
                               categories: 'Cancha')
    another_solicitud = Solicitud.create!(stock: 5, status: 'Pending', user_id: another_user.id,
                                          product_id: @product.id)
    ability = Ability.new(@regular_user)

    assert_not ability.can?(:leer, another_solicitud)
  end

  test 'regular user cannot update other users review' do
    another_user = User.create!(name: 'AnotherUser', password: 'Another123!', email: 'another@example.com',
                                role: 'regular')
    another_user_two = User.create!(name: 'AnotherUser2', password: 'Another1232!', email: 'another2@example.com',
                                    role: 'regular')
    @product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 10, user_id: another_user.id,
                               categories: 'Cancha')
    @review = Review.new(tittle: 'Review Title', description: 'Review Description', calification: 5,
                         product_id: @product.id, user_id: another_user_two.id)
    ability = Ability.new(@regular_user)

    assert_not ability.can?(:actualizar_review, @review)
  end

  # El usuario puede eliminar y actualizar una solicitud si el producto de la solicitud es suyo
  test 'regular user can delete their own solicitud' do
    another_user = User.create!(name: 'AnotherUser', password: 'Another123!', email: 'another@example.com',
                                role: 'regular')

    @product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 10, user_id: another_user.id,
                               categories: 'Cancha')

    @solicitud = Solicitud.new(stock: 5, status: 'Pending', user_id: @regular_user.id, product_id: @product.id)

    ability = Ability.new(@regular_user)

    assert ability.can?(:eliminar, @solicitud)
  end

  # El usuario puede insertar una solicitud si la solicitud no es suya
  test 'regular user can insert a solicitu if its not of him' do
    another_user_one = User.create!(name: 'AnotherUser', password: 'Another123!', email: 'another@example.com',
                                    role: 'regular')
    @product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 10, user_id: another_user_one.id,
                               categories: 'Cancha')

    another_user_two = User.create!(name: 'AnotherUser2', password: 'Another1232!', email: 'another2@example.com',
                                    role: 'regular')

    @solicitud = Solicitud.new(stock: 5, status: 'Pending', user_id: another_user_two.id, product_id: @product.id)

    ability = Ability.new(@regular_user)

    assert ability.can?(:insertar, @solicitud)
  end

  test 'regular user cannot delete other users message' do
    @product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 10, user_id: @regular_user.id,
                               categories: 'Cancha')

    another_user = User.create!(name: 'AnotherUser', password: 'Another123!', email: 'another@example.com',
                                role: 'regular')

    @message = Message.new(body: 'Message Body', product_id: @product.id, user_id: another_user.id)
    ability = Ability.new(@regular_user)

    assert_not ability.can?(:eliminar, @message)
  end

  test 'normal user can index and leer Product' do
    ability = Ability.new(@nil_user)

    assert ability.can?(:index, Product)
    assert ability.can?(:leer, Product)
  end

  test 'normal user can index and leer Review' do
    ability = Ability.new(@nil_user)

    assert ability.can?(:index, Review)
    assert ability.can?(:leer, Review)
  end

  test 'normal user can leer Message' do
    ability = Ability.new(@nil_user)

    assert ability.can?(:leer, Message)
  end
end
