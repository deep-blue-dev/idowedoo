class RemoveTypeFromCases < ActiveRecord::Migration
  def change
    remove_column :cases, :type, :string
  end
end
