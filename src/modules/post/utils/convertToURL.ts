const convertToURL = (banner: string) => {
    return `${process.env.APP_URL || 'http://localhost'}:${
        process.env.APP_PORT
    }/files/${banner}`;
};

export default convertToURL;
