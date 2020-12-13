<template>
  <div>
    Song URL (youtube only)
    <input
      v-model="songURL"
      size="40"
    >
    <button @click="Check">
      Check
    </button>
    <div
      v-if="hasChecked"
      style="display: inline"
    >
      {{ videoID }}
    </div>
    <br>
    <br>
    <div>
      Subtitle:
      <select
        v-model="subtitleLangTranslate"
        :disabled="!hasChecked || disableEmbeddedSubtitle"
      >
        <option v-if="!hasChecked">
          Please check the video URL first.
        </option>
        <option
          v-for="subtitle in subtitles"
          :key="subtitle"
        >
          {{ subtitle.lang_translated }}
        </option>
      </select>
      <input
        v-model="disableEmbeddedSubtitle"
        type="checkbox"
      >
      <label for="checkbox">Don't use youtube cc subtitle </label>
      <br>
      <button @click="DownloadSubtitle">
        Download Subtitle
      </button>
    </div>
    <div v-if="disableEmbeddedSubtitle">
      <br>
      LRC/SRT file upload: <input type="file"> <br>
      Languages:
      <select v-model="subtitleLang">
        <option
          v-for="language in languages"
          :key="language"
        >
          {{ language }}
        </option>
      </select>
    </div>
    <br>
    <div>Title: {{ songTitle }}</div>
    <br>
    <div>
      Artist Name:
      <input
        v-model="artist"
        size="30"
      >
    </div>
    <br>
    <div>
      Song's Name:
      <input
        v-model="songName"
        size="30"
      >
    </div>
    <br>
    <div>
      Genre:
      <div
        v-for="genre in genres"
        :key="genre"
        style="display:inline"
      >
        <label>
          <input
            v-model="songGenres[genre]"
            type="checkbox"
          >
          {{ genre }}
        </label>
      </div>
    </div>
    <br>
    <button @click="Submit">
      Submit
    </button>
    <button @click="Preview">
      Preview
    </button>
    <br>
    <div
      v-for="(line, index) in lines"
      :key="index"
    >
      <input
        v-model="missLyricIDs[index]"
        type="checkbox"
      >
      {{ index }} {{ line.__text }}
    </div>
    <!-- <Song :song="song"></Song> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ISongWithLyrics, ISubtitle, ILine } from '../../util/interface'
import { languageCodeMap } from '../../util/caption'
import { GetGameAPI } from '@/util/api'
// import Song from '../Song.vue'

export default defineComponent({
  // components: {
  //   Song,
  // },
  setup() {
    let songURL = ref<string>('https://www.youtube.com/watch?v=8PIR1kvaDkQ')
    let needLyricsFile = ref(false)
    let hasChecked = ref(false)
    let disableEmbeddedSubtitle = ref(false)
    let videoID = ref('')
    let subtitles = ref<Array<ISubtitle>>()
    let languages = ref<Array<string>>()
    let genres = ref<Array<string>>()
    let artist = ref('')
    let songName = ref('')
    let songTitle = ref('')
    let songGenres = ref<any>({})
    let subtitleLangTranslate = ref('')
    let subtitleLang = ref('')
    let song = ref<ISongWithLyrics>()
    let lines = ref<ILine[]>()
    let missLyricIDs = ref<Array<boolean>>()
    let router = useRouter()
    onMounted(async () => {
      await fetch('http://ms.csie.org/api/game/languages')
        .then(data => data.json())
        .then(data => {
          languages.value = data.data
        })
      await fetch('http://ms.csie.org/api/game/genres')
        .then(data => data.json())
        .then(data => {
          genres.value = data.data
        })
    })
    const Submit = function() {
      let genresStr = ''
      for (let genre in songGenres.value) {
        if (songGenres.value[genre] === true) {
          genresStr += genre + ','
        }
      }
      genresStr = genresStr.slice(0, -1)
      var filetype = 'file'
      if (!disableEmbeddedSubtitle.value) {
        filetype = 'youtube'
        for (var i = 0; i < subtitles.value.length; i++) {
          if (
            subtitles.value[i].lang_translated === subtitleLangTranslate.value
          ) {
            subtitleLang.value = subtitles.value[i].lang_code
            break
          }
        }
      }
      let missLyrics = new Array<number>()
      missLyricIDs.value.forEach((val, idx) => {
        if (val === true) {
          missLyrics.push(idx)
        }
      })
      var obj = {
        url: songURL.value,
        singer: artist.value,
        genre: genresStr,
        name: songName.value,
        language: subtitleLang.value,
        file_type: filetype,
        miss_lyrics: missLyrics,
      }
      console.log(JSON.stringify(obj))
      fetch('http://ms.csie.org/api/game/songs/new', {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(obj),
      })
        .then(data => data.json()).catch(err => {console.log(err)})
        .then(data => {
          console.log(data)
        })
    }
    const Check = function() {
      videoID.value = parseYoutubeURL(songURL.value)
      hasChecked.value = true
      CheckHasSubtitle()
      ParseVideoInfo()
    }
    const CheckHasSubtitle = function() {
      // var api =
      //   'http://www.youtube.com/api/timedtext?v=' + videoID.value + '&type=list'
      let api = 'http://ms.csie.org/api/game/captions/youtube?url=https://www.youtube.com/watch?v=' + videoID.value;
      GetGameAPI("/captions/youtube?url=https://www.youtube.com/watch?v=" + videoID.value).then(
        response => {
          if(response.code !== 200) {
            // TODO: error handling
            return
          }
          subtitles.value = new Array<ISubtitle>();
          for(let language in response.data) {
            subtitles.value.push({
              lang_code: language, 
              base_url: response.data[language], 
              lang_translated: languageCodeMap.get(language),
            });
          }
          subtitleLangTranslate.value = subtitles.value[0].lang_translated;
        })
    }
    const parseYoutubeURL = function(url: string): string {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
      var match = url.match(regExp)
      return match && match[7].length == 11 ? match[7] : ''
    }
    const ParseVideoInfo = function() {
      var api =
        'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAuBJUeyvZkZaXHFNSjamWMkJjhk27Ccb0&part=snippet&id='
      fetch(api + videoID.value)
        .then(data => data.json())
        .then(data => {
          songTitle.value = data.items[0].snippet.title
        })
    }
    const Preview = function() {
      song.value.video_id = videoID.value
      song.value.name = songName.value
      // song.value.lyrics =
    }
    const DownloadSubtitle = function() {
      let api: string
      subtitles.value.forEach((val, idx)=> {
        if(val.lang_translated === subtitleLangTranslate.value) {
          api = val.base_url;
        }
      })
      const x2js = require('x2js')
      let x2json = new x2js()
      fetch(api)
        .then(response => response.text())
        .then(data => {
          var newJson = x2json.xml2js(data)
          if (newJson.transcript.text !== undefined) {
            lines.value = newJson.transcript.text
            lines.value.forEach(line => {
              line.__text = line.__text.replace(/&#39;/g, "'")
            })
          }
          missLyricIDs.value = new Array(lines.value.length)
        })
    }
    return {
      songURL,
      Check,
      hasChecked,
      videoID,
      disableEmbeddedSubtitle,
      subtitleLangTranslate,
      subtitles,
      subtitleLang,
      languages,
      songTitle,
      artist,
      songName,
      genres,
      songGenres,
      Submit,
      DownloadSubtitle,
      lines,
      missLyricIDs,
    }
  },
})
</script>
