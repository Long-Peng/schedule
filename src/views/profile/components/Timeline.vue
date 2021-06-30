<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index"  placement="top">
        <el-card>
          <h4>{{ item.Subject }}</h4>
          <p>{{ item.Theme }}</p>
          <p>{{ item.Ddl | parseTime('{y}-{m}-{d} {h}:{i}') }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>

import { fetchcomList } from '@/api/article'
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
      'id'
    ])
  },
  created() {
    this.getcomList()
  },
  methods: {
    getcomList() {
      this.listload = true
      fetchcomList(this.id).then(response => {
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
