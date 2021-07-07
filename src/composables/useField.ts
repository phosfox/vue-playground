import { computed, reactive, ref } from "vue"

export type Validator<T> = (x: T) => boolean

export interface Field<T> {
  name: string
  value: T
  validators: Validator<T>[]
}

export function useField<T>({ value, validators, name }: Field<T>) {
  const _value = ref<T>(value)
  const _validators = ref<Validator<T>[]>(validators)

  const isValid = computed(() =>
    _validators.value.every((validate: Validator<T>) =>
      validate(_value.value as T)
    )
  )
  return { isValid, value: _value, name }
}

export interface Form<T> {
  fields: Field<T>[]
}

export function useForm<T>(form: Form<T>) {
  const _fields = reactive(
    Object.fromEntries(
      form.fields.map((field) => [field.name, useField(field)])
    )
  )

  const _isValid = computed(() =>
    Object.entries(_fields).every(([key, field]) => {
      return field.isValid
    })
  )

  return { isValid: _isValid, fields: _fields }
}
