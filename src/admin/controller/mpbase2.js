'use strict';

import Base from './base.js';
import weiapi from 'wechat-api';

export default class extends Base{
    init(http){
        super.init(http);
    }
    
    /**
     * 新建素材默认首页
     */
    fodderAction(){
        
        return this.display();
    }
}