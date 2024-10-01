const notfound = (req, res,next) => {
    res.status(404).json({
        code: 404,
        status: false,
        message: 'Page not found',
    });
}

module.exports = notfound;