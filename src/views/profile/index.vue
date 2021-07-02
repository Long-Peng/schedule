<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Timeline" name="timeline">
                <el-scrollbar wrap-class="scroller-wrapper">
                  <timeline style="max-height: 571px" />
                </el-scrollbar>
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
    <el-dialog :title="更改头像" :visible.sync="dialogFormVisible">
      <div class="" ref="imForm" style="width: 400px; margin-left: 50px;">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Timeline from './components/Timeline'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Timeline, Account },
  data() {
    return {
      user: {},
      subjectRate: {},
      dialogFormVisible: false,
      activeTab: 'timeline'
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'userimage',
      'userID',
      'email'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        username: this.username,
        role: 'admin',
        email: this.email,
        userimage: this.userimage,
        password: 123456,
        introduction: 'I am introduction',
        userID: this.userID
      }
    },
    handleUpdateIm() {

    }
  }
}
</script>
