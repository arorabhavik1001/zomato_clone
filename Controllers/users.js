const usersModel = require('../Models/usersModels')

exports.signUp = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const contactNo = req.body.contactNo;
    const address = req.body.address;

    const registerUser = new usersModel({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        address: address
    })

    registerUser.save().then((result) => {
        res.status(200).json({
            message: `User signed up successfully!!!`,
            user: result
        })
    }).catch((err) => {
        res.status(500).json({
            message: err,
        })
        console.log(`there was an error signing up`)
        console.log(err)
    })
}

exports.login = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    usersModel.find({
        email: email,
        password: password
    }).then((result) => {
        if(result.length >= 1) {
            res.status(200).json({
                message: "User Logged In successfully!",
                isAuthenticated: true,
                user: result
            })
        } else{
            res.status(200).json({
                message: "Incorrect Username or Password",
                isAuthenticated: false,
                user: result
            })
        }
        }).catch((err) => {
            res.status(500).json({
                message: "User log in failed",
            })
            console.log(`there was an error logging in the user`)
            console.log(err)
        })
}

exports.forgotpassword = (req, res) => {
    const mobileno = req.body.query;
    usersModel.find(mobileno).then((result) => {
        res.status(200).json({
            message: 'This is your username and password',
            details: result
        })
        }).catch((err) => {
            res.status(500).json({
                message: "user not found",
            })
            console.log(`there was an error forgot password`)
        })
}