import { SvelteComponent as u, init as r, safe_not_equal as c, noop as s, detach as f, set_data as d, insert as b, append as m, listen as p, is_function as g, element as _, text as k, attr as C, append_styles as h } from "svelte/internal";
import "../../node_modules/.pnpm/svelte@4.2.19/node_modules/svelte/src/runtime/internal/disclose-version/index.js";
function v(e) {
  h(e, "svelte-4g101u", ".mc-button.svelte-4g101u{padding:10px 20px;background-color:#007bff;color:white;border:none;border-radius:4px;cursor:pointer}");
}
function x(e) {
  let t, l, o, i;
  return {
    c() {
      t = _("button"), l = k(
        /*label*/
        e[0]
      ), C(t, "class", "mc-button svelte-4g101u");
    },
    m(n, a) {
      b(n, t, a), m(t, l), o || (i = p(t, "click", function() {
        g(
          /*onClick*/
          e[1]
        ) && e[1].apply(this, arguments);
      }), o = !0);
    },
    p(n, [a]) {
      e = n, a & /*label*/
      1 && d(
        l,
        /*label*/
        e[0]
      );
    },
    i: s,
    o: s,
    d(n) {
      n && f(t), o = !1, i();
    }
  };
}
function y(e, t, l) {
  let { label: o = "Default Label" } = t, { onClick: i = () => {
  } } = t;
  return e.$$set = (n) => {
    "label" in n && l(0, o = n.label), "onClick" in n && l(1, i = n.onClick);
  }, [o, i];
}
class B extends u {
  constructor(t) {
    super(), r(this, t, y, x, c, { label: 0, onClick: 1 }, v);
  }
}
export {
  B as default
};
