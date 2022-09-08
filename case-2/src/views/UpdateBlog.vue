<script setup>
import axios from "axios"
import { useRoute, useRouter } from "vue-router"
import { reactive, onMounted } from "vue"
import FormCreator from "@/components/FormCreator.vue"

const route = useRoute()
const router = useRouter()
const form = reactive({ data: [] })
const formData = reactive({ data: [] })

const getForm = () => {
	axios.get("http://localhost:3000/form").then((res) => {
		form.data = res.data
	})
}

const getBlogDetail = () => {
	axios.get("http://localhost:3000/formData/" + route.params.id).then((res) => {
		formData.data = res.data
	})
}

const saveForm = (data, validateForm) => {
	validateForm.validate((valid) => {
		if (valid) {
			axios
				.put("http://localhost:3000/formData/" + route.params.id, data)
				.then((res) => {
					ElMessage.success("Form saved successfully")
					router.push({ name: "create" })
				})
		} else {
			ElMessage.error("Please fill the form correctly")
		}
	})
}

onMounted(() => {
	getBlogDetail()
	getForm()
})
</script>

<template>
	<el-main>
		<FormCreator
			:form="form.data"
			:formData="formData.data"
			type="Update Blog"
			@saveForm="saveForm"
		/>
	</el-main>
</template>
