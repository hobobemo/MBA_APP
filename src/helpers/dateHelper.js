export default {
    getDate(value){
        const d = new Date(value.date);
        return d.toDateString();
    },
    formatDate(value){
        const dateObj = new Date(value)

        const formattedDate = dateObj.toLocaleDateString(undefined, {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
        })

        return formattedDate;
    },
    formatTime(value){
        const dateObj = new Date(value);
        
        const formattedTime = dateObj.toLocaleTimeString(undefined, {
            hour: '2-digit', minute: '2-digit'
        });

        return formattedTime;
    }

}