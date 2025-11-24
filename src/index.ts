import logger from "jet-logger";
import { connect } from "mongoose";

import ENV from "@src/common/constants/ENV";
import server from "./server";

/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MSG =
  "Express server started on port: " + ENV.Port.toString();

/******************************************************************************
                                  Run
******************************************************************************/

// Start the server
connect(ENV.Mongodb).then(() =>
  server.listen(ENV.Port, () => logger.info(SERVER_START_MSG))
);