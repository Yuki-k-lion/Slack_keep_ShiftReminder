class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string        :name
      t.text          :message
      t.timestamps
    end
  end
end
