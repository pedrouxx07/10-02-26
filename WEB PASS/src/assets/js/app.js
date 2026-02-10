let pacientes = [];
let atendimentos = [];

function salvarPaciente() {
  const nome = nomePaciente.value.trim();
  const contato = contatoPaciente.value.trim();

  if (!nome || !contato) {
    alert('Preencha nome e contato');
    return;
  }

  const paciente = {
    id: Date.now(),
    nome,
    contato,
    obs: obsPaciente.value
  };

  pacientes.push(paciente);
  renderPacientes();

  nomePaciente.value = '';
  contatoPaciente.value = '';
  obsPaciente.value = '';
}

function excluirPaciente(id) {
  if (!confirm('Deseja excluir este paciente?')) return;

  pacientes = pacientes.filter(p => p.id !== id);
  renderPacientes();
}

function editarPaciente(id) {
  const paciente = pacientes.find(p => p.id === id);
  if (!paciente) return;

  nomePaciente.value = paciente.nome;
  contatoPaciente.value = paciente.contato;
  obsPaciente.value = paciente.obs;

  excluirPaciente(id);
}

function renderPacientes() {
  listaPacientes.innerHTML = '';
  pacienteAtendimento.innerHTML = '';

  pacientes.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${p.nome} – ${p.contato}
      <div>
        <button onclick="editarPaciente(${p.id})"></button>
        <button onclick="excluirPaciente(${p.id})"></button>
      </div>
    `;
    listaPacientes.appendChild(li);

    const option = document.createElement('option');
    option.textContent = p.nome;
    pacienteAtendimento.appendChild(option);
  });
}

function salvarAtendimento() {
  const paciente = pacienteAtendimento.value;
  const data = dataAtendimento.value;
  const hora = horaAtendimento.value;
  const status = statusAtendimento.value;
  const tipo = tipoAtendimento.value;

  if (!paciente || !data || !hora) {
    alert('Preencha todos os campos');
    return;
  }

  const conflito = atendimentos.find(
    a => a.data === data && a.hora === hora
  );

  if (conflito) {
    alert('Já existe atendimento nesse horário');
    return;
  }

  atendimentos.push({ paciente, data, hora, status, tipo });
  renderAtendimentos();
}

function cancelarAtendimento(index) {
  if (!confirm('Cancelar este atendimento?')) return;

  atendimentos.splice(index, 1);
  renderAtendimentos();
}

function renderAtendimentos(lista = atendimentos) {
  listaAtendimentos.innerHTML = '';

  lista.forEach((a, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${a.data} ${a.hora} – ${a.paciente}
      <span class="status-${a.status}">${a.status}</span>
      <button onclick="cancelarAtendimento(${index})"></button>
    `;
    listaAtendimentos.appendChild(li);
  });
}

function filtrarAtendimentos() {
  const data = filtroData.value;
  if (!data) return;

  const filtrados = atendimentos.filter(a => a.data === data);
  renderAtendimentos(filtrados);
}

