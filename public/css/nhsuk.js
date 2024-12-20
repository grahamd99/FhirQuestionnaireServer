(() => {
  var e = {
      405: () => {
        NodeList.prototype.forEach ||
          (NodeList.prototype.forEach = Array.prototype.forEach),
          Array.prototype.includes ||
            Object.defineProperty(Array.prototype, "includes", {
              enumerable: !1,
              value: function (e) {
                return (
                  this.filter(function (t) {
                    return t === e;
                  }).length > 0
                );
              },
            }),
          Element.prototype.matches ||
            (Element.prototype.matches =
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector),
          Element.prototype.closest ||
            (Element.prototype.closest = function (e) {
              var t = this;
              do {
                if (Element.prototype.matches.call(t, e)) return t;
                t = t.parentElement || t.parentNode;
              } while (null !== t && 1 === t.nodeType);
              return null;
            }),
          "function" != typeof window.CustomEvent &&
            (window.CustomEvent = function (e, t) {
              t = t || { bubbles: !1, cancelable: !1, detail: null };
              var n = document.createEvent("CustomEvent");
              return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
            });
      },
    },
    t = {};
  function n(i) {
    var a = t[i];
    if (void 0 !== a) return a.exports;
    var r = (t[i] = { exports: {} });
    return e[i](r, r.exports, n), r.exports;
  }
  (() => {
    "use strict";
    function e(t) {
      return (
        (e =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        e(t)
      );
    }
    function t(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(e, a(i.key), i);
      }
    }
    function i(e, t, n) {
      return (
        (t = a(t)) in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function a(t) {
      var n = (function (t, n) {
        if ("object" !== e(t) || null === t) return t;
        var i = t[Symbol.toPrimitive];
        if (void 0 !== i) {
          var a = i.call(t, "string");
          if ("object" !== e(a)) return a;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return String(t);
      })(t);
      return "symbol" === e(n) ? n : String(n);
    }
    var r = (function () {
      function e(t) {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          i(this, "KEY_SPACE", 32),
          i(this, "DEBOUNCE_TIMEOUT_IN_SECONDS", 1),
          (this.$module = t),
          (this.debounceFormSubmitTimer = null);
      }
      var n, a;
      return (
        (n = e),
        (a = [
          {
            key: "handleKeyDown",
            value: function (e) {
              var t = e.target;
              "button" === t.getAttribute("role") &&
                e.keyCode === this.KEY_SPACE &&
                (e.preventDefault(), t.click());
            },
          },
          {
            key: "debounce",
            value: function (e) {
              var t = this;
              if ("true" === e.target.getAttribute("data-prevent-double-click"))
                return this.debounceFormSubmitTimer
                  ? (e.preventDefault(), !1)
                  : void (this.debounceFormSubmitTimer = setTimeout(
                      function () {
                        t.debounceFormSubmitTimer = null;
                      },
                      1e3 * this.DEBOUNCE_TIMEOUT_IN_SECONDS
                    ));
            },
          },
          {
            key: "init",
            value: function () {
              this.$module.addEventListener(
                "keydown",
                this.handleKeyDown.bind(this)
              ),
                this.$module.addEventListener(
                  "click",
                  this.debounce.bind(this)
                );
            },
          },
        ]) && t(n.prototype, a),
        Object.defineProperty(n, "prototype", { writable: !1 }),
        e
      );
    })();
    function o(e) {
      return (
        (o =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        o(e)
      );
    }
    function s(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(
            e,
            (void 0,
            (a = (function (e, t) {
              if ("object" !== o(e) || null === e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var i = n.call(e, "string");
                if ("object" !== o(i)) return i;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return String(e);
            })(i.key)),
            "symbol" === o(a) ? a : String(a)),
            i
          );
      }
      var a;
    }
    var u = (function () {
      function e(t) {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.$module = t),
          (this.$textarea = t.querySelector(".nhsuk-js-character-count")),
          (this.$visibleCountMessage = null),
          (this.$screenReaderCountMessage = null),
          (this.lastInputTimestamp = null);
      }
      var t, n, i;
      return (
        (t = e),
        (i = [
          {
            key: "getDataset",
            value: function (e) {
              var t = {},
                n = e.attributes;
              if (n)
                for (var i = 0; i < n.length; i++) {
                  var a = n[i],
                    r = a.name.match(/^data-(.+)/);
                  r && (t[r[1]] = a.value);
                }
              return t;
            },
          },
        ]),
        (n = [
          {
            key: "init",
            value: function () {
              if (this.$textarea) {
                var t = this.$module,
                  n = this.$textarea,
                  i = document.getElementById("".concat(n.id, "-info"));
                n.insertAdjacentElement("afterend", i);
                var a = document.createElement("div");
                (a.className =
                  "nhsuk-character-count__sr-status nhsuk-u-visually-hidden"),
                  a.setAttribute("aria-live", "polite"),
                  (this.$screenReaderCountMessage = a),
                  i.insertAdjacentElement("afterend", a);
                var r = document.createElement("div");
                (r.className = i.className),
                  r.classList.add("nhsuk-character-count__status"),
                  r.setAttribute("aria-hidden", "true"),
                  (this.$visibleCountMessage = r),
                  i.insertAdjacentElement("afterend", r),
                  i.classList.add("nhsuk-u-visually-hidden"),
                  (this.options = e.getDataset(t));
                var o = this.defaults.characterCountAttribute;
                this.options.maxwords && (o = this.defaults.wordCountAttribute),
                  (this.maxLength = t.getAttribute(o)),
                  this.maxLength &&
                    (n.removeAttribute("maxlength"),
                    this.bindChangeEvents(),
                    "onpageshow" in window
                      ? window.addEventListener(
                          "pageshow",
                          this.updateCountMessage.bind(this)
                        )
                      : window.addEventListener(
                          "DOMContentLoaded",
                          this.updateCountMessage.bind(this)
                        ),
                    this.updateCountMessage());
              }
            },
          },
          {
            key: "count",
            value: function (e) {
              return this.options.maxwords
                ? (e.match(/\S+/g) || []).length
                : e.length;
            },
          },
          {
            key: "bindChangeEvents",
            value: function () {
              var e = this.$textarea;
              e.addEventListener("keyup", this.handleKeyUp.bind(this)),
                e.addEventListener("focus", this.handleFocus.bind(this)),
                e.addEventListener("blur", this.handleBlur.bind(this));
            },
          },
          {
            key: "checkIfValueChanged",
            value: function () {
              this.$textarea.oldValue || (this.$textarea.oldValue = ""),
                this.$textarea.value !== this.$textarea.oldValue &&
                  ((this.$textarea.oldValue = this.$textarea.value),
                  this.updateCountMessage());
            },
          },
          {
            key: "updateCountMessage",
            value: function () {
              this.updateVisibleCountMessage(),
                this.updateScreenReaderCountMessage();
            },
          },
          {
            key: "updateVisibleCountMessage",
            value: function () {
              var e = this.$textarea,
                t = this.$visibleCountMessage,
                n = this.maxLength - this.count(e.value);
              this.isOverThreshold()
                ? t.classList.remove("nhsuk-character-count__message--disabled")
                : t.classList.add("nhsuk-character-count__message--disabled"),
                n < 0
                  ? (e.classList.add("nhsuk-textarea--error"),
                    t.classList.remove("nhsuk-hint"),
                    t.classList.add("nhsuk-error-message"))
                  : (e.classList.remove("nhsuk-textarea--error"),
                    t.classList.remove("nhsuk-error-message"),
                    t.classList.add("nhsuk-hint")),
                (t.innerHTML = this.formattedUpdateMessage());
            },
          },
          {
            key: "updateScreenReaderCountMessage",
            value: function () {
              var e = this.$screenReaderCountMessage;
              this.isOverThreshold()
                ? e.removeAttribute("aria-hidden")
                : e.setAttribute("aria-hidden", !0),
                (e.innerHTML = this.formattedUpdateMessage());
            },
          },
          {
            key: "formattedUpdateMessage",
            value: function () {
              var e,
                t,
                n = this.$textarea,
                i = this.options,
                a = this.maxLength - this.count(n.value),
                r = "character";
              return (
                i.maxwords && (r = "word"),
                (r += -1 === a || 1 === a ? "" : "s"),
                (e = a < 0 ? "too many" : "remaining"),
                (t = Math.abs(a)),
                "You have ".concat(t, " ").concat(r, " ").concat(e)
              );
            },
          },
          {
            key: "isOverThreshold",
            value: function () {
              var e = this.$textarea,
                t = this.options,
                n = this.count(e.value);
              return (
                (this.maxLength * (t.threshold ? t.threshold : 0)) / 100 <= n
              );
            },
          },
          {
            key: "handleKeyUp",
            value: function () {
              this.updateVisibleCountMessage(),
                (this.lastInputTimestamp = Date.now());
            },
          },
          {
            key: "handleFocus",
            value: function () {
              var e = this;
              this.valueChecker = setInterval(function () {
                (!e.lastInputTimestamp ||
                  Date.now() - 500 >= e.lastInputTimestamp) &&
                  e.checkIfValueChanged();
              }, 1e3);
            },
          },
          {
            key: "handleBlur",
            value: function () {
              clearInterval(this.valueChecker);
            },
          },
        ]) && s(t.prototype, n),
        i && s(t, i),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        e
      );
    })();
    u.prototype.defaults = {
      characterCountAttribute: "data-maxlength",
      wordCountAttribute: "data-maxwords",
    };
    var c = function (e, t) {
        if (e && t) {
          var n = "true" === e.getAttribute(t) ? "false" : "true";
          e.setAttribute(t, n);
        }
      },
      l = function (e, t) {
        if (e && t) {
          var n = e.getAttribute("aria-controls");
          if (n) {
            var i = document.getElementById(n);
            i &&
              (e.checked
                ? (i.classList.remove(t), e.setAttribute("aria-expanded", !0))
                : (i.classList.add(t), e.setAttribute("aria-expanded", !1)));
          }
        }
      },
      h = function (e) {
        e.form.querySelectorAll('input[type="checkbox"]').forEach(function (e) {
          return l(e, "nhsuk-checkboxes__conditional--hidden");
        });
      };
    function d(e) {
      (function (e) {
        if ("A" !== e.tagName || !1 === e.href) return !1;
        var t = document.querySelector(e.hash);
        if (!t) return !1;
        var n = (function (e) {
          var t = e.closest("fieldset");
          if (t) {
            var n = t.getElementsByTagName("legend");
            if (n.length) {
              var i = n[0];
              if ("checkbox" === e.type || "radio" === e.type) return i;
              var a = i.getBoundingClientRect().top,
                r = e.getBoundingClientRect();
              if (
                r.height &&
                window.innerHeight &&
                r.top + r.height - a < window.innerHeight / 2
              )
                return i;
            }
          }
          return (
            document.querySelector(
              "label[for='".concat(e.getAttribute("id"), "']")
            ) || e.closest("label")
          );
        })(t);
        return !!n && (n.scrollIntoView(), t.focus({ preventScroll: !0 }), !0);
      })(e.target) && e.preventDefault();
    }
    function b(e) {
      return (
        (b =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        b(e)
      );
    }
    function f(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        (i.enumerable = i.enumerable || !1),
          (i.configurable = !0),
          "value" in i && (i.writable = !0),
          Object.defineProperty(
            e,
            (void 0,
            (a = (function (e, t) {
              if ("object" !== b(e) || null === e) return e;
              var n = e[Symbol.toPrimitive];
              if (void 0 !== n) {
                var i = n.call(e, "string");
                if ("object" !== b(i)) return i;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return String(e);
            })(i.key)),
            "symbol" === b(a) ? a : String(a)),
            i
          );
      }
      var a;
    }
    var v = (function () {
      function e(t, n, i, a) {
        !(function (e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.$module = t),
          (this.namespace = n),
          (this.responsive = i),
          (this.historyEnabled = a),
          (this.$tabs = t.querySelectorAll(
            ".".concat(this.namespace, "__tab")
          )),
          (this.keys = { down: 40, left: 37, right: 39, up: 38 }),
          (this.jsHiddenClass = "".concat(this.namespace, "__panel--hidden")),
          (this.showEvent = new CustomEvent("tab.show")),
          (this.hideEvent = new CustomEvent("tab.hide"));
      }
      var t, n, i;
      return (
        (t = e),
        (i = [
          {
            key: "getHref",
            value: function (e) {
              var t = e.getAttribute("href");
              return t.slice(t.indexOf("#"), t.length);
            },
          },
        ]),
        (n = [
          {
            key: "init",
            value: function () {
              "function" == typeof window.matchMedia && this.responsive
                ? this.setupResponsiveChecks()
                : this.setup();
            },
          },
          {
            key: "setupResponsiveChecks",
            value: function () {
              (this.mql = window.matchMedia("(min-width: 641px)")),
                this.mql.addEventListener("change", this.checkMode.bind(this)),
                this.checkMode();
            },
          },
          {
            key: "checkMode",
            value: function () {
              this.mql.matches ? this.setup() : this.teardown();
            },
          },
          {
            key: "setup",
            value: function () {
              var e = this,
                t = this.$module,
                n = this.$tabs,
                i = t.querySelector(".".concat(this.namespace, "__list")),
                a = t.querySelectorAll(
                  ".".concat(this.namespace, "__list-item")
                );
              if (n && i && a) {
                i.setAttribute("role", "tablist"),
                  a.forEach(function (e) {
                    e.setAttribute("role", "presentation");
                  }),
                  n.forEach(function (t) {
                    e.setAttributes(t),
                      (t.boundTabClick = e.onTabClick.bind(e)),
                      (t.boundTabKeydown = e.onTabKeydown.bind(e)),
                      t.addEventListener("click", t.boundTabClick, !0),
                      t.addEventListener("keydown", t.boundTabKeydown, !0),
                      e.hideTab(t);
                  });
                var r = this.getTab(window.location.hash) || this.$tabs[0];
                this.showTab(r),
                  this.historyEnabled &&
                    ((t.boundOnHashChange = this.onHashChange.bind(this)),
                    window.addEventListener(
                      "hashchange",
                      t.boundOnHashChange,
                      !0
                    ));
              }
            },
          },
          {
            key: "teardown",
            value: function () {
              var e = this,
                t = this.$module,
                n = this.$tabs,
                i = t.querySelector(".".concat(this.namespace, "__list")),
                a = t.querySelectorAll(
                  ".".concat(this.namespace, "__list-item")
                );
              n &&
                i &&
                a &&
                (i.removeAttribute("role"),
                a.forEach(function (e) {
                  e.removeAttribute("role", "presentation");
                }),
                n.forEach(function (t) {
                  t.removeEventListener("click", t.boundTabClick, !0),
                    t.removeEventListener("keydown", t.boundTabKeydown, !0),
                    e.unsetAttributes(t);
                }),
                this.historyEnabled &&
                  window.removeEventListener(
                    "hashchange",
                    t.boundOnHashChange,
                    !0
                  ));
            },
          },
          {
            key: "onHashChange",
            value: function () {
              var e = window.location.hash,
                t = this.getTab(e);
              if (t)
                if (this.changingHash) this.changingHash = !1;
                else {
                  var n = this.getCurrentTab();
                  this.hideTab(n), this.showTab(t), t.focus();
                }
            },
          },
          {
            key: "hideTab",
            value: function (e) {
              this.unhighlightTab(e), this.hidePanel(e);
            },
          },
          {
            key: "showTab",
            value: function (e) {
              this.highlightTab(e), this.showPanel(e);
            },
          },
          {
            key: "getTab",
            value: function (e) {
              return this.$module.querySelector(
                ".".concat(this.namespace, '__tab[href="').concat(e, '"]')
              );
            },
          },
          {
            key: "setAttributes",
            value: function (t) {
              var n = e.getHref(t).slice(1);
              t.setAttribute("id", "tab_".concat(n)),
                t.setAttribute("role", "tab"),
                t.setAttribute("aria-controls", n),
                t.setAttribute("aria-selected", "false"),
                t.setAttribute("tabindex", "-1");
              var i = this.getPanel(t);
              i.setAttribute("role", "tabpanel"),
                i.setAttribute("aria-labelledby", t.id),
                i.classList.add(this.jsHiddenClass);
            },
          },
          {
            key: "unsetAttributes",
            value: function (e) {
              e.removeAttribute("id"),
                e.removeAttribute("role"),
                e.removeAttribute("aria-controls"),
                e.removeAttribute("aria-selected"),
                e.removeAttribute("tabindex");
              var t = this.getPanel(e);
              t.removeAttribute("role"),
                t.removeAttribute("aria-labelledby"),
                t.removeAttribute("tabindex"),
                t.classList.remove(this.jsHiddenClass);
            },
          },
          {
            key: "onTabClick",
            value: function (e) {
              e.target.classList.contains("".concat(this.namespace, "__tab")) ||
                (e.stopPropagation(), e.preventDefault()),
                e.preventDefault();
              var t = e.target,
                n = this.getCurrentTab();
              this.hideTab(n), this.showTab(t), this.createHistoryEntry(t);
            },
          },
          {
            key: "createHistoryEntry",
            value: function (t) {
              if (this.historyEnabled) {
                var n = this.getPanel(t),
                  i = n.id;
                (n.id = ""),
                  (this.changingHash = !0),
                  (window.location.hash = e.getHref(t).slice(1)),
                  (n.id = i);
              }
            },
          },
          {
            key: "onTabKeydown",
            value: function (e) {
              switch (e.keyCode) {
                case this.keys.left:
                case this.keys.up:
                  this.activatePreviousTab(), e.preventDefault();
                  break;
                case this.keys.right:
                case this.keys.down:
                  this.activateNextTab(), e.preventDefault();
              }
            },
          },
          {
            key: "activateNextTab",
            value: function () {
              var e,
                t = this.getCurrentTab(),
                n = t.parentNode.nextElementSibling;
              n && (e = n.querySelector(".".concat(this.namespace, "__tab"))),
                e &&
                  (this.hideTab(t),
                  this.showTab(e),
                  e.focus(),
                  this.createHistoryEntry(e));
            },
          },
          {
            key: "activatePreviousTab",
            value: function () {
              var e,
                t = this.getCurrentTab(),
                n = t.parentNode.previousElementSibling;
              n && (e = n.querySelector(".".concat(this.namespace, "__tab"))),
                e &&
                  (this.hideTab(t),
                  this.showTab(e),
                  e.focus(),
                  this.createHistoryEntry(e));
            },
          },
          {
            key: "getPanel",
            value: function (t) {
              return this.$module.querySelector(e.getHref(t));
            },
          },
          {
            key: "showPanel",
            value: function (e) {
              var t = this.getPanel(e);
              t.classList.remove(this.jsHiddenClass),
                t.dispatchEvent(this.showEvent);
            },
          },
          {
            key: "hidePanel",
            value: function (e) {
              var t = this.getPanel(e);
              t.classList.add(this.jsHiddenClass),
                t.dispatchEvent(this.hideEvent);
            },
          },
          {
            key: "unhighlightTab",
            value: function (e) {
              e.setAttribute("aria-selected", "false"),
                e.parentNode.classList.remove(
                  "".concat(this.namespace, "__list-item--selected")
                ),
                e.setAttribute("tabindex", "-1");
            },
          },
          {
            key: "highlightTab",
            value: function (e) {
              e.setAttribute("aria-selected", "true"),
                e.parentNode.classList.add(
                  "".concat(this.namespace, "__list-item--selected")
                ),
                e.setAttribute("tabindex", "0");
            },
          },
          {
            key: "getCurrentTab",
            value: function () {
              return this.$module.querySelector(
                "."
                  .concat(this.namespace, "__list-item--selected .")
                  .concat(this.namespace, "__tab")
              );
            },
          },
        ]) && f(t.prototype, n),
        i && f(t, i),
        Object.defineProperty(t, "prototype", { writable: !1 }),
        e
      );
    })();
    n(405),
      document.addEventListener("DOMContentLoaded", function () {
        var e, t, n, i, a, o;
        document
          .querySelectorAll('[data-module="nhsuk-character-count"]')
          .forEach(function (e) {
            new u(e).init();
          }),
          document
            .querySelectorAll('[data-module="nhsuk-button"]')
            .forEach(function (e) {
              new r(e).init();
            }),
          (function () {
            var e = document.querySelectorAll(
                ".nhsuk-checkboxes .nhsuk-checkboxes__input"
              ),
              t = function (e) {
                var t;
                l(e.target, "nhsuk-checkboxes__conditional--hidden"),
                  e.target.checked &&
                    (e.target.hasAttribute("data-checkbox-exclusive")
                      ? ((t = e.target).form
                          .querySelectorAll(
                            'input[type="checkbox"][data-checkbox-exclusive-group="'.concat(
                              t.getAttribute("data-checkbox-exclusive-group"),
                              '"]'
                            )
                          )
                          .forEach(function (e) {
                            t.form === e.form && e !== t && (e.checked = !1);
                          }),
                        h(t))
                      : (function (e) {
                          e.form
                            .querySelectorAll(
                              'input[type="checkbox"][data-checkbox-exclusive][data-checkbox-exclusive-group="'.concat(
                                e.getAttribute("data-checkbox-exclusive-group"),
                                '"]'
                              )
                            )
                            .forEach(function (t) {
                              e.form === t.form && (t.checked = !1);
                            }),
                            h(e);
                        })(e.target));
              };
            "onpageshow" in window
              ? window.addEventListener("pageshow", function () {
                  return e.forEach(function (e) {
                    return h(e);
                  });
                })
              : window.addEventListener("DOMContentLoaded", function () {
                  return e.forEach(function (e) {
                    return h(e);
                  });
                }),
              e.forEach(function (e) {
                return h(e);
              }),
              e.forEach(function (e) {
                e.addEventListener("change", t);
              });
          })(),
          (function () {
            if ("boolean" != typeof document.createElement("details").open) {
              var e = document.querySelectorAll("details");
              e.length &&
                e.forEach(function (e, t) {
                  e.hasAttribute("nhsuk-polyfilled") ||
                    (function (e, t) {
                      e.setAttribute("nhsuk-polyfilled", "true"),
                        e.id || e.setAttribute("id", "nhsuk-details".concat(t));
                      var n = document.querySelector(
                        "#".concat(e.id, " .nhsuk-details__text")
                      );
                      n.id ||
                        n.setAttribute("id", "nhsuk-details__text".concat(t));
                      var i = document.querySelector(
                        "#".concat(e.id, " .nhsuk-details__summary")
                      );
                      i.setAttribute("role", "button"),
                        i.setAttribute("aria-controls", n.id),
                        i.setAttribute("tabIndex", "0"),
                        1 == (null !== e.getAttribute("open"))
                          ? (i.setAttribute("aria-expanded", "true"),
                            n.setAttribute("aria-hidden", "false"))
                          : (i.setAttribute("aria-expanded", "false"),
                            n.setAttribute("aria-hidden", "true"),
                            (n.style.display = "none")),
                        i.addEventListener("click", function () {
                          c(i, "aria-expanded"),
                            c(n, "aria-hidden"),
                            (n.style.display =
                              "true" === n.getAttribute("aria-hidden")
                                ? "none"
                                : ""),
                            e.hasAttribute("open")
                              ? e.removeAttribute("open")
                              : e.setAttribute("open", "open");
                        }),
                        i.addEventListener("keydown", function (e) {
                          (13 !== e.keyCode && 32 !== e.keyCode) ||
                            (e.preventDefault(), i.click());
                        });
                    })(e, t);
                });
            }
          })(),
          (function () {
            var e = (
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {}
              ).focusOnPageLoad,
              t = void 0 === e || e,
              n = document.querySelector(".nhsuk-error-summary");
            n && (t && n.focus(), n.addEventListener("click", d));
          })(),
          (n = document.querySelector("#toggle-menu")),
          (i = document.querySelector("#close-menu")),
          (a = document.querySelector("#header-navigation")),
          (o = function (e) {
            e.preventDefault(),
              c(n, "aria-expanded"),
              n.classList.toggle("is-active"),
              a.classList.toggle("js-show");
          }),
          n &&
            i &&
            a &&
            [n, i].forEach(function (e) {
              e.addEventListener("click", o);
            }),
          (function () {
            var e = document.querySelector("#toggle-search"),
              t = document.querySelector("#close-search"),
              n = document.querySelector("#wrap-search"),
              i = document.querySelector("#content-header"),
              a = function (t) {
                t.preventDefault(),
                  c(e, "aria-expanded"),
                  e.classList.toggle("is-active"),
                  n.classList.toggle("js-show"),
                  i.classList.toggle("js-show");
              };
            e &&
              t &&
              [e, t].forEach(function (e) {
                e.addEventListener("click", a);
              });
          })(),
          (function () {
            var e = document.querySelectorAll(
                ".nhsuk-radios--conditional .nhsuk-radios__input"
              ),
              t = function () {
                e.forEach(function (e) {
                  return l(e, "nhsuk-radios__conditional--hidden");
                });
              };
            "onpageshow" in window
              ? window.addEventListener("pageshow", t)
              : window.addEventListener("DOMContentLoaded", t),
              t(),
              e.forEach(function (e) {
                e.addEventListener("change", t);
              });
          })(),
          (e = document.querySelector("h1")),
          (t = document.querySelector(".nhsuk-skip-link")),
          e &&
            t &&
            (t.addEventListener("click", function (t) {
              t.preventDefault(), e.setAttribute("tabIndex", "-1"), e.focus();
            }),
            e.addEventListener("blur", function (t) {
              t.preventDefault(), e.removeAttribute("tabIndex");
            })),
          (function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.namespace,
              n = void 0 === t ? "nhsuk-tabs" : t,
              i = e.responsive,
              a = void 0 === i || i,
              r = e.historyEnabled,
              o = void 0 === r || r;
            document
              .querySelectorAll('[data-module="'.concat(n, '"]'))
              .forEach(function (e) {
                new v(e, n, a, o).init();
              });
          })();
      });
  })();
})();
