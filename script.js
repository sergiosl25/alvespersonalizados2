// ======== Funções do Simulador ========
function parseNumero(valor) {
  if (!valor) return 0;
  return parseFloat(valor.replace(',', '.')) || 0;
}

function atualizarCalculos() {
  const largura = parseNumero(document.getElementById("largura").value);
  const altura = parseNumero(document.getElementById("altura").value);
  const precoFolha = parseNumero(document.getElementById("precoFolha").value);  
  const lucro = parseNumero(document.getElementById("lucro").value);

  const larguraFolha = 20;
  const alturaFolha = 28;

  let quantidade = Math.floor(larguraFolha / largura) * Math.floor(alturaFolha / altura);
  if (isNaN(quantidade) || quantidade < 1) quantidade = 1;
  document.getElementById("quantidade").value = quantidade;

  // Preço de venda
  const precoVenda = ((precoFolha + precoImpressao + custosExtras) / quantidade) * (1 + lucro / 100);
  document.getElementById("precoVenda").value = precoVenda.toFixed(2).replace('.', ',');

  salvarDados();
}

// ======== Salvar e carregar simulador ========
function salvarDados() {
  const dados = {
    largura: document.getElementById("largura").value,
    altura: document.getElementById("altura").value,
    precoFolha: document.getElementById("precoFolha").value,    
  };
  localStorage.setItem("simulador_preco", JSON.stringify(dados));
}

function carregarDados() {
  const dados = JSON.parse(localStorage.getItem("simulador_preco"));
  if (dados) {
    document.getElementById("largura").value = dados.largura;
    document.getElementById("altura").value = dados.altura;
    document.getElementById("precoFolha").value = dados.precoFolha;    
    atualizarCalculos();
  }  
}

// Atualiza sempre que algo for digitado
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", atualizarCalculos);
});

window.addEventListener("load", carregarDados);





