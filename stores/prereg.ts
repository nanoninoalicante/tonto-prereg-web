import { defineStore } from "pinia";

const usePreregStore = defineStore("prereg", {
  state: () => {
    return {
      handle: ""
    };
  },
});
