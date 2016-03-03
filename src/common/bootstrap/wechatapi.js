 
'use strict'
 /* global massend 群发图文消息 */
global.massSendNews=(api,media_id,receivers)=>{
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

 /* global massend 群发文本消息 */
global.massSendText=(api,content,receivers)=>{
    let deferred = think.defer();
    api.massSendText(content,receivers,(err,result)=>{
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

 /* global massend 群发图片消息 */
global.massSendImage=(api,media_id,receivers)=>{
    let deferred = think.defer();
    api.massSendImage(media_id,receivers,(err,result)=>{
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

 /* global massend 群发语音消息 */
global.massSendVoice=(api,media_id,receivers)=>{
    let deferred = think.defer();
    api.massSendVoice(media_id,receivers,(err,result)=>{
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

 /* global massend 群发视频消息 */
global.massSendVideo=(api,media_id,receivers)=>{
    let deferred = think.defer();
    api.massSendVideo(media_id,receivers,(err,result)=>{
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
        
        