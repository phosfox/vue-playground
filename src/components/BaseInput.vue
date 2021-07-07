<template>
  <label>
    {{ label }}
    <input v-bind="$attrs" @click="onClick"/>
    {{log($attrs)}}
  </label>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "BaseInput",
  props: { label: { type: String } },
  setup() {
      const log = (a) => console.log(a);
      const onClick = () => console.log("clack")
      return { log, onClick}
  }
});
</script>

<style>
</style>