<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
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
            this.week_finish[0].FinishNum,
            this.week_finish[1].FinishNum,
            this.week_finish[2].FinishNum,
            this.week_finish[3].FinishNum,
            this.week_finish[4].FinishNum,
            this.week_finish[5].FinishNum,
            this.week_finish[6].FinishNum,
            this.week_finish[7].FinishNum,
            this.week_finish[8].FinishNum,
            this.week_finish[9].FinishNum,
            this.week_finish[10].FinishNum,
            this.week_finish[11].FinishNum
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
              this.week_finish[0].TaskNum - this.week_finish[0].FinishNum,
              this.week_finish[1].TaskNum - this.week_finish[1].FinishNum,
              this.week_finish[2].TaskNum - this.week_finish[2].FinishNum,
              this.week_finish[3].TaskNum - this.week_finish[3].FinishNum,
              this.week_finish[4].TaskNum - this.week_finish[4].FinishNum,
              this.week_finish[5].TaskNum - this.week_finish[5].FinishNum,
              this.week_finish[6].TaskNum - this.week_finish[6].FinishNum,
              this.week_finish[7].TaskNum - this.week_finish[7].FinishNum,
              this.week_finish[8].TaskNum - this.week_finish[8].FinishNum,
              this.week_finish[9].TaskNum - this.week_finish[9].FinishNum,
              this.week_finish[10].TaskNum - this.week_finish[10].FinishNum,
              this.week_finish[11].TaskNum - this.week_finish[11].FinishNum
            ]
          }, {
            name: '完成率',
            type: 'line',
            stack: 'total',
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: 'rgba(252,230,48,1)',
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
              this.week_finish[0].FinishRate * 100,
              this.week_finish[1].FinishRate * 100,
              this.week_finish[2].FinishRate * 100,
              this.week_finish[3].FinishRate * 100,
              this.week_finish[4].FinishRate * 100,
              this.week_finish[5].FinishRate * 100,
              this.week_finish[6].FinishRate * 100,
              this.week_finish[7].FinishRate * 100,
              this.week_finish[8].FinishRate * 100,
              this.week_finish[9].FinishRate * 100,
              this.week_finish[10].FinishRate * 100,
              this.week_finish[11].FinishRate * 100
            ]
          }
        ]
      })
    }
  }
}
</script>
