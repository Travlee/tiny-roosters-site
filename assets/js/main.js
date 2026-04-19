function invert_page(event = null, on_load = false) {

    let root = document.documentElement;
    let primary_color = getComputedStyle(root).getPropertyValue('--primary-color').trim();
    let secondary_color = getComputedStyle(root).getPropertyValue('--secondary-color').trim();

    let alt_primary_color = getComputedStyle(root).getPropertyValue('--alt-primary-color').trim();
    let alt_secondary_color = getComputedStyle(root).getPropertyValue('--alt-secondary-color').trim();

    let font_color = getComputedStyle(root).getPropertyValue('--font-color').trim();
    let alt_font_color = getComputedStyle(root).getPropertyValue('--alt-font-color').trim();

    let hint_color = getComputedStyle(root).getPropertyValue('--font-less-contrast-2').trim();
    let alt_hint_color = getComputedStyle(root).getPropertyValue('--alt-font-less-contrast-2').trim();

    // * Invert Text Logo
    let text_logo = document.getElementById("text_logo");
    let text_logo_alt = document.getElementById("text_logo_alt");
    if (text_logo && text_logo_alt) {
        let text_logo_display = getComputedStyle(text_logo).getPropertyValue('display').trim();
        let text_logo_alt_display = getComputedStyle(text_logo_alt).getPropertyValue('display').trim();
        text_logo.style.display = text_logo_alt_display;
        text_logo_alt.style.display = text_logo_display;
    }

    let character_logo = document.getElementById("character_logo");
    if (character_logo) {
        let src = character_logo.src;
        let alt_src = src.replace("primary", "alt");
        if(alt_src == src) {
            alt_src = src.replace("alt", "primary");
        }
        character_logo.src = alt_src;
    }

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
    root.style.setProperty('--font-less-contrast-2', alt_hint_color);
    root.style.setProperty('--alt-font-less-contrast-2', hint_color);

    if (!on_load){
        set_invert_state(!get_invert_state());
    }
}

// keybinds for fun
let last_key = '';
let help_active = false;
let hints_active = false;
let hint_elements = [];
let hint_buffer = '';
const hint_chars = "sdcgjkqwertyuiozxvbnm";

function show_hints() {
    if (hints_active) return;
    hints_active = true;
    hint_buffer = '';

    const links = Array.from(document.querySelectorAll('a')).filter(link => {
        const rect = link.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.bottom >= 0 && rect.top <= window.innerHeight;
    });

    const use_double = links.length > hint_chars.length;

    links.forEach((link, i) => {
        const rect = link.getBoundingClientRect();
        const hint_text = use_double
            ? hint_chars[Math.floor(i / hint_chars.length) % hint_chars.length] + hint_chars[i % hint_chars.length]
            : hint_chars[i % hint_chars.length];

        const hint_el = document.createElement('div');
        hint_el.className = 'link-hint';
        hint_el.textContent = hint_text;

        // Position relative to the link
        hint_el.style.top = (rect.top + window.scrollY) + 'px';
        hint_el.style.left = (rect.left + window.scrollX) + 'px';

        document.body.appendChild(hint_el);
        hint_elements.push({ el: hint_el, link: link, key: hint_text });
    });
}

function hide_hints() {
    hint_elements.forEach(h => h.el.remove());
    hint_elements = [];
    hints_active = false;
    hint_buffer = '';
}

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
                <span class="help-key">c/G</span><span class="help-desc">Scroll to Footer</span>
                <span class="help-key">gg</span><span class="help-desc">Scroll to Top</span>
                <span class="help-key">j</span><span class="help-desc">Scroll Down</span>
                <span class="help-key">k</span><span class="help-desc">Scroll Up</span>
                <span class="help-key">i</span><span class="help-desc">Invert Colors</span>
                <span class="help-key">f</span><span class="help-desc">Show Links</span>
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

    if (hints_active) {
        const key = event.key.toLowerCase();
        if (key === 'escape') {
            hide_hints();
        } else if (hint_chars.includes(key)) {
            hint_buffer += key;
            const matches = hint_elements.filter(h => h.key.startsWith(hint_buffer));

            if (matches.length === 1 && matches[0].key === hint_buffer) {
                matches[0].link.click();
                hide_hints();
            } else if (matches.length === 0) {
                hide_hints();
            } else {
                hint_elements.forEach(h => {
                    if (!h.key.startsWith(hint_buffer)) {
                        h.el.style.display = 'none';
                    }
                });
            }
        } else {
            hide_hints();
        }
        event.preventDefault();
        event.stopPropagation();
        return;
    }

    const key = event.key;
    const lower_key = key.toLowerCase();

    if (event.ctrlKey){
        return;
    }

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
    } else if(lower_key === 'f'){
        show_hints();
    }

    last_key = key;
}

function handle_click(event){
    if (hints_active) {
        hide_hints();
        return;
    }
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

    const character_logo = document.getElementById("character_logo");
    let character_logo_animation = null;

    if (character_logo) {
        character_logo.addEventListener("click", (e) => {
            invert_page(e);

            if (character_logo_animation) {
                character_logo_animation.cancel();
            }

            character_logo_animation = character_logo.animate([
                { transform: 'rotate(0deg)' },
                { transform: 'rotate(10deg)', offset: 0.05 },
                { transform: 'rotate(-10deg)', offset: 0.1 },
                { transform: 'rotate(10deg)', offset: 0.15 },
                { transform: 'rotate(0deg)', offset: 0.2 },
                { transform: 'rotate(0deg)', offset: 1 }
            ], {
                duration: 1000,
                easing: 'ease-in-out'
            });
        });
    }

    const copyright_current_year = document.getElementById('copyright-current-year');
    if (copyright_current_year) {
        copyright_current_year.textContent = new Date().getFullYear();
    }
});


// # Console log keybind tips
console.log("helpful keybinds: [h = home, a = about, c/G = scroll to footer, gg = scroll to top, l = logs, p = projects, i = invert, j = scroll down, k = scroll up, r = reload, ? = help]");