/**
 * сервис для гет запроса
 *
 * @param {string} url
 * @param {options} - searchParams - опционально
 * @param {AbortSignal} [signal] - опционально
 * @returns {Promise} - reslove в формате JSON, либо reject
 */

export function fetcher(url, options = {}, signal) {
  const reqUrl = new URL(url);
  if (options) {
    Object.keys(options).forEach(k => {
      reqUrl.searchParams.set(k, options[k])
    })
  }
  return fetch(reqUrl, {
    method: 'GET',
    signal:signal,
  })
      .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка респонса ===> ' + response.statusText);
          }
          return response.json();
      })
      .catch(error => {
          throw error;
      });
}