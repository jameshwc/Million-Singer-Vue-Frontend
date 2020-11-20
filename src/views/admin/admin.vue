<template>
<div>
    <button @click="Song()">Edit Song</button><br>
    <button @click="Collect()">Edit Collect</button><br>
    <button @click="Tournament()">Edit Tournament</button><br>
    <br>
    </div>
</template>

<script>
export default {
    data: function() {
    return {
    }
  },
  
methods: {
    Song(){
        this.$router.push({ path: '/Edit/Song' })
    },
    Collect(){
        this.$router.push({ path: '/Edit/Collect' })
    },
    Tournament(){
        this.$router.push({ path: '/Edit/Tournament' })
    },
}, 
components: {
},
}
</script>