const { ObjectId } = require("mongodb");

module.exports.isValidObjectId = (id) => {
    try {
        ObjectId(id);
    } catch (e) {
        return false;
    }
    return true;
}