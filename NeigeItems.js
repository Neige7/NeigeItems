// 配置文件
function NeigeItemsConfig() {
    
	// 配置文件名
	scriptName = "NeigeItems"
    // 创建文件夹
    getDir(scriptName + "/Items")
    getDir(scriptName + "/Scripts")
    getDir(scriptName + "/GlobalSections")
    let file = getFile(getDir(scriptName), "config.yml")
    NIConfig = {}
	// 物品管理指令
	NIConfig.NeigeItemManagerCommand = getConfigValue(file, "Main.NeigeItemManagerCommand", "ni")
	// MM物品默认保存路径
	NIConfig.MMItemsPath = getConfigValue(file, "Main.MMItemsPath", "MMItems.yml")
	// 不进行保存的NBT键
	NIConfig.ignoreKeys = getConfigValue(file, "Main.ignoreKeys", Arrays.asList(["hideflags","enchantments","VARIABLES_DATA","ench"]))

	// 玩家不在线提示
	NIConfig.invalidPlayer = getConfigValue(file, "Messages.invalidPlayer", "§e[NI] §6玩家不在线或不存在")
	// 给予成功提示
	NIConfig.successInfo = getConfigValue(file, "Messages.successInfo", "§e[NI] §6成功给予 §f{player} §a{amount} §6个 §f{name}")
	// 被给予成功提示(设置为""则不进行提示)
	NIConfig.givenInfo = getConfigValue(file, "Messages.givenInfo", "§e[NI] §6你得到了 §a{amount} §6个 §f{name}")
	// 给予成功提示
	NIConfig.dropSuccessInfo = getConfigValue(file, "Messages.dropSuccessInfo", "§e[NI] §6成功在 §a{world} §6的 §a{x},{y},{z} §6掉落了 §a{amount} §6个 §f{name}")
	// 未知物品提示
	NIConfig.unknownItem = getConfigValue(file, "Messages.unknownItem", "§e[NI] §6找不到ID为 §a{itemID} §6的物品")
	// 对应ID物品已存在提示
	NIConfig.existedKey = getConfigValue(file, "Messages.existedKey", "§e[NI] §6已存在ID为 §a{itemID} §6的物品")
	// 未知解析对象提示
	NIConfig.invalidPaser = getConfigValue(file, "Messages.invalidPaser", "§e[NI] §6不能针对后台解析物品, 请指定一个玩家")
	// 保存成功提示
	NIConfig.successSaveInfo = getConfigValue(file, "Messages.successSaveInfo", "§e[NI] §6成功将 §f{name} §6以ID §a{itemID} §6保存至 §a{path}")
	// MM物品转换完毕提示
	NIConfig.mMImportSuccessInfo = getConfigValue(file, "Messages.mMImportSuccessInfo", "§e[NI] §6成功将所有MM物品保存至 §a{path}")
	// 不要保存空气提示
	NIConfig.airItem = getConfigValue(file, "Messages.airItem", "§e[NI] §6请不要试图保存空气, 谢谢合作")
	// 输入无效数字提示
	NIConfig.invalidAmount = getConfigValue(file, "Messages.invalidAmount", "§e[NI] §6无效数字")
	// 输入无效世界提示
	NIConfig.invalidWorld = getConfigValue(file, "Messages.invalidWorld", "§e[NI] §6无效世界")
	// 输入无效坐标提示
	NIConfig.invalidLocation = getConfigValue(file, "Messages.invalidLocation", "§e[NI] §6无效坐标")
	// 权限不足提示
	NIConfig.insufficientPermissions = getConfigValue(file, "Messages.insufficientPermissions", "§e[NI] §6权限不足")
	// 权限不足提示
	NIConfig.itemCooldown = getConfigValue(file, "Messages.itemCooldown", "§e物品冷却中! 请等待{time}秒")
	// 重载完毕提示
	NIConfig.reloadedMessage = getConfigValue(file, "Messages.reloadedMessage", "§e[NI] §6重载完毕")

	// 无效NBT提示
	NIConfig.invalidNBT = getConfigValue(file, "Messages.invalidNBT", "§6[NI] §cNBT加载失败, 请勿在列表型NBT中混用键值对, 数字及字符串")
	// 错误物品提示
	NIConfig.invalidItem = getConfigValue(file, "Messages.invalidItem", "§6[NI] §c物品加载失败, 物品可能缺损数据, 物品ID: §6{itemID}")
	// 给予失败提示
	NIConfig.failureInfo = getConfigValue(file, "Messages.failureInfo", "§e[NI] §6物品给予失败, 可能原因: 物品未配置材质/玩家已下线")

	// 帮助信息
	NIConfig.helpMessages = getConfigValue(file, "Messages.helpMessages", Arrays.asList([
        "§6====================§eNeigeItems§6====================",
        "§6==================[]为必填, ()为选填==================",
        "§e/ni §flist (页码) §7> 查看所有NI物品",
        "§e/ni §fget [物品ID] (数量) (是否反复随机) (指向数据) §7> 根据ID获取NI物品",
        "§e/ni §fgive [玩家ID] [物品ID] (数量) (是否反复随机) (指向数据) §7> 根据ID给予NI物品",
        "§e/ni §fgiveAll [物品ID] (数量) (是否反复随机) (指向数据) §7> 根据ID给予所有人NI物品",
        "§e/ni §fdrop [物品ID] [数量] [世界名] [X坐标] [Y坐标] [Z坐标] (是否反复随机) (物品解析对象) (指向数据) §7> 于指定位置掉落NI物品",
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
    NIConfig.listPrefix = getConfigValue(file, "ItemList.Prefix", "§6===========§eNeigeItems§6===========")
    NIConfig.listSuffix = getConfigValue(file, "ItemList.Suffix", "§6======<< §e{prev} §f{current}§e/§f{total} §e{next} §6>>======")
    NIConfig.listItemAmount = getConfigValue(file, "ItemList.ItemAmount", 10)
    NIConfig.listItemFormat = getConfigValue(file, "ItemList.ItemFormat", "§6{index}. §a{ID} §6- §f{name}")
    NIConfig.listPrev = getConfigValue(file, "ItemList.Prev", "上一页")
    NIConfig.listNext = getConfigValue(file, "ItemList.Next", "下一页")
        
}

// 数据预载
//@Awake(enable)
//@Awake(reload)
function NeigeItems() {
    NeigeItemsConfig()
    NIConfig.sections = {}
    getGlobalSections()
    getNiItems()
    getNiActions()
    mmItemLoad()
    CommandRegister()
    Tool.removeListener("NeigeItemsInteract")
    Tool.addListener("NeigeItemsInteract", "org.bukkit.event.player.PlayerInteractEvent", "LOW", false, function (event) {
        NeigeItemsPlayerInteractEvent(event)
    })
}

// 发包替换
//@Awake(enable)
//@Awake(reload)
function ItemLoreReplacer() {
    ILR = {
        neigeitems: (itemTag, param) => {
            switch (param) {
                case "charge":
                    if (itemTag.NeigeItems.charge == null) return
                    return itemTag.NeigeItems.charge.asString()
                case "maxCharge":
                    if (itemTag.NeigeItems.maxCharge == null) return
                    return itemTag.NeigeItems.maxCharge.asString()
                default:
                    break
            }
        }
    }
    let itemParse = (itemStack) => {
        let NMSKt = Packages.com.skillw.pouvoir.taboolib.module.nms.NMSKt
        let itemTag = NMSKt.getItemTag(itemStack)
        if (itemTag.NeigeItems == undefined) return

        let itemMeta = itemStack.getItemMeta()
        if (itemMeta.hasLore()) {
            let lore = itemMeta.getLore()
            for (let index = 0; index < lore.length; index++) {
                lore[index] = parseItemPlaceholder(itemTag, lore[index])
            }
            itemMeta.setLore(lore)
        } else if (itemMeta.hasDisplayName()) {
            itemMeta.setDisplayName(parseItemPlaceholder(itemTag, itemMeta.getDisplayName()))
        }
        itemStack.setItemMeta(itemMeta)
    }

    let PacketType = Packages.com.comphenix.protocol.PacketType
    let ListenerPriority = Packages.com.comphenix.protocol.events.ListenerPriority
    Tool.removePacketListener("ItemLoreReplacer")
    Tool.addPacketListener(
        "ItemLoreReplacer",
        ListenerPriority.NORMAL,
        [PacketType.Play.Server.WINDOW_ITEMS, PacketType.Play.Server.SET_SLOT],
        (event) => {
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
        (event) => {
        }
    )
}

function CommandRegister() {
    let Bukkit = Packages.org.bukkit.Bukkit
    let BukkitScheduler = Bukkit.getScheduler()
    let Consumer = Packages.java.util.function.Consumer
    let HashMap = Packages.java.util.HashMap
    let Player = Packages.org.bukkit.entity.Player
    let BukkitAdapter = Packages.io.lumine.xikage.mythicmobs.adapters.bukkit.BukkitAdapter
    let BukkitAdapterClass = Packages.com.skillw.pouvoir.taboolib.platform.BukkitAdapter
    let TellrawJson = Packages.com.skillw.pouvoir.taboolib.module.chat.TellrawJson
    let TLibBukkitAdapter = new BukkitAdapterClass()
    let MythicMobs = Packages.io.lumine.xikage.mythicmobs.MythicMobs
    let itemManager = MythicMobs.inst().getItemManager()

    let NeigeItemManagerCommand = NIConfig.NeigeItemManagerCommand
    let MMItemsPath = NIConfig.MMItemsPath
    let invalidPlayer = NIConfig.invalidPlayer
    let successInfo = NIConfig.successInfo
    let givenInfo = NIConfig.givenInfo
    let dropSuccessInfo = NIConfig.dropSuccessInfo
    let unknownItem = NIConfig.unknownItem
    let existedKey = NIConfig.existedKey
    let invalidPaser = NIConfig.invalidPaser
    let successSaveInfo = NIConfig.successSaveInfo
    let mMImportSuccessInfo = NIConfig.mMImportSuccessInfo
    let airItem = NIConfig.airItem
    let invalidAmount = NIConfig.invalidAmount
    let invalidWorld = NIConfig.invalidWorld
    let invalidLocation = NIConfig.invalidLocation
    let insufficientPermissions = NIConfig.insufficientPermissions
    let reloadedMessage = NIConfig.reloadedMessage
    let failureInfo = NIConfig.failureInfo
    let helpMessages = NIConfig.helpMessages
    let listPrefix = NIConfig.listPrefix
    let listSuffix = NIConfig.listSuffix
    let listItemAmount = NIConfig.listItemAmount
    let listItemFormat = NIConfig.listItemFormat
    let listPrev = NIConfig.listPrev
    let listNext = NIConfig.listNext

    // 卸载指令
    Tool.unRegCommand(NeigeItemManagerCommand)
    // 新建指令
    let command = Tool.command(NeigeItemManagerCommand)
    // 指令执行动作
    command.setExecutor((sender, command, label, args) => {
        // 若未输入参数
        if (args.length < 1) {
            // 发送帮助信息
            sendMessages(sender, helpMessages)
            return true
        }
        // 检测指令内容
        if (command.getName().equalsIgnoreCase(NeigeItemManagerCommand)) {
            // 仅限后台/OP执行
            if (!sender instanceof Player || sender.isOp()) {
                switch(args[0].toLowerCase()) {
                    // nim list (页码) > 查看所有NI物品
                    case "list":
                        BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                            // 检测指令长度
                            if (args.length == 1 || incrementingArray(pageAmount).indexOf(args[1]) != -1) {
                                // 获取当前页码
                                let page = 0
                                if (args.length > 1) page = parseInt(args[1]) - 1
                                // 预构建待发送信息
                                let listMessage = new TellrawJson()
                                // 添加信息前缀
                                listMessage.append(listPrefix + "\n")
                                // 获取当前序号
                                let prevItemAmount = page*listItemAmount
                                // 逐个获取物品
                                for (let index = prevItemAmount; index < prevItemAmount + 10; index++) {
                                    // 替换信息内变量
                                    let listItemMessage = listItemFormat.replace(/{index}/g, index+1)
                                    listItemMessage = listItemMessage.replace(/{ID}/g, NIConfig.itemIDList[index])
                                    listItemMessage = listItemMessage.split("{name}")
                                    // 构建信息及物品
                                    let listItemRaw = new TellrawJson()
                                    let itemStack = getNiItem(NIConfig.itemIDList[index], sender, sender)
                                    for (let i = 0; i < listItemMessage.length; i++) {
                                        listItemRaw.append(listItemMessage[i])
                                        if (i+1 != listItemMessage.length) listItemRaw.append(itemToTellrawJson(itemStack).runCommand("/ni get " + NIConfig.itemIDList[index]))
                                    }
                                    // 合并信息
                                    listMessage.append(listItemRaw)
                                    listMessage.append("\n")
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
                                listSuffixMessage = listSuffixMessage.replace(/{prev}/g, "!@#$%{prev}!@#$%").replace(/{next}/g, "!@#$%{next}!@#$%")
                                listSuffixMessage = listSuffixMessage.split("!@#$%")
                                listSuffixMessage.forEach(value => {
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
                                // 非法数量提示
                                sender.sendMessage(invalidAmount)
                            }
                        }))
                        return true
                    // nim get [物品ID] (数量) (是否反复随机) (指向数据) > 根据ID获取NI物品
                    case "get":
                        BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                            // 如果指令发送者不是玩家
                            if (sender instanceof Player) {
                                // 检测指令长度
                                if (args.length > 1) {
                                    // 检测是否存在对应ID的NI物品
                                    if (NIConfig.itemIDList.indexOf(args[1]) != -1) {
                                        let data = null
                                        if (args.length > 4) data = Java.from(args).slice(4).join(" ")
                                        let itemAmt
                                        // 获取数量
                                        if (args.length == 2 || ((itemAmt = parseInt(args[2])) && itemAmt > 0)) {
                                            itemAmt = itemAmt || 1
                                            // 如果仅需一样的物品
                                            if (args.length > 3 && (args[3] == "false" || args[3] == "0")) {
                                                let itemStack = getNiItem(args[1], sender, sender, data)
                                                // 替换提示信息中的占位符
                                                let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                // 给予物品
                                                if (!giveItems(sender, itemStack, itemAmt, givenInfoMessage)) {
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
                                                    let itemStack = getNiItem(args[1], sender, sender, data)
                                                    // 记录物品名及次数
                                                    var itemName = getItemName(itemStack)
                                                    if (amtMap[itemName] == null) {
                                                        amtMap[itemName] = 1
                                                    } else {
                                                        amtMap[itemName] ++
                                                    }
                                                    // 给予物品
                                                    if (!giveItem(sender, itemStack)) {
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
                                    sendMessages(sender, helpMessages)
                                }
                            } else {
                                // 后台无法执行提示
                                sender.sendMessage(invalidPaser)
                            }
                        }))
                        return true
                    // nim give [玩家ID] [物品ID] (数量) (是否反复随机) (指向数据) > 根据ID给予NI物品
                    case "give":
                        BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                            // 检测指令长度
                            if (args.length > 2) {
                                let player
                                // 获取对应在线玩家
                                if (player = Bukkit.getPlayer(args[1])) {
                                    // 检测是否存在对应ID的NI物品
                                    if (NIConfig.itemIDList.indexOf(args[2]) != -1) {
                                        let data = null
                                        if (args.length > 5) data = Java.from(args).slice(5).join(" ")
                                        let itemAmt
                                        // 获取数量
                                        if (args.length == 3 || ((itemAmt = parseInt(args[3])) && itemAmt > 0)) {
                                            itemAmt = itemAmt || 1
                                            // 如果仅需一样的物品
                                            if (args.length > 4 && (args[4] == "false" || args[4] == "0")) {
                                                let itemStack = getNiItem(args[2], player, sender, data)
                                                // 替换提示信息中的占位符
                                                let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                // 给予物品
                                                if (!giveItems(player, itemStack, itemAmt, givenInfoMessage)) {
                                                    // 给予失败提示
                                                    sender.sendMessage(failureInfo)
                                                }
                                                // 替换提示信息中的占位符
                                                let successInfoMessage = successInfo.replace(/{player}/g, args[1])
                                                successInfoMessage = successInfoMessage.replace(/{amount}/g, itemAmt)
                                                successInfoMessage = successInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                // 给予成功提示
                                                sender.sendMessage(successInfoMessage)
                                            // 如果需要反复构建
                                            } else {
                                                // {物品名: 产出次数}
                                                let amtMap = new HashMap()
                                                // 循环构建物品
                                                for (let index = 0; index < itemAmt; index++) {
                                                    // 构建物品
                                                    let itemStack = getNiItem(args[2], player, sender, data)
                                                    // 记录物品名及次数
                                                    var itemName = getItemName(itemStack)
                                                    if (amtMap[itemName] == null) {
                                                        amtMap[itemName] = 1
                                                    } else {
                                                        amtMap[itemName] ++
                                                    }
                                                    // 给予物品
                                                    if (!giveItem(player, itemStack)) {
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
                                sendMessages(sender, helpMessages)
                            }
                        }))
                        return true
                    // nim giveAll [物品ID] (数量) (是否反复随机) (指向数据) > 根据ID给予所有人NI物品
                    case "giveall":
                        BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                            // 检测指令长度
                            if (args.length > 1) {
                                // 检测是否存在对应ID的NI物品
                                if (NIConfig.itemIDList.indexOf(args[1]) != -1) {
                                    let data = null
                                    if (args.length > 4) data = Java.from(args).slice(4).join(" ")
                                    let itemAmt
                                    // 获取数量
                                    if (args.length == 2 || ((itemAmt = parseInt(args[2])) && itemAmt > 0)) {
                                        itemAmt = itemAmt || 1
                                        // 如果仅需一样的物品
                                        if (args.length > 3 && (args[3] == "false" || args[3] == "0")) {
                                            // 对于每个在线玩家
                                            Bukkit.getOnlinePlayers().forEach((player) => {
                                                let itemStack = getNiItem(args[1], player, sender, data)
                                                // 替换提示信息中的占位符
                                                let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                // 给予物品
                                                if (!giveItems(player, itemStack, itemAmt, givenInfoMessage)) {
                                                    // 给予失败提示
                                                    sender.sendMessage(failureInfo)
                                                }
                                                // 替换提示信息中的占位符
                                                let successInfoMessage = successInfo.replace(/{player}/g, player.getDisplayName())
                                                successInfoMessage = successInfoMessage.replace(/{amount}/g, itemAmt)
                                                successInfoMessage = successInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                // 给予成功提示
                                                sender.sendMessage(successInfoMessage)
                                            })
                                        // 如果需要反复构建
                                        } else {
                                            // 对于每个在线玩家
                                            Bukkit.getOnlinePlayers().forEach((player) => {
                                                // {物品名: 产出次数}
                                                let amtMap = new HashMap()
                                                // 循环构建物品
                                                for (let index = 0; index < itemAmt; index++) {
                                                    // 构建物品
                                                    itemStack = getNiItem(args[1], player, sender, data)
                                                    // 记录物品名及次数
                                                    var itemName = getItemName(itemStack)
                                                    if (amtMap[itemName] == null) {
                                                        amtMap[itemName] = 1
                                                    } else {
                                                        amtMap[itemName] ++
                                                    }
                                                    // 给予物品
                                                    if (!giveItem(player, itemStack)) {
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
                                sendMessages(sender, helpMessages)
                            }
                        }))
                        return true
                    // nim drop [物品ID] [数量] [世界名] [X坐标] [Y坐标] [Z坐标] (是否反复随机) (物品解析对象) (指向数据) > 于指定位置掉落NI物品
                    case "drop":
                        BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
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
                                    if (NIConfig.itemIDList.indexOf(args[1]) != -1) {
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
                                                        let itemStack = getNiItem(args[1], player, sender, data)
                                                        // 掉落物品
                                                        dropItems(world, x, y, z, itemStack, itemAmt)
                                                        // 替换提示信息中的占位符
                                                        let dropSuccessInfoMessage = dropSuccessInfo.replace(/{world}/g, args[3])
                                                        dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{x}/g, args[4])
                                                        dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{y}/g, args[5])
                                                        dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{z}/g, args[6])
                                                        dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{amount}/g, itemAmt)
                                                        dropSuccessInfoMessage = dropSuccessInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                        // 给予成功提示
                                                        sender.sendMessage(dropSuccessInfoMessage)
                                                    // 如果需要反复构建
                                                    } else {
                                                        // {物品名: 产出次数}
                                                        let amtMap = new HashMap()
                                                        // 循环构建物品
                                                        for (let index = 0; index < itemAmt; index++) {
                                                            // 构建物品
                                                            let itemStack = getNiItem(args[1], player, sender, data)
                                                            // 记录物品名及次数
                                                            var itemName = getItemName(itemStack)
                                                            if (amtMap[itemName] == null) {
                                                                amtMap[itemName] = 1
                                                            } else {
                                                                amtMap[itemName] ++
                                                            }
                                                            // 掉落物品
                                                            dropItems(world, x, y, z, itemStack, itemAmt)
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
                                sendMessages(sender, helpMessages)
                            }
                        }))
                        return true
                    // nim save [物品ID] (保存路径) > 将手中物品以对应ID保存至对应路径
                    case "save":
                        BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                            // 检测指令长度
                            if (args.length > 1) {
                                // 获取手中物品
                                let itemStack = sender.getInventory().getItemInMainHand()
                                // 获取保存路径
                                let path = args[2] || args[1] + ".yml"
                                let saveResult
                                // 保存物品
                                if (saveResult = saveNiItem(itemStack, args[1], args[2], false)) {
                                    // 重载物品列表
                                    getNiItems()
                                    // 替换提示信息中的占位符
                                    let successSaveInfoMessage = successSaveInfo.replace(/{name}/g, getItemName(itemStack))
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
                                sendMessages(sender, helpMessages)
                            }
                        }))
                        return true
                    // nim cover [物品ID] (保存路径) > 将手中物品以对应ID覆盖至对应路径
                    case "cover":
                        BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                            // 检测指令长度
                            if (args.length > 1) {
                                // 获取手中物品
                                let itemStack = sender.getInventory().getItemInMainHand()
                                // 获取保存路径
                                let path = args[2] || args[1] + ".yml"
                                // 保存物品
                                let saveResult = saveNiItem(itemStack, args[1], args[2], true)
                                if (saveResult != 2) {
                                    // 重载物品列表
                                    getNiItems()
                                    // 替换提示信息中的占位符
                                    let successSaveInfoMessage = successSaveInfo.replace(/{name}/g, getItemName(itemStack))
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
                                sendMessages(sender, helpMessages)
                            }
                        }))
                        return true
                    case "mm":
                        // 检测指令长度
                        if (args.length > 1) {
                            switch(args[1].toLowerCase()) {
                                // nim mm load [物品ID] (保存路径) > 将对应ID的MM物品保存为NI物品
                                case "load":
                                    BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                                        // 检测指令长度
                                        if (args.length > 2) {
                                            // 获取MM物品
                                            let mmItem = itemManager.getItem(args[2])
                                            if (mmItem.isPresent()){
                                                let itemStack = BukkitAdapter.adapt(mmItem.get().generateItemStack(1))
                                                // 获取保存路径
                                                let path = args[3] || MMItemsPath
                                                let saveResult
                                                // 保存物品
                                                if (saveResult = saveNiItem(itemStack, args[2], path, false)) {
                                                    // 重载物品列表
                                                    getNiItems()
                                                    // 替换提示信息中的占位符
                                                    let successSaveInfoMessage = successSaveInfo.replace(/{name}/g, getItemName(itemStack))
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
                                                return
                                            }
                                        } else {
                                            // 发送帮助信息
                                            sendMessages(sender, helpMessages)
                                        }
                                    }))
                                    break
                                // nim mm cover [物品ID] (保存路径) > 将对应ID的MM物品覆盖为NI物品
                                case "cover":
                                    BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                                        // 检测指令长度
                                        if (args.length > 2) {
                                            // 获取MM物品
                                            let mmItem = itemManager.getItem(args[2])
                                            if (mmItem.isPresent()){
                                                let itemStack = BukkitAdapter.adapt(mmItem.get().generateItemStack(1))
                                                // 获取保存路径
                                                let path = args[3] || MMItemsPath
                                                let saveResult = saveNiItem(itemStack, args[2], path, true)
                                                // 保存物品
                                                if (saveResult != 2) {
                                                    // 重载物品列表
                                                    getNiItems()
                                                    // 替换提示信息中的占位符
                                                    let successSaveInfoMessage = successSaveInfo.replace(/{name}/g, getItemName(itemStack))
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
                                                return
                                            }
                                        } else {
                                            // 发送帮助信息
                                            sendMessages(sender, helpMessages)
                                        }
                                    }))
                                    break
                                // nim mm loadAll (保存路径) > 将全部MM物品转化为NI物品
                                case "loadall":
                                    BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                                        // 获取保存路径
                                        let path = args[2] || MMItemsPath
                                        // 获取全部MM物品并操作
                                        itemManager.getItems().stream().forEach((item) => {
                                            let saveResult
                                            // 保存物品
                                            if (!(saveResult = saveNiItem(BukkitAdapter.adapt(item.generateItemStack(1)), item.getInternalName(), path, false))) {
                                                // 替换提示信息中的占位符
                                                let existedKeyMessage = existedKey.replace(/{itemID}/g, item.getInternalName())
                                                // 物品ID已存在提示
                                                sender.sendMessage(existedKeyMessage)
                                            } else if (saveResult == 2) {
                                                // 空气提示
                                                sender.sendMessage(airItem)
                                            }
                                        })
                                        // 重载物品列表
                                        getNiItems()
                                        // 替换提示信息中的占位符
                                        let mMImportSuccessInfoMessage = mMImportSuccessInfo.replace(/{path}/g, path)
                                        // 保存成功提示
                                        sender.sendMessage(mMImportSuccessInfoMessage)
                                    }))
                                    break
                                // nim mm get [物品ID] (数量) > 根据ID获取MM物品
                                case "get":
                                    BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                                        // 如果指令发送者不是玩家
                                        if (sender instanceof Player) {
                                            // 检测指令长度
                                            if (args.length > 2) {
                                                // 获取MM物品
                                                let mmItem = itemManager.getItem(args[2])
                                                if (mmItem.isPresent()) {
                                                    let itemStack = BukkitAdapter.adapt(mmItem.get().generateItemStack(1))
                                                    let itemAmt
                                                    // 获取数量
                                                    if (args.length == 3 || ((itemAmt = parseInt(args[3])) && itemAmt > 0)) {
                                                        itemAmt = itemAmt || 1
                                                        // 替换给予信息中的占位符
                                                        let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                        givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                        // 给予物品
                                                        if (!giveItems(sender, itemStack, itemAmt, givenInfoMessage)) {
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
                                                sendMessages(sender, helpMessages)
                                            }
                                        } else {
                                            // 后台无法执行提示
                                            sender.sendMessage(invalidPaser)
                                        }
                                    }))
                                    break
                                // nim mm give [玩家ID] [物品ID] (数量) > 根据ID给予MM物品
                                case "give":
                                    BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                                        if (args.length > 3) {
                                            let player
                                            // 获取对应在线玩家
                                            if (player = Bukkit.getPlayer(args[2])) {
                                                // 获取MM物品
                                                let mmItem = itemManager.getItem(args[3])
                                                if (mmItem.isPresent()) {
                                                    let itemStack = BukkitAdapter.adapt(mmItem.get().generateItemStack(1))
                                                    let itemAmt
                                                    // 获取数量
                                                    if (args.length == 4 || ((itemAmt = parseInt(args[4])) && itemAmt > 0)) {
                                                        itemAmt = itemAmt || 1
                                                        // 替换给予信息中的占位符
                                                        let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                        givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                        // 给予物品
                                                        if (!giveItems(player, itemStack, itemAmt, givenInfoMessage)) {
                                                            // 给予失败提示
                                                            sender.sendMessage(failureInfo)
                                                        }
                                                        // 替换给予信息中的占位符
                                                        let successInfoMessage = successInfo.replace(/{player}/g, args[2])
                                                        successInfoMessage = successInfoMessage.replace(/{amount}/g, itemAmt)
                                                        successInfoMessage = successInfoMessage.replace(/{name}/g, getItemName(itemStack))
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
                                            sendMessages(sender, helpMessages)
                                        }
                                    }))
                                    break
                                // nim mm giveAll [物品ID] (数量) > 根据ID给予所有人MM物品
                                case "giveall":
                                    BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                                        // 检测指令长度
                                        if (args.length > 2) {
                                            // 获取MM物品
                                            let mmItem = itemManager.getItem(args[2])
                                            if (mmItem.isPresent()) {
                                                let itemStack = BukkitAdapter.adapt(mmItem.get().generateItemStack(1))
                                                let itemAmt
                                                // 获取数量
                                                if (args.length == 3 || ((itemAmt = parseInt(args[3])) && itemAmt > 0)) {
                                                    itemAmt = itemAmt || 1
                                                    // 替换给予信息中的占位符
                                                    let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                    givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                    // 对于每个在线玩家
                                                    Bukkit.getOnlinePlayers().forEach((player) => {
                                                        // 给予物品
                                                        if (!giveItems(player, itemStack, itemAmt, givenInfoMessage)) {
                                                            // 给予失败提示
                                                            sender.sendMessage(failureInfo)
                                                        }
                                                    })
                                                    // 替换提示信息中的占位符
                                                    let successInfoMessage = successInfo.replace(/{player}/g, "所有玩家")
                                                    successInfoMessage = successInfoMessage.replace(/{amount}/g, itemAmt)
                                                    successInfoMessage = successInfoMessage.replace(/{name}/g, getItemName(itemStack))
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
                                            sendMessages(sender, helpMessages)
                                        }
                                    }))
                                    break
                                default:
                                    // 发送帮助信息
                                    sendMessages(sender, helpMessages)
                            }
                        } else {
                            // 发送帮助信息
                            sendMessages(sender, helpMessages)
                        }
                        return true
                    // nim reload > 重新加载NI物品
                    case "reload":
                        BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                            // 重载配置文件
                            NeigeItemsConfig()
                            // 创建节点缓存文件
                            NIConfig.sections = {}
                            // 重载全局节点列表
                            getGlobalSections()
                            // 重载NI物品列表
                            getNiItems()
                            // 重载NI物品动作列表
                            getNiActions()
                            // 重载MM物品列表
                            mmItemLoad()
                            // 重载成功提示
                            sender.sendMessage(reloadedMessage)
                        }))
                        return true
                    default:
                        // 发送帮助信息
                        sendMessages(sender, helpMessages)
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
    command.setTabCompleter((sender, command, alias, args) => {
        // 仅限后台/OP使用
        if (!sender instanceof Player || sender.isOp()) {
            let emptyList = Arrays.asList([])
            switch(args.length) {
                case 1:
                    return Arrays.asList(["list", "get", "give", "giveAll", "drop", "save", "cover", "mm", "help", "reload"])
                case 2:
                    switch(args[0].toLowerCase()) {
                        case "list":
                            return incrementingArray(pageAmount)
                        case "get":
                            return NIConfig.itemIDList
                        case "give":
                            return onlinePlayers()
                        case "giveall":
                            return NIConfig.itemIDList
                        case "drop":
                            return NIConfig.itemIDList
                        case "mm":
                            return Arrays.asList(["load", "cover", "loadAll", "get", "give"])
                        default:
                            return emptyList
                    }
                case 3:
                    switch(args[0].toLowerCase()) {
                        case "give":
                            return NIConfig.itemIDList
                        case "mm":
                            switch(args[1].toLowerCase()) {
                                case "load":
                                    return MMIDs
                                case "cover":
                                    return MMIDs
                                case "get":
                                    return MMIDs
                                case "give":
                                    return onlinePlayers()
                                case "giveall":
                                    return MMIDs
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
                                    return MMIDs
                                default:
                                    return emptyList
                            }
                        case "drop":
                            return getWorlds()
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
                            return onlinePlayers()
                        default:
                            return emptyList
                    }
                default:
                    return emptyList
            } 
        }
    })
    // 注册指令
    Tool.regCommand(command)
}

/**
 * 玩家交互方块事件
 * @param event PlayerInteractEvent 玩家交互方块事件
 */
function NeigeItemsPlayerInteractEvent(event) {
    let Action = Packages.org.bukkit.event.block.Action
    let Bukkit = Packages.org.bukkit.Bukkit
    let BukkitScheduler = Bukkit.getScheduler()
    let Consumer = Packages.java.util.function.Consumer
    let Material = Packages.org.bukkit.Material
    let NMSKt = Packages.com.skillw.pouvoir.taboolib.module.nms.NMSKt
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
    if (itemTag.NeigeItems == undefined) return
    // 获取物品消耗信息
    let consume =  NIConfig.actions[itemTag.NeigeItems.id.asString()].consume
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
                    let lastTime = getMetaData(player, "NeigeItems-Consume-Cooldown-" + itemTag.NeigeItems.id, "Double", 0)
                    // 如果仍处于冷却时间
                    if ((lastTime + cooldown) > time) {
                        PlayerUtils.sendActionBar(player, NIConfig.itemCooldown.replace(/{time}/g, ((lastTime + cooldown - time)/1000).toFixed(1)))
                        // 终止操作
                        return
                    }
                    setMetaData(player, "NeigeItems-Consume-Cooldown-" + itemTag.NeigeItems.id, time)
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
                    if (itemClone) giveItem(player, itemClone)
                } else {
                    // 消耗物品
                    itemStack.setAmount(itemStack.getAmount()-amount)
                }
                // 执行动作
                BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
                    executeNiAction(player, itemTag, left, right)
                }))
            }
        }
    } else if (NIConfig.actions[itemTag.NeigeItems.id.asString()]) {
        // 取消交互事件
        event.setCancelled(true)
        BukkitScheduler.runTaskAsynchronously(Tool.getPlugin("Pouvoir"), new Consumer(() => {
            // 获取冷却
            let cooldown = parseInt(NIConfig.actions[itemTag.NeigeItems.id.asString()].cooldown)
            // 如果冷却存在且大于0
            if (cooldown != undefined && cooldown > 0) {
                // 获取当前时间
                let time = new Date().getTime()
                // 获取上次使用时间
                let lastTime = getMetaData(player, "NeigeItems-Cooldown-" + itemTag.NeigeItems.id, "Double", 0)
                // 如果仍处于冷却时间
                if ((lastTime + cooldown) > time) {
                    PlayerUtils.sendActionBar(player, NIConfig.itemCooldown.replace(/{time}/g, ((lastTime + cooldown - time)/1000).toFixed(1)))
                    // 终止操作
                    return
                }
                setMetaData(player, "NeigeItems-Cooldown-" + itemTag.NeigeItems.id, time)
            }
            // 执行动作
            executeNiAction(player, itemTag, leftAction, rightAction)
        }))
    }
}

/**
 * 执行NI动作
 * @param player Player 物品ID
 * @param itemNBT ItemTag 物品NBT
 * @param left Boolean 是否执行左键动作
 * @param right Boolean 是否执行右键动作
 */
 function executeNiAction(player, itemNBT, left, right) {
    let actions
    if (actions = NIConfig.actions[itemNBT.NeigeItems.id.asString()]) {
        let PlaceholderAPI = Tool.staticClass('me.clip.placeholderapi.PlaceholderAPI')
        if (left && actions.left) {
            let leftPlayer = actions.left.player || []
            leftPlayer.forEach(element => {
                runCommand(PlaceholderAPI.setPlaceholders(player, element), player)
            })
            let leftConsole = actions.left.console || []
            leftConsole.forEach(element => {
                runCommand(PlaceholderAPI.setPlaceholders(player, element))
            })
        }
        if (right && actions.right) {
            let rightPlayer = actions.right.player || []
            rightPlayer.forEach(element => {
                runCommand(PlaceholderAPI.setPlaceholders(player, element), player)
            })
            let rightConsole = actions.right.console || []
            rightConsole.forEach(element => {
                runCommand(PlaceholderAPI.setPlaceholders(player, element))
            })
        }
        if (actions.all) {
            let allPlayer = actions.all.player || []
            allPlayer.forEach(element => {
                runCommand(PlaceholderAPI.setPlaceholders(player, element), player)
            })
            let allConsole = actions.all.console || []
            allConsole.forEach(element => {
                runCommand(PlaceholderAPI.setPlaceholders(player, element))
            })
        }
    }
}

/**
 * 将物品以对应ID保存至对应路径
 * @param itemStack ItemStack 物品
 * @param itemKey String 物品ID
 * @param path String 保存路径
 * @param cover Boolean 是否覆盖
 * @return Boolean 是否保存成功
 */
function saveNiItem(itemStack, itemKey, path = itemKey + ".yml", cover) {
    let NMSKt = Packages.com.skillw.pouvoir.taboolib.module.nms.NMSKt
    let YamlConfiguration = Packages.org.bukkit.configuration.file.YamlConfiguration
    let Material = Packages.org.bukkit.Material

    // 检测是否为空气
    if (itemStack != null && itemStack.getType() != Material.AIR) {
        // 获取路径文件
        let dir = getDir(scriptName + "/Items")
        file = getFile(dir, path)
        let config = YamlConfiguration.loadConfiguration(file)
        // 检测节点是否存在
        if ((NIConfig.itemIDList.indexOf(itemKey) == -1) || cover) {
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
                let itemNBT = getHashMapNBT(NMSKt.getItemTag(itemStack))
                // 获取显示信息
                let display = itemNBT.display
                itemNBT.remove("display")
                // 设置CustomModelData
                if (itemNBT.containsKey("custommodeldata")) {
                    itemKeySection.set("custommodeldata", parseInt(itemNBT.CustomModelData.slice(6)))
                    itemNBT.remove("custommodeldata")
                }
                // 设置子ID/损伤值
                if (itemNBT.containsKey("Damage")) {
                    itemKeySection.set("damage", parseInt(itemNBT.Damage.slice(6)))
                    itemNBT.remove("Damage")
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
                    itemMeta.getEnchants().keySet().forEach((enchant) => {
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
                    itemKeySection.set("color", display.color)
                }
                // 设置物品NBT
                if (!itemNBT.isEmpty()) {
                    itemKeySection.set("nbt", itemNBT)
                }
            }
            config.save(file)
            if (NIConfig.itemIDList.indexOf(itemKey) == -1) return 1
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
function getItemKeySection(itemID) {
    let itemConfig = null
    NIConfig.items.some((itemIDs) => {
        let index = itemIDs[1].indexOf(itemID)
        if (index != -1) {
            itemConfig = getConfigSection(itemIDs[0])[index]
            return true
        }
    })
    return itemConfig
}

/**
 * 根据ID获取物品
 * @param itemID String 物品ID
 * @param player Player 用于解析PAPI变量
 * @param sender 用于发送错误信息
 * @param data String 指向数据
 * @return ItemStack
 */
function getNiItem(itemID, player, sender, data) {
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
    let YamlConfiguration = Packages.org.bukkit.configuration.file.YamlConfiguration
    let BukkitServer = Bukkit.getServer()

    let invalidNBT = NIConfig.invalidNBT
    let invalidItem = NIConfig.invalidItem

    // 获取对应物品配置
    let itemKeySection = getItemKeySection(itemID)
    if (itemKeySection == null) return null
    // 获取随机数, 用于代表当前物品
    let random = Math.random()
    NIConfig.sections[random] = {}
    // 加载指向数据
    if (data) dataParse(data, random)
    // 对文本化配置进行全局PAPI解析
    let tempItemKeySection = new YamlConfiguration()
    tempItemKeySection.set(itemID, itemKeySection)
    let stringSection = tempItemKeySection.saveToString()
    stringSection = setPapiWithNoColor(player, stringSection)
    tempItemKeySection = new YamlConfiguration()
    tempItemKeySection.loadFromString(stringSection)
    itemKeySection = tempItemKeySection.getConfigurationSection(itemID)
    // 如果调用了全局节点
    if (itemKeySection.contains("globalsections")) {
        // 获取全局节点ID
        var gSectionIDList = itemKeySection.getStringList("globalsections")
        // 针对每个试图调用的全局节点
        gSectionIDList.forEach((gSectionID) => {
            // 在每个全局节点文件进行查找
            NIConfig.globalSections.forEach((gSectionIDs) => {
                // 如果当前文件中存在相应节点
                let index = gSectionIDs[1].indexOf(gSectionID)
                if (index != -1) {
                    itemKeySection.set("sections." + gSectionID, getConfigSection(gSectionIDs[0])[index])
                }
            })
        })
    }
    // 获取私有节点配置
    if (itemKeySection.contains("sections")) var Sections = itemKeySection.getConfigurationSection("sections")
    // 如果当前物品包含预声明节点
    if (Sections != undefined) {
        // 针对每个节点
        Sections.getKeys(false).forEach((section) => {
            // 节点解析
            globalSectionParse(Sections, section, random, player)
        })
    }
    // 对文本化配置进行全局节点解析
    tempItemKeySection = new YamlConfiguration()
    tempItemKeySection.set(itemID, itemKeySection)
    let itemHashCode = tempItemKeySection.saveToString().hashCode()
    stringSection = loadSection(Sections, tempItemKeySection.saveToString(), random, player)
    stringSection = stringSection.replace(/\\</g, "<").replace(/\\>/g, ">")
    stringSection = setPapiWithNoColor(player, stringSection)
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
            enchantSection.getKeys(false).forEach((enchant) => {
                if (enchant != null) {
                    let level = enchantSection.getInt(enchant)
                    if (enchant = Enchantment.getByName(enchant.toUpperCase())) {
                        itemStack.addUnsafeEnchantment(enchant, level)
                    }
                }
            })
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
            let lores = itemKeySection.getStringList("lore")
            lores.replaceAll(lore => ChatColor.translateAlternateColorCodes('&', lore))
            itemMeta.setLore(lores)
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
            try { itemMeta.setColor(Color.fromRGB(itemKeySection.getInt("color"))) } catch (e) {}
        }
        itemStack.setItemMeta(itemMeta)
        // 获取物品NBT
        let itemTag = NMSKt.getItemTag(itemStack)
        itemTag.NeigeItems = new ItemTag()
        itemTag.NeigeItems.id = new ItemTagData(itemID)
        itemTag.NeigeItems.data = new ItemTagData(JSON.stringify(NIConfig.sections[random]))
        itemTag.NeigeItems.hashCode = new ItemTagData(itemHashCode)
        if (itemKeySection.contains("options.charge")) {
            itemTag.NeigeItems.charge = new ItemTagData(itemKeySection.get("options.charge"))
            itemTag.NeigeItems.maxCharge = new ItemTagData(itemKeySection.get("options.charge"))
        }
        // 设置物品NBT
        if (itemKeySection.contains("nbt")) {
            // 获取配置NBT
            var itemNBT = getItemTagNBT(toHashMap(itemKeySection.get("nbt")))
            for (let key in itemNBT) {
                if (key != "NeigeItems") itemTag[key] = itemNBT[key]
            }
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
        delete NIConfig.sections[random]
        return itemStack
    } else {
        delete NIConfig.sections[random]
        return null
    }
}

/**
 * 加载NI物品列表
 */
function getNiItems() {
    let ArrayList = Packages.java.util.ArrayList
    
    let configs = getAllConfig(getAllFile(getDir(scriptName + "/Items")))
    // [[config, [id]]]
    NIConfig.items = []
    // [id]
    NIConfig.itemIDList = new ArrayList()
    configs.forEach((config) => {
        let list = new ArrayList()
        let configSections = getConfigSection(config)
        configSections.forEach((section) => {
            list.add(section.getName())
            NIConfig.itemIDList.add(section.getName())
        })
        NIConfig.items.push(new ArrayList(Arrays.asList([config, list])))
    })
    pageAmount = Math.ceil(NIConfig.itemIDList.length/NIConfig.listItemAmount)
}

/**
 * 加载NI物品动作列表
 */
function getNiActions() {
    let HashMap = Packages.java.util.HashMap
    
    let configs = getAllConfig(getAllFile(getDir(scriptName + "/ItemActions")))
    // {id: {left: {console: [], player: []}, right: {console: [], player: []}}}
    NIConfig.actions = new HashMap()
    configs.forEach((config) => {
        let configSections = getConfigSection(config)
        configSections.forEach((section) => {
            NIConfig.actions[section.getName()] = toHashMap(section)
        })
    })
}

/**
 * 加载全局节点列表
 */
function getGlobalSections() {
    let ArrayList = Packages.java.util.ArrayList

    let configs = getAllConfig(getAllFile(getDir(scriptName + "/GlobalSections")))
    // [[config, [id]]]
    NIConfig.globalSections = []
    // [id]
    globalSectionIDList = new ArrayList()
    configs.forEach((config) => {
        let list = new ArrayList()
        let configSections = getConfigSection(config)
        configSections.forEach((section) => {
            list.add(section.getName())
            globalSectionIDList.add(section.getName())
        })
        NIConfig.globalSections.push(new ArrayList(Arrays.asList([config, list])))
    })
}

/**
 * 加载MM物品列表
 */
function mmItemLoad(){
    let ArrayList = Packages.java.util.ArrayList
    let MythicMobs = Packages.io.lumine.xikage.mythicmobs.MythicMobs
    let itemManager = MythicMobs.inst().getItemManager()

    MMIDs = new ArrayList()
    itemManager.getItems().stream().forEach((item) => {
        MMIDs.add(item.getInternalName())
    })
}

/**
 * 创建并获取插件配置文件夹
 * @param scriptName String 插件名
 * @return File 对应文件夹
 */
function getDir(scriptName){
    let File = Packages.java.io.File

    let dir = new File(Tool.getPlugin("Pouvoir").getDataFolder().getParent(),"/" + scriptName)
    if (!dir.exists()) dir.mkdirs()
    return dir
}

/**
 * 创建并获取目录下文件
 * @param dir File 文件所在目录
 * @param fileName String 文件名
 * @return File 对应文件夹
 */
function getFile(dir, fileName){
    let File = Packages.java.io.File

    let file = new File(dir, "/" + fileName)
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
 * 获取HashMap形式物品NBT
 * @param itemTag ItemTag
 * @return HashMap
 */
function getHashMapNBT(itemTag) {
    let ItemTag = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTag
    let ItemTagType = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagType
    let ItemTagList = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagList
    let ArrayList = Packages.java.util.ArrayList
    let HashMap = Packages.java.util.HashMap
    let ignoreKeys = NIConfig.ignoreKeys

    /**
     * 获取HashMap形式物品NBT
     * @param ItemTag ItemTag 物品NBT数据
     * @return HashMap
     */
    toMutableMap = (itemTag) => {
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
    parseNBTValue = (value) => {
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
            value.forEach((it) => {
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
function getItemTagNBT(itemNBT) {
    let ItemTag = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTag
    let ItemTagData = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagData
    let ItemTagList = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagList
    let ArrayList = Packages.java.util.ArrayList
    let Byte = Packages.java.lang.Byte
    let Double = Packages.java.lang.Double
    let Float = Packages.java.lang.Float
    let HashMap = Packages.java.util.HashMap
    let Integer = Packages.java.lang.Integer
    let LinkedHashMap = Packages.java.util.LinkedHashMap
    let Long = Packages.java.lang.Long
    let Short = Packages.java.lang.Short
    let String = Packages.java.lang.String

    /**
     * 获取HashMap形式物品NBT
     * @param itemNBT HashMap 物品NBT数据
     * @return ItemTag
     */
    toItemTag = (itemNBT) => {
        let itemTag = new ItemTag()
        for (let key in itemNBT) {
            itemTag[key] = HashMapValueParse(itemNBT[key])
        }
        return itemTag
    }
    /**
     * NBT值解析
     */
    HashMapValueParse = (value) => {
        if (value instanceof LinkedHashMap || value instanceof HashMap) {
            return new ItemTagData(toItemTag(value))
        } else if (value instanceof ArrayList) {
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
            } else {
                let itemTagList = new ItemTagList()
                value.forEach((it) => {
                    itemTagList.add(HashMapValueParse(it))
                })
                return new ItemTagData(itemTagList)
            }
        } else {
            if (value instanceof String) {
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
            }
            return new ItemTagData(value)
        }
    }
    return toItemTag(itemNBT)
}

/**
 * 获取所有文件
 */
function getAllFile(baseFile) {
    let ArrayList = Packages.java.util.ArrayList

    let list = new ArrayList()
    if (baseFile.isFile() || !baseFile.exists()) {
        return list
    }
    let files = baseFile.listFiles()
    Arrays.asList(files).forEach((file) => {
        if (file.isDirectory()) {
            list.addAll(getAllFile(file))
        } else {
            list.add(file)
        }
    })
    return list
}

/**
 * 获取所有配置
 */
function getAllConfig(files) {
    let ArrayList = Packages.java.util.ArrayList
    let YamlConfiguration = Packages.org.bukkit.configuration.file.YamlConfiguration

    let list = new ArrayList()
    files.forEach((file) => {
        list.add(YamlConfiguration.loadConfiguration(file))
    })
    return list
}

/**
 * 获取所有配置的所有节点
 */
function getConfigSection(configs) {
    let ArrayList = Packages.java.util.ArrayList

    let list = new ArrayList()
    if (configs instanceof ArrayList) {
        configs.forEach((config) => {
            config.getKeys(false).forEach((id) => {
                list.add(config.getConfigurationSection(id))
            })
        })
    } else {
        configs.getKeys(false).forEach((id) => {
            list.add(configs.getConfigurationSection(id))
        })
    }
    return list
}

/**
 * 讲ConfigSection转化为HashMap
 * @param configSection MemorySection
 * @return HashMap
 */
function toHashMap(configSection){
    let HashMap = Packages.java.util.HashMap
    let MemorySection = Packages.org.bukkit.configuration.MemorySection

    let hashMapNBT = new HashMap()
    configSection.getKeys(false).forEach((key) => {
        if (configSection.get(key) instanceof MemorySection) {
            hashMapNBT[key] = toHashMap(configSection.get(key))
        } else {
            hashMapNBT[key] = configSection.get(key)
        }
    })
    return hashMapNBT
}

/**
 * 解析一次文本内节点
 * @param Sections ConfigurationSection 物品配置
 * @param string String 待解析文本
 * @param random number 随机数
 * @param player Player 待解析玩家
 */
function getSection(Sections, string, random, player) {
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
    let listString = []
    listString.push(string.slice(0, start[0]))
    for (let index = 0; index < start.length; index++) {
        // 目标文本
        listString.push(getSection(Sections, string.slice(start[index]+1, end[index]), random, player))

        if (index+1 != start.length) {
            listString.push(string.slice(end[index]+1, start[index+1]))
        } else {
            listString.push(string.slice(end[index]+1))
        }
    }
    // 针对目标文本
    for (let index = 1; index < listString.length; index+=2) {
        // 键值解析
        listString[index] = parseSection(Sections, listString[index], random, player)
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
function parseSection(Sections, string, random, player) {
    // 分离获取各参数
    var parts = string.split("::")
    // 如果只指定了类型和参数
    if (parts.length == 2) {
        var type = parts[0]
        var args = parts.slice(1).join("::").split("_")
    // 如果指定了节点ID
    } else if (parts.length > 2){
        var name = parts[0]
        var type = parts[1]
        var args = parts.slice(2).join("::").split("_")
    } else {
        var name = string
    }
    // 如果已解析对应ID节点
    if (NIConfig.sections[random][name] != undefined) {
        // 直接返回对应节点值
        return NIConfig.sections[random][name]
    // 如果尚未解析对应ID节点
    } else {
        // 尝试解析并返回对应节点值
        if (globalSectionParse(Sections, name, random, player)) return NIConfig.sections[random][name]
    }
    switch (type) {
        case "strings":
            if (args.length > 1) {
                var result = getSection(Sections, args[parseInt(Math.random()*(args.length))], random, player)
            } else {
                var result = getSection(Sections, args[0], random, player)
            }
            if (name) NIConfig.sections[random][name] = result
            return result
        case "number":
            if (args.length > 1) var result = Math.random()*(parseFloat(getSection(Sections, args[1], random, player))-parseFloat(getSection(Sections, args[0], random, player)))+parseFloat(getSection(Sections, args[0], random, player))
            if (args.length > 2) {
                result = result.toFixed(parseInt(getSection(Sections, args[2], random, player)))
            } else {
                result = result.toFixed(0)
            }
            if (!isNaN(result)) {
                // 已指定ID
                if (name) NIConfig.sections[random][name] = result
                return result
            }
            return "未知数字节点参数"
        case "calculation":
            // 如果配置了公式
            if (args.length > 0) {
                try {
                    // 获取公式结果
                    let result = eval(getSection(Sections, args[0], random, player))
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
                        // 已指定ID
                        if (name) NIConfig.sections[random][name] = result
                        return result
                    }
                } catch (error) {
                    if (name) NIConfig.sections[random][name] = "公式节点计算错误"
                    return "公式节点计算错误"
                }
            }
            break
        case "weight":
            if (args.length = 1) {
                var result = getSection(Sections, args[0].slice(args[0].indexOf("::")+2), random, player)
                if (name) NIConfig.sections[random][name] = result
                return result
            }
            var strings = []
            args.forEach((value) => {
                let index = value.indexOf("::")
                let weight = parseInt(value.slice(0, index))
                let string = value.slice(index+2)
                for (let index = 0; index < weight; index++) strings.push(string)
            })
            var result = getSection(Sections, strings[parseInt(Math.random()*(strings.length))], random, player)
            if (name) NIConfig.sections[random][name] = result
            return result
        case "js":
            try {
                var info = args.join("_").split("::")
                var path = info[0]
                var func = info[1]
                var global = loadWithNewGlobal("plugins/" + scriptName + "/Scripts/" + path)
                var result = getSection(Sections, global[func](NIConfig.sections[random], player), random, player)
                if (name) NIConfig.sections[random][name] = result
                return result
            } catch (error) {
                if (name) NIConfig.sections[random][name] = "js函数获取失败"
                return "js函数获取失败"
            }
        default:
            // 将类型视作ID尝试解析
            var name  = type
            // 如果已解析对应ID节点
            if (NIConfig.sections[random][name] != undefined) {
                // 直接返回对应节点值
                return NIConfig.sections[random][name]
            // 如果尚未解析对应ID节点
            } else {
                // 尝试解析并返回对应节点值
                if (globalSectionParse(Sections, name, random, player)) return NIConfig.sections[random][name]
            }
            return "<" + string + ">"
    }
}

/**
 * 迭代解析所有节点
 * @param Sections ConfigurationSection 物品配置
 * @param string String 待解析文本
 * @param random number 随机数
 * @param player Player 待解析玩家
 */
function loadSection(Sections, string, random, player) {
    let result, length
    while (length != Object.keys(NIConfig.sections[random]).length) {
        length = Object.keys(NIConfig.sections[random]).length
        result = getSection(Sections, string, random, player)
    }
    return result
}

/**
 * 发送信息
 * @param player OnlinePlayer
 * @param messages Array
 */
function sendMessages(player, messages) {
    messages.forEach((message) => {
        player.sendMessage(message)
    })
}

/**
 * 获取在线玩家ID列表
 */
function onlinePlayers() {
    let ArrayList = Packages.java.util.ArrayList
    let Bukkit = Packages.org.bukkit.Bukkit

    let onlinePlayers = new ArrayList()
    Bukkit.getOnlinePlayers().forEach((player) => {
        onlinePlayers.add(player.getDisplayName())
    })
    return onlinePlayers
}


/**
 * 加载世界列表
 */
 function getWorlds() {
    let ArrayList = Packages.java.util.ArrayList
    let Bukkit = Packages.org.bukkit.Bukkit

    let worlds = new ArrayList()
    Bukkit.getWorlds().forEach((world) => {
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
function giveItems(player, itemStack, amount, message) {
    let ItemStack = Packages.org.bukkit.inventory.ItemStack

    if (itemStack instanceof ItemStack && player.isOnline()) {
        let stackSize = itemStack.getMaxStackSize()
        itemStack.setAmount(stackSize)
        for (var givenAmt = 0; (givenAmt + stackSize) <= amount; givenAmt += stackSize) { giveItem(player, itemStack) }
        if (givenAmt < amount) {
            itemStack.setAmount(amount - givenAmt)
            giveItem(player, itemStack)
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
function giveItem(player, itemStack) {
    let ItemStack = Packages.org.bukkit.inventory.ItemStack

    if (itemStack instanceof ItemStack && player.isOnline()) {
        let inv = player.getInventory()
        let loc = player.getLocation()
        let dropList = inv.addItem(itemStack)
        if (!dropList.isEmpty()) {
            let Bukkit = Packages.org.bukkit.Bukkit
            let BukkitScheduler = Bukkit.getScheduler()
            BukkitScheduler.callSyncMethod(Tool.getPlugin("Pouvoir"), () => {
                loc.getWorld().dropItem(loc, dropList[0])
            })
        }
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
function dropItems(world, x, y, z, itemStack, amount) {
    let ItemStack = Packages.org.bukkit.inventory.ItemStack

    if (itemStack instanceof ItemStack) {
        let Location = Packages.org.bukkit.Location
        let stackSize = itemStack.getMaxStackSize()
        let location = new Location(world, x, y, z)
        itemStack.setAmount(stackSize)
        for (var givenAmt = 0; (givenAmt + stackSize) <= amount; givenAmt += stackSize) { dropItem(world, location, itemStack) }
        if (givenAmt < amount) {
            itemStack.setAmount(amount - givenAmt)
            dropItem(world, location, itemStack)
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
function dropItem(world, location, itemStack){
    let Bukkit = Packages.org.bukkit.Bukkit

    let BukkitScheduler = Bukkit.getScheduler()
    BukkitScheduler.callSyncMethod(Tool.getPlugin("Pouvoir"), () => {
        world.dropItem(location, itemStack)
    })
}

/**
 * 获取config键值
 * @param config ConfigurationSection
 * @param key String 待获取键
 * @param defaultValue any 默认值
 */
function getConfigValue(file, key, defaultValue) {
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
 function dataParse(string, random) {
    let String = Packages.java.lang.String

    if (string instanceof String) {
        try { 
            let obj=JSON.parse(string)
            if (typeof obj == "object" && obj ){
                for (let key in obj) {
                    NIConfig.sections[random][key] = obj[key]
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
 * @return Boolean 是否包含相应节点
 */
function globalSectionParse(Sections, section, random, player) {
    if (Sections != null && Sections.contains(section)) {
        let currentSection = Sections.getConfigurationSection(section)
        // 获取节点类型
        let type = currentSection.getString("type")
        switch (type) {
            case "strings":
                // 如果配置了字符串组
                if (currentSection.contains("values")) {
                    // 加载字符串组
                    var strings = currentSection.get("values")
                    NIConfig.sections[random][section] = getSection(Sections, strings[parseInt(Math.random()*(strings.length))], random, player)
                }
                break
            case "number":
                // 如果配置了数字范围
                if (currentSection.contains("min") && currentSection.contains("max")) {
                    // 获取大小范围
                    let min = parseFloat(getSection(Sections, currentSection.getString("min"), random, player))
                    let max = parseFloat(getSection(Sections, currentSection.getString("max"), random, player))
                    // 获取取整位数
                    let fixed
                    if (currentSection.contains("fixed")) {
                        fixed = parseInt(getSection(Sections, currentSection.getString("fixed"), random, player))
                    }
                    if (isNaN(fixed)) fixed = 0
                    // 加载随机数
                    NIConfig.sections[random][section] = ((Math.random()*(max-min))+min).toFixed(fixed)
                }
                break
            case "calculation":
                if (currentSection.contains("formula")) {
                    try {
                        // 获取公式结果
                        let result = eval(getSection(Sections, currentSection.getString("formula"), random, player))
                        // 如果配置了数字范围
                        if (currentSection.contains("min")) {
                            let min = currentSection.getDouble("min")
                            result = Math.max(min, result)
                        }
                        if (currentSection.contains("max")) {
                            let max = currentSection.getDouble("max")
                            result = Math.min(max, result)
                        }
                        // 获取取整位数
                        let fixed
                        if (currentSection.contains("fixed")) {
                            fixed = currentSection.getInt("fixed")
                        }
                        if (isNaN(fixed)) fixed = 0
                        // 加载公式结果
                        NIConfig.sections[random][section] = result.toFixed(fixed)
                    } catch (error) {
                        NIConfig.sections[random][section] = "公式节点计算错误"
                        print("公式节点: " + section + " 出现计算错误, 请检查配置")
                    }
                }
                break
            case "weight":
                // 如果配置了字符串组
                if (currentSection.contains("values")) {
                    // 加载字符串组
                    var strings = []
                    currentSection.get("values").forEach((value) => {
                        let index = value.indexOf("::")
                        let weight = parseInt(value.slice(0, index))
                        let string = value.slice(index+2)
                        for (let index = 0; index < weight; index++) strings.push(string)
                    })
                    NIConfig.sections[random][section] = getSection(Sections, strings[parseInt(Math.random()*(strings.length))], random, player)
                }
                break
            case "js":
                try {
                    if (currentSection.contains("path")) {
                        var info = currentSection.getString("path").split("::")
                        var path = info[0]
                        var func = info[1]
                        var global = loadWithNewGlobal("plugins/" + scriptName + "/Scripts/" + path)
                        NIConfig.sections[random][section] = getSection(Sections, global[func](NIConfig.sections[random]), random, player)
                    }
                } catch (error) {
                    NIConfig.sections[random][section] = "公式节点计算错误"
                }
                break
            default:
        }
        return true
    } else {
        return false
    }
}

/**
 * 解析PAPI变量, 但不解析颜色字符
 * @author clip
 * @param player OfflinePlayer
 * @param text String 待解析文本
 * @return String 是否包含相应节点
 */
function setPapiWithNoColor(player, text) {
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
        let placeholder = Tool.getPlugin("PlaceholderAPI").getLocalExpansionManager().getExpansion(lowercaseIdentifierString)
        // 如果没获取到
        if (placeholder == undefined) {
            // 怼回去
            builder += "%" + lowercaseIdentifierString
            if (identified) builder += '_'
            builder += parametersString + "%"
            continue
        }
        // 获取一下结果
        let replacement = placeholder.onRequest(player, parametersString)
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
function itemToTellrawJson(itemStack, name = getItemName(itemStack)) {
    let NMSKt = Packages.com.skillw.pouvoir.taboolib.module.nms.NMSKt
    let TellrawJson = Packages.com.skillw.pouvoir.taboolib.module.chat.TellrawJson

    let itemKey = itemStack.type.key.key
    let itemTag = NMSKt.getItemTag(itemStack)
    let tellrawJson = new TellrawJson()
    tellrawJson.append(name)
    return tellrawJson.hoverItem(itemKey, itemTag)
}

/**
 * 获取物品名
 * @param itemStack ItemStack
 * @param name String|null 显示文本, 默认为物品名
 * @return TellrawJson
 */
function getItemName(itemStack) {
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
function incrementingArray(length) {
    length = parseInt(length)
    var arr = []
    for (var i = 1; i <= length; i++) {
        arr.push(i)
    }
    return arr
}

/**
 * 执行指令
 * @param length Int 数组长度
 * @param sender CommandSender 默认为后台
 */
function runCommand(cmd, sender) {
    let Bukkit = Packages.org.bukkit.Bukkit
    let BukkitScheduler = Bukkit.getScheduler()
    let BukkitServer = Bukkit.getServer()
    sender = sender || BukkitServer.getConsoleSender()
    BukkitScheduler.callSyncMethod(Tool.getPlugin("Pouvoir"), function() {
        BukkitServer.dispatchCommand(sender, cmd)
    })
}

/**
 * 获取玩家MetaData
 * @param player Player 玩家
 * @param key MetaData键
 * @param type String 待获取值的类型
 * @param def 默认值
 * @return Any
 */
function getMetaData(player, key, type, def){
    if(player.hasMetadata(key)) return player.getMetadata(key).get(0)["as" + type]()
    return def
}

/**
 * 设置玩家MetaData
 * @param player Player 玩家
 * @param key MetaData键
 * @param value MetaData值
 */
function setMetaData(player, key, value){
    let FixedMetadataValue = Packages.org.bukkit.metadata.FixedMetadataValue
    player.setMetadata(key, new FixedMetadataValue(Tool.getPlugin("Pouvoir"), value))
}

/**
 * 根据物品解析文本内占位符
 * @param itemTag ItemTag
 * @param string String 待解析文本
 * @return String 解析后文本
 */
 function parseItemPlaceholder(itemTag, string) {
    let builder = ""
    let identifier = ""
    let parameters = ""
    for (let i = 0; i < string.length; i++) {
        let l = string[i]
        if (l != "%" || i + 1 >= string.length) {
          builder += l
          continue
        }
        let identified,oopsitsbad,hadSpace = false
        while (++i < string.length) {
            let p = string[i]
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
            if (identified) {
                parameters += p
            } else {
                identifier += p
            }
        }
        let identifierString = identifier
        let lowercaseIdentifierString = identifierString.toLowerCase()
        let parametersString = parameters
        identifier = ""
        parameters = ""
        if (!oopsitsbad) {
            builder += "%" + identifierString
            if (identified) builder += '_' + parametersString
            if (hadSpace) builder += ' '
            continue
        }
        let placeholder = ILR[lowercaseIdentifierString]
        if (placeholder == undefined) {
            builder += "%" + lowercaseIdentifierString
            if (identified) builder += '_'
            builder += parametersString + "%"
            continue
        }
        let replacement = placeholder(itemTag, parametersString)
        if (replacement == null) {
            builder += "%" + lowercaseIdentifierString
            if (identified) builder += '_'
            builder += parametersString + "%"
            continue
        }
        builder += replacement
    }
    return builder
}
