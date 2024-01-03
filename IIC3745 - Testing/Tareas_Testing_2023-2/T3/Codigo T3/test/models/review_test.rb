require 'test_helper'

class ReviewTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'John1', password: 'Nonono123!', email: 'asdf@gmail.com', role: 'admin')
    @product = Product.create!(nombre: 'Product Name', precio: 4000, stock: 1, user_id: @user.id, categories: 'Cancha')

    @review = Review.new(tittle: 'Review Title', description: 'Review Description', calification: 5,
                         product_id: @product.id, user_id: @user.id)
  end

  test 'is valid with valid attributes' do
    assert @review.valid?
  end

  test 'is not valid without a title' do
    @review.tittle = nil
    assert_not @review.valid?
  end

  test 'is not valid with a long title' do
    @review.tittle = 'A' * 101
    assert_not @review.valid?
  end

  test 'is not valid without a description' do
    @review.description = nil
    assert_not @review.valid?
  end

  test 'is not valid with a long description' do
    @review.description = 'A' * 501
    assert_not @review.valid?
  end

  test 'is not valid without a calification' do
    @review.calification = nil
    assert_not @review.valid?
  end

  test 'is not valid with a non-integer calification' do
    @review.calification = 4.5
    assert_not @review.valid?
  end

  test 'is not valid with a calification less than 1' do
    @review.calification = 0
    assert_not @review.valid?
  end

  test 'is not valid with a calification greater than 5' do
    @review.calification = 6
    assert_not @review.valid?
  end

  test 'is not valid without a product_id' do
    @review.product_id = nil
    assert_not @review.valid?
  end

  test 'is not valid without a user_id' do
    @review.user_id = nil
    assert_not @review.valid?
  end
end
