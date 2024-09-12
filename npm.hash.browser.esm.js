/** @format */

function murmur2(r) {
  var t = 0;
  var a,
    e = 0,
    c = r.length;
  for (; c >= 4; ++e, c -= 4) {
    a =
      (255 & r.charCodeAt(e)) |
      ((255 & r.charCodeAt(++e)) << 8) |
      ((255 & r.charCodeAt(++e)) << 16) |
      ((255 & r.charCodeAt(++e)) << 24);
    a = 1540483477 * (65535 & a) + ((59797 * (a >>> 16)) << 16);
    a ^= a >>> 24;
    t =
      (1540483477 * (65535 & a) + ((59797 * (a >>> 16)) << 16)) ^
      (1540483477 * (65535 & t) + ((59797 * (t >>> 16)) << 16));
  }
  switch (c) {
    case 3:
      t ^= (255 & r.charCodeAt(e + 2)) << 16;
    case 2:
      t ^= (255 & r.charCodeAt(e + 1)) << 8;
    case 1:
      t ^= 255 & r.charCodeAt(e);
      t = 1540483477 * (65535 & t) + ((59797 * (t >>> 16)) << 16);
  }
  t ^= t >>> 13;
  t = 1540483477 * (65535 & t) + ((59797 * (t >>> 16)) << 16);
  return ((t ^ (t >>> 15)) >>> 0).toString(36);
}
export { murmur2 as default };

//# hash.browser.esm.js.map #200907502023
