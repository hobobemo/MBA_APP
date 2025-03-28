<script setup>
    import { computed, watchEffect } from 'vue';
    import { IonText, } from '@ionic/vue';

    const props = defineProps({
        data: {
            type: Object,
            required: true,
        }
    });

    const cleanedHtml = computed(() => 
      props.data?.html ? props.data.html.replace(/<!--.*?-->/g, '') : ''
    );

    watchEffect(() => {
      if (props.data?.style) {
        const existingStyle = document.getElementById('dynamic-style');
        if (existingStyle) existingStyle.remove();

        const styleTag = document.createElement('style');
        styleTag.id = 'dynamic-style';
        styleTag.innerHTML = props.data.style.replace(/<!--|-->/g, '');
        document.head.appendChild(styleTag);
      }
    });
</script>

<template>
    <div class="ion-padding" v-html="cleanedHtml" />
</template>

<style>
/* ✅ Enhance the table while keeping API-defined borders */
table {
  width: 100%;
  border-collapse: collapse;
}

td, th {
  padding: 2px; /* Adds spacing inside cells */
}

th {
  background-color: var(--ion-color-black);
  font-weight: bold;
}

/* ✅ Ensure links are readable */
table a {
  color: var(--ion-color-primary);
  text-decoration: none;
}

table td {
  border-color: var(--ion-color-primary) !important; /* Default gray color for borders */
  font-family: var(--ion-font-family) !important;  /* Change font to Arial */
  font-size: 1rem !important;                   /* Set font size to 14px */
  font-weight: bold !important;                 /* Make text bold */
  color: var(--ion-color-black) !important;                      /* Set font color to dark gray */
  line-height: 1.5 !important;                 /* Adjust line height for readability */
}
</style>