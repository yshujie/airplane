import { _decorator, Component, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemyPlane')
export class enemyPlaneManager extends Component {
        
    @property({type: Prefab})
    public locustPlanePrefab: Prefab = null;

    @property({type: Prefab})
    public beePlanePrefab: Prefab = null;
    
    start() {

    }

    update(deltaTime: number) {
        
    }
}

