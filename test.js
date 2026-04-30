var test = require("node:test");
var assert = require("node:assert/strict");
var detector = require("./index.js");

/**
 * Extract the iso code from the result as the result looks like this
 * [
 *   {
 *     iso3166: 'PE',
 *     matches: [
 *       'Pérou'
 *     ],
 *     name: 'Peru',
 *     type: 'country'
 *   }
 * ]
 */
function extractIsoCodes(results) {
	return results.map(function (r) { return r.iso3166; });
}

test("French 'Pérou' detects PE", function () {
	var result = detector.detect("Je voyage au Pérou");
	assert.ok(extractIsoCodes(result).includes("PE"), "expected PE in " + JSON.stringify(extractIsoCodes(result)));
});

test("Czech 'Severní Korea' detects KP", function () {
	var result = detector.detect("Severní Korea");
	assert.ok(extractIsoCodes(result).includes("KP"), "expected KP in " + JSON.stringify(extractIsoCodes(result)));
});

test("French 'Sainte-Hélène' detects SH", function () {
	var result = detector.detect("Sainte-Hélène");
	assert.ok(extractIsoCodes(result).includes("SH"), "expected SH in " + JSON.stringify(extractIsoCodes(result)));
});

test("French 'la Serbie' detects RS exactly once (no duplicate)", function () {
	var result = detector.detect("la Serbie");
	var rs = result.filter(function (r) { return r.iso3166 === "RS"; });
	assert.equal(rs.length, 1, "expected exactly one RS entry, got " + rs.length);
});

test("'North Korea' detects KP", function () {
	var result = detector.detect("North Korea");
	assert.ok(extractIsoCodes(result).includes("KP"), "expected KP in " + JSON.stringify(extractIsoCodes(result)));
});

test("'Saint Helena' detects SH", function () {
	var result = detector.detect("Saint Helena");
	assert.ok(extractIsoCodes(result).includes("SH"), "expected SH in " + JSON.stringify(extractIsoCodes(result)));
});

test("'Peru' detects PE", function () {
	var result = detector.detect("Peru");
	assert.ok(extractIsoCodes(result).includes("PE"), "expected PE in " + JSON.stringify(extractIsoCodes(result)));
});

test("'Serbia' detects RS", function () {
	var result = detector.detect("Serbia");
	assert.ok(extractIsoCodes(result).includes("RS"), "expected RS in " + JSON.stringify(extractIsoCodes(result)));
});
