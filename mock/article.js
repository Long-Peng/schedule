const Mock = require('mockjs')

const List = []
const count = 100

// const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
// const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    TaskID: '@increament',
    CreateTime: +Mock.Random.date('T'),
    Ddl: +Mock.Random.date('T'),
    'Remind|1': ['否', '每天', '每两天', '每三天', '每四天'],
    Theme: '@title(5, 10)',
    Priority: '@integer(1, 3)',
    'Subject|1': ['Math', 'English', 'Politics', 'Subject'],
    Finish: '@boolean'
  }))
}

module.exports = [
  {
    url: '/vue-element-admin/article/list',
    type: 'get',
    response: config => {
      const listQuery = {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
      const { importance, type, title, page = 1, limit = 20, sort } = listQuery

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
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
    url: '/vue-element-admin/article/comlist',
    type: 'post',
    response: config => {
      const listQuery = {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      }
      const { importance, type, title, page = 1, limit = 20, sort } = listQuery
      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
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
    url: '/vue-element-admin/article/subrate',
    type: 'post',
    response: config => {
      const rateList = {
        math: 20,
        english: 35,
        political: 70,
        special: 100
      }
      return {
        code: 20000,
        data: rateList
      }
    }
  },
  {
    url: '/vue-element-admin/article/analyse',
    type: 'post',
    response: config => {
      const task = 2000
      const finish = 1000
      const analyse = [
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 1917,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 1776,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 1776,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          UserID: null,
          CreateTime: null,
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        }]
      return {
        code: 20000,
        data: {
          count_task: task,
          count_finish: finish,
          analyse: analyse
        }
      }
    }
  },
  {
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
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
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

