import './style.css'
import Point from './pointObject'
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {

  let myCanvas = document.getElementById('myCanvas') as HTMLCanvasElement;
  myCanvas.height = 800;
  myCanvas.width = 800;
  let context = myCanvas.getContext('2d') as CanvasRenderingContext2D;
  let pointListListObject = [] as Point[];
  let addPointButton = document.getElementById('add_button') as HTMLButtonElement;
  let clearButton = document.getElementById('clear_button') as HTMLButtonElement;
  let pointX = document.getElementById('inputX') as HTMLInputElement;
  let pointY = document.getElementById('inputY') as HTMLInputElement;
  let ulPoints = document.getElementById('points') as HTMLUListElement;
  loadAllStuff();


  addPointButton.addEventListener('click', addPoints);
  clearButton.addEventListener('click', clearPointList);
  function drawAxis() {
    context.strokeStyle = 'blue'
    context.beginPath()
    context.moveTo((myCanvas.width / 2), 0)
    context.lineTo((myCanvas.width / 2), myCanvas.height)
    context.stroke()
    context.beginPath()
    context.moveTo((0), myCanvas.height / 2)
    context.lineTo((myCanvas.width), myCanvas.height / 2)
    context.stroke()
  }
  function drawLines() {
    for (let i = 1; i < pointListListObject.length; i++) {
      context.beginPath();
      context.moveTo((myCanvas.width / 2 + (pointListListObject[i].xAxis * myCanvas.width / 20)), (myCanvas.height * 0.5 - (pointListListObject[i].yAxis * myCanvas.height / 20)));
      context.lineTo((myCanvas.width / 2 + (pointListListObject[i - 1].xAxis * myCanvas.width / 20)), (myCanvas.height * 0.5 - (pointListListObject[i - 1].yAxis * myCanvas.height / 20)));
      context.stroke();
    }
    context.beginPath();
    context.moveTo((myCanvas.width / 2 + (pointListListObject[pointListListObject.length - 1].xAxis * myCanvas.width / 20)), (myCanvas.height * 0.5 - (pointListListObject[pointListListObject.length - 1].yAxis * myCanvas.height / 20)));
    context.lineTo((myCanvas.width / 2 + (pointListListObject[0].xAxis * myCanvas.width / 20)), (myCanvas.height * 0.5 - (pointListListObject[0].yAxis * myCanvas.height / 20)));
    context.stroke();
  }
  async function loadAllStuff() {
    axios.get("http://localhost:8080/point/getAll").then((res: any) => {
      if (pointListListObject.length !== 0) {
        pointListListObject = []
      }
      res.data.forEach((point: any) => {
        pointListListObject.push(new Point(Number(point.xAxis), Number(point.yAxis), Number(point.id)))
      })
      fillPointList();
      drawPoints();
      drawAxis();
      drawLines()
    })
  }

  function clearPointList() {
    fetch("http://localhost:8080/point/deleteAll", {
      method: "DELETE",
      headers: { 'Content-Type': "application/json" },
    }).then(() => {
      loadAllStuff()
    })
  }

  function drawPoints() {
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    pointListListObject.forEach((point) => {
      context.beginPath();
      context.fillStyle = 'red';
      context.arc((myCanvas.width / 2 + (point.xAxis * myCanvas.width / 20)), (myCanvas.height * 0.5 - (point.yAxis * myCanvas.height / 20)), 2.5, 0, 2 * Math.PI);
      context.fill();
    })
  }

  async function addPoints() {
    if (pointX.value === '' || pointY.value === '' || isNaN(Number(pointX.value)) || isNaN(Number(pointY.value))) {
      alert('Bitte Koordinaten ausfüllen oder valide Werte einfügen!!')
    }
    else {
      let point = new Point(Number(pointX.value), Number(pointY.value))
      fetch('http://localhost:8080/point/add', {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify(point)
      }).then(() => {
        console.log('New Point has been added')
        loadAllStuff();
      })
    }
  }

  function fillPointList() {
    if (!ulPoints.firstChild) {
      fillUlPoints();
    }
    else {
      ulPoints.replaceChildren();
      fillUlPoints();
    }
  }

  function fillUlPoints() {
    let counter = 1;
    pointListListObject.forEach((point) => {
      let li = document.createElement('li');
      let inner = `Punkt ${counter}: ` + point.print();
      li.innerHTML = inner;
      li.setAttribute('class', 'pointLi');
      li.addEventListener('click', () => {
        let deletePointConfirm = window.confirm(`Diesen Punkt löschen? \n ${inner}`);
        if (deletePointConfirm) {
          deletePoint(point);
          fillPointList();
          context.clearRect(0, 0, myCanvas.width, myCanvas.height);
          drawPoints();
        }
      })
      ulPoints.append(li);
      counter++;
    })
  }
  async function deletePoint(point: Point) {
    fetch(`http://localhost:8080/point/deletePoint/${point.id}`, {
      method: "DELETE",
      headers: { 'Content-Type': "application/json" },
    }
    ).then(() => {
      loadAllStuff();
    })
  }
});


// for (let i = 1; i < pointListListObject.length; i++) {
//   paths.push({ key: i, value: pointListListObject[i].distance(pointListListObject[i - 1]) });
//   if (i === pointListListObject.length - 1) {
//     paths.push({ key: i, value: pointListListObject[i].distance(pointListListObject[0]) });
//   }
// }