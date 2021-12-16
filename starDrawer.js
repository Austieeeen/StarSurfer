var numStars = 500;
var speedThrottle = 1;
var speedMultiplier = .05;
var speedOffset = .001;
var frameRate = 10;
var spawnRadius = 500;
var acceleration = .0001;
var canvas = document.getElementById("can");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
var sizeThrottle = 1.5;
var starFleet = [];
var hyperspeed = false;
var r; var theta; var x_rand; var y_rand; var speed; var x_change; var y_change;
var brightness; var radius; var ran; var red; var green; var blue; var counter = 0;
var mouse_x; var mouse_y;

for(var i = 0; i < numStars; i++) {
    r = spawnRadius * Math.sqrt(Math.random());
    theta = Math.random() * 2 * Math.PI;
    x_rand = (window.innerWidth / 2) + r * Math.cos(theta);
    y_rand = (window.innerHeight / 2) + r * Math.sin(theta);
    speed = Math.random() * speedMultiplier + speedOffset;
    if (r < spawnRadius * .05) {
        speed = .5;
    }
    x_change = ((window.innerWidth / 2) - x_rand) * -1;
    y_change = ((window.innerHeight / 2) - y_rand) * -1;
    brightness = Math.random();
    radius = Math.random() + speedOffset;
    ran = Math.random();
    if (ran >= .97) {
        red = Math.random() * 150 + 100;
        green = 0;
        blue = 0;
    } else if (ran >= .93) {
        red = 0;
        green = 0;
        blue = Math.random() * 150 + 100;
    } else if (ran >= .80) {
        red = Math.random() * 255;
        green = red;
        blue = 0;
    } else {
        red = 255;
        green = 255;
        blue = 255;
    }
    starFleet[i] = (function(x_rand, y_rand, x_change, y_change, speed, brightness, radius, red, green, blue) {
        return {
            x: x_rand,
            y: y_rand,
            dx: x_change,
            dy: y_change,
            starSpeed: speed,
            opacity: brightness,
            r: radius,
            color_r: red,
            color_g: green,
            color_b: blue
        };
    })(x_rand, y_rand, x_change, y_change, speed, brightness, radius, red, green, blue);
}

setInterval(function() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < starFleet.length; i++) {
        var star = starFleet[i];
        if (hyperspeed) {
            speedThrottle = 1;
            counter += 1;
            if (counter % 8 === 0) {
                ctx.moveTo(star.x - (star.dx * star.starSpeed * speedThrottle) * 8, star.y - (star.dy * star.starSpeed * speedThrottle) * 8);
                ctx.lineTo(star.x, star.y);
                ctx.strokeStyle = "white";
                ctx.stroke();
            }
            if (counter >= 32000) {
                hyperspeed = false;
                counter = 0;
                speedThrottle = 10;
                console.log(counter);
                $("#throttle").val(10);
            }
        } else {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r * sizeThrottle,  0, 2 * Math.PI);
            ctx.fillStyle = "rgba(" + star.color_r + ", " + star.color_g + ", " + star.color_b + ", " + star.opacity + ")";
            ctx.fill();
        }
        star.x += star.dx * star.starSpeed * speedThrottle;
        star.y += star.dy * star.starSpeed * speedThrottle;
        star.starSpeed += acceleration;
        if (star.opacity) {
            star.opacity += star.starSpeed * .3 * speedThrottle;
        }
        if (star.x >= window.innerWidth || star.x <= 0 || star.y >= window.innerHeight || star.y <= 0) {
            r = spawnRadius * Math.sqrt(Math.random());
            theta = Math.random() * 2 * Math.PI;
            star.x = (window.innerWidth / 2) + r * Math.cos(theta);
            star.y = (window.innerHeight / 2) + r * Math.sin(theta);
            if (r < spawnRadius * .05) {
                star.dx = ((window.innerWidth / 2) - star.x) * -2;
                star.dy = ((window.innerHeight / 2) - star.y) * -2;
                star.starSpeed = 1;
                star.opacity = 2;
            } else {
                star.dx = ((window.innerWidth / 2) - star.x) * -1;
                star.dy = ((window.innerHeight / 2) - star.y) * -1;
                star.opacity = Math.random() * .25;
                star.starSpeed = Math.random() * speedMultiplier + speedOffset;
            }
            star.r = Math.random() + speedOffset;
        }
    }
}, frameRate);


$("#update").on("click",function (e) {
    speedThrottle = $("#throttle").val();
    spawnRadius = $("#spawnRadius").val();
    acceleration = +$("#acceleration").val();
    sizeThrottle = +$("#sizeThrottle").val();
});
$("#reset").on("click", function(e) {
    $("#throttle").val(1);
    $("#spawnRadius").val(500);
    $('#acceleration').val(0.0001);
    $("#sizeThrottle").val(1.5)
    speedThrottle = 1;
    spawnRadius = 500;
    acceleration = 0.0001;
    sizeThrottle = 1.5;
});
$("#hyperspeed").on("click", function (e) {
    hyperspeed = true;
});
