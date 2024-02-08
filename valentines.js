const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray;


//particle class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill()
    }
    update() {
        if (this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }

        this.x += this.directionX/4;
        this.y += this.directionY/4;

        this.draw();
    }
}

function init(){
    particleArray = [];
    let numberOfParticles = (canvas.height * canvas.width)/ 50000;
    for(let i = 0; i < numberOfParticles; i++){
        addNew();
    }
}

function addNew(){
    let size = (Math.random()*5)+1;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = 0;
    let directionX = (Math.random() * 3) - 1.5;
    let directionY = (Math.random() * 5);
    let color = '#ffb7c5';
    particleArray.push(new Particle(x,y,directionX,directionY,size,color))
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    if (Math.floor(Math.random() * 200) === 1){
                addNew();
            }

    for (let i=0;i<particleArray.length;i++){
        particleArray[i].update();
    }
}

window.addEventListener('mousemove',
        function(){
            if (Math.floor(Math.random() * 7) === 1){
                addNew();
            }
        }
    )

window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    })

init();
animate();

/***************************************************************************************************/
function yes(){
    document.getElementById("gif").setAttribute('class', 'gifClass');
}