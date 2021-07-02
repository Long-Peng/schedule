<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.userimage" :height="'100px'" :width="'100px'" :hoverable="false">
          <div @click="handleUpdate()">更改头像</div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.username }}</div>
        <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>介绍</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.introduction }}
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>课目任务进度</span></div>
        <div class="user-bio-section-body" >
          <div class="progress-item">
            <span>数学</span>
            <el-progress :percentage="subjectRate.math" />
          </div>
          <div class="progress-item">
            <span>英语</span>
            <el-progress :percentage="subjectRate.english" >
            </el-progress>
          </div>
          <div class="progress-item">
            <span>政治</span>
            <el-progress :percentage="subjectRate.political" />
          </div>
          <div class="progress-item">
            <span>专业课</span>
            <el-progress :percentage="subjectRate.special"/>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import { fetchSubjectRate } from '@/api/article'

export default {
  components: { PanThumb },
  data() {
    return {
      listload: true,
      subjectRate: {},
      precomment: 'JS in Computer Science from the University of Technology'
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          username: '',
          email: '',
          userimage: '',
          password: '',
          role: '',
          introduction: '',
          userID: ''
        }
      }
    }
  },
  created() {
    this.getSubjectRate()
  },
  methods: {
    getSubjectRate() {
      var that = this
      this.listload = true
      fetchSubjectRate(this.id).then(response => {
        that.subjectRate = response.data

        setTimeout(() => {
          this.listLoad = false
        }, 1.5 * 1000)
      })
    },
    handleUpdate() {
      this.$emit('handleUpdateIm')
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}
.el-progress-bar__outer{
  background-color: transparent;
}
::v-deep .el-progress-bar__inner{
  background-color: unset;
  background-image: linear-gradient(to right,#3587d8 , #53ff54);
}
.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
