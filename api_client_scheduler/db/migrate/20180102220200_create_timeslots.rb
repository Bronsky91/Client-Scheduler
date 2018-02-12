class CreateTimeslots < ActiveRecord::Migration[5.0]
  def change
    create_table :timeslots do |t|
      t.string :show
      t.integer :start
      t.integer :end
      t.integer :cutoff
      t.integer :length
      t.string :day

      t.timestamps
    end
  end
end
