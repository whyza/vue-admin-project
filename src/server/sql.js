// sql语句
var sqlMap = {
    // 用户
    user: {
        query: 'select * from user_info',
        insert: 'insert into user_info(Address,UserName,CreateTime) values(?,?,?)',
        delete:"DELETE FROM user_info WHERE id = ?"
    }
}
module.exports = sqlMap;
