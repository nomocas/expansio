/**
 * @author Gilles Coomans <gilles.coomans@gmail.com>
 *
 */

if (typeof require !== 'undefined')
	var chai = require("chai"),
		expansio = require("../index");

var expect = chai.expect;

describe("base", function() {

	describe("interpolation full", function() {
		var output = expansio.interpolate("hello { title | 'dear ' + name } - { address.zip }", {
			title: null,
			name: "Mary",
			address: {
				zip: 1000
			}
		});
		it("should", function() {
			expect(output).to.equal("hello dear Mary - 1000");
		});
	});

});
