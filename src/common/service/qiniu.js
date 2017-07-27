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
    // qiniu.conf.ACCESS_KEY = setup.QINIU_AK;
    // qiniu.conf.SECRET_KEY = setup.QINIU_SK;
        let accessKey = setup.QINIU_AK;
        let secretKey = setup.QINIU_SK;
        let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        let bucket = setup.QINIU_BUCKET;
       // console.log(mac);
        let options = {
            scope: bucket + ":" + key
        }
       // console.log(options);
        let putPolicy = new qiniu.rs.PutPolicy(options);
        //用于前端直传直接返回 token
        if(istoken && filePath==null){
            let putPolicy = new qiniu.rs.PutPolicy({scope: bucket });
            //console.log(putPolicy.uploadToken(mac));
            return putPolicy.uploadToken(mac);
        }
        let uploadToken=putPolicy.uploadToken(mac);

        let config = new qiniu.conf.Config();
        //config.zone = qiniu.zone.Zone_z0;
        let formUploader = new qiniu.form_up.FormUploader(config);
        let putExtra = new qiniu.form_up.PutExtra();
        //file
        function uploadFile(uploadToken, key, filePath, putExtra) {
            let deferred = think.defer();
            formUploader.putFile(uploadToken, key, filePath, putExtra, function(respErr, respBody, respInfo) {
                if (respErr) {
                    throw respErr;
                }

                if (respInfo.statusCode == 200) {
                    console.log(respBody);
                    deferred.resolve(respBody);

                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        }


     //
     //    //获取token
     //  function uptoken(bucket, key) {
     //           let putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
     //           // let putPolicy = new qiniu.rs.PutPolicy2(new policy(bucket+":"+key));
     //           return putPolicy.token();
     //       }
     //  let  token = uptoken(bucket, key);
     //
     //
     //   //构造上传函数
     //   //noinspection JSAnnotator
     //   function uploadFile(uptoken, key, localFile) {
     //       let deferred = think.defer();
     //       var extra = new qiniu.io.PutExtra();
     //       qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
     //           if(!err) {
     //               // 上传成功， 处理返回值
     //               console.log(ret.hash, ret.key, ret.persistentId);
     //               deferred.resolve(ret);
     //           } else {
     //               // 上传失败， 处理返回代码
     //               console.log(err);
     //               deferred.resolve(false);
     //           }
     //       });
     //       return deferred.promise;
     //   }
     return await uploadFile(uploadToken, key, filePath,putExtra);
  }
    //删除资源
    async remove(key){

        let setup = await think.cache("setup");
        let accessKey = setup.QINIU_AK;
        let secretKey = setup.QINIU_SK;
        let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        let config = new qiniu.conf.Config();
         //config.useHttpsDomain = true;
        config.zone = qiniu.zone.Zone_z0;
        let bucketManager = new qiniu.rs.BucketManager(mac, config);
        let bucket = setup.QINIU_BUCKET;
       let delfile = (bucket,key)=>{
           let deferred = think.defer();
           bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
               if (err) {
                   console.log(err);
                   //throw err;
                   deferred.resolve(false);
               } else {
                   console.log(respInfo.statusCode);
                   console.log(respBody);
                   deferred.resolve(true);
               }
           });
           return deferred.promise;
       }

        // qiniu.conf.ACCESS_KEY = setup.QINIU_AK;
        // qiniu.conf.SECRET_KEY = setup.QINIU_SK;
        // let bucket = setup.QINIU_BUCKET;

        // function delfile() {
        //     let deferred = think.defer();
        //     //构建bucketmanager对象
        //     let client = new qiniu.rs.Client();
        //     //删除资源
        //     client.remove(bucket, key, function(err, ret) {
        //         if (!err) {
        //             // ok
        //             deferred.resolve(true);
        //         } else {
        //             console.log(err);
        //             deferred.resolve(false);
        //         }
        //     });
        //     return deferred.promise;
        // }

    return await delfile(bucket,key);

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
    //音视频转码
   async pfop(){
       let setup = await think.cache("setup");
       qiniu.conf.ACCESS_KEY = setup.QINIU_AK;
       qiniu.conf.SECRET_KEY = setup.QINIU_SK;


//要转码的文件所在的空间和文件名
       let bucket = setup.QINIU_BUCKET;
       let  key = 'thinkjs-create-project.mp4';

//转码所使用的队列名称。
       let pipeline = 'abc';

//要进行转码的转码操作。
       let fops = "avthumb/mp4/s/640x360/vb/1.25m"

//可以对转码后的文件进行使用saveas参数自定义命名，当然也可以不指定文件会默认命名并保存在当前空间
        let saveas_key = qiniu.util.urlsafeBase64Encode(saved_bucket+':'+saved_key);
        fops = fops+'|saveas/'+saveas_key;
      // console.log(saveas_key);
       let opts = {
            pipeline: pipleline
        };

        var PFOP = qiniu.fop.pfop(bucket, key, fops, opts, function(err, ret) {
            if(!err) {
                console.log(ret);
                // 上传成功， 处理返回值
                console.log('curl '+'http://api.qiniu.com/status/get/prefop?id='+ret.persistentId);
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
            }
        });
    }
    async download(key){
        let setup = await think.cache("setup");
        let accessKey = setup.QINIU_AK;
        let secretKey = setup.QINIU_SK;
        let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
        let config = new qiniu.conf.Config();
        let bucketManager = new qiniu.rs.BucketManager(mac, config);
        let http_=think.config("http_")==1?"http":"https";
        let publicBucketDomain = `${http_}://${setup.QINIU_DOMAIN_NAME}`;

// 公开空间访问链接
        let publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
        console.log(publicDownloadUrl);

//         qiniu.conf.ACCESS_KEY = setup.QINIU_AK;
//         qiniu.conf.SECRET_KEY = setup.QINIU_SK;
// //构建私有空间的链接
//         let url = `http://${setup.QINIU_DOMAIN_NAME}/${key}`;
//         var policy = new qiniu.rs.GetPolicy();
//
// //生成下载链接url
//         var downloadUrl = policy.makeRequest(url);
//
// //打印下载的url
//         console.log(downloadUrl);
        return publicDownloadUrl;
    }
}