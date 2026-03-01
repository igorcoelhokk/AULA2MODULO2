import express from "express";

const host = "0.0.0.0";
const porta = 3000;

const app = express();
var lista_usuarios = [];
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.write(`
        <!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Meu Formulario</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  </head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
    <form class="row g-3 mt-5 needs-validation" action="/salvar" method="POST" novalidate>
        
        <div class="col-md-4">
            <label for="validationCustom01" class="form-label">Nome</label>
            <input type="text" class="form-control" id="validationCustom01" name="nome" placeholder="Escreva seu nome" required>
        </div>

        <div class="col-md-4">
            <label for="validationCustom02" class="form-label">Sobrenome</label>
            <input type="text" class="form-control" id="validationCustom02" name="sobrenome" placeholder="Escreva seu sobrenome" required>
        </div>

        <div class="col-md-6">
            <label for="validationCustom03" class="form-label">Cidade</label>
            <input type="text" class="form-control" id="validationCustom03" name="cidade" required>
            <div class="invalid-feedback">
                Por favor, forneça uma cidade válida.
            </div>
        </div>

        <div class="col-md-3">
            <label for="validationCustom04" class="form-label">Estado</label>
            <select class="form-select" id="validationCustom04" name="uf" required>
                <option selected disabled value="">Escolha...</option>
                  <option value="AC">Acre (AC)</option>
                  <option value="AL">Alagoas (AL)</option>
                  <option value="AP">Amapá (AP)</option>
                  <option value="AM">Amazonas (AM)</option>
                  <option value="BA">Bahia (BA)</option>
                  <option value="CE">Ceará (CE)</option>
                  <option value="DF">Distrito Federal (DF)</option>
                  <option value="ES">Espírito Santo (ES)</option>
                  <option value="GO">Goiás (GO)</option>
                  <option value="MA">Maranhão (MA)</option>
                  <option value="MT">Mato Grosso (MT)</option>
                  <option value="MS">Mato Grosso do Sul (MS)</option>
                  <option value="MG">Minas Gerais (MG)</option>
                  <option value="PA">Pará (PA)</option>
                  <option value="PB">Paraíba (PB)</option>
                  <option value="PR">Paraná (PR)</option>
                  <option value="PE">Pernambuco (PE)</option>
                  <option value="PI">Piauí (PI)</option>
                  <option value="RJ">Rio de Janeiro (RJ)</option>
                  <option value="RN">Rio Grande do Norte (RN)</option>
                  <option value="RS">Rio Grande do Sul (RS)</option>
                  <option value="RO">Rondônia (RO)</option>
                  <option value="RR">Roraima (RR)</option>
                  <option value="SC">Santa Catarina (SC)</option>
                  <option value="SP">São Paulo (SP)</option>
                  <option value="SE">Sergipe (SE)</option>
                  <option value="TO">Tocantins (TO)</option>
            </select>
            <div class="invalid-feedback">
                Por favor, selecione um estado válido.
            </div>
        </div>

        <div class="col-md-3">
            <label for="validationCustom05" class="form-label">CEP</label>
            <input type="text" class="form-control" id="validationCustom05" name="cep" required>
            <div class="invalid-feedback">
                Por favor, forneça um CEP válido.
            </div>
        </div>

        <div class="col-12">
            <button class="btn btn-primary" type="submit" name="salvar">Enviar formulário</button>
        </div>
    </form>
</body>
</html>
    `);

  res.end();
});

app.post("/salvar", (req, res) => {
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const cidade = req.body.cidade;
  const uf = req.body.uf;
  const cep = req.body.cep;

  lista_usuarios.push({
    nome: nome,
    sobrenome: sobrenome,
    cidade: cidade,
    uf: uf,
    cep: cep,
  });
  res.redirect("/lista_usuarios");
});

app.get("/lista_usuarios", (req, res) => {
  let linhas = "";

  lista_usuarios.forEach((usuario, index) => {
    linhas += `
        <tr>
            <td>${usuario.nome}</td>
            <td>${usuario.sobrenome}</td>
            <td>${usuario.cidade}</td>
            <td>${usuario.uf}</td>
            <td>${usuario.cep}</td>
            <td>
                <a href="/editar/${index}">Editar</a> | 
                <a href="/excluir/${index}">Excluir</a>
            </td>
        </tr>
    `;
  });

  res.send(`
    <!doctype html>
    <html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Lista de Usuários</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h2>Lista de Usuários Cadastrados</h2>
            <a href="/" class="btn btn-primary mb-3">Novo Cadastro</a>
            
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>CEP</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${linhas}
                </tbody>
            </table>
            
            <p>Total de usuários: ${lista_usuarios.length}</p>
        </div>
    </body>
    </html>
  `);
});

app.get("/editar/:id", (req, res) => {
  const id = req.params.id;
  const usuario = lista_usuarios[id];

  if (!usuario) {
    return res.send("Usuário não encontrado!");
  }

  res.send(`
    <!doctype html>
    <html lang="pt-br">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Editar Usuário</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <h2>Editar Usuário</h2>
            <form action="/atualizar/${id}" method="POST">
                <div class="mb-3">
                    <label class="form-label">Nome</label>
                    <input type="text" class="form-control" name="nome" value="${usuario.nome}" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Sobrenome</label>
                    <input type="text" class="form-control" name="sobrenome" value="${usuario.sobrenome}" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Cidade</label>
                    <input type="text" class="form-control" name="cidade" value="${usuario.cidade}" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">UF</label>
                    <select class="form-select" name="uf" required>
                        <option value="AC" ${usuario.uf === "AC" ? "selected" : ""}>Acre (AC)</option>
                        <option value="AL" ${usuario.uf === "AL" ? "selected" : ""}>Alagoas (AL)</option>
                        <option value="AP" ${usuario.uf === "AP" ? "selected" : ""}>Amapá (AP)</option>
                        <option value="AM" ${usuario.uf === "AM" ? "selected" : ""}>Amazonas (AM)</option>
                        <option value="BA" ${usuario.uf === "BA" ? "selected" : ""}>Bahia (BA)</option>
                        <option value="CE" ${usuario.uf === "CE" ? "selected" : ""}>Ceará (CE)</option>
                        <option value="DF" ${usuario.uf === "DF" ? "selected" : ""}>Distrito Federal (DF)</option>
                        <option value="ES" ${usuario.uf === "ES" ? "selected" : ""}>Espírito Santo (ES)</option>
                        <option value="GO" ${usuario.uf === "GO" ? "selected" : ""}>Goiás (GO)</option>
                        <option value="MA" ${usuario.uf === "MA" ? "selected" : ""}>Maranhão (MA)</option>
                        <option value="MT" ${usuario.uf === "MT" ? "selected" : ""}>Mato Grosso (MT)</option>
                        <option value="MS" ${usuario.uf === "MS" ? "selected" : ""}>Mato Grosso do Sul (MS)</option>
                        <option value="MG" ${usuario.uf === "MG" ? "selected" : ""}>Minas Gerais (MG)</option>
                        <option value="PA" ${usuario.uf === "PA" ? "selected" : ""}>Pará (PA)</option>
                        <option value="PB" ${usuario.uf === "PB" ? "selected" : ""}>Paraíba (PB)</option>
                        <option value="PR" ${usuario.uf === "PR" ? "selected" : ""}>Paraná (PR)</option>
                        <option value="PE" ${usuario.uf === "PE" ? "selected" : ""}>Pernambuco (PE)</option>
                        <option value="PI" ${usuario.uf === "PI" ? "selected" : ""}>Piauí (PI)</option>
                        <option value="RJ" ${usuario.uf === "RJ" ? "selected" : ""}>Rio de Janeiro (RJ)</option>
                        <option value="RN" ${usuario.uf === "RN" ? "selected" : ""}>Rio Grande do Norte (RN)</option>
                        <option value="RS" ${usuario.uf === "RS" ? "selected" : ""}>Rio Grande do Sul (RS)</option>
                        <option value="RO" ${usuario.uf === "RO" ? "selected" : ""}>Rondônia (RO)</option>
                        <option value="RR" ${usuario.uf === "RR" ? "selected" : ""}>Roraima (RR)</option>
                        <option value="SC" ${usuario.uf === "SC" ? "selected" : ""}>Santa Catarina (SC)</option>
                        <option value="SP" ${usuario.uf === "SP" ? "selected" : ""}>São Paulo (SP)</option>
                        <option value="SE" ${usuario.uf === "SE" ? "selected" : ""}>Sergipe (SE)</option>
                        <option value="TO" ${usuario.uf === "TO" ? "selected" : ""}>Tocantins (TO)</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">CEP</label>
                    <input type="text" class="form-control" name="cep" value="${usuario.cep}" required>
                </div>
                <button type="submit" class="btn btn-success">Salvar Alterações</button>
                <a href="/lista_usuarios" class="btn btn-secondary">Cancelar</a>
            </form>
        </div>
    </body>
    </html>
  `);
});

app.post("/atualizar/:id", (req, res) => {
  const id = req.params.id;

  lista_usuarios[id] = {
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    cidade: req.body.cidade,
    uf: req.body.uf,
    cep: req.body.cep,
  };

  res.redirect("/lista_usuarios");
});

app.get("/excluir/:id", (req, res) => {
  const id = req.params.id;
  lista_usuarios.splice(id, 1);
  res.redirect("/lista_usuarios");
});

app.listen(porta, host, () => {
  console.log(`Servidor rodando em http://${host}:${porta}`);
});
