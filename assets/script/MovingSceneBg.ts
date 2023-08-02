import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

// 装饰器 ccclass，用于声明组件类
@ccclass('MovingSceneBg')
// 组件类，继承自 Component
export class MovingSceneBg extends Component {

    // 主背景板
    @property({type: Node})
    public bgMain: Node = null;

    // 辅背景板
    @property({type: Node})
    public bgSub: Node = null;

    // 背景移动速度
    private _speed: number = 10;
    // 背景板高度
    private _bgHeight: number = 100;  

    onLoad() {
        console.log('onLoad called，组件被加载时调用');
    }

    start() {
        console.log('start called，组件第一次激活时调用');
        
        // 初始化背景板
        this._initBg();
    }

    update(deltaTime: number) {
        // 背景移动
        this._moveBg(deltaTime);
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
    private _initBg() {
        // 设置主背景位置
        this._initBgMain();

        // 设置辅背景位置
        this._initBgSub();
    }

    // 设置主背景位置
    private _initBgMain() {
        this.bgMain.setPosition(this.bgMain.getPosition().x, this.bgMain.getPosition().y, 0);
    }

    // 设置辅背景位置
    private _initBgSub() {
        this.bgSub.setPosition(this.bgSub.getPosition().x, this.bgSub.getPosition().y, this._bgHeight);
    }

    // 背景移动
    private _moveBg(deltaTime: number) {
        this._moveBgMain(deltaTime);
        this._moveBgSub(deltaTime);

        // 判断主背景是否超出范围
        if (this._isBgMainOutOfRang()) {
            // 替换主背景和辅背景
            this._replaceBgMainAndSub();
        }
    }

    // 主背景移动
    private _moveBgMain(deltaTime: number) {
        this._moveBgImp(this.bgMain, deltaTime);    
    }

    // 辅背景移动
    private _moveBgSub(deltaTime: number) {
        this._moveBgImp(this.bgSub, deltaTime);
    }

    // 背景移动实现
    private _moveBgImp(bg: Node, deltaTime: number) {
        // 获取当前背景板位置
        var z = bg.getPosition().z;

        // 计算新的背景板位置
        // 计算规则：z = z - speed * deltaTime
        z -= this._speed * deltaTime;

        // 设置新的背景板位置
        bg.setPosition(bg.getPosition().x, bg.getPosition().y, z);
    }

    // 判断主背景是否超出范围
    private _isBgMainOutOfRang() {
        // 获取主背景位置
        var z = this.bgMain.getPosition().z;

        // 判断主背景是否超出范围
        if (z <= 0) {
            return true;
        }

        return false;
    }

    // 主副背景板替换位置
    private _replaceBgMainAndSub() {
        // 获取主背景位置
        var z = this.bgMain.getPosition().z;

        // 设置主背景位置
        this.bgMain.setPosition(this.bgMain.getPosition().x, this.bgMain.getPosition().y, this._bgHeight);

        // 设置辅背景位置
        this.bgSub.setPosition(this.bgSub.getPosition().x, this.bgSub.getPosition().y, 0);
    }
}