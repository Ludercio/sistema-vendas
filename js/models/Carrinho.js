export class Carrinho {
    constructor() {
        this.itens = [];
    }

    adicionar(produto) {
        // Se o produto já estiver no carrinho, apenas aumentamos a qtd interna do item no carrinho
        const itemExistente = this.itens.find(item => item.id === produto.id);
        if (itemExistente) {
            itemExistente.quantidadeSelecionada++;
        } else {
            this.itens.push({ ...produto, quantidadeSelecionada: 1 });
        }
    }

    get totalItens() {
        return this.itens.reduce((soma, item) => soma + item.quantidadeSelecionada, 0);
    }

    get valorTotal() {
        return this.itens.reduce((soma, item) => soma + (item.preco * item.quantidadeSelecionada), 0);
    }

    limpar() {
        this.itens = [];
    }
}