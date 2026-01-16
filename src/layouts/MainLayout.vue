<template>
	<div class="min-h-screen h-full flex">
		<Sidebar/>
		<div class="flex-1 flex flex-col">
			<Header></Header>
			<router-view class="flex-1 p-6"></router-view>
		</div>
	</div>
</template>
<script setup lang="ts">
import Sidebar from '@/components/ui/sidebar.vue';
import Header from '@/components/ui/header.vue'


defineOptions({
	name: 'MainLayout'
})
</script>