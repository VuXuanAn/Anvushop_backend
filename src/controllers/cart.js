const Cart = require('./../models/cart')

exports.addItemToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
        .exec((err, cart) => {
            if (err) return res.status(400).json({ err })
            if (cart) {
                // nếu tồn tại sản phẩm trong giỏ hàng thì cạp nhập lại sản phẩm 
                const product = req.body.cartItems.product
                const item = cart.cartItems.find(c => c.product == product);
                let condition, update;
                if (item) {
                    condition = { user: req.user._id, "cartItems.product": product }
                    update = {
                        "$set": {
                            "cartItems.$": {
                                ...req.body.cartItems
                                , quantity: item.quantity + req.body.cartItems.quantity
                            }
                        }
                    }
                    Cart.findOneAndUpdate(condition, action)
                        .exec((err, _cart) => {
                            if (err) return res.status(400).json({ err })
                            if (_cart) {
                                return res.status(400).json({ _cart })
                            }
                        })
                } else {
                    condition = { user: req.user._id, "cartItems.product": product }
                    update = {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    }
                    Cart.findOneAndUpdate(condition, action)
                        .exec((err, _cart) => {
                            if (err) return res.status(400).json({ err })
                            if (_cart) {
                                return res.status(400).json({ _cart })
                            }
                        })
                }


            } else {
                // nếu không tồn tại sản phẩm trong giỏ hàng thì thêm mới sản phẩm 

                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems]
                })

                cart.save((err, cart) => {
                    if (err) return res.status(400).json({ err })
                    if (cart) {
                        return res.status(400).json({ cart })
                    }
                })
            }
        })

}