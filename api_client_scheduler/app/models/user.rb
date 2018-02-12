class User < ApplicationRecord
  validates_uniqueness_of :userkey
  validates_uniqueness_of :link
  has_many :timeslots
end
