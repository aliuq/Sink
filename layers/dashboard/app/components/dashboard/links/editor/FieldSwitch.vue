<script setup lang="ts">
import type { AnyFieldApi } from '@/types'

defineProps<{
  field: AnyFieldApi
  label: string
  description?: string
}>()
</script>

<template>
  <Field>
    <div class="flex items-center justify-between">
      <div class="space-y-0.5">
        <FieldLabel :for="field.name">
          {{ label }}
        </FieldLabel>
        <p v-if="description" class="text-xs text-muted-foreground">
          {{ description }}
        </p>
      </div>
      <Switch
        :id="field.name"
        :model-value="field.state.value"
        @update:model-value="field.handleChange"
      />
    </div>
  </Field>
</template>
