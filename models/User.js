const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
            max: 20
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
            max: 20
        },
        username: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
            index: true,
            max: 50
        },
        email: {
            type: String,
            trim: true,
            required: true,
            max: 40
        },
        phoneNo: {
            type: String,
            required: true,
            trim: true,
            max: 15
        },
        company: String,
        address: {
            type: [
                { addressLine: { type: String, required: true } },
                { city: { type: String, required: true } },
                { postalCode: String },
                { regionState: { type: String, required: true } },
            ]
        },
        hashed_password: {
            type: String,
            required: true
        },
        salt: String,
        profileUrl: String,
        wishList: {
            type: [
                { product_id: String },
                { productName: String },
                { productImage: String },
                { model: String },
                { price: Number },
                { stock: Number }
            ]
        },
        cartItems: {
            type: [
                { product_id: String },
                { productName: String },
                { productImage: String },
                { model: String },
                { price: Number },
                { quantity: Number }
            ]
        },
        orderHistory: {
            type: [
                { product_id: String },
                { productName: String },
                { productImage: String },
                { model: String },
                { price: Number },
                { quantity: Number },
                { status: String },
            ]
        },
        transition: String, // unknown
        returnRequest: String, // unknown
        rewordData: String // unknown
    }, { timestamps: true }
);


userSchema.virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    makeSalt: function () {
        return Math.round(new Date() * Math.random()) + "";
    },
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (error) {
            return "";
        }
    }
}

module.exports = mongoose.model('User', userSchema);