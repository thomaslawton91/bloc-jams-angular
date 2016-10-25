(function () {
    function SongPlayer(Fixtures) {
        
        /**
        * @desc SongPlayer function
        **/
        var SongPlayer = {};
        
        /**
        * @desc sets currentAlbum to album in album view
        **/
        var currentAlbum = Fixtures.getAlbum();

        /**
         * @desc Buzz object audio file
         * @type {Object}
         **/
        var currentBuzzObject = null;
        
        /**
        * @function stopSong
        * @desc stops song and sets current song to null
        * @params {Object} song
        **/
        var stopSong = function (song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        
        /**
         * @method playSong
         * @desc plays selected song and sets to playing
         * @param {Object} song
         **/
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         **/
        var setSong = function (song) {
            if (currentBuzzObject) {
                stopSong();
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };


        /**
         * @method play
         * @desc pauses song if playing else pauses song if it is currently playing
         * @param {Object} song
         **/
        
        /**
         * @desc currently playing song
         * @type {Object};
         **/
        
        /**
        * @function getSongIndex
        * @desc fetches song index of songs in current album
        * @param {Object} songs
        **/
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc sets current song to null
        **/
        SongPlayer.currentSong = null;
        
        /**
        * @method play
        * @desc plays chosen song
        * @params {Object} song
        **/
        SongPlayer.play = function (song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
         * @method pause
         * @desc pauses selected song
         * @param {Object} song
         **/
        SongPlayer.pause = function (song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @method previous
        * @desc sets current song to previous song then decrements song index, if index < 0 then stops current song and sets current song to null
        **/
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @method next
        * @desc advances song in player bar to next song or stops song if at last song
        **/
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();