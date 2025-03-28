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
    async getCatalog() {
        const options = {
            url: baseUrl.value + '/food/catalog',
            headers: getSettings.headers,
        }
        const response = await CapacitorHttp.get(options);
        const returnData = response.data
        return returnData;
    },
    async getCatalogImage(id) {
        const options = {
            url: baseUrl.value + '/food/image/' + id,
            headers: getSettings.headers,
        }
        const response = await CapacitorHttp.get(options);
        const returnData = response.data
        return returnData;
    },
};