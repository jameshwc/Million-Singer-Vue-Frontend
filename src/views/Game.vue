<template>
  <div>
    <Song v-if="playSong" :song="song"> </Song>
    <Collect v-else-if="playCollect" :collect="collect" @play="updatePlaySong"> </Collect>
    <Tournament v-else @play="updatePlayCollect"></Tournament>
    </div>
</template>

<script>
import Collect from "./Collect"
import Tournament from "./Tournament"
import Song from "./Song"

export default {
  data: function() {
    return {
      playCollect: false,
      playSong: false,
    }
  },
  
methods: {
  updatePlayCollect(collect) {
      this.playCollect = true;
      this.collect = collect;
  },
  updatePlaySong(song) {
      this.playSong = true;
      this.playCollect = false;
      this.song = song;
  }
}, 
components: {
  Collect,
  Tournament,
  Song
},
}
</script>
