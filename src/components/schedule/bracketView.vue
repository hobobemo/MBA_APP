<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Object,
    required: true
  },
  winner: {
    type: Object,
    required: true
  },
  loser: {
    type: Object,
    required: false,
  }
});

// Extract bracket matches
const matches = computed(() => {
  const allMatches = []
  for (const pool of props.scheduleData.pools || []) {
    for (const game of pool.schedules || []) {
      allMatches.push({
        gameId: game.GameId,
        label: `${pool.pool}${Math.abs(game.gameNumber)}`,
        date: new Date(game.the_datetime).toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        }),
        field: game.fieldName,
        winner: game.winningTeam,
        loser: game.losingTeam
      })
    }
  }
  return allMatches
})
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Bracket Schedule</h2>

    <div class="grid grid-cols-3 gap-6">
      <div
        v-for="match in matches"
        :key="match.gameId"
        class="border rounded-lg shadow p-4 bg-white"
      >
        <div class="text-sm text-purple-700 font-semibold mb-2">
          {{ match.label }}
        </div>
        <div class="text-xs text-gray-600 mb-1">
          {{ match.date }}<br />
          {{ match.field }}
        </div>
        <div class="text-sm mt-2">
          <div>
            <span class="font-semibold text-green-700">Winner:</span>
            {{ match.winner || 'TBD' }}
          </div>
          <div>
            <span class="font-semibold text-red-700">Loser:</span>
            {{ match.loser || 'TBD' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* You can extend this with lines/arrows or fancier bracket logic */
</style>
