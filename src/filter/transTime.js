function transTime(obj) {

    var date = new Date(obj);
    var year = date.getFullYear();
    var month=date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1;
    // var month = (date.getMonth() + 1 + "").padStart(2, '0')
    var day = (date.getDate() + "").padStart(2, '0');

    return `${year}-${month}-${day} `
}



export default transTime