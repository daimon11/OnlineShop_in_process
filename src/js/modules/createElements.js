export const createElements = (tagName, className, attributeName = null) => {
  const tag = document.createElement(`${tagName}`);
  if (typeof className === 'string') {
    tag.classList.add(`${className}`);
  } else {
    className.forEach(className => {
      tag.classList.add(className);
    });
  }

  attributeName ? Object.keys(attributeName).forEach(key => {
    tag.setAttribute(key, attributeName[key]);
  }) : '';
  
  return tag;
};

export const createLastLink = (data, category) => {
  console.log('createLastLink !!!', data);

  const breadcrumb = document.querySelector('.breadcrumb');

  const breadcrumbItem = createElements('li', 'breadcrumb__item');

  if (category) {
    breadcrumbItem.innerHTML = `
    <a href="./category.html?${data.category}" class="link-to-home">${data.category}</a>
    <img src="./img/breadcrumb-icon.svg" alt="Иконка хлебной крошки" class="breadcrumb-icon"
        aria-label="data.category">
    `;
  } else {
    breadcrumbItem.innerHTML = data.title;
  }

  breadcrumb.append(breadcrumbItem);
};