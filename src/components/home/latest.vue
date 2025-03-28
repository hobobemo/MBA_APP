<script setup>
    import { ref, onMounted } from 'vue';
    import { ref as refer, query, orderByChild, onValue,} from "firebase/database";
    import { database } from "@/firebase.ts"; 
    import Card from '@/components/blog/card.vue';

    let items = ref(null);

    function watchDatabase() {
      const dbRef = refer(database, "articles");
      const latestArticlesQuery = query(dbRef, orderByChild("timestamp"));

      onValue(latestArticlesQuery, (snapshot) => {
        if (snapshot.exists()) {
          let articlesArray = [];

          // Convert object to array and include keys
          snapshot.forEach((childSnapshot) => {
            articlesArray.push({
              key: childSnapshot.key,
              ...childSnapshot.val()
            });
          });

          // Reverse to show most recent first
          items.value = articlesArray.reverse();
        } else {
          console.log("No data available");
        }
      }, (error) => {
        console.error("Error fetching latest articles:", error);
      });
    };

    function formatDate(timestamp) {
      return new Date(timestamp).toLocaleString();
    }

    onMounted(() => {
        watchDatabase();
    });
</script>

<template>
  <Card v-for="(a, i) in items" :key="i" :item="a" v-motion-slide-visible-bottom />
</template>