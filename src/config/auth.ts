export default {
    jwt: {
        secret: process.env.JWT_SECRET || 'YOUMD5HASHHERE!!!',
        expiresIn: process.env.JWT_EXPIRES || '1d',
    },
};
