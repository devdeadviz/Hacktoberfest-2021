// World.add(
//     world,
//     MouseConstraint.create(engine,{
//         mouse:Mouse.create(render.canvas)
//     })
// )
const button1 = document.querySelector('#submit');
 const button2 = document.querySelector('#Again');
 let value1 = 0;
 let value2 = 0;
button1.addEventListener('click',()=>{
    value1 = parseInt(document.querySelector('#input1').value);
    value2 = parseInt(document.querySelector('#input2').value);
    document.querySelector('.shut').classList.add('d-none');
    afterinput(value1,value2);
})
// button2.addEventListener('click',()=>{
//     document.querySelector('.winner').classList.add('d-none');
//     document.querySelector('body').classList.add('d-none');
//     afterinput(value1,value2);
//  })