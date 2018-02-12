class ChangeMeridianName < ActiveRecord::Migration[5.0]
  def change
    rename_column :timeslots, :meridian, :meridiem
  end
end
