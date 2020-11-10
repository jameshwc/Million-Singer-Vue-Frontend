<template>
    <div>
        <h2>{{song.Song.name}} - {{song.Song.singer}} </h2>
        <ol v-for="lyric in song.Song.lyrics" :key=lyric>
            {{lyric.line}}
            </ol>
        </div>
</template>
<script>
export default {
    name: "Song",
    methods: {
    },
    props: {
        song: {
            type: Object,
        }
    }
}
</script>