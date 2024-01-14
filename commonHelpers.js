import{S as u,i as l}from"./assets/vendor-60857eec.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const f="41780713-d9d59fd8c4b13cd5ac9a220da",d=document.querySelector(".gallery"),c=document.querySelector(".loader-wrapper"),m=document.querySelector(".search-form"),p=new u(".gallery li a",{captionsData:"alt",captionDelay:250});let i=[];function y(o){return c.classList.add("is-active"),i=[],fetch(`https://pixabay.com/api/?key=${f}&q=${o}&image_type=photo&orientation=horizontal&pretty=true&safesearch=true&per_page=21`).then(r=>r.json()).then(r=>r.hits).catch(r=>console.log(r)).finally(()=>c.classList.remove("is-active"))}m.addEventListener("submit",async o=>{o.preventDefault();const r=document.querySelector(".search-form input").value;if(r==="")return l.error({title:"Error",message:"Please enter a search query"});const a=await y(r);i.push(...a);const s=i.map(e=>`
        <li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
            <img
                class="gallery-image"
                src="${e.webformatURL}"
                alt="${e.tags}"
            />
            </a>
        </li>
        `).join("");if(d.innerHTML=s,a.length===0)return l.error({title:"Error",message:"No images found for this request"});p.refresh()});
//# sourceMappingURL=commonHelpers.js.map
