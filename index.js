const inquirer = require("inquirer");
const fs = require("fs");


class logo {
    constructor(shape, text){
        this.shape = shape;
        this.text = text;
    }
    createsvg() {
        return `
        <svg version="1.1" width= "300" height="200" xmlns="http://www.w3.org/2000/svg">\n
        ${this.shape.getline()}\n
        ${this.text.getline()}\n
        </svg>
        `
    }
}

class shape {
    constructor(type, color){
        this.type = type;
        this.color = color;
    }

    getline(){
        var svg = '';
        switch (this.type) {
            case 'square':
                svg += '<rect width="200" height="200" style="fill:'+this.color+';stroke-width:3;stroke:'+this.color+'"/>\n';
                break;
            case 'circle':
                svg += '<circle cx="100" cy="100" r="100" style="fill:'+this.color+';stroke-width:3;stroke:'+this.color+'"/>\n';
                break;
            case 'triangle':
                svg += '<polygon points="100,0 200,200 0,200" style="fill:'+this.color+';stroke-width:3;stroke:'+this.color+'"/>\n';
                break;
        }
        return svg;
    }
}

class text {
    constructor(text, color){
        this.text = text;
        this.color = color;
    }

    getline(){
        var svg = '';
        svg += '<text x="30%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100" fill="'+this.color+'">'+this.text+'</text>\n';
        return svg;
    }
}


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
        var shapeinput = new shape(response.shape, response.shapeColor);
        var textinput = new text(response.logo, response.color);
        var comlogo = new logo(shapeinput, textinput);
        var svg = comlogo.createsvg();


        // This code will display the error message if there is one and if not it will display success in the console
        fs.writeFile("./assets/logo.svg", svg, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Success!");
            }
        }
        )
    })

    module.exports = { logo, shape, text };