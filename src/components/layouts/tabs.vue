<script setup>
    import { IonTabBar, IonTabButton, IonLabel, IonIcon, } from '@ionic/vue';
    import { map, calendar, baseball, rainy, storefront, } from 'ionicons/icons';
    import logo from '@/assets/logos/logo.svg';

    const items = [
        {
            title: 'Teams',
            tab: 'teams',
            href: '/teams',
            icon: baseball,
            size: 'small',
            disabled: false,
        }, {
            title: 'Schedule',
            tab: 'schedule',
            href: '/schedule',
            icon: calendar,
            size: 'small',
            disabled: false,
        }, {
            title: 'Home',
            tab: 'home',
            href: '/index',
            icon: logo,
            size: 'large',
            disabled: false,
        }, {
            title: 'Map',
            tab: 'map',
            href: '/map',
            icon: map,
            size: 'small',
            disabled: false,
        }, {
            title: 'Weather',
            tab: 'weather',
            href: '/weather',
            icon: rainy,
            size: 'small',
            disabled: false,
        },
    ];
</script>

<template>
    <ion-tab-bar slot="bottom">
        <ion-tab-button v-for="(a, i) in items" :key="i" :tab="a.tab" :href="a.href" :disabled="a.disabled">
            <ion-icon aria-hidden="true" :icon="a.icon" :size="a.size"/>
            <ion-label>{{ a.title }}</ion-label>
        </ion-tab-button>
    </ion-tab-bar>
</template>
