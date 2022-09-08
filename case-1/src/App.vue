<script setup>
import { ref, reactive } from "vue"
import draggable from "vuedraggable"
import { useTaskStore } from "@/store/TaskStore"
import TaskManager from "@/components/TaskManager.vue"

const taskStore = useTaskStore()
</script>

<template>
	<div class="container flex mt-10">
		<draggable
			:list="taskStore.sectionList"
			item-key="id"
			group="section"
			class="task-manager-container"
			:animation="200"
		>
			<template #item="{ element }">
				<div>
					<TaskManager
						:section="element"
						@addTask="taskStore.addTask"
						@removeTask="taskStore.removeTask"
						@removeSection="taskStore.removeSection"
						@renameSection="taskStore.renameSection"
					/>
				</div>
			</template>
		</draggable>
		<div class="manager-creator ml-3">
			<button class="manager-creator-btn" @click="taskStore.addSection">
				<i class="ph-plus"></i> Add Section
			</button>
		</div>
	</div>
</template>
