<script setup>
    import { ref } from 'vue';
    import { IonText, IonLabel, IonItemSliding, IonItem, IonIcon, IonItemOptions, IonItemOption } from '@ionic/vue';
    import { chevronBackOutline, baseballOutline } from 'ionicons/icons';
    import Follow from '@/components/teams/followButton.vue';

    const props = defineProps({
        team: {
            type: Object,
            required: true,
        },
    });

    const links = ref([
        {
            title: "Team",
            href: "/team/",
            color: "secondary",
            icon: baseballOutline
        },
    ]);
</script>

<template>
    <ion-item-sliding>
        <ion-item :button="true" color="white" lines="full" v-motion-slide-right :delay="1200">
            <ion-label slot="start">{{ props.team.teamName }}</ion-label>
            <ion-text slot="end">
                <ion-icon color="primary" :icon="chevronBackOutline"></ion-icon>
            </ion-text>
        </ion-item>

        <ion-item-options slot="end">
            <ion-item-option v-for="(c, k) in links" :key="k" :color="c.color" :router-link="c.href + props.team.TeamID">
                <ion-icon slot="top" :icon="c.icon" />
                {{ c.title }}
            </ion-item-option>
            <Follow :team="props.team.TeamID" />
        </ion-item-options>
    </ion-item-sliding>
</template>