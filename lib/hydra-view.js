'use strict';

var Immutable = require('immutable');
var im = Immutable.fromJS;
var Map = Immutable.Map;
var List = Immutable.List;
var trace = require('./trace');

module.exports = {
  operation: {
    PUT: function PUT(x) {
      return module.exports.link('operation', module.exports.resource(Map({
        method: 'PUT',
        '@type': 'ReplaceResourceOperation'
      }), x));
    },

    DELETE: function DELETE(x) {
      return module.exports.link('operation', module.exports.resource(Map({
        method: 'DELETE',
        '@type': 'DeleteResourceOperation'
      }), x));
    },

    POST: function POST(x) {
      return module.exports.link('operation', module.exports.resource(Map({
        method: 'POST',
        '@type': 'CreateResourceOperation' }), x));
    } },

  link: function link(name, resource) {
    var x = Map().set(name, resource);
    x._linkName = name;
    return x;
  },

  resource: function resource() {
    for (var _len = arguments.length, resources = Array(_len), _key = 0; _key < _len; _key++) {
      resources[_key] = arguments[_key];
    }

    return Immutable.List(resources).reduce(function (x, y) {
      return x.mergeDeep(y);
    }, Map());
  }

};

// Add the ability to union two links together
module.exports.link.union = function (link1, link2) {
  var name1 = link1._linkName;
  var name2 = link2._linkName;

  if (name1 === name2) {
    var val1 = link1.get(name1);
    var val2 = link2.get(name2);
    return link1.set(name1, List.of(val1, val2));
  } else {
    return link1.mergeDeep(link2);
  }
};
