import { LojaView } from '../views/LojaView.js';
import { Produto } from '../models/Produto.js';
import { Carrinho } from '../models/Carrinho.js';

export class AppControllers {
    constructor() {
        this.produtos = [];
        this.carrinho = new Carrinho();
        this.view = new LojaView();
    }

    iniciar() {
        // Configuração de botões (Navegação)
        document.getElementById('btn-navegar-loja').onclick = () => this.mostrarTela('loja');
        document.getElementById('btn-navegar-admin').onclick = () => this.mostrarTela('admin');
        
        // Botão para encerrar a compra
        document.getElementById('btn-encerrar-compra').onclick = () => this.encerrarCompra();
        
        // Botão para voltar da tela de confirmação
        document.getElementById('btn-voltar-loja').onclick = () => this.mostrarTela('loja');

        // Formulário de cadastro
        document.getElementById('form-produto').onsubmit = (e) => {
            e.preventDefault();
            this.adicionarProdutoAoSistema();
        };

        this.atualizarInterface();
    }

    // Gerencia qual "página" aparece na tela
    mostrarTela(tela) {
        document.getElementById('tela-loja').style.display = tela === 'loja' ? 'flex' : 'none';
        document.getElementById('tela-admin').style.display = tela === 'admin' ? 'block' : 'none';
        document.getElementById('tela-confirmacao').style.display = tela === 'confirmacao' ? 'flex' : 'none';
    }

    // Lógica para cadastrar novos produtos no sistema
    adicionarProdutoAoSistema() {
        const nome = document.getElementById('nome-produto').value;
        const preco = parseFloat(document.getElementById('preco-produto').value);
        const quantidade = parseInt(document.getElementById('quantidade-produto').value);
        
        if (nome === '' || isNaN(preco) || preco <= 0 || isNaN(quantidade) || quantidade <= 0) {
            alert('Por favor, preencha todos os campos corretamente!');
            return;
        }
        
        const produtoExistente = this.produtos.find(p => p.nome.toLowerCase() === nome.toLowerCase());
        
        if (produtoExistente) {
            produtoExistente.quantidade += quantidade;
            produtoExistente.preco = preco;
            alert(`Produto "${nome}" atualizado no stock!`);
        } else {
            // USO DA SUA CLASSE PRODUTO (MODELO)
            const novoProduto = new Produto(
                this.produtos.length + 1, 
                nome, 
                preco, 
                quantidade
            );
            this.produtos.push(novoProduto);
            alert(`Produto "${nome}" cadastrado com sucesso!`);
        }
        
        // Limpa o formulário
        document.getElementById('nome-produto').value = '';
        document.getElementById('preco-produto').value = '';
        document.getElementById('quantidade-produto').value = '';
        
        this.atualizarInterface();
    }

    // Adiciona o produto ao carrinho e reduz o stock
    comprar(id) {
        const produto = this.produtos.find(p => p.id === id);
        if (produto && produto.quantidade > 0) {
            produto.quantidade--; // Reduz stock real
            this.carrinho.adicionar(produto);
            this.atualizarInterface();
        } else {
            alert("Desculpe, este produto esgotou!");
        }
    }

    // Finaliza a compra e limpa o carrinho
    encerrarCompra() {
        if (this.carrinho.totalItens === 0) {
            alert("O seu carrinho está vazio!");
            return;
        }
        this.carrinho.limpar();
        this.mostrarTela('confirmacao');
        this.atualizarInterface();
    }

    removerProduto(id) {
    const index = this.produtos.findIndex(p => p.id === id);
    if (index !== -1) {
        const nome = this.produtos[index].nome;
        this.produtos.splice(index, 1);
        alert(`Produto "${nome}" removido com sucesso!`);
        this.atualizarInterface();
    }
}

atualizarInterface() {
    this.view.renderizarCatalogo(this.produtos, (id) => this.comprar(id));
    this.view.renderizarResumoCarrinho(this.carrinho);
    this.view.renderizarTabelaAdmin(this.produtos, (id) => this.removerProduto(id)); // <- callback adicionado
}
}