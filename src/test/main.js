let test = require('tape');
let module = require('../main');

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

test('latest-tweets returns valid JSON', function (assert) {
  let responseJSON = JSON.stringify(module.main());
  assert.true(IsJsonString(responseJSON));
  assert.end();
});
