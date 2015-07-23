/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 *
 * expansio : Yet Another minimalistic but quite fast string expansion (or string interpolation) tool.
 *
 * Micro sized : 594 Bytes minified/gzipped.
 *
 * Whole-in-one AMD, CommonJS or global module.
 *
 * - no new Function(...)
 * - pipe operator for disjonctions
 * - accept immediate string surrounded by ''
 * - concatenation between operands (variable or immediate string) with '+' operator
 * - variable paths are resolved (aka my.nested.property)
 *
 * @example
 *		var interpolated = expansio.interpolate("hello { name }", { name:"John" }); 
 *		// hello John
 *
 * @example
 *		var interpolated = expansio.interpolate("hello { title | 'dear ' + name } - { address.zip }", { title:null, name:"Mary", address:{ zip:1000 } });
 *		// hello dear Mary - 1000
 */
(function(define) {
	"use strict";
	define([], function() {
		function fromPath(object, path) {
			var parts = path.split("."),
				tmp = object;
			while (parts.length > 1) {
				var part = parts.shift();
				if (!tmp[part])
					return undefined;
				tmp = tmp[part];
			}
			if (tmp)
				return tmp[parts.shift()];
			else return undefined;
		}
		// var toReplace = /\{\s*([^\}]+)\}/g,
		// 	toDisjonction = /\s*\|\s*/,
		// 	toConcatenate = /\s*\+\s*/;		
		var expansio = {
			// un-recursive fast string interpolation
			interpolate: function(string, context) {
				if (!context)
					return expansio.interpolate.bind(null, string);
				var count = string.indexOf('{');
				if (count == -1)
					return string;
				var parsed = string.substring(0, count),
					ln = string.length;
				count++;
				while (count < ln) {
					var terms = [],
						cur = string[count],
						toAnalyse = "";
					while (count < ln && cur != '}' && cur != '|') {
						if (cur == "+") {
							terms.push(toAnalyse);
							toAnalyse = "";
						} else if (cur == "'") {
							var end = string.indexOf("'", count + 1);
							toAnalyse = string.substring(count, end);
							count = end;
						} else if (cur != ' ')
							toAnalyse += cur;
						cur = string[++count];
					}
					terms.push(toAnalyse);
					var isOr = (string[count] == '|');
					if (string[count] == '}' || isOr) {
						var val = null;
						for (var i = 0; i < terms.length; ++i) {
							toAnalyse = terms[i];
							if (toAnalyse[0] == "'") {
								if (i === 0)
									val = toAnalyse.substring(1);
								else
									val += toAnalyse.substring(1);
							} else {
								if (i === 0)
									val = fromPath(context, toAnalyse);
								else
									val += fromPath(context, toAnalyse);
								if (val && val.forEach)
									val = val.join(",");
							}
							if (!val)
								break;
						}
						if (val) {
							parsed += val;
							if (isOr)
								count = string.indexOf('}', count);
						}
						count++;
						if (!val && isOr)
							continue;
					}
					while (count < ln && string[count] != '{')
						parsed += string[count++];
					if (string[count] == '{')
						count++;
				}
				return parsed;
			},
			/*
			// more short but less fast method that do exactly the same
			interpolate2: function(string, data) {
				return string.replace(toReplace, function(match, inner) {
					var disjonctions = inner.split(toDisjonction);
					for (var i = 0, len = disjonctions.length; i < len; ++i) {
						var result = "",
							operands = disjonctions[i].split(toConcatenate);
						for (var j = 0, len2 = operands.length; j < len2; ++j) {
							var operand = operands[j].trim();
							if (operand == "+")
								continue;
							if (operand[0] === "'") {
								result += operand.substring(1, operand.length - 1);
								continue;
							}
							var value = fromPath(data, operand);
							if (!value && value !== false && !result.length)
								break;
							result += value;
						}
						if (result.length)
							return result;
					}
				});
			},*/
			isInterpolable: function(string) {
				return (string.indexOf('{') > -1);
			}
		};

		return expansio;
	});
})(typeof define !== 'undefined' ? define : function(deps, factory) { // AMD/RequireJS format if available
	if (typeof module !== 'undefined')
		module.exports = factory(); // CommonJS environment
	else if (typeof window !== 'undefined')
		window.expansio = factory(null); // raw script, assign to c3po global
	else
		console.warn('expansio has not been mounted somewhere.');
});
