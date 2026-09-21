import { randomUUID } from 'node:crypto';
import { notesRepository } from '../repositories/notes.repository';
import { HttpError } from '../types/HttpError';
import { INote } from '../types/INote';

interface ICreateNoteParams {
  title: string;
  done: boolean;
}
export const notesService = {
  async create({ title, done }: ICreateNoteParams) {
    const note = await notesRepository.create({
      id: randomUUID(),
      title,
      done,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return note;
  },
  async getOrThrow(id: string) {
    const note = await notesRepository.findById(id);
    if (!note) {
      throw new HttpError('Запис не знайдено', 404);
    }
    return note;
  },
  async update(id: string, update: Partial<INote>) {
    const note = await this.getOrThrow(id);
    const updatedNote = await notesRepository.update({
      ...note,
      ...update,
      updatedAt: new Date().toISOString(),
    });
    return updatedNote;
  },
  async delete(id: string) {
    const note = await this.getOrThrow(id);
    await notesRepository.delete(id);
    return note;
  },
  async findAll() {
    return notesRepository.findAll();
  },
};
