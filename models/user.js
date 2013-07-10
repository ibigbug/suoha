function User () {
  this.name = uuid();
}

exports.User = User;


function uuid () {
  var uid = 0;

  return function () {
    return uid += 1;
  };
}
