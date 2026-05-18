(function() {
  var html = document.documentElement;
  var saved = localStorage.getItem('theme');
  if (saved) {
    html.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
  }

  function updateCalendlyTheme() {
    var widget = document.querySelector('.calendly-inline-widget[data-calendly-url]');
    if (!widget) return;

    var isDark = html.getAttribute('data-theme') === 'dark';
    var colors = isDark
      ? { background: '0d0d0f', text: 'e8e8ed', primary: 'ff5a3a' }
      : { background: 'f8f7f4', text: '212121', primary: 'c73a1d' };
    var url = widget.getAttribute('data-calendly-url') + '?background_color=' + colors.background + '&text_color=' + colors.text + '&primary_color=' + colors.primary;
    widget.setAttribute('data-url', url);

    var iframe = widget.querySelector('iframe');
    if (iframe && iframe.src !== url) iframe.src = url;
  }

  updateCalendlyTheme();

  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function() {
      var isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
      updateCalendlyTheme();
    });
  }


  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });

  // Scroll-spy: activate the section (and its tab) with highest visibility
  var sections = document.querySelectorAll('.about-section');
  var tabs = document.querySelectorAll('.tab-item');
  if (sections.length && tabs.length) {
    var ratios = {};
    var thresholds = [0, 0.25, 0.5, 0.75, 1];
    var pendingUpdate = null;

    function updateActive() {
      pendingUpdate = null;
      var best = null, bestRatio = 0;
      sections.forEach(function(s) {
        var r = ratios[s.id] || 0;
        if (r > bestRatio) { bestRatio = r; best = s; }
      });
      if (best && bestRatio > 0.1) {
        sections.forEach(function(s) { s.classList.toggle('active', s === best); });
        tabs.forEach(function(t) { t.classList.toggle('active', t.getAttribute('data-section') === best.id); });
      }
    }

    function scheduleUpdate() {
      if (!pendingUpdate) pendingUpdate = requestAnimationFrame(updateActive);
    }

    var sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { ratios[e.target.id] = e.intersectionRatio; });
      scheduleUpdate();
    }, { threshold: thresholds });
    sections.forEach(function(s) { sectionObserver.observe(s); });

    // Tab click → smooth scroll
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var id = tab.getAttribute('data-section');
        var target = document.getElementById(id);
        if (target) {
          sections.forEach(function(s) { s.classList.toggle('active', s === target); });
          tabs.forEach(function(t) { t.classList.toggle('active', t.getAttribute('data-section') === id); });
          target.scrollIntoView({ behavior: 'smooth' });
        }
        // Close sidebar on mobile
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('open');
        document.getElementById('hamburger').classList.remove('open');
      });
    });

    // Hamburger toggle
    var hamburger = document.getElementById('hamburger');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebarOverlay');
    if (hamburger && sidebar && overlay) {
      hamburger.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
        hamburger.classList.toggle('open');
      });
      overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        hamburger.classList.remove('open');
      });
    }
  }

  // Hobby grid cross-highlighting
  var hobbyGrid = document.getElementById('hobbyGrid');
  var hobbyList = document.getElementById('hobbyList');
  if (hobbyGrid && hobbyList) {
    var cards = [].slice.call(hobbyGrid.querySelectorAll('.hobby-card'));
    var rows = [].slice.call(hobbyList.querySelectorAll('.hobby-row'));
    var allItems = cards.concat(rows);

    function setHover(id) {
      cards.forEach(function(c) {
        var cid = c.getAttribute('data-id');
        c.classList.toggle('is-hovered', cid === id);
        c.classList.toggle('is-dimmed', id !== null && cid !== id);
      });
      rows.forEach(function(r) {
        var rid = r.getAttribute('data-id');
        r.classList.toggle('is-hovered', rid === id);
        r.classList.toggle('is-dimmed', id !== null && rid !== id);
      });
    }

    allItems.forEach(function(item) {
      item.addEventListener('mouseenter', function() {
        setHover(item.getAttribute('data-id'));
      });
      item.addEventListener('mouseleave', function() {
        setHover(null);
      });
    });
  }
})();
