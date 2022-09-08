<script setup>
import { onMounted, ref, defineEmits } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const emits = defineEmits(["deleteBlog"])
defineProps({
	list: Array,
})

const handleEdit = (id) => {
	router.push({ name: "update-blog", params: { id } })
}

const handleDelete = (id) => {
	ElMessageBox.confirm(
		"This will permanently delete the blog. Continue?",
		"Warning",
		{
			confirmButtonText: "OK",
			cancelButtonText: "Cancel",
			type: "warning",
		}
	).then(() => {
		emits("deleteBlog", id)
	})
}
</script>

<template>
	<el-card style="margin-top: 10px">
		<h1>Blog List</h1>
		<el-divider></el-divider>
		<el-table :data="list" style="min-width: 100%">
			<el-table-column fixed label="Name">
				<template #default="{ row }">
					<span>{{ row.name }}</span>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="Operations" width="120">
				<template #default="{ row }">
					<el-button
						link
						type="primary"
						size="small"
						@click="handleEdit(row.id)"
						>Edit</el-button
					>
					<el-button @click="handleDelete(row.id)">Delete</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>