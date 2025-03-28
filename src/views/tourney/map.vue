<script setup>
  import { onMounted, onBeforeUnmount } from "vue";
  import { IonPage, IonContent } from "@ionic/vue";
  import L from "leaflet";
  import { ref as dbRef, onValue } from "firebase/database";
  import { ref as storageRef, getDownloadURL } from "firebase/storage";
  import { database, storage } from "@/firebase"; 

  let map = null;
  let markersLayer = null;

  const loadMarkers = () => {
    const markersRef = dbRef(database, "front/map/markers");

    onValue(markersRef, async (snapshot) => {
      if (snapshot.exists()) {
        const markersData = snapshot.val();
        markersLayer.clearLayers();

        for (const key in markersData) {
          const marker = markersData[key];
          const { position, icon, title } = marker;
          
          try {
            const iconUrl = await getDownloadURL(storageRef(storage, icon));

            const customIcon = L.icon({
              iconUrl,
              iconSize: [32, 32],
              iconAnchor: [16, 32],
              popupAnchor: [0, -32],
            });

            L.marker([position.lat, position.lng], { icon: customIcon })
              .addTo(markersLayer)
              .bindPopup(title);

          } catch (error) {
            console.error("Error fetching icon:", error);
          }
        }
      }
    });
  };

  const loadPolys = () => {
    const polysRef = dbRef(database, "front/map/polys");

    onValue(polysRef, (snapshot) => {
      if (snapshot.exists()) {
        const polysData = snapshot.val();

        // Clear previous polygons
        markersLayer.clearLayers(); // You can keep separate layers for markers and polygons if needed

        for (const key in polysData) {
          const poly = polysData[key];
          const { fillColor, fillOpacity, strokeWeight, content, paths } = poly;  // Coordinates should be an array of [lat, lng]

          // Add the polygon to the map
          const polygon = L.polygon(paths, {
            color: fillColor,        // Optional: Set polygon color (default: blue)
            fillOpacity: fillOpacity,              // Optional: Set opacity
            weight: strokeWeight                      // Optional: Set polygon line weight
          }).addTo(map);

          // Bind a popup to the polygon
          if (content) {
            polygon.bindPopup(content);
          }
        }
      }
    });
  };

  onMounted(() => {
    setTimeout(() => {
      if (!map) {
        map = L.map("map").setView([38.786259, -104.722978], 17);

        L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        markersLayer = L.layerGroup().addTo(map);

        loadMarkers();
        loadPolys()
      }
    }, 500);
  });

  onBeforeUnmount(() => {
    if (map) {
      map.remove();
    }
  });
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="map" />
    </ion-content>
  </ion-page>
</template>

<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 0;
}
</style>
