 
 //fdsfds
 /* global bymassend */
global.bymasssend=(api,media_id,receivers)=>{
    let deferred = think.defer();
    api.massSendNews(media_id,receivers,(err,result)=>{
        //console.log(result)
        if(!think.isEmpty(result)){
            deferred.resolve(result);
            //self.end(result);
        }else{
            console.error('err'+err);
            //deferred.reject(err);
        }
    });
    return deferred.promise;
}
        
        