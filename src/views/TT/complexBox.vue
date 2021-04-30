<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item">
      </el-input>
      <el-select v-model="value" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" clearable style="width: 120px" class="filter-item">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search">查找</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">添加</el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-download">导出</el-button>
      <el-checkbox class="filter-item" style="margin-left:15px;">审核人</el-checkbox>
    </div>
    <el-table el-tableborder fit highlight-current-row :data="product" style="width: 100%;">
      <el-table-column sortable="custom" align="center" width="180" prop="crm_CODE" label="缓释品代码">
      </el-table-column>
      <el-table-column sortable="custom" align="center" width="180" prop="crm_TYPE" label="缓释品类型">
      </el-table-column>
      <el-table-column sortable="custom" align="center" width="180" prop="ccy_CODE" label="币种代码">
      </el-table-column>
      <el-table-column sortable="custom" align="center" width="180" prop="crm_VALUE_ORI" label="缓释品原币价值">
      </el-table-column>
      <el-table-column sortable="custom" align="center" width="180" prop="crm_CP_TYPE" label="缓释品交易对手类型">
      </el-table-column>
      <el-table-column sortable="custom" align="center" width="180" prop="crm_CPC" label="缓释品交易对手所属国家">
      </el-table-column>
      <el-table-column sortable="custom" align="center" width="180" prop="crm_ST_RATING" label="债券短期评级">
      </el-table-column>
      <el-table-column sortable="custom" align="center" width="180" prop="crm_LT_RATING" label="债券长期评级">
      </el-table-column>
      <el-table-column sortable="custom" align="center" width="180" prop="start_DT" label="开始日期">
      </el-table-column>
      <el-table-column sortable="custom" align="center" width="180" prop="mat_DT" label="结束日期">
      </el-table-column>
      <el-table-column align="center" width="230" label="操作" class-name="fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="putRequest(scope.row)">编辑</el-button>
          <el-button type="success" size="mini">草稿</el-button>
          <el-button type="danger" size="mini" @click="deleteRequest(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Form -->

    <el-dialog title="新增" :visible.sync="dialogFormVisible" width="1200px">
      <el-form :model="newProduct" :label-position="right" label-width="160px">
        <el-row>
          <el-col span="8">
            <el-form-item label="缓释品类型" required="true">
              <el-select v-model="newProduct.CRM_TYPE">
                <el-option v-for="item in crmTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="开始日期" required="true">
              <el-date-picker v-model="newProduct.start_date" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="结束日期" required="true">
              <el-date-picker v-model="newProduct.end_date" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="币种代码" required="true">
              <el-select v-model="newProduct.CCY_CODE" placeholder="请选择币种代码">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="缓释品原币价值" required="true">
              <el-input v-model="newProduct.CRM_VALUE_ORI" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="交易对手类型" required="true">
              <el-select v-model="newProduct.CRM_CP_TYPE" placeholder="请选择交易对手类型">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="交易对手所属国家" required="true">
              <el-select v-model="newProduct.CRM_CPC" placeholder="请选择交易对手所属国家">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="交易对手评级">
              <el-select v-model="newProduct.CRM_CP_RATING" placeholder="请选择交易对手评级">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="债券短期评级">
              <el-select v-model="newProduct.CRM_ST_RATING" placeholder="请选择债券短期评级">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="债券长期评级">
              <el-select v-model="newProduct.CRM_LT_RATING" placeholder="请选择债券长期评级">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="更改" :visible.sync="dialogFormVisible1" width="1200px">
      <el-form :model="newProduct1" :label-position="right" label-width="160px">
        <el-row>
          <el-col span="8">
            <el-form-item label="缓释品类型" required="true">
              <el-select v-model="newProduct1.CRM_TYPE">
                <el-option v-for="item in crmTypes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="开始日期" required="true">
              <el-date-picker v-model="newProduct1.start_date" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="结束日期" required="true">
              <el-date-picker v-model="newProduct1.end_date" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="币种代码" required="true">
              <el-select v-model="newProduct1.CCY_CODE" placeholder="请选择币种代码">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="缓释品原币价值" required="true">
              <el-input v-model="newProduct1.CRM_VALUE_ORI" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="交易对手类型" required="true">
              <el-select v-model="newProduct1.CRM_CP_TYPE" placeholder="请选择交易对手类型">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="交易对手所属国家" required="true">
              <el-select v-model="newProduct1.CRM_CPC" placeholder="请选择交易对手所属国家">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="交易对手评级">
              <el-select v-model="newProduct1.CRM_CP_RATING" placeholder="请选择交易对手评级">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="8">
            <el-form-item label="债券短期评级">
              <el-select v-model="newProduct1.CRM_ST_RATING" placeholder="请选择债券短期评级">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="债券长期评级">
              <el-select v-model="newProduct1.CRM_LT_RATING" placeholder="请选择债券长期评级">
                <el-option v-for="item in ccyCodes" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="upData()">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                   :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
  </div>
</template>

<script>
import { deleteRequest, putRequest} from '../../api/bank'

const axios = require('axios')
export default {

  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      product: [],
      ccyCodes: [{
        value: '人民币(CNY)',
        label: '人民币(CNY)'
      }, {
        value: '美元(USD)',
        label: '美元(USD)'
      }, {
        value: '俄罗斯卢布(RUB)',
        label: '俄罗斯卢布(RUB)'
      }, {
        value: '港币(HKD)',
        label: '港币(HKD)'
      }],
      crmTypes: [{
        value: '银行承兑汇票(非特别授信)(ZY0301006)',
        label: '银行承兑汇票(非特别授信)(ZY0301006)'
      }, {
        value: '质押-现金(CASH_CLAT)',
        label: '质押-现金(CASH_CLAT)'
      }],
      value: '',
      dialogFormVisible: false,
      dialogFormVisible1: false,
      newProduct1: {
        CRM_CODE: '',
        start_date: '',
        end_date: '',
        CRM_TYPE: '',
        CCY_CODE: '',
        CRM_VALUE_ORI: '',
        CRM_CP_TYPE: '',
        CRM_CPC: '',
        CRM_CP_RATING: '',
        CRM_ST_RATING: '',
        CRM_LT_RATING: ''
      },
      newProduct: [{
        start_date: '',
        end_date: '',
        CRM_TYPE: '',
        CCY_CODE: '',
        CRM_VALUE_ORI: '',
        CRM_CP_TYPE: '',
        CRM_CPC: '',
        CRM_CP_RATING: '',
        CRM_ST_RATING: '',
        CRM_LT_RATING: ''
      }],
      formLabelWidth: '200px',
      crm_CODE: '',
      // eslint-disable-next-line no-dupe-keys,vue/no-dupe-keys
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    putRequest(data){
      this.dialogFormVisible1 = true
      this.newProduct1.CRM_CODE = data.crm_CODE
      console.log(data.crm_CODE)
    },
    deleteRequest(data){
      console.log(data.crm_CODE)
      this.$confirm('此操作将永久删除【' + data.crm_CODE + '】, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用delete请求
        deleteRequest("/product/"+data.crm_CODE).then(res=>{
          if(res){
            // this.initAllProduct()
            axios.get('http://localhost:8888/getAll').then(response => (this.product = response.data))
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    upData(){
      this.$axios.put('/product', {
        start_date: this.newProduct1.start_date,
        end_date: this.newProduct1.end_date,
        CRM_CODE: this.newProduct1.CRM_CODE,
        CRM_TYPE: this.newProduct1.CRM_TYPE,
        CCY_CODE: this.newProduct1.CCY_CODE,
        CRM_VALUE_ORI: this.newProduct1.CRM_VALUE_ORI,
        CRM_CP_TYPE: this.newProduct1.CRM_CP_TYPE,
        CRM_CPC: this.newProduct1.CRM_CPC,
        CRM_CP_RATING: this.newProduct1.CRM_CP_RATING,
        CRM_ST_RATING: this.newProduct1.CRM_ST_RATING,
        CRM_LT_RATING: this.newProduct1.CRM_LT_RATING
      })
        .then(res => {
          if (res) {
            console.log('success')
            axios.get('http://localhost:8888/getAll').then(response => (this.product = response.data))
            this.dialogFormVisible1=false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            axios.get('http://localhost:8888/getAll').then(response => (this.product = response.data))
            console.log('fail')
            this.$message({
              message: '修改失败',
              type: 'fail'
            })
          }
        })
    },
    createData() {
      this.$axios.post('/addProduct', {
        start_date: this.newProduct.start_date,
        end_date: this.newProduct.end_date,
        CRM_TYPE: this.newProduct.CRM_TYPE,
        CCY_CODE: this.newProduct.CCY_CODE,
        CRM_VALUE_ORI: this.newProduct.CRM_VALUE_ORI,
        CRM_CP_TYPE: this.newProduct.CRM_CP_TYPE,
        CRM_CPC: this.newProduct.CRM_CPC,
        CRM_CP_RATING: this.newProduct.CRM_CP_RATING,
        CRM_ST_RATING: this.newProduct.CRM_ST_RATING,
        CRM_LT_RATING: this.newProduct.CRM_LT_RATING
      })
        .then(res => {
          if (res) {
            console.log('success')
            axios.get('http://localhost:8888/getAll').then(response => (this.product = response.data))
            this.dialogFormVisible=false
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          } else {
            axios.get('http://localhost:8888/getAll').then(response => (this.product = response.data))
            console.log('fail')
            this.$message({
              message: '添加失败',
              type: 'success'
            })
          }
        })
    }
  },
  mounted() {
    axios.get('http://localhost:8888/getAll').then(response => (this.product = response.data))
  }
}
</script>

<style>
</style>
