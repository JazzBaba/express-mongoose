// @param {string} password password of the account

const { CONSTANTS } = require("../resources/constant")
const { User } = require('../model')
const { ObjectID } = require("bson")
const { constant } = require("lodash")

/**
 * Login method with email and password
 * @param {string} param0 email
 * @param {string} param1 password
 */
exports.login = async ({ email, password }) => {
    var userObject = User();
    userObject = await User.findOne({ email: email })
    if (userObject && userObject.validPassword(password)) {
        return {
            flag: true,
            msg: CONSTANTS.LOGIN_SUCCESS.MSG,
            data:userObject,
            status: CONSTANTS.LOGIN_SUCCESS.STATUS
        }
    } else {
        return {
            flag: false,
            msg: CONSTANTS.UNAUTHORIZED.MSG,
            status: CONSTANTS.UNAUTHORIZED.STATUS
        }
    }
}