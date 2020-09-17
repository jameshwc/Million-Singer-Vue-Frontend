<template>
  <div>
    <h1>Million $inger</h1>
    <button @click="StartNow()">Start Now</button><br>
    <button @click="SelectTour()">Select Tournament</button><br>
    <button @click="Edit()" disabled>Edit Your Game</button><br>
  </div>
</template>

<script>
export default {
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    StartNow() {
      fetch('http://ms.csie.org/api/game/tours')
      .then(response => response.json()) // TODO: error handling
      .then(responseJson => this.$router.push({ path: `/Tour/${this.getRandomInt(1, responseJson.data)}` })) // TODO: error handling
    },
    SelectTour() {
      this.$router.push({ path: '/TourSelect' })
    },
    Edit() {
      alert('You cannot edit the game for now')
    }
  }
}
</script>
