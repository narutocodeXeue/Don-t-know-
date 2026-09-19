const prompts = [
  ['Take one slow breath.', 'In through your nose, out a little longer.'],
  ['Notice five things.', 'Let your eyes land on what is already here.'],
  ['Start smaller than small.', 'Open the document. Write one imperfect line.'],
  ['Drink some water.', 'Your next good idea might need a tiny refill.']
];
const pauseButton = document.querySelector('#pause-button');
const countdown = document.querySelector('#countdown');
const orb = document.querySelector('#orb');
const prompt = document.querySelector('#prompt');
const detail = document.querySelector('#prompt-detail');
const toast = document.querySelector('#toast');
let remaining = 3;

function selectPrompt(title, copy) { prompt.textContent = title; detail.textContent = copy; }
function showToast(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); }
document.querySelectorAll('.choice').forEach(choice => choice.addEventListener('click', () => {
  document.querySelector('.choice.active')?.classList.remove('active'); choice.classList.add('active');
  selectPrompt(choice.dataset.title, choice.dataset.detail); document.querySelector('.pause-card').scrollIntoView({ behavior:'smooth', block:'center' });
}));
document.querySelector('#shuffle').addEventListener('click', () => { const next = prompts[Math.floor(Math.random() * prompts.length)]; selectPrompt(...next); showToast('A fresh nudge, just for now.'); });
pauseButton.addEventListener('click', () => {
  if (pauseButton.disabled) return;
  let seconds = 5; pauseButton.disabled = true; pauseButton.textContent = 'Breathing…'; orb.classList.add('breathe'); countdown.textContent = seconds;
  const timer = setInterval(() => { seconds -= 1; countdown.textContent = seconds || '✓'; if (!seconds) { clearInterval(timer); orb.classList.remove('breathe'); pauseButton.disabled = false; pauseButton.innerHTML = 'Pause complete <span>✓</span>'; remaining = Math.min(5, remaining + 1); document.querySelector('#progress-text').textContent = `${remaining} / 5`; document.querySelector('#progress-bar').style.width = `${remaining * 20}%`; showToast('Beautiful. You made a little space.'); setTimeout(() => pauseButton.innerHTML = 'Start pause <span>→</span>', 2600); } }, 1000);
});
document.querySelector('#theme-toggle').addEventListener('click', () => document.body.classList.toggle('dark'));
document.querySelector('#today-date').textContent = new Intl.DateTimeFormat('en', { month:'short', day:'numeric' }).format(new Date());
