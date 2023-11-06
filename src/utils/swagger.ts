export const  options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Building Express API with Swagger",
                version: "0.1.0",
                description:
                    "This is a website for buy and sale buildings and houses",
                license: {
                    name: "MIT",
                    url: "https://spdx.org/licenses/MIT.html",
                },
                contact: {
                    name: "skills with suleiman suleiman",
                    url: "https://github.com/SuleimanSuleiman",
                    email: "info@email.com",
                },
            },
            servers: [
                {
                    url: "http://localhost:3000/",
                },
            ],
        },
        apis: ["../routes/*.routes.ts"],
    };