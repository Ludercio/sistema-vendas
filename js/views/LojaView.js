export class LojaView {
    
    renderizarTabelaAdmin(produtos) {
        const corpo = document.getElementById('corpo-tabela-produtos');
        corpo.innerHTML = '';
        
        if (produtos.length === 0) {
            corpo.innerHTML = '<tr><td colspan="4">Nenhum produto cadastrado</td></tr>';
            return;
        }
        
        for (let i = 0; i < produtos.length; i++) {
            const p = produtos[i];
            corpo.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.nome}</td>
                    <td>Mt ${p.preco.toFixed(2)}</td>
                    <td>${p.quantidade}</td>   <!-- MOSTRA A QUANTIDADE -->
                </tr>
            `;
        }
    }
    
   
    renderizarCatalogo(produtos) {
        const lista = document.getElementById('lista-produtos');
        lista.innerHTML = '';
        
        if (produtos.length === 0) {
            lista.innerHTML = '<p>Nenhum produto cadastrado. Vá em Administração para adicionar.</p>';
            return;
        }
        
        for (let i = 0; i < produtos.length; i++) {
            const p = produtos[i];
            lista.innerHTML += `
                <div class="card-produto">
                    <h3>${p.nome}</h3>
                    <p>Preço: Mt ${p.preco.toFixed(2)}</p>
                    <p>Estoque: ${p.quantidade} unidades</p>   <!-- MOSTRA A QUANTIDADE -->
                </div>
            `;
        }
    }
}