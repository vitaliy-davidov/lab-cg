import LSystem from "./L-system";

export default class IslandSettings {
    axiom='F+F+F+F';
    rules={'F': 'F+F-F-FFF+F+F-F'};
    angle=90;
    system = new LSystem();
    
    getDrawer(depth, fill) {
        this.system.angle=this.angle;
        this.system.printSymols=['F']
        return this.system.getDrawer(this.system.calcPath(this.axiom, this.rules, depth), fill)
    }
}