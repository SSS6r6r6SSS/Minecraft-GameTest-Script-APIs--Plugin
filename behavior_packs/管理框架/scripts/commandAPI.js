/*
我和代码只要有一个能跑就行
这段代码现在只有我和上帝看得懂 -- 2023.3.12 01:15:48
𱁬𱁬𱁬𱁬𱁬
*/
import * as gameTest from "mojang-minecraft";
// 温馨提示，先冲一发再写代码可以使头脑更清醒
// PS：所有代码均未进行测试

const commandPrefix = "!";    // 储存判断变量前缀所用的字符串
let commandsList = {};

gameTest.world.events.beforeChat.subscribe((chat) => {  // 一个监听
    gameTest.world.getDimension("overworld").runCommand("say ${chat.sender}---${chat.message}")  // 打印出玩家所说的话
    if(chat.message.charAt(0) == commandPrefix) {  // 如果这个消息的前缀等于commandPrefix
        msg = chat.message.replace(this,"");  // 储存消息并去除提示符
            // 下面开始将玩家的命令格式化，就是"help 114514 1919810 cxk" -> ["help","114514","1919801","cxk"]的感觉
            msgFormat = () => {  // 定义一个匿名函数
                for (var i = 0; i <= msg.length; i++) {
                    a = msg[i]; // 抱歉实在不会（懒）取变量名了，有谁可以帮忙改一改（）
                    let b = "";
                    b = b.concat(a);
                    let command = [];
                    if (a == " ") {
                        command.concat(b);
                        let b = ""
                    };
                    return command // 这个匿名函数返回一个叫command的东西，其中下标为0的是命令前缀，后面的都是参数
                }
            };
            command = msgFormat();  // 函数作用域，小子
        chat.cancel();  // 取消聊天消息发送事件
        if(commandsList[command[0]] =! null){  // 检测命令是否存在于commandsList
            // 恭喜，到这个时候命令就成功被检索了
            // 让我们找到这条命令的所在位置并执行对应的函数
            commandsList[command[0]](command.slice(1))  // 调用函数，实参为command的从下标1开始的切片
        }
        else {
            // 该死的，这玩家输的命令不对啊。给他返回一个错误消息
            gameTest.world.getDimension("overworld").runCommand(
                "tellraw ${chat.sender} {\"rawtext\":[{\"text\":\"未知的命令:${command[0]}。请检查命令是否存在，以及您对它是否拥有使用权限。\"}]}"
                )  // 这条太长了，分行写
        }

    }
});
// 下面就是准备供其他插件调用的函数了
export function registerCommand(command,operation){
    //command为string，operation为function，前者是玩家需输入的命令，后者是玩家输入指令时需执行的函数
    if(commandsList[command] == null) {
        commandsList[command] = operation;
        return 0
    }
    else {
        return 1
    }
}
help = new registerCommand("help",(argv) => {  // 试注册一个help命令
    this.gameTest.getDimension("overworld").runCommand(
        "tellraw ${this.chat.sender} {\"rawtext\":[{\"text\":\"帮助列表（没做完（））\"}]}"
        );
    this.gameTest.getDimension("overworld").runCommand("say ${argv}")
})
// 卡关了卡关了（）