const express = require('express')
const filterController = require('../Controllers/Filters')
const mealtypecontroller = require('../Controllers/mealtypes')
const cityController = require('../Controllers/City');
const usersController = require('../Controllers/users');
const menuController = require('../Controllers/orderMenu');
const ordersController = require('../Controllers/Orders');
const paymentGatewayController = require('../Controllers/paymentGateway');
const googleUserController = require('../Controllers/googleUser');

const router = express.Router();

router.post('/filter', filterController.filters)
router.get('/restaurantDetailsById/:id', filterController.restaurantDetailsById)
router.get('/filterByCity/:city', filterController.filterByCity)
router.post('/filterByCityPost/:city', filterController.filterByCityPost)
router.post('/filterByCost', filterController.filterByCost)
router.get('/cityList', cityController.getCity)
router.get('/mealtype', mealtypecontroller.getMealtype)
router.post('/userSignUp', usersController.signUp)
router.post('/googleUserSignUp', googleUserController.googleSignUp)
router.post('/userLogin', usersController.login)
router.get('/menuForRestaurant/:id', menuController.orderMenu)
router.post('/forgotpassword', usersController.forgotpassword)
router.get('/getOrders/:email', ordersController.getOrders)
router.post('/saveOrders', ordersController.saveOrders)
router.post('/forPayment', paymentGatewayController.payment)
router.post('/pageAfterPayment', paymentGatewayController.pageAfterPayment)
module.exports = router;