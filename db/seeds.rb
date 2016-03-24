# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# Case Templates
temp_file = File.new(File.join(Rails.root, 'app', 'assets', 'images', 'nexus5x-template.svg'))
CaseTemplate.create(name: "Nexus 5X", template: temp_file)

