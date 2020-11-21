<template>
  <div>
    <Song v-if="playSong" :song="song"> </Song>
    <Collect v-else-if="playCollect" :collect="collection" @play="updatePlaySong">
    </Collect>
    <Tournament v-else @play="updatePlayCollect"></Tournament>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import Collect from './Collect.vue'
import Tournament from './Tournament.vue'
import type { ICollect, ISong } from '../util/interface'
import Song from './Song.vue'

export default defineComponent({
  name: 'Game',
  components: {
    Collect,
    Tournament,
    Song,
  },
  setup() {
    const playCollect = ref(false)
    const playSong = ref(false)
    var collection =  ref({})
    let song: ISong[] = []
    const updatePlayCollect = function (c: Ref) {
      playCollect.value = true
      collection.value = c.value
      console.log(collection)
    }
    const updatePlaySong = function (s: Ref) {
      playSong.value = true
      playCollect.value = false
      song = s.value
    }
    return {
      playCollect,
      playSong,
      song,
      collection,
      updatePlayCollect,
      updatePlaySong,
    }
  },
})
</script>
