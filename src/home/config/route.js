/**
 * Created by Arterli on 2016/1/24.
 */
export default [
    [/^index$/, "home/index/index/index"],
    [/(.*)$/, "home/topic/route?category=:1"],
    [/^channel\/(.*)$/, "home/topic/index?category=:1"],
    [/^column\/(.*)$/, "home/topic/list?category=:1"],
    [/^detail\/(.*)$/, "home/topic/detail?id=:1"],
    [/^sp\/(.*)$/, "home/sp/index?category=:1"]
];