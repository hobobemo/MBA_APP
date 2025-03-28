import { defineStore } from 'pinia'

export const useFoodStore = defineStore('food', {
    state: () => {
        return {
            items: [],
            total: 0,
        }
    },
    getters: {

    },
    actions: {
        addItem(item){
            let data = {
                id: item.id,
                variation: item.item_variation_data.item_id,
                price: item.item_variation_data.price_money.amount,
            }
            this.items.push(data);
        }
    }
})