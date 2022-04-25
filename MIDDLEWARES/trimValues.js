const kTrim = (req, res, next) => {

    const keys = Object.keys(req.body)

    keys.forEach((k) => {
        const value = req.body[k]
        if (typeof value == 'string')
            req.body[k] = value.trim()
    })

    next()
};

module.exports = { kTrim };