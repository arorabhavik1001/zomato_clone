const mealtypemodel = require('../Models/mealtypemodel')

exports.getMealtype = (req, res) => {
    console.log(`inside mealtype`)
    mealtypemodel.find().then(result => {
        res.status(200).json({
            mealtypes: result
        });
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    });
}