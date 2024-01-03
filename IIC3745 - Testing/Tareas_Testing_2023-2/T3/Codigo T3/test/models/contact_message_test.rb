require 'test_helper'

class ContactMessageTest < ActiveSupport::TestCase
  def setup
    @message = ContactMessage.new(
      title: 'Title',
      body: 'Message body.',
      name: 'John Doe',
      mail: 'john@example.com',
      phone: '+56419518523'
    )
  end

  test 'is valid with valid attributes' do
    assert @message.valid?
  end

  test 'is not valid without a title' do
    @message.title = nil
    assert_not @message.valid?
  end

  test 'is not valid with a too long title' do
    @message.title = 'A' * 51
    assert_not @message.valid?
  end

  test 'is not valid without a body' do
    @message.body = nil
    assert_not @message.valid?
  end

  test 'is not valid with a too long body' do
    @message.body = 'A' * 501
    assert_not @message.valid?
  end

  test 'is not valid without a name' do
    @message.name = nil
    assert_not @message.valid?
  end

  test 'is not valid with a too long name' do
    @message.name = 'A' * 51
    assert_not @message.valid?
  end

  test 'is not valid without a mail' do
    @message.mail = nil
    assert_not @message.valid?
  end

  test 'is not valid with an invalid email format' do
    @message.mail = 'invalid-email'
    assert_not @message.valid?
  end

  test 'is valid with a valid phone format' do
    @message.phone = '+56419518523'
    assert @message.valid?
  end

  test 'is not valid with an invalid phone format' do
    @message.phone = '12345' # Invalid format
    assert_not @message.valid?
  end
end
