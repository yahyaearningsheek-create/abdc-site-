// ============ DATA ============
const MEMBERS_RAW = [
  "Abdisalam djibril amir","Fatouma abdi houssien","Sahal axmed adan","Hodan osman adan",
  "Mahdi DJAMA nour","Fosiya cabdi cabdillahi","Casha ahmed micaad","Hodan dayib houssien",
  "Souleiman Dayib houssien","Dayib houssien igeh","Maryan nour cabdi","Fatouma abdi qaalib",
  "muna med Ibrahim","Cadar nour aareh","Sahra Mahamoud ali","Amina oumar dhimbiil",
  "Saida abdilaahi cukur","Halima abdi Abdillahi","Hamda abdi Abdillahi","Siraad muse qalinleh",
  "Hibo mouhoumed Abdillahi","JAWHAR mouhoumed idleh","ahmed abdi ali","kafiya abdikarim Abdillahi",
  "farduusa mouse med","Sahra Ibrahim cindi","Qureesho Ibrahim cabdi","Nimco nour libaan",
  "Saxardiid aadan libaan","Mawa abdi houssien","Ifraax Mahamoud Hassan","Maryan nour Farah",
  "Abdilaahi said djama","MED ABDILLAHI SAID","Ali mouse dixood","Ilhaan houssien dahir",
  "Amina ibrahim yusuf","Hodan houssien ahmed","Hawa abdilaahi WARSAME","HAWEEYA ABDIRASHIID",
  "Loula ismacil libaan","Mahdi yonis cidhereh","Fosiya farax nour","Jamaal mouse adan",
  "Med Moumin barkhad","Ifraax dhabar geedi","Abdi Ahmed Abdilahi","Ali mouse Abdirahman",
  "Wahiba abdi ducaaleh","BOUH AHMED ABDI","Kawsar Mahamoud MAYGAG","Fadxiya cabaade cawaleh",
  "Cawo cawaleh houssien","Hamze Mohamed Abdillahi","Ahmed dahir osman","Mukhtaar buuni",
  "Canab warsame dhimbiil","MED omar mouhoumed","Layla Ibrahim nour","Amina ibrahim nour",
  "Raaxo muuse Moumin","Faduma muse barkhad","Johara houssien ahmed","Mustafe houssien muxumed",
  "Mustafe hassan Deheyeh","OUBAH ELMI ABDI","Abdikarim Abdillahi qawrah","Hibo abdikarim Abdillahi",
  "Canab xaamud cumar","Med adan ahmed","Faysal osman idiris","Muxubo abdi farax",
  "Ilhaan faysal osman","Shugri MED idiris","Med idiris muxumed","Abdikarim MED dahir",
  "Qamar jamac digood","Abdifatah houssien","Abdulkadir houssien","Abdirahim Moud Ali",
  "Saynab dahir kahin","Madina buraalleh houssien","Cibaado bile dharaar","Souleiman ahmed yousouf",
  "Med adan DJAMA","Fadxiya hassan ahmed","Hamoud geleh gadiid","Kimiya kamil maydhaneh",
  "Hassan kamil maydhaneh","Sacada kamil maydhaneh","HASAN Abdillahi cukur","Hamda abdi muse",
  "Sacada cilmi omar","Ubax geesaleh adan","Xabiiba houssien ceelabe","Ubax barkhad",
  "Casha cali xadi","Deka moussa qalinleh","Saado xaashin","Wiilo buux XIRSI",
  "Sahra ismacil xadi","Fatouma ahmed","Deka Mahamoud","Nimco axmed obsiye",
  "Ahmed yasin osman","Adan farax ali","Deka abdi Moumin","Arab nour adan",
  "Deka bashir Ibrahim","Abdulkadir Ibrahim Ahmed","Fadxiya dahir mouhoumed","Haboon houssien Mahamoud",
  "Ilyaas maxamuud abdi","Med moud hassan","Hibo moud hassan","Nimco hassan Deheyeh",
  "IKRAN MOUD BOKH","Hamda Djama Hassan","Abdi HASHIN AADAN","Cadar houssien Ismael",
  "Kadra siyaad digood","Moukhar ilmi dahir","Rabica abdi adan","Haboon dahir cali",
  "SHUCAYB AADAN AHMED","Med amiin SHUCAYB","Ilhaan dayib nour","Abdillahi med Ibrahim",
  "Abdi hassan fadul","Ahmed Mahamoud wacaysay","Asma abdi Ahmed","Khalid Abdirahman ismacil",
  "Fatouma med ali","Halimo farax dahir","Oumalkaire yousuf suldaan","Deka dahir",
  "Ilyaas maxamuud abdi","Cali Ibrahim geedi","Abdiqani Abdilahi Ahmed","Nasra mouhoumed Mahamoud",
  "Asma farxaan cali","JAWHAR AADAN ABDI","JAWHAR AHMED WARSAME","Hodan nour ELMI",
  "Anisa Abdillahi cali","Xawa suge DJAMA","Ifraax hassan sugaal","Xalimo abdilaahi",
  "Misra med oumar","Abdi med mouhoumed","Jamal cawaleh Farah","Abshir omar Ahmed",
  "Muxiyadin mahamed adan","Casha jamac bahdoon","Mustafe houssien muxumed","Abdillahi MAYGAG",
  "Med Abdillahi MAYGAG","Ismacil abdi Abdillahi","Ayaan mouhoumed","Moussa houssien EGEH",
  "Abdisalam mouhoumed","med abdi JAMAC","ahmed dayib dahir","Filsan med oumar",
  "Ifraax med oumar","Jamaal med idiris","Abdi dhool bashir","Abdirahman maxamed yousouf",
  "Filsan yoonis sugaal","Rahma Abdirahman","Abubakar Abdirahman","Mawliid ahmed ELMI",
  "Filsan hassan dahir","Bashir khayr DOON","ELMI goureh oumar","Abdisamad barkhad",
  "Hawa yousouf suldaan","Mahamed cawaleh","Suleekha abdi muse","Abdihakin dayib muse",
  "Mawliid abdi HABANE","Mahamed ahmed ELMI","Farax wayrax diriye","Quraysh qalinleh WARSAME",
  "Hodan Abdilahi Ibrahim","Burco nour aadan","Abdirahman bashir Ibrahim","Filsan maydhaneh Ibrahim",
  "Mahamed farxye","Hodan abdi idleh","Hassan med ali","Abdirahman ali guelle",
  "Saynab jegreh Abdillahi","Dalmar said Ibrahim","Shamsadin mahad ELMI","HASHIN DAHIR MEGANEH",
  "cibaado hussien maydhaneh","Hassan houssien","Mahamed abdi nour","Mustafa MED ELMI",
  "mawliid mouse mouhoumed","Idiris abdi hassan","Mustafe mahamed ELMI"
];

const PRESIDENTS = [
  {id:'1',period:'2011-2012',name:'Abdillahi Ciise'},
  {id:'2',period:'2013',name:'Ziyaad Farax'},
  {id:'3',period:'2014-2015',name:'Hassan Abdi'},
  {id:'4',period:'2016',name:'Abdillahi Said'},
  {id:'5',period:'2017',name:'Djemal Mohamed'},
  {id:'6',period:'2018-2019',name:'Faycal Isman Idriss'},
  {id:'7',period:'2020',name:'Chouaib Aden Ahmed'},
  {id:'8',period:'2020 (Intérim)',name:'Mme Madina Bouraleh Houssein'},
  {id:'9',period:'2024',name:'Abdikkarim Souleiman Said'},
  {id:'10',period:'Président actuel',name:'Mr. Mohamed Moumin Barkhadleh',isCurrent:true},
];

const GALLERY_IMAGES = Array.from({length:49},(_,i)=>({
  src:`images/Association  ABDC_page-${String(i+1).padStart(4,'0')}.jpg`,
  label:`Page ${i+1}`
}));

// ============ STATE ============
let state = {
  language: 'fr',
  isDark: false,
  isAdmin: false,
  members: MEMBERS_RAW.map((n,i)=>({id:String(i+1),name:n.trim(),role:i===0?'Président Association ABDC':'Membre Actif'})),
  presidents: [...PRESIDENTS],
  customTexts: {},
  galleryIndex: 0,
  password: 'abdc2025'
};

// Load from localStorage
try {
  const saved = JSON.parse(localStorage.getItem('abdc-state'));
  if(saved) {
    if(saved.members) state.members = saved.members;
    if(saved.presidents) state.presidents = saved.presidents;
    if(saved.customTexts) state.customTexts = saved.customTexts;
    if(saved.password) state.password = saved.password;
    if(saved.isDark) state.isDark = saved.isDark;
    if(saved.language) state.language = saved.language;
  }
} catch(e){}

function saveState(){
  localStorage.setItem('abdc-state', JSON.stringify({
    members:state.members, presidents:state.presidents,
    customTexts:state.customTexts, password:state.password,
    isDark:state.isDark, language:state.language
  }));
}

// ============ DARK MODE ============
function applyTheme(){
  document.body.classList.toggle('dark', state.isDark);
  const btn = document.getElementById('theme-toggle');
  if(btn) btn.textContent = state.isDark ? '☀️' : '🌙';
}

function toggleTheme(){
  state.isDark = !state.isDark;
  applyTheme();
  saveState();
}

// ============ LANGUAGE ============
const LANGS = {fr:'en',en:'ar',ar:'fr'};
function toggleLang(){
  state.language = LANGS[state.language];
  document.getElementById('lang-btn').textContent = '🌐 '+state.language.toUpperCase();
  updateHeroLang();
  saveState();
}

function updateHeroLang(){
  const titles = {
    fr:"Association pour la Bienfaisance et le Développement Communautaire",
    en:"Association for Charity and Community Development",
    ar:"جمعية الإحسان وتنمية المجتمع"
  };
  const subs = {
    fr:"ABDC — Quartier 5 et Branche Balbala",
    en:"ABDC — District 5 and Balbala Branch",
    ar:"ABDC — الحي 5 وفرع بلبلا"
  };
  const el1 = document.getElementById('hero-title');
  const el2 = document.getElementById('hero-subtitle');
  if(el1) el1.textContent = titles[state.language];
  if(el2) el2.textContent = subs[state.language];
}

// ============ NAVBAR SCROLL ============
window.addEventListener('scroll',()=>{
  document.querySelector('.nav').classList.toggle('scrolled', window.scrollY > 50);
});

// ============ MOBILE MENU ============
function toggleMobile(){
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ============ SCROLL ANIMATIONS ============
function initScrollAnimations(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}});
  },{threshold:0.1});
  document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
}

// ============ ANIMATED COUNTERS ============
function animateCounters(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        const end = parseInt(el.dataset.count);
        let current = 0;
        const step = Math.max(1, Math.floor(end/60));
        const timer = setInterval(()=>{
          current += step;
          if(current >= end){current = end; clearInterval(timer)}
          el.textContent = current;
        }, 25);
        obs.unobserve(el);
      }
    });
  },{threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(el=>obs.observe(el));
}

// ============ PROGRAMS ACCORDION ============
function toggleProgram(el){
  el.closest('.program-card').classList.toggle('open');
}

// ============ MODALS ============
function openModal(id){document.getElementById(id).classList.add('open')}
function closeModal(id){document.getElementById(id).classList.remove('open')}

function renderMembers(){
  const list = document.getElementById('members-list');
  if(!list) return;
  list.innerHTML = state.members.map((m,i)=>`
    <div class="member-item">
      <div class="member-num">${i+1}</div>
      <div><div class="member-name">${m.name}</div>
      ${m.role?`<div class="member-role">${m.role}</div>`:''}</div>
    </div>`).join('');
  const countEl = document.getElementById('member-count');
  if(countEl) countEl.textContent = state.members.length;
  const badgeEl = document.getElementById('hero-badge-count');
  if(badgeEl) badgeEl.textContent = state.members.length + ' membres actifs depuis 2011';
}

function renderPresidents(){
  const list = document.getElementById('presidents-list');
  if(!list) return;
  list.innerHTML = state.presidents.map(p=>`
    <div class="timeline-item ${p.isCurrent?'current':''}">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <span class="timeline-period">${p.period}</span>
        <div style="display:flex;align-items:center;gap:1rem;margin-top:.5rem">
          <div style="width:3rem;height:3rem;border-radius:50%;background:${p.isCurrent?'rgba(249,168,37,.15)':'rgba(0,0,0,.04)'};display:flex;align-items:center;justify-content:center;font-size:1.3rem">🏅</div>
          <div><div class="timeline-name">${p.name}</div>
          ${p.isCurrent?'<div style="color:var(--accent);font-weight:600;font-size:.85rem">Président Actuel</div>':''}</div>
        </div>
      </div>
    </div>`).join('');
}

// ============ GALLERY ============
function openGallery(){
  state.galleryIndex = 0;
  document.getElementById('gallery-overlay').classList.add('open');
  updateGallery();
}
function closeGallery(){document.getElementById('gallery-overlay').classList.remove('open')}

function galleryNext(){state.galleryIndex = (state.galleryIndex+1)%GALLERY_IMAGES.length; updateGallery()}
function galleryPrev(){state.galleryIndex = (state.galleryIndex-1+GALLERY_IMAGES.length)%GALLERY_IMAGES.length; updateGallery()}

function updateGallery(){
  const ci = state.galleryIndex;
  document.getElementById('gallery-count').textContent = `${ci+1} / ${GALLERY_IMAGES.length}`;
  // Update cards
  document.querySelectorAll('.carousel-card').forEach((card,idx)=>{
    const diff = idx - ci;
    const abs = Math.abs(diff);
    if(abs > 4){card.style.display='none';return}
    card.style.display='block';
    const tx = diff * (window.innerWidth<600?180:280);
    const tz = -abs*120;
    const ry = diff*-12;
    const sc = 1-abs*.12;
    const op = Math.max(.1, 1-abs*.25);
    card.style.transform = `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${sc})`;
    card.style.opacity = op;
    card.style.zIndex = 10 - abs;
    card.classList.toggle('active', idx===ci);
  });
  // Thumbnails
  const strip = document.getElementById('thumb-strip');
  if(!strip) return;
  strip.innerHTML = '';
  const start = Math.max(0, Math.min(ci-5, GALLERY_IMAGES.length-11));
  for(let i=0;i<Math.min(11,GALLERY_IMAGES.length);i++){
    const ai = start+i;
    if(ai>=GALLERY_IMAGES.length) break;
    const btn = document.createElement('button');
    btn.className = ai===ci?'active':'';
    btn.onclick = ()=>{state.galleryIndex=ai;updateGallery()};
    const img = document.createElement('img');
    img.src = GALLERY_IMAGES[ai].src;
    img.loading='lazy';
    img.style.width = ai===ci?'48px':'32px';
    img.style.height = ai===ci?'32px':'24px';
    btn.appendChild(img);
    strip.appendChild(btn);
  }
}

function buildGalleryCards(){
  const stage = document.getElementById('carousel-stage');
  GALLERY_IMAGES.forEach((img,idx)=>{
    const card = document.createElement('div');
    card.className = 'carousel-card';
    card.onclick = ()=>{state.galleryIndex=idx;updateGallery()};
    card.innerHTML = `<img src="${img.src}" alt="${img.label}" loading="lazy">`;
    stage.appendChild(card);
  });
}

// ============ ADMIN ============
function showAdminLogin(){openModal('admin-login-modal')}

function handleAdminLogin(e){
  e.preventDefault();
  const pwd = document.getElementById('admin-pwd').value;
  if(pwd === state.password){
    state.isAdmin = true;
    document.body.classList.add('admin-mode');
    document.querySelector('.admin-bar').classList.add('open');
    closeModal('admin-login-modal');
    document.getElementById('admin-pwd').value='';
    document.getElementById('login-error').textContent='';
    showToast('Mode édition activé');
  } else {
    document.getElementById('login-error').textContent='Mot de passe incorrect';
  }
}

function adminLogout(){
  state.isAdmin = false;
  document.body.classList.remove('admin-mode');
  document.querySelector('.admin-bar').classList.remove('open');
  closeModal('admin-panel-modal');
}

function openAdminPanel(){openModal('admin-panel-modal')}

function switchTab(tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c=>c.style.display='none');
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  document.getElementById('tab-'+tab).style.display='block';
  if(tab==='members') renderAdminMembers();
  if(tab==='presidents') renderAdminPresidents();
}

function renderAdminMembers(){
  const el = document.getElementById('admin-members-list');
  el.innerHTML = `<p style="font-size:.85rem;color:#6b7280;margin-bottom:.75rem">${state.members.length} membres</p>` +
    state.members.map(m=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:.5rem .75rem;border-radius:8px;margin-bottom:.25rem;font-size:.9rem" class="member-item">
      <div><strong>${m.name}</strong> <span style="font-size:.75rem;color:#9ca3af;margin-left:.5rem">${m.role||''}</span></div>
      <button onclick="removeMember('${m.id}')" style="color:#ef4444;background:none;border:none;cursor:pointer;font-size:1.1rem">🗑️</button>
    </div>`).join('');
}

function addMember(e){
  e.preventDefault();
  const name = document.getElementById('new-member-name').value.trim();
  if(!name) return;
  const role = document.getElementById('new-member-role').value.trim()||'Membre Actif';
  state.members.push({id:Date.now().toString(),name,role});
  saveState(); renderMembers(); renderAdminMembers();
  document.getElementById('new-member-name').value='';
  document.getElementById('new-member-role').value='';
  showToast('Membre ajouté');
}

function removeMember(id){
  state.members = state.members.filter(m=>m.id!==id);
  saveState(); renderMembers(); renderAdminMembers();
}

function renderAdminPresidents(){
  const el = document.getElementById('admin-presidents-list');
  el.innerHTML = state.presidents.map(p=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:.75rem;border-radius:8px;margin-bottom:.5rem;border:1px solid ${p.isCurrent?'var(--accent)':'rgba(0,0,0,.06)'};font-size:.9rem" class="glass-card">
    <div><strong>${p.name}</strong> <span style="font-size:.8rem;color:#6b7280;margin-left:.5rem">(${p.period})</span>
    ${p.isCurrent?'<span style="color:var(--accent);font-weight:700;margin-left:.5rem;font-size:.8rem">Actuel</span>':''}</div>
    <button onclick="removePresident('${p.id}')" style="color:#ef4444;background:none;border:none;cursor:pointer;font-size:1.1rem">🗑️</button>
  </div>`).join('');
}

function addPresident(e){
  e.preventDefault();
  const name = document.getElementById('new-pres-name').value.trim();
  const period = document.getElementById('new-pres-period').value.trim();
  const isCurrent = document.getElementById('new-pres-current').checked;
  if(!name||!period) return;
  state.presidents.push({id:Date.now().toString(),name,period,isCurrent});
  saveState(); renderPresidents(); renderAdminPresidents();
  document.getElementById('new-pres-name').value='';
  document.getElementById('new-pres-period').value='';
  document.getElementById('new-pres-current').checked=false;
  showToast('Président ajouté');
}

function removePresident(id){
  state.presidents = state.presidents.filter(p=>p.id!==id);
  saveState(); renderPresidents(); renderAdminPresidents();
}

function changePassword(e){
  e.preventDefault();
  const cur = document.getElementById('cur-pwd').value;
  const nw = document.getElementById('new-pwd').value;
  const conf = document.getElementById('conf-pwd').value;
  const msg = document.getElementById('pwd-msg');
  if(cur!==state.password){msg.textContent='❌ Mot de passe actuel incorrect';msg.style.color='#ef4444';return}
  if(nw.length<4){msg.textContent='❌ Minimum 4 caractères';msg.style.color='#ef4444';return}
  if(nw!==conf){msg.textContent='❌ Les mots de passe ne correspondent pas';msg.style.color='#ef4444';return}
  state.password = nw; saveState();
  msg.textContent='✅ Mot de passe changé !';msg.style.color='#22c55e';
  document.getElementById('cur-pwd').value='';
  document.getElementById('new-pwd').value='';
  document.getElementById('conf-pwd').value='';
  showToast('Mot de passe changé');
}

// ============ INLINE EDITING ============
function initEditableTexts(){
  document.querySelectorAll('[data-editable]').forEach(el=>{
    const id = el.dataset.editable;
    if(state.customTexts[id]) el.textContent = state.customTexts[id];
    el.addEventListener('click',()=>{
      if(!state.isAdmin) return;
      const current = el.textContent;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = current;
      input.className = 'edit-input';
      input.style.fontSize = getComputedStyle(el).fontSize;
      const save = ()=>{
        const val = input.value.trim();
        if(val && val!==current){
          el.textContent = val;
          state.customTexts[id] = val;
          saveState();
          showToast('Texte modifié');
        } else {
          el.textContent = current;
        }
        if(input.parentNode) input.parentNode.replaceChild(el, input);
      };
      input.addEventListener('blur', save);
      input.addEventListener('keydown',e=>{
        if(e.key==='Enter') save();
        if(e.key==='Escape'){el.textContent=current; if(input.parentNode) input.parentNode.replaceChild(el,input)}
      });
      el.parentNode.replaceChild(input, el);
      input.focus();
      input.select();
    });
  });
}

// ============ TOAST ============
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = '✓ '+msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ============ BAR CHART ANIMATION ============
function initCharts(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll('.bar').forEach(bar=>{
          bar.style.height = bar.dataset.height;
        });
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.3});
  const chart = document.querySelector('.bar-chart');
  if(chart) obs.observe(chart);
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded',()=>{
  applyTheme();
  document.getElementById('lang-btn').textContent = '🌐 '+state.language.toUpperCase();
  updateHeroLang();
  renderMembers();
  renderPresidents();
  buildGalleryCards();
  initScrollAnimations();
  animateCounters();
  initEditableTexts();
  initCharts();
  // Close mobile menu on link click
  document.querySelectorAll('#mobile-menu a').forEach(a=>{
    a.addEventListener('click',()=>document.getElementById('mobile-menu').classList.remove('open'));
  });
});
