const { default: axios } = require("axios");
test('Data is string', () => {
    return axios.get("http://www.mocky.io/v2/5eb8fcb12d0000d088357f2a").then(res => {
        expect(typeof res.data).toBe("string");
    });
});

test('Status is 200', () => {
    return axios.get("http://www.mocky.io/v2/5eb8fcb12d0000d088357f2a").then(res => {
        expect(res.status).toBe(200);
    });
});

