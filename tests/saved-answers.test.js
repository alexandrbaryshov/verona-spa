import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validSavedAnswers} from '../src/saved-answers.js';
test('saved selections reject removed options and corrupt budgets',()=>{
  const valid={guests:'2',time:'150',budget:'7000'};
  assert.equal(validSavedAnswers(valid),true);
  assert.equal(validSavedAnswers({...valid,budget:''}),true);
  for(const change of [{guests:'3'},{time:'999'},{budget:'-1'},{budget:'Infinity'},{budget:'3.5'},{budget:7000}]) assert.equal(validSavedAnswers({...valid,...change}),false);
  for(const bad of [null,{},[],{guests:'1'}]) assert.equal(validSavedAnswers(bad),false);
});
