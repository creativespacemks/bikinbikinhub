/** @fanie */

import * as r from "react";
var e = "default" in r ? r.default : r;
var t = {};
var o = e,
  a = Symbol.for("react.element"),
  f = Symbol.for("react.fragment"),
  n = Object.prototype.hasOwnProperty,
  s = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  _ = { key: !0, ref: !0, __self: !0, __source: !0 };
function q(r, e, t) {
  var o,
    f = {},
    l = null,
    p = null;
  void 0 !== t && (l = "" + t);
  void 0 !== e.key && (l = "" + e.key);
  void 0 !== e.ref && (p = e.ref);
  for (o in e) n.call(e, o) && !_.hasOwnProperty(o) && (f[o] = e[o]);
  if (r && r.defaultProps)
    for (o in ((e = r.defaultProps), e)) void 0 === f[o] && (f[o] = e[o]);
  return { $$typeof: a, type: r, key: l, ref: p, props: f, _owner: s.current };
}
t.Fragment = f;
t.jsx = q;
t.jsxs = q;
const l = t.Fragment,
  p = t.jsx,
  u = t.jsxs;
export { l as Fragment, t as default, p as jsx, u as jsxs };

//200907502023
