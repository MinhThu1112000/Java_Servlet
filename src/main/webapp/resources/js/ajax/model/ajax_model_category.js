var urlCategory = "category/";
function categoryFindAll() {
    return ajaxGet(${urlCategory}find-all);
}
function categoryFindById(id) {
    return ajaxGet(``${urlCategory}find-by-id?id=${id}`);

}