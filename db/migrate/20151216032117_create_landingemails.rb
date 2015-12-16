class CreateLandingemails < ActiveRecord::Migration
  def change
    create_table :landingemails do |t|
      t.string :email

      t.timestamps null: false
    end
  end
end
