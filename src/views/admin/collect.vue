<template>
  <div>
    Title: <input
      v-model="title"
      type="text"
    >
    <div
      v-for="(song, songID) in songs"
      :key="songID"
    >
      <input
        v-model="chosenSongs[songID]"
        type="checkbox"
      >
      {{ song.name }} - {{ song.singer }}
    </div>
    <button @click="Submit">
      Submit
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ISong, ISubtitle, ILine, IPostCollect } from '../../util/interface'
import { GetGameAPI } from '../../util/api'

export default defineComponent({
  setup() {
    let songs = ref<Array<ISong>>()
    let chosenSongs = ref<Array<boolean>>()
    let title = ref('')
    GetGameAPI('/songs')
      .then(response => {
        console.log(response)
        if (response.code !== 200) {
          console.log('error: ', response.msg)
          return
        }
        songs.value = response.data
        chosenSongs.value = new Array<boolean>(songs.value.length)
      })
      .catch(error => {
        console.log(error)
      })
    let Submit = function() {
      console.log(title.value, chosenSongs.value)
      let c: IPostCollect = {
        title: title.value,
        songs: new Array<number>(),
      }
      chosenSongs.value.forEach((val, idx) => {
        if (val === true) {
          c.songs.push(songs.value[idx].id);
        }
      })
      fetch('http://ms.csie.org/api/game/collects/new', {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(c),
      })
        .then(data => data.json())
        .catch(err => {
          console.log(err)
        })
        .then(data => {
          console.log(data)
        })
    }
    return {
      songs,
      chosenSongs,
      title,
      Submit,
    }
  },
})
</script>
