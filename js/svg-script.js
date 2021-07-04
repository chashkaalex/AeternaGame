
console.log('svg script loaded just now!');




// svg unit type labels function
  
// svg coordinates getter setup   
mainMapElem.addEventListener("click", function(evt){
    //console.log('Map clicked!');
	alert_coords(evt);
  });
  
  
let pt = svgElem.createSVGPoint();  // Created once for document

function alert_coords(evt) {
    pt.x = evt.clientX;
    pt.y = evt.clientY;

    // The cursor point, translated into svg coordinates
    let cursorpt =  pt.matrixTransform(svg.getScreenCTM().inverse());
    console.log(cursorpt.x.toFixed(2) + "," + cursorpt.y.toFixed(2) + " ");
}