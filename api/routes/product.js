const router = require("express").Router();

const Product = require("../models/Product");

//create a products
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const product = await newProduct.save();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get a product
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json("Product doesn't exist")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//get all products
router.get("/", async (req, res) => {
    try {
        if (req.query.minPrice || req.query.maxPrice) {
            const currentMaxPrice = req.query.maxPrice;
            const currentMinPrice = req.query.minPrice;
            const products = Product.find({
                price: { $gte : currentMinPrice  }
            });
            console.log(products);
            res.status(200).json("products");
        } else {
            const products = await Product.find();
            res.status(200).json(products);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

// get products with base on price
// router.get("/", async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

// update a product
router.put("/:id", async (req, res) => {
    try {
        const currentProduct = await Product.findById(req.params.id);
        var countRate = currentProduct.sumRate + 1;
        var totalRate = currentProduct.avgRate * (countRate - 1);
        var tempRate = req.body.currentRate;

        switch (tempRate) {
            case "oneRate": {
                totalRate += 1;
                break;
            }
            case "twoRates": {
                totalRate += 2;
                break;
            }
            case "threeRates": {
                totalRate += 3;
                break;
            }
            case "fourRates": {
                totalRate += 4;
                break;
            }
            case "fiveRates": {
                totalRate += 5;
                break;
            }
            default:
                break;
        }
        currentProduct.rate[tempRate] += 1;
        req.body.rate = currentProduct.rate;
        req.body.sumRate = countRate;
        req.body.avgRate = (totalRate / countRate).toFixed(1);

        var updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// delete a product
router.delete(("/:id"), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        await product.delete();
        res.status(200).json("this product has been deleted")
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;