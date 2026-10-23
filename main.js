/**
 * Technotouch Trading L.L.C - Dubai, UAE
 * Established in Dubai 2021
 * Interactive Application Engine & Business Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  let currentLang = localStorage.getItem('technotouch_lang') || 'ar';
  const WHATSAPP_NUMBER = '971502655812';

  // DOM Elements
  const htmlRoot = document.documentElement;
  const body = document.body;
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langToggleText = document.getElementById('langToggleText');
  const siteHeader = document.getElementById('siteHeader');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mainNav = document.getElementById('mainNav');
  const subcontractingContainer = document.getElementById('subcontractingContainer');
  const metalsContainer = document.getElementById('metalsContainer');
  const projectsContainer = document.getElementById('projectsContainer');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const rfqForm = document.getElementById('rfqForm');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  // Calculator Elements
  const calcMetal = document.getElementById('calcMetal');
  const calcShape = document.getElementById('calcShape');
  const calcLength = document.getElementById('calcLength');
  const calcWidth = document.getElementById('calcWidth');
  const calcThickness = document.getElementById('calcThickness');
  const calcDia = document.getElementById('calcDia');
  const calcWidthGroup = document.getElementById('calcWidthGroup');
  const calcDiaGroup = document.getElementById('calcDiaGroup');
  const btnCalculate = document.getElementById('btnCalculate');
  const calcResultVal = document.getElementById('calcResultVal');
  const btnRequestCalcQuote = document.getElementById('btnRequestCalcQuote');
  const btnCalcWhatsApp = document.getElementById('btnCalcWhatsApp');

  // Densities (kg/m³)
  const DENSITIES = {
    aluminum: 2700,
    steel: 7850,
    stainless: 7930,
    copper: 8960,
    brass: 8500
  };

  /* -------------------------------------------------------------
     1. Language Engine
     ------------------------------------------------------------- */
  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('technotouch_lang', lang);

    if (lang === 'en') {
      htmlRoot.setAttribute('lang', 'en');
      htmlRoot.setAttribute('dir', 'ltr');
      body.classList.add('lang-en');
      langToggleText.textContent = 'العربية';
    } else {
      htmlRoot.setAttribute('lang', 'ar');
      htmlRoot.setAttribute('dir', 'rtl');
      body.classList.remove('lang-en');
      langToggleText.textContent = 'English';
    }

    // Translate all static nodes with data-i18n
    const dict = SITE_DATA[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict && dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Translate placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict && dict[key]) {
        el.placeholder = dict[key];
      }
    });

    // Render dynamic components in new language
    renderSubcontractingServices();
    renderMetalsCatalog();
    renderProjects(getActiveFilter());
    updateCalculatorShapeInputs();
  }

  langToggleBtn.addEventListener('click', () => {
    const nextLang = currentLang === 'ar' ? 'en' : 'ar';
    applyLanguage(nextLang);
  });

  /* -------------------------------------------------------------
     2. Render Sub Contracting Services (Aluminum, Glass, Cladding, Maintenance)
     ------------------------------------------------------------- */
  function renderSubcontractingServices() {
    if (!subcontractingContainer) return;
    const isAr = currentLang === 'ar';

    subcontractingContainer.innerHTML = SUBCONTRACTING_SERVICES.map(service => {
      const title = isAr ? service.titleAr : service.titleEn;
      const desc = isAr ? service.descAr : service.descEn;
      const features = isAr ? service.featuresAr : service.featuresEn;
      const btnText = isAr ? 'طلب مقايسة مقاول باطن' : 'Request Subcontract Quote';
      const waMsg = encodeURIComponent(
        isAr 
          ? `السلام عليكم، نود التنسيق مع شركة تكنوتاتش لدراسة مقايسة ومخططات مقاولات بالباطن بخصوص: ${title}.`
          : `Hello, we would like to coordinate with Technotouch for drawings & BOQ subcontracting: ${title}.`
      );

      return `
        <div class="facade-card">
          <div class="facade-card-img-wrap">
            <img src="${service.image}" alt="${title}" class="facade-card-img" loading="lazy">
            <div class="facade-card-icon-badge" style="font-size: 1.6rem; display: flex; align-items: center; justify-content: center;">
              ${service.icon}
            </div>
          </div>
          <div class="facade-card-body">
            <h3 class="facade-card-title">${title}</h3>
            <p class="facade-card-desc">${desc}</p>
            <div class="facade-features-list">
              ${features.map(f => `
                <div class="facade-feature-item">
                  <svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  <span>${f}</span>
                </div>
              `).join('')}
            </div>
            <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: auto;">
              <button class="btn btn-outline-gold btn-sm prefill-facade-btn" data-facade="${title}" style="flex: 1;">
                ${btnText}
              </button>
              <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="background: rgba(37, 211, 102, 0.16); border-color: rgba(37, 211, 102, 0.5); color: #25d366; font-weight: 700;" title="WhatsApp Direct">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6z"/></svg>
                واتساب
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    subcontractingContainer.querySelectorAll('.prefill-facade-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const facadeName = e.currentTarget.getAttribute('data-facade');
        prefillRfqForSubcontract(facadeName);
      });
    });
  }

  /* -------------------------------------------------------------
     3. Render Aluminum Profiles & Scrap Catalog
     ------------------------------------------------------------- */
  function renderMetalsCatalog() {
    if (!metalsContainer) return;
    const isAr = currentLang === 'ar';

    metalsContainer.innerHTML = METALS_CATALOG.map(metal => {
      const title = isAr ? metal.titleAr : metal.titleEn;
      const tag = isAr ? metal.tagAr : metal.tagEn;
      const desc = isAr ? metal.descAr : metal.descEn;
      const specs = isAr ? metal.specsAr : metal.specsEn;
      const quoteBtnText = isAr ? 'طلب تسعير وتوريد' : 'Request Pricing';
      const waMsg = encodeURIComponent(
        isAr 
          ? `مرحباً، أود الاستفسار وطلب تسعير لتوريد: ${title} من شركة تكنوتاتش للتجارة ذ.م.م.`
          : `Hello, I would like to request pricing for: ${title} from Technotouch Trading LLC.`
      );

      return `
        <div class="metal-card">
          <div class="metal-card-img-wrap">
            <img src="${metal.image}" alt="${title}" class="metal-card-img" loading="lazy">
            <div class="metal-card-overlay"></div>
            <span class="metal-card-tag">${tag}</span>
          </div>
          <div class="metal-card-body">
            <h3 class="metal-card-title">${title}</h3>
            <p class="metal-card-desc">${desc}</p>
            <div class="metal-specs-list">
              ${specs.map(s => `
                <div class="metal-spec-item">
                  <svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                  <span>${s}</span>
                </div>
              `).join('')}
            </div>
            <div class="metal-card-footer">
              <button class="btn btn-primary btn-sm prefill-metal-btn" data-metal="${title}">
                ${quoteBtnText}
              </button>
              <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="background: rgba(37, 211, 102, 0.16); border-color: rgba(37, 211, 102, 0.5); color: #25d366; font-weight: 700;" title="WhatsApp Direct">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6z"/></svg>
                واتساب
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    metalsContainer.querySelectorAll('.prefill-metal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const metalName = e.currentTarget.getAttribute('data-metal');
        prefillRfqForMetal(metalName);
      });
    });
  }

  /* -------------------------------------------------------------
     4. Render Project Portfolio with Filter & Modal
     ------------------------------------------------------------- */
  function getActiveFilter() {
    const active = document.querySelector('.filter-btn.active');
    return active ? active.getAttribute('data-filter') : 'all';
  }

  function renderProjects(filter = 'all') {
    if (!projectsContainer) return;
    const isAr = currentLang === 'ar';

    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    projectsContainer.innerHTML = filtered.map(proj => {
      const title = isAr ? proj.titleAr : proj.titleEn;
      const categoryName = isAr ? proj.categoryAr : proj.categoryEn;
      const location = isAr ? proj.locationAr : proj.locationEn;
      const scope = isAr ? proj.scopeAr : proj.scopeEn;
      const detailsLabel = isAr ? 'استعراض المواصفات الهندسية' : 'View Engineering Specs';

      return `
        <div class="project-card" data-id="${proj.id}">
          <div class="project-img-wrapper">
            <img src="${proj.image}" alt="${title}" class="project-img" loading="lazy">
            <div class="project-overlay"></div>
            <span class="project-category-tag">${categoryName}</span>
            <span class="project-location-badge">
              <svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
              ${location}
            </span>
          </div>
          <div class="project-info">
            <h4 class="project-title">${title}</h4>
            <p class="project-scope">${scope}</p>
            <div class="project-card-footer">
              <span>${detailsLabel}</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </div>
        </div>
      `;
    }).join('');

    projectsContainer.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openProjectModal(id);
      });
    });
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });

  // Modal Open / Close
  function openProjectModal(id) {
    const proj = PROJECTS_DATA.find(p => String(p.id) === String(id));
    if (!proj) return;
    const isAr = currentLang === 'ar';

    document.getElementById('modalProjectImg').src = proj.image;
    document.getElementById('modalProjectTag').textContent = isAr ? proj.categoryAr : proj.categoryEn;
    document.getElementById('modalProjectTitle').textContent = isAr ? proj.titleAr : proj.titleEn;
    document.getElementById('modalProjectLocation').textContent = isAr ? proj.locationAr : proj.locationEn;
    document.getElementById('modalProjectScope').textContent = isAr ? proj.scopeAr : proj.scopeEn;
    document.getElementById('modalProjectMaterials').textContent = isAr ? proj.materialsAr : proj.materialsEn;

    const waModalBtn = document.getElementById('modalWhatsAppBtn');
    if (waModalBtn) {
      const waText = encodeURIComponent(
        isAr 
          ? `مرحباً، أود الاستفسار وطلب تسعير لمشروع مقاولات بالباطن مشابه لمشروع: ${proj.titleAr}.`
          : `Hello, I'd like to inquire and request a proposal for a subcontracting project similar to: ${proj.titleEn}.`
      );
      waModalBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`;
    }

    projectModal.classList.add('active');
    body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    projectModal.classList.remove('active');
    body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeProjectModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  /* -------------------------------------------------------------
     5. Profiles & Metal Weight Calculator
     ------------------------------------------------------------- */
  function updateCalculatorShapeInputs() {
    const shape = calcShape.value;
    if (shape === 'sheet') {
      calcWidthGroup.style.display = 'flex';
      calcDiaGroup.style.display = 'none';
    } else if (shape === 'round-bar' || shape === 'round-tube') {
      calcWidthGroup.style.display = 'none';
      calcDiaGroup.style.display = 'flex';
    } else {
      calcWidthGroup.style.display = 'flex';
      calcDiaGroup.style.display = 'none';
    }
  }

  calcShape.addEventListener('change', updateCalculatorShapeInputs);

  function calculateWeight() {
    const density = DENSITIES[calcMetal.value] || 2700;
    const shape = calcShape.value;
    const lengthM = parseFloat(calcLength.value) || 1;
    const thickM = (parseFloat(calcThickness.value) || 2) / 1000;
    let volumeM3 = 0;

    if (shape === 'sheet') {
      const widthM = (parseFloat(calcWidth.value) || 100) / 1000;
      volumeM3 = lengthM * widthM * thickM;
    } else if (shape === 'round-bar') {
      const diaM = (parseFloat(calcDia.value) || 20) / 1000;
      const radiusM = diaM / 2;
      volumeM3 = Math.PI * Math.pow(radiusM, 2) * lengthM;
    } else if (shape === 'round-tube') {
      const outerDiaM = (parseFloat(calcDia.value) || 50) / 1000;
      const innerDiaM = Math.max(0, outerDiaM - (2 * thickM));
      const area = Math.PI * (Math.pow(outerDiaM / 2, 2) - Math.pow(innerDiaM / 2, 2));
      volumeM3 = area * lengthM;
    } else {
      const widthM = (parseFloat(calcWidth.value) || 50) / 1000;
      const outerArea = widthM * widthM;
      const innerWidthM = Math.max(0, widthM - (2 * thickM));
      const innerArea = innerWidthM * innerWidthM;
      volumeM3 = (outerArea - innerArea) * lengthM;
    }

    const weightKg = volumeM3 * density;
    calcResultVal.textContent = weightKg.toFixed(2);
  }

  btnCalculate.addEventListener('click', calculateWeight);
  [calcMetal, calcShape, calcLength, calcWidth, calcThickness, calcDia].forEach(input => {
    input.addEventListener('input', calculateWeight);
  });

  // Pre-fill RFQ Form
  btnRequestCalcQuote.addEventListener('click', () => {
    const metalName = calcMetal.options[calcMetal.selectedIndex].text;
    const shapeName = calcShape.options[calcShape.selectedIndex].text;
    const weight = calcResultVal.textContent;
    const isAr = currentLang === 'ar';

    const divisionSelect = document.getElementById('rfqDivision');
    divisionSelect.value = 'metals';

    const detailsField = document.getElementById('rfqDetails');
    const msg = isAr
      ? `طلب تسعير لتوريد: (${metalName}) - شكل (${shapeName}) - الوزن النظري المحسوب: ${weight} كجم تقريباً.`
      : `Quotation Request: (${metalName}) - Shape (${shapeName}) - Approx. Theoretical Weight: ${weight} kg.`;

    detailsField.value = msg;
    scrollToElement('#contact');
    showToast(isAr ? 'تم نسخ بيانات الوزن إلى نموذج طلب التسعير بالأسفل' : 'Weight details pre-filled in RFQ form below');
  });

  // Direct WhatsApp Quote
  if (btnCalcWhatsApp) {
    btnCalcWhatsApp.addEventListener('click', () => {
      const metalName = calcMetal.options[calcMetal.selectedIndex].text;
      const shapeName = calcShape.options[calcShape.selectedIndex].text;
      const weight = calcResultVal.textContent;
      const isAr = currentLang === 'ar';

      const msg = encodeURIComponent(
        isAr
          ? `السلام عليكم، أود الحصول على تسعير فوري لتوريد: ${metalName} (${shapeName}) - الوزن المحسوب: ${weight} كجم تقريباً.`
          : `Hello, I would like an immediate quote for: ${metalName} (${shapeName}) - Calculated Weight: ${weight} kg approx.`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    });
  }

  /* -------------------------------------------------------------
     6. Prefill RFQ from Cards
     ------------------------------------------------------------- */
  function prefillRfqForMetal(metalName) {
    const divisionSelect = document.getElementById('rfqDivision');
    divisionSelect.value = 'metals';
    const detailsField = document.getElementById('rfqDetails');
    const isAr = currentLang === 'ar';
    detailsField.value = isAr 
      ? `استفسار وطلب تسعير لتوريد: ${metalName}. الكميات والمواصفات المطلوبة:`
      : `Quotation request for: ${metalName}. Required volume & specifications:`;

    scrollToElement('#contact');
    showToast(isAr ? `تم تحديد (${metalName}) في نموذج التسعير` : `Selected (${metalName}) in RFQ form`);
  }

  function prefillRfqForSubcontract(scopeName) {
    const divisionSelect = document.getElementById('rfqDivision');
    divisionSelect.value = 'subcontract';
    const detailsField = document.getElementById('rfqDetails');
    const isAr = currentLang === 'ar';
    detailsField.value = isAr
      ? `طلب دراسة مخططات ومقاولات فرعية بالباطن لتنفيذ: ${scopeName}. موقع المشروع والكميات التقديرية:`
      : `Subcontracting inquiry for: ${scopeName}. Project location & approx area:`;

    scrollToElement('#contact');
    showToast(isAr ? `تم تحديد (${scopeName}) في نموذج التسعير` : `Selected (${scopeName}) in RFQ form`);
  }

  /* -------------------------------------------------------------
     7. RFQ Form Submission Simulation
     ------------------------------------------------------------- */
  rfqForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const isAr = currentLang === 'ar';
    const name = document.getElementById('rfqName').value;
    const phone = document.getElementById('rfqPhone').value;

    if (!name || !phone) {
      alert(isAr ? 'يرجى إدخال الاسم ورقم الهاتف على الأقل' : 'Please provide at least your name and phone number');
      return;
    }

    const submitBtn = rfqForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = isAr ? 'جارٍ الإرسال...' : 'Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      rfqForm.reset();
      showToast(isAr 
        ? 'شكراً لتواصلكم مع تكنوتاتش! تم استلام طلبكم بنجاح وسيتواصل معكم فريقنا التنفيذي والتجاري بدبي فوراً.' 
        : 'Thank you! Your request has been received. Our Dubai team will contact you promptly.'
      );
    }, 800);
  });

  /* -------------------------------------------------------------
     8. Mobile Navigation & Scroll Spy
     ------------------------------------------------------------- */
  mobileNavToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      mainNav.classList.remove('open');
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        scrollToElement(targetId);
      }
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  function scrollToElement(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  function showToast(msg) {
    toastMessage.textContent = msg;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4500);
  }

  // Initialize
  applyLanguage(currentLang);
  calculateWeight();
});
