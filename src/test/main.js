var test = require('tape');
var module = require('../main');

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

test('latest-tweets returns valid JSON', function (assert) {
    var responseJSON = JSON.stringify(module.main());
    assert.true(IsJsonString(responseJSON));
    assert.end();
});




