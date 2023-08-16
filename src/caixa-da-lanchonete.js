class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };

    this.formaDePagamento = ["dinheiro", "debito", "credito"];
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    let valorTotal = 0;

    if (!this.formaDePagamento.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }
    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");

      if (!(codigo in this.cardapio)) {
        return "Item inválido!";
      }
      if (quantidade <= 0) {
        return "Quantidade inválida!";
      }

      const valorItem = this.cardapio[codigo];
      valorTotal += valorItem * parseInt(quantidade);

      if (
        (codigo === "chantily" &&
          !itens.some((item) => item.startsWith("cafe,"))) ||
        (codigo === "queijo" &&
          !itens.some((item) => item.startsWith("sanduiche,")))
      ) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }

    if (formaDePagamento === "dinheiro") {
      valorTotal -= (valorTotal * 5) / 100;
    } else if (formaDePagamento === "credito") {
      valorTotal += (valorTotal * 3) / 100;
    }

    const formattedTotal = valorTotal.toFixed(2).replace(".", ",");
    return `R$ ${formattedTotal}`;
  }
}
export { CaixaDaLanchonete };

const caixaLanchonete = new CaixaDaLanchonete();
console.log(caixaLanchonete.calcularValorDaCompra("debito", ["chantily,1"]));
console.log(
  caixaLanchonete.calcularValorDaCompra("debito", ["cafe,1", "chantily,1"])
);
console.log(
  caixaLanchonete.calcularValorDaCompra("credito", ["combo1,1", "cafe,2"])
);
console.log(
  caixaLanchonete.calcularValorDaCompra("moeda", ["combo1,1", "cafe,2"])
);
console.log(caixaLanchonete.calcularValorDaCompra("dinheiro", ["combo1,0"]));
console.log(caixaLanchonete.calcularValorDaCompra("dinheiro", []));
console.log(caixaLanchonete.calcularValorDaCompra("dinheiro", ["chocolate,2"]));
