class AddMeridianToTimeslots < ActiveRecord::Migration[5.0]
  def change
    add_column :timeslots, :meridian, :string
  end
end
