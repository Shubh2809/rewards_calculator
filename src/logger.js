import log from 'loglevel';

const logger = log.getLogger('app-logger');

logger.setLevel(process.env.NODE_ENV === 'development' ? 'debug' : 'warn'); // Set the logging level (trace, debug, info, warn, error, silent)

export default logger;
