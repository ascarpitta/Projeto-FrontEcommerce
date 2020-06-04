//CdnPath=http://ajax.aspnetcdn.com/ajax/4.5.1/1/Menu.js
var __rootMenuItem;
var __menuInterval;
var __scrollPanel;
var __disappearAfter = 500;
function MenuClearInterval() {
    if (__menuInterval) {
        window.clearInterval(__menuInterval);
    }
}
function MenuCollapse(item) {
    MenuSetRoot(item);
    if (__rootMenuItem) {
        MenuClearInterval();
        if (__disappearAfter >= 0) {
            __menuInterval = window.setInterval("MenuHideItems()", __disappearAfter);
        }
    }
}
function MenuExpand(item, horizontalOffset, verticalOffset, hideScrollers) {
    MenuClearInterval();
    var tr = item.parentNode.parentNode.parentNode.parentNode.parentNode;
    var horizontal = true;
    if (!tr.id) {
        horizontal = false;
        tr = tr.parentNode;
    }
    var child = MenuFindSubMenu(item);
    if (child) {
        var data = MenuGetData(item);
        if (!data) {
            return null;
        }
        child.rel = tr.id;
        child.x = horizontalOffset;
        child.y = verticalOffset;
        if (horizontal) {
            child.pos = "bottom";
        }
        PopOutShow(child.id, hideScrollers, data);
    }
    MenuSetRoot(item);
    if (child) {
        if (!document.body.__oldOnClick && document.body.onclick) {
            document.body.__oldOnClick = document.body.onclick;
        }
        if (__rootMenuItem) {
            document.body.onclick = MenuHideItems;
        }
    }
    MenuResetSiblings(tr);
    return child;
}
function MenuFindMenu(item) {
    if (item && item.menu) {
        return item.menu;
    }
    var tr = item.parentNode.parentNode.parentNode.parentNode.parentNode;
    if (!tr.id) {
        tr = tr.parentNode;
    }
    for (var i = tr.id.length - 1; i >= 0; i--) {
        if (tr.id.charAt(i) < '0' || tr.id.charAt(i) > '9') {
            var menu = WebFormGetElementById(tr.id.substr(0, i));
            if (menu) {
                item.menu = menu;
                return menu;
            }
        }
    }
    return null;
}
function MenuFindNext(item) {
    var a = WebFormGetElementByTagName(item, "A");
    var parent = MenuFindParentContainer(item);
    var first = null;
    if (parent) {
        var links = WebFormGetElementsByTagName(parent, "A");
        var match = false;
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (MenuIsSelectable(link)) {
                if (MenuFindParentContainer(link) == parent) {
                    if (match) {
                        return link;
                    }
                    else if (!first) {
                        first = link;
                    }
                }
                if (!match && link == a) {
                    match = true;
                }
            }
        }
    }
    return first;
}
function MenuFindParentContainer(item) {
    if (item.menu_ParentContainerCache) {
        return item.menu_ParentContainerCache;
    }
    var a = (item.tagName.toLowerCase() == "a") ? item : WebFormGetElementByTagName(item, "A");
    var menu = MenuFindMenu(a);
    if (menu) {
        var parent = item;
        while (parent && parent.tagName &&
            parent.id != menu.id &&
            parent.tagName.toLowerCase() != "div") {
            parent = parent.parentNode;
        }
        item.menu_ParentContainerCache = parent;
        return parent;
    }
}
function MenuFindParentItem(item) {
    var parentContainer = MenuFindParentContainer(item);
    var parentContainerID = parentContainer.id;
    var len = parentContainerID.length;
    if (parentContainerID && parentContainerID.substr(len - 5) == "Items") {
        var parentItemID = parentContainerID.substr(0, len - 5);
        return WebFormGetElementById(parentItemID);
    }
    return null;
}
function MenuFindPrevious(item) {
    var a = WebFormGetElementByTagName(item, "A");
    var parent = MenuFindParentContainer(item);
    var last = null;
    if (parent) {
        var links = WebFormGetElementsByTagName(parent, "A");
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            if (MenuIsSelectable(link)) {
                if (link == a && last) {
                    return last;
                }
                if (MenuFindParentContainer(link) == parent) {
                    last = link;
                }
            }
        }
    }
    return last;
}
function MenuFindSubMenu(item) {
    var tr = item.parentNode.parentNode.parentNode.parentNode.parentNode;
    if (!tr.id) {
        tr=tr.parentNode;
    }
    return WebFormGetElementById(tr.id + "Items");
}
function MenuFocus(item) {
    if (item && item.focus) {
        var pos = WebFormGetElementPosition(item);
        var parentContainer = MenuFindParentContainer(item);
        if (!parentContainer.offset) {
            parentContainer.offset = 0;
        }
        var posParent = WebFormGetElementPosition(parentContainer);
        var delta;
        if (pos.y + pos.height > posParent.y + parentContainer.offset + parentContainer.clippedHeight) {
            delta = pos.y + pos.height - posParent.y - parentContainer.offset - parentContainer.clippedHeight;
            PopOutScroll(parentContainer, delta);
        }
        else if (pos.y < posParent.y + parentContainer.offset) {
            delta = posParent.y + parentContainer.offset - pos.y;
            PopOutScroll(parentContainer, -delta);
        }
        PopOutHideScrollers(parentContainer);
        item.focus();
    }
}
function MenuGetData(item) {
    if (!item.data) {
        var a = (item.tagName.toLowerCase() == "a" ? item : WebFormGetElementByTagName(item, "a"));
        var menu = MenuFindMenu(a);
        try {
            item.data = eval(menu.id + "_Data");
        }
        catch(e) {}
    }
    return item.data;
}
function MenuHideItems(items) {
    if (document.body.__oldOnClick) {
        document.body.onclick = document.body.__oldOnClick;
        document.body.__oldOnClick = null;
    }
    MenuClearInterval();
    if (!items || ((typeof(items.tagName) == "undefined") && (items instanceof Event))) {
        items = __rootMenuItem;
    }
    var table = items;
    if ((typeof(table) == "undefined") || (table == null) || !table.tagName || (table.tagName.toLowerCase() != "table")) {
        table = WebFormGetElementByTagName(table, "TABLE");
    }
    if ((typeof(table) == "undefined") || (table == null) || !table.tagName || (table.tagName.toLowerCase() != "table")) {
        return;
    }
    var rows = table.rows ? table.rows : table.firstChild.rows;
    var isVertical = false;
    for (var r = 0; r < rows.length; r++) {
        if (rows[r].id) {
            isVertical = true;
            break;
        }
    }
    var i, child, nextLevel;
    if (isVertical) {
        for(i = 0; i < rows.length; i++) {
            if (rows[i].id) {
                child = WebFormGetElementById(rows[i].id + "Items");
                if (child) {
                    MenuHideItems(child);
                }
            }
            else if (rows[i].cells[0]) {
                nextLevel = WebFormGetElementByTagName(rows[i].cells[0], "TABLE");
                if (nextLevel) {
                    MenuHideItems(nextLevel);
                }
            }
        }
    }
    else if (rows[0]) {
        for(i = 0; i < rows[0].cells.length; i++) {
            if (rows[0].cells[i].id) {
                child = WebFormGetElementById(rows[0].cells[i].id + "Items");
                if (child) {
                    MenuHideItems(child);
                }
            }
            else {
                nextLevel = WebFormGetElementByTagName(rows[0].cells[i], "TABLE");
                if (nextLevel) {
                    MenuHideItems(rows[0].cells[i].firstChild);
                }
            }
        }
    }
    if (items && items.id) {
        PopOutHide(items.id);
    }
}
function MenuHoverDisabled(item) {
    var node = (item.tagName.toLowerCase() == "td") ?
        item:
        item.cells[0];
    var data = MenuGetData(item);
    if (!data) return;
    node = WebFormGetElementByTagName(node, "table").rows[0].cells[0].childNodes[0];
    if (data.disappearAfter >= 200) {
        __disappearAfter = data.disappearAfter;
    }
    MenuExpand(node, data.horizontalOffset, data.verticalOffset); 
}
function MenuHoverDynamic(item) {
    var node = (item.tagName.toLowerCase() == "td") ?
        item:
        item.cells[0];
    var data = MenuGetData(item);
    if (!data) {
        return;
    }
    var nodeTable = WebFormGetElementByTagName(node, "table");
    if (data.hoverClass) {
        nodeTable.hoverClass = data.hoverClass;
        WebFormAppendToClassName(nodeTable, data.hoverClass);
    }
    node = nodeTable.rows[0].cells[0].childNodes[0];
    if (data.hoverHyperLinkClass) {
        node.hoverHyperLinkClass = data.hoverHyperLinkClass;
        WebFormAppendToClassName(node, data.hoverHyperLinkClass);
    }
    if (data.disappearAfter >= 200) {
        __disappearAfter = data.disappearAfter;
    }
    MenuExpand(node, data.horizontalOffset, data.verticalOffset); 
}
function MenuHoverRoot(item) {
    var node = (item.tagName.toLowerCase() == "td") ?
        item:
        item.cells[0];
    var data = MenuGetData(item);
    if (!data) {
        return null;
    }
    var nodeTable = WebFormGetElementByTagName(node, "table");
    if (data.staticHoverClass) {
        nodeTable.hoverClass = data.staticHoverClass;
        WebFormAppendToClassName(nodeTable, data.staticHoverClass);
    }
    node = nodeTable.rows[0].cells[0].childNodes[0];
    if (data.staticHoverHyperLinkClass) {
        node.hoverHyperLinkClass = data.staticHoverHyperLinkClass;
        WebFormAppendToClassName(node, data.staticHoverHyperLinkClass);
    }
    return node;
}
function MenuHoverStatic(item) {
    var node = MenuHoverRoot(item);
    var data = MenuGetData(item);
    if (!data) {
        return;
    }
    __disappearAfter = data.disappearAfter;
    MenuExpand(node, data.horizontalOffset, data.verticalOffset); 
}
function MenuIsHorizontal(item) {
    if (item) {
        var a = ((item.tagName && (item.tagName.toLowerCase == "a")) ? item : WebFormGetElementByTagName(item, "A"));
        if (!a) {
            return false;
        }
        var td = a.parentNode.parentNode.parentNode.parentNode.parentNode;
        if (td.id) {
            return true;
        }
    }
    return false;
}
function MenuIsSelectable(link) {
    return (link && link.href)
}
function MenuKey(item) {
    var event;
    if (item.currentTarget) {
        event = item;
        item = event.currentTarget;
    }
    else {
        event = window.event;        
    }
    var key = (event ? event.keyCode : -1);
    var data = MenuGetData(item);
    if (!data) {
        return;
    }
    var horizontal = MenuIsHorizontal(item);
    var a = WebFormGetElementByTagName(item, "A");
    var nextItem, parentItem, previousItem;
    if ((!horizontal && key == 38) || (horizontal && key == 37)) {
        previousItem = MenuFindPrevious(item);
        while (previousItem && previousItem.disabled) {
            previousItem = MenuFindPrevious(previousItem);
        }
        if (previousItem) {
            MenuFocus(previousItem);
            MenuExpand(previousItem, data.horizontalOffset, data.verticalOffset, true);
            event.cancelBubble = true;
            if (event.stopPropagation) event.stopPropagation();
            return;
        }
    }
    if ((!horizontal && key == 40) || (horizontal && key == 39)) {
        if (horizontal) {
            var subMenu = MenuFindSubMenu(a);
            if (subMenu && subMenu.style && subMenu.style.visibility && 
                subMenu.style.visibility.toLowerCase() == "hidden") {
                MenuExpand(a, data.horizontalOffset, data.verticalOffset, true);
                event.cancelBubble = true;
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                return;
            }
        }
        nextItem = MenuFindNext(item);
        while (nextItem && nextItem.disabled) {
            nextItem = MenuFindNext(nextItem);
        }
        if (nextItem) {
            MenuFocus(nextItem);
            MenuExpand(nextItem, data.horizontalOffset, data.verticalOffset, true);
            event.cancelBubble = true;
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            return;
        }
    }
    if ((!horizontal && key == 39) || (horizontal && key == 40)) {
        var children = MenuExpand(a, data.horizontalOffset, data.verticalOffset, true);
        if (children) {
            var firstChild;
            children = WebFormGetElementsByTagName(children, "A");
            for (var i = 0; i < children.length; i++) {
                if (!children[i].disabled && MenuIsSelectable(children[i])) {
                    firstChild = children[i];
                    break;
                }
            }
            if (firstChild) {
                MenuFocus(firstChild);
                MenuExpand(firstChild, data.horizontalOffset, data.verticalOffset, true);
                event.cancelBubble = true;
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
                return;
            }
        }
        else {
            parentItem = MenuFindParentItem(item);
            while (parentItem && !MenuIsHorizontal(parentItem)) {
                parentItem = MenuFindParentItem(parentItem);
            }
            if (parentItem) {
                nextItem = MenuFindNext(parentItem);
                while (nextItem && nextItem.disabled) {
                    nextItem = MenuFindNext(nextItem);
                }
                if (nextItem) {
                    MenuFocus(nextItem);
                    MenuExpand(nextItem, data.horizontalOffset, data.verticalOffset, true);
                    event.cancelBubble = true;
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    return;
                }
            }
        }
    }
    if ((!horizontal && key == 37) || (horizontal && key == 38)) {
        parentItem = MenuFindParentItem(item);
        if (parentItem) {
            if (MenuIsHorizontal(parentItem)) {
                previousItem = MenuFindPrevious(parentItem);
                while (previousItem && previousItem.disabled) {
                    previousItem = MenuFindPrevious(previousItem);
                }
                if (previousItem) {
                    MenuFocus(previousItem);
                    MenuExpand(previousItem, data.horizontalOffset, data.verticalOffset, true);
                    event.cancelBubble = true;
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    return;
                }
            }
            var parentA = WebFormGetElementByTagName(parentItem, "A");
            if (parentA) {
                MenuFocus(parentA);
            }
            MenuResetSiblings(parentItem);
            event.cancelBubble = true;
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            return;
        }
    }
    if (key == 27) {
        MenuHideItems();
        event.cancelBubble = true;
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        return;
    }
}
function MenuResetSiblings(item) {
    var table = (item.tagName.toLowerCase() == "td") ?
        item.parentNode.parentNode.parentNode :
        item.parentNode.parentNode;
    var isVertical = false;
    for (var r = 0; r < table.rows.length; r++) {
        if (table.rows[r].id) {
            isVertical = true;
            break;
        }
    }
    var i, child, childNode;
    if (isVertical) {
        for(i = 0; i < table.rows.length; i++) {
            childNode = table.rows[i];
            if (childNode != item) {
                child = WebFormGetElementById(childNode.id + "Items");
                if (child) {
                    MenuHideItems(child);
                }
            }
        }
    }
    else {
        for(i = 0; i < table.rows[0].cells.length; i++) {
            childNode = table.rows[0].cells[i];
            if (childNode != item) {
                child = WebFormGetElementById(childNode.id + "Items");
                if (child) {
                    MenuHideItems(child);
                }
            }
        }
    }
    MenuResetTopMenus(table, table, 0, true);
}
function MenuResetTopMenus(table, doNotReset, level, up) {
    var i, child, childNode;
    if (up && table.id == "") {
        var parentTable = table.parentNode.parentNode.parentNode.parentNode;
        if (parentTable.tagName.toLowerCase() == "table") {
            MenuResetTopMenus(parentTable, doNotReset, level + 1, true);
        }
    }
    else {
        if (level == 0 && table != doNotReset) {
            if (table.rows[0].id) {
                for(i = 0; i < table.rows.length; i++) {
                    childNode = table.rows[i];
                    child = WebFormGetElementById(childNode.id + "Items");
                    if (child) {
                        MenuHideItems(child);
                    }
                }
            }
            else {
                for(i = 0; i < table.rows[0].cells.length; i++) {
                    childNode = table.rows[0].cells[i];
                    child = WebFormGetElementById(childNode.id + "Items");
                    if (child) {
                        MenuHideItems(child);
                    }
                }
            }
        }
        else if (level > 0) {
            for (i = 0; i < table.rows.length; i++) {
                for (var j = 0; j < table.rows[i].cells.length; j++) {
                    var subTable = table.rows[i].cells[j].firstChild;
                    if (subTable && subTable.tagName.toLowerCase() == "table") {
                        MenuResetTopMenus(subTable, doNotReset, level - 1, false);
                    }
                }
            }
        }
    }
}
function MenuRestoreInterval() {
    if (__menuInterval && __rootMenuItem) {
        MenuClearInterval();
        __menuInterval = window.setInterval("MenuHideItems()", __disappearAfter);
    }
}
function MenuSetRoot(item) {
    var newRoot = MenuFindMenu(item);
    if (newRoot) {
        if (__rootMenuItem && __rootMenuItem != newRoot) {
            MenuHideItems();
        }
        __rootMenuItem = newRoot;
    }
}
function MenuUnhover(item) {
    var node = (item.tagName.toLowerCase() == "td") ?
        item:
        item.cells[0];
    var nodeTable = WebFormGetElementByTagName(node, "table");
    if (nodeTable.hoverClass) {
        WebFormRemoveClassName(nodeTable, nodeTable.hoverClass);
    }
    node = nodeTable.rows[0].cells[0].childNodes[0];
    if (node.hoverHyperLinkClass) {
        WebFormRemoveClassName(node, node.hoverHyperLinkClass);
    }
    MenuCollapse(node);
}
function PopOutClip(element, y, height) {
    if (element && element.style) {
        element.style.clip = "rect(" + y + "px auto " + (y + height) + "px auto)";
        element.style.overflow = "hidden";
    }
}
function PopOutDown(scroller) {
    MenuClearInterval();
    var panel;
    if (scroller) {
        panel = scroller.parentNode
    }
    else {
        panel = __scrollPanel;
    }
    if (panel && ((panel.offset + panel.clippedHeight) < panel.physicalHeight)) {
        PopOutScroll(panel, 2)
        __scrollPanel = panel;
        PopOutShowScrollers(panel);
        PopOutStop();
        __scrollPanel.interval = window.setInterval("PopOutDown()", 8);
    }
    else {
        PopOutShowScrollers(panel);
    }
}
function PopOutHide(panelId) {
    var panel = WebFormGetElementById(panelId);
    if (panel && panel.tagName.toLowerCase() == "div") {
        panel.style.visibility = "hidden";
        panel.style.display = "none";
        panel.offset = 0;
        panel.scrollTop = 0;
        var table = WebFormGetElementByTagName(panel, "TABLE");
        if (table) {
            WebFormSetElementY(table, 0);
        }
        if (window.navigator && window.navigator.appName == "Microsoft Internet Explorer" &&
            !window.opera) {
            var childFrameId = panel.id + "_MenuIFrame";
            var childFrame = WebFormGetElementById(childFrameId);
            if (childFrame) {
                childFrame.style.display = "none";
            }
        }
    }
}
function PopOutHideScrollers(panel) {
    if (panel && panel.style) {
        var up = WebFormGetElementById(panel.id + "Up");
        var dn = WebFormGetElementById(panel.id + "Dn");
        if (up) {
            up.style.visibility = "hidden";
            up.style.display = "none";
        }
        if (dn) {
            dn.style.visibility = "hidden";
            dn.style.display = "none";
        }
    }
}
function PopOutPosition(panel, hideScrollers) {
    if (window.opera) {
        panel.parentNode.removeChild(panel);
        document.forms[0].appendChild(panel);
    }
    var rel = WebFormGetElementById(panel.rel);
    var relTable = WebFormGetElementByTagName(rel, "TABLE");
    var relCoordinates = WebFormGetElementPosition(relTable ? relTable : rel);
    var panelCoordinates = WebFormGetElementPosition(panel);
    var panelHeight = ((typeof(panel.physicalHeight) != "undefined") && (panel.physicalHeight != null)) ?
        panel.physicalHeight :
        panelCoordinates.height;
    panel.physicalHeight = panelHeight;
    var panelParentCoordinates;
    if (panel.offsetParent) {
        panelParentCoordinates = WebFormGetElementPosition(panel.offsetParent);
    }
    else {
        panelParentCoordinates = new Object();
        panelParentCoordinates.x = 0;
        panelParentCoordinates.y = 0;
    }
    var overflowElement = WebFormGetElementById("__overFlowElement");
    if (!overflowElement) {
        overflowElement = document.createElement("img");
        overflowElement.id="__overFlowElement";
        WebFormSetElementWidth(overflowElement, 1);
        document.body.appendChild(overflowElement);
    }
    WebFormSetElementHeight(overflowElement, panelHeight + relCoordinates.y + parseInt(panel.y ? panel.y : 0));
    overflowElement.style.visibility = "visible";
    overflowElement.style.display = "inline";
    var clientHeight = 0;
    var clientWidth = 0;
    if (window.innerHeight) {
        clientHeight = window.innerHeight;
        clientWidth = window.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight) {
        clientHeight = document.documentElement.clientHeight;
        clientWidth = document.documentElement.clientWidth;
    }
    else if (document.body && document.body.clientHeight) {
        clientHeight = document.body.clientHeight;
        clientWidth = document.body.clientWidth;
    }
    var scrollTop = 0;
    var scrollLeft = 0;
    if (typeof(window.pageYOffset) != "undefined") {
        scrollTop = window.pageYOffset;
        scrollLeft = window.pageXOffset;
    }
    else if (document.documentElement && (typeof(document.documentElement.scrollTop) != "undefined")) {
        scrollTop = document.documentElement.scrollTop;
        scrollLeft = document.documentElement.scrollLeft;
    }
    else if (document.body && (typeof(document.body.scrollTop) != "undefined")) {
        scrollTop = document.body.scrollTop;
        scrollLeft = document.body.scrollLeft;
    }
    overflowElement.style.visibility = "hidden";
    overflowElement.style.display = "none";
    var bottomWindowBorder = clientHeight + scrollTop;
    var rightWindowBorder = clientWidth + scrollLeft;
    var position = panel.pos;
    if ((typeof(position) == "undefined") || (position == null) || (position == "")) {
        position = (WebFormGetElementDir(rel) == "rtl" ? "middleleft" : "middleright");
    }
    position = position.toLowerCase();
    var y = relCoordinates.y + parseInt(panel.y ? panel.y : 0) - panelParentCoordinates.y;
    var borderParent = (rel && rel.parentNode && rel.parentNode.parentNode && rel.parentNode.parentNode.parentNode
        && rel.parentNode.parentNode.parentNode.tagName.toLowerCase() == "div") ?
        rel.parentNode.parentNode.parentNode : null;
    WebFormSetElementY(panel, y);
    PopOutSetPanelHeight(panel, panelHeight, true);
    var clip = false;
    var overflow;
    if (position.indexOf("top") != -1) {
        y -= panelHeight;
        WebFormSetElementY(panel, y); 
        if (y < -panelParentCoordinates.y) {
            y = -panelParentCoordinates.y;
            WebFormSetElementY(panel, y); 
            if (panelHeight > clientHeight - 2) {
                clip = true;
                PopOutSetPanelHeight(panel, clientHeight - 2);
            }
        }
    }
    else {
        if (position.indexOf("bottom") != -1) {
            y += relCoordinates.height;
            WebFormSetElementY(panel, y); 
        }
        overflow = y + panelParentCoordinates.y + panelHeight - bottomWindowBorder;
        if (overflow > 0) {
            y -= overflow;
            WebFormSetElementY(panel, y); 
            if (y < -panelParentCoordinates.y) {
                y = 2 - panelParentCoordinates.y + scrollTop;
                WebFormSetElementY(panel, y); 
                clip = true;
                PopOutSetPanelHeight(panel, clientHeight - 2);
            }
        }
    }
    if (!clip) {
        PopOutSetPanelHeight(panel, panel.clippedHeight, true);
    }
    var panelParentOffsetY = 0;
    if (panel.offsetParent) {
        panelParentOffsetY = WebFormGetElementPosition(panel.offsetParent).y;
    }
    var panelY = ((typeof(panel.originY) != "undefined") && (panel.originY != null)) ?
        panel.originY :
        y - panelParentOffsetY;
    panel.originY = panelY;
    if (!hideScrollers) {
        PopOutShowScrollers(panel);
    }
    else {
        PopOutHideScrollers(panel);
    }
    var x = relCoordinates.x + parseInt(panel.x ? panel.x : 0) - panelParentCoordinates.x;
    if (borderParent && borderParent.clientLeft) {
        x += 2 * borderParent.clientLeft;
    }
    WebFormSetElementX(panel, x);
    if (position.indexOf("left") != -1) {
        x -= panelCoordinates.width;
        WebFormSetElementX(panel, x);
        if (x < -panelParentCoordinates.x) {
            WebFormSetElementX(panel, -panelParentCoordinates.x);
        }
    }
    else {
        if (position.indexOf("right") != -1) {
            x += relCoordinates.width;
            WebFormSetElementX(panel, x);
        }
        overflow = x + panelParentCoordinates.x + panelCoordinates.width - rightWindowBorder;
        if (overflow > 0) {
            if (position.indexOf("bottom") == -1 && relCoordinates.x > panelCoordinates.width) {
                x -= relCoordinates.width + panelCoordinates.width;
            }
            else {
                x -= overflow;
            }
            WebFormSetElementX(panel, x);
            if (x < -panelParentCoordinates.x) {
                WebFormSetElementX(panel, -panelParentCoordinates.x);
            }
        }
    }
}
function PopOutScroll(panel, offsetDelta) {
    var table = WebFormGetElementByTagName(panel, "TABLE");
    if (!table) {
        return;
    }
    table.style.position = "relative";
    var tableY = (table.style.top ? parseInt(table.style.top) : 0);
    panel.offset += offsetDelta;
    WebFormSetElementY(table, tableY - offsetDelta);
}
function PopOutSetPanelHeight(element, height, doNotClip) {
    if (element && element.style) {
        var size = WebFormGetElementPosition(element);
        element.physicalWidth = size.width;
        element.clippedHeight = height;
        WebFormSetElementHeight(element, height - (element.clientTop ? (2 * element.clientTop) : 0));
        if (doNotClip && element.style) {
            element.style.clip = "rect(auto auto auto auto)";
        }
        else {
            PopOutClip(element, 0, height);
        }
    }
}
function PopOutShow(panelId, hideScrollers, data) {
    var panel = WebFormGetElementById(panelId);
    if (panel && panel.tagName.toLowerCase() == "div") {
        panel.style.visibility = "visible";
        panel.style.display = "inline";
        if (!panel.offset || hideScrollers) {
            panel.scrollTop = 0;
            panel.offset = 0;
            var table = WebFormGetElementByTagName(panel, "TABLE");
            if (table) {
                WebFormSetElementY(table, 0);
            }
        }
        PopOutPosition(panel, hideScrollers);
        var z = 1;
        var isIE = window.navigator && window.navigator.appName == "Microsoft Internet Explorer" && !window.opera;
        if (isIE && data) {
            var childFrameId = panel.id + "_MenuIFrame";
            var childFrame = WebFormGetElementById(childFrameId);
            var parent = panel.offsetParent;
            if (!childFrame) {
                childFrame = document.createElement("iframe");
                childFrame.id = childFrameId;
                childFrame.src = (data.iframeUrl ? data.iframeUrl : "about:blank");
                childFrame.style.position = "absolute";
                childFrame.style.display = "none";
                childFrame.scrolling = "no";
                childFrame.frameBorder = "0";
                if (parent.tagName.toLowerCase() == "html") {
                    document.body.appendChild(childFrame);
                }
                else {
                    parent.appendChild(childFrame);
                }
            }
            var pos = WebFormGetElementPosition(panel);
            var parentPos = WebFormGetElementPosition(parent);
            WebFormSetElementX(childFrame, pos.x - parentPos.x);
            WebFormSetElementY(childFrame, pos.y - parentPos.y);
            WebFormSetElementWidth(childFrame, pos.width);
            WebFormSetElementHeight(childFrame, pos.height);
            childFrame.style.display = "block";
            if (panel.currentStyle && panel.currentStyle.zIndex && panel.currentStyle.zIndex != "auto") {
                z = panel.currentStyle.zIndex;
            }
            else if (panel.style.zIndex) {
                z = panel.style.zIndex;
            }
        }
        panel.style.zIndex = z;
    }
}
function PopOutShowScrollers(panel) {
    if (panel && panel.style) {
        var up = WebFormGetElementById(panel.id + "Up");
        var dn = WebFormGetElementById(panel.id + "Dn");
        var cnt = 0;
        if (up && dn) {
            if (panel.offset && panel.offset > 0) {
                up.style.visibility = "visible";
                up.style.display = "inline";
                cnt++;
                if (panel.clientWidth) {
                    WebFormSetElementWidth(up, panel.clientWidth
                        - (up.clientLeft ? (2 * up.clientLeft) : 0));
                }
                WebFormSetElementY(up, 0);
            }
            else {
                up.style.visibility = "hidden";
                up.style.display = "none";
            }
            if (panel.offset + panel.clippedHeight + 2 <= panel.physicalHeight) {
                dn.style.visibility = "visible";
                dn.style.display = "inline";
                cnt++;
                if (panel.clientWidth) {
                    WebFormSetElementWidth(dn, panel.clientWidth
                        - (dn.clientLeft ? (2 * dn.clientLeft) : 0));
                }
                WebFormSetElementY(dn, panel.clippedHeight - WebFormGetElementPosition(dn).height
                    - (panel.clientTop ? (2 * panel.clientTop) : 0));
            }
            else {
                dn.style.visibility = "hidden";
                dn.style.display = "none";
            }
            if (cnt == 0) {
                panel.style.clip = "rect(auto auto auto auto)";
            }
        }
    }
}
function PopOutStop() {
    if (__scrollPanel && __scrollPanel.interval) {
        window.clearInterval(__scrollPanel.interval);
    }
    MenuRestoreInterval();
}
function PopOutUp(scroller) {
    MenuClearInterval();
    var panel;
    if (scroller) {
        panel = scroller.parentNode
    }
    else {
        panel = __scrollPanel;
    }
    if (panel && panel.offset && panel.offset > 0) {
        PopOutScroll(panel, -2);
        __scrollPanel = panel;
        PopOutShowScrollers(panel);
        PopOutStop();
        __scrollPanel.interval = window.setInterval("PopOutUp()", 8);
    }
}
