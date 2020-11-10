<template>
    <div>
        <ul>
      <li v-for="song in collect.songs" :key="song">
        <button @click="fetchSong(song.id)">{{song.singer}} {{ song.name }} </button><br>
      </li>
            </ul>
        </div>
</template>
<script>
export default {
    name: "Collect",
    data: function(){
    },
    methods: {
      fetchSong(id) {
          let this_ = this;
          fetch("http://ms.csie.org/api/game/songs/" + id)
          .then(response => response.json())
          .then(responseJson => {
              console.log(responseJson.data);
              this_.$emit("play", responseJson.data);
          })
      }  
    },
    props: {
        collect: {
            type: Object,
        }
    }
}
</script>