const express = require('express');
const axios = require('axios');
const soap = require('soap');
const cors = require('cors');

const app = express();
app.use(cors());

// Rota para buscar endereço por CEP
app.get('/endereco/:cep', async (req, res) => {
  try {
    const cep = req.params.cep;
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.status === 200) {
      const endereco = {
        logradouro: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        estado: response.data.uf,
        cep: response.data.cep,
        dd: response.data.ddd,
      };
      res.json(endereco);
    } else {
      res.status(500).json({ message: 'Erro ao buscar endereço' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar endereço', error: error });
  }
});

// Rota para calcular o frete com base no CEP
app.get('/frete/:cep', async (req, res) => {
  try {
    const cep = req.params.cep;
    const url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl';

    const args = {
      nCdEmpresa: '', // Seu código de empresa nos Correios, se houver
      sDsSenha: '', // Sua senha nos Correios, se houver
      nCdServico: '04014', // Código do serviço - 04014 é o código para SEDEX à vista
      sCepOrigem: '37524-000', // CEP de origem
      sCepDestino: cep, // CEP de destino
      nVlPeso: '1', // Peso da encomenda em quilogramas
      nCdFormato: '3', // Formato da encomenda (1 é caixa/pacote, 2 é rolo/prisma, 3 é envelope)
      nVlComprimento: '5', // Comprimento da encomenda em centímetros
      nVlAltura: '8', // Altura da encomenda em centímetros
      nVlLargura: '0', // Largura da encomenda em centímetros
      nVlDiametro: '0', // Diâmetro da encomenda em centímetros
      sCdMaoPropria: 'n', // Indica se a encomenda será entregue em mãos ('s' ou 'n')
      nVlValorDeclarado: '0', // Valor declarado da encomenda, para fins de seguro
      sCdAvisoRecebimento: 'n' // Indica se a encomenda requer aviso de recebimento ('s' ou 'n')
    };

    soap.createClientAsync(url).then((client) => {
      return client.CalcPrecoPrazoAsync(args);
    }).then((result) => {
      res.json(result[0].CalcPrecoPrazoResult.Servicos.cServico);
    }).catch((err) => {
      res.status(500).json({ message: 'Erro ao calcular o frete', error: err });
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao calcular o frete', error: error });
  }
});

// Ouvir na porta 3000
app.listen(3000, () => {
  console.log('API iniciada na porta 3000');
});
