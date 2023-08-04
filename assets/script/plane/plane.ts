import { _decorator, Component, director, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('plane')
export 
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
    private _shootFrequency: number = 0.2;


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
        bulletNode.setPosition(planePos.x, planePos.y, planePos.z + 10);

        // 将子弹节点添加到场景中
        director.getScene().addChild(bulletNode);
    }
}