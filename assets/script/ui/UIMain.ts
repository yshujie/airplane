import { _decorator, Component, Node , Touch, EventTouch, systemEvent, SystemEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIMain')
export class UIMain extends Component {
    // 飞机节点
    @property({type: Node})
    public planeNode: Node = null;

    // 飞机移动速度
    @property({type: Number})
    public planeSpeed: number = 5;

    start() {
        this._initSelfPlane(this.planeNode, this.planeSpeed);
    }

    // 初始化飞机
    private _initSelfPlane(selfPlaneNode: Node, speed: number) {
        const plane = new Plane(selfPlaneNode, speed);

        // 监听触摸移动事件
        this.node.on(SystemEvent.EventType.TOUCH_MOVE, (touch: Touch, event: EventTouch) => {
            // 获取触摸点的位置
            const delta = touch.getDelta();
            
            // 移动飞机
            plane.move(delta.x, plane.getPosition().y, delta.y);
        }, plane);
    }
}

class Plane {

    private _planeNode: Node = null;
    private _speed: number = 0;

    constructor(planeNode: Node, speed: number) {
        this._planeNode = planeNode;
        this._speed = speed;
    }

    // 获取飞机位置
    public getPosition() {
        return this._planeNode.getPosition();
    }

    // 移动飞机
    public move(x: number, y: number, z: number) {
        this._planeNode.setPosition(
            this._planeNode.getPosition().x + x * this._speed * 0.01,
            this._planeNode.getPosition().y + y * this._speed * 0.01,
            this._planeNode.getPosition().z - z * this._speed * 0.01
        );
    }
}