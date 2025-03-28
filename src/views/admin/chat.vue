<script setup>
    import { ref, reactive, onMounted, watch, } from "vue";
    import { IonPage, IonContent, IonItem, IonInput, IonButton, IonList, } from '@ionic/vue';
    import { push, ref as dbRef, onValue, set, query, orderByChild, limitToLast } from "firebase/database";
    import { database } from "@/firebase.ts";
    import { useUserStore } from '@/stores/userStore.js';
    import Self from '@/components/chat/self.vue';
    import Others from '@/components/chat/others.vue';

    const userStore = useUserStore();
    const message = ref("");
    const messages = reactive([]);
    const chatList = ref(null);

    const sendMessage = () => {
        if (message.value.trim()) {
        const messagesRef = dbRef(database, 'chat/admins');
        const newMessageRef = push(messagesRef);
        set(newMessageRef, {
            userId: userStore.getId,
            name: userStore.getFamilyName,
            text: message.value,
            timestamp: Date.now(),
        });
        message.value = '';
        }
    };

    // Fetch live messages
    onMounted(() => {
        const messagesRef = query(dbRef(database, "chat/admins"), orderByChild("timestamp"));

        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            messages.length = 0; // Clear existing messages
            const tempMessages = [];

            for (const key in data) {
                tempMessages.push({ ...data[key], key });
            }

            messages.push(...tempMessages.reverse()); // Reverse to show latest first
        });
    });
</script>

<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <ion-list ref="chatList" class="chat-container">
            <ion-item color="white" v-for="message in messages" :key="message.key" lines="none">
                <Self v-if="message.userId == userStore.getId" :message="message" />
                <Others v-else :message="message" />
            </ion-item>
        </ion-list>
        <ion-item color="white">
            <ion-input v-model="message" placeholder="Type your message"></ion-input>
            <ion-button slot="end" @click="sendMessage">Send</ion-button>
        </ion-item>
      </ion-content>
    </ion-page>
  </template>
  
<style scoped>
    .chat-container {
        padding: 10px;
        height: 70vh;
        overflow-y: scroll;
        background: var(--ion-color-white);
    }
    .chat-message {
        color: var(--ion-color-primary);
        -bottom: 10px;
    }
    .message-container {
        padding: 10px;
        height: 30vh;
        overflow-y: scroll;
        background: var(--ion-color-white);
    }
</style>