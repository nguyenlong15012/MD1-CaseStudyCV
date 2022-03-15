window.addEventListener('load', function (){
    const  canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width =window.innerWidth;
    canvas.height = window.innerHeight;
    //Canvas settings
    ctx.fillStyle = 'green';
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;

    // Cài đặt hiệu ứng
    //1: let size = canvas.width<canvas.height ? canvas.width*0.3 : canvas.height*0.3;
    let size = canvas.width<canvas.height ? canvas.width*0.1 : canvas.height*0.1;
    const maxLevel = 5;
    const branches = 2;

    let sides = 10;
    let scale = 0.7;
    let spread = 0.5;
    let color = 'hsl(' +Math.random()*360 +',100%,50%)';
    //let lineWidth = 30;
    let lineWidth = Math.floor(Math.random() * 20 +10);

    //controls
    const randomizeButton = document.getElementById('randomizeButton');
    const resetButton = document.getElementById('resetButton');
    const slider_spread = document.getElementById('spread');
    const label_spread = document.querySelector("[for ='spread']");
    slider_spread.addEventListener('change',function (e){
        spread = e.target.value;
        //updateSliders();
        drawFractal();
    });
    //ctx.fillRect(0,0,canvas.width, canvas.height);

    const slider_sides = document.getElementById('sides');
    const label_sides =document.querySelector('[for="sides"]');
    slider_sides.addEventListener('change', function (e){
        sides = e.target.value;
        //updateSliders();
        drawFractal();
    });


    function drawBranch(level){
        //Vẽ nhánh lớn
        if (level>maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0);
        //ctx.lineTo(size - 50,0); khoảng cách các thanh
        ctx.stroke();

        for (let i = 0; i<branches; i++){
            ctx.save();
            ctx.translate(size-(size/branches)*i,0)
            ctx.scale(scale,scale); // khi vẽ lại hình cũ sẽ phóng to or thu nhỏ

            ctx.save();
            ctx.rotate(spread); //Phương pháp xoay
            drawBranch(level+1);
            ctx.restore();

            // ctx.save();
            // //ctx.translate(size-(size/branches)*i,0,0)
            // ctx.rotate(-spread)
            // drawBranch(level+1);
            // ctx.restore();

            ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(0,size,size*0.1,0,Math.PI*2);
        ctx.fill();

    }

    function drawFractal(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.translate(canvas.width/2,canvas.height/2)
        // ctx.scale(1,1);
        // ctx.rotate(0)
        for (let i = 0; i<sides; i++){
            ctx.rotate((Math.PI*2)/sides)
            drawBranch(0);
        }
        ctx.restore();
        randomizeButton.style.backgroundColor = color;
    }
    drawFractal();
    // for (let i = 0; i<sides; i++){
    //
    //     ctx.rotate((Math.PI*2)/sides) //cách đều các đường kẻ
    //     // ctx.scale(0.97,0.97);
    //     // ctx.translate(20,0) //Tạo khoảng cách ở tâm
    // }
    //

    function randomizeFractal(){
        sides = Math.floor(Math.random() * 18 + 2);
        //scale = Math.random() * 0.4 + 0.4;
        spread = Math.random() * 0.6 - 0.3
        color = 'hsl(' +Math.random()*360 +',100%,50%)';
        lineWidth = Math.floor(Math.random() * 30 +20);
        // lineWidth = Math.floor(Math.random() * 20 +10); thu bé

    }
    randomizeButton.addEventListener('click', function (){
        randomizeFractal();
        updateSliders();
        drawFractal();
    });

    function resetFractal(){
        sides = 15;
        scale = 0.85;
        spread = 0.2;
        color = 'hsl(290,100%,50%)';
        lineWidth =30;
    }
    resetButton.addEventListener('click', function (){
        resetFractal();
        updateSliders();
        drawFractal();
    });

    function updateSliders(){
        slider_spread.value = spread;
        label_spread.innerText = 'Spread: '+ Number(spread.toFixed(1));
        slider_sides.value = sides;
        label_sides.innerText = 'Sides: '+ Number(sides.toFixed(1));
    }
    updateSliders();

    window.addEventListener('resize', function (){
        canvas.width =window.innerWidth;
        canvas.height = window.innerHeight;
        size = canvas.width<canvas.height ? canvas.width*0.1 : canvas.height*0.1;
        ctx.shadowColor = 'rgba(0,0,0,0.7)';
        ctx.shadowOffsetX = 10;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 10;
        drawFractal();
    })
});