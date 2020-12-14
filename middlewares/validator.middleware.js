const validate = (schema) => async (req, res, next) =>{

    try{
        const result = await schema.validateAsync(req.body);
        console.log(result);
        next();
    }
    catch(err){
        res.status(403).send(err);
    }
}

module.exports = validate;