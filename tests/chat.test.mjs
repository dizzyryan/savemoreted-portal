import assert from 'node:assert/strict';
import { test } from 'node:test';
import { replyToDemoMessage } from '../src/chat.ts';

test('free-text eye pain starts a symptom follow-up', () => {
  const reply = replyToDemoMessage('My eyes hurt when I look left');
  assert.equal(reply.topic, 'pain');
  assert.match(reply.text, /moving your eyes/i);
  assert.equal(reply.support, null);
});

test('double vision and daily-life descriptions use distinct follow-ups', () => {
  assert.equal(replyToDemoMessage('I am seeing double').topic, 'diplopia');
  assert.equal(replyToDemoMessage('It makes reading difficult').topic, 'impact');
});

test('distress examples take precedence over eye symptoms', () => {
  assert.equal(replyToDemoMessage('My eyes hurt and I feel worried').support, 'mild');
  assert.equal(replyToDemoMessage('I feel overwhelmed and cannot cope').support, 'moderate');
  assert.equal(replyToDemoMessage('I want to kill myself because of this pain').support, 'crisis');
});

test('a crisis preview remains paused for a subsequent ordinary message', () => {
  const reply = replyToDemoMessage('My eyes hurt', { topic: null, support: 'crisis' });
  assert.equal(reply.support, 'crisis');
  assert.equal(reply.topic, null);
});

test('unknown text asks for clarification without inventing a diagnosis', () => {
  const reply = replyToDemoMessage('Can you explain more?');
  assert.equal(reply.topic, null);
  assert.equal(reply.support, null);
  assert.match(reply.text, /tell me more/i);
});
