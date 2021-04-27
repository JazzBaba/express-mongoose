const jwt = require('jsonwebtoken');
const { parseInt } = require('lodash');
const { CONSTANTS } = require('../resources/constant');
const { returnError, bypassUrl } = require("./general")
/**
 * 
 * @param {json} body userid and password
 * @param {number} expiresIn the exprition time for the auth 
 * @returns signed auth token value
 */
exports.generateAccessToken = (body, expiresIn) => {
    const key = process.env.JWT_SIGN_KEY;
    return jwt.sign(body, key, { expiresIn: expiresIn });
};

/**
 * 
 * @param {json} body attributes which are suppose to be encryption
 * @returns auth token and expirein value
 */
exports.encryption = (body) => {
    let expiresIn = parseInt(eval(process.env.EXPIRES_IN));
    return {
        authToken: this.generateAccessToken(body, expiresIn),
        expiresIn: expiresIn
    }
}

/**
 * MIDDLEWARE TO VARIFY THE USER API CALL
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.varify = (req, res, next) => {
    if (!bypassUrl.includes(req.baseUrl)) {
        const header = req.headers;
        if (!header["authorization"])
            returnError({
                res: res,
                status: CONSTANTS.UNAUTHORIZED.STATUS,
                error: CONSTANTS.UNAUTHORIZED.MSG
            });
        try {
            var decode = jwt.verify(header["authorization"], process.env.JWT_SIGN_KEY);
            req.userInfo = decode;
        } catch (error) {
            returnError({
                res: res,
                error: CONSTANTS.UNAUTHORIZED.MSG,
                status: CONSTANTS.UNAUTHORIZED.STATUS
            })
        }
    }
    next()
}