function transformar(){
    try{
        montoclp = document.querySelector('#txt-monto-clp').value
        console.log('Monto CLP: ', montoclp)
        moneda = document.querySelector('#cmb-moneda-convertir').value
        console.log('Moneda: ', moneda)

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
    const url = `https://mindicador.cl/api/${tipo_indicador}`
    const response = await fetch(url);
    const historico = await response.json();
    //console.log('historico', historico)
    console.log('historico.serie', historico.serie)
    indicadorActual = historico.serie[0].valor
    conversion = parseFloat(montoclp)/parseFloat(indicadorActual)
    console.log('indicador actual:', indicadorActual)
    console.log('conversion: ', conversion)
    resultado = document.querySelector('#txt-resultado')
    resultado.innerHTML = 'Resultado: $' + conversion.toFixed(2);
}