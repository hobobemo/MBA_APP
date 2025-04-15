<script setup>
    import { ref, onMounted } from 'vue';
    import { IonItemOptions, IonItemOption, IonIcon } from '@ionic/vue';
    import { Preferences } from '@capacitor/preferences';
    import { heartOutline, heart } from 'ionicons/icons';
    import { useUserStore } from '@/stores/userStore.js';
    import { ref as dbRef, onValue, update, set, } from "firebase/database";
    import { database } from "@/firebase.ts";

    const userStore = useUserStore();

    const props = defineProps({
        team: {
            type: Number,
            required: true,
        }
    });

    async function action(value){
        userStore.toggleSubscription(value);
        await Preferences.set({
            key: 'subscriptions',
            value: JSON.stringify(userStore.getSubscriptions),
        });
    }

    async function setUser(user) {
            try {
                await update(dbRef(database, `users/${user.uid}`), {
                    displayName: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                    uid: user.uid,
                });
            } catch (error) {
                console.error("Error saving user data:", error);
            }
        }

    function buttonText(value){
        const text = ref(null);
        switch (value) {
            case true:
                text.value = 'Unlike';
                break;
            case false:
                text.value = 'Like';
                break;
        }
        return text;
    }
</script>

<template>
    <ion-item-option color="primary" @click="action(props.team)">
        <ion-icon slot="top" :icon="userStore.isSubscribed(props.team) ? heart : heartOutline" />
        Follow
    </ion-item-option>
</template>