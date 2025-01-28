# Vitest `error.stack` in browser mode

## Getting started

1. Clone the repository:

   ```bash
   git clone git@github.com:diego-aquino/vitest-browser-error-stack.git
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

## Reproduction

1. Run the test suite in browser mode:

   ```bash
   pnpm test
   ```

   Notice how the stack trace printed in the first test does not exactly point to where the error was created.

   ```
   Error
      at http://localhost:63315/home/diegoaquino/www/vitest-issues/vitest-browser-error-stack/example.test.ts?import&browserv=1738023836009:3:17
      at http://localhost:63315/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js?v=3bd56393:174:14
      at http://localhost:63315/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js?v=3bd56393:561:28
      at http://localhost:63315/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js?v=3bd56393:61:24
      at new Promise (<anonymous>)
      at runWithTimeout (http://localhost:63315/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js?v=3bd56393:41:12)
      at runTest (http://localhost:63315/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js?v=3bd56393:1140:17)
      at async runSuite (http://localhost:63315/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js?v=3bd56393:1294:15)
      at async runFiles (http://localhost:63315/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js?v=3bd56393:1351:5)
      at async startTests (http://localhost:63315/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js?v=3bd56393:1361:3)
   ```

2. Disable browser mode in `vitest.config.mts`:

   ```diff
   -// environment: 'node',
   +environment: 'node',
   -browser: {
   -  instances: [{ browser: 'chromium' }],
   -  provider: 'playwright',
   -  enabled: true,
   -  headless: true,
   -},
   +// browser: {
   +//   instances: [{ browser: 'chromium' }],
   +//   provider: 'playwright',
   +//   enabled: true,
   +//   headless: true,
   +// },
   ```

3. Re-run the test suite:

   ```bash
   pnpm test
   ```

   Differently from the browser mode, the stack trace is now correct:

   ```
   Error:
      at /home/diegoaquino/www/vitest-issues/vitest-browser-error-stack/example.test.ts:4:17
      at file:///home/diegoaquino/www/vitest-issues/vitest-browser-error-stack/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js:174:14
      at file:///home/diegoaquino/www/vitest-issues/vitest-browser-error-stack/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js:561:28
      at file:///home/diegoaquino/www/vitest-issues/vitest-browser-error-stack/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js:61:24
      at new Promise (<anonymous>)
      at runWithTimeout (file:///home/diegoaquino/www/vitest-issues/vitest-browser-error-stack/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js:41:12)
      at runTest (file:///home/diegoaquino/www/vitest-issues/vitest-browser-error-stack/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js:1140:17)
      at processTicksAndRejections (node:internal/process/task_queues:105:5)
      at runSuite (file:///home/diegoaquino/www/vitest-issues/vitest-browser-error-stack/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js:1294:15)
      at runFiles (file:///home/diegoaquino/www/vitest-issues/vitest-browser-error-stack/node_modules/.pnpm/@vitest+runner@3.0.4/node_modules/@vitest/runner/dist/index.js:1351:5)
   ```
