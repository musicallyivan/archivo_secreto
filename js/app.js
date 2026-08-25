// Compatibility loader: keeps the current archive app intact while adding a dedicated password alias.
// "cumple_carla" opens the same protected area as the 2027 access until its own content is defined.
(function () {
    const ORIGINAL_APP = "https://raw.githubusercontent.com/musicallyivan/archivo_secreto/f973bbf7f3aaafd75cb773da22bfae312400983e/js/app.js";

    document.addEventListener("submit", (event) => {
        const form = event.target;
        const passwordInput = form?.querySelector?.("#password");
        if (passwordInput && passwordInput.value.trim() === "cumple_carla") {
            passwordInput.value = "2027";
        }
    }, true);

    const script = document.createElement("script");
    script.src = ORIGINAL_APP;
    script.async = false;
    document.currentScript?.after(script) || document.head.appendChild(script);
})();