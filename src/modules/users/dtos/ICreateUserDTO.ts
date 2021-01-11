export default interface ICreateUserDTO {
    email: string;
    password: string;
    type?: 'user' | 'admin';
}
