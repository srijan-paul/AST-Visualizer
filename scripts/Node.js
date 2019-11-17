class Node {
    constructor(left, value, right, r, x, y) {
        this.left = left;
        this.value = value;
        this.right = right;
        this.r = r;
        this.x = x;
        this.y = y;
        this.h = 0;
        this.color = 'deeppink'
    }

    show() {
        stroke(this.color)
        
        if (this.left)
            line(this.x + this.r / 4, this.y + this.r / 4, this.left.x + this.r / 4, this.left.y - this.r / 4)

        if (this.right)
            line(this.x - this.r / 4, this.y + this.r / 4, this.right.x + this.r / 4, this.right.y + this.r / 4)


        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r);
        fill('white')
        textAlign(CENTER);
        let txt = this.value,
            len = txt.toString().length;

        if (typeof this.value === "number" && this.value - Math.floor(this.value) != 0) {
            txt = parseFloat(this.value).toFixed(2);
        }

        textSize(20 - 3 * len);
        text(txt, this.x, this.y + 7);
    }


}