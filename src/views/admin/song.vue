<template>
<div>
    Song URL (youtube only) <input v-model="songURL" size="40"> <button @click="Check"> check </button> <div v-if="hasChecked" style="display: inline">{{ videoID }}</div> <br>
    <br> <div> Subtitle: <select :disabled="!hasChecked || disableEmbeddedSubtitle" v-model="subtitleLangTranslate"> 
        <option v-if="!hasChecked">Please check the video URL first.</option>
        <option v-for="subtitle in subtitles" :key="subtitle"> 
            {{ subtitle._lang_original }}
        </option>
    </select><input type="checkbox" v-model="disableEmbeddedSubtitle"> <label for="checkbox">Don't use youtube cc subtitle</label></div>
    <div v-if="disableEmbeddedSubtitle">
        <br> LRC/SRT file upload: <input type="file">
        <br> Languages: <select v-model="subtitleLang">
            <option v-for="language in languages" :key="language">
                {{ language }}
            </option>
        </select>
    </div>
    <br><div> Title: {{ songTitle }} </div>
    <br><div> Artist Name: <input v-model="artist" size="30"> </div>
    <br><div> Song's Name: <input v-model="songName" size="30"> </div>
    <br><div> Genre: 
        <div v-for="genre in genres" :key="genre">
            <label>{{genre}}
            <input type="checkbox" v-model="songGenres[genre]">
            </label>
        </div>
    </div>
    <br><button @click="Submit"> Submit </button>
    {{ songGenres }}
    </div>
</template>

<script>
export default {
    data: function() {
    return {
        songURL: "https://www.youtube.com/watch?v=8PIR1kvaDkQ",
        needLyricsFile: false,
        hasChecked: false,
        disableEmbeddedSubtitle: false,
        videoID: "",
        subtitles: null,
        languages: null,
        genres: null,
        songGenres: {},
        artist: "",
        songName: "",
        songTitle: "",
        subtitleLang: "",
        subtitleLangTranslate: "",
    }
  },
  created: function () {
      fetch("http://ms.csie.org/api/game/languages").then(data => data.json())
      .then( data => {
          this.languages = data.data;
      });
      fetch("http://ms.csie.org/api/game/genres").then(data => data.json())
      .then(data=>{this.genres = data.data;});
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
    Submit: function(e){
        var genres = ""
        for (var genre in this.songGenres) {
            if(this.songGenres[genre] === true) {
                genres += genre + ",";
            }
        }
        genres = genres.slice(0, -1);
        var filetype = "file";
        if(!this.disableEmbeddedSubtitle) {
            filetype = "youtube";
            for(var i = 0; i < this.subtitles.length; i++) {
                if(this.subtitles[i]._lang_original === this.subtitleLangTranslate) {
                    this.subtitleLang = this.subtitles[i]._lang_code;
                    break;
                }
            }
        }
        var obj = {
            url: this.songURL,
            singer: this.artist,
            genre: genres,
            name: this.songName,
            language: this.subtitleLang,
            file_type: filetype,
        }
        console.log(this.subtitleLangTranslate, JSON.stringify(obj), this.subtitles);
        e.preventDefault();
    },
    Check(){
        this.hasChecked = true;
        this.videoID = this.parseYoutubeURL(this.songURL);
        this.CheckHasSubtitle();
        this.ParseVideoInfo();
    },
    CheckHasSubtitle(){
        var api = "http://www.youtube.com/api/timedtext?v=" + this.videoID + "&type=list";
        const x2js = require('x2js');
        var x2json = new x2js()
        fetch(api).then(response => response.text())
        .then(data => {
            var newJson = x2json.xml2js(data);
            if(newJson.transcript_list.track !== undefined) {
                var track = newJson.transcript_list.track;
                if(track.length === undefined) {
                    this.subtitles = new Array();
                    this.subtitles.push(track);
                } else {
                    this.subtitles = track;
                }
            }
        });
    },
    ParseVideoInfo(){
        var api = "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAuBJUeyvZkZaXHFNSjamWMkJjhk27Ccb0&part=snippet&id=";
        fetch(api+this.videoID).then(data=>data.json()).then(data => {
            this.songTitle = data.items[0].snippet.title;
        })
    },
    parseYoutubeURL(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }
}, 
components: {
},
}
</script>