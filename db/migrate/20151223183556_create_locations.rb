class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :title
      t.string :name
      t.string :street_number
      t.string :street
      t.string :city
      t.string :state
      t.string :zipcode
      t.string :country
      t.string :unit
      t.string :long_address

      t.timestamps null: false
    end
  end
end
