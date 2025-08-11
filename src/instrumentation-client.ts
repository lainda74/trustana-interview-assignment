// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://0a1af0fe786b85119bb2b33030d1c885@o4508784147169280.ingest.us.sentry.io/4509798365200384",
  tracesSampleRate: 1.0,
  integrations: [
    Sentry.replayIntegration(),
  ],
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;