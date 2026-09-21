import { Router } from 'express';
import { notesController } from '../controllers/notes.controller';
import { createNoteSchema, updateNoteSchema, validate } from '../schemas';

export const notesRouter = Router();

notesRouter.get('/:id', notesController.getOne);
notesRouter.patch('/:id', validate(updateNoteSchema), notesController.update);
notesRouter.delete('/:id', notesController.delete);
notesRouter.get('/', notesController.getAll);
notesRouter.post('/', validate(createNoteSchema), notesController.create);
