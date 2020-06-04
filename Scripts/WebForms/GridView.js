//CdnPath=http://ajax.aspnetcdn.com/ajax/4.5.1/1/GridView.js
function GridView() {
    this.pageIndex = null;
    this.sortExpression = null;
    this.sortDirection = null;
    this.dataKeys = null;
    this.createPropertyString = GridViewCreatePropertyString;
    this.setStateField = GridViewSetStateValue;
    this.getHiddenFieldContents = GridViewGetHiddenFieldContents;
    this.stateField = null;
    this.panelElement = null;
    this.callback = null;
}
function GridViewCreatePropertyString() {
    return createPropertyStringFromValuesGridView(this.pageIndex, this.sortDirection, this.sortExpression, this.dataKeys);
}
function GridViewSetStateValue() {
    this.stateField.value = this.createPropertyString();
}
function GridViewOnCallback (result, context) {
    var value = new String(result);
    var valsArray = value.split("|");
    var innerHtml = valsArray[4];
    for (var i = 5; i < valsArray.length; i++) {
        innerHtml += "|" + valsArray[i];
    }
    context.panelElement.innerHTML = innerHtml;
    context.stateField.value = createPropertyStringFromValuesGridView(valsArray[0], valsArray[1], valsArray[2], valsArray[3]);
}
function GridViewGetHiddenFieldContents(arg) {
    return arg + "|" + this.stateField.value;
}
function createPropertyStringFromValuesGridView(pageIndex, sortDirection, sortExpression, dataKeys) {
    var value = new Array(pageIndex, sortDirection, sortExpression, dataKeys);
    return value.join("|");
}
