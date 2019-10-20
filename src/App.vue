<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col xs12>
          <v-card
            class="mx-auto pa-5"
            max-width="1000"
          >
            <h2 class="mb-5">“NR Box Folder” Block</h2>

            <v-text-field
              v-model="search"
              label="Search files and folders"
              outlined
              clearable
              @keypress="searchFiles()"
              @click:clear="clearSearch()"   
            >
            </v-text-field>

            <v-divider></v-divider>

            <Breadcrumb></Breadcrumb>

            <v-divider></v-divider>

            <v-simple-table fixed-header height="300px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th style="padding: 0" width="30"></th>
                    <th class="text-left">Name</th>
                    <th class="text-left" width="100">Size</th>
                    <th class="text-left" width="100">Options</th>
                  </tr>
                </thead>

                <tbody>
                  <FileRow v-for="(item, key) in items" :key="key" :item="item"></FileRow>       
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import FileRow from './components/FileRow';
  import Breadcrumb from './components/Breadcrumb'

  export default {
    components: { FileRow, Breadcrumb },

    data() {
      return {
        search: ''
      }
    },

    computed: {
      ...mapState(['items', 'itemsAll', 'breadcrumbs'])
    },

    methods: {
      blobService() {
        return window.azureV2.createBlobServiceAnonymous(window.store_account)
      },

      clearSearch() {
        this.$store.state.items = this.$store.state.itemsCache

        this.$store.state.breadcrumbs = []

        this.$store.state.breadcrumbs.push({
          text: window.rootFolder,
          endpoint: true
        })
      },

      searchFiles() {
        if (this.search.length > 2) {
          let itemsAll = this.$store.state.itemsAll

          this.$store.state.items = itemsAll.filter(item => {
            return item.fullName.toLowerCase().includes(
              this.search.toLowerCase()
            )
          })

          this.$store.state.breadcrumbs = []

          this.$store.state.breadcrumbs.push({
            text: window.rootFolder,
            endpoint: false
          })

          this.$store.state.breadcrumbs.push({
            text: 'Search Results',
            endpoint: true
          })
        }
      },

      ...mapMutations([]),

      ...mapActions([])
    },

    mounted() {
      this.$store.state.breadcrumbs.push({
        text: window.rootFolder,
        endpoint: true
      })

      this.blobService().listBlobsSegmentedWithPrefix(window.rootFolder, null, null, {delimiter: "/"}, (err, results, response) => {
        if (err) {
          console.log(err)
        } else {
          this.$store.state.items = window.utils.getList(results, response)
          this.$store.state.itemsCache = this.$store.state.items
        }
      })

      this.blobService().listBlobsSegmented(window.rootFolder, null, {}, (err, results, response) => {
        if (err) {
          console.log(err)
        } else {
          this.$store.state.itemsAll = window.utils.getList(results, response)
        }
      })
    }
  } 
</script>