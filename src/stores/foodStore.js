import { defineStore } from 'pinia'

export const useFoodStore = defineStore('food', {
    state: () => {
        return {
            items: [],
            total: [],
        }
    },
    getters: {
        getNumberOfItems(state){
            return state.items.length;
        },
        getCartTotal(state){
            return (state.total.reduce((acc, curr) => acc + curr, 0) / 100).toFixed(2)
        }
    },
    actions: {
        addItem(item, type){
            this.items.push({item, type});
            this.total.push(item.price_money.amount);
        },
        removeItem(id){
            this.items.splice(id, 1);
            this.total.splice(id, 1);
        }
    }
})