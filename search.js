(function () {
  var input = document.getElementById('q');
  var box = document.getElementById('results');
  if (!input || !box) return;

  var onlyGrade = input.getAttribute('data-grade');
  var data = window.TOPICS || {};
  var items = [];
  Object.keys(data).forEach(function (key) {
    var p = key.split('-');
    var c = p[0].toUpperCase();
    var g = p[p.length - 1];
    var subject = p.slice(1, -1).map(function (w) {
      return w.charAt(0).toUpperCase() + w.slice(1);
    }).join(' ');
    data[key].forEach(function (t) {
      items.push({
        t: t, c: c, g: g, s: subject,
        text: (t.title + ' ' + (t.keywords || '') + ' ' + subject + ' ' + c + ' grade ' + g).toLowerCase()
      });
    });
  });

  function show(q) {
    box.textContent = '';
    var words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (q.trim().length < 2) return;
    var found = items.filter(function (i) {
      if (onlyGrade && i.g !== onlyGrade) return false;
      return words.every(function (w) { return i.text.indexOf(w) > -1; });
    });
    if (!found.length) {
      var none = document.createElement('p');
      none.className = 'empty';
      none.textContent = 'No topics found yet. Try another word, or check back soon.';
      box.appendChild(none);
      return;
    }
    found.slice(0, 12).forEach(function (i) {
      var a = document.createElement('a');
      a.className = 'result';
      a.href = i.t.url;
      if (i.t.image) {
        var img = document.createElement('img');
        img.src = i.t.image;
        img.alt = 'Mind map: ' + i.t.title;
        img.loading = 'lazy';
        a.appendChild(img);
      }
      var body = document.createElement('div');
      body.className = 'r-body';
      var title = document.createElement('span');
      title.className = 'r-title';
      title.textContent = i.t.title;
      var tags = document.createElement('span');
      tags.className = 'r-tags';
      tags.textContent = 'Grade ' + i.g + ' ' + i.s + ' (' + i.c + ')';
      body.appendChild(title);
      body.appendChild(tags);
      a.appendChild(body);
      box.appendChild(a);
    });
  }

  input.addEventListener('input', function () { show(input.value); });
  input.form.addEventListener('submit', function (e) { e.preventDefault(); show(input.value); });
})();
