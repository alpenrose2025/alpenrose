const facilityPanels = [...document.querySelectorAll('.facility-panel')];
const facilityHeader = document.querySelector('.facility-header');

function updateFacilityPage() {
  const marker = window.scrollY + window.innerHeight * 0.58;
  let currentIndex = 0;

  facilityPanels.forEach((panel, index) => {
    if (marker >= panel.offsetTop) currentIndex = index;
  });

  facilityPanels.forEach((panel, index) => {
    panel.classList.toggle('is-current', index === currentIndex);
    panel.classList.toggle('is-passed', index < currentIndex);
  });

  const current = facilityPanels[currentIndex];
  const overlay = current?.dataset.header === 'overlay';
  facilityHeader?.classList.toggle('is-overlay', overlay);
  facilityHeader?.classList.toggle('is-solid', !overlay);
}

let ticking = false;
function requestFacilityUpdate() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateFacilityPage();
    ticking = false;
  });
}

window.addEventListener('scroll', requestFacilityUpdate, { passive: true });
window.addEventListener('resize', requestFacilityUpdate);
window.addEventListener('load', updateFacilityPage);
updateFacilityPage();
