export function converterParaFormatoOriginal(iso8601) {
  let data = new Date(iso8601);
  data = new Date(data.toLocaleString('en-US', { timeZone: 'UTC' }));

  // Obtém os componentes de ano, mês e dia
  const ano = data.getFullYear();
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
  const dia = data.getDate().toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário

  // Formata a data no formato 'yyyy-mm-dd'
  const formatoOriginal = `${ano}-${mes}-${dia}`;

  return formatoOriginal;
}

export function converterParaFormatoDdMmYyyy(iso8601) {
  let data = new Date(iso8601);
  data = new Date(data.toLocaleString('en-US', { timeZone: 'UTC' }));

  // Obtém os componentes de dia, mês e ano
  const dia = data.getDate().toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Adiciona zero à esquerda se necessário
  const ano = data.getFullYear();

  // Formata a data no formato 'dd/mm/yyyy'
  const formatoDdMmYyyy = `${dia}/${mes}/${ano}`;

  return formatoDdMmYyyy;
}