(function () {
  var base = location.pathname.indexOf('/topics/') > -1 ? '../' : '';

  /* 1. Make the subject buttons clickable */
  var m = location.pathname.match(/grade-(\d)\.html/);
  var grade = m ? m[1] : '';
  document.querySelectorAll('.chips a').forEach(function (a) {
    if (a.getAttribute('href') !== '#') return;
    var panel = a.closest('.panel');
    var c = panel && panel.classList.contains('ieb') ? 'ieb' : 'caps';
    var name = a.textContent.trim().replace(/^Physical Sciences:\s*/, '');
    var slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    a.href = base + 'subject.html?c=' + c + '&s=' + slug +
      '&n=' + encodeURIComponent(name) + (grade ? '&g=' + grade : '');
  });

  /* 2. Cookie banner */
  var KEY = 'swotspot-cookies';
  function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadAds() {
    /* After AdSense approves you, the code that loads ads goes here.
       It only runs if the visitor clicked Accept. */
  }

  function closeBanner() {
    var b = document.getElementById('cookie-banner');
    if (b) b.remove();
  }

  function showBanner() {
    if (document.getElementById('cookie-banner')) return;
    var b = document.createElement('div');
    b.id = 'cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookie choices');
    b.innerHTML =
      '<p>We use cookies to show adverts and keep the site free. ' +
      'Choose whether to allow them. <a href="' + base + 'privacy.html">Read our Privacy Policy</a>.</p>' +
      '<div class="cookie-buttons">' +
      '<button type="button" id="cookie-accept">Accept</button>' +
      '<button type="button" id="cookie-decline" class="decline">Decline</button>' +
      '</div>';
    document.body.appendChild(b);
    document.getElementById('cookie-accept').onclick = function () {
      setChoice('accepted'); closeBanner(); loadAds();
    };
    document.getElementById('cookie-decline').onclick = function () {
      setChoice('declined'); closeBanner();
    };
  }

  var choice = getChoice();
  if (!choice) showBanner();
  else if (choice === 'accepted') loadAds();

  /* "Cookie settings" link in the footer lets people change their mind */
  var footerP = document.querySelector('footer.site .wrap p');
  if (footerP) {
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = 'Cookie settings';
    link.onclick = function (e) { e.preventDefault(); showBanner(); };
    footerP.appendChild(link);
  }
})();
