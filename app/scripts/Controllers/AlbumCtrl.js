(function () {
    function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum();
        }
<<<<<<< HEAD
    }
    angular.module('blocJams').controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
=======
    angular.module('blocJams').controller('AlbumCtrl', AlbumCtrl);
>>>>>>> 73c365bd9e0f248ba9168c6f9568c97455fb653a
})();