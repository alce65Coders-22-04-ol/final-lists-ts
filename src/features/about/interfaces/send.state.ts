import { iContact } from '../models/contact';

export interface iSendState {
    send: boolean;
    userToSend: iContact | null;
}
