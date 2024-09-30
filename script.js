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

        // ------------TIPOS------------------
        const data = resultados.data;
        let tipo = data.map(item => item.Tipo);
        tipo = [...new Set(tipo)];

        const selectbox = document.getElementById("diversos");
        
        tipo.forEach(valor => {
            const option = document.createElement('option');
            option.value = valor;
            option.text = valor;   // Define o texto visível da opção
            selectbox.appendChild(option);  // Adiciona a opção ao select
          });

        console.log(tipo);

        // -----------------------------------
    })
}

load_data()