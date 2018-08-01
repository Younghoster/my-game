// const Global = require("Global")
import Global from 'Global'

cc.Class({
    extends: cc.Component,

    properties: {
        // 资源
        prefab: {
            default: null,
            type: cc.Prefab
        }
    },
    createMap() {
        // 坐标
        let location = { x: 0, y: 0 };
        // 上一个管道方向
        let after_d = '';   
        /**
         * 单个生成管道
         * @param {nunber} distance 距离
         * @param {string} direction 方向
         * @param {nunber} index 管道位置
         * @param {string} mark 管道标记 last & first
         */
        let single = (distance, direction, mark) => {
            // 创建色块
            let sprite = cc.instantiate(this.prefab);
            // 碰撞墙的集合
            let wall = {
                top: sprite.getChildByName('wall-top'),
                bottom: sprite.getChildByName('wall-bottom'),
                left: sprite.getChildByName('wall-left'),
                right: sprite.getChildByName('wall-right')
            };
            // 箭头道具（这里的箭头道具要放在下一条管道上，因为下一条会覆盖当前的管道）
            let arrow = sprite.getChildByName('arrow'), arrow_off = sprite.getChildByName('arrow-off');
            // 终点旗帜
            let end = sprite.getChildByName('end');
            // 终点旗帜长宽比值
            let value = 5;
            // 碰撞墙和轨道的间距
            let spacing = 40;
            // 设置颜色
            sprite.color = new cc.Color({ r: 255, g: 255, b: 255 });
            switch (direction) {
                case 'top':
                    sprite.width = Global.gameInfo.conduitWidth;
                    sprite.height = distance;
                    sprite.x = location.x;
                    sprite.y = location.y + (distance / 2) - Global.gameInfo.conduitWidth / 2;
                    // 碰撞墙包围显示
                    wall.left.active = wall.right.active = wall.bottom.active = true;
                    // 第一条特殊处理
                    if (mark === 'first') {
                        arrow.active = arrow_off.active = wall.bottom.active = false;
                    } else {
                        // 在尾部设置上一个方向
                        arrow.dataDirection = 'top';
                        arrow.rotation = arrow_off.rotation = 0;
                        arrow.y = arrow_off.y = -(distance - Global.gameInfo.conduitWidth) / 2;
                    }
                    // 左边碰撞条
                    wall.left.height = wall.left.getComponent(cc.BoxCollider).size.height = distance - Global.gameInfo.conduitWidth - spacing;
                    wall.left.x = -(Global.gameInfo.conduitWidth / 2 + spacing);
                    wall.left.y = -(Global.gameInfo.conduitWidth / 2 + spacing);
                    // 右边碰撞条
                    wall.right.height = wall.right.getComponent(cc.BoxCollider).size.height = distance - Global.gameInfo.conduitWidth - spacing;
                    wall.right.x = Global.gameInfo.conduitWidth / 2 + spacing;
                    wall.right.y = -(Global.gameInfo.conduitWidth / 2 + spacing);
                    // 下边碰撞条
                    wall.bottom.width = wall.bottom.getComponent(cc.BoxCollider).size.width = Global.gameInfo.conduitWidth + spacing * 2;
                    wall.bottom.y = -(distance / 2 + spacing);
                    // 判断上一条的对接口
                    if (after_d === 'left') {
                        wall.right.height = wall.right.getComponent(cc.BoxCollider).size.height = distance - (Global.gameInfo.conduitWidth + spacing) * 2;
                        wall.right.y = 0;
                    } else if (after_d === 'right') {
                        wall.left.height = wall.left.getComponent(cc.BoxCollider).size.height = distance - (Global.gameInfo.conduitWidth + spacing) * 2;
                        wall.left.y = 0;
                    }
                    // 判断是否终点，添加终点碰撞
                    if (mark === 'last') {
                        end.active = true;
                        end.width = end.getComponent(cc.BoxCollider).size.width = Global.gameInfo.conduitWidth;
                        end.height = end.getComponent(cc.BoxCollider).size.height = end.width / value;
                        end.y = spacing;
                    }
                    // 更新一下坐标 & 上一个方向
                    location.y = location.y + distance - Global.gameInfo.conduitWidth;
                    after_d = direction;
                    break;
                case 'bottom':
                    sprite.width = Global.gameInfo.conduitWidth;
                    sprite.height = distance;
                    sprite.x = location.x;
                    sprite.y = location.y - (distance / 2) + Global.gameInfo.conduitWidth / 2;
                    // 碰撞墙包围显示
                    wall.left.active = wall.right.active = wall.top.active = true;
                    // 在尾部设置上一个方向
                    arrow.dataDirection = 'down';
                    arrow.rotation = arrow_off.rotation = 180;
                    arrow.y = arrow_off.y = (distance - Global.gameInfo.conduitWidth) / 2;
                    // 左边碰撞条
                    wall.left.height = wall.left.getComponent(cc.BoxCollider).size.height = distance - Global.gameInfo.conduitWidth - spacing;
                    wall.left.x = -(Global.gameInfo.conduitWidth / 2 + spacing);
                    wall.left.y = Global.gameInfo.conduitWidth / 2 + spacing;
                    // 右边碰撞条
                    wall.right.height = wall.right.getComponent(cc.BoxCollider).size.height = distance - Global.gameInfo.conduitWidth - spacing;
                    wall.right.x = Global.gameInfo.conduitWidth / 2 + spacing;
                    wall.right.y = Global.gameInfo.conduitWidth / 2 + spacing;
                    // 上边碰撞条
                    wall.top.width = wall.top.getComponent(cc.BoxCollider).size.width = Global.gameInfo.conduitWidth + spacing * 2;
                    wall.top.y = distance / 2 + spacing;
                    // 判断上一条的对接口
                    if (after_d === 'left') {
                        wall.right.height = wall.right.getComponent(cc.BoxCollider).size.height = distance - (Global.gameInfo.conduitWidth + spacing) * 2;
                        wall.right.y = 0;
                    } else if (after_d === 'right') {
                        wall.left.height = wall.left.getComponent(cc.BoxCollider).size.height = distance - (Global.gameInfo.conduitWidth + spacing) * 2;
                        wall.left.y = 0;
                    }
                    // 判断是否终点，添加终点碰撞
                    if (mark === 'last') {
                        end.active = true;
                        end.width = end.getComponent(cc.BoxCollider).size.width = Global.gameInfo.conduitWidth;
                        end.height = end.getComponent(cc.BoxCollider).size.height = end.width / value;
                        end.y = -spacing;
                    }
                    // 更新一下坐标 & 上一个方向
                    location.y = location.y - distance + Global.gameInfo.conduitWidth;
                    after_d = direction;
                    break;
                case 'left':
                    sprite.width = distance;
                    sprite.height = Global.gameInfo.conduitWidth;
                    sprite.x = location.x - (distance / 2) + Global.gameInfo.conduitWidth / 2;
                    sprite.y = location.y;
                    // 碰撞墙包围显示
                    wall.top.active = wall.bottom.active = wall.right.active = true;
                    // 在尾部设置上一个方向
                    arrow.dataDirection = 'left';
                    arrow.rotation = arrow_off.rotation = -90;
                    arrow.x = arrow_off.x = (distance - Global.gameInfo.conduitWidth) / 2;
                    // 上边碰撞条
                    wall.top.width = wall.top.getComponent(cc.BoxCollider).size.width = distance - Global.gameInfo.conduitWidth - spacing;
                    wall.top.x = Global.gameInfo.conduitWidth / 2 + spacing;
                    wall.top.y = Global.gameInfo.conduitWidth / 2 + spacing;
                    // 下边碰撞条
                    wall.bottom.width = wall.bottom.getComponent(cc.BoxCollider).size.width = distance - Global.gameInfo.conduitWidth - spacing;
                    wall.bottom.x = Global.gameInfo.conduitWidth / 2 + spacing;
                    wall.bottom.y = -(Global.gameInfo.conduitWidth / 2 + spacing);
                    // 右边碰撞条
                    wall.right.height = wall.right.getComponent(cc.BoxCollider).size.height = Global.gameInfo.conduitWidth + spacing * 2;
                    wall.right.x = distance / 2 + spacing;
                    // 判断上一条的对接口
                    if (after_d === 'top') {
                        wall.bottom.width = wall.bottom.getComponent(cc.BoxCollider).size.width = distance - (Global.gameInfo.conduitWidth + spacing) * 2;
                        wall.bottom.x = 0;
                    } else if (after_d === 'bottom') {
                        wall.top.width = wall.top.getComponent(cc.BoxCollider).size.width = distance - (Global.gameInfo.conduitWidth + spacing) * 2;
                        wall.top.x = 0;
                    }
                    // 判断是否终点，添加终点碰撞
                    if (mark === 'last') {
                        end.active = true;
                        end.width = end.getComponent(cc.BoxCollider).size.width = Global.gameInfo.conduitWidth;
                        end.height = end.getComponent(cc.BoxCollider).size.height = end.width / value;
                        end.x = -(end.width / 2 + spacing * 2);
                        end.rotation = -90;
                    }
                    // 更新一下坐标 & 上一个方向
                    location.x = location.x - distance + Global.gameInfo.conduitWidth;
                    after_d = direction;
                    break;
                case 'right':
                    sprite.width = distance;
                    sprite.height = Global.gameInfo.conduitWidth;
                    sprite.x = location.x + (distance / 2) - Global.gameInfo.conduitWidth / 2;
                    sprite.y = location.y;
                    // 碰撞墙包围显示
                    wall.top.active = wall.bottom.active = wall.left.active = true;
                    // 在尾部设置上一个方向
                    arrow.dataDirection = 'right';
                    arrow.rotation = arrow_off.rotation = 90;
                    arrow.x = arrow_off.x = -(distance - Global.gameInfo.conduitWidth) / 2;
                    // 上边碰撞条
                    wall.top.width = wall.top.getComponent(cc.BoxCollider).size.width = distance - Global.gameInfo.conduitWidth - spacing;
                    wall.top.x = -(Global.gameInfo.conduitWidth / 2 + spacing);
                    wall.top.y = Global.gameInfo.conduitWidth / 2 + spacing;
                    // 下边碰撞条
                    wall.bottom.width = wall.bottom.getComponent(cc.BoxCollider).size.width = distance - Global.gameInfo.conduitWidth - spacing;
                    wall.bottom.x = -(Global.gameInfo.conduitWidth / 2 + spacing);
                    wall.bottom.y = -(Global.gameInfo.conduitWidth / 2 + spacing);
                    // 左边碰撞条
                    wall.left.height = wall.left.getComponent(cc.BoxCollider).size.height = Global.gameInfo.conduitWidth + spacing * 2;
                    wall.left.x = -(distance / 2 + spacing);
                    // 判断上一条的对接口
                    if (after_d === 'top') {
                        wall.bottom.width = wall.bottom.getComponent(cc.BoxCollider).size.width = distance - (Global.gameInfo.conduitWidth + spacing) * 2;
                        wall.bottom.x = 0;
                    } else if (after_d === 'bottom') {
                        wall.top.width = wall.top.getComponent(cc.BoxCollider).size.width = distance - (Global.gameInfo.conduitWidth + spacing) * 2;
                        wall.top.x = 0;
                    }
                    // 判断是否终点，添加终点碰撞
                    if (mark === 'last') {
                        end.active = true;
                        end.width = end.getComponent(cc.BoxCollider).size.width = Global.gameInfo.conduitWidth;
                        end.height = end.getComponent(cc.BoxCollider).size.height = end.width / value;
                        end.x = end.width / 2 + spacing * 2;
                        end.rotation = 90;
                    }
                    // 更新一下坐标 & 上一个方向
                    location.x = location.x + distance - Global.gameInfo.conduitWidth;
                    after_d = direction;
                    break;
            }
            // 输出到对应容器
            sprite.parent = this.node;
            // 创建标签
            // let label = new cc.Node('number').addComponent(cc.Label);
            // label.string = '123456';
            // 输出节点
            // label.node.parent = this.node;
        }
        // 首次调用
        // single(900, 'top', 'first');
        // single(500, 'right');
        // single(400, 'bottom');
        // single(600, 'right');
        // single(500, 'bottom');
        // single(700, 'left');
        // single(900, 'bottom');
        // single(750, 'right');
        // single(440, 'bottom', 'last');

        let list = Global.levels[Global.gameInfo.level].list;
        // 修改对应的关卡速度
        Global.gameInfo.speed = Global.levels[Global.gameInfo.level].speed;
        // 修改对应的关卡旋转
        Global.gameInfo.rotate = Global.levels[Global.gameInfo.level].rotate;
        // 重置下初始化方向
        Global.game.direction = list[0].str;
        Global.game.move_direction = list[1].str;
        // 生成轨道
        for (let i = 0; i < list.length; i++) {
            if (i == 0) {
                single(list[i].num, list[i].str, 'first');
            } else if (i == list.length - 1) {
                single(list[i].num, list[i].str, 'last');
            } else {
                single(list[i].num, list[i].str);
            }
        }
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.createMap();
    },

    // update (dt) {},
});
