// ======== Funções do Simulador ========
function parseNumero(valor) {
  if (!valor) return 0;
  return parseFloat(valor.replace(',', '.')) || 0;
}

function atualizarCalculos() {
  const largura = parseNumero(document.getElementById("largura").value);
  const altura = parseNumero(document.getElementById("altura").value);
  const precoFolha = parseNumero(document.getElementById("precoFolha").value);
  const precoImpressao = parseNumero(document.getElementById("precoImpressao").value);
  const custosExtras = parseNumero(document.getElementById("custosExtras").value);
  const lucro = parseNumero(document.getElementById("lucro").value);

  const areaFolha = 20 * 28.7; // área da folha A4

  let quantidade = Math.floor(areaFolha / (largura * altura));
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
    precoImpressao: document.getElementById("precoImpressao").value,
    custosExtras: document.getElementById("custosExtras").value
  };
  localStorage.setItem("simulador_preco", JSON.stringify(dados));

  const papelaria = {
    topoBolo: document.getElementById("topoBolo").value,
    impPremium: document.getElementById("impPremium").value,
    impDesenho: document.getElementById("impDesenho").value,
    impSimples: document.getElementById("impSimples").value,
    impAdesivo: document.getElementById("impAdesivo").value
  };
  localStorage.setItem("tabela_papelaria", JSON.stringify(papelaria));
}

function carregarDados() {
  const dados = JSON.parse(localStorage.getItem("simulador_preco"));
  if (dados) {
    document.getElementById("largura").value = dados.largura;
    document.getElementById("altura").value = dados.altura;
    document.getElementById("precoFolha").value = dados.precoFolha;
    document.getElementById("precoImpressao").value = dados.precoImpressao;
    document.getElementById("custosExtras").value = dados.custosExtras;
    atualizarCalculos();
  }

  const papelaria = JSON.parse(localStorage.getItem("tabela_papelaria"));
  if (papelaria) {
    document.getElementById("topoBolo").value = papelaria.topoBolo || '';
    document.getElementById("impPremium").value = papelaria.impPremium || '';
    document.getElementById("impDesenho").value = papelaria.impDesenho || '';
    document.getElementById("impSimples").value = papelaria.impSimples || '';
    document.getElementById("impAdesivo").value = papelaria.impAdesivo || '';
  }
}

// Atualiza sempre que algo for digitado
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", atualizarCalculos);
});

window.addEventListener("load", carregarDados);


