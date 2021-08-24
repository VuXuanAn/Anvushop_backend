const Category = require('./../models/category')
const slugify = require('slugify');

exports.addCategory = (req, res) => {
    const CategoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if (req.file) {
        CategoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }
    if (req.body.parentId) {
        CategoryObj.parentId = req.body.parentId
    }

    const cat = new Category(CategoryObj);


    cat.save((err, category) => {
        if (err) return res.status(400).json({ err })

        if (category) {
            return res.status(201).json({ category })
        }

    })
}
exports.getCategory = (req, res) => {
    Category.find({}).exec((err, category) => {
        if (err) return res.status(400).json({ err });
        if (category) {
            const categoryList = createCategories(category)
            return res.status(200).json({ categoryList });
        }
    })

}

const createCategories = (categories, parentId = null) => {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id),
        });
    }

    return categoryList;
}