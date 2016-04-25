class CreateStripeCharges < ActiveRecord::Migration
  def change
    create_table :stripe_charges do |t|
      t.integer :order_id
      t.integer :stripe_customer_id
      t.string :charge_stripe_id
      t.integer :amount
      t.boolean :success, default: false

      t.timestamps null: false
    end
  end
end
