<template>
  <div id="logo">
    <div class="components-container board">
      <Kanban :key="1" :list="math" :group="group" class="kanban m1" header-text="数学" />
      <Kanban :key="2" :list="english" :group="group" class="kanban m2" header-text="英语" />
      <Kanban :key="3" :list="politics" :group="group" class="kanban m3" header-text="政治" />
      <Kanban :key="4" :list="subject" :group="group" class="kanban m4" header-text="专业课" />
      <el-col :span="1">
        <img :src="FightGif2" width="300" height="300" alt="">
      </el-col>
      <el-col :span="8">
        <img :src="FightGif" width="313" height="300" alt="">
      </el-col>
    </div>
  </div>
</template>
<script>
import Kanban from '@/components/Kanban'
import FightGif from '@/assets/Fight.gif'
import FightGif2 from '@/assets/Fight2.gif'
import { fetchTheme } from '@/api/task-recommend'
export default {
  name: 'DragKanbanDemo',
  components: {
    Kanban
  },
  data() {
    return {
      group: 'mission',
      param: '',
      math: [
        { content: '' },
        { content: '' },
        { content: '' }
      ],
      english: [
        { content: '' },
        { content: '' },
        { content: '' }
      ],
      politics: [
        { content: '' },
        { content: '' },
        { content: '' }
      ],
      subject: [
        { content: '' },
        { content: '' },
        { content: '' }
      ],
      FightGif2: FightGif2,
      FightGif: FightGif,
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList: function() {
      this.listLoading = true
      fetchTheme(this.param).then(response => {
        for (let i = 0; i < response.data.total; i++) {
          this.math[i].content = response.data.items
          this.english[i].content = response.data.items
          this.politics[i].content = response.data.items
          this.subject[i].content = response.data.items
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
<style lang="scss">
.board {
  width: 1250px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
}
.kanban {
  &.m1 {
    .board-column-header {
      background: #4A9FF9;
    }
  }
  &.m2 {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.m3 {
    .board-column-header {
      background: #2ac06d;
    }
  }
  &.m4 {
    .board-column-header {
      background: #9f5f9f;
    }
  }
}
#logo{
  background: url("../../assets/bg4.jpeg");
  background-size: 100% 100%;
  position: fixed;
  height: 150%;
  width: 100%
}

</style>
