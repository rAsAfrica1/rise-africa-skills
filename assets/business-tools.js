(function () {
  const fmt = (n) => "$" + Math.round(n).toLocaleString();

  // Register service worker for offline use
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(function(){});
  }

  function loadSaved(slug) {
    try { const r = localStorage.getItem('rAs-calc-' + slug); return r ? JSON.parse(r) : null; } catch(e) { return null; }
  }
  function saveAll(slug, inputs) {
    try { localStorage.setItem('rAs-calc-' + slug, JSON.stringify(inputs)); } catch(e) {}
  }
  function clearSaved(slug) {
    try { localStorage.removeItem('rAs-calc-' + slug); } catch(e) {}
  }

  function computeModel(cfg, inputs) {
    const startup = cfg.startup.reduce((s, r) => s + (inputs.startup[r.item] ?? r.qty * r.unit), 0);
    const monthlyFixed = cfg.monthlyFixed.reduce((s, r) => s + (inputs.fixed[r.item] ?? r.amount), 0);
    const varCost = inputs.varCost ?? cfg.unit.variableCost;
    const price   = inputs.price   ?? cfg.unit.price;
    const units   = inputs.units   ?? cfg.volume.monthly;
    const contribution = price - varCost;
    const monthlyRevenue = price * units;
    const monthlyVariable = varCost * units;
    const monthlyNet = monthlyRevenue - monthlyVariable - monthlyFixed;
    const breakEvenUnits = contribution > 0 ? Math.ceil(monthlyFixed / contribution) : Infinity;
    const loanAmt = inputs.loanAmount ?? 0;
    const rate = (inputs.loanRate ?? 0) / 100 / 12;
    const term = inputs.loanTerm ?? 12;
    const loanPayment = loanAmt > 0 && rate > 0 ? loanAmt * rate / (1 - Math.pow(1 + rate, -term)) : (loanAmt > 0 ? loanAmt / term : 0);
    const rows = [];
    let balance = (inputs.openingCash ?? 0) - startup + loanAmt;
    for (let m = 1; m <= 12; m++) {
      const growth = 1 + (inputs.growth ?? 0) / 100 * (m - 1);
      const u = Math.round(units * growth);
      const rev = price * u;
      const vc = varCost * u;
      const net = rev - vc - monthlyFixed - loanPayment;
      balance += net;
      rows.push({ m, u, rev, vc, fixed: monthlyFixed, loan: loanPayment, net, balance });
    }
    return { startup, monthlyFixed, contribution, monthlyRevenue, monthlyNet, breakEvenUnits, loanPayment, rows, balance };
  }

  function render(el, cfg, slug) {
    const saved = loadSaved(slug) || {};
    const inputs = {
      startup: saved.startup || {},
      fixed: saved.fixed || {},
      openingCash: saved.openingCash ?? 0,
      growth: saved.growth ?? 0,
      loanAmount: saved.loanAmount ?? 0,
      loanRate: saved.loanRate ?? 12,
      loanTerm: saved.loanTerm ?? 12,
      varCost: saved.varCost,
      price: saved.price,
      units: saved.units
    };
    let state = computeModel(cfg, inputs);

    el.innerHTML =
      "<div class='bt-bar'>" +
        "<h2>\uD83D\uDCBC Business Plan Calculator \u2014 " + cfg.title + "</h2>" +
        "<div class='bt-actions'>" +
          "<button class='bt-btn' id='btReset' type='button'>\u21BA Reset</button>" +
          "<button class='bt-btn' id='btPrint' type='button'>\uD83D\uDDA8\uFE0F Print</button>" +
        "</div>" +
      "</div>" +
      "<p class='note'>" + (cfg.note || "Adjust any number \u2014 every figure updates instantly. Your numbers are saved on this device.") + "</p>" +
      "<div class='tabs'>" +
        "<button class='tab active' data-tab='startup'>Startup Costs</button>" +
        "<button class='tab' data-tab='operating'>Operating</button>" +
        "<button class='tab' data-tab='pricing'>Pricing & Break-even</button>" +
        "<button class='tab' data-tab='cashflow'>12-Month Cash Flow</button>" +
        "<button class='tab' data-tab='loan'>Loan</button>" +
      "</div>" +
      "<div class='panel active' data-panel='startup'></div>" +
      "<div class='panel' data-panel='operating'></div>" +
      "<div class='panel' data-panel='pricing'></div>" +
      "<div class='panel' data-panel='cashflow'></div>" +
      "<div class='panel' data-panel='loan'></div>";

    el.querySelectorAll('.tab').forEach(t => t.onclick = () => {
      el.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
      el.querySelectorAll('.panel').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      el.querySelector("[data-panel='" + t.dataset.tab + "']").classList.add('active');
    });

    el.querySelector('#btReset').onclick = function(){
      if (confirm('Reset all numbers to the default values?')) {
        clearSaved(slug);
        render(el, cfg, slug);
      }
    };
    el.querySelector('#btPrint').onclick = function(){ window.print(); };

    function redraw() {
      state = computeModel(cfg, inputs);
      saveAll(slug, inputs);
      drawStartup(); drawOperating(); drawPricing(); drawCashflow(); drawLoan();
    }

    function drawStartup() {
      const p = el.querySelector('[data-panel=startup]');
      let rows = cfg.startup.map(r => "<tr><td>" + r.item + "</td>" +
        "<td><input type='number' value='" + (inputs.startup[r.item] !== undefined ? (r.qty ? inputs.startup[r.item] / r.unit : r.qty) : r.qty) + "' data-start-qty='" + r.item + "' min='0'></td>" +
        "<td><input type='number' value='" + r.unit + "' data-start-unit='" + r.item + "' min='0' step='0.01'></td>" +
        "<td>" + fmt(inputs.startup[r.item] ?? r.qty * r.unit) + "</td></tr>").join("");
      p.innerHTML = "<h3>One-time startup costs</h3><table><thead><tr><th>Item</th><th>Qty</th><th>Unit cost</th><th>Subtotal</th></tr></thead><tbody>" +
        rows + "<tr class='row-total'><td colspan='3'>Total startup</td><td>" + fmt(state.startup) + "</td></tr></tbody></table>" +
        "<p class='note'>Opening cash: <input type='number' value='" + inputs.openingCash + "' data-cash min='0'></p>";
      p.querySelectorAll('[data-start-qty]').forEach(i => i.oninput = e => {
        const item = e.target.dataset.startQty;
        const unit = p.querySelector("[data-start-unit='" + item + "']").value;
        inputs.startup[item] = (+e.target.value) * (+unit);
        redraw();
      });
      p.querySelectorAll('[data-start-unit]').forEach(i => i.oninput = e => {
        const item = e.target.dataset.startUnit;
        const qty = p.querySelector("[data-start-qty='" + item + "']").value;
        inputs.startup[item] = (+qty) * (+e.target.value);
        redraw();
      });
      p.querySelector('[data-cash]').oninput = e => { inputs.openingCash = +e.target.value; redraw(); };
    }

    function drawOperating() {
      const p = el.querySelector('[data-panel=operating]');
      let rows = cfg.monthlyFixed.map(r => "<tr><td>" + r.item + "</td>" +
        "<td><input type='number' value='" + (inputs.fixed[r.item] ?? r.amount) + "' data-fixed='" + r.item + "' min='0' step='0.01'></td></tr>").join("");
      p.innerHTML = "<h3>Monthly fixed costs</h3><table><thead><tr><th>Item</th><th>Monthly</th></tr></thead><tbody>" +
        rows + "<tr class='row-total'><td>Total monthly fixed</td><td>" + fmt(state.monthlyFixed) + "</td></tr></tbody></table>" +
        "<p class='note'>Growth per month: <input type='number' value='" + inputs.growth + "' data-growth step='0.5'> %</p>";
      p.querySelectorAll('[data-fixed]').forEach(i => i.oninput = e => { inputs.fixed[e.target.dataset.fixed] = +e.target.value; redraw(); });
      p.querySelector('[data-growth]').oninput = e => { inputs.growth = +e.target.value; redraw(); };
    }

    function drawPricing() {
      const p = el.querySelector('[data-panel=pricing]');
      p.innerHTML = "<h3>Unit economics</h3><table><tbody>" +
        "<tr><td>Product / unit</td><td>" + cfg.unit.name + "</td></tr>" +
        "<tr><td>Variable cost per unit</td><td><input type='number' value='" + (inputs.varCost ?? cfg.unit.variableCost) + "' data-var min='0' step='0.01'></td></tr>" +
        "<tr><td>Selling price per unit</td><td><input type='number' value='" + (inputs.price ?? cfg.unit.price) + "' data-price min='0' step='0.01'></td></tr>" +
        "<tr><td>Units sold per month</td><td><input type='number' value='" + (inputs.units ?? cfg.volume.monthly) + "' data-units min='0'></td></tr>" +
        "</tbody></table><div class='kpi-grid'>" +
        "<div class='kpi'><div class='label'>Contribution / unit</div><div class='value'>" + fmt(state.contribution) + "</div></div>" +
        "<div class='kpi'><div class='label'>Monthly revenue</div><div class='value'>" + fmt(state.monthlyRevenue) + "</div></div>" +
        "<div class='kpi " + (state.monthlyNet < 0 ? 'bad' : '') + "'><div class='label'>Monthly profit</div><div class='value'>" + fmt(state.monthlyNet) + "</div></div>" +
        "<div class='kpi " + (state.breakEvenUnits > (inputs.units ?? cfg.volume.monthly) ? 'warn' : '') + "'><div class='label'>Break-even units</div><div class='value'>" + (isFinite(state.breakEvenUnits) ? state.breakEvenUnits : '\u2014') + "</div></div>" +
        "</div>";
      p.querySelector('[data-var]').oninput = e => { inputs.varCost = +e.target.value; redraw(); };
      p.querySelector('[data-price]').oninput = e => { inputs.price = +e.target.value; redraw(); };
      p.querySelector('[data-units]').oninput = e => { inputs.units = +e.target.value; redraw(); };
    }

    function drawCashflow() {
      const p = el.querySelector('[data-panel=cashflow]');
      let rows = state.rows.map(r => "<tr><td>" + r.m + "</td><td>" + r.u + "</td>" +
        "<td>" + fmt(r.rev) + "</td><td>" + fmt(r.vc) + "</td><td>" + fmt(r.fixed) + "</td>" +
        "<td>" + fmt(r.loan) + "</td>" +
        "<td class='" + (r.net < 0 ? 'neg' : 'pos') + "'>" + fmt(r.net) + "</td>" +
        "<td class='" + (r.balance < 0 ? 'neg' : 'pos') + "'><strong>" + fmt(r.balance) + "</strong></td></tr>").join("");
      p.innerHTML = "<h3>12-month cash flow forecast</h3><div class='cf-table'><table><thead><tr>" +
        "<th>Month</th><th>Units</th><th>Revenue</th><th>Variable</th><th>Fixed</th><th>Loan</th><th>Net</th><th>Balance</th>" +
        "</tr></thead><tbody>" + rows + "</tbody></table></div>";
    }

    function drawLoan() {
      const p = el.querySelector('[data-panel=loan]');
      p.innerHTML = "<h3>Loan repayment</h3><table><tbody>" +
        "<tr><td>Loan amount</td><td><input type='number' value='" + inputs.loanAmount + "' data-loan-amt min='0'></td></tr>" +
        "<tr><td>Annual interest rate (%)</td><td><input type='number' value='" + inputs.loanRate + "' data-loan-rate min='0' step='0.1'></td></tr>" +
        "<tr><td>Term (months)</td><td><input type='number' value='" + inputs.loanTerm + "' data-loan-term min='1'></td></tr>" +
        "<tr class='row-total'><td>Monthly payment</td><td>" + fmt(state.loanPayment) + "</td></tr>" +
        "</tbody></table>";
      p.querySelector('[data-loan-amt]').oninput = e => { inputs.loanAmount = +e.target.value; redraw(); };
      p.querySelector('[data-loan-rate]').oninput = e => { inputs.loanRate = +e.target.value; redraw(); };
      p.querySelector('[data-loan-term]').oninput = e => { inputs.loanTerm = +e.target.value; redraw(); };
    }

    redraw();
  }

  document.querySelectorAll('.biz-tools').forEach(el => {
    const slug = el.dataset.course;
    const cfg = window.COURSE_CONFIGS && window.COURSE_CONFIGS[slug];
    if (!cfg) { el.innerHTML = "<p class='note'>Calculator config missing for " + slug + ".</p>"; return; }
    render(el, cfg, slug);
  });
})();
