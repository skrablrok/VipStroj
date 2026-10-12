// Soglasje za piškotke – Google Maps se naloži šele po privolitvi uporabnika.
// Zemljevidi so v HTML označeni z data-consent-src namesto src.
(function () {
    var KLJUC = 'vipstroj_cookie_consent';
    var VERZIJA = 1;

    var lang = (document.documentElement.lang || 'sl').slice(0, 2);
    var besedila = {
        sl: {
            naslov: 'Piškotki na tej strani',
            opis: 'Uporabljamo samo nujno potrebne tehnične rešitve. Zemljevid Google Maps nastavi piškotke tretje osebe (Google), zato ga naložimo le z vašim soglasjem.',
            sprejmi: 'Sprejmi vse',
            zavrni: 'Samo nujni',
            vec: 'Politika piškotkov',
            povezava: 'piskotki.html',
            mapaOpis: 'Zemljevid Google Maps je skrit, ker niste dovolili piškotkov tretjih oseb.',
            mapaGumb: 'Dovoli in prikaži zemljevid',
            mapaPovezava: 'Odpri v Google Maps'
        },
        en: {
            naslov: 'Cookies on this website',
            opis: 'We only use strictly necessary technical solutions. The Google Maps embed sets third-party cookies (Google), so we load it only with your consent.',
            sprejmi: 'Accept all',
            zavrni: 'Necessary only',
            vec: 'Cookie policy',
            povezava: 'piskotki_en.html',
            mapaOpis: 'The Google Maps embed is hidden because you have not allowed third-party cookies.',
            mapaGumb: 'Allow and show map',
            mapaPovezava: 'Open in Google Maps'
        },
        de: {
            naslov: 'Cookies auf dieser Website',
            opis: 'Wir verwenden nur technisch notwendige Lösungen. Die eingebettete Google-Maps-Karte setzt Cookies von Drittanbietern (Google) und wird daher nur mit Ihrer Einwilligung geladen.',
            sprejmi: 'Alle akzeptieren',
            zavrni: 'Nur notwendige',
            vec: 'Cookie-Richtlinie',
            povezava: 'piskotki_de.html',
            mapaOpis: 'Die Google-Maps-Karte ist ausgeblendet, da Sie keine Drittanbieter-Cookies erlaubt haben.',
            mapaGumb: 'Erlauben und Karte anzeigen',
            mapaPovezava: 'In Google Maps öffnen'
        }
    };
    var t = besedila[lang] || besedila.sl;
    var MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=VIP+STROJ+d.o.o.+Dobje+3+Poljane+nad+%C5%A0kofjo+Loko';

    function preberi() {
        try {
            var s = JSON.parse(localStorage.getItem(KLJUC));
            return s && s.v === VERZIJA ? s : null;
        } catch (e) {
            return null;
        }
    }

    function shrani(zunanji) {
        var s = { v: VERZIJA, zunanji: zunanji, datum: new Date().toISOString() };
        try {
            localStorage.setItem(KLJUC, JSON.stringify(s));
        } catch (e) { /* zasebni način – soglasje velja samo za ta ogled */ }
        return s;
    }

    var css = '' +
        '.cc-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:100000;max-width:560px;margin-left:auto;' +
        'text-align:left;background:#1b1a1a;color:#e6e6e6;border:1px solid rgba(255,255,255,.14);border-top:3px solid #D01D23;' +
        'padding:18px 20px;font-family:Poppins,sans-serif;font-size:14px;line-height:1.55;box-shadow:0 8px 30px rgba(0,0,0,.45)}' +
        '.cc-banner h2{margin:0 0 6px;font-size:16px;color:#fff;font-weight:600}' +
        '.cc-banner p{margin:0 0 14px}' +
        '.cc-banner a{color:#ff5a5f}' +
        '.cc-gumbi{display:flex;flex-wrap:wrap;gap:10px}' +
        '.cc-gumbi button{flex:1 1 140px;padding:10px 16px;border-radius:2px;font-family:inherit;font-size:14px;cursor:pointer;border:1px solid #D01D23}' +
        '.cc-sprejmi{background:#D01D23;color:#fff}' +
        '.cc-zavrni{background:transparent;color:#fff}' +
        '.cc-gumbi button:hover{filter:brightness(1.15)}' +
        '.cc-gumbi button:focus-visible,.cc-mapa button:focus-visible{outline:2px solid #fff;outline-offset:2px}' +
        '.cc-mapa{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center;' +
        'min-height:320px;padding:24px 16px;background:#1b1a1a;color:#cfcfcf;font-family:Poppins,sans-serif;font-size:14px}' +
        '.cc-mapa button{background:#D01D23;color:#fff;border:none;padding:10px 18px;border-radius:2px;font-family:inherit;cursor:pointer}' +
        '.cc-mapa a{color:#ff5a5f}';

    function dodajSlog() {
        var st = document.createElement('style');
        st.textContent = css;
        document.head.appendChild(st);
    }

    function nalozMape() {
        var mape = document.querySelectorAll('iframe[data-consent-src]');
        for (var i = 0; i < mape.length; i++) {
            var f = mape[i];
            f.src = f.getAttribute('data-consent-src');
            f.removeAttribute('data-consent-src');
            f.style.display = '';
            var ph = f.previousElementSibling;
            if (ph && ph.classList.contains('cc-mapa')) ph.remove();
        }
    }

    function prikaziNadomestke() {
        var mape = document.querySelectorAll('iframe[data-consent-src]');
        for (var i = 0; i < mape.length; i++) {
            var f = mape[i];
            if (f.previousElementSibling && f.previousElementSibling.classList.contains('cc-mapa')) continue;
            f.style.display = 'none';
            var ph = document.createElement('div');
            ph.className = 'cc-mapa';
            ph.innerHTML = '<p>' + t.mapaOpis + '</p>' +
                '<button type="button">' + t.mapaGumb + '</button>' +
                '<a href="' + MAPS_URL + '" target="_blank" rel="noopener">' + t.mapaPovezava + '</a>';
            ph.querySelector('button').addEventListener('click', function () {
                shrani(true);
                odstraniPasico();
                nalozMape();
            });
            f.parentNode.insertBefore(ph, f);
        }
    }

    var pasica = null;

    function odstraniPasico() {
        if (pasica) {
            pasica.remove();
            pasica = null;
        }
    }

    function pokaziPasico() {
        odstraniPasico();
        pasica = document.createElement('div');
        pasica.className = 'cc-banner';
        pasica.setAttribute('role', 'dialog');
        pasica.setAttribute('aria-live', 'polite');
        pasica.setAttribute('aria-label', t.naslov);
        pasica.innerHTML = '<h2>' + t.naslov + '</h2>' +
            '<p>' + t.opis + ' <a href="' + t.povezava + '">' + t.vec + '</a></p>' +
            '<div class="cc-gumbi">' +
            '<button type="button" class="cc-zavrni">' + t.zavrni + '</button>' +
            '<button type="button" class="cc-sprejmi">' + t.sprejmi + '</button>' +
            '</div>';
        pasica.querySelector('.cc-sprejmi').addEventListener('click', function () {
            shrani(true);
            odstraniPasico();
            nalozMape();
        });
        pasica.querySelector('.cc-zavrni').addEventListener('click', function () {
            var prej = preberi();
            shrani(false);
            // preklic soglasja: že naložen zemljevid odstranimo s ponovnim nalaganjem
            if (prej && prej.zunanji) {
                location.reload();
                return;
            }
            odstraniPasico();
            prikaziNadomestke();
        });
        document.body.appendChild(pasica);
        pasica.querySelector('.cc-sprejmi').focus({ preventScroll: true });
    }

    function init() {
        dodajSlog();
        var s = preberi();
        if (s && s.zunanji) {
            nalozMape();
        } else {
            prikaziNadomestke();
            if (!s) pokaziPasico();
        }

        // Povezave/gumbi "Nastavitve piškotkov" ponovno odprejo pasico
        document.addEventListener('click', function (e) {
            var el = e.target.closest('[data-cookie-settings]');
            if (!el) return;
            e.preventDefault();
            pokaziPasico();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
