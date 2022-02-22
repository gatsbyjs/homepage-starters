/*! Sortable 1.14.0 - MIT | git://github.com/SortableJS/Sortable.git */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = t || self).Sortable = e())
})(this, function () {
  "use strict"
  function e(e, t) {
    var n,
      o = Object.keys(e)
    return (
      Object.getOwnPropertySymbols &&
        ((n = Object.getOwnPropertySymbols(e)),
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
          })),
        o.push.apply(o, n)),
      o
    )
  }
  function A(o) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {}
      t % 2
        ? e(Object(i), !0).forEach(function (t) {
            var e, n
            ;(e = o),
              (t = i[(n = t)]),
              n in e
                ? Object.defineProperty(e, n, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[n] = t)
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(i))
        : e(Object(i)).forEach(function (t) {
            Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(i, t))
          })
    }
    return o
  }
  function o(t) {
    return (o =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t
          })(t)
  }
  function a() {
    return (a =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n,
            o = arguments[e]
          for (n in o)
            Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n])
        }
        return t
      }).apply(this, arguments)
  }
  function i(t, e) {
    if (null == t) return {}
    var n,
      o = (function (t, e) {
        if (null == t) return {}
        for (var n, o = {}, i = Object.keys(t), r = 0; r < i.length; r++)
          (n = i[r]), 0 <= e.indexOf(n) || (o[n] = t[n])
        return o
      })(t, e)
    if (Object.getOwnPropertySymbols)
      for (var i = Object.getOwnPropertySymbols(t), r = 0; r < i.length; r++)
        (n = i[r]),
          0 <= e.indexOf(n) ||
            (Object.prototype.propertyIsEnumerable.call(t, n) && (o[n] = t[n]))
    return o
  }
  function r(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) return l(t)
      })(t) ||
      (function (t) {
        if (
          ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
          null != t["@@iterator"]
        )
          return Array.from(t)
      })(t) ||
      (function (t, e) {
        if (t) {
          if ("string" == typeof t) return l(t, e)
          var n = Object.prototype.toString.call(t).slice(8, -1)
          return "Map" ===
            (n = "Object" === n && t.constructor ? t.constructor.name : n) ||
            "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? l(t, e)
            : void 0
        }
      })(t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        )
      })()
    )
  }
  function l(t, e) {
    ;(null == e || e > t.length) && (e = t.length)
    for (var n = 0, o = new Array(e); n < e; n++) o[n] = t[n]
    return o
  }
  function t(t) {
    if ("undefined" != typeof window && window.navigator)
      return !!navigator.userAgent.match(t)
  }
  var y = t(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
    w = t(/Edge/i),
    s = t(/firefox/i),
    u = t(/safari/i) && !t(/chrome/i) && !t(/android/i),
    n = t(/iP(ad|od|hone)/i),
    c = t(/chrome/i) && t(/android/i),
    d = { capture: !1, passive: !1 }
  function h(t, e, n) {
    t.addEventListener(e, n, !y && d)
  }
  function f(t, e, n) {
    t.removeEventListener(e, n, !y && d)
  }
  function p(t, e) {
    if (e && (">" === e[0] && (e = e.substring(1)), t))
      try {
        if (t.matches) return t.matches(e)
        if (t.msMatchesSelector) return t.msMatchesSelector(e)
        if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e)
      } catch (t) {
        return
      }
  }
  function N(t, e, n, o) {
    if (t) {
      n = n || document
      do {
        if (
          (null != e && (">" !== e[0] || t.parentNode === n) && p(t, e)) ||
          (o && t === n)
        )
          return t
      } while (
        t !== n &&
        (t =
          (i = t).host && i !== document && i.host.nodeType
            ? i.host
            : i.parentNode)
      )
    }
    var i
    return null
  }
  var g,
    m = /\s+/g
  function I(t, e, n) {
    var o
    t &&
      e &&
      (t.classList
        ? t.classList[n ? "add" : "remove"](e)
        : ((o = (" " + t.className + " ")
            .replace(m, " ")
            .replace(" " + e + " ", " ")),
          (t.className = (o + (n ? " " + e : "")).replace(m, " "))))
  }
  function P(t, e, n) {
    var o = t && t.style
    if (o) {
      if (void 0 === n)
        return (
          document.defaultView && document.defaultView.getComputedStyle
            ? (n = document.defaultView.getComputedStyle(t, ""))
            : t.currentStyle && (n = t.currentStyle),
          void 0 === e ? n : n[e]
        )
      o[(e = !(e in o || -1 !== e.indexOf("webkit")) ? "-webkit-" + e : e)] =
        n + ("string" == typeof n ? "" : "px")
    }
  }
  function v(t, e) {
    var n = ""
    if ("string" == typeof t) n = t
    else
      do {
        var o = P(t, "transform")
      } while (
        (o && "none" !== o && (n = o + " " + n), !e && (t = t.parentNode))
      )
    var i =
      window.DOMMatrix ||
      window.WebKitCSSMatrix ||
      window.CSSMatrix ||
      window.MSCSSMatrix
    return i && new i(n)
  }
  function b(t, e, n) {
    if (t) {
      var o = t.getElementsByTagName(e),
        i = 0,
        r = o.length
      if (n) for (; i < r; i++) n(o[i], i)
      return o
    }
    return []
  }
  function O() {
    var t = document.scrollingElement
    return t || document.documentElement
  }
  function k(t, e, n, o, i) {
    if (t.getBoundingClientRect || t === window) {
      var r,
        a,
        l,
        s,
        c,
        u,
        d =
          t !== window && t.parentNode && t !== O()
            ? ((a = (r = t.getBoundingClientRect()).top),
              (l = r.left),
              (s = r.bottom),
              (c = r.right),
              (u = r.height),
              r.width)
            : ((l = a = 0),
              (s = window.innerHeight),
              (c = window.innerWidth),
              (u = window.innerHeight),
              window.innerWidth)
      if ((e || n) && t !== window && ((i = i || t.parentNode), !y))
        do {
          if (
            i &&
            i.getBoundingClientRect &&
            ("none" !== P(i, "transform") ||
              (n && "static" !== P(i, "position")))
          ) {
            var h = i.getBoundingClientRect()
            ;(a -= h.top + parseInt(P(i, "border-top-width"))),
              (l -= h.left + parseInt(P(i, "border-left-width"))),
              (s = a + r.height),
              (c = l + r.width)
            break
          }
        } while ((i = i.parentNode))
      return (
        o &&
          t !== window &&
          ((o = (e = v(i || t)) && e.a),
          (t = e && e.d),
          e && ((s = (a /= t) + (u /= t)), (c = (l /= o) + (d /= o)))),
        { top: a, left: l, bottom: s, right: c, width: d, height: u }
      )
    }
  }
  function R(t, e, n) {
    for (var o = M(t, !0), i = k(t)[e]; o; ) {
      var r = k(o)[n]
      if (!("top" === n || "left" === n ? r <= i : i <= r)) return o
      if (o === O()) break
      o = M(o, !1)
    }
    return !1
  }
  function X(t, e, n, o) {
    for (var i = 0, r = 0, a = t.children; r < a.length; ) {
      if (
        "none" !== a[r].style.display &&
        a[r] !== Bt.ghost &&
        (o || a[r] !== Bt.dragged) &&
        N(a[r], n.draggable, t, !1)
      ) {
        if (i === e) return a[r]
        i++
      }
      r++
    }
    return null
  }
  function Y(t, e) {
    for (
      var n = t.lastElementChild;
      n && (n === Bt.ghost || "none" === P(n, "display") || (e && !p(n, e)));

    )
      n = n.previousElementSibling
    return n || null
  }
  function B(t, e) {
    var n = 0
    if (!t || !t.parentNode) return -1
    for (; (t = t.previousElementSibling); )
      "TEMPLATE" === t.nodeName.toUpperCase() ||
        t === Bt.clone ||
        (e && !p(t, e)) ||
        n++
    return n
  }
  function E(t) {
    var e = 0,
      n = 0,
      o = O()
    if (t)
      do {
        var i = v(t),
          r = i.a,
          i = i.d
      } while (
        ((e += t.scrollLeft * r),
        (n += t.scrollTop * i),
        t !== o && (t = t.parentNode))
      )
    return [e, n]
  }
  function M(t, e) {
    if (!t || !t.getBoundingClientRect) return O()
    var n = t,
      o = !1
    do {
      if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
        var i = P(n)
        if (
          (n.clientWidth < n.scrollWidth &&
            ("auto" == i.overflowX || "scroll" == i.overflowX)) ||
          (n.clientHeight < n.scrollHeight &&
            ("auto" == i.overflowY || "scroll" == i.overflowY))
        ) {
          if (!n.getBoundingClientRect || n === document.body) return O()
          if (o || e) return n
          o = !0
        }
      }
    } while ((n = n.parentNode))
    return O()
  }
  function D(t, e) {
    return (
      Math.round(t.top) === Math.round(e.top) &&
      Math.round(t.left) === Math.round(e.left) &&
      Math.round(t.height) === Math.round(e.height) &&
      Math.round(t.width) === Math.round(e.width)
    )
  }
  function S(e, n) {
    return function () {
      var t
      g ||
        (1 === (t = arguments).length ? e.call(this, t[0]) : e.apply(this, t),
        (g = setTimeout(function () {
          g = void 0
        }, n)))
    }
  }
  function F(t, e, n) {
    ;(t.scrollLeft += e), (t.scrollTop += n)
  }
  function _(t) {
    var e = window.Polymer,
      n = window.jQuery || window.Zepto
    return e && e.dom
      ? e.dom(t).cloneNode(!0)
      : n
      ? n(t).clone(!0)[0]
      : t.cloneNode(!0)
  }
  function C(t, e) {
    P(t, "position", "absolute"),
      P(t, "top", e.top),
      P(t, "left", e.left),
      P(t, "width", e.width),
      P(t, "height", e.height)
  }
  function T(t) {
    P(t, "position", ""),
      P(t, "top", ""),
      P(t, "left", ""),
      P(t, "width", ""),
      P(t, "height", "")
  }
  var j = "Sortable" + new Date().getTime()
  function x() {
    var e,
      o = []
    return {
      captureAnimationState: function () {
        ;(o = []),
          this.options.animation &&
            [].slice.call(this.el.children).forEach(function (t) {
              var e, n
              "none" !== P(t, "display") &&
                t !== Bt.ghost &&
                (o.push({ target: t, rect: k(t) }),
                (e = A({}, o[o.length - 1].rect)),
                !t.thisAnimationDuration ||
                  ((n = v(t, !0)) && ((e.top -= n.f), (e.left -= n.e))),
                (t.fromRect = e))
            })
      },
      addAnimationState: function (t) {
        o.push(t)
      },
      removeAnimationState: function (t) {
        o.splice(
          (function (t, e) {
            for (var n in t)
              if (t.hasOwnProperty(n))
                for (var o in e)
                  if (e.hasOwnProperty(o) && e[o] === t[n][o]) return Number(n)
            return -1
          })(o, { target: t }),
          1
        )
      },
      animateAll: function (t) {
        var c = this
        if (!this.options.animation)
          return clearTimeout(e), void ("function" == typeof t && t())
        var u = !1,
          d = 0
        o.forEach(function (t) {
          var e = 0,
            n = t.target,
            o = n.fromRect,
            i = k(n),
            r = n.prevFromRect,
            a = n.prevToRect,
            l = t.rect,
            s = v(n, !0)
          s && ((i.top -= s.f), (i.left -= s.e)),
            (n.toRect = i),
            n.thisAnimationDuration &&
              D(r, i) &&
              !D(o, i) &&
              (l.top - i.top) / (l.left - i.left) ==
                (o.top - i.top) / (o.left - i.left) &&
              ((t = l),
              (s = r),
              (r = a),
              (a = c.options),
              (e =
                (Math.sqrt(
                  Math.pow(s.top - t.top, 2) + Math.pow(s.left - t.left, 2)
                ) /
                  Math.sqrt(
                    Math.pow(s.top - r.top, 2) + Math.pow(s.left - r.left, 2)
                  )) *
                a.animation)),
            D(i, o) ||
              ((n.prevFromRect = o),
              (n.prevToRect = i),
              (e = e || c.options.animation),
              c.animate(n, l, i, e)),
            e &&
              ((u = !0),
              (d = Math.max(d, e)),
              clearTimeout(n.animationResetTimer),
              (n.animationResetTimer = setTimeout(function () {
                ;(n.animationTime = 0),
                  (n.prevFromRect = null),
                  (n.fromRect = null),
                  (n.prevToRect = null),
                  (n.thisAnimationDuration = null)
              }, e)),
              (n.thisAnimationDuration = e))
        }),
          clearTimeout(e),
          u
            ? (e = setTimeout(function () {
                "function" == typeof t && t()
              }, d))
            : "function" == typeof t && t(),
          (o = [])
      },
      animate: function (t, e, n, o) {
        var i, r
        o &&
          (P(t, "transition", ""),
          P(t, "transform", ""),
          (i = (r = v(this.el)) && r.a),
          (r = r && r.d),
          (i = (e.left - n.left) / (i || 1)),
          (r = (e.top - n.top) / (r || 1)),
          (t.animatingX = !!i),
          (t.animatingY = !!r),
          P(t, "transform", "translate3d(" + i + "px," + r + "px,0)"),
          (this.forRepaintDummy = t.offsetWidth),
          P(
            t,
            "transition",
            "transform " +
              o +
              "ms" +
              (this.options.easing ? " " + this.options.easing : "")
          ),
          P(t, "transform", "translate3d(0,0,0)"),
          "number" == typeof t.animated && clearTimeout(t.animated),
          (t.animated = setTimeout(function () {
            P(t, "transition", ""),
              P(t, "transform", ""),
              (t.animated = !1),
              (t.animatingX = !1),
              (t.animatingY = !1)
          }, o)))
      },
    }
  }
  var H = [],
    L = { initializeByDefault: !0 },
    K = {
      mount: function (e) {
        for (var t in L) !L.hasOwnProperty(t) || t in e || (e[t] = L[t])
        H.forEach(function (t) {
          if (t.pluginName === e.pluginName)
            throw "Sortable: Cannot mount plugin ".concat(
              e.pluginName,
              " more than once"
            )
        }),
          H.push(e)
      },
      pluginEvent: function (e, n, o) {
        var t = this
        ;(this.eventCanceled = !1),
          (o.cancel = function () {
            t.eventCanceled = !0
          })
        var i = e + "Global"
        H.forEach(function (t) {
          n[t.pluginName] &&
            (n[t.pluginName][i] && n[t.pluginName][i](A({ sortable: n }, o)),
            n.options[t.pluginName] &&
              n[t.pluginName][e] &&
              n[t.pluginName][e](A({ sortable: n }, o)))
        })
      },
      initializePlugins: function (n, o, i, t) {
        for (var e in (H.forEach(function (t) {
          var e = t.pluginName
          ;(n.options[e] || t.initializeByDefault) &&
            (((t = new t(n, o, n.options)).sortable = n),
            (t.options = n.options),
            (n[e] = t),
            a(i, t.defaults))
        }),
        n.options)) {
          var r
          n.options.hasOwnProperty(e) &&
            void 0 !== (r = this.modifyOption(n, e, n.options[e])) &&
            (n.options[e] = r)
        }
      },
      getEventProperties: function (e, n) {
        var o = {}
        return (
          H.forEach(function (t) {
            "function" == typeof t.eventProperties &&
              a(o, t.eventProperties.call(n[t.pluginName], e))
          }),
          o
        )
      },
      modifyOption: function (e, n, o) {
        var i
        return (
          H.forEach(function (t) {
            e[t.pluginName] &&
              t.optionListeners &&
              "function" == typeof t.optionListeners[n] &&
              (i = t.optionListeners[n].call(e[t.pluginName], o))
          }),
          i
        )
      },
    }
  function W(t) {
    var e = t.sortable,
      n = t.rootEl,
      o = t.name,
      i = t.targetEl,
      r = t.cloneEl,
      a = t.toEl,
      l = t.fromEl,
      s = t.oldIndex,
      c = t.newIndex,
      u = t.oldDraggableIndex,
      d = t.newDraggableIndex,
      h = t.originalEvent,
      f = t.putSortable,
      p = t.extraEventProperties
    if ((e = e || (n && n[j]))) {
      var g,
        m = e.options,
        t = "on" + o.charAt(0).toUpperCase() + o.substr(1)
      !window.CustomEvent || y || w
        ? (g = document.createEvent("Event")).initEvent(o, !0, !0)
        : (g = new CustomEvent(o, { bubbles: !0, cancelable: !0 })),
        (g.to = a || n),
        (g.from = l || n),
        (g.item = i || n),
        (g.clone = r),
        (g.oldIndex = s),
        (g.newIndex = c),
        (g.oldDraggableIndex = u),
        (g.newDraggableIndex = d),
        (g.originalEvent = h),
        (g.pullMode = f ? f.lastPutMode : void 0)
      var v,
        b = A(A({}, p), K.getEventProperties(o, e))
      for (v in b) g[v] = b[v]
      n && n.dispatchEvent(g), m[t] && m[t].call(e, g)
    }
  }
  function z(t, e) {
    var n = (o =
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {})
        .evt,
      o = i(o, G)
    K.pluginEvent.bind(Bt)(
      t,
      e,
      A(
        {
          dragEl: q,
          parentEl: V,
          ghostEl: Z,
          rootEl: $,
          nextEl: Q,
          lastDownEl: J,
          cloneEl: tt,
          cloneHidden: et,
          dragStarted: pt,
          putSortable: lt,
          activeSortable: Bt.active,
          originalEvent: n,
          oldIndex: nt,
          oldDraggableIndex: it,
          newIndex: ot,
          newDraggableIndex: rt,
          hideGhostForTarget: kt,
          unhideGhostForTarget: Rt,
          cloneNowHidden: function () {
            et = !0
          },
          cloneNowShown: function () {
            et = !1
          },
          dispatchSortableEvent: function (t) {
            U({ sortable: e, name: t, originalEvent: n })
          },
        },
        o
      )
    )
  }
  var G = ["evt"]
  function U(t) {
    W(
      A(
        {
          putSortable: lt,
          cloneEl: tt,
          targetEl: q,
          rootEl: $,
          oldIndex: nt,
          oldDraggableIndex: it,
          newIndex: ot,
          newDraggableIndex: rt,
        },
        t
      )
    )
  }
  var q,
    V,
    Z,
    $,
    Q,
    J,
    tt,
    et,
    nt,
    ot,
    it,
    rt,
    at,
    lt,
    st,
    ct,
    ut,
    dt,
    ht,
    ft,
    pt,
    gt,
    mt,
    vt,
    bt,
    yt = !1,
    wt = !1,
    Et = [],
    Dt = !1,
    St = !1,
    _t = [],
    Ct = !1,
    Tt = [],
    xt = "undefined" != typeof document,
    Ot = n,
    Mt = w || y ? "cssFloat" : "float",
    At = xt && !c && !n && "draggable" in document.createElement("div"),
    Nt = (function () {
      if (xt) {
        if (y) return !1
        var t = document.createElement("x")
        return (
          (t.style.cssText = "pointer-events:auto"),
          "auto" === t.style.pointerEvents
        )
      }
    })(),
    It = function (t, e) {
      var n = P(t),
        o =
          parseInt(n.width) -
          parseInt(n.paddingLeft) -
          parseInt(n.paddingRight) -
          parseInt(n.borderLeftWidth) -
          parseInt(n.borderRightWidth),
        i = X(t, 0, e),
        r = X(t, 1, e),
        a = i && P(i),
        l = r && P(r),
        s = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + k(i).width,
        t = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + k(r).width
      if ("flex" === n.display)
        return "column" === n.flexDirection ||
          "column-reverse" === n.flexDirection
          ? "vertical"
          : "horizontal"
      if ("grid" === n.display)
        return n.gridTemplateColumns.split(" ").length <= 1
          ? "vertical"
          : "horizontal"
      if (i && a.float && "none" !== a.float) {
        e = "left" === a.float ? "left" : "right"
        return !r || ("both" !== l.clear && l.clear !== e)
          ? "horizontal"
          : "vertical"
      }
      return i &&
        ("block" === a.display ||
          "flex" === a.display ||
          "table" === a.display ||
          "grid" === a.display ||
          (o <= s && "none" === n[Mt]) ||
          (r && "none" === n[Mt] && o < s + t))
        ? "vertical"
        : "horizontal"
    },
    Pt = function (t) {
      function l(r, a) {
        return function (t, e, n, o) {
          var i =
            t.options.group.name &&
            e.options.group.name &&
            t.options.group.name === e.options.group.name
          if (null == r && (a || i)) return !0
          if (null == r || !1 === r) return !1
          if (a && "clone" === r) return r
          if ("function" == typeof r) return l(r(t, e, n, o), a)(t, e, n, o)
          e = (a ? t : e).options.group.name
          return (
            !0 === r ||
            ("string" == typeof r && r === e) ||
            (r.join && -1 < r.indexOf(e))
          )
        }
      }
      var e = {},
        n = t.group
      ;(n && "object" == o(n)) || (n = { name: n }),
        (e.name = n.name),
        (e.checkPull = l(n.pull, !0)),
        (e.checkPut = l(n.put)),
        (e.revertClone = n.revertClone),
        (t.group = e)
    },
    kt = function () {
      !Nt && Z && P(Z, "display", "none")
    },
    Rt = function () {
      !Nt && Z && P(Z, "display", "")
    }
  xt &&
    document.addEventListener(
      "click",
      function (t) {
        if (wt)
          return (
            t.preventDefault(),
            t.stopPropagation && t.stopPropagation(),
            t.stopImmediatePropagation && t.stopImmediatePropagation(),
            (wt = !1)
          )
      },
      !0
    )
  function Xt(t) {
    if (q) {
      t = t.touches ? t.touches[0] : t
      var e =
        ((i = t.clientX),
        (r = t.clientY),
        Et.some(function (t) {
          var e = t[j].options.emptyInsertThreshold
          if (e && !Y(t)) {
            var n = k(t),
              o = i >= n.left - e && i <= n.right + e,
              e = r >= n.top - e && r <= n.bottom + e
            return o && e ? (a = t) : void 0
          }
        }),
        a)
      if (e) {
        var n,
          o = {}
        for (n in t) t.hasOwnProperty(n) && (o[n] = t[n])
        ;(o.target = o.rootEl = e),
          (o.preventDefault = void 0),
          (o.stopPropagation = void 0),
          e[j]._onDragOver(o)
      }
    }
    var i, r, a
  }
  function Yt(t) {
    q && q.parentNode[j]._isOutsideThisEl(t.target)
  }
  function Bt(t, e) {
    if (!t || !t.nodeType || 1 !== t.nodeType)
      throw "Sortable: `el` must be an HTMLElement, not ".concat(
        {}.toString.call(t)
      )
    ;(this.el = t), (this.options = e = a({}, e)), (t[j] = this)
    var n,
      o,
      i = {
        group: null,
        sort: !0,
        disabled: !1,
        store: null,
        handle: null,
        draggable: /^[uo]l$/i.test(t.nodeName) ? ">li" : ">*",
        swapThreshold: 1,
        invertSwap: !1,
        invertedSwapThreshold: null,
        removeCloneOnHide: !0,
        direction: function () {
          return It(t, this.options)
        },
        ghostClass: "sortable-ghost",
        chosenClass: "sortable-chosen",
        dragClass: "sortable-drag",
        ignore: "a, img",
        filter: null,
        preventOnFilter: !0,
        animation: 0,
        easing: null,
        setData: function (t, e) {
          t.setData("Text", e.textContent)
        },
        dropBubble: !1,
        dragoverBubble: !1,
        dataIdAttr: "data-id",
        delay: 0,
        delayOnTouchOnly: !1,
        touchStartThreshold:
          (Number.parseInt ? Number : window).parseInt(
            window.devicePixelRatio,
            10
          ) || 1,
        forceFallback: !1,
        fallbackClass: "sortable-fallback",
        fallbackOnBody: !1,
        fallbackTolerance: 0,
        fallbackOffset: { x: 0, y: 0 },
        supportPointer:
          !1 !== Bt.supportPointer && "PointerEvent" in window && !u,
        emptyInsertThreshold: 5,
      }
    for (n in (K.initializePlugins(this, t, i), i)) n in e || (e[n] = i[n])
    for (o in (Pt(e), this))
      "_" === o.charAt(0) &&
        "function" == typeof this[o] &&
        (this[o] = this[o].bind(this))
    ;(this.nativeDraggable = !e.forceFallback && At),
      this.nativeDraggable && (this.options.touchStartThreshold = 1),
      e.supportPointer
        ? h(t, "pointerdown", this._onTapStart)
        : (h(t, "mousedown", this._onTapStart),
          h(t, "touchstart", this._onTapStart)),
      this.nativeDraggable && (h(t, "dragover", this), h(t, "dragenter", this)),
      Et.push(this.el),
      e.store && e.store.get && this.sort(e.store.get(this) || []),
      a(this, x())
  }
  function Ft(t, e, n, o, i, r, a, l) {
    var s,
      c,
      u = t[j],
      d = u.options.onMove
    return (
      !window.CustomEvent || y || w
        ? (s = document.createEvent("Event")).initEvent("move", !0, !0)
        : (s = new CustomEvent("move", { bubbles: !0, cancelable: !0 })),
      (s.to = e),
      (s.from = t),
      (s.dragged = n),
      (s.draggedRect = o),
      (s.related = i || e),
      (s.relatedRect = r || k(e)),
      (s.willInsertAfter = l),
      (s.originalEvent = a),
      t.dispatchEvent(s),
      (c = d ? d.call(u, s, a) : c)
    )
  }
  function jt(t) {
    t.draggable = !1
  }
  function Ht() {
    Ct = !1
  }
  function Lt(t) {
    return setTimeout(t, 0)
  }
  function Kt(t) {
    return clearTimeout(t)
  }
  ;(Bt.prototype = {
    constructor: Bt,
    _isOutsideThisEl: function (t) {
      this.el.contains(t) || t === this.el || (gt = null)
    },
    _getDirection: function (t, e) {
      return "function" == typeof this.options.direction
        ? this.options.direction.call(this, t, e, q)
        : this.options.direction
    },
    _onTapStart: function (e) {
      if (e.cancelable) {
        var n = this,
          o = this.el,
          t = this.options,
          i = t.preventOnFilter,
          r = e.type,
          a =
            (e.touches && e.touches[0]) ||
            (e.pointerType && "touch" === e.pointerType && e),
          l = (a || e).target,
          s =
            (e.target.shadowRoot &&
              ((e.path && e.path[0]) ||
                (e.composedPath && e.composedPath()[0]))) ||
            l,
          c = t.filter
        if (
          (!(function (t) {
            Tt.length = 0
            var e = t.getElementsByTagName("input"),
              n = e.length
            for (; n--; ) {
              var o = e[n]
              o.checked && Tt.push(o)
            }
          })(o),
          !q &&
            !(
              (/mousedown|pointerdown/.test(r) && 0 !== e.button) ||
              t.disabled
            ) &&
            !s.isContentEditable &&
            (this.nativeDraggable ||
              !u ||
              !l ||
              "SELECT" !== l.tagName.toUpperCase()) &&
            !(((l = N(l, t.draggable, o, !1)) && l.animated) || J === l))
        ) {
          if (((nt = B(l)), (it = B(l, t.draggable)), "function" == typeof c)) {
            if (c.call(this, e, l, this))
              return (
                U({
                  sortable: n,
                  rootEl: s,
                  name: "filter",
                  targetEl: l,
                  toEl: o,
                  fromEl: o,
                }),
                z("filter", n, { evt: e }),
                void (i && e.cancelable && e.preventDefault())
              )
          } else if (
            (c =
              c &&
              c.split(",").some(function (t) {
                if ((t = N(s, t.trim(), o, !1)))
                  return (
                    U({
                      sortable: n,
                      rootEl: t,
                      name: "filter",
                      targetEl: l,
                      fromEl: o,
                      toEl: o,
                    }),
                    z("filter", n, { evt: e }),
                    !0
                  )
              }))
          )
            return void (i && e.cancelable && e.preventDefault())
          ;(t.handle && !N(s, t.handle, o, !1)) ||
            this._prepareDragStart(e, a, l)
        }
      }
    },
    _prepareDragStart: function (t, e, n) {
      var o,
        i = this,
        r = i.el,
        a = i.options,
        l = r.ownerDocument
      n &&
        !q &&
        n.parentNode === r &&
        ((o = k(n)),
        ($ = r),
        (V = (q = n).parentNode),
        (Q = q.nextSibling),
        (J = n),
        (at = a.group),
        (st = {
          target: (Bt.dragged = q),
          clientX: (e || t).clientX,
          clientY: (e || t).clientY,
        }),
        (ht = st.clientX - o.left),
        (ft = st.clientY - o.top),
        (this._lastX = (e || t).clientX),
        (this._lastY = (e || t).clientY),
        (q.style["will-change"] = "all"),
        (o = function () {
          z("delayEnded", i, { evt: t }),
            Bt.eventCanceled
              ? i._onDrop()
              : (i._disableDelayedDragEvents(),
                !s && i.nativeDraggable && (q.draggable = !0),
                i._triggerDragStart(t, e),
                U({ sortable: i, name: "choose", originalEvent: t }),
                I(q, a.chosenClass, !0))
        }),
        a.ignore.split(",").forEach(function (t) {
          b(q, t.trim(), jt)
        }),
        h(l, "dragover", Xt),
        h(l, "mousemove", Xt),
        h(l, "touchmove", Xt),
        h(l, "mouseup", i._onDrop),
        h(l, "touchend", i._onDrop),
        h(l, "touchcancel", i._onDrop),
        s &&
          this.nativeDraggable &&
          ((this.options.touchStartThreshold = 4), (q.draggable = !0)),
        z("delayStart", this, { evt: t }),
        !a.delay ||
        (a.delayOnTouchOnly && !e) ||
        (this.nativeDraggable && (w || y))
          ? o()
          : Bt.eventCanceled
          ? this._onDrop()
          : (h(l, "mouseup", i._disableDelayedDrag),
            h(l, "touchend", i._disableDelayedDrag),
            h(l, "touchcancel", i._disableDelayedDrag),
            h(l, "mousemove", i._delayedDragTouchMoveHandler),
            h(l, "touchmove", i._delayedDragTouchMoveHandler),
            a.supportPointer &&
              h(l, "pointermove", i._delayedDragTouchMoveHandler),
            (i._dragStartTimer = setTimeout(o, a.delay))))
    },
    _delayedDragTouchMoveHandler: function (t) {
      t = t.touches ? t.touches[0] : t
      Math.max(
        Math.abs(t.clientX - this._lastX),
        Math.abs(t.clientY - this._lastY)
      ) >=
        Math.floor(
          this.options.touchStartThreshold /
            ((this.nativeDraggable && window.devicePixelRatio) || 1)
        ) && this._disableDelayedDrag()
    },
    _disableDelayedDrag: function () {
      q && jt(q),
        clearTimeout(this._dragStartTimer),
        this._disableDelayedDragEvents()
    },
    _disableDelayedDragEvents: function () {
      var t = this.el.ownerDocument
      f(t, "mouseup", this._disableDelayedDrag),
        f(t, "touchend", this._disableDelayedDrag),
        f(t, "touchcancel", this._disableDelayedDrag),
        f(t, "mousemove", this._delayedDragTouchMoveHandler),
        f(t, "touchmove", this._delayedDragTouchMoveHandler),
        f(t, "pointermove", this._delayedDragTouchMoveHandler)
    },
    _triggerDragStart: function (t, e) {
      ;(e = e || ("touch" == t.pointerType && t)),
        !this.nativeDraggable || e
          ? this.options.supportPointer
            ? h(document, "pointermove", this._onTouchMove)
            : h(document, e ? "touchmove" : "mousemove", this._onTouchMove)
          : (h(q, "dragend", this), h($, "dragstart", this._onDragStart))
      try {
        document.selection
          ? Lt(function () {
              document.selection.empty()
            })
          : window.getSelection().removeAllRanges()
      } catch (t) {}
    },
    _dragStarted: function (t, e) {
      var n
      ;(yt = !1),
        $ && q
          ? (z("dragStarted", this, { evt: e }),
            this.nativeDraggable && h(document, "dragover", Yt),
            (n = this.options),
            t || I(q, n.dragClass, !1),
            I(q, n.ghostClass, !0),
            (Bt.active = this),
            t && this._appendGhost(),
            U({ sortable: this, name: "start", originalEvent: e }))
          : this._nulling()
    },
    _emulateDragOver: function () {
      if (ct) {
        ;(this._lastX = ct.clientX), (this._lastY = ct.clientY), kt()
        for (
          var t = document.elementFromPoint(ct.clientX, ct.clientY), e = t;
          t &&
          t.shadowRoot &&
          (t = t.shadowRoot.elementFromPoint(ct.clientX, ct.clientY)) !== e;

        )
          e = t
        if ((q.parentNode[j]._isOutsideThisEl(t), e))
          do {
            if (e[j])
              if (
                e[j]._onDragOver({
                  clientX: ct.clientX,
                  clientY: ct.clientY,
                  target: t,
                  rootEl: e,
                }) &&
                !this.options.dragoverBubble
              )
                break
          } while ((e = (t = e).parentNode))
        Rt()
      }
    },
    _onTouchMove: function (t) {
      if (st) {
        var e = this.options,
          n = e.fallbackTolerance,
          o = e.fallbackOffset,
          i = t.touches ? t.touches[0] : t,
          r = Z && v(Z, !0),
          a = Z && r && r.a,
          l = Z && r && r.d,
          e = Ot && bt && E(bt),
          a =
            (i.clientX - st.clientX + o.x) / (a || 1) +
            (e ? e[0] - _t[0] : 0) / (a || 1),
          l =
            (i.clientY - st.clientY + o.y) / (l || 1) +
            (e ? e[1] - _t[1] : 0) / (l || 1)
        if (!Bt.active && !yt) {
          if (
            n &&
            Math.max(
              Math.abs(i.clientX - this._lastX),
              Math.abs(i.clientY - this._lastY)
            ) < n
          )
            return
          this._onDragStart(t, !0)
        }
        Z &&
          (r
            ? ((r.e += a - (ut || 0)), (r.f += l - (dt || 0)))
            : (r = { a: 1, b: 0, c: 0, d: 1, e: a, f: l }),
          (r = "matrix("
            .concat(r.a, ",")
            .concat(r.b, ",")
            .concat(r.c, ",")
            .concat(r.d, ",")
            .concat(r.e, ",")
            .concat(r.f, ")")),
          P(Z, "webkitTransform", r),
          P(Z, "mozTransform", r),
          P(Z, "msTransform", r),
          P(Z, "transform", r),
          (ut = a),
          (dt = l),
          (ct = i)),
          t.cancelable && t.preventDefault()
      }
    },
    _appendGhost: function () {
      if (!Z) {
        var t = this.options.fallbackOnBody ? document.body : $,
          e = k(q, !0, Ot, !0, t),
          n = this.options
        if (Ot) {
          for (
            bt = t;
            "static" === P(bt, "position") &&
            "none" === P(bt, "transform") &&
            bt !== document;

          )
            bt = bt.parentNode
          bt !== document.body && bt !== document.documentElement
            ? (bt === document && (bt = O()),
              (e.top += bt.scrollTop),
              (e.left += bt.scrollLeft))
            : (bt = O()),
            (_t = E(bt))
        }
        I((Z = q.cloneNode(!0)), n.ghostClass, !1),
          I(Z, n.fallbackClass, !0),
          I(Z, n.dragClass, !0),
          P(Z, "transition", ""),
          P(Z, "transform", ""),
          P(Z, "box-sizing", "border-box"),
          P(Z, "margin", 0),
          P(Z, "top", e.top),
          P(Z, "left", e.left),
          P(Z, "width", e.width),
          P(Z, "height", e.height),
          P(Z, "opacity", "0.8"),
          P(Z, "position", Ot ? "absolute" : "fixed"),
          P(Z, "zIndex", "100000"),
          P(Z, "pointerEvents", "none"),
          (Bt.ghost = Z),
          t.appendChild(Z),
          P(
            Z,
            "transform-origin",
            (ht / parseInt(Z.style.width)) * 100 +
              "% " +
              (ft / parseInt(Z.style.height)) * 100 +
              "%"
          )
      }
    },
    _onDragStart: function (t, e) {
      var n = this,
        o = t.dataTransfer,
        i = n.options
      z("dragStart", this, { evt: t }),
        Bt.eventCanceled
          ? this._onDrop()
          : (z("setupClone", this),
            Bt.eventCanceled ||
              (((tt = _(q)).draggable = !1),
              (tt.style["will-change"] = ""),
              this._hideClone(),
              I(tt, this.options.chosenClass, !1),
              (Bt.clone = tt)),
            (n.cloneId = Lt(function () {
              z("clone", n),
                Bt.eventCanceled ||
                  (n.options.removeCloneOnHide || $.insertBefore(tt, q),
                  n._hideClone(),
                  U({ sortable: n, name: "clone" }))
            })),
            e || I(q, i.dragClass, !0),
            e
              ? ((wt = !0), (n._loopId = setInterval(n._emulateDragOver, 50)))
              : (f(document, "mouseup", n._onDrop),
                f(document, "touchend", n._onDrop),
                f(document, "touchcancel", n._onDrop),
                o &&
                  ((o.effectAllowed = "move"),
                  i.setData && i.setData.call(n, o, q)),
                h(document, "drop", n),
                P(q, "transform", "translateZ(0)")),
            (yt = !0),
            (n._dragStartId = Lt(n._dragStarted.bind(n, e, t))),
            h(document, "selectstart", n),
            (pt = !0),
            u && P(document.body, "user-select", "none"))
    },
    _onDragOver: function (n) {
      var o,
        i,
        r,
        t,
        a = this.el,
        l = n.target,
        e = this.options,
        s = e.group,
        c = Bt.active,
        u = at === s,
        d = e.sort,
        h = lt || c,
        f = this,
        p = !1
      if (!Ct) {
        if (
          (void 0 !== n.preventDefault && n.cancelable && n.preventDefault(),
          (l = N(l, e.draggable, a, !0)),
          T("dragOver"),
          Bt.eventCanceled)
        )
          return p
        if (
          q.contains(n.target) ||
          (l.animated && l.animatingX && l.animatingY) ||
          f._ignoreWhileAnimating === l
        )
          return O(!1)
        if (
          ((wt = !1),
          c &&
            !e.disabled &&
            (u
              ? d || (i = V !== $)
              : lt === this ||
                ((this.lastPutMode = at.checkPull(this, c, q, n)) &&
                  s.checkPut(this, c, q, n))))
        ) {
          if (
            ((r = "vertical" === this._getDirection(n, l)),
            (o = k(q)),
            T("dragOverValid"),
            Bt.eventCanceled)
          )
            return p
          if (i)
            return (
              (V = $),
              x(),
              this._hideClone(),
              T("revert"),
              Bt.eventCanceled || (Q ? $.insertBefore(q, Q) : $.appendChild(q)),
              O(!0)
            )
          var g = Y(a, e.draggable)
          if (
            !g ||
            ((function (t, e, n) {
              n = k(Y(n.el, n.options.draggable))
              return e
                ? t.clientX > n.right + 10 ||
                    (t.clientX <= n.right &&
                      t.clientY > n.bottom &&
                      t.clientX >= n.left)
                : (t.clientX > n.right && t.clientY > n.top) ||
                    (t.clientX <= n.right && t.clientY > n.bottom + 10)
            })(n, r, this) &&
              !g.animated)
          ) {
            if (g === q) return O(!1)
            if (
              ((l = g && a === n.target ? g : l) && (w = k(l)),
              !1 !== Ft($, a, q, o, l, w, n, !!l))
            )
              return x(), a.appendChild(q), (V = a), M(), O(!0)
          } else if (
            g &&
            (function (t, e, n) {
              n = k(X(n.el, 0, n.options, !0))
              return e
                ? t.clientX < n.left - 10 ||
                    (t.clientY < n.top && t.clientX < n.right)
                : t.clientY < n.top - 10 ||
                    (t.clientY < n.bottom && t.clientX < n.left)
            })(n, r, this)
          ) {
            var m = X(a, 0, e, !0)
            if (m === q) return O(!1)
            if (((w = k((l = m))), !1 !== Ft($, a, q, o, l, w, n, !1)))
              return x(), a.insertBefore(q, m), (V = a), M(), O(!0)
          } else if (l.parentNode === a) {
            var v,
              b,
              y,
              w = k(l),
              E = q.parentNode !== a,
              D =
                ((D = (q.animated && q.toRect) || o),
                (C = (l.animated && l.toRect) || w),
                (S = (t = r) ? D.left : D.top),
                (s = t ? D.right : D.bottom),
                (g = t ? D.width : D.height),
                (m = t ? C.left : C.top),
                (D = t ? C.right : C.bottom),
                (C = t ? C.width : C.height),
                !(S === m || s === D || S + g / 2 === m + C / 2)),
              S = r ? "top" : "left",
              g = R(l, "top", "top") || R(q, "top", "top"),
              m = g ? g.scrollTop : void 0
            if (
              (gt !== l &&
                ((b = w[S]), (Dt = !1), (St = (!D && e.invertSwap) || E)),
              0 !==
                (v = (function (t, e, n, o, i, r, a, l) {
                  var s = o ? t.clientY : t.clientX,
                    c = o ? n.height : n.width,
                    t = o ? n.top : n.left,
                    o = o ? n.bottom : n.right,
                    n = !1
                  if (!a)
                    if (l && vt < c * i) {
                      if (
                        (Dt =
                          !Dt &&
                          (1 === mt ? t + (c * r) / 2 < s : s < o - (c * r) / 2)
                            ? !0
                            : Dt)
                      )
                        n = !0
                      else if (1 === mt ? s < t + vt : o - vt < s) return -mt
                    } else if (
                      t + (c * (1 - i)) / 2 < s &&
                      s < o - (c * (1 - i)) / 2
                    )
                      return (function (t) {
                        return B(q) < B(t) ? 1 : -1
                      })(e)
                  if (
                    (n = n || a) &&
                    (s < t + (c * r) / 2 || o - (c * r) / 2 < s)
                  )
                    return t + c / 2 < s ? 1 : -1
                  return 0
                })(
                  n,
                  l,
                  w,
                  r,
                  D ? 1 : e.swapThreshold,
                  null == e.invertedSwapThreshold
                    ? e.swapThreshold
                    : e.invertedSwapThreshold,
                  St,
                  gt === l
                )))
            )
              for (
                var _ = B(q);
                (y = V.children[(_ -= v)]) &&
                ("none" === P(y, "display") || y === Z);

              );
            if (0 === v || y === l) return O(!1)
            mt = v
            var C = (gt = l).nextElementSibling,
              E = !1,
              D = Ft($, a, q, o, l, w, n, (E = 1 === v))
            if (!1 !== D)
              return (
                (1 !== D && -1 !== D) || (E = 1 === D),
                (Ct = !0),
                setTimeout(Ht, 30),
                x(),
                E && !C
                  ? a.appendChild(q)
                  : l.parentNode.insertBefore(q, E ? C : l),
                g && F(g, 0, m - g.scrollTop),
                (V = q.parentNode),
                void 0 === b || St || (vt = Math.abs(b - k(l)[S])),
                M(),
                O(!0)
              )
          }
          if (a.contains(q)) return O(!1)
        }
        return !1
      }
      function T(t, e) {
        z(
          t,
          f,
          A(
            {
              evt: n,
              isOwner: u,
              axis: r ? "vertical" : "horizontal",
              revert: i,
              dragRect: o,
              targetRect: w,
              canSort: d,
              fromSortable: h,
              target: l,
              completed: O,
              onMove: function (t, e) {
                return Ft($, a, q, o, t, k(t), n, e)
              },
              changed: M,
            },
            e
          )
        )
      }
      function x() {
        T("dragOverAnimationCapture"),
          f.captureAnimationState(),
          f !== h && h.captureAnimationState()
      }
      function O(t) {
        return (
          T("dragOverCompleted", { insertion: t }),
          t &&
            (u ? c._hideClone() : c._showClone(f),
            f !== h &&
              (I(q, (lt || c).options.ghostClass, !1), I(q, e.ghostClass, !0)),
            lt !== f && f !== Bt.active
              ? (lt = f)
              : f === Bt.active && lt && (lt = null),
            h === f && (f._ignoreWhileAnimating = l),
            f.animateAll(function () {
              T("dragOverAnimationComplete"), (f._ignoreWhileAnimating = null)
            }),
            f !== h && (h.animateAll(), (h._ignoreWhileAnimating = null))),
          ((l === q && !q.animated) || (l === a && !l.animated)) && (gt = null),
          e.dragoverBubble ||
            n.rootEl ||
            l === document ||
            (q.parentNode[j]._isOutsideThisEl(n.target), t || Xt(n)),
          !e.dragoverBubble && n.stopPropagation && n.stopPropagation(),
          (p = !0)
        )
      }
      function M() {
        ;(ot = B(q)),
          (rt = B(q, e.draggable)),
          U({
            sortable: f,
            name: "change",
            toEl: a,
            newIndex: ot,
            newDraggableIndex: rt,
            originalEvent: n,
          })
      }
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function () {
      f(document, "mousemove", this._onTouchMove),
        f(document, "touchmove", this._onTouchMove),
        f(document, "pointermove", this._onTouchMove),
        f(document, "dragover", Xt),
        f(document, "mousemove", Xt),
        f(document, "touchmove", Xt)
    },
    _offUpEvents: function () {
      var t = this.el.ownerDocument
      f(t, "mouseup", this._onDrop),
        f(t, "touchend", this._onDrop),
        f(t, "pointerup", this._onDrop),
        f(t, "touchcancel", this._onDrop),
        f(document, "selectstart", this)
    },
    _onDrop: function (t) {
      var e = this.el,
        n = this.options
      ;(ot = B(q)),
        (rt = B(q, n.draggable)),
        z("drop", this, { evt: t }),
        (V = q && q.parentNode),
        (ot = B(q)),
        (rt = B(q, n.draggable)),
        Bt.eventCanceled ||
          ((Dt = St = yt = !1),
          clearInterval(this._loopId),
          clearTimeout(this._dragStartTimer),
          Kt(this.cloneId),
          Kt(this._dragStartId),
          this.nativeDraggable &&
            (f(document, "drop", this), f(e, "dragstart", this._onDragStart)),
          this._offMoveEvents(),
          this._offUpEvents(),
          u && P(document.body, "user-select", ""),
          P(q, "transform", ""),
          t &&
            (pt &&
              (t.cancelable && t.preventDefault(),
              n.dropBubble || t.stopPropagation()),
            Z && Z.parentNode && Z.parentNode.removeChild(Z),
            ($ === V || (lt && "clone" !== lt.lastPutMode)) &&
              tt &&
              tt.parentNode &&
              tt.parentNode.removeChild(tt),
            q &&
              (this.nativeDraggable && f(q, "dragend", this),
              jt(q),
              (q.style["will-change"] = ""),
              pt && !yt && I(q, (lt || this).options.ghostClass, !1),
              I(q, this.options.chosenClass, !1),
              U({
                sortable: this,
                name: "unchoose",
                toEl: V,
                newIndex: null,
                newDraggableIndex: null,
                originalEvent: t,
              }),
              $ !== V
                ? (0 <= ot &&
                    (U({
                      rootEl: V,
                      name: "add",
                      toEl: V,
                      fromEl: $,
                      originalEvent: t,
                    }),
                    U({
                      sortable: this,
                      name: "remove",
                      toEl: V,
                      originalEvent: t,
                    }),
                    U({
                      rootEl: V,
                      name: "sort",
                      toEl: V,
                      fromEl: $,
                      originalEvent: t,
                    }),
                    U({
                      sortable: this,
                      name: "sort",
                      toEl: V,
                      originalEvent: t,
                    })),
                  lt && lt.save())
                : ot !== nt &&
                  0 <= ot &&
                  (U({
                    sortable: this,
                    name: "update",
                    toEl: V,
                    originalEvent: t,
                  }),
                  U({
                    sortable: this,
                    name: "sort",
                    toEl: V,
                    originalEvent: t,
                  })),
              Bt.active &&
                ((null != ot && -1 !== ot) || ((ot = nt), (rt = it)),
                U({ sortable: this, name: "end", toEl: V, originalEvent: t }),
                this.save())))),
        this._nulling()
    },
    _nulling: function () {
      z("nulling", this),
        ($ =
          q =
          V =
          Z =
          Q =
          tt =
          J =
          et =
          st =
          ct =
          pt =
          ot =
          rt =
          nt =
          it =
          gt =
          mt =
          lt =
          at =
          Bt.dragged =
          Bt.ghost =
          Bt.clone =
          Bt.active =
            null),
        Tt.forEach(function (t) {
          t.checked = !0
        }),
        (Tt.length = ut = dt = 0)
    },
    handleEvent: function (t) {
      switch (t.type) {
        case "drop":
        case "dragend":
          this._onDrop(t)
          break
        case "dragenter":
        case "dragover":
          q &&
            (this._onDragOver(t),
            (function (t) {
              t.dataTransfer && (t.dataTransfer.dropEffect = "move")
              t.cancelable && t.preventDefault()
            })(t))
          break
        case "selectstart":
          t.preventDefault()
      }
    },
    toArray: function () {
      for (
        var t,
          e = [],
          n = this.el.children,
          o = 0,
          i = n.length,
          r = this.options;
        o < i;
        o++
      )
        N((t = n[o]), r.draggable, this.el, !1) &&
          e.push(
            t.getAttribute(r.dataIdAttr) ||
              (function (t) {
                var e =
                    t.tagName + t.className + t.src + t.href + t.textContent,
                  n = e.length,
                  o = 0
                for (; n--; ) o += e.charCodeAt(n)
                return o.toString(36)
              })(t)
          )
      return e
    },
    sort: function (t, e) {
      var n = {},
        o = this.el
      this.toArray().forEach(function (t, e) {
        e = o.children[e]
        N(e, this.options.draggable, o, !1) && (n[t] = e)
      }, this),
        e && this.captureAnimationState(),
        t.forEach(function (t) {
          n[t] && (o.removeChild(n[t]), o.appendChild(n[t]))
        }),
        e && this.animateAll()
    },
    save: function () {
      var t = this.options.store
      t && t.set && t.set(this)
    },
    closest: function (t, e) {
      return N(t, e || this.options.draggable, this.el, !1)
    },
    option: function (t, e) {
      var n = this.options
      if (void 0 === e) return n[t]
      var o = K.modifyOption(this, t, e)
      ;(n[t] = void 0 !== o ? o : e), "group" === t && Pt(n)
    },
    destroy: function () {
      z("destroy", this)
      var t = this.el
      ;(t[j] = null),
        f(t, "mousedown", this._onTapStart),
        f(t, "touchstart", this._onTapStart),
        f(t, "pointerdown", this._onTapStart),
        this.nativeDraggable &&
          (f(t, "dragover", this), f(t, "dragenter", this)),
        Array.prototype.forEach.call(
          t.querySelectorAll("[draggable]"),
          function (t) {
            t.removeAttribute("draggable")
          }
        ),
        this._onDrop(),
        this._disableDelayedDragEvents(),
        Et.splice(Et.indexOf(this.el), 1),
        (this.el = t = null)
    },
    _hideClone: function () {
      et ||
        (z("hideClone", this),
        Bt.eventCanceled ||
          (P(tt, "display", "none"),
          this.options.removeCloneOnHide &&
            tt.parentNode &&
            tt.parentNode.removeChild(tt),
          (et = !0)))
    },
    _showClone: function (t) {
      "clone" === t.lastPutMode
        ? et &&
          (z("showClone", this),
          Bt.eventCanceled ||
            (q.parentNode != $ || this.options.group.revertClone
              ? Q
                ? $.insertBefore(tt, Q)
                : $.appendChild(tt)
              : $.insertBefore(tt, q),
            this.options.group.revertClone && this.animate(q, tt),
            P(tt, "display", ""),
            (et = !1)))
        : this._hideClone()
    },
  }),
    xt &&
      h(document, "touchmove", function (t) {
        ;(Bt.active || yt) && t.cancelable && t.preventDefault()
      }),
    (Bt.utils = {
      on: h,
      off: f,
      css: P,
      find: b,
      is: function (t, e) {
        return !!N(t, e, t, !1)
      },
      extend: function (t, e) {
        if (t && e) for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
        return t
      },
      throttle: S,
      closest: N,
      toggleClass: I,
      clone: _,
      index: B,
      nextTick: Lt,
      cancelNextTick: Kt,
      detectDirection: It,
      getChild: X,
    }),
    (Bt.get = function (t) {
      return t[j]
    }),
    (Bt.mount = function () {
      for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
        e[n] = arguments[n]
      ;(e = e[0].constructor === Array ? e[0] : e).forEach(function (t) {
        if (!t.prototype || !t.prototype.constructor)
          throw "Sortable: Mounted plugin must be a constructor function, not ".concat(
            {}.toString.call(t)
          )
        t.utils && (Bt.utils = A(A({}, Bt.utils), t.utils)), K.mount(t)
      })
    }),
    (Bt.create = function (t, e) {
      return new Bt(t, e)
    })
  var Wt,
    zt,
    Gt,
    Ut,
    qt,
    Vt,
    Zt = [],
    $t = !(Bt.version = "1.14.0")
  function Qt() {
    Zt.forEach(function (t) {
      clearInterval(t.pid)
    }),
      (Zt = [])
  }
  function Jt() {
    clearInterval(Vt)
  }
  var te,
    ee = S(function (n, t, e, o) {
      if (t.scroll) {
        var i,
          r = (n.touches ? n.touches[0] : n).clientX,
          a = (n.touches ? n.touches[0] : n).clientY,
          l = t.scrollSensitivity,
          s = t.scrollSpeed,
          c = O(),
          u = !1
        zt !== e &&
          ((zt = e),
          Qt(),
          (Wt = t.scroll),
          (i = t.scrollFn),
          !0 === Wt && (Wt = M(e, !0)))
        var d = 0,
          h = Wt
        do {
          var f = h,
            p = k(f),
            g = p.top,
            m = p.bottom,
            v = p.left,
            b = p.right,
            y = p.width,
            w = p.height,
            E = void 0,
            D = void 0,
            S = f.scrollWidth,
            _ = f.scrollHeight,
            C = P(f),
            T = f.scrollLeft,
            p = f.scrollTop,
            D =
              f === c
                ? ((E =
                    y < S &&
                    ("auto" === C.overflowX ||
                      "scroll" === C.overflowX ||
                      "visible" === C.overflowX)),
                  w < _ &&
                    ("auto" === C.overflowY ||
                      "scroll" === C.overflowY ||
                      "visible" === C.overflowY))
                : ((E =
                    y < S &&
                    ("auto" === C.overflowX || "scroll" === C.overflowX)),
                  w < _ &&
                    ("auto" === C.overflowY || "scroll" === C.overflowY)),
            T =
              E &&
              (Math.abs(b - r) <= l && T + y < S) -
                (Math.abs(v - r) <= l && !!T),
            p =
              D &&
              (Math.abs(m - a) <= l && p + w < _) -
                (Math.abs(g - a) <= l && !!p)
          if (!Zt[d]) for (var x = 0; x <= d; x++) Zt[x] || (Zt[x] = {})
          ;(Zt[d].vx == T && Zt[d].vy == p && Zt[d].el === f) ||
            ((Zt[d].el = f),
            (Zt[d].vx = T),
            (Zt[d].vy = p),
            clearInterval(Zt[d].pid),
            (0 == T && 0 == p) ||
              ((u = !0),
              (Zt[d].pid = setInterval(
                function () {
                  o && 0 === this.layer && Bt.active._onTouchMove(qt)
                  var t = Zt[this.layer].vy ? Zt[this.layer].vy * s : 0,
                    e = Zt[this.layer].vx ? Zt[this.layer].vx * s : 0
                  ;("function" == typeof i &&
                    "continue" !==
                      i.call(
                        Bt.dragged.parentNode[j],
                        e,
                        t,
                        n,
                        qt,
                        Zt[this.layer].el
                      )) ||
                    F(Zt[this.layer].el, e, t)
                }.bind({ layer: d }),
                24
              )))),
            d++
        } while (t.bubbleScroll && h !== c && (h = M(h, !1)))
        $t = u
      }
    }, 30),
    n = function (t) {
      var e = t.originalEvent,
        n = t.putSortable,
        o = t.dragEl,
        i = t.activeSortable,
        r = t.dispatchSortableEvent,
        a = t.hideGhostForTarget,
        t = t.unhideGhostForTarget
      e &&
        ((i = n || i),
        a(),
        (e =
          e.changedTouches && e.changedTouches.length
            ? e.changedTouches[0]
            : e),
        (e = document.elementFromPoint(e.clientX, e.clientY)),
        t(),
        i &&
          !i.el.contains(e) &&
          (r("spill"), this.onSpill({ dragEl: o, putSortable: n })))
    }
  function ne() {}
  function oe() {}
  ;(ne.prototype = {
    startIndex: null,
    dragStart: function (t) {
      t = t.oldDraggableIndex
      this.startIndex = t
    },
    onSpill: function (t) {
      var e = t.dragEl,
        n = t.putSortable
      this.sortable.captureAnimationState(), n && n.captureAnimationState()
      t = X(this.sortable.el, this.startIndex, this.options)
      t ? this.sortable.el.insertBefore(e, t) : this.sortable.el.appendChild(e),
        this.sortable.animateAll(),
        n && n.animateAll()
    },
    drop: n,
  }),
    a(ne, { pluginName: "revertOnSpill" }),
    (oe.prototype = {
      onSpill: function (t) {
        var e = t.dragEl,
          t = t.putSortable || this.sortable
        t.captureAnimationState(),
          e.parentNode && e.parentNode.removeChild(e),
          t.animateAll()
      },
      drop: n,
    }),
    a(oe, { pluginName: "removeOnSpill" })
  var ie,
    re,
    ae,
    le,
    se,
    ce = [],
    ue = [],
    de = !1,
    he = !1,
    fe = !1
  function pe(n, o) {
    ue.forEach(function (t, e) {
      e = o.children[t.sortableIndex + (n ? Number(e) : 0)]
      e ? o.insertBefore(t, e) : o.appendChild(t)
    })
  }
  function ge() {
    ce.forEach(function (t) {
      t !== ae && t.parentNode && t.parentNode.removeChild(t)
    })
  }
  return (
    Bt.mount(
      new (function () {
        function t() {
          for (var t in ((this.defaults = {
            scroll: !0,
            forceAutoScrollFallback: !1,
            scrollSensitivity: 30,
            scrollSpeed: 10,
            bubbleScroll: !0,
          }),
          this))
            "_" === t.charAt(0) &&
              "function" == typeof this[t] &&
              (this[t] = this[t].bind(this))
        }
        return (
          (t.prototype = {
            dragStarted: function (t) {
              t = t.originalEvent
              this.sortable.nativeDraggable
                ? h(document, "dragover", this._handleAutoScroll)
                : this.options.supportPointer
                ? h(document, "pointermove", this._handleFallbackAutoScroll)
                : t.touches
                ? h(document, "touchmove", this._handleFallbackAutoScroll)
                : h(document, "mousemove", this._handleFallbackAutoScroll)
            },
            dragOverCompleted: function (t) {
              t = t.originalEvent
              this.options.dragOverBubble ||
                t.rootEl ||
                this._handleAutoScroll(t)
            },
            drop: function () {
              this.sortable.nativeDraggable
                ? f(document, "dragover", this._handleAutoScroll)
                : (f(document, "pointermove", this._handleFallbackAutoScroll),
                  f(document, "touchmove", this._handleFallbackAutoScroll),
                  f(document, "mousemove", this._handleFallbackAutoScroll)),
                Jt(),
                Qt(),
                clearTimeout(g),
                (g = void 0)
            },
            nulling: function () {
              ;(qt = zt = Wt = $t = Vt = Gt = Ut = null), (Zt.length = 0)
            },
            _handleFallbackAutoScroll: function (t) {
              this._handleAutoScroll(t, !0)
            },
            _handleAutoScroll: function (e, n) {
              var o,
                i = this,
                r = (e.touches ? e.touches[0] : e).clientX,
                a = (e.touches ? e.touches[0] : e).clientY,
                t = document.elementFromPoint(r, a)
              ;(qt = e),
                n || this.options.forceAutoScrollFallback || w || y || u
                  ? (ee(e, this.options, t, n),
                    (o = M(t, !0)),
                    !$t ||
                      (Vt && r === Gt && a === Ut) ||
                      (Vt && Jt(),
                      (Vt = setInterval(function () {
                        var t = M(document.elementFromPoint(r, a), !0)
                        t !== o && ((o = t), Qt()), ee(e, i.options, t, n)
                      }, 10)),
                      (Gt = r),
                      (Ut = a)))
                  : this.options.bubbleScroll && M(t, !0) !== O()
                  ? ee(e, this.options, M(t, !1), !1)
                  : Qt()
            },
          }),
          a(t, { pluginName: "scroll", initializeByDefault: !0 })
        )
      })()
    ),
    Bt.mount(oe, ne),
    Bt.mount(
      new (function () {
        function t() {
          this.defaults = { swapClass: "sortable-swap-highlight" }
        }
        return (
          (t.prototype = {
            dragStart: function (t) {
              t = t.dragEl
              te = t
            },
            dragOverValid: function (t) {
              var e = t.completed,
                n = t.target,
                o = t.onMove,
                i = t.activeSortable,
                r = t.changed,
                a = t.cancel
              i.options.swap &&
                ((t = this.sortable.el),
                (i = this.options),
                n &&
                  n !== t &&
                  ((t = te),
                  (te = !1 !== o(n) ? (I(n, i.swapClass, !0), n) : null),
                  t && t !== te && I(t, i.swapClass, !1)),
                r(),
                e(!0),
                a())
            },
            drop: function (t) {
              var e,
                n,
                o = t.activeSortable,
                i = t.putSortable,
                r = t.dragEl,
                a = i || this.sortable,
                l = this.options
              te && I(te, l.swapClass, !1),
                te &&
                  (l.swap || (i && i.options.swap)) &&
                  r !== te &&
                  (a.captureAnimationState(),
                  a !== o && o.captureAnimationState(),
                  (n = te),
                  (t = (e = r).parentNode),
                  (l = n.parentNode),
                  t &&
                    l &&
                    !t.isEqualNode(n) &&
                    !l.isEqualNode(e) &&
                    ((i = B(e)),
                    (r = B(n)),
                    t.isEqualNode(l) && i < r && r++,
                    t.insertBefore(n, t.children[i]),
                    l.insertBefore(e, l.children[r])),
                  a.animateAll(),
                  a !== o && o.animateAll())
            },
            nulling: function () {
              te = null
            },
          }),
          a(t, {
            pluginName: "swap",
            eventProperties: function () {
              return { swapItem: te }
            },
          })
        )
      })()
    ),
    Bt.mount(
      new (function () {
        function t(o) {
          for (var t in this)
            "_" === t.charAt(0) &&
              "function" == typeof this[t] &&
              (this[t] = this[t].bind(this))
          o.options.supportPointer
            ? h(document, "pointerup", this._deselectMultiDrag)
            : (h(document, "mouseup", this._deselectMultiDrag),
              h(document, "touchend", this._deselectMultiDrag)),
            h(document, "keydown", this._checkKeyDown),
            h(document, "keyup", this._checkKeyUp),
            (this.defaults = {
              selectedClass: "sortable-selected",
              multiDragKey: null,
              setData: function (t, e) {
                var n = ""
                ce.length && re === o
                  ? ce.forEach(function (t, e) {
                      n += (e ? ", " : "") + t.textContent
                    })
                  : (n = e.textContent),
                  t.setData("Text", n)
              },
            })
        }
        return (
          (t.prototype = {
            multiDragKeyDown: !1,
            isMultiDrag: !1,
            delayStartGlobal: function (t) {
              t = t.dragEl
              ae = t
            },
            delayEnded: function () {
              this.isMultiDrag = ~ce.indexOf(ae)
            },
            setupClone: function (t) {
              var e = t.sortable,
                t = t.cancel
              if (this.isMultiDrag) {
                for (var n = 0; n < ce.length; n++)
                  ue.push(_(ce[n])),
                    (ue[n].sortableIndex = ce[n].sortableIndex),
                    (ue[n].draggable = !1),
                    (ue[n].style["will-change"] = ""),
                    I(ue[n], this.options.selectedClass, !1),
                    ce[n] === ae && I(ue[n], this.options.chosenClass, !1)
                e._hideClone(), t()
              }
            },
            clone: function (t) {
              var e = t.sortable,
                n = t.rootEl,
                o = t.dispatchSortableEvent,
                t = t.cancel
              this.isMultiDrag &&
                (this.options.removeCloneOnHide ||
                  (ce.length && re === e && (pe(!0, n), o("clone"), t())))
            },
            showClone: function (t) {
              var e = t.cloneNowShown,
                n = t.rootEl,
                t = t.cancel
              this.isMultiDrag &&
                (pe(!1, n),
                ue.forEach(function (t) {
                  P(t, "display", "")
                }),
                e(),
                (se = !1),
                t())
            },
            hideClone: function (t) {
              var e = this,
                n = (t.sortable, t.cloneNowHidden),
                t = t.cancel
              this.isMultiDrag &&
                (ue.forEach(function (t) {
                  P(t, "display", "none"),
                    e.options.removeCloneOnHide &&
                      t.parentNode &&
                      t.parentNode.removeChild(t)
                }),
                n(),
                (se = !0),
                t())
            },
            dragStartGlobal: function (t) {
              t.sortable
              !this.isMultiDrag && re && re.multiDrag._deselectMultiDrag(),
                ce.forEach(function (t) {
                  t.sortableIndex = B(t)
                }),
                (ce = ce.sort(function (t, e) {
                  return t.sortableIndex - e.sortableIndex
                })),
                (fe = !0)
            },
            dragStarted: function (t) {
              var e,
                n = this,
                t = t.sortable
              this.isMultiDrag &&
                (this.options.sort &&
                  (t.captureAnimationState(),
                  this.options.animation &&
                    (ce.forEach(function (t) {
                      t !== ae && P(t, "position", "absolute")
                    }),
                    (e = k(ae, !1, !0, !0)),
                    ce.forEach(function (t) {
                      t !== ae && C(t, e)
                    }),
                    (de = he = !0))),
                t.animateAll(function () {
                  ;(de = he = !1),
                    n.options.animation &&
                      ce.forEach(function (t) {
                        T(t)
                      }),
                    n.options.sort && ge()
                }))
            },
            dragOver: function (t) {
              var e = t.target,
                n = t.completed,
                t = t.cancel
              he && ~ce.indexOf(e) && (n(!1), t())
            },
            revert: function (t) {
              var n,
                o,
                e = t.fromSortable,
                i = t.rootEl,
                r = t.sortable,
                a = t.dragRect
              1 < ce.length &&
                (ce.forEach(function (t) {
                  r.addAnimationState({ target: t, rect: he ? k(t) : a }),
                    T(t),
                    (t.fromRect = a),
                    e.removeAnimationState(t)
                }),
                (he = !1),
                (n = !this.options.removeCloneOnHide),
                (o = i),
                ce.forEach(function (t, e) {
                  e = o.children[t.sortableIndex + (n ? Number(e) : 0)]
                  e ? o.insertBefore(t, e) : o.appendChild(t)
                }))
            },
            dragOverCompleted: function (t) {
              var e,
                n = t.sortable,
                o = t.isOwner,
                i = t.insertion,
                r = t.activeSortable,
                a = t.parentEl,
                l = t.putSortable,
                t = this.options
              i &&
                (o && r._hideClone(),
                (de = !1),
                t.animation &&
                  1 < ce.length &&
                  (he || (!o && !r.options.sort && !l)) &&
                  ((e = k(ae, !1, !0, !0)),
                  ce.forEach(function (t) {
                    t !== ae && (C(t, e), a.appendChild(t))
                  }),
                  (he = !0)),
                o ||
                  (he || ge(),
                  1 < ce.length
                    ? ((o = se),
                      r._showClone(n),
                      r.options.animation &&
                        !se &&
                        o &&
                        ue.forEach(function (t) {
                          r.addAnimationState({ target: t, rect: le }),
                            (t.fromRect = le),
                            (t.thisAnimationDuration = null)
                        }))
                    : r._showClone(n)))
            },
            dragOverAnimationCapture: function (t) {
              var e = t.dragRect,
                n = t.isOwner,
                t = t.activeSortable
              ce.forEach(function (t) {
                t.thisAnimationDuration = null
              }),
                t.options.animation &&
                  !n &&
                  t.multiDrag.isMultiDrag &&
                  ((le = a({}, e)),
                  (e = v(ae, !0)),
                  (le.top -= e.f),
                  (le.left -= e.e))
            },
            dragOverAnimationComplete: function () {
              he && ((he = !1), ge())
            },
            drop: function (t) {
              var e = t.originalEvent,
                n = t.rootEl,
                o = t.parentEl,
                i = t.sortable,
                r = t.dispatchSortableEvent,
                a = t.oldIndex,
                l = t.putSortable,
                s = l || this.sortable
              if (e) {
                var c,
                  u,
                  d,
                  h = this.options,
                  f = o.children
                if (!fe)
                  if (
                    (h.multiDragKey &&
                      !this.multiDragKeyDown &&
                      this._deselectMultiDrag(),
                    I(ae, h.selectedClass, !~ce.indexOf(ae)),
                    ~ce.indexOf(ae))
                  )
                    ce.splice(ce.indexOf(ae), 1),
                      (ie = null),
                      W({
                        sortable: i,
                        rootEl: n,
                        name: "deselect",
                        targetEl: ae,
                        originalEvt: e,
                      })
                  else {
                    if (
                      (ce.push(ae),
                      W({
                        sortable: i,
                        rootEl: n,
                        name: "select",
                        targetEl: ae,
                        originalEvt: e,
                      }),
                      e.shiftKey && ie && i.el.contains(ie))
                    ) {
                      var p = B(ie),
                        t = B(ae)
                      if (~p && ~t && p !== t)
                        for (
                          var g, m = p < t ? ((g = p), t) : ((g = t), p + 1);
                          g < m;
                          g++
                        )
                          ~ce.indexOf(f[g]) ||
                            (I(f[g], h.selectedClass, !0),
                            ce.push(f[g]),
                            W({
                              sortable: i,
                              rootEl: n,
                              name: "select",
                              targetEl: f[g],
                              originalEvt: e,
                            }))
                    } else ie = ae
                    re = s
                  }
                fe &&
                  this.isMultiDrag &&
                  ((he = !1),
                  (o[j].options.sort || o !== n) &&
                    1 < ce.length &&
                    ((c = k(ae)),
                    (u = B(ae, ":not(." + this.options.selectedClass + ")")),
                    !de && h.animation && (ae.thisAnimationDuration = null),
                    s.captureAnimationState(),
                    de ||
                      (h.animation &&
                        ((ae.fromRect = c),
                        ce.forEach(function (t) {
                          var e
                          ;(t.thisAnimationDuration = null),
                            t !== ae &&
                              ((e = he ? k(t) : c),
                              (t.fromRect = e),
                              s.addAnimationState({ target: t, rect: e }))
                        })),
                      ge(),
                      ce.forEach(function (t) {
                        f[u] ? o.insertBefore(t, f[u]) : o.appendChild(t), u++
                      }),
                      a === B(ae) &&
                        ((d = !1),
                        ce.forEach(function (t) {
                          t.sortableIndex !== B(t) && (d = !0)
                        }),
                        d && r("update"))),
                    ce.forEach(function (t) {
                      T(t)
                    }),
                    s.animateAll()),
                  (re = s)),
                  (n === o || (l && "clone" !== l.lastPutMode)) &&
                    ue.forEach(function (t) {
                      t.parentNode && t.parentNode.removeChild(t)
                    })
              }
            },
            nullingGlobal: function () {
              ;(this.isMultiDrag = fe = !1), (ue.length = 0)
            },
            destroyGlobal: function () {
              this._deselectMultiDrag(),
                f(document, "pointerup", this._deselectMultiDrag),
                f(document, "mouseup", this._deselectMultiDrag),
                f(document, "touchend", this._deselectMultiDrag),
                f(document, "keydown", this._checkKeyDown),
                f(document, "keyup", this._checkKeyUp)
            },
            _deselectMultiDrag: function (t) {
              if (
                !(
                  (void 0 !== fe && fe) ||
                  re !== this.sortable ||
                  (t &&
                    N(
                      t.target,
                      this.options.draggable,
                      this.sortable.el,
                      !1
                    )) ||
                  (t && 0 !== t.button)
                )
              )
                for (; ce.length; ) {
                  var e = ce[0]
                  I(e, this.options.selectedClass, !1),
                    ce.shift(),
                    W({
                      sortable: this.sortable,
                      rootEl: this.sortable.el,
                      name: "deselect",
                      targetEl: e,
                      originalEvt: t,
                    })
                }
            },
            _checkKeyDown: function (t) {
              t.key === this.options.multiDragKey &&
                (this.multiDragKeyDown = !0)
            },
            _checkKeyUp: function (t) {
              t.key === this.options.multiDragKey &&
                (this.multiDragKeyDown = !1)
            },
          }),
          a(t, {
            pluginName: "multiDrag",
            utils: {
              select: function (t) {
                var e = t.parentNode[j]
                e &&
                  e.options.multiDrag &&
                  !~ce.indexOf(t) &&
                  (re &&
                    re !== e &&
                    (re.multiDrag._deselectMultiDrag(), (re = e)),
                  I(t, e.options.selectedClass, !0),
                  ce.push(t))
              },
              deselect: function (t) {
                var e = t.parentNode[j],
                  n = ce.indexOf(t)
                e &&
                  e.options.multiDrag &&
                  ~n &&
                  (I(t, e.options.selectedClass, !1), ce.splice(n, 1))
              },
            },
            eventProperties: function () {
              var n = this,
                o = [],
                i = []
              return (
                ce.forEach(function (t) {
                  var e
                  o.push({ multiDragElement: t, index: t.sortableIndex }),
                    (e =
                      he && t !== ae
                        ? -1
                        : he
                        ? B(t, ":not(." + n.options.selectedClass + ")")
                        : B(t)),
                    i.push({ multiDragElement: t, index: e })
                }),
                {
                  items: r(ce),
                  clones: [].concat(ue),
                  oldIndicies: o,
                  newIndicies: i,
                }
              )
            },
            optionListeners: {
              multiDragKey: function (t) {
                return (
                  "ctrl" === (t = t.toLowerCase())
                    ? (t = "Control")
                    : 1 < t.length &&
                      (t = t.charAt(0).toUpperCase() + t.substr(1)),
                  t
                )
              },
            },
          })
        )
      })()
    ),
    Bt
  )
})
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, drupalSettings, _) {
  Drupal.ckeditor = Drupal.ckeditor || {}
  Drupal.behaviors.ckeditorAdmin = {
    attach: function attach(context) {
      var configurationForm = once(
        "ckeditor-configuration",
        ".ckeditor-toolbar-configuration",
        context
      )

      if (configurationForm.length) {
        var $configurationForm = $(configurationForm)
        var $textarea = $configurationForm
          .find(".js-form-item-editor-settings-toolbar-button-groups")
          .hide()
          .find("textarea")
        $configurationForm.append(drupalSettings.ckeditor.toolbarAdmin)
        Drupal.ckeditor.models.Model = new Drupal.ckeditor.Model({
          $textarea: $textarea,
          activeEditorConfig: JSON.parse($textarea.val()),
          hiddenEditorConfig: drupalSettings.ckeditor.hiddenCKEditorConfig,
        })
        var viewDefaults = {
          model: Drupal.ckeditor.models.Model,
          el: $(".ckeditor-toolbar-configuration"),
        }
        Drupal.ckeditor.views = {
          controller: new Drupal.ckeditor.ControllerView(viewDefaults),
          visualView: new Drupal.ckeditor.VisualView(viewDefaults),
          keyboardView: new Drupal.ckeditor.KeyboardView(viewDefaults),
          auralView: new Drupal.ckeditor.AuralView(viewDefaults),
        }
      }
    },
    detach: function detach(context, settings, trigger) {
      if (trigger !== "unload") {
        return
      }

      var configurationForm = once.filter(
        "ckeditor-configuration",
        ".ckeditor-toolbar-configuration",
        context
      )

      if (
        configurationForm.length &&
        Drupal.ckeditor.models &&
        Drupal.ckeditor.models.Model
      ) {
        var config = Drupal.ckeditor.models.Model.toJSON().activeEditorConfig
        var buttons = Drupal.ckeditor.views.controller.getButtonList(config)
        var $activeToolbar = $(".ckeditor-toolbar-configuration").find(
          ".ckeditor-toolbar-active"
        )

        for (var i = 0; i < buttons.length; i++) {
          $activeToolbar.trigger("CKEditorToolbarChanged", [
            "removed",
            buttons[i],
          ])
        }
      }
    },
  }
  Drupal.ckeditor = {
    views: {},
    models: {},
    registerButtonMove: function registerButtonMove(view, $button, callback) {
      var $group = $button.closest(".ckeditor-toolbar-group")

      if ($group.hasClass("placeholder")) {
        if (view.isProcessing) {
          return
        }

        view.isProcessing = true
        Drupal.ckeditor.openGroupNameDialog(view, $group, callback)
      } else {
        view.model.set("isDirty", true)
        callback(true)
      }
    },
    registerGroupMove: function registerGroupMove(view, $group) {
      var $row = $group.closest(".ckeditor-row")

      if ($row.hasClass("placeholder")) {
        $row.removeClass("placeholder")
      }

      $row
        .parent()
        .children()
        .each(function () {
          $row = $(this)

          if (
            $row.find(".ckeditor-toolbar-group").not(".placeholder").length ===
            0
          ) {
            $row.addClass("placeholder")
          }
        })
      view.model.set("isDirty", true)
    },
    openGroupNameDialog: function openGroupNameDialog(view, $group, callback) {
      callback = callback || function () {}

      function validateForm(form) {
        if (form.elements[0].value.length === 0) {
          var $form = $(form)

          if (!$form.hasClass("errors")) {
            $form
              .addClass("errors")
              .find("input")
              .addClass("error")
              .attr("aria-invalid", "true")
            $(
              '<div class="description" >'.concat(
                Drupal.t("Please provide a name for the button group."),
                "</div>"
              )
            ).insertAfter(form.elements[0])
          }

          return true
        }

        return false
      }

      function closeDialog(action, form) {
        function shutdown() {
          dialog.close(action)
          delete view.isProcessing
        }

        function namePlaceholderGroup($group, name) {
          if ($group.hasClass("placeholder")) {
            var groupID = "ckeditor-toolbar-group-aria-label-for-".concat(
              Drupal.checkPlain(name.toLowerCase().replace(/\s/g, "-"))
            )
            $group
              .removeAttr("aria-label")
              .attr("data-drupal-ckeditor-type", "group")
              .attr("tabindex", 0)
              .children(".ckeditor-toolbar-group-name")
              .attr("id", groupID)
              .end()
              .children(".ckeditor-toolbar-group-buttons")
              .attr("aria-labelledby", groupID)
          }

          $group
            .attr("data-drupal-ckeditor-toolbar-group-name", name)
            .children(".ckeditor-toolbar-group-name")
            .text(name)
        }

        if (action === "cancel") {
          shutdown()
          callback(false, $group)
          return
        }

        if (form && validateForm(form)) {
          return
        }

        if (action === "apply") {
          shutdown()
          namePlaceholderGroup(
            $group,
            Drupal.checkPlain(form.elements[0].value)
          )
          $group
            .closest(".ckeditor-row.placeholder")
            .addBack()
            .removeClass("placeholder")
          callback(true, $group)
          view.model.set("isDirty", true)
        }
      }

      var $ckeditorButtonGroupNameForm = $(
        Drupal.theme("ckeditorButtonGroupNameForm")
      )
      var dialog = Drupal.dialog($ckeditorButtonGroupNameForm.get(0), {
        title: Drupal.t("Button group name"),
        dialogClass: "ckeditor-name-toolbar-group",
        resizable: false,
        buttons: [
          {
            text: Drupal.t("Apply"),
            click: function click() {
              closeDialog("apply", this)
            },
            primary: true,
          },
          {
            text: Drupal.t("Cancel"),
            click: function click() {
              closeDialog("cancel")
            },
          },
        ],
        open: function open() {
          var form = this
          var $form = $(this)
          var $widget = $form.parent()
          $widget.find(".ui-dialog-titlebar-close").remove()
          $widget.on("keypress.ckeditor", "input, button", function (event) {
            if (event.keyCode === 13) {
              var $target = $(event.currentTarget)
              var data = $target.data("ui-button")
              var action = "apply"

              if (data && data.options && data.options.label) {
                action = data.options.label.toLowerCase()
              }

              closeDialog(action, form)
              event.stopPropagation()
              event.stopImmediatePropagation()
              event.preventDefault()
            }
          })
          var text = Drupal.t(
            "Editing the name of the new button group in a dialog."
          )

          if (
            typeof $group.attr("data-drupal-ckeditor-toolbar-group-name") !==
            "undefined"
          ) {
            text = Drupal.t(
              'Editing the name of the "@groupName" button group in a dialog.',
              {
                "@groupName": $group.attr(
                  "data-drupal-ckeditor-toolbar-group-name"
                ),
              }
            )
          }

          Drupal.announce(text)
        },
        close: function close(event) {
          $(event.target).remove()
        },
      })
      dialog.showModal()
      $(
        document
          .querySelector(".ckeditor-name-toolbar-group")
          .querySelector("input")
      )
        .attr("value", $group.attr("data-drupal-ckeditor-toolbar-group-name"))
        .trigger("focus")
    },
  }
  Drupal.behaviors.ckeditorAdminButtonPluginSettings = {
    attach: function attach(context) {
      var $context = $(context)
      var ckeditorPluginSettings = once(
        "ckeditor-plugin-settings",
        "#ckeditor-plugin-settings",
        context
      )

      if (ckeditorPluginSettings.length) {
        var $ckeditorPluginSettings = $(ckeditorPluginSettings)
        $ckeditorPluginSettings
          .find("[data-ckeditor-buttons]")
          .each(function () {
            var $this = $(this)

            if ($this.data("verticalTab")) {
              $this.data("verticalTab").tabHide()
            } else {
              $this.hide()
            }

            $this.data("ckeditorButtonPluginSettingsActiveButtons", [])
          })
        $context
          .find(".ckeditor-toolbar-active")
          .off("CKEditorToolbarChanged.ckeditorAdminPluginSettings")
          .on(
            "CKEditorToolbarChanged.ckeditorAdminPluginSettings",
            function (event, action, button) {
              var $pluginSettings = $ckeditorPluginSettings.find(
                "[data-ckeditor-buttons~=".concat(button, "]")
              )

              if ($pluginSettings.length === 0) {
                return
              }

              var verticalTab = $pluginSettings.data("verticalTab")
              var activeButtons = $pluginSettings.data(
                "ckeditorButtonPluginSettingsActiveButtons"
              )

              if (action === "added") {
                activeButtons.push(button)

                if (verticalTab) {
                  verticalTab.tabShow()
                } else {
                  $pluginSettings.show()
                }
              } else {
                activeButtons.splice(activeButtons.indexOf(button), 1)

                if (activeButtons.length === 0) {
                  if (verticalTab) {
                    verticalTab.tabHide()
                  } else {
                    $pluginSettings.hide()
                  }
                }
              }

              $pluginSettings.data(
                "ckeditorButtonPluginSettingsActiveButtons",
                activeButtons
              )
            }
          )
      }
    },
  }

  Drupal.theme.ckeditorRow = function () {
    return '<li class="ckeditor-row placeholder" role="group"><ul class="ckeditor-toolbar-groups clearfix"></ul></li>'
  }

  Drupal.theme.ckeditorToolbarGroup = function () {
    var group = ""
    group +=
      '<li class="ckeditor-toolbar-group placeholder" role="presentation" aria-label="'.concat(
        Drupal.t("Place a button to create a new button group."),
        '">'
      )
    group += '<h3 class="ckeditor-toolbar-group-name">'.concat(
      Drupal.t("New group"),
      "</h3>"
    )
    group +=
      '<ul class="ckeditor-buttons ckeditor-toolbar-group-buttons" role="toolbar" data-drupal-ckeditor-button-sorting="target"></ul>'
    group += "</li>"
    return group
  }

  Drupal.theme.ckeditorButtonGroupNameForm = function () {
    return '<form><input name="group-name" required="required"></form>'
  }

  Drupal.theme.ckeditorButtonGroupNamesToggle = function () {
    return '<button class="link ckeditor-groupnames-toggle" aria-pressed="false"></button>'
  }

  Drupal.theme.ckeditorNewButtonGroup = function () {
    return '<li class="ckeditor-add-new-group"><button aria-label="'
      .concat(
        Drupal.t("Add a CKEditor button group to the end of this row."),
        '">'
      )
      .concat(Drupal.t("Add group"), "</button></li>")
  }
})(jQuery, Drupal, drupalSettings, _)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function (Drupal, Backbone) {
  Drupal.ckeditor.Model = Backbone.Model.extend({
    defaults: {
      activeEditorConfig: null,
      $textarea: null,
      isDirty: false,
      hiddenEditorConfig: null,
      buttonsToFeatures: null,
      featuresMetadata: null,
      groupNamesVisible: false,
    },
    sync: function sync() {
      this.get("$textarea").val(JSON.stringify(this.get("activeEditorConfig")))
    },
  })
})(Drupal, Backbone)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function (Drupal, Backbone, $) {
  Drupal.ckeditor.AuralView = Backbone.View.extend({
    events: {
      "click .ckeditor-buttons a": "announceButtonHelp",
      "click .ckeditor-multiple-buttons a": "announceSeparatorHelp",
      "focus .ckeditor-button a": "onFocus",
      "focus .ckeditor-button-separator a": "onFocus",
      "focus .ckeditor-toolbar-group": "onFocus",
    },
    initialize: function initialize() {
      this.listenTo(this.model, "change:isDirty", this.announceMove)
    },
    announceMove: function announceMove(model, isDirty) {
      if (!isDirty) {
        var item = document.activeElement || null

        if (item) {
          var $item = $(item)

          if ($item.hasClass("ckeditor-toolbar-group")) {
            this.announceButtonGroupPosition($item)
          } else if ($item.parent().hasClass("ckeditor-button")) {
            this.announceButtonPosition($item.parent())
          }
        }
      }
    },
    onFocus: function onFocus(event) {
      event.stopPropagation()
      var $originalTarget = $(event.target)
      var $currentTarget = $(event.currentTarget)
      var $parent = $currentTarget.parent()

      if (
        $parent.hasClass("ckeditor-button") ||
        $parent.hasClass("ckeditor-button-separator")
      ) {
        this.announceButtonPosition($currentTarget.parent())
      } else if (
        $originalTarget.attr("role") !== "button" &&
        $currentTarget.hasClass("ckeditor-toolbar-group")
      ) {
        this.announceButtonGroupPosition($currentTarget)
      }
    },
    announceButtonGroupPosition: function announceButtonGroupPosition($group) {
      var $groups = $group.parent().children()
      var $row = $group.closest(".ckeditor-row")
      var $rows = $row.parent().children()
      var position = $groups.index($group) + 1
      var positionCount = $groups.not(".placeholder").length
      var row = $rows.index($row) + 1
      var rowCount = $rows.not(".placeholder").length
      var text = Drupal.t(
        "@groupName button group in position @position of @positionCount in row @row of @rowCount.",
        {
          "@groupName": $group.attr("data-drupal-ckeditor-toolbar-group-name"),
          "@position": position,
          "@positionCount": positionCount,
          "@row": row,
          "@rowCount": rowCount,
        }
      )

      if (position === 1 && row === rowCount) {
        text += "\n"
        text += Drupal.t("Press the down arrow key to create a new row.")
      }

      Drupal.announce(text, "assertive")
    },
    announceButtonPosition: function announceButtonPosition($button) {
      var $row = $button.closest(".ckeditor-row")
      var $rows = $row.parent().children()
      var $buttons = $button.closest(".ckeditor-buttons").children()
      var $group = $button.closest(".ckeditor-toolbar-group")
      var $groups = $group.parent().children()
      var groupPosition = $groups.index($group) + 1
      var groupPositionCount = $groups.not(".placeholder").length
      var position = $buttons.index($button) + 1
      var positionCount = $buttons.length
      var row = $rows.index($row) + 1
      var rowCount = $rows.not(".placeholder").length
      var type =
        $button.attr("data-drupal-ckeditor-type") === "separator"
          ? ""
          : Drupal.t("button")
      var text

      if ($button.closest(".ckeditor-toolbar-disabled").length > 0) {
        text = Drupal.t("@name @type.", {
          "@name": $button.children().attr("aria-label"),
          "@type": type,
        })
        text += "\n".concat(Drupal.t("Press the down arrow key to activate."))
        Drupal.announce(text, "assertive")
      } else if ($group.not(".placeholder").length === 1) {
        text = Drupal.t(
          "@name @type in position @position of @positionCount in @groupName button group in row @row of @rowCount.",
          {
            "@name": $button.children().attr("aria-label"),
            "@type": type,
            "@position": position,
            "@positionCount": positionCount,
            "@groupName": $group.attr(
              "data-drupal-ckeditor-toolbar-group-name"
            ),
            "@row": row,
            "@rowCount": rowCount,
          }
        )

        if (groupPosition === 1 && position === 1 && row === rowCount) {
          text += "\n"
          text += Drupal.t(
            "Press the down arrow key to create a new button group in a new row."
          )
        }

        if (
          groupPosition === groupPositionCount &&
          position === positionCount
        ) {
          text += "\n"
          text += Drupal.t(
            "This is the last group. Move the button forward to create a new group."
          )
        }

        Drupal.announce(text, "assertive")
      }
    },
    announceButtonHelp: function announceButtonHelp(event) {
      var $link = $(event.currentTarget)
      var $button = $link.parent()
      var enabled = $button.closest(".ckeditor-toolbar-active").length > 0
      var message

      if (enabled) {
        message = Drupal.t('The "@name" button is currently enabled.', {
          "@name": $link.attr("aria-label"),
        })
        message += "\n".concat(
          Drupal.t(
            "Use the keyboard arrow keys to change the position of this button."
          )
        )
        message += "\n".concat(
          Drupal.t(
            "Press the up arrow key on the top row to disable the button."
          )
        )
      } else {
        message = Drupal.t('The "@name" button is currently disabled.', {
          "@name": $link.attr("aria-label"),
        })
        message += "\n".concat(
          Drupal.t(
            "Use the down arrow key to move this button into the active toolbar."
          )
        )
      }

      Drupal.announce(message)
      event.preventDefault()
    },
    announceSeparatorHelp: function announceSeparatorHelp(event) {
      var $link = $(event.currentTarget)
      var $button = $link.parent()
      var enabled = $button.closest(".ckeditor-toolbar-active").length > 0
      var message

      if (enabled) {
        message = Drupal.t("This @name is currently enabled.", {
          "@name": $link.attr("aria-label"),
        })
        message += "\n".concat(
          Drupal.t(
            "Use the keyboard arrow keys to change the position of this separator."
          )
        )
      } else {
        message = Drupal.t(
          "Separators are used to visually split individual buttons."
        )
        message += "\n".concat(
          Drupal.t("This @name is currently disabled.", {
            "@name": $link.attr("aria-label"),
          })
        )
        message += "\n".concat(
          Drupal.t(
            "Use the down arrow key to move this separator into the active toolbar."
          )
        )
        message += "\n".concat(
          Drupal.t("You may add multiple separators to each button group.")
        )
      }

      Drupal.announce(message)
      event.preventDefault()
    },
  })
})(Drupal, Backbone, jQuery)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, Backbone, _) {
  Drupal.ckeditor.KeyboardView = Backbone.View.extend({
    initialize: function initialize() {
      this.$el.on(
        "keydown.ckeditor",
        ".ckeditor-buttons a, .ckeditor-multiple-buttons a",
        this.onPressButton.bind(this)
      )
      this.$el.on(
        "keydown.ckeditor",
        '[data-drupal-ckeditor-type="group"]',
        this.onPressGroup.bind(this)
      )
    },
    render: function render() {},
    onPressButton: function onPressButton(event) {
      var upDownKeys = [38, 63232, 40, 63233]
      var leftRightKeys = [37, 63234, 39, 63235]

      if (event.keyCode === 13) {
        event.stopPropagation()
      }

      if (_.indexOf(_.union(upDownKeys, leftRightKeys), event.keyCode) > -1) {
        var view = this
        var $target = $(event.currentTarget)
        var $button = $target.parent()
        var $container = $button.parent()
        var $group = $button.closest(".ckeditor-toolbar-group")
        var $row
        var containerType = $container.data("drupal-ckeditor-button-sorting")
        var $availableButtons = this.$el.find(
          '[data-drupal-ckeditor-button-sorting="source"]'
        )
        var $activeButtons = this.$el.find(".ckeditor-toolbar-active")
        var $originalGroup = $group
        var dir

        if (containerType === "source") {
          if (_.indexOf([40, 63233], event.keyCode) > -1) {
            $activeButtons
              .find(".ckeditor-toolbar-group-buttons")
              .eq(0)
              .prepend($button)
          }
        } else if (containerType === "target") {
          if (_.indexOf(leftRightKeys, event.keyCode) > -1) {
            var $siblings = $container.children()
            var index = $siblings.index($button)

            if (_.indexOf([37, 63234], event.keyCode) > -1) {
              if (index > 0) {
                $button.insertBefore($container.children().eq(index - 1))
              } else {
                $group = $container.parent().prev()

                if ($group.length > 0) {
                  $group.find(".ckeditor-toolbar-group-buttons").append($button)
                } else {
                  $container
                    .closest(".ckeditor-row")
                    .prev()
                    .find(".ckeditor-toolbar-group")
                    .not(".placeholder")
                    .find(".ckeditor-toolbar-group-buttons")
                    .eq(-1)
                    .append($button)
                }
              }
            } else if (_.indexOf([39, 63235], event.keyCode) > -1) {
              if (index < $siblings.length - 1) {
                $button.insertAfter($container.children().eq(index + 1))
              } else {
                $container
                  .parent()
                  .next()
                  .find(".ckeditor-toolbar-group-buttons")
                  .prepend($button)
              }
            }
          } else if (_.indexOf(upDownKeys, event.keyCode) > -1) {
            dir = _.indexOf([38, 63232], event.keyCode) > -1 ? "prev" : "next"
            $row = $container.closest(".ckeditor-row")[dir]()

            if (dir === "prev" && $row.length === 0) {
              if ($button.data("drupal-ckeditor-type") === "separator") {
                $button.off().remove()
                $activeButtons
                  .find(".ckeditor-toolbar-group-buttons")
                  .eq(0)
                  .children()
                  .eq(0)
                  .children()
                  .trigger("focus")
              } else {
                $availableButtons.prepend($button)
              }
            } else {
              $row
                .find(".ckeditor-toolbar-group-buttons")
                .eq(0)
                .prepend($button)
            }
          }
        } else if (containerType === "dividers") {
          if (_.indexOf([40, 63233], event.keyCode) > -1) {
            $button = $button.clone(true)
            $activeButtons
              .find(".ckeditor-toolbar-group-buttons")
              .eq(0)
              .prepend($button)
            $target = $button.children()
          }
        }

        view = this
        Drupal.ckeditor.registerButtonMove(this, $button, function (result) {
          if (!result && $originalGroup) {
            $originalGroup.find(".ckeditor-buttons").append($button)
          }

          $target.trigger("focus")
        })
        event.preventDefault()
        event.stopPropagation()
      }
    },
    onPressGroup: function onPressGroup(event) {
      var upDownKeys = [38, 63232, 40, 63233]
      var leftRightKeys = [37, 63234, 39, 63235]

      if (event.keyCode === 13) {
        var view = this
        window.setTimeout(function () {
          Drupal.ckeditor.openGroupNameDialog(view, $(event.currentTarget))
        }, 0)
        event.preventDefault()
        event.stopPropagation()
      }

      if (_.indexOf(_.union(upDownKeys, leftRightKeys), event.keyCode) > -1) {
        var $group = $(event.currentTarget)
        var $container = $group.parent()
        var $siblings = $container.children()
        var index
        var dir

        if (_.indexOf(leftRightKeys, event.keyCode) > -1) {
          index = $siblings.index($group)

          if (_.indexOf([37, 63234], event.keyCode) > -1) {
            if (index > 0) {
              $group.insertBefore($siblings.eq(index - 1))
            } else {
              var $rowChildElement = $container
                .closest(".ckeditor-row")
                .prev()
                .find(".ckeditor-toolbar-groups")
                .children()
                .eq(-1)
              $group.insertBefore($rowChildElement)
            }
          } else if (_.indexOf([39, 63235], event.keyCode) > -1) {
            if (!$siblings.eq(index + 1).hasClass("placeholder")) {
              $group.insertAfter($container.children().eq(index + 1))
            } else {
              $container
                .closest(".ckeditor-row")
                .next()
                .find(".ckeditor-toolbar-groups")
                .prepend($group)
            }
          }
        } else if (_.indexOf(upDownKeys, event.keyCode) > -1) {
          dir = _.indexOf([38, 63232], event.keyCode) > -1 ? "prev" : "next"
          $group
            .closest(".ckeditor-row")
            [dir]()
            .find(".ckeditor-toolbar-groups")
            .eq(0)
            .prepend($group)
        }

        Drupal.ckeditor.registerGroupMove(this, $group)
        $group.trigger("focus")
        event.preventDefault()
        event.stopPropagation()
      }
    },
  })
})(jQuery, Drupal, Backbone, _)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, Backbone, CKEDITOR, _) {
  Drupal.ckeditor.ControllerView = Backbone.View.extend({
    events: {},
    initialize: function initialize() {
      this.getCKEditorFeatures(
        this.model.get("hiddenEditorConfig"),
        this.disableFeaturesDisallowedByFilters.bind(this)
      )
      this.model.listenTo(
        this.model,
        "change:activeEditorConfig",
        this.model.sync
      )
      this.listenTo(this.model, "change:isDirty", this.parseEditorDOM)
    },
    parseEditorDOM: function parseEditorDOM(model, isDirty, options) {
      if (isDirty) {
        var currentConfig = this.model.get("activeEditorConfig")
        var rows = []
        this.$el
          .find(".ckeditor-active-toolbar-configuration")
          .children(".ckeditor-row")
          .each(function () {
            var groups = []
            $(this)
              .find(".ckeditor-toolbar-group")
              .each(function () {
                var $group = $(this)
                var $buttons = $group.find(".ckeditor-button")

                if ($buttons.length) {
                  var group = {
                    name: $group.attr(
                      "data-drupal-ckeditor-toolbar-group-name"
                    ),
                    items: [],
                  }
                  $group
                    .find(".ckeditor-button, .ckeditor-multiple-button")
                    .each(function () {
                      group.items.push(
                        $(this).attr("data-drupal-ckeditor-button-name")
                      )
                    })
                  groups.push(group)
                }
              })

            if (groups.length) {
              rows.push(groups)
            }
          })
        this.model.set("activeEditorConfig", rows)
        this.model.set("isDirty", false)

        if (options.broadcast !== false) {
          var prev = this.getButtonList(currentConfig)
          var next = this.getButtonList(rows)

          if (prev.length !== next.length) {
            this.$el
              .find(".ckeditor-toolbar-active")
              .trigger("CKEditorToolbarChanged", [
                prev.length < next.length ? "added" : "removed",
                _.difference(
                  _.union(prev, next),
                  _.intersection(prev, next)
                )[0],
              ])
          }
        }
      }
    },
    getCKEditorFeatures: function getCKEditorFeatures(
      CKEditorConfig,
      callback
    ) {
      var getProperties = function getProperties(CKEPropertiesList) {
        return _.isObject(CKEPropertiesList) ? _.keys(CKEPropertiesList) : []
      }

      var convertCKERulesToEditorFeature =
        function convertCKERulesToEditorFeature(feature, CKEFeatureRules) {
          for (var i = 0; i < CKEFeatureRules.length; i++) {
            var CKERule = CKEFeatureRules[i]
            var rule = new Drupal.EditorFeatureHTMLRule()
            var tags = getProperties(CKERule.elements)
            rule.required.tags = CKERule.propertiesOnly ? [] : tags
            rule.allowed.tags = tags
            rule.required.attributes = getProperties(CKERule.requiredAttributes)
            rule.allowed.attributes = getProperties(CKERule.attributes)
            rule.required.styles = getProperties(CKERule.requiredStyles)
            rule.allowed.styles = getProperties(CKERule.styles)
            rule.required.classes = getProperties(CKERule.requiredClasses)
            rule.allowed.classes = getProperties(CKERule.classes)
            rule.raw = CKERule
            feature.addHTMLRule(rule)
          }
        }

      var hiddenCKEditorID = "ckeditor-hidden"

      if (CKEDITOR.instances[hiddenCKEditorID]) {
        CKEDITOR.instances[hiddenCKEditorID].destroy(true)
      }

      var hiddenEditorConfig = this.model.get("hiddenEditorConfig")

      if (hiddenEditorConfig.drupalExternalPlugins) {
        var externalPlugins = hiddenEditorConfig.drupalExternalPlugins
        Object.keys(externalPlugins || {}).forEach(function (pluginName) {
          CKEDITOR.plugins.addExternal(
            pluginName,
            externalPlugins[pluginName],
            ""
          )
        })
      }

      CKEDITOR.inline($("#".concat(hiddenCKEditorID)).get(0), CKEditorConfig)
      CKEDITOR.once("instanceReady", function (e) {
        if (e.editor.name === hiddenCKEditorID) {
          var CKEFeatureRulesMap = {}
          var rules = e.editor.filter.allowedContent
          var rule
          var name

          for (var i = 0; i < rules.length; i++) {
            rule = rules[i]
            name = rule.featureName || ":("

            if (!CKEFeatureRulesMap[name]) {
              CKEFeatureRulesMap[name] = []
            }

            CKEFeatureRulesMap[name].push(rule)
          }

          var features = {}
          var buttonsToFeatures = {}
          Object.keys(CKEFeatureRulesMap).forEach(function (featureName) {
            var feature = new Drupal.EditorFeature(featureName)
            convertCKERulesToEditorFeature(
              feature,
              CKEFeatureRulesMap[featureName]
            )
            features[featureName] = feature
            var command = e.editor.getCommand(featureName)

            if (command) {
              buttonsToFeatures[command.uiItems[0].name] = featureName
            }
          })
          callback(features, buttonsToFeatures)
        }
      })
    },
    getFeatureForButton: function getFeatureForButton(button) {
      if (button === "-") {
        return false
      }

      var featureName =
        this.model.get("buttonsToFeatures")[button.toLowerCase()]

      if (!featureName) {
        featureName = button.toLowerCase()
      }

      var featuresMetadata = this.model.get("featuresMetadata")

      if (!featuresMetadata[featureName]) {
        featuresMetadata[featureName] = new Drupal.EditorFeature(featureName)
        this.model.set("featuresMetadata", featuresMetadata)
      }

      return featuresMetadata[featureName]
    },
    disableFeaturesDisallowedByFilters:
      function disableFeaturesDisallowedByFilters(features, buttonsToFeatures) {
        this.model.set("featuresMetadata", features)
        this.model.set("buttonsToFeatures", buttonsToFeatures)
        this.broadcastConfigurationChanges(this.$el)
        var existingButtons = []

        var buttonGroups = _.flatten(this.model.get("activeEditorConfig"))

        for (var i = 0; i < buttonGroups.length; i++) {
          var buttons = buttonGroups[i].items

          for (var k = 0; k < buttons.length; k++) {
            existingButtons.push(buttons[k])
          }
        }

        existingButtons = _.unique(existingButtons)

        for (var n = 0; n < existingButtons.length; n++) {
          var button = existingButtons[n]
          var feature = this.getFeatureForButton(button)

          if (feature === false) {
            continue
          }

          if (Drupal.editorConfiguration.featureIsAllowedByFilters(feature)) {
            this.$el
              .find(".ckeditor-toolbar-active")
              .trigger("CKEditorToolbarChanged", ["added", existingButtons[n]])
          } else {
            $(
              '.ckeditor-toolbar-active li[data-drupal-ckeditor-button-name="'.concat(
                button,
                '"]'
              )
            )
              .detach()
              .appendTo(
                ".ckeditor-toolbar-disabled > .ckeditor-toolbar-available > ul"
              )
            this.model.set(
              {
                isDirty: true,
              },
              {
                broadcast: false,
              }
            )
          }
        }
      },
    broadcastConfigurationChanges: function broadcastConfigurationChanges(
      $ckeditorToolbar
    ) {
      var view = this
      var hiddenEditorConfig = this.model.get("hiddenEditorConfig")
      var getFeatureForButton = this.getFeatureForButton.bind(this)
      var getCKEditorFeatures = this.getCKEditorFeatures.bind(this)
      $ckeditorToolbar
        .find(".ckeditor-toolbar-active")
        .on(
          "CKEditorToolbarChanged.ckeditorAdmin",
          function (event, action, button) {
            var feature = getFeatureForButton(button)

            if (feature === false) {
              return
            }

            var configEvent =
              action === "added" ? "addedFeature" : "removedFeature"
            Drupal.editorConfiguration[configEvent](feature)
          }
        )
        .on(
          "CKEditorPluginSettingsChanged.ckeditorAdmin",
          function (event, settingsChanges) {
            Object.keys(settingsChanges || {}).forEach(function (key) {
              hiddenEditorConfig[key] = settingsChanges[key]
            })
            getCKEditorFeatures(hiddenEditorConfig, function (features) {
              var featuresMetadata = view.model.get("featuresMetadata")
              Object.keys(features || {}).forEach(function (name) {
                var feature = features[name]

                if (
                  featuresMetadata.hasOwnProperty(name) &&
                  !_.isEqual(featuresMetadata[name], feature)
                ) {
                  Drupal.editorConfiguration.modifiedFeature(feature)
                }
              })
              view.model.set("featuresMetadata", features)
            })
          }
        )
    },
    getButtonList: function getButtonList(config) {
      var buttons = []
      config = _.flatten(config)
      config.forEach(function (group) {
        group.items.forEach(function (button) {
          buttons.push(button)
        })
      })
      return _.without(buttons, "-")
    },
  })
})(jQuery, Drupal, Backbone, CKEDITOR, _)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function (Drupal, Backbone, $, Sortable) {
  Drupal.ckeditor.VisualView = Backbone.View.extend({
    events: {
      "click .ckeditor-toolbar-group-name": "onGroupNameClick",
      "click .ckeditor-groupnames-toggle": "onGroupNamesToggleClick",
      "click .ckeditor-add-new-group button": "onAddGroupButtonClick",
    },
    initialize: function initialize() {
      this.listenTo(
        this.model,
        "change:isDirty change:groupNamesVisible",
        this.render
      )
      $(Drupal.theme("ckeditorButtonGroupNamesToggle")).prependTo(
        this.$el.find("#ckeditor-active-toolbar").parent()
      )
      this.render()
    },
    render: function render(model, value, changedAttributes) {
      this.insertPlaceholders()
      this.applySorting()
      var groupNamesVisible = this.model.get("groupNamesVisible")

      if (
        changedAttributes &&
        changedAttributes.changes &&
        changedAttributes.changes.isDirty
      ) {
        this.model.set(
          {
            groupNamesVisible: true,
          },
          {
            silent: true,
          }
        )
        groupNamesVisible = true
      }

      this.$el
        .find('[data-toolbar="active"]')
        .toggleClass("ckeditor-group-names-are-visible", groupNamesVisible)
      this.$el
        .find(".ckeditor-groupnames-toggle")
        .text(
          groupNamesVisible
            ? Drupal.t("Hide group names")
            : Drupal.t("Show group names")
        )
        .attr("aria-pressed", groupNamesVisible)
      return this
    },
    onGroupNameClick: function onGroupNameClick(event) {
      var $group = $(event.currentTarget).closest(".ckeditor-toolbar-group")
      Drupal.ckeditor.openGroupNameDialog(this, $group)
      event.stopPropagation()
      event.preventDefault()
    },
    onGroupNamesToggleClick: function onGroupNamesToggleClick(event) {
      this.model.set("groupNamesVisible", !this.model.get("groupNamesVisible"))
      event.preventDefault()
    },
    onAddGroupButtonClick: function onAddGroupButtonClick(event) {
      function insertNewGroup(success, $group) {
        if (success) {
          $group.appendTo(
            $(event.currentTarget)
              .closest(".ckeditor-row")
              .children(".ckeditor-toolbar-groups")
          )
          $group.trigger("focus")
        }
      }

      Drupal.ckeditor.openGroupNameDialog(
        this,
        $(Drupal.theme("ckeditorToolbarGroup")),
        insertNewGroup
      )
      event.preventDefault()
    },
    endGroupDrag: function endGroupDrag(event) {
      var $item = $(event.item)
      Drupal.ckeditor.registerGroupMove(this, $item)
    },
    startButtonDrag: function startButtonDrag(event) {
      this.$el.find("a:focus").trigger("blur")
      this.model.set("groupNamesVisible", true)
    },
    endButtonDrag: function endButtonDrag(event) {
      var $item = $(event.item)
      Drupal.ckeditor.registerButtonMove(this, $item, function (success) {
        $item.find("a").trigger("focus")
      })
    },
    applySorting: function applySorting() {
      var _this = this

      Array.prototype.forEach.call(
        this.el.querySelectorAll(".ckeditor-buttons:not(.js-sortable)"),
        function (buttons) {
          buttons.classList.add("js-sortable")
          Sortable.create(buttons, {
            ghostClass: "ckeditor-button-placeholder",
            group: "ckeditor-buttons",
            onStart: _this.startButtonDrag.bind(_this),
            onEnd: _this.endButtonDrag.bind(_this),
          })
        }
      )
      Array.prototype.forEach.call(
        this.el.querySelectorAll(".ckeditor-toolbar-groups:not(.js-sortable)"),
        function (buttons) {
          buttons.classList.add("js-sortable")
          Sortable.create(buttons, {
            ghostClass: "ckeditor-toolbar-group-placeholder",
            onEnd: _this.endGroupDrag.bind(_this),
          })
        }
      )
      Array.prototype.forEach.call(
        this.el.querySelectorAll(
          ".ckeditor-multiple-buttons:not(.js-sortable)"
        ),
        function (buttons) {
          buttons.classList.add("js-sortable")
          Sortable.create(buttons, {
            group: {
              name: "ckeditor-buttons",
              pull: "clone",
            },
            onEnd: _this.endButtonDrag.bind(_this),
          })
        }
      )
    },
    insertPlaceholders: function insertPlaceholders() {
      this.insertPlaceholderRow()
      this.insertNewGroupButtons()
    },
    insertPlaceholderRow: function insertPlaceholderRow() {
      var $rows = this.$el.find(".ckeditor-row")

      if (!$rows.eq(-1).hasClass("placeholder")) {
        this.$el
          .find(".ckeditor-toolbar-active")
          .children(".ckeditor-active-toolbar-configuration")
          .append(Drupal.theme("ckeditorRow"))
      }

      $rows = this.$el.find(".ckeditor-row")
      var len = $rows.length
      $rows
        .filter(function (index, row) {
          if (index + 1 === len) {
            return false
          }

          return (
            $(row).find(".ckeditor-toolbar-group").not(".placeholder")
              .length === 0
          )
        })
        .remove()
    },
    insertNewGroupButtons: function insertNewGroupButtons() {
      this.$el.find(".ckeditor-row").each(function () {
        var $row = $(this)
        var $groups = $row.find(".ckeditor-toolbar-group")
        var $button = $row.find(".ckeditor-add-new-group")

        if ($button.length === 0) {
          $row
            .children(".ckeditor-toolbar-groups")
            .append(Drupal.theme("ckeditorNewButtonGroup"))
        } else if (!$groups.eq(-1).hasClass("ckeditor-add-new-group")) {
          $button.appendTo($row.children(".ckeditor-toolbar-groups"))
        }
      })
    },
  })
})(Drupal, Backbone, jQuery, Sortable)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, drupalSettings, _) {
  Drupal.behaviors.ckeditorStylesComboSettings = {
    attach: function attach(context) {
      var $context = $(context)
      var $ckeditorActiveToolbar = $context
        .find(".ckeditor-toolbar-configuration")
        .find(".ckeditor-toolbar-active")
      var previousStylesSet =
        drupalSettings.ckeditor.hiddenCKEditorConfig.stylesSet
      var that = this
      $context
        .find('[name="editor[settings][plugins][stylescombo][styles]"]')
        .on("blur.ckeditorStylesComboSettings", function () {
          var styles = $(this).val().trim()

          var stylesSet = that._generateStylesSetSetting(styles)

          if (!_.isEqual(previousStylesSet, stylesSet)) {
            previousStylesSet = stylesSet
            $ckeditorActiveToolbar.trigger("CKEditorPluginSettingsChanged", [
              {
                stylesSet: stylesSet,
              },
            ])
          }
        })
    },
    _generateStylesSetSetting: function _generateStylesSetSetting(styles) {
      var stylesSet = []
      styles = styles.replace(/\r/g, "\n")
      var lines = styles.split("\n")

      for (var i = 0; i < lines.length; i++) {
        var style = lines[i].trim()

        if (style.length === 0) {
          continue
        }

        if (
          style.match(/^ *[a-zA-Z0-9]+ *(\.[a-zA-Z0-9_-]+ *)*\| *.+ *$/) ===
          null
        ) {
          continue
        }

        var parts = style.split("|")
        var selector = parts[0]
        var label = parts[1]
        var classes = selector.split(".")
        var element = classes.shift()
        stylesSet.push({
          attributes: {
            class: classes.join(" "),
          },
          element: element,
          name: label,
        })
      }

      return stylesSet
    },
  }
  Drupal.behaviors.ckeditorStylesComboSettingsSummary = {
    attach: function attach() {
      $('[data-ckeditor-plugin-id="stylescombo"]').drupalSetSummary(function (
        context
      ) {
        var styles = $(
          '[data-drupal-selector="edit-editor-settings-plugins-stylescombo-styles"]'
        )
          .val()
          .trim()

        if (styles.length === 0) {
          return Drupal.t("No styles configured")
        }

        var count = styles.split("\n").length
        return Drupal.t("@count styles configured", {
          "@count": count,
        })
      })
    },
  }
})(jQuery, Drupal, drupalSettings, _)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal) {
  Drupal.behaviors.ckeditorLanguageSettingsSummary = {
    attach: function attach() {
      $("#edit-editor-settings-plugins-language").drupalSetSummary(function (
        context
      ) {
        return $(
          "#edit-editor-settings-plugins-language-language-list-type option:selected"
        ).text()
      })
    },
  }
})(jQuery, Drupal)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.ckeditorDrupalImageSettingsSummary = {
    attach: function attach() {
      $('[data-ckeditor-plugin-id="drupalimage"]').drupalSetSummary(function (
        context
      ) {
        var root =
          'input[name="editor[settings][plugins][drupalimage][image_upload]'
        var $status = $("".concat(root, '[status]"]'))
        var $maxFileSize = $("".concat(root, '[max_size]"]'))
        var $maxWidth = $("".concat(root, '[max_dimensions][width]"]'))
        var $maxHeight = $("".concat(root, '[max_dimensions][height]"]'))
        var $scheme = $("".concat(root, '[scheme]"]:checked'))
        var maxFileSize = $maxFileSize.val()
          ? $maxFileSize.val()
          : $maxFileSize.attr("placeholder")
        var maxDimensions =
          $maxWidth.val() && $maxHeight.val()
            ? "(".concat($maxWidth.val(), "x").concat($maxHeight.val(), ")")
            : ""

        if (!$status.is(":checked")) {
          return Drupal.t("Uploads disabled")
        }

        var output = ""
        output += Drupal.t("Uploads enabled, max size: @size @dimensions", {
          "@size": maxFileSize,
          "@dimensions": maxDimensions,
        })

        if ($scheme.length) {
          output += "<br />".concat($scheme.attr("data-label"))
        }

        return output
      })
    },
  }
})(jQuery, Drupal, drupalSettings)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.machineName = {
    attach: function attach(context, settings) {
      var self = this
      var $context = $(context)
      var timeout = null
      var xhr = null

      function clickEditHandler(e) {
        var data = e.data
        data.$wrapper.removeClass("visually-hidden")
        data.$target.trigger("focus")
        data.$suffix.hide()
        data.$source.off(".machineName")
      }

      function machineNameHandler(e) {
        var data = e.data
        var options = data.options
        var baseValue = $(e.target).val()
        var rx = new RegExp(options.replace_pattern, "g")
        var expected = baseValue
          .toLowerCase()
          .replace(rx, options.replace)
          .substr(0, options.maxlength)

        if (xhr && xhr.readystate !== 4) {
          xhr.abort()
          xhr = null
        }

        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }

        if (baseValue.toLowerCase() !== expected) {
          timeout = setTimeout(function () {
            xhr = self
              .transliterate(baseValue, options)
              .done(function (machine) {
                self.showMachineName(machine.substr(0, options.maxlength), data)
              })
          }, 300)
        } else {
          self.showMachineName(expected, data)
        }
      }

      Object.keys(settings.machineName).forEach(function (sourceId) {
        var options = settings.machineName[sourceId]
        var $source = $(
          once(
            "machine-name",
            $context.find(sourceId).addClass("machine-name-source")
          )
        )
        var $target = $context
          .find(options.target)
          .addClass("machine-name-target")
        var $suffix = $context.find(options.suffix)
        var $wrapper = $target.closest(".js-form-item")

        if (
          !$source.length ||
          !$target.length ||
          !$suffix.length ||
          !$wrapper.length
        ) {
          return
        }

        if ($target.hasClass("error")) {
          return
        }

        options.maxlength = $target.attr("maxlength")
        $wrapper.addClass("visually-hidden")
        var machine = $target.val()
        var $preview = $(
          '<span class="machine-name-value">'
            .concat(options.field_prefix)
            .concat(Drupal.checkPlain(machine))
            .concat(options.field_suffix, "</span>")
        )
        $suffix.empty()

        if (options.label) {
          $suffix.append(
            '<span class="machine-name-label">'.concat(
              options.label,
              ": </span>"
            )
          )
        }

        $suffix.append($preview)

        if ($target.is(":disabled")) {
          return
        }

        var eventData = {
          $source: $source,
          $target: $target,
          $suffix: $suffix,
          $wrapper: $wrapper,
          $preview: $preview,
          options: options,
        }

        if (machine === "" && $source.val() !== "") {
          self
            .transliterate($source.val(), options)
            .done(function (machineName) {
              self.showMachineName(
                machineName.substr(0, options.maxlength),
                eventData
              )
            })
        }

        var $link = $(
          '<span class="admin-link"><button type="button" class="link">'.concat(
            Drupal.t("Edit"),
            "</button></span>"
          )
        ).on("click", eventData, clickEditHandler)
        $suffix.append($link)

        if ($target.val() === "") {
          $source
            .on("formUpdated.machineName", eventData, machineNameHandler)
            .trigger("formUpdated.machineName")
        }

        $target.on("invalid", eventData, clickEditHandler)
      })
    },
    showMachineName: function showMachineName(machine, data) {
      var settings = data.options

      if (machine !== "") {
        if (machine !== settings.replace) {
          data.$target.val(machine)
          data.$preview.html(
            settings.field_prefix +
              Drupal.checkPlain(machine) +
              settings.field_suffix
          )
        }

        data.$suffix.show()
      } else {
        data.$suffix.hide()
        data.$target.val(machine)
        data.$preview.empty()
      }
    },
    transliterate: function transliterate(source, settings) {
      return $.get(Drupal.url("machine_name/transliterate"), {
        text: source,
        langcode: drupalSettings.langcode,
        replace_pattern: settings.replace_pattern,
        replace_token: settings.replace_token,
        replace: settings.replace,
        lowercase: true,
      })
    },
  }
})(jQuery, Drupal, drupalSettings)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, drupalSettings) {
  var activeItem = Drupal.url(drupalSettings.path.currentPath)

  $.fn.drupalToolbarMenu = function () {
    var ui = {
      handleOpen: Drupal.t("Extend"),
      handleClose: Drupal.t("Collapse"),
    }

    function toggleList($item, switcher) {
      var $toggle = $item.children(".toolbar-box").children(".toolbar-handle")
      switcher =
        typeof switcher !== "undefined" ? switcher : !$item.hasClass("open")
      $item.toggleClass("open", switcher)
      $toggle.toggleClass("open", switcher)
      $toggle.find(".action").text(switcher ? ui.handleClose : ui.handleOpen)
    }

    function toggleClickHandler(event) {
      var $toggle = $(event.target)
      var $item = $toggle.closest("li")
      toggleList($item)
      var $openItems = $item.siblings().filter(".open")
      toggleList($openItems, false)
    }

    function linkClickHandler(event) {
      if (!Drupal.toolbar.models.toolbarModel.get("isFixed")) {
        Drupal.toolbar.models.toolbarModel.set("activeTab", null)
      }

      event.stopPropagation()
    }

    function initItems($menu) {
      var options = {
        class: "toolbar-icon toolbar-handle",
        action: ui.handleOpen,
        text: "",
      }
      $menu.find("li > a").wrap('<div class="toolbar-box">')
      $menu.find("li").each(function (index, element) {
        var $item = $(element)

        if ($item.children("ul.toolbar-menu").length) {
          var $box = $item.children(".toolbar-box")
          options.text = Drupal.t("@label", {
            "@label": $box.find("a").text(),
          })
          $item
            .children(".toolbar-box")
            .append(Drupal.theme("toolbarMenuItemToggle", options))
        }
      })
    }

    function markListLevels($lists, level) {
      level = !level ? 1 : level
      var $lis = $lists.children("li").addClass("level-".concat(level))
      $lists = $lis.children("ul")

      if ($lists.length) {
        markListLevels($lists, level + 1)
      }
    }

    function openActiveItem($menu) {
      var pathItem = $menu.find(
        'a[href="'.concat(window.location.pathname, '"]')
      )

      if (pathItem.length && !activeItem) {
        activeItem = window.location.pathname
      }

      if (activeItem) {
        var $activeItem = $menu
          .find('a[href="'.concat(activeItem, '"]'))
          .addClass("menu-item--active")
        var $activeTrail = $activeItem
          .parentsUntil(".root", "li")
          .addClass("menu-item--active-trail")
        toggleList($activeTrail, true)
      }
    }

    return this.each(function (selector) {
      var menu = once("toolbar-menu", this)

      if (menu.length) {
        var $menu = $(menu)
        $menu
          .on("click.toolbar", ".toolbar-box", toggleClickHandler)
          .on("click.toolbar", ".toolbar-box a", linkClickHandler)
        $menu.addClass("root")
        initItems($menu)
        markListLevels($menu)
        openActiveItem($menu)
      }
    })
  }

  Drupal.theme.toolbarMenuItemToggle = function (options) {
    return '<button class="'
      .concat(options.class, '"><span class="action">')
      .concat(options.action, '</span> <span class="label">')
      .concat(options.text, "</span></button>")
  }
})(jQuery, Drupal, drupalSettings)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, drupalSettings) {
  var options = $.extend(
    {
      breakpoints: {
        "toolbar.narrow": "",
        "toolbar.standard": "",
        "toolbar.wide": "",
      },
    },
    drupalSettings.toolbar,
    {
      strings: {
        horizontal: Drupal.t("Horizontal orientation"),
        vertical: Drupal.t("Vertical orientation"),
      },
    }
  )
  Drupal.behaviors.toolbar = {
    attach: function attach(context) {
      if (!window.matchMedia("only screen").matches) {
        return
      }

      once("toolbar", "#toolbar-administration", context).forEach(function (
        toolbar
      ) {
        var model = new Drupal.toolbar.ToolbarModel({
          locked: JSON.parse(
            localStorage.getItem("Drupal.toolbar.trayVerticalLocked")
          ),
          activeTab: document.getElementById(
            JSON.parse(localStorage.getItem("Drupal.toolbar.activeTabID"))
          ),
          height: $("#toolbar-administration").outerHeight(),
        })
        Drupal.toolbar.models.toolbarModel = model
        Object.keys(options.breakpoints).forEach(function (label) {
          var mq = options.breakpoints[label]
          var mql = window.matchMedia(mq)
          Drupal.toolbar.mql[label] = mql
          mql.addListener(
            Drupal.toolbar.mediaQueryChangeHandler.bind(null, model, label)
          )
          Drupal.toolbar.mediaQueryChangeHandler.call(null, model, label, mql)
        })
        Drupal.toolbar.views.toolbarVisualView =
          new Drupal.toolbar.ToolbarVisualView({
            el: toolbar,
            model: model,
            strings: options.strings,
          })
        Drupal.toolbar.views.toolbarAuralView =
          new Drupal.toolbar.ToolbarAuralView({
            el: toolbar,
            model: model,
            strings: options.strings,
          })
        Drupal.toolbar.views.bodyVisualView = new Drupal.toolbar.BodyVisualView(
          {
            el: toolbar,
            model: model,
          }
        )
        model.trigger("change:isFixed", model, model.get("isFixed"))
        model.trigger("change:activeTray", model, model.get("activeTray"))
        var menuModel = new Drupal.toolbar.MenuModel()
        Drupal.toolbar.models.menuModel = menuModel
        Drupal.toolbar.views.menuVisualView = new Drupal.toolbar.MenuVisualView(
          {
            el: $(toolbar).find(".toolbar-menu-administration").get(0),
            model: menuModel,
            strings: options.strings,
          }
        )
        Drupal.toolbar.setSubtrees.done(function (subtrees) {
          menuModel.set("subtrees", subtrees)
          var theme = drupalSettings.ajaxPageState.theme
          localStorage.setItem(
            "Drupal.toolbar.subtrees.".concat(theme),
            JSON.stringify(subtrees)
          )
          model.set("areSubtreesLoaded", true)
        })
        Drupal.toolbar.views.toolbarVisualView.loadSubtrees()
        $(document).on(
          "drupalViewportOffsetChange.toolbar",
          function (event, offsets) {
            model.set("offsets", offsets)
          }
        )
        model
          .on("change:orientation", function (model, orientation) {
            $(document).trigger("drupalToolbarOrientationChange", orientation)
          })
          .on("change:activeTab", function (model, tab) {
            $(document).trigger("drupalToolbarTabChange", tab)
          })
          .on("change:activeTray", function (model, tray) {
            $(document).trigger("drupalToolbarTrayChange", tray)
          })

        if (
          Drupal.toolbar.models.toolbarModel.get("orientation") ===
            "horizontal" &&
          Drupal.toolbar.models.toolbarModel.get("activeTab") === null
        ) {
          Drupal.toolbar.models.toolbarModel.set({
            activeTab: $(
              ".toolbar-bar .toolbar-tab:not(.home-toolbar-tab) a"
            ).get(0),
          })
        }

        $(window).on({
          "dialog:aftercreate": function dialogAftercreate(
            event,
            dialog,
            $element,
            settings
          ) {
            var $toolbar = $("#toolbar-bar")
            $toolbar.css("margin-top", "0")

            if (settings.drupalOffCanvasPosition === "top") {
              var height = Drupal.offCanvas.getContainer($element).outerHeight()
              $toolbar.css("margin-top", "".concat(height, "px"))
              $element.on("dialogContentResize.off-canvas", function () {
                var newHeight = Drupal.offCanvas
                  .getContainer($element)
                  .outerHeight()
                $toolbar.css("margin-top", "".concat(newHeight, "px"))
              })
            }
          },
          "dialog:beforeclose": function dialogBeforeclose() {
            $("#toolbar-bar").css("margin-top", "0")
          },
        })
      })
    },
  }
  Drupal.toolbar = {
    views: {},
    models: {},
    mql: {},
    setSubtrees: new $.Deferred(),
    mediaQueryChangeHandler: function mediaQueryChangeHandler(
      model,
      label,
      mql
    ) {
      switch (label) {
        case "toolbar.narrow":
          model.set({
            isOriented: mql.matches,
            isTrayToggleVisible: false,
          })

          if (!mql.matches || !model.get("orientation")) {
            model.set(
              {
                orientation: "vertical",
              },
              {
                validate: true,
              }
            )
          }

          break

        case "toolbar.standard":
          model.set({
            isFixed: mql.matches,
          })
          break

        case "toolbar.wide":
          model.set(
            {
              orientation:
                mql.matches && !model.get("locked") ? "horizontal" : "vertical",
            },
            {
              validate: true,
            }
          )
          model.set({
            isTrayToggleVisible: mql.matches,
          })
          break

        default:
          break
      }
    },
  }

  Drupal.theme.toolbarOrientationToggle = function () {
    return (
      '<div class="toolbar-toggle-orientation"><div class="toolbar-lining">' +
      '<button class="toolbar-icon" type="button"></button>' +
      "</div></div>"
    )
  }

  Drupal.AjaxCommands.prototype.setToolbarSubtrees = function (
    ajax,
    response,
    status
  ) {
    Drupal.toolbar.setSubtrees.resolve(response.subtrees)
  }
})(jQuery, Drupal, drupalSettings)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function (Backbone, Drupal) {
  Drupal.toolbar.MenuModel = Backbone.Model.extend({
    defaults: {
      subtrees: {},
    },
  })
})(Backbone, Drupal)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function (Backbone, Drupal) {
  Drupal.toolbar.ToolbarModel = Backbone.Model.extend({
    defaults: {
      activeTab: null,
      activeTray: null,
      isOriented: false,
      isFixed: false,
      areSubtreesLoaded: false,
      isViewportOverflowConstrained: false,
      orientation: "horizontal",
      locked: false,
      isTrayToggleVisible: true,
      height: null,
      offsets: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    validate: function validate(attributes, options) {
      if (
        attributes.orientation === "horizontal" &&
        this.get("locked") &&
        !options.override
      ) {
        return Drupal.t(
          "The toolbar cannot be set to a horizontal orientation when it is locked."
        )
      }
    },
  })
})(Backbone, Drupal)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, Backbone) {
  Drupal.toolbar.BodyVisualView = Backbone.View.extend({
    initialize: function initialize() {
      this.listenTo(this.model, "change:activeTray ", this.render)
      this.listenTo(
        this.model,
        "change:isFixed change:isViewportOverflowConstrained",
        this.isToolbarFixed
      )
    },
    isToolbarFixed: function isToolbarFixed() {
      var isViewportOverflowConstrained = this.model.get(
        "isViewportOverflowConstrained"
      )
      $("body").toggleClass(
        "toolbar-fixed",
        isViewportOverflowConstrained || this.model.get("isFixed")
      )
    },
    render: function render() {
      $("body").toggleClass("toolbar-tray-open", !!this.model.get("activeTray"))
    },
  })
})(jQuery, Drupal, Backbone)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Backbone, Drupal) {
  Drupal.toolbar.MenuVisualView = Backbone.View.extend({
    initialize: function initialize() {
      this.listenTo(this.model, "change:subtrees", this.render)
    },
    render: function render() {
      var _this = this

      var subtrees = this.model.get("subtrees")
      Object.keys(subtrees || {}).forEach(function (id) {
        $(
          once("toolbar-subtrees", _this.$el.find("#toolbar-link-".concat(id)))
        ).after(subtrees[id])
      })

      if ("drupalToolbarMenu" in $.fn) {
        this.$el.children(".toolbar-menu").drupalToolbarMenu()
      }
    },
  })
})(jQuery, Backbone, Drupal)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function (Backbone, Drupal) {
  Drupal.toolbar.ToolbarAuralView = Backbone.View.extend({
    initialize: function initialize(options) {
      this.strings = options.strings
      this.listenTo(this.model, "change:orientation", this.onOrientationChange)
      this.listenTo(this.model, "change:activeTray", this.onActiveTrayChange)
    },
    onOrientationChange: function onOrientationChange(model, orientation) {
      Drupal.announce(
        Drupal.t("Tray orientation changed to @orientation.", {
          "@orientation": orientation,
        })
      )
    },
    onActiveTrayChange: function onActiveTrayChange(model, tray) {
      var relevantTray = tray === null ? model.previous("activeTray") : tray

      if (!relevantTray) {
        return
      }

      var action = tray === null ? Drupal.t("closed") : Drupal.t("opened")
      var trayNameElement = relevantTray.querySelector(".toolbar-tray-name")
      var text

      if (trayNameElement !== null) {
        text = Drupal.t('Tray "@tray" @action.', {
          "@tray": trayNameElement.textContent,
          "@action": action,
        })
      } else {
        text = Drupal.t("Tray @action.", {
          "@action": action,
        })
      }

      Drupal.announce(text)
    },
  })
})(Backbone, Drupal)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, drupalSettings, Backbone) {
  Drupal.toolbar.ToolbarVisualView = Backbone.View.extend({
    events: function events() {
      var touchEndToClick = function touchEndToClick(event) {
        event.preventDefault()
        event.target.click()
      }

      return {
        "click .toolbar-bar .toolbar-tab .trigger": "onTabClick",
        "click .toolbar-toggle-orientation button": "onOrientationToggleClick",
        "touchend .toolbar-bar .toolbar-tab .trigger": touchEndToClick,
        "touchend .toolbar-toggle-orientation button": touchEndToClick,
      }
    },
    initialize: function initialize(options) {
      this.strings = options.strings
      this.listenTo(
        this.model,
        "change:activeTab change:orientation change:isOriented change:isTrayToggleVisible",
        this.render
      )
      this.listenTo(this.model, "change:mqMatches", this.onMediaQueryChange)
      this.listenTo(this.model, "change:offsets", this.adjustPlacement)
      this.listenTo(
        this.model,
        "change:activeTab change:orientation change:isOriented",
        this.updateToolbarHeight
      )
      this.$el
        .find(".toolbar-tray .toolbar-lining")
        .append(Drupal.theme("toolbarOrientationToggle"))
      this.model.trigger("change:activeTab")
    },
    updateToolbarHeight: function updateToolbarHeight() {
      var toolbarTabOuterHeight =
        $("#toolbar-bar").find(".toolbar-tab").outerHeight() || 0
      var toolbarTrayHorizontalOuterHeight =
        $(".is-active.toolbar-tray-horizontal").outerHeight() || 0
      this.model.set(
        "height",
        toolbarTabOuterHeight + toolbarTrayHorizontalOuterHeight
      )
      $("body").css({
        "padding-top": this.model.get("height"),
      })
      $("html").css({
        "scroll-padding-top": this.model.get("height"),
      })
      this.triggerDisplace()
    },
    triggerDisplace: function triggerDisplace() {
      _.defer(function () {
        Drupal.displace(true)
      })
    },
    render: function render() {
      this.updateTabs()
      this.updateTrayOrientation()
      this.updateBarAttributes()
      $("body").removeClass("toolbar-loading")

      if (
        this.model.changed.orientation === "vertical" ||
        this.model.changed.activeTab
      ) {
        this.loadSubtrees()
      }

      return this
    },
    onTabClick: function onTabClick(event) {
      if (event.currentTarget.hasAttribute("data-toolbar-tray")) {
        var activeTab = this.model.get("activeTab")
        var clickedTab = event.currentTarget
        this.model.set(
          "activeTab",
          !activeTab || clickedTab !== activeTab ? clickedTab : null
        )
        event.preventDefault()
        event.stopPropagation()
      }
    },
    onOrientationToggleClick: function onOrientationToggleClick(event) {
      var orientation = this.model.get("orientation")
      var antiOrientation =
        orientation === "vertical" ? "horizontal" : "vertical"
      var locked = antiOrientation === "vertical"

      if (locked) {
        localStorage.setItem("Drupal.toolbar.trayVerticalLocked", "true")
      } else {
        localStorage.removeItem("Drupal.toolbar.trayVerticalLocked")
      }

      this.model.set(
        {
          locked: locked,
          orientation: antiOrientation,
        },
        {
          validate: true,
          override: true,
        }
      )
      event.preventDefault()
      event.stopPropagation()
    },
    updateTabs: function updateTabs() {
      var $tab = $(this.model.get("activeTab"))
      $(this.model.previous("activeTab"))
        .removeClass("is-active")
        .prop("aria-pressed", false)
      $(this.model.previous("activeTray")).removeClass("is-active")

      if ($tab.length > 0) {
        $tab.addClass("is-active").prop("aria-pressed", true)
        var name = $tab.attr("data-toolbar-tray")
        var id = $tab.get(0).id

        if (id) {
          localStorage.setItem("Drupal.toolbar.activeTabID", JSON.stringify(id))
        }

        var $tray = this.$el.find(
          '[data-toolbar-tray="'.concat(name, '"].toolbar-tray')
        )

        if ($tray.length) {
          $tray.addClass("is-active")
          this.model.set("activeTray", $tray.get(0))
        } else {
          this.model.set("activeTray", null)
        }
      } else {
        this.model.set("activeTray", null)
        localStorage.removeItem("Drupal.toolbar.activeTabID")
      }
    },
    updateBarAttributes: function updateBarAttributes() {
      var isOriented = this.model.get("isOriented")

      if (isOriented) {
        this.$el.find(".toolbar-bar").attr("data-offset-top", "")
      } else {
        this.$el.find(".toolbar-bar").removeAttr("data-offset-top")
      }

      this.$el.toggleClass("toolbar-oriented", isOriented)
    },
    updateTrayOrientation: function updateTrayOrientation() {
      var orientation = this.model.get("orientation")
      var antiOrientation =
        orientation === "vertical" ? "horizontal" : "vertical"
      $("body")
        .toggleClass("toolbar-vertical", orientation === "vertical")
        .toggleClass("toolbar-horizontal", orientation === "horizontal")
      var removeClass =
        antiOrientation === "horizontal"
          ? "toolbar-tray-horizontal"
          : "toolbar-tray-vertical"
      var $trays = this.$el
        .find(".toolbar-tray")
        .removeClass(removeClass)
        .addClass("toolbar-tray-".concat(orientation))
      var iconClass = "toolbar-icon-toggle-".concat(orientation)
      var iconAntiClass = "toolbar-icon-toggle-".concat(antiOrientation)
      var $orientationToggle = this.$el
        .find(".toolbar-toggle-orientation")
        .toggle(this.model.get("isTrayToggleVisible"))
      $orientationToggle
        .find("button")
        .val(antiOrientation)
        .attr("title", this.strings[antiOrientation])
        .text(this.strings[antiOrientation])
        .removeClass(iconClass)
        .addClass(iconAntiClass)
      var dir = document.documentElement.dir
      var edge = dir === "rtl" ? "right" : "left"
      $trays.removeAttr("data-offset-left data-offset-right data-offset-top")
      $trays
        .filter(".toolbar-tray-vertical.is-active")
        .attr("data-offset-".concat(edge), "")
      $trays
        .filter(".toolbar-tray-horizontal.is-active")
        .attr("data-offset-top", "")
    },
    adjustPlacement: function adjustPlacement() {
      var $trays = this.$el.find(".toolbar-tray")

      if (!this.model.get("isOriented")) {
        $trays
          .removeClass("toolbar-tray-horizontal")
          .addClass("toolbar-tray-vertical")
      }
    },
    loadSubtrees: function loadSubtrees() {
      var $activeTab = $(this.model.get("activeTab"))
      var orientation = this.model.get("orientation")

      if (
        !this.model.get("areSubtreesLoaded") &&
        typeof $activeTab.data("drupal-subtrees") !== "undefined" &&
        orientation === "vertical"
      ) {
        var subtreesHash = drupalSettings.toolbar.subtreesHash
        var theme = drupalSettings.ajaxPageState.theme
        var endpoint = Drupal.url("toolbar/subtrees/".concat(subtreesHash))
        var cachedSubtreesHash = localStorage.getItem(
          "Drupal.toolbar.subtreesHash.".concat(theme)
        )
        var cachedSubtrees = JSON.parse(
          localStorage.getItem("Drupal.toolbar.subtrees.".concat(theme))
        )
        var isVertical = this.model.get("orientation") === "vertical"

        if (
          isVertical &&
          subtreesHash === cachedSubtreesHash &&
          cachedSubtrees
        ) {
          Drupal.toolbar.setSubtrees.resolve(cachedSubtrees)
        } else if (isVertical) {
          localStorage.removeItem("Drupal.toolbar.subtreesHash.".concat(theme))
          localStorage.removeItem("Drupal.toolbar.subtrees.".concat(theme))
          Drupal.ajax({
            url: endpoint,
          }).execute()
          localStorage.setItem(
            "Drupal.toolbar.subtreesHash.".concat(theme),
            subtreesHash
          )
        }
      }
    },
  })
})(jQuery, Drupal, drupalSettings, Backbone)
/*! shepherd.js 8.3.1 */

;("use strict")
;(function (G, ca) {
  "object" === typeof exports && "undefined" !== typeof module
    ? (module.exports = ca())
    : "function" === typeof define && define.amd
    ? define(ca)
    : ((G = "undefined" !== typeof globalThis ? globalThis : G || self),
      (G.Shepherd = ca()))
})(this, function () {
  function G(a, b) {
    return !1 !== b.clone && b.isMergeableObject(a)
      ? V(Array.isArray(a) ? [] : {}, a, b)
      : a
  }
  function ca(a, b, c) {
    return a.concat(b).map(function (a) {
      return G(a, c)
    })
  }
  function tb(a) {
    return Object.getOwnPropertySymbols
      ? Object.getOwnPropertySymbols(a).filter(function (b) {
          return a.propertyIsEnumerable(b)
        })
      : []
  }
  function Ia(a) {
    return Object.keys(a).concat(tb(a))
  }
  function Ja(a, b) {
    try {
      return b in a
    } catch (c) {
      return !1
    }
  }
  function ub(a, b, c) {
    var d = {}
    c.isMergeableObject(a) &&
      Ia(a).forEach(function (b) {
        d[b] = G(a[b], c)
      })
    Ia(b).forEach(function (e) {
      if (
        !Ja(a, e) ||
        (Object.hasOwnProperty.call(a, e) &&
          Object.propertyIsEnumerable.call(a, e))
      )
        if (Ja(a, e) && c.isMergeableObject(b[e])) {
          if (c.customMerge) {
            var f = c.customMerge(e)
            f = "function" === typeof f ? f : V
          } else f = V
          d[e] = f(a[e], b[e], c)
        } else d[e] = G(b[e], c)
    })
    return d
  }
  function V(a, b, c) {
    c = c || {}
    c.arrayMerge = c.arrayMerge || ca
    c.isMergeableObject = c.isMergeableObject || vb
    c.cloneUnlessOtherwiseSpecified = G
    var d = Array.isArray(b),
      e = Array.isArray(a)
    return d !== e ? G(b, c) : d ? c.arrayMerge(a, b, c) : ub(a, b, c)
  }
  function W(a) {
    return "function" === typeof a
  }
  function da(a) {
    return "string" === typeof a
  }
  function Ka(a) {
    let b = Object.getOwnPropertyNames(a.constructor.prototype)
    for (let c = 0; c < b.length; c++) {
      let d = b[c],
        e = a[d]
      "constructor" !== d && "function" === typeof e && (a[d] = e.bind(a))
    }
    return a
  }
  function wb(a, b) {
    return (c) => {
      if (b.isOpen()) {
        let d = b.el && c.currentTarget === b.el
        ;((void 0 !== a && c.currentTarget.matches(a)) || d) && b.tour.next()
      }
    }
  }
  function xb(a) {
    let { event: b, selector: c } = a.options.advanceOn || {}
    if (b) {
      let d = wb(c, a),
        e
      try {
        e = document.querySelector(c)
      } catch (f) {}
      if (void 0 === c || e)
        e
          ? (e.addEventListener(b, d),
            a.on("destroy", () => e.removeEventListener(b, d)))
          : (document.body.addEventListener(b, d, !0),
            a.on("destroy", () => document.body.removeEventListener(b, d, !0)))
      else
        return console.error(
          `No element was found for the selector supplied to advanceOn: ${c}`
        )
    } else return console.error("advanceOn was defined, but no event name was passed.")
  }
  function B(a) {
    return a ? (a.nodeName || "").toLowerCase() : null
  }
  function z(a) {
    return null == a
      ? window
      : "[object Window]" !== a.toString()
      ? (a = a.ownerDocument)
        ? a.defaultView || window
        : window
      : a
  }
  function ea(a) {
    var b = z(a).Element
    return a instanceof b || a instanceof Element
  }
  function y(a) {
    var b = z(a).HTMLElement
    return a instanceof b || a instanceof HTMLElement
  }
  function La(a) {
    if ("undefined" === typeof ShadowRoot) return !1
    var b = z(a).ShadowRoot
    return a instanceof b || a instanceof ShadowRoot
  }
  function F(a) {
    return a.split("-")[0]
  }
  function X(a) {
    a = a.getBoundingClientRect()
    return {
      width: a.width,
      height: a.height,
      top: a.top,
      right: a.right,
      bottom: a.bottom,
      left: a.left,
      x: a.left,
      y: a.top,
    }
  }
  function ta(a) {
    var b = X(a),
      c = a.offsetWidth,
      d = a.offsetHeight
    1 >= Math.abs(b.width - c) && (c = b.width)
    1 >= Math.abs(b.height - d) && (d = b.height)
    return { x: a.offsetLeft, y: a.offsetTop, width: c, height: d }
  }
  function Ma(a, b) {
    var c = b.getRootNode && b.getRootNode()
    if (a.contains(b)) return !0
    if (c && La(c)) {
      do {
        if (b && a.isSameNode(b)) return !0
        b = b.parentNode || b.host
      } while (b)
    }
    return !1
  }
  function H(a) {
    return z(a).getComputedStyle(a)
  }
  function L(a) {
    return (
      (ea(a) ? a.ownerDocument : a.document) || window.document
    ).documentElement
  }
  function la(a) {
    return "html" === B(a)
      ? a
      : a.assignedSlot || a.parentNode || (La(a) ? a.host : null) || L(a)
  }
  function Na(a) {
    return y(a) && "fixed" !== H(a).position ? a.offsetParent : null
  }
  function fa(a) {
    for (
      var b = z(a), c = Na(a);
      c &&
      0 <= ["table", "td", "th"].indexOf(B(c)) &&
      "static" === H(c).position;

    )
      c = Na(c)
    if (
      c &&
      ("html" === B(c) || ("body" === B(c) && "static" === H(c).position))
    )
      return b
    if (!c)
      a: {
        c = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox")
        if (
          -1 === navigator.userAgent.indexOf("Trident") ||
          !y(a) ||
          "fixed" !== H(a).position
        )
          for (a = la(a); y(a) && 0 > ["html", "body"].indexOf(B(a)); ) {
            var d = H(a)
            if (
              "none" !== d.transform ||
              "none" !== d.perspective ||
              "paint" === d.contain ||
              -1 !== ["transform", "perspective"].indexOf(d.willChange) ||
              (c && "filter" === d.willChange) ||
              (c && d.filter && "none" !== d.filter)
            ) {
              c = a
              break a
            } else a = a.parentNode
          }
        c = null
      }
    return c || b
  }
  function ua(a) {
    return 0 <= ["top", "bottom"].indexOf(a) ? "x" : "y"
  }
  function Oa(a) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, a)
  }
  function Pa(a, b) {
    return b.reduce(function (b, d) {
      b[d] = a
      return b
    }, {})
  }
  function Qa(a) {
    var b,
      c = a.popper,
      d = a.popperRect,
      e = a.placement,
      f = a.offsets,
      h = a.position,
      k = a.gpuAcceleration,
      m = a.adaptive
    a = a.roundOffsets
    if (!0 === a) {
      a = f.y
      var g = window.devicePixelRatio || 1
      a = { x: ma(ma(f.x * g) / g) || 0, y: ma(ma(a * g) / g) || 0 }
    } else a = "function" === typeof a ? a(f) : f
    g = a
    a = g.x
    a = void 0 === a ? 0 : a
    g = g.y
    g = void 0 === g ? 0 : g
    var l = f.hasOwnProperty("x")
    f = f.hasOwnProperty("y")
    var p = "left",
      t = "top",
      A = window
    if (m) {
      var C = fa(c),
        u = "clientHeight",
        D = "clientWidth"
      C === z(c) &&
        ((C = L(c)),
        "static" !== H(C).position &&
          ((u = "scrollHeight"), (D = "scrollWidth")))
      "top" === e && ((t = "bottom"), (g -= C[u] - d.height), (g *= k ? 1 : -1))
      "left" === e && ((p = "right"), (a -= C[D] - d.width), (a *= k ? 1 : -1))
    }
    c = Object.assign({ position: h }, m && yb)
    if (k) {
      var v
      return Object.assign(
        {},
        c,
        ((v = {}),
        (v[t] = f ? "0" : ""),
        (v[p] = l ? "0" : ""),
        (v.transform =
          2 > (A.devicePixelRatio || 1)
            ? "translate(" + a + "px, " + g + "px)"
            : "translate3d(" + a + "px, " + g + "px, 0)"),
        v)
      )
    }
    return Object.assign(
      {},
      c,
      ((b = {}),
      (b[t] = f ? g + "px" : ""),
      (b[p] = l ? a + "px" : ""),
      (b.transform = ""),
      b)
    )
  }
  function na(a) {
    return a.replace(/left|right|bottom|top/g, function (a) {
      return zb[a]
    })
  }
  function Ra(a) {
    return a.replace(/start|end/g, function (a) {
      return Ab[a]
    })
  }
  function va(a) {
    a = z(a)
    return { scrollLeft: a.pageXOffset, scrollTop: a.pageYOffset }
  }
  function wa(a) {
    return X(L(a)).left + va(a).scrollLeft
  }
  function xa(a) {
    a = H(a)
    return /auto|scroll|overlay|hidden/.test(
      a.overflow + a.overflowY + a.overflowX
    )
  }
  function Sa(a) {
    return 0 <= ["html", "body", "#document"].indexOf(B(a))
      ? a.ownerDocument.body
      : y(a) && xa(a)
      ? a
      : Sa(la(a))
  }
  function ha(a, b) {
    var c
    void 0 === b && (b = [])
    var d = Sa(a)
    a = d === (null == (c = a.ownerDocument) ? void 0 : c.body)
    c = z(d)
    d = a ? [c].concat(c.visualViewport || [], xa(d) ? d : []) : d
    b = b.concat(d)
    return a ? b : b.concat(ha(la(d)))
  }
  function ya(a) {
    return Object.assign({}, a, {
      left: a.x,
      top: a.y,
      right: a.x + a.width,
      bottom: a.y + a.height,
    })
  }
  function Ta(a, b) {
    if ("viewport" === b) {
      b = z(a)
      var c = L(a)
      b = b.visualViewport
      var d = c.clientWidth
      c = c.clientHeight
      var e = 0,
        f = 0
      b &&
        ((d = b.width),
        (c = b.height),
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ||
          ((e = b.offsetLeft), (f = b.offsetTop)))
      a = { width: d, height: c, x: e + wa(a), y: f }
      a = ya(a)
    } else y(b) ? ((a = X(b)), (a.top += b.clientTop), (a.left += b.clientLeft), (a.bottom = a.top + b.clientHeight), (a.right = a.left + b.clientWidth), (a.width = b.clientWidth), (a.height = b.clientHeight), (a.x = a.left), (a.y = a.top)) : ((f = L(a)), (a = L(f)), (d = va(f)), (b = null == (c = f.ownerDocument) ? void 0 : c.body), (c = E(a.scrollWidth, a.clientWidth, b ? b.scrollWidth : 0, b ? b.clientWidth : 0)), (e = E(a.scrollHeight, a.clientHeight, b ? b.scrollHeight : 0, b ? b.clientHeight : 0)), (f = -d.scrollLeft + wa(f)), (d = -d.scrollTop), "rtl" === H(b || a).direction && (f += E(a.clientWidth, b ? b.clientWidth : 0) - c), (a = ya({ width: c, height: e, x: f, y: d })))
    return a
  }
  function Bb(a) {
    var b = ha(la(a)),
      c = 0 <= ["absolute", "fixed"].indexOf(H(a).position) && y(a) ? fa(a) : a
    return ea(c)
      ? b.filter(function (a) {
          return ea(a) && Ma(a, c) && "body" !== B(a)
        })
      : []
  }
  function Cb(a, b, c) {
    b = "clippingParents" === b ? Bb(a) : [].concat(b)
    c = [].concat(b, [c])
    c = c.reduce(function (b, c) {
      c = Ta(a, c)
      b.top = E(c.top, b.top)
      b.right = M(c.right, b.right)
      b.bottom = M(c.bottom, b.bottom)
      b.left = E(c.left, b.left)
      return b
    }, Ta(a, c[0]))
    c.width = c.right - c.left
    c.height = c.bottom - c.top
    c.x = c.left
    c.y = c.top
    return c
  }
  function Ua(a) {
    var b = a.reference,
      c = a.element,
      d = (a = a.placement) ? F(a) : null
    a = a ? a.split("-")[1] : null
    var e = b.x + b.width / 2 - c.width / 2,
      f = b.y + b.height / 2 - c.height / 2
    switch (d) {
      case "top":
        e = { x: e, y: b.y - c.height }
        break
      case "bottom":
        e = { x: e, y: b.y + b.height }
        break
      case "right":
        e = { x: b.x + b.width, y: f }
        break
      case "left":
        e = { x: b.x - c.width, y: f }
        break
      default:
        e = { x: b.x, y: b.y }
    }
    d = d ? ua(d) : null
    if (null != d)
      switch (((f = "y" === d ? "height" : "width"), a)) {
        case "start":
          e[d] -= b[f] / 2 - c[f] / 2
          break
        case "end":
          e[d] += b[f] / 2 - c[f] / 2
      }
    return e
  }
  function ia(a, b) {
    void 0 === b && (b = {})
    var c = b
    b = c.placement
    b = void 0 === b ? a.placement : b
    var d = c.boundary,
      e = void 0 === d ? "clippingParents" : d
    d = c.rootBoundary
    var f = void 0 === d ? "viewport" : d
    d = c.elementContext
    d = void 0 === d ? "popper" : d
    var h = c.altBoundary,
      k = void 0 === h ? !1 : h
    c = c.padding
    c = void 0 === c ? 0 : c
    c = Oa("number" !== typeof c ? c : Pa(c, ja))
    var m = a.elements.reference
    h = a.rects.popper
    k = a.elements[k ? ("popper" === d ? "reference" : "popper") : d]
    e = Cb(ea(k) ? k : k.contextElement || L(a.elements.popper), e, f)
    f = X(m)
    k = Ua({ reference: f, element: h, strategy: "absolute", placement: b })
    h = ya(Object.assign({}, h, k))
    f = "popper" === d ? h : f
    var g = {
      top: e.top - f.top + c.top,
      bottom: f.bottom - e.bottom + c.bottom,
      left: e.left - f.left + c.left,
      right: f.right - e.right + c.right,
    }
    a = a.modifiersData.offset
    if ("popper" === d && a) {
      var l = a[b]
      Object.keys(g).forEach(function (a) {
        var b = 0 <= ["right", "bottom"].indexOf(a) ? 1 : -1,
          c = 0 <= ["top", "bottom"].indexOf(a) ? "y" : "x"
        g[a] += l[c] * b
      })
    }
    return g
  }
  function Db(a, b) {
    void 0 === b && (b = {})
    var c = b.boundary,
      d = b.rootBoundary,
      e = b.padding,
      f = b.flipVariations,
      h = b.allowedAutoPlacements,
      k = void 0 === h ? Va : h,
      m = b.placement.split("-")[1]
    b = m
      ? f
        ? Wa
        : Wa.filter(function (a) {
            return a.split("-")[1] === m
          })
      : ja
    f = b.filter(function (a) {
      return 0 <= k.indexOf(a)
    })
    0 === f.length && (f = b)
    var g = f.reduce(function (b, f) {
      b[f] = ia(a, { placement: f, boundary: c, rootBoundary: d, padding: e })[
        F(f)
      ]
      return b
    }, {})
    return Object.keys(g).sort(function (a, b) {
      return g[a] - g[b]
    })
  }
  function Eb(a) {
    if ("auto" === F(a)) return []
    var b = na(a)
    return [Ra(a), b, Ra(b)]
  }
  function Xa(a, b, c) {
    void 0 === c && (c = { x: 0, y: 0 })
    return {
      top: a.top - b.height - c.y,
      right: a.right - b.width + c.x,
      bottom: a.bottom - b.height + c.y,
      left: a.left - b.width - c.x,
    }
  }
  function Ya(a) {
    return ["top", "right", "bottom", "left"].some(function (b) {
      return 0 <= a[b]
    })
  }
  function Fb(a, b, c) {
    void 0 === c && (c = !1)
    var d = L(b)
    a = X(a)
    var e = y(b),
      f = { scrollLeft: 0, scrollTop: 0 },
      h = { x: 0, y: 0 }
    if (e || (!e && !c)) {
      if ("body" !== B(b) || xa(d))
        f =
          b !== z(b) && y(b)
            ? { scrollLeft: b.scrollLeft, scrollTop: b.scrollTop }
            : va(b)
      y(b)
        ? ((h = X(b)), (h.x += b.clientLeft), (h.y += b.clientTop))
        : d && (h.x = wa(d))
    }
    return {
      x: a.left + f.scrollLeft - h.x,
      y: a.top + f.scrollTop - h.y,
      width: a.width,
      height: a.height,
    }
  }
  function Gb(a) {
    function b(a) {
      d.add(a.name)
      ;[]
        .concat(a.requires || [], a.requiresIfExists || [])
        .forEach(function (a) {
          d.has(a) || ((a = c.get(a)) && b(a))
        })
      e.push(a)
    }
    var c = new Map(),
      d = new Set(),
      e = []
    a.forEach(function (a) {
      c.set(a.name, a)
    })
    a.forEach(function (a) {
      d.has(a.name) || b(a)
    })
    return e
  }
  function Hb(a) {
    var b = Gb(a)
    return Ib.reduce(function (a, d) {
      return a.concat(
        b.filter(function (a) {
          return a.phase === d
        })
      )
    }, [])
  }
  function Jb(a) {
    var b
    return function () {
      b ||
        (b = new Promise(function (c) {
          Promise.resolve().then(function () {
            b = void 0
            c(a())
          })
        }))
      return b
    }
  }
  function Kb(a) {
    var b = a.reduce(function (a, b) {
      var c = a[b.name]
      a[b.name] = c
        ? Object.assign({}, c, b, {
            options: Object.assign({}, c.options, b.options),
            data: Object.assign({}, c.data, b.data),
          })
        : b
      return a
    }, {})
    return Object.keys(b).map(function (a) {
      return b[a]
    })
  }
  function Za() {
    for (var a = arguments.length, b = Array(a), c = 0; c < a; c++)
      b[c] = arguments[c]
    return !b.some(function (a) {
      return !(a && "function" === typeof a.getBoundingClientRect)
    })
  }
  function za() {
    za =
      Object.assign ||
      function (a) {
        for (var b = 1; b < arguments.length; b++) {
          var c = arguments[b],
            d
          for (d in c)
            Object.prototype.hasOwnProperty.call(c, d) && (a[d] = c[d])
        }
        return a
      }
    return za.apply(this, arguments)
  }
  function Lb() {
    return [
      {
        name: "applyStyles",
        fn({ state: a }) {
          Object.keys(a.elements).forEach((b) => {
            if ("popper" === b) {
              var c = a.attributes[b] || {},
                d = a.elements[b]
              Object.assign(d.style, {
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              })
              Object.keys(c).forEach((a) => {
                let b = c[a]
                !1 === b
                  ? d.removeAttribute(a)
                  : d.setAttribute(a, !0 === b ? "" : b)
              })
            }
          })
        },
      },
      { name: "computeStyles", options: { adaptive: !1 } },
    ]
  }
  function Mb(a) {
    let b = Lb(),
      c = {
        placement: "top",
        strategy: "fixed",
        modifiers: [
          {
            name: "focusAfterRender",
            enabled: !0,
            phase: "afterWrite",
            fn() {
              setTimeout(() => {
                a.el && a.el.focus()
              }, 300)
            },
          },
        ],
      }
    return (c = za({}, c, {
      modifiers: Array.from(new Set([...c.modifiers, ...b])),
    }))
  }
  function $a(a) {
    return da(a) && "" !== a
      ? "-" !== a.charAt(a.length - 1)
        ? `${a}-`
        : a
      : ""
  }
  function Aa(a) {
    a = a.options.attachTo || {}
    let b = Object.assign({}, a)
    if (da(a.element)) {
      try {
        b.element = document.querySelector(a.element)
      } catch (c) {}
      b.element ||
        console.error(
          `The element for this Shepherd step was not found ${a.element}`
        )
    }
    return b
  }
  function Ba() {
    let a = Date.now()
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (b) => {
      let c = (a + 16 * Math.random()) % 16 | 0
      a = Math.floor(a / 16)
      return ("x" == b ? c : (c & 3) | 8).toString(16)
    })
  }
  function Nb(a, b) {
    let c = {
      modifiers: [
        { name: "preventOverflow", options: { altAxis: !0, tether: !1 } },
        {
          name: "focusAfterRender",
          enabled: !0,
          phase: "afterWrite",
          fn() {
            setTimeout(() => {
              b.el && b.el.focus()
            }, 300)
          },
        },
      ],
      strategy: "absolute",
    }
    b.isCentered() ? (c = Mb(b)) : (c.placement = a.on)
    ;(a = b.tour && b.tour.options && b.tour.options.defaultStepOptions) &&
      (c = ab(a, c))
    return (c = ab(b.options, c))
  }
  function ab(a, b) {
    if (a.popperOptions) {
      let c = Object.assign({}, b, a.popperOptions)
      if (a.popperOptions.modifiers && 0 < a.popperOptions.modifiers.length) {
        let d = a.popperOptions.modifiers.map((a) => a.name)
        b = b.modifiers.filter((a) => !d.includes(a.name))
        c.modifiers = Array.from(new Set([...b, ...a.popperOptions.modifiers]))
      }
      return c
    }
    return b
  }
  function x() {}
  function Ob(a, b) {
    for (let c in b) a[c] = b[c]
    return a
  }
  function Y(a) {
    return a()
  }
  function bb(a) {
    return "function" === typeof a
  }
  function I(a, b) {
    return a != a
      ? b == b
      : a !== b || (a && "object" === typeof a) || "function" === typeof a
  }
  function w(a) {
    a.parentNode.removeChild(a)
  }
  function cb(a) {
    return document.createElementNS("http://www.w3.org/2000/svg", a)
  }
  function oa(a, b, c, d) {
    a.addEventListener(b, c, d)
    return () => a.removeEventListener(b, c, d)
  }
  function q(a, b, c) {
    null == c
      ? a.removeAttribute(b)
      : a.getAttribute(b) !== c && a.setAttribute(b, c)
  }
  function db(a, b) {
    let c = Object.getOwnPropertyDescriptors(a.__proto__)
    for (let d in b)
      null == b[d]
        ? a.removeAttribute(d)
        : "style" === d
        ? (a.style.cssText = b[d])
        : "__value" === d
        ? (a.value = a[d] = b[d])
        : c[d] && c[d].set
        ? (a[d] = b[d])
        : q(a, d, b[d])
  }
  function Z(a, b, c) {
    a.classList[c ? "add" : "remove"](b)
  }
  function pa() {
    if (!P) throw Error("Function called outside component initialization")
    return P
  }
  function Ca(a) {
    qa.push(a)
  }
  function eb() {
    if (!Da) {
      Da = !0
      do {
        for (var a = 0; a < ka.length; a += 1) {
          var b = ka[a]
          P = b
          b = b.$$
          if (null !== b.fragment) {
            b.update()
            b.before_update.forEach(Y)
            let a = b.dirty
            b.dirty = [-1]
            b.fragment && b.fragment.p(b.ctx, a)
            b.after_update.forEach(Ca)
          }
        }
        P = null
        for (ka.length = 0; aa.length; ) aa.pop()()
        for (a = 0; a < qa.length; a += 1)
          (b = qa[a]), Ea.has(b) || (Ea.add(b), b())
        qa.length = 0
      } while (ka.length)
      for (; fb.length; ) fb.pop()()
      Da = Fa = !1
      Ea.clear()
    }
  }
  function Q() {
    R = { r: 0, c: [], p: R }
  }
  function S() {
    R.r || R.c.forEach(Y)
    R = R.p
  }
  function n(a, b) {
    a && a.i && (ra.delete(a), a.i(b))
  }
  function r(a, b, c, d) {
    a &&
      a.o &&
      !ra.has(a) &&
      (ra.add(a),
      R.c.push(() => {
        ra.delete(a)
        d && (c && a.d(1), d())
      }),
      a.o(b))
  }
  function T(a) {
    a && a.c()
  }
  function N(a, b, c, d) {
    let { fragment: e, on_mount: f, on_destroy: h, after_update: k } = a.$$
    e && e.m(b, c)
    d ||
      Ca(() => {
        let b = f.map(Y).filter(bb)
        h ? h.push(...b) : b.forEach(Y)
        a.$$.on_mount = []
      })
    k.forEach(Ca)
  }
  function O(a, b) {
    a = a.$$
    null !== a.fragment &&
      (a.on_destroy.forEach(Y),
      a.fragment && a.fragment.d(b),
      (a.on_destroy = a.fragment = null),
      (a.ctx = []))
  }
  function J(a, b, c, d, e, f, h = [-1]) {
    let k = P
    P = a
    let m = (a.$$ = {
        fragment: null,
        ctx: null,
        props: f,
        update: x,
        not_equal: e,
        bound: Object.create(null),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(k ? k.$$.context : b.context || []),
        callbacks: Object.create(null),
        dirty: h,
        skip_bound: !1,
      }),
      g = !1
    m.ctx = c
      ? c(a, b.props || {}, (b, c, ...d) => {
          d = d.length ? d[0] : c
          if (m.ctx && e(m.ctx[b], (m.ctx[b] = d))) {
            if (!m.skip_bound && m.bound[b]) m.bound[b](d)
            g &&
              (-1 === a.$$.dirty[0] &&
                (ka.push(a),
                Fa || ((Fa = !0), Pb.then(eb)),
                a.$$.dirty.fill(0)),
              (a.$$.dirty[(b / 31) | 0] |= 1 << b % 31))
          }
          return c
        })
      : []
    m.update()
    g = !0
    m.before_update.forEach(Y)
    m.fragment = d ? d(m.ctx) : !1
    b.target &&
      (b.hydrate
        ? ((c = Array.from(b.target.childNodes)),
          m.fragment && m.fragment.l(c),
          c.forEach(w))
        : m.fragment && m.fragment.c(),
      b.intro && n(a.$$.fragment),
      N(a, b.target, b.anchor, b.customElement),
      eb())
    P = k
  }
  function Qb(a) {
    let b, c, d, e, f
    return {
      c() {
        b = document.createElement("button")
        q(b, "aria-label", (c = a[3] ? a[3] : null))
        q(
          b,
          "class",
          (d = `${a[1] || ""} shepherd-button ${
            a[4] ? "shepherd-button-secondary" : ""
          }`)
        )
        b.disabled = a[2]
        q(b, "tabindex", "0")
      },
      m(c, d) {
        c.insertBefore(b, d || null)
        b.innerHTML = a[5]
        e ||
          ((f = oa(b, "click", function () {
            bb(a[0]) && a[0].apply(this, arguments)
          })),
          (e = !0))
      },
      p(e, [f]) {
        a = e
        f & 32 && (b.innerHTML = a[5])
        f & 8 && c !== (c = a[3] ? a[3] : null) && q(b, "aria-label", c)
        f & 18 &&
          d !==
            (d = `${a[1] || ""} shepherd-button ${
              a[4] ? "shepherd-button-secondary" : ""
            }`) &&
          q(b, "class", d)
        f & 4 && (b.disabled = a[2])
      },
      i: x,
      o: x,
      d(a) {
        a && w(b)
        e = !1
        f()
      },
    }
  }
  function Rb(a, b, c) {
    let { config: d } = b,
      { step: e } = b,
      f,
      h,
      k,
      m,
      g,
      l
    a.$$set = (a) => {
      "config" in a && c(6, (d = a.config))
      "step" in a && c(7, (e = a.step))
    }
    a.$$.update = () => {
      if (a.$$.dirty & 192) {
        c(0, (f = d.action ? d.action.bind(e.tour) : null))
        c(1, (h = d.classes))
        if (d.disabled) {
          var b = d.disabled
          b = W(b) ? b.call(e) : b
        } else b = !1
        c(2, (k = b))
        c(3, (m = d.label))
        c(4, (g = d.secondary))
        c(5, (l = d.text))
      }
    }
    return [f, h, k, m, g, l, d, e]
  }
  function gb(a, b, c) {
    a = a.slice()
    a[2] = b[c]
    return a
  }
  function hb(a) {
    let b,
      c,
      d = a[1],
      e = []
    for (let b = 0; b < d.length; b += 1) e[b] = ib(gb(a, d, b))
    let f = (a) =>
      r(e[a], 1, 1, () => {
        e[a] = null
      })
    return {
      c() {
        for (let a = 0; a < e.length; a += 1) e[a].c()
        b = document.createTextNode("")
      },
      m(a, d) {
        for (let b = 0; b < e.length; b += 1) e[b].m(a, d)
        a.insertBefore(b, d || null)
        c = !0
      },
      p(a, c) {
        if (c & 3) {
          d = a[1]
          let h
          for (h = 0; h < d.length; h += 1) {
            let f = gb(a, d, h)
            e[h]
              ? (e[h].p(f, c), n(e[h], 1))
              : ((e[h] = ib(f)), e[h].c(), n(e[h], 1), e[h].m(b.parentNode, b))
          }
          Q()
          for (h = d.length; h < e.length; h += 1) f(h)
          S()
        }
      },
      i(a) {
        if (!c) {
          for (a = 0; a < d.length; a += 1) n(e[a])
          c = !0
        }
      },
      o(a) {
        e = e.filter(Boolean)
        for (a = 0; a < e.length; a += 1) r(e[a])
        c = !1
      },
      d(a) {
        var c = e
        for (let b = 0; b < c.length; b += 1) c[b] && c[b].d(a)
        a && w(b)
      },
    }
  }
  function ib(a) {
    let b, c
    b = new Sb({ props: { config: a[2], step: a[0] } })
    return {
      c() {
        T(b.$$.fragment)
      },
      m(a, e) {
        N(b, a, e)
        c = !0
      },
      p(a, c) {
        let d = {}
        c & 2 && (d.config = a[2])
        c & 1 && (d.step = a[0])
        b.$set(d)
      },
      i(a) {
        c || (n(b.$$.fragment, a), (c = !0))
      },
      o(a) {
        r(b.$$.fragment, a)
        c = !1
      },
      d(a) {
        O(b, a)
      },
    }
  }
  function Tb(a) {
    let b,
      c,
      d = a[1] && hb(a)
    return {
      c() {
        b = document.createElement("footer")
        d && d.c()
        q(b, "class", "shepherd-footer")
      },
      m(a, f) {
        a.insertBefore(b, f || null)
        d && d.m(b, null)
        c = !0
      },
      p(a, [c]) {
        a[1]
          ? d
            ? (d.p(a, c), c & 2 && n(d, 1))
            : ((d = hb(a)), d.c(), n(d, 1), d.m(b, null))
          : d &&
            (Q(),
            r(d, 1, 1, () => {
              d = null
            }),
            S())
      },
      i(a) {
        c || (n(d), (c = !0))
      },
      o(a) {
        r(d)
        c = !1
      },
      d(a) {
        a && w(b)
        d && d.d()
      },
    }
  }
  function Ub(a, b, c) {
    let d,
      { step: e } = b
    a.$$set = (a) => {
      "step" in a && c(0, (e = a.step))
    }
    a.$$.update = () => {
      a.$$.dirty & 1 && c(1, (d = e.options.buttons))
    }
    return [e, d]
  }
  function Vb(a) {
    let b, c, d, e, f
    return {
      c() {
        b = document.createElement("button")
        c = document.createElement("span")
        c.textContent = "\u00d7"
        q(c, "aria-hidden", "true")
        q(b, "aria-label", (d = a[0].label ? a[0].label : "Close Tour"))
        q(b, "class", "shepherd-cancel-icon")
        q(b, "type", "button")
      },
      m(d, k) {
        d.insertBefore(b, k || null)
        b.appendChild(c)
        e || ((f = oa(b, "click", a[1])), (e = !0))
      },
      p(a, [c]) {
        c & 1 &&
          d !== (d = a[0].label ? a[0].label : "Close Tour") &&
          q(b, "aria-label", d)
      },
      i: x,
      o: x,
      d(a) {
        a && w(b)
        e = !1
        f()
      },
    }
  }
  function Wb(a, b, c) {
    let { cancelIcon: d } = b,
      { step: e } = b
    a.$$set = (a) => {
      "cancelIcon" in a && c(0, (d = a.cancelIcon))
      "step" in a && c(2, (e = a.step))
    }
    return [
      d,
      (a) => {
        a.preventDefault()
        e.cancel()
      },
      e,
    ]
  }
  function Xb(a) {
    let b
    return {
      c() {
        b = document.createElement("h3")
        q(b, "id", a[1])
        q(b, "class", "shepherd-title")
      },
      m(c, d) {
        c.insertBefore(b, d || null)
        a[3](b)
      },
      p(a, [d]) {
        d & 2 && q(b, "id", a[1])
      },
      i: x,
      o: x,
      d(c) {
        c && w(b)
        a[3](null)
      },
    }
  }
  function Yb(a, b, c) {
    let { labelId: d } = b,
      { element: e } = b,
      { title: f } = b
    pa().$$.after_update.push(() => {
      W(f) && c(2, (f = f()))
      c(0, (e.innerHTML = f), e)
    })
    a.$$set = (a) => {
      "labelId" in a && c(1, (d = a.labelId))
      "element" in a && c(0, (e = a.element))
      "title" in a && c(2, (f = a.title))
    }
    return [
      e,
      d,
      f,
      function (a) {
        aa[a ? "unshift" : "push"](() => {
          e = a
          c(0, e)
        })
      },
    ]
  }
  function jb(a) {
    let b, c
    b = new Zb({ props: { labelId: a[0], title: a[2] } })
    return {
      c() {
        T(b.$$.fragment)
      },
      m(a, e) {
        N(b, a, e)
        c = !0
      },
      p(a, c) {
        let d = {}
        c & 1 && (d.labelId = a[0])
        c & 4 && (d.title = a[2])
        b.$set(d)
      },
      i(a) {
        c || (n(b.$$.fragment, a), (c = !0))
      },
      o(a) {
        r(b.$$.fragment, a)
        c = !1
      },
      d(a) {
        O(b, a)
      },
    }
  }
  function kb(a) {
    let b, c
    b = new $b({ props: { cancelIcon: a[3], step: a[1] } })
    return {
      c() {
        T(b.$$.fragment)
      },
      m(a, e) {
        N(b, a, e)
        c = !0
      },
      p(a, c) {
        let d = {}
        c & 8 && (d.cancelIcon = a[3])
        c & 2 && (d.step = a[1])
        b.$set(d)
      },
      i(a) {
        c || (n(b.$$.fragment, a), (c = !0))
      },
      o(a) {
        r(b.$$.fragment, a)
        c = !1
      },
      d(a) {
        O(b, a)
      },
    }
  }
  function ac(a) {
    let b,
      c,
      d,
      e = a[2] && jb(a),
      f = a[3] && a[3].enabled && kb(a)
    return {
      c() {
        b = document.createElement("header")
        e && e.c()
        c = document.createTextNode(" ")
        f && f.c()
        q(b, "class", "shepherd-header")
      },
      m(a, k) {
        a.insertBefore(b, k || null)
        e && e.m(b, null)
        b.appendChild(c)
        f && f.m(b, null)
        d = !0
      },
      p(a, [d]) {
        a[2]
          ? e
            ? (e.p(a, d), d & 4 && n(e, 1))
            : ((e = jb(a)), e.c(), n(e, 1), e.m(b, c))
          : e &&
            (Q(),
            r(e, 1, 1, () => {
              e = null
            }),
            S())
        a[3] && a[3].enabled
          ? f
            ? (f.p(a, d), d & 8 && n(f, 1))
            : ((f = kb(a)), f.c(), n(f, 1), f.m(b, null))
          : f &&
            (Q(),
            r(f, 1, 1, () => {
              f = null
            }),
            S())
      },
      i(a) {
        d || (n(e), n(f), (d = !0))
      },
      o(a) {
        r(e)
        r(f)
        d = !1
      },
      d(a) {
        a && w(b)
        e && e.d()
        f && f.d()
      },
    }
  }
  function bc(a, b, c) {
    let { labelId: d } = b,
      { step: e } = b,
      f,
      h
    a.$$set = (a) => {
      "labelId" in a && c(0, (d = a.labelId))
      "step" in a && c(1, (e = a.step))
    }
    a.$$.update = () => {
      a.$$.dirty & 2 &&
        (c(2, (f = e.options.title)), c(3, (h = e.options.cancelIcon)))
    }
    return [d, e, f, h]
  }
  function cc(a) {
    let b
    return {
      c() {
        b = document.createElement("div")
        q(b, "class", "shepherd-text")
        q(b, "id", a[1])
      },
      m(c, d) {
        c.insertBefore(b, d || null)
        a[3](b)
      },
      p(a, [d]) {
        d & 2 && q(b, "id", a[1])
      },
      i: x,
      o: x,
      d(c) {
        c && w(b)
        a[3](null)
      },
    }
  }
  function dc(a, b, c) {
    let { descriptionId: d } = b,
      { element: e } = b,
      { step: f } = b
    pa().$$.after_update.push(() => {
      let { text: a } = f.options
      W(a) && (a = a.call(f))
      a instanceof HTMLElement ? e.appendChild(a) : c(0, (e.innerHTML = a), e)
    })
    a.$$set = (a) => {
      "descriptionId" in a && c(1, (d = a.descriptionId))
      "element" in a && c(0, (e = a.element))
      "step" in a && c(2, (f = a.step))
    }
    return [
      e,
      d,
      f,
      function (a) {
        aa[a ? "unshift" : "push"](() => {
          e = a
          c(0, e)
        })
      },
    ]
  }
  function lb(a) {
    let b, c
    b = new ec({ props: { labelId: a[1], step: a[2] } })
    return {
      c() {
        T(b.$$.fragment)
      },
      m(a, e) {
        N(b, a, e)
        c = !0
      },
      p(a, c) {
        let d = {}
        c & 2 && (d.labelId = a[1])
        c & 4 && (d.step = a[2])
        b.$set(d)
      },
      i(a) {
        c || (n(b.$$.fragment, a), (c = !0))
      },
      o(a) {
        r(b.$$.fragment, a)
        c = !1
      },
      d(a) {
        O(b, a)
      },
    }
  }
  function mb(a) {
    let b, c
    b = new fc({ props: { descriptionId: a[0], step: a[2] } })
    return {
      c() {
        T(b.$$.fragment)
      },
      m(a, e) {
        N(b, a, e)
        c = !0
      },
      p(a, c) {
        let d = {}
        c & 1 && (d.descriptionId = a[0])
        c & 4 && (d.step = a[2])
        b.$set(d)
      },
      i(a) {
        c || (n(b.$$.fragment, a), (c = !0))
      },
      o(a) {
        r(b.$$.fragment, a)
        c = !1
      },
      d(a) {
        O(b, a)
      },
    }
  }
  function nb(a) {
    let b, c
    b = new gc({ props: { step: a[2] } })
    return {
      c() {
        T(b.$$.fragment)
      },
      m(a, e) {
        N(b, a, e)
        c = !0
      },
      p(a, c) {
        let d = {}
        c & 4 && (d.step = a[2])
        b.$set(d)
      },
      i(a) {
        c || (n(b.$$.fragment, a), (c = !0))
      },
      o(a) {
        r(b.$$.fragment, a)
        c = !1
      },
      d(a) {
        O(b, a)
      },
    }
  }
  function hc(a) {
    let b,
      c =
        void 0 !== a[2].options.title ||
        (a[2].options.cancelIcon && a[2].options.cancelIcon.enabled),
      d,
      e = void 0 !== a[2].options.text,
      f,
      h = Array.isArray(a[2].options.buttons) && a[2].options.buttons.length,
      k,
      m = c && lb(a),
      g = e && mb(a),
      l = h && nb(a)
    return {
      c() {
        b = document.createElement("div")
        m && m.c()
        d = document.createTextNode(" ")
        g && g.c()
        f = document.createTextNode(" ")
        l && l.c()
        q(b, "class", "shepherd-content")
      },
      m(a, c) {
        a.insertBefore(b, c || null)
        m && m.m(b, null)
        b.appendChild(d)
        g && g.m(b, null)
        b.appendChild(f)
        l && l.m(b, null)
        k = !0
      },
      p(a, [k]) {
        k & 4 &&
          (c =
            void 0 !== a[2].options.title ||
            (a[2].options.cancelIcon && a[2].options.cancelIcon.enabled))
        c
          ? m
            ? (m.p(a, k), k & 4 && n(m, 1))
            : ((m = lb(a)), m.c(), n(m, 1), m.m(b, d))
          : m &&
            (Q(),
            r(m, 1, 1, () => {
              m = null
            }),
            S())
        k & 4 && (e = void 0 !== a[2].options.text)
        e
          ? g
            ? (g.p(a, k), k & 4 && n(g, 1))
            : ((g = mb(a)), g.c(), n(g, 1), g.m(b, f))
          : g &&
            (Q(),
            r(g, 1, 1, () => {
              g = null
            }),
            S())
        k & 4 &&
          (h =
            Array.isArray(a[2].options.buttons) && a[2].options.buttons.length)
        h
          ? l
            ? (l.p(a, k), k & 4 && n(l, 1))
            : ((l = nb(a)), l.c(), n(l, 1), l.m(b, null))
          : l &&
            (Q(),
            r(l, 1, 1, () => {
              l = null
            }),
            S())
      },
      i(a) {
        k || (n(m), n(g), n(l), (k = !0))
      },
      o(a) {
        r(m)
        r(g)
        r(l)
        k = !1
      },
      d(a) {
        a && w(b)
        m && m.d()
        g && g.d()
        l && l.d()
      },
    }
  }
  function ic(a, b, c) {
    let { descriptionId: d } = b,
      { labelId: e } = b,
      { step: f } = b
    a.$$set = (a) => {
      "descriptionId" in a && c(0, (d = a.descriptionId))
      "labelId" in a && c(1, (e = a.labelId))
      "step" in a && c(2, (f = a.step))
    }
    return [d, e, f]
  }
  function ob(a) {
    let b
    return {
      c() {
        b = document.createElement("div")
        q(b, "class", "shepherd-arrow")
        q(b, "data-popper-arrow", "")
      },
      m(a, d) {
        a.insertBefore(b, d || null)
      },
      d(a) {
        a && w(b)
      },
    }
  }
  function jc(a) {
    let b,
      c,
      d,
      e,
      f,
      h,
      k,
      m,
      g =
        a[4].options.arrow &&
        a[4].options.attachTo &&
        a[4].options.attachTo.element &&
        a[4].options.attachTo.on &&
        ob()
    d = new kc({ props: { descriptionId: a[2], labelId: a[3], step: a[4] } })
    let l = [
        {
          "aria-describedby": (e = void 0 !== a[4].options.text ? a[2] : null),
        },
        { "aria-labelledby": (f = a[4].options.title ? a[3] : null) },
        a[1],
        { role: "dialog" },
        { tabindex: "0" },
      ],
      p = {}
    for (let a = 0; a < l.length; a += 1) p = Ob(p, l[a])
    return {
      c() {
        b = document.createElement("div")
        g && g.c()
        c = document.createTextNode(" ")
        T(d.$$.fragment)
        db(b, p)
        Z(b, "shepherd-has-cancel-icon", a[5])
        Z(b, "shepherd-has-title", a[6])
        Z(b, "shepherd-element", !0)
      },
      m(e, f) {
        e.insertBefore(b, f || null)
        g && g.m(b, null)
        b.appendChild(c)
        N(d, b, null)
        a[13](b)
        h = !0
        k || ((m = oa(b, "keydown", a[7])), (k = !0))
      },
      p(a, [k]) {
        a[4].options.arrow &&
        a[4].options.attachTo &&
        a[4].options.attachTo.element &&
        a[4].options.attachTo.on
          ? g || ((g = ob()), g.c(), g.m(b, c))
          : g && (g.d(1), (g = null))
        var m = {}
        k & 4 && (m.descriptionId = a[2])
        k & 8 && (m.labelId = a[3])
        k & 16 && (m.step = a[4])
        d.$set(m)
        m = b
        {
          k = [
            (!h ||
              (k & 20 &&
                e !== (e = void 0 !== a[4].options.text ? a[2] : null))) && {
              "aria-describedby": e,
            },
            (!h ||
              (k & 24 && f !== (f = a[4].options.title ? a[3] : null))) && {
              "aria-labelledby": f,
            },
            k & 2 && a[1],
            { role: "dialog" },
            { tabindex: "0" },
          ]
          let b = {},
            c = {},
            d = { $$scope: 1 },
            g = l.length
          for (; g--; ) {
            let a = l[g],
              e = k[g]
            if (e) {
              for (u in a) u in e || (c[u] = 1)
              for (let a in e) d[a] || ((b[a] = e[a]), (d[a] = 1))
              l[g] = e
            } else for (let b in a) d[b] = 1
          }
          for (let a in c) a in b || (b[a] = void 0)
          var u = b
        }
        db(m, (p = u))
        Z(b, "shepherd-has-cancel-icon", a[5])
        Z(b, "shepherd-has-title", a[6])
        Z(b, "shepherd-element", !0)
      },
      i(a) {
        h || (n(d.$$.fragment, a), (h = !0))
      },
      o(a) {
        r(d.$$.fragment, a)
        h = !1
      },
      d(c) {
        c && w(b)
        g && g.d()
        O(d)
        a[13](null)
        k = !1
        m()
      },
    }
  }
  function pb(a) {
    return a.split(" ").filter((a) => !!a.length)
  }
  function lc(a, b, c) {
    let { classPrefix: d } = b,
      { element: e } = b,
      { descriptionId: f } = b,
      { firstFocusableElement: h } = b,
      { focusableElements: k } = b,
      { labelId: m } = b,
      { lastFocusableElement: g } = b,
      { step: l } = b,
      { dataStepId: p } = b,
      t,
      A,
      C
    pa().$$.on_mount.push(() => {
      c(1, (p = { [`data-${d}shepherd-step-id`]: l.id }))
      c(
        9,
        (k = e.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        ))
      )
      c(8, (h = k[0]))
      c(10, (g = k[k.length - 1]))
    })
    pa().$$.after_update.push(() => {
      if (C !== l.options.classes) {
        var a = C
        da(a) && ((a = pb(a)), a.length && e.classList.remove(...a))
        a = C = l.options.classes
        da(a) && ((a = pb(a)), a.length && e.classList.add(...a))
      }
    })
    a.$$set = (a) => {
      "classPrefix" in a && c(11, (d = a.classPrefix))
      "element" in a && c(0, (e = a.element))
      "descriptionId" in a && c(2, (f = a.descriptionId))
      "firstFocusableElement" in a && c(8, (h = a.firstFocusableElement))
      "focusableElements" in a && c(9, (k = a.focusableElements))
      "labelId" in a && c(3, (m = a.labelId))
      "lastFocusableElement" in a && c(10, (g = a.lastFocusableElement))
      "step" in a && c(4, (l = a.step))
      "dataStepId" in a && c(1, (p = a.dataStepId))
    }
    a.$$.update = () => {
      a.$$.dirty & 16 &&
        (c(
          5,
          (t =
            l.options && l.options.cancelIcon && l.options.cancelIcon.enabled)
        ),
        c(6, (A = l.options && l.options.title)))
    }
    return [
      e,
      p,
      f,
      m,
      l,
      t,
      A,
      (a) => {
        const { tour: b } = l
        switch (a.keyCode) {
          case 9:
            if (0 === k.length) {
              a.preventDefault()
              break
            }
            if (a.shiftKey) {
              if (
                document.activeElement === h ||
                document.activeElement.classList.contains("shepherd-element")
              )
                a.preventDefault(), g.focus()
            } else
              document.activeElement === g && (a.preventDefault(), h.focus())
            break
          case 27:
            b.options.exitOnEsc && l.cancel()
            break
          case 37:
            b.options.keyboardNavigation && b.back()
            break
          case 39:
            b.options.keyboardNavigation && b.next()
        }
      },
      h,
      k,
      g,
      d,
      () => e,
      function (a) {
        aa[a ? "unshift" : "push"](() => {
          e = a
          c(0, e)
        })
      },
    ]
  }
  function mc(a) {
    a &&
      (({ steps: a } = a),
      a.forEach((a) => {
        a.options &&
          !1 === a.options.canClickTarget &&
          a.options.attachTo &&
          a.target instanceof HTMLElement &&
          a.target.classList.remove("shepherd-target-click-disabled")
      }))
  }
  function nc({ width: a, height: b, x: c = 0, y: d = 0, r: e = 0 }) {
    let { innerWidth: f, innerHeight: h } = window
    return `M${f},${h}\
H0\
V0\
H${f}\
V${h}\
Z\
M${c + e},${d}\
a${e},${e},0,0,0-${e},${e}\
V${b + d - e}\
a${e},${e},0,0,0,${e},${e}\
H${a + c - e}\
a${e},${e},0,0,0,${e}-${e}\
V${d + e}\
a${e},${e},0,0,0-${e}-${e}\
Z`
  }
  function oc(a) {
    let b, c, d, e, f
    return {
      c() {
        b = cb("svg")
        c = cb("path")
        q(c, "d", a[2])
        q(
          b,
          "class",
          (d = `${
            a[1] ? "shepherd-modal-is-visible" : ""
          } shepherd-modal-overlay-container`)
        )
      },
      m(d, k) {
        d.insertBefore(b, k || null)
        b.appendChild(c)
        a[11](b)
        e || ((f = oa(b, "touchmove", a[3])), (e = !0))
      },
      p(a, [e]) {
        e & 4 && q(c, "d", a[2])
        e & 2 &&
          d !==
            (d = `${
              a[1] ? "shepherd-modal-is-visible" : ""
            } shepherd-modal-overlay-container`) &&
          q(b, "class", d)
      },
      i: x,
      o: x,
      d(c) {
        c && w(b)
        a[11](null)
        e = !1
        f()
      },
    }
  }
  function qb(a) {
    if (!a) return null
    let b = a instanceof HTMLElement && window.getComputedStyle(a).overflowY
    return "hidden" !== b && "visible" !== b && a.scrollHeight >= a.clientHeight
      ? a
      : qb(a.parentElement)
  }
  function pc(a, b, c) {
    function d() {
      c(4, (l = { width: 0, height: 0, x: 0, y: 0, r: 0 }))
    }
    function e() {
      c(1, (p = !1))
      k()
    }
    function f(a = 0, b = 0, e, f) {
      if (f) {
        var g = f.getBoundingClientRect()
        var u = g.y || g.top
        g = g.bottom || u + g.height
        if (e) {
          var h = e.getBoundingClientRect()
          e = h.y || h.top
          h = h.bottom || e + h.height
          u = Math.max(u, e)
          g = Math.min(g, h)
        }
        u = { y: u, height: Math.max(g - u, 0) }
        let { y: d, height: k } = u,
          { x: m, width: p, left: A } = f.getBoundingClientRect()
        c(
          4,
          (l = {
            width: p + 2 * a,
            height: k + 2 * a,
            x: (m || A) - a,
            y: d - a,
            r: b,
          })
        )
      } else d()
    }
    function h() {
      c(1, (p = !0))
    }
    function k() {
      t && (cancelAnimationFrame(t), (t = void 0))
      window.removeEventListener("touchmove", C, { passive: !1 })
    }
    function m(a) {
      let { modalOverlayOpeningPadding: b, modalOverlayOpeningRadius: c } =
          a.options,
        d = qb(a.target),
        e = () => {
          t = void 0
          f(b, c, d, a.target)
          t = requestAnimationFrame(e)
        }
      e()
      window.addEventListener("touchmove", C, { passive: !1 })
    }
    let { element: g } = b,
      { openingProperties: l } = b
    Ba()
    let p = !1,
      t = void 0,
      A
    d()
    let C = (a) => {
      a.preventDefault()
    }
    a.$$set = (a) => {
      "element" in a && c(0, (g = a.element))
      "openingProperties" in a && c(4, (l = a.openingProperties))
    }
    a.$$.update = () => {
      a.$$.dirty & 16 && c(2, (A = nc(l)))
    }
    return [
      g,
      p,
      A,
      (a) => {
        a.stopPropagation()
      },
      l,
      () => g,
      d,
      e,
      f,
      function (a) {
        k()
        a.tour.options.useModalOverlay ? (m(a), h()) : e()
      },
      h,
      function (a) {
        aa[a ? "unshift" : "push"](() => {
          g = a
          c(0, g)
        })
      },
    ]
  }
  var vb = function (a) {
      var b
      if ((b = !!a && "object" === typeof a))
        (b = Object.prototype.toString.call(a)),
          (b = !(
            "[object RegExp]" === b ||
            "[object Date]" === b ||
            a.$$typeof === qc
          ))
      return b
    },
    qc =
      "function" === typeof Symbol && Symbol.for
        ? Symbol.for("react.element")
        : 60103
  V.all = function (a, b) {
    if (!Array.isArray(a)) throw Error("first argument should be an array")
    return a.reduce(function (a, d) {
      return V(a, d, b)
    }, {})
  }
  var rc = V
  class Ga {
    on(a, b, c, d = !1) {
      void 0 === this.bindings && (this.bindings = {})
      void 0 === this.bindings[a] && (this.bindings[a] = [])
      this.bindings[a].push({ handler: b, ctx: c, once: d })
      return this
    }
    once(a, b, c) {
      return this.on(a, b, c, !0)
    }
    off(a, b) {
      if (void 0 === this.bindings || void 0 === this.bindings[a]) return this
      void 0 === b
        ? delete this.bindings[a]
        : this.bindings[a].forEach((c, d) => {
            c.handler === b && this.bindings[a].splice(d, 1)
          })
      return this
    }
    trigger(a, ...b) {
      void 0 !== this.bindings &&
        this.bindings[a] &&
        this.bindings[a].forEach((c, d) => {
          let { ctx: e, handler: f, once: h } = c
          f.apply(e || this, b)
          h && this.bindings[a].splice(d, 1)
        })
      return this
    }
  }
  var ja = ["top", "bottom", "right", "left"],
    Wa = ja.reduce(function (a, b) {
      return a.concat([b + "-start", b + "-end"])
    }, []),
    Va = [].concat(ja, ["auto"]).reduce(function (a, b) {
      return a.concat([b, b + "-start", b + "-end"])
    }, []),
    Ib =
      "beforeRead read afterRead beforeMain main afterMain beforeWrite write afterWrite".split(
        " "
      ),
    E = Math.max,
    M = Math.min,
    ma = Math.round,
    yb = { top: "auto", right: "auto", bottom: "auto", left: "auto" },
    sa = { passive: !0 },
    zb = { left: "right", right: "left", bottom: "top", top: "bottom" },
    Ab = { start: "end", end: "start" },
    rb = { placement: "bottom", modifiers: [], strategy: "absolute" },
    sc = (function (a) {
      void 0 === a && (a = {})
      var b = a.defaultModifiers,
        c = void 0 === b ? [] : b
      a = a.defaultOptions
      var d = void 0 === a ? rb : a
      return function (a, b, h) {
        function e() {
          g.orderedModifiers.forEach(function (a) {
            var b = a.name,
              c = a.options
            c = void 0 === c ? {} : c
            a = a.effect
            "function" === typeof a &&
              ((b = a({ state: g, name: b, instance: t, options: c })),
              l.push(b || function () {}))
          })
        }
        function f() {
          l.forEach(function (a) {
            return a()
          })
          l = []
        }
        void 0 === h && (h = d)
        var g = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, rb, d),
            modifiersData: {},
            elements: { reference: a, popper: b },
            attributes: {},
            styles: {},
          },
          l = [],
          p = !1,
          t = {
            state: g,
            setOptions: function (h) {
              f()
              g.options = Object.assign({}, d, g.options, h)
              g.scrollParents = {
                reference: ea(a)
                  ? ha(a)
                  : a.contextElement
                  ? ha(a.contextElement)
                  : [],
                popper: ha(b),
              }
              h = Hb(Kb([].concat(c, g.options.modifiers)))
              g.orderedModifiers = h.filter(function (a) {
                return a.enabled
              })
              e()
              return t.update()
            },
            forceUpdate: function () {
              if (!p) {
                var a = g.elements,
                  b = a.reference
                a = a.popper
                if (Za(b, a))
                  for (
                    g.rects = {
                      reference: Fb(b, fa(a), "fixed" === g.options.strategy),
                      popper: ta(a),
                    },
                      g.reset = !1,
                      g.placement = g.options.placement,
                      g.orderedModifiers.forEach(function (a) {
                        return (g.modifiersData[a.name] = Object.assign(
                          {},
                          a.data
                        ))
                      }),
                      b = 0;
                    b < g.orderedModifiers.length;
                    b++
                  )
                    if (!0 === g.reset) (g.reset = !1), (b = -1)
                    else {
                      var c = g.orderedModifiers[b]
                      a = c.fn
                      var d = c.options
                      d = void 0 === d ? {} : d
                      c = c.name
                      "function" === typeof a &&
                        (g =
                          a({ state: g, options: d, name: c, instance: t }) ||
                          g)
                    }
              }
            },
            update: Jb(function () {
              return new Promise(function (a) {
                t.forceUpdate()
                a(g)
              })
            }),
            destroy: function () {
              f()
              p = !0
            },
          }
        if (!Za(a, b)) return t
        t.setOptions(h).then(function (a) {
          if (!p && h.onFirstUpdate) h.onFirstUpdate(a)
        })
        return t
      }
    })({
      defaultModifiers: [
        {
          name: "eventListeners",
          enabled: !0,
          phase: "write",
          fn: function () {},
          effect: function (a) {
            var b = a.state,
              c = a.instance
            a = a.options
            var d = a.scroll,
              e = void 0 === d ? !0 : d
            a = a.resize
            var f = void 0 === a ? !0 : a,
              h = z(b.elements.popper),
              k = [].concat(b.scrollParents.reference, b.scrollParents.popper)
            e &&
              k.forEach(function (a) {
                a.addEventListener("scroll", c.update, sa)
              })
            f && h.addEventListener("resize", c.update, sa)
            return function () {
              e &&
                k.forEach(function (a) {
                  a.removeEventListener("scroll", c.update, sa)
                })
              f && h.removeEventListener("resize", c.update, sa)
            }
          },
          data: {},
        },
        {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (a) {
            var b = a.state
            b.modifiersData[a.name] = Ua({
              reference: b.rects.reference,
              element: b.rects.popper,
              strategy: "absolute",
              placement: b.placement,
            })
          },
          data: {},
        },
        {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (a) {
            var b = a.state,
              c = a.options
            a = c.gpuAcceleration
            a = void 0 === a ? !0 : a
            var d = c.adaptive
            d = void 0 === d ? !0 : d
            c = c.roundOffsets
            c = void 0 === c ? !0 : c
            a = {
              placement: F(b.placement),
              popper: b.elements.popper,
              popperRect: b.rects.popper,
              gpuAcceleration: a,
            }
            null != b.modifiersData.popperOffsets &&
              (b.styles.popper = Object.assign(
                {},
                b.styles.popper,
                Qa(
                  Object.assign({}, a, {
                    offsets: b.modifiersData.popperOffsets,
                    position: b.options.strategy,
                    adaptive: d,
                    roundOffsets: c,
                  })
                )
              ))
            null != b.modifiersData.arrow &&
              (b.styles.arrow = Object.assign(
                {},
                b.styles.arrow,
                Qa(
                  Object.assign({}, a, {
                    offsets: b.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: c,
                  })
                )
              ))
            b.attributes.popper = Object.assign({}, b.attributes.popper, {
              "data-popper-placement": b.placement,
            })
          },
          data: {},
        },
        {
          name: "applyStyles",
          enabled: !0,
          phase: "write",
          fn: function (a) {
            var b = a.state
            Object.keys(b.elements).forEach(function (a) {
              var c = b.styles[a] || {},
                e = b.attributes[a] || {},
                f = b.elements[a]
              y(f) &&
                B(f) &&
                (Object.assign(f.style, c),
                Object.keys(e).forEach(function (a) {
                  var b = e[a]
                  !1 === b
                    ? f.removeAttribute(a)
                    : f.setAttribute(a, !0 === b ? "" : b)
                }))
            })
          },
          effect: function (a) {
            var b = a.state,
              c = {
                popper: {
                  position: b.options.strategy,
                  left: "0",
                  top: "0",
                  margin: "0",
                },
                arrow: { position: "absolute" },
                reference: {},
              }
            Object.assign(b.elements.popper.style, c.popper)
            b.styles = c
            b.elements.arrow && Object.assign(b.elements.arrow.style, c.arrow)
            return function () {
              Object.keys(b.elements).forEach(function (a) {
                var d = b.elements[a],
                  f = b.attributes[a] || {}
                a = Object.keys(
                  b.styles.hasOwnProperty(a) ? b.styles[a] : c[a]
                ).reduce(function (a, b) {
                  a[b] = ""
                  return a
                }, {})
                y(d) &&
                  B(d) &&
                  (Object.assign(d.style, a),
                  Object.keys(f).forEach(function (a) {
                    d.removeAttribute(a)
                  }))
              })
            }
          },
          requires: ["computeStyles"],
        },
        {
          name: "offset",
          enabled: !0,
          phase: "main",
          requires: ["popperOffsets"],
          fn: function (a) {
            var b = a.state,
              c = a.name
            a = a.options.offset
            var d = void 0 === a ? [0, 0] : a
            a = Va.reduce(function (a, c) {
              var e = b.rects
              var f = F(c)
              var h = 0 <= ["left", "top"].indexOf(f) ? -1 : 1,
                k =
                  "function" === typeof d
                    ? d(Object.assign({}, e, { placement: c }))
                    : d
              e = k[0]
              k = k[1]
              e = e || 0
              k = (k || 0) * h
              f =
                0 <= ["left", "right"].indexOf(f)
                  ? { x: k, y: e }
                  : { x: e, y: k }
              a[c] = f
              return a
            }, {})
            var e = a[b.placement],
              f = e.x
            e = e.y
            null != b.modifiersData.popperOffsets &&
              ((b.modifiersData.popperOffsets.x += f),
              (b.modifiersData.popperOffsets.y += e))
            b.modifiersData[c] = a
          },
        },
        {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (a) {
            var b = a.state,
              c = a.options
            a = a.name
            if (!b.modifiersData[a]._skip) {
              var d = c.mainAxis
              d = void 0 === d ? !0 : d
              var e = c.altAxis
              e = void 0 === e ? !0 : e
              var f = c.fallbackPlacements,
                h = c.padding,
                k = c.boundary,
                m = c.rootBoundary,
                g = c.altBoundary,
                l = c.flipVariations,
                p = void 0 === l ? !0 : l,
                t = c.allowedAutoPlacements
              c = b.options.placement
              l = F(c)
              f = f || (l !== c && p ? Eb(c) : [na(c)])
              var A = [c].concat(f).reduce(function (a, c) {
                return a.concat(
                  "auto" === F(c)
                    ? Db(b, {
                        placement: c,
                        boundary: k,
                        rootBoundary: m,
                        padding: h,
                        flipVariations: p,
                        allowedAutoPlacements: t,
                      })
                    : c
                )
              }, [])
              c = b.rects.reference
              f = b.rects.popper
              var n = new Map()
              l = !0
              for (var u = A[0], D = 0; D < A.length; D++) {
                var v = A[D],
                  q = F(v),
                  r = "start" === v.split("-")[1],
                  U = 0 <= ["top", "bottom"].indexOf(q),
                  x = U ? "width" : "height",
                  w = ia(b, {
                    placement: v,
                    boundary: k,
                    rootBoundary: m,
                    altBoundary: g,
                    padding: h,
                  })
                r = U ? (r ? "right" : "left") : r ? "bottom" : "top"
                c[x] > f[x] && (r = na(r))
                x = na(r)
                U = []
                d && U.push(0 >= w[q])
                e && U.push(0 >= w[r], 0 >= w[x])
                if (
                  U.every(function (a) {
                    return a
                  })
                ) {
                  u = v
                  l = !1
                  break
                }
                n.set(v, U)
              }
              if (l)
                for (
                  d = function (a) {
                    var b = A.find(function (b) {
                      if ((b = n.get(b)))
                        return b.slice(0, a).every(function (a) {
                          return a
                        })
                    })
                    if (b) return (u = b), "break"
                  },
                    e = p ? 3 : 1;
                  0 < e && "break" !== d(e);
                  e--
                );
              b.placement !== u &&
                ((b.modifiersData[a]._skip = !0),
                (b.placement = u),
                (b.reset = !0))
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        },
        {
          name: "preventOverflow",
          enabled: !0,
          phase: "main",
          fn: function (a) {
            var b = a.state,
              c = a.options
            a = a.name
            var d = c.mainAxis,
              e = void 0 === d ? !0 : d
            d = c.altAxis
            var f = void 0 === d ? !1 : d
            d = c.tether
            d = void 0 === d ? !0 : d
            var h = c.tetherOffset,
              k = void 0 === h ? 0 : h,
              m = ia(b, {
                boundary: c.boundary,
                rootBoundary: c.rootBoundary,
                padding: c.padding,
                altBoundary: c.altBoundary,
              })
            c = F(b.placement)
            var g = b.placement.split("-")[1],
              l = !g,
              p = ua(c)
            c = "x" === p ? "y" : "x"
            h = b.modifiersData.popperOffsets
            var t = b.rects.reference,
              n = b.rects.popper,
              q =
                "function" === typeof k
                  ? k(Object.assign({}, b.rects, { placement: b.placement }))
                  : k
            k = { x: 0, y: 0 }
            if (h) {
              if (e || f) {
                var u = "y" === p ? "top" : "left",
                  D = "y" === p ? "bottom" : "right",
                  v = "y" === p ? "height" : "width",
                  r = h[p],
                  x = h[p] + m[u],
                  w = h[p] - m[D],
                  z = d ? -n[v] / 2 : 0,
                  y = "start" === g ? t[v] : n[v]
                g = "start" === g ? -n[v] : -t[v]
                n = b.elements.arrow
                n = d && n ? ta(n) : { width: 0, height: 0 }
                var B = b.modifiersData["arrow#persistent"]
                  ? b.modifiersData["arrow#persistent"].padding
                  : { top: 0, right: 0, bottom: 0, left: 0 }
                u = B[u]
                D = B[D]
                n = E(0, M(t[v], n[v]))
                y = l ? t[v] / 2 - z - n - u - q : y - n - u - q
                t = l ? -t[v] / 2 + z + n + D + q : g + n + D + q
                l = b.elements.arrow && fa(b.elements.arrow)
                q = b.modifiersData.offset
                  ? b.modifiersData.offset[b.placement][p]
                  : 0
                l =
                  h[p] +
                  y -
                  q -
                  (l ? ("y" === p ? l.clientTop || 0 : l.clientLeft || 0) : 0)
                t = h[p] + t - q
                e &&
                  ((e = d ? M(x, l) : x),
                  (w = d ? E(w, t) : w),
                  (e = E(e, M(r, w))),
                  (h[p] = e),
                  (k[p] = e - r))
                f &&
                  ((f = h[c]),
                  (e = f + m["x" === p ? "top" : "left"]),
                  (m = f - m["x" === p ? "bottom" : "right"]),
                  (e = d ? M(e, l) : e),
                  (d = d ? E(m, t) : m),
                  (d = E(e, M(f, d))),
                  (h[c] = d),
                  (k[c] = d - f))
              }
              b.modifiersData[a] = k
            }
          },
          requiresIfExists: ["offset"],
        },
        {
          name: "arrow",
          enabled: !0,
          phase: "main",
          fn: function (a) {
            var b,
              c = a.state,
              d = a.name,
              e = a.options,
              f = c.elements.arrow,
              h = c.modifiersData.popperOffsets,
              k = F(c.placement)
            a = ua(k)
            k = 0 <= ["left", "right"].indexOf(k) ? "height" : "width"
            if (f && h) {
              e = e.padding
              e =
                "function" === typeof e
                  ? e(Object.assign({}, c.rects, { placement: c.placement }))
                  : e
              e = Oa("number" !== typeof e ? e : Pa(e, ja))
              var m = ta(f),
                g = "y" === a ? "top" : "left",
                l = "y" === a ? "bottom" : "right",
                p =
                  c.rects.reference[k] +
                  c.rects.reference[a] -
                  h[a] -
                  c.rects.popper[k]
              h = h[a] - c.rects.reference[a]
              f = (f = fa(f))
                ? "y" === a
                  ? f.clientHeight || 0
                  : f.clientWidth || 0
                : 0
              h = f / 2 - m[k] / 2 + (p / 2 - h / 2)
              k = E(e[g], M(h, f - m[k] - e[l]))
              c.modifiersData[d] =
                ((b = {}), (b[a] = k), (b.centerOffset = k - h), b)
            }
          },
          effect: function (a) {
            var b = a.state
            a = a.options.element
            a = void 0 === a ? "[data-popper-arrow]" : a
            if (null != a) {
              if (
                "string" === typeof a &&
                ((a = b.elements.popper.querySelector(a)), !a)
              )
                return
              Ma(b.elements.popper, a) && (b.elements.arrow = a)
            }
          },
          requires: ["popperOffsets"],
          requiresIfExists: ["preventOverflow"],
        },
        {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (a) {
            var b = a.state
            a = a.name
            var c = b.rects.reference,
              d = b.rects.popper,
              e = b.modifiersData.preventOverflow,
              f = ia(b, { elementContext: "reference" }),
              h = ia(b, { altBoundary: !0 })
            c = Xa(f, c)
            d = Xa(h, d, e)
            e = Ya(c)
            h = Ya(d)
            b.modifiersData[a] = {
              referenceClippingOffsets: c,
              popperEscapeOffsets: d,
              isReferenceHidden: e,
              hasPopperEscaped: h,
            }
            b.attributes.popper = Object.assign({}, b.attributes.popper, {
              "data-popper-reference-hidden": e,
              "data-popper-escaped": h,
            })
          },
        },
      ],
    })
  let P,
    ka = [],
    aa = [],
    qa = [],
    fb = [],
    Pb = Promise.resolve(),
    Fa = !1,
    Da = !1,
    Ea = new Set(),
    ra = new Set(),
    R
  class K {
    $destroy() {
      O(this, 1)
      this.$destroy = x
    }
    $on(a, b) {
      let c = this.$$.callbacks[a] || (this.$$.callbacks[a] = [])
      c.push(b)
      return () => {
        let a = c.indexOf(b)
        ;-1 !== a && c.splice(a, 1)
      }
    }
    $set(a) {
      this.$$set &&
        0 !== Object.keys(a).length &&
        ((this.$$.skip_bound = !0), this.$$set(a), (this.$$.skip_bound = !1))
    }
  }
  class Sb extends K {
    constructor(a) {
      super()
      J(this, a, Rb, Qb, I, { config: 6, step: 7 })
    }
  }
  class gc extends K {
    constructor(a) {
      super()
      J(this, a, Ub, Tb, I, { step: 0 })
    }
  }
  class $b extends K {
    constructor(a) {
      super()
      J(this, a, Wb, Vb, I, { cancelIcon: 0, step: 2 })
    }
  }
  class Zb extends K {
    constructor(a) {
      super()
      J(this, a, Yb, Xb, I, { labelId: 1, element: 0, title: 2 })
    }
  }
  class ec extends K {
    constructor(a) {
      super()
      J(this, a, bc, ac, I, { labelId: 0, step: 1 })
    }
  }
  class fc extends K {
    constructor(a) {
      super()
      J(this, a, dc, cc, I, { descriptionId: 1, element: 0, step: 2 })
    }
  }
  class kc extends K {
    constructor(a) {
      super()
      J(this, a, ic, hc, I, { descriptionId: 0, labelId: 1, step: 2 })
    }
  }
  class tc extends K {
    constructor(a) {
      super()
      J(this, a, lc, jc, I, {
        classPrefix: 11,
        element: 0,
        descriptionId: 2,
        firstFocusableElement: 8,
        focusableElements: 9,
        labelId: 3,
        lastFocusableElement: 10,
        step: 4,
        dataStepId: 1,
        getElement: 12,
      })
    }
    get getElement() {
      return this.$$.ctx[12]
    }
  }
  var sb = (function (a, b) {
    return (b = { exports: {} }), a(b, b.exports), b.exports
  })(function (a, b) {
    ;(function () {
      a.exports = {
        polyfill: function () {
          function a(a, b) {
            this.scrollLeft = a
            this.scrollTop = b
          }
          function b(a) {
            if (
              null === a ||
              "object" !== typeof a ||
              void 0 === a.behavior ||
              "auto" === a.behavior ||
              "instant" === a.behavior
            )
              return !0
            if ("object" === typeof a && "smooth" === a.behavior) return !1
            throw new TypeError(
              "behavior member of ScrollOptions " +
                a.behavior +
                " is not a valid value for enumeration ScrollBehavior."
            )
          }
          function e(a, b) {
            if ("Y" === b) return a.clientHeight + r < a.scrollHeight
            if ("X" === b) return a.clientWidth + r < a.scrollWidth
          }
          function f(a, b) {
            a = g.getComputedStyle(a, null)["overflow" + b]
            return "auto" === a || "scroll" === a
          }
          function h(a) {
            var b = e(a, "Y") && f(a, "Y")
            a = e(a, "X") && f(a, "X")
            return b || a
          }
          function k(a) {
            var b = (q() - a.startTime) / 468
            var c = 0.5 * (1 - Math.cos(Math.PI * (1 < b ? 1 : b)))
            b = a.startX + (a.x - a.startX) * c
            c = a.startY + (a.y - a.startY) * c
            a.method.call(a.scrollable, b, c)
            ;(b === a.x && c === a.y) || g.requestAnimationFrame(k.bind(g, a))
          }
          function m(b, c, d) {
            var e = q()
            if (b === l.body) {
              var f = g
              var h = g.scrollX || g.pageXOffset
              b = g.scrollY || g.pageYOffset
              var u = n.scroll
            } else (f = b), (h = b.scrollLeft), (b = b.scrollTop), (u = a)
            k({
              scrollable: f,
              method: u,
              startTime: e,
              startX: h,
              startY: b,
              x: c,
              y: d,
            })
          }
          var g = window,
            l = document
          if (
            !(
              "scrollBehavior" in l.documentElement.style &&
              !0 !== g.__forceSmoothScrollPolyfill__
            )
          ) {
            var p = g.HTMLElement || g.Element,
              n = {
                scroll: g.scroll || g.scrollTo,
                scrollBy: g.scrollBy,
                elementScroll: p.prototype.scroll || a,
                scrollIntoView: p.prototype.scrollIntoView,
              },
              q =
                g.performance && g.performance.now
                  ? g.performance.now.bind(g.performance)
                  : Date.now,
              r = /MSIE |Trident\/|Edge\//.test(g.navigator.userAgent) ? 1 : 0
            g.scroll = g.scrollTo = function (a, c) {
              void 0 !== a &&
                (!0 === b(a)
                  ? n.scroll.call(
                      g,
                      void 0 !== a.left
                        ? a.left
                        : "object" !== typeof a
                        ? a
                        : g.scrollX || g.pageXOffset,
                      void 0 !== a.top
                        ? a.top
                        : void 0 !== c
                        ? c
                        : g.scrollY || g.pageYOffset
                    )
                  : m.call(
                      g,
                      l.body,
                      void 0 !== a.left ? ~~a.left : g.scrollX || g.pageXOffset,
                      void 0 !== a.top ? ~~a.top : g.scrollY || g.pageYOffset
                    ))
            }
            g.scrollBy = function (a, c) {
              void 0 !== a &&
                (b(a)
                  ? n.scrollBy.call(
                      g,
                      void 0 !== a.left
                        ? a.left
                        : "object" !== typeof a
                        ? a
                        : 0,
                      void 0 !== a.top ? a.top : void 0 !== c ? c : 0
                    )
                  : m.call(
                      g,
                      l.body,
                      ~~a.left + (g.scrollX || g.pageXOffset),
                      ~~a.top + (g.scrollY || g.pageYOffset)
                    ))
            }
            p.prototype.scroll = p.prototype.scrollTo = function (a, c) {
              if (void 0 !== a)
                if (!0 === b(a)) {
                  if ("number" === typeof a && void 0 === c)
                    throw new SyntaxError("Value could not be converted")
                  n.elementScroll.call(
                    this,
                    void 0 !== a.left
                      ? ~~a.left
                      : "object" !== typeof a
                      ? ~~a
                      : this.scrollLeft,
                    void 0 !== a.top
                      ? ~~a.top
                      : void 0 !== c
                      ? ~~c
                      : this.scrollTop
                  )
                } else
                  (c = a.left),
                    (a = a.top),
                    m.call(
                      this,
                      this,
                      "undefined" === typeof c ? this.scrollLeft : ~~c,
                      "undefined" === typeof a ? this.scrollTop : ~~a
                    )
            }
            p.prototype.scrollBy = function (a, c) {
              void 0 !== a &&
                (!0 === b(a)
                  ? n.elementScroll.call(
                      this,
                      void 0 !== a.left
                        ? ~~a.left + this.scrollLeft
                        : ~~a + this.scrollLeft,
                      void 0 !== a.top
                        ? ~~a.top + this.scrollTop
                        : ~~c + this.scrollTop
                    )
                  : this.scroll({
                      left: ~~a.left + this.scrollLeft,
                      top: ~~a.top + this.scrollTop,
                      behavior: a.behavior,
                    }))
            }
            p.prototype.scrollIntoView = function (a) {
              if (!0 === b(a))
                n.scrollIntoView.call(this, void 0 === a ? !0 : a)
              else {
                for (a = this; a !== l.body && !1 === h(a); )
                  a = a.parentNode || a.host
                var c = a.getBoundingClientRect(),
                  d = this.getBoundingClientRect()
                a !== l.body
                  ? (m.call(
                      this,
                      a,
                      a.scrollLeft + d.left - c.left,
                      a.scrollTop + d.top - c.top
                    ),
                    "fixed" !== g.getComputedStyle(a).position &&
                      g.scrollBy({
                        left: c.left,
                        top: c.top,
                        behavior: "smooth",
                      }))
                  : g.scrollBy({ left: d.left, top: d.top, behavior: "smooth" })
              }
            }
          }
        },
      }
    })()
  })
  sb.polyfill
  sb.polyfill()
  class Ha extends Ga {
    constructor(a, b = {}) {
      super(a, b)
      this.tour = a
      this.classPrefix = this.tour.options
        ? $a(this.tour.options.classPrefix)
        : ""
      this.styles = a.styles
      Ka(this)
      this._setOptions(b)
      return this
    }
    cancel() {
      this.tour.cancel()
      this.trigger("cancel")
    }
    complete() {
      this.tour.complete()
      this.trigger("complete")
    }
    destroy() {
      this.tooltip && (this.tooltip.destroy(), (this.tooltip = null))
      this.el instanceof HTMLElement &&
        this.el.parentNode &&
        (this.el.parentNode.removeChild(this.el), (this.el = null))
      this._updateStepTargetOnHide()
      this.trigger("destroy")
    }
    getTour() {
      return this.tour
    }
    hide() {
      this.tour.modal.hide()
      this.trigger("before-hide")
      this.el && (this.el.hidden = !0)
      this._updateStepTargetOnHide()
      this.trigger("hide")
    }
    isCentered() {
      let a = Aa(this)
      return !a.element || !a.on
    }
    isOpen() {
      return !(!this.el || this.el.hidden)
    }
    show() {
      if (W(this.options.beforeShowPromise)) {
        let a = this.options.beforeShowPromise()
        if (void 0 !== a) return a.then(() => this._show())
      }
      this._show()
    }
    updateStepOptions(a) {
      Object.assign(this.options, a)
      this.shepherdElementComponent &&
        this.shepherdElementComponent.$set({ step: this })
    }
    getElement() {
      return this.el
    }
    getTarget() {
      return this.target
    }
    _createTooltipContent() {
      this.shepherdElementComponent = new tc({
        target: this.tour.options.stepsContainer || document.body,
        props: {
          classPrefix: this.classPrefix,
          descriptionId: `${this.id}-description`,
          labelId: `${this.id}-label`,
          step: this,
          styles: this.styles,
        },
      })
      return this.shepherdElementComponent.getElement()
    }
    _scrollTo(a) {
      let { element: b } = Aa(this)
      W(this.options.scrollToHandler)
        ? this.options.scrollToHandler(b)
        : b instanceof Element &&
          "function" === typeof b.scrollIntoView &&
          b.scrollIntoView(a)
    }
    _getClassOptions(a) {
      var b =
        this.tour && this.tour.options && this.tour.options.defaultStepOptions
      b = b && b.classes ? b.classes : ""
      a = [...(a.classes ? a.classes : "").split(" "), ...b.split(" ")]
      a = new Set(a)
      return Array.from(a).join(" ").trim()
    }
    _setOptions(a = {}) {
      let b =
        this.tour && this.tour.options && this.tour.options.defaultStepOptions
      b = rc({}, b || {})
      this.options = Object.assign({ arrow: !0 }, b, a)
      let { when: c } = this.options
      this.options.classes = this._getClassOptions(a)
      this.destroy()
      this.id = this.options.id || `step-${Ba()}`
      c &&
        Object.keys(c).forEach((a) => {
          this.on(a, c[a], this)
        })
    }
    _setupElements() {
      void 0 !== this.el && this.destroy()
      this.el = this._createTooltipContent()
      this.options.advanceOn && xb(this)
      {
        this.tooltip && this.tooltip.destroy()
        let a = Aa(this),
          b = a.element,
          c = Nb(a, this)
        this.isCentered() &&
          ((b = document.body),
          this.shepherdElementComponent
            .getElement()
            .classList.add("shepherd-centered"))
        this.tooltip = sc(b, this.el, c)
        this.target = a.element
      }
    }
    _show() {
      this.trigger("before-show")
      this._setupElements()
      this.tour.modal || this.tour._setupModal()
      this.tour.modal.setupForStep(this)
      this._styleTargetElementForStep(this)
      this.el.hidden = !1
      this.options.scrollTo &&
        setTimeout(() => {
          this._scrollTo(this.options.scrollTo)
        })
      this.el.hidden = !1
      let a = this.shepherdElementComponent.getElement(),
        b = this.target || document.body
      b.classList.add(`${this.classPrefix}shepherd-enabled`)
      b.classList.add(`${this.classPrefix}shepherd-target`)
      a.classList.add("shepherd-enabled")
      this.trigger("show")
    }
    _styleTargetElementForStep(a) {
      let b = a.target
      b &&
        (a.options.highlightClass && b.classList.add(a.options.highlightClass),
        !1 === a.options.canClickTarget &&
          b.classList.add("shepherd-target-click-disabled"))
    }
    _updateStepTargetOnHide() {
      let a = this.target || document.body
      this.options.highlightClass &&
        a.classList.remove(this.options.highlightClass)
      a.classList.remove(
        "shepherd-target-click-disabled",
        `${this.classPrefix}shepherd-enabled`,
        `${this.classPrefix}shepherd-target`
      )
    }
  }
  class uc extends K {
    constructor(a) {
      super()
      J(this, a, pc, oc, I, {
        element: 0,
        openingProperties: 4,
        getElement: 5,
        closeModalOpening: 6,
        hide: 7,
        positionModal: 8,
        setupForStep: 9,
        show: 10,
      })
    }
    get getElement() {
      return this.$$.ctx[5]
    }
    get closeModalOpening() {
      return this.$$.ctx[6]
    }
    get hide() {
      return this.$$.ctx[7]
    }
    get positionModal() {
      return this.$$.ctx[8]
    }
    get setupForStep() {
      return this.$$.ctx[9]
    }
    get show() {
      return this.$$.ctx[10]
    }
  }
  let ba = new Ga()
  class vc extends Ga {
    constructor(a = {}) {
      super(a)
      Ka(this)
      this.options = Object.assign(
        {},
        { exitOnEsc: !0, keyboardNavigation: !0 },
        a
      )
      this.classPrefix = $a(this.options.classPrefix)
      this.steps = []
      this.addSteps(this.options.steps)
      "active cancel complete inactive show start".split(" ").map((a) => {
        ;((a) => {
          this.on(a, (b) => {
            b = b || {}
            b.tour = this
            ba.trigger(a, b)
          })
        })(a)
      })
      this._setTourID()
      return this
    }
    addStep(a, b) {
      a instanceof Ha ? (a.tour = this) : (a = new Ha(this, a))
      void 0 !== b ? this.steps.splice(b, 0, a) : this.steps.push(a)
      return a
    }
    addSteps(a) {
      Array.isArray(a) &&
        a.forEach((a) => {
          this.addStep(a)
        })
      return this
    }
    back() {
      let a = this.steps.indexOf(this.currentStep)
      this.show(a - 1, !1)
    }
    cancel() {
      this.options.confirmCancel
        ? window.confirm(
            this.options.confirmCancelMessage ||
              "Are you sure you want to stop the tour?"
          ) && this._done("cancel")
        : this._done("cancel")
    }
    complete() {
      this._done("complete")
    }
    getById(a) {
      return this.steps.find((b) => b.id === a)
    }
    getCurrentStep() {
      return this.currentStep
    }
    hide() {
      let a = this.getCurrentStep()
      if (a) return a.hide()
    }
    isActive() {
      return ba.activeTour === this
    }
    next() {
      let a = this.steps.indexOf(this.currentStep)
      a === this.steps.length - 1 ? this.complete() : this.show(a + 1, !0)
    }
    removeStep(a) {
      let b = this.getCurrentStep()
      this.steps.some((b, d) => {
        if (b.id === a)
          return (
            b.isOpen() && b.hide(), b.destroy(), this.steps.splice(d, 1), !0
          )
      })
      b &&
        b.id === a &&
        ((this.currentStep = void 0),
        this.steps.length ? this.show(0) : this.cancel())
    }
    show(a = 0, b = !0) {
      if ((a = da(a) ? this.getById(a) : this.steps[a]))
        this._updateStateBeforeShow(),
          W(a.options.showOn) && !a.options.showOn()
            ? this._skipStep(a, b)
            : (this.trigger("show", { step: a, previous: this.currentStep }),
              (this.currentStep = a),
              a.show())
    }
    start() {
      this.trigger("start")
      this.focusedElBeforeOpen = document.activeElement
      this.currentStep = null
      this._setupModal()
      this._setupActiveTour()
      this.next()
    }
    _done(a) {
      let b = this.steps.indexOf(this.currentStep)
      Array.isArray(this.steps) && this.steps.forEach((a) => a.destroy())
      mc(this)
      this.trigger(a, { index: b })
      ba.activeTour = null
      this.trigger("inactive", { tour: this })
      this.modal && this.modal.hide()
      ;("cancel" !== a && "complete" !== a) ||
        !this.modal ||
        ((a = document.querySelector(".shepherd-modal-overlay-container")) &&
          a.remove())
      this.focusedElBeforeOpen instanceof HTMLElement &&
        this.focusedElBeforeOpen.focus()
    }
    _setupActiveTour() {
      this.trigger("active", { tour: this })
      ba.activeTour = this
    }
    _setupModal() {
      this.modal = new uc({
        target: this.options.modalContainer || document.body,
        props: { classPrefix: this.classPrefix, styles: this.styles },
      })
    }
    _skipStep(a, b) {
      a = this.steps.indexOf(a)
      this.show(b ? a + 1 : a - 1, b)
    }
    _updateStateBeforeShow() {
      this.currentStep && this.currentStep.hide()
      this.isActive() || this._setupActiveTour()
    }
    _setTourID() {
      this.id = `${this.options.tourName || "tour"}--${Ba()}`
    }
  }
  Object.assign(ba, { Tour: vc, Step: Ha })
  return ba
})
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Backbone, Drupal, settings, document, Shepherd) {
  var queryString = decodeURI(window.location.search)
  Drupal.behaviors.tour = {
    attach: function attach(context) {
      once("tour", "body").forEach(function () {
        var model = new Drupal.tour.models.StateModel()
        new Drupal.tour.views.ToggleTourView({
          el: $(context).find("#toolbar-tab-tour"),
          model: model,
        })
        model.on("change:isActive", function (tourModel, isActive) {
          $(document).trigger(
            isActive ? "drupalTourStarted" : "drupalTourStopped"
          )
        })

        if (settings._tour_internal) {
          model.set("tour", settings._tour_internal)
        }

        if (/tour=?/i.test(queryString)) {
          model.set("isActive", true)
        }
      })
    },
  }
  Drupal.tour = Drupal.tour || {
    models: {},
    views: {},
  }
  Drupal.tour.models.StateModel = Backbone.Model.extend({
    defaults: {
      tour: [],
      isActive: false,
      activeTour: [],
    },
  })
  Drupal.tour.views.ToggleTourView = Backbone.View.extend({
    events: {
      click: "onClick",
    },
    initialize: function initialize() {
      this.listenTo(this.model, "change:tour change:isActive", this.render)
      this.listenTo(this.model, "change:isActive", this.toggleTour)
    },
    render: function render() {
      this.$el.toggleClass("hidden", this._getTour().length === 0)
      var isActive = this.model.get("isActive")
      this.$el
        .find("button")
        .toggleClass("is-active", isActive)
        .attr("aria-pressed", isActive)
      return this
    },
    toggleTour: function toggleTour() {
      if (this.model.get("isActive")) {
        this._removeIrrelevantTourItems(this._getTour())

        var tourItems = this.model.get("tour")
        var that = this

        if (tourItems.length) {
          settings.tourShepherdConfig.defaultStepOptions.popperOptions.modifiers.push(
            {
              name: "moveArrowJoyridePosition",
              enabled: true,
              phase: "write",
              fn: function fn(_ref) {
                var state = _ref.state
                var arrow = state.elements.arrow
                var placement = state.placement

                if (
                  arrow &&
                  /^top|bottom/.test(placement) &&
                  /-start|-end$/.test(placement)
                ) {
                  var horizontalPosition = placement.split("-")[1]
                  var offset =
                    horizontalPosition === "start"
                      ? 28
                      : state.elements.popper.clientWidth - 56
                  arrow.style.transform = "translate3d(".concat(
                    offset,
                    "px, 0px, 0px)"
                  )
                }
              },
            }
          )
          var shepherdTour = new Shepherd.Tour(settings.tourShepherdConfig)
          shepherdTour.on("cancel", function () {
            that.model.set("isActive", false)
          })
          shepherdTour.on("complete", function () {
            that.model.set("isActive", false)
          })
          tourItems.forEach(function (tourStepConfig, index) {
            var tourItemOptions = {
              title: tourStepConfig.title
                ? Drupal.checkPlain(tourStepConfig.title)
                : null,
              text: function text() {
                return Drupal.theme("tourItemContent", tourStepConfig)
              },
              attachTo: tourStepConfig.attachTo,
              buttons: [Drupal.tour.nextButton(shepherdTour, tourStepConfig)],
              classes: tourStepConfig.classes,
              index: index,
            }
            tourItemOptions.when = {
              show: function show() {
                var nextButton =
                  shepherdTour.currentStep.el.querySelector("footer button")
                nextButton.focus()

                if (Drupal.tour.hasOwnProperty("convertToJoyrideMarkup")) {
                  Drupal.tour.convertToJoyrideMarkup(shepherdTour)
                }
              },
            }
            shepherdTour.addStep(tourItemOptions)
          })
          shepherdTour.start()
          this.model.set({
            isActive: true,
            activeTour: shepherdTour,
          })
        }
      } else {
        this.model.get("activeTour").cancel()
        this.model.set({
          isActive: false,
          activeTour: [],
        })
      }
    },
    onClick: function onClick(event) {
      this.model.set("isActive", !this.model.get("isActive"))
      event.preventDefault()
      event.stopPropagation()
    },
    _getTour: function _getTour() {
      return this.model.get("tour")
    },
    _removeIrrelevantTourItems: function _removeIrrelevantTourItems(tourItems) {
      var tips = /tips=([^&]+)/.exec(queryString)
      var filteredTour = tourItems.filter(function (tourItem) {
        if (
          tips &&
          tourItem.hasOwnProperty("classes") &&
          tourItem.classes.indexOf(tips[1]) === -1
        ) {
          return false
        }

        return !(
          tourItem.selector && !document.querySelector(tourItem.selector)
        )
      })

      if (tourItems.length !== filteredTour.length) {
        filteredTour.forEach(function (filteredTourItem, filteredTourItemId) {
          filteredTour[filteredTourItemId].counter = Drupal.t(
            "!tour_item of !total",
            {
              "!tour_item": filteredTourItemId + 1,
              "!total": filteredTour.length,
            }
          )

          if (filteredTourItemId === filteredTour.length - 1) {
            filteredTour[filteredTourItemId].cancelText = Drupal.t("End tour")
          }
        })
        this.model.set("tour", filteredTour)
      }
    },
  })

  Drupal.tour.nextButton = function (shepherdTour, tourStepConfig) {
    return {
      classes: "button button--primary",
      text: tourStepConfig.cancelText
        ? tourStepConfig.cancelText
        : Drupal.t("Next"),
      action: tourStepConfig.cancelText
        ? shepherdTour.cancel
        : shepherdTour.next,
    }
  }

  Drupal.theme.tourItemContent = function (tourStepConfig) {
    return ""
      .concat(tourStepConfig.body, '<div class="tour-progress">')
      .concat(tourStepConfig.counter, "</div>")
  }
})(jQuery, Backbone, Drupal, drupalSettings, document, window.Shepherd)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) ||
    _iterableToArray(arr) ||
    _unsupportedIterableToArray(arr) ||
    _nonIterableSpread()
  )
}

function _nonIterableSpread() {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  )
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return
  if (typeof o === "string") return _arrayLikeToArray(o, minLen)
  var n = Object.prototype.toString.call(o).slice(8, -1)
  if (n === "Object" && o.constructor) n = o.constructor.name
  if (n === "Map" || n === "Set") return Array.from(o)
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen)
}

function _iterableToArray(iter) {
  if (
    (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
    iter["@@iterator"] != null
  )
    return Array.from(iter)
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr)
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i]
  }
  return arr2
}

;(function ($, Drupal, _ref) {
  var tabbable = _ref.tabbable,
    isTabbable = _ref.isTabbable

  function TabbingManager() {
    this.stack = []
  }

  function TabbingContext(options) {
    $.extend(
      this,
      {
        level: null,
        $tabbableElements: $(),
        $disabledElements: $(),
        released: false,
        active: false,
        trapFocus: false,
      },
      options
    )
  }

  $.extend(TabbingManager.prototype, {
    constrain: function constrain(elements) {
      var _ref2 =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {},
        _ref2$trapFocus = _ref2.trapFocus,
        trapFocus = _ref2$trapFocus === void 0 ? false : _ref2$trapFocus

      var il = this.stack.length

      for (var i = 0; i < il; i++) {
        this.stack[i].deactivate()
      }

      var tabbableElements = []
      $(elements).each(function (index, rootElement) {
        tabbableElements = [].concat(
          _toConsumableArray(tabbableElements),
          _toConsumableArray(tabbable(rootElement))
        )

        if (isTabbable(rootElement)) {
          tabbableElements = [].concat(_toConsumableArray(tabbableElements), [
            rootElement,
          ])
        }
      })
      var tabbingContext = new TabbingContext({
        level: this.stack.length,
        $tabbableElements: $(tabbableElements),
        trapFocus: trapFocus,
      })
      this.stack.push(tabbingContext)
      tabbingContext.activate()
      $(document).trigger("drupalTabbingConstrained", tabbingContext)
      return tabbingContext
    },
    release: function release() {
      var toActivate = this.stack.length - 1

      while (toActivate >= 0 && this.stack[toActivate].released) {
        toActivate--
      }

      this.stack.splice(toActivate + 1)

      if (toActivate >= 0) {
        this.stack[toActivate].activate()
      }
    },
    activate: function activate(tabbingContext) {
      var $set = tabbingContext.$tabbableElements
      var level = tabbingContext.level
      var $disabledSet = $(tabbable(document.body)).not($set)
      tabbingContext.$disabledElements = $disabledSet
      var il = $disabledSet.length

      for (var i = 0; i < il; i++) {
        this.recordTabindex($disabledSet.eq(i), level)
      }

      $disabledSet.prop("tabindex", -1).prop("autofocus", false)
      var $hasFocus = $set.filter("[autofocus]").eq(-1)

      if ($hasFocus.length === 0) {
        $hasFocus = $set.eq(0)
      }

      $hasFocus.trigger("focus")

      if ($set.length && tabbingContext.trapFocus) {
        $set.last().on("keydown.focus-trap", function (event) {
          if (event.key === "Tab" && !event.shiftKey) {
            event.preventDefault()
            $set.first().focus()
          }
        })
        $set.first().on("keydown.focus-trap", function (event) {
          if (event.key === "Tab" && event.shiftKey) {
            event.preventDefault()
            $set.last().focus()
          }
        })
      }
    },
    deactivate: function deactivate(tabbingContext) {
      var $set = tabbingContext.$disabledElements
      var level = tabbingContext.level
      var il = $set.length
      tabbingContext.$tabbableElements.first().off("keydown.focus-trap")
      tabbingContext.$tabbableElements.last().off("keydown.focus-trap")

      for (var i = 0; i < il; i++) {
        this.restoreTabindex($set.eq(i), level)
      }
    },
    recordTabindex: function recordTabindex($el, level) {
      var tabInfo = $el.data("drupalOriginalTabIndices") || {}
      tabInfo[level] = {
        tabindex: $el[0].getAttribute("tabindex"),
        autofocus: $el[0].hasAttribute("autofocus"),
      }
      $el.data("drupalOriginalTabIndices", tabInfo)
    },
    restoreTabindex: function restoreTabindex($el, level) {
      var tabInfo = $el.data("drupalOriginalTabIndices")

      if (tabInfo && tabInfo[level]) {
        var data = tabInfo[level]

        if (data.tabindex) {
          $el[0].setAttribute("tabindex", data.tabindex)
        } else {
          $el[0].removeAttribute("tabindex")
        }

        if (data.autofocus) {
          $el[0].setAttribute("autofocus", "autofocus")
        }

        if (level === 0) {
          $el.removeData("drupalOriginalTabIndices")
        } else {
          var levelToDelete = level

          while (tabInfo.hasOwnProperty(levelToDelete)) {
            delete tabInfo[levelToDelete]
            levelToDelete++
          }

          $el.data("drupalOriginalTabIndices", tabInfo)
        }
      }
    },
  })
  $.extend(TabbingContext.prototype, {
    release: function release() {
      if (!this.released) {
        this.deactivate()
        this.released = true
        Drupal.tabbingManager.release(this)
        $(document).trigger("drupalTabbingContextReleased", this)
      }
    },
    activate: function activate() {
      if (!this.active && !this.released) {
        this.active = true
        Drupal.tabbingManager.activate(this)
        $(document).trigger("drupalTabbingContextActivated", this)
      }
    },
    deactivate: function deactivate() {
      if (this.active) {
        this.active = false
        Drupal.tabbingManager.deactivate(this)
        $(document).trigger("drupalTabbingContextDeactivated", this)
      }
    },
  })

  if (Drupal.tabbingManager) {
    return
  }

  Drupal.tabbingManager = new TabbingManager()
})(jQuery, Drupal, window.tabbable)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, Backbone) {
  var strings = {
    tabbingReleased: Drupal.t(
      "Tabbing is no longer constrained by the Contextual module."
    ),
    tabbingConstrained: Drupal.t(
      "Tabbing is constrained to a set of @contextualsCount and the edit mode toggle."
    ),
    pressEsc: Drupal.t("Press the esc key to exit."),
  }

  function initContextualToolbar(context) {
    if (!Drupal.contextual || !Drupal.contextual.collection) {
      return
    }

    var contextualToolbar = Drupal.contextualToolbar
    contextualToolbar.model = new contextualToolbar.StateModel(
      {
        isViewing:
          localStorage.getItem("Drupal.contextualToolbar.isViewing") !==
          "false",
      },
      {
        contextualCollection: Drupal.contextual.collection,
      }
    )
    var viewOptions = {
      el: $(".toolbar .toolbar-bar .contextual-toolbar-tab"),
      model: contextualToolbar.model,
      strings: strings,
    }
    new contextualToolbar.VisualView(viewOptions)
    new contextualToolbar.AuralView(viewOptions)
  }

  Drupal.behaviors.contextualToolbar = {
    attach: function attach(context) {
      if (once("contextualToolbar-init", "body").length) {
        initContextualToolbar(context)
      }
    },
  }
  Drupal.contextualToolbar = {
    model: null,
  }
})(jQuery, Drupal, Backbone)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function (Drupal, Backbone) {
  Drupal.contextualToolbar.StateModel = Backbone.Model.extend({
    defaults: {
      isViewing: true,
      isVisible: false,
      contextualCount: 0,
      tabbingContext: null,
    },
    initialize: function initialize(attrs, options) {
      this.listenTo(
        options.contextualCollection,
        "reset remove add",
        this.countContextualLinks
      )
      this.listenTo(
        options.contextualCollection,
        "add",
        this.lockNewContextualLinks
      )
      this.listenTo(this, "change:contextualCount", this.updateVisibility)
      this.listenTo(this, "change:isViewing", function (model, isViewing) {
        options.contextualCollection.each(function (contextualModel) {
          contextualModel.set("isLocked", !isViewing)
        })
      })
    },
    countContextualLinks: function countContextualLinks(
      contextualModel,
      contextualCollection
    ) {
      this.set("contextualCount", contextualCollection.length)
    },
    lockNewContextualLinks: function lockNewContextualLinks(
      contextualModel,
      contextualCollection
    ) {
      if (!this.get("isViewing")) {
        contextualModel.set("isLocked", true)
      }
    },
    updateVisibility: function updateVisibility() {
      this.set("isVisible", this.get("contextualCount") > 0)
    },
  })
})(Drupal, Backbone)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, Backbone, _) {
  Drupal.contextualToolbar.AuralView = Backbone.View.extend({
    announcedOnce: false,
    initialize: function initialize(options) {
      this.options = options
      this.listenTo(this.model, "change", this.render)
      this.listenTo(this.model, "change:isViewing", this.manageTabbing)
      $(document).on("keyup", _.bind(this.onKeypress, this))
      this.manageTabbing()
    },
    render: function render() {
      this.$el.find("button").attr("aria-pressed", !this.model.get("isViewing"))
      return this
    },
    manageTabbing: function manageTabbing() {
      var tabbingContext = this.model.get("tabbingContext")

      if (tabbingContext) {
        if (tabbingContext.active) {
          Drupal.announce(this.options.strings.tabbingReleased)
        }

        tabbingContext.release()
      }

      if (!this.model.get("isViewing")) {
        tabbingContext = Drupal.tabbingManager.constrain(
          $(".contextual-toolbar-tab, .contextual")
        )
        this.model.set("tabbingContext", tabbingContext)
        this.announceTabbingConstraint()
        this.announcedOnce = true
      }
    },
    announceTabbingConstraint: function announceTabbingConstraint() {
      var strings = this.options.strings
      Drupal.announce(
        Drupal.formatString(strings.tabbingConstrained, {
          "@contextualsCount": Drupal.formatPlural(
            Drupal.contextual.collection.length,
            "@count contextual link",
            "@count contextual links"
          ),
        })
      )
      Drupal.announce(strings.pressEsc)
    },
    onKeypress: function onKeypress(event) {
      if (
        !this.announcedOnce &&
        event.keyCode === 9 &&
        !this.model.get("isViewing")
      ) {
        this.announceTabbingConstraint()
        this.announcedOnce = true
      }

      if (event.keyCode === 27) {
        this.model.set("isViewing", true)
      }
    },
  })
})(jQuery, Drupal, Backbone, _)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function (Drupal, Backbone) {
  Drupal.contextualToolbar.VisualView = Backbone.View.extend({
    events: function events() {
      var touchEndToClick = function touchEndToClick(event) {
        event.preventDefault()
        event.target.click()
      }

      return {
        click: function click() {
          this.model.set("isViewing", !this.model.get("isViewing"))
        },
        touchend: touchEndToClick,
      }
    },
    initialize: function initialize() {
      this.listenTo(this.model, "change", this.render)
      this.listenTo(this.model, "change:isViewing", this.persist)
    },
    render: function render() {
      this.$el.toggleClass("hidden", !this.model.get("isVisible"))
      this.$el
        .find("button")
        .toggleClass("is-active", !this.model.get("isViewing"))
      return this
    },
    persist: function persist(model, isViewing) {
      if (!isViewing) {
        localStorage.setItem("Drupal.contextualToolbar.isViewing", "false")
      } else {
        localStorage.removeItem("Drupal.contextualToolbar.isViewing")
      }
    },
  })
})(Drupal, Backbone)
;(function ($, Drupal) {
  Drupal.behaviors.adminToolbar = {
    attach: function (context, settings) {
      $("a.toolbar-icon", context).removeAttr("title")

      // Make the toolbar menu navigable with keyboard.
      $("ul.toolbar-menu li.menu-item--expanded a", context).on(
        "focusin",
        function () {
          $("li.menu-item--expanded", context).removeClass("hover-intent")
          $(this).parents("li.menu-item--expanded").addClass("hover-intent")
        }
      )

      $("ul.toolbar-menu li.menu-item a", context).keydown(function (e) {
        if (e.shiftKey && (e.keyCode || e.which) == 9) {
          if (
            $(this).parent(".menu-item").prev().hasClass("menu-item--expanded")
          ) {
            $(this).parent(".menu-item").prev().addClass("hover-intent")
          }
        }
      })

      $(
        ".toolbar-menu:first-child > .menu-item:not(.menu-item--expanded) a, .toolbar-tab > a",
        context
      ).on("focusin", function () {
        $(".menu-item--expanded").removeClass("hover-intent")
      })

      $(".toolbar-menu:first-child > .menu-item", context).on(
        "hover",
        function () {
          $(this, "a").css("background: #fff;")
        }
      )

      $("ul:not(.toolbar-menu)", context).on({
        mousemove: function () {
          $("li.menu-item--expanded").removeClass("hover-intent")
        },
        hover: function () {
          $("li.menu-item--expanded").removeClass("hover-intent")
        },
      })

      // Always hide the dropdown menu on mobile.
      if (
        $(
          "body:not(.toolbar-fixed) #toolbar-item-administration-tray"
        ).hasClass("toolbar-tray-vertical")
      ) {
        $("#toolbar-item-administration").removeClass("is-active")
        $("#toolbar-item-administration-tray").removeClass("is-active")
      }
    },
  }
})(jQuery, Drupal)
/*!
 * hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */
/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */ ;(function (factory) {
  "use strict"
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory)
  } else if (jQuery && !jQuery.fn.hoverIntent) {
    factory(jQuery)
  }
})(function ($) {
  "use strict"

  // default configuration values
  var _cfg = {
    interval: 100,
    sensitivity: 6,
    timeout: 0,
  }

  // counter used to generate an ID for each instance
  var INSTANCE_COUNT = 0

  // current X and Y position of mouse, updated during mousemove tracking (shared across instances)
  var cX, cY

  // saves the current pointer position coordinates based on the given mousemove event
  var track = function (ev) {
    cX = ev.pageX
    cY = ev.pageY
  }

  // compares current and previous mouse positions
  var compare = function (ev, $el, s, cfg) {
    // compare mouse positions to see if pointer has slowed enough to trigger `over` function
    if (
      Math.sqrt((s.pX - cX) * (s.pX - cX) + (s.pY - cY) * (s.pY - cY)) <
      cfg.sensitivity
    ) {
      $el.off(s.event, track)
      delete s.timeoutId
      // set hoverIntent state as active for this element (permits `out` handler to trigger)
      s.isActive = true
      // overwrite old mouseenter event coordinates with most recent pointer position
      ev.pageX = cX
      ev.pageY = cY
      // clear coordinate data from state object
      delete s.pX
      delete s.pY
      return cfg.over.apply($el[0], [ev])
    } else {
      // set previous coordinates for next comparison
      s.pX = cX
      s.pY = cY
      // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
      s.timeoutId = setTimeout(function () {
        compare(ev, $el, s, cfg)
      }, cfg.interval)
    }
  }

  // triggers given `out` function at configured `timeout` after a mouseleave and clears state
  var delay = function (ev, $el, s, out) {
    delete $el.data("hoverIntent")[s.id]
    return out.apply($el[0], [ev])
  }

  $.fn.hoverIntent = function (handlerIn, handlerOut, selector) {
    // instance ID, used as a key to store and retrieve state information on an element
    var instanceId = INSTANCE_COUNT++

    // extend the default configuration and parse parameters
    var cfg = $.extend({}, _cfg)
    if ($.isPlainObject(handlerIn)) {
      cfg = $.extend(cfg, handlerIn)
      if (!$.isFunction(cfg.out)) {
        cfg.out = cfg.over
      }
    } else if ($.isFunction(handlerOut)) {
      cfg = $.extend(cfg, {
        over: handlerIn,
        out: handlerOut,
        selector: selector,
      })
    } else {
      cfg = $.extend(cfg, {
        over: handlerIn,
        out: handlerIn,
        selector: handlerOut,
      })
    }

    // A private function for handling mouse 'hovering'
    var handleHover = function (e) {
      // cloned event to pass to handlers (copy required for event object to be passed in IE)
      var ev = $.extend({}, e)

      // the current target of the mouse event, wrapped in a jQuery object
      var $el = $(this)

      // read hoverIntent data from element (or initialize if not present)
      var hoverIntentData = $el.data("hoverIntent")
      if (!hoverIntentData) {
        $el.data("hoverIntent", (hoverIntentData = {}))
      }

      // read per-instance state from element (or initialize if not present)
      var state = hoverIntentData[instanceId]
      if (!state) {
        hoverIntentData[instanceId] = state = { id: instanceId }
      }

      // state properties:
      // id = instance ID, used to clean up data
      // timeoutId = timeout ID, reused for tracking mouse position and delaying "out" handler
      // isActive = plugin state, true after `over` is called just until `out` is called
      // pX, pY = previously-measured pointer coordinates, updated at each polling interval
      // event = string representing the namespaced event used for mouse tracking

      // clear any existing timeout
      if (state.timeoutId) {
        state.timeoutId = clearTimeout(state.timeoutId)
      }

      // namespaced event used to register and unregister mousemove tracking
      var mousemove = (state.event =
        "mousemove.hoverIntent.hoverIntent" + instanceId)

      // handle the event, based on its type
      if (e.type === "mouseenter") {
        // do nothing if already active
        if (state.isActive) {
          return
        }
        // set "previous" X and Y position based on initial entry point
        state.pX = ev.pageX
        state.pY = ev.pageY
        // update "current" X and Y position based on mousemove
        $el.off(mousemove, track).on(mousemove, track)
        // start polling interval (self-calling timeout) to compare mouse coordinates over time
        state.timeoutId = setTimeout(function () {
          compare(ev, $el, state, cfg)
        }, cfg.interval)
      } else {
        // "mouseleave"
        // do nothing if not already active
        if (!state.isActive) {
          return
        }
        // unbind expensive mousemove event
        $el.off(mousemove, track)
        // if hoverIntent state is true, then call the mouseOut function after the specified delay
        state.timeoutId = setTimeout(function () {
          delay(ev, $el, state, cfg.out)
        }, cfg.timeout)
      }
    }

    // listen for mouseenter and mouseleave
    return this.on(
      {
        "mouseenter.hoverIntent": handleHover,
        "mouseleave.hoverIntent": handleHover,
      },
      cfg.selector
    )
  }
})
;(function ($) {
  $(document).ready(function () {
    $(
      ".toolbar-tray-horizontal li.menu-item--expanded, .toolbar-tray-horizontal ul li.menu-item--expanded .menu-item"
    ).hoverIntent({
      over: function () {
        // At the current depth, we should delete all "hover-intent" classes.
        // Other wise we get unwanted behaviour where menu items are expanded while already in hovering other ones.
        $(this).parent().find("li").removeClass("hover-intent")
        $(this).addClass("hover-intent")
      },
      out: function () {
        $(this).removeClass("hover-intent")
      },
      timeout: 250,
    })
  })
})(jQuery)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function ($, Drupal, drupalSettings) {
  var pathInfo = drupalSettings.path
  var escapeAdminPath = sessionStorage.getItem("escapeAdminPath")
  var windowLocation = window.location

  if (
    !pathInfo.currentPathIsAdmin &&
    !/destination=/.test(windowLocation.search)
  ) {
    sessionStorage.setItem("escapeAdminPath", windowLocation)
  }

  Drupal.behaviors.escapeAdmin = {
    attach: function attach() {
      var toolbarEscape = once("escapeAdmin", "[data-toolbar-escape-admin]")

      if (toolbarEscape.length && pathInfo.currentPathIsAdmin) {
        var $toolbarEscape = $(toolbarEscape)

        if (escapeAdminPath !== null) {
          $toolbarEscape.attr("href", escapeAdminPath)
        } else {
          $toolbarEscape.text(Drupal.t("Home"))
        }
      }
    },
  }
})(jQuery, Drupal, drupalSettings)
/**
 * DO NOT EDIT THIS FILE.
 * See the following change record for more information,
 * https://www.drupal.org/node/2815083
 * @preserve
 **/

;(function (Drupal, drupalSettings) {
  function mapTextContentToAjaxResponse(content) {
    if (content === "") {
      return false
    }

    try {
      return JSON.parse(content)
    } catch (e) {
      return false
    }
  }

  function bigPipeProcessPlaceholderReplacement(placeholderReplacement) {
    var placeholderId = placeholderReplacement.getAttribute(
      "data-big-pipe-replacement-for-placeholder-with-id"
    )
    var content = placeholderReplacement.textContent.trim()

    if (
      typeof drupalSettings.bigPipePlaceholderIds[placeholderId] !== "undefined"
    ) {
      var response = mapTextContentToAjaxResponse(content)

      if (response === false) {
        once.remove("big-pipe", placeholderReplacement)
      } else {
        var ajaxObject = Drupal.ajax({
          url: "",
          base: false,
          element: false,
          progress: false,
        })
        ajaxObject.success(response, "success")
      }
    }
  }

  var interval = drupalSettings.bigPipeInterval || 50
  var timeoutID

  function bigPipeProcessDocument(context) {
    if (!context.querySelector('script[data-big-pipe-event="start"]')) {
      return false
    }

    once(
      "big-pipe",
      "script[data-big-pipe-replacement-for-placeholder-with-id]",
      context
    ).forEach(bigPipeProcessPlaceholderReplacement)

    if (context.querySelector('script[data-big-pipe-event="stop"]')) {
      if (timeoutID) {
        clearTimeout(timeoutID)
      }

      return true
    }

    return false
  }

  function bigPipeProcess() {
    timeoutID = setTimeout(function () {
      if (!bigPipeProcessDocument(document)) {
        bigPipeProcess()
      }
    }, interval)
  }

  bigPipeProcess()
  window.addEventListener("load", function () {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    bigPipeProcessDocument(document)
  })
})(Drupal, drupalSettings)
