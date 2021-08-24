const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const multer = require('multer');
const shortid = require('shortid')
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

const { addCategory, getCategory } = require("../controllers/category");

router.post("/category/create", requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get("/category/getCategory", getCategory);


module.exports = router;