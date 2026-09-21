import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, 'Вкажіть назву')
    .max(100, 'Заголовок занадто довгий'),
  description: z.string().optional(),
  done: z.boolean().optional().default(false),
});

export const updateNoteSchema = createNoteSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Немає даних для оновлення',
  });

export const idSchema = z.uuid('Некоректний формат ID (має бути UUID)');

export function validate(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({
        error: 'Некоректні дані',
        details: result.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      });
    }
    req.body = result.data;
    next();
  };
}
