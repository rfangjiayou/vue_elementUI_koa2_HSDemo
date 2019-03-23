let POINT = 50;

class index {
    static draw (canvas, context) {
        //每帧绘制
        context.clearRect(0,0,canvas.width, canvas.height);
        for (let i = 0; i < POINT; i++) {
            index.drawCricle(context, index.circleArr[i].x, index.circleArr[i].y, index.circleArr[i].r);
        }
        for (let i = 0; i < POINT; i++) {
            for (let j = 0; j < POINT; j++) {
                if (i + j < POINT) {
                    let A = Math.abs(index.circleArr[i+j].x - index.circleArr[i].x),
                        B = Math.abs(index.circleArr[i+j].y - index.circleArr[i].y);
                    let lineLength = Math.sqrt(A*A + B*B);
                    let C = 1/lineLength*7-0.009;
                    let lineOpacity = C > 0.03 ? 0.03 : C;
                    if (lineOpacity > 0) {
                        index.drawLine(context, index.circleArr[i].x, index.circleArr[i].y, index.circleArr[i+j].x, index.circleArr[i+j].y, lineOpacity);
                    }
                }
            }
        }
    }
    static init () {
        //定义画布宽高和生成点的个数
        let WIDTH = window.innerWidth, 
            HEIGHT = window.innerHeight;

        let canvas = document.getElementById('Mycanvas');
            canvas.width = WIDTH,
            canvas.height = HEIGHT;
        let context = canvas.getContext('2d');
            context.strokeStyle = 'rgba(90,80,50,0.02)',
            context.strokeWidth = 1,
            context.fillStyle = 'rgba(90,30,50,0.05)';

        index.WIDTH = WIDTH;
        index.HEIGHT = HEIGHT;
        index.canvas = canvas;
        index.context = context;

        index.circleArr = [];
        for (var i = 0; i < POINT; i++) {
            index.circleArr.push(index.drawCricle(context, index.num(WIDTH), index.num(HEIGHT), index.num(15, 2), index.num(10, -10)/40, index.num(10, -10)/40));
        }
        index.draw(canvas, context);
    }

    //线条：开始xy坐标，结束xy坐标，线条透明度
    static Line (x, y, _x, _y, o) {
        var {beginX, beginY, closeX, closeY, o} = {beginX:x, beginY:y, closeX:_x, closeY:_y, o:o};
        let line = {beginX, beginY, closeX, closeY, o};

        return line;
    }

    //点：圆心xy坐标，半径，每帧移动xy的距离
    static Circle (x, y, r, moveX, moveY)  {
        var {x, y, r, moveX, moveY} = {x:x, y:y, r:r, moveX:moveX, moveY:moveY};
        let circle = {x, y, r, moveX, moveY};

        return circle;
    }

    //生成max和min之间的随机数
    static num (max, ..._min)  {
        let min = _min[1] || 0;
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    // 绘制原点
    static drawCricle (cxt, x, y, r, moveX, moveY)  {
        let circle = index.Circle(x, y, r, moveX, moveY);
        cxt.beginPath();
        cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI);
        cxt.closePath();
        cxt.fill();
        return circle;
    }
    
    //绘制线条
    static drawLine (cxt, x, y, _x, _y, o) {
        let line = index.Line(x, y, _x, _y, o);
        cxt.beginPath();
        cxt.strokeStyle = 'rgba(0,0,0,'+ o +')';
        cxt.moveTo(line.beginX, line.beginY);
        cxt.lineTo(line.closeX, line.closeY);
        cxt.closePath();
        cxt.stroke();
    }
    static load () {
        index.init();
        setInterval(function () {
            for (let i = 0; i < POINT; i++) {
                let cir = index.circleArr[i];
                cir.x += cir.moveX;
                cir.y += cir.moveY;
                if (cir.x > index.WIDTH) cir.x = 0;
                else if (cir.x < 0) cir.x = index.WIDTH;
                if (cir.y > index.HEIGHT) cir.y = 0;
                else if (cir.y < 0) cir.y = index.HEIGHT;
            }
            index.draw(index.canvas, index.context);
        }, 16);
    }
}

index.circleArr = [];
index.WIDTH = '';
index.HEIGHT = '';
index.canvas = '';
index.context = '';


//调用执行
/* window.onload = () => {
    init();
    setInterval(function () {
        for (let i = 0; i < POINT; i++) {
            let cir = circleArr[i];
            cir.x += cir.moveX;
            cir.y += cir.moveY;
            if (cir.x > WIDTH) cir.x = 0;
            else if (cir.x < 0) cir.x = WIDTH;
            if (cir.y > HEIGHT) cir.y = 0;
            else if (cir.y < 0) cir.y = HEIGHT;
        }
        draw();
    }, 16);
} */

export default index;