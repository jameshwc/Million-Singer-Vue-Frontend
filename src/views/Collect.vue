<template>
    <div>
        <ul>
      <li v-for="song in collect.songs" :key="song">
        <button @click="fetchCollectSongs(song.id)">{{song.singer}} {{ song.name }} </button><br>
      </li>
            </ul>
        </div>
</template>

<script lang="ts">
export default {
    name: "Collect",
    methods: {
        
    },
    props: {
        collect: {
            type: Object,
        }
    }
}
</script>