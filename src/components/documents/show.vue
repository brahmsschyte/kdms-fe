<template>
  <LayoutMain>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/document' }">Document</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.params.id }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container>
      <el-row :gutter="20">
        <el-col :span="24">
          <span style="float: right;">Today is Saturday, 21 November 2020</span>
          <span>Hi {{ $store.state.user.user.name }}!</span>
          <el-divider></el-divider>
          <h2>Display Document {{ $route.params.id }}</h2>
          <el-row :gutter="20">
            <el-col :span="6">
              <h4>Document Information</h4>
              <div class="grid-content bg-purple-light">
                <el-row :gutter="20">
                  <el-col :span="6">Name</el-col>
                  <el-col :span="18">{{ form.fileName }}</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">Size</el-col>
                  <el-col :span="18">{{ form.fileSize }}</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">Total Page</el-col>
                  <el-col :span="18">{{ pageCount }}</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">Status</el-col>
                  <el-col :span="18">{{ form.status }}</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">Physical Location</el-col>
                  <el-col :span="18">{{ form.physicalLocation }}</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">Author</el-col>
                  <el-col :span="18">{{ form.author }}</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">Created At</el-col>
                  <el-col :span="18">{{ form.createdAt }}</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">Last Modified</el-col>
                  <el-col :span="18">{{ form.updatedAt }}</el-col>
                </el-row>
                <el-button-group>
                  <el-button type="primary" icon="el-icon-printer" @click="$refs.myPdfComponent.print()">Print</el-button>
                  <el-button type="primary" icon="el-icon-edit" @click="handleEdit()">Edit</el-button>
                  <el-button type="primary" icon="el-icon-collection" @click="confirmArchive()">Archive</el-button>
                </el-button-group>
              </div>

              <h4>Document Metadata</h4>
              <div class="grid-content bg-purple-light">
                <el-row :gutter="20" v-for="(metadata) in form.template.metadata" v-bind:key="metadata.id">
                  <el-col :span="6">{{ metadata.label }}</el-col>
                  <el-col :span="18">{{ metadata.value }}</el-col>
                </el-row>
              </div>

              <h4>Document Workflow</h4>
              <div class="">
                <el-timeline :reverse="false">
                  <el-timeline-item
                    v-for="(step, index) in form.template.workflow.steps"
                    :key="index"
                    :icon="step.icon"
                    :type="step.type"
                    :color="step.color">
                    <h4>{{ step.action }}</h4>
                    <p>{{ step.userId }}</p>
                    <p>{{ step.updatedAt }}</p>
                  </el-timeline-item>
                </el-timeline>
                <el-button-group>
                  <el-button type="success" icon="el-icon-check" @click="handleApprove()">Approve</el-button>
                  <el-button type="danger" icon="el-icon-close" @click="confirmReject()">Reject</el-button>
                </el-button-group>
              </div>
            </el-col>
            <el-col :span="18">
              <el-link type="primary" icon="el-icon-download" href="./otago618131.pdf" style="float: right;" download>Download</el-link>
              <h4>Document Preview</h4>
              <pdf ref="myPdfComponent" src="./otago618131.pdf"
                @num-pages="pageCount = $event"
                @page-loaded="currentPage = $event"></pdf>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-container>
    <el-dialog
      title="Dialog Box"
      :visible.sync="archiveDialogVisible"
      width="30%">
      <span>Confirm document {{ form.fileName }} archival?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="archiveDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleArchive()">Confirm Archival</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Dialog Box"
      :visible.sync="rejectDialogVisible"
      width="30%">
      <span>Please fill reason for document {{ form.fileName }} rejection?</span>
      <span>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Please input reason here..."
          v-model="textarea">
        </el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleReject()">Confirm Rejection</el-button>
      </span>
    </el-dialog>
  </LayoutMain>
</template>

<script>
// @ is an alias to /src
import pdf from 'vue-pdf'
import LayoutMain from '@/components/layouts/Main.vue';

export default {
  data() {
    return {
      archiveDialogVisible: false,
      rejectDialogVisible: false,
      textarea: '',
      documentSearch: '',
      form: {
        id: '1',
        fileName: 'invoice01.pdf',
        fileSize: '2.2 MB',
        status: 'Reviewed',
        physicalLocation: 'Room 1 Shelf 2C',
        template: {
          id: '1',
          name: 'Invoice Form',
          description: 'Invoice Form',
          metadata: [{
            id: '2',
            name: 'PO Amount',
            description: 'PO Amount',
            model: 'poAmount',
            label: 'PO Amount',
            inputType: 'number',
            required: true,
            author: 'Jhon Smith',
            createdAt: '2020-11-14 00:00:00',
            updatedAt: '2020-11-14 00:00:00',
            value: '200000000'
          }, {
            id: '3',
            name: 'GR/IR Amount',
            description: 'GR/IR Amount',
            model: 'grirAmount',
            label: 'GR/IR Amount',
            inputType: 'number',
            required: true,
            author: 'Jhon Smith',
            createdAt: '2020-11-14 00:00:00',
            updatedAt: '2020-11-14 00:00:00',
            value: '50000000'
          }],
          workflow: {
            id: '1',
            name: 'Invoice Verification',
            steps: [{
              id: 1,
              action: 'review',
              userId: 'Jhon Smith',
              status: 'approved',
              type: 'success',
              icon: 'el-icon-check',
              updatedAt: '2020-11-15 00:00:00',
            },{
              id: 2,
              action: 'approve',
              userId: 'Jane Doe',
              updatedAt: '',
            },{
              id: 3,
              action: 'notify',
              userId: 'Peter Parker',
              updatedAt: '',
            }],
            author: 'Jhon Smith',
            createdAt: '2020-11-14 00:00:00',
            updatedAt: '2020-11-14 00:00:00'
          },
          author: 'Jhon Smith',
          createdAt: '2020-11-14 00:00:00',
          updatedAt: '2020-11-14 00:00:00'
        },
        author: 'John Smith',
        createdAt: '2020-11-14 00:00:00',
        updatedAt: '2020-11-14 00:00:00'
      },
      currentPage: 0,
      pageCount: 0,
      loading: false
    };
  },
  name: 'home',
  components: {
    pdf,
    LayoutMain,
  },
  created() {
  },
  methods: {
    onSubmit() {
      this.$message({
          message: 'Congrats, document created successfully.',
          type: 'success'
        });
    },
    handleEdit() {
      this.$router.push(`/document/${this.form.id}/edit`);
    },
    handleApprove() {
      this.$message({
          message: `Congrats, document ${this.form.fileName} approved successfully.`,
          type: 'success'
        });
    },
    handleArchive() {
      this.archiveDialogVisible = false;
      this.$message({
          message: `Congrats, document ${this.form.fileName} archived successfully.`,
          type: 'success'
        });
    },
    confirmArchive() {
      this.archiveDialogVisible = true;
    },
    handleReject() {
      this.rejectDialogVisible = false;
      this.$message({
          message: `Congrats, document ${this.form.fileName} rejected successfully.`,
          type: 'success'
        });
    },
    confirmReject() {
      this.rejectDialogVisible = true;
    },
  }
};
</script>

<style scoped>
  body {
    height: 100%;
    width: 100%;
  }

  .el-container {
    margin: 20px;
    padding: 20px;
    /* text-align: center; */
    display: block;
    border: 1px solid #eee;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple-light {
    background: #e5e9f2;
    padding: 10px;
  }
</style>
