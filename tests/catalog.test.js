import {match,services} from '../src/catalog.js';
import {test} from 'node:test';import assert from 'node:assert/strict';
test('limits are strict and formats isolated',()=>{for(const guests of [1,2]) for(const time of [100,120,180]) for(const budget of [3000,6000,11000]) {const r=match({guests,time,budget});assert.ok(r.length<=3);assert.ok(r.every(s=>s.guests===guests&&s.minutes<=time&&s.price<=budget))}});
test('no fabricated match',()=>assert.deepEqual(match({guests:2,budget:100}),[]));
test('stable unique IDs',()=>assert.equal(new Set(services.map(s=>s.id)).size,services.length));
