<script setup>
import { ref } from "vue"
import { Calendar, InfoFilled } from "@element-plus/icons-vue"
const props = defineProps({
	property: Array,
	data: Object,
})

const handleSelect = (val) => {
	props.data["cf_" + props.property.id] = val
}

const generateRules = () => {
	let rules = []
	if (props.property.is_required) {
		rules.push({
			required: true,
			message: "Please enter " + props.property.name,
		})
		if (props.property.input_type === "calendar") {
			rules.push({ type: "date", message: "Please select a valid date" })
		}
		if (props.property.input_type === "smart_ddl") {
			const getOption = (value) => {
				return props.property.smart_ddl_items.filter(
					(item) => item.id === props.data[value.fullField]
				)[0]
			}
			rules.push({
				message: "Please select a valid option",
				validator: (value) =>
					props.property.smart_ddl_items.includes(getOption(value)),
			})
		}
	}
	return rules
}
</script>

<template>
	<el-form-item :prop="'cf_' + property.id" :rules="generateRules()">
		<template #label>
			<span>
				{{ property.name }}
				<el-tooltip
					v-if="property.description"
					:content="property.description"
					placement="top"
				>
					<el-icon><InfoFilled /></el-icon>
				</el-tooltip>
			</span>
		</template>
		<el-input
			v-if="property.input_type === 'textbox' || property.input_type === 'text'"
			v-model="data['cf_' + property.id]"
			size="large"
			:type="property.input_type === 'textbox' ? 'textarea' : 'text'"
			:placeholder="property.place_holder"
		/>
		<el-select
			v-if="property.input_type === 'smart_ddl'"
			v-model="data['cf_' + property.id]"
			size="large"
			:placeholder="property.place_holder"
			@change="handleSelect"
		>
			<el-option
				v-for="item in property.smart_ddl_items"
				:key="item.name"
				:label="item.name"
				:value="item.id"
			/>
		</el-select>
		<el-date-picker
			v-if="property.input_type === 'calendar'"
			v-model="data['cf_' + property.id]"
			size="large"
			:placeholder="property.place_holder"
			:picker-options="{
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7
				},
			}"
			:clearable="false"
		/>
		<el-checkbox
			v-if="property.input_type === 'checkbox'"
			v-model="data['cf_' + property.id]"
			:value="property.default_value || false"
			size="large"
		/>
	</el-form-item>
</template>
