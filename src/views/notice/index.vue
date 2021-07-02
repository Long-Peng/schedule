<template>
  <div id="logo" class="app-container">
    <el-badge :value="number" class="item">
      <el-button size="large">消息提醒</el-button>
    </el-badge>
    <el-alert
      v-for="item in alert"
      :key="item.subject"
      title="您有需要完成的任务"
      type="info"
      :closable="false"
      description=""
      show-icon
    >
      <template slot>
        <div>
          科目：<span>{{ item.subject }}</span>  内容：<span>{{ item.theme }}</span>  优先级：<span>{{ item.priority }}</span> 截止时间：<span>{{ item.ddl }}</span>
        </div>
      </template>
    </el-alert>
    <el-alert
      v-for="item in alert2"
      :key="item.subject"
      title="您有任务即将到达设定的完成时间"
      type="warning"
      :closable="false"
      description=""
      show-icon
    >
      <template slot>
        <div>
          科目：<span>{{ item.subject }}</span>  内容：<span>{{ item.theme }}</span>  优先级：<span>{{ item.priority }}</span> 截止时间：<span>{{ item.ddl }}</span>
        </div>
      </template>
    </el-alert>
  </div>
</template>
<script>
import { fetchList } from '@/api/notice'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      listLoading: true,
      alert:
        {
          subject: '',
          theme: '',
          priority: '',
          ddl: ''
        },
      alert2:
        {
          subject: '',
          theme: '',
          priority: '',
          ddl: ''
        }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const token = getToken()
      this.listLoading = true
      fetchList(token).then(response => {
        this.alert = response.data.items
        this.alert2 = response.data.items
        this.number = 2 * response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
<style scoped>
#logo{
  background: url("../../assets/bg2.jpg");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 88%
}
</style>
