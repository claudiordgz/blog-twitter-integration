
export function getTimeInSeconds() {
  return Date.now() / 1000 | 0;
}

export function parseJSON(payload) {
  let o = JSON.parse(payload);
  if (o && typeof o === 'object' && o !== null) {
    return o;
  }
  throw new Error('Object is null');
}

export function skeletonConfig(userName) {
  let a = {
    user: userName,
    bearerToken: '',
    timeStamp: getTimeInSeconds(),
    userTimeline: '',
    refreshTime: 999
  };
  return a;
}

export function mergeDicts(sourceDict, destDict) {
  let mergeCheck = sourceDict;
  for (let key in mergeCheck) {
    if (mergeCheck.hasOwnProperty(key)) {
      if (!destDict.hasOwnProperty(key)) {
        destDict[key] = mergeCheck[key];
      }
    }
  }
}

export function isEmpty(str) {
  return (!str || str.length === 0);
}

