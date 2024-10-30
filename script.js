const url = 



function load_data(){
    fetch(url)
    .then(response => response.text())
    .then(text => {

        const resultados = Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });

        // ------------TIPOS------------------
        const data = resultados.data;
        let tipo = data.map(item => item.Tipo);
        tipo = [...new Set(tipo)];

        const selectbox = document.getElementById("diversos");
        
        tipo.forEach(valor => {
            const option = document.createElement('option');
            option.value = valor;
            option.text = valor;
            selectbox.appendChild(option);
          });

        console.log(tipo);

        // -----------------------------------
    })
}

load_data()