import {match,services} from '../src/catalog.js';
import {test} from 'node:test';import assert from 'node:assert/strict';
test('limits are strict and formats isolated',()=>{for(const guests of [1,2]) for(const time of [100,120,180]) for(const budget of [3000,6000,11000]) {const r=match({guests,time,budget});assert.ok(r.length<=3);assert.ok(r.every(s=>s.guests===guests&&s.minutes<=time&&s.price<=budget))}});
test('no fabricated match',()=>assert.deepEqual(match({guests:2,budget:100}),[]));
test('stable unique IDs',()=>assert.equal(new Set(services.map(s=>s.id)).size,services.length));

test('known affordable solo programs produce concrete results',()=>assert.deepEqual(match({guests:1,time:100,budget:3000}).map(s=>s.name),['Уединение','Для него']));
test('persisted IDs identify services independently of catalogue ordering',()=>{
  const reordered=[...services].reverse();
  assert.equal(reordered.find(s=>s.id==='solitude').name,'Уединение');
  assert.equal(reordered.find(s=>s.id==='double-chocolate').name,'Двойной шоколад');
  assert.ok(services.every(s=>!/^spa-\d+$/.test(s.id)));
});
