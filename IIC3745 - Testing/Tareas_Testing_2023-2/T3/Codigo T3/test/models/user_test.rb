require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.create!(name: 'John1', password: 'Nonono123!', email: 'test@example.com', role: 'admin')
  end

  test 'is valid with valid attributes' do
    assert @user.valid?
  end

  test 'is not valid without a name' do
    @user.name = nil
    assert_not @user.valid?
  end

  test 'is not valid with a name of less than 2 characters' do
    @user.name = 'J'
    assert_not @user.valid?
  end

  test 'is not valid with a name of more than 25 characters' do
    @user.name = 'A' * 26
    assert_not @user.valid?
  end

  test 'is not valid without an email' do
    @user.email = nil
    assert_not @user.valid?
  end

  test 'is not valid with a duplicate email' do
    duplicate_user = @user.dup
    @user.save
    assert_not duplicate_user.valid?
  end

  test 'admin? should return true for an admin user' do
    assert @user.admin?
  end

  test 'admin? should return false for a non-admin user' do
    @user.role = 'regular'
    assert_not @user.admin?
  end

  test 'is valid with an empty deseados array' do
    @user.deseados = []
    assert @user.valid?
  end

  test 'is not valid with a non-existent product in deseados' do
    @user.deseados = [1, 2, 3] # Assuming these product IDs don't exist in the database
    assert_not @user.valid?
    assert_equal ['el articulo que se quiere ingresar a la lista de deseados no es valido'], @user.errors[:deseados]
  end

  test 'is valid with valid products in deseados' do
    product = Product.create!(nombre: 'Valid Product', precio: 100, stock: 10, user_id: @user.id, categories: 'Cancha')
    @user.deseados = [product.id]
    assert @user.valid?
  end
end
