 // Demo dataset (do not use official Steam assets in production without permission)
    const GAMES = [
      {id:1,title:'Counter-Strike: Global Offensive',tag:'top',price:'INGYEN',desc:'Csapat alapú FPS versenyjáték.',thumb:'https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg',shots:['https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/730/ss_1.jpg']},
      {id:2,title:'Dota 2',tag:'top',price:'INGYEN',desc:'MOBA — taktika és együttműködés.',thumb:'https://cdn.cloudflare.steamstatic.com/steam/apps/570/capsule_616x353.jpg',shots:['https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/570/ss_1.jpg']},
      {id:3,title:'Team Fortress 2',tag:'free',price:'INGYEN',desc:'Színes, osztályalapú humoros FPS.',thumb:'https://cdn.cloudflare.steamstatic.com/steam/apps/440/capsule_616x353.jpg',shots:['https://cdn.cloudflare.steamstatic.com/steam/apps/440/header.jpg','https://cdn.cloudflare.steamstatic.com/steam/apps/440/ss_1.jpg']},
      {id:4,title:'Példa RPG',tag:'top',price:'$19.99',desc:'Hangulatos kalandjáték.',thumb:'https://picsum.photos/seed/rpg/800/450',shots:['https://picsum.photos/seed/rpg1/800/450','https://picsum.photos/seed/rpg2/800/450']},
      {id:5,title:'Sci-Fi Shooter',tag:'all',price:'$9.99',desc:'Gyors tempójú űrlövöldözős.',thumb:'https://picsum.photos/seed/sci/800/450',shots:['https://picsum.photos/seed/sci1/800/450','https://picsum.photos/seed/sci2/800/450']}
    ];

    const catalog = document.getElementById('catalog');
    const search = document.getElementById('search');
    const tabs = document.querySelectorAll('.tab');

    function renderList(list){
      catalog.innerHTML = '';
      list.forEach(g => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <div class="thumb"><img src="${g.thumb}" alt="${escapeHtml(g.title)} screenshot" style="width:100%;height:100%;object-fit:cover"></div>
          <div class="meta">
            <h3>${escapeHtml(g.title)}</h3>
            <div class="muted">${escapeHtml(g.desc)}</div>
            <div class="price-row">
              <div class="price">${escapeHtml(g.price)}</div>
              <button class="buy" data-id="${g.id}">Megnézem</button>
            </div>
          </div>`;
        catalog.appendChild(card);
      });

      // attach click handlers for detail buttons
      catalog.querySelectorAll('.buy').forEach(btn => btn.addEventListener('click', (e)=>{
        const id = Number(e.currentTarget.dataset.id);
        openModal(GAMES.find(x=>x.id===id));
      }));
    }

    function escapeHtml(s){return (s+'').replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;" })[c]);}

    // filtering and search
    function applyFilter(){
      const q = search.value.trim().toLowerCase();
      const activeTab = document.querySelector('.tab.active');
      const filter = activeTab ? activeTab.dataset.filter : 'all';
      let out = GAMES.filter(g=> (filter==='all' || (g.tag===filter) || filter==='top'&&g.tag==='top'));
      if(q) out = out.filter(g=> g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q));
      renderList(out);
    }

    // tabs
    tabs.forEach(t=> t.addEventListener('click', ()=>{
      tabs.forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
      applyFilter();
    }));
    // set first tab active
    tabs[0].classList.add('active');

    search.addEventListener('input', applyFilter);

    // modal
    const modal = document.getElementById('modal');
    const mTitle = document.getElementById('m-title');
    const mCover = document.getElementById('m-cover');
    const mDesc = document.getElementById('m-desc');
    const mPrice = document.getElementById('m-price');
    const mShots = document.getElementById('m-shots');
    const mClose = document.getElementById('m-close');

    function openModal(game){
      if(!game) return;
      mTitle.textContent = game.title;
      mCover.src = game.thumb;
      mDesc.textContent = game.desc;
      mPrice.textContent = game.price;
      mShots.innerHTML = '';
      game.shots.forEach(s=>{
        const i = document.createElement('img');
        i.src = s; i.alt = game.title + ' shot'; i.style.width='48%'; i.style.borderRadius='6px';
        i.style.objectFit='cover'; mShots.appendChild(i);
      });
      modal.style.display='flex'; modal.setAttribute('aria-hidden','false');
    }
    function closeModal(){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }
    mClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });

    // initial render
    renderList(GAMES);
