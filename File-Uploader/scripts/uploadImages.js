const uploader = document.getElementById('uploader'),
      imagesList = document.querySelector('.images');
let images = [];

let files, fileLength, i, image;

let currentItemNumber, lastItemNumber;

if(!localStorage['imageDownloader']) {
    localStorage.setItem('imageDownloader', []);
};

function getCurrentItemNumber() {
    if(imagesList.children.length === 0) {
        currentItemNumber = 0;
    } else {
        lastItemNumber = imagesList.lastElementChild.dataset.itemNumber;
        currentItemNumber = ++lastItemNumber;
    };
    return currentItemNumber;
};

function uploadImage() {
    files = this.files;
    if(FileReader) {
        fileLength = files.length;
        for(i = 0; i < fileLength; i += 1) {
            let fileReader = new FileReader(), file = files[i];
            fileReader.addEventListener('load', function (event) {
                image = {};
                image['itemNumber'] = getCurrentItemNumber();
                image['name'] = file.name;
                image['size'] = file.size;
                image['url'] = event.target.result;
                images.push(image);
                displayImages(images, imagesList);
                localStorage['imageDownloader'] = JSON.stringify(images);
            })
            fileReader.readAsDataURL(file);
        };
    };
};

displayImages(images, imagesList);
uploader.addEventListener('change', uploadImage, false);