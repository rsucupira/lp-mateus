const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-nav");

const setHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

setHeader();
window.addEventListener("scroll", setHeader, { passive: true });

toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  menu.classList.toggle("open", !open);
  document.body.classList.toggle("menu-open", !open);
});

menu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggle?.setAttribute("aria-expanded", "false");
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" }
  );

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("visible"));
}

// Assinatura discreta Uebey no rodapé
(() => {
  const footer = document.querySelector(".footer-inner");
  if (!footer || footer.querySelector(".uebey-credit")) return;

  const topLink = footer.querySelector('a[href="#topo"]');
  if (!topLink) return;

  const actions = document.createElement("div");
  actions.className = "footer-actions";

  topLink.parentNode.insertBefore(actions, topLink);
  actions.appendChild(topLink);

  const credit = document.createElement("a");
  credit.className = "uebey-credit";
  credit.href = "https://uebey.com";
  credit.target = "_blank";
  credit.rel = "noopener noreferrer";
  credit.setAttribute("aria-label", "Desenvolvido por Uebey");
  credit.innerHTML = `
    <span class="uebey-credit__icon" aria-hidden="true">
      <svg viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 3v17c0 8 4.6 13 11 13s11-5 11-13V3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M8 5v15c0 5.5 2.9 9 7 9s7-3.5 7-9V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".76"/>
        <path d="M12 7v13c0 2.8 1.2 4.7 3 4.7s3-1.9 3-4.7V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity=".52"/>
      </svg>
    </span>
    <span>Desenvolvido por <strong>Uebey</strong></span>`;
  actions.appendChild(credit);

  const style = document.createElement("style");
  style.textContent = `
    .footer-actions{display:flex;align-items:center;justify-content:flex-end;gap:22px;white-space:nowrap}
    .uebey-credit{display:inline-flex;align-items:center;gap:7px;color:rgba(255,255,255,.42)!important;font-size:.72rem!important;text-decoration:none;opacity:.86;transition:color .2s ease,opacity .2s ease}
    .uebey-credit__icon{width:16px;height:19px;display:inline-flex;color:var(--accent);filter:drop-shadow(0 0 7px rgba(156,135,98,.12))}
    .uebey-credit__icon svg{width:100%;height:100%;display:block}
    .uebey-credit strong{color:rgba(255,255,255,.58);font-weight:650;transition:color .2s ease}
    .uebey-credit:hover{color:rgba(255,255,255,.72)!important;opacity:1}
    .uebey-credit:hover strong{color:var(--accent)}
    @media(max-width:760px){.footer-actions{justify-content:space-between;gap:16px;flex-wrap:wrap}.uebey-credit{margin-left:auto}}
  `;
  document.head.appendChild(style);
})();
