module.exports = {
    publicacion: {
        subscribe(parent,args,context){
            return context.pubsub.asyncIterator('publicacion');//channel
        }   
    }
};