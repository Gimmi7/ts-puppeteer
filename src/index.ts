// 注册ts-node,用于node启动项目时
import 'ts-node/register/transpile-only';
// 注册tsconfig-paths
import 'tsconfig-paths/register';
// 初始化环境变量
import config from '@/resources/application';
// 启动 express server
import '@/config/expressConfig';



