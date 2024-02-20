const cantidad = document.getElementById('clp')
const convertir = document.getElementById('convertir');
const opcionCambio = document.getElementById('divisa')
const total = document.getElementById('total')


const renDerizar = (data) => {

    const arraySerie = data.serie.slice(0, 10)
    const arrayDatos = arraySerie.map((d) => d.fecha.slice(0, 10))
    const arrayValor = arraySerie.map((d) => d.valor)

    let calculo = parseFloat(cantidad.value) / parseFloat(data.serie[0].valor);

    total.innerHTML = `Resultado: ${ calculo.toFixed(3) }`


    new Chart("elGrafico", {
        type: "line",
        data: {
            labels: arrayDatos.reverse(),
            datasets: [{
                fill: true,
                lineTension: 0,
                backgroundColor: "rgba(128,0,255)",
                borderColor: "rgba(255,0,255)",
                data: arrayValor.reverse()
            }]
        },
        options: {
            legend: { display: false }
        }
    })

}


async function getData() {
    try {
        if (cantidad.value) {
            const cambioMoneda = opcionCambio.value
            const url = `https://mindicador.cl/api/${cambioMoneda}`
            const response = await fetch(`${url}`)
            const data = await response.json()
            renDerizar(data)
        } else {
            alert("Ingresar un monto en Pesos")
        }
    } catch (error) {
        alert(error.message)
    }
}

convertir.addEventListener("click", getData);