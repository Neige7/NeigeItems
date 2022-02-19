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
	NIConfig["NeigeItemManagerCommand"] = getConfigValue(file, "Main.NeigeItemManagerCommand", "ni")
	// MM物品默认保存路径
	NIConfig["MMItemsPath"] = getConfigValue(file, "Main.MMItemsPath", "MMItems.yml")
	// 不进行保存的NBT键
	NIConfig["ignoreKeys"] = getConfigValue(file, "Main.ignoreKeys", Arrays.asList(["HideFlags","Enchantments","VARIABLES_DATA","ench"]))

	// 玩家不在线提示
	NIConfig["invalidPlayer"] = getConfigValue(file, "Messages.invalidPlayer", "§e[NI] §6玩家不在线或不存在")
	// 给予成功提示
	NIConfig["successInfo"] = getConfigValue(file, "Messages.successInfo", "§e[NI] §6成功给予 §f{player} §a{amount} §6个 §f{name}")
	// 被给予成功提示(设置为""则不进行提示)
	NIConfig["givenInfo"] = getConfigValue(file, "Messages.givenInfo", "§e[NI] §6你得到了 §a{amount} §6个 §f{name}")
	// 给予成功提示
	NIConfig["dropSuccessInfo"] = getConfigValue(file, "Messages.dropSuccessInfo", "§e[NI] §6成功在 §a{world} §6的 §a{x},{y},{z} §6掉落了 §a{amount} §6个 §f{name}")
	// 未知物品提示
	NIConfig["unknownItem"] = getConfigValue(file, "Messages.unknownItem", "§e[NI] §6找不到ID为 §a{itemID} §6的物品")
	// 对应ID物品已存在提示
	NIConfig["existedKey"] = getConfigValue(file, "Messages.existedKey", "§e[NI] §6已存在ID为 §a{itemID} §6的物品")
	// 未知解析对象提示
	NIConfig["invalidPaser"] = getConfigValue(file, "Messages.invalidPaser", "§e[NI] §6不能针对后台解析物品, 请指定一个玩家")
	// 保存成功提示
	NIConfig["successSaveInfo"] = getConfigValue(file, "Messages.successSaveInfo", "§e[NI] §6成功将 §f{name} §6以ID §a{itemID} §6保存至 §a{path}")
	// MM物品转换完毕提示
	NIConfig["mMImportSuccessInfo"] = getConfigValue(file, "Messages.mMImportSuccessInfo", "§e[NI] §6成功将所有MM物品保存至 §a{path}")
	// 不要保存空气提示
	NIConfig["airItem"] = getConfigValue(file, "Messages.airItem", "§e[NI] §6请不要试图保存空气, 谢谢合作")
	// 输入无效数字提示
	NIConfig["invalidAmount"] = getConfigValue(file, "Messages.invalidAmount", "§e[NI] §6无效数字")
	// 输入无效世界提示
	NIConfig["invalidWorld"] = getConfigValue(file, "Messages.invalidWorld", "§e[NI] §6无效世界")
	// 输入无效坐标提示
	NIConfig["invalidLocation"] = getConfigValue(file, "Messages.invalidLocation", "§e[NI] §6无效坐标")
	// 权限不足提示
	NIConfig["insufficientPermissions"] = getConfigValue(file, "Messages.insufficientPermissions", "§e[NI] §6权限不足")
	// 重载完毕提示
	NIConfig["reloadedMessage"] = getConfigValue(file, "Messages.reloadedMessage", "§e[NI] §6重载完毕")

	// 无效NBT提示
	NIConfig["invalidNBT"] = getConfigValue(file, "Messages.invalidNBT", "§6[NI] §cNBT加载失败, 请勿在列表型NBT中混用键值对, 数字及字符串")
	// 错误物品提示
	NIConfig["invalidItem"] = getConfigValue(file, "Messages.invalidItem", "§6[NI] §c物品加载失败, 物品可能缺损数据, 物品ID: §6{itemID}")

	// 帮助信息
	NIConfig["helpMessages"] = getConfigValue(file, "Messages.helpMessages", Arrays.asList([
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
        "§e/ni §fmm loadAll §7> 将全部MM物品转化为NI物品",
        "§e/ni §fmm get [物品ID] (数量) §7> 根据ID获取MM物品",
        "§e/ni §fmm give [玩家ID] [物品ID] (数量) §7> 根据ID给予MM物品",
        "§e/ni §fmm giveAll [物品ID] (数量) §7> 根据ID给予所有人MM物品",
        "§e/ni §freload §7> 重新加载NI物品",
        "§e/ni §fhelp §7> 查看帮助信息",
        "§6================================================="]))

    // 物品列表格式
    NIConfig["listPrefix"] = getConfigValue(file, "ItemList.Prefix", "§6===========§eNeigeItems§6===========")
    NIConfig["listSuffix"] = getConfigValue(file, "ItemList.Suffix", "§6======<< §e{prev} §f{current}§e/§f{total} §e{next} §6>>======")
    NIConfig["listItemAmount"] = getConfigValue(file, "ItemList.ItemAmount", 10)
    NIConfig["listItemFormat"] = getConfigValue(file, "ItemList.ItemFormat", "§6{index}. §a{ID} §6- §f{name}")
    NIConfig["listPrev"] = getConfigValue(file, "ItemList.Prev", "上一页")
    NIConfig["listNext"] = getConfigValue(file, "ItemList.Next", "下一页")
        
}

var Bukkit = Packages.org.bukkit.Bukkit
var BukkitRunnable = Packages.org.bukkit.scheduler.BukkitRunnable
var Color = Packages.org.bukkit.Color
var ConfigurationSection = org.org.bukkit.configuration.ConfigurationSection
var Enchantment = Packages.org.bukkit.enchantments.Enchantment
var ItemFlag = Packages.org.bukkit.inventory.ItemFlag
var ItemStack = Packages.org.bukkit.inventory.ItemStack
var LeatherArmorMeta = org.org.bukkit.inventory.meta.LeatherArmorMeta
var Material = Packages.org.bukkit.Material
var MemorySection = Packages.org.bukkit.configuration.MemorySection
var Player = Packages.org.bukkit.entity.Player
var YamlConfiguration = org.bukkit.configuration.file.YamlConfiguration
var ArrayList = Packages.java.util.ArrayList
var HashMap = Packages.java.util.HashMap
var LinkedHashMap = Packages.java.util.LinkedHashMap
var BukkitAdapter = Packages.io.lumine.xikage.mythicmobs.adapters.bukkit.BukkitAdapter
var BukkitAdapterClass = Packages.com.skillw.pouvoir.taboolib.platform.BukkitAdapter
var TLibBukkitAdapter = new BukkitAdapterClass()
var ItemTag = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTag
var ItemTagData = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagData
var ItemTagList = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagList
var ItemTagType = Packages.com.skillw.pouvoir.taboolib.module.nms.ItemTagType
var TellrawJson = Packages.com.skillw.pouvoir.taboolib.module.chat.TellrawJson
var MythicMobs = Packages.io.lumine.xikage.mythicmobs.MythicMobs
var BukkitScheduler = Bukkit.getScheduler()
var BukkitServer = Bukkit.getServer()
var PluginManager = Bukkit.getPluginManager()
var PouvoirPlugin = PluginManager.getPlugin("Pouvoir")
var itemManager = MythicMobs.inst().getItemManager()
var sections = {}

// 数据预载
//@Awake(enable)
//@Awake(reload)
function NeigeItems() {
    NeigeItemsConfig()
    GlobalSectionsGet()
    ItemsGet()
    MMItemLoad()
    CommandRegister()
}

function CommandRegister() {
    let NeigeItemManagerCommand = NIConfig["NeigeItemManagerCommand"]
    let MMItemsPath = NIConfig["MMItemsPath"]
    let invalidPlayer = NIConfig["invalidPlayer"]
    let successInfo = NIConfig["successInfo"]
    let givenInfo = NIConfig["givenInfo"]
    let dropSuccessInfo = NIConfig["dropSuccessInfo"]
    let unknownItem = NIConfig["unknownItem"]
    let existedKey = NIConfig["existedKey"]
    let invalidPaser = NIConfig["invalidPaser"]
    let successSaveInfo = NIConfig["successSaveInfo"]
    let mMImportSuccessInfo = NIConfig["mMImportSuccessInfo"]
    let airItem = NIConfig["airItem"]
    let invalidAmount = NIConfig["invalidAmount"]
    let invalidWorld = NIConfig["invalidWorld"]
    let invalidLocation = NIConfig["invalidLocation"]
    let insufficientPermissions = NIConfig["insufficientPermissions"]
    let reloadedMessage = NIConfig["reloadedMessage"]
    let helpMessages = NIConfig["helpMessages"]
    let listPrefix = NIConfig["listPrefix"]
    let listSuffix = NIConfig["listSuffix"]
    let listItemAmount = NIConfig["listItemAmount"]
    let listItemFormat = NIConfig["listItemFormat"]
    let listPrev = NIConfig["listPrev"]
    let listNext = NIConfig["listNext"]
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
                        var AsyncTask = Java.extend(BukkitRunnable, {
                            run: () => {
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
                                        listItemMessage = listItemMessage.replace(/{ID}/g, itemIDList[index])
                                        listItemMessage = listItemMessage.split("{name}")
                                        // 构建信息及物品
                                        let listItemRaw = new TellrawJson()
                                        let itemStack = ItemGet(ItemKeySectionGet(itemIDList[index]), sender, sender)
                                        for (let i = 0; i < listItemMessage.length; i++) {
                                            listItemRaw.append(listItemMessage[i])
                                            if (i+1 != listItemMessage.length) listItemRaw.append(itemToTellrawJson(itemStack).runCommand("/ni get " + itemIDList[index]))
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
                                    return
                                }
                            }
                        })
                        new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                        return true
                    // nim get [物品ID] (数量) (是否反复随机) (指向数据) > 根据ID获取NIM物品
                    case "get":
                        var AsyncTask = Java.extend(BukkitRunnable, {
                            run: () => {
                                // 如果指令发送者不是玩家
                                if (sender instanceof Player) {
                                    // 检测指令长度
                                    if (args.length > 1) {
                                        let itemConfig = ItemKeySectionGet(args[1])
                                        // 检测是否存在对应ID的NIM物品
                                        if (itemConfig) {
                                            let data = null
                                            if (args.length > 4) data = Java.from(args).slice(4).join(" ")
                                            let itemAmt
                                            // 获取数量
                                            if (args.length == 2 || ((itemAmt = parseInt(args[2])) && itemAmt > 0)) {
                                                itemAmt = itemAmt || 1
                                                // 如果仅需一样的物品
                                                if (!(args.length > 3 && (args[3] == "false" || args[3] == "0"))) {
                                                    let itemStack = ItemGet(itemConfig, sender, sender, data)
                                                    // 替换提示信息中的占位符
                                                    let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                    givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                    // 给予物品
                                                    NeigeGive(sender, itemStack, itemAmt, givenInfoMessage)
                                                // 如果需要反复构建
                                                } else {
                                                    // {物品名: 产出次数}
                                                    let amtMap = new HashMap()
                                                    // 循环构建物品
                                                    for (let index = 0; index < itemAmt; index++) {
                                                        // 构建物品
                                                        let itemStack = ItemGet(itemConfig, sender, sender, data)
                                                        // 记录物品名及次数
                                                        var itemName = getItemName(itemStack)
                                                        if (amtMap[itemName] == null) {
                                                            amtMap[itemName] = 1
                                                        } else {
                                                            amtMap[itemName] ++
                                                        }
                                                        // 给予物品
                                                        ItemGiverAsyn(sender, itemStack)
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
                            }
                        })
                        new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                        return true
                    // nim give [玩家ID] [物品ID] (数量) (是否反复随机) (指向数据) > 根据ID给予NIM物品
                    case "give":
                        var AsyncTask = Java.extend(BukkitRunnable, {
                            run: () => {
                                // 检测指令长度
                                if (args.length > 2) {
                                    let player
                                    // 获取对应在线玩家
                                    if (player = Bukkit.getPlayer(args[1])) {
                                        let itemConfig = ItemKeySectionGet(args[2])
                                        // 检测是否存在对应ID的NIM物品
                                        if (itemConfig) {
                                            let data = null
                                            if (args.length > 5) data = Java.from(args).slice(5).join(" ")
                                            let itemAmt
                                            // 获取数量
                                            if (args.length == 3 || ((itemAmt = parseInt(args[3])) && itemAmt > 0)) {
                                                itemAmt = itemAmt || 1
                                                // 如果仅需一样的物品
                                                if (!(args.length > 4 && (args[4] == "false" || args[4] == "0"))) {
                                                    let itemStack = ItemGet(itemConfig, player, sender, data)
                                                    // 替换提示信息中的占位符
                                                    let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                    givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                    // 给予物品
                                                    NeigeGive(player, itemStack, itemAmt, givenInfoMessage)
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
                                                        let itemStack = ItemGet(itemConfig, player, sender, data)
                                                        // 记录物品名及次数
                                                        var itemName = getItemName(itemStack)
                                                        if (amtMap[itemName] == null) {
                                                            amtMap[itemName] = 1
                                                        } else {
                                                            amtMap[itemName] ++
                                                        }
                                                        // 给予物品
                                                        ItemGiverAsyn(player, itemStack)
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
                            }
                        })
                        new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                        return true
                    // nim giveAll [物品ID] (数量) (是否反复随机) (指向数据) > 根据ID给予所有人NIM物品
                    case "giveall":
                        var AsyncTask = Java.extend(BukkitRunnable, {
                            run: () => {
                                // 检测指令长度
                                if (args.length > 1) {
                                    let itemConfig = ItemKeySectionGet(args[1])
                                    // 检测是否存在对应ID的NIM物品
                                    if (itemConfig) {
                                        let data = null
                                        if (args.length > 4) data = Java.from(args).slice(4).join(" ")
                                        let itemAmt
                                        // 获取数量
                                        if (args.length == 2 || ((itemAmt = parseInt(args[2])) && itemAmt > 0)) {
                                            itemAmt = itemAmt || 1
                                            // 如果仅需一样的物品
                                            if (!(args.length > 3 && (args[3] == "false" || args[3] == "0"))) {
                                                // 对于每个在线玩家
                                                Bukkit.getOnlinePlayers().forEach((player) => {
                                                    let itemStack = ItemGet(itemConfig, player, sender, data)
                                                    // 替换提示信息中的占位符
                                                    let givenInfoMessage = givenInfo.replace(/{amount}/g, itemAmt)
                                                    givenInfoMessage = givenInfoMessage.replace(/{name}/g, getItemName(itemStack))
                                                    // 给予物品
                                                    NeigeGive(player, itemStack, itemAmt, givenInfoMessage)
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
                                                        itemStack = ItemGet(itemConfig, player, sender, data)
                                                        // 记录物品名及次数
                                                        var itemName = getItemName(itemStack)
                                                        if (amtMap[itemName] == null) {
                                                            amtMap[itemName] = 1
                                                        } else {
                                                            amtMap[itemName] ++
                                                        }
                                                        // 给予物品
                                                        ItemGiverAsyn(player, itemStack)
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
                            }
                        })
                        new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                        return true
                    // nim drop [物品ID] [数量] [世界名] [X坐标] [Y坐标] [Z坐标] (是否反复随机) (物品解析对象) (指向数据) > 于指定位置掉落NIM物品
                    case "drop":
                        var AsyncTask = Java.extend(BukkitRunnable, {
                            run: () => {
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
                                        let itemConfig = ItemKeySectionGet(args[1])
                                        // 检测是否存在对应ID的NIM物品
                                        if (itemConfig) {
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
                                                        if (!(args.length > 7 && (args[7] == "false" || args[7] == "0"))) {
                                                            let itemStack = ItemGet(itemConfig, player, sender, data)
                                                            // 掉落物品
                                                            NeigeDrop(world, x, y, z, itemStack, itemAmt)
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
                                                                let itemStack = ItemGet(itemConfig, player, sender, data)
                                                                // 记录物品名及次数
                                                                var itemName = getItemName(itemStack)
                                                                if (amtMap[itemName] == null) {
                                                                    amtMap[itemName] = 1
                                                                } else {
                                                                    amtMap[itemName] ++
                                                                }
                                                                // 掉落物品
                                                                NeigeDrop(world, x, y, z, itemStack, itemAmt)
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
                            }
                        })
                        new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                        return true
                    // nim save [物品ID] (保存路径) > 将手中物品以对应ID保存至对应路径
                    case "save":
                        var AsyncTask = Java.extend(BukkitRunnable, {
                            run: () => {
                                // 检测指令长度
                                if (args.length > 1) {
                                    // 获取手中物品
                                    let itemStack = sender.getInventory().getItemInMainHand()
                                    // 获取保存路径
                                    let path = args[2] || args[1] + ".yml"
                                    let saveResult
                                    // 保存物品
                                    if (saveResult = ItemSave(itemStack, args[1], args[2], false)) {
                                        // 重载物品列表
                                        ItemsGet()
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
                            }
                        })
                        new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                        return true
                    // nim cover [物品ID] (保存路径) > 将手中物品以对应ID覆盖至对应路径
                    case "cover":
                        var AsyncTask = Java.extend(BukkitRunnable, {
                            run: () => {
                                // 检测指令长度
                                if (args.length > 1) {
                                    // 获取手中物品
                                    let itemStack = sender.getInventory().getItemInMainHand()
                                    // 获取保存路径
                                    let path = args[2] || args[1] + ".yml"
                                    // 保存物品
                                    let saveResult = ItemSave(itemStack, args[1], args[2], true)
                                    if (saveResult != 2) {
                                        // 重载物品列表
                                        ItemsGet()
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
                            }
                        })
                        new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                        return true
                    case "mm":
                        // 检测指令长度
                        if (args.length > 1) {
                            switch(args[1].toLowerCase()) {
                                // nim mm load [物品ID] (保存路径) > 将对应ID的MM物品保存为NIM物品
                                case "load":
                                    var AsyncTask = Java.extend(BukkitRunnable, {
                                        run: () => {
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
                                                    if (saveResult = ItemSave(itemStack, args[2], path, false)) {
                                                        // 重载物品列表
                                                        ItemsGet()
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
                                        }
                                    })
                                    new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                                    break
                                // nim mm cover [物品ID] (保存路径) > 将对应ID的MM物品覆盖为NIM物品
                                case "cover":
                                    var AsyncTask = Java.extend(BukkitRunnable, {
                                        run: () => {
                                            // 检测指令长度
                                            if (args.length > 2) {
                                                // 获取MM物品
                                                let mmItem = itemManager.getItem(args[2])
                                                if (mmItem.isPresent()){
                                                    let itemStack = BukkitAdapter.adapt(mmItem.get().generateItemStack(1))
                                                    // 获取保存路径
                                                    let path = args[3] || MMItemsPath
                                                    let saveResult = ItemSave(itemStack, args[2], path, true)
                                                    // 保存物品
                                                    if (saveResult != 2) {
                                                        // 重载物品列表
                                                        ItemsGet()
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
                                        }
                                    })
                                    new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                                    break
                                // nim mm loadAll > 将全部MM物品转化为NIM物品
                                case "loadall":
                                    var AsyncTask = Java.extend(BukkitRunnable, {
                                        run: () => {
                                            // 获取保存路径
                                            let path = args[2] || MMItemsPath
                                            // 获取全部MM物品并操作
                                            itemManager.getItems().stream().forEach((item) => {
                                                let saveResult
                                                // 保存物品
                                                if (!(saveResult = ItemSave(BukkitAdapter.adapt(item.generateItemStack(1)), item.getInternalName(), path, false))) {
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
                                            ItemsGet()
                                            // 替换提示信息中的占位符
                                            let mMImportSuccessInfoMessage = mMImportSuccessInfo.replace(/{path}/g, path)
                                            // 保存成功提示
                                            sender.sendMessage(mMImportSuccessInfoMessage)
                                        }
                                    })
                                    new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                                    break
                                // nim mm get [物品ID] (数量) > 根据ID获取MM物品
                                case "get":
                                    var AsyncTask = Java.extend(BukkitRunnable, {
                                        run: () => {
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
                                                            NeigeGive(sender, itemStack, itemAmt, givenInfoMessage)
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
                                        }
                                    })
                                    new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                                    break
                                // nim mm give [玩家ID] [物品ID] (数量) > 根据ID给予MM物品
                                case "give":
                                    var AsyncTask = Java.extend(BukkitRunnable, {
                                        run: () => {
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
                                                            NeigeGive(player, itemStack, itemAmt, givenInfoMessage)
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
                                        }
                                    })
                                    new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
                                    break
                                // nim mm giveAll [物品ID] (数量) > 根据ID给予所有人MM物品
                                case "giveall":
                                    var AsyncTask = Java.extend(BukkitRunnable, {
                                        run: () => {
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
                                                            NeigeGive(player, itemStack, itemAmt, givenInfoMessage)
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
                                        }
                                    })
                                    new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
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
                    // nim reload > 重新加载NIM物品
                    case "reload":
                        var AsyncTask = Java.extend(BukkitRunnable, {
                            run: () => {
                                // 重载配置文件
                                NeigeItemsConfig()
                                // 重载全局节点列表
                                GlobalSectionsGet()
                                // 重载NIM物品列表
                                ItemsGet()
                                // 重载MM物品列表
                                MMItemLoad()
                                // 重载成功提示
                                sender.sendMessage(reloadedMessage)
                            }
                        })
                        new AsyncTask().runTaskAsynchronously(PouvoirPlugin)
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
                            return itemIDList
                        case "give":
                            return onlinePlayers()
                        case "giveall":
                            return itemIDList
                        case "drop":
                            return itemIDList
                        case "mm":
                            return Arrays.asList(["load", "cover", "loadAll", "get", "give"])
                        default:
                            return emptyList
                    }
                case 3:
                    switch(args[0].toLowerCase()) {
                        case "give":
                            return itemIDList
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
                            return WorldsGet()
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
 * 将物品以对应ID保存至对应路径
 * @param itemStack ItemStack 物品
 * @param itemKey String 物品ID
 * @param path String 保存路径
 * @param cover Boolean 是否覆盖
 * @return Boolean 是否保存成功
 */
function ItemSave(itemStack, itemKey, path = itemKey + ".yml", cover) {
    let NMSKt = Packages.com.skillw.pouvoir.taboolib.module.nms.NMSKt
    // 检测是否为空气
    if (itemStack != null && itemStack.getType() != Material.AIR) {
        // 获取路径文件
        let dir = getDir(scriptName + "/Items")
        file = getFile(dir, path)
        let config = YamlConfiguration.loadConfiguration(file)
        // 检测节点是否存在
        if ((itemIDList.indexOf(itemKey) == -1) || cover) {
            // 创建物品节点
            config.createSection(itemKey)
            let itemKeySection = config.getConfigurationSection(itemKey)
            // 设置物品材质
            itemKeySection.set("Material", itemStack.getType().toString())
            // 如果物品有ItemMeta
            if (itemStack.hasItemMeta()) {
                // 获取ItemMeta
                let itemMeta = itemStack.getItemMeta()
                // 获取物品NBT
                let itemNBT = getHashMapNBT(NMSKt.getItemTag(itemStack))
                // 获取显示信息
                let display = itemNBT["display"]
                itemNBT.remove("display")
                // 设置CustomModelData
                if (itemNBT.containsKey("CustomModelData")) {
                    itemKeySection.set("CustomModelData", parseInt(itemNBT["CustomModelData"].slice(6)))
                    itemNBT.remove("CustomModelData")
                }
                // 设置子ID/损伤值
                if (itemNBT.containsKey("Damage")) {
                    itemKeySection.set("Data", parseInt(itemNBT["Damage"].slice(6)))
                    itemNBT.remove("Damage")
                }
                // 设置物品名
                if (itemMeta.hasDisplayName()) {
                    itemKeySection.set("Name", itemMeta.getDisplayName())
                }
                // 设置Lore
                if (itemMeta.hasLore()) {
                    itemKeySection.set("Lore", itemMeta.getLore())
                }
                // 设置是否无法破坏
                if (itemMeta.isUnbreakable()) {
                    itemKeySection.set("Unbreakable", itemMeta.isUnbreakable())
                }
                // 设置物品附魔
                if (itemMeta.hasEnchants()) {
                    itemKeySection.createSection("Enchantments")
                    let enchantSection = itemKeySection.getConfigurationSection("Enchantments")
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
                    itemKeySection.set("HideFlags", flags)
                }
                // 设置物品颜色
                if (display && display.containsKey("color")) {
                    itemKeySection.set("Color", display["color"])
                }
                // 设置物品NBT
                if (!itemNBT.isEmpty()) {
                    itemKeySection.set("NBT", itemNBT)
                }
            }
            config.save(file)
            if (itemIDList.indexOf(itemKey) == -1) return 1
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
function ItemKeySectionGet(itemID) {
    let itemConfig = null
    items.some((itemIDs) => {
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
 * @param itemKeySection MemorySection 物品配置
 * @param player Player 用于解析PAPI变量
 * @param sender 用于发送错误信息
 * @param data String 指向数据
 * @return ItemStack
 */
function ItemGet(itemKeySection, player, sender, data) {
    let NMSKt = Packages.com.skillw.pouvoir.taboolib.module.nms.NMSKt
    let ChatColor = Packages.org.bukkit.ChatColor
    let invalidNBT = NIConfig["invalidNBT"]
    let invalidItem = NIConfig["invalidItem"]
    if (!(itemKeySection instanceof MemorySection)) return null
    // 获取随机数, 用于代表当前物品
    let random = Math.random()
    sections[random] = {}
    // 加载指向数据
    if (data) dataParse(data, random)
    // 对文本化配置进行全局PAPI解析
    let tempItemKeySection = new YamlConfiguration()
    tempItemKeySection.set("ID", itemKeySection)
    let stringSection = tempItemKeySection.saveToString()
    stringSection = setPapiWithNoColor(player, stringSection)
    tempItemKeySection = new YamlConfiguration()
    tempItemKeySection.loadFromString(stringSection)
    itemKeySection = tempItemKeySection.getConfigurationSection("ID")
    // 如果调用了全局节点
    if (itemKeySection.contains("GlobalSections")) {
        // 获取全局节点ID
        var gSectionIDList = itemKeySection.getStringList("GlobalSections")
        // 针对每个试图调用的全局节点
        gSectionIDList.forEach((gSectionID) => {
            // 在每个全局节点文件进行查找
            globalSections.forEach((gSectionIDs) => {
                // 如果当前文件中存在相应节点
                let index = gSectionIDs[1].indexOf(gSectionID)
                if (index != -1) {
                    itemKeySection.set("Sections." + gSectionID, getConfigSection(gSectionIDs[0])[index])
                }
            })
        })
    }
    // 获取私有节点配置
    if (itemKeySection.contains("Sections")) var Sections = itemKeySection.getConfigurationSection("Sections")
    // 如果当前物品包含预声明节点
    if (Sections != undefined) {
        // 针对每个节点
        Sections.getKeys(false).forEach((section) => {
            // 节点解析
            globalSectionParse(Sections, section, random)
        })
    }
    // 对文本化配置进行全局节点解析
    tempItemKeySection = new YamlConfiguration()
    tempItemKeySection.set("ID", itemKeySection)
    stringSection = loadSection(Sections, tempItemKeySection.saveToString(), random)
    stringSection = setPapiWithNoColor(player, stringSection)
    tempItemKeySection = new YamlConfiguration()
    tempItemKeySection.loadFromString(stringSection)
    itemKeySection = tempItemKeySection.getConfigurationSection("ID")
    // 构建物品
    let material
    if (itemKeySection.contains("Material") && itemKeySection.getString("Material") && (material = Material.matchMaterial(itemKeySection.getString("Material").toUpperCase()))) {
        let itemStack = new ItemStack(material)
        // 设置子ID/损伤值
        if (itemKeySection.contains("Data")) {
            itemStack.setDurability(itemKeySection.getInt("Data"))
        }
        // 设置物品附魔
        if (itemKeySection.contains("Enchantments")) {
            let enchantSection = itemKeySection.getConfigurationSection("Enchantments")
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
        if (itemKeySection.contains("CustomModelData")) {
            try { itemMeta.setCustomModelData(itemKeySection.getInt("CustomModelData")) } catch (e) {}
        }
        // 设置物品名
        if (itemKeySection.contains("Name")) {
            itemMeta.setDisplayName(ChatColor.translateAlternateColorCodes('&', itemKeySection.getString("Name")))
        }
        // 设置Lore
        if (itemKeySection.contains("Lore")) {
            let lores = itemKeySection.getStringList("Lore")
            lores.replaceAll(lore => ChatColor.translateAlternateColorCodes('&', lore))
            itemMeta.setLore(lores)
        }
        // 设置是否无法破坏
        if (itemKeySection.contains("Unbreakable")) {
            itemMeta.setUnbreakable(itemKeySection.getBoolean("Unbreakable"))
        }
        // 设置ItemFlags
        if (itemKeySection.contains("HideFlags")) {
            var flags = itemKeySection.getStringList("HideFlags")
            if (flags.length) {
                for (let key in flags) {
                    itemMeta.addItemFlags(ItemFlag.valueOf(flags[key]))
                }
            }
        }
        // 设置物品颜色
        if (itemKeySection.contains("Color")) {
            try { itemMeta.setColor(Color.fromRGB(itemKeySection.getInt("Color"))) } catch (e) {}
        }
        // 设置物品NBT
        if (itemKeySection.contains("NBT")) {
            itemStack.setItemMeta(itemMeta)
            // 获取物品NBT
            let itemTag = NMSKt.getItemTag(itemStack)
            // 获取配置NBT
            var itemNBT = getItemTagNBT(toHashMap(itemKeySection.get("NBT")))
            for (let key in itemNBT) {
                itemTag[key] = itemNBT[key]
            }
            try {
                itemTag.saveTo(itemStack)
            } catch (e) {
                let invalidItemMessage = invalidItem.replace(/{itemID}/, itemKeySection.getName())
                if (sender) {
                    sender.sendMessage(invalidNBT)
                    sender.sendMessage(invalidItemMessage)
                } else {
                    Bukkit.getServer().getConsoleSender().sendMessage(invalidNBT)
                    Bukkit.getServer().getConsoleSender().sendMessage(invalidItemMessage)
                }
            }
        } else {
            itemStack.setItemMeta(itemMeta)
        }
        // 删除节点缓存
        delete sections[random]
        return itemStack
    } else {
        delete sections[random]
        return null
    }
}

/**
 * 加载NIM物品列表
 */
function ItemsGet() {
    let configs = getAllConfig(getAllFile(getDir(scriptName + "/Items")))
    // [[config, [id]]]
    items = []
    // [id]
    itemIDList = new ArrayList()
    configs.forEach((config) => {
        let list = new ArrayList()
        let sections = getConfigSection(config)
        sections.forEach((section) => {
            list.add(section.getName())
            itemIDList.add(section.getName())
        })
        items.push(new ArrayList(Arrays.asList([config, list])))
    })
    pageAmount = Math.ceil(itemIDList.length/NIConfig["listItemAmount"])
}

/**
 * 加载全局节点列表
 */
function GlobalSectionsGet() {
    let configs = getAllConfig(getAllFile(getDir(scriptName + "/GlobalSections")))
    // [[config, [id]]]
    globalSections = []
    // [id]
    globalSectionIDList = new ArrayList()
    configs.forEach((config) => {
        let list = new ArrayList()
        let sections = getConfigSection(config)
        sections.forEach((section) => {
            list.add(section.getName())
            globalSectionIDList.add(section.getName())
        })
        globalSections.push(new ArrayList(Arrays.asList([config, list])))
    })
}

/**
 * 加载MM物品列表
 */
function MMItemLoad(){
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

    let dir = new File(PouvoirPlugin.getDataFolder().getParent(),"/" + scriptName)
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
    let ignoreKeys = NIConfig["ignoreKeys"]
    /**
     * 获取HashMap形式物品NBT
     * @param ItemTag ItemTag 物品NBT数据
     * @return HashMap
     */
    toMutableMap = (itemTag) => {
        let map = new HashMap()
        for (let key in itemTag) {
            if (ignoreKeys.contains(key)) continue
            map[key] = NBTValueParse(itemTag[key])
        }
        return map
    }
    /**
     * NBT值解析
     * @param value ItemTagData 物品NBT值
     * @return 物品NBT值
     */
    NBTValueParse = (value) => {
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
                list.add(NBTValueParse(it))
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
        let Byte = Packages.java.lang.Byte
        let Short = Packages.java.lang.Short
        let Integer = Packages.java.lang.Integer
        let Long = Packages.java.lang.Long
        let Float = Packages.java.lang.Float
        let Double = Packages.java.lang.Double
        let String = Packages.java.lang.String
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
 */
function getSection(Sections, string, random) {
    var LinkedList = Packages.java.util.LinkedList
    string = string + ""

    let stack = new LinkedList()
    let start = new ArrayList()
    let end = new ArrayList()
    for (let index = 0; index < string.length; index++) {
        // 如果是左括号
        if (string.charAt(index) == "<") {
            // 压栈
            stack.push(index)
        // 如果是右括号
        } else if (string.charAt(index) == ">") {
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
        listString.push(getSection(Sections, string.slice(start[index]+1, end[index]), random))

        if (index+1 != start.length) {
            listString.push(string.slice(end[index]+1, start[index+1]))
        } else {
            listString.push(string.slice(end[index]+1))
        }
    }
    // 针对目标文本
    for (let index = 1; index < listString.length; index+=2) {
        // 键值解析
        listString[index] = parseSection(Sections, listString[index], random)
    }
    return listString.join("")
}

/**
 * 解析当前层级节点
 * @param Sections ConfigurationSection 物品配置
 * @param string String 待解析文本
 * @param random number 随机数
 */
function parseSection(Sections, string, random) {
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
    if (sections[random][name] != undefined) {
        // 直接返回对应节点值
        return sections[random][name]
    // 如果尚未解析对应ID节点
    } else {
        // 尝试解析并返回对应节点值
        if (globalSectionParse(Sections, name, random)) return sections[random][name]
    }
    switch (type) {
        case "strings":
            if (args.length > 1) {
                var result = getSection(Sections, args[parseInt(Math.random()*(args.length))], random)
            } else {
                var result = getSection(Sections, args[0], random)
            }
            if (name) sections[random][name] = result
            return result
        case "number":
            if (args.length > 1) var result = Math.random()*(parseFloat(getSection(Sections, args[1], random))-parseFloat(getSection(Sections, args[0], random)))+parseFloat(getSection(Sections, args[0], random))
            if (args.length > 2) {
                result = result.toFixed(parseInt(getSection(Sections, args[2], random)))
            } else {
                result = result.toFixed(0)
            }
            if (!isNaN(result)) {
                // 已指定ID
                if (name) sections[random][name] = result
                return result
            }
            return "未知数字节点参数"
        case "calculation":
            // 如果配置了公式
            if (args.length > 0) {
                try {
                    // 获取公式结果
                    let result = eval(getSection(Sections, args[0], random))
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
                        if (name) sections[random][name] = result
                        return result
                    }
                } catch (error) {
                    if (name) sections[random][name] = "公式节点计算错误"
                    return "公式节点计算错误"
                }
            }
            break
        case "weight":
            if (args.length = 1) {
                var result = getSection(Sections, args[0].slice(args[0].indexOf("::")+2), random)
                if (name) sections[random][name] = result
                return result
            }
            var strings = []
            args.forEach((value) => {
                let index = value.indexOf("::")
                let weight = parseInt(value.slice(0, index))
                let string = value.slice(index+2)
                for (let index = 0; index < weight; index++) strings.push(string)
            })
            var result = getSection(Sections, strings[parseInt(Math.random()*(strings.length))], random)
            if (name) sections[random][name] = result
            return result
        case "js":
            try {
                var info = args.join("_").split("::")
                var path = info[0]
                var func = info[1]
                var global = loadWithNewGlobal("plugins/" + scriptName + "/Scripts/" + path)
                var result = getSection(Sections, global[func](sections[random]), random)
                if (name) sections[random][name] = result
                return result
            } catch (error) {
                if (name) sections[random][name] = "js函数获取失败"
                return "js函数获取失败"
            }
        default:
            // 将类型视作ID尝试解析
            var name  = type
            // 如果已解析对应ID节点
            if (sections[random][name] != undefined) {
                // 直接返回对应节点值
                return sections[random][name]
            // 如果尚未解析对应ID节点
            } else {
                // 尝试解析并返回对应节点值
                if (globalSectionParse(Sections, name, random)) return sections[random][name]
            }
            return "未知节点"
    }
}

/**
 * 迭代解析所有节点
 * @param Sections ConfigurationSection 物品配置
 * @param string String 待解析文本
 * @param random number 随机数
 */
function loadSection(Sections, string, random) {
    let result
    let length
    while (length != Object.keys(sections[random]).length) {
        length = Object.keys(sections[random]).length
        result = getSection(Sections, string, random)
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
    let onlinePlayers = new ArrayList()
    Bukkit.getOnlinePlayers().forEach((player) => {
        onlinePlayers.add(player.getDisplayName())
    })
    return onlinePlayers
}


/**
 * 加载世界列表
 */
 function WorldsGet() {
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
 */
function NeigeGive(player, itemStack, amount, message) {
    let stackSize = itemStack.getMaxStackSize()
    itemStack.setAmount(stackSize)
    for (var givenAmt = 0; (givenAmt + stackSize) <= amount; givenAmt += stackSize) { ItemGiverAsyn(player, itemStack) }
    if (givenAmt < amount) {
        itemStack.setAmount(amount - givenAmt)
        ItemGiverAsyn(player, itemStack)
    }
    if (message != "") player.sendMessage(message)
}


/**
 * 给予玩家物品, 可用于异步
 * @param player OnlinePlayer
 * @param itemStack ItemStack
 */
function ItemGiverAsyn(player, itemStack){
    let inv = player.getInventory()
    let loc = player.getLocation()
    let dropList = inv.addItem(itemStack)
    if (!dropList.isEmpty()) {
        BukkitScheduler.callSyncMethod(PouvoirPlugin, () => {
            loc.getWorld().dropItem(loc, dropList[0])
        })
    }
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
function NeigeDrop(world, x, y, z, itemStack, amount) {
    var Location = org.bukkit.Location

    let stackSize = itemStack.getMaxStackSize()
    let location = new Location(world, x, y, z)
    itemStack.setAmount(stackSize)
    for (var givenAmt = 0; (givenAmt + stackSize) <= amount; givenAmt += stackSize) { ItemDropAsyn(world, location, itemStack) }
    if (givenAmt < amount) {
        itemStack.setAmount(amount - givenAmt)
        ItemDropAsyn(world, location, itemStack)
    }
}

/**
 * 给予玩家物品, 可用于异步
 * @param world World 世界
 * @param location Location 位置
 * @param itemStack ItemStack
 */
function ItemDropAsyn(world, location, itemStack){
    BukkitScheduler.callSyncMethod(PouvoirPlugin, () => {
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
    var config = YamlConfiguration.loadConfiguration(file)
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
    if (typeof string == 'string') {
        try { let obj=JSON.parse(string)
            if (typeof obj == 'object' && obj ){
                for (let key in obj) {
                    sections[random][key] = obj[key]
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
 * @return Boolean 是否包含相应节点
 */
function globalSectionParse(Sections, section, random) {
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
                    sections[random][section] = getSection(Sections, strings[parseInt(Math.random()*(strings.length))], random)
                }
                break
            case "number":
                // 如果配置了数字范围
                if (currentSection.contains("min") && currentSection.contains("max")) {
                    // 获取大小范围
                    let min = parseFloat(getSection(Sections, currentSection.getString("min"), random))
                    let max = parseFloat(getSection(Sections, currentSection.getString("max"), random))
                    // 获取取整位数
                    let fixed
                    if (currentSection.contains("fixed")) {
                        fixed = parseInt(getSection(Sections, currentSection.getString("fixed"), random))
                    }
                    if (isNaN(fixed)) fixed = 0
                    // 加载随机数
                    sections[random][section] = ((Math.random()*(max-min))+min).toFixed(fixed)
                }
                break
            case "calculation":
                if (currentSection.contains("formula")) {
                    try {
                        // 获取公式结果
                        let result = eval(getSection(Sections, currentSection.getString("formula"), random))
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
                        sections[random][section] = result.toFixed(fixed)
                    } catch (error) {
                        sections[random][section] = "公式节点计算错误"
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
                    sections[random][section] = getSection(Sections, strings[parseInt(Math.random()*(strings.length))], random)
                }
                break
            case "js":
                try {
                    if (currentSection.contains("path")) {
                        var info = currentSection.getString("path").split("::")
                        var path = info[0]
                        var func = info[1]
                        var global = loadWithNewGlobal("plugins/" + scriptName + "/Scripts/" + path)
                        sections[random][section] = getSection(Sections, global[func](sections[random]), random)
                    }
                } catch (error) {
                    sections[random][section] = "公式节点计算错误"
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
    let StringBuilder = Packages.java.lang.StringBuilder
    let builder = new StringBuilder(text.length)

    let identifier = new StringBuilder()
    let parameters = new StringBuilder()

    for (let i = 0; i < text.length; i++) {
        let l = text[i]
        if (l != "%" || i + 1 >= text.length) {
          builder.append(l)
          continue
        }
        let identified = false
        let oopsitsbad = true
        let hadSpace = false
        while (++i < text.length) {
            let p = text[i]
            if (p == ' ' && !identified) {
                hadSpace = true
                break
            }
            if (p == "%") {
                oopsitsbad = false
                break
            }
            if (p == '_' && !identified) {
                identified = true
                continue
            }
            if (identified) {
                parameters.append(p)
            } else {
                identifier.append(p)
            }
        }
        let identifierString = identifier.toString()
        let lowercaseIdentifierString = identifierString.toLowerCase()
        let parametersString = parameters.toString()
        identifier.setLength(0)
        parameters.setLength(0)
        if (oopsitsbad) {
            builder.append("%").append(identifierString)
            if (identified) builder.append('_').append(parametersString)
            if (hadSpace) builder.append(' ')
            continue
        }
        let placeholder = Tool.getPlugin("PlaceholderAPI").getLocalExpansionManager().getExpansion(lowercaseIdentifierString)
        if (placeholder == null) {
            builder.append("%").append(lowercaseIdentifierString)
            if (identified) builder.append('_')
            builder.append(parametersString).append("%")
            continue
        }
        let replacement = placeholder.onRequest(player, parametersString)
        if (replacement == null) {
            builder.append("%").append(lowercaseIdentifierString)
            if (identified) builder.append('_')
            builder.append(parametersString).append("%")
            continue
        }
        builder.append(replacement)
    }
    return builder.toString()
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
