import { computed } from 'vue';
import { CapacitorHttp } from '@capacitor/core';

const baseUrl = computed(() => {
    return import.meta.env.VITE_API_URL;
});

const getSettings = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
};

const postSettings = {
    headers: {
        'Content-Type': 'application/json' 
    }
};

export default {
    async getBracket(event, div, winner) {
        const options = {
            url: baseUrl.value + '/bracket/' + event + '/' + div + '/' + winner,
            headers: getSettings.headers,
        }
        const response = await CapacitorHttp.get(options);
        const returnData = response.data
        return returnData;
    },
    async getTeam(id) {
        const options = {
            url: baseUrl.value + '/team/' + id,
            headers: getSettings.headers,
        }
        const response = await CapacitorHttp.get(options);
        const returnData = response.data
        return returnData;
    },
    async getWeather(lat, lng) {
        const options = {
            url: baseUrl.value + '/weather/' + lat + '/' + lng,
            headers: getSettings.headers,
        }
        const response = await CapacitorHttp.get(options);
        const returnData = response.data
        return returnData;
    },
};