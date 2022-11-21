export default class TreeDrawer {
    static startPosition = {x: 1200/2, y: 600}
    static color = {h:30,s:1,l:0.3}
    static width = 100
    static depth = 10

    static drawTree(context, x1, y1, x2, y2, depth) {

        if (depth === TreeDrawer.depth)
            return;

        var dx = x2 - x1;
        var dy = y1 - y2;

        var x3 = x2 - dy;
        var y3 = y2 - dx;
        var x4 = x1 - dy;
        var y4 = y1 - dx;
        var x5 = x4 + 0.5 * (dx - dy);
        var y5 = y4 - 0.5 * (dx + dy);

        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(x3, y3);
        context.lineTo(x4, y4);
        context.closePath();

        context.save();
        context.translate(500, context.canvas.height-100)
        context.scale(1,-1)
        
        // Non-rotated rectangle
        context.fillStyle = '#00ff0055';
        context.fillRect(0, 0, 140, 30);
        
        // Matrix transformation


        context.translate(0, 0)
        context.scale(-1,1)
        context.rotate(45 * Math.PI / 180);

        // Rotated rectangle
        context.fillStyle = '#ff00d455';
        context.fillRect(0, 0, 140, 30);

        context.restore();
        
        context.fillStyle = `hsl(${TreeDrawer.color.h + depth * 10}, ${TreeDrawer.color.s * 100}%, ${TreeDrawer.color.l*100}%)`;
        context.fill();
        context.strokeStyle = "lightGray";
        context.stroke();

        // context.beginPath();
        // context.moveTo(x3, y3);
        // context.lineTo(x4, y4);
        // context.lineTo(x5, y5);
        // context.closePath();

        // context.fillStyle = HSVtoRGB(hue + depth * 0.035, 1, 1);
        // context.fill();
        // context.strokeStyle = "lightGray";
        // context.stroke();

        TreeDrawer.drawTree(context, x4, y4, x5, y5, depth + 1);
        TreeDrawer.drawTree(context, x5, y5, x3, y3, depth + 1);
    }

    static draw(context) {
        if(context != null){
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            TreeDrawer.drawTree(context,TreeDrawer.startPosition.x-(TreeDrawer.width/2), TreeDrawer.startPosition.y, TreeDrawer.startPosition.x+(TreeDrawer.width/2), TreeDrawer.startPosition.y, 0);
        }
    }
 
}