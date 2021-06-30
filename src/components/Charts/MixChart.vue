<template>
  <div v-if="analyselist[11].FinishNum" :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    analyselist: {
      type: Array,
      default: () => []
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      week_finish: [
        {
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          TaskNum: 1917,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          TaskNum: 1776,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          TaskNum: 1776,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        },
        {
          TaskNum: 709,
          FinishNum: 327,
          FinishRate: 0.5
        }
      ]
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const xData = (function() {
        const data = []
        for (let i = 1; i < 13; i++) {
          data.push('第' + i + '天')
        }
        return data
      }())
      this.chart.setOption({
        backgroundColor: '#90979c',
        title: {
          text: '近两周任务进度',
          x: '20',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          }

        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }
        ],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: '完成任务',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            this.analyselist[0].FinishNum,
            this.analyselist[1].FinishNum,
            this.analyselist[2].FinishNum,
            this.analyselist[3].FinishNum,
            this.analyselist[4].FinishNum,
            this.analyselist[5].FinishNum,
            this.analyselist[6].FinishNum,
            this.analyselist[7].FinishNum,
            this.analyselist[8].FinishNum,
            this.analyselist[9].FinishNum,
            this.analyselist[10].FinishNum,
            this.analyselist[11].FinishNum
          ]
        },
        {
          name: '未完成任务',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            this.analyselist[0].TaskNum - this.analyselist[0].FinishNum,
            this.analyselist[1].TaskNum - this.analyselist[1].FinishNum,
            this.analyselist[2].TaskNum - this.analyselist[2].FinishNum,
            this.analyselist[3].TaskNum - this.analyselist[3].FinishNum,
            this.analyselist[4].TaskNum - this.analyselist[4].FinishNum,
            this.analyselist[5].TaskNum - this.analyselist[5].FinishNum,
            this.analyselist[6].TaskNum - this.analyselist[6].FinishNum,
            this.analyselist[7].TaskNum - this.analyselist[7].FinishNum,
            this.analyselist[8].TaskNum - this.analyselist[8].FinishNum,
            this.analyselist[9].TaskNum - this.analyselist[9].FinishNum,
            this.analyselist[10].TaskNum - this.analyselist[10].FinishNum,
            this.analyselist[11].TaskNum - this.analyselist[11].FinishNum
          ]
        }, {
          name: '完成率', type: 'line', stack: 'total', symbolSize: 10, symbol: 'circle', itemStyle: { normal: { color: 'rgba(252,230,48,1)', barBorderRadius: 0, label: { show: true, position: 'top', formatter(p) { return p.value > 0 ? p.value : '' } }}},
          data: [
            this.analyselist[0].FinishRate * 100,
            this.analyselist[1].FinishRate * 100,
            this.analyselist[2].FinishRate * 100,
            this.analyselist[3].FinishRate * 100,
            this.analyselist[4].FinishRate * 100,
            this.analyselist[5].FinishRate * 100,
            this.analyselist[6].FinishRate * 100,
            this.analyselist[7].FinishRate * 100,
            this.analyselist[8].FinishRate * 100,
            this.analyselist[9].FinishRate * 100,
            this.analyselist[10].FinishRate * 100,
            this.analyselist[11].FinishRate * 100
          ] }
        ]
      })
    }
  }
}
</script>
