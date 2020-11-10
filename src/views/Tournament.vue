<template>
  <div>
    <h2>Tournament #{{ tourID }}</h2>
    <ul>
      <li v-for="collect in collects" :key="collect">
        <button @click="fetchCollectSongs(collect.id)">{{ collect.title }} </button><br>
      </li>
    </ul>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      collects: [],
      tourID: 0,
    }
  },
  created: function(){
    this.tourID = this.$route.params.TourID;
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
  },
    fetchCollectSongs(collectID) {
    let this_ = this;
    fetch("http://ms.csie.org/api/game/collects/"+collectID).
      then(response => response.json()).then(responseJson=>{
        this_.collect = responseJson.data;
        this_.$emit("play", this_.collect);
      })
  }
}, 
}
</script>
