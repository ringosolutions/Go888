
cc.Class({
    extends: cc.Component,

    properties: {
        header: cc.Node,
        games: cc.Node,
        adsContent: cc.PageView,
        adsTimeNext: 0,
    },
    onLoad() {
        // Promise.all(this.games.children.map(function (obj) {
        //     return obj.getComponent('iconGame');
        // }))
        //     .then(result => {
        //         this.games = result;
        //     });
        this.setTimeAds();
        this.node._onPreDestroy = function () {
            clearTimeout(this.adsTime);
        }.bind(this);
    },
    onEnable: function () {
        this.adsContent.content.on(cc.Node.EventType.TOUCH_START, this.eventStart, this);
        this.adsContent.content.on(cc.Node.EventType.TOUCH_END, this.setTimeAds, this);
        this.adsContent.content.on(cc.Node.EventType.TOUCH_CANCEL, this.setTimeAds, this);
        this.adsContent.content.on(cc.Node.EventType.MOUSE_ENTER, this.eventStart, this);
        this.adsContent.content.on(cc.Node.EventType.MOUSE_LEAVE, this.setTimeAds, this);

        this.onHeadSelect(null, "all");
    },
    onDisable: function () {
        this.adsContent.content.off(cc.Node.EventType.TOUCH_START, this.eventStart, this);
        this.adsContent.content.off(cc.Node.EventType.TOUCH_END, this.setTimeAds, this);
        this.adsContent.content.off(cc.Node.EventType.TOUCH_CANCEL, this.setTimeAds, this);
        this.adsContent.content.off(cc.Node.EventType.MOUSE_ENTER, this.eventStart, this);
        this.adsContent.content.off(cc.Node.EventType.MOUSE_LEAVE, this.setTimeAds, this);
    },
    nextAds: function () {
        var self = this;
        if (this.adsContent._curPageIdx == this.adsContent._pages.length - 1) {
            this.adsContent.scrollToPage(0, 1.5);

        } else {
            this.adsContent.scrollToPage(this.adsContent._curPageIdx + 1, 0.85);
        }
        this.setTimeAds();
    },
    eventStart: function () {
        clearTimeout(this.adsTime);
    },
    setTimeAds: function () {
        this.eventStart();
        this.adsTime = setTimeout(function () {
            this.nextAds();
        }
            .bind(this), this.adsTimeNext * 1000);
    },
    onHeadSelect: function (e, name) {
        for (let index = 0; index < 5; index++) {
            this.header.children[index].children[1].active = false;
        }
        switch (name) {
            case "all":
                for (let index = 0; index < this.games.childrenCount; index++) {
                  var filter = this.games.children[index].getComponent('iconGame');
                  if(filter.slot || filter.mini || filter.bai || filter.khac)
                    this.games.children[index].active = true;
                }
                this.header.children[0].children[1].active = true;
                break;
            case "mini":
                for (let index = 0; index < this.games.childrenCount; index++) {
                    var filter = this.games.children[index].getComponent('iconGame');
                    if(filter.mini){
                     this.games.children[index].active = true;
                    }else{
                      this.games.children[index].active = false;
                    }
                }
                this.header.children[1].children[1].active = true;
                break;
            case "bai":
            for (let index = 0; index < this.games.childrenCount; index++) {
             var filter = this.games.children[index].getComponent('iconGame');
             if(filter.bai){
              this.games.children[index].active = true;
             }else{
               this.games.children[index].active = false;
             }
            }
                this.header.children[2].children[1].active = true;
                break;
            case "slot":
                for (let index = 0; index < this.games.childrenCount; index++) {
                 var filter = this.games.children[index].getComponent('iconGame');
                 if(filter.slot){
                  this.games.children[index].active = true;
                 }else{
                   this.games.children[index].active = false;
                 }
                }
                this.header.children[3].children[1].active = true;
                break;
            case "khac":
            for (let index = 0; index < this.games.childrenCount; index++) {
             var filter = this.games.children[index].getComponent('iconGame');
             if(filter.khac){
              this.games.children[index].active = true;
             }else{
               this.games.children[index].active = false;
             }
            }
                this.header.children[4].children[1].active = true;
                break;
            default:
                break;
        }
        // Promise.all(this.header.children.map(function (obj) {
        //     if (obj == e.target) {
        //         obj.children[0].active = false;
        //         obj.pauseSystemEvents();
        //     } else {
        //         obj.children[0].active = true;
        //         obj.resumeSystemEvents();
        //     }
        // }));
        // Promise.all(this.games.map(function (game) {
        //     if (e.target.name == 'all' || game[e.target.name]) {
        //         game.node.active = true;
        //     } else {
        //         game.node.active = false;
        //     }
        // }));
    },
    onWait: function(){
		cc.RedT.audio.playClick();
		if (cc.RedT.IS_LOGIN){
		   cc.RedT.inGame.notice.show({title:'', text:'Game đang bảo trì...'});
		}else{
			cc.RedT.inGame.dialog.showSignIn();
		}
	},
    openMiniGame: function (e, name) {
        cc.RedT.MiniPanel[name].openGame();
    },
    regGame: function (e, name) {
        cc.RedT.audio.playClick();
        if (cc.RedT.IS_LOGIN) {
            cc.RedT.inGame.loading.active = true;
            cc.RedT.send({ g: { reg: name } });
        } else {
            cc.RedT.inGame.dialog.showSignIn();
        }
    },
    openGame: function (e, name) {
        cc.RedT.audio.playClick();
        if (cc.RedT.IS_LOGIN) {
            cc.RedT.inGame.loading.active = true;
            cc.audioEngine.stopAll();
            cc.director.loadScene(name);
        } else {
            cc.RedT.inGame.dialog.showSignIn();
        }
    },
    openTXCL: function (e, taixiu) { // Open Tài Xỉu | Chẵn Lẻ
        cc.RedT.MiniPanel.TaiXiu.openGame(null, taixiu);
    },
});
