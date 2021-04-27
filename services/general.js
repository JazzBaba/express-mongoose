var _ = require('lodash');
const { CONSTANTS } = require('../resources/constant');

/**
 * Return success method 
 * 
 * @param {res} param0 response object
 * @param {string} param1 message object
 * @param {data} param2 data object
 * @param {number} param3 status object
 */
exports.returnSuccess = ({ res, msg, data = [], status = 200 }) => {
    res.json({
        flag: true,
        msg: msg,
        data: data,
        status: status
    })
}

/**
 * Return error method 
 * 
 * @param {res} res response object
 * @param {string} param1 error object
 * @param {data} param2 data object
 * @param {number} param3 status object
 */
exports.returnError = ({ res, error, data = [], status = 400 }) => {
    res
    .status(status)
    .json({
        flag: false,
        error: error,
        data: data,
        status: status
    })
}

/**
 * 
 * @param {body} param0 body from the request
 * @param {filds} param1 list of required filda 
 * @returns 
 */
exports.requiredValidation = ({ body, filds }) => {
    const required = _.difference(filds, Object.keys(body));
    if (required.length > 0) {
        return {
            flag: false,
            error: CONSTANTS.REQUIRED.MSG,
            data: required,
            status: CONSTANTS.REQUIRED.STATUS
        }
    } else {
        return {
            flag: true
        }
    }
}

/**
 * @description aba daba jaba
 * @returns list of url
 */
exports.bypassUrl = [
    "/login"
]