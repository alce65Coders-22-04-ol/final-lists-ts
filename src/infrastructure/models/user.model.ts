export interface UserModel {
    uid: string;
    token?: string;
    name: string | null;
    email: string | null;
}
