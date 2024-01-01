<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, Field, Form } from 'vee-validate'

import { taskFormSchema } from '@/schemas'
import kanbanStore from '@/stores/kanbanStore'
import { ACTIONS, type Column, type Task } from '@/types'

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

const props = defineProps<{
  columnId: Column['columnId']
  task?: Task
  action: ACTIONS
}>()

const taskForm = ref()
let validationSchema = toTypedSchema(taskFormSchema)

onMounted(() => {
  if (props.action === ACTIONS.UPDATE_TASK) {
    taskForm.value.setFieldValue('name', props.task?.name)
    taskForm.value.setFieldValue('description', props.task?.description)
    taskForm.value.setFieldValue('dueDate', props.task?.dueDate)
    taskForm.value.setFieldValue('doDate', props.task?.doDate)
    taskForm.value.setFieldValue('status', props.task?.status)
  }
})

function onSubmit(values: any) {
  if (props.action === ACTIONS.ADD_TASK) {
    kanbanStore.addTaskToColumn(props.columnId, {
      name: values.name,
      description: values.description,
      dueDate: values.dueDate,
      doDate: values.doDate,
      status: values.status
    })
  } else if (props.action === ACTIONS.UPDATE_TASK && props.task) {
    let updatedTask = {
      taskId: props.task.taskId,
      name: values.name,
      description: values.description,
      dueDate: values.dueDate,
      doDate: values.doDate,
      status: values.status
    }

    kanbanStore.updateTask(props.columnId, updatedTask)
  }
  emit('close-modal')
}
</script>

<template>
  <Form
    ref="taskForm"
    :validation-schema="validationSchema"
    @submit="onSubmit"
    class="flex flex-col gap-2"
  >
    <label for="name">Name</label>
    <Field id="name" type="text" name="name" class="p-2 border-2 rounded-sm border-gray-300" />
    <ErrorMessage name="name" class="text-red-700" />
    <label for="description">Description</label>
    <Field
      id="description"
      type="text"
      name="description"
      class="p-2 border-2 rounded-sm border-gray-300"
    />
    <ErrorMessage name="description" class="text-red-700" />
    <label for="dueDate">Due Date</label>
    <Field
      id="dueDate"
      type="date"
      name="dueDate"
      class="p-2 border-2 rounded-sm border-gray-300"
    />
    <ErrorMessage name="dueDate" class="text-red-700" />

    <label for="doDate">Do Date</label>
    <Field id="doDate" type="date" name="doDate" class="p-2 border-2 rounded-sm border-gray-300" />
    <ErrorMessage name="doDate" class="text-red-700" />
    <label for="status">Status</label>
    <Field name="status" as="select" id="status">
      <option value="Not started">Not started</option>
      <option value="In Progress">In Progress</option>
      <option value="Review">Review</option>
      <option value="Done">Done</option>
    </Field>
    <ErrorMessage name="status" class="text-red-700" />
    <button type="submit" class="mt-3">Submit</button>
  </Form>
</template>
