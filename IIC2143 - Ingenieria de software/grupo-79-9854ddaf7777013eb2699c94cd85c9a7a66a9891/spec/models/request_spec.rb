# frozen_string_literal: true

require 'rails_helper'
require 'factories/users'
require 'factories/publicacions'

RSpec.describe Request, type: :model do
  let!(:request) { create(:request) }
  let!(:user) { create(:user) }

  it 'is valid with valid attributes' do
    expect(request).to be_valid
  end

  it 'is not valid with no customer name' do
    request.descripcion = nil
    expect(request).not_to be_valid
  end
end
