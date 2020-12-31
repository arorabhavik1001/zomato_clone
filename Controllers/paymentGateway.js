require('dotenv').config();
const formidable = require('formidable');
const {v4: uuidv4} = require('uuid');
const https = require('https');
const PaytmChecksum = require('./PaytmChecksum');

exports.payment = (req, res) => {
    const {amount, email, mobileNo} = req.body;

    const totalAmount = JSON.stringify(amount);
    var params = {}
    params['MID'] = process.env.PAYTM_MID;
    params['TXN_AMOUNT'] = amount;
    params['WEBSITE'] = process.env.PAYTM_WEBSITE;
    params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE;
    params['MOBILE_NO'] = mobileNo;
    params['CUST_ID'] = process.env.PAYTM_CUST_ID;
    params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
    // params['CALLBACK_URL'] = 'http://localhost:3000/transactions';
    params['CALLBACK_URL'] = 'http://localhost:5000/pageAfterPayment';
    params['ORDER_ID'] = uuidv4();
    params['EMAIL'] = email;

    var paytmChecksum  = PaytmChecksum.generateSignature(
        params, process.env.PAYTM_MERCHANT_KEY
    )

    paytmChecksum.then(
        result => {
            var checksumResult = {
                ...params,
                "CHECKSUMHASH": result
            }
            res.json({response: checksumResult})
        }
    ).catch(error => {
        res.status(500).json({
            message: error
        }
    )
    })
}

exports.pageAfterPayment = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (error, fields, file) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error });
      }
      let checkSumHash = fields.CHECKSUMHASH;
      delete fields.CHECKSUMHASH;
      var isVerifySignature = PaytmChecksum.verifySignature(
        fields,
        process.env.PAYTM_MERCHANT_KEY,
        checkSumHash
      )

      if (isVerifySignature) {
        var params = {};
        params["MID"] = fields.MID;
        params["ORDER_ID"] = fields.ORDERID;

        PaytmChecksum.generateSignature(
        params,
        process.env.PAYTM_MERCHANT_KEY
        ).then(checksum => {
        params["CHECKSUMHASH"] = checksum;
        var data = JSON.stringify(params);
        var options = {
            hostname: "securegw-stage.paytm.in",
            port: 443,
            path: "/order/status",
            method: "POST",
            headers: {
            'Content-Type': "application/json",
            'Content-Length': data.length
            }
        };
        var response = "";
        var request = https.request(options, (responseFromPaytm) => {
            responseFromPaytm.on('data', (chunk) => {
                response += chunk;
            });
            responseFromPaytm.on('end', () => {
                console.log(response);
                res.json(response);
            });
        });
        request.write(data);
        request.end();
        })
      } else {
        console.log("Checksum Mismatch");
        res.status(500).json({ error: "Hacker aya bhaaaai~~!! !" });
      }

    });

    // takeToFrontend();
    
}
// takeToFrontend = (req, res) => {
//     res.redirect(200, "http://localhost:3000/transactions")
// };
