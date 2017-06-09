var user = "N/A"
var office = "https://freebe.com.ng";

Number.prototype.formatMoney = function(cc, dd, tt){
  var n = this,
    c = isNaN(cc = Math.abs(cc)) ? 2 : cc,
    d = dd == undefined ? "." : dd,
    t = tt == undefined ? "," : tt,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

String.prototype.isBlank = function() {
  return (!this || /^\s*$/.test(this))
}

var freebe = (function() {
  getAccountName = function(bankCode, accountNumber) {
    var url = '/api/v1.0/paylink/subaccounts/validateAccountNumber';
    $(".ui.form.factory").addClass("loading");
    return new Promise(function(fulfill, reject) {
      var ajax = window.getAjaxRequest(url, 'POST', { bankCode: bankCode, accountNumber: accountNumber });
      ajax.success(function(accountName) {
        fulfill(accountName);
      });
      ajax.error(function(err) {
        reject(err.responseJSON.ExceptionMessage);
      });
    });
  }

  getBankName = function(cardNumber) {
    var url = '/api/v1.0/paylink/subaccounts/validateCard';
    return new Promise(function(fulfill, reject){
      var ajax = window.getAjaxRequest(url, 'POST', { cardNumber: cardNumber });
      ajax.success(function(resp) {
        fulfill(resp);
      });
      ajax.error(function(err) {
        reject(err.responseJSON.ExceptionMessage);
      });
    });
  }

  return {
    getAccountName: getAccountName,
    getBankName: getBankName
  }
})();
