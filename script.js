const form = document.getElementById('vcfForm');
const countDisplay = document.getElementById('count');
const downloadBtn = document.getElementById('downloadBtn');

let contacts = JSON.parse(localStorage.getItem('vcf_contacts') || '[]');
let count = contacts.length;
const THRESHOLD = 40; // Set your target upload count here

countDisplay.textContent = count;

function updateDownloadVisibility() {
  if (contacts.length >= THRESHOLD) {
    downloadBtn.style.display = 'inline-block';
  } else {
    downloadBtn.style.display = 'none';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const number = document.getElementById('number').value.trim();

  if (!name || !number) return;

  contacts.push({ name, number });
  localStorage.setItem('vcf_contacts', JSON.stringify(contacts));

  count = contacts.length;
  countDisplay.textContent = count;
  updateDownloadVisibility();

  form.reset();
  alert('Uploaded successfully!');
});

downloadBtn.addEventListener('click', () => {
  const vcfLines = contacts.map(c => 
    `BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nTEL:${c.number}\nEND:VCARD`
  ).join('\n');

  const blob = new Blob([vcfLines], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'DREADED_ARMY_CONTACTS.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

updateDownloadVisibility();
