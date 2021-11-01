class Box {
    constructor(x, y, width, height) {

        var options = {
            restitution: 0.1,
            density: 0.5,
            friction: 0.8
        }

        this.body = Bodies.rectangle(x, y, 80, 80, options);
        this.width = 80;
        this.height = 80;
        //this.image= loadImage ("la imagen");
        World.add(world, this.body);
    }

    display() {
        var pos = this.body.position;
        push();
        rectMode(CENTER);
        stroke("blue");
        fill("yellow");
        rect(pos.x, pos.y, this.width, this.height);
        pop();
    }

}