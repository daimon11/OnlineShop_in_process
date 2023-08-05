export const loadGoods = async (url) => {
  const result = await fetch(url);
  const data = await result.json();

  console.log('data load', data);
  return data.data;
};

export const loadAutor = async (userId) => {
  const item = await fetch(`https://gorest.co.in/public-api/users/${userId}`);
  const autorArr = await item.json();
  return autorArr.data;
};

export const loadArticle = async (id) => {
  const item = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
  const data = await item.json();
  return data.data;
};

export const loadProducts = (url, {
  methed = 'get',
  callback,
  body = {},
  headers,
  parentEl = null,
  elements = null,
}) => {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(methed, url);
  
      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value);
        }
      }
  
      xhr.addEventListener('load', () => {
        if (xhr.status < 200 || xhr.status >= 300) {
          return callback(new Error(xhr.status), xhr.response);
        }
  
        let data = JSON.parse(xhr.response);
        console.log('httpRequest data = ', data);
        if (url.includes("discount")) data = data.filter(item => +item.discount > 0);
        if (callback) resolve(callback(data, elements));
        ;
      });
  
      xhr.addEventListener('error', () => {
        return callback(new Error(xhr.status), xhr.response);
      });
  
      xhr.send(JSON.stringify(body));
    } catch (err) {
      reject(callback(new Error(err)));
    }
  })
  
};