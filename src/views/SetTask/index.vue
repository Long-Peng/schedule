<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.theme" placeholder="按内容" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.priority" placeholder="按优先级" clearable style="width: 140px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.subject" placeholder="按类型" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索任务
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        创建任务
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        导出任务
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="任务编号" prop="taskId" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.taskId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="制定日期" prop="createAt" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createAt | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预定完成日期" prop="ddl" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ddl | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务内容" prop="theme" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.theme }}</span>
          <el-tag>{{ row.subject | typeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="优先级" prop="priority" width="80px">
        <template slot-scope="{row}">
          <svg-icon v-for="n in + row.priority" :key="n" icon-class="star" class="meta-item__icon" />
        </template>
      </el-table-column>
      <el-table-column label="提醒频率" prop="remind" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remind }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="finished" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.finished | statusFilter">
            {{ row.finished }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.finished!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="类型" prop="subject">
          <el-select v-model="temp.subject" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="制定时间" prop="createAt">
          <el-date-picker v-model="temp.createAt" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="完成时间" prop="ddl">
          <el-date-picker v-model="temp.ddl" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="内容" prop="theme">
          <el-input v-model="temp.theme" />
        </el-form-item>
        <el-form-item label="提醒频率" prop="remind">
          <el-select v-model="temp.remind" class="filter-item" placeholder="Please select">
            <el-option v-for="item in frequencyOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="temp.finished" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="优先级">
          <el-rate v-model="temp.priority" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          关闭
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createTask, updateTask, deleteTask } from '@/api/task'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'Math', display_name: '数学' },
  { key: 'English', display_name: '英语' },
  { key: 'Politics', display_name: '政治' },
  { key: 'Subject', display_name: '专业课' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(isFinished) {
      const statusMap = {
        已完成: 'success',
        未完成: 'info'
      }
      return statusMap[isFinished]
    },
    typeFilter(subject) {
      return calendarTypeKeyValue[subject]
    }
  },
  data() {
    return {
      list: null,
      tableKey: 0,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        priority: undefined,
        theme: undefined,
        subject: undefined,
        sort: '+taskId'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID升序排列', key: '+taskId' }, { label: 'ID降序排列', key: '-taskId' }],
      statusOptions: ['已完成', '未完成'],
      frequencyOptions: ['0', '1', '2', '3', '4', '5'],
      temp: {
        taskId: undefined,
        priority: 1,
        createAt: new Date(),
        ddl: new Date(),
        theme: '',
        subject: '',
        finished: '未完成',
        remind: 0
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        subject: [{ required: true, message: '必须填写任务类型', trigger: 'change' }],
        theme: [{ required: true, message: '必须填写任务内容', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].finished) {
            this.list[i].finished = '已完成'
          } else {
            this.list[i].finished = '未完成'
          }
        }
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'taskId') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+taskId'
      } else {
        this.listQuery.sort = '-taskId'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        taskId: undefined,
        priority: 1,
        createAt: new Date(),
        ddl: new Date(),
        theme: '',
        finished: '未完成',
        subject: '',
        remind: 0
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.taskId = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.remind = '否'
          createTask(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.createAt = new Date(this.temp.createAt)
      this.temp.ddl = new Date(this.temp.ddl)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.createAt = +new Date(tempData.createAt) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          tempData.ddl = +new Date(tempData.ddl)
          updateTask(tempData).then(() => {
            const index = this.list.findIndex(v => v.taskId === this.temp.taskId)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      deleteTask(this.index)
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['任务编号', '创建时间', '预定完成时间', '任务内容', '学科', '优先级', '提醒频率', '状态']
        const filterVal = ['taskId', 'createAt', 'ddl', 'theme', 'subject', 'priority', 'remind', 'isFinished']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '学习任务表'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'createAt' || j === 'ddl') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
