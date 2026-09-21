import { INote } from '../types/INote';

const testNote: INote = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  title: 'Test note',
  description: 'Test note description',
  done: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
let notes: INote[] = [testNote];

export const notesRepository = {
  findAll: async () => [...notes],
  findById: async (id: string) => notes.find((n) => n.id === id),
  create: async (note: INote) => {
    notes.push(note);
    return note;
  },
  update: async (note: INote) => {
    notes = notes.map((n) => (n.id === note.id ? note : n));
    return note;
  },
  delete: async (id: string) => {
    const len = notes.length;
    notes = notes.filter((n) => n.id !== id);
    return len !== notes.length;
  },
};
