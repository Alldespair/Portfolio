let currenItemNumber, currentRenameItem;
let fileExtension, fileName;
let modalActive = false;

let modalDelete = document.querySelector('.modal-delete'),
    modalRename = document.querySelector('.modal-rename'),
    modalRenameInput = document.querySelector('.modal-input-text');

imagesList.addEventListener('click', function(e) {
  if(!modalActive) {
    currenItemNumber = e.target.parentNode.parentNode.dataset.itemNumber;
    if(e.target.className === 'deleteButton') {
      deleteImage();
    } else if(e.target.className === 'renameButton') {
      renameImage();
    }
  }
});

function deleteImage() {
  modalActive = true;
  modalRename.style.display = 'none';
  modalDelete.style.display = 'block';
  modalDelete.addEventListener('mousedown', function(e) {
    if(e.target.id === 'ok-delete') {
      modalDelete.style.display = 'none';
      images = images.filter(e => e.itemNumber != currenItemNumber);
      localStorage['imageDownloader'] = JSON.stringify(images);
      displayImages(images, imagesList);
      modalActive = false;
    } else if(e.target.id === 'cancel-delete') {
        modalDelete.style.display = 'none';
        modalActive = false;
    }
  })
};

function renameImage() {
  modalActive = true;
  modalDelete.style.display = 'none';
  modalRename.style.display = 'block';
  modalRenameInput.value = 'qwertyuiop'
  images.forEach(element => {
    if(element.itemNumber == currenItemNumber) {
      fileName = element.name.substring(0, element.name.lastIndexOf('.'));
      fileExtension = element.name.substring(element.name.lastIndexOf('.'));
      currentRenameItem = element;
      modalRenameInput.value = fileName;
    }
  });
  modalRename.addEventListener('mousedown', function(e) {
    if(e.target.id === 'ok-rename') {
      currentRenameItem.name = modalRenameInput.value + fileExtension;
      localStorage['imageDownloader'] = JSON.stringify(images);
      displayImages(images, imagesList);
      modalRename.style.display = 'none';
      modalActive = false;
    } else if(e.target.id === 'cancel-rename') {
        modalRename.style.display = 'none';
        modalActive = false;
    }
  });
};