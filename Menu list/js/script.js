const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const modalDelete = document.querySelector('.modal-delete'),
      modalRename = document.querySelector('.modal-rename'),
      modalRenameInput = document.querySelector('.modal-input-text');

let itemId;
let modalActive = false;


function addItem(event) {
    event.preventDefault();
    const text = this.querySelector('[name=item]').value;
    const item = {
        text,
        done: false
    }
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    displayData(items, itemsList);
    this.reset();
}

function displayData(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, index) => {
        return `
            <li class="show" data-index=${index}>
                <input type='checkbox' data-index=${index} id='item${index}' ${plate.done ? 'checked' : ''} />
                <label for='item${index}'>${plate.text}</label>
                <span>
                  <button class="itemButton" ><i class="far fa-edit" data-button='edit' data-button-id='${index}'></i></button>
                  <button class="itemButton" ><i class="far fa-trash-alt" data-button='delete' data-button-id='${index}'></i></button>
                </span>
            </li>
        `
    }).join('');
}

function toggleDone(event) {
    if(!event.target.matches('input')) return;
    const index = event.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    displayData(items, itemsList);
}

itemsList.addEventListener('click', function(e) {
  if(!modalActive) {
    itemId = e.target.dataset.buttonId;
    if(e.target.dataset.button === 'edit') {
      editItem();
    } else if(e.target.dataset.button === 'delete') {
      deleteItem();
    }
  }
});

function editItem() {
  modalActive = true;
  modalDelete.style.display = 'none';
  modalRename.style.display = 'block';
  modalRenameInput.value = items[itemId].text;
  modalRename.addEventListener('click', function(e) {
    if(e.target.id === 'ok-rename') {
      items[itemId].text = modalRenameInput.value;
      localStorage['items'] = JSON.stringify(items);
      displayData(items, itemsList);
      modalRename.style.display = 'none';
      modalActive = false;
    } else if(e.target.id === 'cancel-rename') {
        modalRename.style.display = 'none';
        modalActive = false;
    }
  });
};

function deleteItem() {
  modalActive = true;
  modalRename.style.display = 'none';
  modalDelete.style.display = 'block';
  modalDelete.addEventListener('click', function(e) {
    if(e.target.id === 'ok-delete' ) {
      modalDelete.style.display = 'none';
      items.splice(itemId, 1)
      localStorage['items'] = JSON.stringify(items);
      displayData(items, itemsList);
      modalActive = false;
      e.stopImmediatePropagation()
    } else if(e.target.id === 'cancel-delete') {
        modalDelete.style.display = 'none';
        modalActive = false;
    }
  })
};

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

displayData(items, itemsList);