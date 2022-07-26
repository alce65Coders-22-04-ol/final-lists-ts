import { basicResponse } from '../../../infrastructure/interfaces/repository';
import { HttpFetchRepository } from '../../../infrastructure/repositories/Http.fetch.repository';
import { NoteModel } from '../models/note.model';

const url =
    'https://alce65-todo-react-default-rtdb.europe-west1.firebasedatabase.app/';
const postUrl = '.json';
export class NotesRepo extends HttpFetchRepository<NoteModel, basicResponse> {
    constructor(public collection: string = 'notes') {
        super(url + collection, postUrl);
    }
}
