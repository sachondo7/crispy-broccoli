# frozen_string_literal: true

require 'rails_helper'
require 'factories/users'
# rubocop:disable Metrics/BlockLength
RSpec.describe User, type: :model do
  let(:user) { create(:user) }
  let(:user2) { create(:user) }

  it 'is valid with valid attributes' do
    expect(user).to be_valid
  end

  it 'is not valid with username null' do
    user.username = nil
    expect(user).not_to be_valid
  end

  it 'is not valid with email null' do
    user.email = nil
    expect(user).not_to be_valid
  end

  it 'is not valid with address null' do
    user.address = nil
    expect(user).not_to be_valid
  end

  it 'is not valid with phone null' do
    user.phone = nil
    expect(user).not_to be_valid
  end

  it 'is not valid with phone string' do
    user.phone = 'hola'
    expect(user).not_to be_valid
  end

  it 'is not valid with short password' do
    user.password = '123'
    expect(user).not_to be_valid
  end

  it 'is not valid if 2 username are the same' do
    user.username = user2.username
    expect(user).not_to be_valid
  end
end
# rubocop:enable Metrics/BlockLength
