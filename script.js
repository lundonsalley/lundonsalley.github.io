var c = 0;
var ctx;
var rc = 0;
var rctx;

var point = true;
var lastPos = [0,0];
var robotStartLocation = [0,0];

var robotFiles = [];
var robotFileSizes = [];

var fieldRotation = 0;
var action;

var robotRotate = 0;

var rotRobot = 0;
var xRobot = 0;
var yRobot = 0;

var action;
var convert = 7.11111111;

var robot = document.getElementById("robot");

var robotvelo = 10;

function initField(){
    fieldRotation = document.getElementById("rotate").value;
    fieldRotate();
    drawField();
}

function drawField(){
    c = document.getElementById("field");
    ctx = c.getContext("2d");
    const img = document.getElementById("img-file");
    var size = img.height;
    while (size > (window.screen.width)) {
        size = size / 2;
    }
    c.width = size;
    c.height = size;
    convert = size / 144;

    ctx.drawImage(img, 0, 0, c.width, c.height);
}

function handleImageUpload(event) { 
    action = event;

    var file = event.target.files[0]; 
    var reader = new FileReader(); 

    reader.onload = function (e) {
        
        document.getElementById("img-file").src = e.target.result;
    }; 

    reader.readAsDataURL(file); 
}

function fieldRotate(){
    rot = String(fieldRotation) + "deg";
    rot = 'rotate(' + rot + ')';
    document.getElementById("field").style.transform = String(rot);
}






function initRobot(){
    if (document.getElementById("robotrotate").value != ''){
        robotRotate = document.getElementById("robotrotate").value
    }else{
        robotRotate = 0;
    }
    var i = document.getElementById("robotState").value;
    robotFileSizes[i][0] = document.getElementById("robot-dimentionW").value * convert;
    robotFileSizes[i][1] = document.getElementById("robot-dimentionH").value * convert;

    robotRotation();
    draw();
}

function draw(){
    drawRobot();
}

function dimChange(){
    var i = document.getElementById("robotState").value;

    robotFileSizes[i][0] = document.getElementById("robot-dimentionW").value * convert;
    robotFileSizes[i][1] = document.getElementById("robot-dimentionH").value * convert;
    rc.width = robotFileSizes[i][0];
    rc.height = robotFileSizes[i][1];

    drawRobot();
    window.requestAnimationFrame(draw);
}

function drawRobot(){
    rc = document.getElementById("robot");
    rctx = rc.getContext("2d");
    const img = document.getElementById("robot-file");
    var size = img.height;
    while (size > (window.screen.width)) {
        size = size / 2;
    }

    rctx.drawImage(img, 0, 0, rc.width, rc.height);
}

function robotRotation(){
    rot = String(robotRotate) + "deg";
    rot = 'rotate(' + rot + ')';
    document.getElementById("robot").style.transform = String(rot);
}

function storeFile(event){
    let files = [];
    var arrOptions = [];
    arrOptions.push("<option value='' selected>Select a file...</option>");
    for(let i=0;i<event.target.files.length;i++){
        files.push(event.target.files[i]);
        arrOptions.push("<option value='" + String(i) + 
        "'>" + String(files[i].name) + "</option>");
        robotFileSizes.push([0,0]);
    }
    robotFiles = files;
    document.getElementById("robotState").innerHTML = arrOptions.join();
}

function robotFileChange(event){
    document.getElementById("robot-dimentionW").value = '';
    document.getElementById("robot-dimentionH").value = '';

    rc.width = robotFileSizes[event.target.value][0];
    rc.height = robotFileSizes[event.target.value][1];
 
    action = event;

    var file = robotFiles[event.target.value]; 
    var reader = new FileReader(); 

    reader.onload = function (e) {
        document.getElementById("robot-file").src = e.target.result;
    }; 

    reader.readAsDataURL(file);

    draw();
    window.requestAnimationFrame(draw);
}

function moveX(deltax){
    let rad = (-robotRotate + 90) * Math.PI/180;
    let pos = [0,0];

    pos[1] = deltax * Math.cos(rad);
    pos[0] = deltax * Math.sin(rad);
    return(pos);
}
function moveY(deltay){
    let rad = (-robotRotate) * Math.PI/180;
    let pos = [0,0];

    pos[1] = deltay * Math.cos(rad);
    pos[0] = deltay * Math.sin(rad);
    return(pos);
}

function addPoint(){
    let rad = (-rotRobot) * Math.PI/180;
    if (point == true){
        rotRobot = 0;
        xRobot = 0;
        yRobot = 0;
    }
    point = [xRobot/convert, yRobot/convert];

    if(String(point[0]).includes('.')){
        point[0] = ' ' + String(point[0]).slice(0, String(point[0]).indexOf('.') + 3);
    }else{
        point[0] = ' ' + String(point[0]);
    }

    if(String(point[1]).includes('.')){
        point[1] = ' ' + String(point[1]).slice(0, String(point[1]).indexOf('.') + 3);
    }else{
        point[1] = ' ' + String(point[1]);
    }

    if(rotRobot != 0){
        num = (rad/Math.PI);
        if(String(num).includes('.')){
            num = ' ' + String(num).slice(0, String(num).indexOf('.') + 3);
        }else{
            num = ' ' + String(num);
        }
        var output = "Added: " + String(num) + " π radians";
        document.getElementById("points").innerHTML += "<p>" + output + "</p>";
    }
    var output = "Added: " + String(point);
    document.getElementById("points").innerHTML += "<p>" + output + "</p>";
    rotRobot = 0;
    xRobot = 0;
    yRobot = 0;
}


function clearPoints(){
    document.getElementById("points").innerHTML = '';
    point = true;
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    var denom = robotvelo;
    console.log(key);
    var pos = [];
    switch (event.key) {
        case "a":
            pos = moveX(-robotvelo);
            xRobot -= robotvelo;
            break;
        case "d":
            pos = moveX(robotvelo);
            xRobot += robotvelo;
            break;
        case "w":
            pos = moveY(-robotvelo);
            yRobot += robotvelo;
            break;
        case "s":
            pos = moveY(robotvelo);
            yRobot -= robotvelo;
            break;
        case "e":
            robotRotate += 1;
            rotRobot += 1;
            break;
        case "q":
            robotRotate -= 1;
            rotRobot -= 1;
            break;
        case "A":
            pos = moveX(-robotvelo/denom);
            xRobot -= robotvelo/denom;
            break;
        case "D":
            pos = moveX(robotvelo/denom);
            xRobot += robotvelo/denom;
            break;
        case "W":
            pos = moveY(-robotvelo/denom);
            yRobot += robotvelo/denom;
            break;
        case "S":
            pos = moveY(robotvelo/denom);
            yRobot -= robotvelo/denom;
            break;
        case "Enter":
            addPoint();
            break;
    }
    robot.style.top = String(Number(String(robot.style.top).slice(0,-2)) + pos[1]) + "px";
    robot.style.left = String(Number(String(robot.style.left).slice(0,-2)) + pos[0]) + "px";
    robotRotation();
    window.requestAnimationFrame(draw);
});