class AddEaPostToApps < ActiveRecord::Migration
  def change
    add_column :apps, :easy_test_sk, :string
    add_column :apps, :easy_live_sk, :string
  end
end
