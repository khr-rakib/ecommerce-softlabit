const Product = require('../models/Product');
const slugify = require('slugify');
const _ = require('lodash');



exports.create = (req, res) => {
    const {
        product_title,
        product_price,
        regular_price,
        product_quantity,
        product_code,
        mpn_id,
        product_short_description,
        product_specification,
        product_description,
        product_faq
    } = req.body;
    const product_slug = slugify(product_title).toLowerCase();
    const newProduct = new Product({
        product_title,
        product_slug,
        product_price,
        regular_price,
        product_quantity,
        product_code,
        mpn_id,
        product_short_description,
        product_specification,
        product_description,
        product_faq
    });

    newProduct.save((err, product) => {
        if (err) console.log(err);
        res.json(product);
    });
}



exports.list = (req, res) => {
    Product.find({}).exec((err, products) => {
        if (err) return res.json(err);
        res.json(products);
    })
}


exports.update = (req, res) => {
    const product_id = req.params.id;
    const newProduct = req.body;

    Product.findOne({ _id: product_id }).exec((err, product) => {
        if (err) return res.json(err);
        product = _.merge(product, newProduct);

        product.save((err, success) => {
            if (err) return res.json(err);
            res.json(success);
        });
    });
}

exports.remove = (req, res) => {
    const product_id = req.params.id;
    Product.findOneAndDelete({ _id: product_id }).exec((err, success) => {
        res.json({ msg: "Product Deleted!!!" })
    });
}