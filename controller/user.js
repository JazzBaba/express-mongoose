const { returnSuccess, returnError, requiredValidation } = require("../services/general")
const { userRepo } = require('../repository');
const { CONSTANTS } = require("../resources/constant");

/**
  * @swagger
  *  path:
  *     /user:
  *         get:
  *            summary: to get the list of users
  *            response:
  *             '200':
  *                 description: success
  * 
  */
exports.get = (req, res) => {
  try {
    const query = req.query;

    userRepo
      .getList(query)
      .then(resp => {

        if (!resp)
          returnError({
            res: res,
            error: CONSTANTS.RECORD_DOES_NOT_EXIST.MSG,
            status: CONSTANTS.RECORD_DOES_NOT_EXIST.STATUS
          });
        returnSuccess({
          res: res,
          msg: CONSTANTS.RECORD_LISTED.MSG,
          data: resp,
          status: CONSTANTS.RECORD_LISTED.STATUS
        });
      })
      .catch(error => {
        returnError({
          res: res,
          msg: CONSTANTS.WRONG.MSG,
          error: error,
          status: CONSTANTS.WRONG.STATUS
        });
      });
  } catch (error) {
    returnError({
      res: res,
      msg: CONSTANTS.WRONG.MSG,
      error: error,
      status: CONSTANTS.WRONG.STATUS
    });
  }
}

/**
 * to add new user
 * @param {*} req 
 * @param {*} res 
 */
exports.post = (req, res) => {
  try {
    const body = req.body;
    var resp = requiredValidation({ body: body, filds: ["email", "name", "password"] });
    if (!resp.flag) {
      returnError({
        res: res,
        error: resp.error,
        data: resp.data,
        status: resp.status
      })
    }

    userRepo
      .add({ body: body })
      .then(resp => {
        returnSuccess({
          res: res,
          msg: CONSTANTS.USER_ADDED.MSG,
          data: [].push(resp),
          status: CONSTANTS.USER_ADDED.STATUS
        })
      })
      .catch(error => {
        returnError({
          res: res,
          error: error
        });
      })

  } catch (error) {
    returnError({
      res: res,
      error: error
    });
  }
}

/**
 * 
 * to get the user detail by id 
 * @param {*} req 
 * @param {*} res 
 */
exports.getById = (req, res) => {
  try {
    const _id = req.params.id;

    userRepo
      .getById(_id)
      .then(resp => {

        if (!resp)
        returnError({
          res: res,
          error: CONSTANTS.RECORD_DOES_NOT_EXIST.MSG,
          status: CONSTANTS.RECORD_DOES_NOT_EXIST.STATUS
        });

        var response = [];
        response.push(resp);
        returnSuccess({
          res: res,
          msg: CONSTANTS.RECORD_LISTED.MSG,
          data: response,
          status: CONSTANTS.RECORD_LISTED.STATUS
        });
      })
      .catch(error => {
        returnError({
          res: res,
          error: error
        });
      })

  } catch (error) {
    returnError({
      res: res,
      error: error
    });
  }
}

/**
 * 
 * to delete the user by id
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = (req, res) => {
  try {
    const _id = req.params.id;

    userRepo
      .delete(_id)
      .then(resp => {
        if (!resp)
          returnError({
            res: res,
            error: CONSTANTS.RECORD_DOES_NOT_EXIST.MSG,
            status: CONSTANTS.RECORD_DOES_NOT_EXIST.STATUS
          });
        
        var response = [];
        response.push(resp);
        returnSuccess({
          res: res,
          msg: CONSTANTS.RECORD_DELETED.MSG,
          data: response,
          status: CONSTANTS.RECORD_DELETED.STATUS
        });
      })
      .catch(error => {
        returnError({
          res: res,
          error: error
        });
      })

  } catch (error) {
    returnError({
      res: res,
      error: error
    });
  }
}

/**
 * to update the user by id
 * @param {*} req 
 * @param {*} res 
 */
exports.put = (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;

    userRepo
      .put({ _id: _id, body: body })
      .then(resp => {

        if (!resp)
          returnError({
            res: res,
            error: CONSTANTS.RECORD_DOES_NOT_EXIST.MSG,
            status: CONSTANTS.RECORD_DOES_NOT_EXIST.STATUS
          });

        var response = [];
        response.push(resp);
        returnSuccess({
          res: res,
          msg: CONSTANTS.RECORD_DELETED.MSG,
          data: response,
          status: CONSTANTS.RECORD_DELETED.STATUS
        });
      })
      .catch(error => {
        returnError({
          res: res,
          error: error
        });
      })
  } catch (error) {
    returnError({
      res: res,
      error: error
    });
  }
}