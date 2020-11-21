<template>
  <div>
    <ul>
      <li v-for="song in songs" :key="song">
        <button @click="fetchSong(song.id)">
          {{ song.singer }} {{ song.name }}</button
        ><br />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { ICollect, ISong } from '../util/interface'
export default defineComponent({
  name: 'Collect',
  props: {
      collect: Object,
  },
  setup(props, context) {
    const fetchSong = function (id: number) {
      fetch('http://ms.csie.org/api/game/songs/' + id)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson.data)
          context.emit('play', responseJson.data)
        })
    }
    let songs = ref<ISong[]>()
    onMounted(() => {
        console.log("hello, ", props.collect)
        songs.value = props.collect?.songs;
    });
    return {
        fetchSong,
        songs,
        props
    }
  },
})
</script>