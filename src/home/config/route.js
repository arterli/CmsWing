/**
 * Created by Arterli on 2016/1/24.
 */
export default [
    [/^channel\/(.*)$/, "home/article/index?category=:1"],
    [/^column\/(.*)$/, "home/article/list?category=:1"],
    [/^detail\/(.*)$/, "home/article/detail?id=:1"]
];