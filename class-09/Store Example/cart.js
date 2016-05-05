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

function removeItem(name) {
    for (var i in cart) {
        if (cart[i].name === name) {
            cart[i].count -= 1;
            if (cart[i].count === 0) {
                cart.splice(i, 1); // Remove this item
            }
            return; // End the function here
        }
    }
}


function getCount() {
    var total = 0;
    for (var i in cart) {
        total += cart[i].count;
    }
    return total;
}


function getTotal() {
    var total = 0;
    for (var i in cart) {
        total += cart[i].price * cart[i].count;
    }
    return total;
}

function roundTwo(n) {
    // Round to two decimal places for currency
    n = n * 100;
    n = Math.round(n) / 100;
    return n;
}






