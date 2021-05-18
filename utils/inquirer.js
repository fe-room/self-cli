const inquirer = require('inquirer');
const question = [
  {
    name: "conf" /* key */,
    type: "confirm" /* 确认 */,
    message: "是否创建新的项目？" /* 提示 */,
  },
  {
    type: "list" /* 选择框 */,
    message: "请选择创建的模板类型",
    name: "libTemplate",
    choices: ["vue-ts", "react-ts"] /* 选项*/,
    filter: function (val) {
      /* 过滤 */
      return val.toLowerCase();
    },
    when: (res) => Boolean(res.conf),
  },
  {
    name: "name",
    message: "请输入项目名称？",
    default: 'default-project',
    when: (res) => Boolean(res.conf) /* 是否进行 */,
  },
  {
    name: "author",
    message: "请输入作者？",
    default: 'admin',
    when: (res) => Boolean(res.conf)
  }
];

module.exports = function inquirerMachine() {
    return inquirer.prompt(question)
};
