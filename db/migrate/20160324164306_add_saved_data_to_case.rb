class AddSavedDataToCase < ActiveRecord::Migration
  def change
    add_column :cases, :saved_data, :text
  end
end
