import LSystem from "./L-system";

export default class BeautifulTreeSettings {
    axiom='X';
    rules={'X': 'F-[[X]+X]+F[+FX]-X', 'F': 'FF'};
    angle=22.5;
    system = new LSystem();
    
    getDrawer(depth) {
        this.system.angle=this.angle;
        this.system.printSymols=['F','X']
        return this.system.getDrawer(this.system.calcPath(this.axiom, this.rules, depth), false)
    }

}