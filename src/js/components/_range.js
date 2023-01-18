const progressDrag = document.querySelector('.range__drag');
const progressText = document.querySelector('.range__text');

const rangeFill = () => {
  const value = progressDrag.value;

  progressDrag.style.setProperty('--percent', `${value}%`);
};

progressDrag.addEventListener('input', rangeFill);
progressText.addEventListener('input', rangeFill);

rangeFill();
