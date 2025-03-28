export default {
    getDate(value){
        const d = new Date(value.date);
        return d.toDateString();
    },

}