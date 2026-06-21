// ============================================================
// GOOGLE APPS SCRIPT — Receber RSVPs do Convite do Derick
// ============================================================
// Como usar:
//  1. Abra o Google Sheets e crie uma planilha nova
//  2. No menu: Extensões > Apps Script
//  3. Cole TODO este código substituindo o que já existe
//  4. Clique em "Implantar" > "Nova implantação"
//     - Tipo: Aplicativo web
//     - Executar como: Eu mesmo
//     - Quem tem acesso: Qualquer pessoa
//  5. Copie a URL gerada e cole em index.html na variável SHEETS_URL
// ============================================================

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Cria cabeçalho se a planilha estiver vazia
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Data/Hora',
        'Nome',
        'Casa de Hogwarts',
        'Presença',
        'Acompanhantes',
        'Mensagem'
      ]);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }

    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toLocaleString('pt-BR'),
      data.nome       || '—',
      data.casa       || '—',
      data.presenca   || '—',
      data.acompanhantes || '—',
      data.mensagem   || '—'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Função de teste — rode manualmente para verificar se funciona
function testar() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        nome: 'João Silva',
        casa: 'Grifinória',
        presenca: 'sim',
        acompanhantes: 'Maria Silva (Esposa), Pedro Silva (Filho)',
        mensagem: 'Vai ser incrível!',
        timestamp: new Date().toLocaleString('pt-BR')
      })
    }
  };
  const result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
