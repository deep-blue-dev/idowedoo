class AddUserEmailAndStripeTokenToOrder < ActiveRecord::Migration
  def change
    add_column :orders, :stripe_token, :string
    add_column :orders, :email, :string
  end
end
