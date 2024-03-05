// const canvas = document.getElementById('venn');

// const buttonU = document.getElementById('buttonU');
// // buttonU.addEventListener()
// const setsdraw = [];
// function addSetDraw(setsdraw,x, y, radius){
//   setsdraw.push({
//     x: x,
//     y: y,
//     radius: radius
//   })
// }
// addSetDraw(setsdraw,canvas.width / 2, canvas.height / 2, 70);
// console.log(setsdraw)
// function draw() {
//    const canvas = document.getElementById('venn');
//    const context = canvas.getContext('2d');
//    const centerX = canvas.width / 2;
//    const centerY = canvas.height / 2;
//    const radius = 70;

//   circle = {
//     x: centerX,
//     y: centerY,
//     radius: 70
//   }

//   point = {
//     x: centerX - 60,
//     y: centerY,
//   }

 
   
//    context.beginPath();
//    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
//    // context.fillStyle = 'green';
//    // context.fill();
//    context.lineWidth = 2;
//   //  context.strokeStyle = 'red';
//    context.stroke()
//    context.strokeRect(centerX - 60,centerY,1,1)
//    console.log(pointCircle(point, circle))
// }
// function pointCircle(point, circle, orientation){
//   if (orientation){
//     return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius + 30;
//   }
//   return Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius - 30;

// }  

// function getU(){
//   const canvas = document.getElementById('venn');
//   const context = canvas.getContext('2d');
//   const U = document.getElementById('U');
//   const uValues = U.value.split(',');
//   uValues.forEach(letter => {
//     context.font= '30px sans-serif'
//     randomPoint = validpoint(true);
//     console.log(randomPoint)
//     context.strokeText(letter, randomPoint[0], randomPoint[1]);

//   });
//   console.log(uValues);
// }
// function getA(){
//   const canvas = document.getElementById('venn');
//   const context = canvas.getContext('2d');
//   const A = document.getElementById('A');
//   const aValues = A.value.split(',');
//   aValues.forEach(letter => {
//     context.font= '30px sans-serif'
//     randomPoint = validpoint(false);
//     console.log(randomPoint)
//     context.strokeText(letter, randomPoint[0], randomPoint[1]);

//   });
//   console.log(aValues);
// }
// function validpoint (condition){
//   const canvas = document.getElementById('venn');
//   validation = condition;
//   while (validation == condition){
//     randomx = getRandomArbitrary(30,470);
//     randomy = getRandomArbitrary(30,270);
//     point = {
//       x: randomx ,
//       y: randomy,
//     }
//     circle = {
//       x:canvas.width / 2,
//       y:canvas.height / 2,
//       radius: 70
//     }
//     if (pointCircle(point, circle, condition) !== condition){
//       validation = !condition; 
//       return [randomx, randomy];
//     }
//   }
// }
// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// }