<h1>Serviço de API de Endereço e Cálculo de Frete</h1>
<p>Este é um serviço de API construído com Node.js e Express.js, que utiliza bibliotecas como o Axios e o Soap para buscar endereços através de CEP e calcular o frete baseado em CEP.</p>

<h2>Pré-requisitos</h2>
<ul>
    <li>Node.js</li>
    <li>NPM</li>
</ul>

<h2>Instalação</h2>
<ol>
    <li>Clone o repositório para o seu computador.</li>
    <pre>git clone &lt;url-do-seu-repositorio&gt;</pre>
    <li>Navegue até a pasta do projeto.</li>
    <pre>cd Api_Endereco_de_Entrega</pre>
    <li>Instale as dependências.</li>
    <pre>npm install express soap cors</pre>
</ol>

<h2>Uso</h2>
<p>Após a instalação, você pode iniciar o servidor com o seguinte comando:</p>
<pre>node server.js</pre>
<p>Para rodar o server.js e iniciar seu servidor automaticamente em qualquer sistema operacional e também mantê-lo em execução caso ele falhe, siga as instruções abaixo:</p>
<ol>
    <li>Instale o pm2 globalmente usando o npm com o comando:</li>
    <pre>npm install pm2 -g</pre>
    <li>Inicie seu servidor com pm2 usando o comando:</li>
    <pre>pm2 start server.js</pre>
    <li>Configure o pm2 para iniciar automaticamente na inicialização com o comando:</li>
    <pre>pm2 startup</pre>
    <li>Salve a configuração atual do pm2 com o comando:</li>
    <pre>pm2 save</pre>
    <img>https://carbon.now.sh/7da1a283-68ce-4479-b83b-44361c8a6ecf</img>
</ol>
<p>O servidor estará ouvindo na porta 3000 para a primeira aplicação e na porta 4000 para a segunda aplicação.</p>
<p>Existem duas rotas disponíveis:</p>
<ul>
    <li>/endereco/:cep: Substitua :cep com um CEP válido para obter informações sobre esse endereço.</li>
    <li>/frete/:cep: Substitua :cep com um CEP válido para calcular o frete para esse CEP.</li>
</ul>
<p>Lista de Códigos dos Serviços dos Correios (Alguns desses códigos podem ser descontinuados, fique atento a possíveis atualizações pelo site dos Correios):</p>
<ul>
    <li>SEDEX à vista: 04014</li>
    <li>SEDEX 10: 40215</li>
    <li>SEDEX Hoje: 40290</li>
    <li>SEDEX a Cobrar: 40126</li>
    <li>PAC à vista: 04510</li>
    <li>PAC a Cobrar: 04707</li>
    <li>Carta Comercial: 10065</li>
    <li>Carta Não Comercial: 10138</li>
    <li>Carta Registrada: 10014</li>
    <li>Aerograma Nacional: 10689</li>
</ul>

<h2>Contribuição</h2>
<p>Contribuições são sempre bem-vindas. Sinta-se à vontade para abrir uma issue ou um pull request.</p>

<h2>Licença</h2>
<p>MIT</p>

<p>Substitua &lt;url-do-seu-repositorio&gt; pelo URL real do seu repositório. Este exemplo de README é bem básico. Você pode adicionar mais seções como 'Testes', 'Deployment', etc., de acordo com as necessidades do seu projeto.</p>
