import path from 'path';
import { Server } from '@hapi/hapi';

const staticDir = path.resolve(process.cwd(), 'static');

/**
 * Serves the static frontend at the root of the server.
 *
 * @param server - The Hapi server instance to attach the route to.
 */
export function registerFrontendRoute(server: Server) {
  server.route({
    method: 'GET',
    path: '/{param*}',
    options: {
      handler: {
        directory: {
          path: staticDir,
          index: ['index.html'],
        },
      },
    },
  });
}
