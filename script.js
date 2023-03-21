let fecha = document.querySelector('#date');
const btnPlus = document.querySelector('#plus');
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input');
const lista = document.querySelector('#lista')
const check = 'fa-circle-check';
const uncheck = 'fa-circle';
const line = 'line-through';
let array
let id

//CREACION DE FECHA
let FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-mx', { weekday: 'long', month: 'short', day: 'numeric' })

//FUNCION PARA AGREGAR TAREA
function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) { return }
  const REALIZADO = realizado ? check : uncheck
  const TACHADO = realizado ? line : ''
  const elemento = `<li id="elemento">
                        <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                        <p class="text ${TACHADO}">${tarea}</p>
                        <i class="fa-solid fa-trash" data="eliminado" id="${id}"></i>
                      </li>  `
  lista.insertAdjacentHTML('beforeend', elemento)
}
//Funcion tarea realizada
function tareaRealizada(element) {
  element.classList.toggle(check)
  element.classList.toggle(uncheck)
  element.parentNode.querySelector('.text').classList.toggle(line)
  array[element.id].realizado = array[element.id].realizado ?false :true;
}
//Funcion elimnar tarea
function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode)
  array[element.id].eliminado = true
  console.log(array);
}

//AGREGAR TAREA AL HACER CLICK
btnPlus.addEventListener('click', () => {
  const tarea = input.value
  if (tarea) {
    agregarTarea(tarea, id, false, false)
    array.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    })
    localStorage.setItem('tareas', JSON.stringify(array))
    id++
    input.value = ''
  }
})
//AGREGAR TAREA PRESIONANDO ENTER
document.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    const tarea = input.value
    if (tarea) {
      agregarTarea(tarea, id, false, false)
      array.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false
      })
      localStorage.setItem('tareas', JSON.stringify(array))

      input.value = ''
      id++
      console.log(array);
    }
  }
})

//TAREA TERMINADA CON CHECK
lista.addEventListener('click', function (event) {
  const element = event.target
  const elementData = element.attributes.data.value
  console.log(elementData);
  if (elementData == 'realizado') {
    tareaRealizada(element)
  }
  else if (elementData == 'eliminado') {
    tareaEliminada(element)
    console.log("eliminado");
  }
  localStorage.setItem('tareas', JSON.stringify(array))
})

//RECUPERAR LOCAL STORAGE Y MOSTRAR
let data = localStorage.getItem('tareas')
if (data) {
  array = JSON.parse(data)
  console.log(ArrayBuffer);
  id = array.length
  cargarTareas(array)
} else {
  array = []
  id = 0
}

function cargarTareas(DATA) {
  DATA.forEach(function (i) {
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
  })
}




