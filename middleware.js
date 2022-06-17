const apiKeys = [
    'edVCa1E6zDZRztaq',
    'KwOi5vm2TYNmi8Dd',
    'zaCmZA74PLKCrD8Y',
    'ngfeNG1iaq9Q2PJK',
    '7BTxHCyHhzIME5TI'
];

function auth(request, response, next) {
    const apiKey = request.headers['api-key'];

    if (apiKey && apiKeys.includes(apiKey)) {
        next();
    } else {
        const resObj = {
            error: 'Invalid API-key.'
        }

        response.status(400).json(resObj);
    }
};

module.exports = { auth }