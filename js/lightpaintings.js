/******************\
|  Light Paintings |
| @author Anthony  |
| @version 0.1     |
| @date 2015/02/26 |
| @edit 2015/02/26 |
\******************/

/**********
 * config */

/*************
 * constants */

/*********************
 * working variables */

/******************
 * work functions */
function initLightPaintings() {
    console.log('foo');
}

/**********
 * objects */

/********************
 * helper functions */
function $s(id) { //for convenience
    if (id.charAt(0) !== '#') return false;
    return document.getElementById(id.substring(1));
}

function getRandInt(low, high) { //output is in [low, high)
    return Math.floor(low + Math.random()*(high-low));
}

function round(n, places) {
    var mult = Math.pow(10, places);
    return Math.round(mult*n)/mult;
}

window.addEventListener('load', initLightPaintings); 