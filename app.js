/* ===== Development Exchange — shared front-end helpers =====
   Plain JS, no build step, works directly over file://. */

var DX = window.DX_DATA;

// Mobile nav toggle — wired automatically on every page that includes this file.
document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("nav-toggle");
  var links = document.getElementById("navlinks");
  if (btn && links) {
    btn.addEventListener("click", function () { links.classList.toggle("open"); });
  }
});

function dxInitials(name) {
  var words = name.split(/\s+/).filter(function (w) { return w.length > 0; });
  var letters = words.slice(0, 2).map(function (w) { return w[0].toUpperCase(); });
  return letters.join("");
}

function dxQueryParam(key) {
  var params = new URLSearchParams(window.location.search);
  return params.get(key);
}

function dxJurisdictionLabel(jid) {
  var j = DX.jurisdictionById(jid);
  return j ? (j.county + ", " + j.state) : jid;
}

function dxFormatMoney(n) {
  return "$" + n.toLocaleString("en-US");
}

function dxScoreBarsHtml(scores) {
  var rows = [
    ["On-time delivery", scores.onTime],
    ["On-budget", scores.onBudget],
    ["Responsiveness", scores.responsiveness],
    ["Code fluency", scores.codeFluency]
  ];
  return rows.map(function (r) {
    return '<div class="score-bar-row">' +
      '<span>' + r[0] + '</span>' +
      '<span class="score-bar-track"><span class="score-bar-fill" style="width:' + r[1] + '%"></span></span>' +
      '<span><strong>' + r[1] + '</strong></span>' +
      '</div>';
  }).join("");
}

function dxTagsHtml(firm) {
  var tags = "";
  tags += '<span class="pill">' + firm.specialty + '</span>';
  firm.propertyTypes.forEach(function (pt) {
    tags += '<span class="pill pill-gold">' + pt + '</span>';
  });
  if (firm.verified) tags += '<span class="badge-verified">License verified</span>';
  return tags;
}

// Renders a firm result card (used on directory + build-my-team pages)
function dxFirmCardHtml(firm, opts) {
  opts = opts || {};
  var score = DX.overallScore(firm.scores);
  var scoreBlock = '<div class="match-score">' + score + '<span>Match score</span></div>';
  if (opts.matchScore !== undefined) {
    scoreBlock = '<div class="match-score">' + opts.matchScore + '<span>Match score</span></div>';
  }
  var provenBadge = opts.provenWith
    ? '<div style="margin-top:8px"><span class="proven-badge">✓ Worked with ' + opts.provenWith.name + ' — ' + opts.provenWith.count + 'x</span></div>'
    : "";
  return '' +
    '<div class="firm-card">' +
      '<div class="firm-avatar">' + dxInitials(firm.name) + '</div>' +
      '<div>' +
        '<h4><a href="firm.html?id=' + firm.id + '">' + firm.name + '</a> ' + dxSaveBtnHtml(firm.id) + '</h4>' +
        '<div class="firm-meta">' + dxRatingLineHtml(firm.id) + ' · ' + firm.specialty + ' · ' + firm.jurisdictions.map(dxJurisdictionLabel).join("; ") + ' · ' + firm.projectsCompleted + ' projects completed</div>' +
        '<div class="firm-tags">' + dxTagsHtml(firm) + ' ' + dxAvailabilityPillHtml(firm) + '</div>' +
        provenBadge +
      '</div>' +
      scoreBlock +
    '</div>';
}

function dxOptionsHtml(list, allLabel) {
  var html = '<option value="">' + allLabel + '</option>';
  list.forEach(function (item) {
    var value = item.id || item;
    var label = item.county ? (item.county + ", " + item.state) : item;
    html += '<option value="' + value + '">' + label + '</option>';
  });
  return html;
}

/* ===== Account-layer helpers: saved firms, ratings, availability, notifications, sign-in ===== */

// Saved firms — localStorage where available (persists across visits), in-memory fallback otherwise.
var _dxMemStore = {};
function _dxStoreGet(key) {
  try { return window.localStorage.getItem(key); } catch (e) { return _dxMemStore[key] || null; }
}
function _dxStoreSet(key, val) {
  try { window.localStorage.setItem(key, val); } catch (e) { _dxMemStore[key] = val; }
}
function dxSavedIds() {
  var raw = _dxStoreGet("dx_saved");
  if (!raw) return [];
  try { return JSON.parse(raw); } catch (e) { return []; }
}
function dxIsSaved(id) { return dxSavedIds().indexOf(id) !== -1; }
function dxToggleSaved(id) {
  var ids = dxSavedIds();
  var idx = ids.indexOf(id);
  if (idx === -1) ids.push(id); else ids.splice(idx, 1);
  _dxStoreSet("dx_saved", JSON.stringify(ids));
  dxUpdateSavedBadge();
  return idx === -1;
}
function dxUser() { return _dxStoreGet("dx_user") || ""; }
function dxSetUser(name) { _dxStoreSet("dx_user", name); }

function dxStarsHtml(avg) {
  var html = '<span class="stars" title="' + avg + ' / 5">';
  for (var i = 1; i <= 5; i++) {
    html += '<span class="' + (i <= Math.round(avg) ? "star on" : "star") + '">★</span>';
  }
  return html + "</span>";
}

function dxRatingLineHtml(firmId) {
  var r = DX.ratingSummary(firmId);
  return '<span class="rating-line">' + dxStarsHtml(r.avg) + ' <strong>' + r.avg + '</strong> <span class="muted">(' + r.count + ' review' + (r.count === 1 ? "" : "s") + ')</span></span>';
}

function dxAvailabilityPillHtml(firm) {
  if (!firm.availability) return "";
  return '<span class="pill ' + firm.availability.pill + '">' + firm.availability.label + '</span>';
}

function dxSaveBtnHtml(firmId) {
  var saved = dxIsSaved(firmId);
  return '<button class="save-btn' + (saved ? " saved" : "") + '" data-save="' + firmId + '" title="' + (saved ? "Remove from saved firms" : "Save this firm") + '" aria-label="Save firm">' + (saved ? "♥" : "♡") + '</button>';
}

// One delegated listener handles every save-heart on the page, including ones rendered later.
document.addEventListener("click", function (e) {
  var btn = e.target && e.target.closest ? e.target.closest(".save-btn") : null;
  if (!btn) return;
  e.preventDefault();
  var nowSaved = dxToggleSaved(btn.getAttribute("data-save"));
  btn.textContent = nowSaved ? "♥" : "♡";
  btn.classList.toggle("saved", nowSaved);
  btn.title = nowSaved ? "Remove from saved firms" : "Save this firm";
});

function dxUpdateSavedBadge() {
  var badge = document.getElementById("saved-badge");
  if (!badge) return;
  var n = dxSavedIds().length;
  badge.textContent = n;
  badge.style.display = n ? "inline-flex" : "none";
}

function dxUnreadMessages() {
  var n = 0;
  DX.CONVERSATIONS.forEach(function (c) { if (c.unread) n++; });
  return n;
}
function dxUnreadNotifications() {
  var n = 0;
  DX.NOTIFICATIONS.forEach(function (x) { if (x.unread) n++; });
  return n;
}

// Nav account cluster: badges, notification dropdown, sign-in modal. Runs on every page.
document.addEventListener("DOMContentLoaded", function () {
  dxUpdateSavedBadge();

  var msgBadge = document.getElementById("msg-badge");
  if (msgBadge) {
    var mu = dxUnreadMessages();
    msgBadge.textContent = mu;
    msgBadge.style.display = mu ? "inline-flex" : "none";
  }

  var notifBtn = document.getElementById("notif-btn");
  var notifBadge = document.getElementById("notif-badge");
  if (notifBadge) {
    var nu = dxUnreadNotifications();
    notifBadge.textContent = nu;
    notifBadge.style.display = nu ? "inline-flex" : "none";
  }
  if (notifBtn) {
    var dropdown = document.createElement("div");
    dropdown.className = "notif-dropdown";
    dropdown.innerHTML =
      '<div class="notif-head">Notifications <a href="dashboard.html">View all</a></div>' +
      DX.NOTIFICATIONS.map(function (n) {
        return '<a class="notif-item' + (n.unread ? " unread" : "") + '" href="' + n.href + '">' +
          '<span class="notif-icon">' + n.icon + '</span>' +
          '<span><span class="notif-text">' + n.text + '</span><span class="notif-time">' + n.time + '</span></span>' +
        '</a>';
      }).join("");
    notifBtn.parentNode.appendChild(dropdown);
    notifBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });
    document.addEventListener("click", function () { dropdown.classList.remove("open"); });
  }

  // Sign-in: fake account modal. Once "signed in", the button becomes a dashboard link.
  var signinBtn = document.getElementById("signin-btn");
  if (signinBtn) {
    function renderSignin() {
      var user = dxUser();
      if (user) {
        signinBtn.textContent = user.split(" ")[0];
        signinBtn.setAttribute("title", "Go to your dashboard");
      } else {
        signinBtn.textContent = "Sign in";
      }
    }
    renderSignin();
    signinBtn.addEventListener("click", function (e) {
      if (dxUser()) return; // navigate to dashboard normally
      e.preventDefault();
      var overlay = document.createElement("div");
      overlay.className = "modal-overlay";
      overlay.innerHTML =
        '<div class="modal">' +
          '<h3>Sign in</h3>' +
          '<p class="muted" style="font-size:0.85rem">Demo only — no real account is created and nothing leaves your computer.</p>' +
          '<label class="group-label" style="display:block;font-size:0.78rem;font-weight:700;color:var(--ink-soft);text-transform:uppercase;letter-spacing:0.4px;margin-bottom:6px">Your name</label>' +
          '<input type="text" id="signin-name" placeholder="e.g. Alex Morgan" style="width:100%;padding:9px 11px;border:1px solid var(--border);border-radius:7px;font-size:0.9rem;font-family:inherit" />' +
          '<div style="display:flex;gap:10px;margin-top:16px">' +
            '<button class="btn btn-navy btn-sm" id="signin-go">Sign in →</button>' +
            '<button class="btn btn-ghost btn-sm" id="signin-cancel">Cancel</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(overlay);
      var nameInput = overlay.querySelector("#signin-name");
      nameInput.focus();
      function close() { overlay.remove(); }
      overlay.addEventListener("click", function (ev) { if (ev.target === overlay) close(); });
      overlay.querySelector("#signin-cancel").addEventListener("click", close);
      function go() {
        dxSetUser(nameInput.value.trim() || "Demo Developer");
        close();
        renderSignin();
        window.location.href = "dashboard.html";
      }
      overlay.querySelector("#signin-go").addEventListener("click", go);
      nameInput.addEventListener("keydown", function (ev) { if (ev.key === "Enter") go(); });
    });
  }
});
