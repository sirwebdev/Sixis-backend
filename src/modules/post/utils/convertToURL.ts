const convertToURL = (banner: string) => {
    return `${process.env.APP_URL || 'http://localhost'}:${
        process.env.APP_PORT
    }/uploads/${banner}`;
};

export default convertToURL;
