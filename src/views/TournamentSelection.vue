<template>
  <div>
    <h2>Tournament Selection</h2>
    <span v-for="i in TournamentSize" :key="i">
      <button @click="$router.push({ path: `/Tour/${i}` })">Tournament {{ i }}</button><br>
    </span>
  </div>
</template>

<script>
export default {
  data: function() {
    return { TournamentSize: 0 }
  },
  created() {
    fetch('http://ms.csie.org/api/game/tours')
    .then(response => response.json()) // TODO: error handling
    .then(responseJson => this.TournamentSize = responseJson.data) // TODO: error handling
  }
}
</script>
