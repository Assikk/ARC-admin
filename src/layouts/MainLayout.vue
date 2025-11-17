<template>
	<div class="min-h-screen flex">
		<div>
			navbar
		</div>
		<div class="flex-1">
			<div>
				HEADER
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>
<script setup lang="ts">
defineOptions({
	name: 'MainLayout'
})
</script>