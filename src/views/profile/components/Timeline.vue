<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.Subject }}</h4>
          <p>{{ item.Theme }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>

export default {
  data() {
    return {
      listload: true,
      timeline: [
        {
          Del: '2019/4/20',
          Subject: 'Update Github template',
          Theme: 'PanJiaChen committed 2019/4/20 20:46'
        },
        {
          Del: '2019/4/21',
          Subject: 'Update Github template',
          Theme: 'PanJiaChen committed 2019/4/21 20:46'
        },
        {
          Del: '2019/4/22',
          Subject: 'Build Template',
          Theme: 'PanJiaChen committed 2019/4/22 20:46'
        },
        {
          Del: '2019/4/23',
          Subject: 'Release New Version',
          Theme: 'PanJiaChen committed 2019/4/23 20:46'
        },
        {
          Del: '2019/4/22',
          Subject: 'Build Template',
          Theme: 'PanJiaChen committed 2019/4/22 20:46'
        },
        {
          Del: '2019/4/22',
          Subject: 'Build Template',
          Theme: 'PanJiaChen committed 2019/4/22 20:46'
        },
        {
          Del: '2019/4/22',
          Subject: 'Build Template',
          Theme: 'PanJiaChen committed 2019/4/22 20:46'
        },
        {
          Del: '2019/4/22',
          Subject: 'Build Template',
          Theme: 'PanJiaChen committed 2019/4/22 20:46'
        }
      ]
    }
  }
  // created() {
  //   this.getcomList()
  // },
  // methods: {
  //   async getcomList() {
  //     this.listload = true
  //     const { data } =await fetchcomList(this.id)
  //     const  items = data.items
  //     this.timeline = items.map(v => {
  //       this.$set(v, 'edit', false)
  //       v.originalTitle = v.title
  //       return v
  //     })
  //     this.listload = false
  //   }
  // }
}
</script>
