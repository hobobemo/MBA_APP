<script setup>
    import { IonLabel, IonText, IonNote } from '@ionic/vue';
    import Helper from '@/helpers/firebase.js';

    const props = defineProps({
        message: {
            type: Object,
            required: true,
        }
    });
</script>

<template>
    <ion-label color="primary" slot="end">
        <ion-text color="primary" class="h4">{{ props.message.name }}</ion-text>
        <ion-note><small>{{ Helper.formatTimestamp(props.message.timestamp) }}</small></ion-note>
        <ion-text color="black"><p>{{ props.message.text }}</p></ion-text>
    </ion-label>
</template>