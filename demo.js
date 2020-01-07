//获取游戏区域
var gameContent = document.getElementsByClassName('gameContent')[0];
//获取游戏区域宽高
var gameWidth = gameContent.offsetWidth;
var gameHeight = gameContent.offsetHeight;
//获取大豆子画布
var bean = document.getElementById('bean');
//创建画笔
var ctx = bean.getContext('2d');
//获取大豆子的自身宽度，和高度
var beanWidth = bean.offsetWidth;
var beanHeight = bean.offsetHeight;
//获取目标豆子
var target_bean = gameContent.getElementsByClassName('target_bean')[0];
//获取目标豆子的自身宽度和高度
var target_beanWidth = target_bean.offsetWidth;
var target_beanHeight = target_bean.offsetHeight;
//

//画出大豆子形态
function beanFace(orientation){
    setInterval(function(){
        ctx.restore();
        ctx.clearRect(0,0,40,40);
        ctx.beginPath();
        ctx.save();
        ctx.translate(20,20);
        ctx.arc(0,0,20,Math.PI / 4,2*Math.PI*7/8,0);
        ctx.lineTo(0,0);
        ctx.closePath();
        ctx.stroke();
    },300)
    
    setInterval(function(){
        ctx.restore();
        ctx.clearRect(0,0,40,40);
        ctx.beginPath();
        ctx.save();
        ctx.translate(20,20);
        ctx.arc(0,0,20,0,2*Math.PI,0);
        ctx.lineTo(0,0);
        ctx.closePath();
        ctx.stroke();
    },500)
}
beanFace();
//改变目标豆子随机位置
function beanIp(){
    //生成x方向的范围
    var x = Math.ceil( Math.random()*(gameContent.offsetWidth - 15));
    //生成y方向的范围
    var y =  Math.ceil( Math.random()*(gameContent.offsetHeight - 15));
    target_bean.style.left = x + 'px';
    target_bean.style.top = y +'px';
}
beanIp();
//豆子运动
var timer = null;
var score =0;//初始化分数
function move(direction){
    var speed = 5;//设置初始速度
    if(direction == 'left'){
        clearInterval(timer);
        timer = setInterval(function(){
            //在运动过程中，判断目标豆子是否在大豆子身体范围之内
            if(bean.offsetLeft + beanWidth >= target_bean.offsetLeft + target_beanWidth && target_bean.offsetLeft >= bean.offsetLeft && bean.offsetTop + beanHeight >= target_bean.offsetTop + target_beanWidth && target_bean.offsetTop >= bean.offsetTop){
                beanIp();
                score++;
            }
            //判断大豆子距离左边界值
            if(bean.offsetLeft <= 0){
                clearInterval(timer);
                alert('游戏结束 分数为' + score);
                score = 0;
                // console.log(score);
            }else{
                bean.style.left = bean.offsetLeft - speed + 'px';
            }
            
        },50);
    }
    if(direction == 'right'){
        clearInterval(timer);
        timer = setInterval(function(){
            if(bean.offsetLeft + beanWidth >= target_bean.offsetLeft + target_beanWidth && target_bean.offsetLeft >= bean.offsetLeft && bean.offsetTop + beanHeight >= target_bean.offsetTop + target_beanWidth && target_bean.offsetTop >= bean.offsetTop){
                beanIp();
                score++;
            }
            if(bean.offsetLeft > gameWidth - beanWidth){
                clearInterval(timer);
                bean.style.left = gameWidth - beanWidth + 'px';
                alert('游戏结束 分数为'+score);
                score = 0;
            }else{
                bean.style.left = bean.offsetLeft + speed + 'px';
            }
        },50);
    }
    if(direction == 'up'){
        clearInterval(timer);
        timer = setInterval(function(){
            if(bean.offsetLeft + beanWidth >= target_bean.offsetLeft + target_beanWidth && target_bean.offsetLeft >= bean.offsetLeft && bean.offsetTop + beanHeight >= target_bean.offsetTop + target_beanWidth && target_bean.offsetTop >= bean.offsetTop){
                beanIp();
                score++;
            }
            if(bean.offsetTop <= 0){
                clearInterval(timer);
                bean.style.top = 0 + 'px';
                alert('游戏结束 分数为'+score);
                score = 0;
            }else{
                bean.style.top = bean.offsetTop - speed + 'px';
            }
        },50);
    }
    if(direction == 'down'){
        clearInterval(timer);
        timer = setInterval(function(){
            if(bean.offsetLeft + beanWidth >= target_bean.offsetLeft + target_beanWidth && target_bean.offsetLeft >= bean.offsetLeft && bean.offsetTop + beanHeight >= target_bean.offsetTop + target_beanWidth && target_bean.offsetTop >= bean.offsetTop){
                beanIp();
                score++;
            }
            if(bean.offsetTop > gameHeight - beanHeight){
                clearInterval(timer);
                bean.style.top = gameHeight - beanHeight + 'px';
                alert('游戏结束 分数为'+score);
                // console.log(score);
                score = 0;
             }else{
                bean.style.top = bean.offsetTop + speed + 'px';
             }
        },50);
    }
   
    
}


//用户键盘事件
document.onkeydown = function(e){
    var e = e || event;
    //按下
  
    if(e && e.keyCode == 40){
        //改变嘴的朝向下
        bean.style.transform = 'rotate(90deg)'
        move('down');
    }
     //按上
     if(e && e.keyCode == 38){
         //改变嘴的朝向上
        bean.style.transform = 'rotate(-90deg)';
        move('up');
    }
     //按左
     if(e && e.keyCode == 37){
         //改变嘴的朝向左
        bean.style.transform = 'rotate(180deg)'
        move('left');
    }
     //按右
     if(e && e.keyCode == 39){
         //改变嘴的朝向右
        bean.style.transform = 'rotate(0deg)'
        move('right');
    }
}















