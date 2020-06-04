//CdnPath=http://ajax.aspnetcdn.com/ajax/4.5.1/1/DetailsView.js
function DetailsView() {
    this.pageIndex = null;
    this.dataKeys = null;
    this.createPropertyString = DetailsViewCreatePropertyString;
    this.setStateField = DetailsViewSetStateValue;
    this.getHiddenFieldContents = DetailsViewGetHiddenFieldContents;
    this.stateField = null;
    this.panelElement = null;
    this.callback = null;
}
function DetailsViewCreatePropertyString() {
    return createPropertyStringFromValuesDetailsView(this.pageIndex, this.dataKeys);
}
function DetailsViewSetStateValue() {
    this.stateField.value = this.createPropertyString();
}
function DetailsViewOnCallback (result, context) {
    var value = new String(result);
    var valsArray = value.split("|");
    var innerHtml = valsArray[2];
    for (var i = 3; i < valsArray.length; i++) {
        innerHtml += "|" + valsArray[i];
    }
    context.panelElement.innerHTML = innerHtml;
    context.stateField.value = createPropertyStringFromValuesDetailsView(valsArray[0], valsArray[1]);
}
function DetailsViewGetHiddenFieldContents(arg) {
    return arg + "|" + this.stateField.value;
}
function createPropertyStringFromValuesDetailsView(pageIndex, dataKeys) {
    var value = new Array(pageIndex, dataKeys);
    return value.join("|");
}
