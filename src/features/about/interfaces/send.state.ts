import { ContactModel } from '../models/contact.model';

export interface SendState {
    send: boolean;
    userToSend: ContactModel | null;
}
