let Rx = require('rx'),
  test = require('tape');

test('Rx Test - Hello World', function(assert) {
  'use strict';
  let testStr,
    testRx = Rx.Observable.just('Hello World').subscribe((value) => testStr = value);
  assert.equal(testStr, 'Hello World', '= String is Hello World');
  assert.end();
});

test('Rx Test - Array example', function(assert) {
  'use strict';
  let testArray = [],
    testBedArray = ['Charlie', 'Tango', 'Alpha', 'Omega', 'Beta'],
    testObservable = Rx.Observable
      .fromArray(testBedArray)
      .subscribe(
        (x) => testArray.push(x),       // onNext
        (err) => console.log('Error: ' + err),  // onError
        () => console.log('Completed')          // onCompleted
      );
  assert.deepEqual(testBedArray, testArray, '= onNext append to Array');
  assert.end();
});

test('Rx Test - Average', function(assert) {
  'use strict';
  let testRange = 500,
    testCorrectResult = (testRange / 2) + 0.5,
    testResult,
    avg = Rx.Observable.range(1, testRange)
      .reduce((prev, curr) => ({
        sum: prev.sum + curr,
        count: prev.count + 1
      }), {
        sum: 0,
        count: 0
      })
      .map((o) => o.sum / o.count),
    subscription = avg.subscribe((x) => testResult = x);
  subscription.dispose();
  assert.isEqual(testCorrectResult, testResult, '= Average Test should return average of range(1, 500)');
  assert.end();
});


function getJSON(arr) {
  return Rx.Observable.from(arr).map((str) => JSON.parse(str));
}

test('Rx Test - Error catch', function(assert) {
  'use strict';
  let errorletiable = false,
    subscription = getJSON(['{"1": 1, "2": 2}', '{"1: 1}']).catch(
    Rx.Observable.return({
      error: 'There was an error parsing JSON',
      errorletiable: (errorletiable = true)
    })
  );
  subscription.subscribe(
        (json) =>  console.log(json),
        (e) =>  e.message
  );
  assert.ok(errorVariable, '= true proves error worked');
  assert.end();
});
