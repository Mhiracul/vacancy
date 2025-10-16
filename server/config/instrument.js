// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
Sentry.init({
  dsn: "https://270a366e2909bd3337defcc33f9aac15@o4510175943589888.ingest.us.sentry.io/4510175946932224",
  integrations: [Sentry.mongooseIntegration()], // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
