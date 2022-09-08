<script setup>
import { onMounted, ref } from "vue"
import FormInput from "@/components/FormInput.vue"

const validateForm = ref()
const props = defineProps({
	form: Array,
	formData: Object,
	type: String,
})
</script>

<template>
	<el-card class="form-card">
		<h1>{{ type }}</h1>
		<el-divider />
		<el-row :span="24">
			<el-form
				class="form-container"
				ref="validateForm"
				label-position="top"
				:model="formData"
			>
				<el-row :span="24" :gutter="20" class="form-content">
					<!-- css_style alanı 2 ile çarpılır çünkü bu grid sisteminde ekran 24'e bölünür -->
					<el-col
						v-for="model in form"
						:key="model.id"
						:span="parseInt(model.css_style) * 2"
					>
						<FormInput :property="model" :data="formData" />
					</el-col>
					<el-col :span="24">
						<el-button
							size="large"
							type="primary"
							@click="$emit('saveForm', formData, validateForm)"
							>Save</el-button
						>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
	</el-card>
</template>