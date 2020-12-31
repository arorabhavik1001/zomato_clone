const cityModel = require('../Models/City')


exports.getCity = (req, res) => {
    console.log(`inside getCity`)
    cityModel.find().then(result => {
        res.json({
            message:'City list fetched',
            cities: result
        });
    }).catch(error => {
        res.json({
            message: error
        });
    });
}