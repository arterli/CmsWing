'use strict';
import Base from '../index.js';
import pagination from 'think-pagination';
import moment from "moment"
moment.locale('zh-cn');
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     * 封面入口
     */
    indexAction() {
        //console.log(this);
        //auto render template file index_index.html

        this.end(2222)
        return this.display();
    }
}