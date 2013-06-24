class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :title
      t.string :link_url
      t.string :image_url
      t.string :product_type
      t.integer :old_price
      t.integer :new_price
      t.integer :price_off
      t.integer :percent_off
      t.string :retailler
      t.string :make
      t.text :description

      t.timestamps
    end
  end
end
