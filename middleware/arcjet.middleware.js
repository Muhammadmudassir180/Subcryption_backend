import aj from "../config/arcjet.js"

export const arcjetMiddleware = async  (req, res, next) => {
    try{
        const decision = await aj.protect(req, {requested:1});
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({error: "Rate limit exceeded"});
            }
            if (decision.reason.isBot()) {
                res.status(403).json({error: "Bot Detected"});
                return res.status(400).json({
                    message: "Access Denied",
                })

            }

        }
        next();
    }catch (error){
        console.log(`Arcjet middleware Error: ${error}`);
        res.status(500).send({
            success: false,
            message: "Arcjet middleware Error",
            error: error
        });
        next(error);

    }
}
