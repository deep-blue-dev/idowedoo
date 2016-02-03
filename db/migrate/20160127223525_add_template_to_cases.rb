class AddTemplateToCases < ActiveRecord::Migration
  def self.up
    add_attachment :cases, :template
  end

  def self.down
    remove_attachment :cases, :template
  end
end
