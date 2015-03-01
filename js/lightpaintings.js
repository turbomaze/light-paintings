/******************\
|  Light Paintings |
| @author Anthony  |
| @version 0.1     |
| @date 2015/02/26 |
| @edit 2015/02/26 |
\******************/

var LightPaintings = (function() {
    /**********
     * config */
    var CANV_WIDTH = 400;
    var ENV = {
        lightType: 0, //point light
        lightPos: [0, 0, 0], //at the origin
        wallDist: 12, //distance from the wall to the point light
        wallSize: [8, 6] //dimensions of the wall
    }; //the environment of the installation space

    /*************
     * constants */

    /*********************
     * working variables */
    var canvas, ctx;
    var shapes;

    /******************
     * work functions */
    function initLightPaintings() {
        //init working vars
        canvas = $s('#canvas');
        canvas.width = CANV_WIDTH;
        canvas.height= CANV_WIDTH*(ENV.wallSize[1]/ENV.wallSize[0]);
        ctx = canvas.getContext('2d');

        //the shapes
        shapes = [
            new Shape2D([[-1,0,6], [0,1,6], [1,0,6]], 'rgba(0,0,255,0.5)'),
            new Shape2D([[-1,1,8], [-2,-3,9], [1,2,7]], 'rgba(255,0,0,0.5)')
        ];

        //draw them
        for (var si = 0; si < shapes.length; si++) {
            shapes[si].draw();
        }
    }

    /**********
     * objects */
    function Shape2D(pts, color) {
        this.verts = pts; //the vertices of this shape
        this.col = color; //its color
    }
    Shape2D.prototype.draw = function() {
        var projCoords = this.verts.map(function(v) {
            var vProj = v.slice(0, 2).map(function(c) { //project the vertex
                return c*(ENV.wallDist/v[2]);
            });
            var vShifted = [
                vProj[0] + ENV.wallSize[0]/2,
                //negative because the y-axis goes the other way in the canvas
                -vProj[1] + ENV.wallSize[1]/2
            ];
            return vShifted.map(function(c) { //convert to canvas coordinates
                return c*CANV_WIDTH/ENV.wallSize[0];
            });
        });

        ctx.beginPath();
        ctx.moveTo(projCoords[0][0], projCoords[0][1]);
        for (var pi = 1; pi < projCoords.length; pi++) {
            ctx.lineTo(projCoords[pi][0], projCoords[pi][1]);
        }
        ctx.closePath();
        ctx.fillStyle = this.col;
        ctx.fill();
    };

    /********************
     * helper functions */
    function clearCanvas() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
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

    return {
        init: initLightPaintings
    };
})();

window.addEventListener('load', LightPaintings.init); 