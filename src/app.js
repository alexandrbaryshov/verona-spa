const sheet=document.querySelector('#booking-sheet');
document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',()=>sheet.showModal()));
document.querySelector('.close-sheet').addEventListener('click',()=>sheet.close());
sheet.addEventListener('click',e=>{if(e.target===sheet){const r=sheet.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)sheet.close();}});
const floating=document.querySelector('.floating');
function update(){floating.hidden=window.scrollY<300;}
window.addEventListener('scroll',update,{passive:true});update();
document.querySelector('#to-top').addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
const gallery=document.querySelector('.studio-gallery');
const photos=[...gallery.querySelectorAll('img')];
const frame=document.createElement('div');frame.className='gallery-frame';gallery.before(frame);frame.append(gallery);
const viewer=document.createElement('dialog');viewer.className='photo-viewer';viewer.setAttribute('aria-label','Фотографии студии');
const full=document.createElement('img');viewer.append(full);document.body.append(viewer);
let current=0;
function show(index){current=(index+photos.length)%photos.length;full.src=photos[current].src;full.alt=photos[current].alt;}
function control(parent,label,path,action,cls){const b=document.createElement('button');b.type='button';b.className='gallery-control '+cls;b.setAttribute('aria-label',label);b.innerHTML='<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="'+path+'"/></svg>';b.addEventListener('click',action);parent.append(b);}
for(const [direction,path,label,cls] of [[-1,'m15 5-7 7 7 7','Предыдущее фото','prev'],[1,'m9 5 7 7-7 7','Следующее фото','next']]){
control(frame,label,path,()=>{const step=photos[1]?.offsetLeft-photos[0].offsetLeft||gallery.clientWidth;gallery.scrollBy({left:direction*step,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});},cls);
control(viewer,label,path,()=>show(current+direction),cls);
}
control(viewer,'Закрыть фото','m6 6 12 12M6 18 18 6',()=>viewer.close(),'photo-close');
photos.forEach((photo,index)=>{photo.tabIndex=0;photo.setAttribute('role','button');photo.setAttribute('aria-label','Увеличить: '+photo.alt);const open=()=>{show(index);viewer.showModal();};photo.addEventListener('click',open);photo.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}});});
viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(current-1);if(e.key==='ArrowRight')show(current+1);});
viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close();});
let start;viewer.addEventListener('touchstart',e=>{start=e.changedTouches[0].clientX;},{passive:true});viewer.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-start;if(Math.abs(delta)>45)show(current+(delta<0?1:-1));},{passive:true});

// A calm position indicator also announces gallery navigation to assistive technology.
const galleryCount=document.createElement('span');galleryCount.className='gallery-count';galleryCount.setAttribute('aria-live','polite');frame.append(galleryCount);
function updateGalleryCount(){const nearest=photos.reduce((best,p,i)=>Math.abs(p.offsetLeft-photos[0].offsetLeft-gallery.scrollLeft)<best.distance?{index:i,distance:Math.abs(p.offsetLeft-photos[0].offsetLeft-gallery.scrollLeft)}:best,{index:0,distance:Infinity});galleryCount.textContent=String(nearest.index+1).padStart(2,'0')+' / '+String(photos.length).padStart(2,'0');}
gallery.addEventListener('scroll',updateGalleryCount,{passive:true});updateGalleryCount();
const soloLink=document.querySelector('.catalog-feature a');soloLink?.addEventListener('click',()=>{const group=document.querySelector('#solo-programs');if(group)group.open=true;});

// Keep reviews compact, with native horizontal swipe and explicit keyboard controls.
const reviewSection=document.querySelector('.reviews');
const reviewTrack=document.createElement('div');reviewTrack.className='review-track';reviewTrack.tabIndex=0;reviewTrack.setAttribute('aria-label','Отзывы гостей — листайте влево или вправо');
const reviewSlides=[...reviewSection.querySelectorAll('figure')];reviewSlides[0].before(reviewTrack);reviewSlides.forEach((slide,i)=>{slide.setAttribute('role','group');slide.setAttribute('aria-label',`Отзыв ${i+1} из ${reviewSlides.length}`);reviewTrack.append(slide);});
reviewSection.setAttribute('aria-roledescription','карусель');
const reviewControls=document.createElement('div');reviewControls.className='review-controls';reviewTrack.after(reviewControls);
const reviewCounter=document.createElement('span');reviewCounter.setAttribute('aria-live','polite');
let reviewIndex=0;
function goReview(delta){reviewIndex=(reviewIndex+delta+reviewSlides.length)%reviewSlides.length;reviewTrack.scrollTo({left:reviewIndex*reviewTrack.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
control(reviewControls,'Предыдущий отзыв','m15 5-7 7 7 7',()=>goReview(-1),'prev');reviewControls.append(reviewCounter);control(reviewControls,'Следующий отзыв','m9 5 7 7-7 7',()=>goReview(1),'next');
function syncReview(){reviewIndex=Math.round(reviewTrack.scrollLeft/reviewTrack.clientWidth);reviewCounter.textContent=`${reviewIndex+1} / ${reviewSlides.length}`;}
reviewTrack.addEventListener('scroll',syncReview,{passive:true});reviewTrack.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();goReview(e.key==='ArrowRight'?1:-1);}});syncReview();
function fitReview(){reviewTrack.style.height=reviewSlides[reviewIndex].offsetHeight+'px';}
reviewTrack.addEventListener('scroll',fitReview,{passive:true});window.addEventListener('resize',()=>{reviewTrack.scrollLeft=reviewIndex*reviewTrack.clientWidth;fitReview();});document.fonts.ready.then(fitReview);fitReview();
const heroVideo=document.querySelector('#hero-video');
heroVideo.muted=true;
heroVideo.src=innerWidth<=700?import.meta.env.BASE_URL+'media/face-massage-wide-mobile.mp4':import.meta.env.BASE_URL+'media/face-massage-wide.mp4';
if(innerWidth<=700)heroVideo.poster=import.meta.env.BASE_URL+'massage/face-massage-mobile.webp';
async function startHero(){try{await heroVideo.play();}catch{}}
startHero();
new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting)heroVideo.pause();else startHero();}},{threshold:.15}).observe(heroVideo);
document.addEventListener('visibilitychange',()=>{if(document.hidden)heroVideo.pause();else startHero();});

