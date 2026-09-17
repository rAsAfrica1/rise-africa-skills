const fs = require('fs');
let h = fs.readFileSync('course.html','utf8');

if (h.indexOf('rAs-analytics') >= 0) {
  console.log('already patched');
  process.exit(0);
}

const snippet = `
<script id="rAs-analytics">
(function(){
  var SUPA='https://lsvmykrentkbcdrzsaqj.supabase.co';
  var KEY='sb_publishable_zAO9Nei4xwd_aCdqF0tNlg_Be2SYl5K';
  var params=new URLSearchParams(window.location.search);
  var courseId=params.get('f')||'unknown';
  var sid=sessionStorage.getItem('rAs_sid');
  if(!sid){
    sid=(typeof crypto!=='undefined'&&crypto.randomUUID)?crypto.randomUUID():(Date.now()+'-'+Math.random().toString(36).slice(2));
    sessionStorage.setItem('rAs_sid',sid);
  }
  function track(type,meta){
    try{
      fetch(SUPA+'/rest/v1/analytics_events',{
        method:'POST',
        headers:{'apikey':KEY,'Authorization':'Bearer '+KEY,'Content-Type':'application/json','Prefer':'return=minimal'},
        body:JSON.stringify({event_type:type,user_id:null,session_id:sid,page_path:location.pathname+location.search,metadata:meta||{}}),
        keepalive:true
      }).catch(function(){});
    }catch(e){}
  }
  track('course_viewed',{course_id:courseId});
  document.addEventListener('click',function(e){
    var a=e.target&&e.target.closest?e.target.closest('a'):null;
    if(!a)return;
    var href=a.getAttribute('href')||'';
    if(href.indexOf('wa.me/')<0)return;
    var ch='unknown';
    if(href.indexOf('263776881941')>=0)ch='zim';
    else if(href.indexOf('447359724755')>=0)ch='uk';
    else return;
    track('pay_click',{course_id:courseId,channel:ch});
  },true);
})();
</script>
`;

const pos = h.lastIndexOf('</body>');
if (pos < 0) { console.log('ABORT: no </body>'); process.exit(1); }
h = h.substring(0,pos) + snippet + h.substring(pos);
fs.writeFileSync('course.html', h);
console.log('patched. size ' + h.length);
