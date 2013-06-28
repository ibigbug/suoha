function User () {
  this.name = uuid();
}


function uuid () {
  var uid = 0;

  return function () {
    return uid += 1;
  }
}
