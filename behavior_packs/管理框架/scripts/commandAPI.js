import * as GameTest from "mojang-minecraft"
CommandPrefix = "!"    // 储存判断变量前缀所用的字符串
GameTest.world.events.beforeChat.subscribe((chat) => {  // 一个监听
    GameTest.world.getDimension("overworld").runCommand("say ${chat.sender}---${chat.message}")  // 打印出玩家所说的话
    if(chat.message.charAt(0) == CommandPrefix){  // 如果这个消息的前缀等于CommandPrefix
        Command = chat.message  // 储存消息
        chat.cancel()  // 取消聊天消息发送事件
    }
})
