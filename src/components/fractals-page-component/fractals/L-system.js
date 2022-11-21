export default class LSystem {
    color='#000000'
    startAngle = 90
    angle = 45
    lineSize = 100
    lineWidth = 1
    curDepth = 1
    stepSizeMultiplier = 2
    startPoint = {x:0, y:300}
    printSymols = ['0','1']
    states = []

    save(turtle) {
        this.states.push({
            x: turtle.x,
            y: turtle.y,
            dir: turtle.dir,
            color: turtle.color.hex(),
            lineWidth: turtle.lineWidth,
        });
        return turtle;
    };

    restore(turtle) {
        var state = this.states.pop();

        if(state !== undefined) {
            turtle.setx(state.x);
            turtle.sety(state.y);
            turtle.setheading(state.dir);
            turtle.setcolor(state.color);
            turtle.setlinewidth(state.lineWidth);
        }

        return turtle;
    };
    
    calcPath(axiom='', rules={'': ''},depth=0) {
        var result = axiom;
        this.curDepth = depth;
        for (let i = 0; i < depth; i++) {
            let resArray = result.split('');
            result = resArray.map((ch) => {
                let res = rules[ch];
                return res != null ? res : ch;
            }).join('')
        }

        return result
    }

    getDrawer(path, fill) {
        return (turtle) => {
            turtle.penup().moveto(this.startPoint.x, this.startPoint.y).setcolor(this.color).setlinewidth(this.lineWidth).pendown().forward(0)
            turtle.left(this.startAngle)
            // this.curDepth = 1;
                            
            var resArray = path.split('');
            for (const ch of resArray) {
                switch (ch) {
                    case (this.printSymols.indexOf(ch)+1 && ch):
                        turtle.forward(this.stepSizeMultiplier !== 0 ? this.lineSize/(this.curDepth * this.stepSizeMultiplier) : this.lineSize);
                        break;
                    case '[':
                        this.save(turtle);
                        break;
                    case ']':
                        turtle.penup()
                        this.restore(turtle)
                        turtle.pendown().forward(0);
                        break;
                    case '-':
                        turtle.left(this.angle);
                        break;
                    case '+':
                        turtle.right(this.angle);
                        break;
                    case 'r':
                        this.curDepth += 1;
                        break;
                    default:
                        break;
                }
            }
            if(fill) {
                turtle.currentPath.closePath()
                turtle.fill()
            } else {
                turtle.stroke();
            }
        }
    }
}