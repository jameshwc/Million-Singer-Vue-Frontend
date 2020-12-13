<template>
  <div>
    <button @click="Song()">
      Edit Song
    </button><br>
    <button @click="Collect()">
      Edit Collect
    </button><br>
    <button @click="Tournament()">
      Edit Tournament
    </button><br>
    <br>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    const Song = function() {
      router.push({ path: '/Edit/Song' })
    }
    const Collect = function() {
      router.push({ path: '/Edit/Collect' })
    }
    const Tournament = function() {
      router.push({ path: '/Edit/Tournament' })
    }
    return {
        Song,
        Collect,
        Tournament,
    }
  },
})
</script>
