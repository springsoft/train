

exports.RandomID = function () {

    var id = Math.floor(Math.random() * 999999999999) + 1;
    return id;
}