const Mock = require('mockjs')

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    taskId: '@increment',
    createAt: +Mock.Random.date('T'),
    ddl: +Mock.Random.date('T'),
    'remind|1': '@integer(0, 5)',
    theme: '@sentence(3, 5)',
    priority: '@integer(1, 3)',
    'subject|1': ['Math', 'English', 'Politics', 'Subject'],
    finished: '@boolean'
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/article/list',
    type: 'post',
    response: config => {
      const { priority, subject, theme, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (priority && item.priority !== +priority) return false
        if (subject && item.subject !== subject) return false
        if (theme && item.theme.indexOf(theme) < 0) return false
        return true
      })

      if (sort === '-taskId') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { taskId } = config.query
      for (const article of List) {
        if (article.taskId === +taskId) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/delete',
    type: 'delete',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }

]
