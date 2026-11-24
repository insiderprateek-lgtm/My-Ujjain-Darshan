// Hostinger's health check requires the primary process to listen promptly.
// Keep that listener alive, then attach the fully initialized Express app.
import http from 'node:http';

const port = Number(process.env.PORT) || 3000;
const bootHandler = (_req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('My Ujjain Darshan is starting.');
};
const server = http.createServer(bootHandler);

server.listen(port, '0.0.0.0', async () => {
  try {
    const { startServer } = await import('./server.ts');
    server.removeListener('request', bootHandler);
    await startServer(server);
  } catch (error) {
    console.error('Unable to start My Ujjain Darshan:', error);
  }
});
