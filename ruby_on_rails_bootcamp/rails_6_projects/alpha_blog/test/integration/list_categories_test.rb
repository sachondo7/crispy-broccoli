require 'test_helper'

class ListCategoriesTest < ActionDispatch::IntegrationTest

  def setup 
    @category = Category.create(name: "sports")
    @category2 = Category.create(name: "programming")
  end

  test "should show categories listing" do
    get "/categories"
    assert_select "a[href=?]", category_path(@category), text: @category.name #se verifica que exista un enlace con el nombre de la categoria
    assert_select "a[href=?]", category_path(@category2), text: @category2.name #se verifica que exista un enlace con el nombre de la categoria
  end

end
