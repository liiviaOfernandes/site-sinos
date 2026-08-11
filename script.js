const CONFIG = {
  whatsapp: "553438422540",

  // Meta total da campanha
  goal: 500000,

  // Quanto já foi arrecadado
  raised: 150000
};

document.getElementById("year").textContent = new Date().getFullYear();

const goalValue = document.getElementById("goalValue");
const raisedValue = document.getElementById("raisedValue");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

goalValue.textContent = money.format(CONFIG.goal);
raisedValue.textContent = money.format(CONFIG.raised);

const percent = CONFIG.goal > 0 ? Math.min((CONFIG.raised / CONFIG.goal) * 100, 100) : 0;
setTimeout(() => { progressBar.style.width = `${percent}%`; }, 400);
progressText.textContent = `${percent.toFixed(0)}% da meta alcançada`;

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
