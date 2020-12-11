<template>
  <div>
    Title: <input
      v-model="title"
      type="text"
    >
    <div
      v-for="(collect, collectID) in collects"
      :key="collectID"
    >
      <input
        v-model="chosenCollects[collectID]"
        type="checkbox"
      >
      {{ collect.title }} {{ collect.songs }}
    </div>
    <button @click="Submit">
      Submit
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ICollect, ISubtitle, ILine, IPostTour } from '../../util/interface'
import { GetGameAPI } from '../../util/api'

export default defineComponent({
  setup() {
    let collects = ref<Array<ICollect>>()
    let chosenCollects = ref<Array<boolean>>()
    let title = ref('')
    GetGameAPI('/collects')
      .then(response => {
        console.log(response)
        if (response.code !== 200) {
          console.log('error: ', response.msg)
          return
        }
        collects.value = response.data
        chosenCollects.value = new Array<boolean>(collects.value.length)
      })
      .catch(error => {
        console.log(error)
      })
    let Submit = function() {
      console.log(title.value, chosenCollects.value)
      let c: IPostTour = {
        collects: new Array<number>(),
      }
      chosenCollects.value.forEach((val, idx) => {
        if (val === true) {
          c.collects.push(collects.value[idx].id);
        }
      })
      console.log(JSON.stringify(c))
      fetch('http://ms.csie.org/api/game/tours/new', {
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
      collects,
      chosenCollects,
      title,
      Submit,
    }
  },
})
</script>
