if(localStorage['imageDownloader']) {
  images  = JSON.parse(localStorage['imageDownloader']);
  displayImages(images, imagesList);
};