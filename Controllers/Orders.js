const orderModel = require('../Models/orderModel');

exports.getOrders = (req, res) => {
    orderModel.find({
        email: req.params.email
    }).then(result => {
        res.status(200).json({
            message: 'Orders fetched successfully',
            orders: result
        });
        // console.log(result);
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    });
}
exports.saveOrders = (req, res) => {
    const email = req.body.email;
    const contactNo = req.body.contactNo;
    const address = req.body.address;
    const cart = req.body.cart;
    const subtotal = req.body.subtotal;
    const restaurantName = req.body.restaurantName;


    const saveOrders = new orderModel({
        email: email,
        contactNo: contactNo,
        address: address,
        cart: cart,
        subtotal: subtotal,
        restaurantName: restaurantName
    })

    saveOrders.save().then((result) => {
        res.status(200).json({
            message: `Your orders have been saved successfully!!!`,
            orders: result
        })
    }).catch((err) => {
        res.status(500).json({
            message: err,
        })
        console.log(`there was an error saving orders`)
        console.log(err)
    })
}