<template>
  <div class="editor-wrapper">
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="editor-container">
      <div class="editor-sidebar" :class="toggleSideBar">
        <h1>Side Bar</h1>
      </div>
      <div class="editor-content-section" :class="toggleSideBar">
        <SplitEditor
          :mode="selectedLanguage"
          theme="monokai"
          :splits="2"
          className="editor"
          :width="width"
          :height="height"
          :orientation="selectedOrientation"
          name="editor"
          :editorProps="{$blockScrolling: 'Infinity'}"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import brace from 'brace';
  import { Ace as AceEditor, Split as SplitEditor } from 'vue2-brace-editor';

  import 'brace/mode/java';
  import 'brace/mode//javascript';

  import 'brace/theme/monokai';

  export default {
    data: () => ({
      drawer: false,
      width: '100%',
      height:"100vh",
      languages: ['java', 'javascript'],
      selectedLanguage: 'java',
      orientations: ['beside', 'below'],
      selectedOrientation: 'beside',
    }),
    components: {
      AceEditor,
      SplitEditor,
    },
    computed: {
    },
    mounted() {
    },
    methods:{
      toggleSidebar() {
        this.drawer = !this.drawer;
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import './Dashboard';
</style>
