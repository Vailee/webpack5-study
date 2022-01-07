let title = require('./title.txt')
import './index.css'
import './less.less'
import './sass.scss'
console.log(title);
console.log('hello ');


let logo = require('./image/logo.png')
let image = new Image()
image.src = logo
document.body.appendChild(image)