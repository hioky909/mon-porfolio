document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio chargé !");

    // Effet smooth scroll pour le menu
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });
    

    // Animation d'apparition des sections au scroll
    const sections = document.querySelectorAll("section");
    
    function revealSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections(); // Pour afficher les sections visibles au chargement
});

function typeWriterEffect(element, text, speed) { 
    let index = 0;
    function writeText() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(writeText, speed);
        }
    }
    element.innerHTML = ""; // Efface le texte initial
    writeText();
}

document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector("#accueil h1");
    typeWriterEffect(title, "Bienvenue sur mon portfolio", 100);
});

window.addEventListener("scroll", function() {
    let scrollTop = window.scrollY;
    document.querySelector("#accueil").style.backgroundPosition = `center ${scrollTop * 0.5}px`;
});

const phrases = [
    "Bienvenue sur mon portfolio ",
    "Je suis développeur ",
    "Découvrez mes projets ! "
];

let phraseIndex = 0;
let charIndex = 0;
let currentPhrase = "";
let isDeleting = false;
const speed = 100;
const delay = 1500;

function typeWriter() {
    let title = document.querySelector("#accueil h1");

    if (isDeleting) {
        currentPhrase = phrases[phraseIndex].substring(0, charIndex--);
    } else {
        currentPhrase = phrases[phraseIndex].substring(0, charIndex++);
    }

    title.innerHTML = currentPhrase;

    if (!isDeleting && charIndex === phrases[phraseIndex].length) {
        isDeleting = true;
        setTimeout(typeWriter, delay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(typeWriter, isDeleting ? speed / 2 : speed);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeWriter, 500);
});

particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00ffcc" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#00ffcc", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 3, direction: "none", random: false, straight: false, out_mode: "out" }
    }
});


const projects = [
    {
        name: "ASCII Art Web",
        image: "images/ascii-art-web.png",
        video: "videos/ascii-art-web.mp4",
        link: "https://github.com/hioky909/ascii-art-web"
    },
    {
        name: "Net-Cat",
        image: "images/servers.png",
        video: "/videos/net-cat.mp4",
        link: "https://github.com/hioky909/net-cat"
    },
    {
        name: "Groupie Tracker",
        image: "images/groupie-tracker.png",
        video: "videos/groupie-tracker.mp4",
        link: "https://github.com/hioky909/groupie-trackers"
    },
    {
        name: "Forum",
        image: "images/forum.png",
        video: "videos/forum.mp4",
        link: "https://github.com/hioky909/forum"
    },
    {
        name: "Make-Your-Game",
        image: "images/myg.png",
        video: "videos/make-your-game.mp4",
        link: "https://github.com/hioky909/make-your-game"
    },
    {
        name: "Lem-in",
        image: "images/ant.png",
        video: "videos/lem-in.mp4",
        link: "https://github.com/hioky909/lem-in"
    }
];

function loadProjects() {
    const container = document.querySelector(".projects-container");
    container.innerHTML = "";

    const preview = document.getElementById("project-preview");
    const video = document.getElementById("preview-video");

    let hoveredCard = null;

    projects.forEach((project, index) => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project-card");

        projectElement.innerHTML = `
        <div class="media-wrapper">
            <img src="${project.image}" alt="${project.name}" class="project-image">
            <video src="${project.video}" class="project-video" muted loop></video>
        </div>
        <h3>${project.name}</h3>
        <a href="${project.link}" target="_blank">Voir le code</a>
    `;


    const cardVideo = projectElement.querySelector(".project-video");

    projectElement.addEventListener("mouseenter", () => {
        cardVideo.play();
    });
    
    projectElement.addEventListener("mouseleave", () => {
        cardVideo.pause();
        cardVideo.currentTime = 0;
    });
    

        container.appendChild(projectElement);

        // Hover : juste pour montrer l'aperçu (pas pour jouer la vidéo)
       // Ne rien faire au hover maintenant
        projectElement.addEventListener("mouseenter", () => {
            hoveredCard = projectElement;
        });
        

        projectElement.addEventListener("mouseleave", () => {
            setTimeout(() => {
                if (!preview.matches(":hover") && hoveredCard !== document.querySelector(".project-card:hover")) {
                    video.pause();
                    video.removeAttribute("controls");
                    video.src = "";
                    preview.classList.remove("show");
                }
            }, 100);
        });

        // ▶️ Lecture de la vidéo uniquement au clic
        projectElement.addEventListener("click", () => {
            if (video.src !== project.video) {
                video.src = project.video;
            }
            video.play();
            video.setAttribute("controls", true);
            preview.classList.add("show");
        });        

        // Apparition progressive
        setTimeout(() => {
            projectElement.classList.add("show");
        }, index * 200);
    });

    // Si on quitte aussi la vidéo
    preview.addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (!document.querySelector(".project-card:hover")) {
                video.pause();
                video.removeAttribute("controls");
                video.src = "";
                preview.classList.remove("show");
            }
        }, 100);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadProjects();

    setTimeout(() => {
        const projects = document.querySelectorAll(".project-card");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        projects.forEach(project => observer.observe(project));
    }, 500);
});

document.addEventListener("DOMContentLoaded", () => {
    const skills = [
        { name: "JavaScript", image: "images/js.png" },
        { name: "Go", image: "images/go.png" },
        { name: "Python", image: "images/py.png" },
        { name: "HTML", image: "images/html.png" },
        { name: "CSS", image: "images/css.png"},
        { name: "C++", image: "images/c++.png"},
        { name: "Rust", image: "images/rust.png"},
        { name: "SQLite", image: "images/sql.png"}
    ];

    const track = document.querySelector(".skills-track");

    // Ajouter les compétences 2 fois pour un effet de boucle
    for (let i = 0; i < 2; i++) {
        skills.forEach(skill => {
            const skillElement = document.createElement("div");
            skillElement.classList.add("skill");

            skillElement.innerHTML = `
                <img src="${skill.image}" alt="${skill.name}" class="skill-icon">
                <span>${skill.name}</span>
            `;

            track.appendChild(skillElement);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const contactSection = document.querySelector(".contact-section");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contactSection.style.opacity = "1";
                contactSection.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    observer.observe(contactSection);
});
