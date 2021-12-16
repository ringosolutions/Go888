import Utils from "./Utils";

const { ccclass, property } = cc._decorator;

namespace common {

    export class TweenListener {
        target: cc.Component = null;
        duration: number = 0;
        curDuration: number = 0;
        callback: (p: number) => void = null;
    }

    @ccclass
    export class Tween extends cc.Component {

        private static instance: Tween = null;
        private static getInstance(): Tween {
            if (this.instance == null) {
                let node = new cc.Node();
                node.name = "Tween";
                cc.game.addPersistRootNode(node);
                this.instance = node.addComponent(Tween);
            }
            return this.instance;
        }

        private static listeners = new Array<TweenListener>();

        private skeepFrame = false;
        private readonly countSkeep = 1;
        private curCountSkeep = 0;
        private delta = 0;

        update(dt: number) {
            if (this.skeepFrame) {
                this.curCountSkeep++;
                this.delta += dt;
                if (this.curCountSkeep >= this.countSkeep) {
                    this.curCountSkeep = 0;
                    this.skeepFrame = false;
                }
                return;
            }
            for (var i = 0; i < Tween.listeners.length; i++) {
                let listener = Tween.listeners[i];
                if (listener.target && listener.target instanceof cc.Component && listener.target.node) {
                    listener.curDuration = Math.min(listener.duration, listener.curDuration + dt + this.delta);
                    listener.callback(listener.curDuration / listener.duration);
                    if (listener.curDuration >= listener.duration) {
                        Tween.listeners.splice(i--, 1);
                    }
                } else {
                    Tween.listeners.splice(i--, 1);
                }
            }

            this.skeepFrame = true;
            this.delta = 0;
        }

        static numberTo(label: cc.Label, toNumber: number, duration: number, format: (n: number) => string = (n) => { return Utils.formatNumber(n) }) {
            this.getInstance();
            let listener = null;
            for (var i = 0; i < Tween.listeners.length; i++) {
                let _listener = Tween.listeners[i];
                if (_listener.target == label) {
                    listener = _listener;
                    break;
                }
            }
            if (listener == null) {
                listener = new TweenListener();
                this.listeners.push(listener);
            }
            let startNumber = Utils.stringToInt(label.string);
            let distance = toNumber - startNumber;
            listener.curDuration = 0;
            listener.duration = duration;
            listener.target = label;
            listener.callback = (p: number) => {
                label.string = format(parseInt("" + (startNumber + distance * p)));
            }
        }
    }


}
export default common.Tween;