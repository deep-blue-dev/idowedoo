class CreateStripeCustomers < ActiveRecord::Migration
  def change
    create_table :stripe_customers do |t|
      t.string :stripe_customer_id
      t.string :email
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
