module.exports = [
  {
    url: '/t',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: {
          total: 3,
          items: '@sentence(1, 2)'
        }
      }
    }
  },
  {
    url: '/t',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
