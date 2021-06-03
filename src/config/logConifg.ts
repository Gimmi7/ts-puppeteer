import log4js, { Logger } from 'log4js';
import config from '@/resources/application';

const logPath: string = `/data/logs/${config.server.name}`;


log4js.configure({
  appenders: {
    "console": { type: 'console' },
    'fileInfo': { type: 'file', filename: logPath + '.log', maxLogSize: 52428800, keepFileExt: true },
    "fileWarn": { type: 'file', filename: logPath + "_err.log", maxLogSize: 5248800, keepFileExt: true },
    "infoAppender": { type: "logLevelFilter", appender: 'fileInfo', level: 'info' },
    "warnAppender": { type: "logLevelFilter", appender: 'fileWarn', level: 'warn' },
  },
  categories: {
    "default": { appenders: ["console", "infoAppender", "warnAppender"], level: "debug", enableCallStack: true },
  }
});

const log = log4js.getLogger("default");

export { log };