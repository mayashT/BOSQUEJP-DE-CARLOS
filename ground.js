class Ground {
    constructor(x, y, width, height) {

        var options = {
            isStatic: true
        }

        this.body = Bodies.rectangle(x, y, 800, 15, options);
        this.width = 800;
        this.height = 15;
        //this.image= loadImage ("la imagen");
        World.add(world, this.body);
    }

    display() {
        var pos = this.body.position;
        push();
        rectMode(CENTER);
        stroke("black");
        fill("brown");
        rect(pos.x, pos.y, this.width, this.height);
        pop();
    }

}