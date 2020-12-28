export default interface ICreateUserDTO {
    email: string;
    type?: 'user' | 'admin';
}
