import LSystem from "./L-system";

export default class TreeSettings {
    axiom='0';
    rules={'0': '1[-0]+0', '1': '12'};
    angle=45;
    system = new LSystem();
    
    getDrawer(depth) {
        this.system.angle=this.angle;
        this.system.printSymols=['0','1','2']
        return this.system.getDrawer(this.system.calcPath(this.axiom, this.rules, depth), false)
    }

}