document.addEventListener("DOMContentLoaded", () => {
  const data = window.ROOM_DATA || {};
  const tabs = [...document.querySelectorAll(".room-tab")];
  const groups = [...document.querySelectorAll(".room-slider-group")];
  const title = document.getElementById("roomTitle");
  const subtitle = document.getElementById("roomSubtitle");
  const type = document.getElementById("roomType");
  const people = document.getElementById("roomPeople");
  const lowWeekday = document.getElementById("lowWeekday");
  const lowWeekend = document.getElementById("lowWeekend");
  const highWeekday = document.getElementById("highWeekday");
  const highWeekend = document.getElementById("highWeekend");

  const sliderState = new Map();

  groups.forEach((group) => {
    const slides = [...group.querySelectorAll(".room-slide")];
    const dots = [...group.querySelectorAll(".room-dot")];
    const prev = group.querySelector(".room-prev");
    const next = group.querySelector(".room-next");
    let index = 0;
    let timer = null;

    const show = (n) => {
      index = (n + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    const start = () => { stop(); timer = setInterval(() => show(index + 1), 5000); };

    prev?.addEventListener("click", () => { show(index - 1); start(); });
    next?.addEventListener("click", () => { show(index + 1); start(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); start(); }));
    group.addEventListener("mouseenter", stop);
    group.addEventListener("mouseleave", start);

    sliderState.set(group.dataset.room, {show, start, stop});
  });

  const activateRoom = (roomKey) => {
    const room = data[roomKey];
    if (!room) return;

    tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.room === roomKey));
    groups.forEach((group) => {
      const active = group.dataset.room === roomKey;
      group.classList.toggle("is-active", active);
      const state = sliderState.get(group.dataset.room);
      if (active) {
        state?.show(0);
        state?.start();
      } else {
        state?.stop();
      }
    });

    title.textContent = room.title;
    subtitle.textContent = room.subtitle;
    type.textContent = room.title;
    people.textContent = `기준 ${room.base} / 최대 ${room.max}`;
    lowWeekday.textContent = `주중 ${room.low_weekday}`;
    lowWeekend.textContent = `주말 ${room.low_weekend}`;
    highWeekday.textContent = `주중 ${room.high_weekday}`;
    highWeekend.textContent = `주말 ${room.high_weekend}`;
  };

  tabs.forEach((tab) => tab.addEventListener("click", () => activateRoom(tab.dataset.room)));
  activateRoom("101");
});
