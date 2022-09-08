<script setup>
import { defineProps } from "vue"

defineProps({
	task: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<div class="task-manager-content">
		<div class="task-card">
			<div class="task-card-header">
				<div class="card-header-content">
					<span
						class="task-card-status"
						:class="
							task.status === 'ON HOLD' ? 'bg-gray-500' : 'bg-main-purple'
						"
						>{{ task.status }}</span
					>
					<h1 class="task-card-title">{{ task.title }}</h1>
				</div>
				<div class="flex items-start mt-1">
					<div class="task-card-popover">
						<button>
							<i class="ph-dots-three-vertical"></i>
						</button>
						<div class="task-card-popover-content">
							<button
								class="task-card-popover-btn"
								@click="$emit('removeTask', task.id)"
							>
								<i class="ph-trash"></i>
								Remove
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class="task-card-content">
				<div class="task-card-due-date">{{ task.date }}</div>
				<div class="task-card-bookmark">
					<span class="text-xs">{{ task.count }}</span>
					<i class="ph-bookmark-simple"></i>
				</div>
			</div>
		</div>
	</div>
</template>