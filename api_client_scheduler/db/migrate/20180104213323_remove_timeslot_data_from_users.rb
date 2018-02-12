class RemoveTimeslotDataFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :timeslot_data, :string
  end
end
