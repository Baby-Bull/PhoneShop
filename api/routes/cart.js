const router = require("express").Router();

const Cart = require("../models/Cart");

router.get("/:cartId", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cartId);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json("this cart doesn't exist");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/:cartId", async (req, res) => {

    try {
        const currentCart = await Cart.findById(req.params.cartId);
        console.log(currentCart);

        if (currentCart) {
            if (currentCart.userId === req.body.userId) {
                const indexItem = await currentCart.cart.findIndex(product => product.productId === req.body.productId);

                console.log(indexItem);

                if (indexItem !== -1 && currentCart.cart[indexItem].quantity <= 0) {
                    currentCart.cart.splice(indexItem, 1);
                    if (currentCart.cart.length === 0) {
                        currentCart.subTotal = 0;
                    } else {
                        currentCart.subTotal = currentCart.cart.map(item => item.totalPrice).reduce((acc, next) => acc + next);
                    }
                }
                else if (indexItem !== -1) {
                    currentCart.cart[indexItem].quantity += Number.parseInt(req.body.quantity);
                    currentCart.cart[indexItem].totalPrice += (Number.parseInt(req.body.quantity) * Number.parseInt(req.body.price));
                    currentCart.subTotal += (Number.parseInt(req.body.quantity) * Number.parseInt(req.body.price));
                }
                else {
                    currentCart.cart.push({
                        productId: req.body.productId,
                        price: Number.parseInt(req.body.price),
                        quantity: Number.parseInt(req.body.quantity),
                        totalPrice: Number.parseInt(req.body.price) * Number.parseInt(req.body.quantity)
                    });
                    currentCart.subTotal = currentCart.cart.map(item => item.totalPrice).reduce((acc, next) => acc + next);
                };
                await currentCart.save();
                res.status(200).json(currentCart);
            } else {
                res.status(403).json("you can work here");
            }
        } else {
            const tempCart = new Cart({
                cart: [{
                    productId: req.body.productId,
                    quantity: Number.parseInt(req.body.quantity),
                    price: Number.parseInt(req.body.price),
                    totalPrice: Number.parseInt(req.body.price) * Number.parseInt(req.body.quantity),
                }],
                userId: req.body.userId,
                subTotal: Number.parseInt(req.body.price) * Number.parseInt(req.body.quantity)
            });
            const newCart = await tempCart.save();
            res.status(200).json(newCart);
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
})

module.exports = router;