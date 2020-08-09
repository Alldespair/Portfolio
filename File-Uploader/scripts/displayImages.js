function displayImages(images = [], imagesList) {
  imagesList.innerHTML = images.map(image => {
      return `
          <li data-item-number="${image.itemNumber}">
              <figure>
                  <img src=${image.url} alt="image">
                  <figcaption>
                      <p>Name: ${image.name}</p>
                      <p>Size: ${Math.floor(image.size / 1000)}KB</p>
                  </figcaption>
              </figure>
              <div class="inputContainer">
                <input type="text" class="renameInput" style="display: none;">
                <input type="button" id="renameButton" style="display: none">
                <label for="renameButton" class="renameButton">Rename</label>
                <input type="button" class="deleter" style="display: none">
                <label for="deleter" class="deleteButton">Delete</label>
              </div>
          </li>
      `
  }).join('');
};