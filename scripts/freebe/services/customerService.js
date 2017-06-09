angular.module('freebe.services')
.service('customerService', ['$http', '$auth', 'pinesNotifications', function($http, $auth, pinesNotifications){
  var url = '/api/v1.0/paylink/customers/';

  var notification = {
    //title: 'Freebe',
    type: 'error',
    delay: 10000
  }

  this.update = function(obj){
    return $http.post(url + 'update/' + $auth.user.email, {
      Phone: obj.phone,
      Bvn: obj.bvn,
      FirstName: obj.firstName,
      LastName: obj.lastName,
      Email: obj.email,
      Avatar: obj.avatar || ''
    })
    .then(function(resp){
      var customer = resp.data;
      angular.extend($auth.user,
        {
            customerCode: customer.CustomerCode,
            lastName: customer.LastName,
            firstName: customer.FirstName,
            phone: customer.Phone,
            updatedAt: customer.UpdatedAt,
            bvn: customer.Bvn,
            isValidated: customer.IsValidated,
            avatar: customer.Avatar ? customer.Avatar : url + 'avatar/500/500/avatar.png'
        }
      );
      notification.type = 'success';
      notification.text = 'Account details updated successfully.';
      pinesNotifications.notify(notification);
      return customer;
    })
    .catch(function(err){
      notification.type = 'error';
      notification.text = 'Error updating account details.';
      pinesNotifications.notify(notification);
    });
  }

  this.get = function(param){
    return $http.get(url + "get/" + param)
    .then(function(resp) {
      var temp = resp.data;
      var customer =  {
        id: temp.CustomerId,
        customerCode: temp.CustomerCode,
        phone: temp.Phone,
        email: temp.Email,
        firstName: temp.FirstName,
        lastName: temp.LastName,
        customerCode: temp.CustomerCode,
        createdAt: temp.CreatedAt,
        updatedAt: temp.UpdatedAt,
        bvn: temp.Bvn,
        isValidated: temp.IsValidated,
        avatar: temp.Avatar ? temp.Avatar : url + 'avatar/500/500/avatar.png'
      }
      angular.extend($auth.user, customer);
      return customer;
    });
  }
}]);
