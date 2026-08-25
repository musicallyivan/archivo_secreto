// The birthday password has its own completely separate experience.
// Other passwords continue to use the existing archive application.
(function () {
    document.addEventListener("submit", function (event) {
        const form = event.target;
        const input = form && form.querySelector ? form.querySelector("#password") : null;
        if (!input || input.value.trim() !== "cumple_carla") return;
        event.preventDefault();
        event.stopImmediatePropagation();
        window.location.href = "cumple-carla.html";
    }, true);

    const legacyScript = document.createElement("script");
    legacyScript.src = "https://raw.githubusercontent.com/musicallyivan/archivo_secreto/f973bbf7f3aaafd75cb773da22bfae312400983e/js/app.js";
    legacyScript.async = false;
    document.head.appendChild(legacyScript);
})();