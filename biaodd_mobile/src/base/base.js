//公用方法
import Vue from 'vue'
//fix层防滚动
Vue.prototype.modalHelper = (function() {
	var scrollTop;
	return {
		afterOpen: function(){
		    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		    document.body.style.cssText += 'position:fixed;width:100%;top:-'+scrollTop+'px;';
		},
		beforeClose: function() {
		    var body = document.body;
		    body.style.position = '';
		    var top = body.style.top;
		    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
		    body.style.top = '';
		}
	};
})();

//资质要求
Vue.prototype.getPassCertificate=function(certificate) {
	return certificate.replace(/特|一|二|三|四|五|甲|乙|丙|丁/g,'*')
};
//评标办法
Vue.prototype.getPassPbMode=function(pbMode) {
	let xin  = pbMode.length
	pbMode = '*'   
	for (var i = 1; i<xin; i++ ) {
		pbMode = pbMode + '*'
	}
	return pbMode
};
//第一候选者
Vue.prototype.getPassOnename=function(oneName){
	if(oneName.indexOf('公司') == -1) {
		let xin  =oneName.length
		oneName = '*'   
		for (var i = 1; i<xin; i++ ) {
		   	oneName = oneName + '*'
		}
	 } else {
		let xin  = oneName.length
		oneName = '*'   
		for (var i = 1; i<xin; i++ ) {
			oneName = oneName + '*'
		}
	   	oneName = oneName + '公司'
	 }
	 return oneName
}
//中标金额
Vue.prototype.getPassOneoffer=function(oneOffer){
	let mm  = oneOffer.length
	oneOffer = '*'   
	for (var i = 1; i<mm; i++ ) {
		oneOffer = oneOffer + '*'
	}
	return oneOffer
}