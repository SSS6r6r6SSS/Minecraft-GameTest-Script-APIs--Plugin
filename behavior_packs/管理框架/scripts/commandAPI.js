import * as GameTest from "mojang-minecraft"
GameTest.world.events.beforeChat.subscribe((chat) => {
    GameTest.world.getDimension("overworld").runCommand("say ${chat.sender}---${chat.message}")
})