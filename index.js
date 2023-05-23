const inquirer = require("inquirer");
const fs = require("fs");

// This goes through the inquirer prompts and saves the responses to variables to then display the svg logo you wanted
inquirer
    .prompt([
        {
            type: 'input',
            message: 'Logo letters (max 3):',
            name: 'logo',
        },
        {
            type: 'input',
            message: 'Color (hex):',
            name: 'color',
        },
        {
            type: 'list',
            choices: ['square', 'circle', 'triangle'],
            message: 'Logo Shape: (Square, Circle, Triangle)',
            name: 'shape',
        },
        {
            type: 'input',
            message: 'Shape Color (hex):',
            name: 'shapeColor',
        },
    ])

    .then((response) => {
        // This links the SVG and then sets the size for all of the logo shapes
        var svg = 'svg version="1.1" width= "300" height="200" xmlns="http://www.w3.org/2000/svg">\n';
        switch (response.shape) {
            case 'Square':
                svg += `<rect width="200" height="200" style="fill:${response.shapeColor};stroke-width:3;stroke:${response.shapeColor}"/>\n`;
                svg += `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100" fill="${response.color}">${response.logo}</text>\n`;
                svg += '</svg>';
                break;
            case 'Circle':
                svg += `<circle cx="100" cy="100" r="100" style="fill:${response.shapeColor};stroke-width:3;stroke:${response.shapeColor}"/>\n`;
                svg += `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100" fill="${response.color}">${response.logo}</text>\n`;
                svg += '</svg>';
                break;
            case 'Triangle':
                svg += `<polygon points="100,0 200,200 0,200" style="fill:${response.shapeColor};stroke-width:3;stroke:${response.shapeColor}"/>\n`;
                svg += `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100" fill="${response.color}">${response.logo}</text>\n`;
                svg += '</svg>';
                break;
        }
        fs.writeFile("./assets/logo.svg", svg, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Success!");
            }
        }
        )
    })
