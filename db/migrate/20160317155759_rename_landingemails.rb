class RenameLandingemails < ActiveRecord::Migration
  def change
    rename_table :landingemails, :landing_emails
  end
end
