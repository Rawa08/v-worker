import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from '@/config';
import dashboardRouter from '@/routes/dashboardRoutes';
import androidRouter from '@/routes/deviceRoutes/androidRouter';
import { errorHandler } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

import { verifyFirebaseToken } from '@/middleware/authMiddleware';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.DASHBOARD_URL || '*' }));
app.use(express.json());


// Public Android endpoints
app.use('/api/device', androidRouter);

// Protected Dashboard endpoints
app.use('/api/dashboard', verifyFirebaseToken, dashboardRouter);


// Global error handler
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`);
});