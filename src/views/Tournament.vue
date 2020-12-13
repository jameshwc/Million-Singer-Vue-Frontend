<template>
  <div>
    <h2>Tournament #{{ tourID }}</h2>
    <ul>
      <li v-for="collect in collects" :key="collect">
        <button @click="fetchCollectSongs(collect.id)">
          {{ collect.title }}</button
        ><br />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ICollect, ISong } from '../util/interface'

export default defineComponent({
  emits: ["play"],
  setup(props, context) {
    
    const route = useRoute()
    const tourID = route.params.TourID
    
    const collects = ref<ICollect[]>([])
    
    onMounted(async () => {
      await fetch('http://ms.csie.org/api/game/tours/' + tourID)
      .then((response) => response.json())
      .then((responseJson) => {
        collects.value = responseJson.data.collects
        console.log(responseJson.data.collects)
      })
    })
    
    const fetchCollectSongs = function (collectID: string) {
      fetch('http://ms.csie.org/api/game/collects/' + collectID)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          const collect = ref<ICollect>()
          collect.value = responseJson.data
          context.emit('play', collect)
        })
    }
    return {
      collects,
      tourID,
      fetchCollectSongs,
    }
  },
})
// export default defineComponent({
//   collects: [],
//   tourID: 0,
//   // data: function() {
//   //   return {
//   //     collects: [],
//   //     tourID: 0,
//   //   }
//   // },
//   created: function(){
//     this.tourID = this.$route.params.TourID;
//     this.fetchCollects();
//   },

// methods: {
//   fetchCollects() {
//     let self = this;
//     fetch("http://ms.csie.org/api/game/tours/"+this.$route.params.TourID).
//       then(response => response.json()).
//       then(responseJson => {
//         self.collects = responseJson.data.collects;
//       })
//   },
//     fetchCollectSongs(collectID) {
//     let this_ = this;
//     fetch("http://ms.csie.org/api/game/collects/"+collectID).
//       then(response => response.json()).then(responseJson=>{
//         this_.collect = responseJson.data;
//         this_.$emit("play", this_.collect);
//       })
//   }
// },
// })
</script>
