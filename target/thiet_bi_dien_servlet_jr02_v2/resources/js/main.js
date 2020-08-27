function viewField(field) {
    return field ? field : "";

}
function  viewError(selector, text) {
    $(selector).addClass("is-invalid");
    $(selector).siblings(".invalid-feedback").html(text+". Mời nhập lại!");
}
function hiddenError(selector) {
    $(selector).removeClass("is-invalid");

}