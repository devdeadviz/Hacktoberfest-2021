const afterinput = (cellsy,cellsx)=>{
    const {Engine,Runner,Render,World,Bodies,MouseConstraint,Mouse,Body,Events} = Matter ;
    const engine = Engine.create();
    engine.world.gravity.y = 0 ;
    const{world} = engine ;
    const width = window.innerWidth;
    const height = window.innerHeight ;
    const render = Render.create({
        element : document.body ,
        engine : engine,
        options:{
           wireframes:false,
            width,
            height
        }
    });
    Render.run(render);
    Runner.run(Runner.create(),engine);
const cellsHorizontal = cellsx ;
const cellsVertical = cellsy ;
const unitlengthX = width/cellsHorizontal ;
const unitlengthY = height/cellsVertical ;
const walls = [
    Bodies.rectangle(width/2,0,width,2,{isStatic:true}),
    Bodies.rectangle(width/2,height,width,2,{isStatic:true}),
    Bodies.rectangle(0,height/2,2,600,{isStatic:true}),
    Bodies.rectangle(width,height/2,2,600,{isStatic:true})   
]
World.add(world,walls);
// for(let i = 0 ;i<20;i++){
// World.add(world,Bodies.rectangle(Math.random()*width,Math.random()*height,50,50,{
//     render:{
//        //  fillStyle:'green'
//     }
// }));
// World.add(world,Bodies.circle(Math.random()*width,Math.random()*height,20,{
//     render:{
//         fillStyle:'red'
//     }
// }));
// }
const shuffle = (arr)=>{
    for(let i = arr.length-1 ;i>=0;i--){
        const j = Math.floor(Math.random()*i) ;
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }
}
const grid = Array(cellsVertical).fill(null).map(()=>{
    return Array(cellsHorizontal).fill(false);   
});
// const grid = Array(3).fill(null);
// grid.forEach((num,index)=>{
//     grid[index]=Array(3).fill(false);
// });
const vertical = Array(cellsVertical).fill(null).map(()=>{
    return Array(cellsHorizontal-1).fill(false);
});
const horizontal = Array(cellsVertical-1).fill(null).map(()=>{
    return Array(cellsHorizontal).fill(false);
})
const StartRow = Math.floor(Math.random()*cellsVertical) ;
const StartCol = Math.floor(Math.random()*cellsHorizontal) ;
const stepThroughCell = (row,column)=>{
    if(grid[row][column]){
        return ;
    }
    grid[row][column] = true ;
    let neighbours = [
        [row-1,column,'up'],
        [row+1,column,'down'],
        [row,column-1,'left'],
        [row,column+1,'right']
    ]
    shuffle(neighbours);
    for(let neighbour of neighbours){
        const[nextRow,nextCol,dir] = neighbour ;
        if(nextRow<0||nextRow>=cellsVertical||nextCol<0||nextCol>=cellsHorizontal||grid[nextRow][nextCol]){
            continue ;
        }
        if(dir === 'up'){
         horizontal[row-1][column] = true ;
        }
        else if(dir === 'down'){
            horizontal[row][column] = true ;
        }
        else if(dir === 'left'){
            vertical[row][column-1] = true ;
        }
        else if(dir==='right'){
            vertical[row][column] = true ;
        }
        stepThroughCell(nextRow,nextCol);
    }
}
stepThroughCell(StartRow,StartCol);
horizontal.forEach((row,rowindex)=>{
    row.forEach((open,columnindex)=>{
    if(open){
         return ;
     }
     World.add(world,Bodies.rectangle(
        columnindex*unitlengthX+unitlengthX/2,rowindex*unitlengthY+unitlengthY,unitlengthX,4,
        {isStatic:true,
            label:'wall'
        }))

    })
})
vertical.forEach((row,rowindex)=>{
    row.forEach((open,columnindex)=>{
        
        if(open){
            return ;
        }
        World.add(world,Bodies.rectangle(
            columnindex*unitlengthX+unitlengthX,rowindex*unitlengthY+unitlengthY/2,4,unitlengthY,
            {isStatic:true,
             label:'wall'
            }
            ))
    })
})
const goal = Bodies.rectangle(width-unitlengthX/2,height-unitlengthY/2,unitlengthX*0.8,unitlengthY*0.8,{
    isStatic:true ,
    label:'goal',
    render:{
        fillStyle:'green'
    }

});
const ballRadius = Math.min(unitlengthX,unitlengthY)/4
const ball = Bodies.circle(unitlengthX/2,unitlengthY/2,ballRadius,{
    label:'ball',
    render:{
        fillStyle:'blue'
    }
});
World.add(world,goal);
World.add(world,ball);
document.addEventListener('keydown',(event)=>{
    const{x,y} = ball.velocity ;
    //console.log(x,y);
    if(event.keyCode === 87||event.keyCode === 38){
        Body.setVelocity(ball,{x,y:y-5});
    }
    if(event.keyCode === 83||event.keyCode === 40){
        Body.setVelocity(ball,{x,y:y+5});
    }
    if(event.keyCode === 65||event.keyCode === 37){
        Body.setVelocity(ball,{x:x-5,y});
    }
    if(event.keyCode === 68||event.keyCode === 39){
        Body.setVelocity(ball,{x:x+5,y});
    }
})
Events.on(engine,'collisionStart',(event)=>{
    event.pairs.forEach((collision)=>{
        const label = ['goal','ball'];
        if(label.includes(collision.bodyA.label)&&label.includes(collision.bodyB.label)){
            document.querySelector('.winner').classList.remove('hidden');
            world.gravity.y = 1 ;
            world.bodies.forEach((body)=>{
                if(body.label === 'wall'){
                    Body.setStatic(body,false);
                }
            })
        }
    })
})
}