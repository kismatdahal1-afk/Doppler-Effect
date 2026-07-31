(function(){
  var caseId = typeof CASE_ID !== 'undefined' ? CASE_ID : 1;
  var totalCases = 10;

  function pad(n){ return String(n).padStart(2,'0'); }

  function escapeAttr(s){
    return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function plainToLatex(s){
    if(!s) return '';
    var r = s.trim();
    var subs = {'\u2090':'_0','\u2081':'_1','\u2082':'_2','\u2083':'_3','\u2084':'_4','\u2085':'_5','\u2086':'_6','\u2087':'_7','\u2088':'_8','\u2089':'_9','\u209B':'_s','\u2092':'_o','\u2091':'_e'};
    for(var ch in subs){ r = r.split(ch).join(subs[ch]); }
    r = r.replace(/\[/g,'(').replace(/\]/g,')');
    r = r.replace(/\(([a-zA-Z0-9_+\-\s]+)\)\s*\/\s*\(([a-zA-Z0-9_+\-\s]+)\)/g,'\\frac{$1}{$2}');
    r = r.replace(/\(\s*((?:\([^()]+\)|[^()])+?)\s*\/\s*((?:\([^()]+\)|[^()])+?)\s*\)/g,'\\frac{$1}{$2}');
    r = r.replace(/([a-zA-Z0-9_]+\s*\/\s*)\(([^()]+)\)/g,'$1\\left($2\\right)');
    r = r.replace(/([a-zA-Z_])\/([a-zA-Z_])/g,'\\frac{$1}{$2}');
    r = r.replace(/\u03BB/g,'\\lambda{}');
    r = r.replace(/\u0394/g,'\\Delta{}');
    r = r.replace(/\u03B8/g,'\\theta{}');
    r = r.replace(/\u03B3/g,'\\gamma{}');
    r = r.replace(/\u00D7/g,'\\times ');
    r = r.replace(/\u2212/g,'-');
    r = r.replace(/\u22C5/g,' \\cdot ');
    r = r.replace(/\s*\*\s*/g,' \\cdot ');
    r = r.replace(/([a-z\u03BB\u0394])([A-Z])/g,'$1\\, $2');
    r = r.replace(/(\d)([a-zA-Z\u03BB\u0394])/g,'$1\\, $2');
    return r;
  }

  function parseMDBlock(md, num){
    var blocks = md.split(/\n## Case /);
    var block = '';
    for(var i=0;i<blocks.length;i++){
      var b = blocks[i].trim();
      if(b.indexOf('\n')> -1 ? b.substring(0,b.indexOf('\n')).trim()===String(num) : false){
        block = b; break;
      }
      if(!block && /^\d+/.test(b) && parseInt(b)===num){ block = b; break; }
    }
    if(!block){
      for(var i=0;i<blocks.length;i++){
        var b = blocks[i].trim();
        if(parseInt(b)===num){ block = b; break; }
      }
    }
    if(!block) return null;
    var lines = block.split('\n');
    var data = {}, field = '', content = [];
    function saveField(){
      if(field){ data[field] = content.join('\n').replace(/^\s+|\s+$/g,''); content = []; }
    }
    for(var i=1;i<lines.length;i++){
      var line = lines[i];
      var m = line.match(/^\*\*([^*]+):\*\*\s*(.*)/);
      if(m){ saveField(); field = m[1].replace(/^\s+|\s+$/g,''); content = [m[2]]; }
      else { content.push(line); }
    }
    saveField();
    return data;
  }

  function mdBold(t){ return t.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>'); }

  function toUL(text){
    var lines = text.split('\n');
    var inList = false, out = [];
    for(var i=0;i<lines.length;i++){
      var l = lines[i];
      if(/^-\s/.test(l)){
        if(!inList){ out.push('<ul>'); inList=true; }
        out.push('<li>'+mdBold(l.replace(/^-\s+/,''))+'</li>');
      }else{
        if(inList){ out.push('</ul>'); inList=false; }
        out.push('<p>'+mdBold(l)+'</p>');
      }
    }
    if(inList) out.push('</ul>');
    return out.join('\n');
  }

  function parseStepEquation(step){
    var colonIdx = step.indexOf(':');
    var desc, eqPart;
    if(colonIdx>0){
      desc = step.substring(0,colonIdx).trim();
      eqPart = step.substring(colonIdx+1).trim();
    }else{
      desc = step;
      eqPart = '';
    }
    var html = '<span class="step-text">'+mdBold(desc)+'</span>';
    if(eqPart){
      eqPart = eqPart.replace(/\.$/,'').trim();
      var hasEq = /[=+\-\/\u00D7\u2212]/.test(eqPart);
      if(hasEq){
        var latex = plainToLatex(eqPart);
        html += '<div class="step-equation" data-tex="'+escapeAttr(latex)+'">'+eqPart+'</div>';
      }else{
        html += ': '+mdBold(eqPart);
      }
    }
    return html;
  }

  function toOL(text){
    var lines = text.split('\n');
    var out = ['<ol class="step-list">'];
    var inLi = false;
    for(var i=0;i<lines.length;i++){
      var l = lines[i];
      if(/^\d+[.)]\s/.test(l)){
        if(inLi) out.push('</li>');
        out.push('<li>'+parseStepEquation(l.replace(/^\d+[.)]\s+/,'')));
        inLi = true;
      }else if(inLi && l.trim()){
        out.push('<p class="step-desc">'+mdBold(l.trim())+'</p>');
      }
    }
    if(inLi) out.push('</li>');
    out.push('</ol>');
    return out.join('\n');
  }

  function renderVariablesTable(val){
    if(!val) return '';
    var lines = val.split('\n');
    var rows = '';
    for(var i=0;i<lines.length;i++){
      var l = lines[i].replace(/^-\s+/,'');
      var parts = l.split(/\s*=\s*/);
      if(parts.length>=2){
        rows += '<tr><td>'+parts[0]+'</td><td>'+parts.slice(1).join(' = ')+'</td></tr>';
      }else if(l){
        var m = l.match(/^([\w\u2080-\u2089\u2090-\u209C\u00B2\u00B3\u207F\u2070-\u2079']+)\s+[-–—]\s+(.+)/);
        if(m) rows += '<tr><td>'+m[1]+'</td><td>'+m[2]+'</td></tr>';
        else {
          var sp = l.indexOf('='); if(sp>0) rows += '<tr><td>'+l.substring(0,sp).trim()+'</td><td>'+l.substring(sp+1).trim()+'</td></tr>';
        }
      }
    }
    return rows;
  }

  function extractInlineMath(text){
    text = mdBold(text);
    text = text.replace(/([a-zA-Z\u2080-\u2089\u2090-\u209C\u00B2\u00B3\u207F\u2070-\u2079'λΔθγ()]+(?:\s*[=+\-\u00D7\u2212*/]\s*(?:\([^)]+\)|[a-zA-Z0-9\u2080-\u2089\u2090-\u209C\u00B2\u00B3\u207F\u2070-\u2079'λΔθγ()])+)+)/g,
      function(m){
        var trimmed = m.trim();
        if(/[=+\-\/\u00D7\u2212]/.test(trimmed)){
          return '<span class="math-inline" data-tex="'+escapeAttr(plainToLatex(trimmed))+'">'+trimmed+'</span>';
        }
        return m;
      });
    return text;
  }

  function renderField(name, val){
    if(!val) return '';
    switch(name){
      case 'Detailed Explanation':
        return '<section class="case-section fade-in"><h4>Detailed Explanation</h4>'+toUL(mdBold(val))+'</section>';
      case 'Observation':
        return '<section class="case-section fade-in"><h4>Observation</h4><p>'+mdBold(val)+'</p></section>';
      case 'Physical Interpretation':
        return '<section class="case-section fade-in"><h4>Physical Interpretation</h4>'+toUL(mdBold(val))+'</section>';
      case 'Formula':
        return '<section class="case-section fade-in"><h4>Formula</h4><div class="formula-card"><div class="formula-display">'+mdBold(val)+'</div></div></section>';
      case 'Formula Variables':
        var rows = renderVariablesTable(val);
        if(!rows){
          return '<section class="case-section fade-in"><h4>Variables</h4><p>'+mdBold(val)+'</p></section>';
        }
        return '<section class="case-section fade-in"><h4>Variables</h4><table class="vars-table"><thead><tr><th>Symbol</th><th>Meaning</th></tr></thead><tbody>'+rows+'</tbody></table></section>';
      case 'Formula Explanation':
        return '<section class="case-section fade-in"><h4>Formula Explanation</h4><p>'+extractInlineMath(val)+'</p></section>';
      case 'Expected Frequency Change':
        return '';
      case 'Step-by-Step Working':
        return '<section class="case-section fade-in"><h4>Step-by-Step Working</h4>'+toOL(val)+'</section>';
      case 'Expected Result':
        return '<section class="case-section fade-in"><h4>Expected Result</h4><p>'+extractInlineMath(val)+'</p></section>';
      case 'Wavefront Behaviour':
        return '<section class="case-section fade-in"><h4>Wavefront Behaviour</h4>'+toUL(mdBold(val))+'</section>';
      case 'Real-Life Example':
        return '<section class="case-section"><div class="info-card"><p>'+mdBold(val)+'</p></div></section>';
      case 'Key Notes':
        return '<section class="case-section fade-in"><h4>Key Notes</h4>'+toUL(val)+'</section>';
      case 'Summary':
        return '<section class="case-section fade-in"><h4>Summary</h4><div class="summary-box"><p>'+mdBold(val)+'</p></div></section>';
      default: return '';
    }
  }

  function renderCaseContent(data){
    var title = data['Title'] || 'Case '+caseId;
    var desc = data['Short Description'] || '';
    var eyeColor = '#'+({1:'5B9CFF',2:'2BE8C9',3:'9B7BFF',4:'FF6B5E',5:'4ADE80',6:'22D3EE',7:'C77DFF',8:'FFC15E',9:'A3E635',10:'FF7DC7'}[caseId]||'5B9CFF');

    var html = '<span class="case-eyebrow" style="color:'+eyeColor+'">CASE '+pad(caseId)+'</span>'+
      '<h2 class="case-title">'+mdBold(title)+'</h2>'+
      '<p class="case-situation">'+mdBold(desc)+'</p>'+
      '<hr class="case-divider">';

    var order = ['Detailed Explanation','Observation','Physical Interpretation','Formula','Formula Variables',
      'Formula Explanation','Step-by-Step Working','Expected Result','Wavefront Behaviour',
      'Real-Life Example','Key Notes','Summary'];

    for(var i=0;i<order.length;i++){
      html += renderField(order[i], data[order[i]]);
    }

    html += '<a class="download-btn" href="../assets/docs/Doppler-Effect.pdf" target="_blank" rel="noopener">'+
      '<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 14V3M6 10l4 4 4-4M3 14v3h14v-3"/></svg>'+
      'Download PDF Notes</a>';

    document.getElementById('caseContent').innerHTML = html;

    if(typeof katex !== 'undefined'){
      document.querySelectorAll('.formula-display').forEach(function(el){
        var raw = el.textContent || '';
        var latex = plainToLatex(raw);
        if(latex){
          try {
            el.innerHTML = '';
            katex.render(latex, el, { displayMode: true, throwOnError: false });
          } catch(e){ el.textContent = raw; }
        }
      });
      document.querySelectorAll('.step-equation').forEach(function(el){
        var tex = el.getAttribute('data-tex');
        if(tex){
          try {
            el.innerHTML = '';
            katex.render(tex, el, { displayMode: true, throwOnError: false });
          } catch(e){ el.textContent = tex; }
        }
      });
      document.querySelectorAll('.math-inline').forEach(function(el){
        var tex = el.getAttribute('data-tex');
        if(tex){
          try {
            el.innerHTML = '';
            katex.render(tex, el, { displayMode: false, throwOnError: false });
          } catch(e){ el.textContent = tex; }
        }
      });
    }

    document.querySelectorAll('.case-section strong').forEach(function(el){ el.classList.add('hl'); });

    document.title = 'Case '+pad(caseId)+' — '+title+' | Doppler Effect';
    document.getElementById('caseBadge').textContent = pad(caseId);
    document.getElementById('casePageTitle').textContent = title;
  }

  function toRoman(n){
    var r = {1:'I',2:'II',3:'III',4:'IV',5:'V',6:'VI',7:'VII',8:'VIII',9:'IX',10:'X'};
    return r[n]||String(n);
  }

  function setupNav(){
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    if(caseId>1){
      prevBtn.href = 'case-'+pad(caseId-1)+'.html';
    }else{ prevBtn.classList.add('disabled'); }
    if(caseId<totalCases){
      nextBtn.href = 'case-'+pad(caseId+1)+'.html';
    }else{ nextBtn.classList.add('disabled'); }
    document.addEventListener('keydown',function(e){
      if(e.key==='ArrowLeft' && caseId>1) window.location='case-'+pad(caseId-1)+'.html';
      if(e.key==='ArrowRight' && caseId<totalCases) window.location='case-'+pad(caseId+1)+'.html';
    });
  }

  function init(){
    setupNav();
    fetch('../assets/docs/cases-database.md')
      .then(function(r){ if(!r.ok) throw new Error('Failed to load'); return r.text(); })
      .then(function(md){
        var data = parseMDBlock(md, caseId);
        if(!data){ document.getElementById('caseContent').innerHTML='<p style="color:var(--text-dim);padding:40px;text-align:center">Case content not found.</p>'; return; }
        renderCaseContent(data);
        if(typeof initSimulation === 'function') initSimulation('simCanvas', caseId);
      })
      .catch(function(){
        document.getElementById('caseContent').innerHTML='<p style="color:var(--text-dim);padding:40px;text-align:center">Failed to load case content. <button onclick="location.reload()" style="background:var(--blue);color:#04050B;border:none;padding:8px 16px;border-radius:99px;cursor:pointer;font-family:var(--font-mono);font-size:12px;font-weight:600">Retry</button></p>';
      });

    document.getElementById('playBtn').addEventListener('click', toggleSimPause);
    document.getElementById('resetBtn').addEventListener('click', resetSimulation);
    document.getElementById('speedRange').addEventListener('input', function(){
      setSimSpeed(this.value);
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
