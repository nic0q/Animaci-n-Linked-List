const $circle = document.querySelector(".crcl")
const $arrow = document.querySelector(".arrow")
const $button = document.querySelector("#button")
const $container = document.querySelector("#container")
const $inputNumber = document.querySelector("#inputNumber")
const $error = document.querySelector("#error")
const time = async () =>{
  await new Promise(resolve => setTimeout(resolve, 500))}

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
const readInputs = () =>{

  if($inputNumber.value === ""){
    return 0
  }
  if($inputNumber.value>= 0 && $inputNumber.value<=9){
    return $inputNumber.value
  }
  return 0
}
const createCircle = async() =>{
  if($inputNumber.value>= 0 && $inputNumber.value<=9){
    const circle = $circle.cloneNode(true)
    circle.innerHTML = readInputs()
    $container.insertAdjacentElement("beforeend",circle)
  }
}
const createArrow = async() =>{
  const arrow = $arrow.cloneNode(true)
  $container.insertAdjacentElement("beforeend",arrow)
}

const getLastCircle = () =>{
  const $circ = document.querySelectorAll(".crcl")
  return $circ[$circ.length-1]
}
const getLastArrow = () =>{
  const $arr = document.querySelectorAll(".arrow")
  return $arr[$arr.length-1]
}

const animate = async () =>{
  if(readInputs() !== 0 ){
  animateCircle(getLastCircle(),200,150)
  await time()
  rotateArrow(getLastArrow(),200,20)
  await time()
  await createCircle()
  await time()
  await createArrow()
}
  return
}

$button.addEventListener('click',animate)