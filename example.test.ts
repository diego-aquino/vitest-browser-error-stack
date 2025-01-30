import { it, vi } from 'vitest';

it.only('should have a correct stack trace in browser mode', () => {
  const overrideStack = 'Error: Override stack';

  Object.defineProperty(Error.prototype, 'stack', {
    get: () => overrideStack,
  });

  const error = new Error();
  throw error;
});

it('should have a correct `console.trace` output in browser mode', () => {
  console.trace('Trace');
});
