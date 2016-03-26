'use strict';
let test = require('tape');
let index = require('../index');

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

test('latest-tweets returns valid JSON', function (assert) {
  let responseJSON = JSON.stringify(index.main());
  assert.true(IsJsonString(responseJSON));
  assert.end();
});




