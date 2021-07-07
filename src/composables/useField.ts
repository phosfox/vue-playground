import { computed, reactive, ref } from "vue"

export type Validator<T> = (x: T) => boolean

export interface Field<T> {
  value: T
  validators: Validator<T>[]
}


export function useField<T>({ value, validators }: Field<T>) {
  const _value = ref<T>(value)
  const _validators = ref<Validator<T>[]>(validators)

  const isValid = computed(() =>
    _validators.value.every((validate: Validator<T>) =>
      validate(_value.value as T)
    )
  )
  return { isValid, value: _value }
}

export interface Form<T> {
    fields: Field<T>[]
}

export function useForm<T>(form: Form<T>) {
  const _fields = reactive(form.fields.map(useField))
  const _isValid = computed(() =>
    _fields.every((field) => {
      return field.isValid
    })
  )

  return { isValid: _isValid, fields: _fields }
}
