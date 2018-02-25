class CreateAppointments < ActiveRecord::Migration[5.1]
  def change
    create_table :appointments do |t|
      t.time :start_time
      t.date :start_date
      t.integer :duration
      t.string :comments
      t.references :stylist, foreign_key: true
      t.references :client, foreign_key: true

      t.timestamps
    end
  end
end
