import { NextFunction, Request, Response } from 'express';
import { notesService } from '../services/notes.service';
import { idSchema } from '../schemas';
import { HttpError } from '../types/HttpError';

export const notesController = {
  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result = idSchema.safeParse(req.params.id);
      if (!result.success) throw new HttpError(result.error.issues[0].message, 400);

      res.json(await notesService.getOrThrow(result.data));
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = idSchema.safeParse(req.params.id);
      if (!result.success) throw new HttpError(result.error.issues[0].message, 400);

      const id = result.data;
      const { title, description, done } = req.body;
      const note = await notesService.update(id, { title, description, done });
      res.json(note);
    } catch (error) {
      next(error);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = idSchema.safeParse(req.params.id);
      if (!result.success) throw new HttpError(result.error.issues[0].message, 400);

      const note = await notesService.delete(result.data);
      res.json(note);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await notesService.findAll());
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const note = await notesService.create(req.body);
      res.json(note);
    } catch (error) {
      next(error);
    }
  },
};
