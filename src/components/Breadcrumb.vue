<template>
  <div class="pa-4">
    <span v-for="(breadcrumb, key) in breadcrumbs" :key="key">
      <button @click="breadcrumbBack(breadcrumb.path)" v-if="!breadcrumb.endpoint">
        {{ breadcrumb.text }}

        <v-icon>{{ 'mdi-chevron-right' }}</v-icon>
      </button>

      <span v-else style="color: grey">
        {{ breadcrumb.text }}
      </span>
    </span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState(['breadcrumbs'])
    },

    methods: {
      deleteBreadcrumb(prefix) {
        let breadcrumbs = this.$store.state.breadcrumbs

        let index = breadcrumbs.map(e => { 
          return e.path; 
        }).indexOf(prefix);

        let length = breadcrumbs.length - index
        
        if (index > -1) {
          breadcrumbs.splice(index + 1, length)
          breadcrumbs[index].endpoint = true
        }
      },

      blobService() {
        return window.azureV2.createBlobServiceAnonymous('https://sacmyit001.blob.core.windows.net/')
      },

      breadcrumbBack(prefix) {
        let rootFolder = 'blbmyit001'

        this.deleteBreadcrumb(prefix)

        this.blobService().listBlobsSegmentedWithPrefix(rootFolder, prefix, null, {delimiter: "/"}, (err, results, response)=> {
          if (err) {
            console.log(err)
          } else {
            this.$store.state.items = window.utils.getList(results, response)
          }
        }) 
      }
    }
  }
</script>