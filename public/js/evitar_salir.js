var bPreguntar = true;
window.onbeforeunload = function () {
    return "Are you sure?";
};
function preguntarAntesDeSalir() {
    if (bPreguntar)
        return "¿Seguro que quieres salir?";
}