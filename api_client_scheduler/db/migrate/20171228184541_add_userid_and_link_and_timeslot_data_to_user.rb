class AddUseridAndLinkAndTimeslotDataToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :userid, :integer
    add_column :users, :timeslot_data, :string
  end
end
