/* eslint-disable prefer-rest-params */
import { format, createLogger, transports } from 'winston';
import path from 'path';

const {
  combine, colorize, timestamp: timeStamp, prettyPrint, printf,
} = format;

const PROJECTROOT = path.join(__dirname, '..');

/**
 * Extracts useful stack trace information
 * @param {integer} stackIndex
 * @returns {object} object containing file and line number details
 */
const getStackInfo = (stackIndex) => {
  const stacklist = (new Error()).stack.split('\n').slice(3);
  // this code is from google code
  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;

  const s = stacklist[stackIndex];
  const sp = stackReg.exec(s);

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECTROOT, sp[2]),
      line: sp[3],
      file: path.basename(sp[2]),
      stack: stacklist.join('\n'),
    };
  }
  return undefined;
};

/**
 * Adds Stack information to argument object
 * @param {object} args
 * @return {object} updated argumnet object
 */
const formatLogArguments = (args) => {
  const newArgs = Array.prototype.slice.call(args);
  const stackInfo = getStackInfo(1);

  if (stackInfo) {
    const calleeStr = `(${stackInfo.relativePath}:${stackInfo.line})`;

    if (typeof args[0] === 'string') {
      // handle string
      newArgs[0] = `${newArgs[0]} ${calleeStr}`;
    } else if (typeof args[0] === 'object') {
      // handle error object
      newArgs[0].message = `${newArgs[0].message} ${calleeStr}`;
    }
  }

  return newArgs;
};

const myFormat = printf(({
  level, message, timestamp,
}) => `${timestamp} ${level}: ${message}`);

const logger = createLogger({
  format: combine(
    timeStamp({
      format: 'YYYY-MM-DD h:mm:ssa',
    }),
    prettyPrint({
      colorize: true,
    }),
    colorize({
      colors: {
        info: 'green',
        error: 'red',
        debug: 'blue',
      },
      message: true,
    }),
    myFormat,
  ),
  transports: [new transports.Console()],
});

logger.exitOnError = false;

export function info() {
  logger.info(...formatLogArguments(arguments));
}

export function error() {
  logger.error(...formatLogArguments(arguments));
}
export default logger;
