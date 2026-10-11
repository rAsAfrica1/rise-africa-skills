p = 'course-info.html'
html = open(p, encoding='utf-8').read()

if '"block-making"' in html or '"n":228' in html:
    print('Already added. Nothing to do.')
else:
    anchor = '"young-animal-milk-replacer":'
    idx = html.find(anchor)
    if idx == -1:
        print('ERROR: anchor not found')
    else:
        entries = '  "block-making":{"n":228,"t":"Block Making and Concrete Products","e":"","cat":"COURSE","b":"Fifty modules, 400 written lessons. From hand moulds to commercial production, QC, and selling to builders.","brand":"#006c35","acc":"#008a44","L":400,"W":0,"Q":1500,"V":50,"m":[]},\n  "farm-produce":{"n":229,"t":"Farm Produce and Post-Harvest Handling","e":"","cat":"COURSE","b":"Fifty modules, 400 written lessons. Growing, harvesting, grading, storing, selling farm produce at premium prices.","brand":"#006c35","acc":"#008a44","L":400,"W":0,"Q":1500,"V":50,"m":[]},\n'
        html = html[:idx] + entries + html[idx:]
        open(p, 'w', encoding='utf-8').write(html)
        print('Added block-making and farm-produce entries.')
