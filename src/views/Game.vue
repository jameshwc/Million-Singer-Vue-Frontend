<template>
  <div>
    
    <Collect v-if="playCollect" :collect="collect"> </Collect>
    <Tournament v-else @play="updatePlayCollect"></Tournament>
    </div>
</template>

<script>
import Collect from "./Collect"
import Tournament from "./Tournament"
export default {
  data: function() {
    return {
      playCollect: false,
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
  updatePlayCollect(collect) {
      this.playCollect = true;
      this.collect = collect;
  }
}, 
components: {
  Collect,
  Tournament
},
}
</script>
