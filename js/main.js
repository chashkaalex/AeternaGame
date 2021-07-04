
console.log('logging from the main!');

requirejs(['game-functions'],
function   (hoverOverCounty) {

    //Establich county hover event 
    countyElems.forEach((countyElem) => {
        console.log('Creating hover event for ', countyElem.id);
        countyElem.addEventListener("mouseover", hoverOverCounty);
    });
});
