const restaurantModel = require('../Models/restaurants')

exports.filters = (req, res) => {
    // const location_id = req.body.location_id;
    // const cost = req.body.cost;
    // const page = req.body.page;
    // const city_id = req.body.city_id;
    const mealtype_id = req.body.mealtype_id;
    const cuisine_id = req.body.cuisine_id;
    let payload = {
        'type.mealtype': mealtype_id,
        // 'Cuisine.cuisine': {
        //     $in: cuisine_id
        // }
    }
    if(cuisine_id && cuisine_id.length > 0){
        payload['Cuisine.cuisine'] = {
            $in: cuisine_id
        };
    }
    restaurantModel.find(payload).then(result => {
        res.status(200).json({
            message: 'Restaurants list fetched successfully',
            restaurant: result
        })
    }).catch(
        error => {
            res.status(500).json({
                message: error
            })
        }
    )
}

exports.filterByCost = (req, res) => {
    var minimumPrice = req.body.lcost;
    var maximumPrice = req.body.hcost;
    var mealtype_id = req.body.mealtype_id;
    const payload = {
        'type.mealtype': mealtype_id,
        cost: {$gt: minimumPrice, $lt: maximumPrice}
    }
    restaurantModel.find(payload).then(result => {
        res.status(200).json({
            message: 'Restaurants list fetched successfully',
            restaurant: result
        })
    }).catch(
        error => {
            res.status(500).json({
                message: error
            })
            console.log(error)
        }
    )
}

exports.filterByCity = (req, res) => {
    restaurantModel.find({
        city: req.params.city.toString()
    }).then(result => {
        res.status(200).json({
            message: 'Restaurants filtered successfully',
            restaurants: result
        })
    }).catch(error => {
        res.status(500).json({
            message: 'there was an error processing restaurants by city'
        })
        console.log(error)
    })
}
exports.restaurantDetailsById = (req, res) => {
    // const payload = {
    //     _id: req.params.id
    // }
    restaurantModel.find({
        _id: req.params.id
    }).then(result => {
        res.status(200).json({
            message: 'Restaurants filtered successfully',
            restaurants: result[0],
        })
        // console.log(restaurants)
    }).catch(error => {
        res.status(500).json({
            message: 'there was an error processing restaurants by city'
        })
        console.log(error)
    })
}

exports.filterByCityPost = (req, res) => {
    var mealtype_id = req.body.mealtype_id;
    const payload = {
        'type.mealtype': mealtype_id,
        city: req.params.city.toString(),
    }
    restaurantModel.find(payload).then(result => {
        res.status(200).json({
            message: 'Restaurants filtered successfully',
            restaurants: result
        })
    }).catch(error => {
        res.status(500).json({
            message: 'there was an error processing restaurants by city'
        })
        console.log(error)
    })
}