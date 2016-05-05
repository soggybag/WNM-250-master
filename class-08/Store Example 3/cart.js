// This file contains all of the shopping cart code

var cart = [];

// Some functions to run the shopping cart. 

// Create's an Item Object
function makeItem(name, price, count) {
    if (count == undefined) {
        count = 1;
    }
    return {name: name, price: price, count: count};
}

// Add Item to the cart. 
function addItem(name, price, count) {
    var item = makeItem(name, price, count);
    for (var i in cart) {
        if (cart[i].name == item.name) {
            cart[i].count += item.count;
            return;
        }
    }
    cart.push(item);
}









