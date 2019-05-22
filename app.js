let itemTemplate = $('#templates .item');
let list = $('#list');

const addItemToPage = itemData => {
  let item = itemTemplate.clone()
  item.attr('data-id',itemData.id)
  item.find('.description').text(itemData.description)
  if (itemData.completed) {
    item.addClass('completed')
  }
  list.append(item)
};

let loadRequest = $.ajax({
  type: 'GET',
  url: "https://listalous.herokuapp.com/lists/fishSauceOnEverything/"
});

loadRequest.done((dataFromServer) => {
  let itemsData = dataFromServer.items

  itemsData.forEach(itemData => {
    addItemToPage(itemData)
  });
});

$('#add-form').on('submit', event => {
  let itemDescription = event.target.itemDescription.value;
  event.preventDefault();
  let creationRequest = $.ajax({
    type: 'POST',
    url: "http://listalous.herokuapp.com/lists/fishSauceOnEverything/items",
    data: { description: itemDescription, completed: false }
  });
  
  creationRequest.done(function(itemDataFromServer) {
  addItemToPage(itemDataFromServer);
  });
  
  // Clear fields after enter
  $('.clearFields').val('');

});


$('#list').on('click', '.complete-button', event => {
  let item = $(event.target).parent();
  let isItemCompleted = item.hasClass('completed');
  let itemId = item.attr('data-id');

  let updateRequest = $.ajax({
    type: 'PUT',
    url: "https://listalous.herokuapp.com/lists/fishSauceOnEverything/items/" + itemId,
    data: { completed: !isItemCompleted }
  });

  updateRequest.done(itemData => {
    itemData.completed ? item.addClass('completed') : item.removeClass('completed');
  })
});

/* 
Completes CRUD application :) 
// visit DELETE /lists/:list_name/items/:item_id to delete the specified item. FOUND on https://listalous.herokuapp.com/ 
*/
$('#list').on('click', '.delete-button', event => {
  let item = $(event.target).parent();
  let isItemCompleted = item.hasClass('completed');
  let itemId = item.attr('data-id');

  let deleteRequest = $.ajax({
    type: 'DELETE',
    url: "https://listalous.herokuapp.com/lists/fishSauceOnEverything/items/" + itemId
  });

  deleteRequest.done(itemData => {
    item.remove('');
  })
});