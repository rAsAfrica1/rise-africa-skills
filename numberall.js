const fs = require('fs');
let h = fs.readFileSync('index.html','utf8');

const map = {
  "How to Start a Business in Africa": 168,
  "Mushroom Seed (Spawn) Production Business": 169,
  "Brick Making Business with Bank and Mobile Money Integration": 170,
  "Petrol and Diesel Engine Fundamentals: 0 to 12 Litres": 166,
  "Convert a Car Engine to an Irrigation Water Pump": 167,
  "Barbering & Men's Grooming Business": 140,
  "Hair Salon and Beauty Business": 141,
  "Social Media Influencer Business": 142,
  "DJ and Event Entertainment Business": 143,
  "Agricultural Produce Sourcing Business": 144,
  "Sourcing and Reselling Business": 145,
  "Basic First Aid for Business and Community": 146,
  "Massage and Spa Home Visit Business": 147,
  "Errands and Personal Assistant Service": 148,
  "Crisis Response for Underserved Communities": 149,
  "Home and Office Cleaning Business": 150,
  "Car Washing and Detailing Business": 151,
  "Pest Control Business (Basic to Medium)": 152,
  "Event Services Business (Planning and Decor)": 153,
  "Recycling and Green Business": 154,
  "Transport and Logistics Business": 155,
  "Herbal and Natural Skincare Products": 156,
  "Education and Training Business": 157,
  "Small Kiosk and Tuck Shop Business": 158,
  "Reselling on Social Media Platforms": 159,
  "Tech and Digital Services Business": 160,
  "Second-Hand / Thrift Shop Business (Okrika)": 161,
  "Home-Based Catering for Small Events": 162,
  "Maximise 1 Hectare - Vegetables for Profit": 163,
  "Snail Farming (Heliciculture) Business": 164,
  "Seedling Nursery for Farmers": 165
};

let fixes = 0, misses = [];
h = h.replace(/<h3>([^<]+)<\/h3>/g, function(m, inner) {
  const t = inner.trim();
  if (/^\d+\.\s/.test(t)) return m;
  let num = map[t];
  if (!num) {
    const u = t.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
    num = map[u];
  }
  if (!num) { misses.push(t); return m; }
  fixes++;
  return '<h3>' + num + '. ' + inner + '</h3>';
});

console.log('Fixed: ' + fixes);
if (misses.length) console.log('Still unnumbered: ' + misses.join(' | '));
fs.writeFileSync('index.html', h);
console.log('Size: ' + h.length);
