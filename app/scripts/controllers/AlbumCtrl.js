(function(){
    function AlbumCtrl(){
        this.albumData = albumPicasso;
        this.gibberish = 'jibberish';
    }
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl)
})();


