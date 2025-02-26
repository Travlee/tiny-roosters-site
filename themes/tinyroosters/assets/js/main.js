function invert_page() {
    let root = document.documentElement;
    let primary_color = getComputedStyle(root).getPropertyValue('--primary-color').trim();
    let secondary_color = getComputedStyle(root).getPropertyValue('--secondary-color').trim();

    let alt_primary_color = getComputedStyle(root).getPropertyValue('--alt-primary-color').trim();
    let alt_secondary_color = getComputedStyle(root).getPropertyValue('--alt-secondary-color').trim();

    let font_color = getComputedStyle(root).getPropertyValue('--font-color').trim();
    let alt_font_color = getComputedStyle(root).getPropertyValue('--alt-font-color').trim();

    let btn_hover_color = getComputedStyle(root).getPropertyValue('--btn-hover-color').trim();
    let alt_btn_hover_color = getComputedStyle(root).getPropertyValue('--alt-btn-hover-color').trim();

    // * Invert Text Logo
    let text_logo = document.getElementById("text_logo");
    let text_logo_alt = document.getElementById("text_logo_alt");
    let text_logo_display = getComputedStyle(text_logo).getPropertyValue('display').trim();
    let text_logo_alt_display = getComputedStyle(text_logo_alt).getPropertyValue('display').trim();
    text_logo.style.display = text_logo_alt_display;
    text_logo_alt.style.display = text_logo_display;

    // * Invert Character Logo
    let character_logo = document.getElementById("character_logo");
    let src = character_logo.src;
    let alt_src = src.replace("primary", "alt");
    if(alt_src == src) {
        alt_src = src.replace("alt", "primary");
    }
    character_logo.src = alt_src;

    // * Invert Invert Icon
    let invert_icon = document.getElementById("invert");
    if(invert_icon.src.includes("primary")) {
        invert_icon.src = invert_icon.src.replace("primary", "alt");
    } else {
        invert_icon.src = invert_icon.src.replace("alt", "primary");
    }

    root.style.setProperty('--primary-color', alt_primary_color);
    root.style.setProperty('--secondary-color', alt_secondary_color);
    root.style.setProperty('--font-color', alt_font_color);
    root.style.setProperty('--alt-primary-color', primary_color);
    root.style.setProperty('--alt-secondary-color', secondary_color);
    root.style.setProperty('--alt-font-color', font_color);
}

// keybinds for fun
function handleKeybind(event) {
    const key = event.key.toLowerCase();

    if(key === 'h'){
        window.location.href = "/";
    } else if(key === 'b'){
        window.history.back();
    } else if(key === 'f'){
        window.history.forward();
    } else if(key === 'r'){
        window.location.reload();
    } else if(key === 'a'){
        window.location.href = "/about";
    } else if(key === 'c'){
        window.location.href = "/contact";
    } else if(key === 'p'){
        window.location.href = "/projects";
    } else if(key === 'u'){
        window.location.href = "/updates";
    } else if(key === 'k'){
        window.scrollBy(0, -50);
    } else if(key === 'j'){
        window.scrollBy(0, 50);
    } else if(key === 'i'){
        invert_page();
    } else if(key === '?'){
        console.log("Keybinds:");
    }

}

// Add the event listener to the document for keydown events
document.addEventListener('keydown', handleKeybind);

// Optional: Remove event listener when the page is unloaded to prevent memory leaks (good practice)
// window.addEventListener('beforeunload', () => {
//   document.removeEventListener('keydown', handleKeybind);
// });

// ! Add code to make the invert sticky for the session
document.addEventListener("DOMContentLoaded", function() {
    const invert_btn = document.getElementById("invert");
    invert_btn.addEventListener("click", invert_page);
});
