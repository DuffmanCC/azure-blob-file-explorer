<template>
  <tr style="cursor: pointer;">
    <td>
      <v-icon>{{ files[item.type] }}</v-icon>
    </td>

    <td v-if="item.type == 'folder'" @click="openFolder(item.path)">
      {{ item.name }}
    </td>

    <td v-else>
      <span>{{ item.name }}</span>
    </td> 

    <td>{{ item.size }}</td>

    <td v-if="item.type != 'folder'">
      <a :href="item.path" target="_blank" style="text-decoration: none">
        <v-icon>mdi-download</v-icon>
      </a>
    </td>

    <td v-else></td>
  </tr>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    props: ['item'],

    computed: {
      ...mapState(['files'])
    },

    methods: {
      createBreadcrumb(prefix) {
        let breadcrumbs = this.$store.state.breadcrumbs

        breadcrumbs.push({
          text: window.utils.getFolderName(prefix),
          path: prefix,
          endpoint: true
        })

        // set previous element endpoint to false
        breadcrumbs[breadcrumbs.length - 2].endpoint = false
      },

      blobService() {
        return window.azureV2.createBlobServiceAnonymous(window.store_account)
      },

      openFolder(prefix) {
        let promise = new Promise((resolve) => {
          this.blobService().listBlobsSegmentedWithPrefix(window.rootFolder, prefix, null, {delimiter: "/"}, (err, results, response)=> {
            if (err) {
              console.log(err)
            } else {
              this.$store.state.items = window.utils.getList(results, response)
            }

            resolve()
          })          
        });

        promise.then(() => {
          this.createBreadcrumb(prefix)
        })
      }
    }
  }
</script>