<template>
    <div>
      <center>
        <h2>{{song.name}} - {{song.singer}} </h2>
        <div id="player"></div>
        <button v-if="isNotStart" @click="playVideo">play</button>
        <h4>{{prevLine}}</h4>
        <h2>{{line}}</h2>
        <h4>{{nextLine}}</h4>
        <button v-if="missLyrics" @click="showMissLyrics">Show Answer</button><br><br>
        <button v-if="continuePlay" @click="continuePlaying"> Continue Playing </button>
      </center>
    </div>
</template>
<script>
export default {
  name: "Song",
  data() {
    return {
      player: null,
      isNotStart: true,
      prevLine: "",
      line: "You haven't played the video yet.",
      nextLine: "",
      missLyrics: false,
      continuePlay: false,
      afterMissLyrics: false,
      answerLine: "",
    }
  },
  created:function(){
  },
		mounted: function() {
			var tag = document.createElement('script');
			tag.src = "http://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		},
  methods: {
    playVideo(){
      this.initYoutube();
      this.isNotStart = false;
    },
    initYoutube() {
      const _ = this;
      console.log("initYoutube");
      this.player = new window.YT.Player("player", {
        width: 600,
        height: 400,
        videoId: this.song.video_id,
        playerVars: {
          'cc_load_policy': 0,
        },
        events: {
          onReady: _.onPlayerReady,
          onStateChange: _.onPlayerStateChange,
          pauseVideo: _.pauseVideo,
        }
      });
    },
    onPlayerReady() {
      this.player.playVideo();
      this.line = "♪♪ Music ♪♪";
      this.nextLine = this.song.lyrics[0].line;
      this.answerLine = this.renderHiddenAnswerLine(this.song.lyrics[Number(this.song.miss_lyric_id)].line);
      this.showTime();
    },
    onPlayerStateChange() {
      console.log("Player state changed");
    },
    pauseVideo() {
      console.log("pause video")
      this.player.pauseVideo();
    },
    isPause(){
      return this.player.getPlayerState() == 2;
    },
    showMissLyrics(){
      this.line = this.song.lyrics[Number(this.song.miss_lyric_id)].line;
      this.missLyrics = false;
    },
    showTime(){
      setInterval(() => {
        if(!this.isPause()){
          var currentTime = this.player.getCurrentTime() * 1000;
          var idx = -1;
          for(var i = 0; i < this.song.lyrics.length; i++){
            if(currentTime >= this.song.lyrics[i].start_time && currentTime < this.song.lyrics[i].end_time){
              idx = i;
              break;
            }
          }
          
          if(idx >= 0){
            this.prevLine = this.song.lyrics[idx-1].line || "";
            this.line = this.song.lyrics[idx].line;
            this.nextLine = this.song.lyrics[idx+1].line || "";
            if(idx+1 == this.song.miss_lyric_id){
              this.nextLine = this.answerLine;
            }
          }
          if (!this.afterMissLyrics && idx == this.song.miss_lyric_id) {
            this.missLyrics = true;
            this.continuePlay = true;
            this.line = this.answerLine;
            this.pauseVideo();
          }
        }
      }, 10);
    },
    renderHiddenAnswerLine(cur_line){
      var line = "";
      for(var i = 0; i < cur_line.length; i++){
        if(cur_line[i] != " ") {
          line += "\u2B50";
        } else {
          line += " ";
        }
      }
      return line;
    },
    continuePlaying(){
      this.continuePlay = false;
      this.player.playVideo();
      this.showTime();
      this.afterMissLyrics = true;
    },
  },
  computed: {
  },
  components: {
  },
    props: {
        song: {
            type: Object,
        }
    },
}
window.onYouTubeIframeAPIReady = () => {
  this.initYoutube();
};

</script>