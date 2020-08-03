const keywordsResultMessage = (keywordsArr) => {
  let message;

  const result = keywordsArr.reduce((acc, item) => {
    if (acc[item]) {
      acc[item] += 1;
    } else {
      acc[item] = 1;
    }
    return acc;
  }, {});

  const array = Object.entries(result);

  array.sort((a, b) => b[1] - a[1]);

  if (array.length <= 3) {
    let keywords = '';
    array.forEach((keyword) => {
      keywords += `${keyword[0]}, `;
    });
    keywords = keywords.slice(0, -2);
    message = `<span class="result__keyword">${keywords}</span>`;
  }
  if (array.length > 3) {
    message = `<span class="result__keyword">${array[0][0]}, ${array[1][0]}</span> и <span class="result__keyword">${array.length - 2} другим</span>`;
  }

  return message;
};

export { keywordsResultMessage as default };
