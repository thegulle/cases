<script setup>
import { ref, reactive, defineProps, defineEmits } from "vue"
import TaskCard from "@/components/TaskCard.vue"
import draggable from "vuedraggable"

const emits = defineEmits([
	"addTask",
	"removeSection",
	"renameSection",
	"removeTask",
])
const removeTask = (taskId) => {
	emits("removeTask", props.section.id, taskId)
}
const props = defineProps({
	section: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<div class="task-manager">
		<div class="task-manager-header">
			<h1 class="task-manager-title">
				<input
					class="task-manager-title-input"
					:class="section.edit ? 'active' : ''"
					v-model="section.title"
					:readonly="!section.edit"
					@click="section.edit = true"
					@keyup.enter="
						;(section.edit = false),
							emits('renameSection', section.id, section.title)
					"
				/>
			</h1>
			<div class="task-manager-actions">
				<button @click="emits('addTask', section.id)">
					<i class="ph-plus-circle"></i>
				</button>
				<button @click="emits('removeSection', section.id)">
					<i class="ph-trash"></i>
				</button>
			</div>
		</div>
		<draggable
			v-if="section.tasks?.length"
			:list="section.tasks"
			group="section"
			item-key="id"
			:animation="200"
		>
			<template #item="{ element }">
				<TaskCard :task="element" @removeTask="removeTask" />
			</template>
		</draggable>
		<div class="flex flex-col justify-center items-center pt-6" v-else>
			<p class="text-red-500 bg-slate-200 w-80 text-center rounded-md p-2">
				No tasks yet
			</p>
			<button @click="emits('addTask', section.id)" class="add-task-btn">
				<i class="ph-plus-circle"></i> Add Task
			</button>
		</div>
	</div>
</template>