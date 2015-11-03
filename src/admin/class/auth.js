/**
 * Created by arter on 2015/11/3.
 */

    var Auth = think.Class({
    init:function(x, y){
        this.x = x;
        this.y = y;
    },
    getxy:function() {
        return '('+this.x+', '+this.y+')';
    }

})
//class Auth {
//
//    constructor(x, y) {
//        this.x = x;
//        this.y = y;
//    }
//
//    toString() {
//        return '('+this.x+', '+this.y+')';
//    }
//
//}