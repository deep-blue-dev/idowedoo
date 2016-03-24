class CreateCaseTemplates < ActiveRecord::Migration
  def change
    create_table :case_templates do |t|
      t.attachment :template
      t.string :name

      t.timestamps null: false
    end
  end
end
