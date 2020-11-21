<template>
  <div>
    <h1>Million $inger</h1>
    <button @click="StartNow()">Start Now</button><br />
    <button @click="SelectTour()">Select Tournament</button><br />
    <button @click="Edit()">Edit Your Game</button><br />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    getRandomInt(min: number, max: number) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    StartNow() {
      fetch('http://ms.csie.org/api/game/tours')
        .then(response => response.json()) // TODO: error handling
        .then(responseJson =>
          this.$router.push({
            path: `/Tour/${this.getRandomInt(1, responseJson.data)}`
          })
        ) // TODO: error handling
    },
    SelectTour() {
      this.$router.push({ path: '/TourSelect' })
    },
    Edit() {
      this.$router.push({ path: '/Edit' })
    }
  }
})
</script>
