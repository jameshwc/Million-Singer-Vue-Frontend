<template>
    <ul>
      <li v-for="collect in collects" :key="collect">
        {{ collect.title }}
      </li>
    </ul>
</template>

<script>
export default {
  data: function() {
    return {
      collects: []
    }
  },
  created: function(){
    this.fetchCollects();
  },
methods: {
  fetchCollects() {
    let self = this;
    fetch("http://ms.csie.org/api/game/tours/"+this.$route.params.TourID).
      then(response => response.json()).
      then(responseJson => {
        self.collects = responseJson.data.collects;
      })
  }
}
}
</script>
