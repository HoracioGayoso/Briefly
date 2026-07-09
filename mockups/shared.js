// ==========================================================================
// Briefly — interacciones compartidas de los mockups (vanilla JS, sin deps)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initDropdowns();
  initModals();
  initTabs();
  initSidebarToggle();
  initMultiSelect();
});

// ---- Dropdowns genéricos: [data-dropdown] > [data-dropdown-toggle] + [data-dropdown-menu] ----
function initDropdowns() {
  const dropdowns = document.querySelectorAll('[data-dropdown]');
  dropdowns.forEach((dd) => {
    const toggle = dd.querySelector('[data-dropdown-toggle]');
    if (!toggle) return;
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dd.classList.contains('is-open');
      // cierra los demás dropdowns abiertos
      document.querySelectorAll('[data-dropdown].is-open').forEach((other) => {
        if (other !== dd) other.classList.remove('is-open');
      });
      dd.classList.toggle('is-open', !isOpen);
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('[data-dropdown].is-open').forEach((dd) => dd.classList.remove('is-open'));
  });
}

// ---- Multi-select: checkboxes dentro de un dropdown que actualizan el texto del toggle ----
function initMultiSelect() {
  document.querySelectorAll('[data-multiselect]').forEach((group) => {
    const toggleText = group.querySelector('[data-multiselect-label]');
    const placeholder = toggleText ? toggleText.textContent : 'Seleccionar';
    const boxes = group.querySelectorAll('[data-multiselect-option]');

    function update() {
      const selected = Array.from(boxes)
        .filter((b) => b.classList.contains('is-checked'))
        .map((b) => b.getAttribute('data-label'));
      if (toggleText) {
        toggleText.textContent = selected.length ? selected.join(' | ') : placeholder;
      }
    }

    boxes.forEach((box) => {
      box.addEventListener('click', (e) => {
        e.stopPropagation();
        box.classList.toggle('is-checked');
        const svg = box.querySelector('.checkbox-box');
        update();
      });
    });
    update();
  });
}

// ---- Modales: [data-modal-open="id"] abre #id, [data-modal-close] cierra su .modal-overlay ----
function initModals() {
  document.querySelectorAll('[data-modal-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal-open');
      const overlay = document.getElementById(id);
      if (overlay) overlay.classList.add('is-open');
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.modal-overlay');
      if (overlay) overlay.classList.remove('is-open');
    });
  });
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('is-open');
    });
  });
}

// ---- Tabs: [data-tabs] contiene [data-tab="name"] y [data-tab-panel="name"] ----
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabs = group.querySelectorAll('[data-tab]');
    const panelsContainer = document.querySelector(group.getAttribute('data-tabs-panels') || 'body');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const name = tab.getAttribute('data-tab');
        tabs.forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        document.querySelectorAll('[data-tab-panel]').forEach((p) => {
          p.classList.toggle('is-active', p.getAttribute('data-tab-panel') === name);
        });
      });
    });
  });
}

// ---- Sidebar colapsable ----
function initSidebarToggle() {
  const btn = document.querySelector('[data-sidebar-toggle]');
  const sidebar = document.querySelector('.sidebar');
  if (!btn || !sidebar) return;
  btn.addEventListener('click', () => sidebar.classList.toggle('is-collapsed'));
}
