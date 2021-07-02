<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index"  placement="top">
        <el-card>
          <h4>{{ item.subject }}</h4>
          <p>{{ item.theme }}</p>
          <p>{{ item.ddl | parseTime('{y}-{m}-{d} {h}:{i}') }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>

import { fetchList } from '@/api/task'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      listload: true,
      timeline: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters([
      'userID'
    ])
  },
  created() {
    this.getcomList()
  },
  methods: {
    getcomList() {
      this.listload = true
      fetchList(this.userID).then(response => {
        this.timeline = response.data.items
        this.total = response.data.total

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
