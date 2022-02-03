// Elements
const $circle = document.querySelector(".crcl")
const $arrow = document.querySelector(".arrow")
// Buttons
const $add = document.querySelector("#add")
const $delete = document.querySelector("#delete")
const $deleteAll = document.querySelector("#deleteAll")
const $deleteC = document.querySelector("#deleteC")
// Inputs, Containers
const $container = document.querySelector("#container")
const $inputNumber = document.querySelector("#inputNumber")
const $error = document.querySelector("#error")

const freezeButtons = () =>{
  $add.classList.add("disable")
  $delete.classList.add("disable")  
  $deleteAll.classList.add("disable")
  $deleteC.classList.add("disable")

}

const unfreezeButtons = () =>{
  $add.classList.remove("disable")
  $delete.classList.remove("disable") 
  $deleteAll.classList.remove("disable")
  $deleteC.classList.remove("disable")
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
const animate = async (circle,arrow) =>{
  animateCircle(circle,200,150)
  await time()
  rotateArrow(arrow,200,20)
  await time(300)
}
// Animacion de eliminacion
const animateReverse = async (circle,arrow) =>{
  rotateArrow(arrow,200,20)
  await time()
  animateCircle(circle,200,150)
  await time(300)
}
// Animacion de crear un nuevo nodo
const crearNuevo = async (input) =>{
  await time()
  await createCircle(input)
  await time()
  await createArrow()
}
// Funcion que anima hasta el final
const animatAll = async () =>{
  let i = 0
  for(e of document.querySelectorAll(".crcl")){
    await animate(e,document.querySelectorAll(".arrow")[i])
    i+=1
  }
}
// Crear nuevo nodo
const nuevoNodo = async () =>{
  let input = readInputs()
  if(input !== 0 ){
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
    await animate(e,arrow)
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

const deleteAll = async() =>{
  freezeButtons()
  for(let i = document.querySelectorAll(".crcl").length; i > 0;i--){
    let circle= document.querySelectorAll(".crcl")[i-1]
    let arrow = document.querySelectorAll(".arrow")[i-1]
    await animateReverse(circle,arrow)
    arrow.remove()
    circle.remove()
    await time(200)
  }
  unfreezeButtons()
}
const deleteCo = async() =>{
  if($inputNumber !== -1){
  freezeButtons()
  let input = readInputs()
  const cr = document.querySelectorAll(".crcl")
  const arr = document.querySelectorAll(".arrow")
  for(let i = 0; i < cr.length;i++){
    await animate(cr[i],arr[i])
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

$add.addEventListener('click',nuevoNodo)
$delete.addEventListener('click',deleteIndex)
$deleteAll.addEventListener('click',deleteAll)
$deleteC.addEventListener('click',deleteCo)