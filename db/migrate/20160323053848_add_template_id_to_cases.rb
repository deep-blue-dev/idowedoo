class AddTemplateIdToCases < ActiveRecord::Migration
  def change
    add_column :cases, :template_id, :integer
    remove_attachment :cases, :template
  end
end
