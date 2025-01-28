import { it } from 'vitest';

it('should have a correct stack trace in browser mode', () => {
  const error = new Error();
  console.log(error.stack);
});

it('should have a correct `console.trace` output in browser mode', () => {
  console.trace('Trace');
});
