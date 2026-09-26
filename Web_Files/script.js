const CONTACT_EMAIL = '2002akash99@gmail.com';

const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

async function copyText(value, successMessage) {
  try {
    await navigator.clipboard.writeText(value);
    showToast(successMessage);
  } catch {
    showToast(`Copy unavailable — ${value}`);
  }
}

document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('email-button').addEventListener('click', () => copyText(CONTACT_EMAIL, 'Email copied to clipboard'));
document.getElementById('copy-profile').addEventListener('click', () => copyText(window.location.href, 'Profile link copied'));

const themeButton = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('akash-theme');
if (savedTheme === 'light') document.body.classList.add('light');
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('akash-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

document.querySelectorAll('.project-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const project = button.closest('.project');
    const isOpen = project.classList.toggle('expanded');
    button.setAttribute('aria-expanded', isOpen);
    button.firstChild.textContent = isOpen ? 'Hide implementation details ' : 'See implementation details ';
  });
});

const capabilityData = {
  cloud: { index: '01', title: 'Cloud architecture', description: 'Designing clear foundations that let teams move quickly without turning every deployment into a risk event.', rows: [['AWS', 'VPC, IAM, EC2, S3, RDS, ECS, Lambda, CloudWatch'], ['IaC', 'Terraform modules and repeatable environments'], ['Design', 'Network boundaries, availability, cost-aware choices']] },
  delivery: { index: '02', title: 'Delivery systems', description: 'Making code-to-cloud delivery consistent, visible, and safer through small, automated feedback loops.', rows: [['CI/CD', 'GitHub Actions, build checks, deployment gates'], ['Containers', 'Docker images and portable runtime practices'], ['Workflow', 'Git strategy, release traceability, rollback thinking']] },
  reliability: { index: '03', title: 'Reliability & security', description: 'Building operational confidence with useful signals, thoughtful access control, and documented recovery paths.', rows: [['Observe', 'CloudWatch metrics, logs, dashboards, alert design'], ['Security', 'Least privilege IAM, secrets awareness, secure defaults'], ['Operate', 'Runbooks, SLO thinking, incident-ready communication']] }
};
const panel = document.getElementById('capability-panel');
document.querySelectorAll('.capability-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.capability-tab').forEach((item) => { item.classList.remove('selected'); item.setAttribute('aria-selected', 'false'); });
    tab.classList.add('selected'); tab.setAttribute('aria-selected', 'true');
    const item = capabilityData[tab.dataset.capability];
    panel.style.opacity = '0';
    setTimeout(() => {
      panel.innerHTML = `<div class="panel-index">${item.index}</div><h3>${item.title}</h3><p>${item.description}</p><ul>${item.rows.map(([name, detail]) => `<li><span>${name}</span>${detail}</li>`).join('')}</ul>`;
      panel.style.opacity = '1';
    }, 130);
  });
});

const descriptions = {
  'Source control': 'Source control → every infrastructure change is reviewed, traceable, and deployable.',
  'Automated pipeline': 'Automated pipeline → validation catches risky changes before they reach an environment.',
  'AWS platform': 'AWS platform → scalable, secure cloud services provide a dependable application foundation.',
  'Observability': 'Observability → logs, metrics, and alerts make system health visible before users feel it.'
};
document.querySelectorAll('.node').forEach((node) => node.addEventListener('click', () => {
  document.querySelectorAll('.node').forEach((item) => item.classList.remove('active'));
  node.classList.add('active');
  document.getElementById('node-caption').textContent = descriptions[node.dataset.node];
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

if (window.matchMedia('(pointer:fine)').matches) {
  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', (event) => { glow.style.transform = `translate(${event.clientX - 260}px, ${event.clientY - 260}px)`; });
}
