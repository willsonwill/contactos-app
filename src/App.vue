<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>
<script>
import Layout from "./layouts/Layout.vue";
import LayoutFull from "./layouts/LayoutFull.vue";
export default {
  components: {
    Layout,
    LayoutFull,
  },
  computed: {
    layout() {
      if (this.$route.meta.layout == "full") return LayoutFull;
      return Layout;
    },
  },
};
</script>
