class AddAddressInfoToOrder < ActiveRecord::Migration
  def change
    add_column :orders, :address_1, :string
    add_column :orders, :address_2, :string
    add_column :orders, :address_city, :string
    add_column :orders, :address_state, :string
    add_column :orders, :address_zip, :string
    add_column :orders, :address_country, :string
  end
end
