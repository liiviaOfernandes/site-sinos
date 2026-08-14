const CONFIG = {

    whatsapp: "553438422540",

    // META FINANCEIRA
    goal: 347966.54,

    // DOAÇÕES QUE NÃO VIERAM DOS ESCAPULÁRIOS
    spontaneousDonations: 83500,

    // CAMPANHA DOS ESCAPULÁRIOS
    scapularValue: 1500,
    scapularCount: 128,

    // META DE APOIADORES
    supportersGoal: 183
};
document.getElementById("year").textContent = new Date().getFullYear();



const money = new Intl.NumberFormat(
    "pt-BR",
    {
        style: "currency",
        currency: "BRL"
    }
);


// ==========================================
// CÁLCULOS
// ==========================================

const scapularRaised =
    CONFIG.scapularCount *
    CONFIG.scapularValue;


const totalRaised =
    CONFIG.spontaneousDonations +
    scapularRaised;


const remaining =
    Math.max(
        CONFIG.goal - totalRaised,
        0
    );


const spontaneousPercent =
    (
        CONFIG.spontaneousDonations /
        CONFIG.goal
    ) * 100;


const scapularPercent =
    (
        scapularRaised /
        CONFIG.goal
    ) * 100;


const totalPercent =
    (
        totalRaised /
        CONFIG.goal
    ) * 100;


const remainingPercent =
    (
        remaining /
        CONFIG.goal
    ) * 100;


const supportersRemaining =
    Math.max(
        CONFIG.supportersGoal -
        CONFIG.scapularCount,
        0
    );


const supportersPercent =
    (
        CONFIG.scapularCount /
        CONFIG.supportersGoal
    ) * 100;


// ==========================================
// MOSTRA NA TELA
// ==========================================

document.getElementById("goalValue")
    .textContent =
    money.format(CONFIG.goal);


document.getElementById("totalRaised")
    .textContent =
    money.format(totalRaised);


document.getElementById("spontaneousValue")
    .textContent =
    money.format(
        CONFIG.spontaneousDonations
    );


document.getElementById("remainingValue")
    .textContent =
    money.format(remaining);


document.getElementById("scapularCount")
    .textContent =
    CONFIG.scapularCount;


document.getElementById("supportersCurrent")
    .textContent =
    CONFIG.scapularCount;


document.getElementById("supportersGoal")
    .textContent =
    CONFIG.supportersGoal;


document.getElementById("supportersRemaining")
    .textContent =
    `${supportersRemaining} apoiadores`;


document.getElementById("spontaneousPercent")
    .textContent =
    `${spontaneousPercent.toFixed(2)}%`;


document.getElementById("scapularPercent")
    .textContent =
    `${scapularPercent.toFixed(2)}%`;


document.getElementById("totalPercent")
    .textContent =
    `${totalPercent.toFixed(2)}%`;


document.getElementById("remainingPercent")
    .textContent =
    `${remainingPercent.toFixed(2)}%`;


// BARRAS

setTimeout(() => {

    document.getElementById(
        "progressBar"
    ).style.width =
        `${Math.min(totalPercent, 100)}%`;


    document.getElementById(
        "supportersBar"
    ).style.width =
        `${Math.min(
            supportersPercent,
            100
        )}%`;

}, 400);

const menuButton = document.querySelector(".menu-button");
const menuLinks = document.querySelectorAll(".menu a");

menuButton.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", open ? "true" : "false");
});

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const header = document.querySelector(".header");
const updateHeader = () => { header.classList.toggle("scrolled", window.scrollY > 30); };
updateHeader();
window.addEventListener("scroll", updateHeader);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const whatsappButton = document.getElementById("whatsappButton");
const nameInput = document.getElementById("name");
const quantityInput = document.getElementById("quantity");

whatsappButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const quantity = quantityInput.value.trim();

  if (!name) {
    alert("Por favor, informe seu nome.");
    nameInput.focus();
    return;
  }

  if (!quantity || Number(quantity) <= 0) {
    alert("Por favor, informe a quantidade.");
    quantityInput.focus();
    return;
  }

  const message = `Olá! Gostaria de participar da Campanha dos Novos Sinos.

Nome: ${name}
Quantidade: ${quantity}

Aguardo orientações do escritório paroquial.`;

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
