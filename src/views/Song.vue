<template>
  <div>
    <center>
      <h2>{{ song.name }} - {{ song.singer }}</h2>
      <div id="player" />
      <button
        v-if="isNotStart"
        @click="playVideo"
      >
        play
      </button>
      <h4>{{ prevLine }}</h4>
      <h2>{{ line }}</h2>
      <h4>{{ nextLine }}</h4>
      <button
        v-if="missLyrics"
        @click="showMissLyrics"
      >
        Show Answer
      </button>
      <br><br>
      <button
        v-if="showContinuePlay"
        @click="continuePlaying"
      >
        Continue Playing
      </button>
    </center>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { ICollect, ISongWithLyrics } from '../util/interface'

export default defineComponent({
  props: {
    song: {
      type: Object as () => ISongWithLyrics,
      default: {},
    },
  },
  setup(props, context) {
    var tag = document.createElement('script')
    tag.src = 'http://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // const song: ISongWithLyrics = props.propSong;
    let player: YT.Player
    let prevLine = ref<string>('')
    let line = ref<string>('')
    let nextLine = ref<string>('')
    let answerLine = ref<string>('')
    let afterMissLyrics = ref<boolean>(false)
    let showContinuePlay = ref<boolean>(false)
    let missLyrics = ref<boolean>(false)
    let isNotStart = ref<boolean>(true)
    console.log('hello!', props.song)
    const isPause = function(): boolean {
      return player.getPlayerState() == YT.PlayerState.PAUSED
    }
    const renderHiddenAnswerLine = function(cur_line: string): string {
      var line = ''
      for (var i = 0; i < cur_line.length; i++) {
        if (cur_line[i] != ' ') {
          line += '\u2B50'
        } else {
          line += ' '
        }
      }
      return line
    }
    const showTime = function() {
      let currentLineIndex = 0;
      setInterval(() => {
        if (!isPause()) {
          const currentTime = player.getCurrentTime() * 1000
          let idx = -1
          if (currentTime > props.song.lyrics[currentLineIndex].end_time) {
            currentLineIndex += 1
          }
          idx = currentLineIndex
          if (currentTime < props.song.lyrics[0].start_time) {
            idx = -1;
          }
          if (idx >= 0) {
            if (idx > 0) {
              prevLine.value = props.song.lyrics[idx - 1].line
            }
            if (idx + 1 < props.song.lyrics.length) {
              nextLine.value = props.song.lyrics[idx + 1].line
            }
            line.value = props.song.lyrics[idx].line
            if (idx + 1 == props.song.miss_lyric_id) {
              nextLine.value = answerLine.value
            }
          }
          if (!afterMissLyrics.value && idx == props.song.miss_lyric_id) {
            missLyrics.value = true
            showContinuePlay.value = true
            line.value = answerLine.value
            player.pauseVideo()
          }
        }
      }, 10)
    }
    const onPlayerReady = function() {
      player.playVideo()
      line.value = '♪♪ Music ♪♪'
      nextLine.value = props.song.lyrics[0].line as string
      answerLine.value = renderHiddenAnswerLine(
        props.song.lyrics[props.song.miss_lyric_id].line,
      )
      console.log('hi! ', answerLine.value)
      showTime()
    }
    const initYoutube = function() {
      player = new YT.Player('player', {
        width: 600,
        height: 400,
        videoId: props.song.video_id,
        playerVars: {
          cc_load_policy: 0,
        },
        events: {
          onReady: onPlayerReady,
        },
      })
    }
    const playVideo = function() {
      initYoutube()
      isNotStart.value = false
    }
    const showMissLyrics = function() {
      line.value = props.song.lyrics[props.song.miss_lyric_id].line
      missLyrics.value = false
    }
    const continuePlaying = function() {
      showContinuePlay.value = false
      player.playVideo()
      showTime()
      afterMissLyrics.value = true
    }
    return {
      isNotStart,
      playVideo,
      prevLine,
      line,
      nextLine,
      missLyrics,
      showMissLyrics,
      showContinuePlay,
      continuePlaying,
    }
  },
})
</script>
