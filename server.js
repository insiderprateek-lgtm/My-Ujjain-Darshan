// Hostinger runs Node 22. Import the TypeScript application directly so its
// startup health check observes the Express listener in the primary process.
import './server.ts';
