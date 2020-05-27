exports.handler = async function(event, context, callback) {
    console.log({ event, context, callback });

    return {
        statusCode: 200,
        body: 'hello world!',
    };
};
