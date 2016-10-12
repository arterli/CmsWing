/**
 * Created by Arterli on 2016/1/24.
 */
export default [
    [/^index\/(.*)$/, "topic/index/index?order=:1"],
    [/^index$/, "topic/index/index"],
    [/^p\/(.*)$/, "topic/detail/index?id=:1"],
    [/^dlink\/(.*)$/, "topic/detail/downloadgetid?id=:1"],
    [/^keywords\/(.*)$/,"topic/list/keywords?key=:1"],
    [/^topic\/(.*)$/,"/topic/keyword/index?key=:1"],
    [/^t\/(.*)$/,"/topic/keyword/list?key=:1"],
    [/(.*)$/, "topic/index/route?category=:1"],
    // [/^channel\/(.*)$/, "home/topic/index?category=:1"],
    // [/^column\/(.*)$/, "home/topic/list?category=:1"],
    // [/^detail\/(.*)$/, "home/topic/detail?id=:1"],
    // [/^sp\/(.*)$/, "home/sp/index?category=:1"]
];