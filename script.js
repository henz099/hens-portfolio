document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SCROLL REVEAL
    ========================= */

    const sections = document.querySelectorAll(
        ".about, .experience, .skills, .achievements, .contact"
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });
        },
        {
            threshold: 0.2
        }
    );

    sections.forEach((section) => {
        section.classList.add("reveal");
        revealObserver.observe(section);
    });


    /* =========================
       SMOOTH NAVIGATION
    ========================= */

    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            event.preventDefault();

            const navHeight = document.querySelector("nav").offsetHeight;

            const targetPosition =
                targetSection.getBoundingClientRect().top +
                window.scrollY -
                navHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const updateActiveLink = () => {

        const scrollPosition = window.scrollY + 250;

        document.querySelectorAll("section[id]").forEach((section) => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.nav-links a[href="#${sectionId}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    };


    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();

});