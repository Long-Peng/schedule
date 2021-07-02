const Mock = require('mockjs')
const List = []
const count = 3

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    theme: '@sentence(3, 5)',
    priority: '@integer(1, 3)',
    'subject|1': ['Math', 'English', 'Politics', 'Subject'],
    ddl: new Date()
  }))
}
module.exports = [
  {
    url: '/test',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: List.length,
          items: List
        }
      }
    }
  }
]

