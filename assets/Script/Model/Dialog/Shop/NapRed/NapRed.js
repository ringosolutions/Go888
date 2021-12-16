
var NapThe      = require('NapThe');

cc.Class({
	extends: cc.Component,

	properties: {
		NapThe: NapThe,
		nodeHinhThuc: cc.Node,
		nodeNapThe: cc.Node,
		nodeMoMo: cc.Node,

		momoSTK:  cc.Label,
		momoNAME: cc.Label,
		nickname: cc.Label,

		isLoaded: false,
	},
	init(){
		this.NapThe.init();
	},
	onEnable: function () {
		this.onBackHinhThuc();
		if (!this.isLoaded) {
			cc.RedT.send({shop:{info_nap:true}});
		}
	},
	onDisable: function () {
        this.onBackHinhThuc();
    },
	onData: function(data){
		if (void 0 !== data.info && !this.isLoaded){
			this.isLoaded = true;
			if (void 0 !== data.info.nhamang){
				this.NapThe.infoSet(data.info.nhamang, 'nhamangList', 'NhanhMang', true);
			}
			if (void 0 !== data.info.menhgia){
				this.NapThe.infoSet(data.info.menhgia, 'menhgiaList', 'MenhGia');
			}
			if (void 0 !== data.info.momo){
				this.MOMO(data.info.momo);
			}
		}
	},
	onSelecHinhThuc: function(e){
		this.nodeHinhThuc.active = false;
		let hinhthuc = e.target.name.toLowerCase();
		if (hinhthuc == 'momo') {
			this.nodeNapThe.active = false;
			this.nodeMoMo.active   = true;
		}else{
			this.nodeNapThe.active = true;
			this.nodeMoMo.active   = false;
			let list = this.NapThe.scrollviewNhaMang.content.children.filter(function(obj){
				let a = obj.getComponent('NapRed_itemOne');
				let text = a.text.string.toLowerCase();
				return hinhthuc == text;
			});
			if (list.length) {
				let objTele = list[0].getComponent('NapRed_itemOne');
				hinhthuc = objTele.text.string;
				this.NapThe.nhamangList.forEach(function(obj){
		    		if (obj === objTele) {
		    			obj.onSelect();
		    		}else{
		    			obj.unSelect();
		    		}
		    	});
			}
		    this.NapThe.NhanhMang.string = hinhthuc;
		}
	},
	onBackHinhThuc: function(e){
		this.nodeHinhThuc.active = true;
		this.nodeNapThe.active   = false;
		this.nodeMoMo.active     = false;
	},
	MOMO: function(MOMO){
		if(MOMO){
			if (!!MOMO.number) {
				this.momoSTK.string = MOMO.number;
			}
			if (!!MOMO.name) {
				this.momoNAME.string = MOMO.name;
			}
			this.nickname.string = cc.RedT.user.name;
		}
		
	},
	onCopyNumber: function(){
		cc.RedT.CopyToClipboard(this.momoSTK.string);
		cc.RedT.inGame.noticeCopy();
	},
	onCopyName: function(){
		cc.RedT.CopyToClipboard(cc.RedT.user.name);
		cc.RedT.inGame.noticeCopy();
	},
});
