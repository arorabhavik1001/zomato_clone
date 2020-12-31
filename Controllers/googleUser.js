const googleusersModel = require('../Models/googleModel')

exports.googleSignUp = (req, res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const contactNo = req.body.contactNo;
    const address = req.body.address;

    const registergoogleUser = new googleusersModel({
        email: email,
        firstName: firstName,
        lastName: lastName,
        contactNo: contactNo,
        address: address
    })

    registergoogleUser.save().then((result) => {
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