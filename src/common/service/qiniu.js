'use strict';
import qiniu from 'qiniu';
export default class extends think.service.base {
  /**
   * init
   * @return {}         []
   */
   init(){
    super.init();

  }

    /**
     * 七牛上传
     * @param filePath 要上传文件的本地路径
     * @param key 上传到七牛后保存的文件名
     * @returns {*}
     */
  async uploadpic(filePath,key,istoken=false){
    let setup = await think.cache("setup");
    qiniu.conf.ACCESS_KEY = setup.QINIU_AK;
    qiniu.conf.SECRET_KEY = setup.QINIU_SK;
      let bucket = setup.QINIU_BUCKET;
        if(istoken && filePath==null){
            var putPolicy = new qiniu.rs.PutPolicy(bucket);
            return putPolicy.token();
        }
      function uptoken(bucket, key) {
               var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
               return putPolicy.token();
           }
      let  token = uptoken(bucket, key);
       console.log(token);

       //构造上传函数
       //noinspection JSAnnotator
       function uploadFile(uptoken, key, localFile) {
           let deferred = think.defer();
           var extra = new qiniu.io.PutExtra();
           qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
               if(!err) {
                   // 上传成功， 处理返回值
                   console.log(ret.hash, ret.key, ret.persistentId);
                   deferred.resolve(ret);
               } else {
                   // 上传失败， 处理返回代码
                   console.log(err);
                   deferred.resolve(false);
               }
           });
           return deferred.promise;
       }
     return await uploadFile(token, key, filePath);
  }
    //删除资源
    async remove(key){

        let setup = await think.cache("setup");
        qiniu.conf.ACCESS_KEY = setup.QINIU_AK;
        qiniu.conf.SECRET_KEY = setup.QINIU_SK;
        let bucket = setup.QINIU_BUCKET;
        function delfile() {
            let deferred = think.defer();
            //构建bucketmanager对象
            let client = new qiniu.rs.Client();
//删除资源
            client.remove(bucket, key, function(err, ret) {
                if (!err) {
                    // ok
                    deferred.resolve(true);
                } else {
                    console.log(err);
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        }

    return await delfile();

    }
    //获取文件信息
    async stat(key){
        let setup = await think.cache("setup");
        qiniu.conf.ACCESS_KEY = setup.QINIU_AK;
        qiniu.conf.SECRET_KEY = setup.QINIU_SK;
        let bucket = setup.QINIU_BUCKET;


        function stat() {
            let deferred = think.defer();
            //构建bucketmanager对象
            var client = new qiniu.rs.Client();
            //获取文件信息
            client.stat(bucket, key, function(err, ret) {
                if (!err) {
                    console.log(ret.hash, ret.fsize, ret.putTime, ret.mimeType);
                    deferred.resolve(ret);
                } else {
                    console.log(err);
                    deferred.resolve(err);
                }
            });
return deferred.promise;
        }
        return await stat();
    }
}