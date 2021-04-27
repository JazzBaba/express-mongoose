const authController = require("../controller/auth");

module.exports = (app) => {

    /**
     * the api to login
     */
    app.post("/login",authController.login)


}