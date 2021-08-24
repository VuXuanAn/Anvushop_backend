const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const shortid = require('shortid')
const multer = require('multer');
const { createProduct } = require("../controllers/product");
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

const upload = multer({ storage });
const router = express.Router();

router.post("/product/create", requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);


module.exports = router;