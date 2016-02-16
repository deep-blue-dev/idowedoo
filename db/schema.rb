# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160209191544) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "campaign_case_options", force: :cascade do |t|
    t.integer  "campaign_id"
    t.integer  "case_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "campaigns", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "start"
    t.datetime "finish"
    t.integer  "user_id"
    t.integer  "goal_unit"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "campaigns", ["user_id"], name: "index_campaigns_on_user_id", using: :btree

  create_table "cases", force: :cascade do |t|
    t.string   "title"
    t.integer  "unit_min"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "template_file_name"
    t.string   "template_content_type"
    t.integer  "template_file_size"
    t.datetime "template_updated_at"
    t.integer  "unit_cost_cents",       default: 0,     null: false
    t.string   "unit_cost_currency",    default: "USD", null: false
  end

  create_table "cases_colors", id: false, force: :cascade do |t|
    t.integer  "case_id"
    t.integer  "color_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "cases_colors", ["case_id"], name: "index_cases_colors_on_case_id", using: :btree
  add_index "cases_colors", ["color_id"], name: "index_cases_colors_on_color_id", using: :btree

  create_table "colors", force: :cascade do |t|
    t.string   "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "landingemails", force: :cascade do |t|
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "locations", force: :cascade do |t|
    t.string   "title"
    t.string   "name"
    t.string   "street_number"
    t.string   "street"
    t.string   "city"
    t.string   "state"
    t.string   "zipcode"
    t.string   "country"
    t.string   "unit"
    t.string   "long_address"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "profile_id"
    t.string   "user_title"
  end

  add_index "locations", ["profile_id"], name: "index_locations_on_profile_id", using: :btree

  create_table "order_items", force: :cascade do |t|
    t.decimal  "unit_price"
    t.integer  "quantity"
    t.decimal  "total_price"
    t.integer  "product_id"
    t.integer  "order_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "order_items", ["order_id"], name: "index_order_items_on_order_id", using: :btree
  add_index "order_items", ["product_id"], name: "index_order_items_on_product_id", using: :btree

  create_table "order_statuses", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "orders", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "case_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.decimal  "subtotal"
    t.decimal  "tax"
    t.decimal  "shipping"
    t.decimal  "total_price"
    t.integer  "order_status_id"
    t.string   "tracking_no"
  end

  add_index "orders", ["case_id"], name: "index_orders_on_case_id", using: :btree
  add_index "orders", ["user_id"], name: "index_orders_on_user_id", using: :btree

  create_table "products", force: :cascade do |t|
    t.string   "name"
    t.decimal  "price",       precision: 8, scale: 2
    t.text     "description"
    t.boolean  "status"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  create_table "profiles", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "campaigns", "users"
  add_foreign_key "cases_colors", "cases"
  add_foreign_key "cases_colors", "colors"
  add_foreign_key "locations", "profiles"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "products"
  add_foreign_key "orders", "cases"
  add_foreign_key "orders", "users"
  add_foreign_key "profiles", "users"
end
