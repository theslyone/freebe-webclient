var user = "N/A"
var office = "https://freebe.com.ng";

var freebe = (function() {
  getAccountName = function(bankCode, accountNumber) {
    var url = '/api/v1.0/paylink/subaccounts/validate/{bankCode}/account/{accountNumber}';
    $(".ui.form.factory").addClass("loading");
    return new Promise(function(fulfill, reject) {
      var ajax = window.getAjaxRequest(url.replace('{bankCode}', bankCode).replace('{accountNumber}', accountNumber));
      ajax.success(function(accountName) {
        fulfill(accountName);
      });
      ajax.error(function(err) {
        reject(err.responseJSON.ExceptionMessage);
      });
    });
  }

  getBankName = function(cardNumber) {
    var url = '/api/v1.0/paylink/subaccounts/validate/card/{cardNumber}';
    return new Promise(function(fulfill, reject){
      var ajax = window.getAjaxRequest(url.replace('{cardNumber}', cardNumber));
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
