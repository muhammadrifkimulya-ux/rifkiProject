const WHATSAPP_URL = "https://wa.me/6285869175094";

const navItems = [
  { href: "index.html", label: "Beranda" },
  { href: "paket.html", label: "Paket Website" },
  { href: "tentang.html", label: "Tentang Kami" },
  { href: "kontak.html", label: "Kontak" }
];

const currentPage = window.location.pathname.split("/").pop() || "index.html";

const header = document.querySelector("#site-header");
if (header) {
  header.innerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="index.html" aria-label="RifkiProject, beranda">
          <img src="../assets/logo.jpg"  alt="logo" class="logo"/>
          <span class="brand-name">Rifki<span>Project</span></span>
        </a>
        <button class="menu-toggle" type="button" aria-label="Buka menu" aria-expanded="false">☰</button>
        <nav class="site-nav" aria-label="Navigasi utama">
          ${navItems.map(item => `
            <a href="${item.href}" class="${currentPage === item.href ? "active" : ""}">
              ${item.label}
            </a>
          `).join("")}
          <a class="button button-primary header-cta wa-link"
             href="${WHATSAPP_URL}"
             data-message="Halo RifkiProject, saya ingin konsultasi pembuatan website.">
            Konsultasi <span>↗</span>
          </a>
        </nav>
      </div>
    </header>
  `;
  
  const menuButton = header.querySelector(".menu-toggle");
  const navigation = header.querySelector(".site-nav");
  
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    menuButton.textContent = isOpen ? "×" : "☰";
  });
}

const footer = document.querySelector("#site-footer");
if (footer) {
  footer.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-main">
          <div class="footer-about">
            <a class="brand" href="index.html">
              <img src="../assets/logo.jpg"  alt="logo" class="logo"/>
              <span class="brand-name">Rifki<span>Project</span></span>
            </a>
            <p>Jasa pembuatan website profesional, cepat, dan terjangkau untuk membantu bisnismu berkembang.</p>
          </div>
          <div class="footer-column">
            <strong>Jelajahi</strong>
            <a href="index.html">Beranda</a>
            <a href="paket.html">Paket Website</a>
            <a href="tentang.html">Tentang Kami</a>
            <a href="kontak.html">Kontak</a>
          </div>
          <div class="footer-column">
            <strong>Hubungi</strong>
            <a href="https://wa.me/6285869175094">WhatsApp: +62 858-6917-5094</a>
            <a href="mailto:muhammadrifkimulya@gmail.com">Email kami</a>
            <a href="https://www.instagram.com/mulyamuhammadrifki?lqvp=MWUwdnhyaW1jZXliOA==" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© <span id="current-year"></span> RifkiProject. All rights reserved.</span>
          <span>Website profesional, mulai dari kebutuhanmu.</span>
        </div>
      </div>
    </footer>
  `;
  
  const year = footer.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
}

// Tambahkan teks pemesanan otomatis ke setiap tombol WhatsApp.
document.querySelectorAll(".wa-link").forEach(link => {
  const message = link.dataset.message;
  if (message) {
    link.href = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});

// Animasi elemen saat masuk ke layar.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Form kontak membuka aplikasi email pengguna dengan isi pesan yang sudah disusun.
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const service = formData.get("service");
    const message = formData.get("message") || "-";
    
    const subject = encodeURIComponent(`Konsultasi website dari ${name}`);
    const body = encodeURIComponent(
      `Halo RifkiProject,\n\nNama: ${name}\nEmail: ${email}\nPaket yang diminati: ${service}\n\nKebutuhan:\n${message}`
    );
    
    window.location.href = `mailto:muhammadrifkimulya@gmail.com?subject=${subject}&body=${body}`;
  });
}