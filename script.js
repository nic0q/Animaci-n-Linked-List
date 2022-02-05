// Elements
const $circle = document.querySelector(".crcl")
const $arrow = document.querySelector(".arrow")
// Buttons
const $add = document.querySelector("#add")
const $delete = document.querySelector("#delete")
const $deleteAll = document.querySelector("#deleteAll")
const $deleteC = document.querySelector("#deleteC")
const $speed = document.querySelector("#speed")
// Animations
const $drop = document.querySelector("#dr")
const $gear = document.querySelector("#gear")

// Inputs, Containers
const $container = document.querySelector("#container")
const $inputNumber = document.querySelector("#inputNumber")
const $error = document.querySelector("#error")
const $wait = document.querySelector("#wait")
const $speedInput = document.querySelector("#speedInput")
// Deslizados
const $slide = document.getElementById("myRange")
// Speed
let speed = 200

const freezeButtons = () =>{
  $add.classList.add("disable")
  $delete.classList.add("disable")  
  $deleteAll.classList.add("disable")
  $deleteC.classList.add("disable")
  $wait.classList.remove("d-none")
}

const unfreezeButtons = () =>{
  $add.classList.remove("disable")
  $delete.classList.remove("disable") 
  $deleteAll.classList.remove("disable")
  $deleteC.classList.remove("disable")
  $wait.classList.add("d-none")
}

const time = async (time = 500) =>{
  await new Promise(resolve => setTimeout(resolve, time))
}
// Animaciones de los nodos y las flechas
const rotateArrow = (el,time,deg) =>{
  el.animate([
    {transform: `rotate(${-deg-30}deg)`},
    {transform: `rotate(${50-deg}deg)`},
  ], {
    duration: time,
  })
}
const animateCircle = (el,time,deg) =>{
  el.animate([
    {transform: "scale(1.3)"},
    {transform: `rotate(${50-deg}deg)`},
  ], {
    duration: time,
  })
}
// Lectura de input
const readInputs = () =>{
  if($inputNumber.value === ""){
    $error.classList.remove("d-none")
    return -1
  }
  if($inputNumber.value.length === 1){
    $error.classList.add("d-none")
    return $inputNumber.value
  }
  $error.classList.remove("d-none")
  return -1
}
// Creacion de el nuevo nodo
const createCircle = async(input) =>{
  if($inputNumber.value.length === 1){
    const circle = $circle.cloneNode(true)
    $container.insertAdjacentElement("beforeend",circle)
    getLastCircle().children.value.innerHTML = input
  }
}
// Creacion de la nueva flecha
const createArrow = async() =>{
  const arrow = $arrow.cloneNode(true)
  $container.insertAdjacentElement("beforeend",arrow)
}

// Ultimo nodo
const getLastCircle = () =>{
  const $circ = document.querySelectorAll(".crcl")
  return $circ[$circ.length-1]
}
const getLastArrow = () =>{
  const $arr = document.querySelectorAll(".arrow")
  return $arr[$arr.length-1]
}
// Animacion de añadir
const animate = async (circle,arrow,delay) =>{
  animateCircle(circle,delay,150)
  await time(delay)
  rotateArrow(arrow,delay,20)
  await time(delay)
}
// Animacion de eliminacion
const animateReverse = async (circle,arrow,delay) =>{
  rotateArrow(arrow,delay,20)
  await time(150)
  animateCircle(circle,delay,150)
  await time(150)
}
// Animacion de crear un nuevo nodo
const crearNuevo = async (input) =>{
  await time(100)
  await createCircle(input)
  await time(100)
  await createArrow()
}
// Guarda el dato del tiempo
const setSpeed = () =>{
  speed = parseInt($speedInput.value)
}
// Funcion que anima hasta el final
const animatAll = async () =>{
  let i = 0
  for(e of document.querySelectorAll(".crcl")){
    await animate(e,document.querySelectorAll(".arrow")[i],speed)
    i+=1
  }
}
// Crear nuevo nodo
const nuevoNodo = async () =>{
  let input = readInputs()
  if(input !== -1 ){
    freezeButtons()
    await animatAll()
    await crearNuevo(input)
    unfreezeButtons()
  }
  else{
    return console.error("ERROR DE INPUT")
  }
}
// Elimina el numero de nodo (OneBase)
const deleteIndex = async() =>{
  if(readInputs() !== -1){
  freezeButtons()
  let i = 0
  for(e of document.querySelectorAll(".crcl")){
    let arrow = document.querySelectorAll(".arrow")[i]
    await animate(e,arrow,speed)
    if(i === readInputs()-1){
      e.remove()
      arrow.remove()
      unfreezeButtons()
      return
    }
    i+=1
  }
  unfreezeButtons()
}
else{
  return console.error("ERROR DE INPUT")
}
}
// ELimina todos los nodos
const deleteAll = async() =>{
  freezeButtons()
  await animatAll()
  for(let i = document.querySelectorAll(".crcl").length; i > 0;i--){
    let circle= document.querySelectorAll(".crcl")[i-1]
    let arrow = document.querySelectorAll(".arrow")[i-1]
    await animateReverse(circle,arrow,speed)
    arrow.remove()
    circle.remove()
    await time(200)
  }
  unfreezeButtons()
}
// Elimina todas las coincidencias
const deleteCo = async() =>{
  if(readInputs() !== -1){
  freezeButtons()
  let input = readInputs()
  const cr = document.querySelectorAll(".crcl")
  const arr = document.querySelectorAll(".arrow")
  for(let i = 0; i < cr.length;i++){
    await animate(cr[i],arr[i],speed)
    if(cr[i].children.value.innerHTML === input){
      cr[i].remove()
      arr[i].remove()
    }
  }
  unfreezeButtons()
}
else{
  return console.error("ERROR DE INPUT")
}
}
// Anima el engranaje
const animateGear = () =>{
  $gear.animate([
    {transform: 'rotate(360deg)'},
  ], {
    duration: 500,
  })
}

$add.addEventListener('click',nuevoNodo)
$delete.addEventListener('click',deleteIndex)
$deleteAll.addEventListener('click',deleteAll)
$deleteC.addEventListener('click',deleteCo)
$drop.addEventListener('click',animateGear)
$speed.addEventListener('click',setSpeed)