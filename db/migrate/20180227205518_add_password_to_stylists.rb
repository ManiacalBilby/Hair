class AddPasswordToStylists < ActiveRecord::Migration[5.1]
  def change
    add_column :stylists, :password, :string
  end
end
