import Vue from 'vue'
import {GetGameAPI} from "./util/api"

declare module 'vue/types/vue' {
    interface Vue {
      $GetGameAPI: function();
    }
  }