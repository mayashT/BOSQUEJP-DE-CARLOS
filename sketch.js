const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var engine, world;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

var database;
var position = 100;

var heroe1, heroe2;
var villano;

var box1, box2, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12;
var ground1;

var ladrillo, ladrilloG;

function preload() {
    pista = loadImage("desierto.jpg");
    her1 = loadImage("super1.jpg");
    her2 = loadImage("super2.jpg");
    vil = loadImage("villano.jpg");
}

function setup() {
    createCanvas(displayWidth, displayHeight);
    database = firebase.database();
    engine = Engine.create();
    world = engine.world;

    heroe1 = createSprite(10, 400, 10, 10);
    heroe1.addImage(her1);
    heroe1.scale = 0.1;

    heroe2 = createSprite(10, 100, 10, 10);
    heroe2.addImage(her2);
    heroe2.scale = 0.1;

    villano = createSprite(1200, 500, 10, 10);
    villano.addImage(vil);
    villano.scale = 0.1;

    var heroe1Position = database.ref('heroe1/position');
    heroe1Position.on("value", readPosition, showError);

    var heroe2Position2 = database.ref('heroe2/position');
    heroe2Position2.on("value", readPosition2, showError);

    ladrilloG = new Group();

    box1 = new Box(900, 600);
    box2 = new Box(900, 550);
    box3 = new Box(900, 500);
    box4 = new Box(900, 450);
    box5 = new Box(900, 400);
    box6 = new Box(900, 350);

    box7 = new Box(1000, 600);
    box8 = new Box(1000, 550);
    box9 = new Box(1000, 500);
    box10 = new Box(1000, 450);
    box11 = new Box(1000, 400);
    box12 = new Box(1000, 350);

    ground1 = new Ground(700, 700)

}

function draw() {
    background(pista)
    drawSprites();
    Engine.update(engine);

    textSize(35);
    stroke("red");
    fill("white");
    text("Vidas: " + score, 800, 55);

    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();
    box7.display();
    box8.display();
    box9.display();
    box10.display();
    box11.display();
    box12.display();
    ground1.display();

    if (gameState === PLAY) {
        if (position !== undefined) {

            if (keyDown(LEFT_ARROW)) {
                writePosition(-1, 0);
            } else if (keyDown(RIGHT_ARROW)) {
                writePosition(1, 0);
            } else if (keyDown(UP_ARROW)) {
                writePosition(0, -1);
            } else if (keyDown(DOWN_ARROW)) {
                writePosition(0, 1);
            }

            if (keyDown("A")) {
                writePosition2(-1, 0);
            } else if (keyDown("D")) {
                writePosition2(1, 0);
            } else if (keyDown("W")) {
                writePosition2(0, -1);
            } else if (keyDown("S")) {
                writePosition2(0, 1);
            }

        }

        ladrillos();


        if (ladrilloG.collide(heroe1) || ladrilloG.collide(heroe2)) {
            gameState = END;
            score = score + 1;

        }

    } else if (gameState === END) {
        ladrillo.velocityX = 0;
        ladrilloG.setVelocityXEach(0);
        ladrilloG.setLifetimeEach(-1);

        var button = createButton('Reset');
        button.position(1000, 900);

        button.mousePressed(() => {
            reset();

        });
    }
}

function reset() {
    gameState = PLAY;
    ladrilloG.destroyEach();

    database.ref('heroe1/position').set({
        'x': 20,
        'y': 200
    });

    database.ref('heroe2/position').set({
        'x': 20,
        'y': 400
    });

}

function ladrillos() {
    if (frameCount % 5 === 0) {
        ladrillo = createSprite(1200, 500, 20, 20);
        ladrillo.shapeColor = "red";
        ladrillo.y = Math.round(random(10, 1000));
        ladrillo.velocityX = random(-8, -80);
        ladrillo.lifetime = 500;
        ladrilloG.add(ladrillo);
    }
}

function readPosition(data) {
    position = data.val();
    heroe1.x = position.x;
    heroe1.y = position.y;
}

function readPosition2(data) {
    position = data.val();
    heroe2.x = position.x;
    heroe2.y = position.y;
}


function writePosition(x, y) {
    database.ref('heroe1/position').set({
        'x': position.x + x,
        'y': position.y + y
    });

}

function writePosition2(x, y) {
    database.ref('heroe2/position').set({
        'x': position.x + x,
        'y': position.y + y
    });
}

function showError() {
    console.log("error en database")
}