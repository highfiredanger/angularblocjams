/**
* -  Keeps track of current song
* TODO: 
*/

(function() {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        SongPlayer.volume = 50; 
    
        SongPlayer.setVolume = function(volume){
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        };
        
        /**
        * @desc Private attribute; assigns albumPicasso to currentAlbum, I think. 
        * @type {Object}
        */
        
        var currentAlbum = Fixtures.getAlbum();
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
                stopSong(SongPlayer.currentSong)
            }
            
            currentBuzzObject = new buzz.sound(song.audioURL, {
                formats: ['mp3'],
                preload: true,
                autoplay: true
            });
            
            currentBuzzObject.bind('timeupdate', function(){
                $rootScope.$apply(function(){
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
            
        };
        
        /**
        * @desc Gets song index of current song in album.
        */
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        }
        
        
        /**
        * @desc Active song object from list of songs
        */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /**
        * @function SongPlayer.play
        * @desc Evaluates if current song is not song, and if so, plays new song and sets new playing song. Also evaluates if current song is what's playing, then if the buzz object is paused, then plays the song .
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song){
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()){
                    playSong(song);
                }
            }
        };
        /**
        * @function SongPlayer.pause
        * @desc Pauses buzz object and sets song playing to false. 
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function SongPlayer.previous
        * @desc Get previous song for previous button usage
        */
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong)
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @function SongPlayer.next
        * @desc Get next song for next song button usage
        */
         SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
             
            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong(SongPlayer.currentSong)
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                console.log(song);
                setSong(song);
                playSong(song);
            }
        };
        
        var stopSong = function(song){
            currentBuzzObject.stop();
            song.playing = null;
        }
        
        return SongPlayer;
    };

    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();