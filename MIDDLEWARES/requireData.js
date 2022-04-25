const requireData = (req, res, next) => {
    try {
        // validaciones
        const { nombre, email, password } = req.body;

        console.log(req.body)

        if (
            !nombre ||
            !email ||
            !password
        ) {
            throw new Error("Algunos campos están vacios");
        }

        next();

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = { requireData };