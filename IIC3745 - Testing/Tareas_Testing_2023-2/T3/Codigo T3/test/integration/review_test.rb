require 'application_system_test_case'

class ReviewControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin_user = User.create!(name: 'Admin User', password: 'Admin123!', email: 'admin@example.com', role: 'admin')
    @product = Product.create!(nombre: 'John1', precio: 4000, stock: 1, user_id: @admin_user.id, categories: 'Cancha',
                               horarios: '10:00;20:00')
    @review = Review.create!(tittle: 'Review Title', description: 'Review Description', calification: 5,
                            product: @product, user: @admin_user)
  end

  # Test review_insertar_path
  test 'should create review' do

  # Login
    login_as(@admin_user, scope: :user)

    post review_insertar_path, params: {
      review: {
        tittle: 'New Review',
        description: 'New Review Description',
        calification: "5",
      },
      product_id: @product.id
    }

    # Check if the review was created
    review = Review.last
    assert_equal 'New Review', review.tittle

    # Logout
    sign_out @admin_user
  end

  # Test review_insertar_path
  test 'should create review con error' do

    # Login
    login_as(@admin_user, scope: :user)

    post review_insertar_path, params: {
      review: {
        tittle: 'New Review',
        description: 'New Review Description',
        calification: "error",
      },
      product_id: @product.id
    }

    # Check if the review was not created
    review = Review.last
    assert_equal 'Review Title', review.tittle


    # Logout
    sign_out @admin_user
  end

  # Test eliminar review
  test 'should delete review' do

    # Login
    login_as(@admin_user, scope: :user)

    delete "/review/eliminar/#{@review.id}"

    # Check if the review was deleted
    assert_nil Review.find_by(id: @review.id)

    # Logout
    sign_out @admin_user
  end

  # Test actualizar review
  test 'should update review' do

    # Login
    login_as(@admin_user, scope: :user)

    patch "/review/actualizar/#{@review.id}", params:{
      review: {
        tittle: 'New Review',
        description: 'New Review Description a',
        calification: "5",
      }
    }

    # Check if the review was updated
    review = Review.find_by(id: @review.id)

    # Logout
    sign_out @admin_user
  end

  # Test actualizar review
  test 'should update review fail' do

    # Login
    login_as(@admin_user, scope: :user)

    patch "/review/actualizar/#{@review.id}", params:{
      review: {
        tittle: 'New Review',
        description: 'New Review Description a',
        calification: "500000000000000000000",
      }
    }

    # Check if the review was updated
    review = Review.find_by(id: @review.id)

    # Check if calification still the same
    assert_equal "5", review.calification

    # Logout
    sign_out @admin_user
  end






end
