/* 
let store = new StoreData();
store.add('name', 'joe');
store.add('age', 30);
console.log(store.has('age'));    // return true
console.log(store.has('animal')); // return false
store.add('name', 'emma');
store.on('change:name', (old_val, new_val, key)=>{console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`)});
store.add('name', 'john');
store.on('age', (old_val, new_val, key)=>{console.log(`old ${key}: ${old_val}, new ${key}: ${new_val}`)});
store.add('age', 26);
store.on('change:age', (old_val, new_val, key)=>{console.log(`${old_val > new_val ? 'older now' : ''}`)});
store.add('age', 28);
store.add('age', 45);


*/

class DataStore {
  constructor() {
    this.store = {};
    this.changeEvents = {};
    this.globalEvents = {};
  }

  add(key, value) {
    if (key in this.changeEvents) {
      if (this.globalEvents[key] !== value) {
        const callbacks = this.changeEvents[key];
        const oldVal = this.store[key];
        for (let cb of callbacks) {
          cb(oldVal, value, key);
        }
      }
    }

    if (key in this.globalEvents) {
      const callbacks = this.globalEvents[key];
      const oldVal = this.store[key];
      for (let cb of callbacks) {
        cb(oldVal, value, key);
      }
    }
    this.store[key] = value;
  }

  has(key) {
    return key in this.store;
  }

  on(event, callback) {
    const idx = event.indexOf(':');
    if (idx !== -1) {
      const key = event.slice(idx + 1);
      if (!(key in this.changeEvents)) this.changeEvents[key] = [];
      this.changeEvents[key].push(callback);
    } else {
      if (!(event in this.globalEvents)) this.globalEvents[event] = [];
      this.globalEvents[event].push(callback);
    }
  }
}

const ds = new DataStore();
console.log(`ds.add('name', 'Joe')`);
ds.add('name', 'Joe');
console.log(`ds.has("name") = ${ds.has('name')}`);

console.log(`ds.add('age', 30)`);
ds.add('age', 30);
console.log(`ds.has("age") = ${ds.has('age')}`);

console.log(`Sub change:name event`);
ds.on('change:name', (oldVal, newVal, key) => {
  console.log(`The ${key} changes from ${oldVal} to ${newVal}`);
});

console.log(`ds.add('name', 'Tom')`);
ds.add('name', 'Tom');

console.log(`Sub name event`);
ds.on('name', (oldVal, newVal, key) => {
  console.log(`Set ${key} to ${newVal}. The old value is ${oldVal}`);
});

console.log(`ds.add('name', 'Nick')`);
ds.add('name', 'Nick');
