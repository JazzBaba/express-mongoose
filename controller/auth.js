const { Db } = require("mongodb");
const { authRepo } = require("../repository");
const { returnSuccess, returnError, requiredValidation } = require("../services/general")
const { encryption } = require("../services/jwt_auth")


/**
 * 
 * @param {JSON} req email and password in json body
 * @param {JSON} res res, msg(success), error(error), data and status  
 */
exports.login = (req, res) => {
    try {
        const body = req.body;
        var resp = requiredValidation({ body: body, filds: ["email", "password"] });
        var responseDataArray = [];
        if (!resp.flag) {
            responseDataArray.push(resp.data)
            returnError({
                res: res,
                error: resp.error,
                data: responseDataArray,
                status: resp.status
            })
        }

        authRepo
            .login({
                email: body.email,
                password: body.password
            })
            .then(response => {
                if (response.flag) {
                    var data = {
                        _id:response.data._id,
                        name:response.data.name,
                        email:response.data.email
                    }
                    let auth = encryption(data);
                    responseDataArray.push(auth)
                    returnSuccess({
                        res: res,
                        msg: response.msg,
                        data: responseDataArray,
                        status: response.status
                    })
                } else {
                    returnError({
                        res: res,
                        error: response.msg,
                        status: response.status
                    })
                }

            })
        .catch(error => {
            returnError({
                res: res,
                error: error
            })
        })
} catch (error) {
    returnError({
        res: res,
        error: error
    })
}
}