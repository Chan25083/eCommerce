$(function () {
    var productList = [
        {
            id: 1,
            productName: "Logitech Mouse",
            unitPrice: 45
        }, {
            id: 2,
            productName: "Logitech Keyboard",
            unitPrice: 50
        }, {
            id: 3,
            productName: "HP Mouse",
            unitPrice: 35
        }, {
            id: 4,
            productName: "HP Keyboard",
            unitPrice: 32
        }, {
            id: 5,
            productName: "Microsoft Mouse",
            unitPrice: 43
        }, {
            id: 6,
            productName: "Logitech Keyboard",
            unitPrice: 39
        }];
    var cartList = [];

    for (var i = 0; i < productList.length;i++) {
        var product = $("<div class='product'></div>");
        $(product).append("<p>" + productList[i].productName + "</p>");
        $(product).append("<p>" + productList[i].unitPrice + ".00</p>");
        $(product).append("<button class='btn' value='" + productList[i].id+"'>Add to Cart</button>");
        $(".productTable").append(product);
    }

    $(".btn").click(function () {
        if (cartList != null || cartList.length > 0) {
            var check = false;
            for (var i = 0; i < cartList.length; i++) {
                if (cartList[i].productId == $(this).val()) {
                    cartList[i].cartQuantity += 1;
                    check = true;
                    break;
                }
            }

            if (check == false) {
                for (var i = 0; i < productList.length; i++) {
                    if (productList[i].id == $(this).val()) {
                        cartList.push({
                            productId: $(this).val(),
                            cartItem: productList[i].productName,
                            cartPrice: productList[i].unitPrice,
                            cartQuantity: 1
                        })
                    }
                }
            }
        }
        else {
            for (var i = 0; i < productList.length; i++) {
                if (productList[i].id == $(this).val()) {
                    cartList.push({
                        productId: $(this).val(),
                        cartItem: productList[i].productName,
                        cartPrice: productList[i].unitPrice,
                        cartQuantity: 1
                    })
                }
            }
        }
        PrintCart();
    })

    const PrintCart = () => {
        $("#cartList").html("");
        $("#clearBtn").html("");
        $("#orderSummaryList").html("");
        var subTotal = 0;

        for (var i = 0; i < cartList.length; i++) {
            var cart = $("<div></div>");
            $(cart).append(cartList[i].cartItem + "  ");
            $(cart).append(cartList[i].cartPrice + ".00  ");
            $(cart).append("<button class='add' value='" + cartList[i].productId + "'>+</button>");
            $(cart).append(" " + cartList[i].cartQuantity + " ");
            $(cart).append("<button class='minus' value='" + cartList[i].productId + "'>-</button>  ");
            $(cart).append("" + (cartList[i].cartPrice * cartList[i].cartQuantity) + ".00  ");
            $(cart).append("<button class='del' value='" + cartList[i].productId + "'>X</button>");
            $("#cartList").append(cart);
            subTotal += (cartList[i].cartPrice * cartList[i].cartQuantity);
        }
        var clear = $("<button id='clearAll'></button>").text("Clear All");
        $("#clearBtn").append(clear);

        var orderSummary = $("<p></p>").text("SubTotal: " + subTotal + ".00");
        $("#orderSummaryList").append(orderSummary);
        orderSummary = $("<p></p>").text("Shipping Fee: 10.00");
        $("#orderSummaryList").append(orderSummary);
        orderSummary = $("<p></p>").text("Total: " + (subTotal + 10) + ".00");
        $("#orderSummaryList").append(orderSummary);

        $("#clearAll").click(function () {
            cartList = [];
            $("#cartList").html("");
            $("#clearBtn").html("");
            $("#orderSummaryList").html("");
        })

        $(".del").click(function () {
            for (var i = 0; i < cartList.length; i++) {
                if (cartList[i].productId == $(this).val()) {
                    cartList.splice(i, 1);
                    break;
                }
            }
            PrintCart();
        })

        $(".add").click(function () {
            for (var i = 0; i < cartList.length; i++) {
                if (cartList[i].productId == $(this).val()) {
                    cartList[i].cartQuantity += 1;
                }
            }
            PrintCart();
        })

        $(".minus").click(function () {
            for (var i = 0; i < cartList.length; i++) {
                if (cartList[i].productId == $(this).val()) {
                    cartList[i].cartQuantity -= 1;
                    if (cartList[i].cartQuantity < 1) {
                        cartList[i].cartQuantity = 1;
                    }
                }
            }
            PrintCart();
        })
    }
})

