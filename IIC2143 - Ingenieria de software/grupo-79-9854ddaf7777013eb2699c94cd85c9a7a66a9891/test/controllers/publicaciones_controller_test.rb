# frozen_string_literal: true

require 'test_helper'

class PublicacionesControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get publicaciones_index_url
    assert_response :success
  end

  test 'should get new' do
    get publicaciones_new_url
    assert_response :success
  end

  test 'should get show' do
    get publicaciones_show_url
    assert_response :success
  end

  test 'should get edit' do
    get publicaciones_edit_url
    assert_response :success
  end
end
