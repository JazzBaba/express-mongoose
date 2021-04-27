const { ObjectID } = require('bson');
const { User } = require('../model');
const { SEARCH_ATTRIBUTES, LIST_ATTRIBUTES } = require('../resources/constant');
const generalRepo = require("./general")


/**
 * 
 * @param {JSON} param0 body param with name, email and password
 * @param {ObjectID} param1 the user who want to add new one 
 * @returns 
 */
exports.add = async ({ body, createdBy = null }) => {
    var newUser = new User({
        name: body.name,
        email: body.email
    })
    newUser.password = newUser.generateHash(body.password)
    await newUser.save();
    return newUser
}

/**
 * 
 * @search to search through name and email of user list
 * @order to sort in the attributes Ex. pass name_asc for ascending or name_desc for descending
 * @page the page you want 
 * @limit the number of record you want per page
 * 
 * @param {*} query all the filter mentined above
 * @returns the list of user
 */
exports.getList = async (query) => {
    var userList = [];
        userList = await generalRepo
        .getListData({
            model: User,
            query: query,
            listAttributes: LIST_ATTRIBUTES.USER_LIST,
            searchAttributes: SEARCH_ATTRIBUTES.USER_LIST
        });
   
    return userList;
}

/**
 * get the user detail by id
 * @param {ObjectID} _id | user id
 * @returns 
 */
exports.getById = async (_id) => {
    var returnAttribute = {};

    LIST_ATTRIBUTES.USER_LIST.map(attribute => {
        returnAttribute[attribute] = 1;
    });
    var userObject = await User.findById(_id,returnAttribute);
    return userObject;
}

/**  
 * to remove the user from the DB
 * @param {ObjectID} _id | id of the user
 */
exports.delete = async (_id) => {
    return await User.findByIdAndDelete(_id);
}

/**
 * to update the user by id
 * @param {ObjectID} param0 the userid
 * @returns 
 */
exports.put = async ({_id,body}) => {
    return await User.findByIdAndUpdate(_id,body);
}