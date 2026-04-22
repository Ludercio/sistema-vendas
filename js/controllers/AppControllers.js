import { LojaView } from '../views/LojaView.js';

export class AppControllers {
    constructor() {
        this.produtos = [];
        this.view = new LojaView();
    }

    iniciar() {
        document.getElementById('btn-navegar-loja').onclick = () => this.mostrarTela('loja');
        document.getElementById('btn-navegar-admin').onclick = () => this.mostrarTela('admin');
        document.getElementById('btn-voltar-loja').onclick = () => this.mostrarTela('loja');
        
     
        document.getElementById('form-produto').onsubmit = (e) => {
            e.preventDefault();
            this.adicionarProduto();
        };
        
        this.atualizarInterface();
    }

    mostrarTela(tela) {
        document.getElementById('tela-loja').style.display = tela === 'loja' ? 'flex' : 'none';
        document.getElementById('tela-admin').style.display = tela === 'admin' ? 'block' : 'none';
        document.getElementById('tela-confirmacao').style.display = tela === 'confirmacao' ? 'flex' : 'none';
    }

    adicionarProduto() {
        const nome = document.getElementById('nome-produto').value;
        const preco = parseFloat(document.getElementById('preco-produto').value);
        const quantidade = parseInt(document.getElementById('quantidade-produto').value);
        
       
        if (nome === '') {
            alert('Digite o nome do produto!');
            return;
        }
        if (isNaN(preco) || preco <= 0) {
            alert('Digite um preço válido!');
            return;
        }
        if (isNaN(quantidade) || quantidade <= 0) {
            alert('Digite a quantidade em estoque!');
            return;
        }
        
        // para caso o produto exista ele so somar a quantidadr
        const produtoExistente = this.produtos.find(p => p.nome.toLowerCase() === nome.toLowerCase());
        
        if (produtoExistente) {
            produtoExistente.quantidade += quantidade;
            produtoExistente.preco = preco;
            alert(`Produto "${nome}" já existe! Quantidade atualizada: +${quantidade} = ${produtoExistente.quantidade} unidades`);
        } else {
            const produto = {
                id: this.produtos.length + 1,
                nome: nome,
                preco: preco,
                quantidade: quantidade
            };
            this.produtos.push(produto);
            alert(`Produto "${nome}" adicionado com ${quantidade} unidades!`);
        }
        
      
        document.getElementById('nome-produto').value = '';
        document.getElementById('preco-produto').value = '';
        document.getElementById('quantidade-produto').value = '';
        
    
        this.atualizarInterface();
    }

    atualizarInterface() {
        this.view.renderizarCatalogo(this.produtos);
        this.view.renderizarTabelaAdmin(this.produtos);
    }
}