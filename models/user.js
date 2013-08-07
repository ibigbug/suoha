function User(id, name){
  this.id = id;
  this.name = name;
  this.status = USER_STATUS_TABLE.OFFLINE;
  this.last_time = Date.now();
}

var USER_STATUS_TABLE = {
  'OFFLINE': 0,
  'ONLINE': 1
}

exports.User = User;
exports.USER_STATUS_TABLE = USER_STATUS_TABLE;
