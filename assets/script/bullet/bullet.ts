import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bullet extends Component {


    update(deltaTime: number) {
        this._bulletMove(deltaTime);
    }

    private _bulletMove(deltaTime) {
        const pos = this.node.getPosition();

        const z = pos.z + deltaTime * 0.1;

        this.node.setPosition(
            this.node.getPosition().x,
            this.node.getPosition().y,
            z
        );
    }
}

class Bullet {

    private _bulletNode: Node = null;
    private _speed: number = 0.5;

    constructor(bulletNode: Node, speed: number) {
        this._bulletNode = bulletNode;
        this._speed = speed;
    }

    // 获取子弹位置
    public getPosition() {
        return this._bulletNode.getPosition();
    }

    // 移动子弹
    public move(x: number, y: number, z: number) {
        this._bulletNode.setPosition(
            this._bulletNode.getPosition().x + x * this._speed * 0.01,
            this._bulletNode.getPosition().y + y * this._speed * 0.01,
            this._bulletNode.getPosition().z + z * this._speed * 0.01
        );
    }

    // 销毁子弹
    public destroy() {
        this._bulletNode.destroy();
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