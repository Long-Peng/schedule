<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" :panelGroup="panelGroup" />
    <!--
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    -->
    <div class="chart-container">
      <chart height="100%" width="60%" :analyselist="analyse"/>
      <todo-list/>
    </div>
<!--    <el-row :gutter="8">-->
<!--      <el-col>-->
<!--        <div class="chart-container">-->
<!--          <chart height="100%" width="100%"/>-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px";>-->
<!--        <todo-list/>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-row :gutter="8">-->
<!--      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">-->
<!--        <transaction-table />-->
<!--      </el-col>-->
<!--      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
<!--        <todo-list />-->
<!--      </el-col>-->
<!--      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
<!--        <box-card />-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>

import PanelGroup from './components/PanelGroup'
// import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'
import Chart from '@/components/Charts/MixChart'
import { fetchAnalyse } from '@/api/article'
import { mapGetters } from 'vuex'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    Chart,
    TodoList,
    ...mapGetters([
      'id'
    ])
  },
  data() {
    return {
      loadanalyse: true,
      count_task: 0,
      count_finish: 0,
      analyse: [],
      panelGroup: {},
      lineChartData: lineChartData.newVisitis
    }
  },
  created() {
    this.getAnalyse()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    getAnalyse() {
      this.loadanalyse = true
      fetchAnalyse(this.id).then(response => {
        this.count_task = response.data.count_task
        this.count_finish = response.data.count_finish
        this.analyse = response.data.analyse
        this.panelGroup = {
          total_task: this.count_task,
          total_finish: this.count_finish,
          tasknum: response.data.analyse[11].TaskNum,
          finishnum: response.data.analyse[11].FinishNum
        }

        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container{
  position: relative;
  width: 100%;
  max-height: 650px!important;
  height: calc(100vh - 84px);
  margin: 0 0;
  display: flex;
}
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
