/* ==========================================================================
   INTERACTIVITY SCRIPT - TRABAJO PRÁCTICO N° 1 (SIS426 - USFX)
   Handles: Lucide icons, Word counter verification, Certificate Modal,
            Print to PDF, and Interactive GIS+AI Seismic Simulation.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    try {
      lucide.createIcons();
    } catch (e) {
      console.warn("Lucide icons init fail:", e);
    }
  }

  // 2. Word Counter Verification for Section 7 (Essay)
  const essayEl = document.getElementById('essay-text');
  const countNumEl = document.getElementById('word-count-num');
  const countBadgeEl = document.getElementById('word-count-badge');

  if (essayEl && countNumEl) {
    const text = essayEl.innerText || essayEl.textContent;
    // Extract words
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const count = words.length;
    countNumEl.textContent = count;

    if (count >= 500) {
      countBadgeEl.style.background = 'rgba(16, 185, 129, 0.2)';
      countBadgeEl.style.color = '#34d399';
      countBadgeEl.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    }
  }

  // 3. Print / PDF Export Button
  const printBtn = document.getElementById('btn-print-pdf');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 4. Certificate HD View Modal
  const openCertBtn = document.getElementById('open-cert-modal-btn');
  const closeCertBtn = document.getElementById('close-cert-modal');
  const certModal = document.getElementById('cert-modal-overlay');

  if (openCertBtn && certModal) {
    openCertBtn.addEventListener('click', () => {
      certModal.style.display = 'flex';
    });
  }

  if (closeCertBtn && certModal) {
    closeCertBtn.addEventListener('click', () => {
      certModal.style.display = 'none';
    });
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.style.display = 'none';
      }
    });
  }

  // 5. Interactive GIS + AI Seismic Simulation Panel
  const regionSelect = document.getElementById('sim-region');
  const satSelect = document.getElementById('sim-satellite');
  const thresholdRange = document.getElementById('sim-threshold');
  const thresholdVal = document.getElementById('sim-threshold-val');
  const runSimBtn = document.getElementById('btn-run-simulation');

  const statDef = document.getElementById('sim-stat-def');
  const statRisk = document.getElementById('sim-stat-risk');
  const statPolys = document.getElementById('sim-stat-polys');

  if (thresholdRange && thresholdVal) {
    thresholdRange.addEventListener('input', (e) => {
      thresholdVal.textContent = `${e.target.value}% Precisión`;
    });
  }

  const regionData = {
    sucre: { def: '-4.2 mm/año', risk: 'MODERADO (74.8%)', polys: '14 Vectores PostGIS', color: '#ffb703' },
    chaco: { def: '-12.8 mm/año', risk: 'ALTO (91.2%)', polys: '38 Vectores PostGIS', color: '#ff4a5a' },
    cochabamba: { def: '-8.5 mm/año', risk: 'CRÍTICO (95.6%)', polys: '45 Vectores PostGIS', color: '#ef4444' }
  };

  const updateSimulation = () => {
    if (!regionSelect || !statDef) return;
    const key = regionSelect.value || 'sucre';
    const data = regionData[key] || regionData.sucre;

    if (runSimBtn) {
      runSimBtn.disabled = true;
      runSimBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Procesando InSAR & PyTorch...';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    setTimeout(() => {
      statDef.textContent = data.def;
      statRisk.textContent = data.risk;
      statRisk.style.color = data.color;
      statPolys.textContent = data.polys;

      if (runSimBtn) {
        runSimBtn.disabled = false;
        runSimBtn.innerHTML = '<i data-lucide="play-circle"></i> Ejecutar Inferencia de IA en PostGIS';
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    }, 600);
  };

  if (runSimBtn) {
    runSimBtn.addEventListener('click', updateSimulation);
  }

  if (regionSelect) {
    regionSelect.addEventListener('change', updateSimulation);
  }
});
