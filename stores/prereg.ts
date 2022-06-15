import { defineStore } from "pinia";

export const usePreregStore = defineStore("prereg", {
  state: () => {
    return {
      handle: ""
    };
  },
});
