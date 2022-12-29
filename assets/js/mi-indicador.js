function transformar(){
    try{
        // OBTENER INFORMACIÓN DE LOS INPUT
        montoclp = document.querySelector('#txt-monto-clp').value
        console.log('Monto CLP: ', montoclp)
        moneda = document.querySelector('#cmb-moneda-convertir').value
        console.log('Moneda: ', moneda)
        // VALIDAR INFORMACIÓN
        if(montoclp !== undefined && montoclp !== '' && moneda !== undefined && moneda !== ''){
            console.log('convertir moneda')
            convertir(moneda, montoclp)

        }else{
            alert('debe ingresar un monto y seleccionar un tipo de moneda.')
        }
    }catch(Exception){

    }
}

async function convertir(tipo_indicador, montoclp){
    // LLAMAR A MI INDICADOR
    const url = `https://mindicador.cl/api/${tipo_indicador}`
    const response = await fetch(url);
    // ESPERAR RESPUESTA
    const historico = await response.json();
    console.log('historico.serie', historico.serie)
    // OBTENER EL VALOR DEL DÍA
    indicadorActual = historico.serie[0].valor
    // CONVERTIR EL MONTO CLP
    conversion = parseFloat(montoclp)/parseFloat(indicadorActual)
    console.log('indicador actual:', indicadorActual)
    console.log('conversion: ', conversion)
    resultado = document.querySelector('#txt-resultado')
    resultado.innerHTML = 'Resultado: $' + conversion.toFixed(2);
    let fechas = []
    let conversiones = []
    let datos = []
    let i = 0
    let dataMax = 0
    let dataMin = 0
    if(tipo_indicador === 'dolar'){
        dataMax = 800
        dataMin = 1000     
    }
    if(tipo_indicador === 'uf'){
        dataMax = 34000
        dataMin = 36000     
    }
    if(tipo_indicador === 'euro'){
        dataMax = 800
        dataMin = 1000     
    }
    // DEJAR SOLO 10 REGISTROS
    historico.serie.forEach(function(data) {
        if(i < 10){
            let newDate = new Date(data.fecha)
            conversion = parseFloat(data.valor)
            datos.push({
                fecha: new Date(data.fecha), //newDate.getDate() + "\\" +  (newDate.getMonth()+1) + "\\" + newDate.getFullYear(),
                conversion: conversion.toFixed(2)
            })
            i = i + 1
        }
    })
    // ORDENAR POR FECHA DE MENOR A MAYOR
    datos.sort(function(a,b){
        return a.fecha - b.fecha;
    });
    // GENERAR ARREGLOS PARA EL GRÁFICO
    datos.forEach(function(data) {
        let newDate = data.fecha
        fechas.push(newDate.getDate() + "\\" +  (newDate.getMonth()+1) + "\\" + newDate.getFullYear())
        conversiones.push(data.conversion)
    })
    console.log('min: ', dataMin)
    console.log('max: ', dataMax)
    console.log('fechas: ', fechas)
    console.log('conversiones: ', conversiones)
    // GENERACIÓN DEL GRÁFICO
    new Chart("historico", {
        type: "line",
        data: {
          labels: fechas,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: conversiones
          }]
        },
        options: {
          legend: {display: false},
          title: {
            display: true,
            text:tipo_indicador.toUpperCase() + '(Pesos Chilenos) / Fecha'
          },
          scales: {
            yAxes: [{ticks: {min: dataMin, max:dataMax}}],
          }
        }
      });
}