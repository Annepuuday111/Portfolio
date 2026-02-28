/* =====================================================
   THEME TOGGLE (Desktop + Mobile)
===================================================== */

const themeToggles = [
  document.getElementById("themeToggle"),
  document.getElementById("themeToggleMobile")
].filter(Boolean);

function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);

  themeToggles.forEach(btn => {
    const icon = btn.querySelector("i");
    if (!icon) return;

    icon.classList.toggle("fa-moon", !isDark);
    icon.classList.toggle("fa-sun", isDark);
  });

  localStorage.setItem("theme", isDark ? "dark" : "light");
}

/* Load saved theme on start */
const savedTheme = localStorage.getItem("theme") === "dark";
setTheme(savedTheme);

/* Toggle click */
themeToggles.forEach(btn => {
  btn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    setTheme(!isDark);
  });
});



/* =====================================================
   SEE MORE PROJECTS TOGGLE
===================================================== */

const toggleBtn = document.getElementById("toggleProjects");
const projectsGrid = document.getElementById("projectsGrid");

if (toggleBtn && projectsGrid) {
  let expanded = false;

  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;

    projectsGrid.style.display = expanded ? "grid" : "none";
    toggleBtn.textContent = expanded ? "Show Less" : "See More Projects";

    if (expanded) {
      projectsGrid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

/* Read more toggle for project descriptions */
document.querySelectorAll(".read-more-btn").forEach(btn => {
  btn.addEventListener("click", () => {

    const desc = btn.previousElementSibling;
    const extra = btn.nextElementSibling;

    desc.classList.toggle("expanded");

    if (desc.classList.contains("expanded")) {
      extra.style.display = "block";
      btn.textContent = "Read less";
    } else {
      extra.style.display = "none";
      btn.textContent = "Read more";
    }
  });
});



/* =====================================================
   SMOOTH SCROLL FOR NAV LINKS
===================================================== */

const navLinks = document.querySelectorAll(
  ".nav-links a, .navbar-mobile a"
);

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId.startsWith("#")) {
      const section = document.querySelector(targetId);
      if (!section) return;

      e.preventDefault();

      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});



/* =====================================================
   ACTIVE NAVBAR HIGHLIGHT ON SCROLL
===================================================== */

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    const href = link.getAttribute("href");
    if (href === "#" + current) {
      link.classList.add("active");
    }
  });
});
