const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRht2SMUJJcXy4WTZbwgJ12nLTm5XQ5E7DuwKps2g2rRd_0Nvo9xsw8QdKdlWr162VGhrscqt7k7PHg/pub?output=csv";


function load_data(){
    fetch(url)
    .then(response => response.text())
    .then(text => {

        const resultados = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });

        const data = resultados.data;

        let diversos = data.filter(item => item.Tipo === "DIVERSOS");

        // console.log(data);
        // console.log(diversos);

    })
}

load_data()