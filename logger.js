/// logger middleware for the express server
function log(req , res , next) {
    console.log('logging');
    next(); /// next to pass control to the next middleware function in the pipeline
            /// if we don't use this our request will end up hanging  
}
module.exports = log;