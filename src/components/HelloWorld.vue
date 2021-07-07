<template>
  <div class="hello">
    <input type="text" v-model="first.value" />
    <p>Short than 5</p>
    <p>{{ first.isValid }}</p>
    <input type="text" v-model="second.value" />
    <p>Short than 5</p>
    <p>{{ second.isValid }}</p>
  </div>
  <div>
    <p>Short than 5</p>
    {{ isValid }}
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref } from "vue"
import { Validator, Field, useForm, Form } from "../composables/useField"

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const shorterThan5: Validator<string> = (x) => {
      if (x && x.trim().length < 5) {
        return true
      }
      return false
    }

    function isLongerThan(otherField: Field<string>): Validator<string> {
      return (thisVal: string) => thisVal.length > otherField.value.length
    }
    console.log(isLongerThan)

    function isLongerThan2(otherVal: Ref<string>): Validator<string> {
      return (thisVal: string) => thisVal.length > otherVal.value.length
    }
    console.log(isLongerThan2)

    // const { isValid, value, ...field } = useField({
    //   value: "",
    //   validators: [shorterThan5],
    // })

    // const { isValid: otherIsValid, value: otherVal } = useField({
    //   value: "",
    //   validators: [shorterThan5],
    // })
    const f1: Field<string> = { value: "", validators: [shorterThan5], name: "first" }
    const f2: Field<string> = { value: "", validators: [shorterThan5], name: "second" }
    const form: Form<string> = { fields: [f1, f2] }
    const {
      isValid,
      fields: {first, second},
    } = useForm<string>(form)
    return { isValid, first, second }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
