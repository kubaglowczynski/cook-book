// book script

const closeBtn = document.querySelector("#close-btn");
const closeBtnSecond = document.querySelector("#close-btn-second");
const nextBtn = document.querySelector("#next-btn");
const openBtn = document.querySelector("#open-btn");
const book = document.querySelector("#book");

const page1 = document.querySelector("#p1");
const page2 = document.querySelector("#p2");
const page3 = document.querySelector("#p3");
const cover = document.querySelector("#f1");

openBtn.addEventListener("click", goNextPage);
nextBtn.addEventListener("click", goNextPage);
closeBtn.addEventListener("click", closeBook);
closeBtnSecond.addEventListener("click", closeBook);

let currentLocation = 1;
let numOfPage = 3;
let maxLocation = numOfPage + 1;

function openBook(){
    book.style.transform = "translateX(50%)";
    openBtn.style.scale= "0";
}

function closeBook(){
    currentLocation = 1;
    book.style.transform = "translateX(0)";
    openBtn.style.scale= "1";
    page1.classList.remove("flipped");
    page2.classList.remove("flipped");
    page1.style.zIndex = 4;
    page2.style.zIndex = 3;
    page3.style.zIndex = 2;
    nextBtn.style.scale = 0;
    nextBtn.style.transitionDelay = "0s";
    setTimeout(function(){
        window.location.reload();
    }, 500);
}

function goNextPage(){
    if(currentLocation < maxLocation){
        switch(currentLocation){
            case 1:
                openBook();
                page1.classList.add("flipped");
                nextBtn.style.scale = 1;
                break;
            case 2:
                page2.classList.add("flipped");
                page2.style.zIndex = 4;
                nextBtn.style.scale = 0;
                nextBtn.style.transitionDelay = "0s";
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}

// recipes script

fetch('/recipes/')
.then(response => {
    if (!response.ok) {
    throw new Error('Error.');
}
    return response.text();
})
.then(html => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');
    const links = htmlDoc.querySelectorAll('a[href$=".json"]');
    const filenames = Array.from(links).map(link => link.href.split('/').pop());
    const randomFilename = filenames[Math.floor(Math.random() * filenames.length)];
    return fetch(`/recipes/${randomFilename}`);
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
    console.log('Error:', error);
});
