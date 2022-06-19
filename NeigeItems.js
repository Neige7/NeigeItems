//@Awake(enable)
//@Awake(reload)
function onEnable_NI() {
    // 加载配置文件
    loadConfig_NI()
    // 加载物品动作函数
    loadAction_NI()
    // 加载NI脚本文件
    loadScripts_NI()
    // 创建节点缓存对象
    NeigeItemsData.sections = {}
    // 加载全局节点列表
    getGlobalSections_NI()
    // 加载NI物品列表
    getNiItems_NI()
    // 加载NI物品动作列表
    getActions_NI()
    // 加载MM物品列表
    if (Tool.isPluginEnabled("MythicMobs")) {
        loadMMItem_NI()
    }
    // 加载物品变量监听器
    ItemLoreReplacer_NI()
    // 注册指令
    commandRegister_NI()
    // 加载物品动作监听器
    Tool.removeListener("onPlayerInteract_NI")
    Tool.addListener("onPlayerInteract_NI", "org.bukkit.event.player.PlayerInteractEvent", "LOW", false, function(event) {
        onPlayerInteract_NI(event)
    })
}

/**
 * 加载配置文件
 * @data NeigeItems Object 所有缓存变量均存储于NeigeItems对象
 * @data scriptName_NI String 插件名
 * @data config_NI {key: value} 所有配置内容
 * @data NeigeItemsData.sections {random: data} 所有节点缓存内容
 * @data NeigeItemsData.itemIDList [] 所有物品ID
 * @data NeigeItemsData.itemConfigs [] 所有物品配置
 * @data NeigeItemsData.mmIds ArrayList 所有MM物品ID
 * @data NeigeItemsData.action {action: function} 所有物品动作函数
 * @data NeigeItemsData.actions {id: {left: [], right: [], all: []}} 所有物品动作内容
 * @data NeigeItemsData.holderExpansion {key: function} 所有物品变量解析式
 * @data NeigeItemsData.scripts {path: scriptObject} 所有物品脚本
 * @data NeigeItemsData.globalSectionIDList [] 所有全局节点ID
 * @data NeigeItemsData.globalSectionFileNames [] 所有全局节点文件名
 * @data NeigeItemsData.globalSections [[config, [id]]] 所有全局节点文件及对应ID
 */
function loadConfig_NI() {
    
    NeigeItemsData = {}
    config_NI = {}
    // 配置文件名
    scriptName_NI = "NeigeItems"
    // 创建文件夹
    getDir_NI(scriptName_NI + java.io.File.separator + "Items")
    getDir_NI(scriptName_NI + java.io.File.separator + "Scripts")
    getDir_NI(scriptName_NI + java.io.File.separator + "GlobalSections")
    let file = getFile_NI(getDir_NI(scriptName_NI), "config.yml")
    // 物品管理指令
    config_NI.NeigeItemManagerCommand = getConfigValue_NI(file, "Main.NeigeItemManagerCommand", "ni")
    // MM物品默认保存路径
    config_NI.MMItemsPath = getConfigValue_NI(file, "Main.MMItemsPath", "MMItems.yml")
    config_NI.Debug = getConfigValue_NI(file, "Main.Debug", false)
    // 不进行保存的NBT键
    // config_NI.ignoreKeys = getConfigValue_NI(file, "Main.ignoreKeys", Arrays.asList(["Enchantments","VARIABLES_DATA","ench","Damage","HideFlags","Unbreakable"]))
    config_NI.ignoreKeys = Arrays.asList(["Enchantments","VARIABLES_DATA","ench","Damage","HideFlags","Unbreakable", "CustomModelData"])

    // 玩家不在线提示
    config_NI.invalidPlayer = getConfigValue_NI(file, "Messages.invalidPlayer", "§e[NI] §6玩家不在线或不存在")
    // 给予成功提示
    config_NI.successInfo = getConfigValue_NI(file, "Messages.successInfo", "§e[NI] §6成功给予 §f{player} §a{amount} §6个 §f{name}")
    // 被给予成功提示(设置为""则不进行提示)
    config_NI.givenInfo = getConfigValue_NI(file, "Messages.givenInfo", "§e[NI] §6你得到了 §a{amount} §6个 §f{name}")
    // 给予成功提示
    config_NI.dropSuccessInfo = getConfigValue_NI(file, "Messages.dropSuccessInfo", "§e[NI] §6成功在 §a{world} §6的 §a{x},{y},{z} §6掉落了 §a{amount} §6个 §f{name}")
    // 未知物品提示
    config_NI.unknownItem = getConfigValue_NI(file, "Messages.unknownItem", "§e[NI] §6找不到ID为 §a{itemID} §6的物品")
    // 对应ID物品已存在提示
    config_NI.existedKey = getConfigValue_NI(file, "Messages.existedKey", "§e[NI] §6已存在ID为 §a{itemID} §6的物品")
    // 未知解析对象提示
    config_NI.invalidParser = getConfigValue_NI(file, "Messages.invalidParser", "§e[NI] §6不能针对后台解析物品, 请指定一个玩家")
    // 保存成功提示
    config_NI.successSaveInfo = getConfigValue_NI(file, "Messages.successSaveInfo", "§e[NI] §6成功将 §f{name} §6以ID §a{itemID} §6保存至 §a{path}")
    // MM物品转换完毕提示
    config_NI.mMImportSuccessInfo = getConfigValue_NI(file, "Messages.mMImportSuccessInfo", "§e[NI] §6成功将所有MM物品保存至 §a{path}")
    // 点击获取物品提示
    config_NI.clickGiveMessage = getConfigValue_NI(file, "Messages.clickGiveMessage", "§e点击获取该物品")
    // 不要保存空气提示
    config_NI.airItem = getConfigValue_NI(file, "Messages.airItem", "§e[NI] §6请不要试图保存空气, 谢谢合作")
    // 输入无效数字提示
    config_NI.invalidAmount = getConfigValue_NI(file, "Messages.invalidAmount", "§e[NI] §6无效数字")
    // 输入无效世界提示
    config_NI.invalidWorld = getConfigValue_NI(file, "Messages.invalidWorld", "§e[NI] §6无效世界")
    // 输入无效坐标提示
    config_NI.invalidLocation = getConfigValue_NI(file, "Messages.invalidLocation", "§e[NI] §6无效坐标")
    // 权限不足提示
    config_NI.insufficientPermissions = getConfigValue_NI(file, "Messages.insufficientPermissions", "§e[NI] §6权限不足")
    // 权限不足提示
    config_NI.invalidPlugin = getConfigValue_NI(file, "Messages.invalidPlugin", "§e[NI] §6未发现前置插件: {plugin}")
    // 权限不足提示
    config_NI.itemCooldown = getConfigValue_NI(file, "Messages.itemCooldown", "§e物品冷却中! 请等待{time}秒")
    // 重载完毕提示
    config_NI.reloadedMessage = getConfigValue_NI(file, "Messages.reloadedMessage", "§e[NI] §6重载完毕")

    // 无效NBT提示
    config_NI.invalidNBT = getConfigValue_NI(file, "Messages.invalidNBT", "§6[NI] §cNBT加载失败, 请勿在列表型NBT中混用键值对, 数字及字符串")
    // 错误物品提示
    config_NI.invalidItem = getConfigValue_NI(file, "Messages.invalidItem", "§6[NI] §c物品加载失败, 物品可能缺损数据, 物品ID: §6{itemID}")
    // 给予失败提示
    config_NI.failureInfo = getConfigValue_NI(file, "Messages.failureInfo", "§e[NI] §6物品给予失败, 可能原因: 物品未配置材质/玩家已下线")

    // 帮助信息
    config_NI.helpMessages = getConfigValue_NI(file, "Messages.helpMessages", Arrays.asList([
        "§6====================§eNeigeItems§6====================",
        "§6==================[]为必填, ()为选填==================",
        "§e/ni §flist (页码) §7> 查看所有NI物品",
        "§e/ni §fget [物品ID] (数量) (是否反复随机) (指向数据) §7> 根据ID获取NI物品",
        "§e/ni §fgive [玩家ID] [物品ID] (数量) (是否反复随机) (指向数据) §7> 根据ID给予NI物品",
        "§e/ni §fgiveAll [物品ID] (数量) (是否反复随机) (指向数据) §7> 根据ID给予所有人NI物品",
        "§e/ni §fdrop [物品ID] [数量] [世界名] [X坐标] [Y坐标] [Z坐标] [是否反复随机] [物品解析对象] (指向数据) §7> 于指定位置掉落NI物品",
        "§e/ni §fsave [物品ID] (保存路径) §7> 将手中物品以对应ID保存至对应路径",
        "§e/ni §fcover [物品ID] (保存路径) §7> 将手中物品以对应ID覆盖至对应路径",
        "§e/ni §fmm load [物品ID] (保存路径) §7> 将对应ID的MM物品保存为NI物品",
        "§e/ni §fmm cover [物品ID] (保存路径) §7> 将对应ID的MM物品覆盖为NI物品",
        "§e/ni §fmm loadAll (保存路径) §7> 将全部MM物品转化为NI物品",
        "§e/ni §fmm get [物品ID] (数量) §7> 根据ID获取MM物品",
        "§e/ni §fmm give [玩家ID] [物品ID] (数量) §7> 根据ID给予MM物品",
        "§e/ni §fmm giveAll [物品ID] (数量) §7> 根据ID给予所有人MM物品",
        "§e/ni §freload §7> 重新加载NI物品",
        "§e/ni §fhelp §7> 查看帮助信息",
        "§6================================================="]))

    // 物品列表格式
    config_NI.listPrefix = getConfigValue_NI(file, "ItemList.Prefix", "§6===========§eNeigeItems§6===========")
    config_NI.listSuffix = getConfigValue_NI(file, "ItemList.Suffix", "§6======<< §e{prev} §f{current}§e/§f{total} §e{next} §6>>======")
    config_NI.listItemAmount = getConfigValue_NI(file, "ItemList.ItemAmount", 10)
    config_NI.listItemFormat = getConfigValue_NI(file, "ItemList.ItemFormat", "§6{index}. §a{ID} §6- §f{name}")
    config_NI.listPrev = getConfigValue_NI(file, "ItemList.Prev", "上一页")
    config_NI.listNext = getConfigValue_NI(file, "ItemList.Next", "下一页")
        
}

// 发包替换
function ItemLoreReplacer_NI() {
    NeigeItemsData.holderExpansion = {
        neigeitems: function(itemStack, itemTag, param) {
            param = param.split("_")
            switch (param[0].toLowerCase()) {
                case "charge": {
                    if (!itemTag.containsKey("NeigeItems")
                        || !itemTag.NeigeItems.containsKey("charge")) return
                    return itemTag.NeigeItems.charge.asInt().toFixed(0)
                } case "maxcharge": {
                    if (!itemTag.containsKey("NeigeItems")
                        || !itemTag.NeigeItems.containsKey("maxCharge")) return
                    return itemTag.NeigeItems.maxCharge.asInt().toFixed(0)
                } case "nbt": {
                    param.shift()
                    param = param.join("_").split(".")
                    let data = itemTag
                    let value
                    for (let index = 0; index < param.length; index++) {
                        const key = param[index]
                        value = data[key]
                        if (value == undefined) {
                            return
                        }
                        data = value
                    }
                    return value.asString()
                } case "nbtnumber": {
                    print(param)
                    param.shift()
                    let fixed = param[0]
                    param.shift()
                    param = param.join("_").split(".")
                    let data = itemTag
                    let value
                    for (let index = 0; index < param.length; index++) {
                        const key = param[index]
                        value = data[key]
                        if (value == undefined) {
                            return
                        }
                        data = value
                    }
                    return value.asDouble().toFixed(fixed)
                } default:
                    break
            }
        }
    }
    let itemParse = function(itemStack) {
        if (itemStack != null) {
            let NMSKt = Packages.com.skillw.pouvoir.taboolib.module.nms.NMSKt
            let itemTag = NMSKt.getItemTag(itemStack)
    
            let itemMeta = itemStack.getItemMeta()
            if (itemMeta.hasDisplayName()) {
                itemMeta.setDisplayName(setPapiWithNoColor_NI(itemStack, itemMeta.getDisplayName(), itemTag))
            }
            if (itemMeta.hasLore()) {
                let lore = itemMeta.getLore()
                for (let index = 0; index < lore.length; index++) {
                    lore[index] = setPapiWithNoColor_NI(itemStack, lore[index], itemTag)
                }
                itemMeta.setLore(lore)
            }
            itemStack.setItemMeta(itemMeta)
        }
    }

    var PacketType = Packages.com.comphenix.protocol.PacketType
    var ListenerPriority = Packages.com.comphenix.protocol.events.ListenerPriority
    Tool.removePacketListener("ItemLoreReplacer_NI")
    Tool.addPacketListener(
        "ItemLoreReplacer_NI",
        ListenerPriority.NORMAL,
        [PacketType.Play.Server.WINDOW_ITEMS, PacketType.Play.Server.SET_SLOT],
        function(event) {
            if (event.getPlayer().getGameMode() == "SURVIVAL") {
                if (event.getPacketType() == PacketType.Play.Server.WINDOW_ITEMS) {
                    let items = event.getPacket().getItemListModifier().read(0)
                    for (let index = 0; index < items.length; index++) {
                        if (items[index].hasItemMeta()) itemParse(items[index])
                    }
                    event.getPacket().getItemListModifier().write(0, items)
                } else {
                    let itemStack = event.getPacket().getItemModifier().read(0)
                    if (itemStack.hasItemMeta()) {
                        let result = itemParse(itemStack)
                        if (result) event.getPacket().getItemListModifier().write(0, itemStack)
                    }
                }
            }
        },
        function(event) {
        }
    )
}

function commandRegister_NI() {
    let Bukkit = Packages.org.bukkit.Bukkit
    let BukkitScheduler = Bukkit.getScheduler()
    let ChatColor = Packages.org.bukkit.ChatColor
    let HashMap = Packages.java.util.HashMap
    let ItemStack = Packages.org.bukkit.inventory.ItemStack
    let Material = Packages.org.bukkit.Material
    let Player = Packages.org.bukkit.entity.Player
    let BukkitAdapterClass = Packages.com.skillw.pouvoir.taboolib.platform.BukkitAdapter
    let TellrawJson = Packages.com.skillw.pouvoir.taboolib.module.chat.TellrawJson
    let TLibBukkitAdapter = new BukkitAdapterClass()

    let NeigeItemManagerCommand = config_NI.NeigeItemManagerCommand
    let MMItemsPath = config_NI.MMItemsPath
    let invalidPlayer = config_NI.invalidPlayer
    let successInfo = config_NI.successInfo
    let givenInfo = config_NI.givenInfo
    let dropSuccessInfo = config_NI.dropSuccessInfo
    let unknownItem = config_NI.unknownItem
    let existedKey = config_NI.existedKey
    let invalidPaser = config_NI.invalidParser
    let successSaveInfo = config_NI.successSaveInfo
    let mMImportSuccessInfo = config_NI.mMImportSuccessInfo
    let clickGiveMessage = config_NI.clickGiveMessage
    let airItem = config_NI.airItem
    let invalidAmount = config_NI.invalidAmount
    let invalidWorld = config_NI.invalidWorld
    let invalidLocation = config_NI.invalidLocation
    let insufficientPermissions = config_NI.insufficientPermissions
    let invalidPlugin = config_NI.invalidPlugin
    let reloadedMessage = config_NI.reloadedMessage
    let failureInfo = config_NI.failureInfo
    let helpMessages = config_NI.helpMessages
    let listPrefix = config_NI.listPrefix
    let listSuffix = config_NI.listSuffix
    let listItemAmount = config_NI.listItemAmount
    let listItemFormat = config_NI.listItemFormat
    let listPrev = config_NI.listPrev
    let listNext = config_NI.listNext
    let mmIds = NeigeItemsData.mmIds

    // 卸载指令
    Tool.unRegCommand(NeigeItemManagerCommand)
    // 新建指令
    let command = Tool.command(NeigeItemManagerCommand)
    // 指令执行动作
    command.setExecutor(function(sender, command, label, args) {
        // 若未输入参数
        if (args.length < 1) {
            // 发送帮助信息
            sendMessages_NI(sender, helpMessages)
            return true
        }
        // 检测指令内容
        if (command.getName().equalsIgnoreCase(NeigeItemManagerCommand)) {
            // 仅限后台/OP执行
            if (!(sender instanceof Player) || sender.isOp()) {
                switch(args[0].toLowerCase()) {
                    // nim list (页码) > 查看所有NI物品
                    case "list":
                        BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                            // 检测指令长度
                            if (args.length == 1 || incrementingArray_NI(pageAmount).indexOf(args[1]) != -1) {
                                // 获取当前页码
                                let page = 0
                                if (args.length > 1) page = parseInt(args[1]) - 1
                                // 预构建待发送信息
                                let listMessage = new TellrawJson()
                                if (sender instanceof Player) {
                                    // 添加信息前缀
                                    listMessage.append(listPrefix)
                                    TLibBukkitAdapter.adaptCommandSender(sender).sendRawMessage(listMessage.toRawMessage())
                                    listMessage = new TellrawJson()
                                } else {
                                    sender.sendMessage(listPrefix)
                                }
                                // 获取当前序号
                                let prevItemAmount = page*listItemAmount
                                // 逐个获取物品
                                for (let index = prevItemAmount; index < prevItemAmount + listItemAmount; index++) {
                                    if (index == NeigeItemsData.itemIDList.length) break
                                    // 替换信息内变量
                                    let listItemMessage = listItemFormat.replace(/{index}/g, index+1)
                                    listItemMessage = listItemMessage.replace(/{ID}/g, NeigeItemsData.itemIDList[index])
                                    // 构建信息及物品
                                    if (sender instanceof Player) {
                                        let itemStack = getNiItem_NI(NeigeItemsData.itemIDList[index], sender, sender)
                                        listItemMessage = listItemMessage.split("{name}")
                                        let listItemRaw = new TellrawJson()
                                        for (let i = 0; i < listItemMessage.length; i++) {
                                            let tempRaw = new TellrawJson()
                                            tempRaw.append(listItemMessage[i]).runCommand("/ni get " + NeigeItemsData.itemIDList[index]).hoverText(clickGiveMessage)
                                            listItemRaw.append(tempRaw)
                                            if (i+1 != listItemMessage.length) listItemRaw.append(itemToTellrawJson_NI(itemStack).runCommand("/ni get " + NeigeItemsData.itemIDList[index]))
                                        }
                                        TLibBukkitAdapter.adaptCommandSender(sender).sendRawMessage(listItemRaw.toRawMessage())
                                    } else {
                                        // 在不传入玩家变量的情况下尝试构建物品获取物品名
                                        // 如果对于当前脚本而言, player是不可缺少的, 就直接获取配置里写的name
                                        // 如果配置里没有编写自定义名称, 就获取当前material的本地化名称
                                        try {
                                            let itemStack = getNiItem_NI(NeigeItemsData.itemIDList[index], sender, sender)
                                            sender.sendMessage(listItemMessage.replace(/{name}/g, getItemName_NI(itemStack)))
                                        } catch (error) {
                                            let itemKeySection = getItemKeySection_NI(NeigeItemsData.itemIDList[index])
                                            let itemName = ""
                                            if (itemKeySection.contains("name")) {
                                                itemName = itemKeySection.getString("name")
                                            } else {
                                                itemName = getItemName_NI(new ItemStack(Material.matchMaterial(itemKeySection.getString("material").toUpperCase())))
                                            }
                                            listItemMessage = listItemMessage.replace(/{name}/g, ChatColor.translateAlternateColorCodes("&", itemName))
                                            sender.sendMessage(listItemMessage)
                                        }
                                    }
                                }
                                let prevRaw = new TellrawJson()
                                prevRaw.append(listPrev)
                                if (page != 0) {
                                    prevRaw.hoverText(listPrev + ": " + page)
                                    prevRaw.runCommand("/ni list " + page)
                                }
                                let nextRaw = new TellrawJson()
                                nextRaw.append(listNext)
                                if (page != pageAmount-1) {
                                    nextRaw.hoverText(listNext + ": " + (page+2))
                                    nextRaw.runCommand("/ni list " + (page+2))
                                }
                                let listSuffixMessage = listSuffix.replace(/{current}/g, page+1).replace(/{total}/g, pageAmount)
                                if (sender instanceof Player) {
                                    listSuffixMessage = listSuffixMessage.replace(/{prev}/g, "!@#$%{prev}!@#$%").replace(/{next}/g, "!@#$%{next}!@#$%")
                                    listSuffixMessage = listSuffixMessage.split("!@#$%")
                                    listSuffixMessage.forEach(function(value) {
                                        if (value == "{prev}") {
                                            listMessage.append(prevRaw)
                                        }else if (value == "{next}") {
                                            listMessage.append(nextRaw)
                                        } else {
                                            listMessage.append(value)
                                        }
                                    })
                                    // 向玩家发送信息
                                    TLibBukkitAdapter.adaptCommandSender(sender).sendRawMessage(listMessage.toRawMessage())
                                } else {
                                    listSuffixMessage = listSuffixMessage.replace(/{prev}/g, listPrev).replace(/{next}/g, listNext)
                                    sender.sendMessage(listSuffixMessage)
                                }
                            } else {
                                // 非法数量提示
                                sender.sendMessage(invalidAmount)
                            }
                        })
                        return true
                    // nim get [物品ID] (数量) (是否反复随机) (指向数据) > 根据ID获取NI物品
                    case "get":
                        BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                            // 如果指令发送者不是玩家
                            if (sender instanceof Player) {
                                // 检测指令长度
                                if (args.length > 1) {
                                    // 检测是否存在对应ID的NI物品
                                    if (NeigeItemsData.itemIDList.indexOf(args[1]) != -1) {
                                        let data = null
                                        if (args.length > 4) data = Java.from(args).slice(4).join(" ")
                                        let itemAmt
                                        // 获取数量
                                        if (args.length == 2 || ((itemAmt = parseInt(args[2])) && itemAmt > 0)) {
                                            itemAmt = itemAmt || 1
                                            // 如果仅需一样的物品
                                            if (args.length > 3 && (args[3] == "false" || args[3] == "0")) {
                                                let itemStack = getNiItem_NI(args[1], sender, sender, data)
                                                // 替换提示信息中的占位符
                                                let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName_NI(itemStack))
                                                // 给予物品
                                                if (!giveItems_NI(sender, itemStack, itemAmt, givenInfoMessage)) {
                                                    // 给予失败提示
                                                    sender.sendMessage(failureInfo)
                                                }
                                            // 如果需要反复构建
                                            } else {
                                                // {物品名: 产出次数}
                                                let amtMap = new HashMap()
                                                // 循环构建物品
                                                for (let index = 0; index < itemAmt; index++) {
                                                    // 构建物品
                                                    let itemStack = getNiItem_NI(args[1], sender, sender, data)
                                                    // 记录物品名及次数
                                                    var itemName = getItemName_NI(itemStack)
                                                    if (amtMap[itemName] == null) {
                                                        amtMap[itemName] = 1
                                                    } else {
                                                        amtMap[itemName] ++
                                                    }
                                                    // 给予物品
                                                    if (!giveItem_NI(sender, itemStack)) {
                                                        // 给予失败提示
                                                        sender.sendMessage(failureInfo)
                                                        return
                                                    }
                                                }
                                                for (let key in amtMap) {
                                                    // 替换提示信息中的占位符
                                                    let givenInfoMessage = givenInfo.replace(/{amount}/g, amtMap[key])
                                                    givenInfoMessage = givenInfoMessage.replace(/{name}/g, key)
                                                    // 获取成功提示
                                                    if (givenInfoMessage) sender.sendMessage(givenInfoMessage)
                                                }
                                            }
                                        } else {
                                            // 非法数量提示
                                            sender.sendMessage(invalidAmount)
                                        }
                                    } else {
                                        // 替换提示信息中的占位符
                                        let unknownItemMessage = unknownItem.replace(/{itemID}/, args[1])
                                        // 未知物品提示
                                        sender.sendMessage(unknownItemMessage)
                                    }
                                } else {
                                    // 发送帮助信息
                                    sendMessages_NI(sender, helpMessages)
                                }
                            } else {
                                // 后台无法执行提示
                                sender.sendMessage(invalidPaser)
                            }
                        })
                        return true
                    // nim give [玩家ID] [物品ID] (数量) (是否反复随机) (指向数据) > 根据ID给予NI物品
                    case "give":
                        BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                            // 检测指令长度
                            if (args.length > 2) {
                                let player
                                // 获取对应在线玩家
                                if (player = Bukkit.getPlayer(args[1])) {
                                    // 检测是否存在对应ID的NI物品
                                    if (NeigeItemsData.itemIDList.indexOf(args[2]) != -1) {
                                        let data = null
                                        if (args.length > 5) data = Java.from(args).slice(5).join(" ")
                                        let itemAmt
                                        // 获取数量
                                        if (args.length == 3 || ((itemAmt = parseInt(args[3])) && itemAmt > 0)) {
                                            itemAmt = itemAmt || 1
                                            // 如果仅需一样的物品
                                            if (args.length > 4 && (args[4] == "false" || args[4] == "0")) {
                                                let itemStack = getNiItem_NI(args[2], player, sender, data)
                                                // 替换提示信息中的占位符
                                                let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName_NI(itemStack))
                                                // 给予物品
                                                if (!giveItems_NI(player, itemStack, itemAmt, givenInfoMessage)) {
                                                    // 给予失败提示
                                                    sender.sendMessage(failureInfo)
                                                }
                                                // 替换提示信息中的占位符
                                                let successInfoMessage = successInfo.replace(/{player}/g, args[1])
                                                successInfoMessage = successInfoMessage.replace(/{amount}/g, itemAmt)
                                                successInfoMessage = successInfoMessage.replace(/{name}/g, getItemName_NI(itemStack))
                                                // 给予成功提示
                                                sender.sendMessage(successInfoMessage)
                                            // 如果需要反复构建
                                            } else {
                                                // {物品名: 产出次数}
                                                let amtMap = new HashMap()
                                                // 循环构建物品
                                                for (let index = 0; index < itemAmt; index++) {
                                                    // 构建物品
                                                    let itemStack = getNiItem_NI(args[2], player, sender, data)
                                                    // 记录物品名及次数
                                                    var itemName = getItemName_NI(itemStack)
                                                    if (amtMap[itemName] == null) {
                                                        amtMap[itemName] = 1
                                                    } else {
                                                        amtMap[itemName] ++
                                                    }
                                                    // 给予物品
                                                    if (!giveItem_NI(player, itemStack)) {
                                                        // 给予失败提示
                                                        sender.sendMessage(failureInfo)
                                                        return
                                                    }
                                                }
                                                for (let key in amtMap) {
                                                    // 替换提示信息中的占位符
                                                    let givenInfoMessage = givenInfo.replace(/{amount}/g, amtMap[key])
                                                    givenInfoMessage = givenInfoMessage.replace(/{name}/g, key)
                                                    // 获取成功提示
                                                    if (givenInfoMessage) player.sendMessage(givenInfoMessage)
                                                    // 替换提示信息中的占位符
                                                    let successInfoMessage = successInfo.replace(/{player}/g, args[1])
                                                    successInfoMessage = successInfoMessage.replace(/{amount}/g, amtMap[key])
                                                    successInfoMessage = successInfoMessage.replace(/{name}/g, key)
                                                    // 给予成功提示
                                                    sender.sendMessage(successInfoMessage)
                                                }
                                            }
                                        } else {
                                            // 非法数量提示
                                            sender.sendMessage(invalidAmount)
                                        }
                                    } else {
                                        // 未知物品提示
                                        let unknownItemMessage = unknownItem.replace(/{itemID}/, args[2])
                                        sender.sendMessage(unknownItemMessage)
                                    }
                                } else {
                                    // 玩家不存在/不在线提示
                                    sender.sendMessage(invalidPlayer)
                                }
                            } else {
                                // 发送帮助信息
                                sendMessages_NI(sender, helpMessages)
                            }
                        })
                        return true
                    // nim giveAll [物品ID] (数量) (是否反复随机) (指向数据) > 根据ID给予所有人NI物品
                    case "giveall":
                        BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                            // 检测指令长度
                            if (args.length > 1) {
                                // 检测是否存在对应ID的NI物品
                                if (NeigeItemsData.itemIDList.indexOf(args[1]) != -1) {
                                    let data = null
                                    if (args.length > 4) data = Java.from(args).slice(4).join(" ")
                                    let itemAmt
                                    // 获取数量
                                    if (args.length == 2 || ((itemAmt = parseInt(args[2])) && itemAmt > 0)) {
                                        itemAmt = itemAmt || 1
                                        // 如果仅需一样的物品
                                        if (args.length > 3 && (args[3] == "false" || args[3] == "0")) {
                                            // 对于每个在线玩家
                                            Bukkit.getOnlinePlayers().forEach(function(player) {
                                                let itemStack = getNiItem_NI(args[1], player, sender, data)
                                                // 替换提示信息中的占位符
                                                let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName_NI(itemStack))
                                                // 给予物品
                                                if (!giveItems_NI(player, itemStack, itemAmt, givenInfoMessage)) {
                                                    // 给予失败提示
                                                    sender.sendMessage(failureInfo)
                                                }
                                                // 替换提示信息中的占位符
                                                let successInfoMessage = successInfo.replace(/{player}/g, player.getDisplayName())
                                                successInfoMessage = successInfoMessage.replace(/{amount}/g, itemAmt)
                                                successInfoMessage = successInfoMessage.replace(/{name}/g, getItemName_NI(itemStack))
                                                // 给予成功提示
                                                sender.sendMessage(successInfoMessage)
                                            })
                                        // 如果需要反复构建
                                        } else {
                                            // 对于每个在线玩家
                                            Bukkit.getOnlinePlayers().forEach(function(player) {
                                                // {物品名: 产出次数}
                                                let amtMap = new HashMap()
                                                // 循环构建物品
                                                for (let index = 0; index < itemAmt; index++) {
                                                    // 构建物品
                                                    itemStack = getNiItem_NI(args[1], player, sender, data)
                                                    // 记录物品名及次数
                                                    var itemName = getItemName_NI(itemStack)
                                                    if (amtMap[itemName] == null) {
                                                        amtMap[itemName] = 1
                                                    } else {
                                                        amtMap[itemName] ++
                                                    }
                                                    // 给予物品
                                                    if (!giveItem_NI(player, itemStack)) {
                                                        // 给予失败提示
                                                        sender.sendMessage(failureInfo)
                                                        return
                                                    }
                                                }
                                                for (let key in amtMap) {
                                                    // 替换提示信息中的占位符
                                                    let givenInfoMessage = givenInfo.replace(/{amount}/g, amtMap[key])
                                                    givenInfoMessage = givenInfoMessage.replace(/{name}/g, key)
                                                    // 获取成功提示
                                                    if (givenInfoMessage) player.sendMessage(givenInfoMessage)
                                                    // 替换提示信息中的占位符
                                                    let successInfoMessage = successInfo.replace(/{player}/g, args[1])
                                                    successInfoMessage = successInfoMessage.replace(/{amount}/g, amtMap[key])
                                                    successInfoMessage = successInfoMessage.replace(/{name}/g, key)
                                                    // 给予成功提示
                                                    sender.sendMessage(successInfoMessage)
                                                }
                                            })
                                        }
                                    } else {
                                        // 非法数量提示
                                        sender.sendMessage(invalidAmount)
                                    }
                                } else {
                                    // 替换提示信息中的占位符
                                    let unknownItemMessage = unknownItem.replace(/{itemID}/, args[1])
                                    // 未知物品提示
                                    sender.sendMessage(unknownItemMessage)
                                }
                            } else {
                                // 发送帮助信息
                                sendMessages_NI(sender, helpMessages)
                            }
                        })
                        return true
                    // nim drop [物品ID] [数量] [世界名] [X坐标] [Y坐标] [Z坐标] [是否反复随机] [物品解析对象] (指向数据) > 于指定位置掉落NI物品
                    case "drop":
                        BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                            // 检测指令长度
                            if (args.length > 6) {
                                let player
                                // 如果指令发送者是玩家 或 指令发送者是后台但指定了玩家
                                if (args.length > 8 || sender instanceof Player) {
                                    if (args.length > 8) {
                                        player = Bukkit.getOfflinePlayer(args[8])
                                    } else {
                                        player = sender
                                    }
                                    // 检测是否存在对应ID的NI物品
                                    if (NeigeItemsData.itemIDList.indexOf(args[1]) != -1) {
                                        let data = null
                                        if (args.length > 9) data = Java.from(args).slice(9).join(" ")
                                        let itemAmt
                                        // 获取数量
                                        if ((itemAmt = parseInt(args[2])) && itemAmt > 0) {
                                            // 获取世界
                                            let world = Bukkit.getWorld(args[3])
                                            let x = parseFloat(args[4])
                                            let y = parseFloat(args[5])
                                            let z = parseFloat(args[6])
                                            // 如果存在世界
                                            if (world != null) {
                                                // 如果坐标合法
                                                if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
                                                    // 如果仅需一样的物品
                                                    if (args.length > 7 && (args[7] == "false" || args[7] == "0")) {
                                                        let itemStack = getNiItem_NI(args[1], player, sender, data)
                                                        // 掉落物品
                                                        dropItems_NI(world, x, y, z, itemStack, itemAmt)
                                                        // 替换提示信息中的占位符
                                                        let dropSuccessInfoMessage = dropSuccessInfo.replace(/{world}/g, args[3])
                                                        dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{x}/g, args[4])
                                                        dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{y}/g, args[5])
                                                        dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{z}/g, args[6])
                                                        dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{amount}/g, itemAmt)
                                                        dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{name}/g, getItemName_NI(itemStack))
                                                        // 给予成功提示
                                                        sender.sendMessage(dropSuccessInfoMessage)
                                                    // 如果需要反复构建
                                                    } else {
                                                        // {物品名: 产出次数}
                                                        let amtMap = new HashMap()
                                                        // 循环构建物品
                                                        for (let index = 0; index < itemAmt; index++) {
                                                            // 构建物品
                                                            let itemStack = getNiItem_NI(args[1], player, sender, data)
                                                            // 记录物品名及次数
                                                            var itemName = getItemName_NI(itemStack)
                                                            if (amtMap[itemName] == null) {
                                                                amtMap[itemName] = 1
                                                            } else {
                                                                amtMap[itemName] ++
                                                            }
                                                            // 掉落物品
                                                            dropItems_NI(world, x, y, z, itemStack, itemAmt)
                                                        }
                                                        for (let key in amtMap) {
                                                            // 替换提示信息中的占位符
                                                            let dropSuccessInfoMessage = dropSuccessInfo.replace(/{world}/g, args[3])
                                                            dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{x}/g, args[4])
                                                            dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{y}/g, args[5])
                                                            dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{z}/g, args[6])
                                                            dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{amount}/g, amtMap[key])
                                                            dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{name}/g, key)
                                                            // 给予成功提示
                                                            sender.sendMessage(dropSuccessInfoMessage)
                                                        }
                                                    }
                                                } else {
                                                    // 非法坐标提示
                                                    sender.sendMessage(invalidLocation)
                                                }
                                            } else {
                                                // 非法世界提示
                                                sender.sendMessage(invalidWorld)
                                            }
                                        } else {
                                            // 非法数量提示
                                            sender.sendMessage(invalidAmount)
                                        }
                                    } else {
                                        // 替换提示信息中的占位符
                                        let unknownItemMessage = unknownItem.replace(/{itemID}/, args[1])
                                        // 未知物品提示
                                        sender.sendMessage(unknownItemMessage)
                                    }
                                } else {
                                    // 无效解析对象提示
                                    sender.sendMessage(invalidPaser)
                                }
                            } else {
                                // 发送帮助信息
                                sendMessages_NI(sender, helpMessages)
                            }
                        })
                        return true
                    // nim save [物品ID] (保存路径) > 将手中物品以对应ID保存至对应路径
                    case "save":
                        BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                            // 检测指令长度
                            if (args.length > 1) {
                                // 获取手中物品
                                let itemStack = sender.getInventory().getItemInMainHand()
                                // 获取保存路径
                                let path
                                args.length > 2 ? path = args[2] : path = args[1] + ".yml"
                                let saveResult
                                // 保存物品
                                if (saveResult = saveNiItem_NI(itemStack, args[1], path, false)) {
                                    // 重载物品列表
                                    getNiItems_NI()
                                    // 替换提示信息中的占位符
                                    let successSaveInfoMessage = successSaveInfo.replace(/{name}/g, getItemName_NI(itemStack))
                                    successSaveInfoMessage = successSaveInfoMessage.replace(/{itemID}/g, args[1])
                                    successSaveInfoMessage = successSaveInfoMessage.replace(/{path}/g, path)
                                    // 保存成功提示
                                    sender.sendMessage(successSaveInfoMessage)
                                } else if (saveResult == 0) {
                                    // 物品ID已存在提示
                                    let existedKeyMessage = existedKey.replace(/{itemID}/g, args[1])
                                    sender.sendMessage(existedKeyMessage)
                                } else {
                                    // 空气提示
                                    sender.sendMessage(airItem)
                                }
                            } else {
                                // 发送帮助信息
                                sendMessages_NI(sender, helpMessages)
                            }
                        })
                        return true
                    // nim cover [物品ID] (保存路径) > 将手中物品以对应ID覆盖至对应路径
                    case "cover":
                        BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                            // 检测指令长度
                            if (args.length > 1) {
                                // 获取手中物品
                                let itemStack = sender.getInventory().getItemInMainHand()
                                // 获取保存路径
                                let path
                                args.length > 2 ? path = args[2] : path = args[1] + ".yml"
                                // 保存物品
                                let saveResult = saveNiItem_NI(itemStack, args[1], path, true)
                                if (saveResult != 2) {
                                    // 重载物品列表
                                    getNiItems_NI()
                                    // 替换提示信息中的占位符
                                    let successSaveInfoMessage = successSaveInfo.replace(/{name}/g, getItemName_NI(itemStack))
                                    successSaveInfoMessage = successSaveInfoMessage.replace(/{itemID}/g, args[1])
                                    successSaveInfoMessage = successSaveInfoMessage.replace(/{path}/g, path)
                                    // 保存成功提示
                                    sender.sendMessage(successSaveInfoMessage)
                                } else {
                                    // 空气提示
                                    sender.sendMessage(airItem)
                                }
                            } else {
                                // 发送帮助信息
                                sendMessages_NI(sender, helpMessages)
                            }
                        })
                        return true
                    case "mm":
                        // 检测指令长度
                        if (args.length > 1) {
                            if (!Tool.isPluginEnabled("MythicMobs")) {
                                // 发送未发现前置插件信息
                                sender.sendMessage(invalidPlugin.replace(/{plugin}/g, "MythicMobs"))
                                return true
                            }
                            let MythicMobs = Tool.getPlugin("MythicMobs")
                            let itemManager = MythicMobs.getItemManager()
                            switch(args[1].toLowerCase()) {
                                // nim mm load [物品ID] (保存路径) > 将对应ID的MM物品保存为NI物品
                                case "load":
                                    BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                                        // 检测指令长度
                                        if (args.length > 2) {
                                            // 获取MM物品
                                            let itemStack = itemManager.getItemStack(args[2])
                                            if (itemStack != null){
                                                // 获取保存路径
                                                let path
                                                args.length > 3 ? path = args[3] : path = MMItemsPath
                                                let saveResult
                                                // 保存物品
                                                if (saveResult = saveNiItem_NI(itemStack, args[2], path, false)) {
                                                    // 重载物品列表
                                                    getNiItems_NI()
                                                    // 替换提示信息中的占位符
                                                    let successSaveInfoMessage = successSaveInfo.replace(/{name}/g, getItemName_NI(itemStack))
                                                    successSaveInfoMessage = successSaveInfoMessage.replace(/{itemID}/g, args[2])
                                                    successSaveInfoMessage = successSaveInfoMessage.replace(/{path}/g, path)
                                                    // 保存成功提示
                                                    sender.sendMessage(successSaveInfoMessage)
                                                } else if (saveResult == 0) {
                                                    // 替换提示信息中的占位符
                                                    let existedKeyMessage = existedKey.replace(/{itemID}/g, args[2])
                                                    // 物品ID已存在提示
                                                    sender.sendMessage(existedKeyMessage)
                                                } else {
                                                    // 空气提示
                                                    sender.sendMessage(airItem)
                                                }
                                            } else {
                                                // 替换给予信息中的占位符
                                                let unknownItemMessage = unknownItem.replace(/{itemID}/, args[2])
                                                // 未知物品提示
                                                sender.sendMessage(unknownItemMessage)
                                            }
                                        } else {
                                            // 发送帮助信息
                                            sendMessages_NI(sender, helpMessages)
                                        }
                                    })
                                    break
                                // nim mm cover [物品ID] (保存路径) > 将对应ID的MM物品覆盖为NI物品
                                case "cover":
                                    BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                                        // 检测指令长度
                                        if (args.length > 2) {
                                            // 获取MM物品
                                            let itemStack = itemManager.getItemStack(args[2])
                                            if (itemStack != null){
                                                // 获取保存路径
                                                let path
                                                args.length > 3 ? path = args[3] : path = MMItemsPath
                                                let saveResult = saveNiItem_NI(itemStack, args[2], path, true)
                                                // 保存物品
                                                if (saveResult != 2) {
                                                    // 重载物品列表
                                                    getNiItems_NI()
                                                    // 替换提示信息中的占位符
                                                    let successSaveInfoMessage = successSaveInfo.replace(/{name}/g, getItemName_NI(itemStack))
                                                    successSaveInfoMessage = successSaveInfoMessage.replace(/{itemID}/g, args[2])
                                                    successSaveInfoMessage = successSaveInfoMessage.replace(/{path}/g, path)
                                                    // 保存成功提示
                                                    sender.sendMessage(successSaveInfoMessage)
                                                } else {
                                                    // 空气提示
                                                    sender.sendMessage(airItem)
                                                }
                                            } else {
                                                // 替换给予信息中的占位符
                                                let unknownItemMessage = unknownItem.replace(/{itemID}/, args[2])
                                                // 未知物品提示
                                                sender.sendMessage(unknownItemMessage)
                                            }
                                        } else {
                                            // 发送帮助信息
                                            sendMessages_NI(sender, helpMessages)
                                        }
                                    })
                                    break
                                // nim mm loadAll (保存路径) > 将全部MM物品转化为NI物品
                                case "loadall":
                                    BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                                        // 获取保存路径
                                        let path
                                        args.length > 2 ? path = args[2] : path = MMItemsPath
                                        // 获取全部MM物品并操作
                                        for (let index = 0; index < mmIds.length; index++) {
                                            let mmId = mmIds[index]
                                            let itemStack = itemManager.getItemStack(mmId)
                                            let saveResult = saveNiItem_NI(itemStack, mmId, path, false)
                                            // 保存物品
                                            if (saveResult == 0) {
                                                // 替换提示信息中的占位符
                                                let existedKeyMessage = existedKey.replace(/{itemID}/g, mmId)
                                                // 物品ID已存在提示
                                                sender.sendMessage(existedKeyMessage)
                                            } else if (saveResult == 2) {
                                                // 空气提示
                                                sender.sendMessage(airItem)
                                            }
                                        }
                                        // 重载物品列表
                                        getNiItems_NI()
                                        // 替换提示信息中的占位符
                                        let mMImportSuccessInfoMessage = mMImportSuccessInfo.replace(/{path}/g, path)
                                        // 保存成功提示
                                        sender.sendMessage(mMImportSuccessInfoMessage)
                                    })
                                    break
                                // nim mm get [物品ID] (数量) > 根据ID获取MM物品
                                case "get":
                                    BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                                        // 如果指令发送者不是玩家
                                        if (sender instanceof Player) {
                                            // 检测指令长度
                                            if (args.length > 2) {
                                                // 获取MM物品
                                                let itemStack = itemManager.getItemStack(args[2])
                                                if (itemStack != null){
                                                    let itemAmt
                                                    // 获取数量
                                                    if (args.length == 3 || ((itemAmt = parseInt(args[3])) && itemAmt > 0)) {
                                                        itemAmt = itemAmt || 1
                                                        // 替换给予信息中的占位符
                                                        let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                        givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName_NI(itemStack))
                                                        // 给予物品
                                                        if (!giveItems_NI(sender, itemStack, itemAmt, givenInfoMessage)) {
                                                            // 给予失败提示
                                                            sender.sendMessage(failureInfo)
                                                        }
                                                    } else {
                                                        // 非法数量提示
                                                        sender.sendMessage(invalidAmount)
                                                    }
                                                } else {
                                                    // 替换给予信息中的占位符
                                                    let unknownItemMessage = unknownItem.replace(/{itemID}/, args[2])
                                                    // 未知物品提示
                                                    sender.sendMessage(unknownItemMessage)
                                                }
                                            } else {
                                                // 发送帮助信息
                                                sendMessages_NI(sender, helpMessages)
                                            }
                                        } else {
                                            // 后台无法执行提示
                                            sender.sendMessage(invalidPaser)
                                        }
                                    })
                                    break
                                // nim mm give [玩家ID] [物品ID] (数量) > 根据ID给予MM物品
                                case "give":
                                    BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                                        if (args.length > 3) {
                                            let player
                                            // 获取对应在线玩家
                                            if (player = Bukkit.getPlayer(args[2])) {
                                                // 获取MM物品
                                                let itemStack = itemManager.getItemStack(args[3])
                                                if (itemStack != null){
                                                    let itemAmt
                                                    // 获取数量
                                                    if (args.length == 4 || ((itemAmt = parseInt(args[4])) && itemAmt > 0)) {
                                                        itemAmt = itemAmt || 1
                                                        // 替换给予信息中的占位符
                                                        let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                        givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName_NI(itemStack))
                                                        // 给予物品
                                                        if (!giveItems_NI(player, itemStack, itemAmt, givenInfoMessage)) {
                                                            // 给予失败提示
                                                            sender.sendMessage(failureInfo)
                                                        }
                                                        // 替换给予信息中的占位符
                                                        let successInfoMessage = successInfo.replace(/{player}/g, args[2])
                                                        successInfoMessage = successInfoMessage.replace(/{amount}/g, itemAmt)
                                                        successInfoMessage = successInfoMessage.replace(/{name}/g, getItemName_NI(itemStack))
                                                        // 给予成功提示
                                                        sender.sendMessage(successInfoMessage)
                                                    } else {
                                                        // 非法数量提示
                                                        sender.sendMessage(invalidAmount)
                                                    }
                                                } else {
                                                    // 替换给予信息中的占位符
                                                    let unknownItemMessage = unknownItem.replace(/{itemID}/, args[3])
                                                    // 未知物品提示
                                                    sender.sendMessage(unknownItemMessage)
                                                }
                                            } else {
                                                // 玩家不存在/不在线提示
                                                sender.sendMessage(invalidPlayer)
                                            }
                                        } else {
                                            // 发送帮助信息
                                            sendMessages_NI(sender, helpMessages)
                                        }
                                    })
                                    break
                                // nim mm giveAll [物品ID] (数量) > 根据ID给予所有人MM物品
                                case "giveall":
                                    BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                                        // 检测指令长度
                                        if (args.length > 2) {
                                            // 获取MM物品
                                            let itemStack = itemManager.getItemStack(args[2])
                                            if (itemStack != null){
                                                let itemAmt
                                                // 获取数量
                                                if (args.length == 3 || ((itemAmt = parseInt(args[3])) && itemAmt > 0)) {
                                                    itemAmt = itemAmt || 1
                                                    // 替换给予信息中的占位符
                                                    let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                    givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName_NI(itemStack))
                                                    // 对于每个在线玩家
                                                    Bukkit.getOnlinePlayers().forEach(function(player) {
                                                        // 给予物品
                                                        if (!giveItems_NI(player, itemStack, itemAmt, givenInfoMessage)) {
                                                            // 给予失败提示
                                                            sender.sendMessage(failureInfo)
                                                        }
                                                    })
                                                    // 替换提示信息中的占位符
                                                    let successInfoMessage = successInfo.replace(/{player}/g, "所有玩家")
                                                    successInfoMessage = successInfoMessage.replace(/{amount}/g, itemAmt)
                                                    successInfoMessage = successInfoMessage.replace(/{name}/g, getItemName_NI(itemStack))
                                                    // 给予成功提示
                                                    sender.sendMessage(successInfoMessage)
                                                } else {
                                                    // 非法数量提示
                                                    sender.sendMessage(invalidAmount)
                                                }
                                            } else {
                                                // 替换给予信息中的占位符
                                                let unknownItemMessage = unknownItem.replace(/{itemID}/, args[2])
                                                // 未知物品提示
                                                sender.sendMessage(unknownItemMessage)
                                            }
                                        } else {
                                            // 发送帮助信息
                                            sendMessages_NI(sender, helpMessages)
                                        }
                                    })
                                    break
                                default:
                                    // 发送帮助信息
                                    sendMessages_NI(sender, helpMessages)
                            }
                        } else {
                            // 发送帮助信息
                            sendMessages_NI(sender, helpMessages)
                        }
                        return true
                    // nim reload > 重新加载NI物品
                    case "reload":
                        BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                            // 重载配置文件
                            loadConfig_NI()
                            // 重载物品动作函数
                            loadAction_NI()
                            // 重载NI脚本文件
                            loadScripts_NI()
                            // 创建节点缓存对象
                            NeigeItemsData.sections = {}
                            // 重载全局节点列表
                            getGlobalSections_NI()
                            // 重载NI物品列表
                            getNiItems_NI()
                            // 重载NI物品动作列表
                            getActions_NI()
                            // 重载MM物品列表
                            if (Tool.isPluginEnabled("MythicMobs")) {
                                loadMMItem_NI()
                            }
                            // 重载成功提示
                            sender.sendMessage(reloadedMessage)
                        })
                        return true
                    default:
                        // 发送帮助信息
                        sendMessages_NI(sender, helpMessages)
                        return true
                }
            } else {
                // 权限不足提示
                sender.sendMessage(insufficientPermissions)
                return true
            }
        }
        return false
    })
    // 指令补全列表
    command.setTabCompleter(function(sender, command, alias, args) {
        let emptyList = Arrays.asList([])
        // 仅限后台/OP使用
        if (!(sender instanceof Player) || sender.isOp()) {
            switch(args.length) {
                case 1:
                    return Arrays.asList(["list", "get", "give", "giveAll", "drop", "save", "cover", "mm", "help", "reload"])
                case 2:
                    switch(args[0].toLowerCase()) {
                        case "list":
                            return incrementingArray_NI(pageAmount)
                        case "get":
                            return NeigeItemsData.itemIDList
                        case "give":
                            return onlinePlayerNames_NI()
                        case "giveall":
                            return NeigeItemsData.itemIDList
                        case "drop":
                            return NeigeItemsData.itemIDList
                        case "mm":
                            return Arrays.asList(["load", "cover", "loadAll", "get", "give"])
                        default:
                            return emptyList
                    }
                case 3:
                    switch(args[0].toLowerCase()) {
                        case "give":
                            return NeigeItemsData.itemIDList
                        case "mm":
                            switch(args[1].toLowerCase()) {
                                case "load":
                                    return NeigeItemsData.mmIds
                                case "cover":
                                    return NeigeItemsData.mmIds
                                case "get":
                                    return NeigeItemsData.mmIds
                                case "give":
                                    return onlinePlayerNames_NI()
                                case "giveall":
                                    return NeigeItemsData.mmIds
                                default:
                                    return emptyList
                            }
                        default:
                            return emptyList
                    }
                case 4:
                    switch(args[0].toLowerCase()) {
                        case "get":
                            return Arrays.asList(["true", "false"])
                        case "giveall":
                            return Arrays.asList(["true", "false"])
                        case "mm":
                            switch(args[1].toLowerCase()) {
                                case "give":
                                    return NeigeItemsData.mmIds
                                default:
                                    return emptyList
                            }
                        case "drop":
                            return getWorldNames_NI()
                        default:
                            return emptyList
                    }
                case 5:
                    switch(args[0].toLowerCase()) {
                        case "give":
                            return Arrays.asList(["true", "false"])
                        default:
                            return emptyList
                    }
                case 8:
                    switch(args[0].toLowerCase()) {
                        case "drop":
                            return Arrays.asList(["true", "false"])
                        default:
                            return emptyList
                    }
                case 9:
                    switch(args[0].toLowerCase()) {
                        case "drop":
                            return onlinePlayerNames_NI()
                        default:
                            return emptyList
                    }
            } 
        }
        return emptyList
    })
    // 注册指令
    BukkitScheduler.callSyncMethod(Tool.getPlugin("Pouvoir"), function() {
        Tool.regCommand(command)
    })
}

/**
 * 玩家交互方块事件
 * @param event PlayerInteractEvent 玩家交互方块事件
 */
function onPlayerInteract_NI(event) {
    let Action = Packages.org.bukkit.event.block.Action
    let Bukkit = Packages.org.bukkit.Bukkit
    let BukkitScheduler = Bukkit.getScheduler()
    let Material = Packages.org.bukkit.Material
    let NMSKt = Packages.com.skillw.pouvoir.taboolib.module.nms.NMSKt
    let ItemTagData = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagData
    // 获取玩家
    var player = event.player
    // 获取手持物品
    let itemStack = event.item
    if (itemStack == null || itemStack.getType() == Material.AIR) return
    // 获取交互类型
    let action = event.action
    var leftAction = (action == Action.LEFT_CLICK_AIR || action == Action.LEFT_CLICK_BLOCK)
    var rightAction = (action == Action.RIGHT_CLICK_AIR || action == Action.RIGHT_CLICK_BLOCK)
    // 获取物品NBT
    var itemTag = NMSKt.getItemTag(itemStack)
    // 如果为非NI物品则终止操作
    if (!itemTag.containsKey("NeigeItems")) return
    // 获取物品消耗信息
    let itemAction = NeigeItemsData.actions[itemTag.NeigeItems.id.asString()]
    if (itemAction == undefined) return
    let consume =  itemAction.consume
    // 如果物品配置了消耗事件
    if (consume != undefined) {
        // 获取待消耗数量
        let amount = consume.amount || 1
        // 获取物品使用次数
        let charge = itemTag.NeigeItems.charge
        // 检测数量是否充足/是否存在使用次数
        if (itemStack.amount >= amount || (charge != undefined)) {
            // 获取左键是否消耗
            var left = (leftAction && consume.left)
            // 获取右键是否消耗
            var right = (rightAction && consume.right)
            // 如果该物品需要被消耗
            if (left || right) {
                // 取消交互事件
                event.setCancelled(true)
                // 获取冷却
                let cooldown = parseInt(consume.cooldown)
                // 如果冷却存在且大于0
                if (cooldown != undefined && cooldown > 0) {
                    // 获取当前时间
                    let time = new Date().getTime()
                    // 获取上次使用时间
                    let lastTime = getMetadata_NI(player, "NeigeItems-Consume-Cooldown-" + itemTag.NeigeItems.id, "Double", 0)
                    // 如果仍处于冷却时间
                    if ((lastTime + cooldown) > time) {
                        PlayerUtils.sendActionBar(player, config_NI.itemCooldown.replace(/{time}/g, ((lastTime + cooldown - time)/1000).toFixed(1)))
                        // 终止操作
                        return
                    }
                    setMetadata_NI(player, "NeigeItems-Consume-Cooldown-" + itemTag.NeigeItems.id, time)
                }
                // 如果物品存在使用次数
                if (charge != undefined) {
                    let itemClone = null
                    // 拆分物品
                    if (itemStack.amount != 1) {
                        itemClone = itemStack.clone()
                        itemClone.setAmount(itemClone.amount - 1)
                        itemStack.setAmount(1)
                    }
                    // 更新次数
                    let chargeInt = charge.asInt()
                    if (chargeInt == 1) {
                        itemStack.setAmount(0)
                    } else {
                        itemTag.NeigeItems.charge = new ItemTagData(chargeInt - 1)
                        itemTag.saveTo(itemStack)
                    }
                    if (itemClone) giveItem_NI(player, itemClone)
                } else {
                    // 消耗物品
                    itemStack.setAmount(itemStack.getAmount()-amount)
                }
                // 执行动作
                BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
                    executeNiAction_NI(player, itemTag, left, right)
                })
            }
        }
    } else if (NeigeItemsData.actions[itemTag.NeigeItems.id.asString()]) {
        // 取消交互事件
        event.setCancelled(true)
        BukkitScheduler["runTaskAsynchronously(Plugin,Runnable)"](Tool.getPlugin("Pouvoir"), function() {
            // 获取冷却
            let cooldown = parseInt(NeigeItemsData.actions[itemTag.NeigeItems.id.asString()].cooldown)
            // 如果冷却存在且大于0
            if (cooldown != undefined && cooldown > 0) {
                // 获取当前时间
                let time = new Date().getTime()
                // 获取上次使用时间
                let lastTime = getMetadata_NI(player, "NeigeItems-Cooldown-" + itemTag.NeigeItems.id, "Double", 0)
                // 如果仍处于冷却时间
                if ((lastTime + cooldown) > time) {
                    PlayerUtils.sendActionBar(player, config_NI.itemCooldown.replace(/{time}/g, ((lastTime + cooldown - time)/1000).toFixed(1)))
                    // 终止操作
                    return
                }
                setMetadata_NI(player, "NeigeItems-Cooldown-" + itemTag.NeigeItems.id, time)
            }
            // 执行动作
            executeNiAction_NI(player, itemTag, leftAction, rightAction)
        })
    }
}

/**
 * 执行NI动作
 * @param player Player 物品ID
 * @param itemNBT ItemTag 物品NBT
 * @param left Boolean 是否执行左键动作
 * @param right Boolean 是否执行右键动作
 */
function executeNiAction_NI(player, itemNBT, left, right) {
    let actions
    if (actions = NeigeItemsData.actions[itemNBT.NeigeItems.id.asString()]) {
        if (left && actions.left) {
            runAction_NI(player, actions.left, itemNBT)
        }
        if (right && actions.right) {
            runAction_NI(player, actions.right, itemNBT)
        }
        if (actions.all) {
            runAction_NI(player, actions.all, itemNBT)
        }
    }
}

/**
 * 执行动作
 * @param player Player 物品ID
 * @param action String/ArrayList 物品动作
 * @param itemNBT ItemTag 物品NBT
 */
function runAction_NI(player, action, itemNBT) {
    let ArrayList = Packages.java.util.ArrayList
    let String = Packages.java.lang.String
    let MemorySection = Packages.org.bukkit.configuration.MemorySection

    if (action instanceof String) {
        if (itemNBT != undefined) {
            action = getSection_NI(null, action, null, null, itemNBT)
        }
        let actionType = action.toLowerCase()
        let actionContent = ""
        let index = action.indexOf(": ")
        if (index != -1) {
            actionType = action.slice(0, index).toLowerCase()
            actionContent = action.slice(index+2)
        }
        let actionFunction = NeigeItemsData.action[actionType]
        if (actionFunction != undefined) {
            return actionFunction(player, actionContent)
        } else {
            print("§e[NI] §6未知物品动作: §f" + actionType)
        }
    } else if (action instanceof ArrayList) {
        for (let index = 0; index < action.length; index++) {
            if (!runAction_NI(player, action[index], itemNBT)) {
                return
            }
        }
    } else if (action instanceof MemorySection) {

    }
}

/**
 * 将物品以对应ID保存至对应路径
 * @param itemStack ItemStack 物品
 * @param itemKey String 物品ID
 * @param path String 保存路径
 * @param cover Boolean 是否覆盖
 * @return 0: 已存在对应ID物品, 1: 成功保存, 2: 物品为空
 */
function saveNiItem_NI(itemStack, itemKey, path, cover) {
    let NMSKt = Packages.com.skillw.pouvoir.taboolib.module.nms.NMSKt
    let YamlConfiguration = Packages.org.bukkit.configuration.file.YamlConfiguration
    let Material = Packages.org.bukkit.Material

    path = path || itemKey + ".yml"

    // 检测是否为空气
    if (itemStack != null && itemStack.getType() != Material.AIR) {
        // 获取路径文件
        let dir = getDir_NI(scriptName_NI + java.io.File.separator + "Items")
        file = getFile_NI(dir, path)
        let config = YamlConfiguration.loadConfiguration(file)
        // 检测节点是否存在
        if ((NeigeItemsData.itemIDList.indexOf(itemKey) == -1) || cover) {
            // 创建物品节点
            config.createSection(itemKey)
            let itemKeySection = config.getConfigurationSection(itemKey)
            // 设置物品材质
            itemKeySection.set("material", itemStack.getType().toString())
            // 如果物品有ItemMeta
            if (itemStack.hasItemMeta()) {
                // 获取ItemMeta
                let itemMeta = itemStack.getItemMeta()
                // 获取物品NBT
                let itemNBT = toHashMapNBT_NI(NMSKt.getItemTag(itemStack))
                // 获取显示信息
                let display = itemNBT.display
                itemNBT.remove("display")
                // 设置CustomModelData
                if (itemMeta.hasCustomModelData != undefined
                    && itemMeta.hasCustomModelData()) {
                    itemKeySection.set("custommodeldata", itemMeta.getCustomModelData())
                }
                // 设置子ID/损伤值
                if (itemStack.getDurability() != 0) {
                    itemKeySection.set("damage", itemStack.getDurability())
                }
                // 设置物品名
                if (itemMeta.hasDisplayName()) {
                    itemKeySection.set("name", itemMeta.getDisplayName())
                }
                // 设置Lore
                if (itemMeta.hasLore()) {
                    itemKeySection.set("lore", itemMeta.getLore())
                }
                // 设置是否无法破坏
                if (itemMeta.isUnbreakable()) {
                    itemKeySection.set("unbreakable", itemMeta.isUnbreakable())
                }
                // 设置物品附魔
                if (itemMeta.hasEnchants()) {
                    itemKeySection.createSection("enchantments")
                    let enchantSection = itemKeySection.getConfigurationSection("enchantments")
                    itemMeta.getEnchants().keySet().forEach(function(enchant) {
                        if (enchant != null) {
                            enchantSection.set(enchant.getName(), itemMeta.getEnchantLevel(enchant))
                        }
                    })
                }
                // 设置ItemFlags
                let flags = itemMeta.getItemFlags().toArray()
                if (flags.length) {
                    for (let key in flags) {
                        flags[key] = flags[key].toString()
                    }
                    itemKeySection.set("hideflags", flags)
                }
                // 设置物品颜色
                if (display && display.containsKey("color")) {
                    itemKeySection.set("color", parseInt(display.color.slice(6)).toString(16).toUpperCase())
                }
                // 设置物品NBT
                if (!itemNBT.isEmpty()) {
                    itemKeySection.set("nbt", itemNBT)
                }
            }
            config.save(file)
            if (NeigeItemsData.itemIDList.indexOf(itemKey) == -1) return 1
            return 0
        } else {
            return 0
        }
    } else {
        return 2
    }
}

/**
 * 根据ID获取物品配置
 * @param itemID String 物品ID
 * @return MemorySection
 */
function getItemKeySection_NI(itemID) {
    for (let index = 0; index < NeigeItemsData.itemConfigs.length; index++) {
        const config = NeigeItemsData.itemConfigs[index]
        if (config.contains(itemID)) {
            return config.getConfigurationSection(itemID)
        }
    }
    return null
}

/**
 * 根据ID获取物品
 * @param itemID String 物品ID
 * @param player Player 用于解析PAPI变量
 * @param sender 用于发送错误信息
 * @param data String 指向数据
 * @return ItemStack
 */
function getNiItem_NI(itemID, player, sender, data) {
    let ArrayList = Packages.java.util.ArrayList
    let String = Packages.java.lang.String
    let ThreadLocalRandom = java.util.concurrent.ThreadLocalRandom
    let ItemTag = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTag
    let ItemTagData = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagData
    let NMSKt = Packages.com.skillw.pouvoir.taboolib.module.nms.NMSKt
    let Bukkit = Packages.org.bukkit.Bukkit
    let ChatColor = Packages.org.bukkit.ChatColor
    let Color = Packages.org.bukkit.Color
    let Enchantment = Packages.org.bukkit.enchantments.Enchantment
    let ItemFlag = Packages.org.bukkit.inventory.ItemFlag
    let ItemStack = Packages.org.bukkit.inventory.ItemStack
    let Material = Packages.org.bukkit.Material
    let MemorySection = Packages.org.bukkit.configuration.MemorySection
    let Player = Packages.org.bukkit.entity.Player
    let YamlConfiguration = Packages.org.bukkit.configuration.file.YamlConfiguration
    let BukkitServer = Bukkit.getServer()

    let invalidNBT = config_NI.invalidNBT
    let invalidItem = config_NI.invalidItem

    // 获取对应物品配置
    let itemKeySection = getItemKeySection_NI(itemID)
    if (itemKeySection == null) return null

    // 进行模板继承
    if (itemKeySection.contains("inherit")) {
        let tempConfigSection = new YamlConfiguration()
        var inheritInfo = itemKeySection.get("inherit")
        // 检测进行全局继承/部分继承
        if (inheritInfo instanceof MemorySection) {
            /**
             * 指定多个ID, 进行部分继承
             * @variable key String 要进行继承的节点ID
             * @variable value String 用于获取继承值的模板ID
             */
            inheritInfo.getKeys(true).forEach(function(key) {
                let value = inheritInfo.get(key)
                // 检测当前键是否为末级键
                if (value instanceof String) {
                    // 获取模板
                    let currentSection = getItemKeySection_NI(value)
                    // 如果模板存在该键, 进行继承
                    if (currentSection.contains(key)) {
                        tempConfigSection.set(key, currentSection.get(key))
                    }
                }
            })
        } else if (inheritInfo instanceof String) {
            // 仅指定单个模板ID，进行全局继承
            tempConfigSection = getItemKeySection_NI(inheritInfo)
        } else if (inheritInfo instanceof ArrayList) {
            // 顺序继承, 按顺序进行覆盖式继承
            for (let index = 0; index < inheritInfo.length; index++) {
                const currentSection = getItemKeySection_NI(inheritInfo[index])
                currentSection.getKeys(true).forEach(function(key) {
                    let value = currentSection.get(key)
                    if (!(value instanceof MemorySection)) {
                        tempConfigSection.set(key, currentSection.get(key))
                    }
                })
            }
        }
        // 覆盖其余物品配置
        itemKeySection.getKeys(true).forEach(function(key) {
            let value = itemKeySection.get(key)
            if (!(value instanceof MemorySection)) {
                tempConfigSection.set(key, itemKeySection.get(key))
            }
        })
        itemKeySection = tempConfigSection
    }

    // 获取随机数, 用于代表当前物品
    let random = ThreadLocalRandom.current().nextFloat()
    NeigeItemsData.sections[random] = {}
    // 加载指向数据
    if (data) dataParse_NI(data, random)
    // 对文本化配置进行全局PAPI解析
    let tempItemKeySection = new YamlConfiguration()
    tempItemKeySection.set(itemID, itemKeySection)
    let stringSection = tempItemKeySection.saveToString()
    if (player instanceof Player) stringSection = setPapiWithNoColor_NI(player, stringSection)
    tempItemKeySection = new YamlConfiguration()
    tempItemKeySection.loadFromString(stringSection)
    itemKeySection = tempItemKeySection.getConfigurationSection(itemID)
    // 如果调用了全局节点
    if (itemKeySection.contains("globalsections")) {
        // 获取全局节点ID
        var gSectionIDList = itemKeySection.getStringList("globalsections")
        // 针对每个试图调用的全局节点
        gSectionIDList.forEach(function(gSectionID) {
            // 在每个全局节点文件进行查找
            for (let index = 0; index < NeigeItemsData.globalSections.length; index++) {
                // 获取[config, [id]]
                const gSectionIDs = NeigeItemsData.globalSections[index]
                // 如果调用的节点名与当前文件名重复, 直接调用文件内所有节点
                if (NeigeItemsData.globalSectionFileNames[index] == gSectionID) {
                    for (let index = 0; index < gSectionIDs[1].length; index++) {
                        const gSectionID = gSectionIDs[1][index]
                        itemKeySection.set("sections." + gSectionID, gSectionIDs[0].getConfigurationSection(gSectionID))
                    }
                    break
                }
                // 如果当前文件中存在相应节点
                let gSectionIndex = gSectionIDs[1].indexOf(gSectionID)
                if (gSectionIndex != -1) {
                    itemKeySection.set("sections." + gSectionID, gSectionIDs[0].getConfigurationSection(gSectionID))
                    break
                }
            }
        })
    }
    // 获取私有节点配置
    if (itemKeySection.contains("sections")) var Sections = itemKeySection.getConfigurationSection("sections")
    // 如果当前物品包含预声明节点
    if (Sections != undefined) {
        // 针对每个节点
        Sections.getKeys(false).forEach(function(section) {
            // 节点解析
            globalSectionParse_NI(Sections, section, random, player)
        })
    }
    // 对文本化配置进行全局节点解析
    tempItemKeySection = new YamlConfiguration()
    tempItemKeySection.set(itemID, itemKeySection)
    let itemHashCode = tempItemKeySection.saveToString().hashCode()
    stringSection = getSection_NI(Sections, tempItemKeySection.saveToString(), random, player)
    stringSection = stringSection.replace(/\\</g, "<").replace(/\\>/g, ">")
    if (player instanceof Player) stringSection = setPapiWithNoColor_NI(player, stringSection)
    if (config_NI.Debug) print(stringSection)
    tempItemKeySection = new YamlConfiguration()
    tempItemKeySection.loadFromString(stringSection)
    itemKeySection = tempItemKeySection.getConfigurationSection(itemID)
    // 构建物品
    let material
    if (itemKeySection.contains("material") && itemKeySection.getString("material") && (material = Material.matchMaterial(itemKeySection.getString("material").toUpperCase()))) {
        let itemStack = new ItemStack(material)
        // 设置子ID/损伤值
        if (itemKeySection.contains("damage")) {
            itemStack.setDurability(itemKeySection.getInt("damage"))
        }
        // 设置物品附魔
        if (itemKeySection.contains("enchantments")) {
            let enchantSection = itemKeySection.getConfigurationSection("enchantments")
            if (enchantSection instanceof MemorySection) {
                enchantSection.getKeys(false).forEach(function(enchant) {
                    if (enchant != null) {
                        let level = enchantSection.getInt(enchant)
                        if (level > 0 
                            && (enchant = Enchantment.getByName(enchant.toUpperCase()))) {
                            itemStack.addUnsafeEnchantment(enchant, level)
                        }
                    }
                })
            }
        }
        // 获取ItemMeta
        let itemMeta = itemStack.getItemMeta()
        // 设置CustomModelData
        if (itemKeySection.contains("custommodeldata")) {
            try { itemMeta.setCustomModelData(itemKeySection.getInt("custommodeldata")) } catch (e) {}
        }
        // 设置物品名
        if (itemKeySection.contains("name")) {
            itemMeta.setDisplayName(ChatColor.translateAlternateColorCodes('&', itemKeySection.getString("name")))
        }
        // 设置Lore
        if (itemKeySection.contains("lore")) {
            let originLores = itemKeySection.getStringList("lore")
            originLores.replaceAll(function(lore) {return ChatColor.translateAlternateColorCodes('&', lore)})
            let finalLores = new ArrayList()
            for (let index = 0; index < originLores.length; index++) {
                const lores = originLores[index].split("\n")
                for (let index = 0; index < lores.length; index++) {
                    finalLores.add(lores[index])
                }
            }
            itemMeta.setLore(finalLores)
        }
        // 设置是否无法破坏
        if (itemKeySection.contains("unbreakable")) {
            itemMeta.setUnbreakable(itemKeySection.getBoolean("unbreakable"))
        }
        // 设置ItemFlags
        if (itemKeySection.contains("hideflags")) {
            var flags = itemKeySection.getStringList("hideflags")
            if (flags.length) {
                for (let key in flags) {
                    itemMeta.addItemFlags(ItemFlag.valueOf(flags[key]))
                }
            }
        }
        // 设置物品颜色
        if (itemKeySection.contains("color")) {
            let color = itemKeySection.get("color")
            if (typeof color == "string") color = parseInt(color, 16)
            try { itemMeta.setColor(Color.fromRGB(color)) } catch (e) {}
        }
        itemStack.setItemMeta(itemMeta)
        // 获取物品NBT
        let itemTag = NMSKt.getItemTag(itemStack)
        itemTag.NeigeItems = new ItemTag()
        itemTag.NeigeItems.id = new ItemTagData(itemID)
        itemTag.NeigeItems.data = new ItemTagData(JSON.stringify(NeigeItemsData.sections[random]))
        itemTag.NeigeItems.hashCode = new ItemTagData(itemHashCode)
        if (itemKeySection.contains("options.charge")) {
            itemTag.NeigeItems.charge = new ItemTagData(itemKeySection.get("options.charge"))
            itemTag.NeigeItems.maxCharge = new ItemTagData(itemKeySection.get("options.charge"))
        }
        // 设置物品NBT
        if (itemKeySection.contains("nbt")) {
            // 获取配置NBT
            let itemNBT = toItemTagNBT_NI(toHashMap_NI(itemKeySection.get("nbt")))
            itemTag = mergeItemTag(itemTag, itemNBT)
        }
        try {
            itemTag.saveTo(itemStack)
        } catch (e) {
            let invalidItemMessage = invalidItem.replace(/{itemID}/, itemKeySection.getName())
            if (sender) {
                sender.sendMessage(invalidNBT)
                sender.sendMessage(invalidItemMessage)
            } else {
                BukkitServer.getConsoleSender().sendMessage(invalidNBT)
                BukkitServer.getConsoleSender().sendMessage(invalidItemMessage)
            }
        }
        // 删除节点缓存
        delete NeigeItemsData.sections[random]
        return itemStack
    } else {
        delete NeigeItemsData.sections[random]
        return null
    }
}

/**
 * 加载NI物品列表
 */
function getNiItems_NI() {
    let ArrayList = Packages.java.util.ArrayList
    
    let configs = getAllConfig_NI(getAllFile_NI(getDir_NI(scriptName_NI + java.io.File.separator + "Items")))
    // [itemID]
    NeigeItemsData.itemIDList = new ArrayList()
    // [itemConfig]
    NeigeItemsData.itemConfigs = new ArrayList()
    configs.forEach(function(config) {
        config.getKeys(false).forEach(function(itemID) {
            NeigeItemsData.itemIDList.add(itemID)
        })
        NeigeItemsData.itemConfigs.add(config)
    })
    pageAmount = Math.ceil(NeigeItemsData.itemIDList.length/config_NI.listItemAmount)
}

/**
 * 加载NI物品动作
 */
function loadAction_NI() {
    let Thread = Packages.java.lang.Thread
    let PlaceholderAPI = Packages.me.clip.placeholderapi.PlaceholderAPI
    let NativeJavaPackage = Packages.org.openjdk.nashorn.internal.runtime.NativeJavaPackage

    let action = {
        // 向玩家发送消息
        tell: function(player, string) {
            player.sendMessage(PlaceholderAPI.setPlaceholders(player, string))
            return true
        },
        // 向玩家发送消息(不将&解析为颜色符号)
        tellNoColor: function(player, string) {
            player.sendMessage(setPapiWithNoColor_NI(player, string))
            return true
        },
        // 强制玩家发送消息
        chat: function(player, string) {
            player.chat(setPapiWithNoColor_NI(player, string))
            return true
        },
        // 强制玩家发送消息(将&解析为颜色符号)
        chatWithColor: function(player, string) {
            player.chat(PlaceholderAPI.setPlaceholders(player, string))
            return true
        },
        // 强制玩家执行指令
        command: function(player, string) {
            runCommand_NI(PlaceholderAPI.setPlaceholders(player, string), player)
            return true
        },
        // 强制玩家执行指令
        player: function(player, string) {
            return command(player, string)
        },
        // 强制玩家执行指令(不将&解析为颜色符号)
        commandNoColor: function(player, string) {
            runCommand_NI(setPapiWithNoColor_NI(player, string), player)
            return true
        },
        // 后台执行指令
        console: function(player, string) {
            runCommand_NI(PlaceholderAPI.setPlaceholders(player, string))
            return true
        },
        // 后台执行指令(不将&解析为颜色符号)
        consoleNoColor: function(player, string) {
            runCommand_NI(setPapiWithNoColor_NI(player, string))
            return true
        },
        // 给予玩家金钱
        giveMoney: function(player, string) {
            let Economy = Packages.net.milkbowl.vault.economy.Economy.class
            if (!(Economy instanceof NativeJavaPackage)) {
                let economy = Bukkit.getServicesManager().getRegistration(Economy).getProvider()
                economy.depositPlayer(player, PlaceholderAPI.setPlaceholders(player, string))
            } else {
                print("§e[NI] §6未发现vault经济插件")
            }
            return true
        },
        // 扣除玩家金钱
        takeMoney: function(player, string) {
            let Economy = Packages.net.milkbowl.vault.economy.Economy.class
            if (!(Economy instanceof NativeJavaPackage)) {
                let economy = Bukkit.getServicesManager().getRegistration(Economy).getProvider()
                economy.withdrawPlayer(player, PlaceholderAPI.setPlaceholders(player, string))
            } else {
                print("§e[NI] §6未发现vault经济插件")
            }
            return true
        },
        // 给予玩家经验
        giveExp: function(player, string) {
            player.giveExp(parseInt(PlaceholderAPI.setPlaceholders(player, string)))
            return true
        },
        // 扣除玩家经验
        takeExp: function(player, string) {
            player.giveExp(parseInt(PlaceholderAPI.setPlaceholders(player, string))*-1)
            return true
        },
        // 设置玩家经验
        setExp: function(player, string) {
            player.setExp(parseInt(PlaceholderAPI.setPlaceholders(player, string)))
            return true
        },
        // 给予玩家经验等级
        giveLevel: function(player, string) {
            player.giveExpLevels(parseInt(PlaceholderAPI.setPlaceholders(player, string)))
            return true
        },
        // 扣除玩家经验等级
        takeLevel: function(player, string) {
            player.giveExpLevels(parseInt(PlaceholderAPI.setPlaceholders(player, string))*-1)
            return true
        },
        // 设置玩家经验等级
        setLevel: function(player, string) {
            player.setLevel(parseInt(PlaceholderAPI.setPlaceholders(player, string)))
            return true
        },
        // 延迟(单位是tick)
        delay: function(player, string) {
            Thread.sleep(parseInt(PlaceholderAPI.setPlaceholders(player, string))*50)
            return true
        },
        // 终止
        return: function(player, string) {
            return false
        }
    }
    NeigeItemsData.action = {}
    Object.keys(action).forEach(function(key) {
        NeigeItemsData.action[key.toLowerCase()] = action[key]
    })
}

/**
 * 加载NI脚本
 */
function loadScripts_NI() {
    let files = getAllFile_NI(getDir_NI(scriptName_NI + java.io.File.separator + "Scripts"))
    NeigeItemsData.scripts = {}
    for (let index = 0; index < files.length; index++) {
        const file = files[index]
        NeigeItemsData.scripts[file.getName()] = loadWithNewGlobal(file)
        NeigeItemsData.scripts[file.getPath()] = loadWithNewGlobal(file)
    }
}

/**
 * 加载NI物品动作列表
 */
function getActions_NI() {
    let HashMap = Packages.java.util.HashMap
    
    let configs = getAllConfig_NI(getAllFile_NI(getDir_NI(scriptName_NI + java.io.File.separator + "ItemActions")))
    // {id: {left: [], right: [], all: []}}
    NeigeItemsData.actions = new HashMap()
    configs.forEach(function(config) {
        let configSections = getConfigSection_NI(config)
        configSections.forEach(function(section) {
            NeigeItemsData.actions[section.getName()] = toHashMap_NI(section)
        })
    })
}

/**
 * 加载全局节点列表
 */
function getGlobalSections_NI() {
    let ArrayList = Packages.java.util.ArrayList

    let files = getAllFile_NI(getDir_NI(scriptName_NI + java.io.File.separator + "GlobalSections"))
    // 获取所有全局节点配置文件
    let configs = getAllConfig_NI(files)
    // [[config, [id]]]
    NeigeItemsData.globalSections = new ArrayList()
    // 每个全局节点配置文件的文件名(转为YamlConfiguration后文件路径莫名其妙莫得了, 只能另开记录)
    NeigeItemsData.globalSectionFileNames = new ArrayList()
    // [id]
    NeigeItemsData.globalSectionIDList = new ArrayList()
    
    // 遍历所有全局节点配置文件
    for (let index = 0; index < configs.length; index++) {
        // 获取当前全局节点配置文件
        const config = configs[index]
        let list = new ArrayList()
        // 获取当前文件内所有全局节点
        let configSections = getConfigSection_NI(config)
        // 记录节点ID
        configSections.forEach(function(section) {
            list.add(section.getName())
            NeigeItemsData.globalSectionIDList.add(section.getName())
        })
        NeigeItemsData.globalSections.add(new ArrayList(Arrays.asList([config, list])))
        NeigeItemsData.globalSectionFileNames.add(files[index].getName())
    }
}

/**
 * 加载MM物品列表
 */
function loadMMItem_NI(){
    let ArrayList = Packages.java.util.ArrayList
    let itemManager = Tool.getPlugin("MythicMobs").getItemManager()

    NeigeItemsData.mmIds = new ArrayList()
    itemManager.getItemNames().stream().forEach(function(itemName) {
        NeigeItemsData.mmIds.add(itemName)
    })
}

/**
 * 创建并获取插件配置文件夹
 * @param scriptName String 插件名
 * @return File 对应文件夹
 */
function getDir_NI(scriptName){
    let File = Packages.java.io.File

    let dir = new File(Tool.getPlugin("Pouvoir").getDataFolder().getParent(),java.io.File.separator + scriptName)
    if (!dir.exists()) dir.mkdirs()
    return dir
}

/**
 * 创建并获取目录下文件
 * @param dir File 文件所在目录
 * @param fileName String 文件名
 * @return File 对应文件夹
 */
function getFile_NI(dir, fileName){
    let File = Packages.java.io.File

    let file = new File(dir, java.io.File.separator + fileName)
    if(!file.exists()) {
        try {
            file.createNewFile()
            return file
        } catch (error) {
            print("文件创建异常")
            return null
        }
    }
    return file
}

/**
 * 进行NBT覆盖
 * @param itemTag1 ItemTag 源NBT
 * @param itemTag2 ItemTag 附加NBT
 * @return ItemTag
 */
function mergeItemTag(itemTag1, itemTag2){
    const ItemTagData = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagData
    const ItemTagType = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagType

    // 遍历附加NBT
    itemTag2.forEach(function(key, value) {
        // 如果二者包含相同键
        if (itemTag1.containsKey(key)) {
            // 如果二者均为COMPOUND
            if (itemTag1[key].type === ItemTagType.COMPOUND
                && value.type === ItemTagType.COMPOUND) {
                // 合并
                itemTag1.put(key, new ItemTagData(mergeItemTag(itemTag1[key].asCompound(), value.asCompound())))
            } else {
                // 覆盖
                itemTag1.put(key, value)
            }
        } else {
            // 添加
            itemTag1.put(key, value)
        }
    })
    return itemTag1
}

/**
 * 获取HashMap形式物品NBT
 * @param itemTag ItemTag
 * @return HashMap
 */
function toHashMapNBT_NI(itemTag) {
    let ItemTag = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTag
    let ItemTagType = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagType
    let ItemTagList = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagList
    let ArrayList = Packages.java.util.ArrayList
    let HashMap = Packages.java.util.HashMap
    let ignoreKeys = config_NI.ignoreKeys

    /**
     * 获取HashMap形式物品NBT
     * @param ItemTag ItemTag 物品NBT数据
     * @return HashMap
     */
    toMutableMap = function(itemTag) {
        let map = new HashMap()
        for (let key in itemTag) {
            if (ignoreKeys.contains(key)) continue
            map[key] = parseNBTValue(itemTag[key])
        }
        return map
    }
    /**
     * NBT值解析
     * @param value ItemTagData 物品NBT值
     * @return 物品NBT值
     */
    parseNBTValue = function(value) {
        switch(value.type) {
            case ItemTagType.BYTE:
                value = "(Byte) " + value.asString()
                break
            case ItemTagType.SHORT:
                value = "(Short) " + value.asString()
                break
            case ItemTagType.INT:
                value = "(Int) " + value.asString()
                break
            case ItemTagType.LONG:
                value = "(Long) " + value.asString()
                break
            case ItemTagType.FLOAT:
                value = "(Float) " + value.asString()
                break
            case ItemTagType.DOUBLE:
                value = "(Double) " + value.asString()
                break
            case ItemTagType.STRING:
                value = value.asString()
                break
            case ItemTagType.BYTE_ARRAY:
                value = value.asByteArray()
                break
            case ItemTagType.INT_ARRAY:
                value = value.asIntArray()
                break
            case ItemTagType.COMPOUND:
                value = value.asCompound()
                break
            case ItemTagType.LIST:
                value = value.asList()
                break
            default:
                value = value.asString()
        }
        if (value instanceof ItemTag) {
            return toMutableMap(value)
        } else if (value instanceof ItemTagList) {
            let list = new ArrayList()
            value.forEach(function(it) {
                list.add(parseNBTValue(it))
            })
            return list
        } else {
            return value
        }
    }
    return toMutableMap(itemTag)
}

/**
 * 获取ItemTag形式物品NBT
 * @param itemNBT HashMap
 * @return ItemTag
 */
function toItemTagNBT_NI(itemNBT) {
    let ItemTag = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTag
    let ItemTagData = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagData
    let ItemTagList = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagList
    let ArrayList = Packages.java.util.ArrayList
    let Byte = Packages.java.lang.Byte
    let Double = Packages.java.lang.Double
    let Float = Packages.java.lang.Float
    let Integer = Packages.java.lang.Integer
    let Long = Packages.java.lang.Long
    let Map = Packages.java.util.Map
    let Short = Packages.java.lang.Short
    let String = Packages.java.lang.String

    /**
     * 获取HashMap形式物品NBT
     * @param itemNBT HashMap 物品NBT数据
     * @return ItemTag
     */
    toItemTag = function(itemNBT) {
        let itemTag = new ItemTag()
        for (let key in itemNBT) {
            itemTag[key] = HashMapValueParse(itemNBT[key])
        }
        return itemTag
    }
    /**
     * NBT值解析
     */
    HashMapValueParse = function(value) {
        if (value instanceof Map) {
            return new ItemTagData(toItemTag(value))
        } else if (value instanceof ArrayList) {
            if (value.length > 0) {
                if (value[0] instanceof Integer) {
                    return new ItemTagData(Java.to(Java.from(value), "int[]"))
                } else if (value[0] instanceof String && value[0].startsWith("(Int) ")){
                    for (let index = 0; index < value.length; index++) {
                        if (value[index] instanceof String && value[index].startsWith("(Int) ")) {
                            value[index] = parseInt(value[index].slice(6))
                        }
                    }
                    return new ItemTagData(Java.to(Java.from(value), "int[]"))
                } else if (value[0] instanceof Byte) {
                    return new ItemTagData(Java.to(Java.from(value), "byte[]"))
                } else if (value[0] instanceof String && value[0].startsWith("(Byte) ")){
                    for (let index = 0; index < value.length; index++) {
                        if (value[index] instanceof String && value[index].startsWith("(Byte) ")) {
                            value[index] = parseInt(value[index].slice(7))
                        }
                    }
                    return new ItemTagData(Java.to(Java.from(value), "int[]"))
                }
            }
            let itemTagList = new ItemTagList()
            value.forEach(function(it) {
                itemTagList.add(HashMapValueParse(it))
            })
            return new ItemTagData(itemTagList)
        } else {
            if (value instanceof String) {
                try {
                    if (value.startsWith("(Byte) ")) {
                        return new ItemTagData(new Byte(value.slice(7)))
                    } else if (value.startsWith("(Short) ")) {
                        return new ItemTagData(new Short(value.slice(8)))
                    } else if (value.startsWith("(Int) ")) {
                        return new ItemTagData(new Integer(value.slice(6)))
                    } else if (value.startsWith("(Long) ")) {
                        return new ItemTagData(new Long(value.slice(7)))
                    } else if (value.startsWith("(Float) ")) {
                        return new ItemTagData(new Float(value.slice(8)))
                    } else if (value.startsWith("(Double) ")) {
                        return new ItemTagData(new Double(value.slice(9)))
                    }
                } catch (error) {
                    print("§e[NI] §f" + value + " §6数据类型转换失败")
                }
            }
            return new ItemTagData(value)
        }
    }
    return toItemTag(itemNBT)
}

/**
 * 获取所有文件
 */
function getAllFile_NI(baseFile) {
    let ArrayList = Packages.java.util.ArrayList

    let list = new ArrayList()
    if (baseFile.isFile() || !baseFile.exists()) {
        return list
    }
    let files = baseFile.listFiles()
    Arrays.asList(files).forEach(function(file) {
        if (file.isDirectory()) {
            list.addAll(getAllFile_NI(file))
        } else {
            list.add(file)
        }
    })
    return list
}

/**
 * 获取所有配置
 */
function getAllConfig_NI(files) {
    let ArrayList = Packages.java.util.ArrayList
    let YamlConfiguration = Packages.org.bukkit.configuration.file.YamlConfiguration

    let list = new ArrayList()
    files.forEach(function(file) {
        list.add(YamlConfiguration.loadConfiguration(file))
    })
    return list
}

/**
 * 获取所有配置的所有节点
 */
function getConfigSection_NI(configs) {
    let ArrayList = Packages.java.util.ArrayList

    let list = new ArrayList()
    if (configs instanceof ArrayList) {
        configs.forEach(function(config) {
            config.getKeys(false).forEach(function(id) {
                list.add(config.getConfigurationSection(id))
            })
        })
    } else {
        configs.getKeys(false).forEach(function(id) {
            list.add(configs.getConfigurationSection(id))
        })
    }
    return list
}

/**
 * 将MemorySection转化为HashMap
 * @param memorySection MemorySection
 * @return HashMap
 */
function toHashMap_NI(memorySection){
    let HashMap = Packages.java.util.HashMap
    let Map = Packages.java.util.Map
    let MemorySection = Packages.org.bukkit.configuration.MemorySection
    let ArrayList = Packages.java.util.ArrayList
    let AbstractList = Packages.java.util.AbstractList

    if (memorySection instanceof MemorySection) {
        let hashMap = new HashMap()
        memorySection.getKeys(false).forEach(function(key) {
            hashMap.put(key, toHashMap_NI(memorySection.get(key)))
        })
        return hashMap
    } else if (memorySection instanceof Map) {
        let hashMap = new HashMap()
        memorySection.entrySet().forEach(function(entry) {
            hashMap.put(entry.getKey(), toHashMap_NI(entry.getValue()))
        })
        return hashMap
    } else if (memorySection instanceof AbstractList) {
        let list = new ArrayList()
        memorySection.forEach(function(value) {
            list.add(toHashMap_NI(value))
        })
        return list
    }

    return memorySection
}

/**
 * 解析一次文本内节点
 * @param Sections ConfigurationSection 物品配置
 * @param string String 待解析文本
 * @param random number 随机数
 * @param player Player 待解析玩家
 * @param itemNBT ItemTag 物品NBT, 可留空, 用于解析物品动作变量
 */
function getSection_NI(Sections, string, random, player, itemNBT) {
    let ArrayList = Packages.java.util.ArrayList
    let LinkedList = Packages.java.util.LinkedList

    string = string + ""

    let stack = new LinkedList()
    let start = new ArrayList()
    let end = new ArrayList()
    for (let index = 0; index < string.length; index++) {
        // 如果是待识别的左括号
        if (string.charAt(index) == "<" && string.charAt(index-1) != "\\") {
            // 压栈
            stack.push(index)
        // 如果是右括号
        } else if (string.charAt(index) == ">" && string.charAt(index+1) != "\\") {
            // 前面有左括号了
            if (!stack.isEmpty()) {
                // 还不止一个
                if (stack.size() > 1) {
                    // 出栈
                    stack.pop()
                // 只有一个
                } else {
                    // 记录并出栈
                    start.add(stack.poll())
                    end.add(index)
                }
            }
        }
    }
    if (start.length == 0) return string
    let listString = []
    listString.push(string.slice(0, start[0]))
    for (let index = 0; index < start.length; index++) {
        // 目标文本
        listString.push(getSection_NI(Sections, string.slice(start[index]+1, end[index]), random, player))

        if (index+1 != start.length) {
            listString.push(string.slice(end[index]+1, start[index+1]))
        } else {
            listString.push(string.slice(end[index]+1))
        }
    }
    // 针对目标文本
    for (let index = 1; index < listString.length; index+=2) {
        // 键值解析
        if (itemNBT == undefined) {
            listString[index] = parseSection_NI(Sections, listString[index], random, player)
        } else {
            listString[index] = parseActionPlaceholder_NI(listString[index], itemNBT)
        }
    }
    return listString.join("")
}

/**
 * 解析当前层级节点
 * @param Sections ConfigurationSection 物品配置
 * @param string String 待解析文本
 * @param random number 随机数
 * @param player Player 待解析玩家
 */
function parseSection_NI(Sections, string, random, player) {
    let Color = Packages.java.awt.Color
    let ChatColor = Packages.net.md_5.bungee.api.ChatColor
    let Player = Packages.org.bukkit.entity.Player

    let name = string
    let index = string.indexOf("::")
    let args
    if (index != -1) {
        name = string.slice(0, index)
        args = string.slice(index+2).split("_")
    } else {
        args = []
    }
    switch (name) {
        case "strings": {
            let result = "<" + string + ">"
            if (args.length > 1) {
                result = getSection_NI(Sections, args[parseInt(Math.random()*(args.length))], random, player)
            } else {
                result = getSection_NI(Sections, args[0], random, player)
            }
            return result
        } case "number": {
            let result
            if (args.length > 1) result = Math.random()*(parseFloat(getSection_NI(Sections, args[1], random, player))-parseFloat(getSection_NI(Sections, args[0], random, player)))+parseFloat(getSection_NI(Sections, args[0], random, player))
            if (args.length > 2) {
                result = result.toFixed(parseInt(getSection_NI(Sections, args[2], random, player)))
            } else {
                result = result.toFixed(0)
            }
            if (!isNaN(result)) {
                return result
            }
            return "未知数字节点参数"
        } case "calculation": {
            // 如果配置了公式
            if (args.length > 0) {
                try {
                    // 获取公式结果
                    let result = eval(getSection_NI(Sections, args[0], random, player))
                    // 获取取整位数
                    let fixed
                    if (args.length > 1) {
                        fixed = parseInt(args[1])
                    }
                    if (isNaN(fixed)) fixed = 0
                    // 如果配置了数字范围
                    if (args.length > 2) {
                        let min = parseFloat(args[2])
                        result = Math.max(min, result)
                    }
                    if (args.length > 3) {
                        let max = parseFloat(args[3])
                        result = Math.min(max, result)
                    }
                    if (!isNaN(result)) {
                        result = result.toFixed(fixed)
                        return result
                    }
                } catch (error) {
                    return "公式节点计算错误"
                }
            }
            break
        } case "weight": {
            if (args.length == 1) {
                let result = getSection_NI(Sections, args[0].slice(args[0].indexOf("::")+2), random, player)
                return result
            }
            let strings = []
            args.forEach(function(value) {
                let index = value.indexOf("::")
                let weight = parseInt(value.slice(0, index))
                let string = value.slice(index+2)
                for (let index = 0; index < weight; index++) strings.push(string)
            })
            let result = getSection_NI(Sections, strings[parseInt(Math.random()*(strings.length))], random, player)
            return result
        } case "papi": {
            if (player instanceof Player) {
                let PlaceholderAPI = Packages.me.clip.placeholderapi.PlaceholderAPI
                return PlaceholderAPI.setPlaceholders(player, "%"+args.join("_")+"%")
            } else {
                return "<" + string + ">"
            }
        } case "js": {
            try {
                let PlaceholderAPI = Packages.me.clip.placeholderapi.PlaceholderAPI
                let param = args.join("_")
                let index = param.indexOf("::")
                let path = param.slice(0, index)
                let func = param.slice(index+2)
                let scriptArgs = []

                index = func.indexOf("_")
                if (index != -1) {
                    scriptArgs = func.slice(index+1).split("_")
                    func = func.slice(0, index)
                }

                var global = NeigeItemsData.scripts[path] || NeigeItemsData.scripts["plugins" + java.io.File.separator + scriptName_NI + java.io.File.separator + "Scripts" + java.io.File.separator + path]
                if (global != undefined) {
                    global.vars = function(string) {return parseSection_NI(Sections, string, random, player)}
                    if (player instanceof Player) global.papi = function(string) {return PlaceholderAPI.setPlaceholders(player, string)}
                    global.getItem = function(itemID, player, data) {return getNiItem_NI(itemID, player, null, data)}
                    if (player instanceof Player) global.player = player
                    let result = getSection_NI(Sections, global[func].apply(this, scriptArgs), random, player)
                    return result
                }
                print("§e[NI] §6不存在名为" + path + "的脚本文件")
                return "<" + string + ">"
            } catch (error) {
                error.printStackTrace()
                return "js函数获取失败"
            }
        } case "inherit": {
            let template = getSection_NI(Sections, string.slice(index+2), random, player)
            let result = globalSectionParse_NI(Sections, template, random, player, true)
            return result
        } default: {
            // 如果已解析对应ID节点
            if (NeigeItemsData.sections[random][name] != undefined) {
                // 直接返回对应节点值
                return NeigeItemsData.sections[random][name]
            // 如果尚未解析对应ID节点
            } else {
                // 尝试解析并返回对应节点值
                if (globalSectionParse_NI(Sections, name, random, player)) return NeigeItemsData.sections[random][name]
                if (string.startsWith("#")) {
                    try {
                        let hex = parseInt(string.replace("#", "0x"))
                        if (!isNaN(hex)) {
                            hex = Math.min(Math.max(hex, 0), 0xFFFFFF)
                            let color = new Color(hex)
                            return ChatColor.of(color).toString()
                        }
                    } catch (error) {
                        print("§e[NI] §6低于1.16的版本不能使用16进制颜色哦")
                    }
                }
            }
            return "<" + string + ">"
        }
    }
}

/**
 * 解析物品动作内变量
 * @param string String 待解析文本
 * @param itemNBT ItemTag 物品NBT
 */
function parseActionPlaceholder_NI(string, itemNBT) {
    let name = string
    let index = string.indexOf("::")
    let args
    if (index != -1) {
        name = string.slice(0, index)
        args = string.slice(index+2).split(".")
    } else {
        args = []
    }
    switch (name.toLowerCase()) {
        case "nbt": {
            let data = itemNBT
            let value
            for (let index = 0; index < args.length; index++) {
                const key = args[index]
                value = data[key]
                if (value == undefined) {
                    return "<" + string + ">"
                }
                data = value
            }
            return value.asString()
        } case "data": {
            let data = JSON.parse(itemNBT.NeigeItems.data.asString())
            let value
            for (let index = 0; index < args.length; index++) {
                const key = args[index]
                value = data[key]
                if (value == undefined) {
                    return "<" + string + ">"
                }
                data = value
            }
            return value
        } default: {
            return "<" + string + ">"
        }
    }
}

/**
 * 发送信息
 * @param player OnlinePlayer
 * @param messages Array
 */
function sendMessages_NI(player, messages) {
    messages.forEach(function(message) {
        player.sendMessage(message)
    })
}

/**
 * 获取在线玩家ID列表
 */
function onlinePlayerNames_NI() {
    let ArrayList = Packages.java.util.ArrayList
    let Bukkit = Packages.org.bukkit.Bukkit

    let onlinePlayers = new ArrayList()
    Bukkit.getOnlinePlayers().forEach(function(player) {
        onlinePlayers.add(player.getDisplayName())
    })
    return onlinePlayers
}

/**
 * 加载世界列表
 */
function getWorldNames_NI() {
    let ArrayList = Packages.java.util.ArrayList
    let Bukkit = Packages.org.bukkit.Bukkit

    let worlds = new ArrayList()
    Bukkit.getWorlds().forEach(function(world) {
        worlds.add(world.getName())
    })
    return worlds
}

/**
 * 给予玩家指定数量物品并发送信息
 * @param player OnlinePlayer
 * @param itemStack ItemStack
 * @param amount Int
 * @param message String || ""
 * @return Boolean 是否成功
 */
function giveItems_NI(player, itemStack, amount, message) {
    let ItemStack = Packages.org.bukkit.inventory.ItemStack

    if (itemStack instanceof ItemStack && player.isOnline()) {
        let stackSize = itemStack.getMaxStackSize()
        itemStack.setAmount(stackSize)
        for (var givenAmt = 0; (givenAmt + stackSize) <= amount; givenAmt += stackSize) { giveItem_NI(player, itemStack) }
        if (givenAmt < amount) {
            itemStack.setAmount(amount - givenAmt)
            giveItem_NI(player, itemStack)
        }
        if (message != "") player.sendMessage(message)
        return true
    }
    return false
}

/**
 * 给予玩家物品, 可用于异步
 * @param player OnlinePlayer
 * @param itemStack ItemStack
 */
function giveItem_NI(player, itemStack) {
    let ItemStack = Packages.org.bukkit.inventory.ItemStack

    if (itemStack instanceof ItemStack && player.isOnline()) {
        let Bukkit = Packages.org.bukkit.Bukkit
        let BukkitScheduler = Bukkit.getScheduler()
        BukkitScheduler.callSyncMethod(Tool.getPlugin("Pouvoir"), function() {
            let inv = player.getInventory()
            let loc = player.getLocation()
            let dropList = inv.addItem(itemStack)
            if (!dropList.isEmpty()) {
                loc.getWorld().dropItem(loc, dropList[0])
            }
        })
        return true
    }
    return false
}

/**
 * 于指定位置掉落指定数量物品
 * @param world World 世界
 * @param x Double x坐标
 * @param y Double y坐标
 * @param z Double z坐标
 * @param itemStack ItemStack
 * @param amount Int
 */
function dropItems_NI(world, x, y, z, itemStack, amount) {
    let ItemStack = Packages.org.bukkit.inventory.ItemStack

    if (itemStack instanceof ItemStack) {
        let Location = Packages.org.bukkit.Location
        let stackSize = itemStack.getMaxStackSize()
        let location = new Location(world, x, y, z)
        itemStack.setAmount(stackSize)
        for (var givenAmt = 0; (givenAmt + stackSize) <= amount; givenAmt += stackSize) { dropItem_NI(world, location, itemStack) }
        if (givenAmt < amount) {
            itemStack.setAmount(amount - givenAmt)
            dropItem_NI(world, location, itemStack)
        }
        return true
    }
    return false
}

/**
 * 给予玩家物品, 可用于异步
 * @param world World 世界
 * @param location Location 位置
 * @param itemStack ItemStack
 */
function dropItem_NI(world, location, itemStack){
    let Bukkit = Packages.org.bukkit.Bukkit

    let BukkitScheduler = Bukkit.getScheduler()
    BukkitScheduler.callSyncMethod(Tool.getPlugin("Pouvoir"), function() {
        world.dropItem(location, itemStack)
    })
}

/**
 * 获取config键值
 * @param config ConfigurationSection
 * @param key String 待获取键
 * @param defaultValue any 默认值
 */
function getConfigValue_NI(file, key, defaultValue) {
    let YamlConfiguration = Packages.org.bukkit.configuration.file.YamlConfiguration

    let config = YamlConfiguration.loadConfiguration(file)
    if (config.contains(key)) {
        return config.get(key)
    } else {
        config.set(key, defaultValue)
        config.save(file)
        return defaultValue
    }
}

/**
 * 指向数据添加
 * @return Object || null
 */
function dataParse_NI(string, random) {
    let String = Packages.java.lang.String

    if (string instanceof String) {
        try { 
            let obj=JSON.parse(string)
            if (typeof obj == "object" && obj ){
                for (let key in obj) {
                    NeigeItemsData.sections[random][key] = obj[key]
                }
            }
        } catch(e) {}
    }
}

/**
 * 解析当前节点
 * @param Sections ConfigurationSection 节点配置部分
 * @param section String 节点名
 * @param random number 随机数
 * @param player Player 待解析玩家
 * @param temp Boolean true时仅获取对应值，不作记录
 * @param overrideSection null/String 覆盖节点ID
 * @return String/Boolean 不包含相应节点则返回false，否则返回对应值
 */
function globalSectionParse_NI(Sections, section, random, player, temp, overrideSection) {
    let Player = Packages.org.bukkit.entity.Player
    
    let parse = function(Sections, section, random, player, overrideSection) {
        if (Sections != null
            && Sections.contains(section)
            && (NeigeItemsData.sections[random][overrideSection || section] == undefined
                || temp === true)) {
            let currentSection = Sections.getConfigurationSection(section)
            // 简单节点解析
            if (currentSection == null) {
                let result = getSection_NI(Sections, Sections.get(section), random, player)
                if (result.indexOf("false") != -1) {
                }
                return result
            }
            // 获取节点类型
            let type = currentSection.getString("type")
            let result = false
            switch (type) {
                case "strings": {
                    // 如果配置了字符串组
                    if (currentSection.contains("values")) {
                        // 加载字符串组
                        let strings = currentSection.get("values")
                        result = getSection_NI(Sections, getSection_NI(Sections, strings[parseInt(Math.random()*(strings.length))], random, player), random, player)
                    } else {
                        print("字符串节点: " + section + " 缺少 values 配置项")
                    }
                    break
                } case "number": {
                    // 如果配置了数字范围
                    if (currentSection.contains("min") && currentSection.contains("max")) {
                        try {
                            // 获取大小范围
                            let min = parseFloat(getSection_NI(Sections, currentSection.getString("min"), random, player))
                            let max = parseFloat(getSection_NI(Sections, currentSection.getString("max"), random, player))
                            // 获取取整位数
                            let fixed
                            if (currentSection.contains("fixed")) {
                                fixed = parseInt(getSection_NI(Sections, currentSection.getString("fixed"), random, player))
                            }
                            if (isNaN(fixed)) fixed = 0
                            // 加载随机数
                            result = ((Math.random()*(max-min))+min).toFixed(fixed)
                        } catch (error) {
                            NeigeItemsData.sections[random][overrideSection || section] = 
                            print("随机数节点: " + section + " 解析错误")
                            error.printStackTrace()
                        }
                    } else {
                        print("随机数节点: " + section + " 缺少 min 或 max 配置项")
                    }
                    break
                } case "calculation": {
                    if (currentSection.contains("formula")) {
                        try {
                            // 获取公式结果
                            result = eval(getSection_NI(Sections, currentSection.getString("formula"), random, player))
                            // 如果配置了数字范围
                            if (currentSection.contains("min")) {
                                let min = parseFloat(getSection_NI(Sections, currentSection.getString("min"), random, player))
                                result = Math.max(min, result)
                            }
                            if (currentSection.contains("max")) {
                                let max = parseFloat(getSection_NI(Sections, currentSection.getString("max"), random, player))
                                result = Math.min(max, result)
                            }
                            // 获取取整位数
                            let fixed
                            if (currentSection.contains("fixed")) {
                                fixed = parseInt(getSection_NI(Sections, currentSection.getString("fixed"), random, player))
                            }
                            if (isNaN(fixed)) fixed = 0
                            // 加载公式结果
                            result = result.toFixed(fixed)
                        } catch (error) {
                            print("公式节点: " + section + " 解析错误")
                            error.printStackTrace()
                        }
                    } else {
                        print("公式节点: " + section + " 缺少 formula 配置项")
                    }
                    break
                } case "weight": {
                    // 如果配置了字符串组
                    if (currentSection.contains("values")) {
                        try {
                            // 加载字符串组
                            var strings = []
                            currentSection.get("values").forEach(function(value) {
                                value = getSection_NI(Sections, value, random, player)
                                let index = value.indexOf("::")
                                let weight = parseInt(value.slice(0, index))
                                let string = value.slice(index+2)
                                for (let index = 0; index < weight; index++) strings.push(string)
                            })
                            result = getSection_NI(Sections, strings[parseInt(Math.random()*(strings.length))], random, player)
                        } catch (error) {
                            print("权重节点: " + section + " 解析错误")
                            error.printStackTrace()
                        }
                    } else {
                        print("权重节点: " + section + " 缺少 values 配置项")
                    }
                    break
                } case "js": {
                    if (currentSection.contains("path")) {
                        try {
                            let PlaceholderAPI = Packages.me.clip.placeholderapi.PlaceholderAPI
                            var info = getSection_NI(Sections, currentSection.getString("path"), random, player).split("::")
                            var path = info[0]
                            var func = info[1]
    
                            let args = []
                            if (currentSection.contains("args")) {
                                args = currentSection.getStringList("args")
                                args.replaceAll(function(value) {return getSection_NI(Sections, value, random, player)})
                                args = Java.from(args)
                            }
    
                            var global = NeigeItemsData.scripts[path] || NeigeItemsData.scripts["plugins" + java.io.File.separator + scriptName_NI + java.io.File.separator + "Scripts" + java.io.File.separator + path]
                            if (global != undefined) {
                                global.vars = function(string) {return parseSection_NI(Sections, string, random, player)}
                                if (player instanceof Player) global.papi = function(string) {return PlaceholderAPI.setPlaceholders(player, string)}
                                global.getItem = function(itemID, player, data) {return getNiItem_NI(itemID, player, null, data)}
                                if (player instanceof Player) global.player = player
                                result = getSection_NI(Sections, global[func].apply(this, args), random, player)
                                break
                            }
                            print("§e[NI] §6不存在名为" + path + "的脚本文件")
                            result  = "<" + string + ">"
                        } catch (error) {
                            print("Js节点: " + section + " 解析错误")
                            error.printStackTrace()
                        }
                    } else {
                        print("Js节点: " + section + " 缺少 path 配置项")
                    }
                    break
                } case "inherit": {
                    if (currentSection.contains("template")) {
                        let template = getSection_NI(Sections, currentSection.getString("template"), random, player)
                        result = globalSectionParse_NI(Sections, template, random, player, false, section)
                    } else {
                        print("继承节点: " + section + " 缺少 template 配置项")
                    }
                    break
                } default:
            }
            return result
        } else {
            return false
        }
    }
    let result = parse(Sections, section, random, player, overrideSection)
    if (temp !== true && result !== false) {
        NeigeItemsData.sections[random][overrideSection || section] = result
    }
    return result
}

/**
 * 解析PAPI变量, 但不解析颜色字符
 * @author clip
 * @param target OfflinePlayer/ItemStack
 * @param text String 待解析文本
 * @param itemTag ItemTag 物品NBT
 * @return String 是否包含相应节点
 */
function setPapiWithNoColor_NI(target, text, itemTag) {
    let ItemStack = Packages.org.bukkit.inventory.ItemStack
    // 新建字符串
    let builder = ""
    // 新建命名空间字符串/参数字符串
    let identifier = ""
    let parameters = ""
    // 遍历待解析文本
    for (let i = 0; i < text.length; i++) {
        // 获取当前字母
        let l = text[i]
        // 如果当前字母不是识别符或现在是最后一个字符
        if (l != "%" || i + 1 >= text.length) {
            // 怼进去
          builder += l
          // 继续遍历
          continue
        }
        let identified,oopsitsbad,hadSpace = false
        // 一直到倒数第二个字符
        while (++i < text.length) {
            // 获取当前字母
            let p = text[i]
            if (p == ' ' && !identified) {
                hadSpace = true
                break
            }
            if (p == "%") {
                oopsitsbad = true
                break
            }
            if (p == '_' && !identified) {
                identified = true
                continue
            }
            // 录入命名空间/参数
            if (identified) {
                parameters += p
            } else {
                identifier += p
            }
        }
        // 获取命名空间
        let identifierString = identifier
        // 小写化
        let lowercaseIdentifierString = identifierString.toLowerCase()
        // 获取参数
        let parametersString = parameters
        // 重置命名空间/参数字符串
        identifier = ""
        parameters = ""
        // 如果没匹配到另一个%
        if (!oopsitsbad) {
            // 怼回去
            builder += "%" + identifierString
            if (identified) builder += '_' + parametersString
            if (hadSpace) builder += ' '
            continue
        }
        // 匹配到了就获取一下对应的附属
        let placeholder
        if (target instanceof ItemStack) {
            placeholder = NeigeItemsData.holderExpansion[lowercaseIdentifierString.replace(/§+[a-z0-9]/g, "")]
        } else {
            let placeholderAPI = Tool.getPlugin("PlaceholderAPI")
            if (placeholderAPI.getLocalExpansionManager != undefined) {
                placeholder = placeholderAPI.getLocalExpansionManager().getExpansion(lowercaseIdentifierString)
            } else {
                placeholder = Packages.me.clip.placeholderapi.PlaceholderAPI.getPlaceholders().get(lowercaseIdentifierString)
            }
        }
        // 如果没获取到
        if (placeholder == undefined) {
            // 怼回去
            builder += "%" + lowercaseIdentifierString
            if (identified) builder += '_'
            builder += parametersString + "%"
            continue
        }
        // 获取一下结果
        let replacement
        if (target instanceof ItemStack) {
            replacement = placeholder(target, itemTag, parametersString)
        } else {
            replacement = placeholder.onRequest(target, parametersString)
        }
        // 如果获取不到结果
        if (replacement == null) {
            // 怼回去
            builder += "%" + lowercaseIdentifierString
            if (identified) builder += '_'
            builder += parametersString + "%"
            continue
        }
        // 把结果怼进去
        builder += replacement
    }
    // 返回结果字符串
    return builder
}

/**
 * 获取TellrawJson形式物品
 * @param itemStack ItemStack
 * @param name String|null 显示文本, 默认为物品名
 * @return TellrawJson
 */
function itemToTellrawJson_NI(itemStack, name) {
    let NMSKt = Packages.com.skillw.pouvoir.taboolib.module.nms.NMSKt
    let TellrawJson = Packages.com.skillw.pouvoir.taboolib.module.chat.TellrawJson

    name = name || getItemName_NI(itemStack)
    let tellrawJson = new TellrawJson()
    if (itemStack == null) return tellrawJson.append("物品生成错误")
    tellrawJson.append(name)

    let itemKey = itemStack.type.toString().toLowerCase()
    let itemTag = NMSKt.getItemTag(itemStack)
    return tellrawJson.hoverItem(itemKey, itemTag)
}

/**
 * 获取物品名
 * @param itemStack ItemStack
 * @param name String|null 显示文本, 默认为物品名
 * @return String
 */
function getItemName_NI(itemStack) {
    let ItemStack = Packages.org.bukkit.inventory.ItemStack

    if (!(itemStack instanceof ItemStack)) return null
    let name = Tool.getItemName(itemStack)
    if (name == "") {
        let SkullMeta = Packages.org.bukkit.inventory.meta.SkullMeta
        if (itemStack.getItemMeta() instanceof SkullMeta) {
            name = itemStack.getItemMeta().getOwner() + "的头"
        }
    }
    return name
}

/**
 * 生成递增数组
 * @param length Int 数组长度
 */
function incrementingArray_NI(length) {
    length = parseInt(length)
    let arr = []
    for (let i = 1; i <= length; i++) {
        arr.push(i+"")
    }
    return arr
}

/**
 * 执行指令
 * @param cmd String 指令内容
 * @param sender CommandSender 默认为后台
 */
function runCommand_NI(command, sender) {
    let Bukkit = Packages.org.bukkit.Bukkit
    let BukkitScheduler = Bukkit.getScheduler()
    sender = sender || Bukkit.getConsoleSender()
    BukkitScheduler.callSyncMethod(Tool.getPlugin("Pouvoir"), function() {
        Bukkit.dispatchCommand(sender, command)
    })
}

/**
 * 获取玩家Metadata
 * @param player Player 玩家
 * @param key Metadata键
 * @param type String 待获取值的类型
 * @param def 默认值
 * @return Any
 */
function getMetadata_NI(player, key, type, def) {
    if(player.hasMetadata(key)) return player.getMetadata(key).get(0)["as" + type]()
    return def
}

/**
 * 设置玩家Metadata
 * @param player Player 玩家
 * @param key Metadata键
 * @param value Metadata值
 */
function setMetadata_NI(player, key, value) {
    let FixedMetadataValue = Packages.org.bukkit.metadata.FixedMetadataValue
    player.setMetadata(key, new FixedMetadataValue(Tool.getPlugin("Pouvoir"), value))
}
