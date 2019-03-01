## url的完整结构

> <font color=red >协议类型（protocol）</font>
	
		通过URL可以指定的主要有以下几种：http、ftp、gopher、telnet、file等
		
		URL的组成协议 1、protocol（协议）：指定使用的传输协议，下表列出 protocol 属性的有效方案名称。 
		
		最常用的是HTTP协议，它也是目前WWW中应用最广的协议。
		
		http —— 超文本传输协议访问该资源。 格式 http://
		https —— 用安全套接字层传送的超文本传输协议访问该资源。 格式 https://
		ftp —— 通过 FTP访问资源。格式 FTP://
		mailto —— 电子邮件地址 通过 SMTP 访问。 格式 mailto: 
		ldap —— 轻型目录访问协议搜索
		file —— 资源是本地计算机上的文件。格式file://
		news —— Usenet新闻组
		gopher —— Gopher协议
		telnet —— Telnet协议

	

> <font color=red >主机名（hostname）</font>
	
		是指存放资源的服务器的域名系统 (DNS) 主机名或 IP 地址。
		有时，在主机名前也可以包含连接到服务器所需的用户名和密码（格式：username:password）。

> <font color=red >端口号（port）</font> 

		整数，可选，省略时使用方案的默认端口，各种传输协议都有默认的端口号，
		如http的默认端口为80,https的默认端口为443

> <font color=red >路径及文件名（path）</font>

		由零或多个“/”符号隔开的字符串，一般用来表示主机上的一个目录或文件地址

> <font color=red >参数（parameters）</font>

		传递参数，可有多个参数，用“&”符号隔开，每个参数的名和值用“=”符号隔开

> <font color=red >hash值</font>

		#是用来指导浏览器动作的，对服务器端完全无用。所以，HTTP请求中不包括#。
		这些字符都不会被发送到服务器端。
		改变#不触发网页重载
		改变#会改变浏览器的访问历史
		
		默认情况下，Google的网络蜘蛛忽视URL的#部分。
		但是，Google还规定，如果你希望Ajax生成的内容被浏览引擎读取，
		那么URL中可以使用"#!"，Google会自动将其后面的内容转成查询字符串_escaped_fragment_的值
		


## 同源策略


* 协议相同
* 域名相同
* 端口相同

如果非同源，共有三种行为收到限制

	（1） Cookie、LocalStorage 和 IndexDB 无法读取。
	（2） DOM 无法获得。
	（3） AJAX 请求不能发送。
	
## Cookie

Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。

> cookie的组成部分

		Set－Cookie: NAME=VALUE；Expires=DATE；Path=PATH；Domain=DOMAIN_NAME；SECURE

		NAME=VALUE
		NAME是该Cookie的名称，VALUE是该Cookie的值。
		在字符串“NAME=VALUE”中，不含分号、逗号和空格等字符。
		
		Expires=DATE：Expires变量是一个只写变量，它确定了Cookie有效终止日期。
		该属性值DATE必须以特定的格式来书写：星期几，DD－MM－YY HH:MM:SS GMT，
		GMT表示这是格林尼治时间。
		反之，不以这样的格式来书写，系统将无法识别。
		该变量可省，如果缺省时，则Cookie的属性值不会保存在用户的硬盘中，
		而仅仅保存在内存当中，Cookie文件将随着浏览器的关闭而自动消失。
		
		Domain=DOMAIN－NAME:Domain该变量是一个只写变量，
		它确定了哪些Internet域中的Web服务器可读取浏览器所存取的Cookie，
		即只有来自这个域的页面才可以使用Cookie中的信息。
		这项设置是可选的，如果缺省时，设置Cookie的属性值为该Web服务器的域名。
		
		Path=PATH：Path属性定义了Web服务器上哪些路径下的页面可获取服务器设置的Cookie。
		一般如果用户输入的URL中的路径部分从第一个字符开始包含Path属性所定义的字符串，
		浏览器就认为通过检查。如果Path属性的值为“/”，
		则Web服务器上所有的WWW资源均可读取该Cookie。
		
		Secure：在Cookie中标记该变量，
		表明只有当浏览器和Web Server之间的通信协议为加密认证协议时，
		浏览器才向服务器提交相应的Cookie。当前这种协议只有一种，即为HTTPS。
		
> cookie 在 Request Headers 中的传输格式

		Cookie: KEY=VALUE; KEY=VALUE; KEY=VALUE
		是没有 域 和 过期时间 的

## 跨域处理

1. 两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置document.domain共享 Cookie。
		
		document.domain = 'example.com';
		
		
2. 如果两个网页不同源，就无法拿到对方的DOM。
		
		典型的例子是iframe窗口和window.open方法打开的窗口，它们与父窗口无法通信。
		
		如果两个窗口一级域名相同，只是二级域名不同，那么设置上一节介绍的document.domain属性，
		就可以规避同源政策，拿到DOM。

		对于完全不同源的网站，目前有三种方法，可以解决跨域窗口的通信问题。
		
			片段识别符（fragment identifier）
			window.name
			跨文档通信API（Cross-document messaging）
		
3. AJAX

	除了架设服务器代理（浏览器请求同源服务器，再由后者请求外部服务），

	vue项目中 开发环境的跨域处理

	**proxyTable**

		dev: {
			 
			// Paths
			assetsSubDirectory: 'static',
			assetsPublicPath: './',
			proxyTable: {
				'/api': {
					target: 'http://temp.com',// 请换成你需要跨域请求的地址
					changeOrigin: true,
					pathRewrite: {
					  '^/api': ''
					}
				}
			}
		}
		
	proxyTable中的pathRewrite的/api理解成用‘/api’代替target里面的地址，
	后面组件中我们掉接口时直接用api代替 
	
	有三种方法规避这个限制

		JSONP
		WebSocket
		CORS


		JSONP
		是服务器与客户端跨源通信的常用方法。
		最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小。
		它的基本思想是，网页通过添加一个<script>元素，向服务器请求JSON数据，
		这种做法不受同源政策限制；服务器收到请求后，将数据放在一个指定名字的回调函数里传回来。
		
		WebSocket
		WebSocket是一种通信协议，使用ws://（非加密）和wss://（加密）作为协议前缀。
		该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。

		CORS
		CORS是跨源资源分享（Cross-Origin Resource Sharing）的缩写。
		它是W3C标准，是跨源AJAX请求的根本解决方法。
		相比JSONP只能发GET请求，CORS允许任何类型的请求。
		
		
		
		
## CORS详解

CORS需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。

因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

> 两种请求

浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。

只要同时满足以下两大条件，就属于简单请求

	（1）请求方法是以下三种方法之一：
		HEAD
		GET
		POST
		
	（2）HTTP的头信息不超出以下几种字段：
		Accept
		Accept-Language
		Content-Language
		Last-Event-ID
		Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
		
	凡是不同时满足上面两个条件，就属于非简单请求。
	
> 简单请求

对于简单请求，浏览器直接发出CORS请求。具体来说，就是在头信息之中，增加一个Origin字段。

下面是一个例子，浏览器发现这次跨源AJAX请求是简单请求，就自动在头信息之中，添加一个Origin字段。

		
		GET /cors HTTP/1.1
		Origin: http://api.bob.com
		Host: api.alice.com
		Accept-Language: en-US
		Connection: keep-alive
		User-Agent: Mozilla/5.0...

上面的头信息中，Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。
		
如果Origin指定的源，不在许可范围内，服务器会返回一个正常的HTTP回应。浏览器发现，这个回应的头信息没有包含Access-Control-Allow-Origin字段（详见下文），就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。注意，这种错误无法通过状态码识别，因为HTTP回应的状态码有可能是200。
		
如果Origin指定的域名在许可范围内，服务器返回的响应，会多出几个头信息字段。
		
		
		Access-Control-Allow-Origin: http://api.bob.com
		Access-Control-Allow-Credentials: true
		Access-Control-Expose-Headers: FooBar
		Content-Type: text/html; charset=utf-8
		
上面的头信息之中，有三个与CORS请求相关的字段，都以Access-Control-开头。

1. <font color=red>Access-Control-Allow-Origin</font>

	该字段是必须的。它的值要么是请求时Origin字段的值，要么是一个*，表示<font color=red>接受任意域名的请求</font>。

2. <font color=red>Access-Control-Allow-Credentials</font>

	该字段可选。它的值是一个布尔值，表示<font color=red>是否允许发送Cookie。</font>默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

3. <font color=red>Access-Control-Expose-Headers</font>

	该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法<font color=red>只能拿到6个基本字段</font>：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。

> 非简单请求

非简单请求是那种对服务器有特殊要求的请求，比如请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。

非简单请求的CORS请求，会在正式通信之前，增加一次HTTP查询请求，称为"预检"请求（preflight）。

浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些HTTP动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的XMLHttpRequest请求，否则就报错。


<font color=red>"预检"</font>请求用的请求方法是<font color=red>OPTIONS</font>，表示这个请求是用来询问的。头信息里面，关键字段是Origin，表示请求来自哪个源。

除了Origin字段，"预检"请求的头信息包括两个特殊字段。

1. <font color=red>Access-Control-Request-Method</font>

	该字段是必须的，用来列出浏览器的CORS请求会用到哪些HTTP方法，上例是PUT。

2. <font color=red>Access-Control-Request-Headers</font>

	该字段是一个逗号分隔的字符串，指定浏览器CORS请求会额外发送的头信息字段，上例是X-Custom-Header。

		OPTIONS /cors HTTP/1.1
		Origin: http://api.bob.com
		Access-Control-Request-Method: PUT
		Access-Control-Request-Headers: X-Custom-Header
		Host: api.alice.com
		Accept-Language: en-US
		Connection: keep-alive
		User-Agent: Mozilla/5.0...
		

**预检请求的回应**

服务器收到"预检"请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。


		HTTP/1.1 200 OK
		Date: Mon, 01 Dec 2008 01:15:39 GMT
		Server: Apache/2.0.61 (Unix)
		Access-Control-Allow-Origin: http://api.bob.com
		Access-Control-Allow-Methods: GET, POST, PUT
		Access-Control-Allow-Headers: X-Custom-Header
		Content-Type: text/html; charset=utf-8
		Content-Encoding: gzip
		Content-Length: 0
		Keep-Alive: timeout=2, max=100
		Connection: Keep-Alive
		Content-Type: text/plain
		
		
	上面的HTTP回应中，关键的是Access-Control-Allow-Origin字段，
	表示http://api.bob.com可以请求数据。该字段也可以设为星号，表示同意任意跨源请求。

**关于更多的cors详情请查看[阮一峰 跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)**



