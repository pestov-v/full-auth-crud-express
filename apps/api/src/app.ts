import express from 'express';
import config from './config';
import { notesRouter } from './routes/notes.routes';

const app = express();

app.use(express.json());
app.use('/notes', notesRouter);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
