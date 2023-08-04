import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bullet extends Component {

    // 子弹移动速度
    private _speed: number = 1;

    // 子弹对象
    private _bullet: Bullet = null;

    start() {
        // 初始化子弹
        this._initBullet(this.node);
    }

    update(deltaTime: number) {
        // 子弹移动
        this._bulletMove(deltaTime);

        // 判断子弹是否超出屏幕
        if (this._bullet.isOutOfScreen()) {
            // 销毁子弹
            this._bullet.destroy();
        }
    }

    // 初始化子弹
    private _initBullet(bulletNode: Node) {
        // 创建子弹对象
        this._bullet = new Bullet(bulletNode, this._speed);
    }

    // 子弹移动
    private _bulletMove(deltaTime) {
        // 子弹移动
        this._bullet.move(deltaTime);
    }
}

class Bullet {

    private _bulletNode: Node = null;
    private _speed: number = 1;

    constructor(bulletNode: Node, speed: number) {
        this._bulletNode = bulletNode;
        this._speed = speed;
    }

    // 获取子弹位置
    public getPosition() {
        return this._bulletNode.getPosition();
    }

    // 移动子弹
    public move(deltaTime: number) {
        // 获取子弹当前位置
        var z = this._bulletNode.getPosition().z;

        // 计算新的子弹位置
        // 计算规则：z = z + speed * deltaTime
        z -= this._speed * deltaTime * 100;

        // 设置新的子弹位置
        this._bulletNode.setPosition(
            this._bulletNode.getPosition().x,
            this._bulletNode.getPosition().y,
            z
        );
    }

    // 销毁子弹
    public destroy() {
        this._bulletNode.destroy();
        console.log("子弹销毁");
    }

    // 判断子弹是否超出屏幕
    public isOutOfScreen() {
        const pos = this._bulletNode.getPosition();
        
        // 超出屏幕的条件：在 z 轴超过 世界原点 + 50 / -50
        if (pos.z > 50 || pos.z < -50) {
            return true;
        }

        return false;
    }
}