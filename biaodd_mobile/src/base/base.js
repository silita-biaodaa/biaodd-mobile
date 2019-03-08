//公用方法
import Vue from 'vue'
//fix层防滚动
Vue.prototype.modalHelper = (function() {
	var scrollTop;
	return {
		afterOpen: function(){
		    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		    document.body.style.cssText += 'position:fixed;top:-'+scrollTop+'px;';
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