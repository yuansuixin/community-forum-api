//业务中需要删除掉
//执行命令  npx babel-node src/model/demo.js

import { setValue, getValue, getHValue } from "./RedisConfig";

setValue("imooc", "hello redis client");

getValue("imooc").then(res => {
  console.log("getvalue:" + res);
});

setValue("imoocobj", { name: "joe", age: 23, email: "joe@163.com" });

getHValue("imoocobj").then(res => {
  console.log("getHValue: " + JSON.stringify(res, null, 2));
});
