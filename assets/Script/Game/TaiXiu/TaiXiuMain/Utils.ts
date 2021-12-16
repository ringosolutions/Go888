// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

export namespace common {
    export class Utils {
        static Rad2Deg: number = 57.2957795;
        static Deg2Rad: number = 0.0174532925;

        static degreesToVec2(degrees: number): cc.Vec2 {
            return Utils.radianToVec2(degrees * Utils.Deg2Rad);
        }

        static radianToVec2(radian: number): cc.Vec2 {
            return cc.v2(Math.cos(radian), Math.sin(radian));
        }

        static numberToEnum<T>(value: number, typeEnum: T): T[keyof T] | undefined {
            return typeEnum[typeEnum[value]];
        }

        static loadSpriteFrameFromBase64(base64: string, callback: (sprFrame: cc.SpriteFrame) => void) {
            //create DOM element
            let img = new Image();
            //define img.onload before assigning src
            img.onload = function () {
                let texture = new cc.Texture2D();
                texture.initWithElement(img);
                texture.handleLoadedTexture();
                let sp = new cc.SpriteFrame(texture);
                // console.log(sp);
                //assign the spriteframe to you sprite
                callback(sp);
            }.bind(this);
            img.src = "data:image/png;base64," + base64;
        }

        static formatNumber(n: number): string {
            return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        }

        static formatNumberMin(n: number): string {
            if (n >= 1000000000) {
                n = Math.ceil(n / 1000);
                return this.formatNumber(n) + "B";
            }
            if (n >= 1000000) {
                n = Math.ceil(n / 1000);
                return this.formatNumber(n) + "M";
            }
            if (n >= 1000) {
                n = Math.ceil(n / 1000);
                return this.formatNumber(n) + "K";
            }
            return this.formatNumber(n);
        }

        static stringToInt(s: string): number {
            var n = parseInt(s.replace(/\./g, '').replace(/,/g, ''));
            if (isNaN(n)) n = 0;
            return n;
        }

        static randomRangeInt(min: number, max: number): number {
            //Returns a random number between min (inclusive) and max (inclusive)
            //Math.floor(Math.random() * (max - min + 1)) + min;

            //Returns a random number between min (inclusive) and max (exclusive)
            return Math.floor(Math.random() * (max - min)) + min;
        }

        static randomRange(min: number, max: number): number {
            //Returns a random number between min (inclusive) and max (exclusive)
            return Math.random() * (max - min) + min;
        }

        static v2Distance(v1: cc.Vec2, v2: cc.Vec2): number {
            return Math.sqrt(Math.pow(v2.x - v1.x, 2) + Math.pow(v2.y - v1.y, 2));
        }

        static v2Degrees(v1: cc.Vec2, v2: cc.Vec2): number {
            return Math.atan2(v2.y - v1.y, v2.x - v1.x) * 180 / Math.PI;
        }

        static dateToYYYYMMdd(date: Date) {
            var mm = date.getMonth() + 1; // getMonth() is zero-based
            var dd = date.getDate();

            return [
                date.getFullYear(),
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
            ].join('-');
        }

        static dateToYYYYMM(date: Date) {
            var mm = date.getMonth() + 1; // getMonth() is zero-based
            var dd = date.getDate();

            return [
                date.getFullYear(),
                (mm > 9 ? '' : '0') + mm
            ].join('-');
        }

        static removeDups(array: Array<any>) {
            var unique = {};
            array.forEach(function (i) {
                if (!unique[i]) {
                    unique[i] = true;
                }
            });
            return Object.keys(unique);
        }
    }
}
export default common.Utils;