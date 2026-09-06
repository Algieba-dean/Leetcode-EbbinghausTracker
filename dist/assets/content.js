(function(exports) {
  "use strict";
  const DEFAULT_EBBINGHAUS_LADDER = [1, 2, 4, 7, 15, 30, 60, 120];
  function getTodayString(d = /* @__PURE__ */ new Date()) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function addDays(dateStr, days) {
    const d = /* @__PURE__ */ new Date(dateStr + "T00:00:00");
    d.setDate(d.getDate() + days);
    return getTodayString(d);
  }
  function calculateSM2(problem, grade, reviewDate = getTodayString(), ladder = DEFAULT_EBBINGHAUS_LADDER) {
    let rep = problem.repetition ?? 0;
    let ease = problem.easeFactor || 2.5;
    let nextInterval;
    switch (grade) {
      case 1:
        rep = 0;
        nextInterval = ladder[0] || 1;
        ease = Math.max(1.3, ease - 0.2);
        break;
      case 2:
        nextInterval = ladder[Math.min(rep, ladder.length - 1)] || 1;
        ease = Math.max(1.3, ease - 0.15);
        break;
      case 3:
        rep = rep + 1;
        if (rep < ladder.length) {
          nextInterval = ladder[rep];
        } else {
          const last = ladder[ladder.length - 1];
          nextInterval = Math.max(last + 15, Math.round(problem.interval * ease));
        }
        break;
      case 4:
        rep = rep + 2;
        if (rep < ladder.length) {
          nextInterval = ladder[rep];
        } else {
          const last = ladder[ladder.length - 1];
          nextInterval = Math.max(last + 30, Math.round(problem.interval * ease * 1.3));
        }
        ease = Math.min(3.5, ease + 0.15);
        break;
    }
    const nextReviewDate = addDays(reviewDate, nextInterval);
    return {
      repetition: rep,
      interval: nextInterval,
      easeFactor: Number(ease.toFixed(2)),
      nextReviewDate
    };
  }
  const DEFAULT_SETTINGS = {
    dailyTarget: 8,
    showLeetCodeFloatingWidget: true,
    theme: "dark",
    ladder: DEFAULT_EBBINGHAUS_LADDER,
    language: "system"
  };
  [
    {
      id: "lc-206",
      number: "206",
      title: "反转链表",
      slug: "reverse-linked-list",
      url: "https://leetcode.cn/problems/reverse-linked-list/",
      difficulty: "Easy",
      tags: ["链表", "双指针", "递归"],
      notes: "注意双指针迭代法中的 prev 初始化为 null，curr 指向 head。临时保存 curr.next。",
      createdAt: Date.now() - 1e3 * 60 * 60 * 24 * 7,
      repetition: 2,
      // 处于阶梯第3阶 (4天)
      interval: 4,
      easeFactor: 2.5,
      nextReviewDate: getTodayString(),
      lastReviewedDate: "2026-09-02",
      isSample: true,
      history: []
    },
    {
      id: "lc-15",
      number: "15",
      title: "三数之和",
      slug: "3sum",
      url: "https://leetcode.cn/problems/3sum/",
      difficulty: "Medium",
      tags: ["数组", "双指针", "排序"],
      notes: "先整体排序！外层固定 i，内层左右双指针。必须特别注意 i, left, right 的去重逻辑！",
      createdAt: Date.now() - 1e3 * 60 * 60 * 24 * 3,
      repetition: 1,
      // 处于第2阶 (2天)
      interval: 2,
      easeFactor: 2.5,
      nextReviewDate: getTodayString(),
      lastReviewedDate: "2026-09-04",
      isSample: true,
      history: []
    },
    {
      id: "lc-42",
      number: "42",
      title: "接雨水",
      slug: "trapping-rain-water",
      url: "https://leetcode.cn/problems/trapping-rain-water/",
      difficulty: "Hard",
      tags: ["双指针", "单调栈", "动态规划"],
      notes: "双指针法最优：leftMax 和 rightMax，维护较小的一侧向中间推进。",
      createdAt: Date.now() - 1e3 * 60 * 60 * 24 * 8,
      repetition: 1,
      interval: 2,
      easeFactor: 2.2,
      nextReviewDate: "2026-09-05",
      // 超期 1 天
      lastReviewedDate: "2026-09-03",
      isSample: true,
      history: []
    },
    {
      id: "lc-1",
      number: "1",
      title: "两数之和",
      slug: "two-sum",
      url: "https://leetcode.cn/problems/two-sum/",
      difficulty: "Easy",
      tags: ["哈希表", "数组"],
      notes: "HashMap 边查边存，空间换时间 O(N)。",
      createdAt: Date.now() - 1e3 * 60 * 60 * 24 * 15,
      repetition: 4,
      // 处于第5阶 (15天)
      interval: 15,
      easeFactor: 2.8,
      nextReviewDate: "2026-09-20",
      lastReviewedDate: "2026-09-05",
      isSample: true,
      history: []
    }
  ];
  var react = { exports: {} };
  var react_production_min = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var hasRequiredReact_production_min;
  function requireReact_production_min() {
    if (hasRequiredReact_production_min) return react_production_min;
    hasRequiredReact_production_min = 1;
    var l = Symbol.for("react.element"), n = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), q = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z = Symbol.iterator;
    function A(a) {
      if (null === a || "object" !== typeof a) return null;
      a = z && a[z] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var B = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } }, C = Object.assign, D = {};
    function E(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    E.prototype.isReactComponent = {};
    E.prototype.setState = function(a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {
    }
    F.prototype = E.prototype;
    function G(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    var H = G.prototype = new F();
    H.constructor = G;
    C(H, E.prototype);
    H.isPureReactComponent = true;
    var I = Array.isArray, J = Object.prototype.hasOwnProperty, K = { current: null }, L = { key: true, ref: true, __self: true, __source: true };
    function M(a, b, e) {
      var d, c = {}, k = null, h = null;
      if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (1 === g) c.children = e;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
        c.children = f;
      }
      if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
      return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
    }
    function N(a, b) {
      return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O(a) {
      return "object" === typeof a && null !== a && a.$$typeof === l;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    function Q(a, b) {
      return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
    }
    function R(a, b, e, d, c) {
      var k = typeof a;
      if ("undefined" === k || "boolean" === k) a = null;
      var h = false;
      if (null === a) h = true;
      else switch (k) {
        case "string":
        case "number":
          h = true;
          break;
        case "object":
          switch (a.$$typeof) {
            case l:
            case n:
              h = true;
          }
      }
      if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
        return a2;
      })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
      h = 0;
      d = "" === d ? "." : d + ":";
      if (I(a)) for (var g = 0; g < a.length; g++) {
        k = a[g];
        var f = d + Q(k, g);
        h += R(k, b, e, f, c);
      }
      else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
      else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
      return h;
    }
    function S(a, b, e) {
      if (null == a) return a;
      var d = [], c = 0;
      R(a, d, "", "", function(a2) {
        return b.call(e, a2, c++);
      });
      return d;
    }
    function T(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
        }, function(b2) {
          if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
        });
        -1 === a._status && (a._status = 0, a._result = b);
      }
      if (1 === a._status) return a._result.default;
      throw a._result;
    }
    var U = { current: null }, V = { transition: null }, W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
    function X() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    react_production_min.Children = { map: S, forEach: function(a, b, e) {
      S(a, function() {
        b.apply(this, arguments);
      }, e);
    }, count: function(a) {
      var b = 0;
      S(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return S(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
      return a;
    } };
    react_production_min.Component = E;
    react_production_min.Fragment = p;
    react_production_min.Profiler = r;
    react_production_min.PureComponent = G;
    react_production_min.StrictMode = q;
    react_production_min.Suspense = w;
    react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
    react_production_min.act = X;
    react_production_min.cloneElement = function(a, b, e) {
      if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
      var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
      if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = K.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (1 === f) d.children = e;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
        d.children = g;
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
    };
    react_production_min.createContext = function(a) {
      a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      a.Provider = { $$typeof: t, _context: a };
      return a.Consumer = a;
    };
    react_production_min.createElement = M;
    react_production_min.createFactory = function(a) {
      var b = M.bind(null, a);
      b.type = a;
      return b;
    };
    react_production_min.createRef = function() {
      return { current: null };
    };
    react_production_min.forwardRef = function(a) {
      return { $$typeof: v, render: a };
    };
    react_production_min.isValidElement = O;
    react_production_min.lazy = function(a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
    };
    react_production_min.memo = function(a, b) {
      return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
    };
    react_production_min.startTransition = function(a) {
      var b = V.transition;
      V.transition = {};
      try {
        a();
      } finally {
        V.transition = b;
      }
    };
    react_production_min.unstable_act = X;
    react_production_min.useCallback = function(a, b) {
      return U.current.useCallback(a, b);
    };
    react_production_min.useContext = function(a) {
      return U.current.useContext(a);
    };
    react_production_min.useDebugValue = function() {
    };
    react_production_min.useDeferredValue = function(a) {
      return U.current.useDeferredValue(a);
    };
    react_production_min.useEffect = function(a, b) {
      return U.current.useEffect(a, b);
    };
    react_production_min.useId = function() {
      return U.current.useId();
    };
    react_production_min.useImperativeHandle = function(a, b, e) {
      return U.current.useImperativeHandle(a, b, e);
    };
    react_production_min.useInsertionEffect = function(a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    react_production_min.useLayoutEffect = function(a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    react_production_min.useMemo = function(a, b) {
      return U.current.useMemo(a, b);
    };
    react_production_min.useReducer = function(a, b, e) {
      return U.current.useReducer(a, b, e);
    };
    react_production_min.useRef = function(a) {
      return U.current.useRef(a);
    };
    react_production_min.useState = function(a) {
      return U.current.useState(a);
    };
    react_production_min.useSyncExternalStore = function(a, b, e) {
      return U.current.useSyncExternalStore(a, b, e);
    };
    react_production_min.useTransition = function() {
      return U.current.useTransition();
    };
    react_production_min.version = "18.3.1";
    return react_production_min;
  }
  var react_development = { exports: {} };
  /**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  react_development.exports;
  var hasRequiredReact_development;
  function requireReact_development() {
    if (hasRequiredReact_development) return react_development.exports;
    hasRequiredReact_development = 1;
    (function(module, exports2) {
      if (process.env.NODE_ENV !== "production") {
        (function() {
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
          }
          var ReactVersion = "18.3.1";
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: null
          };
          var ReactCurrentActQueue = {
            current: null,
            // Used to reproduce behavior of `batchedUpdates` in legacy mode.
            isBatchingLegacy: false,
            didScheduleLegacyUpdate: false
          };
          var ReactCurrentOwner = {
            /**
             * @internal
             * @type {ReactComponent}
             */
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var ReactSharedInternals = {
            ReactCurrentDispatcher,
            ReactCurrentBatchConfig,
            ReactCurrentOwner
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
            ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
          }
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            /**
             * Checks whether or not this composite component is mounted.
             * @param {ReactClass} publicInstance The instance we want to test.
             * @return {boolean} True if mounted, false otherwise.
             * @protected
             * @final
             */
            isMounted: function(publicInstance) {
              return false;
            },
            /**
             * Forces an update. This should only be invoked when it is known with
             * certainty that we are **not** in a DOM transaction.
             *
             * You may want to call this when you know that some deeper aspect of the
             * component's state has changed but `setState` was not called.
             *
             * This will not invoke `shouldComponentUpdate`, but it will invoke
             * `componentWillUpdate` and `componentDidUpdate`.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueForceUpdate: function(publicInstance, callback, callerName) {
              warnNoop(publicInstance, "forceUpdate");
            },
            /**
             * Replaces all of the state. Always use this or `setState` to mutate state.
             * You should treat `this.state` as immutable.
             *
             * There is no guarantee that `this.state` will be immediately updated, so
             * accessing `this.state` after calling this method may return the old value.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} completeState Next state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} callerName name of the calling function in the public API.
             * @internal
             */
            enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
              warnNoop(publicInstance, "replaceState");
            },
            /**
             * Sets a subset of the state. This only exists because _pendingState is
             * internal. This provides a merging strategy that is not available to deep
             * properties which is confusing. TODO: Expose pendingState or don't use it
             * during the merge.
             *
             * @param {ReactClass} publicInstance The instance that should rerender.
             * @param {object} partialState Next partial state to be merged with state.
             * @param {?function} callback Called after component is updated.
             * @param {?string} Name of the calling function in the public API.
             * @internal
             */
            enqueueSetState: function(publicInstance, partialState, callback, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var assign = Object.assign;
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component.prototype.isReactComponent = {};
          Component.prototype.setState = function(partialState, callback) {
            if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
              throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
            this.updater.enqueueSetState(this, partialState, callback, "setState");
          };
          Component.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function(methodName, info) {
              Object.defineProperty(Component.prototype, methodName, {
                get: function() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component.prototype;
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent;
          assign(pureComponentPrototype, Component.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element = {
              // This tag allows us to uniquely identify this as a React Element
              $$typeof: REACT_ELEMENT_TYPE,
              // Built-in properties that belong on the element
              type,
              key,
              ref,
              props,
              // Record the component responsible for creating this element.
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element.props);
                Object.freeze(element);
              }
            }
            return element;
          };
          function createElement(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self = null;
            var source = null;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config);
                }
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              self = config.__self === void 0 ? null : config.__self;
              source = config.__source === void 0 ? null : config.__source;
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              {
                if (Object.freeze) {
                  Object.freeze(childArray);
                }
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement(element, config, children) {
            if (element === null || element === void 0) {
              throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
            var propName;
            var props = assign({}, element.props);
            var key = element.key;
            var ref = element.ref;
            var self = element._self;
            var source = element._source;
            var owner = element._owner;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              var defaultProps;
              if (element.type && element.type.defaultProps) {
                defaultProps = element.type.defaultProps;
              }
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config[propName];
                  }
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self, source, owner, props);
          }
          function isValidElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match) {
              return escaperLookup[match];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text) {
            return text.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element, index) {
            if (typeof element === "object" && element !== null && element.key != null) {
              {
                checkKeyStringCoercion(element.key);
              }
              return escape("" + element.key);
            }
            return index.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = typeof children;
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (isArray(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                  return c;
                });
              } else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                  {
                    if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                      checkKeyStringCoercion(mappedChild.key);
                    }
                  }
                  mappedChild = cloneAndReplaceKey(
                    mappedChild,
                    // Keep both the (mapped) and old keys if they differ, just as
                    // traverseAllChildren used to do for objects as children
                    escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                    (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                      // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                      // eslint-disable-next-line react-internal/safe-string-coercion
                      escapeUserProvidedKey("" + mappedChild.key) + "/"
                    ) : "") + childKey
                  );
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getElementKey(child, i);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else if (type === "object") {
                var childrenString = String(children);
                throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement(children)) {
              throw new Error("React.Children.only expected to receive a single React element child.");
            }
            return children;
          }
          function createContext(defaultValue) {
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
              // As a workaround to support multiple concurrent renderers, we categorize
              // some renderers as primary and others as secondary. We only expect
              // there to be two concurrent renderers at most: React Native (primary) and
              // Fabric (secondary); React DOM (primary) and React ART (secondary).
              // Secondary renderers store their context values on separate fields.
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              // Used to track how many concurrent renderers this context currently
              // supports within in a single renderer. Such as parallel server rendering.
              _threadCount: 0,
              // These are circular
              Provider: null,
              Consumer: null,
              // Add these to use same hidden class in VM as ServerContext
              _defaultValue: null,
              _globalName: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function() {
                    return context._currentValue;
                  },
                  set: function(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function() {
                    return context._currentValue2;
                  },
                  set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function() {
                    return context._threadCount;
                  },
                  set: function(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function() {
                    return context.displayName;
                  },
                  set: function(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              thenable.then(function(moduleObject2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = moduleObject2;
                }
              }, function(error2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
              if (payload._status === Uninitialized) {
                var pending = payload;
                pending._status = Pending;
                pending._result = thenable;
              }
            }
            if (payload._status === Resolved) {
              var moduleObject = payload._result;
              {
                if (moduleObject === void 0) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
                }
              }
              {
                if (!("default" in moduleObject)) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                }
              }
              return moduleObject.default;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              // We use these fields to store the result.
              _status: Uninitialized,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function() {
                    return defaultProps;
                  },
                  set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function() {
                    return propTypes;
                  },
                  set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!render.name && !render.displayName) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
              // types supported by any Flight configuration anywhere since
              // we don't know which Flight build this will end up being used
              // with.
              type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function memo(type, compare) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: compare === void 0 ? null : compare
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!type.name && !type.displayName) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            {
              if (dispatcher === null) {
                error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext(Context) {
            var dispatcher = resolveDispatcher();
            {
              if (Context._context !== void 0) {
                var realContext = Context._context;
                if (realContext.Consumer === Context) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context);
          }
          function useState(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create, deps);
          }
          function useInsertionEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useInsertionEffect(create, deps);
          }
          function useLayoutEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create, deps);
          }
          function useCallback(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
          }
          function useMemo(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create, deps);
          }
          function useImperativeHandle(ref, create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          function useTransition() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useTransition();
          }
          function useDeferredValue(value) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDeferredValue(value);
          }
          function useId() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useId();
          }
          function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component2) {
            var prototype = Component2.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
              // Inner props are checked in the reconciler.
              type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element = createElement.apply(this, arguments);
            if (element == null) {
              return element;
            }
            if (validType) {
              for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], type);
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
                    value: type
                  });
                  return type;
                }
              });
            }
            return validatedFactory;
          }
          function cloneElementWithValidation(element, props, children) {
            var newElement = cloneElement.apply(this, arguments);
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
          }
          function startTransition(scope, options) {
            var prevTransition = ReactCurrentBatchConfig.transition;
            ReactCurrentBatchConfig.transition = {};
            var currentTransition = ReactCurrentBatchConfig.transition;
            {
              ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
            }
            try {
              scope();
            } finally {
              ReactCurrentBatchConfig.transition = prevTransition;
              {
                if (prevTransition === null && currentTransition._updatedFibers) {
                  var updatedFibersCount = currentTransition._updatedFibers.size;
                  if (updatedFibersCount > 10) {
                    warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                  }
                  currentTransition._updatedFibers.clear();
                }
              }
            }
          }
          var didWarnAboutMessageChannel = false;
          var enqueueTaskImpl = null;
          function enqueueTask(task) {
            if (enqueueTaskImpl === null) {
              try {
                var requireString = ("require" + Math.random()).slice(0, 7);
                var nodeRequire = module && module[requireString];
                enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
              } catch (_err) {
                enqueueTaskImpl = function(callback) {
                  {
                    if (didWarnAboutMessageChannel === false) {
                      didWarnAboutMessageChannel = true;
                      if (typeof MessageChannel === "undefined") {
                        error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                      }
                    }
                  }
                  var channel = new MessageChannel();
                  channel.port1.onmessage = callback;
                  channel.port2.postMessage(void 0);
                };
              }
            }
            return enqueueTaskImpl(task);
          }
          var actScopeDepth = 0;
          var didWarnNoAwaitAct = false;
          function act(callback) {
            {
              var prevActScopeDepth = actScopeDepth;
              actScopeDepth++;
              if (ReactCurrentActQueue.current === null) {
                ReactCurrentActQueue.current = [];
              }
              var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
              var result;
              try {
                ReactCurrentActQueue.isBatchingLegacy = true;
                result = callback();
                if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                  var queue = ReactCurrentActQueue.current;
                  if (queue !== null) {
                    ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                    flushActQueue(queue);
                  }
                }
              } catch (error2) {
                popActScope(prevActScopeDepth);
                throw error2;
              } finally {
                ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
              }
              if (result !== null && typeof result === "object" && typeof result.then === "function") {
                var thenableResult = result;
                var wasAwaited = false;
                var thenable = {
                  then: function(resolve, reject) {
                    wasAwaited = true;
                    thenableResult.then(function(returnValue2) {
                      popActScope(prevActScopeDepth);
                      if (actScopeDepth === 0) {
                        recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                      } else {
                        resolve(returnValue2);
                      }
                    }, function(error2) {
                      popActScope(prevActScopeDepth);
                      reject(error2);
                    });
                  }
                };
                {
                  if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                    Promise.resolve().then(function() {
                    }).then(function() {
                      if (!wasAwaited) {
                        didWarnNoAwaitAct = true;
                        error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                      }
                    });
                  }
                }
                return thenable;
              } else {
                var returnValue = result;
                popActScope(prevActScopeDepth);
                if (actScopeDepth === 0) {
                  var _queue = ReactCurrentActQueue.current;
                  if (_queue !== null) {
                    flushActQueue(_queue);
                    ReactCurrentActQueue.current = null;
                  }
                  var _thenable = {
                    then: function(resolve, reject) {
                      if (ReactCurrentActQueue.current === null) {
                        ReactCurrentActQueue.current = [];
                        recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                      } else {
                        resolve(returnValue);
                      }
                    }
                  };
                  return _thenable;
                } else {
                  var _thenable2 = {
                    then: function(resolve, reject) {
                      resolve(returnValue);
                    }
                  };
                  return _thenable2;
                }
              }
            }
          }
          function popActScope(prevActScopeDepth) {
            {
              if (prevActScopeDepth !== actScopeDepth - 1) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
              actScopeDepth = prevActScopeDepth;
            }
          }
          function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
            {
              var queue = ReactCurrentActQueue.current;
              if (queue !== null) {
                try {
                  flushActQueue(queue);
                  enqueueTask(function() {
                    if (queue.length === 0) {
                      ReactCurrentActQueue.current = null;
                      resolve(returnValue);
                    } else {
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    }
                  });
                } catch (error2) {
                  reject(error2);
                }
              } else {
                resolve(returnValue);
              }
            }
          }
          var isFlushing = false;
          function flushActQueue(queue) {
            {
              if (!isFlushing) {
                isFlushing = true;
                var i = 0;
                try {
                  for (; i < queue.length; i++) {
                    var callback = queue[i];
                    do {
                      callback = callback(true);
                    } while (callback !== null);
                  }
                  queue.length = 0;
                } catch (error2) {
                  queue = queue.slice(i + 1);
                  throw error2;
                } finally {
                  isFlushing = false;
                }
              }
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray,
            only: onlyChild
          };
          exports2.Children = Children;
          exports2.Component = Component;
          exports2.Fragment = REACT_FRAGMENT_TYPE;
          exports2.Profiler = REACT_PROFILER_TYPE;
          exports2.PureComponent = PureComponent;
          exports2.StrictMode = REACT_STRICT_MODE_TYPE;
          exports2.Suspense = REACT_SUSPENSE_TYPE;
          exports2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports2.act = act;
          exports2.cloneElement = cloneElement$1;
          exports2.createContext = createContext;
          exports2.createElement = createElement$1;
          exports2.createFactory = createFactory;
          exports2.createRef = createRef;
          exports2.forwardRef = forwardRef;
          exports2.isValidElement = isValidElement;
          exports2.lazy = lazy;
          exports2.memo = memo;
          exports2.startTransition = startTransition;
          exports2.unstable_act = act;
          exports2.useCallback = useCallback;
          exports2.useContext = useContext;
          exports2.useDebugValue = useDebugValue;
          exports2.useDeferredValue = useDeferredValue;
          exports2.useEffect = useEffect;
          exports2.useId = useId;
          exports2.useImperativeHandle = useImperativeHandle;
          exports2.useInsertionEffect = useInsertionEffect;
          exports2.useLayoutEffect = useLayoutEffect;
          exports2.useMemo = useMemo;
          exports2.useReducer = useReducer;
          exports2.useRef = useRef;
          exports2.useState = useState;
          exports2.useSyncExternalStore = useSyncExternalStore;
          exports2.useTransition = useTransition;
          exports2.version = ReactVersion;
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
          }
        })();
      }
    })(react_development, react_development.exports);
    return react_development.exports;
  }
  if (process.env.NODE_ENV === "production") {
    react.exports = requireReact_production_min();
  } else {
    react.exports = requireReact_development();
  }
  var reactExports = react.exports;
  const translations = {
    zh: {
      // App & Header
      "app.title": "LeetCode 艾宾浩斯",
      "app.subtitle": "间隔重复 · 科学掌握算法",
      "app.addTooltip": "手动录入新题",
      "app.settingsTooltip": "设置与数据管理",
      "header.todayProgress": "今日复习进度",
      "header.tasksCount": "{completed} / {total} 题",
      "header.progressAria": "今日复习完成度",
      "header.streak": "连续 {n} 天",
      "header.retention": "总留存率:",
      "header.library": "题库:",
      "header.unitProblem": "题",
      "tab.due": "今日待办",
      "tab.completed": "已完成",
      "tab.library": "题库档案",
      "tab.calendar": "日历负荷",
      "tab.navAria": "复习视图导航",
      "app.loading": "加载艾宾浩斯记忆库...",
      // Ingestion Banner (App.tsx)
      "banner.detected": "检测到力扣当前页：#{number} {title}",
      "banner.import": "一键收录",
      "banner.alreadyTracked": "当前页面题目已在艾宾浩斯复习库中",
      "banner.trackedBadge": "已跟踪",
      // Due Queue
      "due.overdueAlert": "有 {count} 道题目已超期，建议趁热打铁优先重做！",
      // Zero Inbox
      "zero.title": "今日复习任务已全部清空！",
      "zero.description": "艾宾浩斯记忆模型处于最佳留存点。保持专注与连续打卡，让算法直觉自然沉淀。",
      "zero.solveNew": "去力扣刷一道新题",
      "zero.browseLibrary": "浏览题库档案库",
      // Problem Card
      "card.openLeetCode": "在力扣中打开",
      "card.openLeetCodeAria": "在力扣中打开题目 #{number} {title}",
      "card.overdue": "超期 {days} 天",
      "card.dueToday": "今日到期",
      "card.sampleBadge": "示例",
      "card.stage": "阶段 第 {stage} 阶",
      "card.interval": "间隔 {interval}d",
      "card.retention": "留存 {rate}%",
      "card.retentionTooltip": "预估记忆强度",
      "card.notesTitle": "解题思路卡片",
      "card.notesAriaExpand": "查看解题思路卡片",
      "card.notesAriaCollapse": "收起解题思路卡片",
      "card.deleteConfirm": "确定从艾宾浩斯复习库中删除题目 #{number} {title} 吗？",
      "card.deleteTooltip": "删除此题",
      "card.deleteAria": "从艾宾浩斯复习库中删除题目 #{number} {title}",
      "card.feedbackLabel": "掌握度反馈:",
      "card.gradeAria": "掌握度评定为{name}（{sub}），下次复习将在{days}",
      // Grades
      "grade.again.name": "重来",
      "grade.again.sub": "完全卡壳",
      "grade.hard.name": "困难",
      "grade.hard.sub": "勉强写出",
      "grade.good.name": "良好",
      "grade.good.sub": "独立AC",
      "grade.easy.name": "简单",
      "grade.easy.sub": "秒杀跳阶",
      "grade.daysSuffix": "{n}天后",
      // Completed List
      "completed.emptyTitle": "今日尚未完成任何复习",
      "completed.emptyDesc": "在「今日待办」中完成做题并点击掌握度评定即可记录。",
      "completed.countToday": "今日已打卡 {count} 题",
      "completed.nextStage": "已进入下阶段",
      "completed.nextReview": "下次复习日: {date}",
      // Problem Library
      "library.searchPlaceholder": "搜索题号、题目名、算法标签...",
      "library.searchAria": "搜索题号、题目名或算法标签",
      "library.filterDiffAria": "按难度筛选",
      "library.filterAll": "全部",
      "library.sortAria": "题目排序规则",
      "library.sortNextDate": "下次复习",
      "library.sortNumber": "力扣题号",
      "library.sortRepetition": "复习轮次",
      "library.matchCount": "共匹配 {count} 道题目",
      "library.emptyLibraryTitle": "题库当前已清空（0 道题）",
      "library.emptyLibraryDesc": "你已清除所有题目。可以在力扣网页右下角点击悬浮胶囊一键收录，或点击右上角「+ 录入题目」添加新题！",
      "library.noMatch": "没有找到匹配的题目",
      "library.nextLabel": "下次: {date}",
      "library.deleteBtn": "删除",
      "library.deleteConfirm": "确定从记忆库中删除题目 #{number} {title} 吗？",
      // Calendar Forecast
      "calendar.loadTitle": "未来 7 天复习负荷分布",
      "calendar.totalDue": "共 {count} 题待复习",
      "calendar.today": "今日",
      "calendar.tomorrow": "明天",
      "calendar.weekdays": "周日,周一,周二,周三,周四,周五,周六",
      "calendar.healthTitle": "题库记忆留存健康度",
      "calendar.totalTracked": "总计 {count} 题",
      "calendar.strong": "牢固 (>80%)",
      "calendar.moderate": "稳步 (50-80%)",
      "calendar.critical": "临界 (<50%)",
      "calendar.strongTooltip": "牢固掌握: {count} 题",
      "calendar.moderateTooltip": "稳步记忆: {count} 题",
      "calendar.criticalTooltip": "临界遗忘: {count} 题",
      // Add Problem Modal
      "add.modalTitle": "智能自动导入题目",
      "add.closeAria": "关闭导入窗口",
      "add.inputLabel": "输入题号、题目名或粘贴力扣链接：",
      "add.inputPlaceholder": "例如 206 / 两数之和 / 粘贴网址",
      "add.fetchBtn": "自动解析",
      "add.notFound": "未找到匹配的力扣题目，请检查题号（如 206）或完整题目链接",
      "add.networkError": "网络解析失败，请检查网络或使用手动录入",
      "add.metaSuccess": "已自动识别力扣官方元数据",
      "add.notesLabel": "思路卡片 / 核心破局要点 (选填)",
      "add.notesPlaceholder": "可记录关键算法套路或易错点...",
      "add.submitBtn": "立即纳入艾宾浩斯复习计划",
      "add.manualToggle": "非力扣题目？点击展开纯手动模式",
      "add.manualNumberLabel": "编号",
      "add.manualNumberPlaceholder": "题号",
      "add.manualTitleLabel": "题目名称 *",
      "add.manualTitlePlaceholder": "题目名称",
      "add.manualTagsPlaceholder": "标签 (例如 动态规划, 背包)",
      "add.manualSubmit": "添加手动卡片",
      // Settings Modal
      "settings.title": "复习算法设置与数据管理",
      "settings.closeAria": "关闭设置窗口",
      "settings.languageSection": "界面语言 / Language",
      "settings.langSystem": "跟随系统 / Auto",
      "settings.langZh": "🇨🇳 简体中文",
      "settings.langEn": "🇺🇸 English",
      "settings.ladderTitle": "艾宾浩斯复习阶梯 (天数序列)",
      "settings.ladderReset": "恢复标准",
      "settings.ladderDesc": "每次良好(Good)解答稳步前进1阶，秒杀(Easy)跳跃2阶，完全遗忘(Again)退回第1阶。",
      "settings.ladderPlaceholder": "例如 1, 2, 4, 7, 15, 30, 60, 120",
      "settings.ladderSave": "保存",
      "settings.ladderError": "阶梯至少需要包含 2 个递增天数！",
      "settings.ladderSaved": "已更新艾宾浩斯复习阶梯: [{ladder}] 天",
      "settings.ladderRestored": "已恢复默认标准阶梯：[1, 2, 4, 7, 15, 30, 60, 120] 天",
      "settings.backupTitle": "数据备份与迁移",
      "settings.exportBtn": "导出题库备份",
      "settings.exportSuccess": "数据已成功导出为 JSON 文件！",
      "settings.importBtn": "导入备份文件",
      "settings.importSuccess": "题库备份导入成功！",
      "settings.importFailed": "导入失败：JSON 格式不正确",
      "settings.manageTitle": "题库管理与重置",
      "settings.clearSampleBtn": "一键移除预置示例题目 (保留自选题)",
      "settings.clearSampleConfirm": "确定清除预设的示例题目吗？(您自己添加的题目将被保留)",
      "settings.clearSampleSuccess": "已成功清除 {count} 道初始预置示例题目！",
      "settings.clearSampleNone": "题库中没有检测到预设的示例题目。",
      "settings.reloadSampleBtn": "重新载入初始示例题目",
      "settings.reloadSampleConfirm": "是否重新加载默认演示题目数据？",
      "settings.reloadSampleSuccess": "已载入演示数据！",
      "settings.clearAllBtn": "清空全部题目数据",
      "settings.clearAllConfirm": "⚠️ 警告：确定清空全部题库吗？该操作不可撤销，建议先导出备份！",
      "settings.clearAllSuccess": "题库已全部清空！",
      // Content Script Floating Capsule
      "capsule.pillTracked": "🧠 艾宾浩斯: 第{stage}阶 ({interval}d)",
      "capsule.pillUntracked": "🧠 艾宾浩斯: 一键收录",
      "capsule.panelTitleTracked": "🧠 艾宾浩斯复习",
      "capsule.panelTitleUntracked": "🧠 艾宾浩斯复习计划",
      "capsule.autoAcBanner": "🎉 检测到提交通过！已自动记录。",
      "capsule.currentStage": "当前阶段：第 {stage} 阶 (间隔 {interval} 天)",
      "capsule.nextReview": "下次复习：{date}",
      "capsule.reviewedToday": "✅ 今日复习已打卡！",
      "capsule.dueToday": "⏱️ 今日待做题并评定",
      "capsule.doneBanner": "🎉 记忆已刷新至下个周期！",
      "capsule.ratePrompt": "做完后评定记忆熟练度：",
      "capsule.trackingFooter": "艾宾浩斯跟踪中",
      "capsule.removeBtn": "从复习库移除此题",
      "capsule.removeConfirm": "确定从艾宾浩斯复习库中移除题目 #{number} {title} 吗？",
      "capsule.untrackedDesc": "已自动识别题目信息。点击下方按钮即可一键纳入，明天准时开启第 1 轮复习！",
      "capsule.notesPlaceholder": "关键解题思路或易错点卡片 (选填)...",
      "capsule.submitAdd": "🚀 一键纳入艾宾浩斯复习",
      "capsule.autoAcNotes": "做题提交通过，自动收录"
    },
    en: {
      // App & Header
      "app.title": "LeetCode Ebbinghaus",
      "app.subtitle": "Spaced Repetition · Algorithmic Mastery",
      "app.addTooltip": "Add New Problem",
      "app.settingsTooltip": "Settings & Data",
      "header.todayProgress": "Today's Review Progress",
      "header.tasksCount": "{completed} / {total} due",
      "header.progressAria": "Today's review completion progress",
      "header.streak": "{n}-day streak",
      "header.retention": "Retention:",
      "header.library": "Tracked:",
      "header.unitProblem": "probs",
      "tab.due": "Due Today",
      "tab.completed": "Completed",
      "tab.library": "Library",
      "tab.calendar": "Forecast",
      "tab.navAria": "Review view navigation",
      "app.loading": "Loading review library...",
      // Ingestion Banner (App.tsx)
      "banner.detected": "Detected LeetCode tab: #{number} {title}",
      "banner.import": "One-Click Add",
      "banner.alreadyTracked": "This problem is already in your review schedule",
      "banner.trackedBadge": "Tracked",
      // Due Queue
      "due.overdueAlert": "{count} problem(s) overdue! Refresh them while memories are fresh.",
      // Zero Inbox
      "zero.title": "All Reviews Completed for Today!",
      "zero.description": "Your memory retention is optimal. Keep up the daily streak to build lasting algorithmic intuition.",
      "zero.solveNew": "Solve a New Problem on LeetCode",
      "zero.browseLibrary": "Browse Problem Library",
      // Problem Card
      "card.openLeetCode": "Open in LeetCode",
      "card.openLeetCodeAria": "Open problem #{number} {title} in LeetCode",
      "card.overdue": "{days}d overdue",
      "card.dueToday": "Due today",
      "card.sampleBadge": "Demo",
      "card.stage": "Stage {stage}",
      "card.interval": "Interval {interval}d",
      "card.retention": "Retention {rate}%",
      "card.retentionTooltip": "Estimated retention rate",
      "card.notesTitle": "Solution Notes Card",
      "card.notesAriaExpand": "View solution notes",
      "card.notesAriaCollapse": "Hide solution notes",
      "card.deleteConfirm": "Remove problem #{number} {title} from your review list?",
      "card.deleteTooltip": "Delete problem",
      "card.deleteAria": "Remove problem #{number} {title} from review list",
      "card.feedbackLabel": "Recall Feedback:",
      "card.gradeAria": "Rate as {name} ({sub}), next review in {days}",
      // Grades
      "grade.again.name": "Again",
      "grade.again.sub": "Blackout",
      "grade.hard.name": "Hard",
      "grade.hard.sub": "Struggled",
      "grade.good.name": "Good",
      "grade.good.sub": "Solved AC",
      "grade.easy.name": "Easy",
      "grade.easy.sub": "Speedrun",
      "grade.daysSuffix": "in {n}d",
      // Completed List
      "completed.emptyTitle": "No reviews completed today yet",
      "completed.emptyDesc": 'Finish due problems in "Due Today" and rate your recall proficiency to log them.',
      "completed.countToday": "{count} problem(s) reviewed today",
      "completed.nextStage": "Moved to next stage",
      "completed.nextReview": "Next review: {date}",
      // Problem Library
      "library.searchPlaceholder": "Search by #, title, tag, notes...",
      "library.searchAria": "Search problems by number, title, or tag",
      "library.filterDiffAria": "Filter by difficulty",
      "library.filterAll": "All",
      "library.sortAria": "Problem sorting order",
      "library.sortNextDate": "Next Review",
      "library.sortNumber": "Problem #",
      "library.sortRepetition": "Stage Ladder",
      "library.matchCount": "{count} problem(s) found",
      "library.emptyLibraryTitle": "Library is currently empty (0 problems)",
      "library.emptyLibraryDesc": 'All problems have been cleared. You can track problems via the floating capsule on LeetCode or by clicking the "+" button above!',
      "library.noMatch": "No matching problems found",
      "library.nextLabel": "Next: {date}",
      "library.deleteBtn": "Delete",
      "library.deleteConfirm": "Remove problem #{number} {title} from library?",
      // Calendar Forecast
      "calendar.loadTitle": "Next 7-Day Review Load Distribution",
      "calendar.totalDue": "{count} problem(s) scheduled",
      "calendar.today": "Today",
      "calendar.tomorrow": "Tmrw",
      "calendar.weekdays": "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
      "calendar.healthTitle": "Memory Retention Health",
      "calendar.totalTracked": "{count} total problem(s)",
      "calendar.strong": "Strong (>80%)",
      "calendar.moderate": "Moderate (50-80%)",
      "calendar.critical": "Critical (<50%)",
      "calendar.strongTooltip": "Strong: {count} problem(s)",
      "calendar.moderateTooltip": "Moderate: {count} problem(s)",
      "calendar.criticalTooltip": "Critical: {count} problem(s)",
      // Add Problem Modal
      "add.modalTitle": "Auto-Import LeetCode Problem",
      "add.closeAria": "Close import dialog",
      "add.inputLabel": "Enter problem #, title, or paste LeetCode URL:",
      "add.inputPlaceholder": "e.g. 206 / two-sum / paste URL",
      "add.fetchBtn": "Fetch Meta",
      "add.notFound": "No matching LeetCode problem found. Please check the problem number (e.g. 206) or URL.",
      "add.networkError": "Network request failed. Please check your connection or use manual entry.",
      "add.metaSuccess": "LeetCode metadata successfully detected",
      "add.notesLabel": "Solution Notes / Core Takeaways (Optional)",
      "add.notesPlaceholder": "Key algorithm patterns, pitfalls, or insights...",
      "add.submitBtn": "Add to Spaced Repetition Plan",
      "add.manualToggle": "Non-LeetCode problem? Switch to manual mode",
      "add.manualNumberLabel": "Number",
      "add.manualNumberPlaceholder": "Prob #",
      "add.manualTitleLabel": "Problem Title *",
      "add.manualTitlePlaceholder": "Problem Title",
      "add.manualTagsPlaceholder": "Tags (e.g. Dynamic Programming, DFS)",
      "add.manualSubmit": "Add Custom Problem",
      // Settings Modal
      "settings.title": "Settings & Data Management",
      "settings.closeAria": "Close settings",
      "settings.languageSection": "Language / 界面语言",
      "settings.langSystem": "System Default",
      "settings.langZh": "🇨🇳 简体中文",
      "settings.langEn": "🇺🇸 English",
      "settings.ladderTitle": "Ebbinghaus Review Ladder (Day Intervals)",
      "settings.ladderReset": "Reset Default",
      "settings.ladderDesc": "Good advances +1 stage, Easy jumps +2 stages, Again resets to stage 1.",
      "settings.ladderPlaceholder": "e.g. 1, 2, 4, 7, 15, 30, 60, 120",
      "settings.ladderSave": "Save",
      "settings.ladderError": "Ladder must contain at least 2 increasing positive numbers!",
      "settings.ladderSaved": "Updated interval ladder: [{ladder}] days",
      "settings.ladderRestored": "Reset to default standard ladder: [1, 2, 4, 7, 15, 30, 60, 120] days",
      "settings.backupTitle": "Data Backup & Migration",
      "settings.exportBtn": "Export Backup (JSON)",
      "settings.exportSuccess": "Data successfully exported as JSON file!",
      "settings.importBtn": "Import Backup (JSON)",
      "settings.importSuccess": "Problem library backup imported successfully!",
      "settings.importFailed": "Import failed: Invalid JSON format",
      "settings.manageTitle": "Library Management & Reset",
      "settings.clearSampleBtn": "Remove Demo Problems (Keep Custom)",
      "settings.clearSampleConfirm": "Remove preset demo problems? (Your custom problems will be kept)",
      "settings.clearSampleSuccess": "Successfully removed {count} demo problem(s)!",
      "settings.clearSampleNone": "No demo problems detected in library.",
      "settings.reloadSampleBtn": "Reload Default Demo Problems",
      "settings.reloadSampleConfirm": "Reload default demo problems into library?",
      "settings.reloadSampleSuccess": "Demo problems reloaded!",
      "settings.clearAllBtn": "Clear All Problems",
      "settings.clearAllConfirm": "⚠️ Warning: Clear all problems? This cannot be undone! Please export a backup first.",
      "settings.clearAllSuccess": "All problem data cleared!",
      // Content Script Floating Capsule
      "capsule.pillTracked": "🧠 Ebbinghaus: Stage {stage} ({interval}d)",
      "capsule.pillUntracked": "🧠 Ebbinghaus: Track Problem",
      "capsule.panelTitleTracked": "🧠 Spaced Review",
      "capsule.panelTitleUntracked": "🧠 Spaced Repetition",
      "capsule.autoAcBanner": "🎉 Submission Accepted! Automatically tracked.",
      "capsule.currentStage": "Current Stage: Stage {stage} ({interval}d interval)",
      "capsule.nextReview": "Next Review: {date}",
      "capsule.reviewedToday": "✅ Reviewed today!",
      "capsule.dueToday": "⏱️ Due today - review & rate",
      "capsule.doneBanner": "🎉 Memory schedule advanced to next cycle!",
      "capsule.ratePrompt": "Rate recall proficiency after solving:",
      "capsule.trackingFooter": "Tracking in Ebbinghaus",
      "capsule.removeBtn": "Remove from review list",
      "capsule.removeConfirm": "Remove #{number} {title} from your review list?",
      "capsule.untrackedDesc": "Problem details detected. Click below to add to your spaced repetition schedule starting tomorrow!",
      "capsule.notesPlaceholder": "Key algorithm notes, pitfalls, or insights (optional)...",
      "capsule.submitAdd": "🚀 Track in Spaced Repetition",
      "capsule.autoAcNotes": "Accepted on submission, auto-tracked"
    }
  };
  function resolveLanguage(lang = "system", hostname) {
    if (lang === "zh" || lang === "en") return lang;
    if (hostname) {
      if (hostname.includes("leetcode.com")) return "en";
      if (hostname.includes("leetcode.cn")) return "zh";
    }
    if (typeof navigator !== "undefined" && navigator.language) {
      return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    }
    return "zh";
  }
  function translate(lang, key, params) {
    const dict = translations[lang] || translations.zh;
    let text = dict[key] || translations.zh[key] || key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.split(`{${k}}`).join(String(v));
      }
    }
    return text;
  }
  function createI18n(resolvedLang) {
    return {
      lang: resolvedLang,
      t: (key, params) => translate(resolvedLang, key, params)
    };
  }
  function formatNextDays(days, lang) {
    return translate(lang, "grade.daysSuffix", { n: days });
  }
  function getLocalizedGradeMeta(grade, rep, interval, ladder = DEFAULT_EBBINGHAUS_LADDER, lang = "zh") {
    let nextDaysNumber;
    switch (grade) {
      case 1:
        nextDaysNumber = ladder[0] || 1;
        break;
      case 2:
        nextDaysNumber = ladder[Math.min(rep, ladder.length - 1)] || 1;
        break;
      case 3:
        const nextIdx3 = rep + 1;
        nextDaysNumber = nextIdx3 < ladder.length ? ladder[nextIdx3] : Math.round(interval * 2.5);
        break;
      case 4:
        const nextIdx4 = rep + 2;
        nextDaysNumber = nextIdx4 < ladder.length ? ladder[nextIdx4] : Math.round(interval * 3.2);
        break;
    }
    const gradeKey = { 1: "again", 2: "hard", 3: "good", 4: "easy" }[grade];
    return {
      grade,
      name: translate(lang, `grade.${gradeKey}.name`),
      sub: translate(lang, `grade.${gradeKey}.sub`),
      nextDays: formatNextDays(nextDaysNumber, lang),
      nextDaysNumber
    };
  }
  reactExports.createContext({
    lang: "zh",
    t: (key, params) => translate("zh", key, params)
  });
  const STORAGE_KEY_PROBLEMS = "lc_ebbinghaus_problems";
  const STORAGE_KEY_SETTINGS = "lc_ebbinghaus_settings";
  function extractProblemFromPage() {
    const pathname = window.location.pathname;
    const match = pathname.match(/\/problems\/([^/]+)/);
    const slug = match ? match[1] : "";
    let number = "";
    let title = "";
    let difficulty = "Medium";
    const tags = ["力扣"];
    const docTitle = document.title || "";
    const titleRegex = /^(\d+)[\.\s、]+([^-—|]+)/;
    const titleMatch = docTitle.match(titleRegex);
    if (titleMatch) {
      number = titleMatch[1].trim();
      title = titleMatch[2].trim();
    }
    const titleElem = document.querySelector('div[data-cypress="QuestionTitle"]') || document.querySelector(".text-title-large") || document.querySelector("h4");
    if (titleElem && titleElem.textContent) {
      const raw = titleElem.textContent.trim();
      const domMatch = raw.match(/^(\d+)[\.\s、]+(.+)/);
      if (domMatch) {
        number = domMatch[1].trim();
        title = domMatch[2].trim();
      } else if (!title) {
        title = raw;
      }
    }
    if (!title && slug) {
      title = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
    const pageText = document.body.innerText || "";
    const easyElem = document.querySelector('.text-difficulty-easy, [class*="text-olive"]');
    const hardElem = document.querySelector('.text-difficulty-hard, [class*="text-pink"]');
    const mediumElem = document.querySelector('.text-difficulty-medium, [class*="text-yellow"]');
    if (easyElem || pageText.includes("简单") || pageText.includes("Easy")) {
      difficulty = "Easy";
    } else if (hardElem || pageText.includes("困难") || pageText.includes("Hard")) {
      difficulty = "Hard";
    } else if (mediumElem || pageText.includes("中等") || pageText.includes("Medium")) {
      difficulty = "Medium";
    }
    document.querySelectorAll('a[href*="/tag/"]').forEach((el) => {
      var _a;
      const text = (_a = el.textContent) == null ? void 0 : _a.trim();
      if (text && !tags.includes(text)) tags.push(text);
    });
    return { slug, number: number || "0", title, difficulty, tags };
  }
  function checkSubmissionAccepted() {
    const resultLocator = document.querySelector('[data-e2e-locator="submission-result"]');
    if (resultLocator) {
      const text = (resultLocator.textContent || "").trim();
      if (text === "通过" || text === "Accepted" || text.startsWith("通过\n") || text.startsWith("Accepted\n")) {
        return true;
      }
    }
    const resultBadges = document.querySelectorAll(
      '[class*="text-green"], [class*="text-olive"], [data-cypress*="submission"], [class*="status-success"]'
    );
    for (const el of resultBadges) {
      const text = (el.textContent || "").trim();
      if (text === "通过" || text === "Accepted") {
        return true;
      }
    }
    return false;
  }
  function isExtensionValid() {
    try {
      return typeof chrome !== "undefined" && !!chrome.runtime && !!chrome.runtime.id;
    } catch {
      return false;
    }
  }
  function safeSendMessage(message) {
    if (!isExtensionValid()) return;
    try {
      chrome.runtime.sendMessage(message, () => {
        if (chrome.runtime.lastError) {
        }
      });
    } catch {
    }
  }
  async function getStoredProblems() {
    if (!isExtensionValid()) return [];
    return new Promise((resolve) => {
      try {
        chrome.storage.local.get([STORAGE_KEY_PROBLEMS], (res) => {
          if (chrome.runtime.lastError) {
            resolve([]);
            return;
          }
          resolve(res[STORAGE_KEY_PROBLEMS] || []);
        });
      } catch {
        resolve([]);
      }
    });
  }
  async function getStoredSettings() {
    if (!isExtensionValid()) return DEFAULT_SETTINGS;
    return new Promise((resolve) => {
      try {
        chrome.storage.local.get([STORAGE_KEY_SETTINGS], (res) => {
          if (chrome.runtime.lastError) {
            resolve(DEFAULT_SETTINGS);
            return;
          }
          resolve(res[STORAGE_KEY_SETTINGS] || DEFAULT_SETTINGS);
        });
      } catch {
        resolve(DEFAULT_SETTINGS);
      }
    });
  }
  async function saveStoredProblems(list) {
    if (!isExtensionValid()) return;
    return new Promise((resolve) => {
      try {
        chrome.storage.local.set({ [STORAGE_KEY_PROBLEMS]: list }, () => {
          if (chrome.runtime.lastError) {
            resolve();
            return;
          }
          safeSendMessage({ type: "UPDATE_BADGE" });
          resolve();
        });
      } catch {
        resolve();
      }
    });
  }
  function initCapsule() {
    if (!window.location.pathname.includes("/problems/")) return;
    if (document.getElementById("lc-ebbinghaus-capsule-host")) return;
    const host = document.createElement("div");
    host.id = "lc-ebbinghaus-capsule-host";
    host.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    .capsule-btn {
      background: #0f172a;
      border: 1px solid #334155;
      color: #f8fafc;
      border-radius: 9999px;
      padding: 7px 14px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 7px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
      transition: all 0.2s ease;
      user-select: none;
    }
    .capsule-btn:hover {
      border-color: #10b981;
      transform: translateY(-1px);
    }
    .capsule-btn.active {
      border-color: #10b981;
      background: #020617;
    }
    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
    }
    .pulse-dot.amber {
      background: #f59e0b;
      box-shadow: 0 0 8px #f59e0b;
    }

    .panel {
      position: absolute;
      bottom: 44px;
      right: 0;
      width: 320px;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 14px;
      color: #f8fafc;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(16, 185, 129, 0.15);
      font-size: 12px;
      animation: fadeIn 0.18s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .title-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 600;
      color: #34d399;
    }
    .badge {
      font-size: 10px;
      font-family: monospace;
      padding: 1px 6px;
      border-radius: 4px;
      background: #1e293b;
      border: 1px solid #475569;
      color: #cbd5e1;
    }
    .badge.easy { color: #34d399; border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.1); }
    .badge.medium { color: #fbbf24; border-color: rgba(251, 191, 36, 0.3); background: rgba(251, 191, 36, 0.1); }
    .badge.hard { color: #f87171; border-color: rgba(248, 113, 113, 0.3); background: rgba(248, 113, 113, 0.1); }

    .meta-info {
      font-size: 11px;
      color: #94a3b8;
      line-height: 1.5;
      margin-bottom: 10px;
      background: #020617;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid #1e293b;
    }
    .meta-info strong {
      color: #e2e8f0;
    }

    .btn-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 5px;
      margin-top: 6px;
    }
    .rate-btn {
      background: #1e293b;
      border: 1px solid #334155;
      color: #e2e8f0;
      border-radius: 6px;
      padding: 6px 2px;
      font-size: 11px;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
    }
    .rate-btn:hover { filter: brightness(1.25); transform: translateY(-1px); }
    .rate-btn.again { border-color: rgba(239, 68, 68, 0.4); color: #f87171; background: rgba(239, 68, 68, 0.1); }
    .rate-btn.hard { border-color: rgba(245, 158, 11, 0.4); color: #fbbf24; background: rgba(245, 158, 11, 0.1); }
    .rate-btn.good { border-color: rgba(16, 185, 129, 0.4); color: #34d399; background: rgba(16, 185, 129, 0.1); }
    .rate-btn.easy { border-color: rgba(14, 165, 233, 0.4); color: #38bdf8; background: rgba(14, 165, 233, 0.1); }

    .add-action-btn {
      width: 100%;
      background: #059669;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 8px 10px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-size: 12px;
      transition: background 0.15s;
    }
    .add-action-btn:hover { background: #10b981; }

    .textarea-notes {
      width: 100%;
      background: #020617;
      border: 1px solid #334155;
      color: #f8fafc;
      border-radius: 6px;
      padding: 7px 8px;
      font-size: 11px;
      margin-bottom: 8px;
      outline: none;
      resize: vertical;
      min-height: 48px;
      font-family: inherit;
    }
    .textarea-notes:focus { border-color: #10b981; }

    .footer-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      padding-top: 8px;
      border-top: 1px solid #1e293b;
      font-size: 10px;
    }
    .del-btn {
      color: #f87171;
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: underline;
      opacity: 0.8;
    }
    .del-btn:hover { opacity: 1; }
    
    .done-banner {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #34d399;
      border-radius: 6px;
      padding: 7px;
      text-align: center;
      font-weight: 500;
      font-size: 11px;
    }

    .auto-ac-banner {
      background: rgba(16, 185, 129, 0.2);
      border: 1px solid #10b981;
      color: #34d399;
      padding: 8px 10px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-size: 11px;
      line-height: 1.4;
      display: flex;
      align-items: center;
      gap: 6px;
    }
  `;
    shadow.appendChild(style);
    const wrapper = document.createElement("div");
    shadow.appendChild(wrapper);
    let isExpanded = false;
    let autoAcNotified = false;
    async function render() {
      var _a, _b;
      const meta = extractProblemFromPage();
      if (!meta.slug) return;
      const problems = await getStoredProblems();
      const settings = await getStoredSettings();
      const ladder = settings.ladder || DEFAULT_EBBINGHAUS_LADDER;
      const lang = resolveLanguage(settings.language, window.location.hostname);
      const { t } = createI18n(lang);
      const existing = problems.find(
        (p) => p.slug === meta.slug || meta.number !== "0" && p.number === meta.number
      );
      wrapper.innerHTML = "";
      const pill = document.createElement("button");
      pill.className = `capsule-btn ${isExpanded ? "active" : ""}`;
      if (existing) {
        const today = getTodayString();
        const isDue = existing.nextReviewDate <= today;
        pill.innerHTML = `
        <span class="pulse-dot ${isDue ? "amber" : ""}"></span>
        <span>${t("capsule.pillTracked", { stage: existing.repetition + 1, interval: existing.interval })}</span>
      `;
      } else {
        pill.innerHTML = `
        <span class="pulse-dot"></span>
        <span>${t("capsule.pillUntracked")}</span>
      `;
      }
      pill.onclick = () => {
        isExpanded = !isExpanded;
        render();
      };
      wrapper.appendChild(pill);
      if (isExpanded) {
        const panel = document.createElement("div");
        panel.className = "panel";
        if (existing) {
          const today = getTodayString();
          const isReviewedToday = existing.lastReviewedDate === today;
          panel.innerHTML = `
          ${autoAcNotified ? `<div class="auto-ac-banner">${t("capsule.autoAcBanner")}</div>` : ""}

          <div class="panel-header">
            <div class="title-row">
              <span>${t("capsule.panelTitleTracked")}</span>
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="badge ${existing.difficulty.toLowerCase()}">${existing.difficulty}</span>
              <span class="badge">#${existing.number || meta.number}</span>
            </div>
          </div>

          <div style="font-weight: 600; font-size: 12px; margin-bottom: 6px; color: #f1f5f9;">
            ${existing.title || meta.title}
          </div>

          <div class="meta-info">
            <div>${t("capsule.currentStage", { stage: existing.repetition + 1, interval: existing.interval })}</div>
            <div>${t("capsule.nextReview", { date: existing.nextReviewDate })}</div>
            ${isReviewedToday ? `<div style="color: #34d399; margin-top: 3px;">${t("capsule.reviewedToday")}</div>` : `<div style="color: #f59e0b; margin-top: 3px;">${t("capsule.dueToday")}</div>`}
          </div>

          ${isReviewedToday ? `<div class="done-banner">${t("capsule.doneBanner")}</div>` : `
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 4px;">${t("capsule.ratePrompt")}</div>
            <div class="btn-grid">
              ${[1, 2, 3, 4].map((grade) => {
            const metaGrade = getLocalizedGradeMeta(grade, existing.repetition, existing.interval, ladder, lang);
            const cls = ["again", "hard", "good", "easy"][grade - 1];
            return `
                <button class="rate-btn ${cls}" data-grade="${grade}">
                  <div>${metaGrade.name}</div>
                  <div style="font-size: 9px; opacity: 0.75;">${metaGrade.nextDays}</div>
                </button>`;
          }).join("")}
            </div>
          `}

          <div class="footer-actions">
            <span style="color: #64748b;">${t("capsule.trackingFooter")}</span>
            <button id="capsule-remove-btn" class="del-btn">${t("capsule.removeBtn")}</button>
          </div>
        `;
          panel.querySelectorAll(".rate-btn").forEach((btn) => {
            btn.addEventListener("click", async (e) => {
              const btnEl = e.currentTarget;
              const grade = Number(btnEl.dataset.grade);
              const update = calculateSM2(existing, grade, today, ladder);
              const updated = {
                ...existing,
                repetition: update.repetition,
                interval: update.interval,
                easeFactor: update.easeFactor,
                nextReviewDate: update.nextReviewDate,
                lastReviewedDate: today,
                history: [
                  {
                    id: `log-${Date.now()}`,
                    timestamp: Date.now(),
                    date: today,
                    grade,
                    intervalDays: update.interval,
                    repetition: update.repetition,
                    easeFactor: update.easeFactor
                  },
                  ...existing.history || []
                ]
              };
              const list = await getStoredProblems();
              const idx = list.findIndex((p) => p.id === existing.id);
              if (idx >= 0) list[idx] = updated;
              await saveStoredProblems(list);
              render();
            });
          });
          (_a = panel.querySelector("#capsule-remove-btn")) == null ? void 0 : _a.addEventListener("click", async () => {
            if (confirm(t("capsule.removeConfirm", { number: existing.number, title: existing.title }))) {
              const list = await getStoredProblems();
              const filtered = list.filter((p) => p.id !== existing.id);
              await saveStoredProblems(filtered);
              render();
            }
          });
        } else {
          panel.innerHTML = `
          <div class="panel-header">
            <div class="title-row">
              <span>${t("capsule.panelTitleUntracked")}</span>
            </div>
            <div style="display: flex; gap: 4px;">
              <span class="badge ${meta.difficulty.toLowerCase()}">${meta.difficulty}</span>
              <span class="badge">#${meta.number}</span>
            </div>
          </div>

          <div style="font-weight: 600; font-size: 12px; margin-bottom: 6px; color: #f1f5f9;">
            ${meta.title}
          </div>

          <p style="color: #94a3b8; font-size: 11px; margin-bottom: 8px; line-height: 1.4;">
            ${t("capsule.untrackedDesc")}
          </p>

          <textarea id="capsule-notes-input" class="textarea-notes" placeholder="${t("capsule.notesPlaceholder")}"></textarea>

          <button id="capsule-submit-add" class="add-action-btn">
            <span>${t("capsule.submitAdd")}</span>
          </button>
        `;
          (_b = panel.querySelector("#capsule-submit-add")) == null ? void 0 : _b.addEventListener("click", async () => {
            const textarea = panel.querySelector("#capsule-notes-input");
            const notes = textarea ? textarea.value.trim() : "";
            const newProblem = {
              id: `lc-${meta.slug || Date.now()}`,
              number: meta.number || "0",
              title: meta.title || meta.slug,
              slug: meta.slug,
              url: window.location.href,
              difficulty: meta.difficulty,
              tags: meta.tags,
              notes,
              createdAt: Date.now(),
              repetition: 0,
              interval: 1,
              // 1st stage
              easeFactor: 2.5,
              nextReviewDate: getTodayString(),
              isSample: false,
              history: []
            };
            const list = await getStoredProblems();
            list.unshift(newProblem);
            await saveStoredProblems(list);
            render();
          });
        }
        wrapper.appendChild(panel);
      }
    }
    render();
    let lastUrl = window.location.href;
    const timer = setInterval(() => {
      if (!isExtensionValid()) {
        clearInterval(timer);
        observer.disconnect();
        return;
      }
      if (window.location.href !== lastUrl) {
        lastUrl = window.location.href;
        autoAcNotified = false;
        acHandled = false;
        render();
      }
    }, 1200);
    let acHandled = false;
    const observer = new MutationObserver(async () => {
      if (!isExtensionValid()) {
        observer.disconnect();
        clearInterval(timer);
        return;
      }
      if (acHandled) return;
      if (checkSubmissionAccepted()) {
        acHandled = true;
        const meta = extractProblemFromPage();
        if (meta.slug) {
          const list = await getStoredProblems();
          const existing = list.find((p) => p.slug === meta.slug);
          if (!existing) {
            const settings = await getStoredSettings();
            const lang = resolveLanguage(settings.language, window.location.hostname);
            const { t } = createI18n(lang);
            const newProblem = {
              id: `lc-${meta.slug || Date.now()}`,
              number: meta.number || "0",
              title: meta.title || meta.slug,
              slug: meta.slug,
              url: window.location.href,
              difficulty: meta.difficulty,
              tags: meta.tags,
              notes: t("capsule.autoAcNotes"),
              createdAt: Date.now(),
              repetition: 0,
              interval: 1,
              easeFactor: 2.5,
              nextReviewDate: getTodayString(),
              isSample: false,
              history: []
            };
            list.unshift(newProblem);
            await saveStoredProblems(list);
            autoAcNotified = true;
            isExpanded = true;
            render();
          }
        }
      }
    });
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCapsule);
  } else {
    initCapsule();
  }
  exports.checkSubmissionAccepted = checkSubmissionAccepted;
  exports.extractProblemFromPage = extractProblemFromPage;
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
})(this.LeetCodeContentScript = this.LeetCodeContentScript || {});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2ViYmluZ2hhdXMudHMiLCIuLi8uLi9zcmMvdXRpbHMvc3RvcmFnZS50cyIsIi4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC9janMvcmVhY3QucHJvZHVjdGlvbi5taW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QvY2pzL3JlYWN0LmRldmVsb3BtZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0L2luZGV4LmpzIiwiLi4vLi4vc3JjL3V0aWxzL2kxOG4udHMiLCIuLi8uLi9zcmMvY29udGVudC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm9ibGVtLCBSZXZpZXdHcmFkZSB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRUJCSU5HSEFVU19MQURERVIgPSBbMSwgMiwgNCwgNywgMTUsIDMwLCA2MCwgMTIwXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvZGF5U3RyaW5nKGQ6IERhdGUgPSBuZXcgRGF0ZSgpKTogc3RyaW5nIHtcbiAgY29uc3QgeWVhciA9IGQuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoZC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCAnMCcpO1xuICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZERheXMoZGF0ZVN0cjogc3RyaW5nLCBkYXlzOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCBkID0gbmV3IERhdGUoZGF0ZVN0ciArICdUMDA6MDA6MDAnKTtcbiAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgZGF5cyk7XG4gIHJldHVybiBnZXRUb2RheVN0cmluZyhkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZEYXlzKGRhdGVTdHIxOiBzdHJpbmcsIGRhdGVTdHIyOiBzdHJpbmcpOiBudW1iZXIge1xuICBjb25zdCBkMSA9IG5ldyBEYXRlKGRhdGVTdHIxICsgJ1QwMDowMDowMCcpLmdldFRpbWUoKTtcbiAgY29uc3QgZDIgPSBuZXcgRGF0ZShkYXRlU3RyMiArICdUMDA6MDA6MDAnKS5nZXRUaW1lKCk7XG4gIHJldHVybiBNYXRoLnJvdW5kKChkMSAtIGQyKSAvICgxMDAwICogNjAgKiA2MCAqIDI0KSk7XG59XG5cbi8qKlxuICog57uP5YW46Im+5a6+5rWp5pav6Zi25qKvICsgU00tMiDmmbrog73ot4Pov4HosIPluqZcbiAqIOmYtuair+m7mOiupOS4uu+8mjHlpKkgLT4gMuWkqSAtPiA05aSpIC0+IDflpKkgLT4gMTXlpKkgLT4gMzDlpKkgLT4gNjDlpKkgLT4gMTIw5aSpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVTTTIoXG4gIHByb2JsZW06IFByb2JsZW0sXG4gIGdyYWRlOiBSZXZpZXdHcmFkZSxcbiAgcmV2aWV3RGF0ZTogc3RyaW5nID0gZ2V0VG9kYXlTdHJpbmcoKSxcbiAgbGFkZGVyOiBudW1iZXJbXSA9IERFRkFVTFRfRUJCSU5HSEFVU19MQURERVJcbik6IHtcbiAgcmVwZXRpdGlvbjogbnVtYmVyO1xuICBpbnRlcnZhbDogbnVtYmVyO1xuICBlYXNlRmFjdG9yOiBudW1iZXI7XG4gIG5leHRSZXZpZXdEYXRlOiBzdHJpbmc7XG59IHtcbiAgbGV0IHJlcCA9IHByb2JsZW0ucmVwZXRpdGlvbiA/PyAwO1xuICBsZXQgZWFzZSA9IHByb2JsZW0uZWFzZUZhY3RvciB8fCAyLjU7XG4gIGxldCBuZXh0SW50ZXJ2YWw6IG51bWJlcjtcblxuICBzd2l0Y2ggKGdyYWRlKSB7XG4gICAgY2FzZSAxOiAvLyBBZ2FpbiAo6YeN5p2lIMK3IOWujOWFqOmBl+W/mClcbiAgICAgIHJlcCA9IDA7XG4gICAgICBuZXh0SW50ZXJ2YWwgPSBsYWRkZXJbMF0gfHwgMTtcbiAgICAgIGVhc2UgPSBNYXRoLm1heCgxLjMsIGVhc2UgLSAwLjIpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDI6IC8vIEhhcmQgKOWbsOmaviDCtyDli4nlvLrlgZrlh7opXG4gICAgICAvLyDkv53mjIHlnKjlvZPliY3pmLbmoq/vvIzlt6nlm7rlvZPliY3lkajmnJ9cbiAgICAgIG5leHRJbnRlcnZhbCA9IGxhZGRlcltNYXRoLm1pbihyZXAsIGxhZGRlci5sZW5ndGggLSAxKV0gfHwgMTtcbiAgICAgIGVhc2UgPSBNYXRoLm1heCgxLjMsIGVhc2UgLSAwLjE1KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAzOiAvLyBHb29kICjoia/lpb0gwrcg56iz5q2l5o6o6L+bKVxuICAgICAgLy8g6YCS5aKe5LiA6Zi2XG4gICAgICByZXAgPSByZXAgKyAxO1xuICAgICAgaWYgKHJlcCA8IGxhZGRlci5sZW5ndGgpIHtcbiAgICAgICAgbmV4dEludGVydmFsID0gbGFkZGVyW3JlcF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDotoXlh7rpmLbmoq/lkI7mjInlpI3liKnlgI3lop5cbiAgICAgICAgY29uc3QgbGFzdCA9IGxhZGRlcltsYWRkZXIubGVuZ3RoIC0gMV07XG4gICAgICAgIG5leHRJbnRlcnZhbCA9IE1hdGgubWF4KGxhc3QgKyAxNSwgTWF0aC5yb3VuZChwcm9ibGVtLmludGVydmFsICogZWFzZSkpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIDQ6IC8vIEVhc3kgKOeGn+e7gyDCtyDot7Pnuqfnp5LmnYApXG4gICAgICAvLyDot7Pot4PkuKTpmLbvvIFcbiAgICAgIHJlcCA9IHJlcCArIDI7XG4gICAgICBpZiAocmVwIDwgbGFkZGVyLmxlbmd0aCkge1xuICAgICAgICBuZXh0SW50ZXJ2YWwgPSBsYWRkZXJbcmVwXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxhc3QgPSBsYWRkZXJbbGFkZGVyLmxlbmd0aCAtIDFdO1xuICAgICAgICBuZXh0SW50ZXJ2YWwgPSBNYXRoLm1heChsYXN0ICsgMzAsIE1hdGgucm91bmQocHJvYmxlbS5pbnRlcnZhbCAqIGVhc2UgKiAxLjMpKTtcbiAgICAgIH1cbiAgICAgIGVhc2UgPSBNYXRoLm1pbigzLjUsIGVhc2UgKyAwLjE1KTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgY29uc3QgbmV4dFJldmlld0RhdGUgPSBhZGREYXlzKHJldmlld0RhdGUsIG5leHRJbnRlcnZhbCk7XG5cbiAgcmV0dXJuIHtcbiAgICByZXBldGl0aW9uOiByZXAsXG4gICAgaW50ZXJ2YWw6IG5leHRJbnRlcnZhbCxcbiAgICBlYXNlRmFjdG9yOiBOdW1iZXIoZWFzZS50b0ZpeGVkKDIpKSxcbiAgICBuZXh0UmV2aWV3RGF0ZSxcbiAgfTtcbn1cblxuLyoqXG4gKiDpooTkvLDlvZPliY3popjnm67nmoTorrDlv4bnlZnlrZjnjocgKDAgLSAxMDAlKVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUmV0ZW50aW9uUmF0ZShwcm9ibGVtOiBQcm9ibGVtLCBjdXJyZW50RGF0ZTogc3RyaW5nID0gZ2V0VG9kYXlTdHJpbmcoKSk6IG51bWJlciB7XG4gIGlmICghcHJvYmxlbS5sYXN0UmV2aWV3ZWREYXRlKSB7XG4gICAgcmV0dXJuIDEwMDtcbiAgfVxuICBjb25zdCBkYXlzRWxhcHNlZCA9IE1hdGgubWF4KDAsIGRpZmZEYXlzKGN1cnJlbnREYXRlLCBwcm9ibGVtLmxhc3RSZXZpZXdlZERhdGUpKTtcbiAgaWYgKGRheXNFbGFwc2VkID09PSAwKSByZXR1cm4gMTAwO1xuXG4gIGNvbnN0IHN0YWJpbGl0eSA9IE1hdGgubWF4KDEsIHByb2JsZW0uaW50ZXJ2YWwgKiAocHJvYmxlbS5lYXNlRmFjdG9yIC8gMi41KSk7XG4gIGNvbnN0IHJldGVudGlvbiA9IE1hdGguZXhwKC1kYXlzRWxhcHNlZCAvIHN0YWJpbGl0eSk7XG4gIHJldHVybiBNYXRoLm1heCgxMCwgTWF0aC5taW4oMTAwLCBNYXRoLnJvdW5kKHJldGVudGlvbiAqIDEwMCkpKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHcmFkZU1ldGEge1xuICBncmFkZTogUmV2aWV3R3JhZGU7XG4gIG5hbWU6IHN0cmluZztcbiAgc3ViOiBzdHJpbmc7XG4gIGdldE5leHREYXlzOiAocmVwOiBudW1iZXIsIGludGVydmFsOiBudW1iZXIsIGxhZGRlcj86IG51bWJlcltdKSA9PiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBHUkFERV9DT05GSUc6IFJlY29yZDxSZXZpZXdHcmFkZSwgR3JhZGVNZXRhPiA9IHtcbiAgMToge1xuICAgIGdyYWRlOiAxLFxuICAgIG5hbWU6ICfph43mnaUnLFxuICAgIHN1YjogJ+WujOWFqOWNoeWjsycsXG4gICAgZ2V0TmV4dERheXM6IChfcmVwLCBfaW50LCBsYWRkZXIgPSBERUZBVUxUX0VCQklOR0hBVVNfTEFEREVSKSA9PiBgJHtsYWRkZXJbMF0gfHwgMX3lpKnlkI5gLFxuICB9LFxuICAyOiB7XG4gICAgZ3JhZGU6IDIsXG4gICAgbmFtZTogJ+WbsOmavicsXG4gICAgc3ViOiAn5YuJ5by65YaZ5Ye6JyxcbiAgICBnZXROZXh0RGF5czogKHJlcCwgX2ludCwgbGFkZGVyID0gREVGQVVMVF9FQkJJTkdIQVVTX0xBRERFUikgPT4ge1xuICAgICAgY29uc3QgZGF5cyA9IGxhZGRlcltNYXRoLm1pbihyZXAsIGxhZGRlci5sZW5ndGggLSAxKV0gfHwgMTtcbiAgICAgIHJldHVybiBgJHtkYXlzfeWkqeWQjmA7XG4gICAgfSxcbiAgfSxcbiAgMzoge1xuICAgIGdyYWRlOiAzLFxuICAgIG5hbWU6ICfoia/lpb0nLFxuICAgIHN1YjogJ+eLrOeri0FDJyxcbiAgICBnZXROZXh0RGF5czogKHJlcCwgaW50LCBsYWRkZXIgPSBERUZBVUxUX0VCQklOR0hBVVNfTEFEREVSKSA9PiB7XG4gICAgICBjb25zdCBuZXh0SWR4ID0gcmVwICsgMTtcbiAgICAgIGlmIChuZXh0SWR4IDwgbGFkZGVyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gYCR7bGFkZGVyW25leHRJZHhdfeWkqeWQjmA7XG4gICAgICB9XG4gICAgICByZXR1cm4gYCR7TWF0aC5yb3VuZChpbnQgKiAyLjUpfeWkqeWQjmA7XG4gICAgfSxcbiAgfSxcbiAgNDoge1xuICAgIGdyYWRlOiA0LFxuICAgIG5hbWU6ICfnroDljZUnLFxuICAgIHN1YjogJ+enkuadgOi3s+mYticsXG4gICAgZ2V0TmV4dERheXM6IChyZXAsIGludCwgbGFkZGVyID0gREVGQVVMVF9FQkJJTkdIQVVTX0xBRERFUikgPT4ge1xuICAgICAgY29uc3QgbmV4dElkeCA9IHJlcCArIDI7XG4gICAgICBpZiAobmV4dElkeCA8IGxhZGRlci5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGAke2xhZGRlcltuZXh0SWR4XX3lpKnlkI5gO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGAke01hdGgucm91bmQoaW50ICogMy4yKX3lpKnlkI5gO1xuICAgIH0sXG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgUHJvYmxlbSwgVXNlclNldHRpbmdzLCBSZXZpZXdHcmFkZSwgRGFpbHlTdW1tYXJ5IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgY2FsY3VsYXRlU00yLCBnZXRUb2RheVN0cmluZywgZGlmZkRheXMsIGNhbGN1bGF0ZVJldGVudGlvblJhdGUsIERFRkFVTFRfRUJCSU5HSEFVU19MQURERVIgfSBmcm9tICcuL2ViYmluZ2hhdXMnO1xuXG5jb25zdCBTVE9SQUdFX0tFWV9QUk9CTEVNUyA9ICdsY19lYmJpbmdoYXVzX3Byb2JsZW1zJztcbmNvbnN0IFNUT1JBR0VfS0VZX1NFVFRJTkdTID0gJ2xjX2ViYmluZ2hhdXNfc2V0dGluZ3MnO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogVXNlclNldHRpbmdzID0ge1xuICBkYWlseVRhcmdldDogOCxcbiAgc2hvd0xlZXRDb2RlRmxvYXRpbmdXaWRnZXQ6IHRydWUsXG4gIHRoZW1lOiAnZGFyaycsXG4gIGxhZGRlcjogREVGQVVMVF9FQkJJTkdIQVVTX0xBRERFUixcbiAgbGFuZ3VhZ2U6ICdzeXN0ZW0nLFxufTtcblxuZnVuY3Rpb24gaXNDaHJvbWVTdG9yYWdlQXZhaWxhYmxlKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGNocm9tZSAhPT0gJ3VuZGVmaW5lZCcgJiYgISFjaHJvbWUuc3RvcmFnZT8ubG9jYWw7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEl0ZW08VD4oa2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogVCk6IFByb21pc2U8VD4ge1xuICBpZiAoaXNDaHJvbWVTdG9yYWdlQXZhaWxhYmxlKCkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChba2V5XSwgKHJlc3VsdCkgPT4ge1xuICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yIHx8IHJlc3VsdFtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXNvbHZlKGRlZmF1bHRWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHRba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByYXcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgcmV0dXJuIHJhdyA/IEpTT04ucGFyc2UocmF3KSA6IGRlZmF1bHRWYWx1ZTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldEl0ZW08VD4oa2V5OiBzdHJpbmcsIHZhbHVlOiBUKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmIChpc0Nocm9tZVN0b3JhZ2VBdmFpbGFibGUoKSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgW2tleV06IHZhbHVlIH0sICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3RpZnlCYWRnZVVwZGF0ZSgpOiB2b2lkIHtcbiAgaWYgKHR5cGVvZiBjaHJvbWUgIT09ICd1bmRlZmluZWQnICYmIGNocm9tZS5ydW50aW1lPy5zZW5kTWVzc2FnZSkge1xuICAgIHRyeSB7XG4gICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6ICdVUERBVEVfQkFER0UnIH0sICgpID0+IHtcbiAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIC8vIGlnbm9yZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgSU5JVElBTF9TQU1QTEVfUFJPQkxFTVM6IFByb2JsZW1bXSA9IFtcbiAge1xuICAgIGlkOiAnbGMtMjA2JyxcbiAgICBudW1iZXI6ICcyMDYnLFxuICAgIHRpdGxlOiAn5Y+N6L2s6ZO+6KGoJyxcbiAgICBzbHVnOiAncmV2ZXJzZS1saW5rZWQtbGlzdCcsXG4gICAgdXJsOiAnaHR0cHM6Ly9sZWV0Y29kZS5jbi9wcm9ibGVtcy9yZXZlcnNlLWxpbmtlZC1saXN0LycsXG4gICAgZGlmZmljdWx0eTogJ0Vhc3knLFxuICAgIHRhZ3M6IFsn6ZO+6KGoJywgJ+WPjOaMh+mSiCcsICfpgJLlvZInXSxcbiAgICBub3RlczogJ+azqOaEj+WPjOaMh+mSiOi/reS7o+azleS4reeahCBwcmV2IOWIneWni+WMluS4uiBudWxs77yMY3VyciDmjIflkJEgaGVhZOOAguS4tOaXtuS/neWtmCBjdXJyLm5leHTjgIInLFxuICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSAtIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3LFxuICAgIHJlcGV0aXRpb246IDIsIC8vIOWkhOS6jumYtuair+esrDPpmLYgKDTlpKkpXG4gICAgaW50ZXJ2YWw6IDQsXG4gICAgZWFzZUZhY3RvcjogMi41LFxuICAgIG5leHRSZXZpZXdEYXRlOiBnZXRUb2RheVN0cmluZygpLFxuICAgIGxhc3RSZXZpZXdlZERhdGU6ICcyMDI2LTA5LTAyJyxcbiAgICBpc1NhbXBsZTogdHJ1ZSxcbiAgICBoaXN0b3J5OiBbXSxcbiAgfSxcbiAge1xuICAgIGlkOiAnbGMtMTUnLFxuICAgIG51bWJlcjogJzE1JyxcbiAgICB0aXRsZTogJ+S4ieaVsOS5i+WSjCcsXG4gICAgc2x1ZzogJzNzdW0nLFxuICAgIHVybDogJ2h0dHBzOi8vbGVldGNvZGUuY24vcHJvYmxlbXMvM3N1bS8nLFxuICAgIGRpZmZpY3VsdHk6ICdNZWRpdW0nLFxuICAgIHRhZ3M6IFsn5pWw57uEJywgJ+WPjOaMh+mSiCcsICfmjpLluo8nXSxcbiAgICBub3RlczogJ+WFiOaVtOS9k+aOkuW6j++8geWkluWxguWbuuWumiBp77yM5YaF5bGC5bem5Y+z5Y+M5oyH6ZKI44CC5b+F6aG754m55Yir5rOo5oSPIGksIGxlZnQsIHJpZ2h0IOeahOWOu+mHjemAu+i+ke+8gScsXG4gICAgY3JlYXRlZEF0OiBEYXRlLm5vdygpIC0gMTAwMCAqIDYwICogNjAgKiAyNCAqIDMsXG4gICAgcmVwZXRpdGlvbjogMSwgLy8g5aSE5LqO56ysMumYtiAoMuWkqSlcbiAgICBpbnRlcnZhbDogMixcbiAgICBlYXNlRmFjdG9yOiAyLjUsXG4gICAgbmV4dFJldmlld0RhdGU6IGdldFRvZGF5U3RyaW5nKCksXG4gICAgbGFzdFJldmlld2VkRGF0ZTogJzIwMjYtMDktMDQnLFxuICAgIGlzU2FtcGxlOiB0cnVlLFxuICAgIGhpc3Rvcnk6IFtdLFxuICB9LFxuICB7XG4gICAgaWQ6ICdsYy00MicsXG4gICAgbnVtYmVyOiAnNDInLFxuICAgIHRpdGxlOiAn5o6l6Zuo5rC0JyxcbiAgICBzbHVnOiAndHJhcHBpbmctcmFpbi13YXRlcicsXG4gICAgdXJsOiAnaHR0cHM6Ly9sZWV0Y29kZS5jbi9wcm9ibGVtcy90cmFwcGluZy1yYWluLXdhdGVyLycsXG4gICAgZGlmZmljdWx0eTogJ0hhcmQnLFxuICAgIHRhZ3M6IFsn5Y+M5oyH6ZKIJywgJ+WNleiwg+agiCcsICfliqjmgIHop4TliJInXSxcbiAgICBub3RlczogJ+WPjOaMh+mSiOazleacgOS8mO+8mmxlZnRNYXgg5ZKMIHJpZ2h0TWF477yM57u05oqk6L6D5bCP55qE5LiA5L6n5ZCR5Lit6Ze05o6o6L+b44CCJyxcbiAgICBjcmVhdGVkQXQ6IERhdGUubm93KCkgLSAxMDAwICogNjAgKiA2MCAqIDI0ICogOCxcbiAgICByZXBldGl0aW9uOiAxLFxuICAgIGludGVydmFsOiAyLFxuICAgIGVhc2VGYWN0b3I6IDIuMixcbiAgICBuZXh0UmV2aWV3RGF0ZTogJzIwMjYtMDktMDUnLCAvLyDotoXmnJ8gMSDlpKlcbiAgICBsYXN0UmV2aWV3ZWREYXRlOiAnMjAyNi0wOS0wMycsXG4gICAgaXNTYW1wbGU6IHRydWUsXG4gICAgaGlzdG9yeTogW10sXG4gIH0sXG4gIHtcbiAgICBpZDogJ2xjLTEnLFxuICAgIG51bWJlcjogJzEnLFxuICAgIHRpdGxlOiAn5Lik5pWw5LmL5ZKMJyxcbiAgICBzbHVnOiAndHdvLXN1bScsXG4gICAgdXJsOiAnaHR0cHM6Ly9sZWV0Y29kZS5jbi9wcm9ibGVtcy90d28tc3VtLycsXG4gICAgZGlmZmljdWx0eTogJ0Vhc3knLFxuICAgIHRhZ3M6IFsn5ZOI5biM6KGoJywgJ+aVsOe7hCddLFxuICAgIG5vdGVzOiAnSGFzaE1hcCDovrnmn6XovrnlrZjvvIznqbrpl7TmjaLml7bpl7QgTyhOKeOAgicsXG4gICAgY3JlYXRlZEF0OiBEYXRlLm5vdygpIC0gMTAwMCAqIDYwICogNjAgKiAyNCAqIDE1LFxuICAgIHJlcGV0aXRpb246IDQsIC8vIOWkhOS6juesrDXpmLYgKDE15aSpKVxuICAgIGludGVydmFsOiAxNSxcbiAgICBlYXNlRmFjdG9yOiAyLjgsXG4gICAgbmV4dFJldmlld0RhdGU6ICcyMDI2LTA5LTIwJyxcbiAgICBsYXN0UmV2aWV3ZWREYXRlOiAnMjAyNi0wOS0wNScsXG4gICAgaXNTYW1wbGU6IHRydWUsXG4gICAgaGlzdG9yeTogW10sXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgU0FNUExFX1BST0JMRU1fSURTID0gbmV3IFNldChbJ2xjLTIwNicsICdsYy0xNScsICdsYy00MicsICdsYy0xJ10pO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTYW1wbGVQcm9ibGVtKHA6IFByb2JsZW0pOiBib29sZWFuIHtcbiAgaWYgKHAuaXNTYW1wbGUgPT09IHRydWUpIHJldHVybiB0cnVlO1xuICBpZiAoU0FNUExFX1BST0JMRU1fSURTLmhhcyhwLmlkKSkgcmV0dXJuIHRydWU7XG4gIC8vIEFsc28gY2hlY2sgbm90ZXMgJiBudW1iZXJzIG9mIHRoZSBrbm93biBpbml0aWFsIGRlbW8gcHJvYmxlbXNcbiAgaWYgKHAubm90ZXMpIHtcbiAgICBpZiAocC5ub3Rlcy5pbmNsdWRlcygn5Y+M5oyH6ZKI6L+t5Luj5rOV5Lit55qEIHByZXYg5Yid5aeL5YyW5Li6IG51bGwnKSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHAubm90ZXMuaW5jbHVkZXMoJ+WFiOaVtOS9k+aOkuW6j++8geWkluWxguWbuuWumiBpJykpIHJldHVybiB0cnVlO1xuICAgIGlmIChwLm5vdGVzLmluY2x1ZGVzKCflj4zmjIfpkojms5XmnIDkvJjvvJpsZWZ0TWF4IOWSjCByaWdodE1heCcpKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAocC5ub3Rlcy5pbmNsdWRlcygnSGFzaE1hcCDovrnmn6XovrnlrZjvvIznqbrpl7TmjaLml7bpl7QnKSkgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5jb25zdCBTVE9SQUdFX0tFWV9JTklUSUFMSVpFRCA9ICdsY19lYmJpbmdoYXVzX2luaXRpYWxpemVkJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByb2JsZW1zKCk6IFByb21pc2U8UHJvYmxlbVtdPiB7XG4gIGNvbnN0IGlzSW5pdGlhbGl6ZWQgPSBhd2FpdCBnZXRJdGVtPGJvb2xlYW4+KFNUT1JBR0VfS0VZX0lOSVRJQUxJWkVELCBmYWxzZSk7XG4gIGNvbnN0IHByb2JsZW1zID0gYXdhaXQgZ2V0SXRlbTxQcm9ibGVtW10gfCBudWxsPihTVE9SQUdFX0tFWV9QUk9CTEVNUywgbnVsbCk7XG5cbiAgLy8gSWYgdGhpcyBpcyB0aGUgdHJ1ZSBmaXJzdCBydW4gKG5ldmVyIGluaXRpYWxpemVkIGFuZCBubyBkYXRhIHN0b3JlZClcbiAgaWYgKCFpc0luaXRpYWxpemVkICYmIHByb2JsZW1zID09PSBudWxsKSB7XG4gICAgYXdhaXQgc2V0SXRlbShTVE9SQUdFX0tFWV9JTklUSUFMSVpFRCwgdHJ1ZSk7XG4gICAgYXdhaXQgc2V0SXRlbShTVE9SQUdFX0tFWV9QUk9CTEVNUywgWy4uLklOSVRJQUxfU0FNUExFX1BST0JMRU1TXSk7XG4gICAgbm90aWZ5QmFkZ2VVcGRhdGUoKTtcbiAgICByZXR1cm4gWy4uLklOSVRJQUxfU0FNUExFX1BST0JMRU1TXTtcbiAgfVxuXG4gIC8vIE9uY2UgaW5pdGlhbGl6ZWQsIHVzZXIgbWF5IGludGVudGlvbmFsbHkgaGF2ZSAwIHByb2JsZW1zIChbXSkuIE5ldmVyIGF1dG8tcmVzdG9yZSFcbiAgaWYgKCFpc0luaXRpYWxpemVkKSB7XG4gICAgYXdhaXQgc2V0SXRlbShTVE9SQUdFX0tFWV9JTklUSUFMSVpFRCwgdHJ1ZSk7XG4gIH1cblxuICByZXR1cm4gQXJyYXkuaXNBcnJheShwcm9ibGVtcykgPyBwcm9ibGVtcyA6IFtdO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZVByb2JsZW0ocHJvYmxlbTogUHJvYmxlbSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBsaXN0ID0gYXdhaXQgZ2V0UHJvYmxlbXMoKTtcbiAgY29uc3QgaW5kZXggPSBsaXN0LmZpbmRJbmRleCgocCkgPT4gcC5pZCA9PT0gcHJvYmxlbS5pZCk7XG4gIGlmIChpbmRleCA+PSAwKSB7XG4gICAgbGlzdFtpbmRleF0gPSBwcm9ibGVtO1xuICB9IGVsc2Uge1xuICAgIGxpc3QudW5zaGlmdChwcm9ibGVtKTtcbiAgfVxuICBhd2FpdCBzZXRJdGVtKFNUT1JBR0VfS0VZX0lOSVRJQUxJWkVELCB0cnVlKTtcbiAgYXdhaXQgc2V0SXRlbShTVE9SQUdFX0tFWV9QUk9CTEVNUywgbGlzdCk7XG4gIG5vdGlmeUJhZGdlVXBkYXRlKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxldGVQcm9ibGVtKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFByb2JsZW1zKCk7XG4gIGNvbnN0IGZpbHRlcmVkID0gbGlzdC5maWx0ZXIoKHApID0+IHAuaWQgIT09IGlkKTtcbiAgYXdhaXQgc2V0SXRlbShTVE9SQUdFX0tFWV9JTklUSUFMSVpFRCwgdHJ1ZSk7XG4gIGF3YWl0IHNldEl0ZW0oU1RPUkFHRV9LRVlfUFJPQkxFTVMsIGZpbHRlcmVkKTtcbiAgbm90aWZ5QmFkZ2VVcGRhdGUoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsZWFyU2FtcGxlUHJvYmxlbXMoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFByb2JsZW1zKCk7XG4gIGNvbnN0IGZpbHRlcmVkID0gbGlzdC5maWx0ZXIoKHApID0+ICFpc1NhbXBsZVByb2JsZW0ocCkpO1xuICBjb25zdCByZW1vdmVkQ291bnQgPSBsaXN0Lmxlbmd0aCAtIGZpbHRlcmVkLmxlbmd0aDtcbiAgYXdhaXQgc2V0SXRlbShTVE9SQUdFX0tFWV9JTklUSUFMSVpFRCwgdHJ1ZSk7XG4gIGF3YWl0IHNldEl0ZW0oU1RPUkFHRV9LRVlfUFJPQkxFTVMsIGZpbHRlcmVkKTtcbiAgbm90aWZ5QmFkZ2VVcGRhdGUoKTtcbiAgcmV0dXJuIHJlbW92ZWRDb3VudDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsZWFyQWxsUHJvYmxlbXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IHNldEl0ZW0oU1RPUkFHRV9LRVlfSU5JVElBTElaRUQsIHRydWUpO1xuICBhd2FpdCBzZXRJdGVtKFNUT1JBR0VfS0VZX1BST0JMRU1TLCBbXSk7XG4gIG5vdGlmeUJhZGdlVXBkYXRlKCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWNvcmRSZXZpZXcocHJvYmxlbUlkOiBzdHJpbmcsIGdyYWRlOiBSZXZpZXdHcmFkZSk6IFByb21pc2U8UHJvYmxlbSB8IG51bGw+IHtcbiAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFByb2JsZW1zKCk7XG4gIGNvbnN0IHRhcmdldCA9IGxpc3QuZmluZCgocCkgPT4gcC5pZCA9PT0gcHJvYmxlbUlkKTtcbiAgaWYgKCF0YXJnZXQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZ2V0U2V0dGluZ3MoKTtcbiAgY29uc3QgbGFkZGVyID0gc2V0dGluZ3MubGFkZGVyIHx8IERFRkFVTFRfRUJCSU5HSEFVU19MQURERVI7XG4gIGNvbnN0IHRvZGF5U3RyID0gZ2V0VG9kYXlTdHJpbmcoKTtcbiAgY29uc3QgdXBkYXRlID0gY2FsY3VsYXRlU00yKHRhcmdldCwgZ3JhZGUsIHRvZGF5U3RyLCBsYWRkZXIpO1xuXG4gIGNvbnN0IHJldmlld0xvZyA9IHtcbiAgICBpZDogYGxvZy0ke0RhdGUubm93KCl9YCxcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgZGF0ZTogdG9kYXlTdHIsXG4gICAgZ3JhZGUsXG4gICAgaW50ZXJ2YWxEYXlzOiB1cGRhdGUuaW50ZXJ2YWwsXG4gICAgcmVwZXRpdGlvbjogdXBkYXRlLnJlcGV0aXRpb24sXG4gICAgZWFzZUZhY3RvcjogdXBkYXRlLmVhc2VGYWN0b3IsXG4gIH07XG5cbiAgY29uc3QgdXBkYXRlZFByb2JsZW06IFByb2JsZW0gPSB7XG4gICAgLi4udGFyZ2V0LFxuICAgIHJlcGV0aXRpb246IHVwZGF0ZS5yZXBldGl0aW9uLFxuICAgIGludGVydmFsOiB1cGRhdGUuaW50ZXJ2YWwsXG4gICAgZWFzZUZhY3RvcjogdXBkYXRlLmVhc2VGYWN0b3IsXG4gICAgbmV4dFJldmlld0RhdGU6IHVwZGF0ZS5uZXh0UmV2aWV3RGF0ZSxcbiAgICBsYXN0UmV2aWV3ZWREYXRlOiB0b2RheVN0cixcbiAgICBoaXN0b3J5OiBbcmV2aWV3TG9nLCAuLi4odGFyZ2V0Lmhpc3RvcnkgfHwgW10pXSxcbiAgfTtcblxuICBjb25zdCBpbmRleCA9IGxpc3QuZmluZEluZGV4KChwKSA9PiBwLmlkID09PSBwcm9ibGVtSWQpO1xuICBsaXN0W2luZGV4XSA9IHVwZGF0ZWRQcm9ibGVtO1xuICBhd2FpdCBzZXRJdGVtKFNUT1JBR0VfS0VZX1BST0JMRU1TLCBsaXN0KTtcbiAgbm90aWZ5QmFkZ2VVcGRhdGUoKTtcblxuICByZXR1cm4gdXBkYXRlZFByb2JsZW07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBQcm9taXNlPFVzZXJTZXR0aW5ncz4ge1xuICByZXR1cm4gZ2V0SXRlbTxVc2VyU2V0dGluZ3M+KFNUT1JBR0VfS0VZX1NFVFRJTkdTLCBERUZBVUxUX1NFVFRJTkdTKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVTZXR0aW5ncyhzZXR0aW5nczogVXNlclNldHRpbmdzKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IHNldEl0ZW0oU1RPUkFHRV9LRVlfU0VUVElOR1MsIHNldHRpbmdzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVEYWlseVN1bW1hcnkocHJvYmxlbXM6IFByb2JsZW1bXSk6IERhaWx5U3VtbWFyeSB7XG4gIGNvbnN0IHRvZGF5U3RyID0gZ2V0VG9kYXlTdHJpbmcoKTtcbiAgbGV0IHRvdGFsRHVlID0gMDtcbiAgbGV0IG92ZXJkdWVDb3VudCA9IDA7XG4gIGxldCBjb21wbGV0ZWRUb2RheSA9IDA7XG4gIGxldCB0b3RhbFJldGVudGlvblN1bSA9IDA7XG5cbiAgZm9yIChjb25zdCBwIG9mIHByb2JsZW1zKSB7XG4gICAgdG90YWxSZXRlbnRpb25TdW0gKz0gY2FsY3VsYXRlUmV0ZW50aW9uUmF0ZShwLCB0b2RheVN0cik7XG5cbiAgICBjb25zdCBpc1Jldmlld2VkVG9kYXkgPSBwLmxhc3RSZXZpZXdlZERhdGUgPT09IHRvZGF5U3RyO1xuICAgIGlmIChpc1Jldmlld2VkVG9kYXkpIHtcbiAgICAgIGNvbXBsZXRlZFRvZGF5ICs9IDE7XG4gICAgfVxuXG4gICAgaWYgKHAubmV4dFJldmlld0RhdGUgPD0gdG9kYXlTdHIgJiYgIWlzUmV2aWV3ZWRUb2RheSkge1xuICAgICAgdG90YWxEdWUgKz0gMTtcbiAgICAgIGlmIChkaWZmRGF5cyh0b2RheVN0ciwgcC5uZXh0UmV2aWV3RGF0ZSkgPiAwKSB7XG4gICAgICAgIG92ZXJkdWVDb3VudCArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHRvdGFsVHJhY2tlZCA9IHByb2JsZW1zLmxlbmd0aDtcbiAgY29uc3QgYXZnUmV0ZW50aW9uID0gdG90YWxUcmFja2VkID4gMCA/IE1hdGgucm91bmQodG90YWxSZXRlbnRpb25TdW0gLyB0b3RhbFRyYWNrZWQpIDogMTAwO1xuXG4gIHJldHVybiB7XG4gICAgdG9kYXlTdHIsXG4gICAgdG90YWxEdWUsXG4gICAgY29tcGxldGVkVG9kYXksXG4gICAgb3ZlcmR1ZUNvdW50LFxuICAgIHRvdGFsVHJhY2tlZCxcbiAgICByZXRlbnRpb25SYXRlOiBhdmdSZXRlbnRpb24sXG4gICAgc3RyZWFrRGF5czogNyxcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGV4cG9ydERhdGFKc29uKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IHByb2JsZW1zID0gYXdhaXQgZ2V0UHJvYmxlbXMoKTtcbiAgY29uc3Qgc2V0dGluZ3MgPSBhd2FpdCBnZXRTZXR0aW5ncygpO1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoeyB2ZXJzaW9uOiAnMS4wLjAnLCBleHBvcnRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksIHByb2JsZW1zLCBzZXR0aW5ncyB9LCBudWxsLCAyKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydERhdGFKc29uKGpzb25TdHI6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGpzb25TdHIpO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEucHJvYmxlbXMpKSB7XG4gICAgICBhd2FpdCBzZXRJdGVtKFNUT1JBR0VfS0VZX1BST0JMRU1TLCBkYXRhLnByb2JsZW1zKTtcbiAgICAgIGlmIChkYXRhLnNldHRpbmdzKSB7XG4gICAgICAgIGF3YWl0IHNldEl0ZW0oU1RPUkFHRV9LRVlfU0VUVElOR1MsIGRhdGEuc2V0dGluZ3MpO1xuICAgICAgfVxuICAgICAgbm90aWZ5QmFkZ2VVcGRhdGUoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIiwiLyoqXG4gKiBAbGljZW5zZSBSZWFjdFxuICogcmVhY3QucHJvZHVjdGlvbi5taW4uanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuJ3VzZSBzdHJpY3QnO3ZhciBsPVN5bWJvbC5mb3IoXCJyZWFjdC5lbGVtZW50XCIpLG49U3ltYm9sLmZvcihcInJlYWN0LnBvcnRhbFwiKSxwPVN5bWJvbC5mb3IoXCJyZWFjdC5mcmFnbWVudFwiKSxxPVN5bWJvbC5mb3IoXCJyZWFjdC5zdHJpY3RfbW9kZVwiKSxyPVN5bWJvbC5mb3IoXCJyZWFjdC5wcm9maWxlclwiKSx0PVN5bWJvbC5mb3IoXCJyZWFjdC5wcm92aWRlclwiKSx1PVN5bWJvbC5mb3IoXCJyZWFjdC5jb250ZXh0XCIpLHY9U3ltYm9sLmZvcihcInJlYWN0LmZvcndhcmRfcmVmXCIpLHc9U3ltYm9sLmZvcihcInJlYWN0LnN1c3BlbnNlXCIpLHg9U3ltYm9sLmZvcihcInJlYWN0Lm1lbW9cIikseT1TeW1ib2wuZm9yKFwicmVhY3QubGF6eVwiKSx6PVN5bWJvbC5pdGVyYXRvcjtmdW5jdGlvbiBBKGEpe2lmKG51bGw9PT1hfHxcIm9iamVjdFwiIT09dHlwZW9mIGEpcmV0dXJuIG51bGw7YT16JiZhW3pdfHxhW1wiQEBpdGVyYXRvclwiXTtyZXR1cm5cImZ1bmN0aW9uXCI9PT10eXBlb2YgYT9hOm51bGx9XG52YXIgQj17aXNNb3VudGVkOmZ1bmN0aW9uKCl7cmV0dXJuITF9LGVucXVldWVGb3JjZVVwZGF0ZTpmdW5jdGlvbigpe30sZW5xdWV1ZVJlcGxhY2VTdGF0ZTpmdW5jdGlvbigpe30sZW5xdWV1ZVNldFN0YXRlOmZ1bmN0aW9uKCl7fX0sQz1PYmplY3QuYXNzaWduLEQ9e307ZnVuY3Rpb24gRShhLGIsZSl7dGhpcy5wcm9wcz1hO3RoaXMuY29udGV4dD1iO3RoaXMucmVmcz1EO3RoaXMudXBkYXRlcj1lfHxCfUUucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQ9e307XG5FLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihhLGIpe2lmKFwib2JqZWN0XCIhPT10eXBlb2YgYSYmXCJmdW5jdGlvblwiIT09dHlwZW9mIGEmJm51bGwhPWEpdGhyb3cgRXJyb3IoXCJzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcy5cIik7dGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLGEsYixcInNldFN0YXRlXCIpfTtFLnByb3RvdHlwZS5mb3JjZVVwZGF0ZT1mdW5jdGlvbihhKXt0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMsYSxcImZvcmNlVXBkYXRlXCIpfTtmdW5jdGlvbiBGKCl7fUYucHJvdG90eXBlPUUucHJvdG90eXBlO2Z1bmN0aW9uIEcoYSxiLGUpe3RoaXMucHJvcHM9YTt0aGlzLmNvbnRleHQ9Yjt0aGlzLnJlZnM9RDt0aGlzLnVwZGF0ZXI9ZXx8Qn12YXIgSD1HLnByb3RvdHlwZT1uZXcgRjtcbkguY29uc3RydWN0b3I9RztDKEgsRS5wcm90b3R5cGUpO0guaXNQdXJlUmVhY3RDb21wb25lbnQ9ITA7dmFyIEk9QXJyYXkuaXNBcnJheSxKPU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksSz17Y3VycmVudDpudWxsfSxMPXtrZXk6ITAscmVmOiEwLF9fc2VsZjohMCxfX3NvdXJjZTohMH07XG5mdW5jdGlvbiBNKGEsYixlKXt2YXIgZCxjPXt9LGs9bnVsbCxoPW51bGw7aWYobnVsbCE9Yilmb3IoZCBpbiB2b2lkIDAhPT1iLnJlZiYmKGg9Yi5yZWYpLHZvaWQgMCE9PWIua2V5JiYoaz1cIlwiK2Iua2V5KSxiKUouY2FsbChiLGQpJiYhTC5oYXNPd25Qcm9wZXJ0eShkKSYmKGNbZF09YltkXSk7dmFyIGc9YXJndW1lbnRzLmxlbmd0aC0yO2lmKDE9PT1nKWMuY2hpbGRyZW49ZTtlbHNlIGlmKDE8Zyl7Zm9yKHZhciBmPUFycmF5KGcpLG09MDttPGc7bSsrKWZbbV09YXJndW1lbnRzW20rMl07Yy5jaGlsZHJlbj1mfWlmKGEmJmEuZGVmYXVsdFByb3BzKWZvcihkIGluIGc9YS5kZWZhdWx0UHJvcHMsZyl2b2lkIDA9PT1jW2RdJiYoY1tkXT1nW2RdKTtyZXR1cm57JCR0eXBlb2Y6bCx0eXBlOmEsa2V5OmsscmVmOmgscHJvcHM6Yyxfb3duZXI6Sy5jdXJyZW50fX1cbmZ1bmN0aW9uIE4oYSxiKXtyZXR1cm57JCR0eXBlb2Y6bCx0eXBlOmEudHlwZSxrZXk6YixyZWY6YS5yZWYscHJvcHM6YS5wcm9wcyxfb3duZXI6YS5fb3duZXJ9fWZ1bmN0aW9uIE8oYSl7cmV0dXJuXCJvYmplY3RcIj09PXR5cGVvZiBhJiZudWxsIT09YSYmYS4kJHR5cGVvZj09PWx9ZnVuY3Rpb24gZXNjYXBlKGEpe3ZhciBiPXtcIj1cIjpcIj0wXCIsXCI6XCI6XCI9MlwifTtyZXR1cm5cIiRcIithLnJlcGxhY2UoL1s9Ol0vZyxmdW5jdGlvbihhKXtyZXR1cm4gYlthXX0pfXZhciBQPS9cXC8rL2c7ZnVuY3Rpb24gUShhLGIpe3JldHVyblwib2JqZWN0XCI9PT10eXBlb2YgYSYmbnVsbCE9PWEmJm51bGwhPWEua2V5P2VzY2FwZShcIlwiK2Eua2V5KTpiLnRvU3RyaW5nKDM2KX1cbmZ1bmN0aW9uIFIoYSxiLGUsZCxjKXt2YXIgaz10eXBlb2YgYTtpZihcInVuZGVmaW5lZFwiPT09a3x8XCJib29sZWFuXCI9PT1rKWE9bnVsbDt2YXIgaD0hMTtpZihudWxsPT09YSloPSEwO2Vsc2Ugc3dpdGNoKGspe2Nhc2UgXCJzdHJpbmdcIjpjYXNlIFwibnVtYmVyXCI6aD0hMDticmVhaztjYXNlIFwib2JqZWN0XCI6c3dpdGNoKGEuJCR0eXBlb2Ype2Nhc2UgbDpjYXNlIG46aD0hMH19aWYoaClyZXR1cm4gaD1hLGM9YyhoKSxhPVwiXCI9PT1kP1wiLlwiK1EoaCwwKTpkLEkoYyk/KGU9XCJcIixudWxsIT1hJiYoZT1hLnJlcGxhY2UoUCxcIiQmL1wiKStcIi9cIiksUihjLGIsZSxcIlwiLGZ1bmN0aW9uKGEpe3JldHVybiBhfSkpOm51bGwhPWMmJihPKGMpJiYoYz1OKGMsZSsoIWMua2V5fHxoJiZoLmtleT09PWMua2V5P1wiXCI6KFwiXCIrYy5rZXkpLnJlcGxhY2UoUCxcIiQmL1wiKStcIi9cIikrYSkpLGIucHVzaChjKSksMTtoPTA7ZD1cIlwiPT09ZD9cIi5cIjpkK1wiOlwiO2lmKEkoYSkpZm9yKHZhciBnPTA7ZzxhLmxlbmd0aDtnKyspe2s9XG5hW2ddO3ZhciBmPWQrUShrLGcpO2grPVIoayxiLGUsZixjKX1lbHNlIGlmKGY9QShhKSxcImZ1bmN0aW9uXCI9PT10eXBlb2YgZilmb3IoYT1mLmNhbGwoYSksZz0wOyEoaz1hLm5leHQoKSkuZG9uZTspaz1rLnZhbHVlLGY9ZCtRKGssZysrKSxoKz1SKGssYixlLGYsYyk7ZWxzZSBpZihcIm9iamVjdFwiPT09ayl0aHJvdyBiPVN0cmluZyhhKSxFcnJvcihcIk9iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogXCIrKFwiW29iamVjdCBPYmplY3RdXCI9PT1iP1wib2JqZWN0IHdpdGgga2V5cyB7XCIrT2JqZWN0LmtleXMoYSkuam9pbihcIiwgXCIpK1wifVwiOmIpK1wiKS4gSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSBpbnN0ZWFkLlwiKTtyZXR1cm4gaH1cbmZ1bmN0aW9uIFMoYSxiLGUpe2lmKG51bGw9PWEpcmV0dXJuIGE7dmFyIGQ9W10sYz0wO1IoYSxkLFwiXCIsXCJcIixmdW5jdGlvbihhKXtyZXR1cm4gYi5jYWxsKGUsYSxjKyspfSk7cmV0dXJuIGR9ZnVuY3Rpb24gVChhKXtpZigtMT09PWEuX3N0YXR1cyl7dmFyIGI9YS5fcmVzdWx0O2I9YigpO2IudGhlbihmdW5jdGlvbihiKXtpZigwPT09YS5fc3RhdHVzfHwtMT09PWEuX3N0YXR1cylhLl9zdGF0dXM9MSxhLl9yZXN1bHQ9Yn0sZnVuY3Rpb24oYil7aWYoMD09PWEuX3N0YXR1c3x8LTE9PT1hLl9zdGF0dXMpYS5fc3RhdHVzPTIsYS5fcmVzdWx0PWJ9KTstMT09PWEuX3N0YXR1cyYmKGEuX3N0YXR1cz0wLGEuX3Jlc3VsdD1iKX1pZigxPT09YS5fc3RhdHVzKXJldHVybiBhLl9yZXN1bHQuZGVmYXVsdDt0aHJvdyBhLl9yZXN1bHQ7fVxudmFyIFU9e2N1cnJlbnQ6bnVsbH0sVj17dHJhbnNpdGlvbjpudWxsfSxXPXtSZWFjdEN1cnJlbnREaXNwYXRjaGVyOlUsUmVhY3RDdXJyZW50QmF0Y2hDb25maWc6VixSZWFjdEN1cnJlbnRPd25lcjpLfTtmdW5jdGlvbiBYKCl7dGhyb3cgRXJyb3IoXCJhY3QoLi4uKSBpcyBub3Qgc3VwcG9ydGVkIGluIHByb2R1Y3Rpb24gYnVpbGRzIG9mIFJlYWN0LlwiKTt9XG5leHBvcnRzLkNoaWxkcmVuPXttYXA6Uyxmb3JFYWNoOmZ1bmN0aW9uKGEsYixlKXtTKGEsZnVuY3Rpb24oKXtiLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0sZSl9LGNvdW50OmZ1bmN0aW9uKGEpe3ZhciBiPTA7UyhhLGZ1bmN0aW9uKCl7YisrfSk7cmV0dXJuIGJ9LHRvQXJyYXk6ZnVuY3Rpb24oYSl7cmV0dXJuIFMoYSxmdW5jdGlvbihhKXtyZXR1cm4gYX0pfHxbXX0sb25seTpmdW5jdGlvbihhKXtpZighTyhhKSl0aHJvdyBFcnJvcihcIlJlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLlwiKTtyZXR1cm4gYX19O2V4cG9ydHMuQ29tcG9uZW50PUU7ZXhwb3J0cy5GcmFnbWVudD1wO2V4cG9ydHMuUHJvZmlsZXI9cjtleHBvcnRzLlB1cmVDb21wb25lbnQ9RztleHBvcnRzLlN0cmljdE1vZGU9cTtleHBvcnRzLlN1c3BlbnNlPXc7XG5leHBvcnRzLl9fU0VDUkVUX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1lPVV9XSUxMX0JFX0ZJUkVEPVc7ZXhwb3J0cy5hY3Q9WDtcbmV4cG9ydHMuY2xvbmVFbGVtZW50PWZ1bmN0aW9uKGEsYixlKXtpZihudWxsPT09YXx8dm9pZCAwPT09YSl0aHJvdyBFcnJvcihcIlJlYWN0LmNsb25lRWxlbWVudCguLi4pOiBUaGUgYXJndW1lbnQgbXVzdCBiZSBhIFJlYWN0IGVsZW1lbnQsIGJ1dCB5b3UgcGFzc2VkIFwiK2ErXCIuXCIpO3ZhciBkPUMoe30sYS5wcm9wcyksYz1hLmtleSxrPWEucmVmLGg9YS5fb3duZXI7aWYobnVsbCE9Yil7dm9pZCAwIT09Yi5yZWYmJihrPWIucmVmLGg9Sy5jdXJyZW50KTt2b2lkIDAhPT1iLmtleSYmKGM9XCJcIitiLmtleSk7aWYoYS50eXBlJiZhLnR5cGUuZGVmYXVsdFByb3BzKXZhciBnPWEudHlwZS5kZWZhdWx0UHJvcHM7Zm9yKGYgaW4gYilKLmNhbGwoYixmKSYmIUwuaGFzT3duUHJvcGVydHkoZikmJihkW2ZdPXZvaWQgMD09PWJbZl0mJnZvaWQgMCE9PWc/Z1tmXTpiW2ZdKX12YXIgZj1hcmd1bWVudHMubGVuZ3RoLTI7aWYoMT09PWYpZC5jaGlsZHJlbj1lO2Vsc2UgaWYoMTxmKXtnPUFycmF5KGYpO1xuZm9yKHZhciBtPTA7bTxmO20rKylnW21dPWFyZ3VtZW50c1ttKzJdO2QuY2hpbGRyZW49Z31yZXR1cm57JCR0eXBlb2Y6bCx0eXBlOmEudHlwZSxrZXk6YyxyZWY6ayxwcm9wczpkLF9vd25lcjpofX07ZXhwb3J0cy5jcmVhdGVDb250ZXh0PWZ1bmN0aW9uKGEpe2E9eyQkdHlwZW9mOnUsX2N1cnJlbnRWYWx1ZTphLF9jdXJyZW50VmFsdWUyOmEsX3RocmVhZENvdW50OjAsUHJvdmlkZXI6bnVsbCxDb25zdW1lcjpudWxsLF9kZWZhdWx0VmFsdWU6bnVsbCxfZ2xvYmFsTmFtZTpudWxsfTthLlByb3ZpZGVyPXskJHR5cGVvZjp0LF9jb250ZXh0OmF9O3JldHVybiBhLkNvbnN1bWVyPWF9O2V4cG9ydHMuY3JlYXRlRWxlbWVudD1NO2V4cG9ydHMuY3JlYXRlRmFjdG9yeT1mdW5jdGlvbihhKXt2YXIgYj1NLmJpbmQobnVsbCxhKTtiLnR5cGU9YTtyZXR1cm4gYn07ZXhwb3J0cy5jcmVhdGVSZWY9ZnVuY3Rpb24oKXtyZXR1cm57Y3VycmVudDpudWxsfX07XG5leHBvcnRzLmZvcndhcmRSZWY9ZnVuY3Rpb24oYSl7cmV0dXJueyQkdHlwZW9mOnYscmVuZGVyOmF9fTtleHBvcnRzLmlzVmFsaWRFbGVtZW50PU87ZXhwb3J0cy5sYXp5PWZ1bmN0aW9uKGEpe3JldHVybnskJHR5cGVvZjp5LF9wYXlsb2FkOntfc3RhdHVzOi0xLF9yZXN1bHQ6YX0sX2luaXQ6VH19O2V4cG9ydHMubWVtbz1mdW5jdGlvbihhLGIpe3JldHVybnskJHR5cGVvZjp4LHR5cGU6YSxjb21wYXJlOnZvaWQgMD09PWI/bnVsbDpifX07ZXhwb3J0cy5zdGFydFRyYW5zaXRpb249ZnVuY3Rpb24oYSl7dmFyIGI9Vi50cmFuc2l0aW9uO1YudHJhbnNpdGlvbj17fTt0cnl7YSgpfWZpbmFsbHl7Vi50cmFuc2l0aW9uPWJ9fTtleHBvcnRzLnVuc3RhYmxlX2FjdD1YO2V4cG9ydHMudXNlQ2FsbGJhY2s9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gVS5jdXJyZW50LnVzZUNhbGxiYWNrKGEsYil9O2V4cG9ydHMudXNlQ29udGV4dD1mdW5jdGlvbihhKXtyZXR1cm4gVS5jdXJyZW50LnVzZUNvbnRleHQoYSl9O1xuZXhwb3J0cy51c2VEZWJ1Z1ZhbHVlPWZ1bmN0aW9uKCl7fTtleHBvcnRzLnVzZURlZmVycmVkVmFsdWU9ZnVuY3Rpb24oYSl7cmV0dXJuIFUuY3VycmVudC51c2VEZWZlcnJlZFZhbHVlKGEpfTtleHBvcnRzLnVzZUVmZmVjdD1mdW5jdGlvbihhLGIpe3JldHVybiBVLmN1cnJlbnQudXNlRWZmZWN0KGEsYil9O2V4cG9ydHMudXNlSWQ9ZnVuY3Rpb24oKXtyZXR1cm4gVS5jdXJyZW50LnVzZUlkKCl9O2V4cG9ydHMudXNlSW1wZXJhdGl2ZUhhbmRsZT1mdW5jdGlvbihhLGIsZSl7cmV0dXJuIFUuY3VycmVudC51c2VJbXBlcmF0aXZlSGFuZGxlKGEsYixlKX07ZXhwb3J0cy51c2VJbnNlcnRpb25FZmZlY3Q9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gVS5jdXJyZW50LnVzZUluc2VydGlvbkVmZmVjdChhLGIpfTtleHBvcnRzLnVzZUxheW91dEVmZmVjdD1mdW5jdGlvbihhLGIpe3JldHVybiBVLmN1cnJlbnQudXNlTGF5b3V0RWZmZWN0KGEsYil9O1xuZXhwb3J0cy51c2VNZW1vPWZ1bmN0aW9uKGEsYil7cmV0dXJuIFUuY3VycmVudC51c2VNZW1vKGEsYil9O2V4cG9ydHMudXNlUmVkdWNlcj1mdW5jdGlvbihhLGIsZSl7cmV0dXJuIFUuY3VycmVudC51c2VSZWR1Y2VyKGEsYixlKX07ZXhwb3J0cy51c2VSZWY9ZnVuY3Rpb24oYSl7cmV0dXJuIFUuY3VycmVudC51c2VSZWYoYSl9O2V4cG9ydHMudXNlU3RhdGU9ZnVuY3Rpb24oYSl7cmV0dXJuIFUuY3VycmVudC51c2VTdGF0ZShhKX07ZXhwb3J0cy51c2VTeW5jRXh0ZXJuYWxTdG9yZT1mdW5jdGlvbihhLGIsZSl7cmV0dXJuIFUuY3VycmVudC51c2VTeW5jRXh0ZXJuYWxTdG9yZShhLGIsZSl9O2V4cG9ydHMudXNlVHJhbnNpdGlvbj1mdW5jdGlvbigpe3JldHVybiBVLmN1cnJlbnQudXNlVHJhbnNpdGlvbigpfTtleHBvcnRzLnZlcnNpb249XCIxOC4zLjFcIjtcbiIsIi8qKlxuICogQGxpY2Vuc2UgUmVhY3RcbiAqIHJlYWN0LmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gIChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICd1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyAqL1xuaWYgKFxuICB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fICE9PSAndW5kZWZpbmVkJyAmJlxuICB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLnJlZ2lzdGVySW50ZXJuYWxNb2R1bGVTdGFydCA9PT1cbiAgICAnZnVuY3Rpb24nXG4pIHtcbiAgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLnJlZ2lzdGVySW50ZXJuYWxNb2R1bGVTdGFydChuZXcgRXJyb3IoKSk7XG59XG4gICAgICAgICAgdmFyIFJlYWN0VmVyc2lvbiA9ICcxOC4zLjEnO1xuXG4vLyBBVFRFTlRJT05cbi8vIFdoZW4gYWRkaW5nIG5ldyBzeW1ib2xzIHRvIHRoaXMgZmlsZSxcbi8vIFBsZWFzZSBjb25zaWRlciBhbHNvIGFkZGluZyB0byAncmVhY3QtZGV2dG9vbHMtc2hhcmVkL3NyYy9iYWNrZW5kL1JlYWN0U3ltYm9scydcbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLlxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKTtcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKTtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKTtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKTtcbnZhciBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZV9saXN0Jyk7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gU3ltYm9sLmZvcigncmVhY3QubWVtbycpO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKTtcbnZhciBSRUFDVF9PRkZTQ1JFRU5fVFlQRSA9IFN5bWJvbC5mb3IoJ3JlYWN0Lm9mZnNjcmVlbicpO1xudmFyIE1BWUJFX0lURVJBVE9SX1NZTUJPTCA9IFN5bWJvbC5pdGVyYXRvcjtcbnZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJztcbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICBpZiAobWF5YmVJdGVyYWJsZSA9PT0gbnVsbCB8fCB0eXBlb2YgbWF5YmVJdGVyYWJsZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBtYXliZUl0ZXJhdG9yID0gTUFZQkVfSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbTUFZQkVfSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXTtcblxuICBpZiAodHlwZW9mIG1heWJlSXRlcmF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbWF5YmVJdGVyYXRvcjtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IGRpc3BhdGNoZXIuXG4gKi9cbnZhciBSZWFjdEN1cnJlbnREaXNwYXRjaGVyID0ge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICovXG4gIGN1cnJlbnQ6IG51bGxcbn07XG5cbi8qKlxuICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgYmF0Y2gncyBjb25maWd1cmF0aW9uIHN1Y2ggYXMgaG93IGxvbmcgYW4gdXBkYXRlXG4gKiBzaG91bGQgc3VzcGVuZCBmb3IgaWYgaXQgbmVlZHMgdG8uXG4gKi9cbnZhciBSZWFjdEN1cnJlbnRCYXRjaENvbmZpZyA9IHtcbiAgdHJhbnNpdGlvbjogbnVsbFxufTtcblxudmFyIFJlYWN0Q3VycmVudEFjdFF1ZXVlID0ge1xuICBjdXJyZW50OiBudWxsLFxuICAvLyBVc2VkIHRvIHJlcHJvZHVjZSBiZWhhdmlvciBvZiBgYmF0Y2hlZFVwZGF0ZXNgIGluIGxlZ2FjeSBtb2RlLlxuICBpc0JhdGNoaW5nTGVnYWN5OiBmYWxzZSxcbiAgZGlkU2NoZWR1bGVMZWdhY3lVcGRhdGU6IGZhbHNlXG59O1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICpcbiAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAqL1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICovXG4gIGN1cnJlbnQ6IG51bGxcbn07XG5cbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0ge307XG52YXIgY3VycmVudEV4dHJhU3RhY2tGcmFtZSA9IG51bGw7XG5mdW5jdGlvbiBzZXRFeHRyYVN0YWNrRnJhbWUoc3RhY2spIHtcbiAge1xuICAgIGN1cnJlbnRFeHRyYVN0YWNrRnJhbWUgPSBzdGFjaztcbiAgfVxufVxuXG57XG4gIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuc2V0RXh0cmFTdGFja0ZyYW1lID0gZnVuY3Rpb24gKHN0YWNrKSB7XG4gICAge1xuICAgICAgY3VycmVudEV4dHJhU3RhY2tGcmFtZSA9IHN0YWNrO1xuICAgIH1cbiAgfTsgLy8gU3RhY2sgaW1wbGVtZW50YXRpb24gaW5qZWN0ZWQgYnkgdGhlIGN1cnJlbnQgcmVuZGVyZXIuXG5cblxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldEN1cnJlbnRTdGFjayA9IG51bGw7XG5cbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdGFjayA9ICcnOyAvLyBBZGQgYW4gZXh0cmEgdG9wIGZyYW1lIHdoaWxlIGFuIGVsZW1lbnQgaXMgYmVpbmcgdmFsaWRhdGVkXG5cbiAgICBpZiAoY3VycmVudEV4dHJhU3RhY2tGcmFtZSkge1xuICAgICAgc3RhY2sgKz0gY3VycmVudEV4dHJhU3RhY2tGcmFtZTtcbiAgICB9IC8vIERlbGVnYXRlIHRvIHRoZSBpbmplY3RlZCByZW5kZXJlci1zcGVjaWZpYyBpbXBsZW1lbnRhdGlvblxuXG5cbiAgICB2YXIgaW1wbCA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0Q3VycmVudFN0YWNrO1xuXG4gICAgaWYgKGltcGwpIHtcbiAgICAgIHN0YWNrICs9IGltcGwoKSB8fCAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhY2s7XG4gIH07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnZhciBlbmFibGVTY29wZUFQSSA9IGZhbHNlOyAvLyBFeHBlcmltZW50YWwgQ3JlYXRlIEV2ZW50IEhhbmRsZSBBUEkuXG52YXIgZW5hYmxlQ2FjaGVFbGVtZW50ID0gZmFsc2U7XG52YXIgZW5hYmxlVHJhbnNpdGlvblRyYWNpbmcgPSBmYWxzZTsgLy8gTm8ga25vd24gYnVncywgYnV0IG5lZWRzIHBlcmZvcm1hbmNlIHRlc3RpbmdcblxudmFyIGVuYWJsZUxlZ2FjeUhpZGRlbiA9IGZhbHNlOyAvLyBFbmFibGVzIHVuc3RhYmxlX2F2b2lkVGhpc0ZhbGxiYWNrIGZlYXR1cmUgaW4gRmliZXJcbi8vIHN0dWZmLiBJbnRlbmRlZCB0byBlbmFibGUgUmVhY3QgY29yZSBtZW1iZXJzIHRvIG1vcmUgZWFzaWx5IGRlYnVnIHNjaGVkdWxpbmdcbi8vIGlzc3VlcyBpbiBERVYgYnVpbGRzLlxuXG52YXIgZW5hYmxlRGVidWdUcmFjaW5nID0gZmFsc2U7IC8vIFRyYWNrIHdoaWNoIEZpYmVyKHMpIHNjaGVkdWxlIHJlbmRlciB3b3JrLlxuXG52YXIgUmVhY3RTaGFyZWRJbnRlcm5hbHMgPSB7XG4gIFJlYWN0Q3VycmVudERpc3BhdGNoZXI6IFJlYWN0Q3VycmVudERpc3BhdGNoZXIsXG4gIFJlYWN0Q3VycmVudEJhdGNoQ29uZmlnOiBSZWFjdEN1cnJlbnRCYXRjaENvbmZpZyxcbiAgUmVhY3RDdXJyZW50T3duZXI6IFJlYWN0Q3VycmVudE93bmVyXG59O1xuXG57XG4gIFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lO1xuICBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdEN1cnJlbnRBY3RRdWV1ZSA9IFJlYWN0Q3VycmVudEFjdFF1ZXVlO1xufVxuXG4vLyBieSBjYWxscyB0byB0aGVzZSBtZXRob2RzIGJ5IGEgQmFiZWwgcGx1Z2luLlxuLy9cbi8vIEluIFBST0QgKG9yIGluIHBhY2thZ2VzIHdpdGhvdXQgYWNjZXNzIHRvIFJlYWN0IGludGVybmFscyksXG4vLyB0aGV5IGFyZSBsZWZ0IGFzIHRoZXkgYXJlIGluc3RlYWQuXG5cbmZ1bmN0aW9uIHdhcm4oZm9ybWF0KSB7XG4gIHtcbiAgICB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcoJ3dhcm4nLCBmb3JtYXQsIGFyZ3MpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gZXJyb3IoZm9ybWF0KSB7XG4gIHtcbiAgICB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcoJ2Vycm9yJywgZm9ybWF0LCBhcmdzKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGxldmVsLCBmb3JtYXQsIGFyZ3MpIHtcbiAgLy8gV2hlbiBjaGFuZ2luZyB0aGlzIGxvZ2ljLCB5b3UgbWlnaHQgd2FudCB0byBhbHNvXG4gIC8vIHVwZGF0ZSBjb25zb2xlV2l0aFN0YWNrRGV2Lnd3dy5qcyBhcyB3ZWxsLlxuICB7XG4gICAgdmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSBSZWFjdFNoYXJlZEludGVybmFscy5SZWFjdERlYnVnQ3VycmVudEZyYW1lO1xuICAgIHZhciBzdGFjayA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuXG4gICAgaWYgKHN0YWNrICE9PSAnJykge1xuICAgICAgZm9ybWF0ICs9ICclcyc7XG4gICAgICBhcmdzID0gYXJncy5jb25jYXQoW3N0YWNrXSk7XG4gICAgfSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaW50ZXJuYWwvc2FmZS1zdHJpbmctY29lcmNpb25cblxuXG4gICAgdmFyIGFyZ3NXaXRoRm9ybWF0ID0gYXJncy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHJldHVybiBTdHJpbmcoaXRlbSk7XG4gICAgfSk7IC8vIENhcmVmdWw6IFJOIGN1cnJlbnRseSBkZXBlbmRzIG9uIHRoaXMgcHJlZml4XG5cbiAgICBhcmdzV2l0aEZvcm1hdC51bnNoaWZ0KCdXYXJuaW5nOiAnICsgZm9ybWF0KTsgLy8gV2UgaW50ZW50aW9uYWxseSBkb24ndCB1c2Ugc3ByZWFkIChvciAuYXBwbHkpIGRpcmVjdGx5IGJlY2F1c2UgaXRcbiAgICAvLyBicmVha3MgSUU5OiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzEzNjEwXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZ1xuXG4gICAgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZVtsZXZlbF0sIGNvbnNvbGUsIGFyZ3NXaXRoRm9ybWF0KTtcbiAgfVxufVxuXG52YXIgZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50ID0ge307XG5cbmZ1bmN0aW9uIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCBjYWxsZXJOYW1lKSB7XG4gIHtcbiAgICB2YXIgX2NvbnN0cnVjdG9yID0gcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3I7XG4gICAgdmFyIGNvbXBvbmVudE5hbWUgPSBfY29uc3RydWN0b3IgJiYgKF9jb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCBfY29uc3RydWN0b3IubmFtZSkgfHwgJ1JlYWN0Q2xhc3MnO1xuICAgIHZhciB3YXJuaW5nS2V5ID0gY29tcG9uZW50TmFtZSArIFwiLlwiICsgY2FsbGVyTmFtZTtcblxuICAgIGlmIChkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnRbd2FybmluZ0tleV0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBlcnJvcihcIkNhbid0IGNhbGwgJXMgb24gYSBjb21wb25lbnQgdGhhdCBpcyBub3QgeWV0IG1vdW50ZWQuIFwiICsgJ1RoaXMgaXMgYSBuby1vcCwgYnV0IGl0IG1pZ2h0IGluZGljYXRlIGEgYnVnIGluIHlvdXIgYXBwbGljYXRpb24uICcgKyAnSW5zdGVhZCwgYXNzaWduIHRvIGB0aGlzLnN0YXRlYCBkaXJlY3RseSBvciBkZWZpbmUgYSBgc3RhdGUgPSB7fTtgICcgKyAnY2xhc3MgcHJvcGVydHkgd2l0aCB0aGUgZGVzaXJlZCBzdGF0ZSBpbiB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNvbXBvbmVudE5hbWUpO1xuXG4gICAgZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50W3dhcm5pbmdLZXldID0gdHJ1ZTtcbiAgfVxufVxuLyoqXG4gKiBUaGlzIGlzIHRoZSBhYnN0cmFjdCBBUEkgZm9yIGFuIHVwZGF0ZSBxdWV1ZS5cbiAqL1xuXG5cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2Ugd2Ugd2FudCB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICAgKlxuICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IGNhbGxlck5hbWUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyBvciBgc2V0U3RhdGVgIHRvIG11dGF0ZSBzdGF0ZS5cbiAgICogWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICAgKlxuICAgKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICAgKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBsZXRlU3RhdGUgTmV4dCBzdGF0ZS5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBjb21wb25lbnQgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSBjYWxsZXJOYW1lIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAncmVwbGFjZVN0YXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBUaGlzIG9ubHkgZXhpc3RzIGJlY2F1c2UgX3BlbmRpbmdTdGF0ZSBpc1xuICAgKiBpbnRlcm5hbC4gVGhpcyBwcm92aWRlcyBhIG1lcmdpbmcgc3RyYXRlZ3kgdGhhdCBpcyBub3QgYXZhaWxhYmxlIHRvIGRlZXBcbiAgICogcHJvcGVydGllcyB3aGljaCBpcyBjb25mdXNpbmcuIFRPRE86IEV4cG9zZSBwZW5kaW5nU3RhdGUgb3IgZG9uJ3QgdXNlIGl0XG4gICAqIGR1cmluZyB0aGUgbWVyZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBzdGF0ZS5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBjb21wb25lbnQgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSBOYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG52YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbntcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG4vKipcbiAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICovXG5cblxuZnVuY3Rpb24gQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDsgLy8gSWYgYSBjb21wb25lbnQgaGFzIHN0cmluZyByZWZzLCB3ZSB3aWxsIGFzc2lnbiBhIGRpZmZlcmVudCBvYmplY3QgbGF0ZXIuXG5cbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7IC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuLyoqXG4gKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIHRvIG11dGF0ZVxuICogc3RhdGUuIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBjYWxscyB0byBgc2V0U3RhdGVgIHdpbGwgcnVuIHN5bmNocm9ub3VzbHksXG4gKiBhcyB0aGV5IG1heSBldmVudHVhbGx5IGJlIGJhdGNoZWQgdG9nZXRoZXIuICBZb3UgY2FuIHByb3ZpZGUgYW4gb3B0aW9uYWxcbiAqIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBjYWxsIHRvIHNldFN0YXRlIGlzIGFjdHVhbGx5XG4gKiBjb21wbGV0ZWQuXG4gKlxuICogV2hlbiBhIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIHRvIHNldFN0YXRlLCBpdCB3aWxsIGJlIGNhbGxlZCBhdCBzb21lIHBvaW50IGluXG4gKiB0aGUgZnV0dXJlIChub3Qgc3luY2hyb25vdXNseSkuIEl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIHVwIHRvIGRhdGVcbiAqIGNvbXBvbmVudCBhcmd1bWVudHMgKHN0YXRlLCBwcm9wcywgY29udGV4dCkuIFRoZXNlIHZhbHVlcyBjYW4gYmUgZGlmZmVyZW50XG4gKiBmcm9tIHRoaXMuKiBiZWNhdXNlIHlvdXIgZnVuY3Rpb24gbWF5IGJlIGNhbGxlZCBhZnRlciByZWNlaXZlUHJvcHMgYnV0IGJlZm9yZVxuICogc2hvdWxkQ29tcG9uZW50VXBkYXRlLCBhbmQgdGhpcyBuZXcgc3RhdGUsIHByb3BzLCBhbmQgY29udGV4dCB3aWxsIG5vdCB5ZXQgYmVcbiAqIGFzc2lnbmVkIHRvIHRoaXMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgb3IgZnVuY3Rpb24gdG9cbiAqICAgICAgICBwcm9kdWNlIG5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBjdXJyZW50IHN0YXRlLlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblxuQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgcGFydGlhbFN0YXRlICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgcGFydGlhbFN0YXRlICE9PSAnZnVuY3Rpb24nICYmIHBhcnRpYWxTdGF0ZSAhPSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhICcgKyAnZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzLicpO1xuICB9XG5cbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbn07XG4vKipcbiAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICpcbiAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICpcbiAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gKlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB1cGRhdGUgaXMgY29tcGxldGUuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuXG5cbkNvbXBvbmVudC5wcm90b3R5cGUuZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzLCBjYWxsYmFjaywgJ2ZvcmNlVXBkYXRlJyk7XG59O1xuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cblxuXG57XG4gIHZhciBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICBpc01vdW50ZWQ6IFsnaXNNb3VudGVkJywgJ0luc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluICcgKyAnY29tcG9uZW50V2lsbFVubW91bnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuJ10sXG4gICAgcmVwbGFjZVN0YXRlOiBbJ3JlcGxhY2VTdGF0ZScsICdSZWZhY3RvciB5b3VyIGNvZGUgdG8gdXNlIHNldFN0YXRlIGluc3RlYWQgKHNlZSAnICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuJ11cbiAgfTtcblxuICB2YXIgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50LnByb3RvdHlwZSwgbWV0aG9kTmFtZSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdhcm4oJyVzKC4uLikgaXMgZGVwcmVjYXRlZCBpbiBwbGFpbiBKYXZhU2NyaXB0IFJlYWN0IGNsYXNzZXMuICVzJywgaW5mb1swXSwgaW5mb1sxXSk7XG5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBmb3IgKHZhciBmbk5hbWUgaW4gZGVwcmVjYXRlZEFQSXMpIHtcbiAgICBpZiAoZGVwcmVjYXRlZEFQSXMuaGFzT3duUHJvcGVydHkoZm5OYW1lKSkge1xuICAgICAgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nKGZuTmFtZSwgZGVwcmVjYXRlZEFQSXNbZm5OYW1lXSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cblxuQ29tcG9uZW50RHVtbXkucHJvdG90eXBlID0gQ29tcG9uZW50LnByb3RvdHlwZTtcbi8qKlxuICogQ29udmVuaWVuY2UgY29tcG9uZW50IHdpdGggZGVmYXVsdCBzaGFsbG93IGVxdWFsaXR5IGNoZWNrIGZvciBzQ1UuXG4gKi9cblxuZnVuY3Rpb24gUHVyZUNvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7IC8vIElmIGEgY29tcG9uZW50IGhhcyBzdHJpbmcgcmVmcywgd2Ugd2lsbCBhc3NpZ24gYSBkaWZmZXJlbnQgb2JqZWN0IGxhdGVyLlxuXG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG52YXIgcHVyZUNvbXBvbmVudFByb3RvdHlwZSA9IFB1cmVDb21wb25lbnQucHJvdG90eXBlID0gbmV3IENvbXBvbmVudER1bW15KCk7XG5wdXJlQ29tcG9uZW50UHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUHVyZUNvbXBvbmVudDsgLy8gQXZvaWQgYW4gZXh0cmEgcHJvdG90eXBlIGp1bXAgZm9yIHRoZXNlIG1ldGhvZHMuXG5cbmFzc2lnbihwdXJlQ29tcG9uZW50UHJvdG90eXBlLCBDb21wb25lbnQucHJvdG90eXBlKTtcbnB1cmVDb21wb25lbnRQcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQgPSB0cnVlO1xuXG4vLyBhbiBpbW11dGFibGUgb2JqZWN0IHdpdGggYSBzaW5nbGUgbXV0YWJsZSB2YWx1ZVxuZnVuY3Rpb24gY3JlYXRlUmVmKCkge1xuICB2YXIgcmVmT2JqZWN0ID0ge1xuICAgIGN1cnJlbnQ6IG51bGxcbiAgfTtcblxuICB7XG4gICAgT2JqZWN0LnNlYWwocmVmT2JqZWN0KTtcbiAgfVxuXG4gIHJldHVybiByZWZPYmplY3Q7XG59XG5cbnZhciBpc0FycmF5SW1wbCA9IEFycmF5LmlzQXJyYXk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZWRlY2xhcmVcblxuZnVuY3Rpb24gaXNBcnJheShhKSB7XG4gIHJldHVybiBpc0FycmF5SW1wbChhKTtcbn1cblxuLypcbiAqIFRoZSBgJycgKyB2YWx1ZWAgcGF0dGVybiAodXNlZCBpbiBpbiBwZXJmLXNlbnNpdGl2ZSBjb2RlKSB0aHJvd3MgZm9yIFN5bWJvbFxuICogYW5kIFRlbXBvcmFsLiogdHlwZXMuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC8yMjA2NC5cbiAqXG4gKiBUaGUgZnVuY3Rpb25zIGluIHRoaXMgbW9kdWxlIHdpbGwgdGhyb3cgYW4gZWFzaWVyLXRvLXVuZGVyc3RhbmQsXG4gKiBlYXNpZXItdG8tZGVidWcgZXhjZXB0aW9uIHdpdGggYSBjbGVhciBlcnJvcnMgbWVzc2FnZSBtZXNzYWdlIGV4cGxhaW5pbmcgdGhlXG4gKiBwcm9ibGVtLiAoSW5zdGVhZCBvZiBhIGNvbmZ1c2luZyBleGNlcHRpb24gdGhyb3duIGluc2lkZSB0aGUgaW1wbGVtZW50YXRpb25cbiAqIG9mIHRoZSBgdmFsdWVgIG9iamVjdCkuXG4gKi9cbi8vICRGbG93Rml4TWUgb25seSBjYWxsZWQgaW4gREVWLCBzbyB2b2lkIHJldHVybiBpcyBub3QgcG9zc2libGUuXG5mdW5jdGlvbiB0eXBlTmFtZSh2YWx1ZSkge1xuICB7XG4gICAgLy8gdG9TdHJpbmdUYWcgaXMgbmVlZGVkIGZvciBuYW1lc3BhY2VkIHR5cGVzIGxpa2UgVGVtcG9yYWwuSW5zdGFudFxuICAgIHZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLnRvU3RyaW5nVGFnO1xuICAgIHZhciB0eXBlID0gaGFzVG9TdHJpbmdUYWcgJiYgdmFsdWVbU3ltYm9sLnRvU3RyaW5nVGFnXSB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lIHx8ICdPYmplY3QnO1xuICAgIHJldHVybiB0eXBlO1xuICB9XG59IC8vICRGbG93Rml4TWUgb25seSBjYWxsZWQgaW4gREVWLCBzbyB2b2lkIHJldHVybiBpcyBub3QgcG9zc2libGUuXG5cblxuZnVuY3Rpb24gd2lsbENvZXJjaW9uVGhyb3codmFsdWUpIHtcbiAge1xuICAgIHRyeSB7XG4gICAgICB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpIHtcbiAgLy8gSWYgeW91IGVuZGVkIHVwIGhlcmUgYnkgZm9sbG93aW5nIGFuIGV4Y2VwdGlvbiBjYWxsIHN0YWNrLCBoZXJlJ3Mgd2hhdCdzXG4gIC8vIGhhcHBlbmVkOiB5b3Ugc3VwcGxpZWQgYW4gb2JqZWN0IG9yIHN5bWJvbCB2YWx1ZSB0byBSZWFjdCAoYXMgYSBwcm9wLCBrZXksXG4gIC8vIERPTSBhdHRyaWJ1dGUsIENTUyBwcm9wZXJ0eSwgc3RyaW5nIHJlZiwgZXRjLikgYW5kIHdoZW4gUmVhY3QgdHJpZWQgdG9cbiAgLy8gY29lcmNlIGl0IHRvIGEgc3RyaW5nIHVzaW5nIGAnJyArIHZhbHVlYCwgYW4gZXhjZXB0aW9uIHdhcyB0aHJvd24uXG4gIC8vXG4gIC8vIFRoZSBtb3N0IGNvbW1vbiB0eXBlcyB0aGF0IHdpbGwgY2F1c2UgdGhpcyBleGNlcHRpb24gYXJlIGBTeW1ib2xgIGluc3RhbmNlc1xuICAvLyBhbmQgVGVtcG9yYWwgb2JqZWN0cyBsaWtlIGBUZW1wb3JhbC5JbnN0YW50YC4gQnV0IGFueSBvYmplY3QgdGhhdCBoYXMgYVxuICAvLyBgdmFsdWVPZmAgb3IgYFtTeW1ib2wudG9QcmltaXRpdmVdYCBtZXRob2QgdGhhdCB0aHJvd3Mgd2lsbCBhbHNvIGNhdXNlIHRoaXNcbiAgLy8gZXhjZXB0aW9uLiAoTGlicmFyeSBhdXRob3JzIGRvIHRoaXMgdG8gcHJldmVudCB1c2VycyBmcm9tIHVzaW5nIGJ1aWx0LWluXG4gIC8vIG51bWVyaWMgb3BlcmF0b3JzIGxpa2UgYCtgIG9yIGNvbXBhcmlzb24gb3BlcmF0b3JzIGxpa2UgYD49YCBiZWNhdXNlIGN1c3RvbVxuICAvLyBtZXRob2RzIGFyZSBuZWVkZWQgdG8gcGVyZm9ybSBhY2N1cmF0ZSBhcml0aG1ldGljIG9yIGNvbXBhcmlzb24uKVxuICAvL1xuICAvLyBUbyBmaXggdGhlIHByb2JsZW0sIGNvZXJjZSB0aGlzIG9iamVjdCBvciBzeW1ib2wgdmFsdWUgdG8gYSBzdHJpbmcgYmVmb3JlXG4gIC8vIHBhc3NpbmcgaXQgdG8gUmVhY3QuIFRoZSBtb3N0IHJlbGlhYmxlIHdheSBpcyB1c3VhbGx5IGBTdHJpbmcodmFsdWUpYC5cbiAgLy9cbiAgLy8gVG8gZmluZCB3aGljaCB2YWx1ZSBpcyB0aHJvd2luZywgY2hlY2sgdGhlIGJyb3dzZXIgb3IgZGVidWdnZXIgY29uc29sZS5cbiAgLy8gQmVmb3JlIHRoaXMgZXhjZXB0aW9uIHdhcyB0aHJvd24sIHRoZXJlIHNob3VsZCBiZSBgY29uc29sZS5lcnJvcmAgb3V0cHV0XG4gIC8vIHRoYXQgc2hvd3MgdGhlIHR5cGUgKFN5bWJvbCwgVGVtcG9yYWwuUGxhaW5EYXRlLCBldGMuKSB0aGF0IGNhdXNlZCB0aGVcbiAgLy8gcHJvYmxlbSBhbmQgaG93IHRoYXQgdHlwZSB3YXMgdXNlZDoga2V5LCBhdHJyaWJ1dGUsIGlucHV0IHZhbHVlIHByb3AsIGV0Yy5cbiAgLy8gSW4gbW9zdCBjYXNlcywgdGhpcyBjb25zb2xlIG91dHB1dCBhbHNvIHNob3dzIHRoZSBjb21wb25lbnQgYW5kIGl0c1xuICAvLyBhbmNlc3RvciBjb21wb25lbnRzIHdoZXJlIHRoZSBleGNlcHRpb24gaGFwcGVuZWQuXG4gIC8vXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9zYWZlLXN0cmluZy1jb2VyY2lvblxuICByZXR1cm4gJycgKyB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNoZWNrS2V5U3RyaW5nQ29lcmNpb24odmFsdWUpIHtcbiAge1xuICAgIGlmICh3aWxsQ29lcmNpb25UaHJvdyh2YWx1ZSkpIHtcbiAgICAgIGVycm9yKCdUaGUgcHJvdmlkZWQga2V5IGlzIGFuIHVuc3VwcG9ydGVkIHR5cGUgJXMuJyArICcgVGhpcyB2YWx1ZSBtdXN0IGJlIGNvZXJjZWQgdG8gYSBzdHJpbmcgYmVmb3JlIGJlZm9yZSB1c2luZyBpdCBoZXJlLicsIHR5cGVOYW1lKHZhbHVlKSk7XG5cbiAgICAgIHJldHVybiB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpOyAvLyB0aHJvdyAodG8gaGVscCBjYWxsZXJzIGZpbmQgdHJvdWJsZXNob290aW5nIGNvbW1lbnRzKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRXcmFwcGVkTmFtZShvdXRlclR5cGUsIGlubmVyVHlwZSwgd3JhcHBlck5hbWUpIHtcbiAgdmFyIGRpc3BsYXlOYW1lID0gb3V0ZXJUeXBlLmRpc3BsYXlOYW1lO1xuXG4gIGlmIChkaXNwbGF5TmFtZSkge1xuICAgIHJldHVybiBkaXNwbGF5TmFtZTtcbiAgfVxuXG4gIHZhciBmdW5jdGlvbk5hbWUgPSBpbm5lclR5cGUuZGlzcGxheU5hbWUgfHwgaW5uZXJUeXBlLm5hbWUgfHwgJyc7XG4gIHJldHVybiBmdW5jdGlvbk5hbWUgIT09ICcnID8gd3JhcHBlck5hbWUgKyBcIihcIiArIGZ1bmN0aW9uTmFtZSArIFwiKVwiIDogd3JhcHBlck5hbWU7XG59IC8vIEtlZXAgaW4gc3luYyB3aXRoIHJlYWN0LXJlY29uY2lsZXIvZ2V0Q29tcG9uZW50TmFtZUZyb21GaWJlclxuXG5cbmZ1bmN0aW9uIGdldENvbnRleHROYW1lKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGUuZGlzcGxheU5hbWUgfHwgJ0NvbnRleHQnO1xufSAvLyBOb3RlIHRoYXQgdGhlIHJlY29uY2lsZXIgcGFja2FnZSBzaG91bGQgZ2VuZXJhbGx5IHByZWZlciB0byB1c2UgZ2V0Q29tcG9uZW50TmFtZUZyb21GaWJlcigpIGluc3RlYWQuXG5cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUpIHtcbiAgaWYgKHR5cGUgPT0gbnVsbCkge1xuICAgIC8vIEhvc3Qgcm9vdCwgdGV4dCBub2RlIG9yIGp1c3QgaW52YWxpZCB0eXBlLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAge1xuICAgIGlmICh0eXBlb2YgdHlwZS50YWcgPT09ICdudW1iZXInKSB7XG4gICAgICBlcnJvcignUmVjZWl2ZWQgYW4gdW5leHBlY3RlZCBvYmplY3QgaW4gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKCkuICcgKyAnVGhpcyBpcyBsaWtlbHkgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCBudWxsO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgcmV0dXJuICdGcmFnbWVudCc7XG5cbiAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgcmV0dXJuICdQb3J0YWwnO1xuXG4gICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgcmV0dXJuICdQcm9maWxlcic7XG5cbiAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N0cmljdE1vZGUnO1xuXG4gICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgcmV0dXJuICdTdXNwZW5zZSc7XG5cbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgIHJldHVybiAnU3VzcGVuc2VMaXN0JztcblxuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHN3aXRjaCAodHlwZS4kJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgIHZhciBjb250ZXh0ID0gdHlwZTtcbiAgICAgICAgcmV0dXJuIGdldENvbnRleHROYW1lKGNvbnRleHQpICsgJy5Db25zdW1lcic7XG5cbiAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgdmFyIHByb3ZpZGVyID0gdHlwZTtcbiAgICAgICAgcmV0dXJuIGdldENvbnRleHROYW1lKHByb3ZpZGVyLl9jb250ZXh0KSArICcuUHJvdmlkZXInO1xuXG4gICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgIHJldHVybiBnZXRXcmFwcGVkTmFtZSh0eXBlLCB0eXBlLnJlbmRlciwgJ0ZvcndhcmRSZWYnKTtcblxuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgIHZhciBvdXRlck5hbWUgPSB0eXBlLmRpc3BsYXlOYW1lIHx8IG51bGw7XG5cbiAgICAgICAgaWYgKG91dGVyTmFtZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBvdXRlck5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUudHlwZSkgfHwgJ01lbW8nO1xuXG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBsYXp5Q29tcG9uZW50ID0gdHlwZTtcbiAgICAgICAgICB2YXIgcGF5bG9hZCA9IGxhenlDb21wb25lbnQuX3BheWxvYWQ7XG4gICAgICAgICAgdmFyIGluaXQgPSBsYXp5Q29tcG9uZW50Ll9pbml0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoaW5pdChwYXlsb2FkKSk7XG4gICAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1mYWxsdGhyb3VnaFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgUkVTRVJWRURfUFJPUFMgPSB7XG4gIGtleTogdHJ1ZSxcbiAgcmVmOiB0cnVlLFxuICBfX3NlbGY6IHRydWUsXG4gIF9fc291cmNlOiB0cnVlXG59O1xudmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duLCBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biwgZGlkV2FybkFib3V0U3RyaW5nUmVmcztcblxue1xuICBkaWRXYXJuQWJvdXRTdHJpbmdSZWZzID0ge307XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkUmVmKGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAncmVmJykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ3JlZicpLmdldDtcblxuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb25maWcucmVmICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAna2V5JykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ2tleScpLmdldDtcblxuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb25maWcua2V5ICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2YXIgd2FybkFib3V0QWNjZXNzaW5nS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgIHtcbiAgICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuXG4gICAgICAgIGVycm9yKCclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vcmVhY3Rqcy5vcmcvbGluay9zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAge1xuICAgICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG5cbiAgICAgICAgZXJyb3IoJyVzOiBgcmVmYCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9yZWFjdGpzLm9yZy9saW5rL3NwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiB3YXJuSWZTdHJpbmdSZWZDYW5ub3RCZUF1dG9Db252ZXJ0ZWQoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5yZWYgPT09ICdzdHJpbmcnICYmIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQgJiYgY29uZmlnLl9fc2VsZiAmJiBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnN0YXRlTm9kZSAhPT0gY29uZmlnLl9fc2VsZikge1xuICAgICAgdmFyIGNvbXBvbmVudE5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKTtcblxuICAgICAgaWYgKCFkaWRXYXJuQWJvdXRTdHJpbmdSZWZzW2NvbXBvbmVudE5hbWVdKSB7XG4gICAgICAgIGVycm9yKCdDb21wb25lbnQgXCIlc1wiIGNvbnRhaW5zIHRoZSBzdHJpbmcgcmVmIFwiJXNcIi4gJyArICdTdXBwb3J0IGZvciBzdHJpbmcgcmVmcyB3aWxsIGJlIHJlbW92ZWQgaW4gYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gJyArICdUaGlzIGNhc2UgY2Fubm90IGJlIGF1dG9tYXRpY2FsbHkgY29udmVydGVkIHRvIGFuIGFycm93IGZ1bmN0aW9uLiAnICsgJ1dlIGFzayB5b3UgdG8gbWFudWFsbHkgZml4IHRoaXMgY2FzZSBieSB1c2luZyB1c2VSZWYoKSBvciBjcmVhdGVSZWYoKSBpbnN0ZWFkLiAnICsgJ0xlYXJuIG1vcmUgYWJvdXQgdXNpbmcgcmVmcyBzYWZlbHkgaGVyZTogJyArICdodHRwczovL3JlYWN0anMub3JnL2xpbmsvc3RyaWN0LW1vZGUtc3RyaW5nLXJlZicsIGNvbXBvbmVudE5hbWUsIGNvbmZpZy5yZWYpO1xuXG4gICAgICAgIGRpZFdhcm5BYm91dFN0cmluZ1JlZnNbY29tcG9uZW50TmFtZV0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgbm90IHdvcmsuIEluc3RlYWQgdGVzdCAkJHR5cGVvZiBmaWVsZCBhZ2FpbnN0IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSB0byBjaGVja1xuICogaWYgc29tZXRoaW5nIGlzIGEgUmVhY3QgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBwYXJhbSB7Kn0ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHJlZlxuICogQHBhcmFtIHsqfSBvd25lclxuICogQHBhcmFtIHsqfSBzZWxmIEEgKnRlbXBvcmFyeSogaGVscGVyIHRvIGRldGVjdCBwbGFjZXMgd2hlcmUgYHRoaXNgIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSB0aGUgYG93bmVyYCB3aGVuIFJlYWN0LmNyZWF0ZUVsZW1lbnQgaXMgY2FsbGVkLCBzbyB0aGF0IHdlXG4gKiBjYW4gd2Fybi4gV2Ugd2FudCB0byBnZXQgcmlkIG9mIG93bmVyIGFuZCByZXBsYWNlIHN0cmluZyBgcmVmYHMgd2l0aCBhcnJvd1xuICogZnVuY3Rpb25zLCBhbmQgYXMgbG9uZyBhcyBgdGhpc2AgYW5kIG93bmVyIGFyZSB0aGUgc2FtZSwgdGhlcmUgd2lsbCBiZSBub1xuICogY2hhbmdlIGluIGJlaGF2aW9yLlxuICogQHBhcmFtIHsqfSBzb3VyY2UgQW4gYW5ub3RhdGlvbiBvYmplY3QgKGFkZGVkIGJ5IGEgdHJhbnNwaWxlciBvciBvdGhlcndpc2UpXG4gKiBpbmRpY2F0aW5nIGZpbGVuYW1lLCBsaW5lIG51bWJlciwgYW5kL29yIG90aGVyIGluZm9ybWF0aW9uLlxuICogQGludGVybmFsXG4gKi9cblxuXG52YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgZWxlbWVudCA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvd3MgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuICAgIC8vIEJ1aWx0LWluIHByb3BlcnRpZXMgdGhhdCBiZWxvbmcgb24gdGhlIGVsZW1lbnRcbiAgICB0eXBlOiB0eXBlLFxuICAgIGtleToga2V5LFxuICAgIHJlZjogcmVmLFxuICAgIHByb3BzOiBwcm9wcyxcbiAgICAvLyBSZWNvcmQgdGhlIGNvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhpcyBlbGVtZW50LlxuICAgIF9vd25lcjogb3duZXJcbiAgfTtcblxuICB7XG4gICAgLy8gVGhlIHZhbGlkYXRpb24gZmxhZyBpcyBjdXJyZW50bHkgbXV0YXRpdmUuIFdlIHB1dCBpdCBvblxuICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgLy8gVGhpcyBjYW4gYmUgcmVwbGFjZWQgd2l0aCBhIFdlYWtNYXAgb25jZSB0aGV5IGFyZSBpbXBsZW1lbnRlZCBpblxuICAgIC8vIGNvbW1vbmx5IHVzZWQgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzLlxuICAgIGVsZW1lbnQuX3N0b3JlID0ge307IC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfSk7IC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogc2VsZlxuICAgIH0pOyAvLyBUd28gZWxlbWVudHMgY3JlYXRlZCBpbiB0d28gZGlmZmVyZW50IHBsYWNlcyBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgIC8vIGVxdWFsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIGFuZCB0aGVyZWZvcmUgd2UgaGlkZSBpdCBmcm9tIGVudW1lcmF0aW9uLlxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHNvdXJjZVxuICAgIH0pO1xuXG4gICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IG9mIHRoZSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVlbGVtZW50XG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTsgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuXG4gIHZhciBwcm9wcyA9IHt9O1xuICB2YXIga2V5ID0gbnVsbDtcbiAgdmFyIHJlZiA9IG51bGw7XG4gIHZhciBzZWxmID0gbnVsbDtcbiAgdmFyIHNvdXJjZSA9IG51bGw7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG5cbiAgICAgIHtcbiAgICAgICAgd2FybklmU3RyaW5nUmVmQ2Fubm90QmVBdXRvQ29udmVydGVkKGNvbmZpZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIHtcbiAgICAgICAgY2hlY2tLZXlTdHJpbmdDb2VyY2lvbihjb25maWcua2V5KTtcbiAgICAgIH1cblxuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIHNlbGYgPSBjb25maWcuX19zZWxmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc2VsZjtcbiAgICBzb3VyY2UgPSBjb25maWcuX19zb3VyY2UgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zb3VyY2U7IC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcblxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9IC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG5cblxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcblxuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG5cbiAgICB7XG4gICAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgICBPYmplY3QuZnJlZXplKGNoaWxkQXJyYXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfSAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcblxuXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuXG4gICAgZm9yIChwcm9wTmFtZSBpbiBkZWZhdWx0UHJvcHMpIHtcbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHtcbiAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuXG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbn1cbmZ1bmN0aW9uIGNsb25lQW5kUmVwbGFjZUtleShvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQob2xkRWxlbWVudC50eXBlLCBuZXdLZXksIG9sZEVsZW1lbnQucmVmLCBvbGRFbGVtZW50Ll9zZWxmLCBvbGRFbGVtZW50Ll9zb3VyY2UsIG9sZEVsZW1lbnQuX293bmVyLCBvbGRFbGVtZW50LnByb3BzKTtcbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59XG4vKipcbiAqIENsb25lIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IHVzaW5nIGVsZW1lbnQgYXMgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjbG9uZWVsZW1lbnRcbiAqL1xuXG5mdW5jdGlvbiBjbG9uZUVsZW1lbnQoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICBpZiAoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWFjdC5jbG9uZUVsZW1lbnQoLi4uKTogVGhlIGFyZ3VtZW50IG11c3QgYmUgYSBSZWFjdCBlbGVtZW50LCBidXQgeW91IHBhc3NlZCBcIiArIGVsZW1lbnQgKyBcIi5cIik7XG4gIH1cblxuICB2YXIgcHJvcE5hbWU7IC8vIE9yaWdpbmFsIHByb3BzIGFyZSBjb3BpZWRcblxuICB2YXIgcHJvcHMgPSBhc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpOyAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG5cbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7IC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG5cbiAgdmFyIHNlbGYgPSBlbGVtZW50Ll9zZWxmOyAvLyBTb3VyY2UgaXMgcHJlc2VydmVkIHNpbmNlIGNsb25lRWxlbWVudCBpcyB1bmxpa2VseSB0byBiZSB0YXJnZXRlZCBieSBhXG4gIC8vIHRyYW5zcGlsZXIsIGFuZCB0aGUgb3JpZ2luYWwgc291cmNlIGlzIHByb2JhYmx5IGEgYmV0dGVyIGluZGljYXRvciBvZiB0aGVcbiAgLy8gdHJ1ZSBvd25lci5cblxuICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlOyAvLyBPd25lciB3aWxsIGJlIHByZXNlcnZlZCwgdW5sZXNzIHJlZiBpcyBvdmVycmlkZGVuXG5cbiAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIC8vIFNpbGVudGx5IHN0ZWFsIHRoZSByZWYgZnJvbSB0aGUgcGFyZW50LlxuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB9XG5cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAge1xuICAgICAgICBjaGVja0tleVN0cmluZ0NvZXJjaW9uKGNvbmZpZy5rZXkpO1xuICAgICAgfVxuXG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfSAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBvdmVycmlkZSBleGlzdGluZyBwcm9wc1xuXG5cbiAgICB2YXIgZGVmYXVsdFByb3BzO1xuXG4gICAgaWYgKGVsZW1lbnQudHlwZSAmJiBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICBkZWZhdWx0UHJvcHMgPSBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzO1xuICAgIH1cblxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cblxuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuXG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cblxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoZWxlbWVudC50eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpO1xufVxuLyoqXG4gKiBWZXJpZmllcyB0aGUgb2JqZWN0IGlzIGEgUmVhY3RFbGVtZW50LlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNpc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBAZmluYWxcbiAqL1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn1cblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG4vKipcbiAqIEVzY2FwZSBhbmQgd3JhcCBrZXkgc28gaXQgaXMgc2FmZSB0byB1c2UgYXMgYSByZWFjdGlkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSB0byBiZSBlc2NhcGVkLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgZXNjYXBlZCBrZXkuXG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlKGtleSkge1xuICB2YXIgZXNjYXBlUmVnZXggPSAvWz06XS9nO1xuICB2YXIgZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPSc6ICc9MCcsXG4gICAgJzonOiAnPTInXG4gIH07XG4gIHZhciBlc2NhcGVkU3RyaW5nID0ga2V5LnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG4gIHJldHVybiAnJCcgKyBlc2NhcGVkU3RyaW5nO1xufVxuLyoqXG4gKiBUT0RPOiBUZXN0IHRoYXQgYSBzaW5nbGUgY2hpbGQgYW5kIGFuIGFycmF5IHdpdGggb25lIGl0ZW0gaGF2ZSB0aGUgc2FtZSBrZXlcbiAqIHBhdHRlcm4uXG4gKi9cblxuXG52YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xudmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4ID0gL1xcLysvZztcblxuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuIHRleHQucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuLyoqXG4gKiBHZW5lcmF0ZSBhIGtleSBzdHJpbmcgdGhhdCBpZGVudGlmaWVzIGEgZWxlbWVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBlbGVtZW50IEEgZWxlbWVudCB0aGF0IGNvdWxkIGNvbnRhaW4gYSBtYW51YWwga2V5LlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IHRoYXQgaXMgdXNlZCBpZiBhIG1hbnVhbCBrZXkgaXMgbm90IHByb3ZpZGVkLlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5cblxuZnVuY3Rpb24gZ2V0RWxlbWVudEtleShlbGVtZW50LCBpbmRleCkge1xuICAvLyBEbyBzb21lIHR5cGVjaGVja2luZyBoZXJlIHNpbmNlIHdlIGNhbGwgdGhpcyBibGluZGx5LiBXZSB3YW50IHRvIGVuc3VyZVxuICAvLyB0aGF0IHdlIGRvbid0IGJsb2NrIHBvdGVudGlhbCBmdXR1cmUgRVMgQVBJcy5cbiAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnb2JqZWN0JyAmJiBlbGVtZW50ICE9PSBudWxsICYmIGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICAvLyBFeHBsaWNpdCBrZXlcbiAgICB7XG4gICAgICBjaGVja0tleVN0cmluZ0NvZXJjaW9uKGVsZW1lbnQua2V5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXNjYXBlKCcnICsgZWxlbWVudC5rZXkpO1xuICB9IC8vIEltcGxpY2l0IGtleSBkZXRlcm1pbmVkIGJ5IHRoZSBpbmRleCBpbiB0aGUgc2V0XG5cblxuICByZXR1cm4gaW5kZXgudG9TdHJpbmcoMzYpO1xufVxuXG5mdW5jdGlvbiBtYXBJbnRvQXJyYXkoY2hpbGRyZW4sIGFycmF5LCBlc2NhcGVkUHJlZml4LCBuYW1lU29GYXIsIGNhbGxiYWNrKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICBjaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICB2YXIgaW52b2tlQ2FsbGJhY2sgPSBmYWxzZTtcblxuICBpZiAoY2hpbGRyZW4gPT09IG51bGwpIHtcbiAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgaW52b2tlQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgc3dpdGNoIChjaGlsZHJlbi4kJHR5cGVvZikge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgICAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIGlmIChpbnZva2VDYWxsYmFjaykge1xuICAgIHZhciBfY2hpbGQgPSBjaGlsZHJlbjtcbiAgICB2YXIgbWFwcGVkQ2hpbGQgPSBjYWxsYmFjayhfY2hpbGQpOyAvLyBJZiBpdCdzIHRoZSBvbmx5IGNoaWxkLCB0cmVhdCB0aGUgbmFtZSBhcyBpZiBpdCB3YXMgd3JhcHBlZCBpbiBhbiBhcnJheVxuICAgIC8vIHNvIHRoYXQgaXQncyBjb25zaXN0ZW50IGlmIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gZ3Jvd3M6XG5cbiAgICB2YXIgY2hpbGRLZXkgPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0RWxlbWVudEtleShfY2hpbGQsIDApIDogbmFtZVNvRmFyO1xuXG4gICAgaWYgKGlzQXJyYXkobWFwcGVkQ2hpbGQpKSB7XG4gICAgICB2YXIgZXNjYXBlZENoaWxkS2V5ID0gJyc7XG5cbiAgICAgIGlmIChjaGlsZEtleSAhPSBudWxsKSB7XG4gICAgICAgIGVzY2FwZWRDaGlsZEtleSA9IGVzY2FwZVVzZXJQcm92aWRlZEtleShjaGlsZEtleSkgKyAnLyc7XG4gICAgICB9XG5cbiAgICAgIG1hcEludG9BcnJheShtYXBwZWRDaGlsZCwgYXJyYXksIGVzY2FwZWRDaGlsZEtleSwgJycsIGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIHJldHVybiBjO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgICBpZiAoaXNWYWxpZEVsZW1lbnQobWFwcGVkQ2hpbGQpKSB7XG4gICAgICAgIHtcbiAgICAgICAgICAvLyBUaGUgYGlmYCBzdGF0ZW1lbnQgaGVyZSBwcmV2ZW50cyBhdXRvLWRpc2FibGluZyBvZiB0aGUgc2FmZVxuICAgICAgICAgIC8vIGNvZXJjaW9uIEVTTGludCBydWxlLCBzbyB3ZSBtdXN0IG1hbnVhbGx5IGRpc2FibGUgaXQgYmVsb3cuXG4gICAgICAgICAgLy8gJEZsb3dGaXhNZSBGbG93IGluY29ycmVjdGx5IHRoaW5rcyBSZWFjdC5Qb3J0YWwgZG9lc24ndCBoYXZlIGEga2V5XG4gICAgICAgICAgaWYgKG1hcHBlZENoaWxkLmtleSAmJiAoIV9jaGlsZCB8fCBfY2hpbGQua2V5ICE9PSBtYXBwZWRDaGlsZC5rZXkpKSB7XG4gICAgICAgICAgICBjaGVja0tleVN0cmluZ0NvZXJjaW9uKG1hcHBlZENoaWxkLmtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbWFwcGVkQ2hpbGQgPSBjbG9uZUFuZFJlcGxhY2VLZXkobWFwcGVkQ2hpbGQsIC8vIEtlZXAgYm90aCB0aGUgKG1hcHBlZCkgYW5kIG9sZCBrZXlzIGlmIHRoZXkgZGlmZmVyLCBqdXN0IGFzXG4gICAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAgICBlc2NhcGVkUHJlZml4ICsgKCAvLyAkRmxvd0ZpeE1lIEZsb3cgaW5jb3JyZWN0bHkgdGhpbmtzIFJlYWN0LlBvcnRhbCBkb2Vzbid0IGhhdmUgYSBrZXlcbiAgICAgICAgbWFwcGVkQ2hpbGQua2V5ICYmICghX2NoaWxkIHx8IF9jaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkgPyAvLyAkRmxvd0ZpeE1lIEZsb3cgaW5jb3JyZWN0bHkgdGhpbmtzIGV4aXN0aW5nIGVsZW1lbnQncyBrZXkgY2FuIGJlIGEgbnVtYmVyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1pbnRlcm5hbC9zYWZlLXN0cmluZy1jb2VyY2lvblxuICAgICAgICBlc2NhcGVVc2VyUHJvdmlkZWRLZXkoJycgKyBtYXBwZWRDaGlsZC5rZXkpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgICAgfVxuXG4gICAgICBhcnJheS5wdXNoKG1hcHBlZENoaWxkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHZhciBjaGlsZDtcbiAgdmFyIG5leHROYW1lO1xuICB2YXIgc3VidHJlZUNvdW50ID0gMDsgLy8gQ291bnQgb2YgY2hpbGRyZW4gZm91bmQgaW4gdGhlIGN1cnJlbnQgc3VidHJlZS5cblxuICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gIGlmIChpc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0RWxlbWVudEtleShjaGlsZCwgaSk7XG4gICAgICBzdWJ0cmVlQ291bnQgKz0gbWFwSW50b0FycmF5KGNoaWxkLCBhcnJheSwgZXNjYXBlZFByZWZpeCwgbmV4dE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKGNoaWxkcmVuKTtcblxuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIGl0ZXJhYmxlQ2hpbGRyZW4gPSBjaGlsZHJlbjtcblxuICAgICAge1xuICAgICAgICAvLyBXYXJuIGFib3V0IHVzaW5nIE1hcHMgYXMgY2hpbGRyZW5cbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4gPT09IGl0ZXJhYmxlQ2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICAgIGlmICghZGlkV2FybkFib3V0TWFwcykge1xuICAgICAgICAgICAgd2FybignVXNpbmcgTWFwcyBhcyBjaGlsZHJlbiBpcyBub3Qgc3VwcG9ydGVkLiAnICsgJ1VzZSBhbiBhcnJheSBvZiBrZXllZCBSZWFjdEVsZW1lbnRzIGluc3RlYWQuJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGlkV2FybkFib3V0TWFwcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKGl0ZXJhYmxlQ2hpbGRyZW4pO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICB2YXIgaWkgPSAwO1xuXG4gICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgIGNoaWxkID0gc3RlcC52YWx1ZTtcbiAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldEVsZW1lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICBzdWJ0cmVlQ291bnQgKz0gbWFwSW50b0FycmF5KGNoaWxkLCBhcnJheSwgZXNjYXBlZFByZWZpeCwgbmV4dE5hbWUsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaW50ZXJuYWwvc2FmZS1zdHJpbmctY29lcmNpb25cbiAgICAgIHZhciBjaGlsZHJlblN0cmluZyA9IFN0cmluZyhjaGlsZHJlbik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJPYmplY3RzIGFyZSBub3QgdmFsaWQgYXMgYSBSZWFjdCBjaGlsZCAoZm91bmQ6IFwiICsgKGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZykgKyBcIikuIFwiICsgJ0lmIHlvdSBtZWFudCB0byByZW5kZXIgYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuLCB1c2UgYW4gYXJyYXkgJyArICdpbnN0ZWFkLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdWJ0cmVlQ291bnQ7XG59XG5cbi8qKlxuICogTWFwcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZ1bmMgVGhlIG1hcCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBDb250ZXh0IGZvciBtYXBGdW5jdGlvbi5cbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jLCBjb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIgY291bnQgPSAwO1xuICBtYXBJbnRvQXJyYXkoY2hpbGRyZW4sIHJlc3VsdCwgJycsICcnLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBjb3VudCsrKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5jb3VudFxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuLlxuICovXG5cblxuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbikge1xuICB2YXIgbiA9IDA7XG4gIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jdGlvbiAoKSB7XG4gICAgbisrOyAvLyBEb24ndCByZXR1cm4gYW55dGhpbmdcbiAgfSk7XG4gIHJldHVybiBuO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbmZvcmVhY2hcbiAqXG4gKiBUaGUgcHJvdmlkZWQgZm9yRWFjaEZ1bmMoY2hpbGQsIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZm9yRWFjaEZ1bmNcbiAqIEBwYXJhbSB7Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCBmb3IgZm9yRWFjaENvbnRleHQuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2hDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KSB7XG4gIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yRWFjaEZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgLy8gRG9uJ3QgcmV0dXJuIGFueXRoaW5nLlxuICB9LCBmb3JFYWNoQ29udGV4dCk7XG59XG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbnRvYXJyYXlcbiAqL1xuXG5cbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgcmV0dXJuIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICByZXR1cm4gY2hpbGQ7XG4gIH0pIHx8IFtdO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbm9ubHlcbiAqXG4gKiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzXG4gKiBwYXNzZWQgd2l0aG91dCBhIHdyYXBwZXIsIGJ1dCB0aGUgcHVycG9zZSBvZiB0aGlzIGhlbHBlciBmdW5jdGlvbiBpcyB0b1xuICogYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmUgb2YgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBjaGlsZHJlbiBDaGlsZCBjb2xsZWN0aW9uIHN0cnVjdHVyZS5cbiAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdEVsZW1lbnRgIGNvbnRhaW5lZCBpbiB0aGVcbiAqIHN0cnVjdHVyZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIG9ubHlDaGlsZChjaGlsZHJlbikge1xuICBpZiAoIWlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignUmVhY3QuQ2hpbGRyZW4ub25seSBleHBlY3RlZCB0byByZWNlaXZlIGEgc2luZ2xlIFJlYWN0IGVsZW1lbnQgY2hpbGQuJyk7XG4gIH1cblxuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoZGVmYXVsdFZhbHVlKSB7XG4gIC8vIFRPRE86IFNlY29uZCBhcmd1bWVudCB1c2VkIHRvIGJlIGFuIG9wdGlvbmFsIGBjYWxjdWxhdGVDaGFuZ2VkQml0c2BcbiAgLy8gZnVuY3Rpb24uIFdhcm4gdG8gcmVzZXJ2ZSBmb3IgZnV0dXJlIHVzZT9cbiAgdmFyIGNvbnRleHQgPSB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0NPTlRFWFRfVFlQRSxcbiAgICAvLyBBcyBhIHdvcmthcm91bmQgdG8gc3VwcG9ydCBtdWx0aXBsZSBjb25jdXJyZW50IHJlbmRlcmVycywgd2UgY2F0ZWdvcml6ZVxuICAgIC8vIHNvbWUgcmVuZGVyZXJzIGFzIHByaW1hcnkgYW5kIG90aGVycyBhcyBzZWNvbmRhcnkuIFdlIG9ubHkgZXhwZWN0XG4gICAgLy8gdGhlcmUgdG8gYmUgdHdvIGNvbmN1cnJlbnQgcmVuZGVyZXJzIGF0IG1vc3Q6IFJlYWN0IE5hdGl2ZSAocHJpbWFyeSkgYW5kXG4gICAgLy8gRmFicmljIChzZWNvbmRhcnkpOyBSZWFjdCBET00gKHByaW1hcnkpIGFuZCBSZWFjdCBBUlQgKHNlY29uZGFyeSkuXG4gICAgLy8gU2Vjb25kYXJ5IHJlbmRlcmVycyBzdG9yZSB0aGVpciBjb250ZXh0IHZhbHVlcyBvbiBzZXBhcmF0ZSBmaWVsZHMuXG4gICAgX2N1cnJlbnRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuICAgIF9jdXJyZW50VmFsdWUyOiBkZWZhdWx0VmFsdWUsXG4gICAgLy8gVXNlZCB0byB0cmFjayBob3cgbWFueSBjb25jdXJyZW50IHJlbmRlcmVycyB0aGlzIGNvbnRleHQgY3VycmVudGx5XG4gICAgLy8gc3VwcG9ydHMgd2l0aGluIGluIGEgc2luZ2xlIHJlbmRlcmVyLiBTdWNoIGFzIHBhcmFsbGVsIHNlcnZlciByZW5kZXJpbmcuXG4gICAgX3RocmVhZENvdW50OiAwLFxuICAgIC8vIFRoZXNlIGFyZSBjaXJjdWxhclxuICAgIFByb3ZpZGVyOiBudWxsLFxuICAgIENvbnN1bWVyOiBudWxsLFxuICAgIC8vIEFkZCB0aGVzZSB0byB1c2Ugc2FtZSBoaWRkZW4gY2xhc3MgaW4gVk0gYXMgU2VydmVyQ29udGV4dFxuICAgIF9kZWZhdWx0VmFsdWU6IG51bGwsXG4gICAgX2dsb2JhbE5hbWU6IG51bGxcbiAgfTtcbiAgY29udGV4dC5Qcm92aWRlciA9IHtcbiAgICAkJHR5cGVvZjogUkVBQ1RfUFJPVklERVJfVFlQRSxcbiAgICBfY29udGV4dDogY29udGV4dFxuICB9O1xuICB2YXIgaGFzV2FybmVkQWJvdXRVc2luZ05lc3RlZENvbnRleHRDb25zdW1lcnMgPSBmYWxzZTtcbiAgdmFyIGhhc1dhcm5lZEFib3V0VXNpbmdDb25zdW1lclByb3ZpZGVyID0gZmFsc2U7XG4gIHZhciBoYXNXYXJuZWRBYm91dERpc3BsYXlOYW1lT25Db25zdW1lciA9IGZhbHNlO1xuXG4gIHtcbiAgICAvLyBBIHNlcGFyYXRlIG9iamVjdCwgYnV0IHByb3hpZXMgYmFjayB0byB0aGUgb3JpZ2luYWwgY29udGV4dCBvYmplY3QgZm9yXG4gICAgLy8gYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuIEl0IGhhcyBhIGRpZmZlcmVudCAkJHR5cGVvZiwgc28gd2UgY2FuIHByb3Blcmx5XG4gICAgLy8gd2FybiBmb3IgdGhlIGluY29ycmVjdCB1c2FnZSBvZiBDb250ZXh0IGFzIGEgQ29uc3VtZXIuXG4gICAgdmFyIENvbnN1bWVyID0ge1xuICAgICAgJCR0eXBlb2Y6IFJFQUNUX0NPTlRFWFRfVFlQRSxcbiAgICAgIF9jb250ZXh0OiBjb250ZXh0XG4gICAgfTsgLy8gJEZsb3dGaXhNZTogRmxvdyBjb21wbGFpbnMgYWJvdXQgbm90IHNldHRpbmcgYSB2YWx1ZSwgd2hpY2ggaXMgaW50ZW50aW9uYWwgaGVyZVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQ29uc3VtZXIsIHtcbiAgICAgIFByb3ZpZGVyOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICghaGFzV2FybmVkQWJvdXRVc2luZ0NvbnN1bWVyUHJvdmlkZXIpIHtcbiAgICAgICAgICAgIGhhc1dhcm5lZEFib3V0VXNpbmdDb25zdW1lclByb3ZpZGVyID0gdHJ1ZTtcblxuICAgICAgICAgICAgZXJyb3IoJ1JlbmRlcmluZyA8Q29udGV4dC5Db25zdW1lci5Qcm92aWRlcj4gaXMgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluICcgKyAnYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gRGlkIHlvdSBtZWFuIHRvIHJlbmRlciA8Q29udGV4dC5Qcm92aWRlcj4gaW5zdGVhZD8nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gY29udGV4dC5Qcm92aWRlcjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoX1Byb3ZpZGVyKSB7XG4gICAgICAgICAgY29udGV4dC5Qcm92aWRlciA9IF9Qcm92aWRlcjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIF9jdXJyZW50VmFsdWU6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuX2N1cnJlbnRWYWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoX2N1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgIGNvbnRleHQuX2N1cnJlbnRWYWx1ZSA9IF9jdXJyZW50VmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBfY3VycmVudFZhbHVlMjoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY29udGV4dC5fY3VycmVudFZhbHVlMjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoX2N1cnJlbnRWYWx1ZTIpIHtcbiAgICAgICAgICBjb250ZXh0Ll9jdXJyZW50VmFsdWUyID0gX2N1cnJlbnRWYWx1ZTI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBfdGhyZWFkQ291bnQ6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuX3RocmVhZENvdW50O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChfdGhyZWFkQ291bnQpIHtcbiAgICAgICAgICBjb250ZXh0Ll90aHJlYWRDb3VudCA9IF90aHJlYWRDb3VudDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIENvbnN1bWVyOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICghaGFzV2FybmVkQWJvdXRVc2luZ05lc3RlZENvbnRleHRDb25zdW1lcnMpIHtcbiAgICAgICAgICAgIGhhc1dhcm5lZEFib3V0VXNpbmdOZXN0ZWRDb250ZXh0Q29uc3VtZXJzID0gdHJ1ZTtcblxuICAgICAgICAgICAgZXJyb3IoJ1JlbmRlcmluZyA8Q29udGV4dC5Db25zdW1lci5Db25zdW1lcj4gaXMgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluICcgKyAnYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gRGlkIHlvdSBtZWFuIHRvIHJlbmRlciA8Q29udGV4dC5Db25zdW1lcj4gaW5zdGVhZD8nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gY29udGV4dC5Db25zdW1lcjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRpc3BsYXlOYW1lOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0LmRpc3BsYXlOYW1lO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChkaXNwbGF5TmFtZSkge1xuICAgICAgICAgIGlmICghaGFzV2FybmVkQWJvdXREaXNwbGF5TmFtZU9uQ29uc3VtZXIpIHtcbiAgICAgICAgICAgIHdhcm4oJ1NldHRpbmcgYGRpc3BsYXlOYW1lYCBvbiBDb250ZXh0LkNvbnN1bWVyIGhhcyBubyBlZmZlY3QuICcgKyBcIllvdSBzaG91bGQgc2V0IGl0IGRpcmVjdGx5IG9uIHRoZSBjb250ZXh0IHdpdGggQ29udGV4dC5kaXNwbGF5TmFtZSA9ICclcycuXCIsIGRpc3BsYXlOYW1lKTtcblxuICAgICAgICAgICAgaGFzV2FybmVkQWJvdXREaXNwbGF5TmFtZU9uQ29uc3VtZXIgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pOyAvLyAkRmxvd0ZpeE1lOiBGbG93IGNvbXBsYWlucyBhYm91dCBtaXNzaW5nIHByb3BlcnRpZXMgYmVjYXVzZSBpdCBkb2Vzbid0IHVuZGVyc3RhbmQgZGVmaW5lUHJvcGVydHlcblxuICAgIGNvbnRleHQuQ29uc3VtZXIgPSBDb25zdW1lcjtcbiAgfVxuXG4gIHtcbiAgICBjb250ZXh0Ll9jdXJyZW50UmVuZGVyZXIgPSBudWxsO1xuICAgIGNvbnRleHQuX2N1cnJlbnRSZW5kZXJlcjIgPSBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGNvbnRleHQ7XG59XG5cbnZhciBVbmluaXRpYWxpemVkID0gLTE7XG52YXIgUGVuZGluZyA9IDA7XG52YXIgUmVzb2x2ZWQgPSAxO1xudmFyIFJlamVjdGVkID0gMjtcblxuZnVuY3Rpb24gbGF6eUluaXRpYWxpemVyKHBheWxvYWQpIHtcbiAgaWYgKHBheWxvYWQuX3N0YXR1cyA9PT0gVW5pbml0aWFsaXplZCkge1xuICAgIHZhciBjdG9yID0gcGF5bG9hZC5fcmVzdWx0O1xuICAgIHZhciB0aGVuYWJsZSA9IGN0b3IoKTsgLy8gVHJhbnNpdGlvbiB0byB0aGUgbmV4dCBzdGF0ZS5cbiAgICAvLyBUaGlzIG1pZ2h0IHRocm93IGVpdGhlciBiZWNhdXNlIGl0J3MgbWlzc2luZyBvciB0aHJvd3MuIElmIHNvLCB3ZSB0cmVhdCBpdFxuICAgIC8vIGFzIHN0aWxsIHVuaW5pdGlhbGl6ZWQgYW5kIHRyeSBhZ2FpbiBuZXh0IHRpbWUuIFdoaWNoIGlzIHRoZSBzYW1lIGFzIHdoYXRcbiAgICAvLyBoYXBwZW5zIGlmIHRoZSBjdG9yIG9yIGFueSB3cmFwcGVycyBwcm9jZXNzaW5nIHRoZSBjdG9yIHRocm93cy4gVGhpcyBtaWdodFxuICAgIC8vIGVuZCB1cCBmaXhpbmcgaXQgaWYgdGhlIHJlc29sdXRpb24gd2FzIGEgY29uY3VycmVuY3kgYnVnLlxuXG4gICAgdGhlbmFibGUudGhlbihmdW5jdGlvbiAobW9kdWxlT2JqZWN0KSB7XG4gICAgICBpZiAocGF5bG9hZC5fc3RhdHVzID09PSBQZW5kaW5nIHx8IHBheWxvYWQuX3N0YXR1cyA9PT0gVW5pbml0aWFsaXplZCkge1xuICAgICAgICAvLyBUcmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0YXRlLlxuICAgICAgICB2YXIgcmVzb2x2ZWQgPSBwYXlsb2FkO1xuICAgICAgICByZXNvbHZlZC5fc3RhdHVzID0gUmVzb2x2ZWQ7XG4gICAgICAgIHJlc29sdmVkLl9yZXN1bHQgPSBtb2R1bGVPYmplY3Q7XG4gICAgICB9XG4gICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICBpZiAocGF5bG9hZC5fc3RhdHVzID09PSBQZW5kaW5nIHx8IHBheWxvYWQuX3N0YXR1cyA9PT0gVW5pbml0aWFsaXplZCkge1xuICAgICAgICAvLyBUcmFuc2l0aW9uIHRvIHRoZSBuZXh0IHN0YXRlLlxuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBwYXlsb2FkO1xuICAgICAgICByZWplY3RlZC5fc3RhdHVzID0gUmVqZWN0ZWQ7XG4gICAgICAgIHJlamVjdGVkLl9yZXN1bHQgPSBlcnJvcjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwYXlsb2FkLl9zdGF0dXMgPT09IFVuaW5pdGlhbGl6ZWQpIHtcbiAgICAgIC8vIEluIGNhc2UsIHdlJ3JlIHN0aWxsIHVuaW5pdGlhbGl6ZWQsIHRoZW4gd2UncmUgd2FpdGluZyBmb3IgdGhlIHRoZW5hYmxlXG4gICAgICAvLyB0byByZXNvbHZlLiBTZXQgaXQgYXMgcGVuZGluZyBpbiB0aGUgbWVhbnRpbWUuXG4gICAgICB2YXIgcGVuZGluZyA9IHBheWxvYWQ7XG4gICAgICBwZW5kaW5nLl9zdGF0dXMgPSBQZW5kaW5nO1xuICAgICAgcGVuZGluZy5fcmVzdWx0ID0gdGhlbmFibGU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBheWxvYWQuX3N0YXR1cyA9PT0gUmVzb2x2ZWQpIHtcbiAgICB2YXIgbW9kdWxlT2JqZWN0ID0gcGF5bG9hZC5fcmVzdWx0O1xuXG4gICAge1xuICAgICAgaWYgKG1vZHVsZU9iamVjdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVycm9yKCdsYXp5OiBFeHBlY3RlZCB0aGUgcmVzdWx0IG9mIGEgZHluYW1pYyBpbXAnICsgJ29ydCgpIGNhbGwuICcgKyAnSW5zdGVhZCByZWNlaXZlZDogJXNcXG5cXG5Zb3VyIGNvZGUgc2hvdWxkIGxvb2sgbGlrZTogXFxuICAnICsgLy8gQnJlYWsgdXAgaW1wb3J0cyB0byBhdm9pZCBhY2NpZGVudGFsbHkgcGFyc2luZyB0aGVtIGFzIGRlcGVuZGVuY2llcy5cbiAgICAgICAgJ2NvbnN0IE15Q29tcG9uZW50ID0gbGF6eSgoKSA9PiBpbXAnICsgXCJvcnQoJy4vTXlDb21wb25lbnQnKSlcXG5cXG5cIiArICdEaWQgeW91IGFjY2lkZW50YWxseSBwdXQgY3VybHkgYnJhY2VzIGFyb3VuZCB0aGUgaW1wb3J0PycsIG1vZHVsZU9iamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAge1xuICAgICAgaWYgKCEoJ2RlZmF1bHQnIGluIG1vZHVsZU9iamVjdCkpIHtcbiAgICAgICAgZXJyb3IoJ2xhenk6IEV4cGVjdGVkIHRoZSByZXN1bHQgb2YgYSBkeW5hbWljIGltcCcgKyAnb3J0KCkgY2FsbC4gJyArICdJbnN0ZWFkIHJlY2VpdmVkOiAlc1xcblxcbllvdXIgY29kZSBzaG91bGQgbG9vayBsaWtlOiBcXG4gICcgKyAvLyBCcmVhayB1cCBpbXBvcnRzIHRvIGF2b2lkIGFjY2lkZW50YWxseSBwYXJzaW5nIHRoZW0gYXMgZGVwZW5kZW5jaWVzLlxuICAgICAgICAnY29uc3QgTXlDb21wb25lbnQgPSBsYXp5KCgpID0+IGltcCcgKyBcIm9ydCgnLi9NeUNvbXBvbmVudCcpKVwiLCBtb2R1bGVPYmplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtb2R1bGVPYmplY3QuZGVmYXVsdDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBwYXlsb2FkLl9yZXN1bHQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gbGF6eShjdG9yKSB7XG4gIHZhciBwYXlsb2FkID0ge1xuICAgIC8vIFdlIHVzZSB0aGVzZSBmaWVsZHMgdG8gc3RvcmUgdGhlIHJlc3VsdC5cbiAgICBfc3RhdHVzOiBVbmluaXRpYWxpemVkLFxuICAgIF9yZXN1bHQ6IGN0b3JcbiAgfTtcbiAgdmFyIGxhenlUeXBlID0ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9MQVpZX1RZUEUsXG4gICAgX3BheWxvYWQ6IHBheWxvYWQsXG4gICAgX2luaXQ6IGxhenlJbml0aWFsaXplclxuICB9O1xuXG4gIHtcbiAgICAvLyBJbiBwcm9kdWN0aW9uLCB0aGlzIHdvdWxkIGp1c3Qgc2V0IGl0IG9uIHRoZSBvYmplY3QuXG4gICAgdmFyIGRlZmF1bHRQcm9wcztcbiAgICB2YXIgcHJvcFR5cGVzOyAvLyAkRmxvd0ZpeE1lXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhsYXp5VHlwZSwge1xuICAgICAgZGVmYXVsdFByb3BzOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGRlZmF1bHRQcm9wcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3RGVmYXVsdFByb3BzKSB7XG4gICAgICAgICAgZXJyb3IoJ1JlYWN0LmxhenkoLi4uKTogSXQgaXMgbm90IHN1cHBvcnRlZCB0byBhc3NpZ24gYGRlZmF1bHRQcm9wc2AgdG8gJyArICdhIGxhenkgY29tcG9uZW50IGltcG9ydC4gRWl0aGVyIHNwZWNpZnkgdGhlbSB3aGVyZSB0aGUgY29tcG9uZW50ICcgKyAnaXMgZGVmaW5lZCwgb3IgY3JlYXRlIGEgd3JhcHBpbmcgY29tcG9uZW50IGFyb3VuZCBpdC4nKTtcblxuICAgICAgICAgIGRlZmF1bHRQcm9wcyA9IG5ld0RlZmF1bHRQcm9wczsgLy8gTWF0Y2ggcHJvZHVjdGlvbiBiZWhhdmlvciBtb3JlIGNsb3NlbHk6XG4gICAgICAgICAgLy8gJEZsb3dGaXhNZVxuXG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGxhenlUeXBlLCAnZGVmYXVsdFByb3BzJywge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BUeXBlcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3UHJvcFR5cGVzKSB7XG4gICAgICAgICAgZXJyb3IoJ1JlYWN0LmxhenkoLi4uKTogSXQgaXMgbm90IHN1cHBvcnRlZCB0byBhc3NpZ24gYHByb3BUeXBlc2AgdG8gJyArICdhIGxhenkgY29tcG9uZW50IGltcG9ydC4gRWl0aGVyIHNwZWNpZnkgdGhlbSB3aGVyZSB0aGUgY29tcG9uZW50ICcgKyAnaXMgZGVmaW5lZCwgb3IgY3JlYXRlIGEgd3JhcHBpbmcgY29tcG9uZW50IGFyb3VuZCBpdC4nKTtcblxuICAgICAgICAgIHByb3BUeXBlcyA9IG5ld1Byb3BUeXBlczsgLy8gTWF0Y2ggcHJvZHVjdGlvbiBiZWhhdmlvciBtb3JlIGNsb3NlbHk6XG4gICAgICAgICAgLy8gJEZsb3dGaXhNZVxuXG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGxhenlUeXBlLCAncHJvcFR5cGVzJywge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gbGF6eVR5cGU7XG59XG5cbmZ1bmN0aW9uIGZvcndhcmRSZWYocmVuZGVyKSB7XG4gIHtcbiAgICBpZiAocmVuZGVyICE9IG51bGwgJiYgcmVuZGVyLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUpIHtcbiAgICAgIGVycm9yKCdmb3J3YXJkUmVmIHJlcXVpcmVzIGEgcmVuZGVyIGZ1bmN0aW9uIGJ1dCByZWNlaXZlZCBhIGBtZW1vYCAnICsgJ2NvbXBvbmVudC4gSW5zdGVhZCBvZiBmb3J3YXJkUmVmKG1lbW8oLi4uKSksIHVzZSAnICsgJ21lbW8oZm9yd2FyZFJlZiguLi4pKS4nKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZW5kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVycm9yKCdmb3J3YXJkUmVmIHJlcXVpcmVzIGEgcmVuZGVyIGZ1bmN0aW9uIGJ1dCB3YXMgZ2l2ZW4gJXMuJywgcmVuZGVyID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHJlbmRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZW5kZXIubGVuZ3RoICE9PSAwICYmIHJlbmRlci5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgZXJyb3IoJ2ZvcndhcmRSZWYgcmVuZGVyIGZ1bmN0aW9ucyBhY2NlcHQgZXhhY3RseSB0d28gcGFyYW1ldGVyczogcHJvcHMgYW5kIHJlZi4gJXMnLCByZW5kZXIubGVuZ3RoID09PSAxID8gJ0RpZCB5b3UgZm9yZ2V0IHRvIHVzZSB0aGUgcmVmIHBhcmFtZXRlcj8nIDogJ0FueSBhZGRpdGlvbmFsIHBhcmFtZXRlciB3aWxsIGJlIHVuZGVmaW5lZC4nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVuZGVyICE9IG51bGwpIHtcbiAgICAgIGlmIChyZW5kZXIuZGVmYXVsdFByb3BzICE9IG51bGwgfHwgcmVuZGVyLnByb3BUeXBlcyAhPSBudWxsKSB7XG4gICAgICAgIGVycm9yKCdmb3J3YXJkUmVmIHJlbmRlciBmdW5jdGlvbnMgZG8gbm90IHN1cHBvcnQgcHJvcFR5cGVzIG9yIGRlZmF1bHRQcm9wcy4gJyArICdEaWQgeW91IGFjY2lkZW50YWxseSBwYXNzIGEgUmVhY3QgY29tcG9uZW50PycpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBlbGVtZW50VHlwZSA9IHtcbiAgICAkJHR5cGVvZjogUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSxcbiAgICByZW5kZXI6IHJlbmRlclxuICB9O1xuXG4gIHtcbiAgICB2YXIgb3duTmFtZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudFR5cGUsICdkaXNwbGF5TmFtZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvd25OYW1lO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgb3duTmFtZSA9IG5hbWU7IC8vIFRoZSBpbm5lciBjb21wb25lbnQgc2hvdWxkbid0IGluaGVyaXQgdGhpcyBkaXNwbGF5IG5hbWUgaW4gbW9zdCBjYXNlcyxcbiAgICAgICAgLy8gYmVjYXVzZSB0aGUgY29tcG9uZW50IG1heSBiZSB1c2VkIGVsc2V3aGVyZS5cbiAgICAgICAgLy8gQnV0IGl0J3MgbmljZSBmb3IgYW5vbnltb3VzIGZ1bmN0aW9ucyB0byBpbmhlcml0IHRoZSBuYW1lLFxuICAgICAgICAvLyBzbyB0aGF0IG91ciBjb21wb25lbnQtc3RhY2sgZ2VuZXJhdGlvbiBsb2dpYyB3aWxsIGRpc3BsYXkgdGhlaXIgZnJhbWVzLlxuICAgICAgICAvLyBBbiBhbm9ueW1vdXMgZnVuY3Rpb24gZ2VuZXJhbGx5IHN1Z2dlc3RzIGEgcGF0dGVybiBsaWtlOlxuICAgICAgICAvLyAgIFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHsuLi59KTtcbiAgICAgICAgLy8gVGhpcyBraW5kIG9mIGlubmVyIGZ1bmN0aW9uIGlzIG5vdCB1c2VkIGVsc2V3aGVyZSBzbyB0aGUgc2lkZSBlZmZlY3QgaXMgb2theS5cblxuICAgICAgICBpZiAoIXJlbmRlci5uYW1lICYmICFyZW5kZXIuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICByZW5kZXIuZGlzcGxheU5hbWUgPSBuYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudFR5cGU7XG59XG5cbnZhciBSRUFDVF9NT0RVTEVfUkVGRVJFTkNFO1xuXG57XG4gIFJFQUNUX01PRFVMRV9SRUZFUkVOQ0UgPSBTeW1ib2wuZm9yKCdyZWFjdC5tb2R1bGUucmVmZXJlbmNlJyk7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSAvLyBOb3RlOiB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyAoZS5nLiBpZiBpdCdzIGEgcG9seWZpbGwpLlxuXG5cbiAgaWYgKHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCBlbmFibGVEZWJ1Z1RyYWNpbmcgIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgfHwgZW5hYmxlTGVnYWN5SGlkZGVuICB8fCB0eXBlID09PSBSRUFDVF9PRkZTQ1JFRU5fVFlQRSB8fCBlbmFibGVTY29wZUFQSSAgfHwgZW5hYmxlQ2FjaGVFbGVtZW50ICB8fCBlbmFibGVUcmFuc2l0aW9uVHJhY2luZyApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCkge1xuICAgIGlmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgLy8gVGhpcyBuZWVkcyB0byBpbmNsdWRlIGFsbCBwb3NzaWJsZSBtb2R1bGUgcmVmZXJlbmNlIG9iamVjdFxuICAgIC8vIHR5cGVzIHN1cHBvcnRlZCBieSBhbnkgRmxpZ2h0IGNvbmZpZ3VyYXRpb24gYW55d2hlcmUgc2luY2VcbiAgICAvLyB3ZSBkb24ndCBrbm93IHdoaWNoIEZsaWdodCBidWlsZCB0aGlzIHdpbGwgZW5kIHVwIGJlaW5nIHVzZWRcbiAgICAvLyB3aXRoLlxuICAgIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01PRFVMRV9SRUZFUkVOQ0UgfHwgdHlwZS5nZXRNb2R1bGVJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIG1lbW8odHlwZSwgY29tcGFyZSkge1xuICB7XG4gICAgaWYgKCFpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkpIHtcbiAgICAgIGVycm9yKCdtZW1vOiBUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIGNvbXBvbmVudC4gSW5zdGVhZCAnICsgJ3JlY2VpdmVkOiAlcycsIHR5cGUgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgdHlwZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGVsZW1lbnRUeXBlID0ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9NRU1PX1RZUEUsXG4gICAgdHlwZTogdHlwZSxcbiAgICBjb21wYXJlOiBjb21wYXJlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29tcGFyZVxuICB9O1xuXG4gIHtcbiAgICB2YXIgb3duTmFtZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudFR5cGUsICdkaXNwbGF5TmFtZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBvd25OYW1lO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgb3duTmFtZSA9IG5hbWU7IC8vIFRoZSBpbm5lciBjb21wb25lbnQgc2hvdWxkbid0IGluaGVyaXQgdGhpcyBkaXNwbGF5IG5hbWUgaW4gbW9zdCBjYXNlcyxcbiAgICAgICAgLy8gYmVjYXVzZSB0aGUgY29tcG9uZW50IG1heSBiZSB1c2VkIGVsc2V3aGVyZS5cbiAgICAgICAgLy8gQnV0IGl0J3MgbmljZSBmb3IgYW5vbnltb3VzIGZ1bmN0aW9ucyB0byBpbmhlcml0IHRoZSBuYW1lLFxuICAgICAgICAvLyBzbyB0aGF0IG91ciBjb21wb25lbnQtc3RhY2sgZ2VuZXJhdGlvbiBsb2dpYyB3aWxsIGRpc3BsYXkgdGhlaXIgZnJhbWVzLlxuICAgICAgICAvLyBBbiBhbm9ueW1vdXMgZnVuY3Rpb24gZ2VuZXJhbGx5IHN1Z2dlc3RzIGEgcGF0dGVybiBsaWtlOlxuICAgICAgICAvLyAgIFJlYWN0Lm1lbW8oKHByb3BzKSA9PiB7Li4ufSk7XG4gICAgICAgIC8vIFRoaXMga2luZCBvZiBpbm5lciBmdW5jdGlvbiBpcyBub3QgdXNlZCBlbHNld2hlcmUgc28gdGhlIHNpZGUgZWZmZWN0IGlzIG9rYXkuXG5cbiAgICAgICAgaWYgKCF0eXBlLm5hbWUgJiYgIXR5cGUuZGlzcGxheU5hbWUpIHtcbiAgICAgICAgICB0eXBlLmRpc3BsYXlOYW1lID0gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRUeXBlO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRGlzcGF0Y2hlcigpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSBSZWFjdEN1cnJlbnREaXNwYXRjaGVyLmN1cnJlbnQ7XG5cbiAge1xuICAgIGlmIChkaXNwYXRjaGVyID09PSBudWxsKSB7XG4gICAgICBlcnJvcignSW52YWxpZCBob29rIGNhbGwuIEhvb2tzIGNhbiBvbmx5IGJlIGNhbGxlZCBpbnNpZGUgb2YgdGhlIGJvZHkgb2YgYSBmdW5jdGlvbiBjb21wb25lbnQuIFRoaXMgY291bGQgaGFwcGVuIGZvcicgKyAnIG9uZSBvZiB0aGUgZm9sbG93aW5nIHJlYXNvbnM6XFxuJyArICcxLiBZb3UgbWlnaHQgaGF2ZSBtaXNtYXRjaGluZyB2ZXJzaW9ucyBvZiBSZWFjdCBhbmQgdGhlIHJlbmRlcmVyIChzdWNoIGFzIFJlYWN0IERPTSlcXG4nICsgJzIuIFlvdSBtaWdodCBiZSBicmVha2luZyB0aGUgUnVsZXMgb2YgSG9va3NcXG4nICsgJzMuIFlvdSBtaWdodCBoYXZlIG1vcmUgdGhhbiBvbmUgY29weSBvZiBSZWFjdCBpbiB0aGUgc2FtZSBhcHBcXG4nICsgJ1NlZSBodHRwczovL3JlYWN0anMub3JnL2xpbmsvaW52YWxpZC1ob29rLWNhbGwgZm9yIHRpcHMgYWJvdXQgaG93IHRvIGRlYnVnIGFuZCBmaXggdGhpcyBwcm9ibGVtLicpO1xuICAgIH1cbiAgfSAvLyBXaWxsIHJlc3VsdCBpbiBhIG51bGwgYWNjZXNzIGVycm9yIGlmIGFjY2Vzc2VkIG91dHNpZGUgcmVuZGVyIHBoYXNlLiBXZVxuICAvLyBpbnRlbnRpb25hbGx5IGRvbid0IHRocm93IG91ciBvd24gZXJyb3IgYmVjYXVzZSB0aGlzIGlzIGluIGEgaG90IHBhdGguXG4gIC8vIEFsc28gaGVscHMgZW5zdXJlIHRoaXMgaXMgaW5saW5lZC5cblxuXG4gIHJldHVybiBkaXNwYXRjaGVyO1xufVxuZnVuY3Rpb24gdXNlQ29udGV4dChDb250ZXh0KSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcblxuICB7XG4gICAgLy8gVE9ETzogYWRkIGEgbW9yZSBnZW5lcmljIHdhcm5pbmcgZm9yIGludmFsaWQgdmFsdWVzLlxuICAgIGlmIChDb250ZXh0Ll9jb250ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciByZWFsQ29udGV4dCA9IENvbnRleHQuX2NvbnRleHQ7IC8vIERvbid0IGRlZHVwbGljYXRlIGJlY2F1c2UgdGhpcyBsZWdpdGltYXRlbHkgY2F1c2VzIGJ1Z3NcbiAgICAgIC8vIGFuZCBub2JvZHkgc2hvdWxkIGJlIHVzaW5nIHRoaXMgaW4gZXhpc3RpbmcgY29kZS5cblxuICAgICAgaWYgKHJlYWxDb250ZXh0LkNvbnN1bWVyID09PSBDb250ZXh0KSB7XG4gICAgICAgIGVycm9yKCdDYWxsaW5nIHVzZUNvbnRleHQoQ29udGV4dC5Db25zdW1lcikgaXMgbm90IHN1cHBvcnRlZCwgbWF5IGNhdXNlIGJ1Z3MsIGFuZCB3aWxsIGJlICcgKyAncmVtb3ZlZCBpbiBhIGZ1dHVyZSBtYWpvciByZWxlYXNlLiBEaWQgeW91IG1lYW4gdG8gY2FsbCB1c2VDb250ZXh0KENvbnRleHQpIGluc3RlYWQ/Jyk7XG4gICAgICB9IGVsc2UgaWYgKHJlYWxDb250ZXh0LlByb3ZpZGVyID09PSBDb250ZXh0KSB7XG4gICAgICAgIGVycm9yKCdDYWxsaW5nIHVzZUNvbnRleHQoQ29udGV4dC5Qcm92aWRlcikgaXMgbm90IHN1cHBvcnRlZC4gJyArICdEaWQgeW91IG1lYW4gdG8gY2FsbCB1c2VDb250ZXh0KENvbnRleHQpIGluc3RlYWQ/Jyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlQ29udGV4dChDb250ZXh0KTtcbn1cbmZ1bmN0aW9uIHVzZVN0YXRlKGluaXRpYWxTdGF0ZSkge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZVN0YXRlKGluaXRpYWxTdGF0ZSk7XG59XG5mdW5jdGlvbiB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxBcmcsIGluaXQpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxBcmcsIGluaXQpO1xufVxuZnVuY3Rpb24gdXNlUmVmKGluaXRpYWxWYWx1ZSkge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZVJlZihpbml0aWFsVmFsdWUpO1xufVxuZnVuY3Rpb24gdXNlRWZmZWN0KGNyZWF0ZSwgZGVwcykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUVmZmVjdChjcmVhdGUsIGRlcHMpO1xufVxuZnVuY3Rpb24gdXNlSW5zZXJ0aW9uRWZmZWN0KGNyZWF0ZSwgZGVwcykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUluc2VydGlvbkVmZmVjdChjcmVhdGUsIGRlcHMpO1xufVxuZnVuY3Rpb24gdXNlTGF5b3V0RWZmZWN0KGNyZWF0ZSwgZGVwcykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUxheW91dEVmZmVjdChjcmVhdGUsIGRlcHMpO1xufVxuZnVuY3Rpb24gdXNlQ2FsbGJhY2soY2FsbGJhY2ssIGRlcHMpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VDYWxsYmFjayhjYWxsYmFjaywgZGVwcyk7XG59XG5mdW5jdGlvbiB1c2VNZW1vKGNyZWF0ZSwgZGVwcykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZU1lbW8oY3JlYXRlLCBkZXBzKTtcbn1cbmZ1bmN0aW9uIHVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCBjcmVhdGUsIGRlcHMpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgY3JlYXRlLCBkZXBzKTtcbn1cbmZ1bmN0aW9uIHVzZURlYnVnVmFsdWUodmFsdWUsIGZvcm1hdHRlckZuKSB7XG4gIHtcbiAgICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gICAgcmV0dXJuIGRpc3BhdGNoZXIudXNlRGVidWdWYWx1ZSh2YWx1ZSwgZm9ybWF0dGVyRm4pO1xuICB9XG59XG5mdW5jdGlvbiB1c2VUcmFuc2l0aW9uKCkge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZVRyYW5zaXRpb24oKTtcbn1cbmZ1bmN0aW9uIHVzZURlZmVycmVkVmFsdWUodmFsdWUpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VEZWZlcnJlZFZhbHVlKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIHVzZUlkKCkge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUlkKCk7XG59XG5mdW5jdGlvbiB1c2VTeW5jRXh0ZXJuYWxTdG9yZShzdWJzY3JpYmUsIGdldFNuYXBzaG90LCBnZXRTZXJ2ZXJTbmFwc2hvdCkge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZVN5bmNFeHRlcm5hbFN0b3JlKHN1YnNjcmliZSwgZ2V0U25hcHNob3QsIGdldFNlcnZlclNuYXBzaG90KTtcbn1cblxuLy8gSGVscGVycyB0byBwYXRjaCBjb25zb2xlLmxvZ3MgdG8gYXZvaWQgbG9nZ2luZyBkdXJpbmcgc2lkZS1lZmZlY3QgZnJlZVxuLy8gcmVwbGF5aW5nIG9uIHJlbmRlciBmdW5jdGlvbi4gVGhpcyBjdXJyZW50bHkgb25seSBwYXRjaGVzIHRoZSBvYmplY3Rcbi8vIGxhemlseSB3aGljaCB3b24ndCBjb3ZlciBpZiB0aGUgbG9nIGZ1bmN0aW9uIHdhcyBleHRyYWN0ZWQgZWFnZXJseS5cbi8vIFdlIGNvdWxkIGFsc28gZWFnZXJseSBwYXRjaCB0aGUgbWV0aG9kLlxudmFyIGRpc2FibGVkRGVwdGggPSAwO1xudmFyIHByZXZMb2c7XG52YXIgcHJldkluZm87XG52YXIgcHJldldhcm47XG52YXIgcHJldkVycm9yO1xudmFyIHByZXZHcm91cDtcbnZhciBwcmV2R3JvdXBDb2xsYXBzZWQ7XG52YXIgcHJldkdyb3VwRW5kO1xuXG5mdW5jdGlvbiBkaXNhYmxlZExvZygpIHt9XG5cbmRpc2FibGVkTG9nLl9fcmVhY3REaXNhYmxlZExvZyA9IHRydWU7XG5mdW5jdGlvbiBkaXNhYmxlTG9ncygpIHtcbiAge1xuICAgIGlmIChkaXNhYmxlZERlcHRoID09PSAwKSB7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC1pbnRlcm5hbC9uby1wcm9kdWN0aW9uLWxvZ2dpbmcgKi9cbiAgICAgIHByZXZMb2cgPSBjb25zb2xlLmxvZztcbiAgICAgIHByZXZJbmZvID0gY29uc29sZS5pbmZvO1xuICAgICAgcHJldldhcm4gPSBjb25zb2xlLndhcm47XG4gICAgICBwcmV2RXJyb3IgPSBjb25zb2xlLmVycm9yO1xuICAgICAgcHJldkdyb3VwID0gY29uc29sZS5ncm91cDtcbiAgICAgIHByZXZHcm91cENvbGxhcHNlZCA9IGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQ7XG4gICAgICBwcmV2R3JvdXBFbmQgPSBjb25zb2xlLmdyb3VwRW5kOyAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzE5MDk5XG5cbiAgICAgIHZhciBwcm9wcyA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZGlzYWJsZWRMb2csXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9OyAvLyAkRmxvd0ZpeE1lIEZsb3cgdGhpbmtzIGNvbnNvbGUgaXMgaW1tdXRhYmxlLlxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhjb25zb2xlLCB7XG4gICAgICAgIGluZm86IHByb3BzLFxuICAgICAgICBsb2c6IHByb3BzLFxuICAgICAgICB3YXJuOiBwcm9wcyxcbiAgICAgICAgZXJyb3I6IHByb3BzLFxuICAgICAgICBncm91cDogcHJvcHMsXG4gICAgICAgIGdyb3VwQ29sbGFwc2VkOiBwcm9wcyxcbiAgICAgICAgZ3JvdXBFbmQ6IHByb3BzXG4gICAgICB9KTtcbiAgICAgIC8qIGVzbGludC1lbmFibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgfVxuXG4gICAgZGlzYWJsZWREZXB0aCsrO1xuICB9XG59XG5mdW5jdGlvbiByZWVuYWJsZUxvZ3MoKSB7XG4gIHtcbiAgICBkaXNhYmxlZERlcHRoLS07XG5cbiAgICBpZiAoZGlzYWJsZWREZXB0aCA9PT0gMCkge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgcmVhY3QtaW50ZXJuYWwvbm8tcHJvZHVjdGlvbi1sb2dnaW5nICovXG4gICAgICB2YXIgcHJvcHMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH07IC8vICRGbG93Rml4TWUgRmxvdyB0aGlua3MgY29uc29sZSBpcyBpbW11dGFibGUuXG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGNvbnNvbGUsIHtcbiAgICAgICAgbG9nOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZMb2dcbiAgICAgICAgfSksXG4gICAgICAgIGluZm86IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkluZm9cbiAgICAgICAgfSksXG4gICAgICAgIHdhcm46IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldldhcm5cbiAgICAgICAgfSksXG4gICAgICAgIGVycm9yOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZFcnJvclxuICAgICAgICB9KSxcbiAgICAgICAgZ3JvdXA6IGFzc2lnbih7fSwgcHJvcHMsIHtcbiAgICAgICAgICB2YWx1ZTogcHJldkdyb3VwXG4gICAgICAgIH0pLFxuICAgICAgICBncm91cENvbGxhcHNlZDogYXNzaWduKHt9LCBwcm9wcywge1xuICAgICAgICAgIHZhbHVlOiBwcmV2R3JvdXBDb2xsYXBzZWRcbiAgICAgICAgfSksXG4gICAgICAgIGdyb3VwRW5kOiBhc3NpZ24oe30sIHByb3BzLCB7XG4gICAgICAgICAgdmFsdWU6IHByZXZHcm91cEVuZFxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIHJlYWN0LWludGVybmFsL25vLXByb2R1Y3Rpb24tbG9nZ2luZyAqL1xuICAgIH1cblxuICAgIGlmIChkaXNhYmxlZERlcHRoIDwgMCkge1xuICAgICAgZXJyb3IoJ2Rpc2FibGVkRGVwdGggZmVsbCBiZWxvdyB6ZXJvLiAnICsgJ1RoaXMgaXMgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciQxID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3RDdXJyZW50RGlzcGF0Y2hlcjtcbnZhciBwcmVmaXg7XG5mdW5jdGlvbiBkZXNjcmliZUJ1aWx0SW5Db21wb25lbnRGcmFtZShuYW1lLCBzb3VyY2UsIG93bmVyRm4pIHtcbiAge1xuICAgIGlmIChwcmVmaXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gRXh0cmFjdCB0aGUgVk0gc3BlY2lmaWMgcHJlZml4IHVzZWQgYnkgZWFjaCBsaW5lLlxuICAgICAgdHJ5IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHtcbiAgICAgICAgdmFyIG1hdGNoID0geC5zdGFjay50cmltKCkubWF0Y2goL1xcbiggKihhdCApPykvKTtcbiAgICAgICAgcHJlZml4ID0gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG4gICAgICB9XG4gICAgfSAvLyBXZSB1c2UgdGhlIHByZWZpeCB0byBlbnN1cmUgb3VyIHN0YWNrcyBsaW5lIHVwIHdpdGggbmF0aXZlIHN0YWNrIGZyYW1lcy5cblxuXG4gICAgcmV0dXJuICdcXG4nICsgcHJlZml4ICsgbmFtZTtcbiAgfVxufVxudmFyIHJlZW50cnkgPSBmYWxzZTtcbnZhciBjb21wb25lbnRGcmFtZUNhY2hlO1xuXG57XG4gIHZhciBQb3NzaWJseVdlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyA/IFdlYWtNYXAgOiBNYXA7XG4gIGNvbXBvbmVudEZyYW1lQ2FjaGUgPSBuZXcgUG9zc2libHlXZWFrTWFwKCk7XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlTmF0aXZlQ29tcG9uZW50RnJhbWUoZm4sIGNvbnN0cnVjdCkge1xuICAvLyBJZiBzb21ldGhpbmcgYXNrZWQgZm9yIGEgc3RhY2sgaW5zaWRlIGEgZmFrZSByZW5kZXIsIGl0IHNob3VsZCBnZXQgaWdub3JlZC5cbiAgaWYgKCAhZm4gfHwgcmVlbnRyeSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHtcbiAgICB2YXIgZnJhbWUgPSBjb21wb25lbnRGcmFtZUNhY2hlLmdldChmbik7XG5cbiAgICBpZiAoZnJhbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZyYW1lO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb250cm9sO1xuICByZWVudHJ5ID0gdHJ1ZTtcbiAgdmFyIHByZXZpb3VzUHJlcGFyZVN0YWNrVHJhY2UgPSBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZTsgLy8gJEZsb3dGaXhNZSBJdCBkb2VzIGFjY2VwdCB1bmRlZmluZWQuXG5cbiAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSB1bmRlZmluZWQ7XG4gIHZhciBwcmV2aW91c0Rpc3BhdGNoZXI7XG5cbiAge1xuICAgIHByZXZpb3VzRGlzcGF0Y2hlciA9IFJlYWN0Q3VycmVudERpc3BhdGNoZXIkMS5jdXJyZW50OyAvLyBTZXQgdGhlIGRpc3BhdGNoZXIgaW4gREVWIGJlY2F1c2UgdGhpcyBtaWdodCBiZSBjYWxsIGluIHRoZSByZW5kZXIgZnVuY3Rpb25cbiAgICAvLyBmb3Igd2FybmluZ3MuXG5cbiAgICBSZWFjdEN1cnJlbnREaXNwYXRjaGVyJDEuY3VycmVudCA9IG51bGw7XG4gICAgZGlzYWJsZUxvZ3MoKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gVGhpcyBzaG91bGQgdGhyb3cuXG4gICAgaWYgKGNvbnN0cnVjdCkge1xuICAgICAgLy8gU29tZXRoaW5nIHNob3VsZCBiZSBzZXR0aW5nIHRoZSBwcm9wcyBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAgICB2YXIgRmFrZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoKTtcbiAgICAgIH07IC8vICRGbG93Rml4TWVcblxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRmFrZS5wcm90b3R5cGUsICdwcm9wcycsIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gV2UgdXNlIGEgdGhyb3dpbmcgc2V0dGVyIGluc3RlYWQgb2YgZnJvemVuIG9yIG5vbi13cml0YWJsZSBwcm9wc1xuICAgICAgICAgIC8vIGJlY2F1c2UgdGhhdCB3b24ndCB0aHJvdyBpbiBhIG5vbi1zdHJpY3QgbW9kZSBmdW5jdGlvbi5cbiAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyAmJiBSZWZsZWN0LmNvbnN0cnVjdCkge1xuICAgICAgICAvLyBXZSBjb25zdHJ1Y3QgYSBkaWZmZXJlbnQgY29udHJvbCBmb3IgdGhpcyBjYXNlIHRvIGluY2x1ZGUgYW55IGV4dHJhXG4gICAgICAgIC8vIGZyYW1lcyBhZGRlZCBieSB0aGUgY29uc3RydWN0IGNhbGwuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgUmVmbGVjdC5jb25zdHJ1Y3QoRmFrZSwgW10pO1xuICAgICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgICAgY29udHJvbCA9IHg7XG4gICAgICAgIH1cblxuICAgICAgICBSZWZsZWN0LmNvbnN0cnVjdChmbiwgW10sIEZha2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBGYWtlLmNhbGwoKTtcbiAgICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICAgIGNvbnRyb2wgPSB4O1xuICAgICAgICB9XG5cbiAgICAgICAgZm4uY2FsbChGYWtlLnByb3RvdHlwZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIGNvbnRyb2wgPSB4O1xuICAgICAgfVxuXG4gICAgICBmbigpO1xuICAgIH1cbiAgfSBjYXRjaCAoc2FtcGxlKSB7XG4gICAgLy8gVGhpcyBpcyBpbmxpbmVkIG1hbnVhbGx5IGJlY2F1c2UgY2xvc3VyZSBkb2Vzbid0IGRvIGl0IGZvciB1cy5cbiAgICBpZiAoc2FtcGxlICYmIGNvbnRyb2wgJiYgdHlwZW9mIHNhbXBsZS5zdGFjayA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIFRoaXMgZXh0cmFjdHMgdGhlIGZpcnN0IGZyYW1lIGZyb20gdGhlIHNhbXBsZSB0aGF0IGlzbid0IGFsc28gaW4gdGhlIGNvbnRyb2wuXG4gICAgICAvLyBTa2lwcGluZyBvbmUgZnJhbWUgdGhhdCB3ZSBhc3N1bWUgaXMgdGhlIGZyYW1lIHRoYXQgY2FsbHMgdGhlIHR3by5cbiAgICAgIHZhciBzYW1wbGVMaW5lcyA9IHNhbXBsZS5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICB2YXIgY29udHJvbExpbmVzID0gY29udHJvbC5zdGFjay5zcGxpdCgnXFxuJyk7XG4gICAgICB2YXIgcyA9IHNhbXBsZUxpbmVzLmxlbmd0aCAtIDE7XG4gICAgICB2YXIgYyA9IGNvbnRyb2xMaW5lcy5sZW5ndGggLSAxO1xuXG4gICAgICB3aGlsZSAocyA+PSAxICYmIGMgPj0gMCAmJiBzYW1wbGVMaW5lc1tzXSAhPT0gY29udHJvbExpbmVzW2NdKSB7XG4gICAgICAgIC8vIFdlIGV4cGVjdCBhdCBsZWFzdCBvbmUgc3RhY2sgZnJhbWUgdG8gYmUgc2hhcmVkLlxuICAgICAgICAvLyBUeXBpY2FsbHkgdGhpcyB3aWxsIGJlIHRoZSByb290IG1vc3Qgb25lLiBIb3dldmVyLCBzdGFjayBmcmFtZXMgbWF5IGJlXG4gICAgICAgIC8vIGN1dCBvZmYgZHVlIHRvIG1heGltdW0gc3RhY2sgbGltaXRzLiBJbiB0aGlzIGNhc2UsIG9uZSBtYXliZSBjdXQgb2ZmXG4gICAgICAgIC8vIGVhcmxpZXIgdGhhbiB0aGUgb3RoZXIuIFdlIGFzc3VtZSB0aGF0IHRoZSBzYW1wbGUgaXMgbG9uZ2VyIG9yIHRoZSBzYW1lXG4gICAgICAgIC8vIGFuZCB0aGVyZSBmb3IgY3V0IG9mZiBlYXJsaWVyLiBTbyB3ZSBzaG91bGQgZmluZCB0aGUgcm9vdCBtb3N0IGZyYW1lIGluXG4gICAgICAgIC8vIHRoZSBzYW1wbGUgc29tZXdoZXJlIGluIHRoZSBjb250cm9sLlxuICAgICAgICBjLS07XG4gICAgICB9XG5cbiAgICAgIGZvciAoOyBzID49IDEgJiYgYyA+PSAwOyBzLS0sIGMtLSkge1xuICAgICAgICAvLyBOZXh0IHdlIGZpbmQgdGhlIGZpcnN0IG9uZSB0aGF0IGlzbid0IHRoZSBzYW1lIHdoaWNoIHNob3VsZCBiZSB0aGVcbiAgICAgICAgLy8gZnJhbWUgdGhhdCBjYWxsZWQgb3VyIHNhbXBsZSBmdW5jdGlvbiBhbmQgdGhlIGNvbnRyb2wuXG4gICAgICAgIGlmIChzYW1wbGVMaW5lc1tzXSAhPT0gY29udHJvbExpbmVzW2NdKSB7XG4gICAgICAgICAgLy8gSW4gVjgsIHRoZSBmaXJzdCBsaW5lIGlzIGRlc2NyaWJpbmcgdGhlIG1lc3NhZ2UgYnV0IG90aGVyIFZNcyBkb24ndC5cbiAgICAgICAgICAvLyBJZiB3ZSdyZSBhYm91dCB0byByZXR1cm4gdGhlIGZpcnN0IGxpbmUsIGFuZCB0aGUgY29udHJvbCBpcyBhbHNvIG9uIHRoZSBzYW1lXG4gICAgICAgICAgLy8gbGluZSwgdGhhdCdzIGEgcHJldHR5IGdvb2QgaW5kaWNhdG9yIHRoYXQgb3VyIHNhbXBsZSB0aHJldyBhdCBzYW1lIGxpbmUgYXNcbiAgICAgICAgICAvLyB0aGUgY29udHJvbC4gSS5lLiBiZWZvcmUgd2UgZW50ZXJlZCB0aGUgc2FtcGxlIGZyYW1lLiBTbyB3ZSBpZ25vcmUgdGhpcyByZXN1bHQuXG4gICAgICAgICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIHlvdSBwYXNzZWQgYSBjbGFzcyB0byBmdW5jdGlvbiBjb21wb25lbnQsIG9yIG5vbi1mdW5jdGlvbi5cbiAgICAgICAgICBpZiAocyAhPT0gMSB8fCBjICE9PSAxKSB7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgIHMtLTtcbiAgICAgICAgICAgICAgYy0tOyAvLyBXZSBtYXkgc3RpbGwgaGF2ZSBzaW1pbGFyIGludGVybWVkaWF0ZSBmcmFtZXMgZnJvbSB0aGUgY29uc3RydWN0IGNhbGwuXG4gICAgICAgICAgICAgIC8vIFRoZSBuZXh0IG9uZSB0aGF0IGlzbid0IHRoZSBzYW1lIHNob3VsZCBiZSBvdXIgbWF0Y2ggdGhvdWdoLlxuXG4gICAgICAgICAgICAgIGlmIChjIDwgMCB8fCBzYW1wbGVMaW5lc1tzXSAhPT0gY29udHJvbExpbmVzW2NdKSB7XG4gICAgICAgICAgICAgICAgLy8gVjggYWRkcyBhIFwibmV3XCIgcHJlZml4IGZvciBuYXRpdmUgY2xhc3Nlcy4gTGV0J3MgcmVtb3ZlIGl0IHRvIG1ha2UgaXQgcHJldHRpZXIuXG4gICAgICAgICAgICAgICAgdmFyIF9mcmFtZSA9ICdcXG4nICsgc2FtcGxlTGluZXNbc10ucmVwbGFjZSgnIGF0IG5ldyAnLCAnIGF0ICcpOyAvLyBJZiBvdXIgY29tcG9uZW50IGZyYW1lIGlzIGxhYmVsZWQgXCI8YW5vbnltb3VzPlwiXG4gICAgICAgICAgICAgICAgLy8gYnV0IHdlIGhhdmUgYSB1c2VyLXByb3ZpZGVkIFwiZGlzcGxheU5hbWVcIlxuICAgICAgICAgICAgICAgIC8vIHNwbGljZSBpdCBpbiB0byBtYWtlIHRoZSBzdGFjayBtb3JlIHJlYWRhYmxlLlxuXG5cbiAgICAgICAgICAgICAgICBpZiAoZm4uZGlzcGxheU5hbWUgJiYgX2ZyYW1lLmluY2x1ZGVzKCc8YW5vbnltb3VzPicpKSB7XG4gICAgICAgICAgICAgICAgICBfZnJhbWUgPSBfZnJhbWUucmVwbGFjZSgnPGFub255bW91cz4nLCBmbi5kaXNwbGF5TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRGcmFtZUNhY2hlLnNldChmbiwgX2ZyYW1lKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IC8vIFJldHVybiB0aGUgbGluZSB3ZSBmb3VuZC5cblxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9mcmFtZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSB3aGlsZSAocyA+PSAxICYmIGMgPj0gMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0gZmluYWxseSB7XG4gICAgcmVlbnRyeSA9IGZhbHNlO1xuXG4gICAge1xuICAgICAgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciQxLmN1cnJlbnQgPSBwcmV2aW91c0Rpc3BhdGNoZXI7XG4gICAgICByZWVuYWJsZUxvZ3MoKTtcbiAgICB9XG5cbiAgICBFcnJvci5wcmVwYXJlU3RhY2tUcmFjZSA9IHByZXZpb3VzUHJlcGFyZVN0YWNrVHJhY2U7XG4gIH0gLy8gRmFsbGJhY2sgdG8ganVzdCB1c2luZyB0aGUgbmFtZSBpZiB3ZSBjb3VsZG4ndCBtYWtlIGl0IHRocm93LlxuXG5cbiAgdmFyIG5hbWUgPSBmbiA/IGZuLmRpc3BsYXlOYW1lIHx8IGZuLm5hbWUgOiAnJztcbiAgdmFyIHN5bnRoZXRpY0ZyYW1lID0gbmFtZSA/IGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKG5hbWUpIDogJyc7XG5cbiAge1xuICAgIGlmICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbXBvbmVudEZyYW1lQ2FjaGUuc2V0KGZuLCBzeW50aGV0aWNGcmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN5bnRoZXRpY0ZyYW1lO1xufVxuZnVuY3Rpb24gZGVzY3JpYmVGdW5jdGlvbkNvbXBvbmVudEZyYW1lKGZuLCBzb3VyY2UsIG93bmVyRm4pIHtcbiAge1xuICAgIHJldHVybiBkZXNjcmliZU5hdGl2ZUNvbXBvbmVudEZyYW1lKGZuLCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvdWxkQ29uc3RydWN0KENvbXBvbmVudCkge1xuICB2YXIgcHJvdG90eXBlID0gQ29tcG9uZW50LnByb3RvdHlwZTtcbiAgcmV0dXJuICEhKHByb3RvdHlwZSAmJiBwcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCk7XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVih0eXBlLCBzb3VyY2UsIG93bmVyRm4pIHtcblxuICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAge1xuICAgICAgcmV0dXJuIGRlc2NyaWJlTmF0aXZlQ29tcG9uZW50RnJhbWUodHlwZSwgc2hvdWxkQ29uc3RydWN0KHR5cGUpKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKHR5cGUpO1xuICB9XG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgcmV0dXJuIGRlc2NyaWJlQnVpbHRJbkNvbXBvbmVudEZyYW1lKCdTdXNwZW5zZScpO1xuXG4gICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEU6XG4gICAgICByZXR1cm4gZGVzY3JpYmVCdWlsdEluQ29tcG9uZW50RnJhbWUoJ1N1c3BlbnNlTGlzdCcpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIHN3aXRjaCAodHlwZS4kJHR5cGVvZikge1xuICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICByZXR1cm4gZGVzY3JpYmVGdW5jdGlvbkNvbXBvbmVudEZyYW1lKHR5cGUucmVuZGVyKTtcblxuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgIC8vIE1lbW8gbWF5IGNvbnRhaW4gYW55IGNvbXBvbmVudCB0eXBlIHNvIHdlIHJlY3Vyc2l2ZWx5IHJlc29sdmUgaXQuXG4gICAgICAgIHJldHVybiBkZXNjcmliZVVua25vd25FbGVtZW50VHlwZUZyYW1lSW5ERVYodHlwZS50eXBlLCBzb3VyY2UsIG93bmVyRm4pO1xuXG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciBsYXp5Q29tcG9uZW50ID0gdHlwZTtcbiAgICAgICAgICB2YXIgcGF5bG9hZCA9IGxhenlDb21wb25lbnQuX3BheWxvYWQ7XG4gICAgICAgICAgdmFyIGluaXQgPSBsYXp5Q29tcG9uZW50Ll9pbml0O1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIExhenkgbWF5IGNvbnRhaW4gYW55IGNvbXBvbmVudCB0eXBlIHNvIHdlIHJlY3Vyc2l2ZWx5IHJlc29sdmUgaXQuXG4gICAgICAgICAgICByZXR1cm4gZGVzY3JpYmVVbmtub3duRWxlbWVudFR5cGVGcmFtZUluREVWKGluaXQocGF5bG9hZCksIHNvdXJjZSwgb3duZXJGbik7XG4gICAgICAgICAgfSBjYXRjaCAoeCkge31cbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxudmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xudmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUkMSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWU7XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpIHtcbiAge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcbiAgICAgIHZhciBzdGFjayA9IGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVihlbGVtZW50LnR5cGUsIGVsZW1lbnQuX3NvdXJjZSwgb3duZXIgPyBvd25lci50eXBlIDogbnVsbCk7XG4gICAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lJDEuc2V0RXh0cmFTdGFja0ZyYW1lKHN0YWNrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSQxLnNldEV4dHJhU3RhY2tGcmFtZShudWxsKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBlbGVtZW50KSB7XG4gIHtcbiAgICAvLyAkRmxvd0ZpeE1lIFRoaXMgaXMgb2theSBidXQgRmxvdyBkb2Vzbid0IGtub3cgaXQuXG4gICAgdmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChoYXNPd25Qcm9wZXJ0eSk7XG5cbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAoaGFzKHR5cGVTcGVjcywgdHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3IkMSA9IHZvaWQgMDsgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaWYgKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL3Byb2QtZXJyb3ItY29kZXNcbiAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcigoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6ICcgKyBsb2NhdGlvbiArICcgdHlwZSBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7ICcgKyAnaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCcgKyB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gKyAnYC4nICsgJ1RoaXMgb2Z0ZW4gaGFwcGVucyBiZWNhdXNlIG9mIHR5cG9zIHN1Y2ggYXMgYFByb3BUeXBlcy5mdW5jdGlvbmAgaW5zdGVhZCBvZiBgUHJvcFR5cGVzLmZ1bmNgLicpO1xuICAgICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXJyb3IkMSA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJyk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IkMSA9IGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yJDEgJiYgIShlcnJvciQxIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG5cbiAgICAgICAgICBlcnJvcignJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcycgKyAnIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvciQxKTtcblxuICAgICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yJDEgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yJDEubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IkMS5tZXNzYWdlXSA9IHRydWU7XG4gICAgICAgICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG5cbiAgICAgICAgICBlcnJvcignRmFpbGVkICVzIHR5cGU6ICVzJywgbG9jYXRpb24sIGVycm9yJDEubWVzc2FnZSk7XG5cbiAgICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKGVsZW1lbnQpIHtcbiAge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcbiAgICAgIHZhciBzdGFjayA9IGRlc2NyaWJlVW5rbm93bkVsZW1lbnRUeXBlRnJhbWVJbkRFVihlbGVtZW50LnR5cGUsIGVsZW1lbnQuX3NvdXJjZSwgb3duZXIgPyBvd25lci50eXBlIDogbnVsbCk7XG4gICAgICBzZXRFeHRyYVN0YWNrRnJhbWUoc3RhY2spO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRFeHRyYVN0YWNrRnJhbWUobnVsbCk7XG4gICAgfVxuICB9XG59XG5cbnZhciBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93bjtcblxue1xuICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSB7XG4gIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC50eXBlKTtcblxuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuICcnO1xufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bShzb3VyY2UpIHtcbiAgaWYgKHNvdXJjZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGZpbGVOYW1lID0gc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKTtcbiAgICB2YXIgbGluZU51bWJlciA9IHNvdXJjZS5saW5lTnVtYmVyO1xuICAgIHJldHVybiAnXFxuXFxuQ2hlY2sgeW91ciBjb2RlIGF0ICcgKyBmaWxlTmFtZSArICc6JyArIGxpbmVOdW1iZXIgKyAnLic7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtRm9yUHJvcHMoZWxlbWVudFByb3BzKSB7XG4gIGlmIChlbGVtZW50UHJvcHMgIT09IG51bGwgJiYgZWxlbWVudFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oZWxlbWVudFByb3BzLl9fc291cmNlKTtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cbi8qKlxuICogV2FybiBpZiB0aGVyZSdzIG5vIGtleSBleHBsaWNpdGx5IHNldCBvbiBkeW5hbWljIGFycmF5cyBvZiBjaGlsZHJlbiBvclxuICogb2JqZWN0IGtleXMgYXJlIG5vdCB2YWxpZC4gVGhpcyBhbGxvd3MgdXMgdG8ga2VlcCB0cmFjayBvZiBjaGlsZHJlbiBiZXR3ZWVuXG4gKiB1cGRhdGVzLlxuICovXG5cblxudmFyIG93bmVySGFzS2V5VXNlV2FybmluZyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpIHtcbiAgdmFyIGluZm8gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcblxuICBpZiAoIWluZm8pIHtcbiAgICB2YXIgcGFyZW50TmFtZSA9IHR5cGVvZiBwYXJlbnRUeXBlID09PSAnc3RyaW5nJyA/IHBhcmVudFR5cGUgOiBwYXJlbnRUeXBlLmRpc3BsYXlOYW1lIHx8IHBhcmVudFR5cGUubmFtZTtcblxuICAgIGlmIChwYXJlbnROYW1lKSB7XG4gICAgICBpbmZvID0gXCJcXG5cXG5DaGVjayB0aGUgdG9wLWxldmVsIHJlbmRlciBjYWxsIHVzaW5nIDxcIiArIHBhcmVudE5hbWUgKyBcIj4uXCI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluZm87XG59XG4vKipcbiAqIFdhcm4gaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIGV4cGxpY2l0IGtleSBhc3NpZ25lZCB0byBpdC5cbiAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gKiBoYXZlIGEgXCJrZXlcIiBwcm9wZXJ0eSBhc3NpZ25lZCB0byBpdC4gRXJyb3Igc3RhdHVzZXMgYXJlIGNhY2hlZCBzbyBhIHdhcm5pbmdcbiAqIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICovXG5cblxuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG5cbiAgaWYgKG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIG93bmVySGFzS2V5VXNlV2FybmluZ1tjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSA9IHRydWU7IC8vIFVzdWFsbHkgdGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIG9mZmVuZGVyLCBidXQgaWYgaXQgYWNjZXB0cyBjaGlsZHJlbiBhcyBhXG4gIC8vIHByb3BlcnR5LCBpdCBtYXkgYmUgdGhlIGNyZWF0b3Igb2YgdGhlIGNoaWxkIHRoYXQncyByZXNwb25zaWJsZSBmb3JcbiAgLy8gYXNzaWduaW5nIGl0IGEga2V5LlxuXG4gIHZhciBjaGlsZE93bmVyID0gJyc7XG5cbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICBjaGlsZE93bmVyID0gXCIgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gXCIgKyBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoZWxlbWVudC5fb3duZXIudHlwZSkgKyBcIi5cIjtcbiAgfVxuXG4gIHtcbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKGVsZW1lbnQpO1xuXG4gICAgZXJyb3IoJ0VhY2ggY2hpbGQgaW4gYSBsaXN0IHNob3VsZCBoYXZlIGEgdW5pcXVlIFwia2V5XCIgcHJvcC4nICsgJyVzJXMgU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvbGluay93YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lcik7XG5cbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKG51bGwpO1xuICB9XG59XG4vKipcbiAqIEVuc3VyZSB0aGF0IGV2ZXJ5IGVsZW1lbnQgZWl0aGVyIGlzIHBhc3NlZCBpbiBhIHN0YXRpYyBsb2NhdGlvbiwgaW4gYW5cbiAqIGFycmF5IHdpdGggYW4gZXhwbGljaXQga2V5cyBwcm9wZXJ0eSBkZWZpbmVkLCBvciBpbiBhbiBvYmplY3QgbGl0ZXJhbFxuICogd2l0aCB2YWxpZCBrZXkgcHJvcGVydHkuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0Tm9kZX0gbm9kZSBTdGF0aWNhbGx5IHBhc3NlZCBjaGlsZCBvZiBhbnkgdHlwZS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBub2RlJ3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG5vZGUpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hpbGQgPSBub2RlW2ldO1xuXG4gICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChpc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuXG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBFbnRyeSBpdGVyYXRvcnMgdXNlZCB0byBwcm92aWRlIGltcGxpY2l0IGtleXMsXG4gICAgICAvLyBidXQgbm93IHdlIHByaW50IGEgc2VwYXJhdGUgd2FybmluZyBmb3IgdGhlbSBsYXRlci5cbiAgICAgIGlmIChpdGVyYXRvckZuICE9PSBub2RlLmVudHJpZXMpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG5vZGUpO1xuICAgICAgICB2YXIgc3RlcDtcblxuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgaWYgKGlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBHaXZlbiBhbiBlbGVtZW50LCB2YWxpZGF0ZSB0aGF0IGl0cyBwcm9wcyBmb2xsb3cgdGhlIHByb3BUeXBlcyBkZWZpbml0aW9uLFxuICogcHJvdmlkZWQgYnkgdGhlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAge1xuICAgIHZhciB0eXBlID0gZWxlbWVudC50eXBlO1xuXG4gICAgaWYgKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBwcm9wVHlwZXM7XG5cbiAgICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHByb3BUeXBlcyA9IHR5cGUucHJvcFR5cGVzO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFIHx8IC8vIE5vdGU6IE1lbW8gb25seSBjaGVja3Mgb3V0ZXIgcHJvcHMgaGVyZS5cbiAgICAvLyBJbm5lciBwcm9wcyBhcmUgY2hlY2tlZCBpbiB0aGUgcmVjb25jaWxlci5cbiAgICB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUpKSB7XG4gICAgICBwcm9wVHlwZXMgPSB0eXBlLnByb3BUeXBlcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwcm9wVHlwZXMpIHtcbiAgICAgIC8vIEludGVudGlvbmFsbHkgaW5zaWRlIHRvIGF2b2lkIHRyaWdnZXJpbmcgbGF6eSBpbml0aWFsaXplcnM6XG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlKTtcbiAgICAgIGNoZWNrUHJvcFR5cGVzKHByb3BUeXBlcywgZWxlbWVudC5wcm9wcywgJ3Byb3AnLCBuYW1lLCBlbGVtZW50KTtcbiAgICB9IGVsc2UgaWYgKHR5cGUuUHJvcFR5cGVzICE9PSB1bmRlZmluZWQgJiYgIXByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duKSB7XG4gICAgICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IHRydWU7IC8vIEludGVudGlvbmFsbHkgaW5zaWRlIHRvIGF2b2lkIHRyaWdnZXJpbmcgbGF6eSBpbml0aWFsaXplcnM6XG5cbiAgICAgIHZhciBfbmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlKTtcblxuICAgICAgZXJyb3IoJ0NvbXBvbmVudCAlcyBkZWNsYXJlZCBgUHJvcFR5cGVzYCBpbnN0ZWFkIG9mIGBwcm9wVHlwZXNgLiBEaWQgeW91IG1pc3NwZWxsIHRoZSBwcm9wZXJ0eSBhc3NpZ25tZW50PycsIF9uYW1lIHx8ICdVbmtub3duJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0eXBlLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJyAmJiAhdHlwZS5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQpIHtcbiAgICAgIGVycm9yKCdnZXREZWZhdWx0UHJvcHMgaXMgb25seSB1c2VkIG9uIGNsYXNzaWMgUmVhY3QuY3JlYXRlQ2xhc3MgJyArICdkZWZpbml0aW9ucy4gVXNlIGEgc3RhdGljIHByb3BlcnR5IG5hbWVkIGBkZWZhdWx0UHJvcHNgIGluc3RlYWQuJyk7XG4gICAgfVxuICB9XG59XG4vKipcbiAqIEdpdmVuIGEgZnJhZ21lbnQsIHZhbGlkYXRlIHRoYXQgaXQgY2FuIG9ubHkgYmUgcHJvdmlkZWQgd2l0aCBmcmFnbWVudCBwcm9wc1xuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGZyYWdtZW50XG4gKi9cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZnJhZ21lbnQpIHtcbiAge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZnJhZ21lbnQucHJvcHMpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcblxuICAgICAgaWYgKGtleSAhPT0gJ2NoaWxkcmVuJyAmJiBrZXkgIT09ICdrZXknKSB7XG4gICAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEoZnJhZ21lbnQpO1xuXG4gICAgICAgIGVycm9yKCdJbnZhbGlkIHByb3AgYCVzYCBzdXBwbGllZCB0byBgUmVhY3QuRnJhZ21lbnRgLiAnICsgJ1JlYWN0LkZyYWdtZW50IGNhbiBvbmx5IGhhdmUgYGtleWAgYW5kIGBjaGlsZHJlbmAgcHJvcHMuJywga2V5KTtcblxuICAgICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKG51bGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZnJhZ21lbnQucmVmICE9PSBudWxsKSB7XG4gICAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCQxKGZyYWdtZW50KTtcblxuICAgICAgZXJyb3IoJ0ludmFsaWQgYXR0cmlidXRlIGByZWZgIHN1cHBsaWVkIHRvIGBSZWFjdC5GcmFnbWVudGAuJyk7XG5cbiAgICAgIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50JDEobnVsbCk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24odHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIHZhciB2YWxpZFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSk7IC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gIC8vIHN1Y2NlZWQgYW5kIHRoZXJlIHdpbGwgbGlrZWx5IGJlIGVycm9ycyBpbiByZW5kZXIuXG5cbiAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuXG4gICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh0eXBlKS5sZW5ndGggPT09IDApIHtcbiAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgXCJpdCdzIGRlZmluZWQgaW4sIG9yIHlvdSBtaWdodCBoYXZlIG1peGVkIHVwIGRlZmF1bHQgYW5kIG5hbWVkIGltcG9ydHMuXCI7XG4gICAgfVxuXG4gICAgdmFyIHNvdXJjZUluZm8gPSBnZXRTb3VyY2VJbmZvRXJyb3JBZGRlbmR1bUZvclByb3BzKHByb3BzKTtcblxuICAgIGlmIChzb3VyY2VJbmZvKSB7XG4gICAgICBpbmZvICs9IHNvdXJjZUluZm87XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm8gKz0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGVTdHJpbmc7XG5cbiAgICBpZiAodHlwZSA9PT0gbnVsbCkge1xuICAgICAgdHlwZVN0cmluZyA9ICdudWxsJztcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodHlwZSkpIHtcbiAgICAgIHR5cGVTdHJpbmcgPSAnYXJyYXknO1xuICAgIH0gZWxzZSBpZiAodHlwZSAhPT0gdW5kZWZpbmVkICYmIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRSkge1xuICAgICAgdHlwZVN0cmluZyA9IFwiPFwiICsgKGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlLnR5cGUpIHx8ICdVbmtub3duJykgKyBcIiAvPlwiO1xuICAgICAgaW5mbyA9ICcgRGlkIHlvdSBhY2NpZGVudGFsbHkgZXhwb3J0IGEgSlNYIGxpdGVyYWwgaW5zdGVhZCBvZiBhIGNvbXBvbmVudD8nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlU3RyaW5nID0gdHlwZW9mIHR5cGU7XG4gICAgfVxuXG4gICAge1xuICAgICAgZXJyb3IoJ1JlYWN0LmNyZWF0ZUVsZW1lbnQ6IHR5cGUgaXMgaW52YWxpZCAtLSBleHBlY3RlZCBhIHN0cmluZyAoZm9yICcgKyAnYnVpbHQtaW4gY29tcG9uZW50cykgb3IgYSBjbGFzcy9mdW5jdGlvbiAoZm9yIGNvbXBvc2l0ZSAnICsgJ2NvbXBvbmVudHMpIGJ1dCBnb3Q6ICVzLiVzJywgdHlwZVN0cmluZywgaW5mbyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIFRoZSByZXN1bHQgY2FuIGJlIG51bGxpc2ggaWYgYSBtb2NrIG9yIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIHVzZWQuXG4gIC8vIFRPRE86IERyb3AgdGhpcyB3aGVuIHRoZXNlIGFyZSBubyBsb25nZXIgYWxsb3dlZCBhcyB0aGUgdHlwZSBhcmd1bWVudC5cblxuICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0gLy8gU2tpcCBrZXkgd2FybmluZyBpZiB0aGUgdHlwZSBpc24ndCB2YWxpZCBzaW5jZSBvdXIga2V5IHZhbGlkYXRpb24gbG9naWNcbiAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAvLyBXZSBkb24ndCB3YW50IGV4Y2VwdGlvbiBiZWhhdmlvciB0byBkaWZmZXIgYmV0d2VlbiBkZXYgYW5kIHByb2QuXG4gIC8vIChSZW5kZXJpbmcgd2lsbCB0aHJvdyB3aXRoIGEgaGVscGZ1bCBtZXNzYWdlIGFuZCBhcyBzb29uIGFzIHRoZSB0eXBlIGlzXG4gIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcblxuXG4gIGlmICh2YWxpZFR5cGUpIHtcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCB0eXBlKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSkge1xuICAgIHZhbGlkYXRlRnJhZ21lbnRQcm9wcyhlbGVtZW50KTtcbiAgfSBlbHNlIHtcbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxudmFyIGRpZFdhcm5BYm91dERlcHJlY2F0ZWRDcmVhdGVGYWN0b3J5ID0gZmFsc2U7XG5mdW5jdGlvbiBjcmVhdGVGYWN0b3J5V2l0aFZhbGlkYXRpb24odHlwZSkge1xuICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IGNyZWF0ZUVsZW1lbnRXaXRoVmFsaWRhdGlvbi5iaW5kKG51bGwsIHR5cGUpO1xuICB2YWxpZGF0ZWRGYWN0b3J5LnR5cGUgPSB0eXBlO1xuXG4gIHtcbiAgICBpZiAoIWRpZFdhcm5BYm91dERlcHJlY2F0ZWRDcmVhdGVGYWN0b3J5KSB7XG4gICAgICBkaWRXYXJuQWJvdXREZXByZWNhdGVkQ3JlYXRlRmFjdG9yeSA9IHRydWU7XG5cbiAgICAgIHdhcm4oJ1JlYWN0LmNyZWF0ZUZhY3RvcnkoKSBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gJyArICdhIGZ1dHVyZSBtYWpvciByZWxlYXNlLiBDb25zaWRlciB1c2luZyBKU1ggJyArICdvciB1c2UgUmVhY3QuY3JlYXRlRWxlbWVudCgpIGRpcmVjdGx5IGluc3RlYWQuJyk7XG4gICAgfSAvLyBMZWdhY3kgaG9vazogcmVtb3ZlIGl0XG5cblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWxpZGF0ZWRGYWN0b3J5LCAndHlwZScsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdhcm4oJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3R5cGUnLCB7XG4gICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHZhbGlkYXRlZEZhY3Rvcnk7XG59XG5mdW5jdGlvbiBjbG9uZUVsZW1lbnRXaXRoVmFsaWRhdGlvbihlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBjbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgbmV3RWxlbWVudC50eXBlKTtcbiAgfVxuXG4gIHZhbGlkYXRlUHJvcFR5cGVzKG5ld0VsZW1lbnQpO1xuICByZXR1cm4gbmV3RWxlbWVudDtcbn1cblxuZnVuY3Rpb24gc3RhcnRUcmFuc2l0aW9uKHNjb3BlLCBvcHRpb25zKSB7XG4gIHZhciBwcmV2VHJhbnNpdGlvbiA9IFJlYWN0Q3VycmVudEJhdGNoQ29uZmlnLnRyYW5zaXRpb247XG4gIFJlYWN0Q3VycmVudEJhdGNoQ29uZmlnLnRyYW5zaXRpb24gPSB7fTtcbiAgdmFyIGN1cnJlbnRUcmFuc2l0aW9uID0gUmVhY3RDdXJyZW50QmF0Y2hDb25maWcudHJhbnNpdGlvbjtcblxuICB7XG4gICAgUmVhY3RDdXJyZW50QmF0Y2hDb25maWcudHJhbnNpdGlvbi5fdXBkYXRlZEZpYmVycyA9IG5ldyBTZXQoKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgc2NvcGUoKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBSZWFjdEN1cnJlbnRCYXRjaENvbmZpZy50cmFuc2l0aW9uID0gcHJldlRyYW5zaXRpb247XG5cbiAgICB7XG4gICAgICBpZiAocHJldlRyYW5zaXRpb24gPT09IG51bGwgJiYgY3VycmVudFRyYW5zaXRpb24uX3VwZGF0ZWRGaWJlcnMpIHtcbiAgICAgICAgdmFyIHVwZGF0ZWRGaWJlcnNDb3VudCA9IGN1cnJlbnRUcmFuc2l0aW9uLl91cGRhdGVkRmliZXJzLnNpemU7XG5cbiAgICAgICAgaWYgKHVwZGF0ZWRGaWJlcnNDb3VudCA+IDEwKSB7XG4gICAgICAgICAgd2FybignRGV0ZWN0ZWQgYSBsYXJnZSBudW1iZXIgb2YgdXBkYXRlcyBpbnNpZGUgc3RhcnRUcmFuc2l0aW9uLiAnICsgJ0lmIHRoaXMgaXMgZHVlIHRvIGEgc3Vic2NyaXB0aW9uIHBsZWFzZSByZS13cml0ZSBpdCB0byB1c2UgUmVhY3QgcHJvdmlkZWQgaG9va3MuICcgKyAnT3RoZXJ3aXNlIGNvbmN1cnJlbnQgbW9kZSBndWFyYW50ZWVzIGFyZSBvZmYgdGhlIHRhYmxlLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFRyYW5zaXRpb24uX3VwZGF0ZWRGaWJlcnMuY2xlYXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIGRpZFdhcm5BYm91dE1lc3NhZ2VDaGFubmVsID0gZmFsc2U7XG52YXIgZW5xdWV1ZVRhc2tJbXBsID0gbnVsbDtcbmZ1bmN0aW9uIGVucXVldWVUYXNrKHRhc2spIHtcbiAgaWYgKGVucXVldWVUYXNrSW1wbCA9PT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICAvLyByZWFkIHJlcXVpcmUgb2ZmIHRoZSBtb2R1bGUgb2JqZWN0IHRvIGdldCBhcm91bmQgdGhlIGJ1bmRsZXJzLlxuICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0aGVtIHRvIGRldGVjdCBhIHJlcXVpcmUgYW5kIGJ1bmRsZSBhIE5vZGUgcG9seWZpbGwuXG4gICAgICB2YXIgcmVxdWlyZVN0cmluZyA9ICgncmVxdWlyZScgKyBNYXRoLnJhbmRvbSgpKS5zbGljZSgwLCA3KTtcbiAgICAgIHZhciBub2RlUmVxdWlyZSA9IG1vZHVsZSAmJiBtb2R1bGVbcmVxdWlyZVN0cmluZ107IC8vIGFzc3VtaW5nIHdlJ3JlIGluIG5vZGUsIGxldCdzIHRyeSB0byBnZXQgbm9kZSdzXG4gICAgICAvLyB2ZXJzaW9uIG9mIHNldEltbWVkaWF0ZSwgYnlwYXNzaW5nIGZha2UgdGltZXJzIGlmIGFueS5cblxuICAgICAgZW5xdWV1ZVRhc2tJbXBsID0gbm9kZVJlcXVpcmUuY2FsbChtb2R1bGUsICd0aW1lcnMnKS5zZXRJbW1lZGlhdGU7XG4gICAgfSBjYXRjaCAoX2Vycikge1xuICAgICAgLy8gd2UncmUgaW4gYSBicm93c2VyXG4gICAgICAvLyB3ZSBjYW4ndCB1c2UgcmVndWxhciB0aW1lcnMgYmVjYXVzZSB0aGV5IG1heSBzdGlsbCBiZSBmYWtlZFxuICAgICAgLy8gc28gd2UgdHJ5IE1lc3NhZ2VDaGFubmVsK3Bvc3RNZXNzYWdlIGluc3RlYWRcbiAgICAgIGVucXVldWVUYXNrSW1wbCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB7XG4gICAgICAgICAgaWYgKGRpZFdhcm5BYm91dE1lc3NhZ2VDaGFubmVsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZGlkV2FybkFib3V0TWVzc2FnZUNoYW5uZWwgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIE1lc3NhZ2VDaGFubmVsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBlcnJvcignVGhpcyBicm93c2VyIGRvZXMgbm90IGhhdmUgYSBNZXNzYWdlQ2hhbm5lbCBpbXBsZW1lbnRhdGlvbiwgJyArICdzbyBlbnF1ZXVpbmcgdGFza3MgdmlhIGF3YWl0IGFjdChhc3luYyAoKSA9PiAuLi4pIHdpbGwgZmFpbC4gJyArICdQbGVhc2UgZmlsZSBhbiBpc3N1ZSBhdCBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzICcgKyAnaWYgeW91IGVuY291bnRlciB0aGlzIHdhcm5pbmcuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBjYWxsYmFjaztcbiAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSh1bmRlZmluZWQpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZW5xdWV1ZVRhc2tJbXBsKHRhc2spO1xufVxuXG52YXIgYWN0U2NvcGVEZXB0aCA9IDA7XG52YXIgZGlkV2Fybk5vQXdhaXRBY3QgPSBmYWxzZTtcbmZ1bmN0aW9uIGFjdChjYWxsYmFjaykge1xuICB7XG4gICAgLy8gYGFjdGAgY2FsbHMgY2FuIGJlIG5lc3RlZCwgc28gd2UgdHJhY2sgdGhlIGRlcHRoLiBUaGlzIHJlcHJlc2VudHMgdGhlXG4gICAgLy8gbnVtYmVyIG9mIGBhY3RgIHNjb3BlcyBvbiB0aGUgc3RhY2suXG4gICAgdmFyIHByZXZBY3RTY29wZURlcHRoID0gYWN0U2NvcGVEZXB0aDtcbiAgICBhY3RTY29wZURlcHRoKys7XG5cbiAgICBpZiAoUmVhY3RDdXJyZW50QWN0UXVldWUuY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgLy8gVGhpcyBpcyB0aGUgb3V0ZXJtb3N0IGBhY3RgIHNjb3BlLiBJbml0aWFsaXplIHRoZSBxdWV1ZS4gVGhlIHJlY29uY2lsZXJcbiAgICAgIC8vIHdpbGwgZGV0ZWN0IHRoZSBxdWV1ZSBhbmQgdXNlIGl0IGluc3RlYWQgb2YgU2NoZWR1bGVyLlxuICAgICAgUmVhY3RDdXJyZW50QWN0UXVldWUuY3VycmVudCA9IFtdO1xuICAgIH1cblxuICAgIHZhciBwcmV2SXNCYXRjaGluZ0xlZ2FjeSA9IFJlYWN0Q3VycmVudEFjdFF1ZXVlLmlzQmF0Y2hpbmdMZWdhY3k7XG4gICAgdmFyIHJlc3VsdDtcblxuICAgIHRyeSB7XG4gICAgICAvLyBVc2VkIHRvIHJlcHJvZHVjZSBiZWhhdmlvciBvZiBgYmF0Y2hlZFVwZGF0ZXNgIGluIGxlZ2FjeSBtb2RlLiBPbmx5XG4gICAgICAvLyBzZXQgdG8gYHRydWVgIHdoaWxlIHRoZSBnaXZlbiBjYWxsYmFjayBpcyBleGVjdXRlZCwgbm90IGZvciB1cGRhdGVzXG4gICAgICAvLyB0cmlnZ2VyZWQgZHVyaW5nIGFuIGFzeW5jIGV2ZW50LCBiZWNhdXNlIHRoaXMgaXMgaG93IHRoZSBsZWdhY3lcbiAgICAgIC8vIGltcGxlbWVudGF0aW9uIG9mIGBhY3RgIGJlaGF2ZWQuXG4gICAgICBSZWFjdEN1cnJlbnRBY3RRdWV1ZS5pc0JhdGNoaW5nTGVnYWN5ID0gdHJ1ZTtcbiAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKCk7IC8vIFJlcGxpY2F0ZSBiZWhhdmlvciBvZiBvcmlnaW5hbCBgYWN0YCBpbXBsZW1lbnRhdGlvbiBpbiBsZWdhY3kgbW9kZSxcbiAgICAgIC8vIHdoaWNoIGZsdXNoZWQgdXBkYXRlcyBpbW1lZGlhdGVseSBhZnRlciB0aGUgc2NvcGUgZnVuY3Rpb24gZXhpdHMsIGV2ZW5cbiAgICAgIC8vIGlmIGl0J3MgYW4gYXN5bmMgZnVuY3Rpb24uXG5cbiAgICAgIGlmICghcHJldklzQmF0Y2hpbmdMZWdhY3kgJiYgUmVhY3RDdXJyZW50QWN0UXVldWUuZGlkU2NoZWR1bGVMZWdhY3lVcGRhdGUpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gUmVhY3RDdXJyZW50QWN0UXVldWUuY3VycmVudDtcblxuICAgICAgICBpZiAocXVldWUgIT09IG51bGwpIHtcbiAgICAgICAgICBSZWFjdEN1cnJlbnRBY3RRdWV1ZS5kaWRTY2hlZHVsZUxlZ2FjeVVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgIGZsdXNoQWN0UXVldWUocXVldWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHBvcEFjdFNjb3BlKHByZXZBY3RTY29wZURlcHRoKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBSZWFjdEN1cnJlbnRBY3RRdWV1ZS5pc0JhdGNoaW5nTGVnYWN5ID0gcHJldklzQmF0Y2hpbmdMZWdhY3k7XG4gICAgfVxuXG4gICAgaWYgKHJlc3VsdCAhPT0gbnVsbCAmJiB0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhciB0aGVuYWJsZVJlc3VsdCA9IHJlc3VsdDsgLy8gVGhlIGNhbGxiYWNrIGlzIGFuIGFzeW5jIGZ1bmN0aW9uIChpLmUuIHJldHVybmVkIGEgcHJvbWlzZSkuIFdhaXRcbiAgICAgIC8vIGZvciBpdCB0byByZXNvbHZlIGJlZm9yZSBleGl0aW5nIHRoZSBjdXJyZW50IHNjb3BlLlxuXG4gICAgICB2YXIgd2FzQXdhaXRlZCA9IGZhbHNlO1xuICAgICAgdmFyIHRoZW5hYmxlID0ge1xuICAgICAgICB0aGVuOiBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgd2FzQXdhaXRlZCA9IHRydWU7XG4gICAgICAgICAgdGhlbmFibGVSZXN1bHQudGhlbihmdW5jdGlvbiAocmV0dXJuVmFsdWUpIHtcbiAgICAgICAgICAgIHBvcEFjdFNjb3BlKHByZXZBY3RTY29wZURlcHRoKTtcblxuICAgICAgICAgICAgaWYgKGFjdFNjb3BlRGVwdGggPT09IDApIHtcbiAgICAgICAgICAgICAgLy8gV2UndmUgZXhpdGVkIHRoZSBvdXRlcm1vc3QgYWN0IHNjb3BlLiBSZWN1cnNpdmVseSBmbHVzaCB0aGVcbiAgICAgICAgICAgICAgLy8gcXVldWUgdW50aWwgdGhlcmUncyBubyByZW1haW5pbmcgd29yay5cbiAgICAgICAgICAgICAgcmVjdXJzaXZlbHlGbHVzaEFzeW5jQWN0V29yayhyZXR1cm5WYWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmV0dXJuVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgLy8gVGhlIGNhbGxiYWNrIHRocmV3IGFuIGVycm9yLlxuICAgICAgICAgICAgcG9wQWN0U2NvcGUocHJldkFjdFNjb3BlRGVwdGgpO1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAge1xuICAgICAgICBpZiAoIWRpZFdhcm5Ob0F3YWl0QWN0ICYmIHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge30pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF3YXNBd2FpdGVkKSB7XG4gICAgICAgICAgICAgIGRpZFdhcm5Ob0F3YWl0QWN0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBlcnJvcignWW91IGNhbGxlZCBhY3QoYXN5bmMgKCkgPT4gLi4uKSB3aXRob3V0IGF3YWl0LiAnICsgJ1RoaXMgY291bGQgbGVhZCB0byB1bmV4cGVjdGVkIHRlc3RpbmcgYmVoYXZpb3VyLCAnICsgJ2ludGVybGVhdmluZyBtdWx0aXBsZSBhY3QgY2FsbHMgYW5kIG1peGluZyB0aGVpciAnICsgJ3Njb3Blcy4gJyArICdZb3Ugc2hvdWxkIC0gYXdhaXQgYWN0KGFzeW5jICgpID0+IC4uLik7Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoZW5hYmxlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcmV0dXJuVmFsdWUgPSByZXN1bHQ7IC8vIFRoZSBjYWxsYmFjayBpcyBub3QgYW4gYXN5bmMgZnVuY3Rpb24uIEV4aXQgdGhlIGN1cnJlbnQgc2NvcGVcbiAgICAgIC8vIGltbWVkaWF0ZWx5LCB3aXRob3V0IGF3YWl0aW5nLlxuXG4gICAgICBwb3BBY3RTY29wZShwcmV2QWN0U2NvcGVEZXB0aCk7XG5cbiAgICAgIGlmIChhY3RTY29wZURlcHRoID09PSAwKSB7XG4gICAgICAgIC8vIEV4aXRpbmcgdGhlIG91dGVybW9zdCBhY3Qgc2NvcGUuIEZsdXNoIHRoZSBxdWV1ZS5cbiAgICAgICAgdmFyIF9xdWV1ZSA9IFJlYWN0Q3VycmVudEFjdFF1ZXVlLmN1cnJlbnQ7XG5cbiAgICAgICAgaWYgKF9xdWV1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGZsdXNoQWN0UXVldWUoX3F1ZXVlKTtcbiAgICAgICAgICBSZWFjdEN1cnJlbnRBY3RRdWV1ZS5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfSAvLyBSZXR1cm4gYSB0aGVuYWJsZS4gSWYgdGhlIHVzZXIgYXdhaXRzIGl0LCB3ZSdsbCBmbHVzaCBhZ2FpbiBpblxuICAgICAgICAvLyBjYXNlIGFkZGl0aW9uYWwgd29yayB3YXMgc2NoZWR1bGVkIGJ5IGEgbWljcm90YXNrLlxuXG5cbiAgICAgICAgdmFyIF90aGVuYWJsZSA9IHtcbiAgICAgICAgICB0aGVuOiBmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvLyBDb25maXJtIHdlIGhhdmVuJ3QgcmUtZW50ZXJlZCBhbm90aGVyIGBhY3RgIHNjb3BlLCBpbiBjYXNlXG4gICAgICAgICAgICAvLyB0aGUgdXNlciBkb2VzIHNvbWV0aGluZyB3ZWlyZCBsaWtlIGF3YWl0IHRoZSB0aGVuYWJsZVxuICAgICAgICAgICAgLy8gbXVsdGlwbGUgdGltZXMuXG4gICAgICAgICAgICBpZiAoUmVhY3RDdXJyZW50QWN0UXVldWUuY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBmbHVzaCB0aGUgcXVldWUgdW50aWwgdGhlcmUncyBubyByZW1haW5pbmcgd29yay5cbiAgICAgICAgICAgICAgUmVhY3RDdXJyZW50QWN0UXVldWUuY3VycmVudCA9IFtdO1xuICAgICAgICAgICAgICByZWN1cnNpdmVseUZsdXNoQXN5bmNBY3RXb3JrKHJldHVyblZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShyZXR1cm5WYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoZW5hYmxlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2luY2Ugd2UncmUgaW5zaWRlIGEgbmVzdGVkIGBhY3RgIHNjb3BlLCB0aGUgcmV0dXJuZWQgdGhlbmFibGVcbiAgICAgICAgLy8gaW1tZWRpYXRlbHkgcmVzb2x2ZXMuIFRoZSBvdXRlciBzY29wZSB3aWxsIGZsdXNoIHRoZSBxdWV1ZS5cbiAgICAgICAgdmFyIF90aGVuYWJsZTIgPSB7XG4gICAgICAgICAgdGhlbjogZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgcmVzb2x2ZShyZXR1cm5WYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX3RoZW5hYmxlMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9wQWN0U2NvcGUocHJldkFjdFNjb3BlRGVwdGgpIHtcbiAge1xuICAgIGlmIChwcmV2QWN0U2NvcGVEZXB0aCAhPT0gYWN0U2NvcGVEZXB0aCAtIDEpIHtcbiAgICAgIGVycm9yKCdZb3Ugc2VlbSB0byBoYXZlIG92ZXJsYXBwaW5nIGFjdCgpIGNhbGxzLCB0aGlzIGlzIG5vdCBzdXBwb3J0ZWQuICcgKyAnQmUgc3VyZSB0byBhd2FpdCBwcmV2aW91cyBhY3QoKSBjYWxscyBiZWZvcmUgbWFraW5nIGEgbmV3IG9uZS4gJyk7XG4gICAgfVxuXG4gICAgYWN0U2NvcGVEZXB0aCA9IHByZXZBY3RTY29wZURlcHRoO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlY3Vyc2l2ZWx5Rmx1c2hBc3luY0FjdFdvcmsocmV0dXJuVmFsdWUsIHJlc29sdmUsIHJlamVjdCkge1xuICB7XG4gICAgdmFyIHF1ZXVlID0gUmVhY3RDdXJyZW50QWN0UXVldWUuY3VycmVudDtcblxuICAgIGlmIChxdWV1ZSAhPT0gbnVsbCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZmx1c2hBY3RRdWV1ZShxdWV1ZSk7XG4gICAgICAgIGVucXVldWVUYXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAvLyBObyBhZGRpdGlvbmFsIHdvcmsgd2FzIHNjaGVkdWxlZC4gRmluaXNoLlxuICAgICAgICAgICAgUmVhY3RDdXJyZW50QWN0UXVldWUuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgICByZXNvbHZlKHJldHVyblZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gS2VlcCBmbHVzaGluZyB3b3JrIHVudGlsIHRoZXJlJ3Mgbm9uZSBsZWZ0LlxuICAgICAgICAgICAgcmVjdXJzaXZlbHlGbHVzaEFzeW5jQWN0V29yayhyZXR1cm5WYWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb2x2ZShyZXR1cm5WYWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbnZhciBpc0ZsdXNoaW5nID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGZsdXNoQWN0UXVldWUocXVldWUpIHtcbiAge1xuICAgIGlmICghaXNGbHVzaGluZykge1xuICAgICAgLy8gUHJldmVudCByZS1lbnRyYW5jZS5cbiAgICAgIGlzRmx1c2hpbmcgPSB0cnVlO1xuICAgICAgdmFyIGkgPSAwO1xuXG4gICAgICB0cnkge1xuICAgICAgICBmb3IgKDsgaSA8IHF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGNhbGxiYWNrID0gcXVldWVbaV07XG5cbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrKHRydWUpO1xuICAgICAgICAgIH0gd2hpbGUgKGNhbGxiYWNrICE9PSBudWxsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBJZiBzb21ldGhpbmcgdGhyb3dzLCBsZWF2ZSB0aGUgcmVtYWluaW5nIGNhbGxiYWNrcyBvbiB0aGUgcXVldWUuXG4gICAgICAgIHF1ZXVlID0gcXVldWUuc2xpY2UoaSArIDEpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlzRmx1c2hpbmcgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIGNyZWF0ZUVsZW1lbnQkMSA9ICBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24gO1xudmFyIGNsb25lRWxlbWVudCQxID0gIGNsb25lRWxlbWVudFdpdGhWYWxpZGF0aW9uIDtcbnZhciBjcmVhdGVGYWN0b3J5ID0gIGNyZWF0ZUZhY3RvcnlXaXRoVmFsaWRhdGlvbiA7XG52YXIgQ2hpbGRyZW4gPSB7XG4gIG1hcDogbWFwQ2hpbGRyZW4sXG4gIGZvckVhY2g6IGZvckVhY2hDaGlsZHJlbixcbiAgY291bnQ6IGNvdW50Q2hpbGRyZW4sXG4gIHRvQXJyYXk6IHRvQXJyYXksXG4gIG9ubHk6IG9ubHlDaGlsZFxufTtcblxuZXhwb3J0cy5DaGlsZHJlbiA9IENoaWxkcmVuO1xuZXhwb3J0cy5Db21wb25lbnQgPSBDb21wb25lbnQ7XG5leHBvcnRzLkZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbmV4cG9ydHMuUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xuZXhwb3J0cy5QdXJlQ29tcG9uZW50ID0gUHVyZUNvbXBvbmVudDtcbmV4cG9ydHMuU3RyaWN0TW9kZSA9IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG5leHBvcnRzLlN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbmV4cG9ydHMuX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQgPSBSZWFjdFNoYXJlZEludGVybmFscztcbmV4cG9ydHMuYWN0ID0gYWN0O1xuZXhwb3J0cy5jbG9uZUVsZW1lbnQgPSBjbG9uZUVsZW1lbnQkMTtcbmV4cG9ydHMuY3JlYXRlQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ7XG5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBjcmVhdGVFbGVtZW50JDE7XG5leHBvcnRzLmNyZWF0ZUZhY3RvcnkgPSBjcmVhdGVGYWN0b3J5O1xuZXhwb3J0cy5jcmVhdGVSZWYgPSBjcmVhdGVSZWY7XG5leHBvcnRzLmZvcndhcmRSZWYgPSBmb3J3YXJkUmVmO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudCA9IGlzVmFsaWRFbGVtZW50O1xuZXhwb3J0cy5sYXp5ID0gbGF6eTtcbmV4cG9ydHMubWVtbyA9IG1lbW87XG5leHBvcnRzLnN0YXJ0VHJhbnNpdGlvbiA9IHN0YXJ0VHJhbnNpdGlvbjtcbmV4cG9ydHMudW5zdGFibGVfYWN0ID0gYWN0O1xuZXhwb3J0cy51c2VDYWxsYmFjayA9IHVzZUNhbGxiYWNrO1xuZXhwb3J0cy51c2VDb250ZXh0ID0gdXNlQ29udGV4dDtcbmV4cG9ydHMudXNlRGVidWdWYWx1ZSA9IHVzZURlYnVnVmFsdWU7XG5leHBvcnRzLnVzZURlZmVycmVkVmFsdWUgPSB1c2VEZWZlcnJlZFZhbHVlO1xuZXhwb3J0cy51c2VFZmZlY3QgPSB1c2VFZmZlY3Q7XG5leHBvcnRzLnVzZUlkID0gdXNlSWQ7XG5leHBvcnRzLnVzZUltcGVyYXRpdmVIYW5kbGUgPSB1c2VJbXBlcmF0aXZlSGFuZGxlO1xuZXhwb3J0cy51c2VJbnNlcnRpb25FZmZlY3QgPSB1c2VJbnNlcnRpb25FZmZlY3Q7XG5leHBvcnRzLnVzZUxheW91dEVmZmVjdCA9IHVzZUxheW91dEVmZmVjdDtcbmV4cG9ydHMudXNlTWVtbyA9IHVzZU1lbW87XG5leHBvcnRzLnVzZVJlZHVjZXIgPSB1c2VSZWR1Y2VyO1xuZXhwb3J0cy51c2VSZWYgPSB1c2VSZWY7XG5leHBvcnRzLnVzZVN0YXRlID0gdXNlU3RhdGU7XG5leHBvcnRzLnVzZVN5bmNFeHRlcm5hbFN0b3JlID0gdXNlU3luY0V4dGVybmFsU3RvcmU7XG5leHBvcnRzLnVzZVRyYW5zaXRpb24gPSB1c2VUcmFuc2l0aW9uO1xuZXhwb3J0cy52ZXJzaW9uID0gUmVhY3RWZXJzaW9uO1xuICAgICAgICAgIC8qIGdsb2JhbCBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gKi9cbmlmIChcbiAgdHlwZW9mIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgdHlwZW9mIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5yZWdpc3RlckludGVybmFsTW9kdWxlU3RvcCA9PT1cbiAgICAnZnVuY3Rpb24nXG4pIHtcbiAgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLnJlZ2lzdGVySW50ZXJuYWxNb2R1bGVTdG9wKG5ldyBFcnJvcigpKTtcbn1cbiAgICAgICAgXG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGFuZ3VhZ2UsIFJldmlld0dyYWRlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgREVGQVVMVF9FQkJJTkdIQVVTX0xBRERFUiB9IGZyb20gJy4vZWJiaW5naGF1cyc7XG5cbmV4cG9ydCB0eXBlIFJlc29sdmVkTGFuZ3VhZ2UgPSAnemgnIHwgJ2VuJztcblxuZXhwb3J0IGNvbnN0IHRyYW5zbGF0aW9ucyA9IHtcbiAgemg6IHtcbiAgICAvLyBBcHAgJiBIZWFkZXJcbiAgICAnYXBwLnRpdGxlJzogJ0xlZXRDb2RlIOiJvuWuvua1qeaWrycsXG4gICAgJ2FwcC5zdWJ0aXRsZSc6ICfpl7TpmpTph43lpI0gwrcg56eR5a2m5o6M5o+h566X5rOVJyxcbiAgICAnYXBwLmFkZFRvb2x0aXAnOiAn5omL5Yqo5b2V5YWl5paw6aKYJyxcbiAgICAnYXBwLnNldHRpbmdzVG9vbHRpcCc6ICforr7nva7kuI7mlbDmja7nrqHnkIYnLFxuICAgICdoZWFkZXIudG9kYXlQcm9ncmVzcyc6ICfku4rml6XlpI3kuaDov5vluqYnLFxuICAgICdoZWFkZXIudGFza3NDb3VudCc6ICd7Y29tcGxldGVkfSAvIHt0b3RhbH0g6aKYJyxcbiAgICAnaGVhZGVyLnByb2dyZXNzQXJpYSc6ICfku4rml6XlpI3kuaDlrozmiJDluqYnLFxuICAgICdoZWFkZXIuc3RyZWFrJzogJ+i/nue7rSB7bn0g5aSpJyxcbiAgICAnaGVhZGVyLnJldGVudGlvbic6ICfmgLvnlZnlrZjnjoc6JyxcbiAgICAnaGVhZGVyLmxpYnJhcnknOiAn6aKY5bqTOicsXG4gICAgJ2hlYWRlci51bml0UHJvYmxlbSc6ICfpopgnLFxuICAgICd0YWIuZHVlJzogJ+S7iuaXpeW+heWKnicsXG4gICAgJ3RhYi5jb21wbGV0ZWQnOiAn5bey5a6M5oiQJyxcbiAgICAndGFiLmxpYnJhcnknOiAn6aKY5bqT5qGj5qGIJyxcbiAgICAndGFiLmNhbGVuZGFyJzogJ+aXpeWOhui0n+iNtycsXG4gICAgJ3RhYi5uYXZBcmlhJzogJ+WkjeS5oOinhuWbvuWvvOiIqicsXG4gICAgJ2FwcC5sb2FkaW5nJzogJ+WKoOi9veiJvuWuvua1qeaWr+iusOW/huW6ky4uLicsXG5cbiAgICAvLyBJbmdlc3Rpb24gQmFubmVyIChBcHAudHN4KVxuICAgICdiYW5uZXIuZGV0ZWN0ZWQnOiAn5qOA5rWL5Yiw5Yqb5omj5b2T5YmN6aG177yaI3tudW1iZXJ9IHt0aXRsZX0nLFxuICAgICdiYW5uZXIuaW1wb3J0JzogJ+S4gOmUruaUtuW9lScsXG4gICAgJ2Jhbm5lci5hbHJlYWR5VHJhY2tlZCc6ICflvZPliY3pobXpnaLpopjnm67lt7LlnKjoib7lrr7mtanmlq/lpI3kuaDlupPkuK0nLFxuICAgICdiYW5uZXIudHJhY2tlZEJhZGdlJzogJ+W3sui3n+i4qicsXG5cbiAgICAvLyBEdWUgUXVldWVcbiAgICAnZHVlLm92ZXJkdWVBbGVydCc6ICfmnIkge2NvdW50fSDpgZPpopjnm67lt7LotoXmnJ/vvIzlu7rorq7otoHng63miZPpk4HkvJjlhYjph43lgZrvvIEnLFxuXG4gICAgLy8gWmVybyBJbmJveFxuICAgICd6ZXJvLnRpdGxlJzogJ+S7iuaXpeWkjeS5oOS7u+WKoeW3suWFqOmDqOa4heepuu+8gScsXG4gICAgJ3plcm8uZGVzY3JpcHRpb24nOiAn6Im+5a6+5rWp5pav6K6w5b+G5qih5Z6L5aSE5LqO5pyA5L2z55WZ5a2Y54K544CC5L+d5oyB5LiT5rOo5LiO6L+e57ut5omT5Y2h77yM6K6p566X5rOV55u06KeJ6Ieq54S25rKJ5reA44CCJyxcbiAgICAnemVyby5zb2x2ZU5ldyc6ICfljrvlipvmiaPliLfkuIDpgZPmlrDpopgnLFxuICAgICd6ZXJvLmJyb3dzZUxpYnJhcnknOiAn5rWP6KeI6aKY5bqT5qGj5qGI5bqTJyxcblxuICAgIC8vIFByb2JsZW0gQ2FyZFxuICAgICdjYXJkLm9wZW5MZWV0Q29kZSc6ICflnKjlipvmiaPkuK3miZPlvIAnLFxuICAgICdjYXJkLm9wZW5MZWV0Q29kZUFyaWEnOiAn5Zyo5Yqb5omj5Lit5omT5byA6aKY55uuICN7bnVtYmVyfSB7dGl0bGV9JyxcbiAgICAnY2FyZC5vdmVyZHVlJzogJ+i2heacnyB7ZGF5c30g5aSpJyxcbiAgICAnY2FyZC5kdWVUb2RheSc6ICfku4rml6XliLDmnJ8nLFxuICAgICdjYXJkLnNhbXBsZUJhZGdlJzogJ+ekuuS+iycsXG4gICAgJ2NhcmQuc3RhZ2UnOiAn6Zi25q61IOesrCB7c3RhZ2V9IOmYticsXG4gICAgJ2NhcmQuaW50ZXJ2YWwnOiAn6Ze06ZqUIHtpbnRlcnZhbH1kJyxcbiAgICAnY2FyZC5yZXRlbnRpb24nOiAn55WZ5a2YIHtyYXRlfSUnLFxuICAgICdjYXJkLnJldGVudGlvblRvb2x0aXAnOiAn6aKE5Lyw6K6w5b+G5by65bqmJyxcbiAgICAnY2FyZC5ub3Rlc1RpdGxlJzogJ+ino+mimOaAnei3r+WNoeeJhycsXG4gICAgJ2NhcmQubm90ZXNBcmlhRXhwYW5kJzogJ+afpeeci+ino+mimOaAnei3r+WNoeeJhycsXG4gICAgJ2NhcmQubm90ZXNBcmlhQ29sbGFwc2UnOiAn5pS26LW36Kej6aKY5oCd6Lev5Y2h54mHJyxcbiAgICAnY2FyZC5kZWxldGVDb25maXJtJzogJ+ehruWumuS7juiJvuWuvua1qeaWr+WkjeS5oOW6k+S4reWIoOmZpOmimOebriAje251bWJlcn0ge3RpdGxlfSDlkJfvvJ8nLFxuICAgICdjYXJkLmRlbGV0ZVRvb2x0aXAnOiAn5Yig6Zmk5q2k6aKYJyxcbiAgICAnY2FyZC5kZWxldGVBcmlhJzogJ+S7juiJvuWuvua1qeaWr+WkjeS5oOW6k+S4reWIoOmZpOmimOebriAje251bWJlcn0ge3RpdGxlfScsXG4gICAgJ2NhcmQuZmVlZGJhY2tMYWJlbCc6ICfmjozmj6Hluqblj43ppog6JyxcbiAgICAnY2FyZC5ncmFkZUFyaWEnOiAn5o6M5o+h5bqm6K+E5a6a5Li6e25hbWV977yIe3N1Yn3vvInvvIzkuIvmrKHlpI3kuaDlsIblnKh7ZGF5c30nLFxuXG4gICAgLy8gR3JhZGVzXG4gICAgJ2dyYWRlLmFnYWluLm5hbWUnOiAn6YeN5p2lJyxcbiAgICAnZ3JhZGUuYWdhaW4uc3ViJzogJ+WujOWFqOWNoeWjsycsXG4gICAgJ2dyYWRlLmhhcmQubmFtZSc6ICflm7Dpmr4nLFxuICAgICdncmFkZS5oYXJkLnN1Yic6ICfli4nlvLrlhpnlh7onLFxuICAgICdncmFkZS5nb29kLm5hbWUnOiAn6Imv5aW9JyxcbiAgICAnZ3JhZGUuZ29vZC5zdWInOiAn54us56uLQUMnLFxuICAgICdncmFkZS5lYXN5Lm5hbWUnOiAn566A5Y2VJyxcbiAgICAnZ3JhZGUuZWFzeS5zdWInOiAn56eS5p2A6Lez6Zi2JyxcbiAgICAnZ3JhZGUuZGF5c1N1ZmZpeCc6ICd7bn3lpKnlkI4nLFxuXG4gICAgLy8gQ29tcGxldGVkIExpc3RcbiAgICAnY29tcGxldGVkLmVtcHR5VGl0bGUnOiAn5LuK5pel5bCa5pyq5a6M5oiQ5Lu75L2V5aSN5LmgJyxcbiAgICAnY29tcGxldGVkLmVtcHR5RGVzYyc6ICflnKjjgIzku4rml6XlvoXlip7jgI3kuK3lrozmiJDlgZrpopjlubbngrnlh7vmjozmj6Hluqbor4TlrprljbPlj6/orrDlvZXjgIInLFxuICAgICdjb21wbGV0ZWQuY291bnRUb2RheSc6ICfku4rml6Xlt7LmiZPljaEge2NvdW50fSDpopgnLFxuICAgICdjb21wbGV0ZWQubmV4dFN0YWdlJzogJ+W3sui/m+WFpeS4i+mYtuautScsXG4gICAgJ2NvbXBsZXRlZC5uZXh0UmV2aWV3JzogJ+S4i+asoeWkjeS5oOaXpToge2RhdGV9JyxcblxuICAgIC8vIFByb2JsZW0gTGlicmFyeVxuICAgICdsaWJyYXJ5LnNlYXJjaFBsYWNlaG9sZGVyJzogJ+aQnOe0oumimOWPt+OAgemimOebruWQjeOAgeeul+azleagh+etvi4uLicsXG4gICAgJ2xpYnJhcnkuc2VhcmNoQXJpYSc6ICfmkJzntKLpopjlj7fjgIHpopjnm67lkI3miJbnrpfms5XmoIfnrb4nLFxuICAgICdsaWJyYXJ5LmZpbHRlckRpZmZBcmlhJzogJ+aMiemavuW6puetm+mAiScsXG4gICAgJ2xpYnJhcnkuZmlsdGVyQWxsJzogJ+WFqOmDqCcsXG4gICAgJ2xpYnJhcnkuc29ydEFyaWEnOiAn6aKY55uu5o6S5bqP6KeE5YiZJyxcbiAgICAnbGlicmFyeS5zb3J0TmV4dERhdGUnOiAn5LiL5qyh5aSN5LmgJyxcbiAgICAnbGlicmFyeS5zb3J0TnVtYmVyJzogJ+WKm+aJo+mimOWPtycsXG4gICAgJ2xpYnJhcnkuc29ydFJlcGV0aXRpb24nOiAn5aSN5Lmg6L2u5qyhJyxcbiAgICAnbGlicmFyeS5tYXRjaENvdW50JzogJ+WFseWMuemFjSB7Y291bnR9IOmBk+mimOebricsXG4gICAgJ2xpYnJhcnkuZW1wdHlMaWJyYXJ5VGl0bGUnOiAn6aKY5bqT5b2T5YmN5bey5riF56m677yIMCDpgZPpopjvvIknLFxuICAgICdsaWJyYXJ5LmVtcHR5TGlicmFyeURlc2MnOiAn5L2g5bey5riF6Zmk5omA5pyJ6aKY55uu44CC5Y+v5Lul5Zyo5Yqb5omj572R6aG15Y+z5LiL6KeS54K55Ye75oKs5rWu6IO25ZuK5LiA6ZSu5pS25b2V77yM5oiW54K55Ye75Y+z5LiK6KeS44CMKyDlvZXlhaXpopjnm67jgI3mt7vliqDmlrDpopjvvIEnLFxuICAgICdsaWJyYXJ5Lm5vTWF0Y2gnOiAn5rKh5pyJ5om+5Yiw5Yy56YWN55qE6aKY55uuJyxcbiAgICAnbGlicmFyeS5uZXh0TGFiZWwnOiAn5LiL5qyhOiB7ZGF0ZX0nLFxuICAgICdsaWJyYXJ5LmRlbGV0ZUJ0bic6ICfliKDpmaQnLFxuICAgICdsaWJyYXJ5LmRlbGV0ZUNvbmZpcm0nOiAn56Gu5a6a5LuO6K6w5b+G5bqT5Lit5Yig6Zmk6aKY55uuICN7bnVtYmVyfSB7dGl0bGV9IOWQl++8nycsXG5cbiAgICAvLyBDYWxlbmRhciBGb3JlY2FzdFxuICAgICdjYWxlbmRhci5sb2FkVGl0bGUnOiAn5pyq5p2lIDcg5aSp5aSN5Lmg6LSf6I235YiG5biDJyxcbiAgICAnY2FsZW5kYXIudG90YWxEdWUnOiAn5YWxIHtjb3VudH0g6aKY5b6F5aSN5LmgJyxcbiAgICAnY2FsZW5kYXIudG9kYXknOiAn5LuK5pelJyxcbiAgICAnY2FsZW5kYXIudG9tb3Jyb3cnOiAn5piO5aSpJyxcbiAgICAnY2FsZW5kYXIud2Vla2RheXMnOiAn5ZGo5pelLOWRqOS4gCzlkajkuows5ZGo5LiJLOWRqOWbmyzlkajkupQs5ZGo5YWtJyxcbiAgICAnY2FsZW5kYXIuaGVhbHRoVGl0bGUnOiAn6aKY5bqT6K6w5b+G55WZ5a2Y5YGl5bq35bqmJyxcbiAgICAnY2FsZW5kYXIudG90YWxUcmFja2VkJzogJ+aAu+iuoSB7Y291bnR9IOmimCcsXG4gICAgJ2NhbGVuZGFyLnN0cm9uZyc6ICfniaLlm7ogKD44MCUpJyxcbiAgICAnY2FsZW5kYXIubW9kZXJhdGUnOiAn56iz5q2lICg1MC04MCUpJyxcbiAgICAnY2FsZW5kYXIuY3JpdGljYWwnOiAn5Li055WMICg8NTAlKScsXG4gICAgJ2NhbGVuZGFyLnN0cm9uZ1Rvb2x0aXAnOiAn54mi5Zu65o6M5o+hOiB7Y291bnR9IOmimCcsXG4gICAgJ2NhbGVuZGFyLm1vZGVyYXRlVG9vbHRpcCc6ICfnqLPmraXorrDlv4Y6IHtjb3VudH0g6aKYJyxcbiAgICAnY2FsZW5kYXIuY3JpdGljYWxUb29sdGlwJzogJ+S4tOeVjOmBl+W/mDoge2NvdW50fSDpopgnLFxuXG4gICAgLy8gQWRkIFByb2JsZW0gTW9kYWxcbiAgICAnYWRkLm1vZGFsVGl0bGUnOiAn5pm66IO96Ieq5Yqo5a+85YWl6aKY55uuJyxcbiAgICAnYWRkLmNsb3NlQXJpYSc6ICflhbPpl63lr7zlhaXnqpflj6MnLFxuICAgICdhZGQuaW5wdXRMYWJlbCc6ICfovpPlhaXpopjlj7fjgIHpopjnm67lkI3miJbnspjotLTlipvmiaPpk77mjqXvvJonLFxuICAgICdhZGQuaW5wdXRQbGFjZWhvbGRlcic6ICfkvovlpoIgMjA2IC8g5Lik5pWw5LmL5ZKMIC8g57KY6LS0572R5Z2AJyxcbiAgICAnYWRkLmZldGNoQnRuJzogJ+iHquWKqOino+aekCcsXG4gICAgJ2FkZC5ub3RGb3VuZCc6ICfmnKrmib7liLDljLnphY3nmoTlipvmiaPpopjnm67vvIzor7fmo4Dmn6Xpopjlj7fvvIjlpoIgMjA277yJ5oiW5a6M5pW06aKY55uu6ZO+5o6lJyxcbiAgICAnYWRkLm5ldHdvcmtFcnJvcic6ICfnvZHnu5zop6PmnpDlpLHotKXvvIzor7fmo4Dmn6XnvZHnu5zmiJbkvb/nlKjmiYvliqjlvZXlhaUnLFxuICAgICdhZGQubWV0YVN1Y2Nlc3MnOiAn5bey6Ieq5Yqo6K+G5Yir5Yqb5omj5a6Y5pa55YWD5pWw5o2uJyxcbiAgICAnYWRkLm5vdGVzTGFiZWwnOiAn5oCd6Lev5Y2h54mHIC8g5qC45b+D56C05bGA6KaB54K5ICjpgInloaspJyxcbiAgICAnYWRkLm5vdGVzUGxhY2Vob2xkZXInOiAn5Y+v6K6w5b2V5YWz6ZSu566X5rOV5aWX6Lev5oiW5piT6ZSZ54K5Li4uJyxcbiAgICAnYWRkLnN1Ym1pdEJ0bic6ICfnq4vljbPnurPlhaXoib7lrr7mtanmlq/lpI3kuaDorqHliJInLFxuICAgICdhZGQubWFudWFsVG9nZ2xlJzogJ+mdnuWKm+aJo+mimOebru+8n+eCueWHu+WxleW8gOe6r+aJi+WKqOaooeW8jycsXG4gICAgJ2FkZC5tYW51YWxOdW1iZXJMYWJlbCc6ICfnvJblj7cnLFxuICAgICdhZGQubWFudWFsTnVtYmVyUGxhY2Vob2xkZXInOiAn6aKY5Y+3JyxcbiAgICAnYWRkLm1hbnVhbFRpdGxlTGFiZWwnOiAn6aKY55uu5ZCN56ewIConLFxuICAgICdhZGQubWFudWFsVGl0bGVQbGFjZWhvbGRlcic6ICfpopjnm67lkI3np7AnLFxuICAgICdhZGQubWFudWFsVGFnc1BsYWNlaG9sZGVyJzogJ+agh+etviAo5L6L5aaCIOWKqOaAgeinhOWIkiwg6IOM5YyFKScsXG4gICAgJ2FkZC5tYW51YWxTdWJtaXQnOiAn5re75Yqg5omL5Yqo5Y2h54mHJyxcblxuICAgIC8vIFNldHRpbmdzIE1vZGFsXG4gICAgJ3NldHRpbmdzLnRpdGxlJzogJ+WkjeS5oOeul+azleiuvue9ruS4juaVsOaNrueuoeeQhicsXG4gICAgJ3NldHRpbmdzLmNsb3NlQXJpYSc6ICflhbPpl63orr7nva7nqpflj6MnLFxuICAgICdzZXR0aW5ncy5sYW5ndWFnZVNlY3Rpb24nOiAn55WM6Z2i6K+t6KiAIC8gTGFuZ3VhZ2UnLFxuICAgICdzZXR0aW5ncy5sYW5nU3lzdGVtJzogJ+i3n+maj+ezu+e7nyAvIEF1dG8nLFxuICAgICdzZXR0aW5ncy5sYW5nWmgnOiAn8J+HqPCfh7Mg566A5L2T5Lit5paHJyxcbiAgICAnc2V0dGluZ3MubGFuZ0VuJzogJ/Cfh7rwn4e4IEVuZ2xpc2gnLFxuICAgICdzZXR0aW5ncy5sYWRkZXJUaXRsZSc6ICfoib7lrr7mtanmlq/lpI3kuaDpmLbmoq8gKOWkqeaVsOW6j+WIlyknLFxuICAgICdzZXR0aW5ncy5sYWRkZXJSZXNldCc6ICfmgaLlpI3moIflh4YnLFxuICAgICdzZXR0aW5ncy5sYWRkZXJEZXNjJzogJ+avj+asoeiJr+WlvShHb29kKeino+etlOeos+atpeWJjei/mzHpmLbvvIznp5LmnYAoRWFzeSnot7Pot4My6Zi277yM5a6M5YWo6YGX5b+YKEFnYWluKemAgOWbnuesrDHpmLbjgIInLFxuICAgICdzZXR0aW5ncy5sYWRkZXJQbGFjZWhvbGRlcic6ICfkvovlpoIgMSwgMiwgNCwgNywgMTUsIDMwLCA2MCwgMTIwJyxcbiAgICAnc2V0dGluZ3MubGFkZGVyU2F2ZSc6ICfkv53lrZgnLFxuICAgICdzZXR0aW5ncy5sYWRkZXJFcnJvcic6ICfpmLbmoq/oh7PlsJHpnIDopoHljIXlkKsgMiDkuKrpgJLlop7lpKnmlbDvvIEnLFxuICAgICdzZXR0aW5ncy5sYWRkZXJTYXZlZCc6ICflt7Lmm7TmlrDoib7lrr7mtanmlq/lpI3kuaDpmLbmoq86IFt7bGFkZGVyfV0g5aSpJyxcbiAgICAnc2V0dGluZ3MubGFkZGVyUmVzdG9yZWQnOiAn5bey5oGi5aSN6buY6K6k5qCH5YeG6Zi25qKv77yaWzEsIDIsIDQsIDcsIDE1LCAzMCwgNjAsIDEyMF0g5aSpJyxcbiAgICAnc2V0dGluZ3MuYmFja3VwVGl0bGUnOiAn5pWw5o2u5aSH5Lu95LiO6L+B56e7JyxcbiAgICAnc2V0dGluZ3MuZXhwb3J0QnRuJzogJ+WvvOWHuumimOW6k+Wkh+S7vScsXG4gICAgJ3NldHRpbmdzLmV4cG9ydFN1Y2Nlc3MnOiAn5pWw5o2u5bey5oiQ5Yqf5a+85Ye65Li6IEpTT04g5paH5Lu277yBJyxcbiAgICAnc2V0dGluZ3MuaW1wb3J0QnRuJzogJ+WvvOWFpeWkh+S7veaWh+S7ticsXG4gICAgJ3NldHRpbmdzLmltcG9ydFN1Y2Nlc3MnOiAn6aKY5bqT5aSH5Lu95a+85YWl5oiQ5Yqf77yBJyxcbiAgICAnc2V0dGluZ3MuaW1wb3J0RmFpbGVkJzogJ+WvvOWFpeWksei0pe+8mkpTT04g5qC85byP5LiN5q2j56GuJyxcbiAgICAnc2V0dGluZ3MubWFuYWdlVGl0bGUnOiAn6aKY5bqT566h55CG5LiO6YeN572uJyxcbiAgICAnc2V0dGluZ3MuY2xlYXJTYW1wbGVCdG4nOiAn5LiA6ZSu56e76Zmk6aKE572u56S65L6L6aKY55uuICjkv53nlZnoh6rpgInpopgpJyxcbiAgICAnc2V0dGluZ3MuY2xlYXJTYW1wbGVDb25maXJtJzogJ+ehruWumua4hemZpOmihOiuvueahOekuuS+i+mimOebruWQl++8nyjmgqjoh6rlt7Hmt7vliqDnmoTpopjnm67lsIbooqvkv53nlZkpJyxcbiAgICAnc2V0dGluZ3MuY2xlYXJTYW1wbGVTdWNjZXNzJzogJ+W3suaIkOWKn+a4hemZpCB7Y291bnR9IOmBk+WIneWni+mihOe9ruekuuS+i+mimOebru+8gScsXG4gICAgJ3NldHRpbmdzLmNsZWFyU2FtcGxlTm9uZSc6ICfpopjlupPkuK3msqHmnInmo4DmtYvliLDpooTorr7nmoTnpLrkvovpopjnm67jgIInLFxuICAgICdzZXR0aW5ncy5yZWxvYWRTYW1wbGVCdG4nOiAn6YeN5paw6L295YWl5Yid5aeL56S65L6L6aKY55uuJyxcbiAgICAnc2V0dGluZ3MucmVsb2FkU2FtcGxlQ29uZmlybSc6ICfmmK/lkKbph43mlrDliqDovb3pu5jorqTmvJTnpLrpopjnm67mlbDmja7vvJ8nLFxuICAgICdzZXR0aW5ncy5yZWxvYWRTYW1wbGVTdWNjZXNzJzogJ+W3sui9veWFpea8lOekuuaVsOaNru+8gScsXG4gICAgJ3NldHRpbmdzLmNsZWFyQWxsQnRuJzogJ+a4heepuuWFqOmDqOmimOebruaVsOaNricsXG4gICAgJ3NldHRpbmdzLmNsZWFyQWxsQ29uZmlybSc6ICfimqDvuI8g6K2m5ZGK77ya56Gu5a6a5riF56m65YWo6YOo6aKY5bqT5ZCX77yf6K+l5pON5L2c5LiN5Y+v5pKk6ZSA77yM5bu66K6u5YWI5a+85Ye65aSH5Lu977yBJyxcbiAgICAnc2V0dGluZ3MuY2xlYXJBbGxTdWNjZXNzJzogJ+mimOW6k+W3suWFqOmDqOa4heepuu+8gScsXG5cbiAgICAvLyBDb250ZW50IFNjcmlwdCBGbG9hdGluZyBDYXBzdWxlXG4gICAgJ2NhcHN1bGUucGlsbFRyYWNrZWQnOiAn8J+noCDoib7lrr7mtanmlq86IOesrHtzdGFnZX3pmLYgKHtpbnRlcnZhbH1kKScsXG4gICAgJ2NhcHN1bGUucGlsbFVudHJhY2tlZCc6ICfwn6egIOiJvuWuvua1qeaWrzog5LiA6ZSu5pS25b2VJyxcbiAgICAnY2Fwc3VsZS5wYW5lbFRpdGxlVHJhY2tlZCc6ICfwn6egIOiJvuWuvua1qeaWr+WkjeS5oCcsXG4gICAgJ2NhcHN1bGUucGFuZWxUaXRsZVVudHJhY2tlZCc6ICfwn6egIOiJvuWuvua1qeaWr+WkjeS5oOiuoeWIkicsXG4gICAgJ2NhcHN1bGUuYXV0b0FjQmFubmVyJzogJ/Cfjokg5qOA5rWL5Yiw5o+Q5Lqk6YCa6L+H77yB5bey6Ieq5Yqo6K6w5b2V44CCJyxcbiAgICAnY2Fwc3VsZS5jdXJyZW50U3RhZ2UnOiAn5b2T5YmN6Zi25q6177ya56ysIHtzdGFnZX0g6Zi2ICjpl7TpmpQge2ludGVydmFsfSDlpKkpJyxcbiAgICAnY2Fwc3VsZS5uZXh0UmV2aWV3JzogJ+S4i+asoeWkjeS5oO+8mntkYXRlfScsXG4gICAgJ2NhcHN1bGUucmV2aWV3ZWRUb2RheSc6ICfinIUg5LuK5pel5aSN5Lmg5bey5omT5Y2h77yBJyxcbiAgICAnY2Fwc3VsZS5kdWVUb2RheSc6ICfij7HvuI8g5LuK5pel5b6F5YGa6aKY5bm26K+E5a6aJyxcbiAgICAnY2Fwc3VsZS5kb25lQmFubmVyJzogJ/Cfjokg6K6w5b+G5bey5Yi35paw6Iez5LiL5Liq5ZGo5pyf77yBJyxcbiAgICAnY2Fwc3VsZS5yYXRlUHJvbXB0JzogJ+WBmuWujOWQjuivhOWumuiusOW/hueGn+e7g+W6pu+8micsXG4gICAgJ2NhcHN1bGUudHJhY2tpbmdGb290ZXInOiAn6Im+5a6+5rWp5pav6Lef6Liq5LitJyxcbiAgICAnY2Fwc3VsZS5yZW1vdmVCdG4nOiAn5LuO5aSN5Lmg5bqT56e76Zmk5q2k6aKYJyxcbiAgICAnY2Fwc3VsZS5yZW1vdmVDb25maXJtJzogJ+ehruWumuS7juiJvuWuvua1qeaWr+WkjeS5oOW6k+S4reenu+mZpOmimOebriAje251bWJlcn0ge3RpdGxlfSDlkJfvvJ8nLFxuICAgICdjYXBzdWxlLnVudHJhY2tlZERlc2MnOiAn5bey6Ieq5Yqo6K+G5Yir6aKY55uu5L+h5oGv44CC54K55Ye75LiL5pa55oyJ6ZKu5Y2z5Y+v5LiA6ZSu57qz5YWl77yM5piO5aSp5YeG5pe25byA5ZCv56ysIDEg6L2u5aSN5Lmg77yBJyxcbiAgICAnY2Fwc3VsZS5ub3Rlc1BsYWNlaG9sZGVyJzogJ+WFs+mUruino+mimOaAnei3r+aIluaYk+mUmeeCueWNoeeJhyAo6YCJ5aGrKS4uLicsXG4gICAgJ2NhcHN1bGUuc3VibWl0QWRkJzogJ/CfmoAg5LiA6ZSu57qz5YWl6Im+5a6+5rWp5pav5aSN5LmgJyxcbiAgICAnY2Fwc3VsZS5hdXRvQWNOb3Rlcyc6ICflgZrpopjmj5DkuqTpgJrov4fvvIzoh6rliqjmlLblvZUnLFxuICB9LFxuICBlbjoge1xuICAgIC8vIEFwcCAmIEhlYWRlclxuICAgICdhcHAudGl0bGUnOiAnTGVldENvZGUgRWJiaW5naGF1cycsXG4gICAgJ2FwcC5zdWJ0aXRsZSc6ICdTcGFjZWQgUmVwZXRpdGlvbiDCtyBBbGdvcml0aG1pYyBNYXN0ZXJ5JyxcbiAgICAnYXBwLmFkZFRvb2x0aXAnOiAnQWRkIE5ldyBQcm9ibGVtJyxcbiAgICAnYXBwLnNldHRpbmdzVG9vbHRpcCc6ICdTZXR0aW5ncyAmIERhdGEnLFxuICAgICdoZWFkZXIudG9kYXlQcm9ncmVzcyc6IFwiVG9kYXkncyBSZXZpZXcgUHJvZ3Jlc3NcIixcbiAgICAnaGVhZGVyLnRhc2tzQ291bnQnOiAne2NvbXBsZXRlZH0gLyB7dG90YWx9IGR1ZScsXG4gICAgJ2hlYWRlci5wcm9ncmVzc0FyaWEnOiBcIlRvZGF5J3MgcmV2aWV3IGNvbXBsZXRpb24gcHJvZ3Jlc3NcIixcbiAgICAnaGVhZGVyLnN0cmVhayc6ICd7bn0tZGF5IHN0cmVhaycsXG4gICAgJ2hlYWRlci5yZXRlbnRpb24nOiAnUmV0ZW50aW9uOicsXG4gICAgJ2hlYWRlci5saWJyYXJ5JzogJ1RyYWNrZWQ6JyxcbiAgICAnaGVhZGVyLnVuaXRQcm9ibGVtJzogJ3Byb2JzJyxcbiAgICAndGFiLmR1ZSc6ICdEdWUgVG9kYXknLFxuICAgICd0YWIuY29tcGxldGVkJzogJ0NvbXBsZXRlZCcsXG4gICAgJ3RhYi5saWJyYXJ5JzogJ0xpYnJhcnknLFxuICAgICd0YWIuY2FsZW5kYXInOiAnRm9yZWNhc3QnLFxuICAgICd0YWIubmF2QXJpYSc6ICdSZXZpZXcgdmlldyBuYXZpZ2F0aW9uJyxcbiAgICAnYXBwLmxvYWRpbmcnOiAnTG9hZGluZyByZXZpZXcgbGlicmFyeS4uLicsXG5cbiAgICAvLyBJbmdlc3Rpb24gQmFubmVyIChBcHAudHN4KVxuICAgICdiYW5uZXIuZGV0ZWN0ZWQnOiAnRGV0ZWN0ZWQgTGVldENvZGUgdGFiOiAje251bWJlcn0ge3RpdGxlfScsXG4gICAgJ2Jhbm5lci5pbXBvcnQnOiAnT25lLUNsaWNrIEFkZCcsXG4gICAgJ2Jhbm5lci5hbHJlYWR5VHJhY2tlZCc6ICdUaGlzIHByb2JsZW0gaXMgYWxyZWFkeSBpbiB5b3VyIHJldmlldyBzY2hlZHVsZScsXG4gICAgJ2Jhbm5lci50cmFja2VkQmFkZ2UnOiAnVHJhY2tlZCcsXG5cbiAgICAvLyBEdWUgUXVldWVcbiAgICAnZHVlLm92ZXJkdWVBbGVydCc6ICd7Y291bnR9IHByb2JsZW0ocykgb3ZlcmR1ZSEgUmVmcmVzaCB0aGVtIHdoaWxlIG1lbW9yaWVzIGFyZSBmcmVzaC4nLFxuXG4gICAgLy8gWmVybyBJbmJveFxuICAgICd6ZXJvLnRpdGxlJzogJ0FsbCBSZXZpZXdzIENvbXBsZXRlZCBmb3IgVG9kYXkhJyxcbiAgICAnemVyby5kZXNjcmlwdGlvbic6ICdZb3VyIG1lbW9yeSByZXRlbnRpb24gaXMgb3B0aW1hbC4gS2VlcCB1cCB0aGUgZGFpbHkgc3RyZWFrIHRvIGJ1aWxkIGxhc3RpbmcgYWxnb3JpdGhtaWMgaW50dWl0aW9uLicsXG4gICAgJ3plcm8uc29sdmVOZXcnOiAnU29sdmUgYSBOZXcgUHJvYmxlbSBvbiBMZWV0Q29kZScsXG4gICAgJ3plcm8uYnJvd3NlTGlicmFyeSc6ICdCcm93c2UgUHJvYmxlbSBMaWJyYXJ5JyxcblxuICAgIC8vIFByb2JsZW0gQ2FyZFxuICAgICdjYXJkLm9wZW5MZWV0Q29kZSc6ICdPcGVuIGluIExlZXRDb2RlJyxcbiAgICAnY2FyZC5vcGVuTGVldENvZGVBcmlhJzogJ09wZW4gcHJvYmxlbSAje251bWJlcn0ge3RpdGxlfSBpbiBMZWV0Q29kZScsXG4gICAgJ2NhcmQub3ZlcmR1ZSc6ICd7ZGF5c31kIG92ZXJkdWUnLFxuICAgICdjYXJkLmR1ZVRvZGF5JzogJ0R1ZSB0b2RheScsXG4gICAgJ2NhcmQuc2FtcGxlQmFkZ2UnOiAnRGVtbycsXG4gICAgJ2NhcmQuc3RhZ2UnOiAnU3RhZ2Uge3N0YWdlfScsXG4gICAgJ2NhcmQuaW50ZXJ2YWwnOiAnSW50ZXJ2YWwge2ludGVydmFsfWQnLFxuICAgICdjYXJkLnJldGVudGlvbic6ICdSZXRlbnRpb24ge3JhdGV9JScsXG4gICAgJ2NhcmQucmV0ZW50aW9uVG9vbHRpcCc6ICdFc3RpbWF0ZWQgcmV0ZW50aW9uIHJhdGUnLFxuICAgICdjYXJkLm5vdGVzVGl0bGUnOiAnU29sdXRpb24gTm90ZXMgQ2FyZCcsXG4gICAgJ2NhcmQubm90ZXNBcmlhRXhwYW5kJzogJ1ZpZXcgc29sdXRpb24gbm90ZXMnLFxuICAgICdjYXJkLm5vdGVzQXJpYUNvbGxhcHNlJzogJ0hpZGUgc29sdXRpb24gbm90ZXMnLFxuICAgICdjYXJkLmRlbGV0ZUNvbmZpcm0nOiAnUmVtb3ZlIHByb2JsZW0gI3tudW1iZXJ9IHt0aXRsZX0gZnJvbSB5b3VyIHJldmlldyBsaXN0PycsXG4gICAgJ2NhcmQuZGVsZXRlVG9vbHRpcCc6ICdEZWxldGUgcHJvYmxlbScsXG4gICAgJ2NhcmQuZGVsZXRlQXJpYSc6ICdSZW1vdmUgcHJvYmxlbSAje251bWJlcn0ge3RpdGxlfSBmcm9tIHJldmlldyBsaXN0JyxcbiAgICAnY2FyZC5mZWVkYmFja0xhYmVsJzogJ1JlY2FsbCBGZWVkYmFjazonLFxuICAgICdjYXJkLmdyYWRlQXJpYSc6ICdSYXRlIGFzIHtuYW1lfSAoe3N1Yn0pLCBuZXh0IHJldmlldyBpbiB7ZGF5c30nLFxuXG4gICAgLy8gR3JhZGVzXG4gICAgJ2dyYWRlLmFnYWluLm5hbWUnOiAnQWdhaW4nLFxuICAgICdncmFkZS5hZ2Fpbi5zdWInOiAnQmxhY2tvdXQnLFxuICAgICdncmFkZS5oYXJkLm5hbWUnOiAnSGFyZCcsXG4gICAgJ2dyYWRlLmhhcmQuc3ViJzogJ1N0cnVnZ2xlZCcsXG4gICAgJ2dyYWRlLmdvb2QubmFtZSc6ICdHb29kJyxcbiAgICAnZ3JhZGUuZ29vZC5zdWInOiAnU29sdmVkIEFDJyxcbiAgICAnZ3JhZGUuZWFzeS5uYW1lJzogJ0Vhc3knLFxuICAgICdncmFkZS5lYXN5LnN1Yic6ICdTcGVlZHJ1bicsXG4gICAgJ2dyYWRlLmRheXNTdWZmaXgnOiAnaW4ge259ZCcsXG5cbiAgICAvLyBDb21wbGV0ZWQgTGlzdFxuICAgICdjb21wbGV0ZWQuZW1wdHlUaXRsZSc6ICdObyByZXZpZXdzIGNvbXBsZXRlZCB0b2RheSB5ZXQnLFxuICAgICdjb21wbGV0ZWQuZW1wdHlEZXNjJzogJ0ZpbmlzaCBkdWUgcHJvYmxlbXMgaW4gXCJEdWUgVG9kYXlcIiBhbmQgcmF0ZSB5b3VyIHJlY2FsbCBwcm9maWNpZW5jeSB0byBsb2cgdGhlbS4nLFxuICAgICdjb21wbGV0ZWQuY291bnRUb2RheSc6ICd7Y291bnR9IHByb2JsZW0ocykgcmV2aWV3ZWQgdG9kYXknLFxuICAgICdjb21wbGV0ZWQubmV4dFN0YWdlJzogJ01vdmVkIHRvIG5leHQgc3RhZ2UnLFxuICAgICdjb21wbGV0ZWQubmV4dFJldmlldyc6ICdOZXh0IHJldmlldzoge2RhdGV9JyxcblxuICAgIC8vIFByb2JsZW0gTGlicmFyeVxuICAgICdsaWJyYXJ5LnNlYXJjaFBsYWNlaG9sZGVyJzogJ1NlYXJjaCBieSAjLCB0aXRsZSwgdGFnLCBub3Rlcy4uLicsXG4gICAgJ2xpYnJhcnkuc2VhcmNoQXJpYSc6ICdTZWFyY2ggcHJvYmxlbXMgYnkgbnVtYmVyLCB0aXRsZSwgb3IgdGFnJyxcbiAgICAnbGlicmFyeS5maWx0ZXJEaWZmQXJpYSc6ICdGaWx0ZXIgYnkgZGlmZmljdWx0eScsXG4gICAgJ2xpYnJhcnkuZmlsdGVyQWxsJzogJ0FsbCcsXG4gICAgJ2xpYnJhcnkuc29ydEFyaWEnOiAnUHJvYmxlbSBzb3J0aW5nIG9yZGVyJyxcbiAgICAnbGlicmFyeS5zb3J0TmV4dERhdGUnOiAnTmV4dCBSZXZpZXcnLFxuICAgICdsaWJyYXJ5LnNvcnROdW1iZXInOiAnUHJvYmxlbSAjJyxcbiAgICAnbGlicmFyeS5zb3J0UmVwZXRpdGlvbic6ICdTdGFnZSBMYWRkZXInLFxuICAgICdsaWJyYXJ5Lm1hdGNoQ291bnQnOiAne2NvdW50fSBwcm9ibGVtKHMpIGZvdW5kJyxcbiAgICAnbGlicmFyeS5lbXB0eUxpYnJhcnlUaXRsZSc6ICdMaWJyYXJ5IGlzIGN1cnJlbnRseSBlbXB0eSAoMCBwcm9ibGVtcyknLFxuICAgICdsaWJyYXJ5LmVtcHR5TGlicmFyeURlc2MnOiAnQWxsIHByb2JsZW1zIGhhdmUgYmVlbiBjbGVhcmVkLiBZb3UgY2FuIHRyYWNrIHByb2JsZW1zIHZpYSB0aGUgZmxvYXRpbmcgY2Fwc3VsZSBvbiBMZWV0Q29kZSBvciBieSBjbGlja2luZyB0aGUgXCIrXCIgYnV0dG9uIGFib3ZlIScsXG4gICAgJ2xpYnJhcnkubm9NYXRjaCc6ICdObyBtYXRjaGluZyBwcm9ibGVtcyBmb3VuZCcsXG4gICAgJ2xpYnJhcnkubmV4dExhYmVsJzogJ05leHQ6IHtkYXRlfScsXG4gICAgJ2xpYnJhcnkuZGVsZXRlQnRuJzogJ0RlbGV0ZScsXG4gICAgJ2xpYnJhcnkuZGVsZXRlQ29uZmlybSc6ICdSZW1vdmUgcHJvYmxlbSAje251bWJlcn0ge3RpdGxlfSBmcm9tIGxpYnJhcnk/JyxcblxuICAgIC8vIENhbGVuZGFyIEZvcmVjYXN0XG4gICAgJ2NhbGVuZGFyLmxvYWRUaXRsZSc6ICdOZXh0IDctRGF5IFJldmlldyBMb2FkIERpc3RyaWJ1dGlvbicsXG4gICAgJ2NhbGVuZGFyLnRvdGFsRHVlJzogJ3tjb3VudH0gcHJvYmxlbShzKSBzY2hlZHVsZWQnLFxuICAgICdjYWxlbmRhci50b2RheSc6ICdUb2RheScsXG4gICAgJ2NhbGVuZGFyLnRvbW9ycm93JzogJ1RtcncnLFxuICAgICdjYWxlbmRhci53ZWVrZGF5cyc6ICdTdW4sTW9uLFR1ZSxXZWQsVGh1LEZyaSxTYXQnLFxuICAgICdjYWxlbmRhci5oZWFsdGhUaXRsZSc6ICdNZW1vcnkgUmV0ZW50aW9uIEhlYWx0aCcsXG4gICAgJ2NhbGVuZGFyLnRvdGFsVHJhY2tlZCc6ICd7Y291bnR9IHRvdGFsIHByb2JsZW0ocyknLFxuICAgICdjYWxlbmRhci5zdHJvbmcnOiAnU3Ryb25nICg+ODAlKScsXG4gICAgJ2NhbGVuZGFyLm1vZGVyYXRlJzogJ01vZGVyYXRlICg1MC04MCUpJyxcbiAgICAnY2FsZW5kYXIuY3JpdGljYWwnOiAnQ3JpdGljYWwgKDw1MCUpJyxcbiAgICAnY2FsZW5kYXIuc3Ryb25nVG9vbHRpcCc6ICdTdHJvbmc6IHtjb3VudH0gcHJvYmxlbShzKScsXG4gICAgJ2NhbGVuZGFyLm1vZGVyYXRlVG9vbHRpcCc6ICdNb2RlcmF0ZToge2NvdW50fSBwcm9ibGVtKHMpJyxcbiAgICAnY2FsZW5kYXIuY3JpdGljYWxUb29sdGlwJzogJ0NyaXRpY2FsOiB7Y291bnR9IHByb2JsZW0ocyknLFxuXG4gICAgLy8gQWRkIFByb2JsZW0gTW9kYWxcbiAgICAnYWRkLm1vZGFsVGl0bGUnOiAnQXV0by1JbXBvcnQgTGVldENvZGUgUHJvYmxlbScsXG4gICAgJ2FkZC5jbG9zZUFyaWEnOiAnQ2xvc2UgaW1wb3J0IGRpYWxvZycsXG4gICAgJ2FkZC5pbnB1dExhYmVsJzogJ0VudGVyIHByb2JsZW0gIywgdGl0bGUsIG9yIHBhc3RlIExlZXRDb2RlIFVSTDonLFxuICAgICdhZGQuaW5wdXRQbGFjZWhvbGRlcic6ICdlLmcuIDIwNiAvIHR3by1zdW0gLyBwYXN0ZSBVUkwnLFxuICAgICdhZGQuZmV0Y2hCdG4nOiAnRmV0Y2ggTWV0YScsXG4gICAgJ2FkZC5ub3RGb3VuZCc6ICdObyBtYXRjaGluZyBMZWV0Q29kZSBwcm9ibGVtIGZvdW5kLiBQbGVhc2UgY2hlY2sgdGhlIHByb2JsZW0gbnVtYmVyIChlLmcuIDIwNikgb3IgVVJMLicsXG4gICAgJ2FkZC5uZXR3b3JrRXJyb3InOiAnTmV0d29yayByZXF1ZXN0IGZhaWxlZC4gUGxlYXNlIGNoZWNrIHlvdXIgY29ubmVjdGlvbiBvciB1c2UgbWFudWFsIGVudHJ5LicsXG4gICAgJ2FkZC5tZXRhU3VjY2Vzcyc6ICdMZWV0Q29kZSBtZXRhZGF0YSBzdWNjZXNzZnVsbHkgZGV0ZWN0ZWQnLFxuICAgICdhZGQubm90ZXNMYWJlbCc6ICdTb2x1dGlvbiBOb3RlcyAvIENvcmUgVGFrZWF3YXlzIChPcHRpb25hbCknLFxuICAgICdhZGQubm90ZXNQbGFjZWhvbGRlcic6ICdLZXkgYWxnb3JpdGhtIHBhdHRlcm5zLCBwaXRmYWxscywgb3IgaW5zaWdodHMuLi4nLFxuICAgICdhZGQuc3VibWl0QnRuJzogJ0FkZCB0byBTcGFjZWQgUmVwZXRpdGlvbiBQbGFuJyxcbiAgICAnYWRkLm1hbnVhbFRvZ2dsZSc6ICdOb24tTGVldENvZGUgcHJvYmxlbT8gU3dpdGNoIHRvIG1hbnVhbCBtb2RlJyxcbiAgICAnYWRkLm1hbnVhbE51bWJlckxhYmVsJzogJ051bWJlcicsXG4gICAgJ2FkZC5tYW51YWxOdW1iZXJQbGFjZWhvbGRlcic6ICdQcm9iICMnLFxuICAgICdhZGQubWFudWFsVGl0bGVMYWJlbCc6ICdQcm9ibGVtIFRpdGxlIConLFxuICAgICdhZGQubWFudWFsVGl0bGVQbGFjZWhvbGRlcic6ICdQcm9ibGVtIFRpdGxlJyxcbiAgICAnYWRkLm1hbnVhbFRhZ3NQbGFjZWhvbGRlcic6ICdUYWdzIChlLmcuIER5bmFtaWMgUHJvZ3JhbW1pbmcsIERGUyknLFxuICAgICdhZGQubWFudWFsU3VibWl0JzogJ0FkZCBDdXN0b20gUHJvYmxlbScsXG5cbiAgICAvLyBTZXR0aW5ncyBNb2RhbFxuICAgICdzZXR0aW5ncy50aXRsZSc6ICdTZXR0aW5ncyAmIERhdGEgTWFuYWdlbWVudCcsXG4gICAgJ3NldHRpbmdzLmNsb3NlQXJpYSc6ICdDbG9zZSBzZXR0aW5ncycsXG4gICAgJ3NldHRpbmdzLmxhbmd1YWdlU2VjdGlvbic6ICdMYW5ndWFnZSAvIOeVjOmdouivreiogCcsXG4gICAgJ3NldHRpbmdzLmxhbmdTeXN0ZW0nOiAnU3lzdGVtIERlZmF1bHQnLFxuICAgICdzZXR0aW5ncy5sYW5nWmgnOiAn8J+HqPCfh7Mg566A5L2T5Lit5paHJyxcbiAgICAnc2V0dGluZ3MubGFuZ0VuJzogJ/Cfh7rwn4e4IEVuZ2xpc2gnLFxuICAgICdzZXR0aW5ncy5sYWRkZXJUaXRsZSc6ICdFYmJpbmdoYXVzIFJldmlldyBMYWRkZXIgKERheSBJbnRlcnZhbHMpJyxcbiAgICAnc2V0dGluZ3MubGFkZGVyUmVzZXQnOiAnUmVzZXQgRGVmYXVsdCcsXG4gICAgJ3NldHRpbmdzLmxhZGRlckRlc2MnOiAnR29vZCBhZHZhbmNlcyArMSBzdGFnZSwgRWFzeSBqdW1wcyArMiBzdGFnZXMsIEFnYWluIHJlc2V0cyB0byBzdGFnZSAxLicsXG4gICAgJ3NldHRpbmdzLmxhZGRlclBsYWNlaG9sZGVyJzogJ2UuZy4gMSwgMiwgNCwgNywgMTUsIDMwLCA2MCwgMTIwJyxcbiAgICAnc2V0dGluZ3MubGFkZGVyU2F2ZSc6ICdTYXZlJyxcbiAgICAnc2V0dGluZ3MubGFkZGVyRXJyb3InOiAnTGFkZGVyIG11c3QgY29udGFpbiBhdCBsZWFzdCAyIGluY3JlYXNpbmcgcG9zaXRpdmUgbnVtYmVycyEnLFxuICAgICdzZXR0aW5ncy5sYWRkZXJTYXZlZCc6ICdVcGRhdGVkIGludGVydmFsIGxhZGRlcjogW3tsYWRkZXJ9XSBkYXlzJyxcbiAgICAnc2V0dGluZ3MubGFkZGVyUmVzdG9yZWQnOiAnUmVzZXQgdG8gZGVmYXVsdCBzdGFuZGFyZCBsYWRkZXI6IFsxLCAyLCA0LCA3LCAxNSwgMzAsIDYwLCAxMjBdIGRheXMnLFxuICAgICdzZXR0aW5ncy5iYWNrdXBUaXRsZSc6ICdEYXRhIEJhY2t1cCAmIE1pZ3JhdGlvbicsXG4gICAgJ3NldHRpbmdzLmV4cG9ydEJ0bic6ICdFeHBvcnQgQmFja3VwIChKU09OKScsXG4gICAgJ3NldHRpbmdzLmV4cG9ydFN1Y2Nlc3MnOiAnRGF0YSBzdWNjZXNzZnVsbHkgZXhwb3J0ZWQgYXMgSlNPTiBmaWxlIScsXG4gICAgJ3NldHRpbmdzLmltcG9ydEJ0bic6ICdJbXBvcnQgQmFja3VwIChKU09OKScsXG4gICAgJ3NldHRpbmdzLmltcG9ydFN1Y2Nlc3MnOiAnUHJvYmxlbSBsaWJyYXJ5IGJhY2t1cCBpbXBvcnRlZCBzdWNjZXNzZnVsbHkhJyxcbiAgICAnc2V0dGluZ3MuaW1wb3J0RmFpbGVkJzogJ0ltcG9ydCBmYWlsZWQ6IEludmFsaWQgSlNPTiBmb3JtYXQnLFxuICAgICdzZXR0aW5ncy5tYW5hZ2VUaXRsZSc6ICdMaWJyYXJ5IE1hbmFnZW1lbnQgJiBSZXNldCcsXG4gICAgJ3NldHRpbmdzLmNsZWFyU2FtcGxlQnRuJzogJ1JlbW92ZSBEZW1vIFByb2JsZW1zIChLZWVwIEN1c3RvbSknLFxuICAgICdzZXR0aW5ncy5jbGVhclNhbXBsZUNvbmZpcm0nOiAnUmVtb3ZlIHByZXNldCBkZW1vIHByb2JsZW1zPyAoWW91ciBjdXN0b20gcHJvYmxlbXMgd2lsbCBiZSBrZXB0KScsXG4gICAgJ3NldHRpbmdzLmNsZWFyU2FtcGxlU3VjY2Vzcyc6ICdTdWNjZXNzZnVsbHkgcmVtb3ZlZCB7Y291bnR9IGRlbW8gcHJvYmxlbShzKSEnLFxuICAgICdzZXR0aW5ncy5jbGVhclNhbXBsZU5vbmUnOiAnTm8gZGVtbyBwcm9ibGVtcyBkZXRlY3RlZCBpbiBsaWJyYXJ5LicsXG4gICAgJ3NldHRpbmdzLnJlbG9hZFNhbXBsZUJ0bic6ICdSZWxvYWQgRGVmYXVsdCBEZW1vIFByb2JsZW1zJyxcbiAgICAnc2V0dGluZ3MucmVsb2FkU2FtcGxlQ29uZmlybSc6ICdSZWxvYWQgZGVmYXVsdCBkZW1vIHByb2JsZW1zIGludG8gbGlicmFyeT8nLFxuICAgICdzZXR0aW5ncy5yZWxvYWRTYW1wbGVTdWNjZXNzJzogJ0RlbW8gcHJvYmxlbXMgcmVsb2FkZWQhJyxcbiAgICAnc2V0dGluZ3MuY2xlYXJBbGxCdG4nOiAnQ2xlYXIgQWxsIFByb2JsZW1zJyxcbiAgICAnc2V0dGluZ3MuY2xlYXJBbGxDb25maXJtJzogJ+KaoO+4jyBXYXJuaW5nOiBDbGVhciBhbGwgcHJvYmxlbXM/IFRoaXMgY2Fubm90IGJlIHVuZG9uZSEgUGxlYXNlIGV4cG9ydCBhIGJhY2t1cCBmaXJzdC4nLFxuICAgICdzZXR0aW5ncy5jbGVhckFsbFN1Y2Nlc3MnOiAnQWxsIHByb2JsZW0gZGF0YSBjbGVhcmVkIScsXG5cbiAgICAvLyBDb250ZW50IFNjcmlwdCBGbG9hdGluZyBDYXBzdWxlXG4gICAgJ2NhcHN1bGUucGlsbFRyYWNrZWQnOiAn8J+noCBFYmJpbmdoYXVzOiBTdGFnZSB7c3RhZ2V9ICh7aW50ZXJ2YWx9ZCknLFxuICAgICdjYXBzdWxlLnBpbGxVbnRyYWNrZWQnOiAn8J+noCBFYmJpbmdoYXVzOiBUcmFjayBQcm9ibGVtJyxcbiAgICAnY2Fwc3VsZS5wYW5lbFRpdGxlVHJhY2tlZCc6ICfwn6egIFNwYWNlZCBSZXZpZXcnLFxuICAgICdjYXBzdWxlLnBhbmVsVGl0bGVVbnRyYWNrZWQnOiAn8J+noCBTcGFjZWQgUmVwZXRpdGlvbicsXG4gICAgJ2NhcHN1bGUuYXV0b0FjQmFubmVyJzogJ/CfjokgU3VibWlzc2lvbiBBY2NlcHRlZCEgQXV0b21hdGljYWxseSB0cmFja2VkLicsXG4gICAgJ2NhcHN1bGUuY3VycmVudFN0YWdlJzogJ0N1cnJlbnQgU3RhZ2U6IFN0YWdlIHtzdGFnZX0gKHtpbnRlcnZhbH1kIGludGVydmFsKScsXG4gICAgJ2NhcHN1bGUubmV4dFJldmlldyc6ICdOZXh0IFJldmlldzoge2RhdGV9JyxcbiAgICAnY2Fwc3VsZS5yZXZpZXdlZFRvZGF5JzogJ+KchSBSZXZpZXdlZCB0b2RheSEnLFxuICAgICdjYXBzdWxlLmR1ZVRvZGF5JzogJ+KPse+4jyBEdWUgdG9kYXkgLSByZXZpZXcgJiByYXRlJyxcbiAgICAnY2Fwc3VsZS5kb25lQmFubmVyJzogJ/CfjokgTWVtb3J5IHNjaGVkdWxlIGFkdmFuY2VkIHRvIG5leHQgY3ljbGUhJyxcbiAgICAnY2Fwc3VsZS5yYXRlUHJvbXB0JzogJ1JhdGUgcmVjYWxsIHByb2ZpY2llbmN5IGFmdGVyIHNvbHZpbmc6JyxcbiAgICAnY2Fwc3VsZS50cmFja2luZ0Zvb3Rlcic6ICdUcmFja2luZyBpbiBFYmJpbmdoYXVzJyxcbiAgICAnY2Fwc3VsZS5yZW1vdmVCdG4nOiAnUmVtb3ZlIGZyb20gcmV2aWV3IGxpc3QnLFxuICAgICdjYXBzdWxlLnJlbW92ZUNvbmZpcm0nOiAnUmVtb3ZlICN7bnVtYmVyfSB7dGl0bGV9IGZyb20geW91ciByZXZpZXcgbGlzdD8nLFxuICAgICdjYXBzdWxlLnVudHJhY2tlZERlc2MnOiAnUHJvYmxlbSBkZXRhaWxzIGRldGVjdGVkLiBDbGljayBiZWxvdyB0byBhZGQgdG8geW91ciBzcGFjZWQgcmVwZXRpdGlvbiBzY2hlZHVsZSBzdGFydGluZyB0b21vcnJvdyEnLFxuICAgICdjYXBzdWxlLm5vdGVzUGxhY2Vob2xkZXInOiAnS2V5IGFsZ29yaXRobSBub3RlcywgcGl0ZmFsbHMsIG9yIGluc2lnaHRzIChvcHRpb25hbCkuLi4nLFxuICAgICdjYXBzdWxlLnN1Ym1pdEFkZCc6ICfwn5qAIFRyYWNrIGluIFNwYWNlZCBSZXBldGl0aW9uJyxcbiAgICAnY2Fwc3VsZS5hdXRvQWNOb3Rlcyc6ICdBY2NlcHRlZCBvbiBzdWJtaXNzaW9uLCBhdXRvLXRyYWNrZWQnLFxuICB9LFxufTtcblxuZXhwb3J0IHR5cGUgVHJhbnNsYXRpb25LZXkgPSBrZXlvZiB0eXBlb2YgdHJhbnNsYXRpb25zLnpoO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUxhbmd1YWdlKGxhbmc6IExhbmd1YWdlID0gJ3N5c3RlbScsIGhvc3RuYW1lPzogc3RyaW5nKTogUmVzb2x2ZWRMYW5ndWFnZSB7XG4gIGlmIChsYW5nID09PSAnemgnIHx8IGxhbmcgPT09ICdlbicpIHJldHVybiBsYW5nO1xuICBpZiAoaG9zdG5hbWUpIHtcbiAgICBpZiAoaG9zdG5hbWUuaW5jbHVkZXMoJ2xlZXRjb2RlLmNvbScpKSByZXR1cm4gJ2VuJztcbiAgICBpZiAoaG9zdG5hbWUuaW5jbHVkZXMoJ2xlZXRjb2RlLmNuJykpIHJldHVybiAnemgnO1xuICB9XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IubGFuZ3VhZ2UpIHtcbiAgICByZXR1cm4gbmF2aWdhdG9yLmxhbmd1YWdlLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgnemgnKSA/ICd6aCcgOiAnZW4nO1xuICB9XG4gIHJldHVybiAnemgnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKFxuICBsYW5nOiBSZXNvbHZlZExhbmd1YWdlLFxuICBrZXk6IFRyYW5zbGF0aW9uS2V5LFxuICBwYXJhbXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBudW1iZXI+XG4pOiBzdHJpbmcge1xuICBjb25zdCBkaWN0ID0gdHJhbnNsYXRpb25zW2xhbmddIHx8IHRyYW5zbGF0aW9ucy56aDtcbiAgbGV0IHRleHQgPSBkaWN0W2tleV0gfHwgdHJhbnNsYXRpb25zLnpoW2tleV0gfHwga2V5O1xuICBpZiAocGFyYW1zKSB7XG4gICAgZm9yIChjb25zdCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXMocGFyYW1zKSkge1xuICAgICAgdGV4dCA9IHRleHQuc3BsaXQoYHske2t9fWApLmpvaW4oU3RyaW5nKHYpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRleHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJMThuKHJlc29sdmVkTGFuZzogUmVzb2x2ZWRMYW5ndWFnZSkge1xuICByZXR1cm4ge1xuICAgIGxhbmc6IHJlc29sdmVkTGFuZyxcbiAgICB0OiAoa2V5OiBUcmFuc2xhdGlvbktleSwgcGFyYW1zPzogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyPikgPT5cbiAgICAgIHRyYW5zbGF0ZShyZXNvbHZlZExhbmcsIGtleSwgcGFyYW1zKSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdE5leHREYXlzKGRheXM6IG51bWJlciwgbGFuZzogUmVzb2x2ZWRMYW5ndWFnZSk6IHN0cmluZyB7XG4gIHJldHVybiB0cmFuc2xhdGUobGFuZywgJ2dyYWRlLmRheXNTdWZmaXgnLCB7IG46IGRheXMgfSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9jYWxpemVkR3JhZGVNZXRhIHtcbiAgZ3JhZGU6IFJldmlld0dyYWRlO1xuICBuYW1lOiBzdHJpbmc7XG4gIHN1Yjogc3RyaW5nO1xuICBuZXh0RGF5czogc3RyaW5nO1xuICBuZXh0RGF5c051bWJlcjogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TG9jYWxpemVkR3JhZGVNZXRhKFxuICBncmFkZTogUmV2aWV3R3JhZGUsXG4gIHJlcDogbnVtYmVyLFxuICBpbnRlcnZhbDogbnVtYmVyLFxuICBsYWRkZXI6IG51bWJlcltdID0gREVGQVVMVF9FQkJJTkdIQVVTX0xBRERFUixcbiAgbGFuZzogUmVzb2x2ZWRMYW5ndWFnZSA9ICd6aCdcbik6IExvY2FsaXplZEdyYWRlTWV0YSB7XG4gIGxldCBuZXh0RGF5c051bWJlcjogbnVtYmVyO1xuICBzd2l0Y2ggKGdyYWRlKSB7XG4gICAgY2FzZSAxOlxuICAgICAgbmV4dERheXNOdW1iZXIgPSBsYWRkZXJbMF0gfHwgMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMjpcbiAgICAgIG5leHREYXlzTnVtYmVyID0gbGFkZGVyW01hdGgubWluKHJlcCwgbGFkZGVyLmxlbmd0aCAtIDEpXSB8fCAxO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzOlxuICAgICAgY29uc3QgbmV4dElkeDMgPSByZXAgKyAxO1xuICAgICAgbmV4dERheXNOdW1iZXIgPSBuZXh0SWR4MyA8IGxhZGRlci5sZW5ndGggPyBsYWRkZXJbbmV4dElkeDNdIDogTWF0aC5yb3VuZChpbnRlcnZhbCAqIDIuNSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQ6XG4gICAgICBjb25zdCBuZXh0SWR4NCA9IHJlcCArIDI7XG4gICAgICBuZXh0RGF5c051bWJlciA9IG5leHRJZHg0IDwgbGFkZGVyLmxlbmd0aCA/IGxhZGRlcltuZXh0SWR4NF0gOiBNYXRoLnJvdW5kKGludGVydmFsICogMy4yKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgY29uc3QgZ3JhZGVLZXkgPSAoeyAxOiAnYWdhaW4nLCAyOiAnaGFyZCcsIDM6ICdnb29kJywgNDogJ2Vhc3knIH0gYXMgY29uc3QpW2dyYWRlXTtcbiAgcmV0dXJuIHtcbiAgICBncmFkZSxcbiAgICBuYW1lOiB0cmFuc2xhdGUobGFuZywgYGdyYWRlLiR7Z3JhZGVLZXl9Lm5hbWVgIGFzIFRyYW5zbGF0aW9uS2V5KSxcbiAgICBzdWI6IHRyYW5zbGF0ZShsYW5nLCBgZ3JhZGUuJHtncmFkZUtleX0uc3ViYCBhcyBUcmFuc2xhdGlvbktleSksXG4gICAgbmV4dERheXM6IGZvcm1hdE5leHREYXlzKG5leHREYXlzTnVtYmVyLCBsYW5nKSxcbiAgICBuZXh0RGF5c051bWJlcixcbiAgfTtcbn1cblxuLy8gUmVhY3QgQ29udGV4dCBmb3IgU2VhbWxlc3MgVUkgQ29uc3VtcHRpb25cbmludGVyZmFjZSBJMThuQ29udGV4dFZhbHVlIHtcbiAgbGFuZzogUmVzb2x2ZWRMYW5ndWFnZTtcbiAgdDogKGtleTogVHJhbnNsYXRpb25LZXksIHBhcmFtcz86IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IG51bWJlcj4pID0+IHN0cmluZztcbn1cblxuY29uc3QgSTE4bkNvbnRleHQgPSBjcmVhdGVDb250ZXh0PEkxOG5Db250ZXh0VmFsdWU+KHtcbiAgbGFuZzogJ3poJyxcbiAgdDogKGtleSwgcGFyYW1zKSA9PiB0cmFuc2xhdGUoJ3poJywga2V5LCBwYXJhbXMpLFxufSk7XG5cbmV4cG9ydCBjb25zdCBJMThuUHJvdmlkZXI6IFJlYWN0LkZDPHtcbiAgbGFuZ3VhZ2U6IExhbmd1YWdlO1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xufT4gPSAoeyBsYW5ndWFnZSwgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCByZXNvbHZlZExhbmcgPSB1c2VNZW1vKCgpID0+IHJlc29sdmVMYW5ndWFnZShsYW5ndWFnZSksIFtsYW5ndWFnZV0pO1xuXG4gIGNvbnN0IHZhbHVlID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgbGFuZzogcmVzb2x2ZWRMYW5nLFxuICAgICAgdDogKGtleTogVHJhbnNsYXRpb25LZXksIHBhcmFtcz86IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IG51bWJlcj4pID0+XG4gICAgICAgIHRyYW5zbGF0ZShyZXNvbHZlZExhbmcsIGtleSwgcGFyYW1zKSxcbiAgICB9KSxcbiAgICBbcmVzb2x2ZWRMYW5nXVxuICApO1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KEkxOG5Db250ZXh0LlByb3ZpZGVyLCB7IHZhbHVlIH0sIGNoaWxkcmVuKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VJMThuKCk6IEkxOG5Db250ZXh0VmFsdWUge1xuICByZXR1cm4gdXNlQ29udGV4dChJMThuQ29udGV4dCk7XG59XG4iLCIvLyBDb250ZW50IFNjcmlwdCBmb3IgTGVldENvZGUgKGxlZXRjb2RlLmNuIC8gbGVldGNvZGUuY29tKVxuLy8gQnVpbHQgd2l0aCBTaGFkb3cgRE9NIGZvciBjb21wbGV0ZSBDU1MgaXNvbGF0aW9uIGFuZCByb2J1c3QgTGVldENvZGUgRE9NIHBhcnNpbmcuXG5cbmltcG9ydCB7IFByb2JsZW0sIFJldmlld0dyYWRlLCBEaWZmaWN1bHR5LCBVc2VyU2V0dGluZ3MgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjYWxjdWxhdGVTTTIsIGdldFRvZGF5U3RyaW5nLCBERUZBVUxUX0VCQklOR0hBVVNfTEFEREVSIH0gZnJvbSAnLi4vdXRpbHMvZWJiaW5naGF1cyc7XG5pbXBvcnQgeyBERUZBVUxUX1NFVFRJTkdTIH0gZnJvbSAnLi4vdXRpbHMvc3RvcmFnZSc7XG5pbXBvcnQgeyBjcmVhdGVJMThuLCByZXNvbHZlTGFuZ3VhZ2UsIGdldExvY2FsaXplZEdyYWRlTWV0YSB9IGZyb20gJy4uL3V0aWxzL2kxOG4nO1xuXG5jb25zdCBTVE9SQUdFX0tFWV9QUk9CTEVNUyA9ICdsY19lYmJpbmdoYXVzX3Byb2JsZW1zJztcbmNvbnN0IFNUT1JBR0VfS0VZX1NFVFRJTkdTID0gJ2xjX2ViYmluZ2hhdXNfc2V0dGluZ3MnO1xuXG5pbnRlcmZhY2UgUGFnZU1ldGEge1xuICBzbHVnOiBzdHJpbmc7XG4gIG51bWJlcjogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBkaWZmaWN1bHR5OiBEaWZmaWN1bHR5O1xuICB0YWdzOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RQcm9ibGVtRnJvbVBhZ2UoKTogUGFnZU1ldGEge1xuICBjb25zdCBwYXRobmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgY29uc3QgbWF0Y2ggPSBwYXRobmFtZS5tYXRjaCgvXFwvcHJvYmxlbXNcXC8oW14vXSspLyk7XG4gIGNvbnN0IHNsdWcgPSBtYXRjaCA/IG1hdGNoWzFdIDogJyc7XG5cbiAgbGV0IG51bWJlciA9ICcnO1xuICBsZXQgdGl0bGUgPSAnJztcbiAgbGV0IGRpZmZpY3VsdHk6IERpZmZpY3VsdHkgPSAnTWVkaXVtJztcbiAgY29uc3QgdGFnczogc3RyaW5nW10gPSBbJ+WKm+aJoyddO1xuXG4gIC8vIDEuIFRyeSBleHRyYWN0aW5nIGZyb20gZG9jdW1lbnQudGl0bGU6IFwiMS4g5Lik5pWw5LmL5ZKMIC0g5Yqb5omj77yITGVldENvZGXvvIlcIiBvciBcIjEuIFR3byBTdW0gLSBMZWV0Q29kZVwiXG4gIGNvbnN0IGRvY1RpdGxlID0gZG9jdW1lbnQudGl0bGUgfHwgJyc7XG4gIGNvbnN0IHRpdGxlUmVnZXggPSAvXihcXGQrKVtcXC5cXHPjgIFdKyhbXi3igJR8XSspLztcbiAgY29uc3QgdGl0bGVNYXRjaCA9IGRvY1RpdGxlLm1hdGNoKHRpdGxlUmVnZXgpO1xuXG4gIGlmICh0aXRsZU1hdGNoKSB7XG4gICAgbnVtYmVyID0gdGl0bGVNYXRjaFsxXS50cmltKCk7XG4gICAgdGl0bGUgPSB0aXRsZU1hdGNoWzJdLnRyaW0oKTtcbiAgfVxuXG4gIC8vIDIuIERPTSBleHRyYWN0aW9uIGhldXJpc3RpY3MgZm9yIG1vZGVybiBMZWV0Q29kZVxuICBjb25zdCB0aXRsZUVsZW0gPVxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpdltkYXRhLWN5cHJlc3M9XCJRdWVzdGlvblRpdGxlXCJdJykgfHxcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC10aXRsZS1sYXJnZScpIHx8XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaDQnKTtcblxuICBpZiAodGl0bGVFbGVtICYmIHRpdGxlRWxlbS50ZXh0Q29udGVudCkge1xuICAgIGNvbnN0IHJhdyA9IHRpdGxlRWxlbS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgY29uc3QgZG9tTWF0Y2ggPSByYXcubWF0Y2goL14oXFxkKylbXFwuXFxz44CBXSsoLispLyk7XG4gICAgaWYgKGRvbU1hdGNoKSB7XG4gICAgICBudW1iZXIgPSBkb21NYXRjaFsxXS50cmltKCk7XG4gICAgICB0aXRsZSA9IGRvbU1hdGNoWzJdLnRyaW0oKTtcbiAgICB9IGVsc2UgaWYgKCF0aXRsZSkge1xuICAgICAgdGl0bGUgPSByYXc7XG4gICAgfVxuICB9XG5cbiAgLy8gRmFsbGJhY2sgdGl0bGUgdG8gc2x1ZyBpZiBzdGlsbCBlbXB0eVxuICBpZiAoIXRpdGxlICYmIHNsdWcpIHtcbiAgICB0aXRsZSA9IHNsdWdcbiAgICAgIC5zcGxpdCgnLScpXG4gICAgICAubWFwKCh3KSA9PiB3LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdy5zbGljZSgxKSlcbiAgICAgIC5qb2luKCcgJyk7XG4gIH1cblxuICAvLyAzLiBEaWZmaWN1bHR5IGV4dHJhY3Rpb25cbiAgY29uc3QgcGFnZVRleHQgPSBkb2N1bWVudC5ib2R5LmlubmVyVGV4dCB8fCAnJztcbiAgY29uc3QgZWFzeUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kaWZmaWN1bHR5LWVhc3ksIFtjbGFzcyo9XCJ0ZXh0LW9saXZlXCJdJyk7XG4gIGNvbnN0IGhhcmRFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRleHQtZGlmZmljdWx0eS1oYXJkLCBbY2xhc3MqPVwidGV4dC1waW5rXCJdJyk7XG4gIGNvbnN0IG1lZGl1bUVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGV4dC1kaWZmaWN1bHR5LW1lZGl1bSwgW2NsYXNzKj1cInRleHQteWVsbG93XCJdJyk7XG5cbiAgaWYgKGVhc3lFbGVtIHx8IHBhZ2VUZXh0LmluY2x1ZGVzKCfnroDljZUnKSB8fCBwYWdlVGV4dC5pbmNsdWRlcygnRWFzeScpKSB7XG4gICAgZGlmZmljdWx0eSA9ICdFYXN5JztcbiAgfSBlbHNlIGlmIChoYXJkRWxlbSB8fCBwYWdlVGV4dC5pbmNsdWRlcygn5Zuw6Zq+JykgfHwgcGFnZVRleHQuaW5jbHVkZXMoJ0hhcmQnKSkge1xuICAgIGRpZmZpY3VsdHkgPSAnSGFyZCc7XG4gIH0gZWxzZSBpZiAobWVkaXVtRWxlbSB8fCBwYWdlVGV4dC5pbmNsdWRlcygn5Lit562JJykgfHwgcGFnZVRleHQuaW5jbHVkZXMoJ01lZGl1bScpKSB7XG4gICAgZGlmZmljdWx0eSA9ICdNZWRpdW0nO1xuICB9XG5cbiAgLy8gNC4gVGFncyBleHRyYWN0aW9uXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FbaHJlZio9XCIvdGFnL1wiXScpLmZvckVhY2goKGVsKSA9PiB7XG4gICAgY29uc3QgdGV4dCA9IGVsLnRleHRDb250ZW50Py50cmltKCk7XG4gICAgaWYgKHRleHQgJiYgIXRhZ3MuaW5jbHVkZXModGV4dCkpIHRhZ3MucHVzaCh0ZXh0KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHsgc2x1ZywgbnVtYmVyOiBudW1iZXIgfHwgJzAnLCB0aXRsZSwgZGlmZmljdWx0eSwgdGFncyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tTdWJtaXNzaW9uQWNjZXB0ZWQoKTogYm9vbGVhbiB7XG4gIGNvbnN0IHJlc3VsdExvY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1lMmUtbG9jYXRvcj1cInN1Ym1pc3Npb24tcmVzdWx0XCJdJyk7XG4gIGlmIChyZXN1bHRMb2NhdG9yKSB7XG4gICAgY29uc3QgdGV4dCA9IChyZXN1bHRMb2NhdG9yLnRleHRDb250ZW50IHx8ICcnKS50cmltKCk7XG4gICAgaWYgKHRleHQgPT09ICfpgJrov4cnIHx8IHRleHQgPT09ICdBY2NlcHRlZCcgfHwgdGV4dC5zdGFydHNXaXRoKCfpgJrov4dcXG4nKSB8fCB0ZXh0LnN0YXJ0c1dpdGgoJ0FjY2VwdGVkXFxuJykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlc3VsdEJhZGdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgJ1tjbGFzcyo9XCJ0ZXh0LWdyZWVuXCJdLCBbY2xhc3MqPVwidGV4dC1vbGl2ZVwiXSwgW2RhdGEtY3lwcmVzcyo9XCJzdWJtaXNzaW9uXCJdLCBbY2xhc3MqPVwic3RhdHVzLXN1Y2Nlc3NcIl0nXG4gICk7XG4gIGZvciAoY29uc3QgZWwgb2YgcmVzdWx0QmFkZ2VzKSB7XG4gICAgY29uc3QgdGV4dCA9IChlbC50ZXh0Q29udGVudCB8fCAnJykudHJpbSgpO1xuICAgIGlmICh0ZXh0ID09PSAn6YCa6L+HJyB8fCB0ZXh0ID09PSAnQWNjZXB0ZWQnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzRXh0ZW5zaW9uVmFsaWQoKTogYm9vbGVhbiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHR5cGVvZiBjaHJvbWUgIT09ICd1bmRlZmluZWQnICYmICEhY2hyb21lLnJ1bnRpbWUgJiYgISFjaHJvbWUucnVudGltZS5pZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNhZmVTZW5kTWVzc2FnZShtZXNzYWdlOiB7IHR5cGU6IHN0cmluZzsgW2tleTogc3RyaW5nXTogYW55IH0pOiB2b2lkIHtcbiAgaWYgKCFpc0V4dGVuc2lvblZhbGlkKCkpIHJldHVybjtcbiAgdHJ5IHtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShtZXNzYWdlLCAoKSA9PiB7XG4gICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XG4gICAgICAgIC8vIENsZWFubHkgc3dhbGxvdyBhbnkgZGlzY29ubmVjdGVkIHBvcnQvd29ya2VyIGVycm9yc1xuICAgICAgfVxuICAgIH0pO1xuICB9IGNhdGNoIHtcbiAgICAvLyBJZ25vcmUgY29udGV4dCBpbnZhbGlkYXRpb25cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRTdG9yZWRQcm9ibGVtcygpOiBQcm9taXNlPFByb2JsZW1bXT4ge1xuICBpZiAoIWlzRXh0ZW5zaW9uVmFsaWQoKSkgcmV0dXJuIFtdO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICB0cnkge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFtTVE9SQUdFX0tFWV9QUk9CTEVNU10sIChyZXMpID0+IHtcbiAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIHJlc29sdmUoW10pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc1tTVE9SQUdFX0tFWV9QUk9CTEVNU10gfHwgW10pO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXNvbHZlKFtdKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFN0b3JlZFNldHRpbmdzKCk6IFByb21pc2U8VXNlclNldHRpbmdzPiB7XG4gIGlmICghaXNFeHRlbnNpb25WYWxpZCgpKSByZXR1cm4gREVGQVVMVF9TRVRUSU5HUztcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChbU1RPUkFHRV9LRVlfU0VUVElOR1NdLCAocmVzKSA9PiB7XG4gICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcbiAgICAgICAgICByZXNvbHZlKERFRkFVTFRfU0VUVElOR1MpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKHJlc1tTVE9SQUdFX0tFWV9TRVRUSU5HU10gfHwgREVGQVVMVF9TRVRUSU5HUyk7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJlc29sdmUoREVGQVVMVF9TRVRUSU5HUyk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5hc3luYyBmdW5jdGlvbiBzYXZlU3RvcmVkUHJvYmxlbXMobGlzdDogUHJvYmxlbVtdKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmICghaXNFeHRlbnNpb25WYWxpZCgpKSByZXR1cm47XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBbU1RPUkFHRV9LRVlfUFJPQkxFTVNdOiBsaXN0IH0sICgpID0+IHtcbiAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2FmZVNlbmRNZXNzYWdlKHsgdHlwZTogJ1VQREFURV9CQURHRScgfSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXRDYXBzdWxlKCk6IHZvaWQge1xuICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcygnL3Byb2JsZW1zLycpKSByZXR1cm47XG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGMtZWJiaW5naGF1cy1jYXBzdWxlLWhvc3QnKSkgcmV0dXJuO1xuXG4gIGNvbnN0IGhvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaG9zdC5pZCA9ICdsYy1lYmJpbmdoYXVzLWNhcHN1bGUtaG9zdCc7XG4gIGhvc3Quc3R5bGUuY3NzVGV4dCA9XG4gICAgJ3Bvc2l0aW9uOiBmaXhlZDsgYm90dG9tOiAyMHB4OyByaWdodDogMjBweDsgei1pbmRleDogOTk5OTk5OTsgZm9udC1mYW1pbHk6IC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgXCJTZWdvZSBVSVwiLCBSb2JvdG8sIHNhbnMtc2VyaWY7JztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChob3N0KTtcblxuICBjb25zdCBzaGFkb3cgPSBob3N0LmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcblxuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnRleHRDb250ZW50ID0gYFxuICAgICogeyBib3gtc2l6aW5nOiBib3JkZXItYm94OyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IH1cbiAgICBcbiAgICAuY2Fwc3VsZS1idG4ge1xuICAgICAgYmFja2dyb3VuZDogIzBmMTcyYTtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICMzMzQxNTU7XG4gICAgICBjb2xvcjogI2Y4ZmFmYztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDk5OTlweDtcbiAgICAgIHBhZGRpbmc6IDdweCAxNHB4O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA3cHg7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICB9XG4gICAgLmNhcHN1bGUtYnRuOmhvdmVyIHtcbiAgICAgIGJvcmRlci1jb2xvcjogIzEwYjk4MTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXB4KTtcbiAgICB9XG4gICAgLmNhcHN1bGUtYnRuLmFjdGl2ZSB7XG4gICAgICBib3JkZXItY29sb3I6ICMxMGI5ODE7XG4gICAgICBiYWNrZ3JvdW5kOiAjMDIwNjE3O1xuICAgIH1cbiAgICAucHVsc2UtZG90IHtcbiAgICAgIHdpZHRoOiA3cHg7XG4gICAgICBoZWlnaHQ6IDdweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGJhY2tncm91bmQ6ICMxMGI5ODE7XG4gICAgICBib3gtc2hhZG93OiAwIDAgOHB4ICMxMGI5ODE7XG4gICAgfVxuICAgIC5wdWxzZS1kb3QuYW1iZXIge1xuICAgICAgYmFja2dyb3VuZDogI2Y1OWUwYjtcbiAgICAgIGJveC1zaGFkb3c6IDAgMCA4cHggI2Y1OWUwYjtcbiAgICB9XG5cbiAgICAucGFuZWwge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYm90dG9tOiA0NHB4O1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICB3aWR0aDogMzIwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjMGYxNzJhO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzNDE1NTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBwYWRkaW5nOiAxNHB4O1xuICAgICAgY29sb3I6ICNmOGZhZmM7XG4gICAgICBib3gtc2hhZG93OiAwIDEycHggMzBweCByZ2JhKDAsIDAsIDAsIDAuNiksIDAgMCAxNXB4IHJnYmEoMTYsIDE4NSwgMTI5LCAwLjE1KTtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGFuaW1hdGlvbjogZmFkZUluIDAuMThzIGVhc2Utb3V0O1xuICAgIH1cbiAgICBAa2V5ZnJhbWVzIGZhZGVJbiB7XG4gICAgICBmcm9tIHsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDZweCk7IH1cbiAgICAgIHRvIHsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9XG4gICAgfVxuICAgIFxuICAgIC5wYW5lbC1oZWFkZXIge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgfVxuICAgIC50aXRsZS1yb3cge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDZweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogIzM0ZDM5OTtcbiAgICB9XG4gICAgLmJhZGdlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gICAgICBwYWRkaW5nOiAxcHggNnB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgYmFja2dyb3VuZDogIzFlMjkzYjtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICM0NzU1Njk7XG4gICAgICBjb2xvcjogI2NiZDVlMTtcbiAgICB9XG4gICAgLmJhZGdlLmVhc3kgeyBjb2xvcjogIzM0ZDM5OTsgYm9yZGVyLWNvbG9yOiByZ2JhKDUyLCAyMTEsIDE1MywgMC4zKTsgYmFja2dyb3VuZDogcmdiYSg1MiwgMjExLCAxNTMsIDAuMSk7IH1cbiAgICAuYmFkZ2UubWVkaXVtIHsgY29sb3I6ICNmYmJmMjQ7IGJvcmRlci1jb2xvcjogcmdiYSgyNTEsIDE5MSwgMzYsIDAuMyk7IGJhY2tncm91bmQ6IHJnYmEoMjUxLCAxOTEsIDM2LCAwLjEpOyB9XG4gICAgLmJhZGdlLmhhcmQgeyBjb2xvcjogI2Y4NzE3MTsgYm9yZGVyLWNvbG9yOiByZ2JhKDI0OCwgMTEzLCAxMTMsIDAuMyk7IGJhY2tncm91bmQ6IHJnYmEoMjQ4LCAxMTMsIDExMywgMC4xKTsgfVxuXG4gICAgLm1ldGEtaW5mbyB7XG4gICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICBjb2xvcjogIzk0YTNiODtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgICAgYmFja2dyb3VuZDogIzAyMDYxNztcbiAgICAgIHBhZGRpbmc6IDhweCAxMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzFlMjkzYjtcbiAgICB9XG4gICAgLm1ldGEtaW5mbyBzdHJvbmcge1xuICAgICAgY29sb3I6ICNlMmU4ZjA7XG4gICAgfVxuXG4gICAgLmJ0bi1ncmlkIHtcbiAgICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xuICAgICAgZ2FwOiA1cHg7XG4gICAgICBtYXJnaW4tdG9wOiA2cHg7XG4gICAgfVxuICAgIC5yYXRlLWJ0biB7XG4gICAgICBiYWNrZ3JvdW5kOiAjMWUyOTNiO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzNDE1NTtcbiAgICAgIGNvbG9yOiAjZTJlOGYwO1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgcGFkZGluZzogNnB4IDJweDtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjE1cyBlYXNlO1xuICAgIH1cbiAgICAucmF0ZS1idG46aG92ZXIgeyBmaWx0ZXI6IGJyaWdodG5lc3MoMS4yNSk7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXB4KTsgfVxuICAgIC5yYXRlLWJ0bi5hZ2FpbiB7IGJvcmRlci1jb2xvcjogcmdiYSgyMzksIDY4LCA2OCwgMC40KTsgY29sb3I6ICNmODcxNzE7IGJhY2tncm91bmQ6IHJnYmEoMjM5LCA2OCwgNjgsIDAuMSk7IH1cbiAgICAucmF0ZS1idG4uaGFyZCB7IGJvcmRlci1jb2xvcjogcmdiYSgyNDUsIDE1OCwgMTEsIDAuNCk7IGNvbG9yOiAjZmJiZjI0OyBiYWNrZ3JvdW5kOiByZ2JhKDI0NSwgMTU4LCAxMSwgMC4xKTsgfVxuICAgIC5yYXRlLWJ0bi5nb29kIHsgYm9yZGVyLWNvbG9yOiByZ2JhKDE2LCAxODUsIDEyOSwgMC40KTsgY29sb3I6ICMzNGQzOTk7IGJhY2tncm91bmQ6IHJnYmEoMTYsIDE4NSwgMTI5LCAwLjEpOyB9XG4gICAgLnJhdGUtYnRuLmVhc3kgeyBib3JkZXItY29sb3I6IHJnYmEoMTQsIDE2NSwgMjMzLCAwLjQpOyBjb2xvcjogIzM4YmRmODsgYmFja2dyb3VuZDogcmdiYSgxNCwgMTY1LCAyMzMsIDAuMSk7IH1cblxuICAgIC5hZGQtYWN0aW9uLWJ0biB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGJhY2tncm91bmQ6ICMwNTk2Njk7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIHBhZGRpbmc6IDhweCAxMHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBnYXA6IDVweDtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXM7XG4gICAgfVxuICAgIC5hZGQtYWN0aW9uLWJ0bjpob3ZlciB7IGJhY2tncm91bmQ6ICMxMGI5ODE7IH1cblxuICAgIC50ZXh0YXJlYS1ub3RlcyB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGJhY2tncm91bmQ6ICMwMjA2MTc7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMzM0MTU1O1xuICAgICAgY29sb3I6ICNmOGZhZmM7XG4gICAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgICBwYWRkaW5nOiA3cHggOHB4O1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgIHJlc2l6ZTogdmVydGljYWw7XG4gICAgICBtaW4taGVpZ2h0OiA0OHB4O1xuICAgICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgfVxuICAgIC50ZXh0YXJlYS1ub3Rlczpmb2N1cyB7IGJvcmRlci1jb2xvcjogIzEwYjk4MTsgfVxuXG4gICAgLmZvb3Rlci1hY3Rpb25zIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICAgIHBhZGRpbmctdG9wOiA4cHg7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgIzFlMjkzYjtcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICB9XG4gICAgLmRlbC1idG4ge1xuICAgICAgY29sb3I6ICNmODcxNzE7XG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgICBvcGFjaXR5OiAwLjg7XG4gICAgfVxuICAgIC5kZWwtYnRuOmhvdmVyIHsgb3BhY2l0eTogMTsgfVxuICAgIFxuICAgIC5kb25lLWJhbm5lciB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDE2LCAxODUsIDEyOSwgMC4xNSk7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDE2LCAxODUsIDEyOSwgMC4zKTtcbiAgICAgIGNvbG9yOiAjMzRkMzk5O1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgcGFkZGluZzogN3B4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICB9XG5cbiAgICAuYXV0by1hYy1iYW5uZXIge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgxNiwgMTg1LCAxMjksIDAuMik7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjMTBiOTgxO1xuICAgICAgY29sb3I6ICMzNGQzOTk7XG4gICAgICBwYWRkaW5nOiA4cHggMTBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNnB4O1xuICAgIH1cbiAgYDtcbiAgc2hhZG93LmFwcGVuZENoaWxkKHN0eWxlKTtcblxuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHNoYWRvdy5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcblxuICBsZXQgaXNFeHBhbmRlZCA9IGZhbHNlO1xuICBsZXQgYXV0b0FjTm90aWZpZWQgPSBmYWxzZTtcblxuICBhc3luYyBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgY29uc3QgbWV0YSA9IGV4dHJhY3RQcm9ibGVtRnJvbVBhZ2UoKTtcbiAgICBpZiAoIW1ldGEuc2x1ZykgcmV0dXJuO1xuXG4gICAgY29uc3QgcHJvYmxlbXMgPSBhd2FpdCBnZXRTdG9yZWRQcm9ibGVtcygpO1xuICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgZ2V0U3RvcmVkU2V0dGluZ3MoKTtcbiAgICBjb25zdCBsYWRkZXIgPSBzZXR0aW5ncy5sYWRkZXIgfHwgREVGQVVMVF9FQkJJTkdIQVVTX0xBRERFUjtcbiAgICBjb25zdCBsYW5nID0gcmVzb2x2ZUxhbmd1YWdlKHNldHRpbmdzLmxhbmd1YWdlLCB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUpO1xuICAgIGNvbnN0IHsgdCB9ID0gY3JlYXRlSTE4bihsYW5nKTtcblxuICAgIGNvbnN0IGV4aXN0aW5nID0gcHJvYmxlbXMuZmluZChcbiAgICAgIChwKSA9PiBwLnNsdWcgPT09IG1ldGEuc2x1ZyB8fCAobWV0YS5udW1iZXIgIT09ICcwJyAmJiBwLm51bWJlciA9PT0gbWV0YS5udW1iZXIpXG4gICAgKTtcblxuICAgIHdyYXBwZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAvLyAxLiBGbG9hdGluZyBQaWxsIEJ1dHRvblxuICAgIGNvbnN0IHBpbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBwaWxsLmNsYXNzTmFtZSA9IGBjYXBzdWxlLWJ0biAke2lzRXhwYW5kZWQgPyAnYWN0aXZlJyA6ICcnfWA7XG5cbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGNvbnN0IHRvZGF5ID0gZ2V0VG9kYXlTdHJpbmcoKTtcbiAgICAgIGNvbnN0IGlzRHVlID0gZXhpc3RpbmcubmV4dFJldmlld0RhdGUgPD0gdG9kYXk7XG4gICAgICBwaWxsLmlubmVySFRNTCA9IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwdWxzZS1kb3QgJHtpc0R1ZSA/ICdhbWJlcicgOiAnJ31cIj48L3NwYW4+XG4gICAgICAgIDxzcGFuPiR7dCgnY2Fwc3VsZS5waWxsVHJhY2tlZCcsIHsgc3RhZ2U6IGV4aXN0aW5nLnJlcGV0aXRpb24gKyAxLCBpbnRlcnZhbDogZXhpc3RpbmcuaW50ZXJ2YWwgfSl9PC9zcGFuPlxuICAgICAgYDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGlsbC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHVsc2UtZG90XCI+PC9zcGFuPlxuICAgICAgICA8c3Bhbj4ke3QoJ2NhcHN1bGUucGlsbFVudHJhY2tlZCcpfTwvc3Bhbj5cbiAgICAgIGA7XG4gICAgfVxuXG4gICAgcGlsbC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgaXNFeHBhbmRlZCA9ICFpc0V4cGFuZGVkO1xuICAgICAgcmVuZGVyKCk7XG4gICAgfTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHBpbGwpO1xuXG4gICAgLy8gMi4gRXhwYW5kZWQgRmxvYXRpbmcgUGFuZWxcbiAgICBpZiAoaXNFeHBhbmRlZCkge1xuICAgICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHBhbmVsLmNsYXNzTmFtZSA9ICdwYW5lbCc7XG5cbiAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICBjb25zdCB0b2RheSA9IGdldFRvZGF5U3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGlzUmV2aWV3ZWRUb2RheSA9IGV4aXN0aW5nLmxhc3RSZXZpZXdlZERhdGUgPT09IHRvZGF5O1xuXG4gICAgICAgIHBhbmVsLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAke2F1dG9BY05vdGlmaWVkID8gYDxkaXYgY2xhc3M9XCJhdXRvLWFjLWJhbm5lclwiPiR7dCgnY2Fwc3VsZS5hdXRvQWNCYW5uZXInKX08L2Rpdj5gIDogJyd9XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGUtcm93XCI+XG4gICAgICAgICAgICAgIDxzcGFuPiR7dCgnY2Fwc3VsZS5wYW5lbFRpdGxlVHJhY2tlZCcpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGdhcDogNHB4O1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJhZGdlICR7ZXhpc3RpbmcuZGlmZmljdWx0eS50b0xvd2VyQ2FzZSgpfVwiPiR7ZXhpc3RpbmcuZGlmZmljdWx0eX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2VcIj4jJHtleGlzdGluZy5udW1iZXIgfHwgbWV0YS5udW1iZXJ9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC13ZWlnaHQ6IDYwMDsgZm9udC1zaXplOiAxMnB4OyBtYXJnaW4tYm90dG9tOiA2cHg7IGNvbG9yOiAjZjFmNWY5O1wiPlxuICAgICAgICAgICAgJHtleGlzdGluZy50aXRsZSB8fCBtZXRhLnRpdGxlfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm1ldGEtaW5mb1wiPlxuICAgICAgICAgICAgPGRpdj4ke3QoJ2NhcHN1bGUuY3VycmVudFN0YWdlJywgeyBzdGFnZTogZXhpc3RpbmcucmVwZXRpdGlvbiArIDEsIGludGVydmFsOiBleGlzdGluZy5pbnRlcnZhbCB9KX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+JHt0KCdjYXBzdWxlLm5leHRSZXZpZXcnLCB7IGRhdGU6IGV4aXN0aW5nLm5leHRSZXZpZXdEYXRlIH0pfTwvZGl2PlxuICAgICAgICAgICAgJHtpc1Jldmlld2VkVG9kYXkgPyBgPGRpdiBzdHlsZT1cImNvbG9yOiAjMzRkMzk5OyBtYXJnaW4tdG9wOiAzcHg7XCI+JHt0KCdjYXBzdWxlLnJldmlld2VkVG9kYXknKX08L2Rpdj5gIDogYDxkaXYgc3R5bGU9XCJjb2xvcjogI2Y1OWUwYjsgbWFyZ2luLXRvcDogM3B4O1wiPiR7dCgnY2Fwc3VsZS5kdWVUb2RheScpfTwvZGl2PmB9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAke1xuICAgICAgICAgICAgaXNSZXZpZXdlZFRvZGF5XG4gICAgICAgICAgICAgID8gYDxkaXYgY2xhc3M9XCJkb25lLWJhbm5lclwiPiR7dCgnY2Fwc3VsZS5kb25lQmFubmVyJyl9PC9kaXY+YFxuICAgICAgICAgICAgICA6IGBcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDExcHg7IGNvbG9yOiAjOTRhM2I4OyBtYXJnaW4tYm90dG9tOiA0cHg7XCI+JHt0KCdjYXBzdWxlLnJhdGVQcm9tcHQnKX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JpZFwiPlxuICAgICAgICAgICAgICAkeyhbMSwgMiwgMywgNF0gYXMgUmV2aWV3R3JhZGVbXSlcbiAgICAgICAgICAgICAgICAubWFwKChncmFkZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgbWV0YUdyYWRlID0gZ2V0TG9jYWxpemVkR3JhZGVNZXRhKGdyYWRlLCBleGlzdGluZy5yZXBldGl0aW9uLCBleGlzdGluZy5pbnRlcnZhbCwgbGFkZGVyLCBsYW5nKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNscyA9IFsnYWdhaW4nLCAnaGFyZCcsICdnb29kJywgJ2Vhc3knXVtncmFkZSAtIDFdO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmF0ZS1idG4gJHtjbHN9XCIgZGF0YS1ncmFkZT1cIiR7Z3JhZGV9XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PiR7bWV0YUdyYWRlLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiA5cHg7IG9wYWNpdHk6IDAuNzU7XCI+JHttZXRhR3JhZGUubmV4dERheXN9PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+YDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5qb2luKCcnKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIGBcbiAgICAgICAgICB9XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyLWFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiY29sb3I6ICM2NDc0OGI7XCI+JHt0KCdjYXBzdWxlLnRyYWNraW5nRm9vdGVyJyl9PC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImNhcHN1bGUtcmVtb3ZlLWJ0blwiIGNsYXNzPVwiZGVsLWJ0blwiPiR7dCgnY2Fwc3VsZS5yZW1vdmVCdG4nKX08L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBwYW5lbC5xdWVyeVNlbGVjdG9yQWxsKCcucmF0ZS1idG4nKS5mb3JFYWNoKChidG4pID0+IHtcbiAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnRuRWwgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBncmFkZSA9IE51bWJlcihidG5FbC5kYXRhc2V0LmdyYWRlKSBhcyBSZXZpZXdHcmFkZTtcbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZSA9IGNhbGN1bGF0ZVNNMihleGlzdGluZywgZ3JhZGUsIHRvZGF5LCBsYWRkZXIpO1xuXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkOiBQcm9ibGVtID0ge1xuICAgICAgICAgICAgICAuLi5leGlzdGluZyxcbiAgICAgICAgICAgICAgcmVwZXRpdGlvbjogdXBkYXRlLnJlcGV0aXRpb24sXG4gICAgICAgICAgICAgIGludGVydmFsOiB1cGRhdGUuaW50ZXJ2YWwsXG4gICAgICAgICAgICAgIGVhc2VGYWN0b3I6IHVwZGF0ZS5lYXNlRmFjdG9yLFxuICAgICAgICAgICAgICBuZXh0UmV2aWV3RGF0ZTogdXBkYXRlLm5leHRSZXZpZXdEYXRlLFxuICAgICAgICAgICAgICBsYXN0UmV2aWV3ZWREYXRlOiB0b2RheSxcbiAgICAgICAgICAgICAgaGlzdG9yeTogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlkOiBgbG9nLSR7RGF0ZS5ub3coKX1gLFxuICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgZGF0ZTogdG9kYXksXG4gICAgICAgICAgICAgICAgICBncmFkZSxcbiAgICAgICAgICAgICAgICAgIGludGVydmFsRGF5czogdXBkYXRlLmludGVydmFsLFxuICAgICAgICAgICAgICAgICAgcmVwZXRpdGlvbjogdXBkYXRlLnJlcGV0aXRpb24sXG4gICAgICAgICAgICAgICAgICBlYXNlRmFjdG9yOiB1cGRhdGUuZWFzZUZhY3RvcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIC4uLihleGlzdGluZy5oaXN0b3J5IHx8IFtdKSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBhd2FpdCBnZXRTdG9yZWRQcm9ibGVtcygpO1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gbGlzdC5maW5kSW5kZXgoKHApID0+IHAuaWQgPT09IGV4aXN0aW5nLmlkKTtcbiAgICAgICAgICAgIGlmIChpZHggPj0gMCkgbGlzdFtpZHhdID0gdXBkYXRlZDtcbiAgICAgICAgICAgIGF3YWl0IHNhdmVTdG9yZWRQcm9ibGVtcyhsaXN0KTtcbiAgICAgICAgICAgIHJlbmRlcigpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBwYW5lbC5xdWVyeVNlbGVjdG9yKCcjY2Fwc3VsZS1yZW1vdmUtYnRuJyk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmIChjb25maXJtKHQoJ2NhcHN1bGUucmVtb3ZlQ29uZmlybScsIHsgbnVtYmVyOiBleGlzdGluZy5udW1iZXIsIHRpdGxlOiBleGlzdGluZy50aXRsZSB9KSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBhd2FpdCBnZXRTdG9yZWRQcm9ibGVtcygpO1xuICAgICAgICAgICAgY29uc3QgZmlsdGVyZWQgPSBsaXN0LmZpbHRlcigocCkgPT4gcC5pZCAhPT0gZXhpc3RpbmcuaWQpO1xuICAgICAgICAgICAgYXdhaXQgc2F2ZVN0b3JlZFByb2JsZW1zKGZpbHRlcmVkKTtcbiAgICAgICAgICAgIHJlbmRlcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOb3QgdHJhY2tlZDogSW5zdGFudCBPbmUtQ2xpY2sgQWRkXG4gICAgICAgIHBhbmVsLmlubmVySFRNTCA9IGBcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGUtcm93XCI+XG4gICAgICAgICAgICAgIDxzcGFuPiR7dCgnY2Fwc3VsZS5wYW5lbFRpdGxlVW50cmFja2VkJyl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZ2FwOiA0cHg7XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2UgJHttZXRhLmRpZmZpY3VsdHkudG9Mb3dlckNhc2UoKX1cIj4ke21ldGEuZGlmZmljdWx0eX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2VcIj4jJHttZXRhLm51bWJlcn08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJmb250LXdlaWdodDogNjAwOyBmb250LXNpemU6IDEycHg7IG1hcmdpbi1ib3R0b206IDZweDsgY29sb3I6ICNmMWY1Zjk7XCI+XG4gICAgICAgICAgICAke21ldGEudGl0bGV9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8cCBzdHlsZT1cImNvbG9yOiAjOTRhM2I4OyBmb250LXNpemU6IDExcHg7IG1hcmdpbi1ib3R0b206IDhweDsgbGluZS1oZWlnaHQ6IDEuNDtcIj5cbiAgICAgICAgICAgICR7dCgnY2Fwc3VsZS51bnRyYWNrZWREZXNjJyl9XG4gICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgPHRleHRhcmVhIGlkPVwiY2Fwc3VsZS1ub3Rlcy1pbnB1dFwiIGNsYXNzPVwidGV4dGFyZWEtbm90ZXNcIiBwbGFjZWhvbGRlcj1cIiR7dCgnY2Fwc3VsZS5ub3Rlc1BsYWNlaG9sZGVyJyl9XCI+PC90ZXh0YXJlYT5cblxuICAgICAgICAgIDxidXR0b24gaWQ9XCJjYXBzdWxlLXN1Ym1pdC1hZGRcIiBjbGFzcz1cImFkZC1hY3Rpb24tYnRuXCI+XG4gICAgICAgICAgICA8c3Bhbj4ke3QoJ2NhcHN1bGUuc3VibWl0QWRkJyl9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICBgO1xuXG4gICAgICAgIHBhbmVsLnF1ZXJ5U2VsZWN0b3IoJyNjYXBzdWxlLXN1Ym1pdC1hZGQnKT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGV4dGFyZWEgPSBwYW5lbC5xdWVyeVNlbGVjdG9yKCcjY2Fwc3VsZS1ub3Rlcy1pbnB1dCcpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgICAgICAgY29uc3Qgbm90ZXMgPSB0ZXh0YXJlYSA/IHRleHRhcmVhLnZhbHVlLnRyaW0oKSA6ICcnO1xuXG4gICAgICAgICAgY29uc3QgbmV3UHJvYmxlbTogUHJvYmxlbSA9IHtcbiAgICAgICAgICAgIGlkOiBgbGMtJHttZXRhLnNsdWcgfHwgRGF0ZS5ub3coKX1gLFxuICAgICAgICAgICAgbnVtYmVyOiBtZXRhLm51bWJlciB8fCAnMCcsXG4gICAgICAgICAgICB0aXRsZTogbWV0YS50aXRsZSB8fCBtZXRhLnNsdWcsXG4gICAgICAgICAgICBzbHVnOiBtZXRhLnNsdWcsXG4gICAgICAgICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgZGlmZmljdWx0eTogbWV0YS5kaWZmaWN1bHR5LFxuICAgICAgICAgICAgdGFnczogbWV0YS50YWdzLFxuICAgICAgICAgICAgbm90ZXMsXG4gICAgICAgICAgICBjcmVhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgICByZXBldGl0aW9uOiAwLFxuICAgICAgICAgICAgaW50ZXJ2YWw6IDEsIC8vIDFzdCBzdGFnZVxuICAgICAgICAgICAgZWFzZUZhY3RvcjogMi41LFxuICAgICAgICAgICAgbmV4dFJldmlld0RhdGU6IGdldFRvZGF5U3RyaW5nKCksXG4gICAgICAgICAgICBpc1NhbXBsZTogZmFsc2UsXG4gICAgICAgICAgICBoaXN0b3J5OiBbXSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFN0b3JlZFByb2JsZW1zKCk7XG4gICAgICAgICAgbGlzdC51bnNoaWZ0KG5ld1Byb2JsZW0pO1xuICAgICAgICAgIGF3YWl0IHNhdmVTdG9yZWRQcm9ibGVtcyhsaXN0KTtcbiAgICAgICAgICByZW5kZXIoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQocGFuZWwpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpO1xuXG4gIC8vIFdhdGNoIGZvciBMZWV0Q29kZSBTaW5nbGUgUGFnZSBBcHAgY2xpZW50LXNpZGUgcm91dGUgY2hhbmdlc1xuICBsZXQgbGFzdFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICBpZiAoIWlzRXh0ZW5zaW9uVmFsaWQoKSkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZiAhPT0gbGFzdFVybCkge1xuICAgICAgbGFzdFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgYXV0b0FjTm90aWZpZWQgPSBmYWxzZTtcbiAgICAgIGFjSGFuZGxlZCA9IGZhbHNlO1xuICAgICAgcmVuZGVyKCk7XG4gICAgfVxuICB9LCAxMjAwKTtcblxuICAvLyBBdXRvIEFDIChBY2NlcHRlZCAvIOmAmui/hykgRGV0ZWN0aW9uIHZpYSBNdXRhdGlvbk9ic2VydmVyXG4gIGxldCBhY0hhbmRsZWQgPSBmYWxzZTtcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFpc0V4dGVuc2lvblZhbGlkKCkpIHtcbiAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChhY0hhbmRsZWQpIHJldHVybjtcblxuICAgIGlmIChjaGVja1N1Ym1pc3Npb25BY2NlcHRlZCgpKSB7XG4gICAgICBhY0hhbmRsZWQgPSB0cnVlO1xuICAgICAgY29uc3QgbWV0YSA9IGV4dHJhY3RQcm9ibGVtRnJvbVBhZ2UoKTtcbiAgICAgIGlmIChtZXRhLnNsdWcpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IGdldFN0b3JlZFByb2JsZW1zKCk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbGlzdC5maW5kKChwKSA9PiBwLnNsdWcgPT09IG1ldGEuc2x1Zyk7XG4gICAgICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgICAgICBjb25zdCBzZXR0aW5ncyA9IGF3YWl0IGdldFN0b3JlZFNldHRpbmdzKCk7XG4gICAgICAgICAgY29uc3QgbGFuZyA9IHJlc29sdmVMYW5ndWFnZShzZXR0aW5ncy5sYW5ndWFnZSwgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lKTtcbiAgICAgICAgICBjb25zdCB7IHQgfSA9IGNyZWF0ZUkxOG4obGFuZyk7XG5cbiAgICAgICAgICAvLyBBdXRvIGFkZCBvbiByZWFsIHN1Ym1pc3Npb24gQUNcbiAgICAgICAgICBjb25zdCBuZXdQcm9ibGVtOiBQcm9ibGVtID0ge1xuICAgICAgICAgICAgaWQ6IGBsYy0ke21ldGEuc2x1ZyB8fCBEYXRlLm5vdygpfWAsXG4gICAgICAgICAgICBudW1iZXI6IG1ldGEubnVtYmVyIHx8ICcwJyxcbiAgICAgICAgICAgIHRpdGxlOiBtZXRhLnRpdGxlIHx8IG1ldGEuc2x1ZyxcbiAgICAgICAgICAgIHNsdWc6IG1ldGEuc2x1ZyxcbiAgICAgICAgICAgIHVybDogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICBkaWZmaWN1bHR5OiBtZXRhLmRpZmZpY3VsdHksXG4gICAgICAgICAgICB0YWdzOiBtZXRhLnRhZ3MsXG4gICAgICAgICAgICBub3RlczogdCgnY2Fwc3VsZS5hdXRvQWNOb3RlcycpLFxuICAgICAgICAgICAgY3JlYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgcmVwZXRpdGlvbjogMCxcbiAgICAgICAgICAgIGludGVydmFsOiAxLFxuICAgICAgICAgICAgZWFzZUZhY3RvcjogMi41LFxuICAgICAgICAgICAgbmV4dFJldmlld0RhdGU6IGdldFRvZGF5U3RyaW5nKCksXG4gICAgICAgICAgICBpc1NhbXBsZTogZmFsc2UsXG4gICAgICAgICAgICBoaXN0b3J5OiBbXSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGxpc3QudW5zaGlmdChuZXdQcm9ibGVtKTtcbiAgICAgICAgICBhd2FpdCBzYXZlU3RvcmVkUHJvYmxlbXMobGlzdCk7XG4gICAgICAgICAgYXV0b0FjTm90aWZpZWQgPSB0cnVlO1xuICAgICAgICAgIGlzRXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICAgIHJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwgeyBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUgfSk7XG4gIH1cbn1cblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5pdENhcHN1bGUpO1xufSBlbHNlIHtcbiAgaW5pdENhcHN1bGUoKTtcbn1cbiJdLCJuYW1lcyI6WyJhIiwiYiIsIlJlYWN0RGVidWdDdXJyZW50RnJhbWUiLCJtb2R1bGVPYmplY3QiLCJlcnJvciIsIkNvbXBvbmVudCIsInJldHVyblZhbHVlIiwiZXhwb3J0cyIsInJlYWN0TW9kdWxlIiwicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJjcmVhdGVDb250ZXh0Il0sIm1hcHBpbmdzIjoiOztBQUVPLFFBQU0sNEJBQTRCLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHO0FBRTlELFdBQVMsZUFBZSxJQUFVLG9CQUFJLFFBQWdCO0FBQzNELFVBQU0sT0FBTyxFQUFFLFlBQUE7QUFDZixVQUFNLFFBQVEsT0FBTyxFQUFFLFNBQUEsSUFBYSxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFDdEQsVUFBTSxNQUFNLE9BQU8sRUFBRSxRQUFBLENBQVMsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUMvQyxXQUFPLEdBQUcsSUFBSSxJQUFJLEtBQUssSUFBSSxHQUFHO0FBQUEsRUFDaEM7QUFFTyxXQUFTLFFBQVEsU0FBaUIsTUFBc0I7QUFDN0QsVUFBTSxJQUFJLG9CQUFJLEtBQUssVUFBVSxXQUFXO0FBQ3hDLE1BQUUsUUFBUSxFQUFFLFFBQUEsSUFBWSxJQUFJO0FBQzVCLFdBQU8sZUFBZSxDQUFDO0FBQUEsRUFDekI7QUFZTyxXQUFTLGFBQ2QsU0FDQSxPQUNBLGFBQXFCLGVBQUEsR0FDckIsU0FBbUIsMkJBTW5CO0FBQ0EsUUFBSSxNQUFNLFFBQVEsY0FBYztBQUNoQyxRQUFJLE9BQU8sUUFBUSxjQUFjO0FBQ2pDLFFBQUk7QUFFSixZQUFRLE9BQUE7QUFBQSxNQUNOLEtBQUs7QUFDSCxjQUFNO0FBQ04sdUJBQWUsT0FBTyxDQUFDLEtBQUs7QUFDNUIsZUFBTyxLQUFLLElBQUksS0FBSyxPQUFPLEdBQUc7QUFDL0I7QUFBQSxNQUVGLEtBQUs7QUFFSCx1QkFBZSxPQUFPLEtBQUssSUFBSSxLQUFLLE9BQU8sU0FBUyxDQUFDLENBQUMsS0FBSztBQUMzRCxlQUFPLEtBQUssSUFBSSxL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QUFNLEVBQUUsTUFBSSxPQUFPLEtBQUcsRUFBRSxHQUFHLElBQUUsRUFBRSxTQUFTLEVBQUU7QUFBQSxJQUFDO0FBQy9XLGFBQVMsRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUUsT0FBTztBQUFFLFVBQUcsZ0JBQWMsS0FBRyxjQUFZLEVBQUUsS0FBRTtBQUFLLFVBQUksSUFBRTtBQUFHLFVBQUcsU0FBTyxFQUFFLEtBQUU7QUFBQSxVQUFRLFNBQU8sR0FBQztBQUFBLFFBQUUsS0FBSztBQUFBLFFBQVMsS0FBSztBQUFTLGNBQUU7QUFBRztBQUFBLFFBQU0sS0FBSztBQUFTLGtCQUFPLEVBQUUsVUFBUTtBQUFBLFlBQUUsS0FBSztBQUFBLFlBQUUsS0FBSztBQUFFLGtCQUFFO0FBQUEsVUFBRTtBQUFBLE1BQUM7QUFBQyxVQUFHLEVBQUUsUUFBTyxJQUFFLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLE9BQUssSUFBRSxNQUFJLEVBQUUsR0FBRSxDQUFDLElBQUUsR0FBRSxFQUFFLENBQUMsS0FBRyxJQUFFLElBQUcsUUFBTSxNQUFJLElBQUUsRUFBRSxRQUFRLEdBQUUsS0FBSyxJQUFFLE1BQUssRUFBRSxHQUFFLEdBQUUsR0FBRSxJQUFHLFNBQVNBLElBQUU7QUFBQyxlQUFPQTtBQUFBLE1BQUMsQ0FBQyxLQUFHLFFBQU0sTUFBSSxFQUFFLENBQUMsTUFBSSxJQUFFLEVBQUUsR0FBRSxLQUFHLENBQUMsRUFBRSxPQUFLLEtBQUcsRUFBRSxRQUFNLEVBQUUsTUFBSSxNQUFJLEtBQUcsRUFBRSxLQUFLLFFBQVEsR0FBRSxLQUFLLElBQUUsT0FBSyxDQUFDLElBQUcsRUFBRSxLQUFLLENBQUMsSUFBRztBQUFFLFVBQUU7QUFBRSxVQUFFLE9BQUssSUFBRSxNQUFJLElBQUU7QUFBSSxVQUFHLEVBQUUsQ0FBQyxFQUFFLFVBQVEsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUk7QUFBQyxZQUNyZixFQUFFLENBQUM7QUFBRSxZQUFJLElBQUUsSUFBRSxFQUFF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
