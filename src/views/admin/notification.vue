<script setup>
  import { ref, onMounted } from 'vue';
  import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonRadioGroup, IonRadio, IonSelect, IonSelectOption } from '@ionic/vue';
  import { database } from '@/firebase.ts';
  import { ref as dbRef, push, set, get } from 'firebase/database';

  let type = ref(0);
  let users = ref(null);
  let userId = ref(null); // Replace with real user ID

  const form = ref({
    title: '',
    body: ''
  });

  async function submitForm() {
    if (!form.value.title || !form.value.body) {
      alert('Both fields are required.');
      return;
    }

    if(type.value == 2){
      submitIndividualForm()
    } else {
      submitEveryoneForm();
    }
  };

  async function submitIndividualForm(){
    const notiRef = dbRef(database, `notifications/${userId.value}`);
    const newNotiRef = push(notiRef);

    await set(newNotiRef, {
      id: Math.floor(Math.random() * 1000000),
      title: form.value.title,
      body: form.value.body
    });

    form.value.title = '';
    form.value.body = '';
  }

  async function submitEveryoneForm(){
    const usersArray = Object.entries(users.value).map(([uid, userData]) => ({
      uid,
      ...userData
    }));

    usersArray.forEach(async (user) => {
      const notiRef = dbRef(database, `notifications/${user.uid}`);
      const newNotiRef = push(notiRef);

      await set(newNotiRef, {
        id: Math.floor(Math.random() * 1000000),
        title: form.value.title,
        body: form.value.body
      });
    });

    form.value.title = '';
    form.value.body = '';
  }

  async function getAllUsers() {
    const usersRef = dbRef(database, 'users');
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const userResponse = snapshot.val();
      users.value = userResponse;
    } else {
      console.log('No users found.');
      return {};
    }
  };

  function changeUser(value){
    userId.value = value.detail.value;
  }

  onMounted(() => {
    getAllUsers();
  });
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-item color="white">
        <ion-radio-group v-model="type" helper-text="Who to send notification to">
          <ion-radio @click="type = 1" :value="1">Everyone</ion-radio><br />
          <ion-radio @click="type = 2" :value="2">Specific User</ion-radio><br />
        </ion-radio-group>
      </ion-item>

      <ion-item color="white" v-if="type == 2">
        <ion-select label="User" label-placement="stacked" @ionChange="changeUser($event)">
          <ion-select-option v-for="(a, i) in users" :key="i" :value="i">{{ a.displayName }}</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item color="white" v-if="type != 0">
        <ion-label position="stacked">Title</ion-label>
        <ion-input v-model="form.title" placeholder="Enter title" />
      </ion-item>

      <ion-item color="white" v-if="type != 0">
        <ion-label position="stacked">Message</ion-label>
        <ion-textarea v-model="form.body" placeholder="Enter message" />
      </ion-item>

      <ion-button expand="block" class="ion-margin-top" @click="submitForm">
        Send Notification
      </ion-button>
    </ion-content>
  </ion-page>
</template>