module.exports =  async function (handler){
    return (req,res , next)=>{
        try{
            await handler();
        }
        catch(err){
            next(err);
        }
    }
};