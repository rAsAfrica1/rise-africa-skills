const fs = require('fs');

const SNIPPET = (pageType) => `
<script id="rAs-analytics">
(function(){
  var SUPA='https://lsvmykrentkbcdrzsaqj.supabase.co';
  var KEY='sb_publishable_zAO9Nei4xwd_aCdqF0tNlg_Be2SYl5K';
  var params=new URLSearchParams(location.search);
  var courseId=params.get('f')||params.get('c')||'';
  var sid=sessionStorage.getItem('rAs_sid');
  if(!sid){
    sid=(typeof crypto!=='undefined'&&crypto.randomUUID)?crypto.randomUUID():(Date.now()+'-'+Math.random().toString(36).slice(2));
    sessionStorage.setItem('rAs_sid',sid);
  }
  var ref=document.referrer||'direct';
  function track(type,meta){
    try{
      fetch(SUPA+'/rest/v1/analytics_events',{
        method:'POST',
        headers:{'apikey':KEY,'Authorization':'Bearer '+KEY,'Content-Type':'application/json','Prefer':'return=minimal'},
        body:JSON.stringify({event_name:type,user_id:null,session_id:sid,page_path:location.pathname+location.search,metadata:meta||{}}),
        keepalive:true
      }).catch(function(){});
    }catch(e){}
  }
  window.rAsTrack=track;
  track('${pageType}',{course_id:courseId,referrer:ref});
})();
</script>
`;

function patch(file, pageType) {
  if (!fs.existsSync(file)) { console.log(file + ': MISSING'); return; }
  let h = fs.readFileSync(file, 'utf8');
  if (h.indexOf('rAs-analytics') >= 0) { console.log(file + ': already patched'); return; }
  const pos = h.lastIndexOf('</body>');
  if (pos < 0) { console.log(file + ': no </body>'); return; }
  h = h.substring(0, pos) + SNIPPET(pageType) + h.substring(pos);
  fs.writeFileSync(file, h);
  console.log(file + ': added ' + pageType + ' (size ' + h.length + ')');
}

patch('index.html', 'home_viewed');
patch('all-courses.html', 'catalog_viewed');
patch('course-info.html', 'course_info_viewed');
