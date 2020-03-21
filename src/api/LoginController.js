import send from "../config/MailConfig";
import moment from "moment";
import jsonwebtoken from "jsonwebtoken";
import config from "../config";
import { checkCode } from "@/common/Utils";
import User from "@/model/User";

class LoginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request;
    console.log("fdsafdas");
    try {
      let result = await send({
        code: "1324",
        expire: moment()
          .add(30, "minutes")
          .format("YYYY-MM-DD HH:mm:ss"),
        email: body.username,
        user: "hahahah"
      });
      ctx.body = {
        code: 200,
        data: result,
        msg: "邮件发送成功"
      };
    } catch (e) {
      console.log("报错啦--", e);
    }
  }

  async login(ctx) {
    console.log("hello login");
    const { body } = ctx.request;
    let sid = body.sid;
    let code = body.code;
    let result = await checkCode(sid, code);
    if (result) {
      //验证图片验证码
      console.log("check ok");
      let checkUserPasswd = "";
      let user = await User.findOne({ username: body.username });
      if (user.password === body.password) {
        checkUserPasswd = true;
      }

      if (checkUserPasswd) {
        let token = jsonwebtoken.sign({ _id: "croal" }, config.JWT_SECRET, {
          expiresIn: "1d"
        });
        ctx.body = {
          code: 200,
          token: token
        };
      } else {
        ctx.body = {
          code: 404,
          msg: "用户名或密码错误"
        };
      }
    } else {
      ctx.body = {
        code: 401,
        msg: "图片验证码不正确，请检查"
      };
    }
  }
}

export default new LoginController();
