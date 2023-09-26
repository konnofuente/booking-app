export function deleteEmptyKeys(o) {
  for (var k in o) {
    if (!o[k] || typeof o[k] !== "object") {
      continue
    }
    deleteEmptyKeys(o[k]); 
    if (Object.keys(o[k]).length === 0) {
      delete o[k];
    }
  }
    return o;
}
export const deepSearchReplace = (obj, keyName, replacer) => {
  for (const key in obj) {
      if (key == keyName) {
        console.log(`found ${key} , ${keyName}`)
          obj[key] = replacer;
      } else if (Array.isArray(obj[key])) {
          (obj[key]).forEach(member => {
            console.log(member)
            return deepSearchReplace(member, keyName, replacer)});
      } else if (typeof obj[key] === "object") {
        deepSearchReplace(obj[key], keyName, replacer);
      }
  }
  return obj
};

export const generateRandom = (min = 0, max = 100)=>{

  let difference = max - min;

  let rand = Math.random();

  rand = Math.round( rand * difference);

  rand = rand + min;

  return rand;
}
