<script setup>
    import { ref } from 'vue';
    import { IonText, IonLabel, IonItemSliding, IonItem, IonIcon, IonItemOptions, IonItemOption, IonNote, } from '@ionic/vue';
    import { chevronBackOutline, baseballOutline, gitNetworkOutline } from 'ionicons/icons';

    const props = defineProps({
        item: {
            type: Object,
            required: true,
        },
        index: {
            type: String,
            required: true,
        }
    });
</script>

<template>
    <ion-item-sliding>
        <ion-item :button="true" color="white" lines="full" v-motion-slide-right :delay="1200">
            <ion-label slot="start">{{ props.item.info.name }}</ion-label>
            <ion-note slot="end">{{ props.item.info.dates }}</ion-note>
            <ion-text slot="end">
                <ion-icon color="primary" :icon="chevronBackOutline"></ion-icon>
            </ion-text>
        </ion-item>

        <ion-item-options slot="end">
            <ion-item-option color="secondary" :router-link="'/teams/' + props.index">
                <ion-icon slot="top" :icon="baseballOutline" />
                Teams
            </ion-item-option>
            <ion-item-option color="primary" :router-link="'/bracket/' + props.index + '/' + props.item.seedingReportDivisions[0].divisionID">
                <ion-icon slot="top" :icon="gitNetworkOutline" />
                Bracket
            </ion-item-option>
        </ion-item-options>
    </ion-item-sliding>
</template>