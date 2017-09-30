SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
  });

function Jukebox(element){
  // const that = this; 
  // const _this = this;
  // const self = this;

  this.songs = [];
  this.currentSong = 0;
  // populate list of songs


  SC.get("/tracks",{q: "Dogs"}).then((response) => {
  console.log("this" , this)
  this.songs.push( ...response );
  this.play();
  
  // console.log(response);
  // play(0);
});
  this.htmlElements = {
    container: element,
    audio: element.querySelector("audio"),
    controls: element.querySelector(".controls"),
    info: element.querySelector(".info")
  }; 
    let that = this;
 
    this.htmlElements.controls.addEventListener("click", (event) => {
     console.log("this:" , this);
     
      if ( event.target.classList.contains("play") ){
        
        this.play();
      } else if ( event.target.classList.contains("pause")) {
        this.pause();
      } else if( event.target.classList.contains("back")) {
         that.back();

      } else if( event.target.classList.contains("next")) {
       this.next();
       

      }
    });

}

Jukebox.prototype = {



  play: function(){
      const song = this.songs[this.currentSong];
      if( song.player ) {
        song.player.play();
      } else {
        SC.stream(`/tracks/${song.id}`).then(function(player){
          song.player = player; 
          player.play();
        });
       }
      
    this.updateUI();
    this.htmlElements.audio.play();
},

  pause: function(){
    this.htmlElements.audio.pause();
  },
    back: function(){
      this.currentSong = (this.currentSong + this.songs.length - 1) % this.songs.length
      ; 
      
      this.play();
  },
  next: function(){
    this.currentSong = (this.currentSong + 1) % this.songs.length;
    
    this.play();
  },
updateUI: function(){
  this.htmlElements.info.innerText = this.songs[this.currentSong].name;
  this.htmlElements.audio.src = `audio_files/${this.songs[this.currentSong].file}`;
  }

};




let myJukebox;

document.addEventListener("DOMContentLoaded", function(){

  myJukebox = new Jukebox(document.getElementById("jukebox"));

});
