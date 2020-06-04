//CdnPath=http://ajax.aspnetcdn.com/ajax/4.5.1/1/WebParts.js
var __wpm = null;
function Point(x, y) {
    this.x = x;
    this.y = y;
}
function __wpTranslateOffset(x, y, offsetElement, relativeToElement, includeScroll) {
    while ((typeof(offsetElement) != "undefined") && (offsetElement != null) && (offsetElement != relativeToElement)) {
        x += offsetElement.offsetLeft;
        y += offsetElement.offsetTop;
        var tagName = offsetElement.tagName;
        if ((tagName != "TABLE") && (tagName != "BODY")) {
            x += offsetElement.clientLeft;
            y += offsetElement.clientTop;
        }
        if (includeScroll && (tagName != "BODY")) {
            x -= offsetElement.scrollLeft;
            y -= offsetElement.scrollTop;
        }
        offsetElement = offsetElement.offsetParent;
    }
    return new Point(x, y);
}
function __wpGetPageEventLocation(event, includeScroll) {
    if ((typeof(event) == "undefined") || (event == null)) {
        event = window.event;
    }
    return __wpTranslateOffset(event.offsetX, event.offsetY, event.srcElement, null, includeScroll);
}
function __wpClearSelection() {
    document.selection.empty();
}
function WebPart(webPartElement, webPartTitleElement, zone, zoneIndex, allowZoneChange) {
    this.webPartElement = webPartElement;
    this.allowZoneChange = allowZoneChange;
    this.zone = zone;
    this.zoneIndex = zoneIndex;
    this.title = ((typeof(webPartTitleElement) != "undefined") && (webPartTitleElement != null)) ?
        webPartTitleElement.innerText : "";
    webPartElement.__webPart = this;
    if ((typeof(webPartTitleElement) != "undefined") && (webPartTitleElement != null)) {
        webPartTitleElement.style.cursor = "move";
        webPartTitleElement.attachEvent("onmousedown", WebPartOnMouseDown);
        webPartElement.attachEvent("ondragstart", WebPartOnDragStart);
        webPartElement.attachEvent("ondrag", WebPartOnDrag);
        webPartElement.attachEvent("ondragend", WebPartOnDragEnd);
    }
    this.UpdatePosition = WebPartUpdatePosition;
    this.Dispose = WebPartDispose;
}
function WebPartDispose() {
    this.webPartElement.__webPart = null    
}
function WebPartOnMouseDown() {
    var currentEvent = window.event;
    var draggedWebPart = WebPartGetParentWebPartElement(currentEvent.srcElement);
    if ((typeof(draggedWebPart) == "undefined") || (draggedWebPart == null)) {
        return;
    }
    document.selection.empty();
    try {
        __wpm.draggedWebPart = draggedWebPart;
        __wpm.DragDrop();
    }
    catch (e) {
        __wpm.draggedWebPart = draggedWebPart;
        window.setTimeout("__wpm.DragDrop()", 0);
    }
    currentEvent.returnValue = false;
    currentEvent.cancelBubble = true;
}
function WebPartOnDragStart() {
    var currentEvent = window.event;
    var webPartElement = currentEvent.srcElement;
    if ((typeof(webPartElement.__webPart) == "undefined") || (webPartElement.__webPart == null)) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
        return;
    }
    var dataObject = currentEvent.dataTransfer;
    dataObject.effectAllowed = __wpm.InitiateWebPartDragDrop(webPartElement);
}
function WebPartOnDrag() {
    __wpm.ContinueWebPartDragDrop();
}
function WebPartOnDragEnd() {
    __wpm.CompleteWebPartDragDrop();
}
function WebPartGetParentWebPartElement(containedElement) {
    var elem = containedElement;
    while ((typeof(elem.__webPart) == "undefined") || (elem.__webPart == null)) {
        elem = elem.parentElement;
        if ((typeof(elem) == "undefined") || (elem == null)) {
            break;
        }
    }
    return elem;
}
function WebPartUpdatePosition() {
    var location = __wpTranslateOffset(0, 0, this.webPartElement, null, false);
    this.middleX = location.x + this.webPartElement.offsetWidth / 2;
    this.middleY = location.y + this.webPartElement.offsetHeight / 2;
}
function Zone(zoneElement, zoneIndex, uniqueID, isVertical, allowLayoutChange, highlightColor) {
    var webPartTable = null;
    if (zoneElement.rows.length == 1) {
        webPartTableContainer = zoneElement.rows[0].cells[0];
    }
    else {
        webPartTableContainer = zoneElement.rows[1].cells[0];
    }
    var i;
    for (i = 0; i < webPartTableContainer.childNodes.length; i++) {
        var node = webPartTableContainer.childNodes[i];
        if (node.tagName == "TABLE") {
            webPartTable = node;
            break;
        }
    }
    this.zoneElement = zoneElement;
    this.zoneIndex = zoneIndex;
    this.webParts = new Array();
    this.uniqueID = uniqueID;
    this.isVertical = isVertical;
    this.allowLayoutChange = allowLayoutChange;
    this.allowDrop = false;
    this.webPartTable = webPartTable;
    this.highlightColor = highlightColor;
    this.savedBorderColor = (webPartTable != null) ? webPartTable.style.borderColor : null;
    this.dropCueElements = new Array();
    if (webPartTable != null) {
        if (isVertical) {
            for (i = 0; i < webPartTable.rows.length; i += 2) {
                this.dropCueElements[i / 2] = webPartTable.rows[i].cells[0].childNodes[0];
            }
        }
        else {
            for (i = 0; i < webPartTable.rows[0].cells.length; i += 2) {
                this.dropCueElements[i / 2] = webPartTable.rows[0].cells[i].childNodes[0];
            }
        }
    }
    this.AddWebPart = ZoneAddWebPart;
    this.GetWebPartIndex = ZoneGetWebPartIndex;
    this.ToggleDropCues = ZoneToggleDropCues;
    this.UpdatePosition = ZoneUpdatePosition;
    this.Dispose = ZoneDispose;
    webPartTable.__zone = this;
    webPartTable.attachEvent("ondragenter", ZoneOnDragEnter);
    webPartTable.attachEvent("ondrop", ZoneOnDrop);
}
function ZoneDispose() {
    for (var i = 0; i < this.webParts.length; i++) {
        this.webParts[i].Dispose();
    }
    this.webPartTable.__zone = null;
}
function ZoneOnDragEnter() {
    var handled = __wpm.ProcessWebPartDragEnter();
    var currentEvent = window.event;
    if (handled) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
    }
}
function ZoneOnDragOver() {
    var handled = __wpm.ProcessWebPartDragOver();
    var currentEvent = window.event;
    if (handled) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
    }
}
function ZoneOnDrop() {
    var handled = __wpm.ProcessWebPartDrop();
    var currentEvent = window.event;
    if (handled) {
        currentEvent.returnValue = false;
        currentEvent.cancelBubble = true;
    }
}
function ZoneGetParentZoneElement(containedElement) {
    var elem = containedElement;
    while ((typeof(elem.__zone) == "undefined") || (elem.__zone == null)) {
        elem = elem.parentElement;
        if ((typeof(elem) == "undefined") || (elem == null)) {
            break;
        }
    }
    return elem;
}
function ZoneAddWebPart(webPartElement, webPartTitleElement, allowZoneChange) {
    var webPart = null;
    var zoneIndex = this.webParts.length;
    if (this.allowLayoutChange && __wpm.IsDragDropEnabled()) {
        webPart = new WebPart(webPartElement, webPartTitleElement, this, zoneIndex, allowZoneChange);
    }
    else {
        webPart = new WebPart(webPartElement, null, this, zoneIndex, allowZoneChange);
    }
    this.webParts[zoneIndex] = webPart;
    return webPart;
}
function ZoneToggleDropCues(show, index, ignoreOutline) {
    if (ignoreOutline == false) {
        this.webPartTable.style.borderColor = (show ? this.highlightColor : this.savedBorderColor);
    }
    if (index == -1) {
        return;
    }
    var dropCue = this.dropCueElements[index];
    if (dropCue && dropCue.style) {
        if (dropCue.style.height == "100%" && !dropCue.webPartZoneHorizontalCueResized) {
            var oldParentHeight = dropCue.parentElement.clientHeight;
            var realHeight = oldParentHeight - 10;
            dropCue.style.height = realHeight + "px";
            var dropCueVerticalBar = dropCue.getElementsByTagName("DIV")[0];
            if (dropCueVerticalBar && dropCueVerticalBar.style) {
                dropCueVerticalBar.style.height = dropCue.style.height;
                var heightDiff = (dropCue.parentElement.clientHeight - oldParentHeight);
                if (heightDiff) {
                    dropCue.style.height = (realHeight - heightDiff) + "px";
                    dropCueVerticalBar.style.height = dropCue.style.height;
                }
            }
            dropCue.webPartZoneHorizontalCueResized = true;
        }
        dropCue.style.visibility = (show ? "visible" : "hidden");
    }
}
function ZoneGetWebPartIndex(location) {
    var x = location.x;
    var y = location.y;
    if ((x < this.webPartTableLeft) || (x > this.webPartTableRight) ||
        (y < this.webPartTableTop) || (y > this.webPartTableBottom)) {
        return -1;
    }
    var vertical = this.isVertical;
    var webParts = this.webParts;
    var webPartsCount = webParts.length;
    for (var i = 0; i < webPartsCount; i++) {
        var webPart = webParts[i];
        if (vertical) {
            if (y < webPart.middleY) {
                return i;
            }
        }
        else {
            if (x < webPart.middleX) {
                return i;
            }
        }
    }
    return webPartsCount;
}
function ZoneUpdatePosition() {
    var topLeft = __wpTranslateOffset(0, 0, this.webPartTable, null, false);
    this.webPartTableLeft = topLeft.x;
    this.webPartTableTop = topLeft.y;
    this.webPartTableRight = (this.webPartTable != null) ? topLeft.x + this.webPartTable.offsetWidth : topLeft.x;
    this.webPartTableBottom = (this.webPartTable != null) ? topLeft.y + this.webPartTable.offsetHeight : topLeft.y;
    for (var i = 0; i < this.webParts.length; i++) {
        this.webParts[i].UpdatePosition();
    }
}
function WebPartDragState(webPartElement, effect) {
    this.webPartElement = webPartElement;
    this.dropZoneElement = null;
    this.dropIndex = -1;
    this.effect = effect;
    this.dropped = false;
}
function WebPartMenu(menuLabelElement, menuDropDownElement, menuElement) {
    this.menuLabelElement = menuLabelElement;
    this.menuDropDownElement = menuDropDownElement;
    this.menuElement = menuElement;
    this.menuLabelElement.__menu = this;
    this.menuLabelElement.attachEvent('onclick', WebPartMenuOnClick);
    this.menuLabelElement.attachEvent('onkeypress', WebPartMenuOnKeyPress);
    this.menuLabelElement.attachEvent('onmouseenter', WebPartMenuOnMouseEnter);
    this.menuLabelElement.attachEvent('onmouseleave', WebPartMenuOnMouseLeave);
    if ((typeof(this.menuDropDownElement) != "undefined") && (this.menuDropDownElement != null)) {
        this.menuDropDownElement.__menu = this;
    }
    this.menuItemStyle = "";
    this.menuItemHoverStyle = "";
    this.popup = null;
    this.hoverClassName = "";
    this.hoverColor = "";
    this.oldColor = this.menuLabelElement.style.color;
    this.oldTextDecoration = this.menuLabelElement.style.textDecoration;
    this.oldClassName = this.menuLabelElement.className;
    this.Show = WebPartMenuShow;
    this.Hide = WebPartMenuHide;
    this.Hover = WebPartMenuHover;
    this.Unhover = WebPartMenuUnhover;
    this.Dispose = WebPartMenuDispose;
    var menu = this;
    this.disposeDelegate = function() { menu.Dispose(); };
    window.attachEvent('onunload', this.disposeDelegate);
}
function WebPartMenuDispose() {
    this.menuLabelElement.__menu = null;
    this.menuDropDownElement.__menu = null;
    window.detachEvent('onunload', this.disposeDelegate);
}
function WebPartMenuShow() {
    if ((typeof(__wpm.menu) != "undefined") && (__wpm.menu != null)) {
        __wpm.menu.Hide();
    }
    var menuHTML =
        "<html><head><style>" +
        "a.menuItem, a.menuItem:Link { display: block; padding: 1px; text-decoration: none; " + this.itemStyle + " }" +
        "a.menuItem:Hover { " + this.itemHoverStyle + " }" +
        "</style><body scroll=\"no\" style=\"border: none; margin: 0; padding: 0;\" ondragstart=\"window.event.returnValue=false;\" onclick=\"popup.hide()\">" +
        this.menuElement.innerHTML +
        "</body></html>";
    var width = 16;
    var height = 16;
    this.popup = window.createPopup();
    __wpm.menu = this;
    var popupDocument = this.popup.document;
    popupDocument.write(menuHTML);
    this.popup.show(0, 0, width, height);
    var popupBody = popupDocument.body;
    width = popupBody.scrollWidth;
    height = popupBody.scrollHeight;
    if (width < this.menuLabelElement.offsetWidth) {
        width = this.menuLabelElement.offsetWidth + 16;
    }
    if (this.menuElement.innerHTML.indexOf("progid:DXImageTransform.Microsoft.Shadow") != -1) {
        popupBody.style.paddingRight = "4px";
    }
    popupBody.__wpm = __wpm;
    popupBody.__wpmDeleteWarning = __wpmDeleteWarning;
    popupBody.__wpmCloseProviderWarning = __wpmCloseProviderWarning;
    popupBody.popup = this.popup;
    this.popup.hide();
    this.popup.show(0, this.menuLabelElement.offsetHeight, width, height, this.menuLabelElement);
}
function WebPartMenuHide() {
    if (__wpm.menu == this) {
        __wpm.menu = null;
        if ((typeof(this.popup) != "undefined") && (this.popup != null)) {
            this.popup.hide();
            this.popup = null;
        }
    }
}
function WebPartMenuHover() {
    if (this.labelHoverClassName != "") {
        this.menuLabelElement.className = this.menuLabelElement.className + " " + this.labelHoverClassName;
    }
    if (this.labelHoverColor != "") {
        this.menuLabelElement.style.color = this.labelHoverColor;
    }
}
function WebPartMenuUnhover() {
    if (this.labelHoverClassName != "") {
        this.menuLabelElement.style.textDecoration = this.oldTextDecoration;
        this.menuLabelElement.className = this.oldClassName;
    }
    if (this.labelHoverColor != "") {
        this.menuLabelElement.style.color = this.oldColor;
    }
}
function WebPartMenuOnClick() {
    var menu = window.event.srcElement.__menu;
    if ((typeof(menu) != "undefined") && (menu != null)) {
        window.event.returnValue = false;
        window.event.cancelBubble = true;
        menu.Show();
    }
}
function WebPartMenuOnKeyPress() {
    if (window.event.keyCode == 13) {
        var menu = window.event.srcElement.__menu;
        if ((typeof(menu) != "undefined") && (menu != null)) {
            window.event.returnValue = false;
            window.event.cancelBubble = true;
            menu.Show();
        }
    }
}
function WebPartMenuOnMouseEnter() {
    var menu = window.event.srcElement.__menu;
    if ((typeof(menu) != "undefined") && (menu != null)) {
        menu.Hover();
    }
}
function WebPartMenuOnMouseLeave() {
    var menu = window.event.srcElement.__menu;
    if ((typeof(menu) != "undefined") && (menu != null)) {
        menu.Unhover();
    }
}
function WebPartManager() {
    this.overlayContainerElement = null;
    this.zones = new Array();
    this.dragState = null;
    this.menu = null;
    this.draggedWebPart = null;
    this.AddZone = WebPartManagerAddZone;
    this.IsDragDropEnabled = WebPartManagerIsDragDropEnabled;
    this.DragDrop = WebPartManagerDragDrop;
    this.InitiateWebPartDragDrop = WebPartManagerInitiateWebPartDragDrop;
    this.CompleteWebPartDragDrop = WebPartManagerCompleteWebPartDragDrop;
    this.ContinueWebPartDragDrop = WebPartManagerContinueWebPartDragDrop;
    this.ProcessWebPartDragEnter = WebPartManagerProcessWebPartDragEnter;
    this.ProcessWebPartDragOver = WebPartManagerProcessWebPartDragOver;
    this.ProcessWebPartDrop = WebPartManagerProcessWebPartDrop;
    this.ShowHelp = WebPartManagerShowHelp;
    this.ExportWebPart = WebPartManagerExportWebPart;
    this.Execute = WebPartManagerExecute;
    this.SubmitPage = WebPartManagerSubmitPage;
    this.UpdatePositions = WebPartManagerUpdatePositions;
    window.attachEvent("onunload", WebPartManagerDispose);
}
function WebPartManagerDispose() {
    for (var i = 0; i < __wpm.zones.length; i++) {
        __wpm.zones[i].Dispose();
    }
    window.detachEvent("onunload", WebPartManagerDispose);
}
function WebPartManagerAddZone(zoneElement, uniqueID, isVertical, allowLayoutChange, highlightColor) {
    var zoneIndex = this.zones.length;
    var zone = new Zone(zoneElement, zoneIndex, uniqueID, isVertical, allowLayoutChange, highlightColor);
    this.zones[zoneIndex] = zone;
    return zone;
}
function WebPartManagerIsDragDropEnabled() {
    return ((typeof(this.overlayContainerElement) != "undefined") && (this.overlayContainerElement != null));
}
function WebPartManagerDragDrop() {
    if ((typeof(this.draggedWebPart) != "undefined") && (this.draggedWebPart != null)) {
        var tempWebPart = this.draggedWebPart;
        this.draggedWebPart = null;
        tempWebPart.dragDrop();
        window.setTimeout("__wpClearSelection()", 0);
    }
}
function WebPartManagerInitiateWebPartDragDrop(webPartElement) {
    var webPart = webPartElement.__webPart;
    this.UpdatePositions();
    this.dragState = new WebPartDragState(webPartElement, "move");
    var location = __wpGetPageEventLocation(window.event, true);
    var overlayContainerElement = this.overlayContainerElement;
    overlayContainerElement.style.left = location.x - webPartElement.offsetWidth / 2;
    overlayContainerElement.style.top = location.y + 4 + (webPartElement.clientTop ? webPartElement.clientTop : 0);
    overlayContainerElement.style.display = "block";
    overlayContainerElement.style.width = webPartElement.offsetWidth;
    overlayContainerElement.style.height = webPartElement.offsetHeight;
    overlayContainerElement.appendChild(webPartElement.cloneNode(true));
    if (webPart.allowZoneChange == false) {
        webPart.zone.allowDrop = true;
    }
    else {
        for (var i = 0; i < __wpm.zones.length; i++) {
            var zone = __wpm.zones[i];
            if (zone.allowLayoutChange) {
                zone.allowDrop = true;
            }
        }
    }
    document.body.attachEvent("ondragover", ZoneOnDragOver);
    return "move";
}
function WebPartManagerCompleteWebPartDragDrop() {
    var dragState = this.dragState;
    this.dragState = null;
    if ((typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
        dragState.dropZoneElement.__zone.ToggleDropCues(false, dragState.dropIndex, false);
    }
    document.body.detachEvent("ondragover", ZoneOnDragOver);
    for (var i = 0; i < __wpm.zones.length; i++) {
        __wpm.zones[i].allowDrop = false;
    }
    this.overlayContainerElement.removeChild(this.overlayContainerElement.firstChild);
    this.overlayContainerElement.style.display = "none";
    if ((typeof(dragState) != "undefined") && (dragState != null) && (dragState.dropped == true)) {
        var currentZone = dragState.webPartElement.__webPart.zone;
        var currentZoneIndex = dragState.webPartElement.__webPart.zoneIndex;
        if ((currentZone != dragState.dropZoneElement.__zone) ||
            ((currentZoneIndex != dragState.dropIndex) &&
             (currentZoneIndex != (dragState.dropIndex - 1)))) {
            var eventTarget = dragState.dropZoneElement.__zone.uniqueID;
            var eventArgument = "Drag:" + dragState.webPartElement.id + ":" + dragState.dropIndex;
            this.SubmitPage(eventTarget, eventArgument);
        }
    }
}
function WebPartManagerContinueWebPartDragDrop() {
    var dragState = this.dragState;
    if ((typeof(dragState) != "undefined") && (dragState != null)) {
        var style = this.overlayContainerElement.style;
        var location = __wpGetPageEventLocation(window.event, true);
        style.left = location.x - dragState.webPartElement.offsetWidth / 2;
        style.top = location.y + 4 + (dragState.webPartElement.clientTop ? dragState.webPartElement.clientTop : 0);
    }
}
function WebPartManagerExecute(script) {
    if (this.menu) {
        this.menu.Hide();
    }
    var scriptReference = new Function(script);
    return (scriptReference() != false);
}
function WebPartManagerProcessWebPartDragEnter() {
    var dragState = __wpm.dragState;
    if ((typeof(dragState) != "undefined") && (dragState != null)) {
        var currentEvent = window.event;
        var newDropZoneElement = ZoneGetParentZoneElement(currentEvent.srcElement);
        if ((typeof(newDropZoneElement.__zone) == "undefined") || (newDropZoneElement.__zone == null) ||
            (newDropZoneElement.__zone.allowDrop == false)) {
            newDropZoneElement = null;
        }
        var newDropIndex = -1;
        if ((typeof(newDropZoneElement) != "undefined") && (newDropZoneElement != null)) {
            newDropIndex = newDropZoneElement.__zone.GetWebPartIndex(__wpGetPageEventLocation(currentEvent, false));
            if (newDropIndex == -1) {
                newDropZoneElement = null;
            }
        }
        if (dragState.dropZoneElement != newDropZoneElement) {
            if ((typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
                dragState.dropZoneElement.__zone.ToggleDropCues(false, dragState.dropIndex, false);
            }
            dragState.dropZoneElement = newDropZoneElement;
            dragState.dropIndex = newDropIndex;
            if ((typeof(newDropZoneElement) != "undefined") && (newDropZoneElement != null)) {
                newDropZoneElement.__zone.ToggleDropCues(true, newDropIndex, false);
            }
        }
        else if (dragState.dropIndex != newDropIndex) {
            if (dragState.dropIndex != -1) {
                dragState.dropZoneElement.__zone.ToggleDropCues(false, dragState.dropIndex, false);
            }
            dragState.dropIndex = newDropIndex;
            if ((typeof(newDropZoneElement) != "undefined") && (newDropZoneElement != null)) {
                newDropZoneElement.__zone.ToggleDropCues(true, newDropIndex, false);
            }
        }
        if ((typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
            currentEvent.dataTransfer.effectAllowed = dragState.effect;
        }
        return true;
    }
    return false;
}
function WebPartManagerProcessWebPartDragOver() {
    var dragState = __wpm.dragState;
    var currentEvent = window.event;
    var handled = false;
    if ((typeof(dragState) != "undefined") && (dragState != null) &&
        (typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
        var dropZoneElement = ZoneGetParentZoneElement(currentEvent.srcElement);
        if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null) && (dropZoneElement.__zone.allowDrop == false)) {
            dropZoneElement = null;
        }
        if (((typeof(dropZoneElement) == "undefined") || (dropZoneElement == null)) &&
            (typeof(dragState.dropZoneElement) != "undefined") && (dragState.dropZoneElement != null)) {
            dragState.dropZoneElement.__zone.ToggleDropCues(false, __wpm.dragState.dropIndex, false);
            dragState.dropZoneElement = null;
            dragState.dropIndex = -1;
        }
        else if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null)) {
            var location = __wpGetPageEventLocation(currentEvent, false);
            var newDropIndex = dropZoneElement.__zone.GetWebPartIndex(location);
            if (newDropIndex == -1) {
                dropZoneElement = null;
            }
            if (dragState.dropZoneElement != dropZoneElement) {
                if ((dragState.dropIndex != -1) || (typeof(dropZoneElement) == "undefined") || (dropZoneElement == null)) {
                    dragState.dropZoneElement.__zone.ToggleDropCues(false, __wpm.dragState.dropIndex, false);
                }
                dragState.dropZoneElement = dropZoneElement;
            }
            else {
                dragState.dropZoneElement.__zone.ToggleDropCues(false, dragState.dropIndex, true);
            }
            dragState.dropIndex = newDropIndex;
            if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null)) {
                dropZoneElement.__zone.ToggleDropCues(true, newDropIndex, false);
            }
        }
        handled = true;
    }
    if ((typeof(dragState) == "undefined") || (dragState == null) ||
        (typeof(dragState.dropZoneElement) == "undefined") || (dragState.dropZoneElement == null)) {
        currentEvent.dataTransfer.effectAllowed = "none";
    }
    return handled;
}
function WebPartManagerProcessWebPartDrop() {
    var dragState = this.dragState;
    if ((typeof(dragState) != "undefined") && (dragState != null)) {
        var currentEvent = window.event;
        var dropZoneElement = ZoneGetParentZoneElement(currentEvent.srcElement);
        if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null) && (dropZoneElement.__zone.allowDrop == false)) {
            dropZoneElement = null;
        }
        if ((typeof(dropZoneElement) != "undefined") && (dropZoneElement != null) && (dragState.dropZoneElement == dropZoneElement)) {
            dragState.dropped = true;
        }
        return true;
    }
    return false;
}
function WebPartManagerShowHelp(helpUrl, helpMode) {
    if ((typeof(this.menu) != "undefined") && (this.menu != null)) {
        this.menu.Hide();
    }
    if (helpMode == 0 || helpMode == 1) {
        if (helpMode == 0) {
            var dialogInfo = "edge: Sunken; center: yes; help: no; resizable: yes; status: no";
            window.showModalDialog(helpUrl, null, dialogInfo);
        }
        else {
            window.open(helpUrl, null, "scrollbars=yes,resizable=yes,status=no,toolbar=no,menubar=no,location=no");
        }
    }
    else if (helpMode == 2) {
        window.location = helpUrl;
    }
}
function WebPartManagerExportWebPart(exportUrl, warn, confirmOnly) {
    if (warn == true && __wpmExportWarning.length > 0 && this.personalizationScopeShared != true) {
        if (confirm(__wpmExportWarning) == false) {
            return false;
        }
    }
    if (confirmOnly == false) {
        window.location = exportUrl;
    }
    return true;
}
function WebPartManagerUpdatePositions() {
    for (var i = 0; i < this.zones.length; i++) {
        this.zones[i].UpdatePosition();
    }
}
function WebPartManagerSubmitPage(eventTarget, eventArgument) {
    if ((typeof(this.menu) != "undefined") && (this.menu != null)) {
        this.menu.Hide();
    }
    __doPostBack(eventTarget, eventArgument);
}
