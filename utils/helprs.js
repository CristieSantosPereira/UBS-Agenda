// Exemplo de helper para formatar datas
function formatarDataBR(dataISO) {
  if (!dataISO) return '';
  const [ano, mes, dia] = dataISO.split('-');
  return `${dia}/${mes}/${ano}`;
}

module.exports = {
  formatarDataBR,
};