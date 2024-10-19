const inputs = document.querySelectorAll(".input");
window.addEventListener("beforeunload", ev => {
    for(let i=0; i<7; i++){
        var input = inputs[i].value.trim();
        if (input.length > 0) {
            ev.preventDefault();
        }
    }
});
