<template>
  <div>
    <ul>
      <li
        v-for="song in songs"
        :key="song"
      >
        <button @click="fetchSong(song.id)">
          {{ song.singer }} {{ song.name }}
        </button><br>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { ICollect, ISong, ISongWithLyrics } from '../util/interface'
export default defineComponent({
  name: 'Collect',
  props: {
      collect: {
        type: Object as () => ICollect,
        default: {},
      },
  },
emits: ['play'],
  setup(props, context) {
    const fetchSong = function (id: number) {
      fetch('http://ms.csie.org/api/game/songs/' + id)
        .then((response) => response.json())
        .then((responseJson) => {
          const song = ref<ISongWithLyrics>()
          song.value = responseJson.data
          context.emit('play', song)
        })
    }
    let songs = ref<ISong[]>()
    onMounted(() => {
        songs.value = props.collect?.songs;
    });
    return {
        fetchSong,
        songs,
        props,
    }
  },
})
</script>