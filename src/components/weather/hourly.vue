<script setup>
    import { IonCard, IonCardTitle, IonCardSubtitle, IonItem, IonLabel, IonAccordionGroup, IonAccordion } from '@ionic/vue';
    import Card from '@/components/weather/hourlyCard.vue';

    const props = defineProps({
        daily: {
            type: Object,
            required: true,
        },
    });

    function createDate(value){
        const d = new Date(value);
        return d.toDateString();
    }
</script>

<template>
    <ion-accordion-group>
        <ion-accordion v-for="(a, i) in props.daily" :key="i" :value="i" class="card-content" >
            <ion-item slot="header" color="light" class="ion-padding" v-motion-pop-visible>
                <ion-label color="primary">
                    <h1><strong>{{ createDate(a.date) }}</strong></h1>
                </ion-label>
            </ion-item>
            <Card v-for="(b, j) in a.hour" :key="j" :item="b" />
        </ion-accordion>
    </ion-accordion-group>
</template>