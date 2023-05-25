fetch('./recipes/')
.then(response => {
    if (!response.ok) {
    throw new Error('Wystąpił błąd podczas pobierania listy plików.');
}
    return response.text();
})
.then(html => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');
    const links = htmlDoc.querySelectorAll('a[href$=".json"]');
    const filenames = Array.from(links).map(link => link.href.split('/').pop());
    const randomFilename = filenames[Math.floor(Math.random() * filenames.length)];
    return fetch(`./recipes/${randomFilename}`);
})
.then(response => response.json())
.then(recipe => {
    const title = recipe.title;
    const ingredients = recipe.ingredients;
    const instructions = recipe.instructions;
    const img = recipe.picture;

    let html = `
    <h1>${title}</h1>
    <h3>Ingredients:</h3>
    <ul>
    `;
    ingredients.forEach(ingredients => {
    html += `<li>${ingredients}</li>`;
    });
    html += `
    </ul>
    <h3>Instruction:</h3>
    <ol>
    `;
    instructions.forEach(instructions => {
    html += `<li>${instructions}</li>`;
    });

    document.getElementById('f3').innerHTML = html;
    document.getElementById('b2').innerHTML +=`<img height="500" src="${img}">`;
})
.catch(error => {
    console.log('Wystąpił błąd:', error);
});
