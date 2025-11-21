<template>
  <div hidden>
    <svg>
        <symbol id="open-eye" viewBox="0 0 20 20">
        <path d="M12.5003 10C12.5003 11.3807 11.381 12.5 10.0003 12.5C8.61957 12.5 7.50029 11.3807 7.50029 10C7.50029 8.61931 8.61957 7.50002 10.0003 7.50002C11.381 7.50002 12.5003 8.61931 12.5003 10Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.04883 9.99999C3.11072 6.61908 6.26929 4.16669 10.0007 4.16669C13.732 4.16669 16.8906 6.61912 17.9525 10.0001C16.8906 13.381 13.732 15.8334 10.0007 15.8334C6.26929 15.8334 3.11071 13.3809 2.04883 9.99999Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
      <symbol id="close-eye" viewBox="0 0 24 24">
        <path d="M3 3L6.58916 6.58916M21 21L17.4112 17.4112M13.8749 18.8246C13.2677 18.9398 12.6411 19 12.0005 19C7.52281 19 3.73251 16.0571 2.45825 12C2.80515 10.8955 3.33851 9.87361 4.02143 8.97118M9.87868 9.87868C10.4216 9.33579 11.1716 9 12 9C13.6569 9 15 10.3431 15 12C15 12.8284 14.6642 13.5784 14.1213 14.1213M9.87868 9.87868L14.1213 14.1213M9.87868 9.87868L6.58916 6.58916M14.1213 14.1213L6.58916 6.58916M14.1213 14.1213L17.4112 17.4112M6.58916 6.58916C8.14898 5.58354 10.0066 5 12.0004 5C16.4781 5 20.2684 7.94291 21.5426 12C20.8357 14.2507 19.3545 16.1585 17.4112 17.4112" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
      <symbol id="loading" viewBox="0 0 24 24">
        <path d="M12 2V6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 18V22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.93005 4.93005L7.76005 7.76005" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.24 16.24L19.07 19.07" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12H6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 12H22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.93005 19.07L7.76005 16.24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.24 7.76005L19.07 4.93005" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
      <symbol id="close" viewBox="0 0 24 24">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.21967 6.21967C6.51256 5.92678 6.98744 5.92678 7.28033 6.21967L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4874 18.0732 17.0126 18.0732 16.7197 17.7803L6.21967 7.28033C5.92678 6.98744 5.92678 6.51256 6.21967 6.21967Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.7803 6.21967C18.0732 6.51256 18.0732 6.98744 17.7803 7.28033L7.28033 17.7803C6.98744 18.0732 6.51256 18.0732 6.21967 17.7803C5.92678 17.4874 5.92678 17.0126 6.21967 16.7197L16.7197 6.21967C17.0126 5.92678 17.4874 5.92678 17.7803 6.21967Z"/>
      </symbol>
      <symbol id="check" viewBox="0 0 24 24">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9939 5.43558C20.3056 5.70834 20.3372 6.18216 20.0644 6.49389L9.56443 18.4939C9.42774 18.6501 9.23242 18.7427 9.02496 18.7496C8.8175 18.7565 8.61645 18.6771 8.46967 18.5303L3.96967 14.0303C3.67678 13.7374 3.67678 13.2626 3.96967 12.9697C4.26256 12.6768 4.73744 12.6768 5.03033 12.9697L8.96347 16.9028L18.9356 5.50613C19.2083 5.1944 19.6822 5.16282 19.9939 5.43558Z"/>
      </symbol>
    </svg>
  </div>
</template>
<script setup lang="ts">
  defineOptions({
    name: 'IconsComponent'
  })
</script>