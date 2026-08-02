document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tour-slider").forEach((slider) => {
    const slides = [...slider.querySelectorAll(".tour-slide")];
    const dots = [...slider.querySelectorAll(".tour-dot")];
    const prev = slider.querySelector(".tour-prev");
    const next = slider.querySelector(".tour-next");
    let index = 0;
    let timer = null;
    const delay = Number(slider.dataset.autoplay || 5200);

    const show = (nextIndex) => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    };

    const start = () => {
      stop();
      timer = window.setInterval(() => show(index + 1), delay);
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    prev?.addEventListener("click", () => { show(index - 1); start(); });
    next?.addEventListener("click", () => { show(index + 1); start(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); start(); }));
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);

    show(0);
    start();
  });
});
