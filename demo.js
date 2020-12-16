/*
* @Author: 12257
* @Date:   2020-12-14 10:31:56
* @Last Modified by:   12257
* @Last Modified time: 2020-12-14 16:15:52
*/
var index = 0;
	//获取最外层的div
	var bannerBox = document.getElementById("bannerBox");
	//获取轮播图框
	var inner = bannerBox.children[0];
	//获取轮播图的宽度
	var imgWidth = inner.offsetWidth;
	//获取ul
	var ulObj = inner.children[0];
	//获取ul中所有的li
	var list = ulObj.children;
	//获取ol
	var olObj = inner.children[1];
	//获取焦点
	var arr = document.getElementById("arr");
	//然后我们需要给它创建小按钮即小圆点并注册鼠标进入事件，再此之前 我们要明白，小圆点 1 2 3 并不是写死的，它是根据ul li中的图片张数来决定的 ，所以 我们要先在js中给div中的ol中的添加li(即小圆点)，并且给ul中的图片几li添加索引值以便下一步的操作。
	// 创建小按钮----根据ul中li的个数
	for(var i=0;i<list.length-1;i++){
		var liObjs = document.createElement("li");
		olObj.appendChild(liObjs);
		liObjs.innerHTML = i+1;
		//在ol中每个li中增加自定义属性，添加索引值
		liObjs.setAttribute("index",i);
		//注册鼠标进入事件
		// liObjs.onmouseover = function(){
		// 	//先去掉所有背景颜色
		// 	for(var j=0;j<olObj.length;j++){
		// 		olObj.children[j].removeAttribute("class");
		// 	}
		// 	//设置当前鼠标进来的类样式
		// 	this.className = "current";
		// 	//获取ol中li的索引值
		// 	index = this.getAttribute("index");
		// 	//移动ul
		// 	animate(ulObj, -index * imgWidth); //移动动画函数
		// };
	}
		//设置第一个ol中li的背景颜色
		olObj.children[0].className= "current";
		//要实现无缝滚动 就需要多一张图片才行 ，即克隆第一张图片，放到最后面。
		var timeId = setInterval(clickHandle,3000);
		document.getElementById("bannerBox").onmouseover = function(){
			arr.style.display = "block";
			clearInterval(timeId);
		}
		//下一步实现点击左右的按钮实现轮播
		//点击右边按钮
		function clickHandle(){
			if(index == ulObj.children.length-1){
				ulObj.style.left=0+"px";
				index=0;
			}
			index++;
			animate(ulObj, -index * imgWidth);
			if(index == list.length-1){
				olObj.children[0].className = "current";
				olObj.children[olObj.children.length-1].className = "";
			}
			else{
				for(var i=0;i<olObj.children.length;i++){
					olObj.children[i].className="";
				}
				olObj.children[index].className = "current";
			}
		};
		//点击左边按钮
		function clickLeft(){
			if(index==0){
				index = list.length-1;
				ulObj.style.left = -index*imgWidth+"px";
			}
			index--;
			animate(ulObj,-index*imgWidth);
			for(var i=0;i<olObj.children.length;i++){
				olObj.children[i].className = "";
			}
			olObj.children[index].className="current";
		};
		//设置一个元素，移动到指定位置
		 function animate(element, target) {
			 clearInterval(element.timeId);
			 element.timeId = setInterval(function () {
				 var current = element.offsetLeft;
				 var step = 9;
				 step = current > target ? -step : step;
				 current += step;
				 if (Math.abs(target - current) > Math.abs(step)) {
				 	element.style.left = current + "px";
				 } 
				 else {
					 clearInterval(element.timeId);
					 element.style.left = target + "px";
			 	}
			 }, 10);
		 }