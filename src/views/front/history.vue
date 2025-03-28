<script setup>
    import { IonPage, IonContent,  } from '@ionic/vue';
    import { ref, onMounted } from 'vue';
    import { ref as refer, onValue } from "firebase/database";
    import { database } from "@/firebase.ts"; 
    import Timeline from "@/components/history/timeline.vue";
    let items = ref(null);

    const watchDatabase = () => {
        const dbRef = refer(database, "front/history");
        onValue(dbRef, (snapshot) => {
            items.value = snapshot.val();
        });
    };

    onMounted(() => {
        watchDatabase();
    });
</script>

<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="timeline" v-motion-slide-visible-top :delay="200" :duration="1000">
                <Timeline v-for="(item, index) in items" :key="index" :item="item" v-motion-slide-visible-left :delay="(item * 10) + 500" :duration="1000" />
            </div>
        </ion-content>
    </ion-page>
</template>

<style scoped>
    .timeline {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
    }

    .timeline-container {
        padding: 16px 24px;
        position: relative;
        background-color: inherit;
        width: 90%;
    }

    .timeline-container.right {
        left: 10%;
    }

    .timeline-container::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 25px;
        right: -17px;
        background-color: var(--ion-color-white);
        border: 2px solid var(--ion-color-secondary);
        top: 15px;
        border-radius: 50%;
        z-index: 1;
    }

    .timeline-container.right::after {
        left: -16px;
    }

    .timeline-content {
        padding: 12px 12px;
        background-color: var(--ion-color-white);
        position: relative;
        border-radius: 20px;
        box-shadow: 0 4px 8px 0 rgba(var(--ion-color-black-rgb), 0.2), 0 6px 20px 0 rgba(var(--ion-color-black-rgb), 0.19);
    }

    .timeline::before {
        content: '';
        position: absolute;
        width: 2px;
        background-color: var(--ion-color-primary);
        top: 0;
        bottom: 0;
        left: 10%;
        margin-left: -3px;
    }

    .astrodivider {
  margin: 32px auto;
  width: 100vw;
  max-width: 100%;
  position: relative;
}

.astrodividermask {
  overflow: hidden;
  height: 20px;
}

.astrodividermask:after {
  content: "";
  display: block;
  margin: -25px auto 0;
  width: 100%;
  height: 25px;
  border-radius: 125px / 12px;
  box-shadow: 0 0 8px var(--ion-color-primary);
}

.astrodivider span {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 100%;
  margin-bottom: -25px;
  left: 50%;
  margin-left: -25px;
  border-radius: 100%;
  box-shadow: 0 2px 4px var(--ion-color-secondary); /* Tint 3 of main color */
  background: #fff;
}

.astrodivider i {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  right: 4px;
  border-radius: 100%;
  border: 1px dashed var(--ion-color-secondary); /* Tint 4 of main color */
  text-align: center;
  line-height: 40px;
  font-style: normal;
  color: #049372; /* main color */
}

/* Neon Purple */

.neonpurple .astrodividermask:after {
  box-shadow: 0 0 8px var(--ion-color-primary); /* main color */
}
.astrodivider.neonpurple span {
  box-shadow: 0 2px 4px var(--ion-color-primary); /* tint 3 of main color */
}
.astrodivider.neonpurple i {
  border: 1px dashed var(--ion-color-secondary); /* tine 4 of main color */
  color: var(--ion-color-primary); /* main color */
}
</style>