import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(err);
    if (err instanceof ZodError) {
        return res.status(400).json({ message: err.errors });
    }
    const status = (err as { status?: number }).status ?? 500;
    const message = (err as { message?: string }).message ?? 'Internal Server Error';

    return res.status(status).json({ message });
};
