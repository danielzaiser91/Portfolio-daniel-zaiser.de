const introEl = document.querySelector('.intro');
const mainWrapperEl = document.querySelector('.main-wrapper');
const intro = {
  top: introEl.querySelector('.top'),
  center: introEl.querySelector('.center'),
  bottom: introEl.querySelector('.bottom')
}
const toggler = {
  navBurger: false
}
let t = 0;
const navBurgerEl = document.querySelector('.nav-toggle.burger-menu');
const navEl = document.querySelector('nav');
document.querySelector('ul.navigation').addEventListener('click',e=>{
  if(e.target.tagName !== 'UL') return;
  navBurger();
});
const portfolioEl = document.querySelector('.portfolio-link');
navBurgerEl.onclick = _ => navBurger();
portfolioEl.onclick = _ => navBurger();
function navBurger() {
  navBurgerEl.classList.toggle('rotate');
  navEl.classList.toggle('hide-menu');
  navEl.firstElementChild.classList.toggle('fromTop');
  introEl.classList.toggle('op-0');
}
const settingsEl = document.querySelector('.animation-control .settings-wrapper'), animControl = document.querySelector('.animation-control');
settingsEl.onclick = _ => {
  settingsEl.classList.toggle('rotate');
  animControl.classList.toggle('hide-menu');
};
const animButton = document.querySelector('.animation-control .anim-off-button');
function animOff() {
	mainWrapperEl.classList.toggle('anim-off');
	animButton.textContent = ++t%2 ? 'start' : 'stop'
}
animButton.addEventListener('click', animOff);
animOff();
setTimeout(_ =>  document.querySelector('.i-smiley').classList.remove('a-fade-in','op-0','a-d2'), 4000);
setTimeout(_ => typewrite(intro.center, 'mein Name ist Daniel Zaiser', 1),1500);

function typewrite(el, txt, duration) {
  const colors = ['#02ff02','#c688ff','#7533ce','#3434ff','#13c4ff'], parts = txt.split('');
  let i = 0, wrapper = document.createElement('span');
  wrapper.classList.add('d-block-i');
  wrapper.style.marginRight = "10px";
  el.appendChild(wrapper);
  const j = setInterval(_=>{
    if(i > parts.length-1) return;
    if (parts[i] == ' ') {
      wrapper = document.createElement('span');
      wrapper.classList.add('d-block-i');
      wrapper.style.marginRight = "10px";
      el.appendChild(wrapper);
    }
    const letter = document.createElement('span'), cl = colors[i%colors.length];
    letter.style = 'color: '+cl+';text-shadow: 0 0 10px '+cl;
    letter.textContent += parts[i++];
    letter.classList.add(((i > parts.length / 2) ? 'a-from-right' : 'a-from-left'),'d-block-i');
    wrapper.appendChild(letter);
  }, Math.floor((duration/txt.length)*1000));
  setTimeout(_=>clearInterval(j), duration*1001);
}

fillDiv(10);
function fillDiv(amount=0) {
  const [wW,wH] = [window.innerWidth, window.innerHeight];
  const [w,h] = [wW/amount, wH/amount];
  for(let y = 0; y<amount; y++) {
    for(let x = 0; x<amount; x++) {
      if(rand(200)%4) continue;
      const div = document.createElement('div'), r = rand(360), offL = x*w, offT = y*h, rT = r%2, stretch = rand(10);
      div.classList.add('drip-anim');
      div.style = `
        width: ${w * stretch}px;
        height: ${stretch * (rT ? w : h)}px;
        position: absolute;
        top: ${offT}px;
        left: ${offL}px;
        background: inherit;
        border-radius: 50%;
        opacity: ${r%100};
        transform-origin: center;
        animation: ${rT ? 'spinIt-'+r : 'moveIt-'+r} ${(r%3)+6}s ease-in-out alternate infinite;
      `;
      const style = document.createElement('style');
      style.innerHTML = rT ? `
        @keyframes spinIt-${r} {
          0% { width: 5px; height: 5px }
          100% { transform: rotate(${r}deg); }
        }` : `
        @keyframes moveIt-${r} {
          0% { width: 5px; height: 5px }
          100% { 
            transform: translateX(${wW-(offL+w) < wW/2 ? -offL : wW-(offL)}px) translateY(${wH-(offT+h) > wH/2 ? -offT : wH-(offT)}px) rotate(${r}deg);
          }
        }`;
      div.appendChild(style);
      mainWrapperEl.appendChild(div);
    }
  }
}
function rand(range, startAt = 0) {
  return (Math.floor(Math.random() * range)) + startAt;
}
