<script setup>
    import { IonPage, IonContent, } from '@ionic/vue';
    import { ref, onMounted } from 'vue';
    import { ref as refer, query, orderByChild, onValue,} from "firebase/database";
    import { database, } from "@/firebase.ts"; 
    import Card from '@/components/blog/card.vue';

    let items = ref(null);
    let isLoading = ref(true);

    function watchDatabase() {
      const dbRef = refer(database, "articles");
      const latestArticlesQuery = query(dbRef, orderByChild("timestamp"));

      onValue(latestArticlesQuery, (snapshot) => {
        if (snapshot.exists()) {
          let articlesArray = [];

          snapshot.forEach((article) => {
            articlesArray.push({
              key: article.key,
              ...article.val(),
            });
          });

          items.value = articlesArray.reverse();
        } else {
          console.log("No data available");
        }
      }, (error) => {
        console.error("Error fetching latest articles:", error);
      });
    };
    
    onMounted(() => {
        watchDatabase();
        isLoading.value = false;
    });
</script>

<template>
  <ion-page>
    <ion-content v-if="!isLoading">
      <Card v-for="(a, i) in items" :key="i" :item="a" />
    </ion-content>
  </ion-page>
</template>