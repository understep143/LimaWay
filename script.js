(() => {
  const stage = document.getElementById('stage');
  const el = document.getElementById('bouncer');

  const colors = ['#ffd166', '#ff9d3d', '#8fc45f', '#5b8c3e', '#f6efdc', '#ff6b6b', '#6bc5ff'];
  let colorIndex = 0;

  function nextColor() {
    colorIndex = (colorIndex + 1) % colors.length;
    el.style.color = colors[colorIndex];
  }
  nextColor();

  let x = 0;
  let y = 30;
  const speed = 1.1;
  let vx = speed;
  let vy = speed;

  function frame() {
    const stageW = stage.clientWidth;
    const stageH = stage.clientHeight;
    const elW = el.offsetWidth;
    const elH = el.offsetHeight;

    x += vx;
    y += vy;

    if (x <= 0) {
      x = 0;
      vx = Math.abs(vx);
      nextColor();
    } else if (x + elW >= stageW) {
      x = stageW - elW;
      vx = -Math.abs(vx);
      nextColor();
    }

    if (y <= 0) {
      y = 0;
      vy = Math.abs(vy);
      nextColor();
    } else if (y + elH >= stageH) {
      y = stageH - elH;
      vy = -Math.abs(vy);
      nextColor();
    }

    el.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);

  window.addEventListener('resize', () => {
    x = Math.min(x, Math.max(stage.clientWidth - el.offsetWidth, 0));
    y = Math.min(y, Math.max(stage.clientHeight - el.offsetHeight, 0));
  });
})();
