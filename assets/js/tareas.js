let tareas = []   
tareas.push({
        id : tareas.length + 1,
        descripcion: 'Hacer Mercado',
        checked: true
    })

tareas.push({
        id : tareas.length + 1,
        descripcion: 'Estudiar para la prueba',
        checked: false
    })
tareas.push({
        id : tareas.length + 1,
        descripcion: 'Sacar a pasear a Tobby',
        checked: false
    })
totales()
tabla()

function agregar(){
    console.log('agregar tarea')
    const tarea = document.querySelector('#txt-nueva-tarea').value
    id = tareas.length + 1
    nueva_tarea = {
        id : id,
        descripcion : tarea,
        checked : false
    }
    tareas.push(nueva_tarea)
    totales()
    tabla()
}

function borrar(indice){
    console.log('borrar tarea: ', indice)
    delete tareas[indice];
    totales()
    tabla()
}

function actualizar(indice){
    console.log('actualizar tarea: ', indice)
    tareas[indice].checked = !(tareas[indice].checked)
    totales()
    tabla()
}

function listar(){
    console.log('listar tareas')
    /* RECORRER TAREAS*/
    tareas.forEach(function(tarea) {
        console.log(tarea)
    })
}

function totales(){
    console.log('crear totales')
    total_tareas = 0
    /* RECORRER TAREAS EXISTENTES*/
    tareas.forEach(function(tarea, index) {
        total_tareas = total_tareas + 1
    })
    total_realizadas = 0
    /* RECORRER TAREAS REALIZADAS*/
    tareas.forEach(function(tarea, index) {
        if (tarea.checked === true){
            total_realizadas = total_realizadas + 1
        }
    })
    let totales =   `<p>Total: <strong>${total_tareas}</strong></p>` +
                    `<p>Realizadas: <strong>${total_realizadas}</strong></p>`
    const section_totales = document.querySelector('#totales')
    section_totales.innerHTML = totales

}

function tabla(){
    console.log('crear tabla')
    let tabla = `<table class="table">` +
                    `<thead>` +
                        `<tr>` +
                            `<th>ID</th>` +
                            `<th>TAREA</th>` +
                        `</tr>`+
                    `</thead>`
    /* RECORRER TAREAS*/
    tareas.forEach(function(tarea, index) {
        const fila =
            `<tr> ` +
                `<td>${tarea.id}</td> ` +
                `<td>${tarea.descripcion}</td> ` +
                `<td><input type="checkbox" onclick=actualizar(${index}) ${tarea.checked === true ?'checked': ''}> ${tarea.checked === true ?'completado': ''}</td> ` +
                `<td><input type="button" onclick=borrar(${index}) value="X"></td> ` +
            `</tr> `
            tabla = tabla + fila 
    })
    tabla = tabla + `</table>` 
    const section_tareas = document.querySelector('#tareas')
    section_tareas.innerHTML = tabla
}