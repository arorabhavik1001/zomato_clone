const menuModel = require('../Models/menuModel');

exports.orderMenu = (req, res) => {
    // console.log(req.params.id)
    menuModel.find({
        restaurantId: req.params.id
    }).then(result => {
        res.status(200).json({
            message: 'Menus fetched successfully',
            menu: result
        });
        // console.log(result);
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    });
}