import omitBy from 'lodash/omitBy';
import isObject from 'lodash/isObject';

const omitByDeep = (obj, cb) => {
  let res = omitBy(obj, cb);
  for (let key in res){
    if (isObject(res[key])){
      res[key] = omitByDeep(res[key], cb);
    }
  }
  return res;
}

export default omitByDeep
