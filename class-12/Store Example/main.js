
// ----------------------------------------------------------
// Compile product details template
// ----------------------------------------------------------

var detailsTemplate = Handlebars.compile($("#product-detail-template").html());
var productTemplate = Handlebars.compile($("#product-template").html());

function loadData(data) {
    for (var i in data) {
        $("body").append(detailsTemplate(data[i]));
        $("#list").append(productTemplate(data[i]));
    }
}

loadData(storeData);

// ----------------------------------------------------------


// ------------------------------------------------------------
// This function handles the add-to-cart buttons
// ------------------------------------------------------------

$(".add-to-cart").click(function(event){
    event.preventDefault();
    // Get the name, price, and count for this item from it's data attributes
    var name = $(this).attr("data-name");
    var price = $(this).attr("data-price");
    var count = 1;

    // Add the item to the cart
    addItem(name, price, count);

    // Test add-to-cart with the console.
    console.log(cart);

    updateCart();
});



// -------------------------------------------------------------
// This function updates the cart, call it each time you change
// the contents of the cart. 
// -------------------------------------------------------------
function updateCart() {
    if (cart.length == 0) {
        $("#cart-ul").html("Your cart is empty");
        $("#cart-count").html("Your cart is empty");
        $(".cart-total").html("");
        return;
    }

    // Make some HTML text that represents the cart
    var html = "";
    // Loop through the cart 
    for (var i in cart) {
        // Get the name, price, and count
        var name = cart[i].name;
        var price = cart[i].price.toFixed(2);
        var count = cart[i].count;
        // Now add some html to the html variable
        html += "<li>"+name+" $"+price+" x <input class='item-count' data-name='"+name+"' type='number' value='"+count+"'>";
        html += "<button class='add-one-item' data-name='"+name+"'>+</button>";
        html += "<button class='subtract-one-item' data-name='"+name+"'>-</button>";
        html += " = $"+(price * count).toFixed(2);
        html += "</li>";
    }

    // after the loop completes write the html string into the page
    $("#cart-ul").html(html);

    // Update the cart count and total
    $("#cart-count").html("You have "+getCount()+" items in your cart");
    $(".cart-total").html("$"+getTotal());
}

updateCart();


$("body").on("click", ".add-one-item", function(event){
    var name = $(this).attr("data-name");
    addItem(name);
    updateCart();
});

$("body").on("click", ".subtract-one-item", function(event){
    var name = $(this).attr("data-name");
    removeItem(name)
    updateCart();
});


// ***************************************************
// Cart input count

$("body").on("change", ".item-count", function(event){
    var name = $(this).attr("data-name");
    var count = Number($(this).val());
    console.log(name, count);
    setCountForName(count, name);
    updateCart();
});

$("#update-cart-button").submit(function(event){
    event.preventDefault();

});
// ***************************************************



// ------------------------------------------------------------
// These functions work with the UI elements to hide and show 
// products and the shopping cart
// ------------------------------------------------------------

// Handle clicks on #show-cart
$("#show-cart").click(function(event){
    // adds/removes the class hide-cart on #shopping-cart-container
    // $("body").addClass("show-overlay");
    $("#shopping-cart-container").toggleClass("hide-cart");
});

// Handles clicks on #close-cart-button
$("#close-cart-button").click(function(event){
    // add hide-cart class to #shopping-cart-container
    // $("body").removeClass("show-overlay");
    $("#shopping-cart-container").addClass("hide-cart");
});

// Handle clicks on .product-link elements
$(".product-link").click(function(event){
    event.preventDefault(); // This is a link prevent the default behavior
    var id = $(this).attr("href"); // Get the id
    // add the show class to the element "#"+id+"-details"
    $(id).addClass("show");
    // $("body").addClass("show-overlay");
});

// Handle clicks on elements with the class name .close-details-button
$(".close-details-button").click(function(event){
    // Search up the DOM tree for an element with class .product-details
    // and remove the class show. 
    $(this).parents(".product-details").removeClass("show");
    $("body").removeClass("show-overlay");
});
