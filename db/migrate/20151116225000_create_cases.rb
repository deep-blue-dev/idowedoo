class CreateCases < ActiveRecord::Migration
  def change
    create_table :cases do |t|
      t.string :title
      t.decimal :unit_cost, precision: 8, scale: 2
      t.integer :unit_min

      t.timestamps null: false
    end
  end
end
