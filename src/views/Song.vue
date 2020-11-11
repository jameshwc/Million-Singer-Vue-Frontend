<template>
    <div>
      <center>
        <h2>{{song.name}} - {{song.singer}} </h2>
        <div id="player"></div>
        <button v-if="isNotStart" @click="playVideo">play</button>
        <h2>{{line}}</h2>
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
      line: "You haven't played the video yet."
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
      console.log(this.song.miss_lyric_id);
      console.log(this.song.lyrics[this.song.miss_lyric_id]);
      this.showTime();
    },
    onPlayerStateChange() {
      console.log("Player state changed");
    },
    pauseVideo() {
      console.log("pause video")
      this.player.pauseVideo();
    },
    showTime(){
      setInterval(() => {
        var currentTime = this.player.getCurrentTime() * 1000;
        var idx = -1;
        for(var i = 0; i < this.song.lyrics.length; i++){
          if(currentTime >= this.song.lyrics[i].start_time && currentTime < this.song.lyrics[i].end_time){
            idx = i;
            break;
          }
        }
        
        if(idx < this.song.miss_lyric_id && idx >= 0){
          this.line = this.song.lyrics[idx].line;
        } else if (idx == this.song.miss_lyric_id) {
          let miss_lyric_id = Number(this.song.miss_lyric_id);
          this.line = "\u2B50".repeat(this.song.lyrics[miss_lyric_id].line.length);
          this.pauseVideo();
        }
      }, 10);
    }   
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