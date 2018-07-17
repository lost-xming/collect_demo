### 移动端图片裁切上传DEMO

> 应用cropper 第三方插件库 ， 官方文档基本上都是英文版， 以下是自己尝试实践中总结下来的一些api的基本作用

官方提供了 两个版本的库， 一个是通过new 的构造函数版本， 另一个是cropper-jquery 版本， 两个版本在本质上是没有区别的，只是在调用上有点细小区别而已


jquery 版本的是 通过jq-Dom元素 调用的

例子： 

	var $image = $('#image');
	
	$image.cropper({
		  aspectRatio: 16 / 9,
		  crop: function(event) {
			    console.log(event.detail.x);
			    console.log(event.detail.y);
			    console.log(event.detail.width);
			    console.log(event.detail.height);
			    console.log(event.detail.rotate);
			    console.log(event.detail.scaleX);
			    console.log(event.detail.scaleY);
		  }
	});

而构造函数版本调用方式如下：

例子：

	const image = document.getElementById('image');
	const cropper = new Cropper(image, {
		  aspectRatio: 16 / 9,
		  crop(event) {
			    console.log(event.detail.x);
			    console.log(event.detail.y);
			    console.log(event.detail.width);
			    console.log(event.detail.height);
			    console.log(event.detail.rotate);
			    console.log(event.detail.scaleX);
			    console.log(event.detail.scaleY);
		  },
	});


两个不同版本的api 调用方式却是 相同的

如下：

	const cropper = new Cropper(image, {
            aspectRatio: 1, // 图片宽高比例
            viewMode: 0,    //裁剪框 只能在  2图片内移动   默认是0
            // preview : $(".newImg"),    //截图的显示位置   型：String(jQuery选择器)，默认值''
            crop: function(event) {     // 每次操作完成后执行
                console.log(event.detail.x);
                console.log(event.detail.y);
                console.log(event.detail.width);
                console.log(event.detail.height);
                console.log(2222222222)
                cropper.getCroppedCanvas();

                cropper.getCroppedCanvas({  //  图片输出
                    width: 300,
                    height: 300,
                    minWidth: 256,
                    minHeight: 256,
                    maxWidth: 4096,
                    maxHeight: 4096,
                    fillColor: '#fff',
                    imageSmoothingEnabled: false,
                    imageSmoothingQuality: 'high',
                });


                if (!HTMLCanvasElement.prototype.toBlob) {  // 浏览器兼容性检查， 如果不支持toBlob 则需要重写
                    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
                        value: function (callback, type, quality) {

                            var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
                                len = binStr.length,
                                arr = new Uint8Array(len);

                            for (var i=0; i<len; i++ ) {
                            arr[i] = binStr.charCodeAt(i);
                            }

                            callback( new Blob( [arr], {type: type || 'image/png'} ) );
                        }
                    });
                }
                console.log(cropper.getCroppedCanvas());
                console.log(cropper.getCroppedCanvas().toDataURL('image/jpeg'));

                $(".img").attr("src" , cropper.getCroppedCanvas().toDataURL('image/jpeg')); // 直接转换成base64

                // cropper.getCroppedCanvas().toBlob((blob) => {	// 此处是将图片转成blob 二进制
                //     console.log('---------' +  blob);
                //     // const formData = new FormData();

                //     // formData.append('croppedImage', blob);

                //     // // Use `jQuery.ajax` method
                //     // $.ajax('/path/to/upload', {
                //     //     method: "POST",
                //     //     data: formData,
                //     //     processData: false,
                //     //     contentType: false,
                //     //     success() {
                //     //     console.log('Upload success');
                //     //     },
                //     //     error() {
                //     //     console.log('Upload error');
                //     //     },
                //     // });
                // });
            },
            build: function (e) { //加载开始  
                //可以放你的过渡 效果  
                console.log(111111111)
            }, 
            built: function (e) { //加载完成  
            },
            checkCrossOrigin: true,    //插件会检测图片的源，如果是跨域图片，图片元素会被添加crossOrigin class，并会为图片的url添加一个时间戳来使getCroppedCanvas变为可用
            minContainerWidth: 300,
            minContainerHeight:300,
            minCanvasWidth: 300,
            minCanvasHeight: 300,
            minCropBoxWidth : 300,  //   裁剪框的最小宽度。   注意：此大小是相对于页面而不是图像。
            minCropBoxHeight: 300,   // 裁剪框的最小高度    注意：此大小是相对于页面而不是图像。
            rotatable : false ,     // 是否允许旋转
            guides:false,   // 默认true 显示裁剪框上方的虚线。
            center: false, // 默认true  是否显示裁剪框 中间的+ 
            background : false,// 容器是否显示网格背景  
            dragMode: "move",       //可以拖动图片  crop    'none': do nothing  图片就不能拖动了   'crop': create a new crop box  当鼠标 点击一处时根据这个点重新生成一个 裁剪框
            modal : false,       // 默认值true。是否在剪裁框上显示黑色的模态窗口
            cropBoxMovable :false,   //是否允许拖动裁剪框 
            cropBoxResizable :false, //是否允许拖动 改变裁剪框大小   
            toggleDragModeOnDblclick: false,    //在裁剪器上单击两次时，可以在“裁剪”和“移动”之间切换拖动模式。
        });