import { _decorator, Component, Node , Touch, EventTouch, SystemEvent, Prefab, director, systemEvent, instantiate } from 'cc';
import { Plane } from './plane';
const { ccclass, property } = _decorator;

@ccclass('playerPlane')
export class playerPlaneManager extends Component {

    // 预制体 - 光柱子弹
    @property({type: Prefab})
    public pillarBulletPrefab: Prefab = null;

    // 飞机移动速度
    @property({type: Number})
    public planeSpeed: number = 5;

    start() {
        this._initSelfPlane(this.node, this.planeSpeed);
    }

    // 初始化飞机
    private _initSelfPlane(selfPlaneNode: Node, speed: number) {
        const plane = new Plane(selfPlaneNode, speed, this.pillarBulletPrefab);

        // 设置飞机初始位置
        this._initPlaneDefaultPosition(plane);

        // 监听触摸移动事件
        this._listenTouchMove(plane);
    }


    // 设置飞机初始位置
    private _initPlaneDefaultPosition(plane: Plane) {
        plane.setPosition(0, 0, 20);
    }

    // 监听触摸移动事件
    private _listenTouchMove(plane: Plane) {
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, (touch: Touch, event: EventTouch) => {
            // 获取触摸点的位置
            const delta = event.getDelta();
            
            // 移动飞机
            plane.move(delta.x, plane.getPosition().y, delta.y);

            // 发射子弹
            plane.shoot();
    
        }, plane);
    }

}
