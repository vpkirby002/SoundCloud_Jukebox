var tracks, players = [];

document.addEventListener("DOMContentLoaded", function(event){
	

	//play button below
	document.getElementById("playBtn").addEventListener("click", function(){
		playTrack(currentSong);
		console.log("test")
	});

	//pause button
	document.getElementById("pauseBtn").addEventListener("click", function(){
		players[currentSong].pause();
	});


	//stop button

	document.getElementById("stopBtn").addEventListener("click", function(){
		players[currentSong].pause();
		players[currentSong].seek(0);
	});

	//next button
	document.getElementById("forwardBtn").addEventListener("click", function(){
		currentSong++;
		if( currentSong >= tracks.length) {
			currentSong = 0;
		}
		playTrack(currentSong);
	});


	//previous button
	document.getElementById("rewindBtn").addEventListener("click", function(){
		currentSong--;
		if (currentSong <0){
			currentSong=tracks.length-1;
		}
		playTrack(currentSong);
	});



});




// SoundCloud API Streaming of songs:


SC.initialize({
	client_id: 'fd4e76fc67798bfa742089ed619084a6'
});



document.addEventListener("DOMContentLoaded", function(){
	console.log("content loaded")
	document.querySelector("form").addEventListener("submit",function(event){
		event.preventDefault()
		console.log(event)
		SC.get("/tracks",{
			q: document.getElementById("input").value
		}).then(function(response){
			console.log(response);
			tracks = response;
			document.getElementById("description").innerHTML= tracks[currentSong].title + tracks[currentSong].genre + tracks[currentSong].permalink + tracks[currentSong].description
			document.getElementById("artwork").src = tracks[currentSong].artwork_url || "http://" + q + ".jpg.to"		
			playTrack(currentSong);
		});
	});
})

var localTracks = [46833586,46834546]
var currentSong = 0;

function playTrack(songId) {
	document.getElementById("description").innerHTML= tracks[currentSong].title + " . " + " Genre: " + tracks[currentSong].genre + " . " + "Permalink:" + tracks[currentSong].permalink 
	// document.getElementById("artwork").src = tracks.[currentSong].artwork_url || "http://" + q + ".jpg.to"

	//Notes:
	// If we don't have a player for the current track, go get it
	// Every track most likely has a different type of player in SoundCloud
	// This is why we do the following:

	if( !players[songId] ){
		SC.stream('/tracks/' + tracks[songId].id).then(function(player){
			console.log(player);
			players[songId] = player;
			players[songId].play();

		});
	} else {
		players [songId].play();

	}

}

function stopAudio2(){

	players[currentSong].seek(0); //SoundCloud uses seek as a pause or stop
	players[currentSong].pause();
}


function playAudio2(){
	players[currentSong].play();
};

function pauseAudio2(){
	players[currentSong].pause();

}

function forwardAudio2(){
	stopAudio2();
	currentSong +=1;
	players[currentSong].play();

};


function rewindAudio2(){
	stopAudio2();
	currentSong=-1;
	players[currentSong].play();
	currentSong

}


//Volume slider:

function SetVolume(val) {
	var player = tracks[currentSong];
	player.volume = val / 100;
	console.log('After' + player.volume);
	players[currentSong].SetVolume(player.volume); //must add player syntax plus .setVolume(player.volume)
													//executes the function.
}


 

























// const playlist = [];



// SC.get("/tracks",{q: "Megan Thee Stallion"}).then(function(response){
// 	playlist.push( ...response );
// 	console.log(response);
// 	play(0);
// });



// function play(index){
// if( !playlist[index].player ) {
// 	SC.stream(`/tracks/${playlist[index].id}`).then(function(player){
// 		playlist[index].player = player;
// 		player.play();
// 	});
// } else {
// 	playlist[index].player.play();
// }

// }




