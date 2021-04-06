const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const generate = require('./Utils/generateMarkdown');

const questions = [
    {
        type: "input",
        name: "title",
        message: "What is your project's title?"
    },
    {
        type: "input",
        name: "badge",
        message: "Please provide the badges links that you want."
    },
    {
        type: "input",
        name: "description",
        message: "Please provide your project's description."
    },
    {
        type: "input",
        name: "installation",
        message: "What are the installation instructions?"
    },
    {
        type: "input",
        name: "usage",
        message: "What is the project usage?"
    },
    {
        type: "input",
        name: "licence",
        message: "Please provide the project licence or your badge link."
    },
    {
        type: "input",
        name: "contributing",
        message: "Please provide the contributing parties."
    },
    {
        type: "input",
        name: "test",
        message: "Please provide the project tests."
    },
    {
        type: "input",
        name: "username",
        message: "What is your Github user name?"
    },
    {
        type: "input",
        name: "repo",
        message: "What is your repository's link?"
    },
];

inquirer
    .prompt(questions)
    .then(function(data){
        const queryUrl = `https://api.github.com/users/${data.username}`;

        axios.get(queryUrl).then(function(user) {
            
            const githubInfo = {
                githubImage: user.data.avatar_url,
                email: user.data.email,
                profile: user.data.html_url,
                name: user.data.name
            };
            
          fs.writeFile("README.md", generate(data, githubInfo), function(err) {
            if (err) {
              throw err;
            };
    
            console.log("New README.md file created with success!");
          });
        });

});

function init() {

}

init();