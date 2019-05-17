'use strict';
function _interopDefault(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e;
}
var React = _interopDefault(require('react')),
  reactDom = require('react-dom'),
  computeLayout = _interopDefault(require('css-layout'));
function _defineProperty(e, t, r) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function _objectSpread(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = null != arguments[e] ? arguments[e] : {},
      n = Object.keys(r);
    'function' == typeof Object.getOwnPropertySymbols &&
      (n = n.concat(
        Object.getOwnPropertySymbols(r).filter(function(e) {
          return Object.getOwnPropertyDescriptor(r, e).enumerable;
        }),
      )),
      n.forEach(function(e) {
        _defineProperty(t, e, r[e]);
      });
  }
  return t;
}
function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function');
}
function _defineProperties(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    (n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(e, n.key, n);
  }
}
function _createClass(e, t, r) {
  return (
    t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e
  );
}
function _typeof2(e) {
  return (_typeof2 =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(e) {
          return typeof e;
        }
      : function(e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        })(e);
}
function _typeof(e) {
  return (_typeof =
    'function' == typeof Symbol && 'symbol' === _typeof2(Symbol.iterator)
      ? function(e) {
          return _typeof2(e);
        }
      : function(e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : _typeof2(e);
        })(e);
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function _possibleConstructorReturn(e, t) {
  return !t || ('object' !== _typeof(t) && 'function' != typeof t)
    ? _assertThisInitialized(e)
    : t;
}
function _getPrototypeOf(e) {
  return (_getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function(e) {
        return e.__proto__ || Object.getPrototypeOf(e);
      })(e);
}
function _setPrototypeOf(e, t) {
  return (_setPrototypeOf =
    Object.setPrototypeOf ||
    function(e, t) {
      return (e.__proto__ = t), e;
    })(e, t);
}
function _inherits(e, t) {
  if ('function' != typeof t && null !== t)
    throw new TypeError('Super expression must either be null or a function');
  (e.prototype = Object.create(t && t.prototype, {
    constructor: {value: e, writable: !0, configurable: !0},
  })),
    t && _setPrototypeOf(e, t);
}
var Flexbox = (function() {
  function t() {
    var e;
    return (
      _classCallCheck(this, t),
      ((e = _possibleConstructorReturn(
        this,
        _getPrototypeOf(t).call(this),
      )).childRefs = []),
      (e.shouldUpdateAgain = !1),
      (e.state = {layout: {children: []}}),
      e
    );
  }
  return (
    _inherits(t, React.Component),
    _createClass(t, [
      {
        key: 'componentDidMount',
        value: function() {
          this.forceUpdate();
        },
      },
      {
        key: 'componentDidUpdate',
        value: function() {
          if (
            ((this.shouldUpdateAgain = !this.shouldUpdateAgain),
            this.shouldUpdateAgain)
          ) {
            var e = this.props,
              t = e.children,
              r = e.onLayout,
              n = e.style,
              o = this.getChildrenMeasured(this.childRefs),
              i = this.getFlattenedChildren(t),
              u = this.getChildrenAsMergedStyles(i, o),
              c = this.getComputedLayout(u, n);
            r(c), this.setState({layout: c});
          }
        },
      },
      {
        key: 'getFlattenedChildren',
        value: function(e) {
          return e
            .filter(function(e) {
              return e;
            })
            .filter(function(e) {
              return 'string' != typeof e;
            })
            .map(function(e) {
              return Array.isArray(e) ? e : [e];
            })
            .reduce(function(e, t) {
              return e.concat(t);
            }, []);
        },
      },
      {
        key: 'getChildrenAsMergedStyles',
        value: function(o, e) {
          return e.map(function(e, t) {
            var r = o[t] || {},
              n = r && r.props ? r.props.style : {};
            return {
              style: _objectSpread({}, n, {
                height: e.height || n.height,
                width: e.width || n.width,
              }),
            };
          });
        },
      },
      {
        key: 'getChildrenMeasured',
        value: function(e) {
          return e && e.length
            ? e.map(function(e) {
                return e.getBBox
                  ? e.getBBox()
                  : reactDom.findDOMNode(e).getBBox();
              })
            : [];
        },
      },
      {
        key: 'getComputedLayout',
        value: function(e, t) {
          var r = {children: Array.from(e || []), style: _objectSpread({}, t)};
          return computeLayout(r), r;
        },
      },
      {
        key: 'getLayoutChildren',
        value: function(e) {
          return e && e.children && e.children.length ? e.children : [];
        },
      },
      {
        key: 'getLayoutAttributesForChild',
        value: function(e, t) {
          if (t && t.layout) {
            var r = t.layout,
              n = r.left,
              o = r.top;
            switch (e.type) {
              case 'circle':
                var i = e.props.r || 0;
                return {cx: n + i, cy: o + i};
              case 'ellipse':
                return {cx: n + (e.props.rx || 0), cy: o + (e.props.ry || 0)};
              case 'g':
              case 'path':
              case 'polygon':
              case 'polyline':
                return {transform: 'translate('.concat(n, ' ').concat(o, ')')};
              default:
                return {x: n, y: o};
            }
          }
          return {};
        },
      },
      {
        key: 'render',
        value: function() {
          var r = this,
            e = this.props,
            t = e.children,
            n = e.className,
            o = e.x,
            i = e.y,
            u = this.state.layout;
          this.childRefs = [];
          var c = this.getFlattenedChildren(t),
            a = this.getLayoutChildren(u);
          return React.createElement(
            'g',
            {
              className: n,
              transform: 'translate('.concat(o, ' ').concat(i, ')'),
            },
            c.map(function(e, t) {
              return React.cloneElement(
                e,
                _objectSpread(
                  {},
                  e.props,
                  r.getLayoutAttributesForChild(e, a[t]),
                  {
                    key: 'child-'.concat(t),
                    ref: function(e) {
                      return e ? r.childRefs.push(e) : null;
                    },
                  },
                ),
              );
            }),
          );
        },
      },
    ]),
    t
  );
})();
(Flexbox.defaultProps = {
  children: [],
  className: null,
  onLayout: function() {},
  style: {},
  x: 0,
  y: 0,
}),
  (module.exports = Flexbox);
