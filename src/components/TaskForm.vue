<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, Field, Form } from 'vee-validate'

import { taskFormSchema } from '@/schemas'
import kanbanStore from '@/stores/kanbanStore'
import doneTasksStore from '@/stores/doneTasksStore'
import { ACTIONS, type Column, type Task } from '@/types'

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

const props = defineProps<{
  columnId?: Column['columnId']
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
  let columnId = props.columnId
  let origStatus = props.task?.status
  if (columnId === undefined) {
    columnId = values.doDate
  }
  if (props.action === ACTIONS.ADD_TASK && columnId !== undefined) {
    kanbanStore.addTaskToColumn(columnId, {
      name: values.name,
      description: values.description,
      dueDate: values.dueDate,
      doDate: values.doDate,
      status: values.status
    })
  } else if (props.action === ACTIONS.UPDATE_TASK && props.task && columnId !== undefined) {
    let updatedTask = {
      taskId: props.task.taskId,
      name: values.name,
      description: values.description,
      dueDate: values.dueDate,
      doDate: values.doDate,
      status: values.status
    }
    if (origStatus !== 'Done') {
      kanbanStore.updateTask(columnId, updatedTask)
    } else {
      doneTasksStore.updateTask(updatedTask.taskId, updatedTask)
    }
    // move Task if the doDate and the columnId (Date) are not the same anymore
    if (columnId !== updatedTask.doDate) {
      kanbanStore.moveTask(updatedTask.taskId, updatedTask.doDate)
    }
    if (updatedTask.status === 'Done') {
      doneTasksStore.handleDoneTask(updatedTask)
      kanbanStore.deleteTask(updatedTask.doDate, updatedTask.taskId)
    }
    if (origStatus === 'Done' && updatedTask.status !== 'Done') {
      kanbanStore.addTaskToColumn(columnId, {
        name: values.name,
        description: values.description,
        dueDate: values.dueDate,
        doDate: values.doDate,
        status: values.status
      })
      doneTasksStore.deleteTask(updatedTask.taskId)
    }
  }
  emit('close-modal')
}
</script>

<!--TODO: it is kind of unnecessary for the user to have to enter the do Date when they add the task e.g. to the column Monday, January 1st. Because the Column and the due date are always the same. It would only make sense for adding a future task.
Solution A): only allow adding of tasks at one point, not per column. Then the doDate would need to be entered and the task would need to get added to the respective column automatically.
Solution B): preset doDate or hide doDate for for form in columns. Could be difficult with form error handling though if the same form is used.
Solution C): make a ColumnTaskForm and make a GeneralTaskForm. DoDate is present in GeneralTaskForm but not in ColumnTaskForm.-->
<template>
  <Form
    ref="taskForm"
    :validation-schema="validationSchema"
    @submit="onSubmit"
    class="task-form"
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



<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Styles for form elements */
.task-form label, .task-form Field, .task-form ErrorMessage {
  width: 100%; /* Ensure full width */
}

.task-form Field, .task-form select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.task-form button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  .task-form {
    padding: 0.5rem; /* Adjust padding for mobile devices */
  }

  .task-form Field, .task-form select, .task-form button {
    font-size: 0.875rem; /* Adjust font size for easier readability */
  }

  /* Additional mobile-specific styles can be added here */
}

/* Error message styling */
.text-red-700 {
  color: #dc2626;
}
</style>
