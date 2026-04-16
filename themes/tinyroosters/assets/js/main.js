function invert_page(event = null, on_load = false) {

    let root = document.documentElement;
    let primary_color = getComputedStyle(root).getPropertyValue('--primary-color').trim();
    let secondary_color = getComputedStyle(root).getPropertyValue('--secondary-color').trim();

    let alt_primary_color = getComputedStyle(root).getPropertyValue('--alt-primary-color').trim();
    let alt_secondary_color = getComputedStyle(root).getPropertyValue('--alt-secondary-color').trim();

    let font_color = getComputedStyle(root).getPropertyValue('--font-color').trim();
    let alt_font_color = getComputedStyle(root).getPropertyValue('--alt-font-color').trim();

    // * Invert Text Logo
    let text_logo = document.getElementById("text_logo");
    let text_logo_alt = document.getElementById("text_logo_alt");
    if (text_logo && text_logo_alt) {
        let text_logo_display = getComputedStyle(text_logo).getPropertyValue('display').trim();
        let text_logo_alt_display = getComputedStyle(text_logo_alt).getPropertyValue('display').trim();
        text_logo.style.display = text_logo_alt_display;
        text_logo_alt.style.display = text_logo_display;
    }

    // * Invert Character Logo
    let character_logo = document.getElementById("character_logo");
    if (character_logo) {
        let src = character_logo.src;
        let alt_src = src.replace("primary", "alt");
        if(alt_src == src) {
            alt_src = src.replace("alt", "primary");
        }
        character_logo.src = alt_src;
    }

    // * Invert Invert Icon
    let invert_icon = document.getElementById("invert");
    if (invert_icon) {
        if(invert_icon.src.includes("primary")) {
            invert_icon.src = invert_icon.src.replace("primary", "alt");
        } else {
            invert_icon.src = invert_icon.src.replace("alt", "primary");
        }
    }

    root.style.setProperty('--primary-color', alt_primary_color);
    root.style.setProperty('--secondary-color', alt_secondary_color);
    root.style.setProperty('--font-color', alt_font_color);
    root.style.setProperty('--alt-primary-color', primary_color);
    root.style.setProperty('--alt-secondary-color', secondary_color);
    root.style.setProperty('--alt-font-color', font_color);

    if (!on_load){
        set_invert_state(!get_invert_state());
    }
}

// keybinds for fun
function handleKeybind(event) {
    const key = event.key.toLowerCase();

    if(key === 'h'){
        window.location.href = "/";
    } else if(key === 'r'){
        window.location.reload();
    } else if(key === 'a'){
        window.location.href = "/about";
    } else if(key === 'c'){
        document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
    } else if(key === 'p'){
        window.location.href = "/projects";
    } else if(key === 'l'){
        window.location.href = "/logs";
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

function get_invert_state(){
    let state = sessionStorage.getItem('inverted') === 'true'
    return state;
}

function set_invert_state(state){
    sessionStorage.setItem('inverted', state);
}

document.addEventListener('keydown', handleKeybind);

document.addEventListener("DOMContentLoaded", function() {
    let is_inverted = get_invert_state();

    if (is_inverted) {
        invert_page(null, true);
    }

    const invert_btn = document.getElementById("invert");
    if (!invert_btn){
        console.error("Failed getting invert btn!");
        return;
    }

    invert_btn.addEventListener("click", invert_page);

    const copyright_current_year = document.getElementById('copyright-current-year');
    if (copyright_current_year) {
        copyright_current_year.textContent = new Date().getFullYear();
    }
});


// # Console log keybind tips
console.log("helpful keybinds: [h = home, a = about, c = scroll to contact, l = logs, p = projects, i = invert, j = scroll down, k = scroll up, r = reload, ? = help]");