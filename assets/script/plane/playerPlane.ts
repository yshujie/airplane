import { _decorator, Component, Node , Touch, EventTouch, SystemEvent, Prefab, director, systemEvent, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerPlane')
export class playerPlane extends Component {

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

class Plane {

    // 预制体 - 子弹
    private _bulletPrefab: Prefab = null;

    // 飞机节点
    private _planeNode: Node = null;
    // 飞机移动速度
    private _speed: number = 0;

    // 上一次射击的时间戳
    private _lastShootTime: number = 0;
    // 射击频次
    private _shootFrequency: number = 0.3;


    constructor(planeNode: Node, speed: number, bulletPrefab: Prefab) {
        this._planeNode = planeNode;
        this._speed = speed;
        this._bulletPrefab = bulletPrefab;
    }

    // 获取飞机位置
    public getPosition() {
        return this._planeNode.getPosition();
    }

    // 设置飞机位置
    public setPosition(x: number, y: number, z: number) {
        this._planeNode.setPosition(x, y, z);
    }

    // 移动飞机
    public move(x: number, y: number, z: number) {
        this._planeNode.setPosition(
            this._planeNode.getPosition().x + x * this._speed * 0.01,
            this._planeNode.getPosition().y + y * this._speed * 0.01,
            this._planeNode.getPosition().z - z * this._speed * 0.01
        );
    }

  
        

    // 发射子弹
    public shoot() {
        if (!this._bulletPrefab) {
            return;
        }

        // 检查是否可以射击
        const now = Date.now();
        if (now - this._lastShootTime < this._shootFrequency * 1000) {
            return;
        }

        // 更新上一次射击的时间戳
        this._lastShootTime = now;

        // 实例化子弹节点
        const bulletNode = instantiate(this._bulletPrefab);

        // 设置子弹节点的位置
        const planePos = this._planeNode.getPosition();
        bulletNode.setPosition(planePos.x, planePos.y, planePos.z - 8);

        // 将子弹节点添加到场景中
        director.getScene().addChild(bulletNode);
    }

    

}