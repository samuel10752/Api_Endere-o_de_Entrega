// Função para abrir o popup
function abrirPopup() {
    const popup = document.getElementById('enderecoPopup');
    popup.style.display = 'block'; // Exibir o popup
}

// Função que busca o Cep 
async function buscarEndereco(cep) {
    const url = `http://localhost:3000/endereco/${cep}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        preencherEndereco(data);
    } catch (error) {
        console.log(error);
    }
}

// função que calcula o frete depois que buscado o cep
async function buscarFrete(cep) {
    const url = `http://localhost:3000/frete/${cep}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Dados processados', data);
        exibirFrete(data);
    } catch (error) {
        console.error('Erro ao buscar frete', error);
        exibirFrete({ erro: true });
    }
}

// Função ele exibi o frete e preencha os inputs indicados
function exibirFrete(data) {
    const freteInput = document.getElementById('frete');
    const prazoInput = document.getElementById('prazo');
    const obsInput = document.getElementById('obs'); // Assuming you have an input field with id 'obs'

    if (freteInput && prazoInput && obsInput) {
        // Check if there's an error or if the data array is empty
        if (data.erro || data.length === 0 || !data[0].Valor) {
            freteInput.value = 'Frete não encontrado';
            prazoInput.value = ''; // Clear the delivery time field in case of an error
            obsInput.value = ''; // Clear the 'obsFim' field in case of an error
        } else {
            // Replace commas with dots and convert the string to a number
            const freightValue = parseFloat(data[0].Valor.replace(',', '.'));
            freteInput.value = 'R$ ' + freightValue.toFixed(2); // Show the value with two decimal places

            // Set the delivery time
            prazoInput.value = data[0].PrazoEntrega + ' dias'; // Append 'days' to the delivery time

            // Set the 'obsFim' value
            obsInput.value = data[0].obsFim;

            // If 'obsFim' is empty, set a default message
            if (data[0].obsFim === '') {
                obsInput.value = 'Nenhuma observação adicional.';
            }
        }
    }
}



// Função para preencher o endereço no formulário
function preencherEndereco(endereco) {
    const enderecoInput = document.getElementById('endereco');
    const numeroInput = document.getElementById('numero');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const ddInput = document.getElementById('dd');

    if (enderecoInput) {
        if (endereco.erro) {
            enderecoInput.value = 'Endereço não encontrado';
            numeroInput.value = '';
            bairroInput.value = '';
            cidadeInput.value = '';
            estadoInput.value = '';
            ddInput.value = '';
        } else {
            enderecoInput.value = endereco.logradouro || '';
            numeroInput.value = '';
            bairroInput.value = endereco.bairro || '';
            cidadeInput.value = endereco.cidade || '';
            estadoInput.value = endereco.estado || '';
            ddInput.value = endereco.dd || '';
        }
    }
}



// Função para lidar com o envio do formulário
function handleSubmit(event) {
    event.preventDefault(); // Impedir o envio do formulário

    const cep = document.getElementById('cep').value;
    buscarEndereco(cep);
}

// Função que limita os caracteres do dd para celular
function limitarCaracteres(input, maxLength) {
    const warningMessage = document.getElementById("warningMessage_dd");

    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength); // Limita o número de caracteres
        warningMessage.innerText = "O número de dígitos deve ser no máximo 8.";
        input.classList.add("error-input"); // Adiciona a classe CSS para destacar o campo em vermelho
    } else if (input.value.length === 0) {
        warningMessage.innerText = "Você deve incluir o código do país."; // Adiciona mensagem de aviso quando a caixa estiver vazia
        input.classList.add("error-input"); // Adiciona a classe CSS para destacar o campo em vermelho
    } else {
        warningMessage.innerText = ""; // Limpa a mensagem de aviso
        input.classList.remove("error-input"); // Remove a classe CSS caso o valor seja válido
    }
}

// Função que verificada o numero inserido é valido e não pode colocar mais de 12 digitos
function validarTelefone(input) {
    const warningMessage = document.getElementById("warningMessage_telefone");
    const numericValue = input.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (numericValue !== input.value) {
        input.value = numericValue; // Atualiza o valor do campo de input para conter apenas números
        input.classList.add("error-input"); // Adiciona a classe CSS para destacar o campo em vermelho
        warningMessage.innerText = "Insira 10 ou 11 dígitos.";
    } else if (input.value.length === 0) {
        warningMessage.innerText = "Insira o seu número de celular."; // Adiciona mensagem de aviso quando a caixa estiver vazia
        input.classList.add("error-input"); // Adiciona a classe CSS para destacar o campo em vermelho
    } else if (numericValue.length > 8) {
        input.value = numericValue.slice(0, 9); // Limita o número de dígitos para 8
        var numericos = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        var formatado = numericos.replace(/(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
        input.value = formatado;
        input.classList.add("error-input"); // Adiciona a classe CSS para destacar o campo em vermelho
        warningMessage.innerText = "Insira no máximo 9 dígitos.";
    } else {
        var numericos = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        var formatado = numericos.replace(/(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
        input.value = formatado;
        input.classList.remove("error-input"); // Remove a classe CSS caso o valor seja válido
        warningMessage.innerText = ""; // Limpa a mensagem de aviso
    }
}

// função de letra para que preenchar o campo
function validarLetras(input) {
    const warningMessage = document.getElementById("warningMessage_nome");
    const alphaRegex = /^[a-zA-Z\s]*$/; // Expressão regular para letras e espaços

    if (!alphaRegex.test(input.value)) {
        input.classList.add("error-input"); // Adiciona a classe CSS para destacar o campo em vermelho
        warningMessage.innerText = "Favor adicionar um nome para contato.";
    } else if (input.value.length === 0) {
        warningMessage.innerText = "Este campo é obrigatório."; // Adiciona mensagem de aviso quando a caixa estiver vazia
        input.classList.add("error-input"); // Adiciona a classe CSS para destacar o campo em vermelho
    } else {
        warningMessage.innerText = ""; // Limpa a mensagem de aviso
        input.classList.remove("error-input"); // Remove a classe CSS caso o valor seja válido
    }
}

// Função que ele valida o numero do celular inserido e que também so pode entrar numeros no input
function validarNumeros(input) {
    var num = input.value.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
    input.value = num;
    var numericos = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    var formatado = numericos.replace(/(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
    input.value = formatado;
}

// Função que ele formata como é inserido o CEP (EX:11111-111) e que também so pode entrar numeros no input
function formatarCEP(input) {
    var num = input.value.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
    input.value = num;
    const cep = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const cepFormatado = cep.replace(/(\d{5})(\d{3})/, '$1-$2'); // Formata o CEP para "37557-027"
    input.value = cepFormatado;

    const cepNumerico = cep.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do CEP formatado
    buscarEndereco(cepNumerico); // Chama a função buscarEndereco() com o valor formatado do CEP
}

// Foi descontinuadao pois não havia nescessidade.

// Função que ele valida o CPF inserido e que também so pode entrar numeros no input
// function validarNumerosCPF(input) {
//     var num = input.value.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
//     input.value = num;
//     const value = input.value.replace(/[^0-9]/g, '');
//     if (value.length > 11) {
//         input.value = value.slice(0, 11);
//     } else {
//         input.value = value;
//     }
// }

// Função que ele formata como é inserido o CPF (EX:111.111.111-11) e que também so pode entrar numeros no input
// function formatarCPF(input) {
//     var num = input.value.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
//     input.value = num;
//     let cpf = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
//     cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'); // Formata o CPF para "000.000.000-00"
//     input.value = cpf;
// }

// Função que ele valida o Estado inserido e que também so pode entrar lentras no input
function validarEstado(input) {
    var letras = input.value.replace(/[^a-zA-Z]/g, ""); // Remove todos os caracteres não alfabéticos
    input.value = letras;
    const errorDiv = document.getElementById('estado-error');
    if (input.value === '') {
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'Por favor, insira o estado.';
        input.style.border = '1px solid red';  // faz a borda ficar vermelha
    } else {
        errorDiv.style.display = 'none';
        input.style.border = '';  // remove a borda vermelha
    }
}

// Função que ele valida o Cidade inserido e que também so pode entrar letras no input
function validarCidade(input) {
    var letras = input.value.replace(/[^a-zA-Z]/g, ""); // Remove todos os caracteres não alfabéticos
    input.value = letras;
    const errorDiv = document.getElementById('cidade-error');
    if (input.value === '') {
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'Por favor, insira a cidade.';
        input.style.border = '1px solid red';  // faz a borda ficar vermelha
    } else {
        errorDiv.style.display = 'none';
        input.style.border = '';  // remove a borda vermelha
    }
}

// Função que ele valida o CEP inserido e que também so pode entrar numeros no input
function validarCEP(input) {
    var num = input.value.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
    input.value = num;
    const errorDiv = document.getElementById('cep-error');
    if (input.value === '') {
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'Por favor, insira o CEP.';
        input.style.border = '1px solid red';  // faz a borda ficar vermelha
    } else if (input.value.length !== 8) {
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'Por favor, insira um CEP válido.';
        input.style.border = '1px solid red';  // faz a borda ficar vermelha
    } else {
        errorDiv.style.display = 'none';
        input.style.border = '';  // remove a borda vermelha
    }
}

// Função que ele valida o Endereço inserido e que também so pode entrar letras no input
function validarEndereco(input) {
    var letras = input.value.replace(/[^a-zA-Z]/g, ""); // Remove todos os caracteres não alfabéticos
    input.value = letras;
    const errorDiv = document.getElementById('endereco-error');
    if (input.value === '') {
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'Por favor, insira o endereço.';
        input.style.border = '1px solid red';  // faz a borda ficar vermelha
    } else {
        errorDiv.style.display = 'none';
        input.style.border = '';  // remove a borda vermelha
    }
}

// Função que ele valida o Bairro inserido e que também so pode entrar letras no input
function validarBairro(input) {
    var letras = input.value.replace(/[^a-zA-Z]/g, ""); // Remove todos os caracteres não alfabéticos
    input.value = letras;
    const errorDiv = document.getElementById('bairro-error');
    if (input.value === '') {
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'Por favor, insira o bairro.';
        input.style.border = '1px solid red';  // faz a borda ficar vermelha
    } else {
        errorDiv.style.display = 'none';
        input.style.border = '';  // remove a borda vermelha
    }
}

// Função que ele valida o Apto (Complementos) inserido e que também so pode entrar letras no input
function validarApto(input) {
    var letras = input.value.replace(/[^a-zA-Z]/g, ""); // Remove todos os caracteres não alfabéticos
    input.value = letras;
    const errorDiv = document.getElementById('apto-error');
    if (input.value === '') {
        errorDiv.style.display = 'block';
        errorDiv.innerText = 'Por favor, insira o número do apartamento.';
        input.style.border = '1px solid red';  // faz a borda ficar vermelha
    } else {
        errorDiv.style.display = 'none';
        input.style.border = '';  // remove a borda vermelha
    }
}

// Função que ele valida o Numero da Casa inserido e que também so pode entrar numeros no input
function validarNumero(input) {
    var checkbox = document.getElementById('semNumero');
    const errorDiv = document.getElementById('numero-error');

    // Verifica se o campo de número está desabilitado
    if (input.disabled) {
        errorDiv.style.display = 'none';
        input.style.border = '';  // remove a borda vermelha
    } else {
        var num = input.value.replace(/[^0-9]/g, ''); // Remove todos os caracteres não numéricos
        input.value = num;
        if (input.value === '') {
            // Exibe a mensagem de erro se o campo de número estiver vazio e o checkbox não estiver marcado
            if (!checkbox.checked) {
                errorDiv.style.display = 'block';
                errorDiv.innerText = 'Por favor, insira o número.';
                input.style.border = '1px solid red';  // faz a borda ficar vermelha
            } else {
                errorDiv.style.display = 'none';
                input.style.border = '';  // remove a borda vermelha
            }
        } else {
            errorDiv.style.display = 'none';
            input.style.border = '';  // remove a borda vermelha
        }
    }
}

// Função que desabilita o input para inserir número da casa e coloca como não tem número S/N
function verificarSemNumero() {
    var checkbox = document.getElementById('semNumero');
    var numeroInput = document.getElementById('numero');

    if (checkbox.checked) {
        numeroInput.value = 'S/N';
        numeroInput.disabled = true;  // Desativa o campo para impedir modificações
        numeroInput.removeAttribute('required');  // Remove o atributo 'required'
    } else {
        numeroInput.value = '';
        numeroInput.disabled = false;  // Reativa o campo para permitir modificações
        numeroInput.setAttribute('required', '');  // Adiciona novamente o atributo 'required'
    }
    // Chamada para validarNumero para atualizar a borda e o texto de erro
    validarNumero(numeroInput);
}


// Função para abrir o modal
function exibirEndereco() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// Função para fechar o modal e limpar os inputs
function fecharPopup() {
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
        modals[i].style.display = "none";
    }

    var popups = document.getElementsByClassName("popup");
    for (var j = 0; j < popups.length; j++) {
        popups[j].style.display = "none";
    }

    // Limpar os campos de input
    // Adicione aqui o código para limpar os outros campos de input
    document.getElementById("nome").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("prazo").value = "";
    document.getElementById("frete").value = "";
    document.getElementById("obs").value = "";
    document.getElementById("estado").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("dd").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("apto").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("info").value = "";
    document.getElementById("commercial").value = "";
    document.getElementById("residential").value = "";
}


// Função para salvar as informações e fechar o modal
function salvarInformacoes() {
    var nome = document.getElementById("nome").value;
    var cep = document.getElementById("cep").value;
    var prazo = document.getElementById("prazo").value;
    var frete = document.getElementById("frete").value;
    var obs = document.getElementById("obs").value;
    var estado = document.getElementById("estado").value;
    var cidade = document.getElementById("cidade").value;
    var dd = document.getElementById("dd").value;
    var Telefone = document.getElementById("telefone").value;
    var endereco = document.getElementById("endereco").value;
    var bairro = document.getElementById("bairro").value;
    var apto = document.getElementById("apto").value;
    var numero = document.getElementById("numero").value;
    var info = document.getElementById("info").value;
    var commercial = document.getElementById("commercial").value;
    var residential = document.getElementById("residential").value;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (
        nome === "" ||
        cep === "" ||
        prazo === "" ||
        frete === "" ||
        obs === "" ||
        estado === "" ||
        cidade === "" ||
        dd === "" ||
        Telefone === "" ||
        endereco === "" ||
        bairro === "" ||
        numero === "" ||
        commercial === "" ||
        residential === ""
    ) {
        // mensagem de alerta personalizado
        swal("Por favor, preencha todos os campos obrigatórios.");
        return;

    }

    // Salvar as informações localmente usando o localStorage
    localStorage.setItem("nome", nome);
    localStorage.setItem("cep", cep);
    localStorage.setItem("prazo", prazo);
    localStorage.setItem("frete", frete);
    localStorage.setItem("obs", obs);
    localStorage.setItem("estado", estado);
    localStorage.setItem("cidade", cidade);
    localStorage.setItem("telefone", Telefone);
    localStorage.setItem("endereço", endereco);
    localStorage.setItem("bairro", bairro);
    localStorage.setItem("apto", apto);
    localStorage.setItem("numero", numero);
    localStorage.setItem("info", info);
    localStorage.setItem("commercial", commercial);
    localStorage.setItem("residencial", residential);

    fecharPopup();
}


// Evento de clique no botão "Confirmar"
document.getElementById("enderecoPopup").onclick = exibirEndereco;

// Evento de clique fora do modal para fechá-lo
window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        fecharPopup();
    }

}