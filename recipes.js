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

    let html = `
    <h2>${title}</h2>
    <p><b>Ingredients:</b></p>
    <ul>
    `;
    ingredients.forEach(ingredients => {
    html += `<li>${ingredients}</li>`;
    });
    html += `
    </ul>
    <p><b>Instruction:</b></p>
    <ol>
    `;
    instructions.forEach(instructions => {
    html += `<li>${instructions}</li>`;
    });
    document.getElementById('f3').innerHTML = html;
})
.catch(error => {
    console.log('Wystąpił błąd:', error);
});
