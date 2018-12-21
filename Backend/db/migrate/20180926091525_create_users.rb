class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    random = Random.new
    create_table :users do |t|
      t.string :name
      t.string :address, index: true
      t.integer :nonce, default: random.rand(100)

      t.timestamps
    end
    123
  end
end
