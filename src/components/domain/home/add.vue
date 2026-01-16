<template>
    <div class="flex flex-col gap-6 w-3/4">
      <h1 class="text-2xl font-bold">
        Добавление нового объявления
      </h1>
      <div class="grid grid-cols-4 gap-6">
        <Input label="Название" id="title"
        placeholder="Введите название"v-model="form.title"
        :error="errors.title ? true : false" :error-msg="errors.title"></Input>
        <Select placeholder="Выберите тип" id="propertyTypeId" v-model="form.propertyTypeId"
        :list="PROPERTY_TYPES" text-list="label" value-list="value" label="Тип"
        :error="errors.propertyTypeId ? true : false" :error-msg="errors.propertyTypeId"></Select>
        <Select placeholder="Выберите тип" id="propertyTypeId" v-model="form.propertyListingType"
        :list="PROPERTY_LISTING_TYPES" text-list="label" value-list="value" label="Тип сделки"
        :error="errors.propertyListingType ? true : false" :error-msg="errors.propertyListingType"></Select>
        <div class="flex gap-3">
          <Input id="price" label="Цена"
          placeholder="Введите цену" v-model="form.price"
          :error="errors.price ? true : false" :error-msg="errors.price"></Input>
          <Select class="w-[200px]" id="currency" v-model="form.currency" label="Валюта"
          :list="PROPERTY_CURRENCIES" text-list="label" value-list="value"
          :error="errors.currency ? true : false"></Select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-2 grid grid-cols-4 gap-3">
              <Input class="col-span-2" label="Улица" 
              id="street" v-model="form.street"
              :error="errors.street ? true : false" :error-msg="errors.street"></Input>
              <Input label="Дом" id="houseNumber" v-model="form.houseNumber"
              :error="errors.houseNumber ? true : false" :error-msg="errors.houseNumber"></Input>
              <Input label="Кв." id="apartmentNumber" v-model="form.apartmentNumber"
              :error="errors.apartmentNumber ? true : false" :error-msg="errors.apartmentNumber"></Input>
            </div>
            <Input label="Год завершения" id="yearBuilt"
            placeholder="Введите год" v-model="form.yearBuilt"
            :error="errors.yearBuilt ? true : false" :error-msg="errors.yearBuilt"></Input>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <Toggle label="Имеется ли ипотека?" v-model="form.isMortgage"></Toggle>
            <Toggle label="Построен?" v-model="form.isFeatured"></Toggle>
            <Toggle label="Разрешен ли обмен?" v-model="form.isExchange"></Toggle>
            <Toggle label="Имеется ли план?" v-model="form.hasPlan"></Toggle>
            <Toggle label="Имеет ли тех. паспорт?" v-model="form.hasTechnicalPassport"></Toggle>
          </div>
        </div>
        <Textarea label="Описание" id="description" v-model="form.description"></Textarea>
      </div>
      <LMap style="height: 500px" :zoom="13" :center="center"
        @click="onMapClick" >
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <LMarker v-if="marker" :lat-lng="marker" />
      </LMap>
      <div class="flex gap-4">
        <Button @click="add">
          Добавить
        </Button>
        <Button color="outlined" @click="$router.push('/')">
          Выйти
        </Button>
      </div>
    </div>
</template>
<script setup lang="ts">
import Input from '@/components/ui/inputs/default.vue'
import Select from '@/components/ui/selects/default.vue'
import Textarea from '@/components/ui/textarea.vue';
import Button from '@/components/ui/buttons/default.vue'
import { reactive, watch, ref } from 'vue';
import { addPropertySchema, type addPropertyType } from '@/interfaces/property.interface';
import { validateForm } from '@/utils/validateForm'
import { PROPERTY_TYPES } from '@/constants/properties/propertyTypes';
import { PROPERTY_LISTING_TYPES } from '@/constants/properties/propertyListingTypes';
import { PROPERTY_CURRENCIES } from '@/constants/properties/propertyCurrencies';
import Toggle from '@/components/ui/toggle.vue';
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
defineOptions({
  name: 'AddPropertyComponent'
})


const center = ref<[number, number]>([38.5598, 68.7870])
const marker = ref<{ lat: number; lng: number } | null>(null)

const form = reactive<addPropertyType>({
  title: '',
  propertyTypeId: '',
  district: '1',
  propertyListingType: '',
  price: 0,
  currency: 'TJS',
  street: '',
  houseNumber: '',
  apartmentNumber: '',
  yearBuilt: 2026,
  description: '',
  isMortgage: true,
  isFeatured: true,
  isExchange: true,
  hasPlan: true,
  hasTechnicalPassport: true,
  latitude: 0,
  longitude: 0
})
const errors = reactive<Record<string, any>>({})
const isWatchForm = ref<boolean>(false)

const onMapClick = (e: any) => {
  form.latitude = e.latlng.lat
  form.longitude = e.latlng.lng
  console.log(form);
  marker.value = e.latlng
}
const add = async () => {
  const isValid = validateForm(addPropertySchema, form, errors)
  isWatchForm.value = true
  if(!isValid) return
  console.log(form);
}


watch(form, () => {
  if (isWatchForm.value) {
    validateForm(addPropertySchema, form, errors)
  }
}, { deep: true })
</script>