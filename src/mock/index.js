import Mock from 'mockjs'

var Random = Mock.Random
Random.extend({
  ack () {
    var acks = [-1, 0, 1]
    return this.pick(acks)
  }
})
const data = {
  'id': '@guid',
  'name': '@cname'
}

const login = {
  'token': '@id',
  'firstName': '@first',
  'projectList': '@string',
  'login_ACK': '@ack'
}
Mock.mock('/api/test', 'post', data)

Mock.mock('/api/login', 'post', login)

export default Mock
