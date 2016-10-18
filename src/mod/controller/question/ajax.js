'use strict';
import Base from '../index.js';
import moment from "moment"
moment.locale('zh-cn');
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     * 封面入口
     */
    indexAction(){
        //console.log(this);
        //auto render template file index_index.html

        return this.display();
    }

    /**
     * ajax获取栏目分组
     * @param cid 栏目id
     * @returns {*}
     */
    async getgroupsAction(){
        let cid = this.get("cid");
        let groups = await this.model('category').get_groups(cid);
        if(think.isEmpty(groups)){
            groups=false;
        }
        return this.json(groups);
    }
//关注
    async ajaxquestionfocusAction(){
        //前端验证登录
        await this.weblogin();
        //获取关注的类型，1关注，2取消关注
        let type= this.get("type");
        //获取要关注的id;
        let id = this.get("id");
        let res;
        switch (Number(type)){
            case 1:
            //关注
            await this.model("question_focus").add({question_id:id,uid:this.user.uid,add_time:new Date().getTime()});
                 await this.model("question").where({id:id}).increment("focus_count");
                 this.success({name:"关注成功!"});
                break;
            case 2:
               //取消关注
                await this.model("question_focus").where({question_id:id,uid:this.user.uid}).delete();
                await this.model("question").where({id:id}).decrement("focus_count");
                this.success({name:"取消关注成功!"});
            break;
            default:
                return this.fail("缺少参数!")
        }

    }
    //获取评论
    async ajaxanswercommentsAction(){
        let answer_id = this.get("answer_id");
        //let comments =
        let comments = await this.model("question_answer_comments").where({answer_id:answer_id}).select();
        for(let c of comments){
            c.username = await get_nickname(c.uid);
            c.time = moment(c.time).fromNow()
        }
        this.json({data:comments,is_login:this.is_login});
    }
    async ajaxanswercommentspostAction(){
        //前端验证登录
        await this.weblogin();

        let data = this.post();
        data.uid = this.user.uid;
        data.time = new Date().getTime();
        let add = await this.model("question_answer_comments").add(data);
        if(add){
            return this.success({name:"评论成功!"})
        }else {
            return this.fail("评论失败！")
        }
    }
}