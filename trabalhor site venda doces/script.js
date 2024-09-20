let estoque = 20;
let fiados = {};

function atualizarEstoque() {
    document.getElementById("estoqueAtual").innerText = estoque;
}

function adicionarFiado() {
    const nome = document.getElementById("nome").value.trim();
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if (!nome || isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira um nome válido e uma quantidade maior que 0.");
        return;
    }

    if (quantidade > estoque) {
        alert("Não há estoque suficiente!");
        return;
    }

    if (fiados[nome]) {
        fiados[nome] += quantidade;
    } else {
        fiados[nome] = quantidade;
    }

    estoque -= quantidade;

    atualizarEstoque();
    atualizarListaFiados();
    limparFormulario();
}

function atualizarListaFiados() {
    const tbody = document.getElementById("listaFiados");
    tbody.innerHTML = ""; // Limpar a tabela

    for (const nome in fiados) {
        const row = document.createElement("tr");

        const cellNome = document.createElement("td");
        cellNome.textContent = nome;

        const cellQuantidade = document.createElement("td");
        cellQuantidade.textContent = fiados[nome];

        const cellAcoes = document.createElement("td");

        // Botão Editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.classList.add("action-btn", "edit-btn");
        btnEditar.onclick = () => editarFiado(nome);
        cellAcoes.appendChild(btnEditar);

        // Botão Excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.classList.add("action-btn", "delete-btn");
        btnExcluir.onclick = () => excluirFiado(nome);
        cellAcoes.appendChild(btnExcluir);

        row.appendChild(cellNome);
        row.appendChild(cellQuantidade);
        row.appendChild(cellAcoes);

        tbody.appendChild(row);
    }
}

function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("quantidade").value = "";
}

function editarFiado(nome) {
    const novaQuantidade = parseInt(prompt(`Digite a nova quantidade para ${nome}:`, fiados[nome]));

    if (isNaN(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida.");
        return;
    }

    const quantidadeAtual = fiados[nome];
    const diferenca = novaQuantidade - quantidadeAtual;

    if (diferenca > 0) { // Adicionando mais
        if (diferenca > estoque) {
            alert("Não há estoque suficiente para aumentar a quantidade.");
            return;
        }
        estoque -= diferenca;
    } else { // Removendo
        estoque += Math.abs(diferenca);
    }

    if (novaQuantidade === 0) {
        delete fiados[nome];
    } else {
        fiados[nome] = novaQuantidade;
    }

    atualizarEstoque();
    atualizarListaFiados();
}

function excluirFiado(nome) {
    if (confirm(`Tem certeza que deseja excluir o fiado de ${nome}?`)) {
        const quantidade = fiados[nome];
        estoque += quantidade;
        delete fiados[nome];
        atualizarEstoque();
        atualizarListaFiados();
    }
}

function editarEstoque() {
    const novaQuantidade = parseInt(prompt("Digite a nova quantidade de estoque:", estoque));

    if (isNaN(novaQuantidade) || novaQuantidade < 0) {
        alert("Quantidade inválida.");
        return;
    }

    // Atualizar o estoque
    estoque = novaQuantidade;

    atualizarEstoque();
    alert("Estoque atualizado com sucesso!");
}

// Inicializa o estoque na página
atualizarEstoque();
