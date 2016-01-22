class CreateCasesColors < ActiveRecord::Migration
  def change
    create_table :cases_colors, id: false do |t|
      t.references :case, index: true, foreign_key: true
      t.references :color, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
