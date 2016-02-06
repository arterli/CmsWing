/**
 * Created by Arterli on 2016/1/24.
 */
export default [
    [/^channel\/(.*)$/, "home/topic/index?category=:1"],
    [/^column\/(.*)$/, "home/topic/list?category=:1"],
    [/^detail\/(.*)$/, "home/topic/detail?id=:1"]
];