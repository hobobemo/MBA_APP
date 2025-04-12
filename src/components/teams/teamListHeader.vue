<script setup>
    import { onMounted } from 'vue';
    import { IonList, IonListHeader, IonLabel, } from '@ionic/vue';
    import List from '@/components/teams/teamList.vue';

    const props = defineProps({
        division: {
            type: Object,
            required: true,
        },
        teams: {
            type: Array,
            required: false,
        }
    });   
</script>

<template>
    <ion-list :inset="true" class="list-container" v-motion-slide-visible-bottom :delay="500">
        <ion-list-header class="ion-text-center" color="primary">
            <ion-label class="card-dark-header ion-text-uppercase" v-motion-fade :delay="700">{{ props.division.name }}</ion-label>
            <div class="list-header-title-container-stripe-1" v-motion-fade :delay="900" />
            <div class="list-header-title-container-stripe-2" v-motion-fade :delay="1100" />
        </ion-list-header>
        <List v-for="(a, i) in props.teams" :key="i" :team="a" :division="props.division.value" />
    </ion-list>
</template>