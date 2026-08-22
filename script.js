// Catatan: file ini membutuhkan data.js dimuat terlebih dahulu (journeyData & skillData)

lucide.createIcons();

const header = document.getElementById('site-header');
function onScroll(){
  if(window.scrollY > 8){ header.classList.add('scrolled'); }
  else{ header.classList.remove('scrolled'); }
}
window.addEventListener('scroll', onScroll);
onScroll();

document.querySelectorAll('.menu-row').forEach(function(row){
  row.addEventListener('click', function(){
    document.getElementById('menu-toggle').checked = false;
  });
});

const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){ entry.target.classList.add('in-view'); }
    else{ entry.target.classList.remove('in-view'); }
  });
}, { threshold: 0.15 });
revealEls.forEach(function(el){ io.observe(el); });

const heroTitle = document.querySelector('.hero h1');
if(heroTitle){
  const heroTitleIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        heroTitle.classList.remove('hero-title-visible');
        void heroTitle.offsetWidth;
        heroTitle.classList.add('hero-title-visible');
      } else {
        heroTitle.classList.remove('hero-title-visible');
      }
    });
  }, { threshold: 0.25 });
  heroTitleIo.observe(heroTitle);
}

const photoWrap = document.getElementById('photo-wrap');
if(photoWrap){
  const photoIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ photoWrap.classList.add('lit'); }
      else{ photoWrap.classList.remove('lit'); }
    });
  }, { threshold: 0.3 });
  photoIo.observe(photoWrap);
}

const aboutBox = document.getElementById('about-box');
if(aboutBox){
  const aboutIo = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        aboutBox.classList.remove('in-view');
        aboutBox.querySelectorAll('p').forEach(function(p){ p.style.animation='none'; });
        void aboutBox.offsetWidth;
        aboutBox.querySelectorAll('p').forEach(function(p){ p.style.animation=''; });
        aboutBox.classList.add('in-view');
      } else {
        aboutBox.classList.remove('in-view');
      }
    });
  }, { threshold:0.22 });
  aboutIo.observe(aboutBox);
}

const journeyOverlay=document.getElementById('journey-overlay');
const journeySlideshow=document.getElementById('journey-slideshow');
const journeyDots=document.getElementById('journey-dots');
const journeyYear=document.getElementById('journey-modal-year');
const journeyTitle=document.getElementById('journey-modal-title');
const journeyDescription=document.getElementById('journey-modal-description');
const journeyProblem=document.getElementById('journey-modal-problem');
const journeySkillsWrap=document.getElementById('journey-modal-skills-wrap');
const journeySkillsEl=document.getElementById('journey-modal-skills');
const journeyReview=document.getElementById('journey-modal-review');
const journeyConfidentialMsg=document.getElementById('journey-modal-confidential');
const journeyClose=document.getElementById('journey-close');
let journeyTimer=null, journeyIndex=0, currentJourneyKey=null;

const CONFIDENTIAL_TEXT = {
  id:'Mohon maaf, dokumen proyek dirahasiakan untuk kepentingan klien.',
  en:'Sorry, the project documentation is kept confidential for the client\u2019s privacy.'
};

document.querySelectorAll('.journey-tab').forEach(function(tab){
  tab.addEventListener('click',function(){
    document.querySelectorAll('.journey-tab').forEach(function(t){t.classList.remove('active');});
    document.querySelectorAll('.journey-panel').forEach(function(panel){panel.classList.remove('active');});
    tab.classList.add('active');
    document.getElementById('journey-'+tab.getAttribute('data-panel')).classList.add('active');
  });
});

function renderJourneySlide(index){
  const slides=journeySlideshow.querySelectorAll('.journey-slide');
  const dots=journeyDots.querySelectorAll('.journey-dot');
  slides.forEach(function(slide,i){slide.classList.toggle('active',i===index);});
  dots.forEach(function(dot,i){dot.classList.toggle('active',i===index);});
}
function updateJourneyLanguage(){
  if(!currentJourneyKey) return;
  const data=journeyData[currentJourneyKey];
  if(!data) return;

  const isEnglish=currentLang === 'en';
  const title=isEnglish && data.titleEn ? data.titleEn : data.title;
  const year=isEnglish && data.yearEn ? data.yearEn : data.year;
  const description=isEnglish && data.descriptionEn ? data.descriptionEn : data.description;
  const problem=isEnglish && data.problemEn ? data.problemEn : data.problem;

  journeyYear.textContent=year;
  journeyTitle.textContent=title;
  journeyDescription.textContent=description;

  if(problem){
    journeyProblem.textContent=problem;
    journeyProblem.style.display='block';
  } else {
    journeyProblem.style.display='none';
  }

  journeySlideshow.querySelectorAll('.journey-slide img').forEach(function(img,i){
    img.alt=title+' slide '+(i+1);
  });

  if(data.confidential){
    journeyConfidentialMsg.textContent = isEnglish ? CONFIDENTIAL_TEXT.en : CONFIDENTIAL_TEXT.id;
  }
}

function openJourney(key){
  const data=journeyData[key]; if(!data) return;
  currentJourneyKey=key;
  clearInterval(journeyTimer); journeyIndex=0;

  const isEnglish=currentLang === 'en';
  const title=isEnglish && data.titleEn ? data.titleEn : data.title;

  journeySlideshow.innerHTML=data.images.map(function(src,i){
    return '<div class="journey-slide '+(i===0?'active':'')+'"><img src="'+src+'" alt="'+title+' slide '+(i+1)+'"></div>';
  }).join('')+'<span class="journey-slide-count">01 / 03</span>';

  journeyDots.innerHTML=data.images.map(function(_,i){
    return '<span class="journey-dot '+(i===0?'active':'')+'"></span>';
  }).join('');

  updateJourneyLanguage();

  if(data.skills && data.skills.length){
    journeySkillsEl.innerHTML=data.skills.map(function(s){return '<span class="journey-skill-pill">'+s+'</span>';}).join('');
    journeySkillsWrap.style.display='block';
  } else {
    journeySkillsWrap.style.display='none';
  }

  journeyConfidentialMsg.style.display='none';

  if(data.reviewLink){
    journeyReview.href=data.reviewLink;
    journeyReview.removeAttribute('data-confidential');
    journeyReview.style.display='flex';
  } else if(data.confidential){
    journeyReview.href='javascript:void(0)';
    journeyReview.setAttribute('data-confidential','true');
    journeyReview.style.display='flex';
  } else {
    journeyReview.removeAttribute('data-confidential');
    journeyReview.style.display='none';
  }

  journeyOverlay.classList.add('open'); journeyOverlay.setAttribute('aria-hidden','false');
  lucide.createIcons();
  journeyTimer=setInterval(function(){
    journeyIndex=(journeyIndex+1)%3;
    renderJourneySlide(journeyIndex);
    journeySlideshow.querySelector('.journey-slide-count').textContent=String(journeyIndex+1).padStart(2,'0')+' / 03';
  },4200);
}
function closeJourney(){clearInterval(journeyTimer);currentJourneyKey=null;journeyOverlay.classList.remove('open');journeyOverlay.setAttribute('aria-hidden','true');journeyConfidentialMsg.style.display='none';}
document.querySelectorAll('.journey-card').forEach(function(card){card.addEventListener('click',function(){openJourney(card.getAttribute('data-journey'));});});
journeyClose.addEventListener('click',closeJourney);
journeyOverlay.addEventListener('click',function(e){if(e.target===journeyOverlay)closeJourney();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeJourney();});

journeyReview.addEventListener('click',function(e){
  if(journeyReview.getAttribute('data-confidential')==='true'){
    e.preventDefault();
    journeyConfidentialMsg.textContent = currentLang==='en' ? CONFIDENTIAL_TEXT.en : CONFIDENTIAL_TEXT.id;
    journeyConfidentialMsg.style.display='block';
  }
});

const journeyFlow=document.querySelector('.journey-flow');
function animateJourneyDots(){
  if(!journeyFlow) return;
  const cards=journeyFlow.querySelectorAll('.journey-panel.active .journey-card');
  cards.forEach(function(card){card.classList.remove('flow-active');card.classList.add('flow-dim');});
  if(!cards.length) return;
  cards.forEach(function(card,i){
    setTimeout(function(){
      card.classList.remove('flow-dim'); card.classList.add('flow-active');
      setTimeout(function(){card.classList.remove('flow-active');card.classList.add('flow-dim');},650);
    },i*850);
  });
}
animateJourneyDots();
setInterval(animateJourneyDots,4300);

const skillOverlay = document.getElementById('skill-detail-overlay');
const skillTitle = document.getElementById('skill-detail-title');
const skillList = document.getElementById('skill-list');
const skillClose = document.getElementById('skill-detail-close');
function openSkillDetail(key){
  const data = skillData[key];
  if(!data) return;
  skillTitle.setAttribute('data-id', data.titleId);
  skillTitle.setAttribute('data-en', data.titleEn);
  skillTitle.textContent = currentLang === 'en' ? data.titleEn : data.titleId;
  skillList.innerHTML = data.skills.map(function(item){
    return '<div class="skill-detail-item">' +
      '<div class="skill-detail-name">' +
        (item[1] === 'figma'
          ? '<i data-lucide="layout-grid"></i>'
          : '<i data-lucide="'+item[1]+'"></i>') +
        '<span>'+item[0]+'</span>' +
      '</div>' +
      '<div class="skill-level-row"><span class="skill-level-label">Level / Penguasaan</span><span class="skill-percent">'+item[2]+'%</span></div>' +
      '<div class="skill-level"><span style="--level:'+item[2]+'%"></span></div>' +
    '</div>';
  }).join('');
  skillOverlay.classList.add('open');
  skillOverlay.setAttribute('aria-hidden','false');
  lucide.createIcons();
}
document.querySelectorAll('.skill-card').forEach(function(card){
  card.addEventListener('click', function(){ openSkillDetail(card.getAttribute('data-skill')); });
});
function closeSkillDetail(){
  skillOverlay.classList.remove('open');
  skillOverlay.setAttribute('aria-hidden','true');
}
skillClose.addEventListener('click', closeSkillDetail);
skillOverlay.addEventListener('click', function(e){ if(e.target === skillOverlay) closeSkillDetail(); });
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeSkillDetail(); });

let currentLang = 'id';
function applyLang(lang){
  document.querySelectorAll('[data-en]').forEach(function(el){
    el.textContent = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-id');
  });
  document.querySelectorAll('[data-title-en]').forEach(function(el){
    el.setAttribute('title', lang === 'en' ? el.getAttribute('data-title-en') : el.getAttribute('data-title-id'));
  });
  currentLang = lang;
  if(skillOverlay && skillOverlay.classList.contains('open') && skillTitle){
    skillTitle.textContent = lang === 'en' ? skillTitle.getAttribute('data-en') : skillTitle.getAttribute('data-id');
  }
  if(journeyOverlay && journeyOverlay.classList.contains('open') && currentJourneyKey){
    updateJourneyLanguage();
  }
}
const langIdButton = document.getElementById('lang-id');
const langEnButton = document.getElementById('lang-en');

function updateLangControl(){
  if(langIdButton) langIdButton.classList.toggle('active', currentLang === 'id');
  if(langEnButton) langEnButton.classList.toggle('active', currentLang === 'en');
}

function setLang(lang){
  applyLang(lang);
  updateLangControl();
}

if(langIdButton) langIdButton.addEventListener('click', function(){ setLang('id'); });
if(langEnButton) langEnButton.addEventListener('click', function(){ setLang('en'); });

const themeSwitch = document.getElementById('theme-switch');
const themeText = document.getElementById('theme-text');

function setTheme(mode){
  const isDark = mode === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
  const iconWrap = document.getElementById('theme-icon-wrap');
  if(iconWrap){
    iconWrap.innerHTML = '<i data-lucide="' + (isDark ? 'moon' : 'lightbulb') + '"></i>';
  }
  if(themeText) themeText.textContent = isDark ? 'Dark' : 'Light';
  localStorage.setItem('ys-theme', mode);
  lucide.createIcons();
}

if(themeSwitch){
  themeSwitch.addEventListener('click', function(){
    setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');
  });
}

const savedTheme = localStorage.getItem('ys-theme') || 'light';
setTheme(savedTheme);
updateLangControl();
