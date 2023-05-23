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
            case 3:
                page3.classList.add("flipped");
                page3.style.zIndex = 3;
                closeBook();
                break;
            default:
                throw new Error("unkown state");
        }
        currentLocation++;
    }
}