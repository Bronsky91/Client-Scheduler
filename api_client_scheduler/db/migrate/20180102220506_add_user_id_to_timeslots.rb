class AddUserIdToTimeslots < ActiveRecord::Migration[5.0]
  def change
    add_column :timeslots, :user_id, :integer
  end
end
