/** 
    * @swagger
    *  component:
    *    schemas:
    *      Book:
    *        type: object
    *        required:
    *          - title
    *          - author
    *          - finished
    *        properties:
    *          id:
    *            type: integer
    *            description: The auto-generated id of the book.
    *          title:
    *            type: string
    *            description: The title of your book.
    *          author:
    *            type: string
    *            description: Who wrote the book?
    *          finished:
    *            type: boolean
    *            description: Have you finished reading it?
    *          createdAt:
    *            type: string
    *            format: date
    *            description: The date of the record creation.
    *        example:
    *           title: The Pragmatic Programmer
    *           author: Andy Hunt / Dave Thomas
    *           finished: true
    */
const userController = require("../controller/user");

module.exports = (app) => {


  /**
    * @swagger
    *     /user:
    *         get:
    *            tags:
    *               - Users
    *            Name: GetUser
    *            summary: to get the list of users
    *            consumes:
    *               -"application/json"
    *            produces:
    *               -"application/json"
    *            description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
    *            response:
    *             '200':
    *                 description: success
    *                 content:
    *                   application/json:
    *                 
    * 
    */
  app.get("/user", userController.get)

  /**
   * to add new user
   */
  app.post("/user", userController.post)

  
  /**
   * to update user
   */
   app.put("/user/:id", userController.put)


  /**
   * to get user by id
   */
  app.get("/user/:id", userController.getById)


  /**
   * delete user by id
   */
  app.delete("/user/:id", userController.delete)


}