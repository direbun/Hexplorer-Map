var Qf = { exports: {} }, uu = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uc;
function Pc() {
  if (uc) return uu;
  uc = 1;
  var R = Symbol.for("react.transitional.element"), P = Symbol.for("react.fragment");
  function s(N, S, Z) {
    var K = null;
    if (Z !== void 0 && (K = "" + Z), S.key !== void 0 && (K = "" + S.key), "key" in S) {
      Z = {};
      for (var tn in S)
        tn !== "key" && (Z[tn] = S[tn]);
    } else Z = S;
    return S = Z.ref, {
      $$typeof: R,
      type: N,
      key: K,
      ref: S !== void 0 ? S : null,
      props: Z
    };
  }
  return uu.Fragment = P, uu.jsx = s, uu.jsxs = s, uu;
}
var fc;
function Mc() {
  return fc || (fc = 1, Qf.exports = Pc()), Qf.exports;
}
var Ee = Mc(), xi = {}, fu = {}, Vf = { exports: {} }, j = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cc;
function Cc() {
  if (cc) return j;
  cc = 1;
  var R = Symbol.for("react.transitional.element"), P = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), Z = Symbol.for("react.consumer"), K = Symbol.for("react.context"), tn = Symbol.for("react.forward_ref"), an = Symbol.for("react.suspense"), fn = Symbol.for("react.memo"), F = Symbol.for("react.lazy"), M = Symbol.for("react.activity"), V = Symbol.for("react.view_transition"), $ = Symbol.iterator;
  function vn(T) {
    return T === null || typeof T != "object" ? null : (T = $ && T[$] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var Ne = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, rl = Object.assign, Nl = {};
  function Ce(T, I, X) {
    this.props = T, this.context = I, this.refs = Nl, this.updater = X || Ne;
  }
  Ce.prototype.isReactComponent = {}, Ce.prototype.setState = function(T, I) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, I, "setState");
  }, Ce.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function we() {
  }
  we.prototype = Ce.prototype;
  function dn(T, I, X) {
    this.props = T, this.context = I, this.refs = Nl, this.updater = X || Ne;
  }
  var Kn = dn.prototype = new we();
  Kn.constructor = dn, rl(Kn, Ce.prototype), Kn.isPureReactComponent = !0;
  var Pn = Array.isArray;
  function Sr() {
  }
  var en = { H: null, A: null, T: null, S: null }, qr = Object.prototype.hasOwnProperty;
  function te(T, I, X) {
    var z = X.ref;
    return {
      $$typeof: R,
      type: T,
      key: I,
      ref: z !== void 0 ? z : null,
      props: X
    };
  }
  function Mn(T, I) {
    return te(T.type, I, T.props);
  }
  function ml(T) {
    return typeof T == "object" && T !== null && T.$$typeof === R;
  }
  function Mi(T) {
    var I = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(X) {
      return I[X];
    });
  }
  var _t = /\/+/g;
  function ql(T, I) {
    return typeof T == "object" && T !== null && T.key != null ? Mi("" + T.key) : I.toString(36);
  }
  function Ae(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(Sr, Sr) : (T.status = "pending", T.then(
          function(I) {
            T.status === "pending" && (T.status = "fulfilled", T.value = I);
          },
          function(I) {
            T.status === "pending" && (T.status = "rejected", T.reason = I);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function ee(T, I, X, z, q) {
    var on = typeof T;
    (on === "undefined" || on === "boolean") && (T = null);
    var bn = !1;
    if (T === null) bn = !0;
    else
      switch (on) {
        case "bigint":
        case "string":
        case "number":
          bn = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case R:
            case P:
              bn = !0;
              break;
            case F:
              return bn = T._init, ee(
                bn(T._payload),
                I,
                X,
                z,
                q
              );
          }
      }
    if (bn)
      return q = q(T), bn = z === "" ? "." + ql(T, 0) : z, Pn(q) ? (X = "", bn != null && (X = bn.replace(_t, "$&/") + "/"), ee(q, I, X, "", function(ie) {
        return ie;
      })) : q != null && (ml(q) && (q = Mn(
        q,
        X + (q.key == null || T && T.key === q.key ? "" : ("" + q.key).replace(
          _t,
          "$&/"
        ) + "/") + bn
      )), I.push(q)), 1;
    bn = 0;
    var ke = z === "" ? "." : z + ":";
    if (Pn(T))
      for (var xe = 0; xe < T.length; xe++)
        z = T[xe], on = ke + ql(z, xe), bn += ee(
          z,
          I,
          X,
          on,
          q
        );
    else if (xe = vn(T), typeof xe == "function")
      for (T = xe.call(T), xe = 0; !(z = T.next()).done; )
        z = z.value, on = ke + ql(z, xe++), bn += ee(
          z,
          I,
          X,
          on,
          q
        );
    else if (on === "object") {
      if (typeof T.then == "function")
        return ee(
          Ae(T),
          I,
          X,
          z,
          q
        );
      throw I = String(T), Error(
        "Objects are not valid as a React child (found: " + (I === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : I) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return bn;
  }
  function C(T, I, X) {
    if (T == null) return T;
    var z = [], q = 0;
    return ee(T, z, "", "", function(on) {
      return I.call(X, on, q++);
    }), z;
  }
  function Q(T) {
    if (T._status === -1) {
      var I = T._result, X = I();
      X.then(
        function(z) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = z, X.status === void 0 && (X.status = "fulfilled", X.value = z));
        },
        function(z) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = z, X.status === void 0 && (X.status = "rejected", X.reason = z));
        }
      ), T._status === -1 && (T._status = 0, T._result = X);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var jr = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var I = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(I)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  };
  function Ft(T) {
    var I = en.T, X = {};
    X.types = I !== null ? I.types : null, en.T = X;
    try {
      var z = T(), q = en.S;
      q !== null && q(X, z), typeof z == "object" && z !== null && typeof z.then == "function" && z.then(Sr, jr);
    } catch (on) {
      jr(on);
    } finally {
      I !== null && X.types !== null && (I.types = X.types), en.T = I;
    }
  }
  function D(T) {
    var I = en.T;
    if (I !== null) {
      var X = I.types;
      X === null ? I.types = [T] : X.indexOf(T) === -1 && X.push(T);
    } else Ft(D.bind(null, T));
  }
  var A = {
    map: C,
    forEach: function(T, I, X) {
      C(
        T,
        function() {
          I.apply(this, arguments);
        },
        X
      );
    },
    count: function(T) {
      var I = 0;
      return C(T, function() {
        I++;
      }), I;
    },
    toArray: function(T) {
      return C(T, function(I) {
        return I;
      }) || [];
    },
    only: function(T) {
      if (!ml(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  };
  return j.Activity = M, j.Children = A, j.Component = Ce, j.Fragment = s, j.Profiler = S, j.PureComponent = dn, j.StrictMode = N, j.Suspense = an, j.ViewTransition = V, j.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = en, j.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return en.H.useMemoCache(T);
    }
  }, j.addTransitionType = D, j.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, j.cacheSignal = function() {
    return null;
  }, j.cloneElement = function(T, I, X) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var z = rl({}, T.props), q = T.key;
    if (I != null)
      for (on in I.key !== void 0 && (q = "" + I.key), I)
        !qr.call(I, on) || on === "key" || on === "__self" || on === "__source" || on === "ref" && I.ref === void 0 || (z[on] = I[on]);
    var on = arguments.length - 2;
    if (on === 1) z.children = X;
    else if (1 < on) {
      for (var bn = Array(on), ke = 0; ke < on; ke++)
        bn[ke] = arguments[ke + 2];
      z.children = bn;
    }
    return te(T.type, q, z);
  }, j.createContext = function(T) {
    return T = {
      $$typeof: K,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: Z,
      _context: T
    }, T;
  }, j.createElement = function(T, I, X) {
    var z, q = {}, on = null;
    if (I != null)
      for (z in I.key !== void 0 && (on = "" + I.key), I)
        qr.call(I, z) && z !== "key" && z !== "__self" && z !== "__source" && (q[z] = I[z]);
    var bn = arguments.length - 2;
    if (bn === 1) q.children = X;
    else if (1 < bn) {
      for (var ke = Array(bn), xe = 0; xe < bn; xe++)
        ke[xe] = arguments[xe + 2];
      q.children = ke;
    }
    if (T && T.defaultProps)
      for (z in bn = T.defaultProps, bn)
        q[z] === void 0 && (q[z] = bn[z]);
    return te(T, on, q);
  }, j.createRef = function() {
    return { current: null };
  }, j.forwardRef = function(T) {
    return { $$typeof: tn, render: T };
  }, j.isValidElement = ml, j.lazy = function(T) {
    return {
      $$typeof: F,
      _payload: { _status: -1, _result: T },
      _init: Q
    };
  }, j.memo = function(T, I) {
    return {
      $$typeof: fn,
      type: T,
      compare: I === void 0 ? null : I
    };
  }, j.startTransition = Ft, j.unstable_useCacheRefresh = function() {
    return en.H.useCacheRefresh();
  }, j.use = function(T) {
    return en.H.use(T);
  }, j.useActionState = function(T, I, X) {
    return en.H.useActionState(T, I, X);
  }, j.useCallback = function(T, I) {
    return en.H.useCallback(T, I);
  }, j.useContext = function(T) {
    return en.H.useContext(T);
  }, j.useDebugValue = function() {
  }, j.useDeferredValue = function(T, I) {
    return en.H.useDeferredValue(T, I);
  }, j.useEffect = function(T, I) {
    return en.H.useEffect(T, I);
  }, j.useEffectEvent = function(T) {
    return en.H.useEffectEvent(T);
  }, j.useId = function() {
    return en.H.useId();
  }, j.useImperativeHandle = function(T, I, X) {
    return en.H.useImperativeHandle(T, I, X);
  }, j.useInsertionEffect = function(T, I) {
    return en.H.useInsertionEffect(T, I);
  }, j.useLayoutEffect = function(T, I) {
    return en.H.useLayoutEffect(T, I);
  }, j.useMemo = function(T, I) {
    return en.H.useMemo(T, I);
  }, j.useOptimistic = function(T, I) {
    return en.H.useOptimistic(T, I);
  }, j.useReducer = function(T, I, X) {
    return en.H.useReducer(T, I, X);
  }, j.useRef = function(T) {
    return en.H.useRef(T);
  }, j.useState = function(T) {
    return en.H.useState(T);
  }, j.useSyncExternalStore = function(T, I, X) {
    return en.H.useSyncExternalStore(
      T,
      I,
      X
    );
  }, j.useTransition = function() {
    return en.H.useTransition();
  }, j.version = "19.3.0", j;
}
var oc;
function qf() {
  return oc || (oc = 1, Vf.exports = Cc()), Vf.exports;
}
var Jf = { exports: {} }, Le = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hc;
function Ac() {
  if (hc) return Le;
  hc = 1;
  var R = qf();
  function P(F) {
    var M = "https://react.dev/errors/" + F;
    if (1 < arguments.length) {
      M += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var V = 2; V < arguments.length; V++)
        M += "&args[]=" + encodeURIComponent(arguments[V]);
    }
    return "Minified React error #" + F + "; visit " + M + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s() {
  }
  var N = {
    d: {
      f: s,
      r: function() {
        throw Error(P(522));
      },
      D: s,
      C: s,
      L: s,
      m: s,
      X: s,
      S: s,
      M: s
    },
    p: 0,
    findDOMNode: null
  }, S = Symbol.for("react.portal"), Z = Symbol.for("react.recoverable"), K = Symbol.for("react.optimistic_key");
  function tn(F, M, V) {
    var $ = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: S,
      key: $ == null ? null : $ === K ? K : "" + $,
      children: F,
      containerInfo: M,
      implementation: V
    };
  }
  var an = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function fn(F, M) {
    if (F === "font") return "";
    if (typeof M == "string")
      return M === "use-credentials" ? M : "";
  }
  return Le.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = N, Le.browser = function(F) {
    return { $$typeof: Z, _reason: F };
  }, Le.createPortal = function(F, M) {
    var V = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!M || M.nodeType !== 1 && M.nodeType !== 9 && M.nodeType !== 11)
      throw Error(P(299));
    return tn(F, M, null, V);
  }, Le.flushSync = function(F) {
    var M = an.T, V = N.p;
    try {
      if (an.T = null, N.p = 2, F) return F();
    } finally {
      an.T = M, N.p = V, N.d.f();
    }
  }, Le.preconnect = function(F, M) {
    typeof F == "string" && (M ? (M = M.crossOrigin, M = typeof M == "string" ? M === "use-credentials" ? M : "" : void 0) : M = null, N.d.C(F, M));
  }, Le.prefetchDNS = function(F) {
    typeof F == "string" && N.d.D(F);
  }, Le.preinit = function(F, M) {
    if (typeof F == "string" && M && typeof M.as == "string") {
      var V = M.as, $ = fn(V, M.crossOrigin), vn = typeof M.integrity == "string" ? M.integrity : void 0, Ne = typeof M.fetchPriority == "string" ? M.fetchPriority : void 0;
      V === "style" ? N.d.S(
        F,
        typeof M.precedence == "string" ? M.precedence : void 0,
        {
          crossOrigin: $,
          integrity: vn,
          fetchPriority: Ne
        }
      ) : V === "script" && N.d.X(F, {
        crossOrigin: $,
        integrity: vn,
        fetchPriority: Ne,
        nonce: typeof M.nonce == "string" ? M.nonce : void 0
      });
    }
  }, Le.preinitModule = function(F, M) {
    if (typeof F == "string")
      if (typeof M == "object" && M !== null) {
        if (M.as == null || M.as === "script") {
          var V = fn(
            M.as,
            M.crossOrigin
          );
          N.d.M(F, {
            crossOrigin: V,
            integrity: typeof M.integrity == "string" ? M.integrity : void 0,
            nonce: typeof M.nonce == "string" ? M.nonce : void 0,
            fetchPriority: typeof M.fetchPriority == "string" ? M.fetchPriority : void 0
          });
        }
      } else M == null && N.d.M(F);
  }, Le.preload = function(F, M) {
    if (typeof F == "string" && typeof M == "object" && M !== null && typeof M.as == "string") {
      var V = M.as, $ = fn(V, M.crossOrigin);
      N.d.L(F, V, {
        crossOrigin: $,
        integrity: typeof M.integrity == "string" ? M.integrity : void 0,
        nonce: typeof M.nonce == "string" ? M.nonce : void 0,
        type: typeof M.type == "string" ? M.type : void 0,
        fetchPriority: typeof M.fetchPriority == "string" ? M.fetchPriority : void 0,
        referrerPolicy: typeof M.referrerPolicy == "string" ? M.referrerPolicy : void 0,
        imageSrcSet: typeof M.imageSrcSet == "string" ? M.imageSrcSet : void 0,
        imageSizes: typeof M.imageSizes == "string" ? M.imageSizes : void 0,
        media: typeof M.media == "string" ? M.media : void 0
      });
    }
  }, Le.preloadModule = function(F, M) {
    if (typeof F == "string")
      if (M) {
        var V = fn(M.as, M.crossOrigin);
        N.d.m(F, {
          as: typeof M.as == "string" && M.as !== "script" ? M.as : void 0,
          crossOrigin: V,
          integrity: typeof M.integrity == "string" ? M.integrity : void 0,
          nonce: typeof M.nonce == "string" ? M.nonce : void 0,
          fetchPriority: typeof M.fetchPriority == "string" ? M.fetchPriority : void 0
        });
      } else N.d.m(F);
  }, Le.requestFormReset = function(F) {
    N.d.r(F);
  }, Le.unstable_batchedUpdates = function(F, M) {
    return F(M);
  }, Le.useFormState = function(F, M, V) {
    return an.H.useFormState(F, M, V);
  }, Le.useFormStatus = function() {
    return an.H.useHostTransitionStatus();
  }, Le.version = "19.3.0", Le;
}
var sc;
function yc() {
  if (sc) return Jf.exports;
  sc = 1;
  function R() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(R);
      } catch (P) {
        console.error(P);
      }
  }
  return R(), Jf.exports = Ac(), Jf.exports;
}
/**
 * @license React
 * react-dom-server-legacy.browser.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dc;
function kc() {
  if (dc) return fu;
  dc = 1;
  var R = qf(), P = yc();
  function s(e) {
    var r = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      r += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        r += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + e + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var N = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), Z = Symbol.for("react.fragment"), K = Symbol.for("react.strict_mode"), tn = Symbol.for("react.profiler"), an = Symbol.for("react.consumer"), fn = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), vn = Symbol.for("react.lazy"), Ne = Symbol.for("react.scope"), rl = Symbol.for("react.activity"), Nl = Symbol.for("react.legacy_hidden"), Ce = Symbol.for("react.memo_cache_sentinel"), we = Symbol.for("react.view_transition"), dn = Symbol.for("react.recoverable"), Kn = Symbol.iterator;
  function Pn(e) {
    return e === null || typeof e != "object" ? null : (e = Kn && e[Kn] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Sr = Symbol.for("react.optimistic_key"), en = Array.isArray;
  function qr(e, r) {
    var i = e.length & 3, u = e.length - i, c = r;
    for (r = 0; r < u; ) {
      var h = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24;
      ++r, h = 3432918353 * (h & 65535) + ((3432918353 * (h >>> 16) & 65535) << 16) & 4294967295, h = h << 15 | h >>> 17, h = 461845907 * (h & 65535) + ((461845907 * (h >>> 16) & 65535) << 16) & 4294967295, c ^= h, c = c << 13 | c >>> 19, c = 5 * (c & 65535) + ((5 * (c >>> 16) & 65535) << 16) & 4294967295, c = (c & 65535) + 27492 + (((c >>> 16) + 58964 & 65535) << 16);
    }
    switch (h = 0, i) {
      case 3:
        h ^= (e.charCodeAt(r + 2) & 255) << 16;
      case 2:
        h ^= (e.charCodeAt(r + 1) & 255) << 8;
      case 1:
        h ^= e.charCodeAt(r) & 255, h = 3432918353 * (h & 65535) + ((3432918353 * (h >>> 16) & 65535) << 16) & 4294967295, h = h << 15 | h >>> 17, c ^= 461845907 * (h & 65535) + ((461845907 * (h >>> 16) & 65535) << 16) & 4294967295;
    }
    return c ^= e.length, c ^= c >>> 16, c = 2246822507 * (c & 65535) + ((2246822507 * (c >>> 16) & 65535) << 16) & 4294967295, c ^= c >>> 13, c = 3266489909 * (c & 65535) + ((3266489909 * (c >>> 16) & 65535) << 16) & 4294967295, (c ^ c >>> 16) >>> 0;
  }
  var te = Object.assign, Mn = Object.prototype.hasOwnProperty, ml = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Mi = {}, _t = {};
  function ql(e) {
    return Mn.call(_t, e) ? !0 : Mn.call(Mi, e) ? !1 : ml.test(e) ? _t[e] = !0 : (Mi[e] = !0, !1);
  }
  var Ae = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  ), ee = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), C = /["'&<>]/;
  function Q(e) {
    if (typeof e == "boolean" || typeof e == "number" || typeof e == "bigint")
      return "" + e;
    e = "" + e;
    var r = C.exec(e);
    if (r) {
      var i = "", u, c = 0;
      for (u = r.index; u < e.length; u++) {
        switch (e.charCodeAt(u)) {
          case 34:
            r = "&quot;";
            break;
          case 38:
            r = "&amp;";
            break;
          case 39:
            r = "&#x27;";
            break;
          case 60:
            r = "&lt;";
            break;
          case 62:
            r = "&gt;";
            break;
          default:
            continue;
        }
        c !== u && (i += e.slice(c, u)), c = u + 1, i += r;
      }
      e = c !== u ? i + e.slice(c, u) : i;
    }
    return e;
  }
  var jr = /([A-Z])/g, Ft = /^ms-/, D = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function A(e) {
    return D.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  var T = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = P.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, z = I.d;
  I.d = {
    f: z.f,
    r: z.r,
    D: Bt,
    C: me,
    L: bf,
    m: Oa,
    X: Au,
    S: Cu,
    M: Tf
  };
  var q = [], on = null, bn = /(<\/|<)(s)(cript)/gi;
  function ke(e, r, i, u) {
    return "" + r + (i === "s" ? "\\u0073" : "\\u0053") + u;
  }
  function xe(e, r, i, u, c) {
    return {
      idPrefix: e === void 0 ? "" : e,
      nextFormID: 0,
      streamingFormat: 0,
      bootstrapScriptContent: i,
      bootstrapScripts: u,
      bootstrapModules: c,
      instructions: 0,
      hasBody: !1,
      hasHtml: !1,
      unknownResources: {},
      dnsResources: {},
      connectResources: { default: {}, anonymous: {}, credentials: {} },
      imageResources: {},
      styleResources: {},
      scriptResources: {},
      moduleUnknownResources: {},
      moduleScriptResources: {}
    };
  }
  function ie(e, r, i, u) {
    return {
      insertionMode: e,
      selectedValue: r,
      tagScope: i,
      viewTransition: u
    };
  }
  function ou(e, r, i) {
    var u = e.tagScope & -25;
    switch (r) {
      case "noscript":
        return ie(2, null, u | 1, null);
      case "select":
        return ie(
          2,
          i.value != null ? i.value : i.defaultValue,
          u,
          null
        );
      case "svg":
        return ie(4, null, u, null);
      case "picture":
        return ie(2, null, u | 2, null);
      case "math":
        return ie(5, null, u, null);
      case "foreignObject":
        return ie(2, null, u, null);
      case "table":
        return ie(6, null, u, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return ie(7, null, u, null);
      case "colgroup":
        return ie(9, null, u, null);
      case "tr":
        return ie(8, null, u, null);
      case "head":
        if (2 > e.insertionMode)
          return ie(3, null, u, null);
        break;
      case "html":
        if (e.insertionMode === 0)
          return ie(1, null, u, null);
    }
    return 6 <= e.insertionMode || 2 > e.insertionMode ? ie(2, null, u, null) : e.viewTransition !== null || e.tagScope !== u ? ie(
      e.insertionMode,
      e.selectedValue,
      u,
      null
    ) : e;
  }
  function ln(e) {
    return e === null ? null : {
      update: e.update,
      enter: "none",
      exit: "none",
      share: e.update,
      parentEnter: "none",
      parentExit: "none",
      name: e.autoName,
      autoName: e.autoName,
      nameIdx: 0
    };
  }
  function Ma(e, r) {
    return r.tagScope & 32 && (e.instructions |= 128), ie(
      r.insertionMode,
      r.selectedValue,
      r.tagScope | 12,
      ln(r.viewTransition)
    );
  }
  function Ci(e, r) {
    e = ln(r.viewTransition);
    var i = r.tagScope | 16;
    return e !== null && e.share !== "none" && (i |= 64), ie(
      r.insertionMode,
      r.selectedValue,
      i,
      e
    );
  }
  function hu(e, r, i) {
    return e = "_" + e.idPrefix + "R_" + r, 0 < i && (e += "H" + i.toString(32)), e + "_";
  }
  function de(e, r) {
    r = r.viewTransition, r !== null && (r.name !== "auto" && (Tn(
      e,
      "vt-name",
      r.nameIdx === 0 ? r.name : r.name + "_" + r.nameIdx
    ), r.nameIdx++), Tn(e, "vt-update", r.update), r.enter !== "none" && Tn(e, "vt-enter", r.enter), r.exit !== "none" && Tn(e, "vt-exit", r.exit), r.share !== "none" && Tn(e, "vt-share", r.share));
  }
  var _r = /* @__PURE__ */ new Map();
  function Ca(e, r) {
    if (typeof r != "object") throw Error(s(62));
    var i = !0, u;
    for (u in r)
      if (Mn.call(r, u)) {
        var c = r[u];
        if (c != null && typeof c != "boolean" && c !== "") {
          if (u.indexOf("--") === 0) {
            var h = Q(u);
            c = Q(("" + c).trim());
          } else
            h = _r.get(u), h === void 0 && (h = Q(
              u.replace(jr, "-$1").toLowerCase().replace(Ft, "-ms-")
            ), _r.set(u, h)), c = typeof c == "number" ? c === 0 || Ae.has(u) ? "" + c : c + "px" : Q(("" + c).trim());
          i ? (i = !1, e.push(' style="', h, ":", c)) : e.push(";", h, ":", c);
        }
      }
    i || e.push('"');
  }
  function Aa(e, r, i) {
    i && typeof i != "function" && typeof i != "symbol" && e.push(" ", r, '=""');
  }
  function Tn(e, r, i) {
    typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && e.push(" ", r, '="', Q(i), '"');
  }
  var Je = Q(
    "javascript:throw new Error('React form unexpectedly submitted.')"
  );
  function jl(e, r) {
    this.push('<input type="hidden"'), su(e), Tn(this, "name", r), Tn(this, "value", e), this.push("/>");
  }
  function su(e) {
    if (typeof e != "string") throw Error(s(480));
  }
  function Ot(e, r) {
    if (typeof r.$$FORM_ACTION == "function") {
      var i = e.nextFormID++;
      e = e.idPrefix + i;
      try {
        var u = r.$$FORM_ACTION(e);
        if (u) {
          var c = u.data;
          c != null && c.forEach(su);
        }
        return u;
      } catch (h) {
        if (typeof h == "object" && h !== null && typeof h.then == "function")
          throw h;
      }
    }
    return null;
  }
  function du(e, r, i, u, c, h, y, w) {
    var E = null;
    if (typeof u == "function") {
      var x = Ot(r, u);
      x !== null ? (w = x.name, u = x.action || "", c = x.encType, h = x.method, y = x.target, E = x.data) : (e.push(" ", "formAction", '="', Je, '"'), y = h = c = u = w = null, ka(r, i));
    }
    return w != null && En(e, "name", w), u != null && En(e, "formAction", u), c != null && En(e, "formEncType", c), h != null && En(e, "formMethod", h), y != null && En(e, "formTarget", y), E;
  }
  function En(e, r, i) {
    switch (r) {
      case "className":
        Tn(e, "class", i);
        break;
      case "tabIndex":
        Tn(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Tn(e, r, i);
        break;
      case "style":
        Ca(e, i);
        break;
      case "src":
      case "href":
        if (i === "") break;
      case "action":
      case "formAction":
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean")
          break;
        i = A("" + i), e.push(" ", r, '="', Q(i), '"');
        break;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "ref":
        break;
      case "autoFocus":
      case "multiple":
      case "muted":
        Aa(e, r.toLowerCase(), i);
        break;
      case "xlinkHref":
        if (typeof i == "function" || typeof i == "symbol" || typeof i == "boolean")
          break;
        i = A("" + i), e.push(" ", "xlink:href", '="', Q(i), '"');
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        typeof i != "function" && typeof i != "symbol" && e.push(" ", r, '="', Q(i), '"');
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol" && e.push(" ", r, '=""');
        break;
      case "capture":
      case "download":
        i === !0 ? e.push(" ", r, '=""') : i !== !1 && typeof i != "function" && typeof i != "symbol" && e.push(" ", r, '="', Q(i), '"');
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i && e.push(" ", r, '="', Q(i), '"');
        break;
      case "rowSpan":
      case "start":
        typeof i == "function" || typeof i == "symbol" || isNaN(i) || e.push(" ", r, '="', Q(i), '"');
        break;
      case "xlinkActuate":
        Tn(e, "xlink:actuate", i);
        break;
      case "xlinkArcrole":
        Tn(e, "xlink:arcrole", i);
        break;
      case "xlinkRole":
        Tn(e, "xlink:role", i);
        break;
      case "xlinkShow":
        Tn(e, "xlink:show", i);
        break;
      case "xlinkTitle":
        Tn(e, "xlink:title", i);
        break;
      case "xlinkType":
        Tn(e, "xlink:type", i);
        break;
      case "xmlBase":
        Tn(e, "xml:base", i);
        break;
      case "xmlLang":
        Tn(e, "xml:lang", i);
        break;
      case "xmlSpace":
        Tn(e, "xml:space", i);
        break;
      default:
        if ((!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (r = ee.get(r) || r, ql(r))) {
          switch (typeof i) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              var u = r.toLowerCase().slice(0, 5);
              if (u !== "data-" && u !== "aria-") return;
          }
          e.push(" ", r, '="', Q(i), '"');
        }
    }
  }
  function De(e, r, i) {
    if (r != null) {
      if (i != null) throw Error(s(60));
      if (typeof r != "object" || !("__html" in r))
        throw Error(s(61));
      r = r.__html, r != null && e.push("" + r);
    }
  }
  function vu(e) {
    var r = "";
    return R.Children.forEach(e, function(i) {
      i != null && (r += i);
    }), r;
  }
  function ka(e, r) {
    if ((e.instructions & 16) === 0) {
      e.instructions |= 16;
      var i = r.preamble, u = r.bootstrapChunks;
      (i.htmlChunks || i.headChunks) && u.length === 0 ? (u.push(r.startInlineScript), Ht(u, e), u.push(
        ">",
        `addEventListener("submit",function(a){if(!a.defaultPrevented){var b=a.target,d=a.submitter,c=b.action,e=d;if(d){var f=d.getAttribute("formAction");null!=f&&(c=f,e=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===c&&(a.preventDefault(),a=new FormData(b,e),c=b.ownerDocument||b,(c.$$reactFormReplay=c.$$reactFormReplay||[]).push(b,d,a))}});`,
        "<\/script>"
      )) : u.unshift(
        r.startInlineScript,
        ">",
        `addEventListener("submit",function(a){if(!a.defaultPrevented){var b=a.target,d=a.submitter,c=b.action,e=d;if(d){var f=d.getAttribute("formAction");null!=f&&(c=f,e=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===c&&(a.preventDefault(),a=new FormData(b,e),c=b.ownerDocument||b,(c.$$reactFormReplay=c.$$reactFormReplay||[]).push(b,d,a))}});`,
        "<\/script>"
      );
    }
  }
  function ve(e, r) {
    e.push(le("link"));
    for (var i in r)
      if (Mn.call(r, i)) {
        var u = r[i];
        if (u != null)
          switch (i) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(s(399, "link"));
            default:
              En(e, i, u);
          }
      }
    return e.push("/>"), null;
  }
  var gu = /(<\/|<)(s)(tyle)/gi;
  function Ai(e, r, i, u) {
    return "" + r + (i === "s" ? "\\73 " : "\\53 ") + u;
  }
  function $l(e, r, i, u) {
    e.push(le(i));
    for (var c in r)
      if (Mn.call(r, c)) {
        var h = r[c];
        if (h != null)
          switch (c) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(s(399, i));
            default:
              En(e, c, h);
          }
      }
    return de(e, u), e.push("/>"), null;
  }
  function yu(e, r) {
    e.push(le("title"));
    var i = null, u = null, c;
    for (c in r)
      if (Mn.call(r, c)) {
        var h = r[c];
        if (h != null)
          switch (c) {
            case "children":
              i = h;
              break;
            case "dangerouslySetInnerHTML":
              u = h;
              break;
            default:
              En(e, c, h);
          }
      }
    return e.push(">"), r = Array.isArray(i) ? 2 > i.length ? i[0] : null : i, typeof r != "function" && typeof r != "symbol" && r !== null && r !== void 0 && e.push(Q("" + r)), De(e, u, i), e.push(Dl("title")), null;
  }
  function ki(e, r) {
    e.push(le("script"));
    var i = null, u = null, c;
    for (c in r)
      if (Mn.call(r, c)) {
        var h = r[c];
        if (h != null)
          switch (c) {
            case "children":
              i = h;
              break;
            case "dangerouslySetInnerHTML":
              u = h;
              break;
            default:
              En(e, c, h);
          }
      }
    return e.push(">"), De(e, u, i), typeof i == "string" && e.push(("" + i).replace(bn, ke)), e.push(Dl("script")), null;
  }
  function $r(e, r, i, u) {
    e.push(le(i));
    var c = i = null, h;
    for (h in r)
      if (Mn.call(r, h)) {
        var y = r[h];
        if (y != null)
          switch (h) {
            case "children":
              i = y;
              break;
            case "dangerouslySetInnerHTML":
              c = y;
              break;
            default:
              En(e, h, y);
          }
      }
    return de(e, u), e.push(">"), De(e, c, i), i;
  }
  function It(e, r, i, u) {
    e.push(le(i));
    var c = i = null, h;
    for (h in r)
      if (Mn.call(r, h)) {
        var y = r[h];
        if (y != null)
          switch (h) {
            case "children":
              i = y;
              break;
            case "dangerouslySetInnerHTML":
              c = y;
              break;
            default:
              En(e, h, y);
          }
      }
    return de(e, u), e.push(">"), De(e, c, i), typeof i == "string" ? (e.push(Q(i)), null) : i;
  }
  var Lt = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, ae = /* @__PURE__ */ new Map();
  function le(e) {
    var r = ae.get(e);
    if (r === void 0) {
      if (!Lt.test(e))
        throw Error(s(65, e));
      r = "<" + e, ae.set(e, r);
    }
    return r;
  }
  function bu(e, r, i, u, c, h, y, w, E) {
    switch (r) {
      case "div":
      case "span":
      case "svg":
      case "path":
        break;
      case "a":
        e.push(le("a"));
        var x = null, O = null, L;
        for (L in i)
          if (Mn.call(i, L)) {
            var G = i[L];
            if (G != null)
              switch (L) {
                case "children":
                  x = G;
                  break;
                case "dangerouslySetInnerHTML":
                  O = G;
                  break;
                case "href":
                  G === "" ? Tn(e, "href", "") : En(e, L, G);
                  break;
                default:
                  En(e, L, G);
              }
          }
        if (de(e, w), e.push(">"), De(e, O, x), typeof x == "string") {
          e.push(Q(x));
          var U = null;
        } else U = x;
        return U;
      case "g":
      case "p":
      case "li":
        break;
      case "select":
        e.push(le("select"));
        var B = null, p = null, gn;
        for (gn in i)
          if (Mn.call(i, gn)) {
            var hn = i[gn];
            if (hn != null)
              switch (gn) {
                case "children":
                  B = hn;
                  break;
                case "dangerouslySetInnerHTML":
                  p = hn;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  En(
                    e,
                    gn,
                    hn
                  );
              }
          }
        return de(e, w), e.push(">"), De(e, p, B), B;
      case "option":
        var xn = w.selectedValue;
        e.push(le("option"));
        var m = null, kn = null, un = null, sn = null, Rn;
        for (Rn in i)
          if (Mn.call(i, Rn)) {
            var be = i[Rn];
            if (be != null)
              switch (Rn) {
                case "children":
                  m = be;
                  break;
                case "selected":
                  un = be;
                  break;
                case "dangerouslySetInnerHTML":
                  sn = be;
                  break;
                case "value":
                  kn = be;
                default:
                  En(
                    e,
                    Rn,
                    be
                  );
              }
          }
        if (xn != null) {
          var cn = kn !== null ? "" + kn : vu(m);
          if (en(xn)) {
            for (var Sn = 0; Sn < xn.length; Sn++)
              if ("" + xn[Sn] === cn) {
                e.push(' selected=""');
                break;
              }
          } else
            "" + xn === cn && e.push(' selected=""');
        } else un && e.push(' selected=""');
        return e.push(">"), De(e, sn, m), m;
      case "textarea":
        e.push(le("textarea"));
        var Zn = null, mn = null, _n = null, qn;
        for (qn in i)
          if (Mn.call(i, qn)) {
            var Yn = i[qn];
            if (Yn != null)
              switch (qn) {
                case "children":
                  _n = Yn;
                  break;
                case "value":
                  Zn = Yn;
                  break;
                case "defaultValue":
                  mn = Yn;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(s(91));
                default:
                  En(
                    e,
                    qn,
                    Yn
                  );
              }
          }
        if (Zn === null && mn !== null && (Zn = mn), de(e, w), e.push(">"), _n != null) {
          if (Zn != null) throw Error(s(92));
          if (en(_n)) {
            if (1 < _n.length)
              throw Error(s(93));
            Zn = "" + _n[0];
          }
          Zn = "" + _n;
        }
        return typeof Zn == "string" && Zn[0] === `
` && e.push(`
`), Zn !== null && e.push(Q("" + Zn)), null;
      case "input":
        e.push(le("input"));
        var Pe = null, We = null, jn = null, Ue = null, $n = null, hl = null, ce = null, je = null, sl = null, Pl;
        for (Pl in i)
          if (Mn.call(i, Pl)) {
            var zn = i[Pl];
            if (zn != null)
              switch (Pl) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(399, "input"));
                case "name":
                  Pe = zn;
                  break;
                case "formAction":
                  We = zn;
                  break;
                case "formEncType":
                  jn = zn;
                  break;
                case "formMethod":
                  Ue = zn;
                  break;
                case "formTarget":
                  $n = zn;
                  break;
                case "defaultChecked":
                  sl = zn;
                  break;
                case "defaultValue":
                  ce = zn;
                  break;
                case "checked":
                  je = zn;
                  break;
                case "value":
                  hl = zn;
                  break;
                default:
                  En(
                    e,
                    Pl,
                    zn
                  );
              }
          }
        var Ul = du(
          e,
          u,
          c,
          We,
          jn,
          Ue,
          $n,
          Pe
        );
        return je !== null ? Aa(e, "checked", je) : sl !== null && Aa(e, "checked", sl), hl !== null ? En(e, "value", hl) : ce !== null && En(e, "value", ce), de(e, w), e.push("/>"), Ul != null && Ul.forEach(jl, e), null;
      case "button":
        e.push(le("button"));
        var cr = null, dl = null, or = null, it = null, Yl = null, at = null, ut = null, vl;
        for (vl in i)
          if (Mn.call(i, vl)) {
            var Qn = i[vl];
            if (Qn != null)
              switch (vl) {
                case "children":
                  cr = Qn;
                  break;
                case "dangerouslySetInnerHTML":
                  dl = Qn;
                  break;
                case "name":
                  or = Qn;
                  break;
                case "formAction":
                  it = Qn;
                  break;
                case "formEncType":
                  Yl = Qn;
                  break;
                case "formMethod":
                  at = Qn;
                  break;
                case "formTarget":
                  ut = Qn;
                  break;
                default:
                  En(
                    e,
                    vl,
                    Qn
                  );
              }
          }
        var ft = du(
          e,
          u,
          c,
          it,
          Yl,
          at,
          ut,
          or
        );
        if (de(e, w), e.push(">"), ft != null && ft.forEach(jl, e), De(e, dl, cr), typeof cr == "string") {
          e.push(Q(cr));
          var hr = null;
        } else hr = cr;
        return hr;
      case "form":
        e.push(le("form"));
        var sr = null, Dr = null, Ye = null, dr = null, vr = null, Gl = null, zr;
        for (zr in i)
          if (Mn.call(i, zr)) {
            var gl = i[zr];
            if (gl != null)
              switch (zr) {
                case "children":
                  sr = gl;
                  break;
                case "dangerouslySetInnerHTML":
                  Dr = gl;
                  break;
                case "action":
                  Ye = gl;
                  break;
                case "encType":
                  dr = gl;
                  break;
                case "method":
                  vr = gl;
                  break;
                case "target":
                  Gl = gl;
                  break;
                default:
                  En(
                    e,
                    zr,
                    gl
                  );
              }
          }
        var ct = null, Hn = null;
        if (typeof Ye == "function") {
          var oe = Ot(
            u,
            Ye
          );
          oe !== null ? (Ye = oe.action || "", dr = oe.encType, vr = oe.method, Gl = oe.target, ct = oe.data, Hn = oe.name) : (e.push(
            " ",
            "action",
            '="',
            Je,
            '"'
          ), Gl = vr = dr = Ye = null, ka(u, c));
        }
        if (Ye != null && En(e, "action", Ye), dr != null && En(e, "encType", dr), vr != null && En(e, "method", vr), Gl != null && En(e, "target", Gl), de(e, w), e.push(">"), Hn !== null && (e.push('<input type="hidden"'), Tn(e, "name", Hn), e.push("/>"), ct != null && ct.forEach(jl, e)), De(e, Dr, sr), typeof sr == "string") {
          e.push(Q(sr));
          var Hr = null;
        } else Hr = sr;
        return Hr;
      case "menuitem":
        e.push(le("menuitem"));
        for (var yl in i)
          if (Mn.call(i, yl)) {
            var ot = i[yl];
            if (ot != null)
              switch (yl) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(400));
                default:
                  En(
                    e,
                    yl,
                    ot
                  );
              }
          }
        return de(e, w), e.push(">"), null;
      case "object":
        e.push(le("object"));
        var he = null, bl = null, Ml;
        for (Ml in i)
          if (Mn.call(i, Ml)) {
            var Ge = i[Ml];
            if (Ge != null)
              switch (Ml) {
                case "children":
                  he = Ge;
                  break;
                case "dangerouslySetInnerHTML":
                  bl = Ge;
                  break;
                case "data":
                  var nn = A("" + Ge);
                  if (nn === "") break;
                  e.push(
                    " ",
                    "data",
                    '="',
                    Q(nn),
                    '"'
                  );
                  break;
                default:
                  En(
                    e,
                    Ml,
                    Ge
                  );
              }
          }
        if (de(e, w), e.push(">"), De(e, bl, he), typeof he == "string") {
          e.push(Q(he));
          var Te = null;
        } else Te = he;
        return Te;
      case "title":
        var Fn = w.tagScope & 1, Br = w.tagScope & 4;
        if (w.insertionMode === 4 || Fn || i.itemProp != null)
          var gr = yu(
            e,
            i
          );
        else
          Br ? gr = null : (yu(c.hoistableChunks, i), gr = void 0);
        return gr;
      case "link":
        var Cl = w.tagScope & 1, ei = w.tagScope & 4, li = i.rel, al = i.href, Xl = i.precedence;
        if (w.insertionMode === 4 || Cl || i.itemProp != null || typeof li != "string" || typeof al != "string" || al === "") {
          ve(e, i);
          var Al = null;
        } else if (i.rel === "stylesheet")
          if (typeof Xl != "string" || i.disabled != null || i.onLoad || i.onError)
            Al = ve(
              e,
              i
            );
          else {
            var ne = c.styles.get(Xl), kl = u.styleResources.hasOwnProperty(al) ? u.styleResources[al] : void 0;
            if (kl !== null) {
              u.styleResources[al] = null, ne || (ne = {
                precedence: Q(Xl),
                rules: [],
                hrefs: [],
                sheets: /* @__PURE__ */ new Map()
              }, c.styles.set(Xl, ne));
              var Sl = {
                state: 0,
                props: te({}, i, {
                  "data-precedence": i.precedence,
                  precedence: null
                })
              };
              if (kl) {
                kl.length === 2 && Wt(Sl.props, kl);
                var ht = c.preloads.stylesheets.get(al);
                ht && 0 < ht.length ? ht.length = 0 : Sl.state = 1;
              }
              ne.sheets.set(al, Sl), y && y.stylesheets.add(Sl);
            } else if (ne) {
              var ri = ne.sheets.get(al);
              ri && y && y.stylesheets.add(ri);
            }
            E && e.push("<!-- -->"), Al = null;
          }
        else
          i.onLoad || i.onError ? Al = ve(
            e,
            i
          ) : (E && e.push("<!-- -->"), Al = ei ? null : ve(c.hoistableChunks, i));
        return Al;
      case "script":
        var ti = w.tagScope & 1, Wr = i.async;
        if (typeof i.src != "string" || !i.src || !Wr || typeof Wr == "function" || typeof Wr == "symbol" || i.onLoad || i.onError || w.insertionMode === 4 || ti || i.itemProp != null)
          var ii = ki(
            e,
            i
          );
        else {
          var Ln = i.src;
          if (i.type === "module")
            var Ur = u.moduleScriptResources, Tl = c.preloads.moduleScripts;
          else
            Ur = u.scriptResources, Tl = c.preloads.scripts;
          var Zl = Ur.hasOwnProperty(Ln) ? Ur[Ln] : void 0;
          if (Zl !== null) {
            Ur[Ln] = null;
            var El = i;
            if (Zl) {
              Zl.length === 2 && (El = te({}, i), Wt(El, Zl));
              var st = Tl.get(Ln);
              st && (st.length = 0);
            }
            var dt = [];
            c.scripts.add(dt), ki(dt, El);
          }
          E && e.push("<!-- -->"), ii = null;
        }
        return ii;
      case "style":
        var vt = w.tagScope & 1, _l = i.precedence, _e = i.href, Yr = i.nonce;
        if (w.insertionMode === 4 || vt || i.itemProp != null || typeof _l != "string" || typeof _e != "string" || _e === "") {
          e.push(le("style"));
          var yr = null, ia = null, gt;
          for (gt in i)
            if (Mn.call(i, gt)) {
              var br = i[gt];
              if (br != null)
                switch (gt) {
                  case "children":
                    yr = br;
                    break;
                  case "dangerouslySetInnerHTML":
                    ia = br;
                    break;
                  default:
                    En(
                      e,
                      gt,
                      br
                    );
                }
            }
          e.push(">");
          var Tr = Array.isArray(yr) ? 2 > yr.length ? yr[0] : null : yr;
          typeof Tr != "function" && typeof Tr != "symbol" && Tr !== null && Tr !== void 0 && e.push(("" + Tr).replace(gu, Ai)), De(e, ia, yr), e.push(Dl("style"));
          var yt = null;
        } else {
          var wl = c.styles.get(_l);
          if ((u.styleResources.hasOwnProperty(_e) ? u.styleResources[_e] : void 0) !== null) {
            u.styleResources[_e] = null, wl || (wl = {
              precedence: Q(_l),
              rules: [],
              hrefs: [],
              sheets: /* @__PURE__ */ new Map()
            }, c.styles.set(_l, wl));
            var aa = c.nonce.style;
            if (!aa || aa === Yr) {
              wl.hrefs.push(Q(_e));
              var qa = wl.rules, Gr = null, ai = null, bt;
              for (bt in i)
                if (Mn.call(i, bt)) {
                  var Tt = i[bt];
                  if (Tt != null)
                    switch (bt) {
                      case "children":
                        Gr = Tt;
                        break;
                      case "dangerouslySetInnerHTML":
                        ai = Tt;
                    }
                }
              var Er = Array.isArray(Gr) ? 2 > Gr.length ? Gr[0] : null : Gr;
              typeof Er != "function" && typeof Er != "symbol" && Er !== null && Er !== void 0 && qa.push(
                ("" + Er).replace(gu, Ai)
              ), De(qa, ai, Gr);
            }
          }
          wl && y && y.styles.add(wl), E && e.push("<!-- -->"), yt = void 0;
        }
        return yt;
      case "meta":
        var Xr = w.tagScope & 1, ua = w.tagScope & 4;
        if (w.insertionMode === 4 || Xr || i.itemProp != null)
          var qu = $l(
            e,
            i,
            "meta",
            w
          );
        else
          E && e.push("<!-- -->"), qu = ua ? null : typeof i.charSet == "string" ? $l(
            c.charsetChunks,
            i,
            "meta",
            w
          ) : i.name === "viewport" ? $l(
            c.viewportChunks,
            i,
            "meta",
            w
          ) : $l(
            c.hoistableChunks,
            i,
            "meta",
            w
          );
        return qu;
      case "listing":
      case "pre":
        e.push(le(r));
        var Zr = null, wr = null, Fl;
        for (Fl in i)
          if (Mn.call(i, Fl)) {
            var Qr = i[Fl];
            if (Qr != null)
              switch (Fl) {
                case "children":
                  Zr = Qr;
                  break;
                case "dangerouslySetInnerHTML":
                  wr = Qr;
                  break;
                default:
                  En(
                    e,
                    Fl,
                    Qr
                  );
              }
          }
        if (de(e, w), e.push(">"), wr != null) {
          if (Zr != null) throw Error(s(60));
          if (typeof wr != "object" || !("__html" in wr))
            throw Error(s(61));
          var xr = wr.__html;
          xr != null && (typeof xr == "string" && 0 < xr.length && xr[0] === `
` ? e.push(`
`, xr) : e.push("" + xr));
        }
        return typeof Zr == "string" && Zr[0] === `
` && e.push(`
`), Zr;
      case "img":
        var ju = w.tagScope & 3, n = i.src, l = i.srcSet;
        if (!(i.loading === "lazy" || !n && !l || typeof n != "string" && n != null || typeof l != "string" && l != null || i.fetchPriority === "low" || ju) && (typeof n != "string" || n[4] !== ":" || n[0] !== "d" && n[0] !== "D" || n[1] !== "a" && n[1] !== "A" || n[2] !== "t" && n[2] !== "T" || n[3] !== "a" && n[3] !== "A") && (typeof l != "string" || l[4] !== ":" || l[0] !== "d" && l[0] !== "D" || l[1] !== "a" && l[1] !== "A" || l[2] !== "t" && l[2] !== "T" || l[3] !== "a" && l[3] !== "A")) {
          y !== null && w.tagScope & 64 && (y.suspenseyImages = !0);
          var t = typeof i.sizes == "string" ? i.sizes : void 0, a = l ? l + `
` + (t || "") : n, f = c.preloads.images, o = f.get(a);
          if (o)
            (i.fetchPriority === "high" || 10 > c.highImagePreloads.size) && (f.delete(a), c.highImagePreloads.add(o));
          else if (!u.imageResources.hasOwnProperty(a)) {
            u.imageResources[a] = q;
            var d = i.crossOrigin, v = typeof d == "string" ? d === "use-credentials" ? d : "" : void 0, g = c.headers, b;
            g && 0 < g.remainingCapacity && typeof i.srcSet != "string" && (i.fetchPriority === "high" || 500 > g.highImagePreloads.length) && (b = ue(n, "image", {
              imageSrcSet: i.srcSet,
              imageSizes: i.sizes,
              crossOrigin: v,
              integrity: i.integrity,
              nonce: i.nonce,
              type: i.type,
              fetchPriority: i.fetchPriority,
              referrerPolicy: i.referrerPolicy
            }), 0 <= (g.remainingCapacity -= b.length + 2)) ? (c.resets.image[a] = q, g.highImagePreloads && (g.highImagePreloads += ", "), g.highImagePreloads += b) : (o = [], ve(o, {
              rel: "preload",
              as: "image",
              href: l ? void 0 : n,
              imageSrcSet: l,
              imageSizes: t,
              crossOrigin: v,
              integrity: i.integrity,
              type: i.type,
              fetchPriority: i.fetchPriority,
              referrerPolicy: i.referrerPolicy
            }), i.fetchPriority === "high" || 10 > c.highImagePreloads.size ? c.highImagePreloads.add(o) : (c.bulkPreloads.add(o), f.set(a, o)));
          }
        }
        return $l(e, i, "img", w);
      case "base":
      case "area":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "param":
      case "source":
      case "track":
      case "wbr":
        return $l(e, i, r, w);
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        break;
      case "head":
        if (2 > w.insertionMode) {
          var k = h || c.preamble;
          if (k.headChunks)
            throw Error(s(545, "`<head>`"));
          h !== null && e.push("<!--head-->"), k.headChunks = [];
          var _ = $r(
            k.headChunks,
            i,
            "head",
            w
          );
        } else
          _ = It(
            e,
            i,
            "head",
            w
          );
        return _;
      case "body":
        if (2 > w.insertionMode) {
          var H = h || c.preamble;
          if (H.bodyChunks)
            throw Error(s(545, "`<body>`"));
          h !== null && e.push("<!--body-->"), H.bodyChunks = [];
          var W = $r(
            H.bodyChunks,
            i,
            "body",
            w
          );
        } else
          W = It(
            e,
            i,
            "body",
            w
          );
        return W;
      case "html":
        if (w.insertionMode === 0) {
          var Y = h || c.preamble;
          if (Y.htmlChunks)
            throw Error(s(545, "`<html>`"));
          h !== null && e.push("<!--html-->"), Y.htmlChunks = [""];
          var rn = $r(
            Y.htmlChunks,
            i,
            "html",
            w
          );
        } else
          rn = It(
            e,
            i,
            "html",
            w
          );
        return rn;
      default:
        if (r.indexOf("-") !== -1) {
          e.push(le(r));
          var Gn = null, Xe = null, Bn;
          for (Bn in i)
            if (Mn.call(i, Bn)) {
              var Xn = i[Bn];
              if (Xn != null) {
                var Me = Bn;
                switch (Bn) {
                  case "children":
                    Gn = Xn;
                    break;
                  case "dangerouslySetInnerHTML":
                    Xe = Xn;
                    break;
                  case "style":
                    Ca(e, Xn);
                    break;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                  case "ref":
                    break;
                  case "className":
                    Me = "class";
                  default:
                    if (ql(Bn) && typeof Xn != "function" && typeof Xn != "symbol" && Xn !== !1) {
                      if (Xn === !0) Xn = "";
                      else if (typeof Xn == "object") continue;
                      e.push(
                        " ",
                        Me,
                        '="',
                        Q(Xn),
                        '"'
                      );
                    }
                }
              }
            }
          return de(e, w), e.push(">"), De(e, Xe, Gn), Gn;
        }
    }
    return It(e, i, r, w);
  }
  var Sa = /* @__PURE__ */ new Map();
  function Dl(e) {
    var r = Sa.get(e);
    return r === void 0 && (r = "</" + e + ">", Sa.set(e, r)), r;
  }
  function Nt(e, r) {
    e = e.preamble, e.htmlChunks === null && r.htmlChunks && (e.htmlChunks = r.htmlChunks), e.headChunks === null && r.headChunks && (e.headChunks = r.headChunks), e.bodyChunks === null && r.bodyChunks && (e.bodyChunks = r.bodyChunks);
  }
  function _a(e, r) {
    r = r.bootstrapChunks;
    for (var i = 0; i < r.length - 1; i++)
      e.push(r[i]);
    return i < r.length ? (i = r[i], r.length = 0, e.push(i)) : !0;
  }
  function tl(e, r, i) {
    if (e.push('<!--$?--><template id="'), i === null) throw Error(s(395));
    return e.push(r.boundaryPrefix), r = i.toString(16), e.push(r), e.push('"></template>');
  }
  function Tu(e, r, i, u) {
    switch (i.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return e.push('<div hidden id="'), e.push(r.segmentPrefix), r = u.toString(16), e.push(r), e.push('">');
      case 4:
        return e.push('<svg aria-hidden="true" style="display:none" id="'), e.push(r.segmentPrefix), r = u.toString(16), e.push(r), e.push('">');
      case 5:
        return e.push('<math aria-hidden="true" style="display:none" id="'), e.push(r.segmentPrefix), r = u.toString(16), e.push(r), e.push('">');
      case 6:
        return e.push('<table hidden id="'), e.push(r.segmentPrefix), r = u.toString(16), e.push(r), e.push('">');
      case 7:
        return e.push('<table hidden><tbody id="'), e.push(r.segmentPrefix), r = u.toString(16), e.push(r), e.push('">');
      case 8:
        return e.push('<table hidden><tr id="'), e.push(r.segmentPrefix), r = u.toString(16), e.push(r), e.push('">');
      case 9:
        return e.push('<table hidden><colgroup id="'), e.push(r.segmentPrefix), r = u.toString(16), e.push(r), e.push('">');
      default:
        throw Error(s(397));
    }
  }
  function Ke(e, r) {
    switch (r.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return e.push("</div>");
      case 4:
        return e.push("</svg>");
      case 5:
        return e.push("</math>");
      case 6:
        return e.push("</table>");
      case 7:
        return e.push("</tbody></table>");
      case 8:
        return e.push("</tr></table>");
      case 9:
        return e.push("</colgroup></table>");
      default:
        throw Error(s(397));
    }
  }
  var Eu = /[<\u2028\u2029]/g;
  function yf(e) {
    return JSON.stringify(e).replace(
      Eu,
      function(r) {
        switch (r) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error(
              "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
            );
        }
      }
    );
  }
  var wu = /[&><\u2028\u2029]/g;
  function Dt(e) {
    return JSON.stringify(e).replace(
      wu,
      function(r) {
        switch (r) {
          case "&":
            return "\\u0026";
          case ">":
            return "\\u003e";
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error(
              "escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
            );
        }
      }
    );
  }
  var zt = !1, ge = !0;
  function il(e) {
    var r = e.rules, i = e.hrefs, u = 0;
    if (i.length) {
      for (this.push(on.startInlineStyle), this.push(' media="not all" data-precedence="'), this.push(e.precedence), this.push('" data-href="'); u < i.length - 1; u++)
        this.push(i[u]), this.push(" ");
      for (this.push(i[u]), this.push('">'), u = 0; u < r.length; u++) this.push(r[u]);
      ge = this.push("</style>"), zt = !0, r.length = 0, i.length = 0;
    }
  }
  function Un(e) {
    return e.state !== 2 ? zt = !0 : !1;
  }
  function Si(e, r, i) {
    return zt = !1, ge = !0, on = i, r.styles.forEach(il, e), on = null, r.stylesheets.forEach(Un), zt && (i.stylesToHoist = !0), ge;
  }
  function pe(e) {
    for (var r = 0; r < e.length; r++) this.push(e[r]);
    e.length = 0;
  }
  var Cn = [];
  function xu(e) {
    ve(Cn, e.props);
    for (var r = 0; r < Cn.length; r++)
      this.push(Cn[r]);
    Cn.length = 0, e.state = 2;
  }
  function Ru(e) {
    var r = 0 < e.sheets.size;
    e.sheets.forEach(xu, this), e.sheets.clear();
    var i = e.rules, u = e.hrefs;
    if (!r || u.length) {
      if (this.push(on.startInlineStyle), this.push(' data-precedence="'), this.push(e.precedence), e = 0, u.length) {
        for (this.push('" data-href="'); e < u.length - 1; e++)
          this.push(u[e]), this.push(" ");
        this.push(u[e]);
      }
      for (this.push('">'), e = 0; e < i.length; e++)
        this.push(i[e]);
      this.push("</style>"), i.length = 0, u.length = 0;
    }
  }
  function Fa(e) {
    if (e.state === 0) {
      e.state = 1;
      var r = e.props;
      for (ve(Cn, {
        rel: "preload",
        as: "style",
        href: e.props.href,
        crossOrigin: r.crossOrigin,
        fetchPriority: r.fetchPriority,
        integrity: r.integrity,
        media: r.media,
        hrefLang: r.hrefLang,
        referrerPolicy: r.referrerPolicy
      }), e = 0; e < Cn.length; e++)
        this.push(Cn[e]);
      Cn.length = 0;
    }
  }
  function Pu(e) {
    e.sheets.forEach(Fa, this), e.sheets.clear();
  }
  function Ht(e, r) {
    (r.instructions & 32) === 0 && (r.instructions |= 32, e.push(
      ' id="',
      Q("_" + r.idPrefix + "R_"),
      '"'
    ));
  }
  function Mu(e, r) {
    e.push("[");
    var i = "[";
    r.stylesheets.forEach(function(u) {
      if (u.state !== 2)
        if (u.state === 3)
          e.push(i), u = Dt(
            "" + u.props.href
          ), e.push(u), e.push("]"), i = ",[";
        else {
          e.push(i);
          var c = u.props["data-precedence"], h = u.props, y = A("" + u.props.href);
          y = Dt(y), e.push(y), c = "" + c, e.push(","), c = Dt(c), e.push(c);
          for (var w in h)
            if (Mn.call(h, w) && (c = h[w], c != null))
              switch (w) {
                case "href":
                case "rel":
                case "precedence":
                case "data-precedence":
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(399, "link"));
                default:
                  wn(
                    e,
                    w,
                    c
                  );
              }
          e.push("]"), i = ",[", u.state = 3;
        }
    }), e.push("]");
  }
  function wn(e, r, i) {
    var u = r.toLowerCase();
    switch (typeof i) {
      case "function":
      case "symbol":
        return;
    }
    switch (r) {
      case "innerHTML":
      case "dangerouslySetInnerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "style":
      case "ref":
        return;
      case "className":
        u = "class", r = "" + i;
        break;
      case "hidden":
        if (i === !1) return;
        r = "";
        break;
      case "src":
      case "href":
        i = A(i), r = "" + i;
        break;
      default:
        if (2 < r.length && (r[0] === "o" || r[0] === "O") && (r[1] === "n" || r[1] === "N") || !ql(r))
          return;
        r = "" + i;
    }
    e.push(","), u = Dt(u), e.push(u), e.push(","), u = Dt(r), e.push(u);
  }
  function Nn() {
    return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set(), suspenseyImages: !1 };
  }
  function Bt(e) {
    var r = ye || null;
    if (r) {
      var i = r.resumableState, u = r.renderState;
      if (typeof e == "string" && e) {
        if (!i.dnsResources.hasOwnProperty(e)) {
          i.dnsResources[e] = null, i = u.headers;
          var c, h;
          (h = i && 0 < i.remainingCapacity) && (h = (c = "<" + ("" + e).replace(
            _i,
            Fi
          ) + ">; rel=dns-prefetch", 0 <= (i.remainingCapacity -= c.length + 2))), h ? (u.resets.dns[e] = null, i.preconnects && (i.preconnects += ", "), i.preconnects += c) : (c = [], ve(c, { href: e, rel: "dns-prefetch" }), u.preconnects.add(c));
        }
        qe(r);
      }
    } else z.D(e);
  }
  function me(e, r) {
    var i = ye || null;
    if (i) {
      var u = i.resumableState, c = i.renderState;
      if (typeof e == "string" && e) {
        var h = r === "use-credentials" ? "credentials" : typeof r == "string" ? "anonymous" : "default";
        if (!u.connectResources[h].hasOwnProperty(e)) {
          u.connectResources[h][e] = null, u = c.headers;
          var y, w;
          if (w = u && 0 < u.remainingCapacity) {
            if (w = "<" + ("" + e).replace(
              _i,
              Fi
            ) + ">; rel=preconnect", typeof r == "string") {
              var E = ("" + r).replace(
                nr,
                Oi
              );
              w += '; crossorigin="' + E + '"';
            }
            w = (y = w, 0 <= (u.remainingCapacity -= y.length + 2));
          }
          w ? (c.resets.connect[h][e] = null, u.preconnects && (u.preconnects += ", "), u.preconnects += y) : (h = [], ve(h, {
            rel: "preconnect",
            href: e,
            crossOrigin: r
          }), c.preconnects.add(h));
        }
        qe(i);
      }
    } else z.C(e, r);
  }
  function bf(e, r, i) {
    var u = ye || null;
    if (u) {
      var c = u.resumableState, h = u.renderState;
      if (r && e) {
        switch (r) {
          case "image":
            if (i)
              var y = i.imageSrcSet, w = i.imageSizes, E = i.fetchPriority;
            var x = y ? y + `
` + (w || "") : e;
            if (c.imageResources.hasOwnProperty(x)) return;
            c.imageResources[x] = q, c = h.headers;
            var O;
            c && 0 < c.remainingCapacity && typeof y != "string" && E === "high" && (O = ue(e, r, i), 0 <= (c.remainingCapacity -= O.length + 2)) ? (h.resets.image[x] = q, c.highImagePreloads && (c.highImagePreloads += ", "), c.highImagePreloads += O) : (c = [], ve(
              c,
              te(
                { rel: "preload", href: y ? void 0 : e, as: r },
                i
              )
            ), E === "high" ? h.highImagePreloads.add(c) : (h.bulkPreloads.add(c), h.preloads.images.set(x, c)));
            break;
          case "style":
            if (c.styleResources.hasOwnProperty(e)) return;
            y = [], ve(
              y,
              te({ rel: "preload", href: e, as: r }, i)
            ), c.styleResources[e] = !i || typeof i.crossOrigin != "string" && typeof i.integrity != "string" ? q : [i.crossOrigin, i.integrity], h.preloads.stylesheets.set(e, y), h.bulkPreloads.add(y);
            break;
          case "script":
            if (c.scriptResources.hasOwnProperty(e)) return;
            y = [], h.preloads.scripts.set(e, y), h.bulkPreloads.add(y), ve(
              y,
              te({ rel: "preload", href: e, as: r }, i)
            ), c.scriptResources[e] = !i || typeof i.crossOrigin != "string" && typeof i.integrity != "string" ? q : [i.crossOrigin, i.integrity];
            break;
          default:
            if (c.unknownResources.hasOwnProperty(r)) {
              if (y = c.unknownResources[r], y.hasOwnProperty(e))
                return;
            } else
              y = {}, c.unknownResources[r] = y;
            if (y[e] = q, (c = h.headers) && 0 < c.remainingCapacity && r === "font" && (x = ue(e, r, i), 0 <= (c.remainingCapacity -= x.length + 2)))
              h.resets.font[e] = q, c.fontPreloads && (c.fontPreloads += ", "), c.fontPreloads += x;
            else
              switch (c = [], e = te({ rel: "preload", href: e, as: r }, i), ve(c, e), r) {
                case "font":
                  h.fontPreloads.add(c);
                  break;
                default:
                  h.bulkPreloads.add(c);
              }
        }
        qe(u);
      }
    } else z.L(e, r, i);
  }
  function Oa(e, r) {
    var i = ye || null;
    if (i) {
      var u = i.resumableState, c = i.renderState;
      if (e) {
        var h = r && typeof r.as == "string" ? r.as : "script";
        switch (h) {
          case "script":
            if (u.moduleScriptResources.hasOwnProperty(e)) return;
            h = [], u.moduleScriptResources[e] = !r || typeof r.crossOrigin != "string" && typeof r.integrity != "string" ? q : [r.crossOrigin, r.integrity], c.preloads.moduleScripts.set(e, h);
            break;
          default:
            if (u.moduleUnknownResources.hasOwnProperty(h)) {
              var y = u.moduleUnknownResources[h];
              if (y.hasOwnProperty(e)) return;
            } else
              y = {}, u.moduleUnknownResources[h] = y;
            h = [], y[e] = q;
        }
        ve(h, te({ rel: "modulepreload", href: e }, r)), c.bulkPreloads.add(h), qe(i);
      }
    } else z.m(e, r);
  }
  function Cu(e, r, i) {
    var u = ye || null;
    if (u) {
      var c = u.resumableState, h = u.renderState;
      if (e) {
        r = r || "default";
        var y = h.styles.get(r), w = c.styleResources.hasOwnProperty(e) ? c.styleResources[e] : void 0;
        w !== null && (c.styleResources[e] = null, y || (y = {
          precedence: Q(r),
          rules: [],
          hrefs: [],
          sheets: /* @__PURE__ */ new Map()
        }, h.styles.set(r, y)), r = {
          state: 0,
          props: te(
            { rel: "stylesheet", href: e, "data-precedence": r },
            i
          )
        }, w && (w.length === 2 && Wt(r.props, w), (h = h.preloads.stylesheets.get(e)) && 0 < h.length ? h.length = 0 : r.state = 1), y.sheets.set(e, r), qe(u));
      }
    } else z.S(e, r, i);
  }
  function Au(e, r) {
    var i = ye || null;
    if (i) {
      var u = i.resumableState, c = i.renderState;
      if (e) {
        var h = u.scriptResources.hasOwnProperty(e) ? u.scriptResources[e] : void 0;
        h !== null && (u.scriptResources[e] = null, r = te({ src: e, async: !0 }, r), h && (h.length === 2 && Wt(r, h), e = c.preloads.scripts.get(e)) && (e.length = 0), e = [], c.scripts.add(e), ki(e, r), qe(i));
      }
    } else z.X(e, r);
  }
  function Tf(e, r) {
    var i = ye || null;
    if (i) {
      var u = i.resumableState, c = i.renderState;
      if (e) {
        var h = u.moduleScriptResources.hasOwnProperty(
          e
        ) ? u.moduleScriptResources[e] : void 0;
        h !== null && (u.moduleScriptResources[e] = null, r = te({ src: e, type: "module", async: !0 }, r), h && (h.length === 2 && Wt(r, h), e = c.preloads.moduleScripts.get(e)) && (e.length = 0), e = [], c.scripts.add(e), ki(e, r), qe(i));
      }
    } else z.M(e, r);
  }
  function Wt(e, r) {
    e.crossOrigin == null && (e.crossOrigin = r[0]), e.integrity == null && (e.integrity = r[1]);
  }
  function ue(e, r, i) {
    e = ("" + e).replace(
      _i,
      Fi
    ), r = ("" + r).replace(
      nr,
      Oi
    ), r = "<" + e + '>; rel=preload; as="' + r + '"';
    for (var u in i)
      Mn.call(i, u) && (e = i[u], typeof e == "string" && (r += "; " + u.toLowerCase() + '="' + ("" + e).replace(
        nr,
        Oi
      ) + '"'));
    return r;
  }
  var _i = /[<>\r\n]/g;
  function Fi(e) {
    switch (e) {
      case "<":
        return "%3C";
      case ">":
        return "%3E";
      case `
`:
        return "%0A";
      case "\r":
        return "%0D";
      default:
        throw Error(
          "escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
        );
    }
  }
  var nr = /["';,\r\n]/g;
  function Oi(e) {
    switch (e) {
      case '"':
        return "%22";
      case "'":
        return "%27";
      case ";":
        return "%3B";
      case ",":
        return "%2C";
      case `
`:
        return "%0A";
      case "\r":
        return "%0D";
      default:
        throw Error(
          "escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
        );
    }
  }
  function Ef(e) {
    this.styles.add(e);
  }
  function wf(e) {
    this.stylesheets.add(e);
  }
  function nt(e, r) {
    r.styles.forEach(Ef, e), r.stylesheets.forEach(wf, e), r.suspenseyImages && (e.suspenseyImages = !0);
  }
  function Ii(e, r) {
    var i = e.idPrefix, u = [], c = e.bootstrapScriptContent, h = e.bootstrapScripts, y = e.bootstrapModules;
    c !== void 0 && (u.push("<script"), Ht(u, e), u.push(
      ">",
      ("" + c).replace(bn, ke),
      "<\/script>"
    )), c = i + "P:";
    var w = i + "S:";
    i += "B:";
    var E = /* @__PURE__ */ new Set(), x = /* @__PURE__ */ new Set(), O = /* @__PURE__ */ new Set(), L = /* @__PURE__ */ new Map(), G = /* @__PURE__ */ new Set(), U = /* @__PURE__ */ new Set(), B = /* @__PURE__ */ new Set(), p = {
      images: /* @__PURE__ */ new Map(),
      stylesheets: /* @__PURE__ */ new Map(),
      scripts: /* @__PURE__ */ new Map(),
      moduleScripts: /* @__PURE__ */ new Map()
    };
    if (h !== void 0)
      for (var gn = 0; gn < h.length; gn++) {
        var hn = h[gn], xn, m = void 0, kn = void 0, un = {
          rel: "preload",
          as: "script",
          fetchPriority: "low",
          nonce: void 0
        };
        typeof hn == "string" ? un.href = xn = hn : (un.href = xn = hn.src, un.integrity = kn = typeof hn.integrity == "string" ? hn.integrity : void 0, un.crossOrigin = m = typeof hn == "string" || hn.crossOrigin == null ? void 0 : hn.crossOrigin === "use-credentials" ? "use-credentials" : ""), hn = e;
        var sn = xn;
        hn.scriptResources[sn] = null, hn.moduleScriptResources[sn] = null, hn = [], ve(hn, un), G.add(hn), u.push('<script src="', Q(xn), '"'), typeof kn == "string" && u.push(
          ' integrity="',
          Q(kn),
          '"'
        ), typeof m == "string" && u.push(
          ' crossorigin="',
          Q(m),
          '"'
        ), Ht(u, e), u.push(' async=""><\/script>');
      }
    if (y !== void 0)
      for (h = 0; h < y.length; h++)
        un = y[h], m = xn = void 0, kn = {
          rel: "modulepreload",
          fetchPriority: "low",
          nonce: void 0
        }, typeof un == "string" ? kn.href = gn = un : (kn.href = gn = un.src, kn.integrity = m = typeof un.integrity == "string" ? un.integrity : void 0, kn.crossOrigin = xn = typeof un == "string" || un.crossOrigin == null ? void 0 : un.crossOrigin === "use-credentials" ? "use-credentials" : ""), un = e, hn = gn, un.scriptResources[hn] = null, un.moduleScriptResources[hn] = null, un = [], ve(un, kn), G.add(un), u.push(
          '<script type="module" src="',
          Q(gn),
          '"'
        ), typeof m == "string" && u.push(
          ' integrity="',
          Q(m),
          '"'
        ), typeof xn == "string" && u.push(
          ' crossorigin="',
          Q(xn),
          '"'
        ), Ht(u, e), u.push(' async=""><\/script>');
    return {
      placeholderPrefix: c,
      segmentPrefix: w,
      boundaryPrefix: i,
      startInlineScript: "<script",
      startInlineStyle: "<style",
      preamble: { htmlChunks: null, headChunks: null, bodyChunks: null },
      externalRuntimeScript: null,
      bootstrapChunks: u,
      importMapChunks: [],
      onHeaders: void 0,
      headers: null,
      resets: {
        font: {},
        dns: {},
        connect: { default: {}, anonymous: {}, credentials: {} },
        image: {},
        style: {}
      },
      charsetChunks: [],
      viewportChunks: [],
      hoistableChunks: [],
      preconnects: E,
      fontPreloads: x,
      highImagePreloads: O,
      styles: L,
      bootstrapScripts: G,
      scripts: U,
      bulkPreloads: B,
      preloads: p,
      nonce: { script: void 0, style: void 0 },
      stylesToHoist: !1,
      generateStaticMarkup: r
    };
  }
  function Li(e, r, i, u) {
    return i.generateStaticMarkup ? (e.push(Q(r)), !1) : (r === "" ? e = u : (u && e.push("<!-- -->"), e.push(Q(r)), e = !0), e);
  }
  function er(e, r, i, u) {
    r.generateStaticMarkup || i && u && e.push("<!-- -->");
  }
  var Ia = Function.prototype.bind, xf = Symbol.for("react.client.reference");
  function Ut(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === xf ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Z:
        return "Fragment";
      case tn:
        return "Profiler";
      case K:
        return "StrictMode";
      case M:
        return "Suspense";
      case V:
        return "SuspenseList";
      case rl:
        return "Activity";
      case we:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case S:
          return "Portal";
        case fn:
          return e.displayName || "Context";
        case an:
          return (e._context.displayName || "Context") + ".Consumer";
        case F:
          var r = e.render;
          return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case $:
          return r = e.displayName || null, r !== null ? r : Ut(e.type) || "Memo";
        case vn:
          r = e._payload, e = e._init;
          try {
            return Ut(e(r));
          } catch {
          }
      }
    return null;
  }
  var re = {}, Fr = null;
  function Ni(e, r) {
    if (e !== r) {
      e.context._currentValue2 = e.parentValue, e = e.parent;
      var i = r.parent;
      if (e === null) {
        if (i !== null) throw Error(s(401));
      } else {
        if (i === null) throw Error(s(401));
        Ni(e, i);
      }
      r.context._currentValue2 = r.value;
    }
  }
  function La(e) {
    e.context._currentValue2 = e.parentValue, e = e.parent, e !== null && La(e);
  }
  function lr(e) {
    var r = e.parent;
    r !== null && lr(r), e.context._currentValue2 = e.value;
  }
  function Na(e, r) {
    if (e.context._currentValue2 = e.parentValue, e = e.parent, e === null) throw Error(s(402));
    e.depth === r.depth ? Ni(e, r) : Na(e, r);
  }
  function Da(e, r) {
    var i = r.parent;
    if (i === null) throw Error(s(402));
    e.depth === i.depth ? Ni(e, i) : Da(e, i), r.context._currentValue2 = r.value;
  }
  function rr(e) {
    var r = Fr;
    r !== e && (r === null ? lr(e) : e === null ? La(r) : r.depth === e.depth ? Ni(r, e) : r.depth > e.depth ? Na(r, e) : Da(r, e), Fr = e);
  }
  var ku = {
    enqueueSetState: function(e, r) {
      e = e._reactInternals, e.queue !== null && e.queue.push(r);
    },
    enqueueReplaceState: function(e, r) {
      e = e._reactInternals, e.replace = !0, e.queue = [r];
    },
    enqueueForceUpdate: function() {
    }
  }, Rf = { id: 1, overflow: "" };
  function Su(e) {
    var r = e.overflow;
    return e = e.id, (e & ~(1 << 32 - Di(e) - 1)).toString(32) + r;
  }
  function tr(e, r, i) {
    var u = e.id;
    e = e.overflow;
    var c = 32 - Di(u) - 1;
    u &= ~(1 << c), i += 1;
    var h = 32 - Di(r) + c;
    if (30 < h) {
      var y = c - c % 5;
      return h = (u & (1 << y) - 1).toString(32), u >>= y, c -= y, {
        id: 1 << 32 - Di(r) + c | i << c | u,
        overflow: h + e
      };
    }
    return {
      id: 1 << h | i << c | u,
      overflow: e
    };
  }
  var Di = Math.clz32 ? Math.clz32 : Cf, Pf = Math.log, Mf = Math.LN2;
  function Cf(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Pf(e) / Mf | 0) | 0;
  }
  function ze() {
  }
  var Se = Error(s(460));
  function Af(e, r, i) {
    switch (i = e[i], i === void 0 ? e.push(r) : i !== r && (r.then(ze, ze), r = i), r.status) {
      case "fulfilled":
        return r.value;
      case "rejected":
        throw e = r.reason, e === void 0 && !("reason" in r) ? Error(s(600)) : e;
      default:
        switch (typeof r.status == "string" ? r.then(ze, ze) : (e = r, e.status = "pending", e.then(
          function(u) {
            if (r.status === "pending") {
              var c = r;
              c.status = "fulfilled", c.value = u;
            }
          },
          function(u) {
            if (r.status === "pending") {
              var c = r;
              c.status = "rejected", c.reason = u;
            }
          }
        )), r.status) {
          case "fulfilled":
            return r.value;
          case "rejected":
            throw r.reason;
        }
        throw zi = r, Se;
    }
  }
  var zi = null;
  function Hi() {
    if (zi === null) throw Error(s(459));
    var e = zi;
    return zi = null, e;
  }
  function _u(e, r) {
    return e === r && (e !== 0 || 1 / e === 1 / r) || e !== e && r !== r;
  }
  var kf = typeof Object.is == "function" ? Object.is : _u, zl = null, za = null, Ha = null, Ba = null, Bi = null, In = null, Yt = !1, Wi = !1, Gt = 0, Xt = 0, Zt = -1, Ui = 0, et = null;
  function Fu(e) {
    if (e = e._reason, typeof e == "function")
      try {
        var r = e();
      } catch {
        r = "The reason for browser-only rendering could not be determined because its initializer threw.";
      }
    else r = e;
    return r = Error(
      s(603),
      e === void 0 ? void 0 : { cause: r }
    ), Object.defineProperty(r, dn, {
      value: !0
    }), r;
  }
  function Yi(e) {
    return typeof e != "object" || e === null ? !1 : e[dn] === !0;
  }
  function Wa(e) {
    var r = Error(
      s(604),
      Mn.call(e, "cause") ? { cause: e.cause } : void 0
    );
    if (e = e.stack, e !== void 0) {
      var i = e.indexOf(`
`);
      r.stack = r.name + ": " + r.message + (i === -1 ? "" : e.slice(i));
    } else r.stack = void 0;
    return r;
  }
  var ir = null, Gi = 0;
  function Hl() {
    if (zl === null)
      throw Error(s(321));
    return zl;
  }
  function Ou() {
    if (0 < Gi) throw Error(s(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function Ua() {
    return In === null ? Bi === null ? (Yt = !1, Bi = In = Ou()) : (Yt = !0, In = Bi) : In.next === null ? (Yt = !1, In = In.next = Ou()) : (Yt = !0, In = In.next), In;
  }
  function ar() {
    var e = et;
    return et = null, e;
  }
  function Qt() {
    Ba = Ha = za = zl = null, Wi = !1, Bi = null, Gi = 0, In = ir = null;
  }
  function Iu(e, r) {
    return typeof r == "function" ? r(e) : r;
  }
  function Lu(e, r, i) {
    if (zl = Hl(), In = Ua(), Yt) {
      var u = In.queue;
      if (r = u.dispatch, ir !== null && (i = ir.get(u), i !== void 0)) {
        ir.delete(u), u = In.memoizedState;
        do
          u = e(u, i.action), i = i.next;
        while (i !== null);
        return In.memoizedState = u, [u, r];
      }
      return [In.memoizedState, r];
    }
    return e = e === Iu ? typeof r == "function" ? r() : r : i !== void 0 ? i(r) : r, In.memoizedState = e, e = In.queue = { last: null, dispatch: null }, e = e.dispatch = Du.bind(
      null,
      zl,
      e
    ), [In.memoizedState, e];
  }
  function Nu(e, r) {
    if (zl = Hl(), In = Ua(), r = r === void 0 ? null : r, In !== null) {
      var i = In.memoizedState;
      if (i !== null && r !== null) {
        var u = i[1];
        n: if (u === null) u = !1;
        else {
          for (var c = 0; c < u.length && c < r.length; c++)
            if (!kf(r[c], u[c])) {
              u = !1;
              break n;
            }
          u = !0;
        }
        if (u) return i[0];
      }
    }
    return e = e(), In.memoizedState = [e, r], e;
  }
  function Du(e, r, i) {
    if (25 <= Gi) throw Error(s(301));
    if (e === zl)
      if (Wi = !0, e = { action: i, next: null }, ir === null && (ir = /* @__PURE__ */ new Map()), i = ir.get(r), i === void 0)
        ir.set(r, e);
      else {
        for (r = i; r.next !== null; ) r = r.next;
        r.next = e;
      }
  }
  function zu() {
    throw Error(s(440));
  }
  function Sf() {
    throw Error(s(394));
  }
  function _f() {
    throw Error(s(479));
  }
  function Hu(e, r, i) {
    Hl();
    var u = Xt++, c = Ha;
    if (typeof e.$$FORM_ACTION == "function") {
      var h = null, y = Ba;
      c = c.formState;
      var w = e.$$IS_SIGNATURE_EQUAL;
      if (c !== null && typeof w == "function") {
        var E = c[1];
        w.call(e, c[2], c[3]) && (h = i !== void 0 ? "p" + i : "k" + qr(
          JSON.stringify([y, null, u]),
          0
        ), E === h && (Zt = u, r = c[0]));
      }
      var x = e.bind(null, r);
      return e = function(L) {
        x(L);
      }, typeof x.$$FORM_ACTION == "function" && (e.$$FORM_ACTION = function(L) {
        L = x.$$FORM_ACTION(L), i !== void 0 && (i += "", L.action = i);
        var G = L.data;
        return G && (h === null && (h = i !== void 0 ? "p" + i : "k" + qr(
          JSON.stringify([
            y,
            null,
            u
          ]),
          0
        )), G.append("$ACTION_KEY", h)), L;
      }), [r, e, !1];
    }
    var O = e.bind(null, r);
    return [
      r,
      function(L) {
        O(L);
      },
      !1
    ];
  }
  function Bu(e) {
    var r = Ui;
    return Ui += 1, et === null && (et = []), Af(et, e, r);
  }
  function Ff() {
    throw Error(s(393));
  }
  var Wu = {
    readContext: function(e) {
      return e._currentValue2;
    },
    use: function(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return Bu(e);
        if (e.$$typeof === dn)
          throw Fu(e);
        if (e.$$typeof === fn)
          return e._currentValue2;
      }
      throw Error(s(438, String(e)));
    },
    useContext: function(e) {
      return Hl(), e._currentValue2;
    },
    useMemo: Nu,
    useReducer: Lu,
    useRef: function(e) {
      zl = Hl(), In = Ua();
      var r = In.memoizedState;
      return r === null ? (e = { current: e }, In.memoizedState = e) : r;
    },
    useState: function(e) {
      return Lu(Iu, e);
    },
    useInsertionEffect: ze,
    useLayoutEffect: ze,
    useCallback: function(e, r) {
      return Nu(function() {
        return e;
      }, r);
    },
    useImperativeHandle: ze,
    useEffect: ze,
    useDebugValue: ze,
    useDeferredValue: function(e, r) {
      return Hl(), r !== void 0 ? r : e;
    },
    useTransition: function() {
      return Hl(), [!1, Sf];
    },
    useId: function() {
      var e = Su(za.treeContext), r = Xi;
      if (r === null) throw Error(s(404));
      var i = Gt++;
      return hu(r, e, i);
    },
    useSyncExternalStore: function(e, r, i) {
      if (i === void 0)
        throw Error(s(407));
      return i();
    },
    useOptimistic: function(e) {
      return Hl(), [e, _f];
    },
    useActionState: Hu,
    useFormState: Hu,
    useHostTransitionStatus: function() {
      return Hl(), X;
    },
    useMemoCache: function(e) {
      for (var r = Array(e), i = 0; i < e; i++)
        r[i] = Ce;
      return r;
    },
    useCacheRefresh: function() {
      return Ff;
    },
    useEffectEvent: function() {
      return zu;
    }
  }, Xi = null, Of = {
    getCacheForType: function() {
      throw Error(s(248));
    },
    cacheSignal: function() {
      throw Error(s(248));
    }
  }, Ya, Uu;
  function Or(e) {
    if (Ya === void 0)
      try {
        throw Error();
      } catch (i) {
        var r = i.stack.trim().match(/\n( *(at )?)/);
        Ya = r && r[1] || "", Uu = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ya + e + Uu;
  }
  var Ga = !1;
  function Zi(e, r) {
    if (!e || Ga) return "";
    Ga = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var u = {
        DetermineComponentFrameRoot: function() {
          try {
            if (r) {
              var L = function() {
                throw Error();
              };
              if (Object.defineProperty(L.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(L, []);
                } catch (B) {
                  var G = B;
                }
                Reflect.construct(e, [], L);
              } else {
                try {
                  L.call();
                } catch (B) {
                  G = B;
                }
                L = !1;
                try {
                  var U = Object.getOwnPropertyDescriptor(
                    e.prototype,
                    "props"
                  );
                  Object.defineProperty(e.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), L = !0, new e();
                } finally {
                  L && (U !== void 0 ? Object.defineProperty(e.prototype, "props", U) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (B) {
                G = B;
              }
              (L = e()) && typeof L.catch == "function" && L.catch(function() {
              });
            }
          } catch (B) {
            if (B && G && typeof B.stack == "string")
              return [B.stack, G.stack];
          }
          return [null, null];
        }
      };
      u.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var c = Object.getOwnPropertyDescriptor(
        u.DetermineComponentFrameRoot,
        "name"
      );
      c && c.configurable && Object.defineProperty(
        u.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var h = u.DetermineComponentFrameRoot(), y = h[0], w = h[1];
      if (y && w) {
        var E = y.split(`
`), x = w.split(`
`);
        for (c = u = 0; u < E.length && !E[u].includes("DetermineComponentFrameRoot"); )
          u++;
        for (; c < x.length && !x[c].includes(
          "DetermineComponentFrameRoot"
        ); )
          c++;
        if (u === E.length || c === x.length)
          for (u = E.length - 1, c = x.length - 1; 1 <= u && 0 <= c && E[u] !== x[c]; )
            c--;
        for (; 1 <= u && 0 <= c; u--, c--)
          if (E[u] !== x[c]) {
            if (u !== 1 || c !== 1)
              do
                if (u--, c--, 0 > c || E[u] !== x[c]) {
                  var O = `
` + E[u].replace(" at new ", " at ");
                  return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), O;
                }
              while (1 <= u && 0 <= c);
            break;
          }
      }
    } finally {
      Ga = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? Or(i) : "";
  }
  function Yu(e) {
    if (typeof e == "string") return Or(e);
    if (typeof e == "function")
      return e.prototype && e.prototype.isReactComponent ? Zi(e, !0) : Zi(e, !1);
    if (typeof e == "object" && e !== null) {
      switch (e.$$typeof) {
        case F:
          return Zi(e.render, !1);
        case $:
          return Zi(e.type, !1);
        case vn:
          var r = e, i = r._payload;
          r = r._init;
          try {
            e = r(i);
          } catch {
            return Or("Lazy");
          }
          return Yu(e);
      }
      if (typeof e.name == "string") {
        n: {
          i = e.name, r = e.env;
          var u = e.debugLocation;
          if (u != null && (e = Error.prepareStackTrace, Error.prepareStackTrace = void 0, u = u.stack, Error.prepareStackTrace = e, u.startsWith(`Error: react-stack-top-frame
`) && (u = u.slice(29)), e = u.indexOf(`
`), e !== -1 && (u = u.slice(e + 1)), e = u.indexOf("react_stack_bottom_frame"), e !== -1 && (e = u.lastIndexOf(`
`, e)), e = e !== -1 ? u = u.slice(0, e) : "", u = e.lastIndexOf(`
`), e = u === -1 ? e : e.slice(u + 1), e.indexOf(i) !== -1)) {
            i = `
` + e;
            break n;
          }
          i = Or(
            i + (r ? " [" + r + "]" : "")
          );
        }
        return i;
      }
    }
    switch (e) {
      case V:
        return Or("SuspenseList");
      case M:
        return Or("Suspense");
      case we:
        return Or("ViewTransition");
    }
    return "";
  }
  function lt(e, r) {
    return (500 < r.byteSize || r.defer) && r.preamble === null;
  }
  function If(e) {
    if (typeof e == "object" && e !== null && typeof e.environmentName == "string") {
      var r = e.environmentName;
      e = [e].slice(0), typeof e[0] == "string" ? e.splice(
        0,
        1,
        "[%s] " + e[0],
        " " + r + " "
      ) : e.splice(0, 0, "[%s]", " " + r + " "), e.unshift(console), r = Ia.apply(console.error, e), r();
    } else console.error(e);
    return null;
  }
  function Lf(e, r, i, u, c, h, y, w, E, x, O) {
    var L = /* @__PURE__ */ new Set();
    this.destination = null, this.flushScheduled = !1, this.resumableState = e, this.renderState = r, this.rootFormatContext = i, this.progressiveChunkSize = u === void 0 ? 12800 : u, this.status = 10, this.fatalError = null, this.aborted = !1, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.byteSize = 0, this.abortableTasks = L, this.pingedTasks = [], this.currentTask = null, this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.postponedState = this.trackedPostpones = null, this.onError = c === void 0 ? If : c, this.onBrowserBailout = h === void 0 ? ze : h, this.onAllReady = y === void 0 ? ze : y, this.onShellReady = w === void 0 ? ze : w, this.onShellError = E === void 0 ? ze : E, this.onFatalError = x === void 0 ? ze : x, this.renderLifetimeController = null, this.formState = O === void 0 ? null : O;
  }
  function Vt(e, r, i, u, c, h, y, w, E, x, O, L) {
    return r = new Lf(
      r,
      i,
      u,
      c,
      h,
      y,
      w,
      E,
      x,
      O,
      L
    ), i = Bl(
      r,
      0,
      null,
      u,
      !1,
      !1
    ), i.parentFlushed = !0, e = Vi(
      r,
      null,
      e,
      -1,
      null,
      i,
      null,
      null,
      r.abortableTasks,
      null,
      u,
      null,
      Rf,
      null,
      null
    ), Kt(e), r.pingedTasks.push(e), r;
  }
  var ye = null;
  function Qi(e, r) {
    e.pingedTasks.push(r), e.pingedTasks.length === 1 && (e.flushScheduled = e.destination !== null, $i(e));
  }
  function Xa(e, r, i, u, c) {
    return i = {
      status: 0,
      rootSegmentID: -1,
      parentFlushed: !1,
      pendingTasks: 0,
      row: r,
      completedSegments: [],
      byteSize: 0,
      defer: c,
      fallbackAbortableTasks: i,
      errorDigest: null,
      contentState: Nn(),
      fallbackState: Nn(),
      preamble: u,
      tracked: null
    }, r !== null && (r.pendingTasks++, u = r.boundaries, u !== null && (e.allPendingTasks++, i.pendingTasks++, u.push(i)), e = r.inheritedHoistables, e !== null && nt(i.contentState, e)), i;
  }
  function Vi(e, r, i, u, c, h, y, w, E, x, O, L, G, U, B) {
    e.allPendingTasks++, c === null ? e.pendingRootTasks++ : c.pendingTasks++, U !== null && U.pendingTasks++;
    var p = {
      replay: null,
      node: i,
      childIndex: u,
      ping: {
        resolve: function() {
          return Qi(e, p);
        },
        reject: function(gn) {
          e.aborted ? p.abortSet.delete(p) && Ir(p, e, gn) : Qi(e, p);
        }
      },
      blockedBoundary: c,
      blockedSegment: h,
      blockedPreamble: y,
      hoistableState: w,
      abortSet: E,
      keyPath: x,
      formatContext: O,
      context: L,
      treeContext: G,
      row: U,
      componentStack: B,
      thenableState: r
    };
    return E.add(p), p;
  }
  function Jt(e, r, i, u, c, h, y, w, E, x, O, L, G, U) {
    e.allPendingTasks++, h === null ? e.pendingRootTasks++ : h.pendingTasks++, G !== null && G.pendingTasks++, i.pendingTasks++;
    var B = {
      replay: i,
      node: u,
      childIndex: c,
      ping: {
        resolve: function() {
          return Qi(e, B);
        },
        reject: function(p) {
          e.aborted ? B.abortSet.delete(B) && Ir(B, e, p) : Qi(e, B);
        }
      },
      blockedBoundary: h,
      blockedSegment: null,
      blockedPreamble: null,
      hoistableState: y,
      abortSet: w,
      keyPath: E,
      formatContext: x,
      context: O,
      treeContext: L,
      row: G,
      componentStack: U,
      thenableState: r
    };
    return w.add(B), B;
  }
  function Bl(e, r, i, u, c, h) {
    return {
      status: 0,
      parentFlushed: !1,
      id: -1,
      index: r,
      chunks: [],
      children: [],
      preambleChildren: [],
      parentFormatContext: u,
      boundary: i,
      lastPushedText: c,
      textEmbedded: h
    };
  }
  function Kt(e) {
    var r = e.node;
    if (typeof r == "object" && r !== null)
      switch (r.$$typeof) {
        case N:
          e.componentStack = { parent: e.componentStack, type: r.type };
      }
  }
  function Za(e) {
    return e === null ? null : { parent: e.parent, type: "Suspense Fallback" };
  }
  function ur(e) {
    var r = {};
    return e && Object.defineProperty(r, "componentStack", {
      configurable: !0,
      enumerable: !0,
      get: function() {
        try {
          var i = "", u = e;
          do
            i += Yu(u.type), u = u.parent;
          while (u);
          var c = i;
        } catch (h) {
          c = `
Error generating stack: ` + h.message + `
` + h.stack;
        }
        return Object.defineProperty(r, "componentStack", {
          value: c
        }), c;
      }
    }), r;
  }
  function An(e, r, i) {
    if (Yi(r))
      return e = e.onBrowserBailout, e(r, i), "";
    if (e = e.onError, r = e(r, i), r == null || typeof r == "string")
      return r === "" ? void 0 : r;
  }
  function He(e, r) {
    var i = e.onShellError, u = e.onFatalError;
    e.pendingRootTasks !== 0 && i(r), u(r), ta(e), e.destination !== null ? (e.status = 13, e.destination.destroy(r)) : (e.status = 12, e.aborted || (e.fatalError = r));
  }
  function Re(e, r) {
    Qa(e, r.next, r.hoistables);
  }
  function Qa(e, r, i) {
    for (; r !== null; ) {
      i !== null && (nt(r.hoistables, i), r.inheritedHoistables = i);
      var u = r.boundaries;
      if (u !== null) {
        r.boundaries = null;
        for (var c = 0; c < u.length; c++) {
          var h = u[c];
          i !== null && nt(h.contentState, i), xl(e, h, null, null);
        }
      }
      if (r.pendingTasks--, 0 < r.pendingTasks) break;
      i = r.hoistables, r = r.next;
    }
  }
  function Va(e, r) {
    var i = r.boundaries;
    if (i !== null && r.pendingTasks === i.length) {
      for (var u = !0, c = 0; c < i.length; c++) {
        var h = i[c];
        if (h.pendingTasks !== 1 || h.parentFlushed || lt(e, h)) {
          u = !1;
          break;
        }
      }
      u && Qa(e, r, r.hoistables);
    }
  }
  function rt(e) {
    var r = {
      pendingTasks: 1,
      boundaries: null,
      hoistables: Nn(),
      inheritedHoistables: null,
      together: !1,
      next: null
    };
    return e !== null && 0 < e.pendingTasks && (r.pendingTasks++, r.boundaries = [], e.next = r), r;
  }
  function Gu(e, r, i, u, c) {
    var h = r.keyPath, y = r.treeContext, w = r.row;
    r.keyPath = i, i = u.length;
    var E = null;
    if (r.replay !== null) {
      var x = r.replay.slots;
      if (x !== null && typeof x == "object")
        for (var O = 0; O < i; O++) {
          var L = c !== "backwards" && c !== "unstable_legacy-backwards" ? O : i - 1 - O, G = u[L];
          r.row = E = rt(
            E
          ), r.treeContext = tr(y, i, L);
          var U = x[L];
          typeof U == "number" ? (Ki(e, r, U, G, L), delete x[L]) : pn(e, r, G, L), --E.pendingTasks === 0 && Re(e, E);
        }
      else
        for (x = 0; x < i; x++)
          O = c !== "backwards" && c !== "unstable_legacy-backwards" ? x : i - 1 - x, L = u[O], r.row = E = rt(E), r.treeContext = tr(y, i, O), pn(e, r, L, O), --E.pendingTasks === 0 && Re(e, E);
    } else if (c !== "backwards" && c !== "unstable_legacy-backwards")
      for (c = 0; c < i; c++)
        x = u[c], r.row = E = rt(E), r.treeContext = tr(
          y,
          i,
          c
        ), pn(e, r, x, c), --E.pendingTasks === 0 && Re(e, E);
    else {
      for (x = r.blockedSegment, O = x.children.length, L = x.chunks.length, G = 0; G < i; G++) {
        U = c === "unstable_legacy-backwards" ? i - 1 - G : G;
        var B = u[U];
        r.row = E = rt(
          E
        ), r.treeContext = tr(
          y,
          i,
          U
        );
        var p = Bl(
          e,
          L,
          null,
          r.formatContext,
          U === 0 ? x.lastPushedText : !0,
          !0
        );
        x.children.splice(O, 0, p), r.blockedSegment = p;
        try {
          pn(e, r, B, U), er(
            p.chunks,
            e.renderState,
            p.lastPushedText,
            p.textEmbedded
          ), p.status = 1, --E.pendingTasks === 0 && Re(e, E);
        } catch (gn) {
          throw p.status = e.aborted ? 3 : 4, gn;
        }
      }
      r.blockedSegment = x, x.lastPushedText = !1;
    }
    w !== null && E !== null && 0 < E.pendingTasks && (w.pendingTasks++, E.next = w), r.treeContext = y, r.row = w, r.keyPath = h;
  }
  function Xu(e, r, i, u, c, h) {
    var y = r.thenableState;
    for (r.thenableState = null, zl = {}, za = r, Ha = e, Ba = i, Xt = Gt = 0, Zt = -1, Ui = 0, et = y, e = u(c, h); Wi; )
      Wi = !1, Xt = Gt = 0, Zt = -1, Ui = 0, Gi += 1, In = null, e = u(c, h);
    return Qt(), e;
  }
  function Zu(e, r, i, u, c, h, y) {
    var w = !1;
    if (h !== 0 && e.formState !== null) {
      var E = r.blockedSegment;
      if (E !== null) {
        w = !0, E = E.chunks;
        for (var x = 0; x < h; x++)
          x === y ? E.push("<!--F!-->") : E.push("<!--F-->");
      }
    }
    h = r.keyPath, r.keyPath = i, c ? (i = r.treeContext, r.treeContext = tr(i, 1, 0), pn(e, r, u, -1), r.treeContext = i) : w ? pn(e, r, u, -1) : Be(e, r, u, -1), r.keyPath = h;
  }
  function Ji(e, r, i, u, c, h) {
    if (typeof u == "function")
      if (u.prototype && u.prototype.isReactComponent) {
        var y = c;
        if ("ref" in c) {
          y = {};
          for (var w in c)
            w !== "ref" && (y[w] = c[w]);
        }
        var E = u.defaultProps;
        if (E) {
          y === c && (y = te({}, y, c));
          for (var x in E)
            y[x] === void 0 && (y[x] = E[x]);
        }
        var O = y, L = re, G = u.contextType;
        typeof G == "object" && G !== null && (L = G._currentValue2);
        var U = new u(
          O,
          L
        ), B = U.state !== void 0 ? U.state : null;
        U.updater = ku, U.props = O, U.state = B;
        var p = { queue: [], replace: !1 };
        U._reactInternals = p;
        var gn = u.contextType;
        U.context = typeof gn == "object" && gn !== null ? gn._currentValue2 : re;
        var hn = u.getDerivedStateFromProps;
        if (typeof hn == "function") {
          var xn = hn(
            O,
            B
          ), m = xn == null ? B : te({}, B, xn);
          U.state = m;
        }
        if (typeof u.getDerivedStateFromProps != "function" && typeof U.getSnapshotBeforeUpdate != "function" && (typeof U.UNSAFE_componentWillMount == "function" || typeof U.componentWillMount == "function")) {
          var kn = U.state;
          if (typeof U.componentWillMount == "function" && U.componentWillMount(), typeof U.UNSAFE_componentWillMount == "function" && U.UNSAFE_componentWillMount(), kn !== U.state && ku.enqueueReplaceState(
            U,
            U.state,
            null
          ), p.queue !== null && 0 < p.queue.length) {
            var un = p.queue, sn = p.replace;
            if (p.queue = null, p.replace = !1, sn && un.length === 1)
              U.state = un[0];
            else {
              for (var Rn = sn ? un[0] : U.state, be = !0, cn = sn ? 1 : 0; cn < un.length; cn++) {
                var Sn = un[cn], Zn = typeof Sn == "function" ? Sn.call(
                  U,
                  Rn,
                  O,
                  void 0
                ) : Sn;
                Zn != null && (be ? (be = !1, Rn = te({}, Rn, Zn)) : te(Rn, Zn));
              }
              U.state = Rn;
            }
          } else p.queue = null;
        }
        var mn = U.render();
        if (e.aborted) throw null;
        var _n = r.keyPath;
        r.keyPath = i, Be(e, r, mn, -1), r.keyPath = _n;
      } else {
        var qn = Xu(e, r, i, u, c, void 0);
        if (e.aborted) throw null;
        Zu(
          e,
          r,
          i,
          qn,
          Gt !== 0,
          Xt,
          Zt
        );
      }
    else if (typeof u == "string") {
      var Yn = r.blockedSegment;
      if (Yn === null) {
        var Pe = c.children, We = r.formatContext, jn = r.keyPath;
        r.formatContext = ou(We, u, c), r.keyPath = i, pn(e, r, Pe, -1), r.formatContext = We, r.keyPath = jn;
      } else {
        var Ue = bu(
          Yn.chunks,
          u,
          c,
          e.resumableState,
          e.renderState,
          r.blockedPreamble,
          r.hoistableState,
          r.formatContext,
          Yn.lastPushedText
        );
        Yn.lastPushedText = !1;
        var $n = r.formatContext, hl = r.keyPath;
        if (r.keyPath = i, (r.formatContext = ou(
          $n,
          u,
          c
        )).insertionMode === 3) {
          var ce = Bl(
            e,
            0,
            null,
            r.formatContext,
            !1,
            !1
          );
          Yn.preambleChildren.push(ce), r.blockedSegment = ce;
          try {
            pn(e, r, Ue, -1), er(
              ce.chunks,
              e.renderState,
              ce.lastPushedText,
              ce.textEmbedded
            ), ce.status = 1;
          } finally {
            r.blockedSegment = Yn;
          }
        } else pn(e, r, Ue, -1);
        r.formatContext = $n, r.keyPath = hl;
        n: {
          var je = Yn.chunks, sl = e.resumableState;
          switch (u) {
            case "title":
            case "style":
            case "script":
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "img":
            case "input":
            case "keygen":
            case "link":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr":
              break n;
            case "body":
              if (1 >= $n.insertionMode) {
                sl.hasBody = !0;
                break n;
              }
              break;
            case "html":
              if ($n.insertionMode === 0) {
                sl.hasHtml = !0;
                break n;
              }
              break;
            case "head":
              if (1 >= $n.insertionMode) break n;
          }
          je.push(Dl(u));
        }
        Yn.lastPushedText = !1;
      }
    } else {
      switch (u) {
        case Nl:
        case K:
        case tn:
        case Z:
          var Pl = r.keyPath;
          r.keyPath = i, Be(e, r, c.children, -1), r.keyPath = Pl;
          return;
        case rl:
          var zn = r.blockedSegment;
          if (zn === null) {
            if (c.mode !== "hidden") {
              var Ul = r.keyPath;
              r.keyPath = i, pn(e, r, c.children, -1), r.keyPath = Ul;
            }
          } else if (c.mode !== "hidden") {
            e.renderState.generateStaticMarkup || zn.chunks.push("<!--&-->"), zn.lastPushedText = !1;
            var cr = r.keyPath;
            r.keyPath = i, pn(e, r, c.children, -1), r.keyPath = cr, e.renderState.generateStaticMarkup || zn.chunks.push("<!--/&-->"), zn.lastPushedText = !1;
          }
          return;
        case V:
          n: {
            var dl = c.children, or = c.revealOrder;
            if (or !== "independent" && or !== "together") {
              if (en(dl)) {
                Gu(
                  e,
                  r,
                  i,
                  dl,
                  or
                );
                break n;
              }
              var it = Pn(dl);
              if (it) {
                var Yl = it.call(dl);
                if (Yl) {
                  var at = Yl.next();
                  if (!at.done) {
                    do
                      at = Yl.next();
                    while (!at.done);
                    Gu(
                      e,
                      r,
                      i,
                      dl,
                      or
                    );
                  }
                  break n;
                }
              }
            }
            if (or === "together") {
              var ut = r.keyPath, vl = r.row, Qn = r.row = rt(null);
              Qn.boundaries = [], Qn.together = !0, r.keyPath = i, Be(e, r, dl, -1), --Qn.pendingTasks === 0 && Re(e, Qn), r.keyPath = ut, r.row = vl, vl !== null && 0 < Qn.pendingTasks && (vl.pendingTasks++, Qn.next = vl);
            } else {
              var ft = r.keyPath;
              r.keyPath = i, Be(e, r, dl, -1), r.keyPath = ft;
            }
          }
          return;
        case we:
          var hr = r.formatContext, sr = r.keyPath, Dr = e.resumableState;
          if (c.name == null || c.name === "auto") {
            var Ye = Su(r.treeContext);
            hu(Dr, Ye, 0);
          }
          if (r.formatContext = hr, r.keyPath = i, c.name != null && c.name !== "auto")
            Be(e, r, c.children, -1);
          else {
            var dr = r.treeContext;
            r.treeContext = tr(dr, 1, 0), pn(e, r, c.children, -1), r.treeContext = dr;
          }
          r.formatContext = hr, r.keyPath = sr;
          return;
        case Ne:
          throw Error(s(343));
        case M:
          n: if (r.replay !== null) {
            var vr = r.keyPath, Gl = r.formatContext, zr = r.row;
            r.keyPath = i, r.formatContext = Ci(
              e.resumableState,
              Gl
            ), r.row = null;
            var gl = c.children;
            try {
              pn(e, r, gl, -1);
            } finally {
              r.keyPath = vr, r.formatContext = Gl, r.row = zr;
            }
          } else {
            var ct = r.keyPath, Hn = r.formatContext, oe = r.row, Hr = r.blockedBoundary, yl = r.blockedPreamble, ot = r.hoistableState, he = r.blockedSegment, bl = c.fallback, Ml = c.children, Ge = /* @__PURE__ */ new Set(), nn = Xa(
              e,
              r.row,
              Ge,
              null,
              !1
            ), Te = Bl(
              e,
              he.chunks.length,
              nn,
              r.formatContext,
              !1,
              !1
            );
            he.children.push(Te), he.lastPushedText = !1;
            var Fn = Bl(
              e,
              0,
              null,
              r.formatContext,
              !1,
              !1
            );
            Fn.parentFlushed = !0;
            var Br = e.trackedPostpones;
            if (Br !== null) {
              var gr = r.componentStack, Cl = [i[0], "Suspense Fallback", i[2]];
              if (Br !== null) {
                var ei = [
                  Cl[1],
                  Cl[2],
                  [],
                  null
                ];
                Br.workingMap.set(
                  Cl,
                  ei
                ), nn.tracked = {
                  contentKeyPath: i,
                  fallbackNode: ei
                };
              }
              r.blockedSegment = Te, r.blockedPreamble = nn.preamble === null ? null : nn.preamble.fallback, r.keyPath = Cl, r.formatContext = Ma(
                e.resumableState,
                Hn
              ), r.componentStack = Za(
                gr
              );
              try {
                pn(e, r, bl, -1), er(
                  Te.chunks,
                  e.renderState,
                  Te.lastPushedText,
                  Te.textEmbedded
                ), Te.status = 1;
              } catch (_e) {
                throw Te.status = e.aborted ? 3 : 4, _e;
              } finally {
                r.blockedSegment = he, r.blockedPreamble = yl, r.keyPath = ct, r.formatContext = Hn;
              }
              var li = Vi(
                e,
                null,
                Ml,
                -1,
                nn,
                Fn,
                nn.preamble === null ? null : nn.preamble.content,
                nn.contentState,
                r.abortSet,
                i,
                Ci(
                  e.resumableState,
                  r.formatContext
                ),
                r.context,
                r.treeContext,
                null,
                gr
              );
              Kt(li), e.pingedTasks.push(li);
            } else {
              r.blockedBoundary = nn, r.blockedPreamble = nn.preamble === null ? null : nn.preamble.content, r.hoistableState = nn.contentState, r.blockedSegment = Fn, r.keyPath = i, r.formatContext = Ci(
                e.resumableState,
                Hn
              ), r.row = null;
              try {
                if (pn(e, r, Ml, -1), er(
                  Fn.chunks,
                  e.renderState,
                  Fn.lastPushedText,
                  Fn.textEmbedded
                ), Fn.status = 1, Wl(nn, Fn), nn.pendingTasks === 0 && nn.status === 0) {
                  if (nn.status = 1, !lt(e, nn)) {
                    oe !== null && --oe.pendingTasks === 0 && Re(e, oe), e.pendingRootTasks === 0 && r.blockedPreamble && Lr(e);
                    break n;
                  }
                } else
                  oe !== null && oe.together && Va(e, oe);
              } catch (_e) {
                if (nn.status = 4, e.aborted) {
                  Fn.status = 3;
                  var al = e.fatalError;
                } else Fn.status = 4, al = _e;
                var Xl = ur(r.componentStack), Al = An(e, al, Xl);
                nn.errorDigest = Al, pt(e, nn);
              } finally {
                r.blockedBoundary = Hr, r.blockedPreamble = yl, r.hoistableState = ot, r.blockedSegment = he, r.keyPath = ct, r.formatContext = Hn, r.row = oe;
              }
              var ne = Vi(
                e,
                null,
                bl,
                -1,
                Hr,
                Te,
                nn.preamble === null ? null : nn.preamble.fallback,
                nn.fallbackState,
                Ge,
                [i[0], "Suspense Fallback", i[2]],
                Ma(
                  e.resumableState,
                  r.formatContext
                ),
                r.context,
                r.treeContext,
                r.row,
                Za(
                  r.componentStack
                )
              );
              Kt(ne), e.pingedTasks.push(ne);
            }
          }
          return;
      }
      if (typeof u == "object" && u !== null)
        switch (u.$$typeof) {
          case F:
            if ("ref" in c) {
              var kl = {};
              for (var Sl in c)
                Sl !== "ref" && (kl[Sl] = c[Sl]);
            } else kl = c;
            var ht = Xu(
              e,
              r,
              i,
              u.render,
              kl,
              h
            );
            Zu(
              e,
              r,
              i,
              ht,
              Gt !== 0,
              Xt,
              Zt
            );
            return;
          case $:
            Ji(e, r, i, u.type, c, h);
            return;
          case fn:
            var ri = c.children, ti = r.keyPath, Wr = c.value, ii = u._currentValue2;
            u._currentValue2 = Wr;
            var Ln = Fr, Ur = {
              parent: Ln,
              depth: Ln === null ? 0 : Ln.depth + 1,
              context: u,
              parentValue: ii,
              value: Wr
            };
            Fr = Ur, r.context = Ur, r.keyPath = i, Be(e, r, ri, -1);
            var Tl = Fr;
            if (Tl === null) throw Error(s(403));
            Tl.context._currentValue2 = Tl.parentValue;
            var Zl = Fr = Tl.parent;
            r.context = Zl, r.keyPath = ti;
            return;
          case an:
            var El = c.children, st = El(u._context._currentValue2), dt = r.keyPath;
            r.keyPath = i, Be(e, r, st, -1), r.keyPath = dt;
            return;
          case vn:
            var vt = u._init, _l = vt(u._payload);
            if (e.aborted) throw null;
            Ji(e, r, i, _l, c, h);
            return;
        }
      throw Error(
        s(130, u == null ? u : typeof u, "")
      );
    }
  }
  function Ki(e, r, i, u, c) {
    var h = r.replay, y = r.blockedBoundary, w = Bl(
      e,
      0,
      null,
      r.formatContext,
      !1,
      !1
    );
    w.id = i, w.parentFlushed = !0;
    try {
      r.replay = null, r.blockedSegment = w, pn(e, r, u, c), w.status = 1, y === null ? e.completedRootSegment = w : (Wl(y, w), y.parentFlushed && e.partialBoundaries.push(y));
    } finally {
      r.replay = h, r.blockedSegment = null;
    }
  }
  function Be(e, r, i, u) {
    r.replay !== null && typeof r.replay.slots == "number" ? Ki(e, r, r.replay.slots, i, u) : (r.node = i, r.childIndex = u, i = r.componentStack, Kt(r), tt(e, r), r.componentStack = i);
  }
  function tt(e, r) {
    var i = r.node, u = r.childIndex;
    if (i !== null) {
      if (typeof i == "object") {
        switch (i.$$typeof) {
          case N:
            var c = i.type, h = i.key, y = i.props;
            i = y.ref;
            var w = i !== void 0 ? i : null, E = Ut(c), x = h == null || h === Sr ? u === -1 ? 0 : u : h;
            if (h = [r.keyPath, E, x], r.replay !== null)
              n: {
                var O = r.replay;
                for (u = O.nodes, i = 0; i < u.length; i++) {
                  var L = u[i];
                  if (x === L[1]) {
                    if (L.length === 4) {
                      if (E !== null && E !== L[0])
                        throw Error(
                          s(490, L[0], E)
                        );
                      var G = L[2], U = L[3], B = r.node;
                      r.replay = {
                        nodes: G,
                        slots: U,
                        pendingTasks: 1
                      };
                      try {
                        if (Ji(e, r, h, c, y, w), r.replay.pendingTasks === 1 && 0 < r.replay.nodes.length)
                          throw Error(s(488));
                        r.replay.pendingTasks--;
                      } catch (Rn) {
                        if (typeof Rn == "object" && Rn !== null && (Rn === Se || typeof Rn.then == "function" || Rn.message === "Maximum call stack size exceeded"))
                          throw r.node === B ? r.replay = O : u.splice(i, 1), Rn;
                        r.replay.pendingTasks--, h = ur(r.componentStack), B = e, y = r.blockedBoundary, e = e.aborted ? e.fatalError : Rn, h = An(B, e, h), mt(
                          B,
                          y,
                          G,
                          U,
                          e,
                          h
                        );
                      }
                      r.replay = O;
                    } else {
                      if (c !== M)
                        throw Error(
                          s(
                            490,
                            "Suspense",
                            Ut(c) || "Unknown"
                          )
                        );
                      e: {
                        O = L[5], c = L[2], w = L[3], E = L[4] === null ? [] : L[4][2], L = L[4] === null ? null : L[4][3], x = r.keyPath;
                        var p = r.formatContext, gn = r.row, hn = r.replay, xn = r.blockedBoundary, m = r.hoistableState, kn = y.children;
                        y = y.fallback;
                        var un = /* @__PURE__ */ new Set(), sn = Xa(
                          e,
                          r.row,
                          un,
                          null,
                          !1
                        );
                        sn.parentFlushed = !0, sn.rootSegmentID = O, r.blockedBoundary = sn, r.hoistableState = sn.contentState, r.keyPath = h, r.formatContext = Ci(
                          e.resumableState,
                          p
                        ), r.row = null, r.replay = {
                          nodes: c,
                          slots: w,
                          pendingTasks: 1
                        };
                        try {
                          if (pn(e, r, kn, -1), r.replay.pendingTasks === 1 && 0 < r.replay.nodes.length)
                            throw Error(s(488));
                          if (r.replay.pendingTasks--, sn.pendingTasks === 0 && sn.status === 0) {
                            sn.status = 1, e.completedBoundaries.push(sn);
                            break e;
                          }
                        } catch (Rn) {
                          sn.status = 4, G = e.aborted ? e.fatalError : Rn, U = ur(r.componentStack), B = An(
                            e,
                            G,
                            U
                          ), sn.errorDigest = B, r.replay.pendingTasks--, e.clientRenderedBoundaries.push(
                            sn
                          );
                        } finally {
                          r.blockedBoundary = xn, r.hoistableState = m, r.replay = hn, r.keyPath = x, r.formatContext = p, r.row = gn;
                        }
                        G = Jt(
                          e,
                          null,
                          { nodes: E, slots: L, pendingTasks: 0 },
                          y,
                          -1,
                          xn,
                          sn.fallbackState,
                          un,
                          [h[0], "Suspense Fallback", h[2]],
                          Ma(
                            e.resumableState,
                            r.formatContext
                          ),
                          r.context,
                          r.treeContext,
                          r.row,
                          Za(
                            r.componentStack
                          )
                        ), Kt(G), e.pingedTasks.push(G);
                      }
                    }
                    u.splice(i, 1);
                    break n;
                  }
                }
              }
            else Ji(e, r, h, c, y, w);
            return;
          case S:
            throw Error(s(257));
          case vn:
            if (G = i._init, i = G(i._payload), e.aborted) throw null;
            Be(e, r, i, u);
            return;
        }
        if (en(i)) {
          pi(e, r, i, u);
          return;
        }
        if ((G = Pn(i)) && (G = G.call(i))) {
          if (i = G.next(), !i.done) {
            U = [];
            do
              U.push(i.value), i = G.next();
            while (!i.done);
            pi(e, r, U, u);
          }
          return;
        }
        if (typeof i.then == "function")
          return r.thenableState = null, Be(e, r, Bu(i), u);
        if (i.$$typeof === fn)
          return Be(
            e,
            r,
            i._currentValue2,
            u
          );
        throw u = Object.prototype.toString.call(i), Error(
          s(
            31,
            u === "[object Object]" ? "object with keys {" + Object.keys(i).join(", ") + "}" : u
          )
        );
      }
      typeof i == "string" ? (u = r.blockedSegment, u !== null && (u.lastPushedText = Li(
        u.chunks,
        i,
        e.renderState,
        u.lastPushedText
      ))) : (typeof i == "number" || typeof i == "bigint") && (u = r.blockedSegment, u !== null && (u.lastPushedText = Li(
        u.chunks,
        "" + i,
        e.renderState,
        u.lastPushedText
      )));
    }
  }
  function pi(e, r, i, u) {
    var c = r.keyPath;
    if (u !== -1 && (r.keyPath = [r.keyPath, "Fragment", u], r.replay !== null)) {
      for (var h = r.replay, y = h.nodes, w = 0; w < y.length; w++) {
        var E = y[w];
        if (E[1] === u) {
          u = E[2], E = E[3], r.replay = { nodes: u, slots: E, pendingTasks: 1 };
          try {
            if (pi(e, r, i, -1), r.replay.pendingTasks === 1 && 0 < r.replay.nodes.length)
              throw Error(s(488));
            r.replay.pendingTasks--;
          } catch (L) {
            if (typeof L == "object" && L !== null && (L === Se || typeof L.then == "function"))
              throw L;
            r.replay.pendingTasks--;
            var x = ur(r.componentStack);
            i = e;
            var O = r.blockedBoundary;
            e = e.aborted ? e.fatalError : L, x = An(i, e, x), mt(
              i,
              O,
              u,
              E,
              e,
              x
            );
          }
          r.replay = h, y.splice(w, 1);
          break;
        }
      }
      r.keyPath = c;
      return;
    }
    if (h = r.treeContext, y = i.length, r.replay !== null && (w = r.replay.slots, w !== null && typeof w == "object")) {
      for (u = 0; u < y; u++)
        E = i[u], r.treeContext = tr(h, y, u), O = w[u], typeof O == "number" ? (Ki(e, r, O, E, u), delete w[u]) : pn(e, r, E, u);
      r.treeContext = h, r.keyPath = c;
      return;
    }
    for (w = 0; w < y; w++)
      u = i[w], r.treeContext = tr(h, y, w), pn(e, r, u, w);
    r.treeContext = h, r.keyPath = c;
  }
  function Ja(e, r, i) {
    i.status = 5, i.rootSegmentID = e.nextSegmentId++;
    var u = i.tracked;
    if (u === null || (e = u.contentKeyPath, e === null)) throw Error(s(486));
    u = u.fallbackNode;
    var c = [], h = r.workingMap.get(e);
    return h === void 0 ? (i = [
      e[1],
      e[2],
      c,
      null,
      u,
      i.rootSegmentID
    ], r.workingMap.set(e, i), ni(i, e[0], r), i) : (h[4] = u, h[5] = i.rootSegmentID, h);
  }
  function mi(e, r, i, u) {
    u.status = 5;
    var c = i.keyPath, h = i.blockedBoundary;
    if (h === null)
      u.id = e.nextSegmentId++, r.rootSlots = u.id, e.completedRootSegment !== null && (e.completedRootSegment.status = 5);
    else {
      if (h !== null && h.status === 0) {
        var y = Ja(
          e,
          r,
          h
        );
        if (h.tracked !== null && h.tracked.contentKeyPath === c && i.childIndex === -1) {
          u.id === -1 && (u.id = u.parentFlushed ? h.rootSegmentID : e.nextSegmentId++), y[3] = u.id;
          return;
        }
      }
      if (u.id === -1 && (u.id = u.parentFlushed && h !== null ? h.rootSegmentID : e.nextSegmentId++), i.childIndex === -1)
        c === null ? r.rootSlots = u.id : (i = r.workingMap.get(c), i === void 0 ? (i = [c[1], c[2], [], u.id], ni(i, c[0], r)) : i[3] = u.id);
      else {
        if (c === null) {
          if (e = r.rootSlots, e === null)
            e = r.rootSlots = {};
          else if (typeof e == "number")
            throw Error(s(491));
        } else if (h = r.workingMap, y = h.get(c), y === void 0)
          e = {}, y = [c[1], c[2], [], e], h.set(c, y), ni(y, c[0], r);
        else if (e = y[3], e === null)
          e = y[3] = {};
        else if (typeof e == "number")
          throw Error(s(491));
        e[i.childIndex] = u.id;
      }
    }
  }
  function pt(e, r) {
    e = e.trackedPostpones, e !== null && (r = r.tracked, r !== null && (r = r.contentKeyPath, r !== null && (e = e.workingMap.get(r), e !== void 0 && (e.length = 4, e[2] = [], e[3] = null))));
  }
  function Qu(e, r, i) {
    return Jt(
      e,
      i,
      r.replay,
      r.node,
      r.childIndex,
      r.blockedBoundary,
      r.hoistableState,
      r.abortSet,
      r.keyPath,
      r.formatContext,
      r.context,
      r.treeContext,
      r.row,
      r.componentStack
    );
  }
  function Vu(e, r, i) {
    var u = r.blockedSegment, c = Bl(
      e,
      u.chunks.length,
      null,
      r.formatContext,
      u.lastPushedText,
      !0
    );
    return u.children.push(c), u.lastPushedText = !1, Vi(
      e,
      i,
      r.node,
      r.childIndex,
      r.blockedBoundary,
      c,
      r.blockedPreamble,
      r.hoistableState,
      r.abortSet,
      r.keyPath,
      r.formatContext,
      r.context,
      r.treeContext,
      r.row,
      r.componentStack
    );
  }
  function pn(e, r, i, u) {
    var c = r.formatContext, h = r.context, y = r.keyPath, w = r.treeContext, E = r.componentStack, x = r.blockedSegment;
    if (x === null) {
      x = r.replay;
      try {
        return Be(e, r, i, u);
      } catch (G) {
        if (Qt(), i = G === Se ? Hi() : G, !e.aborted && typeof i == "object" && i !== null) {
          if (typeof i.then == "function") {
            u = G === Se ? ar() : null, e = Qu(e, r, u).ping, i.then(e.resolve, e.reject), r.formatContext = c, r.context = h, r.keyPath = y, r.treeContext = w, r.componentStack = E, r.replay = x, rr(h);
            return;
          }
          if (i.message === "Maximum call stack size exceeded") {
            i = G === Se ? ar() : null, i = Qu(e, r, i), e.pingedTasks.push(i), r.formatContext = c, r.context = h, r.keyPath = y, r.treeContext = w, r.componentStack = E, r.replay = x, rr(h);
            return;
          }
        }
      }
    } else {
      var O = x.children.length, L = x.chunks.length;
      try {
        return Be(e, r, i, u);
      } catch (G) {
        if (Qt(), x.children.length = O, x.chunks.length = L, i = G === Se ? Hi() : G, !e.aborted && typeof i == "object" && i !== null) {
          if (typeof i.then == "function") {
            x = i, i = G === Se ? ar() : null, e = Vu(e, r, i).ping, x.then(e.resolve, e.reject), r.formatContext = c, r.context = h, r.keyPath = y, r.treeContext = w, r.componentStack = E, rr(h);
            return;
          }
          if (i.message === "Maximum call stack size exceeded") {
            x = G === Se ? ar() : null, x = Vu(e, r, x), e.pingedTasks.push(x), r.formatContext = c, r.context = h, r.keyPath = y, r.treeContext = w, r.componentStack = E, rr(h);
            return;
          }
        }
      }
    }
    throw r.formatContext = c, r.context = h, r.keyPath = y, r.treeContext = w, rr(h), i;
  }
  function Nf(e) {
    var r = e.blockedBoundary, i = e.blockedSegment;
    i !== null && (i.status = 3, xl(this, r, e.row, i));
  }
  function mt(e, r, i, u, c, h) {
    for (var y = 0; y < i.length; y++) {
      var w = i[y];
      if (w.length === 4)
        mt(
          e,
          r,
          w[2],
          w[3],
          c,
          h
        );
      else {
        w = w[5];
        var E = e, x = h, O = Xa(
          E,
          null,
          /* @__PURE__ */ new Set(),
          null,
          !1
        );
        O.parentFlushed = !0, O.rootSegmentID = w, O.status = 4, O.errorDigest = x, O.parentFlushed && E.clientRenderedBoundaries.push(O);
      }
    }
    if (i.length = 0, u !== null) {
      if (r === null) throw Error(s(487));
      if (r.status !== 4 && (r.status = 4, r.errorDigest = h, r.parentFlushed && e.clientRenderedBoundaries.push(r)), typeof u == "object") for (var L in u) delete u[L];
    }
  }
  function qi(e, r) {
    if (e !== r.currentTask) {
      var i = e.blockedBoundary;
      e = e.blockedSegment, e !== null && (e.status = 3), i !== null && i.fallbackAbortableTasks.forEach(function(u) {
        return qi(u, r);
      });
    }
  }
  function Ir(e, r, i) {
    if (e !== r.currentTask) {
      var u = e.blockedBoundary, c = e.blockedSegment;
      if (c === null || c.status === 3) {
        var h = ur(e.componentStack), y = Yi(i);
        if (u === null) {
          if (u = e.replay, u === null) {
            y || r.trackedPostpones === null || c === null ? y ? (e = Wa(i), An(r, e, h), r.status !== 12 && r.status !== 13 && He(r, e)) : (An(r, i, h), r.status !== 12 && r.status !== 13 && He(r, i)) : (u = r.trackedPostpones, An(r, i, h), mi(r, u, e, c), xl(r, null, e.row, c));
            return;
          }
          r.status !== 12 && r.status !== 13 && (u.pendingTasks--, u.pendingTasks === 0 && 0 < u.nodes.length && (h = An(r, i, h), mt(
            r,
            null,
            u.nodes,
            u.slots,
            i,
            h
          )), r.pendingRootTasks--, r.pendingRootTasks === 0 && pa(r));
        } else {
          var w = r.trackedPostpones;
          if (u.status !== 4) {
            if (!y && w !== null && c !== null)
              return An(r, i, h), mi(r, w, e, c), u.fallbackAbortableTasks.forEach(function(E) {
                return Ir(E, r, i);
              }), u.fallbackAbortableTasks.clear(), xl(r, u, e.row, c);
            u.status = 4, h = An(r, i, h), u.errorDigest = h, pt(r, u), u.parentFlushed && r.clientRenderedBoundaries.push(u);
          }
          u.pendingTasks--, h = u.row, h !== null && --h.pendingTasks === 0 && Re(r, h), u.fallbackAbortableTasks.forEach(function(E) {
            return Ir(E, r, i);
          }), u.fallbackAbortableTasks.clear();
        }
        e = e.row, e !== null && --e.pendingTasks === 0 && Re(r, e), r.allPendingTasks--, r.allPendingTasks === 0 && ji(r);
      }
    }
  }
  function Ka(e, r) {
    try {
      var i = e.renderState, u = i.onHeaders;
      if (u) {
        var c = i.headers;
        if (c) {
          i.headers = null;
          var h = c.preconnects;
          if (c.fontPreloads && (h && (h += ", "), h += c.fontPreloads), c.highImagePreloads && (h && (h += ", "), h += c.highImagePreloads), !r) {
            var y = i.styles.values(), w = y.next();
            n: for (; 0 < c.remainingCapacity && !w.done; w = y.next())
              for (var E = w.value.sheets.values(), x = E.next(); 0 < c.remainingCapacity && !x.done; x = E.next()) {
                var O = x.value, L = O.props, G = L.href, U = O.props, B = ue(U.href, "style", {
                  crossOrigin: U.crossOrigin,
                  integrity: U.integrity,
                  nonce: U.nonce,
                  type: U.type,
                  fetchPriority: U.fetchPriority,
                  referrerPolicy: U.referrerPolicy,
                  media: U.media
                });
                if (0 <= (c.remainingCapacity -= B.length + 2))
                  i.resets.style[G] = q, h && (h += ", "), h += B, i.resets.style[G] = typeof L.crossOrigin == "string" || typeof L.integrity == "string" ? [L.crossOrigin, L.integrity] : q;
                else break n;
              }
          }
          u(h ? { Link: h } : {});
        }
      }
    } catch (p) {
      An(e, p, {});
    }
  }
  function pa(e) {
    e.trackedPostpones === null && Ka(e, !0), e.trackedPostpones === null && Lr(e), e = e.onShellReady, e();
  }
  function ji(e) {
    Ka(
      e,
      e.trackedPostpones === null ? !0 : e.completedRootSegment === null || e.completedRootSegment.status !== 5
    ), Lr(e), e = e.onAllReady, e();
  }
  function Wl(e, r) {
    if (r.chunks.length === 0 && r.children.length === 1 && r.children[0].boundary === null && r.children[0].id === -1) {
      var i = r.children[0];
      i.id = r.id, i.parentFlushed = !0, i.status !== 1 && i.status !== 3 && i.status !== 4 || Wl(e, i);
    } else e.completedSegments.push(r);
  }
  function xl(e, r, i, u) {
    if (i !== null && (--i.pendingTasks === 0 ? Re(e, i) : i.together && Va(e, i)), e.allPendingTasks--, r === null) {
      if (u !== null && u.parentFlushed) {
        if (e.completedRootSegment !== null)
          throw Error(s(389));
        e.completedRootSegment = u;
      }
      e.pendingRootTasks--, e.pendingRootTasks === 0 && pa(e);
    } else if (r.pendingTasks--, r.status !== 4)
      if (r.pendingTasks === 0) {
        if (r.status === 0 && (r.status = 1), u !== null && u.parentFlushed && (u.status === 1 || u.status === 3) && Wl(r, u), r.parentFlushed && e.completedBoundaries.push(r), r.status === 1)
          i = r.row, i !== null && nt(i.hoistables, r.contentState), lt(e, r) || (e.allPendingTasks++, r.fallbackAbortableTasks.forEach(Nf, e), r.fallbackAbortableTasks.clear(), i !== null && --i.pendingTasks === 0 && Re(e, i), e.allPendingTasks--), e.pendingRootTasks === 0 && e.trackedPostpones === null && r.preamble !== null && Lr(e);
        else if (r.status === 5 && (r = r.row, r !== null)) {
          if (e.trackedPostpones !== null) {
            i = e.trackedPostpones;
            var c = r.next;
            if (c !== null && (u = c.boundaries, u !== null))
              for (c.boundaries = null, c = 0; c < u.length; c++) {
                var h = u[c];
                Ja(e, i, h), xl(e, h, null, null);
              }
          }
          e.allPendingTasks++, --r.pendingTasks === 0 && Re(e, r), e.allPendingTasks--;
        }
      } else
        u === null || !u.parentFlushed || u.status !== 1 && u.status !== 3 || (Wl(r, u), r.completedSegments.length === 1 && r.parentFlushed && e.partialBoundaries.push(r)), r = r.row, r !== null && r.together && Va(e, r);
    e.allPendingTasks === 0 && ji(e);
  }
  function $i(e) {
    if (!(e.aborted || 11 < e.status)) {
      var r = Fr, i = T.H;
      T.H = Wu;
      var u = T.A;
      T.A = Of;
      var c = ye;
      ye = e;
      var h = Xi;
      Xi = e.resumableState;
      try {
        var y = e.pingedTasks, w;
        for (w = 0; w < y.length; w++) {
          var E = y[w], x = e, O = E.blockedSegment;
          if (O === null) {
            n:
              if (E.replay.pendingTasks !== 0) {
                var L = x.currentTask;
                x.currentTask = E, rr(E.context);
                var G = E.node;
                try {
                  if (typeof E.replay.slots == "number" ? Ki(
                    x,
                    E,
                    E.replay.slots,
                    E.node,
                    E.childIndex
                  ) : tt(x, E), E.replay.pendingTasks === 1 && 0 < E.replay.nodes.length)
                    throw Error(s(488));
                  E.replay.pendingTasks--, E.abortSet.delete(E), xl(x, E.blockedBoundary, E.row, null);
                } catch (jn) {
                  Qt();
                  var U = jn === Se ? Hi() : jn;
                  if (x.aborted) {
                    jn === Se && (E.thenableState = ar()), x.currentTask = L;
                    var B = x;
                    qi(E, B), E.abortSet.delete(E), Ir(
                      E,
                      B,
                      B.fatalError
                    );
                  } else {
                    if (typeof U == "object" && U !== null) {
                      if (typeof U.then == "function") {
                        var p = E.ping;
                        U.then(p.resolve, p.reject), E.thenableState = jn === Se ? ar() : null;
                        break n;
                      }
                      if (U.message === "Maximum call stack size exceeded" && E.node !== G) {
                        E.thenableState = null, x.pingedTasks.push(E);
                        break n;
                      }
                    }
                    E.replay.pendingTasks--, E.abortSet.delete(E);
                    var gn = ur(E.componentStack);
                    B = x;
                    var hn = E.blockedBoundary, xn = x.aborted ? x.fatalError : U, m = E.replay.nodes, kn = E.replay.slots, un = An(
                      B,
                      xn,
                      gn
                    );
                    mt(
                      B,
                      hn,
                      m,
                      kn,
                      xn,
                      un
                    ), x.pendingRootTasks--, x.pendingRootTasks === 0 && pa(x), x.allPendingTasks--, x.allPendingTasks === 0 && ji(x);
                  }
                } finally {
                  x.currentTask = L;
                }
              }
          } else
            n: if (B = O, B.status === 0) {
              var sn = x.currentTask;
              x.currentTask = E, rr(E.context);
              var Rn = B.children.length, be = B.chunks.length, cn = E.node;
              try {
                tt(x, E), er(
                  B.chunks,
                  x.renderState,
                  B.lastPushedText,
                  B.textEmbedded
                ), E.abortSet.delete(E), B.status = 1, xl(
                  x,
                  E.blockedBoundary,
                  E.row,
                  B
                );
              } catch (jn) {
                Qt(), B.children.length = Rn, B.chunks.length = be;
                var Sn = jn === Se ? Hi() : jn;
                if (x.aborted)
                  jn === Se && (E.thenableState = ar()), x.currentTask = sn, B = x, qi(E, B), E.abortSet.delete(E), Ir(
                    E,
                    B,
                    B.fatalError
                  );
                else {
                  if (typeof Sn == "object" && Sn !== null) {
                    if (typeof Sn.then == "function") {
                      B.status = 0, E.thenableState = jn === Se ? ar() : null;
                      var Zn = E.ping;
                      Sn.then(
                        Zn.resolve,
                        Zn.reject
                      );
                      break n;
                    }
                    if (Sn.message === "Maximum call stack size exceeded" && E.node !== cn) {
                      B.status = 0, E.thenableState = null, x.pingedTasks.push(E);
                      break n;
                    }
                  }
                  var mn = ur(E.componentStack);
                  E.abortSet.delete(E), B.status = 4;
                  var _n = E.blockedBoundary, qn = E.row;
                  if (qn !== null && --qn.pendingTasks === 0 && Re(x, qn), x.allPendingTasks--, _n === null)
                    if (Yi(Sn)) {
                      var Yn = Wa(Sn);
                      An(
                        x,
                        Yn,
                        mn
                      ), He(x, Yn);
                    } else
                      An(
                        x,
                        Sn,
                        mn
                      ), He(x, Sn);
                  else {
                    var Pe = An(
                      x,
                      Sn,
                      mn
                    );
                    if (_n.pendingTasks--, _n.status !== 4) {
                      _n.status = 4, _n.errorDigest = Pe, pt(x, _n);
                      var We = _n.row;
                      We !== null && (x.allPendingTasks++, --We.pendingTasks === 0 && Re(x, We), x.allPendingTasks--), _n.parentFlushed && x.clientRenderedBoundaries.push(_n), x.pendingRootTasks === 0 && x.trackedPostpones === null && _n.preamble !== null && Lr(x);
                    }
                    x.allPendingTasks === 0 && ji(x);
                  }
                }
              } finally {
                x.currentTask = sn;
              }
            }
        }
        y.splice(0, w), e.destination !== null && $t(e, e.destination);
      } catch (jn) {
        An(e, jn, {}), He(e, jn);
      } finally {
        Xi = h, T.H = i, T.A = u, i === Wu && rr(r), ye = c;
      }
    }
  }
  function qt(e, r, i) {
    r.preambleChildren.length && i.push(r.preambleChildren);
    for (var u = !1, c = 0; c < r.children.length; c++)
      u = na(
        e,
        r.children[c],
        i
      ) || u;
    return u;
  }
  function na(e, r, i) {
    var u = r.boundary;
    if (u === null)
      return qt(
        e,
        r,
        i
      );
    var c = u.preamble;
    if (c === null) return !1;
    switch (u.status) {
      case 1:
        if (Nt(e.renderState, c.content), e.byteSize += u.byteSize, r = u.completedSegments[0], !r) throw Error(s(391));
        return qt(
          e,
          r,
          i
        );
      case 5:
        if (e.trackedPostpones !== null) return !0;
      case 4:
        if (r.status === 1)
          return Nt(e.renderState, c.fallback), qt(
            e,
            r,
            i
          );
      default:
        return !0;
    }
  }
  function Lr(e) {
    if (e.completedRootSegment && e.completedPreambleSegments === null) {
      var r = [], i = e.byteSize, u = na(
        e,
        e.completedRootSegment,
        r
      ), c = e.renderState.preamble;
      u === !1 || c.headChunks && c.bodyChunks ? e.completedPreambleSegments = r : e.byteSize = i;
    }
  }
  function ea(e, r, i, u) {
    switch (i.parentFlushed = !0, i.status) {
      case 0:
        i.id = e.nextSegmentId++;
      case 5:
        return u = i.id, i.lastPushedText = !1, i.textEmbedded = !1, e = e.renderState, r.push('<template id="'), r.push(e.placeholderPrefix), e = u.toString(16), r.push(e), r.push('"></template>');
      case 1:
        i.status = 2;
        var c = !0, h = i.chunks, y = 0;
        i = i.children;
        for (var w = 0; w < i.length; w++) {
          for (c = i[w]; y < c.index; y++)
            r.push(h[y]);
          c = Rl(e, r, c, u);
        }
        for (; y < h.length - 1; y++)
          r.push(h[y]);
        return y < h.length && (c = r.push(h[y])), c;
      case 3:
        return !0;
      default:
        throw Error(s(390));
    }
  }
  var jt = 0;
  function Rl(e, r, i, u) {
    var c = i.boundary;
    if (c === null)
      return ea(e, r, i, u);
    if (i.boundary = null, c.parentFlushed = !0, c.status === 4) {
      var h = c.row;
      return h !== null && --h.pendingTasks === 0 && Re(e, h), e.renderState.generateStaticMarkup || (c = c.errorDigest, r.push("<!--$!-->"), r.push("<template"), c != null && (r.push(' data-dgst="'), c = Q(c), r.push(c), r.push('"')), r.push("></template>")), ea(e, r, i, u), e = e.renderState.generateStaticMarkup ? !0 : r.push("<!--/$-->"), e;
    }
    if (c.status !== 1)
      return c.status === 0 && (c.rootSegmentID = e.nextSegmentId++), 0 < c.completedSegments.length && e.partialBoundaries.push(c), tl(
        r,
        e.renderState,
        c.rootSegmentID
      ), u && nt(u, c.fallbackState), ea(e, r, i, u), r.push("<!--/$-->");
    if (!Nr && lt(e, c) && (jt + c.byteSize > e.progressiveChunkSize || c.defer))
      return c.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(c), tl(
        r,
        e.renderState,
        c.rootSegmentID
      ), ea(e, r, i, u), r.push("<!--/$-->");
    if (jt += c.byteSize, u && nt(u, c.contentState), i = c.row, i !== null && lt(e, c) && --i.pendingTasks === 0 && Re(e, i), e.renderState.generateStaticMarkup || r.push("<!--$-->"), i = c.completedSegments, i.length !== 1) throw Error(s(391));
    return Rl(e, r, i[0], u), e = e.renderState.generateStaticMarkup ? !0 : r.push("<!--/$-->"), e;
  }
  function la(e, r, i, u) {
    return Tu(
      r,
      e.renderState,
      i.parentFormatContext,
      i.id
    ), Rl(e, r, i, u), Ke(r, i.parentFormatContext);
  }
  function Ju(e, r, i) {
    jt = i.byteSize;
    for (var u = i.completedSegments, c = 0; c < u.length; c++)
      Ku(
        e,
        r,
        i,
        u[c]
      );
    u.length = 0, u = i.row, u !== null && lt(e, i) && --u.pendingTasks === 0 && Re(e, u), Si(
      r,
      i.contentState,
      e.renderState
    ), u = e.resumableState, e = e.renderState, c = i.rootSegmentID, i = i.contentState;
    var h = e.stylesToHoist, y = (u.instructions & 128) !== 0;
    return e.stylesToHoist = !1, r.push(e.startInlineScript), r.push(">"), h ? ((u.instructions & 4) === 0 && (u.instructions |= 4, r.push(
      '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,null!=c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};'
    )), (u.instructions & 2) === 0 && (u.instructions |= 2, r.push(
      `$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`
    )), y && (u.instructions & 256) === 0 && (u.instructions |= 256, r.push(
      `$RV=function(B,g){function h(a,c){var e=a.getAttribute(c);e&&(c=a.style,l.push(a,c.viewTransitionName,c.viewTransitionClass),"auto"!==e&&(c.viewTransitionClass=e),(a=a.getAttribute("vt-name"))||(a="_T_"+N++ +"_"),a=CSS.escape(a)!==a?"r-"+btoa(a).replace(/=/g,""):a,c.viewTransitionName=a,C=!0)}var C=!1,N=0,l=[];try{var f=document.__reactViewTransition;if(f){f.finished.finally($RV.bind(null,g));return}var m=new Map;for(f=1;f<g.length;f+=2)for(var k=g[f].querySelectorAll("[vt-share]"),d=0;d<k.length;d++){var b=k[d];m.set(b.getAttribute("vt-name"),b)}var u=[];for(k=0;k<g.length;k+=2){var D=g[k],x=D.parentNode;if(x){var v=x.getBoundingClientRect();if(v.left||v.top||v.width||v.height){b=D;for(f=0;b;){if(8===b.nodeType){var t=b.data;if("/$"===t)if(0===f)break;else f--;else"$"!==t&&"$?"!==t&&"$~"!==t&&"$!"!==t||f++}else if(1===b.nodeType){d=b;var E=d.getAttribute("vt-name"),y=m.get(E);h(d,y?"vt-share":"vt-exit");y&&(h(y,"vt-share"),m.set(E,null));for(var F=d.querySelectorAll("[vt-share]"),
z=0;z<F.length;z++){var G=F[z],H=G.getAttribute("vt-name"),I=m.get(H);I&&(h(G,"vt-share"),h(I,"vt-share"),m.set(H,null))}var J=d.querySelectorAll("[vt-parent-exit]");for(d=0;d<J.length;d++)h(J[d],"vt-parent-exit")}b=b.nextSibling}for(var K=g[k+1],n=K.firstElementChild;n;){null!==m.get(n.getAttribute("vt-name"))&&h(n,"vt-enter");var L=n.querySelectorAll("[vt-parent-enter]");for(b=0;b<L.length;b++)h(L[b],"vt-parent-enter");n=n.nextElementSibling}b=x;do for(var p=b.firstElementChild;p;){var M=p.getAttribute("vt-update");
M&&"none"!==M&&!l.includes(p)&&h(p,"vt-update");p=p.nextElementSibling}while((b=b.parentNode)&&1===b.nodeType&&"none"!==b.getAttribute("vt-update"));u.push.apply(u,K.querySelectorAll('img[src]:not([loading="lazy"])'))}}}if(C){var A=document.__reactViewTransition=document.startViewTransition({update:function(){B(g);for(var a=[document.documentElement.clientHeight,document.fonts.ready],c={},e=0;e<u.length;c={g:c.g},e++)if(c.g=u[e],!c.g.complete){var q=c.g.getBoundingClientRect();0<q.bottom&&0<q.right&&
q.top<window.innerHeight&&q.left<window.innerWidth&&(q=new Promise(function(w){return function(r){w.g.addEventListener("load",r);w.g.addEventListener("error",r)}}(c)),a.push(q))}return Promise.race([Promise.all(a),new Promise(function(w){var r=performance.now();setTimeout(w,2300>r&&2E3<r?2300-r:500)})])},types:[]});A.ready.finally(function(){for(var a=l.length-3;0<=a;a-=3){var c=l[a],e=c.style;e.viewTransitionName=l[a+1];e.viewTransitionClass=l[a+1];""===c.getAttribute("style")&&c.removeAttribute("style")}});
A.finished.finally(function(){document.__reactViewTransition===A&&(document.__reactViewTransition=null)});$RB=[];return}}catch(a){}B(g)}.bind(null,$RV);`
    )), (u.instructions & 8) === 0 ? (u.instructions |= 8, r.push(
      `$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=e[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&$RM.set(b.getAttribute("href"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement("link");a.href=d;a.rel=
"stylesheet";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute("media");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=
"$~";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,"CSS failed to load"))};$RR("`
    )) : r.push('$RR("')) : ((u.instructions & 2) === 0 && (u.instructions |= 2, r.push(
      `$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`
    )), y && (u.instructions & 256) === 0 && (u.instructions |= 256, r.push(
      `$RV=function(B,g){function h(a,c){var e=a.getAttribute(c);e&&(c=a.style,l.push(a,c.viewTransitionName,c.viewTransitionClass),"auto"!==e&&(c.viewTransitionClass=e),(a=a.getAttribute("vt-name"))||(a="_T_"+N++ +"_"),a=CSS.escape(a)!==a?"r-"+btoa(a).replace(/=/g,""):a,c.viewTransitionName=a,C=!0)}var C=!1,N=0,l=[];try{var f=document.__reactViewTransition;if(f){f.finished.finally($RV.bind(null,g));return}var m=new Map;for(f=1;f<g.length;f+=2)for(var k=g[f].querySelectorAll("[vt-share]"),d=0;d<k.length;d++){var b=k[d];m.set(b.getAttribute("vt-name"),b)}var u=[];for(k=0;k<g.length;k+=2){var D=g[k],x=D.parentNode;if(x){var v=x.getBoundingClientRect();if(v.left||v.top||v.width||v.height){b=D;for(f=0;b;){if(8===b.nodeType){var t=b.data;if("/$"===t)if(0===f)break;else f--;else"$"!==t&&"$?"!==t&&"$~"!==t&&"$!"!==t||f++}else if(1===b.nodeType){d=b;var E=d.getAttribute("vt-name"),y=m.get(E);h(d,y?"vt-share":"vt-exit");y&&(h(y,"vt-share"),m.set(E,null));for(var F=d.querySelectorAll("[vt-share]"),
z=0;z<F.length;z++){var G=F[z],H=G.getAttribute("vt-name"),I=m.get(H);I&&(h(G,"vt-share"),h(I,"vt-share"),m.set(H,null))}var J=d.querySelectorAll("[vt-parent-exit]");for(d=0;d<J.length;d++)h(J[d],"vt-parent-exit")}b=b.nextSibling}for(var K=g[k+1],n=K.firstElementChild;n;){null!==m.get(n.getAttribute("vt-name"))&&h(n,"vt-enter");var L=n.querySelectorAll("[vt-parent-enter]");for(b=0;b<L.length;b++)h(L[b],"vt-parent-enter");n=n.nextElementSibling}b=x;do for(var p=b.firstElementChild;p;){var M=p.getAttribute("vt-update");
M&&"none"!==M&&!l.includes(p)&&h(p,"vt-update");p=p.nextElementSibling}while((b=b.parentNode)&&1===b.nodeType&&"none"!==b.getAttribute("vt-update"));u.push.apply(u,K.querySelectorAll('img[src]:not([loading="lazy"])'))}}}if(C){var A=document.__reactViewTransition=document.startViewTransition({update:function(){B(g);for(var a=[document.documentElement.clientHeight,document.fonts.ready],c={},e=0;e<u.length;c={g:c.g},e++)if(c.g=u[e],!c.g.complete){var q=c.g.getBoundingClientRect();0<q.bottom&&0<q.right&&
q.top<window.innerHeight&&q.left<window.innerWidth&&(q=new Promise(function(w){return function(r){w.g.addEventListener("load",r);w.g.addEventListener("error",r)}}(c)),a.push(q))}return Promise.race([Promise.all(a),new Promise(function(w){var r=performance.now();setTimeout(w,2300>r&&2E3<r?2300-r:500)})])},types:[]});A.ready.finally(function(){for(var a=l.length-3;0<=a;a-=3){var c=l[a],e=c.style;e.viewTransitionName=l[a+1];e.viewTransitionClass=l[a+1];""===c.getAttribute("style")&&c.removeAttribute("style")}});
A.finished.finally(function(){document.__reactViewTransition===A&&(document.__reactViewTransition=null)});$RB=[];return}}catch(a){}B(g)}.bind(null,$RV);`
    )), r.push('$RC("')), u = c.toString(16), r.push(e.boundaryPrefix), r.push(u), r.push('","'), r.push(e.segmentPrefix), r.push(u), h ? (r.push('",'), Mu(r, i)) : r.push('"'), i = r.push(")<\/script>"), _a(r, e) && i;
  }
  function Ku(e, r, i, u) {
    if (u.status === 2) return !0;
    var c = i.contentState, h = u.id;
    if (h === -1) {
      if ((u.id = i.rootSegmentID) === -1)
        throw Error(s(392));
      return la(e, r, u, c);
    }
    return h === i.rootSegmentID ? la(e, r, u, c) : (la(e, r, u, c), i = e.resumableState, e = e.renderState, r.push(e.startInlineScript), r.push(">"), (i.instructions & 1) === 0 ? (i.instructions |= 1, r.push(
      '$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
    )) : r.push('$RS("'), r.push(e.segmentPrefix), h = h.toString(16), r.push(h), r.push('","'), r.push(e.placeholderPrefix), r.push(h), r = r.push('")<\/script>'), r);
  }
  var Nr = !1;
  function $t(e, r) {
    try {
      if (!(0 < e.pendingRootTasks)) {
        var i, u = e.completedRootSegment;
        if (u !== null) {
          if (u.status === 5) return;
          var c = e.completedPreambleSegments;
          if (c === null) return;
          jt = e.byteSize;
          var h = e.resumableState, y = e.renderState, w = y.preamble, E = w.htmlChunks, x = w.headChunks, O;
          if (E) {
            for (O = 0; O < E.length; O++)
              r.push(E[O]);
            if (x)
              for (O = 0; O < x.length; O++)
                r.push(x[O]);
            else {
              var L = le("head");
              r.push(L), r.push(">");
            }
          } else if (x)
            for (O = 0; O < x.length; O++)
              r.push(x[O]);
          var G = y.charsetChunks;
          for (O = 0; O < G.length; O++)
            r.push(G[O]);
          G.length = 0, y.preconnects.forEach(pe, r), y.preconnects.clear();
          var U = y.viewportChunks;
          for (O = 0; O < U.length; O++)
            r.push(U[O]);
          U.length = 0, y.fontPreloads.forEach(pe, r), y.fontPreloads.clear(), y.highImagePreloads.forEach(pe, r), y.highImagePreloads.clear(), on = y, y.styles.forEach(Ru, r), on = null;
          var B = y.importMapChunks;
          for (O = 0; O < B.length; O++)
            r.push(B[O]);
          B.length = 0, y.bootstrapScripts.forEach(pe, r), y.scripts.forEach(pe, r), y.scripts.clear(), y.bulkPreloads.forEach(pe, r), y.bulkPreloads.clear(), h.instructions |= 32;
          var p = y.hoistableChunks;
          for (O = 0; O < p.length; O++)
            r.push(p[O]);
          for (h = p.length = 0; h < c.length; h++) {
            var gn = c[h];
            for (y = 0; y < gn.length; y++)
              Rl(e, r, gn[y], null);
          }
          var hn = e.renderState.preamble, xn = hn.headChunks;
          if (hn.htmlChunks || xn) {
            var m = Dl("head");
            r.push(m);
          }
          var kn = hn.bodyChunks;
          if (kn)
            for (c = 0; c < kn.length; c++)
              r.push(kn[c]);
          Rl(e, r, u, null), e.completedRootSegment = null;
          var un = e.renderState;
          if (e.allPendingTasks !== 0 || e.clientRenderedBoundaries.length !== 0 || e.completedBoundaries.length !== 0 || e.trackedPostpones !== null && (e.trackedPostpones.rootNodes.length !== 0 || e.trackedPostpones.rootSlots !== null)) {
            var sn = e.resumableState;
            if ((sn.instructions & 64) === 0) {
              if (sn.instructions |= 64, r.push(un.startInlineScript), (sn.instructions & 32) === 0) {
                sn.instructions |= 32;
                var Rn = "_" + sn.idPrefix + "R_";
                r.push(' id="');
                var be = Q(Rn);
                r.push(be), r.push('"');
              }
              r.push(">"), r.push(
                "requestAnimationFrame(function(){$RT=performance.now()});"
              ), r.push("<\/script>");
            }
          }
          _a(r, un);
        }
        var cn = e.renderState;
        u = 0;
        var Sn = cn.viewportChunks;
        for (u = 0; u < Sn.length; u++)
          r.push(Sn[u]);
        Sn.length = 0, cn.preconnects.forEach(pe, r), cn.preconnects.clear(), cn.fontPreloads.forEach(pe, r), cn.fontPreloads.clear(), cn.highImagePreloads.forEach(
          pe,
          r
        ), cn.highImagePreloads.clear(), cn.styles.forEach(Pu, r), cn.scripts.forEach(pe, r), cn.scripts.clear(), cn.bulkPreloads.forEach(pe, r), cn.bulkPreloads.clear();
        var Zn = cn.hoistableChunks;
        for (u = 0; u < Zn.length; u++)
          r.push(Zn[u]);
        Zn.length = 0;
        var mn = e.clientRenderedBoundaries;
        for (i = 0; i < mn.length; i++) {
          var _n = mn[i];
          cn = r;
          var qn = e.resumableState, Yn = e.renderState, Pe = _n.rootSegmentID, We = _n.errorDigest;
          cn.push(Yn.startInlineScript), cn.push(">"), (qn.instructions & 4) === 0 ? (qn.instructions |= 4, cn.push(
            '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,null!=c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'
          )) : cn.push('$RX("'), cn.push(Yn.boundaryPrefix);
          var jn = Pe.toString(16);
          if (cn.push(jn), cn.push('"'), We != null)
            if (cn.push(","), We == null)
              cn.push("null");
            else {
              var Ue = yf(We);
              cn.push(Ue);
            }
          var $n = cn.push(")<\/script>");
          if (!$n) {
            e.destination = null, i++, mn.splice(0, i);
            return;
          }
        }
        mn.splice(0, i);
        var hl = e.completedBoundaries;
        for (i = 0; i < hl.length; i++)
          if (!Ju(e, r, hl[i])) {
            e.destination = null, i++, hl.splice(0, i);
            return;
          }
        hl.splice(0, i), Nr = !0;
        var ce = e.partialBoundaries;
        for (i = 0; i < ce.length; i++) {
          var je = ce[i];
          n: {
            mn = e, _n = r, jt = je.byteSize;
            var sl = je.completedSegments;
            for ($n = 0; $n < sl.length; $n++)
              if (!Ku(
                mn,
                _n,
                je,
                sl[$n]
              )) {
                $n++, sl.splice(0, $n);
                var Pl = !1;
                break n;
              }
            sl.splice(0, $n);
            var zn = je.row;
            zn !== null && zn.together && je.pendingTasks === 1 && (zn.pendingTasks === 1 ? Qa(
              mn,
              zn,
              zn.hoistables
            ) : zn.pendingTasks--), Pl = Si(
              _n,
              je.contentState,
              mn.renderState
            );
          }
          if (!Pl) {
            e.destination = null, i++, ce.splice(0, i);
            return;
          }
        }
        ce.splice(0, i), Nr = !1;
        var Ul = e.completedBoundaries;
        for (i = 0; i < Ul.length; i++)
          if (!Ju(e, r, Ul[i])) {
            e.destination = null, i++, Ul.splice(0, i);
            return;
          }
        Ul.splice(0, i);
      }
    } finally {
      Nr = !1, i = e.postponedState, i !== null && (i.nextSegmentId = e.nextSegmentId), e.allPendingTasks === 0 && e.clientRenderedBoundaries.length === 0 && e.completedBoundaries.length === 0 && (e.flushScheduled = !1, i = e.resumableState, i.hasBody && (ce = Dl("body"), r.push(ce)), i.hasHtml && (i = Dl("html"), r.push(i)), ta(e), e.status = 13, r.push(null), e.destination = null);
    }
  }
  function qe(e) {
    if (e.flushScheduled === !1 && e.pingedTasks.length === 0 && e.destination !== null) {
      e.flushScheduled = !0;
      var r = e.destination;
      r ? $t(e, r) : e.flushScheduled = !1;
    }
  }
  function ra(e, r) {
    if (e.status === 12)
      e.status = 13, e = e.fatalError, Yi(e) && (e = Wa(e)), r.destroy(e);
    else if (e.status !== 13 && e.destination === null) {
      e.destination = r;
      try {
        $t(e, r);
      } catch (i) {
        An(e, i, {}), He(e, i);
      }
    }
  }
  function pu(e, r) {
    try {
      if (0 < r.size) {
        var i = e.fatalError;
        r.forEach(function(u) {
          return Ir(u, e, i);
        }), r.clear();
      }
      e.destination !== null && $t(e, e.destination);
    } catch (u) {
      An(e, u, {}), He(e, u);
    }
  }
  function ta(e) {
    e = e.renderLifetimeController, e !== null && e.abort("The render ended.");
  }
  function mu(e, r) {
    if (!(e.aborted || e.status !== 11 && e.status !== 10)) {
      ta(e);
      var i = typeof r == "object" && r !== null && r.$$typeof === dn;
      e.aborted = !0, r = i ? Fu(r) : r === void 0 ? Error(s(432)) : typeof r == "object" && r !== null && typeof r.then == "function" ? Error(s(530)) : r, e.fatalError = r, r = e.abortableTasks, r.forEach(function(u) {
        return qi(u, e);
      }), pu(e, r);
    }
  }
  function ni(e, r, i) {
    if (r === null) i.rootNodes.push(e);
    else {
      var u = i.workingMap, c = u.get(r);
      c === void 0 && (c = [r[1], r[2], [], null], u.set(r, c), ni(c, r[0], i)), c[2].push(e);
    }
  }
  function fr() {
  }
  function ma(e, r, i, u) {
    var c = !1, h = null, y = "", w = !1;
    if (r = xe(r ? r.identifierPrefix : void 0), e = Vt(
      e,
      r,
      Ii(r, i),
      ie(0, null, 0, null),
      1 / 0,
      fr,
      void 0,
      void 0,
      function() {
        w = !0;
      },
      void 0,
      void 0,
      void 0
    ), e.flushScheduled = e.destination !== null, $i(e), e.status === 10 && (e.status = 11), e.trackedPostpones === null && Ka(e, e.pendingRootTasks === 0), mu(e, u), ra(e, {
      push: function(E) {
        return E !== null && (y += E), !0;
      },
      destroy: function(E) {
        c = !0, h = E;
      }
    }), c && h !== u) throw h;
    if (!w) throw Error(s(426));
    return y;
  }
  return fu.renderToStaticMarkup = function(e, r) {
    return ma(
      e,
      r,
      !0,
      'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server'
    );
  }, fu.renderToString = function(e, r) {
    return ma(
      e,
      r,
      !1,
      'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server'
    );
  }, fu.version = "19.3.0", fu;
}
var Ri = {};
/**
 * @license React
 * react-dom-server.browser.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vc;
function Sc() {
  if (vc) return Ri;
  vc = 1;
  var R = qf(), P = yc();
  function s(n) {
    var l = "https://react.dev/errors/" + n;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var t = 2; t < arguments.length; t++)
        l += "&args[]=" + encodeURIComponent(arguments[t]);
    }
    return "Minified React error #" + n + "; visit " + l + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var N = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), Z = Symbol.for("react.fragment"), K = Symbol.for("react.strict_mode"), tn = Symbol.for("react.profiler"), an = Symbol.for("react.consumer"), fn = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), M = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), vn = Symbol.for("react.lazy"), Ne = Symbol.for("react.scope"), rl = Symbol.for("react.activity"), Nl = Symbol.for("react.legacy_hidden"), Ce = Symbol.for("react.memo_cache_sentinel"), we = Symbol.for("react.view_transition"), dn = Symbol.for("react.recoverable"), Kn = Symbol.iterator;
  function Pn(n) {
    return n === null || typeof n != "object" ? null : (n = Kn && n[Kn] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var Sr = Symbol.for("react.optimistic_key"), en = Array.isArray;
  function qr(n, l) {
    var t = n.length & 3, a = n.length - t, f = l;
    for (l = 0; l < a; ) {
      var o = n.charCodeAt(l) & 255 | (n.charCodeAt(++l) & 255) << 8 | (n.charCodeAt(++l) & 255) << 16 | (n.charCodeAt(++l) & 255) << 24;
      ++l, o = 3432918353 * (o & 65535) + ((3432918353 * (o >>> 16) & 65535) << 16) & 4294967295, o = o << 15 | o >>> 17, o = 461845907 * (o & 65535) + ((461845907 * (o >>> 16) & 65535) << 16) & 4294967295, f ^= o, f = f << 13 | f >>> 19, f = 5 * (f & 65535) + ((5 * (f >>> 16) & 65535) << 16) & 4294967295, f = (f & 65535) + 27492 + (((f >>> 16) + 58964 & 65535) << 16);
    }
    switch (o = 0, t) {
      case 3:
        o ^= (n.charCodeAt(l + 2) & 255) << 16;
      case 2:
        o ^= (n.charCodeAt(l + 1) & 255) << 8;
      case 1:
        o ^= n.charCodeAt(l) & 255, o = 3432918353 * (o & 65535) + ((3432918353 * (o >>> 16) & 65535) << 16) & 4294967295, o = o << 15 | o >>> 17, f ^= 461845907 * (o & 65535) + ((461845907 * (o >>> 16) & 65535) << 16) & 4294967295;
    }
    return f ^= n.length, f ^= f >>> 16, f = 2246822507 * (f & 65535) + ((2246822507 * (f >>> 16) & 65535) << 16) & 4294967295, f ^= f >>> 13, f = 3266489909 * (f & 65535) + ((3266489909 * (f >>> 16) & 65535) << 16) & 4294967295, (f ^ f >>> 16) >>> 0;
  }
  var te = new MessageChannel(), Mn = [];
  te.port1.onmessage = function() {
    var n = Mn.shift();
    n && n();
  };
  function ml(n) {
    Mn.push(n), te.port2.postMessage(null);
  }
  function Mi(n) {
    setTimeout(function() {
      throw n;
    });
  }
  var _t = Promise, ql = typeof queueMicrotask == "function" ? queueMicrotask : function(n) {
    _t.resolve(null).then(n).catch(Mi);
  }, Ae = null, ee = 0;
  function C(n, l) {
    if (l.byteLength !== 0)
      if (2048 < l.byteLength)
        0 < ee && (n.enqueue(
          new Uint8Array(Ae.buffer, 0, ee)
        ), Ae = new Uint8Array(2048), ee = 0), n.enqueue(l);
      else {
        var t = Ae.length - ee;
        t < l.byteLength && (t === 0 ? n.enqueue(Ae) : (Ae.set(l.subarray(0, t), ee), n.enqueue(Ae), l = l.subarray(t)), Ae = new Uint8Array(2048), ee = 0), Ae.set(l, ee), ee += l.byteLength;
      }
  }
  function Q(n, l) {
    return C(n, l), !0;
  }
  function jr(n) {
    Ae && 0 < ee && (n.enqueue(new Uint8Array(Ae.buffer, 0, ee)), Ae = null, ee = 0);
  }
  var Ft = new TextEncoder();
  function D(n) {
    return Ft.encode(n);
  }
  function A(n) {
    return Ft.encode(n);
  }
  function T(n) {
    return n.byteLength;
  }
  function I(n, l) {
    typeof n.error == "function" ? n.error(l) : n.close();
  }
  var X = Object.assign, z = Object.prototype.hasOwnProperty, q = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), on = {}, bn = {};
  function ke(n) {
    return z.call(bn, n) ? !0 : z.call(on, n) ? !1 : q.test(n) ? bn[n] = !0 : (on[n] = !0, !1);
  }
  var xe = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  ), ie = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), ou = /["'&<>]/;
  function ln(n) {
    if (typeof n == "boolean" || typeof n == "number" || typeof n == "bigint")
      return "" + n;
    n = "" + n;
    var l = ou.exec(n);
    if (l) {
      var t = "", a, f = 0;
      for (a = l.index; a < n.length; a++) {
        switch (n.charCodeAt(a)) {
          case 34:
            l = "&quot;";
            break;
          case 38:
            l = "&amp;";
            break;
          case 39:
            l = "&#x27;";
            break;
          case 60:
            l = "&lt;";
            break;
          case 62:
            l = "&gt;";
            break;
          default:
            continue;
        }
        f !== a && (t += n.slice(f, a)), f = a + 1, t += l;
      }
      n = f !== a ? t + n.slice(f, a) : t;
    }
    return n;
  }
  var Ma = /([A-Z])/g, Ci = /^ms-/, hu = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function de(n) {
    return hu.test("" + n) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : n;
  }
  var _r = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ca = P.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Aa = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Tn = Ca.d;
  Ca.d = {
    f: Tn.f,
    r: Tn.r,
    D: Nf,
    C: mt,
    L: qi,
    m: Ir,
    X: pa,
    S: Ka,
    M: ji
  };
  var Je = [], jl = null;
  A('"></template>');
  var su = A("<script"), Ot = A("<\/script>"), du = A('<script src="'), En = A('<script type="module" src="'), De = A(' nonce="'), vu = A(' integrity="'), ka = A(' crossorigin="'), ve = A(' async=""><\/script>'), gu = A("<style"), Ai = /(<\/|<)(s)(cript)/gi;
  function $l(n, l, t, a) {
    return "" + l + (t === "s" ? "\\u0073" : "\\u0053") + a;
  }
  var yu = A(
    '<script type="importmap">'
  ), ki = A("<\/script>");
  function $r(n, l, t, a, f, o) {
    t = typeof l == "string" ? l : l && l.script;
    var d = t === void 0 ? su : A(
      '<script nonce="' + ln(t) + '"'
    ), v = typeof l == "string" ? void 0 : l && l.style, g = v === void 0 ? gu : A(
      '<style nonce="' + ln(v) + '"'
    ), b = n.idPrefix, k = [], _ = n.bootstrapScriptContent, H = n.bootstrapScripts, W = n.bootstrapModules;
    if (_ !== void 0 && (k.push(d), tt(k, n), k.push(
      Nn,
      D(
        ("" + _).replace(Ai, $l)
      ),
      Ot
    )), _ = [], a !== void 0 && (_.push(
      t === void 0 ? yu : A(
        '<script type="importmap" nonce="' + ln(t) + '">'
      )
    ), _.push(
      D(
        ("" + JSON.stringify(a)).replace(Ai, $l)
      )
    ), _.push(ki)), a = f ? {
      preconnects: "",
      fontPreloads: "",
      highImagePreloads: "",
      remainingCapacity: 2 + (typeof o == "number" ? o : 2e3)
    } : null, f = {
      placeholderPrefix: A(b + "P:"),
      segmentPrefix: A(b + "S:"),
      boundaryPrefix: A(b + "B:"),
      startInlineScript: d,
      startInlineStyle: g,
      preamble: Lt(),
      externalRuntimeScript: null,
      bootstrapChunks: k,
      importMapChunks: _,
      onHeaders: f,
      headers: a,
      resets: {
        font: {},
        dns: {},
        connect: { default: {}, anonymous: {}, credentials: {} },
        image: {},
        style: {}
      },
      charsetChunks: [],
      viewportChunks: [],
      hoistableChunks: [],
      preconnects: /* @__PURE__ */ new Set(),
      fontPreloads: /* @__PURE__ */ new Set(),
      highImagePreloads: /* @__PURE__ */ new Set(),
      styles: /* @__PURE__ */ new Map(),
      bootstrapScripts: /* @__PURE__ */ new Set(),
      scripts: /* @__PURE__ */ new Set(),
      bulkPreloads: /* @__PURE__ */ new Set(),
      preloads: {
        images: /* @__PURE__ */ new Map(),
        stylesheets: /* @__PURE__ */ new Map(),
        scripts: /* @__PURE__ */ new Map(),
        moduleScripts: /* @__PURE__ */ new Map()
      },
      nonce: { script: t, style: v },
      hoistableState: null,
      stylesToHoist: !1
    }, H !== void 0)
      for (a = 0; a < H.length; a++)
        b = H[a], v = d = void 0, g = {
          rel: "preload",
          as: "script",
          fetchPriority: "low",
          nonce: l
        }, typeof b == "string" ? g.href = o = b : (g.href = o = b.src, g.integrity = v = typeof b.integrity == "string" ? b.integrity : void 0, g.crossOrigin = d = typeof b == "string" || b.crossOrigin == null ? void 0 : b.crossOrigin === "use-credentials" ? "use-credentials" : ""), b = n, _ = o, b.scriptResources[_] = null, b.moduleScriptResources[_] = null, b = [], ue(b, g), f.bootstrapScripts.add(b), k.push(
          du,
          D(ln(o)),
          Un
        ), t && k.push(
          De,
          D(ln(t)),
          Un
        ), typeof v == "string" && k.push(
          vu,
          D(ln(v)),
          Un
        ), typeof d == "string" && k.push(
          ka,
          D(ln(d)),
          Un
        ), tt(k, n), k.push(ve);
    if (W !== void 0)
      for (l = 0; l < W.length; l++)
        v = W[l], o = a = void 0, d = {
          rel: "modulepreload",
          fetchPriority: "low",
          nonce: t
        }, typeof v == "string" ? d.href = H = v : (d.href = H = v.src, d.integrity = o = typeof v.integrity == "string" ? v.integrity : void 0, d.crossOrigin = a = typeof v == "string" || v.crossOrigin == null ? void 0 : v.crossOrigin === "use-credentials" ? "use-credentials" : ""), v = n, g = H, v.scriptResources[g] = null, v.moduleScriptResources[g] = null, v = [], ue(v, d), f.bootstrapScripts.add(v), k.push(
          En,
          D(ln(H)),
          Un
        ), t && k.push(
          De,
          D(ln(t)),
          Un
        ), typeof o == "string" && k.push(
          vu,
          D(ln(o)),
          Un
        ), typeof a == "string" && k.push(
          ka,
          D(ln(a)),
          Un
        ), tt(k, n), k.push(ve);
    return f;
  }
  function It(n, l, t, a, f) {
    return {
      idPrefix: n === void 0 ? "" : n,
      nextFormID: 0,
      streamingFormat: 0,
      bootstrapScriptContent: t,
      bootstrapScripts: a,
      bootstrapModules: f,
      instructions: 0,
      hasBody: !1,
      hasHtml: !1,
      unknownResources: {},
      dnsResources: {},
      connectResources: { default: {}, anonymous: {}, credentials: {} },
      imageResources: {},
      styleResources: {},
      scriptResources: {},
      moduleUnknownResources: {},
      moduleScriptResources: {}
    };
  }
  function Lt() {
    return { htmlChunks: null, headChunks: null, bodyChunks: null };
  }
  function ae(n, l, t, a) {
    return {
      insertionMode: n,
      selectedValue: l,
      tagScope: t,
      viewTransition: a
    };
  }
  function le(n) {
    return ae(
      n === "http://www.w3.org/2000/svg" ? 4 : n === "http://www.w3.org/1998/Math/MathML" ? 5 : 0,
      null,
      0,
      null
    );
  }
  function bu(n, l, t) {
    var a = n.tagScope & -25;
    switch (l) {
      case "noscript":
        return ae(2, null, a | 1, null);
      case "select":
        return ae(
          2,
          t.value != null ? t.value : t.defaultValue,
          a,
          null
        );
      case "svg":
        return ae(4, null, a, null);
      case "picture":
        return ae(2, null, a | 2, null);
      case "math":
        return ae(5, null, a, null);
      case "foreignObject":
        return ae(2, null, a, null);
      case "table":
        return ae(6, null, a, null);
      case "thead":
      case "tbody":
      case "tfoot":
        return ae(7, null, a, null);
      case "colgroup":
        return ae(9, null, a, null);
      case "tr":
        return ae(8, null, a, null);
      case "head":
        if (2 > n.insertionMode)
          return ae(3, null, a, null);
        break;
      case "html":
        if (n.insertionMode === 0)
          return ae(1, null, a, null);
    }
    return 6 <= n.insertionMode || 2 > n.insertionMode ? ae(2, null, a, null) : n.viewTransition !== null || n.tagScope !== a ? ae(
      n.insertionMode,
      n.selectedValue,
      a,
      null
    ) : n;
  }
  function Sa(n) {
    return n === null ? null : {
      update: n.update,
      enter: "none",
      exit: "none",
      share: n.update,
      parentEnter: "none",
      parentExit: "none",
      name: n.autoName,
      autoName: n.autoName,
      nameIdx: 0
    };
  }
  function Dl(n, l) {
    return l.tagScope & 32 && (n.instructions |= 128), ae(
      l.insertionMode,
      l.selectedValue,
      l.tagScope | 12,
      Sa(l.viewTransition)
    );
  }
  function Nt(n, l) {
    n = Sa(l.viewTransition);
    var t = l.tagScope | 16;
    return n !== null && n.share !== "none" && (t |= 64), ae(
      l.insertionMode,
      l.selectedValue,
      t,
      n
    );
  }
  function _a(n, l, t) {
    return n = "_" + n.idPrefix + "R_" + l, 0 < t && (n += "H" + t.toString(32)), n + "_";
  }
  var tl = A("<!-- -->");
  function Tu(n, l, t, a) {
    return l === "" ? a : (a && n.push(tl), n.push(D(ln(l))), !0);
  }
  function Ke(n, l) {
    l = l.viewTransition, l !== null && (l.name !== "auto" && (Cn(
      n,
      "vt-name",
      l.nameIdx === 0 ? l.name : l.name + "_" + l.nameIdx
    ), l.nameIdx++), Cn(n, "vt-update", l.update), l.enter !== "none" && Cn(n, "vt-enter", l.enter), l.exit !== "none" && Cn(n, "vt-exit", l.exit), l.share !== "none" && Cn(n, "vt-share", l.share));
  }
  var Eu = /* @__PURE__ */ new Map(), yf = A(' style="'), wu = A(":"), Dt = A(";");
  function zt(n, l) {
    if (typeof l != "object") throw Error(s(62));
    var t = !0, a;
    for (a in l)
      if (z.call(l, a)) {
        var f = l[a];
        if (f != null && typeof f != "boolean" && f !== "") {
          if (a.indexOf("--") === 0) {
            var o = D(ln(a));
            f = D(
              ln(("" + f).trim())
            );
          } else
            o = Eu.get(a), o === void 0 && (o = A(
              ln(
                a.replace(Ma, "-$1").toLowerCase().replace(Ci, "-ms-")
              )
            ), Eu.set(a, o)), f = typeof f == "number" ? f === 0 || xe.has(a) ? D("" + f) : D(f + "px") : D(
              ln(("" + f).trim())
            );
          t ? (t = !1, n.push(
            yf,
            o,
            wu,
            f
          )) : n.push(Dt, o, wu, f);
        }
      }
    t || n.push(Un);
  }
  var ge = A(" "), il = A('="'), Un = A('"'), Si = A('=""');
  function pe(n, l, t) {
    t && typeof t != "function" && typeof t != "symbol" && n.push(ge, D(l), Si);
  }
  function Cn(n, l, t) {
    typeof t != "function" && typeof t != "symbol" && typeof t != "boolean" && n.push(
      ge,
      D(l),
      il,
      D(ln(t)),
      Un
    );
  }
  var xu = A(
    ln(
      "javascript:throw new Error('React form unexpectedly submitted.')"
    )
  ), Ru = A('<input type="hidden"');
  function Fa(n, l) {
    this.push(Ru), Pu(n), Cn(this, "name", l), Cn(this, "value", n), this.push(Bt);
  }
  function Pu(n) {
    if (typeof n != "string") throw Error(s(480));
  }
  function Ht(n, l) {
    if (typeof l.$$FORM_ACTION == "function") {
      var t = n.nextFormID++;
      n = n.idPrefix + t;
      try {
        var a = l.$$FORM_ACTION(n);
        if (a) {
          var f = a.data;
          f != null && f.forEach(Pu);
        }
        return a;
      } catch (o) {
        if (typeof o == "object" && o !== null && typeof o.then == "function")
          throw o;
      }
    }
    return null;
  }
  function Mu(n, l, t, a, f, o, d, v) {
    var g = null;
    if (typeof a == "function") {
      var b = Ht(l, a);
      b !== null ? (v = b.name, a = b.action || "", f = b.encType, o = b.method, d = b.target, g = b.data) : (n.push(
        ge,
        D("formAction"),
        il,
        xu,
        Un
      ), d = o = f = a = v = null, Au(l, t));
    }
    return v != null && wn(n, "name", v), a != null && wn(n, "formAction", a), f != null && wn(n, "formEncType", f), o != null && wn(n, "formMethod", o), d != null && wn(n, "formTarget", d), g;
  }
  function wn(n, l, t) {
    switch (l) {
      case "className":
        Cn(n, "class", t);
        break;
      case "tabIndex":
        Cn(n, "tabindex", t);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Cn(n, l, t);
        break;
      case "style":
        zt(n, t);
        break;
      case "src":
      case "href":
        if (t === "") break;
      case "action":
      case "formAction":
        if (t == null || typeof t == "function" || typeof t == "symbol" || typeof t == "boolean")
          break;
        t = de("" + t), n.push(
          ge,
          D(l),
          il,
          D(ln(t)),
          Un
        );
        break;
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "ref":
        break;
      case "autoFocus":
      case "multiple":
      case "muted":
        pe(n, l.toLowerCase(), t);
        break;
      case "xlinkHref":
        if (typeof t == "function" || typeof t == "symbol" || typeof t == "boolean")
          break;
        t = de("" + t), n.push(
          ge,
          D("xlink:href"),
          il,
          D(ln(t)),
          Un
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        typeof t != "function" && typeof t != "symbol" && n.push(
          ge,
          D(l),
          il,
          D(ln(t)),
          Un
        );
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        t && typeof t != "function" && typeof t != "symbol" && n.push(
          ge,
          D(l),
          Si
        );
        break;
      case "capture":
      case "download":
        t === !0 ? n.push(
          ge,
          D(l),
          Si
        ) : t !== !1 && typeof t != "function" && typeof t != "symbol" && n.push(
          ge,
          D(l),
          il,
          D(ln(t)),
          Un
        );
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        typeof t != "function" && typeof t != "symbol" && !isNaN(t) && 1 <= t && n.push(
          ge,
          D(l),
          il,
          D(ln(t)),
          Un
        );
        break;
      case "rowSpan":
      case "start":
        typeof t == "function" || typeof t == "symbol" || isNaN(t) || n.push(
          ge,
          D(l),
          il,
          D(ln(t)),
          Un
        );
        break;
      case "xlinkActuate":
        Cn(n, "xlink:actuate", t);
        break;
      case "xlinkArcrole":
        Cn(n, "xlink:arcrole", t);
        break;
      case "xlinkRole":
        Cn(n, "xlink:role", t);
        break;
      case "xlinkShow":
        Cn(n, "xlink:show", t);
        break;
      case "xlinkTitle":
        Cn(n, "xlink:title", t);
        break;
      case "xlinkType":
        Cn(n, "xlink:type", t);
        break;
      case "xmlBase":
        Cn(n, "xml:base", t);
        break;
      case "xmlLang":
        Cn(n, "xml:lang", t);
        break;
      case "xmlSpace":
        Cn(n, "xml:space", t);
        break;
      default:
        if ((!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = ie.get(l) || l, ke(l))) {
          switch (typeof t) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              var a = l.toLowerCase().slice(0, 5);
              if (a !== "data-" && a !== "aria-") return;
          }
          n.push(
            ge,
            D(l),
            il,
            D(ln(t)),
            Un
          );
        }
    }
  }
  var Nn = A(">"), Bt = A("/>");
  function me(n, l, t) {
    if (l != null) {
      if (t != null) throw Error(s(60));
      if (typeof l != "object" || !("__html" in l))
        throw Error(s(61));
      l = l.__html, l != null && n.push(D("" + l));
    }
  }
  function bf(n) {
    var l = "";
    return R.Children.forEach(n, function(t) {
      t != null && (l += t);
    }), l;
  }
  var Oa = A(' selected=""'), Cu = A(
    `addEventListener("submit",function(a){if(!a.defaultPrevented){var b=a.target,d=a.submitter,c=b.action,e=d;if(d){var f=d.getAttribute("formAction");null!=f&&(c=f,e=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===c&&(a.preventDefault(),a=new FormData(b,e),c=b.ownerDocument||b,(c.$$reactFormReplay=c.$$reactFormReplay||[]).push(b,d,a))}});`
  );
  function Au(n, l) {
    if ((n.instructions & 16) === 0) {
      n.instructions |= 16;
      var t = l.preamble, a = l.bootstrapChunks;
      (t.htmlChunks || t.headChunks) && a.length === 0 ? (a.push(l.startInlineScript), tt(a, n), a.push(
        Nn,
        Cu,
        Ot
      )) : a.unshift(
        l.startInlineScript,
        Nn,
        Cu,
        Ot
      );
    }
  }
  var Tf = A("<!--F!-->"), Wt = A("<!--F-->");
  function ue(n, l) {
    n.push(re("link"));
    for (var t in l)
      if (z.call(l, t)) {
        var a = l[t];
        if (a != null)
          switch (t) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(s(399, "link"));
            default:
              wn(n, t, a);
          }
      }
    return n.push(Bt), null;
  }
  var _i = /(<\/|<)(s)(tyle)/gi;
  function Fi(n, l, t, a) {
    return "" + l + (t === "s" ? "\\73 " : "\\53 ") + a;
  }
  function nr(n, l, t, a) {
    n.push(re(t));
    for (var f in l)
      if (z.call(l, f)) {
        var o = l[f];
        if (o != null)
          switch (f) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(s(399, t));
            default:
              wn(n, f, o);
          }
      }
    return Ke(n, a), n.push(Bt), null;
  }
  function Oi(n, l) {
    n.push(re("title"));
    var t = null, a = null, f;
    for (f in l)
      if (z.call(l, f)) {
        var o = l[f];
        if (o != null)
          switch (f) {
            case "children":
              t = o;
              break;
            case "dangerouslySetInnerHTML":
              a = o;
              break;
            default:
              wn(n, f, o);
          }
      }
    return n.push(Nn), l = Array.isArray(t) ? 2 > t.length ? t[0] : null : t, typeof l != "function" && typeof l != "symbol" && l !== null && l !== void 0 && n.push(D(ln("" + l))), me(n, a, t), n.push(lr("title")), null;
  }
  var Ef = A("<!--head-->"), wf = A("<!--body-->"), nt = A("<!--html-->");
  function Ii(n, l) {
    n.push(re("script"));
    var t = null, a = null, f;
    for (f in l)
      if (z.call(l, f)) {
        var o = l[f];
        if (o != null)
          switch (f) {
            case "children":
              t = o;
              break;
            case "dangerouslySetInnerHTML":
              a = o;
              break;
            default:
              wn(n, f, o);
          }
      }
    return n.push(Nn), me(n, a, t), typeof t == "string" && n.push(
      D(("" + t).replace(Ai, $l))
    ), n.push(lr("script")), null;
  }
  function Li(n, l, t, a) {
    n.push(re(t));
    var f = t = null, o;
    for (o in l)
      if (z.call(l, o)) {
        var d = l[o];
        if (d != null)
          switch (o) {
            case "children":
              t = d;
              break;
            case "dangerouslySetInnerHTML":
              f = d;
              break;
            default:
              wn(n, o, d);
          }
      }
    return Ke(n, a), n.push(Nn), me(n, f, t), t;
  }
  function er(n, l, t, a) {
    n.push(re(t));
    var f = t = null, o;
    for (o in l)
      if (z.call(l, o)) {
        var d = l[o];
        if (d != null)
          switch (o) {
            case "children":
              t = d;
              break;
            case "dangerouslySetInnerHTML":
              f = d;
              break;
            default:
              wn(n, o, d);
          }
      }
    return Ke(n, a), n.push(Nn), me(n, f, t), typeof t == "string" ? (n.push(D(ln(t))), null) : t;
  }
  var Ia = A(`
`), xf = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Ut = /* @__PURE__ */ new Map();
  function re(n) {
    var l = Ut.get(n);
    if (l === void 0) {
      if (!xf.test(n))
        throw Error(s(65, n));
      l = A("<" + n), Ut.set(n, l);
    }
    return l;
  }
  var Fr = A("<!DOCTYPE html>");
  function Ni(n, l, t, a, f, o, d, v, g) {
    switch (l) {
      case "div":
      case "span":
      case "svg":
      case "path":
        break;
      case "a":
        n.push(re("a"));
        var b = null, k = null, _;
        for (_ in t)
          if (z.call(t, _)) {
            var H = t[_];
            if (H != null)
              switch (_) {
                case "children":
                  b = H;
                  break;
                case "dangerouslySetInnerHTML":
                  k = H;
                  break;
                case "href":
                  H === "" ? Cn(n, "href", "") : wn(n, _, H);
                  break;
                default:
                  wn(n, _, H);
              }
          }
        if (Ke(n, v), n.push(Nn), me(n, k, b), typeof b == "string") {
          n.push(D(ln(b)));
          var W = null;
        } else W = b;
        return W;
      case "g":
      case "p":
      case "li":
        break;
      case "select":
        n.push(re("select"));
        var Y = null, rn = null, Gn;
        for (Gn in t)
          if (z.call(t, Gn)) {
            var Xe = t[Gn];
            if (Xe != null)
              switch (Gn) {
                case "children":
                  Y = Xe;
                  break;
                case "dangerouslySetInnerHTML":
                  rn = Xe;
                  break;
                case "defaultValue":
                case "value":
                  break;
                default:
                  wn(
                    n,
                    Gn,
                    Xe
                  );
              }
          }
        return Ke(n, v), n.push(Nn), me(n, rn, Y), Y;
      case "option":
        var Bn = v.selectedValue;
        n.push(re("option"));
        var Xn = null, Me = null, $e = null, J = null, Dn;
        for (Dn in t)
          if (z.call(t, Dn)) {
            var nl = t[Dn];
            if (nl != null)
              switch (Dn) {
                case "children":
                  Xn = nl;
                  break;
                case "selected":
                  $e = nl;
                  break;
                case "dangerouslySetInnerHTML":
                  J = nl;
                  break;
                case "value":
                  Me = nl;
                default:
                  wn(
                    n,
                    Dn,
                    nl
                  );
              }
          }
        if (Bn != null) {
          var Fe = Me !== null ? "" + Me : bf(Xn);
          if (en(Bn)) {
            for (var Vn = 0; Vn < Bn.length; Vn++)
              if ("" + Bn[Vn] === Fe) {
                n.push(Oa);
                break;
              }
          } else
            "" + Bn === Fe && n.push(Oa);
        } else $e && n.push(Oa);
        return n.push(Nn), me(n, J, Xn), Xn;
      case "textarea":
        n.push(re("textarea"));
        var se = null, Ol = null, fe = null, el;
        for (el in t)
          if (z.call(t, el)) {
            var Wn = t[el];
            if (Wn != null)
              switch (el) {
                case "children":
                  fe = Wn;
                  break;
                case "value":
                  se = Wn;
                  break;
                case "defaultValue":
                  Ol = Wn;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(s(91));
                default:
                  wn(
                    n,
                    el,
                    Wn
                  );
              }
          }
        if (se === null && Ol !== null && (se = Ol), Ke(n, v), n.push(Nn), fe != null) {
          if (se != null) throw Error(s(92));
          if (en(fe)) {
            if (1 < fe.length)
              throw Error(s(93));
            se = "" + fe[0];
          }
          se = "" + fe;
        }
        return typeof se == "string" && se[0] === `
` && n.push(Ia), se !== null && n.push(
          D(ln("" + se))
        ), null;
      case "input":
        n.push(re("input"));
        var Ql = null, ul = null, Jn = null, Rr = null, Vl = null, Il = null, Ze = null, ja = null, fa = null, ui;
        for (ui in t)
          if (z.call(t, ui)) {
            var Oe = t[ui];
            if (Oe != null)
              switch (ui) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(399, "input"));
                case "name":
                  Ql = Oe;
                  break;
                case "formAction":
                  ul = Oe;
                  break;
                case "formEncType":
                  Jn = Oe;
                  break;
                case "formMethod":
                  Rr = Oe;
                  break;
                case "formTarget":
                  Vl = Oe;
                  break;
                case "defaultChecked":
                  fa = Oe;
                  break;
                case "defaultValue":
                  Ze = Oe;
                  break;
                case "checked":
                  ja = Oe;
                  break;
                case "value":
                  Il = Oe;
                  break;
                default:
                  wn(
                    n,
                    ui,
                    Oe
                  );
              }
          }
        var $u = Mu(
          n,
          a,
          f,
          ul,
          Jn,
          Rr,
          Vl,
          Ql
        );
        return ja !== null ? pe(n, "checked", ja) : fa !== null && pe(n, "checked", fa), Il !== null ? wn(n, "value", Il) : Ze !== null && wn(n, "value", Ze), Ke(n, v), n.push(Bt), $u != null && $u.forEach(Fa, n), null;
      case "button":
        n.push(re("button"));
        var fi = null, Pr = null, Et = null, $a = null, ca = null, oa = null, nf = null, Mr;
        for (Mr in t)
          if (z.call(t, Mr)) {
            var Qe = t[Mr];
            if (Qe != null)
              switch (Mr) {
                case "children":
                  fi = Qe;
                  break;
                case "dangerouslySetInnerHTML":
                  Pr = Qe;
                  break;
                case "name":
                  Et = Qe;
                  break;
                case "formAction":
                  $a = Qe;
                  break;
                case "formEncType":
                  ca = Qe;
                  break;
                case "formMethod":
                  oa = Qe;
                  break;
                case "formTarget":
                  nf = Qe;
                  break;
                default:
                  wn(
                    n,
                    Mr,
                    Qe
                  );
              }
          }
        var ef = Mu(
          n,
          a,
          f,
          $a,
          ca,
          oa,
          nf,
          Et
        );
        if (Ke(n, v), n.push(Nn), ef != null && ef.forEach(Fa, n), me(n, Pr, fi), typeof fi == "string") {
          n.push(
            D(ln(fi))
          );
          var Jl = null;
        } else Jl = fi;
        return Jl;
      case "form":
        n.push(re("form"));
        var ci = null, lf = null, Cr = null, oi = null, hi = null, Vr = null, Ar;
        for (Ar in t)
          if (z.call(t, Ar)) {
            var fl = t[Ar];
            if (fl != null)
              switch (Ar) {
                case "children":
                  ci = fl;
                  break;
                case "dangerouslySetInnerHTML":
                  lf = fl;
                  break;
                case "action":
                  Cr = fl;
                  break;
                case "encType":
                  oi = fl;
                  break;
                case "method":
                  hi = fl;
                  break;
                case "target":
                  Vr = fl;
                  break;
                default:
                  wn(
                    n,
                    Ar,
                    fl
                  );
              }
          }
        var wt = null, Jr = null;
        if (typeof Cr == "function") {
          var Ll = Ht(
            a,
            Cr
          );
          Ll !== null ? (Cr = Ll.action || "", oi = Ll.encType, hi = Ll.method, Vr = Ll.target, wt = Ll.data, Jr = Ll.name) : (n.push(
            ge,
            D("action"),
            il,
            xu,
            Un
          ), Vr = hi = oi = Cr = null, Au(a, f));
        }
        if (Cr != null && wn(n, "action", Cr), oi != null && wn(n, "encType", oi), hi != null && wn(n, "method", hi), Vr != null && wn(n, "target", Vr), Ke(n, v), n.push(Nn), Jr !== null && (n.push(Ru), Cn(n, "name", Jr), n.push(Bt), wt != null && wt.forEach(Fa, n)), me(n, lf, ci), typeof ci == "string") {
          n.push(
            D(ln(ci))
          );
          var ha = null;
        } else ha = ci;
        return ha;
      case "menuitem":
        n.push(re("menuitem"));
        for (var sa in t)
          if (z.call(t, sa)) {
            var xt = t[sa];
            if (xt != null)
              switch (sa) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(400));
                default:
                  wn(
                    n,
                    sa,
                    xt
                  );
              }
          }
        return Ke(n, v), n.push(Nn), null;
      case "object":
        n.push(re("object"));
        var si = null, nu = null, di;
        for (di in t)
          if (z.call(t, di)) {
            var Rt = t[di];
            if (Rt != null)
              switch (di) {
                case "children":
                  si = Rt;
                  break;
                case "dangerouslySetInnerHTML":
                  nu = Rt;
                  break;
                case "data":
                  var rf = de("" + Rt);
                  if (rf === "") break;
                  n.push(
                    ge,
                    D("data"),
                    il,
                    D(ln(rf)),
                    Un
                  );
                  break;
                default:
                  wn(
                    n,
                    di,
                    Rt
                  );
              }
          }
        if (Ke(n, v), n.push(Nn), me(n, nu, si), typeof si == "string") {
          n.push(
            D(ln(si))
          );
          var tf = null;
        } else tf = si;
        return tf;
      case "title":
        var af = v.tagScope & 1, da = v.tagScope & 4;
        if (v.insertionMode === 4 || af || t.itemProp != null)
          var Kl = Oi(
            n,
            t
          );
        else
          da ? Kl = null : (Oi(f.hoistableChunks, t), Kl = void 0);
        return Kl;
      case "link":
        var eu = v.tagScope & 1, uf = v.tagScope & 4, Df = t.rel, cl = t.href, vi = t.precedence;
        if (v.insertionMode === 4 || eu || t.itemProp != null || typeof Df != "string" || typeof cl != "string" || cl === "") {
          ue(n, t);
          var Pt = null;
        } else if (t.rel === "stylesheet")
          if (typeof vi != "string" || t.disabled != null || t.onLoad || t.onError)
            Pt = ue(
              n,
              t
            );
          else {
            var Kr = f.styles.get(vi), On = a.styleResources.hasOwnProperty(cl) ? a.styleResources[cl] : void 0;
            if (On !== null) {
              a.styleResources[cl] = null, Kr || (Kr = {
                precedence: D(ln(vi)),
                rules: [],
                hrefs: [],
                sheets: /* @__PURE__ */ new Map()
              }, f.styles.set(vi, Kr));
              var ol = {
                state: 0,
                props: X({}, t, {
                  "data-precedence": t.precedence,
                  precedence: null
                })
              };
              if (On) {
                On.length === 2 && Wl(ol.props, On);
                var ll = f.preloads.stylesheets.get(cl);
                ll && 0 < ll.length ? ll.length = 0 : ol.state = 1;
              }
              Kr.sheets.set(cl, ol), d && d.stylesheets.add(ol);
            } else if (Kr) {
              var va = Kr.sheets.get(cl);
              va && d && d.stylesheets.add(va);
            }
            g && n.push(tl), Pt = null;
          }
        else
          t.onLoad || t.onError ? Pt = ue(
            n,
            t
          ) : (g && n.push(tl), Pt = uf ? null : ue(f.hoistableChunks, t));
        return Pt;
      case "script":
        var ff = v.tagScope & 1, Mt = t.async;
        if (typeof t.src != "string" || !t.src || !Mt || typeof Mt == "function" || typeof Mt == "symbol" || t.onLoad || t.onError || v.insertionMode === 4 || ff || t.itemProp != null)
          var lu = Ii(
            n,
            t
          );
        else {
          var gi = t.src;
          if (t.type === "module")
            var yi = a.moduleScriptResources, cf = f.preloads.moduleScripts;
          else
            yi = a.scriptResources, cf = f.preloads.scripts;
          var ga = yi.hasOwnProperty(gi) ? yi[gi] : void 0;
          if (ga !== null) {
            yi[gi] = null;
            var ya = t;
            if (ga) {
              ga.length === 2 && (ya = X({}, t), Wl(ya, ga));
              var ba = cf.get(gi);
              ba && (ba.length = 0);
            }
            var Ta = [];
            f.scripts.add(Ta), Ii(Ta, ya);
          }
          g && n.push(tl), lu = null;
        }
        return lu;
      case "style":
        var zf = v.tagScope & 1, Ea = t.precedence, Ct = t.href, of = t.nonce;
        if (v.insertionMode === 4 || zf || t.itemProp != null || typeof Ea != "string" || typeof Ct != "string" || Ct === "") {
          n.push(re("style"));
          var At = null, wa = null, kt;
          for (kt in t)
            if (z.call(t, kt)) {
              var pr = t[kt];
              if (pr != null)
                switch (kt) {
                  case "children":
                    At = pr;
                    break;
                  case "dangerouslySetInnerHTML":
                    wa = pr;
                    break;
                  default:
                    wn(
                      n,
                      kt,
                      pr
                    );
                }
            }
          n.push(Nn);
          var bi = Array.isArray(At) ? 2 > At.length ? At[0] : null : At;
          typeof bi != "function" && typeof bi != "symbol" && bi !== null && bi !== void 0 && n.push(
            D(("" + bi).replace(_i, Fi))
          ), me(n, wa, At), n.push(lr("style"));
          var hf = null;
        } else {
          var mr = f.styles.get(Ea);
          if ((a.styleResources.hasOwnProperty(Ct) ? a.styleResources[Ct] : void 0) !== null) {
            a.styleResources[Ct] = null, mr || (mr = {
              precedence: D(
                ln(Ea)
              ),
              rules: [],
              hrefs: [],
              sheets: /* @__PURE__ */ new Map()
            }, f.styles.set(Ea, mr));
            var sf = f.nonce.style;
            if (!sf || sf === of) {
              mr.hrefs.push(
                D(ln(Ct))
              );
              var df = mr.rules, St = null, xa = null, vf;
              for (vf in t)
                if (z.call(t, vf)) {
                  var Hf = t[vf];
                  if (Hf != null)
                    switch (vf) {
                      case "children":
                        St = Hf;
                        break;
                      case "dangerouslySetInnerHTML":
                        xa = Hf;
                    }
                }
              var ru = Array.isArray(St) ? 2 > St.length ? St[0] : null : St;
              typeof ru != "function" && typeof ru != "symbol" && ru !== null && ru !== void 0 && df.push(
                D(
                  ("" + ru).replace(_i, Fi)
                )
              ), me(df, xa, St);
            }
          }
          mr && d && d.styles.add(mr), g && n.push(tl), hf = void 0;
        }
        return hf;
      case "meta":
        var wc = v.tagScope & 1, xc = v.tagScope & 4;
        if (v.insertionMode === 4 || wc || t.itemProp != null)
          var $f = nr(
            n,
            t,
            "meta",
            v
          );
        else
          g && n.push(tl), $f = xc ? null : typeof t.charSet == "string" ? nr(
            f.charsetChunks,
            t,
            "meta",
            v
          ) : t.name === "viewport" ? nr(
            f.viewportChunks,
            t,
            "meta",
            v
          ) : nr(
            f.hoistableChunks,
            t,
            "meta",
            v
          );
        return $f;
      case "listing":
      case "pre":
        n.push(re(l));
        var tu = null, iu = null, au;
        for (au in t)
          if (z.call(t, au)) {
            var gf = t[au];
            if (gf != null)
              switch (au) {
                case "children":
                  tu = gf;
                  break;
                case "dangerouslySetInnerHTML":
                  iu = gf;
                  break;
                default:
                  wn(
                    n,
                    au,
                    gf
                  );
              }
          }
        if (Ke(n, v), n.push(Nn), iu != null) {
          if (tu != null) throw Error(s(60));
          if (typeof iu != "object" || !("__html" in iu))
            throw Error(s(61));
          var Ti = iu.__html;
          Ti != null && (typeof Ti == "string" && 0 < Ti.length && Ti[0] === `
` ? n.push(Ia, D(Ti)) : n.push(D("" + Ti)));
        }
        return typeof tu == "string" && tu[0] === `
` && n.push(Ia), tu;
      case "img":
        var Rc = v.tagScope & 3, Ve = t.src, Ie = t.srcSet;
        if (!(t.loading === "lazy" || !Ve && !Ie || typeof Ve != "string" && Ve != null || typeof Ie != "string" && Ie != null || t.fetchPriority === "low" || Rc) && (typeof Ve != "string" || Ve[4] !== ":" || Ve[0] !== "d" && Ve[0] !== "D" || Ve[1] !== "a" && Ve[1] !== "A" || Ve[2] !== "t" && Ve[2] !== "T" || Ve[3] !== "a" && Ve[3] !== "A") && (typeof Ie != "string" || Ie[4] !== ":" || Ie[0] !== "d" && Ie[0] !== "D" || Ie[1] !== "a" && Ie[1] !== "A" || Ie[2] !== "t" && Ie[2] !== "T" || Ie[3] !== "a" && Ie[3] !== "A")) {
          d !== null && v.tagScope & 64 && (d.suspenseyImages = !0);
          var nc = typeof t.sizes == "string" ? t.sizes : void 0, Ra = Ie ? Ie + `
` + (nc || "") : Ve, Bf = f.preloads.images, Ei = Bf.get(Ra);
          if (Ei)
            (t.fetchPriority === "high" || 10 > f.highImagePreloads.size) && (Bf.delete(Ra), f.highImagePreloads.add(Ei));
          else if (!a.imageResources.hasOwnProperty(Ra)) {
            a.imageResources[Ra] = Je;
            var Wf = t.crossOrigin, ec = typeof Wf == "string" ? Wf === "use-credentials" ? Wf : "" : void 0, wi = f.headers, Uf;
            wi && 0 < wi.remainingCapacity && typeof t.srcSet != "string" && (t.fetchPriority === "high" || 500 > wi.highImagePreloads.length) && (Uf = xl(Ve, "image", {
              imageSrcSet: t.srcSet,
              imageSizes: t.sizes,
              crossOrigin: ec,
              integrity: t.integrity,
              nonce: t.nonce,
              type: t.type,
              fetchPriority: t.fetchPriority,
              referrerPolicy: t.referrerPolicy
            }), 0 <= (wi.remainingCapacity -= Uf.length + 2)) ? (f.resets.image[Ra] = Je, wi.highImagePreloads && (wi.highImagePreloads += ", "), wi.highImagePreloads += Uf) : (Ei = [], ue(Ei, {
              rel: "preload",
              as: "image",
              href: Ie ? void 0 : Ve,
              imageSrcSet: Ie,
              imageSizes: nc,
              crossOrigin: ec,
              integrity: t.integrity,
              type: t.type,
              fetchPriority: t.fetchPriority,
              referrerPolicy: t.referrerPolicy
            }), t.fetchPriority === "high" || 10 > f.highImagePreloads.size ? f.highImagePreloads.add(Ei) : (f.bulkPreloads.add(Ei), Bf.set(Ra, Ei)));
          }
        }
        return nr(n, t, "img", v);
      case "base":
      case "area":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "param":
      case "source":
      case "track":
      case "wbr":
        return nr(n, t, l, v);
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        break;
      case "head":
        if (2 > v.insertionMode) {
          var Yf = o || f.preamble;
          if (Yf.headChunks)
            throw Error(s(545, "`<head>`"));
          o !== null && n.push(Ef), Yf.headChunks = [];
          var lc = Li(
            Yf.headChunks,
            t,
            "head",
            v
          );
        } else
          lc = er(
            n,
            t,
            "head",
            v
          );
        return lc;
      case "body":
        if (2 > v.insertionMode) {
          var Gf = o || f.preamble;
          if (Gf.bodyChunks)
            throw Error(s(545, "`<body>`"));
          o !== null && n.push(wf), Gf.bodyChunks = [];
          var rc = Li(
            Gf.bodyChunks,
            t,
            "body",
            v
          );
        } else
          rc = er(
            n,
            t,
            "body",
            v
          );
        return rc;
      case "html":
        if (v.insertionMode === 0) {
          var Xf = o || f.preamble;
          if (Xf.htmlChunks)
            throw Error(s(545, "`<html>`"));
          o !== null && n.push(nt), Xf.htmlChunks = [Fr];
          var tc = Li(
            Xf.htmlChunks,
            t,
            "html",
            v
          );
        } else
          tc = er(
            n,
            t,
            "html",
            v
          );
        return tc;
      default:
        if (l.indexOf("-") !== -1) {
          n.push(re(l));
          var Zf = null, ic = null, Pa;
          for (Pa in t)
            if (z.call(t, Pa)) {
              var pl = t[Pa];
              if (pl != null) {
                var ac = Pa;
                switch (Pa) {
                  case "children":
                    Zf = pl;
                    break;
                  case "dangerouslySetInnerHTML":
                    ic = pl;
                    break;
                  case "style":
                    zt(n, pl);
                    break;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                  case "ref":
                    break;
                  case "className":
                    ac = "class";
                  default:
                    if (ke(Pa) && typeof pl != "function" && typeof pl != "symbol" && pl !== !1) {
                      if (pl === !0) pl = "";
                      else if (typeof pl == "object") continue;
                      n.push(
                        ge,
                        D(ac),
                        il,
                        D(ln(pl)),
                        Un
                      );
                    }
                }
              }
            }
          return Ke(n, v), n.push(Nn), me(n, ic, Zf), Zf;
        }
    }
    return er(n, t, l, v);
  }
  var La = /* @__PURE__ */ new Map();
  function lr(n) {
    var l = La.get(n);
    return l === void 0 && (l = A("</" + n + ">"), La.set(n, l)), l;
  }
  function Na(n, l) {
    n = n.preamble, n.htmlChunks === null && l.htmlChunks && (n.htmlChunks = l.htmlChunks), n.headChunks === null && l.headChunks && (n.headChunks = l.headChunks), n.bodyChunks === null && l.bodyChunks && (n.bodyChunks = l.bodyChunks);
  }
  function Da(n, l) {
    l = l.bootstrapChunks;
    for (var t = 0; t < l.length - 1; t++)
      C(n, l[t]);
    return t < l.length ? (t = l[t], l.length = 0, Q(n, t)) : !0;
  }
  var rr = A(
    "requestAnimationFrame(function(){$RT=performance.now()});"
  ), ku = A('<template id="'), Rf = A('"></template>'), Su = A("<!--&-->"), tr = A("<!--/&-->"), Di = A("<!--$-->"), Pf = A(
    '<!--$?--><template id="'
  ), Mf = A('"></template>'), Cf = A("<!--$!-->"), ze = A("<!--/$-->"), Se = A("<template"), Af = A('"'), zi = A(' data-dgst="');
  A(' data-msg="'), A(' data-stck="'), A(' data-cstck="');
  var Hi = A("></template>");
  function _u(n, l, t) {
    if (C(n, Pf), t === null) throw Error(s(395));
    return C(n, l.boundaryPrefix), C(n, D(t.toString(16))), Q(n, Mf);
  }
  var kf = A('<div hidden id="'), zl = A('">'), za = A("</div>"), Ha = A(
    '<svg aria-hidden="true" style="display:none" id="'
  ), Ba = A('">'), Bi = A("</svg>"), In = A(
    '<math aria-hidden="true" style="display:none" id="'
  ), Yt = A('">'), Wi = A("</math>"), Gt = A('<table hidden id="'), Xt = A('">'), Zt = A("</table>"), Ui = A('<table hidden><tbody id="'), et = A('">'), Fu = A("</tbody></table>"), Yi = A('<table hidden><tr id="'), Wa = A('">'), ir = A("</tr></table>"), Gi = A(
    '<table hidden><colgroup id="'
  ), Hl = A('">'), Ou = A("</colgroup></table>");
  function Ua(n, l, t, a) {
    switch (t.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return C(n, kf), C(n, l.segmentPrefix), C(n, D(a.toString(16))), Q(n, zl);
      case 4:
        return C(n, Ha), C(n, l.segmentPrefix), C(n, D(a.toString(16))), Q(n, Ba);
      case 5:
        return C(n, In), C(n, l.segmentPrefix), C(n, D(a.toString(16))), Q(n, Yt);
      case 6:
        return C(n, Gt), C(n, l.segmentPrefix), C(n, D(a.toString(16))), Q(n, Xt);
      case 7:
        return C(n, Ui), C(n, l.segmentPrefix), C(n, D(a.toString(16))), Q(n, et);
      case 8:
        return C(n, Yi), C(n, l.segmentPrefix), C(n, D(a.toString(16))), Q(n, Wa);
      case 9:
        return C(n, Gi), C(n, l.segmentPrefix), C(n, D(a.toString(16))), Q(n, Hl);
      default:
        throw Error(s(397));
    }
  }
  function ar(n, l) {
    switch (l.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return Q(n, za);
      case 4:
        return Q(n, Bi);
      case 5:
        return Q(n, Wi);
      case 6:
        return Q(n, Zt);
      case 7:
        return Q(n, Fu);
      case 8:
        return Q(n, ir);
      case 9:
        return Q(n, Ou);
      default:
        throw Error(s(397));
    }
  }
  var Qt = A(
    '$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
  ), Iu = A('$RS("'), Lu = A('","'), Nu = A('")<\/script>');
  A('<template data-rsi="" data-sid="'), A('" data-pid="');
  var Du = A(
    `$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};
$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};`
  ), zu = D(
    `$RV=function(B,g){function h(a,c){var e=a.getAttribute(c);e&&(c=a.style,l.push(a,c.viewTransitionName,c.viewTransitionClass),"auto"!==e&&(c.viewTransitionClass=e),(a=a.getAttribute("vt-name"))||(a="_T_"+N++ +"_"),a=CSS.escape(a)!==a?"r-"+btoa(a).replace(/=/g,""):a,c.viewTransitionName=a,C=!0)}var C=!1,N=0,l=[];try{var f=document.__reactViewTransition;if(f){f.finished.finally($RV.bind(null,g));return}var m=new Map;for(f=1;f<g.length;f+=2)for(var k=g[f].querySelectorAll("[vt-share]"),d=0;d<k.length;d++){var b=k[d];m.set(b.getAttribute("vt-name"),b)}var u=[];for(k=0;k<g.length;k+=2){var D=g[k],x=D.parentNode;if(x){var v=x.getBoundingClientRect();if(v.left||v.top||v.width||v.height){b=D;for(f=0;b;){if(8===b.nodeType){var t=b.data;if("/$"===t)if(0===f)break;else f--;else"$"!==t&&"$?"!==t&&"$~"!==t&&"$!"!==t||f++}else if(1===b.nodeType){d=b;var E=d.getAttribute("vt-name"),y=m.get(E);h(d,y?"vt-share":"vt-exit");y&&(h(y,"vt-share"),m.set(E,null));for(var F=d.querySelectorAll("[vt-share]"),
z=0;z<F.length;z++){var G=F[z],H=G.getAttribute("vt-name"),I=m.get(H);I&&(h(G,"vt-share"),h(I,"vt-share"),m.set(H,null))}var J=d.querySelectorAll("[vt-parent-exit]");for(d=0;d<J.length;d++)h(J[d],"vt-parent-exit")}b=b.nextSibling}for(var K=g[k+1],n=K.firstElementChild;n;){null!==m.get(n.getAttribute("vt-name"))&&h(n,"vt-enter");var L=n.querySelectorAll("[vt-parent-enter]");for(b=0;b<L.length;b++)h(L[b],"vt-parent-enter");n=n.nextElementSibling}b=x;do for(var p=b.firstElementChild;p;){var M=p.getAttribute("vt-update");
M&&"none"!==M&&!l.includes(p)&&h(p,"vt-update");p=p.nextElementSibling}while((b=b.parentNode)&&1===b.nodeType&&"none"!==b.getAttribute("vt-update"));u.push.apply(u,K.querySelectorAll('img[src]:not([loading="lazy"])'))}}}if(C){var A=document.__reactViewTransition=document.startViewTransition({update:function(){B(g);for(var a=[document.documentElement.clientHeight,document.fonts.ready],c={},e=0;e<u.length;c={g:c.g},e++)if(c.g=u[e],!c.g.complete){var q=c.g.getBoundingClientRect();0<q.bottom&&0<q.right&&
q.top<window.innerHeight&&q.left<window.innerWidth&&(q=new Promise(function(w){return function(r){w.g.addEventListener("load",r);w.g.addEventListener("error",r)}}(c)),a.push(q))}return Promise.race([Promise.all(a),new Promise(function(w){var r=performance.now();setTimeout(w,2300>r&&2E3<r?2300-r:500)})])},types:[]});A.ready.finally(function(){for(var a=l.length-3;0<=a;a-=3){var c=l[a],e=c.style;e.viewTransitionName=l[a+1];e.viewTransitionClass=l[a+1];""===c.getAttribute("style")&&c.removeAttribute("style")}});
A.finished.finally(function(){document.__reactViewTransition===A&&(document.__reactViewTransition=null)});$RB=[];return}}catch(a){}B(g)}.bind(null,$RV);`
  ), Sf = A('$RC("'), _f = A(
    `$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=e[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&$RM.set(b.getAttribute("href"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement("link");a.href=d;a.rel=
"stylesheet";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute("media");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=
"$~";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,"CSS failed to load"))};$RR("`
  ), Hu = A('$RR("'), Bu = A('","'), Ff = A('",'), Wu = A('"'), Xi = A(")<\/script>");
  A('<template data-rci="" data-bid="'), A('<template data-rri="" data-bid="'), A('" data-sid="'), A('" data-sty="');
  var Of = A(
    '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,null!=c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};'
  ), Ya = A(
    '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,null!=c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'
  ), Uu = A('$RX("'), Or = A('"'), Ga = A(","), Zi = A("null"), Yu = A(")<\/script>");
  A('<template data-rxi="" data-bid="'), A('" data-dgst="'), A('" data-msg="'), A('" data-stck="'), A('" data-cstck="');
  var lt = /[<\u2028\u2029]/g;
  function If(n) {
    return JSON.stringify(n).replace(
      lt,
      function(l) {
        switch (l) {
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error(
              "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
            );
        }
      }
    );
  }
  var Lf = /[&><\u2028\u2029]/g;
  function Vt(n) {
    return JSON.stringify(n).replace(
      Lf,
      function(l) {
        switch (l) {
          case "&":
            return "\\u0026";
          case ">":
            return "\\u003e";
          case "<":
            return "\\u003c";
          case "\u2028":
            return "\\u2028";
          case "\u2029":
            return "\\u2029";
          default:
            throw Error(
              "escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
            );
        }
      }
    );
  }
  var ye = A(
    ' media="not all" data-precedence="'
  ), Qi = A('" data-href="'), Xa = A('">'), Vi = A("</style>"), Jt = !1, Bl = !0;
  function Kt(n) {
    var l = n.rules, t = n.hrefs, a = 0;
    if (t.length) {
      for (C(this, jl.startInlineStyle), C(this, ye), C(this, n.precedence), C(this, Qi); a < t.length - 1; a++)
        C(this, t[a]), C(this, rt);
      for (C(this, t[a]), C(this, Xa), a = 0; a < l.length; a++) C(this, l[a]);
      Bl = Q(
        this,
        Vi
      ), Jt = !0, l.length = 0, t.length = 0;
    }
  }
  function Za(n) {
    return n.state !== 2 ? Jt = !0 : !1;
  }
  function ur(n, l, t) {
    return Jt = !1, Bl = !0, jl = t, l.styles.forEach(Kt, n), jl = null, l.stylesheets.forEach(Za), Jt && (t.stylesToHoist = !0), Bl;
  }
  function An(n) {
    for (var l = 0; l < n.length; l++) C(this, n[l]);
    n.length = 0;
  }
  var He = [];
  function Re(n) {
    ue(He, n.props);
    for (var l = 0; l < He.length; l++)
      C(this, He[l]);
    He.length = 0, n.state = 2;
  }
  var Qa = A(' data-precedence="'), Va = A('" data-href="'), rt = A(" "), Gu = A('">'), Xu = A("</style>");
  function Zu(n) {
    var l = 0 < n.sheets.size;
    n.sheets.forEach(Re, this), n.sheets.clear();
    var t = n.rules, a = n.hrefs;
    if (!l || a.length) {
      if (C(this, jl.startInlineStyle), C(this, Qa), C(this, n.precedence), n = 0, a.length) {
        for (C(this, Va); n < a.length - 1; n++)
          C(this, a[n]), C(this, rt);
        C(this, a[n]);
      }
      for (C(this, Gu), n = 0; n < t.length; n++)
        C(this, t[n]);
      C(this, Xu), t.length = 0, a.length = 0;
    }
  }
  function Ji(n) {
    if (n.state === 0) {
      n.state = 1;
      var l = n.props;
      for (ue(He, {
        rel: "preload",
        as: "style",
        href: n.props.href,
        crossOrigin: l.crossOrigin,
        fetchPriority: l.fetchPriority,
        integrity: l.integrity,
        media: l.media,
        hrefLang: l.hrefLang,
        referrerPolicy: l.referrerPolicy
      }), n = 0; n < He.length; n++)
        C(this, He[n]);
      He.length = 0;
    }
  }
  function Ki(n) {
    n.sheets.forEach(Ji, this), n.sheets.clear();
  }
  A('<link rel="expect" href="#'), A('" blocking="render"/>');
  var Be = A(' id="');
  function tt(n, l) {
    (l.instructions & 32) === 0 && (l.instructions |= 32, n.push(
      Be,
      D(ln("_" + l.idPrefix + "R_")),
      Un
    ));
  }
  var pi = A("["), Ja = A(",["), mi = A(","), pt = A("]");
  function Qu(n, l) {
    C(n, pi);
    var t = pi;
    l.stylesheets.forEach(function(a) {
      if (a.state !== 2)
        if (a.state === 3)
          C(n, t), C(
            n,
            D(
              Vt("" + a.props.href)
            )
          ), C(n, pt), t = Ja;
        else {
          C(n, t);
          var f = a.props["data-precedence"], o = a.props, d = de("" + a.props.href);
          C(
            n,
            D(Vt(d))
          ), f = "" + f, C(n, mi), C(
            n,
            D(Vt(f))
          );
          for (var v in o)
            if (z.call(o, v) && (f = o[v], f != null))
              switch (v) {
                case "href":
                case "rel":
                case "precedence":
                case "data-precedence":
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(399, "link"));
                default:
                  Vu(
                    n,
                    v,
                    f
                  );
              }
          C(n, pt), t = Ja, a.state = 3;
        }
    }), C(n, pt);
  }
  function Vu(n, l, t) {
    var a = l.toLowerCase();
    switch (typeof t) {
      case "function":
      case "symbol":
        return;
    }
    switch (l) {
      case "innerHTML":
      case "dangerouslySetInnerHTML":
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "style":
      case "ref":
        return;
      case "className":
        a = "class", l = "" + t;
        break;
      case "hidden":
        if (t === !1) return;
        l = "";
        break;
      case "src":
      case "href":
        t = de(t), l = "" + t;
        break;
      default:
        if (2 < l.length && (l[0] === "o" || l[0] === "O") && (l[1] === "n" || l[1] === "N") || !ke(l))
          return;
        l = "" + t;
    }
    C(n, mi), C(
      n,
      D(Vt(a))
    ), C(n, mi), C(
      n,
      D(Vt(l))
    );
  }
  function pn() {
    return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set(), suspenseyImages: !1 };
  }
  function Nf(n) {
    var l = Hn || null;
    if (l) {
      var t = l.resumableState, a = l.renderState;
      if (typeof n == "string" && n) {
        if (!t.dnsResources.hasOwnProperty(n)) {
          t.dnsResources[n] = null, t = a.headers;
          var f, o;
          (o = t && 0 < t.remainingCapacity) && (o = (f = "<" + ("" + n).replace(
            $i,
            qt
          ) + ">; rel=dns-prefetch", 0 <= (t.remainingCapacity -= f.length + 2))), o ? (a.resets.dns[n] = null, t.preconnects && (t.preconnects += ", "), t.preconnects += f) : (f = [], ue(f, { href: n, rel: "dns-prefetch" }), a.preconnects.add(f));
        }
        Xr(l);
      }
    } else Tn.D(n);
  }
  function mt(n, l) {
    var t = Hn || null;
    if (t) {
      var a = t.resumableState, f = t.renderState;
      if (typeof n == "string" && n) {
        var o = l === "use-credentials" ? "credentials" : typeof l == "string" ? "anonymous" : "default";
        if (!a.connectResources[o].hasOwnProperty(n)) {
          a.connectResources[o][n] = null, a = f.headers;
          var d, v;
          if (v = a && 0 < a.remainingCapacity) {
            if (v = "<" + ("" + n).replace(
              $i,
              qt
            ) + ">; rel=preconnect", typeof l == "string") {
              var g = ("" + l).replace(
                na,
                Lr
              );
              v += '; crossorigin="' + g + '"';
            }
            v = (d = v, 0 <= (a.remainingCapacity -= d.length + 2));
          }
          v ? (f.resets.connect[o][n] = null, a.preconnects && (a.preconnects += ", "), a.preconnects += d) : (o = [], ue(o, {
            rel: "preconnect",
            href: n,
            crossOrigin: l
          }), f.preconnects.add(o));
        }
        Xr(t);
      }
    } else Tn.C(n, l);
  }
  function qi(n, l, t) {
    var a = Hn || null;
    if (a) {
      var f = a.resumableState, o = a.renderState;
      if (l && n) {
        switch (l) {
          case "image":
            if (t)
              var d = t.imageSrcSet, v = t.imageSizes, g = t.fetchPriority;
            var b = d ? d + `
` + (v || "") : n;
            if (f.imageResources.hasOwnProperty(b)) return;
            f.imageResources[b] = Je, f = o.headers;
            var k;
            f && 0 < f.remainingCapacity && typeof d != "string" && g === "high" && (k = xl(n, l, t), 0 <= (f.remainingCapacity -= k.length + 2)) ? (o.resets.image[b] = Je, f.highImagePreloads && (f.highImagePreloads += ", "), f.highImagePreloads += k) : (f = [], ue(
              f,
              X(
                { rel: "preload", href: d ? void 0 : n, as: l },
                t
              )
            ), g === "high" ? o.highImagePreloads.add(f) : (o.bulkPreloads.add(f), o.preloads.images.set(b, f)));
            break;
          case "style":
            if (f.styleResources.hasOwnProperty(n)) return;
            d = [], ue(
              d,
              X({ rel: "preload", href: n, as: l }, t)
            ), f.styleResources[n] = !t || typeof t.crossOrigin != "string" && typeof t.integrity != "string" ? Je : [t.crossOrigin, t.integrity], o.preloads.stylesheets.set(n, d), o.bulkPreloads.add(d);
            break;
          case "script":
            if (f.scriptResources.hasOwnProperty(n)) return;
            d = [], o.preloads.scripts.set(n, d), o.bulkPreloads.add(d), ue(
              d,
              X({ rel: "preload", href: n, as: l }, t)
            ), f.scriptResources[n] = !t || typeof t.crossOrigin != "string" && typeof t.integrity != "string" ? Je : [t.crossOrigin, t.integrity];
            break;
          default:
            if (f.unknownResources.hasOwnProperty(l)) {
              if (d = f.unknownResources[l], d.hasOwnProperty(n))
                return;
            } else
              d = {}, f.unknownResources[l] = d;
            if (d[n] = Je, (f = o.headers) && 0 < f.remainingCapacity && l === "font" && (b = xl(n, l, t), 0 <= (f.remainingCapacity -= b.length + 2)))
              o.resets.font[n] = Je, f.fontPreloads && (f.fontPreloads += ", "), f.fontPreloads += b;
            else
              switch (f = [], n = X({ rel: "preload", href: n, as: l }, t), ue(f, n), l) {
                case "font":
                  o.fontPreloads.add(f);
                  break;
                default:
                  o.bulkPreloads.add(f);
              }
        }
        Xr(a);
      }
    } else Tn.L(n, l, t);
  }
  function Ir(n, l) {
    var t = Hn || null;
    if (t) {
      var a = t.resumableState, f = t.renderState;
      if (n) {
        var o = l && typeof l.as == "string" ? l.as : "script";
        switch (o) {
          case "script":
            if (a.moduleScriptResources.hasOwnProperty(n)) return;
            o = [], a.moduleScriptResources[n] = !l || typeof l.crossOrigin != "string" && typeof l.integrity != "string" ? Je : [l.crossOrigin, l.integrity], f.preloads.moduleScripts.set(n, o);
            break;
          default:
            if (a.moduleUnknownResources.hasOwnProperty(o)) {
              var d = a.moduleUnknownResources[o];
              if (d.hasOwnProperty(n)) return;
            } else
              d = {}, a.moduleUnknownResources[o] = d;
            o = [], d[n] = Je;
        }
        ue(o, X({ rel: "modulepreload", href: n }, l)), f.bulkPreloads.add(o), Xr(t);
      }
    } else Tn.m(n, l);
  }
  function Ka(n, l, t) {
    var a = Hn || null;
    if (a) {
      var f = a.resumableState, o = a.renderState;
      if (n) {
        l = l || "default";
        var d = o.styles.get(l), v = f.styleResources.hasOwnProperty(n) ? f.styleResources[n] : void 0;
        v !== null && (f.styleResources[n] = null, d || (d = {
          precedence: D(ln(l)),
          rules: [],
          hrefs: [],
          sheets: /* @__PURE__ */ new Map()
        }, o.styles.set(l, d)), l = {
          state: 0,
          props: X(
            { rel: "stylesheet", href: n, "data-precedence": l },
            t
          )
        }, v && (v.length === 2 && Wl(l.props, v), (o = o.preloads.stylesheets.get(n)) && 0 < o.length ? o.length = 0 : l.state = 1), d.sheets.set(n, l), Xr(a));
      }
    } else Tn.S(n, l, t);
  }
  function pa(n, l) {
    var t = Hn || null;
    if (t) {
      var a = t.resumableState, f = t.renderState;
      if (n) {
        var o = a.scriptResources.hasOwnProperty(n) ? a.scriptResources[n] : void 0;
        o !== null && (a.scriptResources[n] = null, l = X({ src: n, async: !0 }, l), o && (o.length === 2 && Wl(l, o), n = f.preloads.scripts.get(n)) && (n.length = 0), n = [], f.scripts.add(n), Ii(n, l), Xr(t));
      }
    } else Tn.X(n, l);
  }
  function ji(n, l) {
    var t = Hn || null;
    if (t) {
      var a = t.resumableState, f = t.renderState;
      if (n) {
        var o = a.moduleScriptResources.hasOwnProperty(
          n
        ) ? a.moduleScriptResources[n] : void 0;
        o !== null && (a.moduleScriptResources[n] = null, l = X({ src: n, type: "module", async: !0 }, l), o && (o.length === 2 && Wl(l, o), n = f.preloads.moduleScripts.get(n)) && (n.length = 0), n = [], f.scripts.add(n), Ii(n, l), Xr(t));
      }
    } else Tn.M(n, l);
  }
  function Wl(n, l) {
    n.crossOrigin == null && (n.crossOrigin = l[0]), n.integrity == null && (n.integrity = l[1]);
  }
  function xl(n, l, t) {
    n = ("" + n).replace(
      $i,
      qt
    ), l = ("" + l).replace(
      na,
      Lr
    ), l = "<" + n + '>; rel=preload; as="' + l + '"';
    for (var a in t)
      z.call(t, a) && (n = t[a], typeof n == "string" && (l += "; " + a.toLowerCase() + '="' + ("" + n).replace(
        na,
        Lr
      ) + '"'));
    return l;
  }
  var $i = /[<>\r\n]/g;
  function qt(n) {
    switch (n) {
      case "<":
        return "%3C";
      case ">":
        return "%3E";
      case `
`:
        return "%0A";
      case "\r":
        return "%0D";
      default:
        throw Error(
          "escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
        );
    }
  }
  var na = /["';,\r\n]/g;
  function Lr(n) {
    switch (n) {
      case '"':
        return "%22";
      case "'":
        return "%27";
      case ";":
        return "%3B";
      case ",":
        return "%2C";
      case `
`:
        return "%0A";
      case "\r":
        return "%0D";
      default:
        throw Error(
          "escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
        );
    }
  }
  function ea(n) {
    this.styles.add(n);
  }
  function jt(n) {
    this.stylesheets.add(n);
  }
  function Rl(n, l) {
    l.styles.forEach(ea, n), l.stylesheets.forEach(jt, n), l.suspenseyImages && (n.suspenseyImages = !0);
  }
  function la(n, l) {
    return l ? n.suspenseyImages : 0 < n.stylesheets.size || n.suspenseyImages;
  }
  var Ju = Function.prototype.bind, Ku = Symbol.for("react.client.reference");
  function Nr(n) {
    if (n == null) return null;
    if (typeof n == "function")
      return n.$$typeof === Ku ? null : n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case Z:
        return "Fragment";
      case tn:
        return "Profiler";
      case K:
        return "StrictMode";
      case M:
        return "Suspense";
      case V:
        return "SuspenseList";
      case rl:
        return "Activity";
      case we:
        return "ViewTransition";
    }
    if (typeof n == "object")
      switch (n.$$typeof) {
        case S:
          return "Portal";
        case fn:
          return n.displayName || "Context";
        case an:
          return (n._context.displayName || "Context") + ".Consumer";
        case F:
          var l = n.render;
          return n = n.displayName, n || (n = l.displayName || l.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
        case $:
          return l = n.displayName || null, l !== null ? l : Nr(n.type) || "Memo";
        case vn:
          l = n._payload, n = n._init;
          try {
            return Nr(n(l));
          } catch {
          }
      }
    return null;
  }
  var $t = {}, qe = null;
  function ra(n, l) {
    if (n !== l) {
      n.context._currentValue = n.parentValue, n = n.parent;
      var t = l.parent;
      if (n === null) {
        if (t !== null) throw Error(s(401));
      } else {
        if (t === null) throw Error(s(401));
        ra(n, t);
      }
      l.context._currentValue = l.value;
    }
  }
  function pu(n) {
    n.context._currentValue = n.parentValue, n = n.parent, n !== null && pu(n);
  }
  function ta(n) {
    var l = n.parent;
    l !== null && ta(l), n.context._currentValue = n.value;
  }
  function mu(n, l) {
    if (n.context._currentValue = n.parentValue, n = n.parent, n === null) throw Error(s(402));
    n.depth === l.depth ? ra(n, l) : mu(n, l);
  }
  function ni(n, l) {
    var t = l.parent;
    if (t === null) throw Error(s(402));
    n.depth === t.depth ? ra(n, t) : ni(n, t), l.context._currentValue = l.value;
  }
  function fr(n) {
    var l = qe;
    l !== n && (l === null ? ta(n) : n === null ? pu(l) : l.depth === n.depth ? ra(l, n) : l.depth > n.depth ? mu(l, n) : ni(l, n), qe = n);
  }
  var ma = {
    enqueueSetState: function(n, l) {
      n = n._reactInternals, n.queue !== null && n.queue.push(l);
    },
    enqueueReplaceState: function(n, l) {
      n = n._reactInternals, n.replace = !0, n.queue = [l];
    },
    enqueueForceUpdate: function() {
    }
  }, e = { id: 1, overflow: "" };
  function r(n) {
    var l = n.overflow;
    return n = n.id, (n & ~(1 << 32 - u(n) - 1)).toString(32) + l;
  }
  function i(n, l, t) {
    var a = n.id;
    n = n.overflow;
    var f = 32 - u(a) - 1;
    a &= ~(1 << f), t += 1;
    var o = 32 - u(l) + f;
    if (30 < o) {
      var d = f - f % 5;
      return o = (a & (1 << d) - 1).toString(32), a >>= d, f -= d, {
        id: 1 << 32 - u(l) + f | t << f | a,
        overflow: o + n
      };
    }
    return {
      id: 1 << o | t << f | a,
      overflow: n
    };
  }
  var u = Math.clz32 ? Math.clz32 : y, c = Math.log, h = Math.LN2;
  function y(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (c(n) / h | 0) | 0;
  }
  function w() {
  }
  var E = Error(s(460));
  function x(n, l, t) {
    switch (t = n[t], t === void 0 ? n.push(l) : t !== l && (l.then(w, w), l = t), l.status) {
      case "fulfilled":
        return l.value;
      case "rejected":
        throw n = l.reason, n === void 0 && !("reason" in l) ? Error(s(600)) : n;
      default:
        switch (typeof l.status == "string" ? l.then(w, w) : (n = l, n.status = "pending", n.then(
          function(a) {
            if (l.status === "pending") {
              var f = l;
              f.status = "fulfilled", f.value = a;
            }
          },
          function(a) {
            if (l.status === "pending") {
              var f = l;
              f.status = "rejected", f.reason = a;
            }
          }
        )), l.status) {
          case "fulfilled":
            return l.value;
          case "rejected":
            throw l.reason;
        }
        throw O = l, E;
    }
  }
  var O = null;
  function L() {
    if (O === null) throw Error(s(459));
    var n = O;
    return O = null, n;
  }
  function G(n, l) {
    return n === l && (n !== 0 || 1 / n === 1 / l) || n !== n && l !== l;
  }
  var U = typeof Object.is == "function" ? Object.is : G, B = null, p = null, gn = null, hn = null, xn = null, m = null, kn = !1, un = !1, sn = 0, Rn = 0, be = -1, cn = 0, Sn = null;
  function Zn(n) {
    if (n = n._reason, typeof n == "function")
      try {
        var l = n();
      } catch {
        l = "The reason for browser-only rendering could not be determined because its initializer threw.";
      }
    else l = n;
    return l = Error(
      s(603),
      n === void 0 ? void 0 : { cause: l }
    ), Object.defineProperty(l, dn, {
      value: !0
    }), l;
  }
  function mn(n) {
    return typeof n != "object" || n === null ? !1 : n[dn] === !0;
  }
  function _n(n) {
    var l = Error(
      s(604),
      z.call(n, "cause") ? { cause: n.cause } : void 0
    );
    if (n = n.stack, n !== void 0) {
      var t = n.indexOf(`
`);
      l.stack = l.name + ": " + l.message + (t === -1 ? "" : n.slice(t));
    } else l.stack = void 0;
    return l;
  }
  var qn = null, Yn = 0;
  function Pe() {
    if (B === null)
      throw Error(s(321));
    return B;
  }
  function We() {
    if (0 < Yn) throw Error(s(312));
    return { memoizedState: null, queue: null, next: null };
  }
  function jn() {
    return m === null ? xn === null ? (kn = !1, xn = m = We()) : (kn = !0, m = xn) : m.next === null ? (kn = !1, m = m.next = We()) : (kn = !0, m = m.next), m;
  }
  function Ue() {
    var n = Sn;
    return Sn = null, n;
  }
  function $n() {
    hn = gn = p = B = null, un = !1, xn = null, Yn = 0, m = qn = null;
  }
  function hl(n, l) {
    return typeof l == "function" ? l(n) : l;
  }
  function ce(n, l, t) {
    if (B = Pe(), m = jn(), kn) {
      var a = m.queue;
      if (l = a.dispatch, qn !== null && (t = qn.get(a), t !== void 0)) {
        qn.delete(a), a = m.memoizedState;
        do
          a = n(a, t.action), t = t.next;
        while (t !== null);
        return m.memoizedState = a, [a, l];
      }
      return [m.memoizedState, l];
    }
    return n = n === hl ? typeof l == "function" ? l() : l : t !== void 0 ? t(l) : l, m.memoizedState = n, n = m.queue = { last: null, dispatch: null }, n = n.dispatch = sl.bind(
      null,
      B,
      n
    ), [m.memoizedState, n];
  }
  function je(n, l) {
    if (B = Pe(), m = jn(), l = l === void 0 ? null : l, m !== null) {
      var t = m.memoizedState;
      if (t !== null && l !== null) {
        var a = t[1];
        n: if (a === null) a = !1;
        else {
          for (var f = 0; f < a.length && f < l.length; f++)
            if (!U(l[f], a[f])) {
              a = !1;
              break n;
            }
          a = !0;
        }
        if (a) return t[0];
      }
    }
    return n = n(), m.memoizedState = [n, l], n;
  }
  function sl(n, l, t) {
    if (25 <= Yn) throw Error(s(301));
    if (n === B)
      if (un = !0, n = { action: t, next: null }, qn === null && (qn = /* @__PURE__ */ new Map()), t = qn.get(l), t === void 0)
        qn.set(l, n);
      else {
        for (l = t; l.next !== null; ) l = l.next;
        l.next = n;
      }
  }
  function Pl() {
    throw Error(s(440));
  }
  function zn() {
    throw Error(s(394));
  }
  function Ul() {
    throw Error(s(479));
  }
  function cr(n, l, t) {
    Pe();
    var a = Rn++, f = gn;
    if (typeof n.$$FORM_ACTION == "function") {
      var o = null, d = hn;
      f = f.formState;
      var v = n.$$IS_SIGNATURE_EQUAL;
      if (f !== null && typeof v == "function") {
        var g = f[1];
        v.call(n, f[2], f[3]) && (o = t !== void 0 ? "p" + t : "k" + qr(
          JSON.stringify([d, null, a]),
          0
        ), g === o && (be = a, l = f[0]));
      }
      var b = n.bind(null, l);
      return n = function(_) {
        b(_);
      }, typeof b.$$FORM_ACTION == "function" && (n.$$FORM_ACTION = function(_) {
        _ = b.$$FORM_ACTION(_), t !== void 0 && (t += "", _.action = t);
        var H = _.data;
        return H && (o === null && (o = t !== void 0 ? "p" + t : "k" + qr(
          JSON.stringify([
            d,
            null,
            a
          ]),
          0
        )), H.append("$ACTION_KEY", o)), _;
      }), [l, n, !1];
    }
    var k = n.bind(null, l);
    return [
      l,
      function(_) {
        k(_);
      },
      !1
    ];
  }
  function dl(n) {
    var l = cn;
    return cn += 1, Sn === null && (Sn = []), x(Sn, n, l);
  }
  function or() {
    throw Error(s(393));
  }
  var it = {
    readContext: function(n) {
      return n._currentValue;
    },
    use: function(n) {
      if (n !== null && typeof n == "object") {
        if (typeof n.then == "function") return dl(n);
        if (n.$$typeof === dn)
          throw Zn(n);
        if (n.$$typeof === fn) return n._currentValue;
      }
      throw Error(s(438, String(n)));
    },
    useContext: function(n) {
      return Pe(), n._currentValue;
    },
    useMemo: je,
    useReducer: ce,
    useRef: function(n) {
      B = Pe(), m = jn();
      var l = m.memoizedState;
      return l === null ? (n = { current: n }, m.memoizedState = n) : l;
    },
    useState: function(n) {
      return ce(hl, n);
    },
    useInsertionEffect: w,
    useLayoutEffect: w,
    useCallback: function(n, l) {
      return je(function() {
        return n;
      }, l);
    },
    useImperativeHandle: w,
    useEffect: w,
    useDebugValue: w,
    useDeferredValue: function(n, l) {
      return Pe(), l !== void 0 ? l : n;
    },
    useTransition: function() {
      return Pe(), [!1, zn];
    },
    useId: function() {
      var n = r(p.treeContext), l = Yl;
      if (l === null) throw Error(s(404));
      var t = sn++;
      return _a(l, n, t);
    },
    useSyncExternalStore: function(n, l, t) {
      if (t === void 0)
        throw Error(s(407));
      return t();
    },
    useOptimistic: function(n) {
      return Pe(), [n, Ul];
    },
    useActionState: cr,
    useFormState: cr,
    useHostTransitionStatus: function() {
      return Pe(), Aa;
    },
    useMemoCache: function(n) {
      for (var l = Array(n), t = 0; t < n; t++)
        l[t] = Ce;
      return l;
    },
    useCacheRefresh: function() {
      return or;
    },
    useEffectEvent: function() {
      return Pl;
    }
  }, Yl = null, at = {
    getCacheForType: function() {
      throw Error(s(248));
    },
    cacheSignal: function() {
      throw Error(s(248));
    }
  }, ut, vl;
  function Qn(n) {
    if (ut === void 0)
      try {
        throw Error();
      } catch (t) {
        var l = t.stack.trim().match(/\n( *(at )?)/);
        ut = l && l[1] || "", vl = -1 < t.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < t.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ut + n + vl;
  }
  var ft = !1;
  function hr(n, l) {
    if (!n || ft) return "";
    ft = !0;
    var t = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function() {
          try {
            if (l) {
              var _ = function() {
                throw Error();
              };
              if (Object.defineProperty(_.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(_, []);
                } catch (Y) {
                  var H = Y;
                }
                Reflect.construct(n, [], _);
              } else {
                try {
                  _.call();
                } catch (Y) {
                  H = Y;
                }
                _ = !1;
                try {
                  var W = Object.getOwnPropertyDescriptor(
                    n.prototype,
                    "props"
                  );
                  Object.defineProperty(n.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), _ = !0, new n();
                } finally {
                  _ && (W !== void 0 ? Object.defineProperty(n.prototype, "props", W) : delete n.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                H = Y;
              }
              (_ = n()) && typeof _.catch == "function" && _.catch(function() {
              });
            }
          } catch (Y) {
            if (Y && H && typeof Y.stack == "string")
              return [Y.stack, H.stack];
          }
          return [null, null];
        }
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var f = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      f && f.configurable && Object.defineProperty(
        a.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var o = a.DetermineComponentFrameRoot(), d = o[0], v = o[1];
      if (d && v) {
        var g = d.split(`
`), b = v.split(`
`);
        for (f = a = 0; a < g.length && !g[a].includes("DetermineComponentFrameRoot"); )
          a++;
        for (; f < b.length && !b[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (a === g.length || f === b.length)
          for (a = g.length - 1, f = b.length - 1; 1 <= a && 0 <= f && g[a] !== b[f]; )
            f--;
        for (; 1 <= a && 0 <= f; a--, f--)
          if (g[a] !== b[f]) {
            if (a !== 1 || f !== 1)
              do
                if (a--, f--, 0 > f || g[a] !== b[f]) {
                  var k = `
` + g[a].replace(" at new ", " at ");
                  return n.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", n.displayName)), k;
                }
              while (1 <= a && 0 <= f);
            break;
          }
      }
    } finally {
      ft = !1, Error.prepareStackTrace = t;
    }
    return (t = n ? n.displayName || n.name : "") ? Qn(t) : "";
  }
  function sr(n) {
    if (typeof n == "string") return Qn(n);
    if (typeof n == "function")
      return n.prototype && n.prototype.isReactComponent ? hr(n, !0) : hr(n, !1);
    if (typeof n == "object" && n !== null) {
      switch (n.$$typeof) {
        case F:
          return hr(n.render, !1);
        case $:
          return hr(n.type, !1);
        case vn:
          var l = n, t = l._payload;
          l = l._init;
          try {
            n = l(t);
          } catch {
            return Qn("Lazy");
          }
          return sr(n);
      }
      if (typeof n.name == "string") {
        n: {
          t = n.name, l = n.env;
          var a = n.debugLocation;
          if (a != null && (n = Error.prepareStackTrace, Error.prepareStackTrace = void 0, a = a.stack, Error.prepareStackTrace = n, a.startsWith(`Error: react-stack-top-frame
`) && (a = a.slice(29)), n = a.indexOf(`
`), n !== -1 && (a = a.slice(n + 1)), n = a.indexOf("react_stack_bottom_frame"), n !== -1 && (n = a.lastIndexOf(`
`, n)), n = n !== -1 ? a = a.slice(0, n) : "", a = n.lastIndexOf(`
`), n = a === -1 ? n : n.slice(a + 1), n.indexOf(t) !== -1)) {
            t = `
` + n;
            break n;
          }
          t = Qn(
            t + (l ? " [" + l + "]" : "")
          );
        }
        return t;
      }
    }
    switch (n) {
      case V:
        return Qn("SuspenseList");
      case M:
        return Qn("Suspense");
      case we:
        return Qn("ViewTransition");
    }
    return "";
  }
  function Dr(n, l) {
    return n = n == null || typeof n == "string" ? n : n.default, l = l == null || typeof l == "string" ? l : l.default, l == null ? n === "auto" ? null : n : l === "auto" ? null : l;
  }
  function Ye(n, l) {
    return (500 < l.byteSize || la(l.contentState, !1) || l.defer) && l.preamble === null;
  }
  function dr(n) {
    if (typeof n == "object" && n !== null && typeof n.environmentName == "string") {
      var l = n.environmentName;
      n = [n].slice(0), typeof n[0] == "string" ? n.splice(
        0,
        1,
        "%c%s%c " + n[0],
        "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
        " " + l + " ",
        ""
      ) : n.splice(
        0,
        0,
        "%c%s%c",
        "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
        " " + l + " ",
        ""
      ), n.unshift(console), l = Ju.apply(console.error, n), l();
    } else console.error(n);
    return null;
  }
  function vr(n, l, t, a, f, o, d, v, g, b, k) {
    var _ = /* @__PURE__ */ new Set();
    this.destination = null, this.flushScheduled = !1, this.resumableState = n, this.renderState = l, this.rootFormatContext = t, this.progressiveChunkSize = a === void 0 ? 12800 : a, this.status = 10, this.fatalError = null, this.aborted = !1, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.byteSize = 0, this.abortableTasks = _, this.pingedTasks = [], this.currentTask = null, this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.postponedState = this.trackedPostpones = null, this.onError = f === void 0 ? dr : f, this.onBrowserBailout = o === void 0 ? w : o, this.onAllReady = d === void 0 ? w : d, this.onShellReady = v === void 0 ? w : v, this.onShellError = g === void 0 ? w : g, this.onFatalError = b === void 0 ? w : b, this.renderLifetimeController = null, this.formState = k === void 0 ? null : k;
  }
  function Gl(n, l, t, a, f, o, d, v, g, b, k, _) {
    return l = new vr(
      l,
      t,
      a,
      f,
      o,
      d,
      v,
      g,
      b,
      k,
      _
    ), t = he(
      l,
      0,
      null,
      a,
      !1,
      !1
    ), t.parentFlushed = !0, n = yl(
      l,
      null,
      n,
      -1,
      null,
      t,
      null,
      null,
      l.abortableTasks,
      null,
      a,
      null,
      e,
      null,
      null
    ), bl(n), l.pingedTasks.push(n), l;
  }
  function zr(n, l, t, a, f, o, d, v, g, b, k) {
    return n = Gl(
      n,
      l,
      t,
      a,
      f,
      o,
      d,
      v,
      g,
      b,
      k,
      void 0
    ), n.trackedPostpones = {
      workingMap: /* @__PURE__ */ new Map(),
      rootNodes: [],
      rootSlots: null
    }, n;
  }
  function gl(n, l, t, a, f, o, d, v, g) {
    return t = new vr(
      l.resumableState,
      t,
      l.rootFormatContext,
      l.progressiveChunkSize,
      a,
      f,
      o,
      d,
      v,
      g,
      null
    ), t.nextSegmentId = l.nextSegmentId, typeof l.replaySlots == "number" ? (a = he(
      t,
      0,
      null,
      l.rootFormatContext,
      !1,
      !1
    ), a.parentFlushed = !0, n = yl(
      t,
      null,
      n,
      -1,
      null,
      a,
      null,
      null,
      t.abortableTasks,
      null,
      l.rootFormatContext,
      null,
      e,
      null,
      null
    ), bl(n), t.pingedTasks.push(n), t) : (n = ot(
      t,
      null,
      {
        nodes: l.replayNodes,
        slots: l.replaySlots,
        pendingTasks: 0
      },
      n,
      -1,
      null,
      null,
      t.abortableTasks,
      null,
      l.rootFormatContext,
      null,
      e,
      null,
      null
    ), bl(n), t.pingedTasks.push(n), t);
  }
  function ct(n, l, t, a, f, o, d, v, g) {
    return n = gl(
      n,
      l,
      t,
      a,
      f,
      o,
      d,
      v,
      g
    ), n.trackedPostpones = {
      workingMap: /* @__PURE__ */ new Map(),
      rootNodes: [],
      rootSlots: null
    }, n;
  }
  var Hn = null;
  function oe(n, l) {
    n.pingedTasks.push(l), n.pingedTasks.length === 1 && (n.flushScheduled = n.destination !== null, n.trackedPostpones !== null || n.status === 10 ? ql(function() {
      return yr(n);
    }) : ml(function() {
      return yr(n);
    }));
  }
  function Hr(n, l, t, a, f) {
    return t = {
      status: 0,
      rootSegmentID: -1,
      parentFlushed: !1,
      pendingTasks: 0,
      row: l,
      completedSegments: [],
      byteSize: 0,
      defer: f,
      fallbackAbortableTasks: t,
      errorDigest: null,
      contentState: pn(),
      fallbackState: pn(),
      preamble: a,
      tracked: null
    }, l !== null && (l.pendingTasks++, a = l.boundaries, a !== null && (n.allPendingTasks++, t.pendingTasks++, a.push(t)), n = l.inheritedHoistables, n !== null && Rl(t.contentState, n)), t;
  }
  function yl(n, l, t, a, f, o, d, v, g, b, k, _, H, W, Y) {
    n.allPendingTasks++, f === null ? n.pendingRootTasks++ : f.pendingTasks++, W !== null && W.pendingTasks++;
    var rn = {
      replay: null,
      node: t,
      childIndex: a,
      ping: {
        resolve: function() {
          return oe(n, rn);
        },
        reject: function(Gn) {
          n.aborted ? rn.abortSet.delete(rn) && El(rn, n, Gn) : oe(n, rn);
        }
      },
      blockedBoundary: f,
      blockedSegment: o,
      blockedPreamble: d,
      hoistableState: v,
      abortSet: g,
      keyPath: b,
      formatContext: k,
      context: _,
      treeContext: H,
      row: W,
      componentStack: Y,
      thenableState: l
    };
    return g.add(rn), rn;
  }
  function ot(n, l, t, a, f, o, d, v, g, b, k, _, H, W) {
    n.allPendingTasks++, o === null ? n.pendingRootTasks++ : o.pendingTasks++, H !== null && H.pendingTasks++, t.pendingTasks++;
    var Y = {
      replay: t,
      node: a,
      childIndex: f,
      ping: {
        resolve: function() {
          return oe(n, Y);
        },
        reject: function(rn) {
          n.aborted ? Y.abortSet.delete(Y) && El(Y, n, rn) : oe(n, Y);
        }
      },
      blockedBoundary: o,
      blockedSegment: null,
      blockedPreamble: null,
      hoistableState: d,
      abortSet: v,
      keyPath: g,
      formatContext: b,
      context: k,
      treeContext: _,
      row: H,
      componentStack: W,
      thenableState: l
    };
    return v.add(Y), Y;
  }
  function he(n, l, t, a, f, o) {
    return {
      status: 0,
      parentFlushed: !1,
      id: -1,
      index: l,
      chunks: [],
      children: [],
      preambleChildren: [],
      parentFormatContext: a,
      boundary: t,
      lastPushedText: f,
      textEmbedded: o
    };
  }
  function bl(n) {
    var l = n.node;
    if (typeof l == "object" && l !== null)
      switch (l.$$typeof) {
        case N:
          n.componentStack = { parent: n.componentStack, type: l.type };
      }
  }
  function Ml(n) {
    return n === null ? null : { parent: n.parent, type: "Suspense Fallback" };
  }
  function Ge(n) {
    var l = {};
    return n && Object.defineProperty(l, "componentStack", {
      configurable: !0,
      enumerable: !0,
      get: function() {
        try {
          var t = "", a = n;
          do
            t += sr(a.type), a = a.parent;
          while (a);
          var f = t;
        } catch (o) {
          f = `
Error generating stack: ` + o.message + `
` + o.stack;
        }
        return Object.defineProperty(l, "componentStack", {
          value: f
        }), f;
      }
    }), l;
  }
  function nn(n, l, t) {
    if (mn(l))
      return n = n.onBrowserBailout, n(l, t), "";
    if (n = n.onError, l = n(l, t), l == null || typeof l == "string")
      return l === "" ? void 0 : l;
  }
  function Te(n, l) {
    var t = n.onShellError, a = n.onFatalError;
    n.pendingRootTasks !== 0 && t(l), a(l), Zr(n), n.destination !== null ? (n.status = 13, I(n.destination, l)) : (n.status = 12, n.aborted || (n.fatalError = l));
  }
  function Fn(n, l) {
    Br(n, l.next, l.hoistables);
  }
  function Br(n, l, t) {
    for (; l !== null; ) {
      t !== null && (Rl(l.hoistables, t), l.inheritedHoistables = t);
      var a = l.boundaries;
      if (a !== null) {
        l.boundaries = null;
        for (var f = 0; f < a.length; f++) {
          var o = a[f];
          t !== null && Rl(o.contentState, t), Yr(n, o, null, null);
        }
      }
      if (l.pendingTasks--, 0 < l.pendingTasks) break;
      t = l.hoistables, l = l.next;
    }
  }
  function gr(n, l) {
    var t = l.boundaries;
    if (t !== null && l.pendingTasks === t.length) {
      for (var a = !0, f = 0; f < t.length; f++) {
        var o = t[f];
        if (o.pendingTasks !== 1 || o.parentFlushed || Ye(n, o)) {
          a = !1;
          break;
        }
      }
      a && Br(n, l, l.hoistables);
    }
  }
  function Cl(n) {
    var l = {
      pendingTasks: 1,
      boundaries: null,
      hoistables: pn(),
      inheritedHoistables: null,
      together: !1,
      next: null
    };
    return n !== null && 0 < n.pendingTasks && (l.pendingTasks++, l.boundaries = [], n.next = l), l;
  }
  function ei(n, l, t, a, f) {
    var o = l.keyPath, d = l.treeContext, v = l.row;
    l.keyPath = t, t = a.length;
    var g = null;
    if (l.replay !== null) {
      var b = l.replay.slots;
      if (b !== null && typeof b == "object")
        for (var k = 0; k < t; k++) {
          var _ = f !== "backwards" && f !== "unstable_legacy-backwards" ? k : t - 1 - k, H = a[_];
          l.row = g = Cl(
            g
          ), l.treeContext = i(d, t, _);
          var W = b[_];
          typeof W == "number" ? (Al(n, l, W, H, _), delete b[_]) : Ln(n, l, H, _), --g.pendingTasks === 0 && Fn(n, g);
        }
      else
        for (b = 0; b < t; b++)
          k = f !== "backwards" && f !== "unstable_legacy-backwards" ? b : t - 1 - b, _ = a[k], l.row = g = Cl(g), l.treeContext = i(d, t, k), Ln(n, l, _, k), --g.pendingTasks === 0 && Fn(n, g);
    } else if (f !== "backwards" && f !== "unstable_legacy-backwards")
      for (f = 0; f < t; f++)
        b = a[f], l.row = g = Cl(g), l.treeContext = i(
          d,
          t,
          f
        ), Ln(n, l, b, f), --g.pendingTasks === 0 && Fn(n, g);
    else {
      for (b = l.blockedSegment, k = b.children.length, _ = b.chunks.length, H = 0; H < t; H++) {
        W = f === "unstable_legacy-backwards" ? t - 1 - H : H;
        var Y = a[W];
        l.row = g = Cl(
          g
        ), l.treeContext = i(
          d,
          t,
          W
        );
        var rn = he(
          n,
          _,
          null,
          l.formatContext,
          W === 0 ? b.lastPushedText : !0,
          !0
        );
        b.children.splice(k, 0, rn), l.blockedSegment = rn;
        try {
          Ln(n, l, Y, W), rn.lastPushedText && rn.textEmbedded && rn.chunks.push(tl), rn.status = 1, _e(n, l.blockedBoundary, rn), --g.pendingTasks === 0 && Fn(n, g);
        } catch (Gn) {
          throw rn.status = n.aborted ? 3 : 4, Gn;
        }
      }
      l.blockedSegment = b, b.lastPushedText = !1;
    }
    v !== null && g !== null && 0 < g.pendingTasks && (v.pendingTasks++, g.next = v), l.treeContext = d, l.row = v, l.keyPath = o;
  }
  function li(n, l, t, a, f, o) {
    var d = l.thenableState;
    for (l.thenableState = null, B = {}, p = l, gn = n, hn = t, Rn = sn = 0, be = -1, cn = 0, Sn = d, n = a(f, o); un; )
      un = !1, Rn = sn = 0, be = -1, cn = 0, Yn += 1, m = null, n = a(f, o);
    return $n(), n;
  }
  function al(n, l, t, a, f, o, d) {
    var v = !1;
    if (o !== 0 && n.formState !== null) {
      var g = l.blockedSegment;
      if (g !== null) {
        v = !0, g = g.chunks;
        for (var b = 0; b < o; b++)
          b === d ? g.push(Tf) : g.push(Wt);
      }
    }
    o = l.keyPath, l.keyPath = t, f ? (t = l.treeContext, l.treeContext = i(t, 1, 0), Ln(n, l, a, -1), l.treeContext = t) : v ? Ln(n, l, a, -1) : ne(n, l, a, -1), l.keyPath = o;
  }
  function Xl(n, l, t, a, f, o) {
    if (typeof a == "function")
      if (a.prototype && a.prototype.isReactComponent) {
        var d = f;
        if ("ref" in f) {
          d = {};
          for (var v in f)
            v !== "ref" && (d[v] = f[v]);
        }
        var g = a.defaultProps;
        if (g) {
          d === f && (d = X({}, d, f));
          for (var b in g)
            d[b] === void 0 && (d[b] = g[b]);
        }
        var k = d, _ = $t, H = a.contextType;
        typeof H == "object" && H !== null && (_ = H._currentValue);
        var W = new a(
          k,
          _
        ), Y = W.state !== void 0 ? W.state : null;
        W.updater = ma, W.props = k, W.state = Y;
        var rn = { queue: [], replace: !1 };
        W._reactInternals = rn;
        var Gn = a.contextType;
        W.context = typeof Gn == "object" && Gn !== null ? Gn._currentValue : $t;
        var Xe = a.getDerivedStateFromProps;
        if (typeof Xe == "function") {
          var Bn = Xe(
            k,
            Y
          ), Xn = Bn == null ? Y : X({}, Y, Bn);
          W.state = Xn;
        }
        if (typeof a.getDerivedStateFromProps != "function" && typeof W.getSnapshotBeforeUpdate != "function" && (typeof W.UNSAFE_componentWillMount == "function" || typeof W.componentWillMount == "function")) {
          var Me = W.state;
          if (typeof W.componentWillMount == "function" && W.componentWillMount(), typeof W.UNSAFE_componentWillMount == "function" && W.UNSAFE_componentWillMount(), Me !== W.state && ma.enqueueReplaceState(
            W,
            W.state,
            null
          ), rn.queue !== null && 0 < rn.queue.length) {
            var $e = rn.queue, J = rn.replace;
            if (rn.queue = null, rn.replace = !1, J && $e.length === 1)
              W.state = $e[0];
            else {
              for (var Dn = J ? $e[0] : W.state, nl = !0, Fe = J ? 1 : 0; Fe < $e.length; Fe++) {
                var Vn = $e[Fe], se = typeof Vn == "function" ? Vn.call(
                  W,
                  Dn,
                  k,
                  void 0
                ) : Vn;
                se != null && (nl ? (nl = !1, Dn = X({}, Dn, se)) : X(Dn, se));
              }
              W.state = Dn;
            }
          } else rn.queue = null;
        }
        var Ol = W.render();
        if (n.aborted) throw null;
        var fe = l.keyPath;
        l.keyPath = t, ne(n, l, Ol, -1), l.keyPath = fe;
      } else {
        var el = li(n, l, t, a, f, void 0);
        if (n.aborted) throw null;
        al(
          n,
          l,
          t,
          el,
          sn !== 0,
          Rn,
          be
        );
      }
    else if (typeof a == "string") {
      var Wn = l.blockedSegment;
      if (Wn === null) {
        var Ql = f.children, ul = l.formatContext, Jn = l.keyPath;
        l.formatContext = bu(ul, a, f), l.keyPath = t, Ln(n, l, Ql, -1), l.formatContext = ul, l.keyPath = Jn;
      } else {
        var Rr = Ni(
          Wn.chunks,
          a,
          f,
          n.resumableState,
          n.renderState,
          l.blockedPreamble,
          l.hoistableState,
          l.formatContext,
          Wn.lastPushedText
        );
        Wn.lastPushedText = !1;
        var Vl = l.formatContext, Il = l.keyPath;
        if (l.keyPath = t, (l.formatContext = bu(
          Vl,
          a,
          f
        )).insertionMode === 3) {
          var Ze = he(
            n,
            0,
            null,
            l.formatContext,
            !1,
            !1
          );
          Wn.preambleChildren.push(Ze), l.blockedSegment = Ze;
          try {
            Ln(n, l, Rr, -1), Ze.lastPushedText && Ze.textEmbedded && Ze.chunks.push(tl), Ze.status = 1, _e(n, l.blockedBoundary, Ze);
          } finally {
            l.blockedSegment = Wn;
          }
        } else Ln(n, l, Rr, -1);
        l.formatContext = Vl, l.keyPath = Il;
        n: {
          var ja = Wn.chunks, fa = n.resumableState;
          switch (a) {
            case "title":
            case "style":
            case "script":
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "img":
            case "input":
            case "keygen":
            case "link":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr":
              break n;
            case "body":
              if (1 >= Vl.insertionMode) {
                fa.hasBody = !0;
                break n;
              }
              break;
            case "html":
              if (Vl.insertionMode === 0) {
                fa.hasHtml = !0;
                break n;
              }
              break;
            case "head":
              if (1 >= Vl.insertionMode) break n;
          }
          ja.push(lr(a));
        }
        Wn.lastPushedText = !1;
      }
    } else {
      switch (a) {
        case Nl:
        case K:
        case tn:
        case Z:
          var ui = l.keyPath;
          l.keyPath = t, ne(n, l, f.children, -1), l.keyPath = ui;
          return;
        case rl:
          var Oe = l.blockedSegment;
          if (Oe === null) {
            if (f.mode !== "hidden") {
              var $u = l.keyPath;
              l.keyPath = t, Ln(n, l, f.children, -1), l.keyPath = $u;
            }
          } else if (f.mode !== "hidden") {
            Oe.chunks.push(Su), Oe.lastPushedText = !1;
            var fi = l.keyPath;
            l.keyPath = t, Ln(n, l, f.children, -1), l.keyPath = fi, Oe.chunks.push(tr), Oe.lastPushedText = !1;
          }
          return;
        case V:
          n: {
            var Pr = f.children, Et = f.revealOrder;
            if (Et !== "independent" && Et !== "together") {
              if (en(Pr)) {
                ei(
                  n,
                  l,
                  t,
                  Pr,
                  Et
                );
                break n;
              }
              var $a = Pn(Pr);
              if ($a) {
                var ca = $a.call(Pr);
                if (ca) {
                  var oa = ca.next();
                  if (!oa.done) {
                    do
                      oa = ca.next();
                    while (!oa.done);
                    ei(
                      n,
                      l,
                      t,
                      Pr,
                      Et
                    );
                  }
                  break n;
                }
              }
            }
            if (Et === "together") {
              var nf = l.keyPath, Mr = l.row, Qe = l.row = Cl(null);
              Qe.boundaries = [], Qe.together = !0, l.keyPath = t, ne(n, l, Pr, -1), --Qe.pendingTasks === 0 && Fn(n, Qe), l.keyPath = nf, l.row = Mr, Mr !== null && 0 < Qe.pendingTasks && (Mr.pendingTasks++, Qe.next = Mr);
            } else {
              var ef = l.keyPath;
              l.keyPath = t, ne(n, l, Pr, -1), l.keyPath = ef;
            }
          }
          return;
        case we:
          var Jl = l.formatContext, ci = l.keyPath, lf = n.resumableState;
          if (f.name != null && f.name !== "auto")
            var Cr = f.name;
          else {
            var oi = r(l.treeContext);
            Cr = _a(
              lf,
              oi,
              0
            );
          }
          var hi = Cr, Vr = n.resumableState, Ar = Dr(f.default, f.update), fl = Dr(f.default, f.enter), wt = Dr(f.default, f.exit), Jr = Dr(f.default, f.share), Ll = f.name;
          if (Ar == null && (Ar = "auto"), fl == null && (fl = "auto"), wt == null && (wt = "auto"), Ll == null) {
            var ha = Jl.viewTransition;
            ha !== null ? (Ll = ha.name, Jr = ha.share) : (Ll = "auto", Jr = "none");
          } else
            Jr == null && (Jr = "auto"), Jl.tagScope & 4 && (Vr.instructions |= 128);
          Jl.tagScope & 8 ? Vr.instructions |= 128 : wt = "none", Jl.tagScope & 16 ? Vr.instructions |= 128 : fl = "none";
          var sa = {
            update: Ar,
            enter: fl,
            exit: wt,
            share: Jr,
            parentEnter: "none",
            parentExit: "none",
            name: Ll,
            autoName: hi,
            nameIdx: 0
          }, xt = Jl.tagScope & -25;
          xt = Ar !== "none" ? xt | 32 : xt & -33, fl !== "none" && (xt |= 64);
          var si = ae(
            Jl.insertionMode,
            Jl.selectedValue,
            xt,
            sa
          );
          if (l.formatContext = si, l.keyPath = t, f.name != null && f.name !== "auto")
            ne(n, l, f.children, -1);
          else {
            var nu = l.treeContext;
            l.treeContext = i(nu, 1, 0), Ln(n, l, f.children, -1), l.treeContext = nu;
          }
          l.formatContext = Jl, l.keyPath = ci;
          return;
        case Ne:
          throw Error(s(343));
        case M:
          n: if (l.replay !== null) {
            var di = l.keyPath, Rt = l.formatContext, rf = l.row;
            l.keyPath = t, l.formatContext = Nt(
              n.resumableState,
              Rt
            ), l.row = null;
            var tf = f.children;
            try {
              Ln(n, l, tf, -1);
            } finally {
              l.keyPath = di, l.formatContext = Rt, l.row = rf;
            }
          } else {
            var af = l.keyPath, da = l.formatContext, Kl = l.row, eu = l.blockedBoundary, uf = l.blockedPreamble, Df = l.hoistableState, cl = l.blockedSegment, vi = f.fallback, Pt = f.children, Kr = /* @__PURE__ */ new Set(), On = Hr(
              n,
              l.row,
              Kr,
              2 > l.formatContext.insertionMode ? {
                content: Lt(),
                fallback: Lt()
              } : null,
              !1
            ), ol = he(
              n,
              cl.chunks.length,
              On,
              l.formatContext,
              !1,
              !1
            );
            cl.children.push(ol), cl.lastPushedText = !1;
            var ll = he(
              n,
              0,
              null,
              l.formatContext,
              !1,
              !1
            );
            ll.parentFlushed = !0;
            var va = n.trackedPostpones;
            if (va !== null) {
              var ff = l.componentStack, Mt = [t[0], "Suspense Fallback", t[2]];
              if (va !== null) {
                var lu = [
                  Mt[1],
                  Mt[2],
                  [],
                  null
                ];
                va.workingMap.set(
                  Mt,
                  lu
                ), On.tracked = {
                  contentKeyPath: t,
                  fallbackNode: lu
                };
              }
              l.blockedSegment = ol, l.blockedPreamble = On.preamble === null ? null : On.preamble.fallback, l.keyPath = Mt, l.formatContext = Dl(
                n.resumableState,
                da
              ), l.componentStack = Ml(
                ff
              );
              try {
                Ln(n, l, vi, -1), ol.lastPushedText && ol.textEmbedded && ol.chunks.push(tl), ol.status = 1, _e(n, eu, ol);
              } catch (xa) {
                throw ol.status = n.aborted ? 3 : 4, xa;
              } finally {
                l.blockedSegment = cl, l.blockedPreamble = uf, l.keyPath = af, l.formatContext = da;
              }
              var gi = yl(
                n,
                null,
                Pt,
                -1,
                On,
                ll,
                On.preamble === null ? null : On.preamble.content,
                On.contentState,
                l.abortSet,
                t,
                Nt(
                  n.resumableState,
                  l.formatContext
                ),
                l.context,
                l.treeContext,
                null,
                ff
              );
              bl(gi), n.pingedTasks.push(gi);
            } else {
              l.blockedBoundary = On, l.blockedPreamble = On.preamble === null ? null : On.preamble.content, l.hoistableState = On.contentState, l.blockedSegment = ll, l.keyPath = t, l.formatContext = Nt(
                n.resumableState,
                da
              ), l.row = null;
              try {
                if (Ln(n, l, Pt, -1), ll.lastPushedText && ll.textEmbedded && ll.chunks.push(tl), ll.status = 1, _e(n, On, ll), _l(On, ll), On.pendingTasks === 0 && On.status === 0) {
                  if (On.status = 1, !Ye(n, On)) {
                    Kl !== null && --Kl.pendingTasks === 0 && Fn(n, Kl), n.pendingRootTasks === 0 && l.blockedPreamble && br(n);
                    break n;
                  }
                } else
                  Kl !== null && Kl.together && gr(n, Kl);
              } catch (xa) {
                if (On.status = 4, n.aborted) {
                  ll.status = 3;
                  var yi = n.fatalError;
                } else ll.status = 4, yi = xa;
                var cf = Ge(l.componentStack), ga = nn(n, yi, cf);
                On.errorDigest = ga, ti(n, On);
              } finally {
                l.blockedBoundary = eu, l.blockedPreamble = uf, l.hoistableState = Df, l.blockedSegment = cl, l.keyPath = af, l.formatContext = da, l.row = Kl;
              }
              var ya = yl(
                n,
                null,
                vi,
                -1,
                eu,
                ol,
                On.preamble === null ? null : On.preamble.fallback,
                On.fallbackState,
                Kr,
                [t[0], "Suspense Fallback", t[2]],
                Dl(
                  n.resumableState,
                  l.formatContext
                ),
                l.context,
                l.treeContext,
                l.row,
                Ml(
                  l.componentStack
                )
              );
              bl(ya), n.pingedTasks.push(ya);
            }
          }
          return;
      }
      if (typeof a == "object" && a !== null)
        switch (a.$$typeof) {
          case F:
            if ("ref" in f) {
              var ba = {};
              for (var Ta in f)
                Ta !== "ref" && (ba[Ta] = f[Ta]);
            } else ba = f;
            var zf = li(
              n,
              l,
              t,
              a.render,
              ba,
              o
            );
            al(
              n,
              l,
              t,
              zf,
              sn !== 0,
              Rn,
              be
            );
            return;
          case $:
            Xl(n, l, t, a.type, f, o);
            return;
          case fn:
            var Ea = f.children, Ct = l.keyPath, of = f.value, At = a._currentValue;
            a._currentValue = of;
            var wa = qe, kt = {
              parent: wa,
              depth: wa === null ? 0 : wa.depth + 1,
              context: a,
              parentValue: At,
              value: of
            };
            qe = kt, l.context = kt, l.keyPath = t, ne(n, l, Ea, -1);
            var pr = qe;
            if (pr === null) throw Error(s(403));
            pr.context._currentValue = pr.parentValue;
            var bi = qe = pr.parent;
            l.context = bi, l.keyPath = Ct;
            return;
          case an:
            var hf = f.children, mr = hf(a._context._currentValue), sf = l.keyPath;
            l.keyPath = t, ne(n, l, mr, -1), l.keyPath = sf;
            return;
          case vn:
            var df = a._init, St = df(a._payload);
            if (n.aborted) throw null;
            Xl(n, l, t, St, f, o);
            return;
        }
      throw Error(
        s(130, a == null ? a : typeof a, "")
      );
    }
  }
  function Al(n, l, t, a, f) {
    var o = l.replay, d = l.blockedBoundary, v = he(
      n,
      0,
      null,
      l.formatContext,
      !1,
      !1
    );
    v.id = t, v.parentFlushed = !0;
    try {
      l.replay = null, l.blockedSegment = v, Ln(n, l, a, f), v.status = 1, _e(n, d, v), d === null ? n.completedRootSegment = v : (_l(d, v), d.parentFlushed && n.partialBoundaries.push(d));
    } finally {
      l.replay = o, l.blockedSegment = null;
    }
  }
  function ne(n, l, t, a) {
    l.replay !== null && typeof l.replay.slots == "number" ? Al(n, l, l.replay.slots, t, a) : (l.node = t, l.childIndex = a, t = l.componentStack, bl(l), kl(n, l), l.componentStack = t);
  }
  function kl(n, l) {
    var t = l.node, a = l.childIndex;
    if (t !== null) {
      if (typeof t == "object") {
        switch (t.$$typeof) {
          case N:
            var f = t.type, o = t.key, d = t.props;
            t = d.ref;
            var v = t !== void 0 ? t : null, g = Nr(f), b = o == null || o === Sr ? a === -1 ? 0 : a : o;
            if (o = [l.keyPath, g, b], l.replay !== null)
              n: {
                var k = l.replay;
                for (a = k.nodes, t = 0; t < a.length; t++) {
                  var _ = a[t];
                  if (b === _[1]) {
                    if (_.length === 4) {
                      if (g !== null && g !== _[0])
                        throw Error(
                          s(490, _[0], g)
                        );
                      var H = _[2], W = _[3], Y = l.node;
                      l.replay = {
                        nodes: H,
                        slots: W,
                        pendingTasks: 1
                      };
                      try {
                        if (Xl(n, l, o, f, d, v), l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length)
                          throw Error(s(488));
                        l.replay.pendingTasks--;
                      } catch (Dn) {
                        if (typeof Dn == "object" && Dn !== null && (Dn === E || typeof Dn.then == "function" || Dn.message === "Maximum call stack size exceeded"))
                          throw l.node === Y ? l.replay = k : a.splice(t, 1), Dn;
                        l.replay.pendingTasks--, o = Ge(l.componentStack), Y = n, d = l.blockedBoundary, n = n.aborted ? n.fatalError : Dn, o = nn(Y, n, o), Tl(
                          Y,
                          d,
                          H,
                          W,
                          n,
                          o
                        );
                      }
                      l.replay = k;
                    } else {
                      if (f !== M)
                        throw Error(
                          s(
                            490,
                            "Suspense",
                            Nr(f) || "Unknown"
                          )
                        );
                      e: {
                        k = _[5], f = _[2], v = _[3], g = _[4] === null ? [] : _[4][2], _ = _[4] === null ? null : _[4][3], b = l.keyPath;
                        var rn = l.formatContext, Gn = l.row, Xe = l.replay, Bn = l.blockedBoundary, Xn = l.hoistableState, Me = d.children;
                        d = d.fallback;
                        var $e = /* @__PURE__ */ new Set(), J = Hr(
                          n,
                          l.row,
                          $e,
                          2 > l.formatContext.insertionMode ? {
                            content: Lt(),
                            fallback: Lt()
                          } : null,
                          !1
                        );
                        J.parentFlushed = !0, J.rootSegmentID = k, l.blockedBoundary = J, l.hoistableState = J.contentState, l.keyPath = o, l.formatContext = Nt(
                          n.resumableState,
                          rn
                        ), l.row = null, l.replay = {
                          nodes: f,
                          slots: v,
                          pendingTasks: 1
                        };
                        try {
                          if (Ln(n, l, Me, -1), l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length)
                            throw Error(s(488));
                          if (l.replay.pendingTasks--, J.pendingTasks === 0 && J.status === 0) {
                            J.status = 1, n.completedBoundaries.push(J);
                            break e;
                          }
                        } catch (Dn) {
                          J.status = 4, H = n.aborted ? n.fatalError : Dn, W = Ge(l.componentStack), Y = nn(
                            n,
                            H,
                            W
                          ), J.errorDigest = Y, l.replay.pendingTasks--, n.clientRenderedBoundaries.push(
                            J
                          );
                        } finally {
                          l.blockedBoundary = Bn, l.hoistableState = Xn, l.replay = Xe, l.keyPath = b, l.formatContext = rn, l.row = Gn;
                        }
                        H = ot(
                          n,
                          null,
                          { nodes: g, slots: _, pendingTasks: 0 },
                          d,
                          -1,
                          Bn,
                          J.fallbackState,
                          $e,
                          [o[0], "Suspense Fallback", o[2]],
                          Dl(
                            n.resumableState,
                            l.formatContext
                          ),
                          l.context,
                          l.treeContext,
                          l.row,
                          Ml(
                            l.componentStack
                          )
                        ), bl(H), n.pingedTasks.push(H);
                      }
                    }
                    a.splice(t, 1);
                    break n;
                  }
                }
              }
            else Xl(n, l, o, f, d, v);
            return;
          case S:
            throw Error(s(257));
          case vn:
            if (H = t._init, t = H(t._payload), n.aborted) throw null;
            ne(n, l, t, a);
            return;
        }
        if (en(t)) {
          Sl(n, l, t, a);
          return;
        }
        if ((H = Pn(t)) && (H = H.call(t))) {
          if (t = H.next(), !t.done) {
            W = [];
            do
              W.push(t.value), t = H.next();
            while (!t.done);
            Sl(n, l, W, a);
          }
          return;
        }
        if (typeof t.then == "function")
          return l.thenableState = null, ne(n, l, dl(t), a);
        if (t.$$typeof === fn)
          return ne(
            n,
            l,
            t._currentValue,
            a
          );
        throw a = Object.prototype.toString.call(t), Error(
          s(
            31,
            a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a
          )
        );
      }
      typeof t == "string" ? (a = l.blockedSegment, a !== null && (a.lastPushedText = Tu(
        a.chunks,
        t,
        n.renderState,
        a.lastPushedText
      ))) : (typeof t == "number" || typeof t == "bigint") && (a = l.blockedSegment, a !== null && (a.lastPushedText = Tu(
        a.chunks,
        "" + t,
        n.renderState,
        a.lastPushedText
      )));
    }
  }
  function Sl(n, l, t, a) {
    var f = l.keyPath;
    if (a !== -1 && (l.keyPath = [l.keyPath, "Fragment", a], l.replay !== null)) {
      for (var o = l.replay, d = o.nodes, v = 0; v < d.length; v++) {
        var g = d[v];
        if (g[1] === a) {
          a = g[2], g = g[3], l.replay = { nodes: a, slots: g, pendingTasks: 1 };
          try {
            if (Sl(n, l, t, -1), l.replay.pendingTasks === 1 && 0 < l.replay.nodes.length)
              throw Error(s(488));
            l.replay.pendingTasks--;
          } catch (_) {
            if (typeof _ == "object" && _ !== null && (_ === E || typeof _.then == "function"))
              throw _;
            l.replay.pendingTasks--;
            var b = Ge(l.componentStack);
            t = n;
            var k = l.blockedBoundary;
            n = n.aborted ? n.fatalError : _, b = nn(t, n, b), Tl(
              t,
              k,
              a,
              g,
              n,
              b
            );
          }
          l.replay = o, d.splice(v, 1);
          break;
        }
      }
      l.keyPath = f;
      return;
    }
    if (o = l.treeContext, d = t.length, l.replay !== null && (v = l.replay.slots, v !== null && typeof v == "object")) {
      for (a = 0; a < d; a++)
        g = t[a], l.treeContext = i(o, d, a), k = v[a], typeof k == "number" ? (Al(n, l, k, g, a), delete v[a]) : Ln(n, l, g, a);
      l.treeContext = o, l.keyPath = f;
      return;
    }
    for (v = 0; v < d; v++)
      a = t[v], l.treeContext = i(o, d, v), Ln(n, l, a, v);
    l.treeContext = o, l.keyPath = f;
  }
  function ht(n, l, t) {
    t.status = 5, t.rootSegmentID = n.nextSegmentId++;
    var a = t.tracked;
    if (a === null || (n = a.contentKeyPath, n === null)) throw Error(s(486));
    a = a.fallbackNode;
    var f = [], o = l.workingMap.get(n);
    return o === void 0 ? (t = [
      n[1],
      n[2],
      f,
      null,
      a,
      t.rootSegmentID
    ], l.workingMap.set(n, t), Qr(t, n[0], l), t) : (o[4] = a, o[5] = t.rootSegmentID, o);
  }
  function ri(n, l, t, a) {
    a.status = 5;
    var f = t.keyPath, o = t.blockedBoundary;
    if (o === null)
      a.id = n.nextSegmentId++, l.rootSlots = a.id, n.completedRootSegment !== null && (n.completedRootSegment.status = 5);
    else {
      if (o !== null && o.status === 0) {
        var d = ht(
          n,
          l,
          o
        );
        if (o.tracked !== null && o.tracked.contentKeyPath === f && t.childIndex === -1) {
          a.id === -1 && (a.id = a.parentFlushed ? o.rootSegmentID : n.nextSegmentId++), d[3] = a.id;
          return;
        }
      }
      if (a.id === -1 && (a.id = a.parentFlushed && o !== null ? o.rootSegmentID : n.nextSegmentId++), t.childIndex === -1)
        f === null ? l.rootSlots = a.id : (t = l.workingMap.get(f), t === void 0 ? (t = [f[1], f[2], [], a.id], Qr(t, f[0], l)) : t[3] = a.id);
      else {
        if (f === null) {
          if (n = l.rootSlots, n === null)
            n = l.rootSlots = {};
          else if (typeof n == "number")
            throw Error(s(491));
        } else if (o = l.workingMap, d = o.get(f), d === void 0)
          n = {}, d = [f[1], f[2], [], n], o.set(f, d), Qr(d, f[0], l);
        else if (n = d[3], n === null)
          n = d[3] = {};
        else if (typeof n == "number")
          throw Error(s(491));
        n[t.childIndex] = a.id;
      }
    }
  }
  function ti(n, l) {
    n = n.trackedPostpones, n !== null && (l = l.tracked, l !== null && (l = l.contentKeyPath, l !== null && (n = n.workingMap.get(l), n !== void 0 && (n.length = 4, n[2] = [], n[3] = null))));
  }
  function Wr(n, l, t) {
    return ot(
      n,
      t,
      l.replay,
      l.node,
      l.childIndex,
      l.blockedBoundary,
      l.hoistableState,
      l.abortSet,
      l.keyPath,
      l.formatContext,
      l.context,
      l.treeContext,
      l.row,
      l.componentStack
    );
  }
  function ii(n, l, t) {
    var a = l.blockedSegment, f = he(
      n,
      a.chunks.length,
      null,
      l.formatContext,
      a.lastPushedText,
      !0
    );
    return a.children.push(f), a.lastPushedText = !1, yl(
      n,
      t,
      l.node,
      l.childIndex,
      l.blockedBoundary,
      f,
      l.blockedPreamble,
      l.hoistableState,
      l.abortSet,
      l.keyPath,
      l.formatContext,
      l.context,
      l.treeContext,
      l.row,
      l.componentStack
    );
  }
  function Ln(n, l, t, a) {
    var f = l.formatContext, o = l.context, d = l.keyPath, v = l.treeContext, g = l.componentStack, b = l.blockedSegment;
    if (b === null) {
      b = l.replay;
      try {
        return ne(n, l, t, a);
      } catch (H) {
        if ($n(), t = H === E ? L() : H, !n.aborted && typeof t == "object" && t !== null) {
          if (typeof t.then == "function") {
            a = H === E ? Ue() : null, n = Wr(n, l, a).ping, t.then(n.resolve, n.reject), l.formatContext = f, l.context = o, l.keyPath = d, l.treeContext = v, l.componentStack = g, l.replay = b, fr(o);
            return;
          }
          if (t.message === "Maximum call stack size exceeded") {
            t = H === E ? Ue() : null, t = Wr(n, l, t), n.pingedTasks.push(t), l.formatContext = f, l.context = o, l.keyPath = d, l.treeContext = v, l.componentStack = g, l.replay = b, fr(o);
            return;
          }
        }
      }
    } else {
      var k = b.children.length, _ = b.chunks.length;
      try {
        return ne(n, l, t, a);
      } catch (H) {
        if ($n(), b.children.length = k, b.chunks.length = _, t = H === E ? L() : H, !n.aborted && typeof t == "object" && t !== null) {
          if (typeof t.then == "function") {
            b = t, t = H === E ? Ue() : null, n = ii(n, l, t).ping, b.then(n.resolve, n.reject), l.formatContext = f, l.context = o, l.keyPath = d, l.treeContext = v, l.componentStack = g, fr(o);
            return;
          }
          if (t.message === "Maximum call stack size exceeded") {
            b = H === E ? Ue() : null, b = ii(n, l, b), n.pingedTasks.push(b), l.formatContext = f, l.context = o, l.keyPath = d, l.treeContext = v, l.componentStack = g, fr(o);
            return;
          }
        }
      }
    }
    throw l.formatContext = f, l.context = o, l.keyPath = d, l.treeContext = v, fr(o), t;
  }
  function Ur(n) {
    var l = n.blockedBoundary, t = n.blockedSegment;
    t !== null && (t.status = 3, Yr(this, l, n.row, t));
  }
  function Tl(n, l, t, a, f, o) {
    for (var d = 0; d < t.length; d++) {
      var v = t[d];
      if (v.length === 4)
        Tl(
          n,
          l,
          v[2],
          v[3],
          f,
          o
        );
      else {
        v = v[5];
        var g = n, b = o, k = Hr(
          g,
          null,
          /* @__PURE__ */ new Set(),
          null,
          !1
        );
        k.parentFlushed = !0, k.rootSegmentID = v, k.status = 4, k.errorDigest = b, k.parentFlushed && g.clientRenderedBoundaries.push(k);
      }
    }
    if (t.length = 0, a !== null) {
      if (l === null) throw Error(s(487));
      if (l.status !== 4 && (l.status = 4, l.errorDigest = o, l.parentFlushed && n.clientRenderedBoundaries.push(l)), typeof a == "object") for (var _ in a) delete a[_];
    }
  }
  function Zl(n, l) {
    if (n !== l.currentTask) {
      var t = n.blockedBoundary;
      n = n.blockedSegment, n !== null && (n.status = 3), t !== null && t.fallbackAbortableTasks.forEach(function(a) {
        return Zl(a, l);
      });
    }
  }
  function El(n, l, t) {
    if (n !== l.currentTask) {
      var a = n.blockedBoundary, f = n.blockedSegment;
      if (f === null || f.status === 3) {
        var o = Ge(n.componentStack), d = mn(t);
        if (a === null) {
          if (a = n.replay, a === null) {
            d || l.trackedPostpones === null || f === null ? d ? (n = _n(t), nn(l, n, o), l.status !== 12 && l.status !== 13 && Te(l, n)) : (nn(l, t, o), l.status !== 12 && l.status !== 13 && Te(l, t)) : (a = l.trackedPostpones, nn(l, t, o), ri(l, a, n, f), Yr(l, null, n.row, f));
            return;
          }
          l.status !== 12 && l.status !== 13 && (a.pendingTasks--, a.pendingTasks === 0 && 0 < a.nodes.length && (o = nn(l, t, o), Tl(
            l,
            null,
            a.nodes,
            a.slots,
            t,
            o
          )), l.pendingRootTasks--, l.pendingRootTasks === 0 && dt(l));
        } else {
          var v = l.trackedPostpones;
          if (a.status !== 4) {
            if (!d && v !== null && f !== null)
              return nn(l, t, o), ri(l, v, n, f), a.fallbackAbortableTasks.forEach(function(g) {
                return El(g, l, t);
              }), a.fallbackAbortableTasks.clear(), Yr(l, a, n.row, f);
            a.status = 4, o = nn(l, t, o), a.errorDigest = o, ti(l, a), a.parentFlushed && l.clientRenderedBoundaries.push(a);
          }
          a.pendingTasks--, o = a.row, o !== null && --o.pendingTasks === 0 && Fn(l, o), a.fallbackAbortableTasks.forEach(function(g) {
            return El(g, l, t);
          }), a.fallbackAbortableTasks.clear();
        }
        n = n.row, n !== null && --n.pendingTasks === 0 && Fn(l, n), l.allPendingTasks--, l.allPendingTasks === 0 && vt(l);
      }
    }
  }
  function st(n, l) {
    try {
      var t = n.renderState, a = t.onHeaders;
      if (a) {
        var f = t.headers;
        if (f) {
          t.headers = null;
          var o = f.preconnects;
          if (f.fontPreloads && (o && (o += ", "), o += f.fontPreloads), f.highImagePreloads && (o && (o += ", "), o += f.highImagePreloads), !l) {
            var d = t.styles.values(), v = d.next();
            n: for (; 0 < f.remainingCapacity && !v.done; v = d.next())
              for (var g = v.value.sheets.values(), b = g.next(); 0 < f.remainingCapacity && !b.done; b = g.next()) {
                var k = b.value, _ = k.props, H = _.href, W = k.props, Y = xl(W.href, "style", {
                  crossOrigin: W.crossOrigin,
                  integrity: W.integrity,
                  nonce: W.nonce,
                  type: W.type,
                  fetchPriority: W.fetchPriority,
                  referrerPolicy: W.referrerPolicy,
                  media: W.media
                });
                if (0 <= (f.remainingCapacity -= Y.length + 2))
                  t.resets.style[H] = Je, o && (o += ", "), o += Y, t.resets.style[H] = typeof _.crossOrigin == "string" || typeof _.integrity == "string" ? [_.crossOrigin, _.integrity] : Je;
                else break n;
              }
          }
          a(o ? { Link: o } : {});
        }
      }
    } catch (rn) {
      nn(n, rn, {});
    }
  }
  function dt(n) {
    n.trackedPostpones === null && st(n, !0), n.trackedPostpones === null && br(n), n = n.onShellReady, n();
  }
  function vt(n) {
    st(
      n,
      n.trackedPostpones === null ? !0 : n.completedRootSegment === null || n.completedRootSegment.status !== 5
    ), br(n), n = n.onAllReady, n();
  }
  function _l(n, l) {
    if (l.chunks.length === 0 && l.children.length === 1 && l.children[0].boundary === null && l.children[0].id === -1) {
      var t = l.children[0];
      t.id = l.id, t.parentFlushed = !0, t.status !== 1 && t.status !== 3 && t.status !== 4 || _l(n, t);
    } else n.completedSegments.push(l);
  }
  function _e(n, l, t) {
    if (T !== null) {
      t = t.chunks;
      for (var a = 0, f = 0; f < t.length; f++)
        a += t[f].byteLength;
      l === null ? n.byteSize += a : l.byteSize += a;
    }
  }
  function Yr(n, l, t, a) {
    if (t !== null && (--t.pendingTasks === 0 ? Fn(n, t) : t.together && gr(n, t)), n.allPendingTasks--, l === null) {
      if (a !== null && a.parentFlushed) {
        if (n.completedRootSegment !== null)
          throw Error(s(389));
        n.completedRootSegment = a;
      }
      n.pendingRootTasks--, n.pendingRootTasks === 0 && dt(n);
    } else if (l.pendingTasks--, l.status !== 4)
      if (l.pendingTasks === 0) {
        if (l.status === 0 && (l.status = 1), a !== null && a.parentFlushed && (a.status === 1 || a.status === 3) && _l(l, a), l.parentFlushed && n.completedBoundaries.push(l), l.status === 1)
          t = l.row, t !== null && Rl(t.hoistables, l.contentState), Ye(n, l) || (n.allPendingTasks++, l.fallbackAbortableTasks.forEach(Ur, n), l.fallbackAbortableTasks.clear(), t !== null && --t.pendingTasks === 0 && Fn(n, t), n.allPendingTasks--), n.pendingRootTasks === 0 && n.trackedPostpones === null && l.preamble !== null && br(n);
        else if (l.status === 5 && (l = l.row, l !== null)) {
          if (n.trackedPostpones !== null) {
            t = n.trackedPostpones;
            var f = l.next;
            if (f !== null && (a = f.boundaries, a !== null))
              for (f.boundaries = null, f = 0; f < a.length; f++) {
                var o = a[f];
                ht(n, t, o), Yr(n, o, null, null);
              }
          }
          n.allPendingTasks++, --l.pendingTasks === 0 && Fn(n, l), n.allPendingTasks--;
        }
      } else
        a === null || !a.parentFlushed || a.status !== 1 && a.status !== 3 || (_l(l, a), l.completedSegments.length === 1 && l.parentFlushed && n.partialBoundaries.push(l)), l = l.row, l !== null && l.together && gr(n, l);
    n.allPendingTasks === 0 && vt(n);
  }
  function yr(n) {
    if (!(n.aborted || 11 < n.status)) {
      var l = qe, t = _r.H;
      _r.H = it;
      var a = _r.A;
      _r.A = at;
      var f = Hn;
      Hn = n;
      var o = Yl;
      Yl = n.resumableState;
      try {
        var d = n.pingedTasks, v;
        for (v = 0; v < d.length; v++) {
          var g = d[v], b = n, k = g.blockedSegment;
          if (k === null) {
            n:
              if (g.replay.pendingTasks !== 0) {
                var _ = b.currentTask;
                b.currentTask = g, fr(g.context);
                var H = g.node;
                try {
                  if (typeof g.replay.slots == "number" ? Al(
                    b,
                    g,
                    g.replay.slots,
                    g.node,
                    g.childIndex
                  ) : kl(b, g), g.replay.pendingTasks === 1 && 0 < g.replay.nodes.length)
                    throw Error(s(488));
                  g.replay.pendingTasks--, g.abortSet.delete(g), Yr(b, g.blockedBoundary, g.row, null);
                } catch (Jn) {
                  $n();
                  var W = Jn === E ? L() : Jn;
                  if (b.aborted) {
                    Jn === E && (g.thenableState = Ue()), b.currentTask = _;
                    var Y = b;
                    Zl(g, Y), g.abortSet.delete(g), El(
                      g,
                      Y,
                      Y.fatalError
                    );
                  } else {
                    if (typeof W == "object" && W !== null) {
                      if (typeof W.then == "function") {
                        var rn = g.ping;
                        W.then(rn.resolve, rn.reject), g.thenableState = Jn === E ? Ue() : null;
                        break n;
                      }
                      if (W.message === "Maximum call stack size exceeded" && g.node !== H) {
                        g.thenableState = null, b.pingedTasks.push(g);
                        break n;
                      }
                    }
                    g.replay.pendingTasks--, g.abortSet.delete(g);
                    var Gn = Ge(g.componentStack);
                    Y = b;
                    var Xe = g.blockedBoundary, Bn = b.aborted ? b.fatalError : W, Xn = g.replay.nodes, Me = g.replay.slots, $e = nn(
                      Y,
                      Bn,
                      Gn
                    );
                    Tl(
                      Y,
                      Xe,
                      Xn,
                      Me,
                      Bn,
                      $e
                    ), b.pendingRootTasks--, b.pendingRootTasks === 0 && dt(b), b.allPendingTasks--, b.allPendingTasks === 0 && vt(b);
                  }
                } finally {
                  b.currentTask = _;
                }
              }
          } else
            n: if (Y = k, Y.status === 0) {
              var J = b.currentTask;
              b.currentTask = g, fr(g.context);
              var Dn = Y.children.length, nl = Y.chunks.length, Fe = g.node;
              try {
                kl(b, g), Y.lastPushedText && Y.textEmbedded && Y.chunks.push(tl), g.abortSet.delete(g), Y.status = 1, _e(
                  b,
                  g.blockedBoundary,
                  Y
                ), Yr(
                  b,
                  g.blockedBoundary,
                  g.row,
                  Y
                );
              } catch (Jn) {
                $n(), Y.children.length = Dn, Y.chunks.length = nl;
                var Vn = Jn === E ? L() : Jn;
                if (b.aborted)
                  Jn === E && (g.thenableState = Ue()), b.currentTask = J, Y = b, Zl(g, Y), g.abortSet.delete(g), El(
                    g,
                    Y,
                    Y.fatalError
                  );
                else {
                  if (typeof Vn == "object" && Vn !== null) {
                    if (typeof Vn.then == "function") {
                      Y.status = 0, g.thenableState = Jn === E ? Ue() : null;
                      var se = g.ping;
                      Vn.then(
                        se.resolve,
                        se.reject
                      );
                      break n;
                    }
                    if (Vn.message === "Maximum call stack size exceeded" && g.node !== Fe) {
                      Y.status = 0, g.thenableState = null, b.pingedTasks.push(g);
                      break n;
                    }
                  }
                  var Ol = Ge(g.componentStack);
                  g.abortSet.delete(g), Y.status = 4;
                  var fe = g.blockedBoundary, el = g.row;
                  if (el !== null && --el.pendingTasks === 0 && Fn(b, el), b.allPendingTasks--, fe === null)
                    if (mn(Vn)) {
                      var Wn = _n(Vn);
                      nn(
                        b,
                        Wn,
                        Ol
                      ), Te(b, Wn);
                    } else
                      nn(
                        b,
                        Vn,
                        Ol
                      ), Te(b, Vn);
                  else {
                    var Ql = nn(
                      b,
                      Vn,
                      Ol
                    );
                    if (fe.pendingTasks--, fe.status !== 4) {
                      fe.status = 4, fe.errorDigest = Ql, ti(b, fe);
                      var ul = fe.row;
                      ul !== null && (b.allPendingTasks++, --ul.pendingTasks === 0 && Fn(b, ul), b.allPendingTasks--), fe.parentFlushed && b.clientRenderedBoundaries.push(fe), b.pendingRootTasks === 0 && b.trackedPostpones === null && fe.preamble !== null && br(b);
                    }
                    b.allPendingTasks === 0 && vt(b);
                  }
                }
              } finally {
                b.currentTask = J;
              }
            }
        }
        d.splice(0, v), n.destination !== null && Tt(n, n.destination);
      } catch (Jn) {
        nn(n, Jn, {}), Te(n, Jn);
      } finally {
        Yl = o, _r.H = t, _r.A = a, t === it && fr(l), Hn = f;
      }
    }
  }
  function ia(n, l, t) {
    l.preambleChildren.length && t.push(l.preambleChildren);
    for (var a = !1, f = 0; f < l.children.length; f++)
      a = gt(
        n,
        l.children[f],
        t
      ) || a;
    return a;
  }
  function gt(n, l, t) {
    var a = l.boundary;
    if (a === null)
      return ia(
        n,
        l,
        t
      );
    var f = a.preamble;
    if (f === null) return !1;
    switch (a.status) {
      case 1:
        if (Na(n.renderState, f.content), n.byteSize += a.byteSize, l = a.completedSegments[0], !l) throw Error(s(391));
        return ia(
          n,
          l,
          t
        );
      case 5:
        if (n.trackedPostpones !== null) return !0;
      case 4:
        if (l.status === 1)
          return Na(n.renderState, f.fallback), ia(
            n,
            l,
            t
          );
      default:
        return !0;
    }
  }
  function br(n) {
    if (n.completedRootSegment && n.completedPreambleSegments === null) {
      var l = [], t = n.byteSize, a = gt(
        n,
        n.completedRootSegment,
        l
      ), f = n.renderState.preamble;
      a === !1 || f.headChunks && f.bodyChunks ? n.completedPreambleSegments = l : n.byteSize = t;
    }
  }
  function Tr(n, l, t, a) {
    switch (t.parentFlushed = !0, t.status) {
      case 0:
        t.id = n.nextSegmentId++;
      case 5:
        return a = t.id, t.lastPushedText = !1, t.textEmbedded = !1, n = n.renderState, C(l, ku), C(l, n.placeholderPrefix), n = D(a.toString(16)), C(l, n), Q(l, Rf);
      case 1:
        t.status = 2;
        var f = !0, o = t.chunks, d = 0;
        t = t.children;
        for (var v = 0; v < t.length; v++) {
          for (f = t[v]; d < f.index; d++)
            C(l, o[d]);
          f = wl(n, l, f, a);
        }
        for (; d < o.length - 1; d++)
          C(l, o[d]);
        return d < o.length && (f = Q(l, o[d])), f;
      case 3:
        return !0;
      default:
        throw Error(s(390));
    }
  }
  var yt = 0;
  function wl(n, l, t, a) {
    var f = t.boundary;
    if (f === null)
      return Tr(n, l, t, a);
    if (t.boundary = null, f.parentFlushed = !0, f.status === 4) {
      var o = f.row;
      o !== null && --o.pendingTasks === 0 && Fn(n, o), f = f.errorDigest, Q(l, Cf), C(l, Se), f != null && (C(l, zi), C(l, D(ln(f))), C(
        l,
        Af
      )), Q(l, Hi), Tr(n, l, t, a);
    } else if (f.status !== 1)
      f.status === 0 && (f.rootSegmentID = n.nextSegmentId++), 0 < f.completedSegments.length && n.partialBoundaries.push(f), _u(
        l,
        n.renderState,
        f.rootSegmentID
      ), a && Rl(a, f.fallbackState), Tr(n, l, t, a);
    else if (!ai && Ye(n, f) && (yt + f.byteSize > n.progressiveChunkSize || la(f.contentState, bt) || f.defer))
      f.rootSegmentID = n.nextSegmentId++, n.completedBoundaries.push(f), _u(
        l,
        n.renderState,
        f.rootSegmentID
      ), Tr(n, l, t, a);
    else {
      if (yt += f.byteSize, a && Rl(a, f.contentState), t = f.row, t !== null && Ye(n, f) && --t.pendingTasks === 0 && Fn(n, t), Q(l, Di), t = f.completedSegments, t.length !== 1) throw Error(s(391));
      wl(n, l, t[0], a);
    }
    return Q(l, ze);
  }
  function aa(n, l, t, a) {
    return Ua(
      l,
      n.renderState,
      t.parentFormatContext,
      t.id
    ), wl(n, l, t, a), ar(l, t.parentFormatContext);
  }
  function qa(n, l, t) {
    yt = t.byteSize;
    for (var a = t.completedSegments, f = 0; f < a.length; f++)
      Gr(
        n,
        l,
        t,
        a[f]
      );
    a.length = 0, a = t.row, a !== null && Ye(n, t) && --a.pendingTasks === 0 && Fn(n, a), ur(
      l,
      t.contentState,
      n.renderState
    ), a = n.resumableState, n = n.renderState, f = t.rootSegmentID, t = t.contentState;
    var o = n.stylesToHoist, d = (a.instructions & 128) !== 0;
    return n.stylesToHoist = !1, C(l, n.startInlineScript), C(l, Nn), o ? ((a.instructions & 4) === 0 && (a.instructions |= 4, C(l, Of)), (a.instructions & 2) === 0 && (a.instructions |= 2, C(l, Du)), d && (a.instructions & 256) === 0 && (a.instructions |= 256, C(
      l,
      zu
    )), (a.instructions & 8) === 0 ? (a.instructions |= 8, C(l, _f)) : C(l, Hu)) : ((a.instructions & 2) === 0 && (a.instructions |= 2, C(l, Du)), d && (a.instructions & 256) === 0 && (a.instructions |= 256, C(
      l,
      zu
    )), C(l, Sf)), a = D(f.toString(16)), C(l, n.boundaryPrefix), C(l, a), C(l, Bu), C(l, n.segmentPrefix), C(l, a), o ? (C(l, Ff), Qu(l, t)) : C(l, Wu), t = Q(l, Xi), Da(l, n) && t;
  }
  function Gr(n, l, t, a) {
    if (a.status === 2) return !0;
    var f = t.contentState, o = a.id;
    if (o === -1) {
      if ((a.id = t.rootSegmentID) === -1)
        throw Error(s(392));
      return aa(n, l, a, f);
    }
    return o === t.rootSegmentID ? aa(n, l, a, f) : (aa(n, l, a, f), t = n.resumableState, n = n.renderState, C(l, n.startInlineScript), C(l, Nn), (t.instructions & 1) === 0 ? (t.instructions |= 1, C(l, Qt)) : C(l, Iu), C(l, n.segmentPrefix), o = D(o.toString(16)), C(l, o), C(l, Lu), C(l, n.placeholderPrefix), C(l, o), l = Q(l, Nu), l);
  }
  var ai = !1, bt = !1;
  function Tt(n, l) {
    Ae = new Uint8Array(2048), ee = 0;
    try {
      if (!(0 < n.pendingRootTasks)) {
        var t, a = n.completedRootSegment;
        if (a !== null) {
          if (a.status === 5) return;
          var f = n.completedPreambleSegments;
          if (f === null) return;
          yt = n.byteSize;
          var o = n.resumableState, d = n.renderState, v = d.preamble, g = v.htmlChunks, b = v.headChunks, k;
          if (g) {
            for (k = 0; k < g.length; k++)
              C(l, g[k]);
            if (b)
              for (k = 0; k < b.length; k++)
                C(l, b[k]);
            else
              C(l, re("head")), C(l, Nn);
          } else if (b)
            for (k = 0; k < b.length; k++)
              C(l, b[k]);
          var _ = d.charsetChunks;
          for (k = 0; k < _.length; k++)
            C(l, _[k]);
          _.length = 0, d.preconnects.forEach(An, l), d.preconnects.clear();
          var H = d.viewportChunks;
          for (k = 0; k < H.length; k++)
            C(l, H[k]);
          H.length = 0, d.fontPreloads.forEach(An, l), d.fontPreloads.clear(), d.highImagePreloads.forEach(An, l), d.highImagePreloads.clear(), jl = d, d.styles.forEach(Zu, l), jl = null;
          var W = d.importMapChunks;
          for (k = 0; k < W.length; k++)
            C(l, W[k]);
          W.length = 0, d.bootstrapScripts.forEach(An, l), d.scripts.forEach(An, l), d.scripts.clear(), d.bulkPreloads.forEach(An, l), d.bulkPreloads.clear(), g || b || (o.instructions |= 32);
          var Y = d.hoistableChunks;
          for (k = 0; k < Y.length; k++)
            C(l, Y[k]);
          for (o = Y.length = 0; o < f.length; o++) {
            var rn = f[o];
            for (d = 0; d < rn.length; d++)
              wl(n, l, rn[d], null);
          }
          var Gn = n.renderState.preamble, Xe = Gn.headChunks;
          (Gn.htmlChunks || Xe) && C(l, lr("head"));
          var Bn = Gn.bodyChunks;
          if (Bn)
            for (f = 0; f < Bn.length; f++)
              C(l, Bn[f]);
          bt = !0, wl(n, l, a, null), bt = !1, n.completedRootSegment = null;
          var Xn = n.renderState;
          if (n.allPendingTasks !== 0 || n.clientRenderedBoundaries.length !== 0 || n.completedBoundaries.length !== 0 || n.trackedPostpones !== null && (n.trackedPostpones.rootNodes.length !== 0 || n.trackedPostpones.rootSlots !== null)) {
            var Me = n.resumableState;
            if ((Me.instructions & 64) === 0) {
              if (Me.instructions |= 64, C(l, Xn.startInlineScript), (Me.instructions & 32) === 0) {
                Me.instructions |= 32;
                var $e = "_" + Me.idPrefix + "R_";
                C(l, Be), C(
                  l,
                  D(ln($e))
                ), C(l, Un);
              }
              C(l, Nn), C(l, rr), Q(l, Ot);
            }
          }
          Da(l, Xn);
        }
        var J = n.renderState;
        a = 0;
        var Dn = J.viewportChunks;
        for (a = 0; a < Dn.length; a++)
          C(l, Dn[a]);
        Dn.length = 0, J.preconnects.forEach(An, l), J.preconnects.clear(), J.fontPreloads.forEach(An, l), J.fontPreloads.clear(), J.highImagePreloads.forEach(
          An,
          l
        ), J.highImagePreloads.clear(), J.styles.forEach(Ki, l), J.scripts.forEach(An, l), J.scripts.clear(), J.bulkPreloads.forEach(An, l), J.bulkPreloads.clear();
        var nl = J.hoistableChunks;
        for (a = 0; a < nl.length; a++)
          C(l, nl[a]);
        nl.length = 0;
        var Fe = n.clientRenderedBoundaries;
        for (t = 0; t < Fe.length; t++) {
          var Vn = Fe[t];
          J = l;
          var se = n.resumableState, Ol = n.renderState, fe = Vn.rootSegmentID, el = Vn.errorDigest;
          C(
            J,
            Ol.startInlineScript
          ), C(J, Nn), (se.instructions & 4) === 0 ? (se.instructions |= 4, C(J, Ya)) : C(J, Uu), C(J, Ol.boundaryPrefix), C(J, D(fe.toString(16))), C(J, Or), el != null && (C(
            J,
            Ga
          ), el == null ? C(J, Zi) : C(
            J,
            D(If(el))
          ));
          var Wn = Q(
            J,
            Yu
          );
          if (!Wn) {
            n.destination = null, t++, Fe.splice(0, t);
            return;
          }
        }
        Fe.splice(0, t);
        var Ql = n.completedBoundaries;
        for (t = 0; t < Ql.length; t++)
          if (!qa(n, l, Ql[t])) {
            n.destination = null, t++, Ql.splice(0, t);
            return;
          }
        Ql.splice(0, t), jr(l), Ae = new Uint8Array(2048), ee = 0, ai = !0;
        var ul = n.partialBoundaries;
        for (t = 0; t < ul.length; t++) {
          var Jn = ul[t];
          n: {
            Fe = n, Vn = l, yt = Jn.byteSize;
            var Rr = Jn.completedSegments;
            for (Wn = 0; Wn < Rr.length; Wn++)
              if (!Gr(
                Fe,
                Vn,
                Jn,
                Rr[Wn]
              )) {
                Wn++, Rr.splice(0, Wn);
                var Vl = !1;
                break n;
              }
            Rr.splice(0, Wn);
            var Il = Jn.row;
            Il !== null && Il.together && Jn.pendingTasks === 1 && (Il.pendingTasks === 1 ? Br(
              Fe,
              Il,
              Il.hoistables
            ) : Il.pendingTasks--), Vl = ur(
              Vn,
              Jn.contentState,
              Fe.renderState
            );
          }
          if (!Vl) {
            n.destination = null, t++, ul.splice(0, t);
            return;
          }
        }
        ul.splice(0, t), ai = !1;
        var Ze = n.completedBoundaries;
        for (t = 0; t < Ze.length; t++)
          if (!qa(n, l, Ze[t])) {
            n.destination = null, t++, Ze.splice(0, t);
            return;
          }
        Ze.splice(0, t);
      }
    } finally {
      ai = !1, t = n.postponedState, t !== null && (t.nextSegmentId = n.nextSegmentId), n.allPendingTasks === 0 && n.clientRenderedBoundaries.length === 0 && n.completedBoundaries.length === 0 ? (n.flushScheduled = !1, t = n.resumableState, t.hasBody && C(l, lr("body")), t.hasHtml && C(l, lr("html")), jr(l), Zr(n), n.status = 13, l.close(), n.destination = null) : jr(l);
    }
  }
  function Er(n) {
    n.flushScheduled = n.destination !== null, ql(function() {
      return yr(n);
    }), ml(function() {
      n.status === 10 && (n.status = 11), n.trackedPostpones === null && st(n, n.pendingRootTasks === 0);
    });
  }
  function Xr(n) {
    n.flushScheduled === !1 && n.pingedTasks.length === 0 && n.destination !== null && (n.flushScheduled = !0, ml(function() {
      var l = n.destination;
      l ? Tt(n, l) : n.flushScheduled = !1;
    }));
  }
  function ua(n, l) {
    if (n.status === 12)
      n.status = 13, n = n.fatalError, mn(n) && (n = _n(n)), I(l, n);
    else if (n.status !== 13 && n.destination === null) {
      n.destination = l;
      try {
        Tt(n, l);
      } catch (t) {
        nn(n, t, {}), Te(n, t);
      }
    }
  }
  function qu(n, l) {
    try {
      if (0 < l.size) {
        var t = n.fatalError;
        l.forEach(function(a) {
          return El(a, n, t);
        }), l.clear();
      }
      n.destination !== null && Tt(n, n.destination);
    } catch (a) {
      nn(n, a, {}), Te(n, a);
    }
  }
  function Zr(n) {
    n = n.renderLifetimeController, n !== null && n.abort("The render ended.");
  }
  function wr(n, l) {
    if (l.aborted) Fl(n, l.reason);
    else {
      var t = new AbortController();
      n.renderLifetimeController = t, l.addEventListener(
        "abort",
        function() {
          Fl(n, l.reason);
        },
        { signal: t.signal }
      );
    }
  }
  function Fl(n, l) {
    if (!(n.aborted || n.status !== 11 && n.status !== 10)) {
      Zr(n);
      var t = typeof l == "object" && l !== null && l.$$typeof === dn;
      n.aborted = !0, l = t ? Zn(l) : l === void 0 ? Error(s(432)) : typeof l == "object" && l !== null && typeof l.then == "function" ? Error(s(530)) : l, n.fatalError = l;
      var a = n.abortableTasks;
      a.forEach(function(f) {
        return Zl(f, n);
      }), ml(function() {
        return qu(n, a);
      });
    }
  }
  function Qr(n, l, t) {
    if (l === null) t.rootNodes.push(n);
    else {
      var a = t.workingMap, f = a.get(l);
      f === void 0 && (f = [l[1], l[2], [], null], a.set(l, f), Qr(f, l[0], t)), f[2].push(n);
    }
  }
  function xr(n) {
    var l = n.trackedPostpones;
    if (l === null || l.rootNodes.length === 0 && l.rootSlots === null)
      return n.trackedPostpones = null;
    var t = n.completedRootSegment === null || n.completedRootSegment.status !== 5 && n.completedPreambleSegments !== null;
    if (t) {
      var a = n.nextSegmentId, f = l.rootSlots, o = n.resumableState;
      o.bootstrapScriptContent = void 0, o.bootstrapScripts = void 0, o.bootstrapModules = void 0;
    } else {
      a = 0, f = -1, o = n.resumableState;
      var d = n.renderState;
      o.nextFormID = 0, o.hasBody = !1, o.hasHtml = !1, o.unknownResources = { font: d.resets.font }, o.dnsResources = d.resets.dns, o.connectResources = d.resets.connect, o.imageResources = d.resets.image, o.styleResources = d.resets.style, o.scriptResources = {}, o.moduleUnknownResources = {}, o.moduleScriptResources = {}, o.instructions = 0;
    }
    return l = {
      nextSegmentId: a,
      rootFormatContext: n.rootFormatContext,
      progressiveChunkSize: n.progressiveChunkSize,
      resumableState: n.resumableState,
      replayNodes: l.rootNodes,
      replaySlots: f
    }, t && (n.postponedState = l), l;
  }
  function ju() {
    var n = R.version;
    if (n !== "19.3.0")
      throw Error(
        s(
          527,
          n,
          "19.3.0"
        )
      );
  }
  return ju(), ju(), Ri.prerender = function(n, l) {
    return new Promise(function(t, a) {
      var f = l ? l.onHeaders : void 0, o;
      f && (o = function(g) {
        f(new Headers(g));
      });
      var d = It(
        l ? l.identifierPrefix : void 0,
        l ? l.unstable_externalRuntimeSrc : void 0,
        l ? l.bootstrapScriptContent : void 0,
        l ? l.bootstrapScripts : void 0,
        l ? l.bootstrapModules : void 0
      ), v = zr(
        n,
        d,
        $r(
          d,
          void 0,
          l ? l.unstable_externalRuntimeSrc : void 0,
          l ? l.importMap : void 0,
          o,
          l ? l.maxHeadersLength : void 0
        ),
        le(l ? l.namespaceURI : void 0),
        l ? l.progressiveChunkSize : void 0,
        l ? l.onError : void 0,
        l ? l.onBrowserBailout : void 0,
        function() {
          var g = new ReadableStream(
            {
              type: "bytes",
              pull: function(b) {
                ua(v, b);
              },
              cancel: function(b) {
                v.destination = null, Fl(v, b);
              }
            },
            { highWaterMark: 0 }
          );
          g = { postponed: xr(v), prelude: g }, t(g);
        },
        void 0,
        void 0,
        a
      );
      l && l.signal && wr(v, l.signal), Er(v);
    });
  }, Ri.renderToReadableStream = function(n, l) {
    return new Promise(function(t, a) {
      var f, o, d = new Promise(function(_, H) {
        o = _, f = H;
      }), v = l ? l.onHeaders : void 0, g;
      v && (g = function(_) {
        v(new Headers(_));
      });
      var b = It(
        l ? l.identifierPrefix : void 0,
        l ? l.unstable_externalRuntimeSrc : void 0,
        l ? l.bootstrapScriptContent : void 0,
        l ? l.bootstrapScripts : void 0,
        l ? l.bootstrapModules : void 0
      ), k = Gl(
        n,
        b,
        $r(
          b,
          l ? l.nonce : void 0,
          l ? l.unstable_externalRuntimeSrc : void 0,
          l ? l.importMap : void 0,
          g,
          l ? l.maxHeadersLength : void 0
        ),
        le(l ? l.namespaceURI : void 0),
        l ? l.progressiveChunkSize : void 0,
        l ? l.onError : void 0,
        l ? l.onBrowserBailout : void 0,
        o,
        function() {
          var _ = new ReadableStream(
            {
              type: "bytes",
              pull: function(H) {
                ua(k, H);
              },
              cancel: function(H) {
                k.destination = null, Fl(k, H);
              }
            },
            { highWaterMark: 0 }
          );
          _.allReady = d, t(_);
        },
        function(_) {
          d.catch(function() {
          }), a(_);
        },
        f,
        l ? l.formState : void 0
      );
      l && l.signal && wr(k, l.signal), Er(k);
    });
  }, Ri.resume = function(n, l, t) {
    return new Promise(function(a, f) {
      var o, d, v = new Promise(function(b, k) {
        d = b, o = k;
      }), g = gl(
        n,
        l,
        $r(
          l.resumableState,
          t ? t.nonce : void 0,
          void 0,
          void 0,
          void 0,
          void 0
        ),
        t ? t.onError : void 0,
        t ? t.onBrowserBailout : void 0,
        d,
        function() {
          var b = new ReadableStream(
            {
              type: "bytes",
              pull: function(k) {
                ua(g, k);
              },
              cancel: function(k) {
                g.destination = null, Fl(g, k);
              }
            },
            { highWaterMark: 0 }
          );
          b.allReady = v, a(b);
        },
        function(b) {
          v.catch(function() {
          }), f(b);
        },
        o
      );
      t && t.signal && wr(g, t.signal), Er(g);
    });
  }, Ri.resumeAndPrerender = function(n, l, t) {
    return new Promise(function(a, f) {
      var o = ct(
        n,
        l,
        $r(
          l.resumableState,
          void 0,
          void 0,
          void 0,
          void 0,
          void 0
        ),
        t ? t.onError : void 0,
        t ? t.onBrowserBailout : void 0,
        function() {
          var d = new ReadableStream(
            {
              type: "bytes",
              pull: function(v) {
                ua(o, v);
              },
              cancel: function(v) {
                o.destination = null, Fl(o, v);
              }
            },
            { highWaterMark: 0 }
          );
          d = { postponed: xr(o), prelude: d }, a(d);
        },
        void 0,
        void 0,
        f
      );
      t && t.signal && wr(o, t.signal), Er(o);
    });
  }, Ri.version = "19.3.0", Ri;
}
var gc;
function _c() {
  if (gc) return xi;
  gc = 1;
  var R, P;
  return R = kc(), P = Sc(), xi.version = R.version, xi.renderToString = R.renderToString, xi.renderToStaticMarkup = R.renderToStaticMarkup, xi.renderToReadableStream = P.renderToReadableStream, xi.resume = P.resume, xi;
}
var Fc = _c();
const Oc = {
  Trap: "M-11 7C-25 -2 -19 -22 0 -22C19 -22 25 -2 11 7V17H-11Z M-11 7H11 M-5 8V17 M5 8V17 M-11 -5a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M3 -5a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M0 -1L-3 4H3Z",
  Shadowblighted: "M0 -17L5 -6L16 -9L10 1L16 12L4 9L0 18L-4 9L-16 12L-10 1L-16 -9L-5 -6Z M-5 -1L-2 2 M5 -1L2 2",
  Underground: "M-18 14Q-18 -17 0 -17Q18 -17 18 14L8 14Q10 -5 0 -6Q-10 -5 -8 14Z",
  Aquatic: "M-20 -10Q-15 -17 -10 -10T0 -10T10 -10T20 -10 M-20 0Q-15 -7 -10 0T0 0T10 0T20 0 M-20 10Q-15 3 -10 10T0 10T10 10T20 10",
  Wetland: "M-18 13H18 M-10 12V-12 M0 12V-18 M10 12V-8 M-13 -14V-6 M-3 -18V-10 M7 -10V-3 M-10 7L-17 0 M0 6L6 0",
  Grassland: "M-16 13Q-12 0 -19 -8 M-9 13Q-4 -3 -9 -17 M0 13Q-2 -2 5 -14 M7 13Q10 0 17 -5 M-20 14H20",
  Tropical: "M-3 17Q3 0 0 -10 M0 -10Q-16 -22 -20 -5Q-10 -13 0 -10 M0 -10Q15 -23 21 -7Q12 -13 0 -10 M0 -10Q7 -2 12 2 M-10 17H8",
  Forest: "M-3 16V5 M3 16V5 M-12 16H12 M-10 5C-25 5 -19 -10 -11 -9C-13 -23 8 -23 10 -12C23 -12 24 5 11 5Z",
  Drylands: "M-3 17V-15Q0 -21 3 -15V17 M-3 3H-13Q-17 3 -17 -2V-9 M3 -3H12Q17 -3 17 -8V-13 M-10 17H10",
  Rolling: "M-22 12Q-10 -13 3 9 M-3 12Q11 -10 23 12",
  Mountain: "M-22 15L-7 -17L9 15 M0 -2L9 -15L24 15 M-12 -6L-7 -2L-3 -7",
  Frozen: "M0 -20V20 M-17 -10L17 10 M-17 10L17 -10 M-5 -15L0 -10L5 -15 M-5 15L0 10L5 15 M-15 -3L-9 -5L-10 -12 M15 3L9 5L10 12 M-15 3L-9 5L-10 12 M15 -3L9 -5L10 -12",
  Badlands: "M-23 15L-13 -6L-7 0L-1 -14L5 -3L12 -8L23 15 M-4 -19L-8 -25 M5 -18L9 -24"
};
function Ic({ habitat: R, terrain: P, size: s = 1 }) {
  return /* @__PURE__ */ Ee.jsxs("g", { transform: `scale(${s})`, stroke: "#151513", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", children: [
    /* @__PURE__ */ Ee.jsx("path", { d: Oc[R] }),
    Array.from({ length: R === "Trap" ? 0 : P }, (N, S) => /* @__PURE__ */ Ee.jsx("circle", { cx: (S - (P - 1) / 2) * 9, cy: 29, r: 2.8, fill: "#151513", stroke: "none" }, S))
  ] });
}
const Jc = { version: 1, imageMetadata: { name: "Untitled wilderness", width: 1400, height: 1e3 }, grid: { size: 48, offsetX: 0, offsetY: 0, orientation: "pointy", opacity: 0.23, thickness: 1, visible: !0 }, regions: [], markers: [], labels: [], generatorTables: { size: [{ min: 1, max: 4, name: "3" }, { min: 5, max: 8, name: "5" }, { min: 9, max: 12, name: "7" }], feature: [{ min: 1, max: 100, name: "Uncharted feature — add your own table" }] } }, Lc = ["Shadowblighted", "Underground", "Aquatic", "Wetland", "Grassland", "Tropical", "Forest", "Drylands", "Rolling", "Mountain", "Frozen", "Badlands"], Nc = Lc.map((R, P) => ({ name: R, min: [1, 2, 3, 5, 7, 9, 11, 13, 15, 17, 19, 20][P], max: [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 19, 20][P] })), Dc = ["Optimal", "Fair", "Rough", "Extreme"], zc = ["Roll twice and combine both encounters", "Fellow travelers", "Temporary setback", "Seekers-in-Shadow", "Extreme weather", "Bandits/brigands/mercenaries", "Territorial beast", "Environmental hazard", "Cult of the Two-Headed Coin", "Wondrous or dangerous site", "Good fortune", "Settlement or outpost", "Treasure/cache"], yn = (R) => `${R.q},${R.r}`, Hc = [{ q: 0, r: -1 }, { q: 1, r: 0 }, { q: 0, r: 1 }, { q: -1, r: 0 }], Bc = [{ q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 }, { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 }], Wc = (R, P) => ((P == null ? void 0 : P.orientation) === "square" ? Hc : Bc).map((s) => ({ q: R.q + s.q, r: R.r + s.r }));
function bc(R, P) {
  return P.orientation === "square" ? { x: P.offsetX + P.size * R.q, y: P.offsetY + P.size * R.r } : P.orientation === "pointy" ? { x: P.offsetX + P.size * Math.sqrt(3) * (R.q + R.r / 2), y: P.offsetY + P.size * 1.5 * R.r } : { x: P.offsetX + P.size * 1.5 * R.q, y: P.offsetY + P.size * Math.sqrt(3) * (R.r + R.q / 2) };
}
function kr(R, P, s) {
  if (R = (R - s.offsetX) / s.size, P = (P - s.offsetY) / s.size, s.orientation === "square") return { q: Math.floor(R + 0.5) || 0, r: Math.floor(P + 0.5) || 0 };
  const N = s.orientation === "pointy" ? Math.sqrt(3) / 3 * R - P / 3 : 2 * R / 3, S = s.orientation === "pointy" ? 2 * P / 3 : -R / 3 + Math.sqrt(3) / 3 * P;
  let Z = Math.round(N), K = Math.round(S);
  const tn = -N - S, an = Math.round(tn);
  return Math.abs(Z - N) > Math.abs(K - S) && Math.abs(Z - N) > Math.abs(an - tn) ? Z = -K - an : Math.abs(K - S) > Math.abs(an - tn) && (K = -Z - an), { q: Z === 0 ? 0 : Z, r: K === 0 ? 0 : K };
}
function jf(R, P) {
  const s = bc(R, P);
  return P.orientation === "square" ? [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([N, S]) => ({ x: s.x + N * P.size / 2, y: s.y + S * P.size / 2 })) : Array.from({ length: 6 }, (N, S) => {
    const Z = (S * 60 + (P.orientation === "pointy" ? 30 : 0)) * Math.PI / 180;
    return { x: s.x + P.size * Math.cos(Z), y: s.y + P.size * Math.sin(Z) };
  });
}
function pf(R, P) {
  const s = new Set(R.map(yn)), N = P.orientation === "square" ? [0, 1, 2, 3] : P.orientation === "pointy" ? [5, 4, 3, 2, 1, 0] : [0, 5, 4, 3, 2, 1];
  return R.flatMap((S) => {
    const Z = jf(S, P), K = Wc(S, P);
    return Z.flatMap((tn, an) => s.has(yn(K[N[an]])) ? [] : [{ a: tn, b: Z[(an + 1) % Z.length] }]);
  });
}
const Uc = (R, P) => pf(R, P).map((s) => `M${s.a.x},${s.a.y}L${s.b.x},${s.b.y}`).join(" "), Yc = ["#76519c", "#83705b", "#287cc1", "#32958e", "#96b735", "#159653", "#327d3b", "#ccaa42", "#bf7961", "#777f99", "#61c9dc", "#c75032"], Gc = { backgroundOpacity: 1, showRegions: !0, regionOpacity: 0.42 };
function Tc(R) {
  return {
    ...R.generatorTables,
    habitat: (R.generatorTables.habitat ?? Nc.map((P, s) => ({ ...P, color: Yc[s], symbol: P.name }))).map((P) => ({ ...P, id: P.id ?? P.name })),
    terrain: R.generatorTables.terrain ?? Dc.map((P, s) => ({ min: s + 1, max: s + 1, name: P, value: s + 1, days: s + 1 })),
    encounter: R.generatorTables.encounter ?? zc.map((P, s) => ({ min: s + 2, max: s + 2, name: P, combine: s === 0 }))
  };
}
function Kc(R) {
  return { ...R, view: { ...Gc, ...R.view }, generatorTables: Tc(R) };
}
function Xc(R, P) {
  const s = [0.25, 0.5, 0.75, 1][Math.max(0, Math.min(3, P - 1))];
  return `#${[1, 3, 5].map((S) => Math.round(255 + (parseInt(R.slice(S, S + 2), 16) - 255) * s)).map((S) => S.toString(16).padStart(2, "0")).join("")}`;
}
function mf(R, P, s) {
  const N = R.q - P.q, S = R.r - P.r;
  return (s == null ? void 0 : s.orientation) === "square" ? Math.max(Math.abs(N), Math.abs(S)) : Math.max(Math.abs(N), Math.abs(S), Math.abs(N + S));
}
function Ec(R, P, s) {
  const N = [];
  if ((s == null ? void 0 : s.orientation) === "square") {
    for (let S = -P; S <= P; S++) for (let Z = -P; Z <= P; Z++) N.push({ q: R.q + S, r: R.r + Z });
    return N;
  }
  for (let S = -P; S <= P; S++) for (let Z = Math.max(-P, -S - P); Z <= Math.min(P, -S + P); Z++) N.push({ q: R.q + S, r: R.r + Z });
  return N;
}
function Kf(R, P, s) {
  const N = kr(P.x, P.y, R.grid);
  if (P.alertMode === "region") {
    const S = R.regions.find((Z) => Z.hexes.some((K) => yn(K) === yn(N)));
    return !!(S != null && S.hexes.some((Z) => yn(Z) === yn(s)));
  }
  return mf(s, N, R.grid) <= (P.radiusHexes ?? 0);
}
function Zc(R, P) {
  var N;
  const s = kr(P.x, P.y, R.grid);
  return P.alertMode === "region" ? ((N = R.regions.find((S) => S.hexes.some((Z) => yn(Z) === yn(s)))) == null ? void 0 : N.hexes) ?? [] : Ec(s, P.radiusHexes ?? 0, R.grid);
}
const Qc = () => ({ enabled: !0, tables: {}, encounters: {}, hexEncounters: {}, resultRules: {} }), cu = "wild-atlas";
function pc(R, P = {}) {
  var Z, K, tn;
  const s = (Z = R.flags) == null ? void 0 : Z[cu], N = ((tn = (K = P.flags) == null ? void 0 : K[cu]) == null ? void 0 : tn.enabled) ?? P[`flags.${cu}.enabled`] ?? (s == null ? void 0 : s.enabled), S = s == null ? void 0 : s.visibilityBackup;
  if (N) {
    const an = {};
    return S || (an.flags = { [cu]: { visibilityBackup: { tokenVision: R.tokenVision, fogExploration: R.fogExploration } } }), (P.tokenVision ?? R.tokenVision) !== !1 && (an.tokenVision = !1), (P.fogExploration ?? R.fogExploration) !== !1 && (an.fogExploration = !1), an;
  }
  return s != null && s.enabled && S && N === !1 ? { ...S, flags: { [cu]: { "-=visibilityBackup": null } } } : {};
}
function mc(R, P, s) {
  var K;
  const N = new Map(R.regions.flatMap((tn) => tn.hexes.map((an) => [yn(an), tn]))), S = (K = R.foundry) == null ? void 0 : K.travel;
  let Z = P;
  return s.flatMap((tn) => {
    if (yn(tn) === yn(Z)) return [];
    const an = N.get(yn(Z)), fn = N.get(yn(tn)), F = S == null ? void 0 : S.levels[(an == null ? void 0 : an.terrain) ?? 0], M = S == null ? void 0 : S.levels[(fn == null ? void 0 : fn.terrain) ?? 0], V = Number((F == null ? void 0 : F.minutes) ?? 0) * 60, $ = Number((M == null ? void 0 : M.chance) ?? 0), vn = { from: yn(Z), to: yn(tn), seconds: S != null && S.timeEnabled && Number.isFinite(V) ? Math.max(0, Math.round(V)) : 0, chance: S != null && S.encountersEnabled && Number.isFinite($) ? Math.max(0, Math.min(100, $)) : 0, table: (M == null ? void 0 : M.table) ?? "" };
    return Z = tn, [vn];
  });
}
function Vc(R, P, s) {
  const N = P.x - R.x, S = P.y - R.y, Z = Math.hypot(N, S);
  if (!Z) return [];
  const K = /* @__PURE__ */ new Map(), tn = Math.ceil(Z / (s.size * 0.3));
  if (tn > 1e5) throw new Error("Movement is too long. Split it into shorter moves.");
  for (let fn = 0; fn <= tn; fn++) for (const F of Ec(kr(R.x + N * fn / tn, R.y + S * fn / tn, s), 1, s)) K.set(yn(F), F);
  const an = [];
  for (const fn of K.values()) {
    const F = jf(fn, s);
    let M = 0, V = 1;
    for (let $ = 0; $ < F.length; $++) {
      const vn = F[$], Ne = F[($ + 1) % F.length], rl = Ne.x - vn.x, Nl = Ne.y - vn.y, Ce = rl * (R.y - vn.y) - Nl * (R.x - vn.x), we = rl * S - Nl * N;
      if (Math.abs(we) < 1e-9) {
        if (Ce < -1e-8) {
          V = -1;
          break;
        }
      } else we > 0 ? M = Math.max(M, -Ce / we) : V = Math.min(V, -Ce / we);
    }
    if (V - M > 1e-8 && V >= 0 && M <= 1) {
      const $ = (M + V) / 2;
      yn(kr(R.x + N * $, R.y + S * $, s)) === yn(fn) && an.push({ h: fn, t: M });
    }
  }
  return an.sort((fn, F) => fn.t - F.t || yn(fn.h).localeCompare(yn(F.h))), an.map((fn) => fn.h);
}
function qc(R, P) {
  if (R.length < 2) return [];
  const s = [];
  let N = yn(kr(R[0].x, R[0].y, P));
  for (let S = 1; S < R.length; S++) {
    const Z = R[S].teleport ? [kr(R[S].x, R[S].y, P)] : Vc(R[S - 1], R[S], P);
    for (const K of Z)
      yn(K) !== N && s.push(K), N = yn(K);
  }
  return s;
}
function jc() {
  return { visited: [], triggered: {}, processed: [] };
}
function $c(R, P, s, N, S, Z = "party") {
  var Ce, we;
  const K = new Set(P.trapDiscovery ?? []), tn = new Set(P.visited), an = { ...P.triggered }, fn = new Map(R.regions.flatMap((dn) => dn.hexes.map((Kn) => [yn(Kn), dn]))), F = R.foundry ?? Qc(), M = Math.floor(N / 86400), V = [];
  for (const dn of s) {
    const Kn = yn(dn), Pn = fn.get(Kn), Sr = !tn.has(Kn);
    tn.add(Kn), (Pn == null ? void 0 : Pn.kind) === "trap" && K.add(Pn.id + ":" + Kn);
    const en = F.hexEncounters[Kn] ?? (Pn ? F.encounters[Pn.id] ?? Pn.encounterRule : void 0);
    !(en != null && en.enabled) || !en.text.trim() || en.repeat === "discovery" && !Sr || en.repeat === "day" && an[Kn] === M || (V.push({ hex: Kn, region: (Pn == null ? void 0 : Pn.name) || "Unassigned region", rule: en }), an[Kn] = M);
  }
  const $ = s.at(-1), vn = R.markers.filter((dn) => dn.alertEnabled);
  let Ne = new Set(S ? vn.filter((dn) => Kf(R, dn, S)).map((dn) => dn.id) : ((Ce = P.pinOccupancy) == null ? void 0 : Ce[Z]) ?? []);
  const rl = [];
  for (const dn of s) {
    const Kn = new Set(vn.filter((Pn) => Kf(R, Pn, dn)).map((Pn) => Pn.id));
    for (const Pn of vn) Kn.has(Pn.id) && !Ne.has(Pn.id) && rl.push({ title: Pn.title, distance: mf(dn, kr(Pn.x, Pn.y, R.grid), R.grid), mode: Pn.alertMode, hex: yn(dn) });
    Ne = Kn;
  }
  const Nl = $ ? vn.filter((dn) => Kf(R, dn, $)).map((dn) => ({ title: dn.title, distance: mf($, kr(dn.x, dn.y, R.grid)) })) : [];
  return { state: { ...P, visited: [...tn], triggered: an, trapDiscovery: [...K], pinOccupancy: { ...P.pinOccupancy, [Z]: [...Ne] } }, alerts: V, nearby: Nl, pinEntries: rl, region: $ ? (we = fn.get(yn($))) == null ? void 0 : we.name : void 0 };
}
function no(R, P, s) {
  var fn;
  const N = new Set(P), S = s ? new Set(s) : null, Z = (F, M) => N.has(yn(M)) && (F.kind !== "trap" || !S || S.has(F.id + ":" + yn(M))), K = Tc(R).habitat, tn = (F) => [`${F.a.x.toFixed(5)},${F.a.y.toFixed(5)}`, `${F.b.x.toFixed(5)},${F.b.y.toFixed(5)}`].sort().join("|"), an = R.regions.flatMap((F) => {
    const M = new Set(pf(F.hexes, R.grid).map(tn));
    return F.hexes.filter((V) => Z(F, V)).flatMap((V) => pf([V], R.grid).filter(($) => M.has(tn($))));
  }).map((F) => `M${F.a.x},${F.a.y}L${F.b.x},${F.b.y}`).join(" ");
  return {
    version: 1,
    grid: { ...R.grid },
    width: R.imageMetadata.width,
    height: R.imageMetadata.height,
    opacity: ((fn = R.view) == null ? void 0 : fn.regionOpacity) ?? 0.42,
    borders: an,
    hexes: R.regions.flatMap((F) => F.hexes.filter((M) => Z(F, M)).map((M) => {
      var V, $;
      return { q: M.q, r: M.r, name: F.name, habitat: F.kind === "trap" ? "Trap" : F.habitat, terrain: F.terrain, color: F.kind === "trap" ? "#df4d44" : Xc(((V = K.find((vn) => vn.name === F.habitat)) == null ? void 0 : V.color) ?? "#777777", F.terrain), symbol: F.kind === "trap" ? "Trap" : (($ = K.find((vn) => vn.name === F.habitat)) == null ? void 0 : $.symbol) ?? "Forest" };
    })),
    markers: R.markers.filter((F) => !F.hidden && N.has(yn(kr(F.x, F.y, R.grid)))).map(({ id: F, x: M, y: V, title: $, kind: vn }) => ({ id: F, x: M, y: V, title: $, kind: vn })),
    labels: R.labels.filter((F) => !F.hidden && N.has(yn(kr(F.x, F.y, R.grid)))).map(({ id: F, x: M, y: V, title: $ }) => ({ id: F, x: M, y: V, title: $ }))
  };
}
const Pi = (R) => String(R ?? "").replace(/[&<>"']/g, (P) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[P]);
function eo(R, P, s = !1) {
  return `<section><h3>${Pi(R)} · Wild Atlas</h3>${P.region ? `<p>Region: <b>${Pi(P.region)}</b></p>` : ""}${P.alerts.map((N) => `<p><b>${Pi(N.region)} · Cell ${Pi(N.hex)}</b><br>${N.rule.mode === "dc" ? `${Pi(N.rule.check)} DC ${N.rule.threshold}; on ${N.rule.trigger}` : `${N.rule.threshold}% chance`}: ${Pi(N.rule.text)}</p>`).join("")}${(s ? P.pinEntries : P.nearby).map((N) => `<p>${s ? "Entered pin alert area" : "Nearby"} — <b>${Pi(N.title)}</b> (${N.distance} cell${N.distance === 1 ? "" : "s"})</p>`).join("")}</section>`;
}
function lo(R, P) {
  var N;
  const s = R.grid;
  return Fc.renderToStaticMarkup(/* @__PURE__ */ Ee.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: `0 0 ${R.width} ${R.height}`, width: R.width, height: R.height, children: [
    /* @__PURE__ */ Ee.jsx("defs", { children: /* @__PURE__ */ Ee.jsx("clipPath", { id: "atlas-bounds", children: /* @__PURE__ */ Ee.jsx("rect", { width: R.width, height: R.height }) }) }),
    /* @__PURE__ */ Ee.jsxs("g", { clipPath: "url(#atlas-bounds)", children: [
      P.regions && R.hexes.map((S) => {
        const Z = bc(S, s);
        return /* @__PURE__ */ Ee.jsxs("g", { children: [
          /* @__PURE__ */ Ee.jsx("polygon", { points: jf(S, s).map((K) => `${K.x},${K.y}`).join(" "), fill: S.color, fillOpacity: R.opacity, stroke: "#27271f", strokeOpacity: ".35", strokeWidth: s.thickness }),
          P.symbols !== !1 && /* @__PURE__ */ Ee.jsx("g", { "data-habitat-symbol": "true", transform: `translate(${Z.x} ${Z.y - 4})`, children: /* @__PURE__ */ Ee.jsx(Ic, { habitat: S.symbol, terrain: S.terrain, size: s.size / 70 }) })
        ] }, yn(S));
      }),
      P.regions && R.borders && /* @__PURE__ */ Ee.jsx("path", { "data-region-borders": "true", d: R.borders, fill: "none", stroke: "#000000", strokeWidth: Math.max(3, s.size * 0.055), strokeLinejoin: "round", strokeLinecap: "round" }),
      P.auras && ((N = P.project) == null ? void 0 : N.markers.filter((S) => S.alertEnabled).map((S) => /* @__PURE__ */ Ee.jsx("path", { d: Uc(Zc(P.project, S), s), fill: "none", stroke: "#ae5cfa", strokeWidth: "3", strokeDasharray: "8 5" }, S.id))),
      P.pins && R.markers.map((S) => /* @__PURE__ */ Ee.jsxs("g", { transform: `translate(${S.x} ${S.y})`, children: [
        /* @__PURE__ */ Ee.jsx("circle", { r: "12", fill: "#fff5da", stroke: "#302924", strokeWidth: "2" }),
        /* @__PURE__ */ Ee.jsx("text", { textAnchor: "middle", y: "5", fontSize: "16", children: S.kind === "star" ? "★" : S.kind === "danger" ? "!" : "◆" }),
        /* @__PURE__ */ Ee.jsx("text", { y: "29", textAnchor: "middle", fontSize: "15", fill: "#111", stroke: "#fff", strokeWidth: "3", paintOrder: "stroke", children: S.title })
      ] }, S.id)),
      P.pins && R.labels.map((S) => /* @__PURE__ */ Ee.jsx("text", { x: S.x, y: S.y, textAnchor: "middle", fontSize: "22", fill: "#111", stroke: "#fff", strokeWidth: "3", paintOrder: "stroke", children: S.title }, S.id))
    ] })
  ] }));
}
export {
  eo as alertHTML,
  Qc as defaultConfig,
  jc as emptyExploration,
  Pi as escapeHTML,
  bc as hexToPixel,
  pc as hexplorationVisibilityUpdate,
  Jc as initialProject,
  yn as key,
  Kc as normalizeProject,
  lo as overlaySVG,
  kr as pixelToHex,
  $c as planTravel,
  no as publicProjection,
  Tc as tablesFor,
  qc as traceRoute,
  Vc as traceSegment,
  mc as travelSteps
};
