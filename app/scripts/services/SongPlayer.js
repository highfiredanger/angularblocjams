(function() {
    function SongPlayer() {
        var SongPlayer = {};
        /**
        * @desc Captures current song
        */
        var currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function playSong
        * @desc Plays song and sets song.playing to true
        * @param {Object} song
        */
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioURL, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
            
        };
        /**
        * @function SongPlayer.play
        * @desc Evaluates if current song is not song, and if so, plays new song and sets new playing song. Also evaluates if current song is what's playing, then if the buzz object is paused, then plays the song .
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song){
            setSong(song);
            playSong(song);
        } else if (currentSong === song) {
            if (currentBuzzObject.isPaused()){
                currentBuzzObject.play();
                }
            }
        };
        /**
        * @function songPlayer.pause
        * @desc Pauses buzz object and sets song playing to false. 
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
}
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();