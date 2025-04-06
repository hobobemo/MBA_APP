import { defineStore } from 'pinia'

export const useFoodStore = defineStore('food', {
    state: () => {
        return {
            id: null,
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
        },
        getCartId(state){
            return state.id;
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
        },
        setCartId(){
            const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let result = '';
            for (let i = 0; i < 16; i++) {
              result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            this.id = result;
        },
        clearCart(){
            this.items = [];
            this.total = [];
        }
    }
})