class CreateApps < ActiveRecord::Migration
  def change
    create_table :apps do |t|
      t.string :stp_test_sk
      t.string :stp_test_pk
      t.string :stp_live_sk
      t.string :stp_live_pk

      t.timestamps null: false
    end
  end
end
