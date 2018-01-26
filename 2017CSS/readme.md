
	点滴积累，铸就成功

这是一个很简单的专题活动 项目， 里面包含的技术点也很有限：
	
### 布局css 方面：
	1、多行文字的居中显示
			实现方式： 定位 + transform(中的 translate 属性值 ) 实现 文字盒子水平垂直方向 居中；
	2、单行文字中 的 放大凸出 对齐 显示， 长时间没有用CSS ，都快已经忘记 vertical-align 的里面各种对齐方式的 定义了（bottom）
	
	3、input输入框的 光标颜色变化，文字颜色不变， 随着设计对细节的越来越苛刻，在input 更是下了大功夫，
		    caret-color: #E83123; （实现 仅光标变色）
### js  方面
这里面设计的东西就 相对来说比较多了，但是 都是借用现有 组件去完成的， 有兴趣可以 研究下。对于了解jq还是很有帮助的
	
	1、虚拟路径统计 $.dxlGaPageTracker（）组件
	2、动态广告位 组件
		$.dxlInclud(["ad"],function(){
            $.admAjaxData("113,114,115",function(execute){  //广告位ID，回调函数
                $(".banner_1").DxlAdm({
                    admId:113,//必填 广告位id
                    admType:"img",//必填 广告类型
                });
			})
		})
	3、下单组件 hotelOrder（）；