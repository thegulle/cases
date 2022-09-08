<script setup>
import axios from "axios"
import { reactive, onMounted } from "vue"
import FormCreator from "@/components/FormCreator.vue"
import BlogList from "@/components/BlogList.vue"
import { ElMessage } from "element-plus"

const form = reactive({ data: [] })
const formData = reactive({ data: [] })
const blogList = reactive({ data: [] })

const getForm = () => {
	axios.get("http://localhost:3000/form").then((res) => {
		form.data = res.data
		createFormData()
	})
}

const getBlogList = () => {
	axios.get("http://localhost:3000/formData").then((res) => {
		blogList.data = res.data.map((item) => {
			let values = Object.values(item)
			return {
				...item,
				name: values[0],
			}
		})
	})
}

const createFormData = () => {
	form.data.forEach((item) => {
		formData.data = {
			...formData.data,
			["cf_" + item.id]: item.default_value,
		}
	})
}

const saveForm = (data, validateForm) => {
	validateForm.validate((valid) => {
		if (valid) {
			axios.post("http://localhost:3000/formData", data).then((res) => {
				ElMessage.success("Form saved successfully")
				getBlogList()
			})
		} else {
			ElMessage.error("Please fill the form correctly")
		}
	})
}

const deleteBlog = (id) => {
	axios.delete("http://localhost:3000/formData/" + id).then(() => {
		ElMessage.success("Blog deleted successfully")
		getBlogList()
	})
}

onMounted(() => {
	getForm()
	getBlogList()
})
</script>

<template>
	<el-main>
		<FormCreator
			:form="form.data"
			:formData="formData.data"
			type="Create Blog"
			@saveForm="saveForm"
		/>
		<BlogList :list="blogList.data" @deleteBlog="deleteBlog" />
	</el-main>
</template>
