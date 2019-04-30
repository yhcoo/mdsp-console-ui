<template>
  <div>
    <div class="search-container">
      <div class="search-inp-container">
        <el-input @keyup.enter.native="handleSearch" placeholder="" v-model="listQuery.username" clearable>
        </el-input>
      </div>
      <el-button class="search-btn" type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
      <el-button class="search-btn" type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
      <el-button class="search-btn" :autofocus="true" icon="el-icon-refresh" @click="refreshHandle">刷新</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column width="200px" align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="手机">
        <template slot-scope="scope">
          <span>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column width="600px" align="center" label="备注">
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作">
        <template slot-scope="scope">
        <el-button v-if="intent_order_update" size="small" type="success" @click="handleUpdate(scope.row)">编辑
        </el-button>
        <el-button v-if="intent_order_delete" size="small" type="danger" @click="handleDelete(scope.row)">删除
        </el-button>
      </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.current" :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    pageIntentOrderApi,
    addIntentOrderApi,
    getIntentOrderApi,
    delIntentOrderApi,
    updateIntentOrderApi
  } from '@/api/website/intentOrder'
  import { mapGetters } from 'vuex'
  export default {
    name: 'intentOrder',
    data() {
      return {
        form: {
          id: '', /** 主键*/
          name: '', /** 姓名*/
          phone: '', /** 手机*/
          remark: '', /** 备注*/
          createTime: '', /** 创建时间*/
          modifyTime: '', /** 更新时间*/
          delFlag: '' /** 是否删除 1-删除，0-未删除*/
        },
        rules: {
          id: [
            {
              required: true,
              message: '请输入主键',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ], //
          name: [
            {
              required: true,
              message: '请输入姓名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ], //
          phone: [
            {
              required: true,
              message: '请输入手机',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ], //
          remark: [
            {
              required: true,
              message: '请输入备注',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ], //
          createTime: [
            {
              required: true,
              message: '请输入创建时间',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ], //
          modifyTime: [
            {
              required: true,
              message: '请输入更新时间',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ], //
          delFlag: [
            {
              required: true,
              message: '请输入是否删除 1-删除，0-未删除',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ] //
        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          current: 1,
          size: 20,
          name: undefined
        },
        dialogFormVisible: false,
        dialogStatus: '',
        intent_order_update: false,
        intent_order_delete: false,
        intent_order_add: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    mounted() {
      this.getList()
      this.intent_order_add = this.permissions['intent_order_add']
      this.intent_order_update = this.permissions['intent_order_update']
      this.intent_order_delete = this.permissions['intent_order_delete']
      this.intent_order_select = this.permissions['intent_order_select']
    },
    computed: {
      ...mapGetters(['permissions'])
    },
    methods: {
      getList() {
        this.listLoading = true
        pageIntentOrderApi(this.listQuery)
          .then(response => {
            this.list = response.data.records
            this.total = response.data.total
            this.listLoading = false
          })
      },
      handleSearch() {
        this.listQuery.current = 1
        this.getList()
      },
      refreshHandle() {
        this.listQuery.current = 1
        this.listQuery.size = 10
        this.listQuery.username = ''
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.size = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.current = val
        this.getList()
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(row) {
        getIntentOrderApi(row.id)
          .then(response => {
            this.form = response.data
            this.dialogFormVisible = true
            this.dialogStatus = 'update'
          })
      },
      handleDelete(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            delIntentOrderApi(row.id)
              .then(() => {
                this.$notify({
                  title: '成功',
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
                const index = this.list.indexOf(row)
                this.list.splice(index, 1)
              })
          })
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            addIntentOrderApi(this.form).then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
            updateIntentOrderApi(this.form).then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            return false
          }
        })
      },
      resetTemp() {
        this.form = {
        }
      }
    }
  }
</script>
