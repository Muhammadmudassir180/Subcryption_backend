const errormiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.error(err);

        //Mongoose bad Object 
        if (err.name === "CastError") {
            const message = "Resource Not Found";

            error = new Error(message)
            error.statusCode = 404;

        }

        //Mongoose Duplicate Key 
        if (err.code === 1100) {
            const message = "Duplicate field value entered";
            error = new Error(message);
            error.statusCode = 400;
        }
        // Mongoose validation error 
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(","));
            error.statusCode = 400;
        }

        res.status(error.statusCode|| 500).json({
            success:false,
            errro: error.message || "Server Error"
        }); 
    } catch (error) {
        next(error);

    }

};

export default errormiddleware;