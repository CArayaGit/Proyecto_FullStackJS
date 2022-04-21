const requireDatos = (req, res, next) => {
    try {
        // validaciones
        const { nombre, email, password } = req.body;

        if (
            !nombre?.trim() ||
            !email?.trim() ||
            !password?.trim()
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

module.exports = { requireDatos };