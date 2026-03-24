/*
    ========================================================
    HAUPTSKRIPT DER PORTFOLIO-SEITE
    Hier werden kleine Interaktionen der Website gesteuert:
    - Scroll-to-top-Button ein- und ausblenden
    - Sanft nach oben scrollen
    - Header beim Scrollen optisch leicht verändern
    ========================================================
*/

// Wichtige Elemente aus dem HTML holen
const header = document.querySelector(".site-header");
const scrollToTopButton = document.getElementById("scrollToTopBtn");
const navigationLinks = document.querySelectorAll('.nav-list a[href^="#"]');

// Ab welcher Scrollhöhe bestimmte Effekte aktiv werden
const headerScrollOffset = 40;
const scrollButtonOffset = 300;

/*
    Diese Funktion reagiert auf das Scrollen der Seite.
    Dabei werden optische Zustände für Header und Top-Button gesetzt.
*/
function handleScroll() {
    const currentScrollY = window.scrollY;

    // Header optisch leicht anpassen, sobald etwas gescrollt wurde
    if (header) {
        if (currentScrollY > headerScrollOffset) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }
    }

    // Scroll-to-top-Button erst anzeigen, wenn man weiter unten ist
    if (scrollToTopButton) {
        if (currentScrollY > scrollButtonOffset) {
            scrollToTopButton.style.opacity = "1";
            scrollToTopButton.style.visibility = "visible";
            scrollToTopButton.style.transform = "translateY(0)";
        } else {
            scrollToTopButton.style.opacity = "0";
            scrollToTopButton.style.visibility = "hidden";
            scrollToTopButton.style.transform = "translateY(10px)";
        }
    }
}

/*
    Klick auf den Nach-oben-Button:
    Die Seite scrollt weich zurück zum Anfang.
*/
if (scrollToTopButton) {
    scrollToTopButton.addEventListener("click", function (event) {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/*
    Klick auf Navigationslinks:
    Der Browser springt zur passenden Section.
    Das läuft zwar durch scroll-behavior in CSS schon weich,
    hier wird aber verhindert, dass der Sticky-Header unschön wirkt.
*/
navigationLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (!targetElement) {
            return;
        }

        event.preventDefault();

        // Höhe des Headers berücksichtigen, damit die Überschrift nicht verdeckt wird
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = targetPosition - headerHeight - 12;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

/*
    Beim Laden der Seite direkt prüfen,
    falls die Seite nicht ganz oben geöffnet wird.
*/
handleScroll();

/*
    Scroll-Event registrieren:
    Während des Scrollens werden Header und Button aktualisiert.
*/
window.addEventListener("scroll", handleScroll);

/*
    Optional:
    Beim Ändern der Fenstergröße wird ebenfalls neu geprüft.
    Das ist hilfreich, falls sich die Headerhöhe auf mobilen Geräten ändert.
*/
window.addEventListener("resize", handleScroll);

