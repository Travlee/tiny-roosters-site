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
let last_key = '';
let help_active = false;

function show_help() {
    if (help_active) return;
    help_active = true;

    const overlay = document.createElement('div');
    overlay.id = 'help-overlay';
    overlay.innerHTML = `
        <div class="help-content">
            <h2>Keybinds</h2>
            <div class="help-grid">
                <span class="help-key">h</span><span class="help-desc">Home</span>
                <span class="help-key">a</span><span class="help-desc">About</span>
                <span class="help-key">l</span><span class="help-desc">Logs</span>
                <span class="help-key">p</span><span class="help-desc">Projects</span>
                <span class="help-key">c / G</span><span class="help-desc">Scroll to Footer</span>
                <span class="help-key">gg</span><span class="help-desc">Scroll to Top</span>
                <span class="help-key">j</span><span class="help-desc">Scroll Down</span>
                <span class="help-key">k</span><span class="help-desc">Scroll Up</span>
                <span class="help-key">i</span><span class="help-desc">Invert Colors</span>
                <span class="help-key">r</span><span class="help-desc">Reload</span>
                <span class="help-key">?</span><span class="help-desc">Show Help</span>
            </div>
            <div class="help-footer">Press any key or click to close</div>
        </div>
    `;
    document.body.appendChild(overlay);
}

function hide_help() {
    const overlay = document.getElementById('help-overlay');
    if (overlay) {
        overlay.remove();
        help_active = false;
    }
}

function handle_keydown(event) {
    if (help_active) {
        event.preventDefault();
        event.stopPropagation();
        hide_help();
        return;
    }

    const key = event.key;
    const lower_key = key.toLowerCase();

    if (key === 'G') {
        document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
    } else if (key === 'g' && last_key === 'g') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if(lower_key === 'h'){
        window.location.href = "/";
    } else if(lower_key === 'r'){
        window.location.reload();
    } else if(lower_key === 'a'){
        window.location.href = "/about";
    } else if(lower_key === 'c'){
        document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
    } else if(lower_key === 'p'){
        window.location.href = "/projects";
    } else if(lower_key === 'l'){
        window.location.href = "/logs";
    } else if(lower_key === 'k'){
        window.scrollBy(0, -50);
    } else if(lower_key === 'j'){
        window.scrollBy(0, 50);
    } else if(lower_key === 'i'){
        invert_page();
    } else if(lower_key === '?'){
        show_help();
    }

    last_key = key;
}

function handle_click(event){
    if (!help_active){
        return;
    }

    event.preventDefault();
    event.stopPropagation();
    hide_help();
}

function get_invert_state(){
    let state = sessionStorage.getItem('inverted') === 'true'
    return state;
}

function set_invert_state(state){
    sessionStorage.setItem('inverted', state);
}

document.addEventListener('keydown', handle_keydown);
document.addEventListener('click', handle_click);

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
console.log("helpful keybinds: [h = home, a = about, c/G = scroll to footer, gg = scroll to top, l = logs, p = projects, i = invert, j = scroll down, k = scroll up, r = reload, ? = help]");