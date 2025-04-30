import { create_custom_element as A, SvelteComponent as F, init as G, safe_not_equal as H, flush as g, create_slot as I, detach as y, transition_out as J, transition_in as K, update_slot_base as N, get_all_dirty_from_scope as O, get_slot_changes as P, attr as m, insert as z, append as w, listen as Q, element as k, space as B, append_styles as R, binding_callbacks as S, noop as M, set_data as U, text as V } from "svelte/internal";
import "../../node_modules/.pnpm/svelte@4.2.19/node_modules/svelte/src/runtime/internal/disclose-version/index.js";
import { onMount as W } from "svelte";
function X(l) {
  R(l, "svelte-ob4xf2", '@import "@devui-design/icons/icomoon/devui-icon.css";.mc-button--sm.svelte-ob4xf2.svelte-ob4xf2{height:26px;margin:1px}.mc-button--md.svelte-ob4xf2.svelte-ob4xf2{height:30px;margin:1px}.mc-button--lg.svelte-ob4xf2.svelte-ob4xf2{height:38px;margin:1px}.mc-button-wrapper.svelte-ob4xf2.svelte-ob4xf2{position:relative;z-index:0}.mc-button.svelte-ob4xf2.svelte-ob4xf2{display:flex;align-items:center;justify-content:center;position:relative;height:30px;padding:0 13px;color:var(--devui-text, #252b3a);border:none;border-radius:100px;white-space:nowrap;cursor:pointer}.mc-button.svelte-ob4xf2 .icon.svelte-ob4xf2,.mc-button.svelte-ob4xf2 .icon-slot.svelte-ob4xf2{margin-right:4px}.mc-button.disabled.svelte-ob4xf2.svelte-ob4xf2{color:var(--devui-disabled-text, #cfd0d3);cursor:not-allowed}.button-border-gradient.svelte-ob4xf2.svelte-ob4xf2{color:var(--devui-text, #252b3a);background-color:var(--devui-base-bg, #ffffff)}.button-border-gradient.svelte-ob4xf2.svelte-ob4xf2::after{content:"";position:absolute;top:-1px;left:-1px;right:-1px;bottom:-1px;border-radius:100px;background:linear-gradient(90deg, #93d6f9, #abee88, #fdc68d, #fa9d8e, #f48ae1);z-index:-1}.button-border-gradient.svelte-ob4xf2.svelte-ob4xf2::before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-radius:100px;background:linear-gradient(90deg, #93d6f9, #abee88, #fdc68d, #fa9d8e, #f48ae1);filter:blur(4px);z-index:-1}.mc-button--suffix.svelte-ob4xf2.svelte-ob4xf2{padding-left:11px}.mc-button--sm.svelte-ob4xf2.svelte-ob4xf2{height:26px;font-size:12px}.mc-button--md.svelte-ob4xf2.svelte-ob4xf2{height:30px;font-size:14px}.mc-button--lg.svelte-ob4xf2.svelte-ob4xf2{height:38px;font-size:16px}.mc-button--capsule.svelte-ob4xf2.svelte-ob4xf2{border-radius:100px}.mc-button--circle.svelte-ob4xf2.svelte-ob4xf2{border-radius:50%}.mc-button--circle.mc-button--sm.svelte-ob4xf2.svelte-ob4xf2{width:26px}.mc-button--circle.mc-button--md.svelte-ob4xf2.svelte-ob4xf2{width:30px}.mc-button--circle.mc-button--lg.svelte-ob4xf2.svelte-ob4xf2{width:38px}');
}
function j(l) {
  let e;
  return {
    c() {
      e = k("i"), m(e, "class", "loading-icon");
    },
    m(t, n) {
      z(t, e, n);
    },
    d(t) {
      t && y(e);
    }
  };
}
function q(l) {
  let e, t;
  return {
    c() {
      e = k("i"), m(e, "class", t = "icon " + /*icon*/
      l[1] + " svelte-ob4xf2");
    },
    m(n, d) {
      z(n, e, d);
    },
    p(n, d) {
      d & /*icon*/
      2 && t !== (t = "icon " + /*icon*/
      n[1] + " svelte-ob4xf2") && m(e, "class", t);
    },
    d(n) {
      n && y(e);
    }
  };
}
function D(l) {
  let e;
  return {
    c() {
      e = k("div"), m(e, "class", "icon-slot svelte-ob4xf2");
    },
    m(t, n) {
      z(t, e, n), l[16](e);
    },
    p: M,
    d(t) {
      t && y(e), l[16](null);
    }
  };
}
function Y(l) {
  let e, t;
  return {
    c() {
      e = k("span"), t = V(
        /*label*/
        l[0]
      ), m(e, "class", "mc-button-content");
    },
    m(n, d) {
      z(n, e, d), w(e, t);
    },
    p(n, d) {
      d & /*label*/
      1 && U(
        t,
        /*label*/
        n[0]
      );
    },
    d(n) {
      n && y(e);
    }
  };
}
function L(l) {
  let e;
  return {
    c() {
      e = k("div"), m(e, "class", "suffix-slot");
    },
    m(t, n) {
      z(t, e, n), l[17](e);
    },
    p: M,
    d(t) {
      t && y(e), l[17](null);
    }
  };
}
function Z(l) {
  let e, t, n, d, C, T, v, _, a, p, E, b = (
    /*loading*/
    l[3] && j()
  ), f = (
    /*icon*/
    l[1] && q(l)
  ), o = (
    /*slots*/
    l[8].icon && D(l)
  );
  const h = (
    /*#slots*/
    l[15].default
  ), x = I(
    h,
    l,
    /*$$scope*/
    l[14],
    null
  ), u = x || Y(l);
  let c = (
    /*slots*/
    l[8].suffix && L(l)
  );
  return {
    c() {
      e = k("div"), t = k("button"), b && b.c(), n = B(), f && f.c(), d = B(), o && o.c(), C = B(), u && u.c(), T = B(), c && c.c(), m(t, "class", v = "mc-button " + /*disabled*/
      (l[4] ? "disabled" : "") + " button-" + /*styleType*/
      l[5] + " mc-button--" + /*size*/
      l[2] + " mc-button--" + /*shape*/
      l[6] + " " + /*slots*/
      (l[8].icon ? "mc-button--suffix" : "") + " svelte-ob4xf2"), m(t, "style", _ = /*width*/
      l[7] ? `width: ${/*width*/
      l[7]};` : ""), m(e, "class", "mc-button-wrapper svelte-ob4xf2");
    },
    m(i, r) {
      z(i, e, r), w(e, t), b && b.m(t, null), w(t, n), f && f.m(t, null), w(t, d), o && o.m(t, null), w(t, C), u && u.m(t, null), w(t, T), c && c.m(t, null), a = !0, p || (E = Q(
        t,
        "click",
        /*btnClick*/
        l[11]
      ), p = !0);
    },
    p(i, [r]) {
      /*loading*/
      i[3] ? b || (b = j(), b.c(), b.m(t, n)) : b && (b.d(1), b = null), /*icon*/
      i[1] ? f ? f.p(i, r) : (f = q(i), f.c(), f.m(t, d)) : f && (f.d(1), f = null), /*slots*/
      i[8].icon ? o ? o.p(i, r) : (o = D(i), o.c(), o.m(t, C)) : o && (o.d(1), o = null), x ? x.p && (!a || r & /*$$scope*/
      16384) && N(
        x,
        h,
        i,
        /*$$scope*/
        i[14],
        a ? P(
          h,
          /*$$scope*/
          i[14],
          r,
          null
        ) : O(
          /*$$scope*/
          i[14]
        ),
        null
      ) : u && u.p && (!a || r & /*label*/
      1) && u.p(i, a ? r : -1), /*slots*/
      i[8].suffix ? c ? c.p(i, r) : (c = L(i), c.c(), c.m(t, null)) : c && (c.d(1), c = null), (!a || r & /*disabled, styleType, size, shape, slots*/
      372 && v !== (v = "mc-button " + /*disabled*/
      (i[4] ? "disabled" : "") + " button-" + /*styleType*/
      i[5] + " mc-button--" + /*size*/
      i[2] + " mc-button--" + /*shape*/
      i[6] + " " + /*slots*/
      (i[8].icon ? "mc-button--suffix" : "") + " svelte-ob4xf2")) && m(t, "class", v), (!a || r & /*width*/
      128 && _ !== (_ = /*width*/
      i[7] ? `width: ${/*width*/
      i[7]};` : "")) && m(t, "style", _);
    },
    i(i) {
      a || (K(u, i), a = !0);
    },
    o(i) {
      J(u, i), a = !1;
    },
    d(i) {
      i && y(e), b && b.d(), f && f.d(), o && o.d(), u && u.d(i), c && c.d(), p = !1, E();
    }
  };
}
function $(l, e, t) {
  let { $$slots: n = {}, $$scope: d } = e;
  const C = !0;
  let { label: T = "Default Label" } = e, { icon: v = "" } = e, { size: _ = "md" } = e, { loading: a = !1 } = e, { disabled: p = !1 } = e, { styleType: E = "border-gradient" } = e, { shape: b = "capsule" } = e, { width: f = "" } = e, { onClick: o = (s) => {
  } } = e, { slots: h = { icon: null, suffix: null } } = e, x, u;
  const c = (s) => {
    p || o(s);
  };
  W(() => {
    h.suffix && u && u.appendChild(h.suffix), h.icon && x && x.appendChild(h.icon);
  });
  function i(s) {
    S[s ? "unshift" : "push"](() => {
      x = s, t(9, x);
    });
  }
  function r(s) {
    S[s ? "unshift" : "push"](() => {
      u = s, t(10, u);
    });
  }
  return l.$$set = (s) => {
    "label" in s && t(0, T = s.label), "icon" in s && t(1, v = s.icon), "size" in s && t(2, _ = s.size), "loading" in s && t(3, a = s.loading), "disabled" in s && t(4, p = s.disabled), "styleType" in s && t(5, E = s.styleType), "shape" in s && t(6, b = s.shape), "width" in s && t(7, f = s.width), "onClick" in s && t(13, o = s.onClick), "slots" in s && t(8, h = s.slots), "$$scope" in s && t(14, d = s.$$scope);
  }, [
    T,
    v,
    _,
    a,
    p,
    E,
    b,
    f,
    h,
    x,
    u,
    c,
    C,
    o,
    d,
    n,
    i,
    r
  ];
}
class ee extends F {
  constructor(e) {
    super(), G(
      this,
      e,
      $,
      Z,
      H,
      {
        customElement: 12,
        label: 0,
        icon: 1,
        size: 2,
        loading: 3,
        disabled: 4,
        styleType: 5,
        shape: 6,
        width: 7,
        onClick: 13,
        slots: 8
      },
      X
    );
  }
  get customElement() {
    return this.$$.ctx[12];
  }
  get label() {
    return this.$$.ctx[0];
  }
  set label(e) {
    this.$$set({ label: e }), g();
  }
  get icon() {
    return this.$$.ctx[1];
  }
  set icon(e) {
    this.$$set({ icon: e }), g();
  }
  get size() {
    return this.$$.ctx[2];
  }
  set size(e) {
    this.$$set({ size: e }), g();
  }
  get loading() {
    return this.$$.ctx[3];
  }
  set loading(e) {
    this.$$set({ loading: e }), g();
  }
  get disabled() {
    return this.$$.ctx[4];
  }
  set disabled(e) {
    this.$$set({ disabled: e }), g();
  }
  get styleType() {
    return this.$$.ctx[5];
  }
  set styleType(e) {
    this.$$set({ styleType: e }), g();
  }
  get shape() {
    return this.$$.ctx[6];
  }
  set shape(e) {
    this.$$set({ shape: e }), g();
  }
  get width() {
    return this.$$.ctx[7];
  }
  set width(e) {
    this.$$set({ width: e }), g();
  }
  get onClick() {
    return this.$$.ctx[13];
  }
  set onClick(e) {
    this.$$set({ onClick: e }), g();
  }
  get slots() {
    return this.$$.ctx[8];
  }
  set slots(e) {
    this.$$set({ slots: e }), g();
  }
}
A(ee, { label: {}, icon: {}, size: {}, loading: { type: "Boolean" }, disabled: { type: "Boolean" }, styleType: {}, shape: {}, width: {}, onClick: {}, slots: {} }, ["default"], ["customElement"], !0);
export {
  ee as default
};
