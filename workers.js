// @flow
import { workerServer, MINUTE, heretic } from "distraught";

exports.startWorkerServer = () => {
  const debug = process.env.WORKER_DEBUG;
  const server = workerServer({
    heretic: heretic.est,
    requiredEnv: [],
    queues: [
      {
        name: "test.queue",
        concurrency: 1,
        handler: testDequeue,
        isEnabled: true,
        alertAt: MINUTE,
        killAt: MINUTE * 2,
        debug,
      },
    ],
  });
  server.start();
};

async function testDequeue(
  job: { payload: Object },
  message: any,
  done: Function
) {
  return done();
}
