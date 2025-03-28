import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', {
    state: () => {
        return {
            regType: [],
            divisions: [],
        }
    },
    getters: {
        getRoles(state){
            return state.regType;
        },
        getDivisions(state){
            return state.divisions;
        }
    },
    actions: {
        setRegistrationTypes(value){
            this.regType = value;
        },
        setDivisions(value){
            this.divisions = value;
        }
    }
})