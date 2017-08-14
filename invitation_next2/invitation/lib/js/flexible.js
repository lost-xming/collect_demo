(function(win, lib) {
	var doc = win.document;
	var docEl = doc.documentElement;
	var metaEl = doc.querySelector('meta[name="viewport"]');
	var flexibleEl = doc.querySelector('meta[name="flexible"]');
	var dpr = 0;
	var scale = 0;
	var tid;
	var flexible = lib.flexible || (lib.flexible = {});

	if(!dpr && !scale) {
		var isAndroid = win.navigator.appVersion.match(/android/gi);
		var isIPhone = win.navigator.appVersion.match(/iphone/gi);
		var devicePixelRatio = win.devicePixelRatio;
		if(isIPhone) {
			// iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
			if(devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
				dpr = 3;
			} else if(devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
				dpr = 2;
			} else {
				dpr = 1;
			}
		} else {
			// 其他设备下，仍旧使用1倍的方案
			dpr = 1;
		}
		scale = 1 / dpr;
	}

	docEl.setAttribute('data-dpr', dpr);
	if(!metaEl) { //如果没有meta[name="viewport"] 则创建meta标签
		metaEl = doc.createElement('meta');
		metaEl.setAttribute('name', 'viewport');
		metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
		if(docEl.firstElementChild) {
			docEl.firstElementChild.appendChild(metaEl);
		} else {
			var wrap = doc.createElement('div');
			wrap.appendChild(metaEl);
			doc.write(wrap.innerHTML);
		}
	}

	function refreshRem() {
		var width = docEl.getBoundingClientRect().width;//获取元素物理像素宽度 
		if(width / dpr > 540) { //当宽度大于540时，固定为最大540px
			
			width = 540 * dpr;
			docEl.setAttribute('pc',true);
		}
		var rem = width / 10; // 1rem=10倍的px
		
		docEl.style.fontSize = rem + 'px';
	}

	win.addEventListener('resize', function() { //窗口缩放时触发
		clearTimeout(tid);
		tid = setTimeout(refreshRem, 300);
	}, false);
	win.addEventListener('pageshow', function(e) { //游览网页时触发
		if(e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}
	}, false);

	//返回当前文档的状态 uninitialized - 还未开始载入
	//loading - 载入中
	//interactive - 已加载，文档与用户可以开始交互
	//complete - 载入完成
	if(doc.readyState === 'complete') {
		doc.body.style.fontSize = 12 * dpr + 'px';
	} else {
		doc.addEventListener('DOMContentLoaded', function(e) {
			doc.body.style.fontSize = 12 * dpr + 'px';
		}, false);
	}

	refreshRem();

})(window, window['lib'] || (window['lib'] = {}));