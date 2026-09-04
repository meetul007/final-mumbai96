import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { default: Api } = require('botasaurus-desktop-api');

const BOTASAURUS_API_URL = process.env.BOTASAURUS_API_URL || 'http://127.0.0.1:8000';

export async function GET() {
  try {
    const api = new Api({
      apiUrl: BOTASAURUS_API_URL,
      createResponseFiles: false,
    });

    const running = await api.isApiRunning();

    if (running) {
      return Response.json({ status: 'ok', message: 'Botasaurus server is running' });
    }

    return Response.json(
      { status: 'error', message: 'Botasaurus server returned unexpected response' },
      { status: 503 },
    );
  } catch (err) {
    return Response.json(
      { status: 'error', message: err.message || 'Botasaurus server is not reachable' },
      { status: 503 },
    );
  }
}
