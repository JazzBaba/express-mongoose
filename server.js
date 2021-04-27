const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require('dotenv');
const { varify } = require("./services/jwt_auth")

dotenv.config();

const port = process.env.PORT || 3000

require("./services/db");

const swaggerOptions = {
    swaggerDefinition: {
        // openapi: "3.0.0",
        info: {
            title: "Sample Pet Store App",
            version: "1.0.0",
            description: "This is a sample server for a pet store.",
            contact: {
                name: "Swagger Demo"
            },
            servers: ["http://localhost:3000"],
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html"
            },
        }
    },
    apis: ["./routers/user.js"],
};

const swaggerDoc = swaggerJsDoc(swaggerOptions);

app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDoc));

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use("*", varify)

require("./routers/auth")(app);

require("./routers/user")(app)

app.listen(port, () => {
    console.log(`my swagger demo is started on port - ${port}`);
})