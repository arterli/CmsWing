/**
 * Created by arter on 2015/10/29.
 */
'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * public action
     * @return {Promise} []
     */
    async signinAction(self){
        //��̨��½���
        if(this.isPost()){
            let username = this.post('username');
            let password = this.post('password');
            password = encryptPassword(password);
            let res = await this.model("member").signin("admin",password,self.ip());
            if(0<res.uid){
                await this.session('userInfo', res);
                //TODO ����ǩ����֤����
            this.redirect('/admin/index');
            }else { //��¼ʧ��
                let fail;
                switch(res) {
                    case -1: fail = '�û������ڻ򱻽��ã�'; break; //ϵͳ�������
                    case -2: fail = '�������'; break;
                    default: fail = 'δ֪����'; break; // 0-�ӿڲ������󣨵��Խ׶�ʹ�ã�
                }
                    this.fail(res, fail);
            }

        }else{
            let islogin=await this.islogin();
            if(islogin){
                this.redirect('/admin/index');
            }else{
                return this.display();
            }

        }
    }

    async logoutAction(){
        let islogin=await this.islogin();
        if(islogin){
        await this.session();
            this.end("fsfs");
        }else {
        this.redirect('/admin/public/signin');
        }
    }

    verifyAction(){
        //��֤��
    }
}