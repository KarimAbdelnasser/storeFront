import express from 'express';
import routes from './startup/routes';

const app: express.Application = express();
const address = '3000';

routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
