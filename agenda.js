var buttonNovoEvento = document.getElementById('buttonNovoEvento');
var buttonCancelar = document.getElementById('buttonCancelar');
var novoEvento = document.getElementById('novoEvento');
var formNovoEvento = document.getElementById('formNovoEvento');
var inputNomeEvento = document.getElementById('nomeEvento');
var inputDataEvento = document.getElementById('dataEvento');
var divMensagemErro = document.getElementById('mensagemErro');
var tabelaEventos = document.getElementById('tabelaEventos');

var listaEventos = [];

/*var eventoExemplo = {
    nome: 'Evento exemplo',
    data: new Date(),
};
listaEventos.push(eventoExemplo); */

function removerEvento(event){
    var posicao = event.target.getAttribute('data-evento');
    listaEventos.splice(posicao, 1);
    atualizarTabelaEventos();
    //console.log('Remover evento na posição: ' + posicao );
}

function atualizarTabelaEventos(){
    console.log('Chamado atualizar tabela eventos');
    if (listaEventos.length === 0) {
        tabelaEventos.innerHTML = '<tr><td colspan="3">Nenhum evento</td></tr>';
        return;
    }
    tabelaEventos.innerHTML ='';
    for (var i = 0; i<listaEventos.length; i++){
        var evento = listaEventos[i];
        var linha = document.createElement('tr');
        var celulaNome = document.createElement('td');
        var celulaData = document.createElement('td');
        var celulaAcoes = document.createElement('td');
        var botaoExcluir = document.createElement('button');
        botaoExcluir.setAttribute('data-evento', i);
        botaoExcluir.classList.add('btn');
        botaoExcluir.classList.add('btn-danger');
        botaoExcluir.classList.add('btn-sn');
        botaoExcluir.addEventListener('click', removerEvento);
        celulaNome.innerText = evento.nome;
        celulaData.innerText = evento.data;
        botaoExcluir.innerText = "Remover";
        celulaAcoes.appendChild(botaoExcluir);
        linha.appendChild(celulaNome);
        linha.appendChild(celulaData);
        linha.appendChild(celulaAcoes);
        tabelaEventos.appendChild(linha);
    }

}

function limparNovoEvento(){
    inputNomeEvento.value = '';
    inputDataEvento.value = '';
    inputNomeEvento.classList.remove('is-invalid');
    inputDataEvento.classList.remove('is-invalid');
    divMensagemErro.classList.add('d-none');
}

function mostrarNovoEvento(){
    //console.log(novoEvento.classList);
    novoEvento.classList.remove('d-none');    
}

function ocultarNovoEvento(){
    //console.log(novoEvento.classList);
    novoEvento.classList.add('d-none');
    limparNovoEvento();
}

function novoEventoValido(nomeEvento, dataEvento) {

    var validacaoOk = true;
    var erro = '';
    if (nomeEvento.trim().length === 0) {
        erro = 'O nome do evento é obrigatório!';
        inputNomeEvento.classList.add('is-invalid');
        validacaoOk = false;
    } else {
        inputNomeEvento.classList.remove('is-invalid');
    }
    var timestampEvento = Date.parse(dataEvento);
    var timestampAtual = (new Date()).getTime();
    if (isNaN(timestampEvento) || timestampEvento < timestampAtual) {
        if (erro.length > 0){
            erro += '<br>'
        }
        erro += 'A data do evento é obrigatória!';
        inputDataEvento.classList.add('is-invalid');
        validacaoOk = false;    
    } else {
        inputDataEvento.classList.remove('is-invalid');
    }

    if (!validacaoOk){
        divMensagemErro.innerHTML = erro;
        divMensagemErro.classList.remove('d-none');
    } else {
        divMensagemErro.classList.add('d-none');
    }

    return validacaoOk;
}

function salvarNovoEvento(event){
    //console.log(event);
    event.preventDefault();
    var nomeEvento = inputNomeEvento.value;
    var dataEvento = inputDataEvento.value;
    if (novoEventoValido(nomeEvento, dataEvento)){
        console.log('Evento é válido!')
        listaEventos.push({
            nome: nomeEvento,
            data: new Date (dataEvento),
        });
        atualizarTabelaEventos();
        ocultarNovoEvento();
    } else {
        console.log('Evento é inválido!')
    }
}

buttonNovoEvento.addEventListener('click', mostrarNovoEvento);
buttonCancelar.addEventListener('click', ocultarNovoEvento);
formNovoEvento.addEventListener('submit', salvarNovoEvento);
window.addEventListener('load', atualizarTabelaEventos);