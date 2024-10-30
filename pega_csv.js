let url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAEct5jF2nnOSaqoR7i6Fcz2pOLXN4oifn5G2CeO3k7N3uU0C3-B-exrtzS5Ufjul32tAZ1R8KcS8N/pub?gid=0&single=true&output=csv';
let data = []; // Variável para armazenar os dados do CSV
let filteredData = []; // Variável para armazenar os dados filtrados

async function carregar_produtos() {
  try {
    const response = await fetch(url);
    const text = await response.text();

    const resultados = Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });

    data = resultados.data; // Armazena os dados do CSV

    // Filtra os dados baseados na categoria e no status ATIVO
    let categoria = document.querySelector("#category").textContent.trim();
    filteredData = data.filter(item => item.CATEGORIA === categoria && item.ATIVO === 1);

    // Chama a função para processar os dados filtrados
    processarProdutos(filteredData);

  } catch (error) {
    console.error("Erro ao carregar os produtos: ", error);
  }
};

function processarProdutos(filteredData) {
  let product_name = document.querySelector(".prod");

  filteredData.forEach(item => {
    let card = document.createElement("figure");
    card.id = `${item.PARENT}`;
    card.classList.add("card");

    let cartButton = document.createElement("button");
    cartButton.classList.add("add-to-cart-btn");
    cartButton.textContent = "+ Add";
    card.appendChild(cartButton);

    let list_name = document.createElement("a");
    list_name.classList.add("product-name");
    list_name.textContent = `${item.DESCRICAO}`;
    card.appendChild(list_name);

    let imageLink = document.createElement("a");
    imageLink.classList.add("produto");

    let imagem = document.createElement("img");
    imagem.addEventListener("click", produtoclicado);
    imagem.dataset.src = `img/${item.PARENT}.png`;
    imagem.loading = "lazy";
    imagem.alt = item.DESCRICAO;
    imageLink.appendChild(imagem);
    card.appendChild(imageLink);

    let priceLink = document.createElement("a");
    priceLink.classList.add("preco-label");
    priceLink.href = "./login.html";
    card.appendChild(priceLink);

    let priceButton = document.createElement("button");
    priceButton.classList.add("btn-prod");
    priceButton.textContent = "Ver Preço";
    priceLink.appendChild(priceButton);

    let priceContainer = document.createElement("div");
    priceContainer.classList.add("preco-container");

    let label = document.createElement("p");
    label.classList.add("preco_de");
    label.innerHTML = `De: R$ ${item.PRECO_DE}`;
    priceContainer.appendChild(label);

    let label_por = document.createElement("p");
    label_por.classList.add("preco_por");
    label_por.setAttribute("valor", item.PRECO_POR);
    label_por.innerHTML = `Por: R$ ${item.PRECO_POR}`;
    priceContainer.appendChild(label_por);

    card.appendChild(priceContainer);

    product_name.appendChild(card);
  });
}
