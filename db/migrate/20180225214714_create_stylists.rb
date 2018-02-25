class CreateStylists < ActiveRecord::Migration[5.1]
  def change
    create_table :stylists do |t|
      t.string :first_name
      t.string :last_name
      t.string :photo_url
      t.string :email

      t.timestamps
    end
  end
end
