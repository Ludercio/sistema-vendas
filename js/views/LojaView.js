export class LojaView {
    
    // 1. Renderiza o Catálogo (Loja) com botões de compra
    renderizarCatalogo(produtos, callbackComprar) {
        const lista = document.getElementById('lista-produtos');
        lista.innerHTML = '';

        if (produtos.length === 0) {
            lista.innerHTML = '<p>Nenhum produto disponível no momento.</p>';
            return;
        }

        produtos.forEach(p => {
            const card = document.createElement('div');
            card.className = 'card-produto';
            card.innerHTML = `
                <div class="card-header">
                    <span class="stock-tag">${p.quantidade} em stock</span>
                </div>
                <h3>${p.nome}</h3>
                <p class="preco-tag">Mt ${p.preco.toFixed(2)}</p>
                <button class="btn-comprar" ${p.quantidade <= 0 ? 'disabled' : ''}>
                    ${p.quantidade > 0 ? 'Adicionar ao Carrinho' : 'Esgotado'}
                </button>
            `;

            // Configura o botão de compra
            const btn = card.querySelector('.btn-comprar');
            btn.onclick = () => callbackComprar(p.id);
            
            lista.appendChild(card);
        });
    }

    // 2. Atualiza os números do carrinho (Quantidade e Valor Total)
    renderizarResumoCarrinho(carrinho) {
        document.getElementById('qtd-total').innerText = carrinho.totalItens;
        document.getElementById('valor-total').innerText = carrinho.valorTotal.toFixed(2);
    }

    // 3. Renderiza a Tabela de Administração (Mantendo o trabalho dos colegas)
    renderizarTabelaAdmin(produtos) {
        const corpo = document.getElementById('corpo-tabela-produtos');
        corpo.innerHTML = '';
        
        if (produtos.length === 0) {
            corpo.innerHTML = '<tr><td colspan="4">Nenhum produto cadastrado</td></tr>';
            return;
        }
        
        produtos.forEach(p => {
            corpo.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.nome}</td>
                    <td>Mt ${p.preco.toFixed(2)}</td>
                    <td>${p.quantidade}</td>
                </tr>
            `;
        });
    }
}