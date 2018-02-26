<template>
  <div class="editor-wrapper">
    <v-toolbar class="purple darken-1">
      <v-toolbar-title>
        <router-link class="white--text" id="nav-title" to="app">Pair Program</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <v-chip outline color="white" slot="activator">
          <v-icon left>build</v-icon>{{getSelectedTheme}}
        </v-chip>
        <span>Active theme</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-chip class="mr-5" outline color="white" slot="activator">
          <v-icon left>code</v-icon>{{getSelectedLanguage}}
        </v-chip>
        <span>Active language</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn icon class="white" @click="toggleToolMenu" slot="activator">
          <v-icon color="purple darken-2">apps</v-icon>
        </v-btn>
        <span>Preferences</span>
      </v-tooltip>
    </v-toolbar>
    <div class="editor-container">
      <div class="menu_overlay" :class="{'show': toggle}" :aria-hidden="toggle" @click.self="hideToolMenu">
      </div>
      <div class="gb_rb" :class="{'show': toggle}" :aria-hidden="toggle"></div>
      <div class="gb_qb" :class="{'show': toggle}" :aria-hidden="toggle"></div>
      <div class="menu_a menu_b" :class="{'show': toggle}" :aria-hidden="toggle" @@click.self="showToolMenu">
        <v-card>
          <v-card-title class="gray--text">
            <v-icon large color="purple darken-1">settings</v-icon>
            <span class="ml-3">Editor Settings</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon large color="purple darken-1">widgets</v-icon>
                <span class="ml-3">Split Editor</span>
              </div>
              <v-card>
                <v-layout row wrap>
                  <v-flex xs12 sm2>
                  </v-flex>
                  <v-flex xs12 sm10>
                    <v-select
                      :items="splits"
                      item-text="name"
                      item-value="value"
                      v-model="selectedSplit"
                      autocomplete
                      hint="Split Editor"
                      persistent-hint
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon large color="purple darken-1">code</v-icon>
                <span class="ml-3">Choose Language</span>
              </div>
              <v-card>
                <v-layout row wrap>
                  <v-flex xs12 sm2>
                  </v-flex>
                  <v-flex xs12 sm10>
                    <v-select
                      :items="languages"
                      item-text="name"
                      item-value="value"
                      v-model="selectedLanguage"
                      autocomplete
                      hint="Choose Progrmming Language"
                      persistent-hint
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon large color="purple darken-1">business</v-icon>
                <span class="ml-3">Change Editor Orientation</span>
              </div>
              <v-card>
                <v-layout row wrap>
                  <v-flex xs12 sm2>
                  </v-flex>
                  <v-flex xs12 sm10>
                    <v-select
                      :items="orientations"
                      item-text="name"
                      item-value="value"
                      v-model="selectedOrientation"
                      autocomplete
                      hint="Choose Editor Orientation"
                      persistent-hint
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div slot="header">
                <v-icon large color="purple darken-1">build</v-icon>
                <span class="ml-3">Select Theme</span>
              </div>
              <v-card>
                <v-layout row wrap>
                  <v-flex xs12 sm2>
                  </v-flex>
                  <v-flex xs12 sm10>
                    <v-select
                      :items="themes"
                      item-text="name"
                      item-value="value"
                      v-model="selectedTheme"
                      autocomplete
                      hint="Choose Editor Theme"
                      persistent-hint
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card>
      </div>
      <SplitEditor
        :mode="selectedLanguage"
        :theme="selectedTheme"
        :splits="selectedSplit"
        className="editor"
        :width="width"
        :height="height"
        :orientation="selectedOrientation"
        name="editor"
        :editorProps="{$blockScrolling: 'Infinity'}"
      />
    </div>
  </div>
</template>

<script>
  import brace from 'brace';
  import { Ace as AceEditor, Split as SplitEditor } from 'vue2-brace-editor';

  import 'brace/mode/actionscript';
  import 'brace/mode/clojure';
  import 'brace/mode/coffee';
  import 'brace/mode/c_cpp';
  import 'brace/mode/csharp';
  import 'brace/mode/css';
  import 'brace/mode/django';
  import 'brace/mode/ejs';
  import 'brace/mode/elixir';
  import 'brace/mode/erlang';
  import 'brace/mode/fortran';
  import 'brace/mode/golang';
  import 'brace/mode/graphqlschema';
  import 'brace/mode/haskell';
  import 'brace/mode/html';
  import 'brace/mode/jade';
  import 'brace/mode/java';
  import 'brace/mode/javascript';
  import 'brace/mode/json';
  import 'brace/mode/jsp';
  import 'brace/mode/jsx';
  import 'brace/mode/kotlin';
  import 'brace/mode/less';
  import 'brace/mode/lisp';
  import 'brace/mode/markdown';
  import 'brace/mode/objectivec';
  import 'brace/mode/perl';
  import 'brace/mode/php';
  import 'brace/mode/python';
  import 'brace/mode/r';
  import 'brace/mode/ruby';
  import 'brace/mode/rust';
  import 'brace/mode/sass';
  import 'brace/mode/stylus';
  import 'brace/mode/swift';
  import 'brace/mode/svg';
  import 'brace/mode/tsx';
  import 'brace/mode/typescript';
  import 'brace/mode/xml';
  import 'brace/mode/yaml';


  import 'brace/theme/ambiance';
  import 'brace/theme/chaos';
  import 'brace/theme/chrome';
  import 'brace/theme/clouds';
  import 'brace/theme/monokai';
  import 'brace/theme/cobalt';
  import 'brace/theme/dawn';
  import 'brace/theme/dracula';
  import 'brace/theme/dreamweaver';
  import 'brace/theme/eclipse';
  import 'brace/theme/github';
  import 'brace/theme/gob';
  import 'brace/theme/monokai';
  import 'brace/theme/solarized_dark';
  import 'brace/theme/solarized_light';
  import 'brace/theme/terminal';
  import 'brace/theme/textmate';
  import 'brace/theme/tomorrow';
  import 'brace/theme/twilight';
  import 'brace/theme/xcode';


  export default {
    data: () => ({
      toggle: false,
      width: '100%',
      height:"100vh",
      splits: [
        {name: '1', value: 1},
        {name: '2', value: 2},
        {name: '3', value: 3},
        {name: '4', value: 4}
      ],
      themes: [
        {name: 'Ambiance', value: 'ambiance'},
        {name: 'Chaos', value: 'chaos'},
        {name: 'Chrome', value: 'chrome'},
        {name: 'Clouds', value: 'clouds'},
        {name: 'Monokai', value: 'monokai'},
        {name: 'Cobalt', value: 'cobalt'},
        {name: 'Dawn', value: 'dawn'},
        {name: 'Dracula', value: 'dracula'},
        {name: 'DreamWeaver', value: 'dreamweaver'},
        {name: 'Eclipse', value: 'eclipse'},
        {name: 'GitHub', value: 'github'},
        {name: 'Gob', value: 'gob'},
        {name: 'Monokai', value: 'monokai'},
        {name: 'Solarized Dark', value: 'solarized_dark'},
        {name: 'Solarized Light', value: 'solarized_light'},
        {name: 'Terminal', value: 'terminal'},
        {name: 'TextMate', value: 'textmate'},
        {name: 'Tomorrow', value: 'tomorrow'},
        {name: 'Twilight', value: 'twilight'},
        {name: 'Xcode', value: 'xcode'},
      ],
      orientations: [
        {name: 'Beside', value: 'beside'},
        {name: 'Below', value: 'below'}
      ],
      languages: [
        {name: 'ActionScript', value: 'actionscript'},
        {name: 'Clojure', value: 'clojure'},
        {name: 'CoffeeScript', value: 'coffee'},
        {name: 'C/C++', value: 'c_cpp'},
        {name: 'C#', value: 'csharp'},
        {name: 'CSS', value: 'css'},
        {name: 'Django', value: 'django'},
        {name: 'EJS', value: 'ejs'},
        {name: 'Elixir', value: 'elixir'},
        {name: 'Erlang', value: 'erlang'},
        {name: 'Fortran', value: 'fortran'},
        {name: 'Golang', value: 'golang'},
        {name: 'GraphqlSchema', value: 'graphqlschema'},
        {name: 'Haskell', value: 'haskell'},
        {name: 'HTML', value: 'html'},
        {name: 'Jade', value: 'jade'},
        {name: 'Java', value: 'java'},
        {name: 'JavaScript', value: 'javascript'},
        {name: 'JSON', value: 'json'},
        {name: 'JSX', value: 'jsx'},
        {name: 'Kotlin', value: 'kotlin'},
        {name: 'LESS', value: 'less'},
        {name: 'Lisp', value: 'lisp'},
        {name: 'Markdown', value: 'markdown'},
        {name: 'Objective-C', value: 'objectivec'},
        {name: 'Perl', value: 'perl'},
        {name: 'PHP', value: 'php'},
        {name: 'Python', value: 'python'},
        {name: 'R', value: 'r'},
        {name: 'Ruby', value: 'ruby'},
        {name: 'Rust', value: 'rust'},
        {name: 'Sass', value: 'sass'},
        {name: 'Stylus', value: 'stylus'},
        {name: 'Swift', value: 'swift'},
        {name: 'SVG', value: 'svg'},
        {name: 'TSX', value: 'tsx'},
        {name: 'TypeScript', value: 'typescript'},
        {name: 'XML', value: 'xml'},
        {name: 'YAML', value: 'yaml'},
      ],
      selectedSplit: 2,
      selectedTheme: 'monokai',
      selectedLanguage: 'javascript',
      selectedOrientation: 'beside',
    }),
    components: {
      AceEditor,
      SplitEditor,
    },
    computed: {
      getSelectedLanguage() {
        let selected = '';
        this.languages.map((language, index) => {
          if(language.value === this.selectedLanguage) {
            selected = language.name;
          }
        });
        return selected;
      },
      getSelectedTheme() {
        let selected = '';
        this.themes.map((theme, index) => {
          if(theme.value === this.selectedTheme) {
            selected = theme.name;
          }
        });
        return selected;
      }
    },
    mounted() {
    },
    methods:{
      toggleToolMenu() {
        this.toggle = !this.toggle;
      },
      showToolMenu() {
        this.toggle = true;
      },
      hideToolMenu() {
        this.toggle = false;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import './Dashboard';
</style>
