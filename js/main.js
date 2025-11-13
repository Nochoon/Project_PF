window.onload = () => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  const section_title = document.querySelector(".section-title");
  const title = document.querySelector(".section-title .title");
  const transitionOverlay_title = document.querySelector(
    ".transition-overlay-title"
  );

  const section_slogan = document.querySelector(".section-slogan");
  const section_slogan_image_grid = document.querySelector(
    ".section-slogan .image-grid"
  );
  const transitionOverlay_slogan = document.querySelector(
    ".transition-overlay-slogan"
  );

  const section_introduce = document.querySelector(".section-introduce");
  const section_introduce_inner = document.querySelector(
    ".section-introduce .inner"
  );

  /*   // a태그 클릭 시 부드럽게 이동
  document.querySelectorAll("a.gnb-item").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href"); // 예: "#section2"

      gsap.to(window, {
        duration: 1,
        scrollTo: target, // ScrollToPlugin이 이걸 해석해서 부드럽게 이동
        ease: "power2.inOut",
      });
    });
  }); */

  // main

  const tl_title = gsap.timeline({
    scrollTrigger: {
      trigger: ".trigger-01",
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // Increased for smoother scrubbing
      markers: false,
    },
  });

  tl_title
    .to(title, {
      scale: 15,
      duration: 2,
      ease: "power2.inOut",
    })
    .to(
      title,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.5"
    )
    .to(
      transitionOverlay_title,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.5"
    )

    .to(section_slogan, {
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    })

    .to(
      transitionOverlay_slogan,
      {
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
      },
      "+=0.5"
    )

    .to(
      section_introduce,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      },
      "-=0.5"
    )
    .to(
      section_introduce_inner,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .to(
      section_introduce,
      {
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    );

  const images = [...document.querySelectorAll(".section-slogan img")];

  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

  const getMousePosition = (e) => ({
    x: e.clientX,
    y: e.clientY,
  });

  let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  window.addEventListener("mousemove", (e) => (mousePos = getMousePosition(e)));

  gsap.fromTo(
    images,
    {
      scale: 1.2,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      ease: "power3.inOut",
      stagger: {
        amount: 0.8,
        from: "start",
      },
      duration: 2.5,
    }
  );

  images.forEach((img) => {
    let values = { x: 0, y: 0 };
    const xStart = gsap.utils.random(16, 64);
    const yStart = gsap.utils.random(-16, 64);

    const render = () => {
      values.x = lerp(
        values.x,
        map(mousePos.x, 0, window.innerWidth, -xStart, xStart),
        0.07
      );

      values.y = lerp(
        values.y,
        map(mousePos.y, 0, window.innerHeight, -yStart, yStart),
        0.07
      );

      gsap.set(img, { x: values.x, y: values.y });
      requestAnimationFrame(render);
    };

    render();
    let skewSetter = gsap.quickTo(".section-other img", "skewY"), // fast
      clamp = gsap.utils.clamp(-20, 20); // don't let the skew go beyond 20 degrees.

    ScrollTrigger.create({
      trigger: ".section-other .inner",
      scrollTrigger: {
        trigger: ".section-other .inner .content",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      smooth: 2,
      speed: 3,
      effects: true,
      normalizeScroll: true,
      onUpdate: (self) => skewSetter(clamp(self.getVelocity() / -50)),
      onStop: () => skewSetter(0),
    });
    //
  });

  //about 메뉴 클릭 시 콘텐츠 이동
  let gnbDepth1 = document.querySelector(".gnb-depth1");

  gnbDepth1.addEventListener("click", () => {
    let scrollBar = window.scrollY;
    console.log(scrollBar);
    window.scrollTo({ top: 2800, behavior: "smooth" });
  });

  const lenis = new Lenis({
    smooth: true,
    multiplier: 1,
    easing: (t) => t * (2 - t),
    smoothTouch: true,
    lerp: 0.05,
    duration: 1.2,
  });

  // Lenis Scroll

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // GSAP Setup

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.normalizeScroll(true);

  // ANIMATION
};

window.addEventListener("DOMContentLoaded", () => {
  const lines = [...document.querySelectorAll(".text-drop__line")];
  const textdrop_images = [...document.querySelectorAll(".text-drop__img-box")];
  const prlxElements = [...document.querySelectorAll(".has-prlx")];

  lines.forEach((line, index) => {
    // Text Drop Effect

    gsap.fromTo(
      line,
      { rotateX: -120 },
      {
        rotateX: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: line,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    // Images Reveal

    if (textdrop_images[index]) {
      const targetOpacity =
        textdrop_images[index].getAttribute("data-opacity") || 1;

      let startOffset = window.innerWidth < 1024 ? "-=200" : "-=500";

      gsap.to(textdrop_images[index], {
        opacity: targetOpacity,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: line,
          start: `bottom bottom${startOffset}`,
          end: "bottom top",
          scrub: true,
        },
      });
    }
  });

  // Parallax Effect

  prlxElements.forEach((el) => {
    const speed = parseFloat(el.getAttribute("data-speed")) || 0.5;

    gsap.to(el, {
      y: () => -(1 - speed) * 150,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      },
    });
  });

  window.addEventListener("resize", () => ScrollTrigger.refresh());
});
