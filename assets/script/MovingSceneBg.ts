import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

// 装饰器 ccclass，用于声明组件类
@ccclass('MovingSceneBg')
// 组件类，继承自 Component
export class MovingSceneBg extends Component {

    // 设置静态变量 视区长度
    static _viewingAreaLength: number = 99;
    // 设置静态变量 背景板移动速度
    static _bgPanelSpeed: number = 10;
    
    @property({type: Node})
    public bgNode01: Node = null;

    @property({type: Node})
    public bgNode02: Node = null;

    // 背景板数组
    private bgPanelArray: BGPanel[] = [];

    onLoad() {
        console.log('onLoad called，组件被加载时调用');
    }

    start() {
        console.log('start called，组件第一次激活时调用');
        
        // 初始化背景板
        this._initBgPanel();
    }

    update(deltaTime: number) {
        // console.log('update called，每帧更新时调用');

        // 移动背景板
        this._moveBgPlane(deltaTime);
    }

    lateUpdate() {
        console.log('lateUpdate called，每帧更新后调用');
    }

    onEnable() {
        console.log('onEnable called，组件被启用时调用');
    }

    onDisable() {
        console.log('onDisable called，组件被禁用时调用');
    }

    onDestroy() {
        console.log('onDestroy called，组件被销毁时调用');
    }

    // 初始化背景板
    private _initBgPanel() {
        // 初始化主视区背景板
        const bgPanel01 = new BGPanel(
            this.bgNode01,
            MovingSceneBg._bgPanelSpeed
        );
        this._moveToMainViewingArea(bgPanel01);

        // 初始化辅视区背景板
        const bgPanel02 = new BGPanel(
            this.bgNode02,
            MovingSceneBg._bgPanelSpeed
        );
        this._moveToSubViewingArea(bgPanel02);

        // 将背景板添加到数组中
        this.bgPanelArray.push(bgPanel01);
        this.bgPanelArray.push(bgPanel02);
    }

    // 初始化主视区背景板
    // 引用传递
    private _initMainViewingArea(bgPanel: BGPanel) {
        // 设置主视区背景板位置
        bgPanel.setPosition(0, 0, 0);
    }

    // 初始化辅视区背景板位置 
    private _initSubViewingArea(bgPanel: BGPanel) {
        // 设置辅视区背景板位置
        const z = 0 - MovingSceneBg._viewingAreaLength;
        bgPanel.setPosition(0, 0, z);
    }
    
    // 移动背景板
    private _moveBgPlane(deltaTime: number) {
        // 遍历背景板数组
        for (let i = 0; i < this.bgPanelArray.length; i++) {
            // 获取背景板
            const bgPanel = this.bgPanelArray[i];

            // 背景板移动
            bgPanel.move(deltaTime);

            // 判断背景板是否超出范围
            if (bgPanel.isOutOfRang(MovingSceneBg._viewingAreaLength)) {
                // 背景板移动到辅视区
                this._moveToSubViewingArea(bgPanel);
            }
        }
    }

    // 背景板移动到主视区
    private _moveToMainViewingArea(bgPanel: BGPanel) {
        bgPanel.setPosition(0, 0, 0);
    }

    // 背景板移动到辅视区
    private _moveToSubViewingArea(bgPanel: BGPanel) {
      // 设置辅视区背景板位置
      const z = 0 - MovingSceneBg._viewingAreaLength;
      bgPanel.setPosition(0, 0, z);
    }
}

// 背景板
class BGPanel {
    // 背景板节点
    private _node: Node = null;
    // 背景板移动速度
    private _speed: number = null;

    // 构造函数
    constructor(node: Node, speed: number) {
        this._node = node;
        this._speed = speed;
    }

    // 获取背景板位置
    public getPosition() {
        return this._node.getPosition();
    }

    // 获取背景板移动速度
    public getSpeed() {
        return this._speed;
    }

    // 设置背景板位置
    public setPosition(x: number, y: number, z: number) {
        this._node.setPosition(x, y, z);
    }

    // 背景移动
    public move(deltaTime: number) {
        // 获取当前背景板位置
        var z = this._node.getPosition().z;

        // 计算新的背景板位置
        // 计算规则：z = z + speed * deltaTime
        z += this._speed * deltaTime;

        // 设置新的背景板位置
        this._node.setPosition(this._node.getPosition().x, this._node.getPosition().y, z);
    }

    // 判断背景是否超出范围
    public isOutOfRang(width: number) {
        // 获取背景位置
        var z = this._node.getPosition().z;

        // 判断背景是否超出范围
        if (z >= width) {
            return true;
        }

        return false;
    }
}