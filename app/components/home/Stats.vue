<script setup lang="ts">
const { stats, status } = useGithubStats()
</script>

<template>
  <section
    class="
      py-12
      md:py-20
    "
  >
    <div
      class="
        mx-auto max-w-6xl space-y-8 px-6
        md:space-y-12
      "
    >
      <div class="relative z-10 mx-auto max-w-xl space-y-4 text-center">
        <h2
          class="text-3xl font-semibold"
        >
          {{ $t('home.stats.title') }}
        </h2>
        <p class="text-muted-foreground">
          {{ $t('home.stats.subtitle') }}
        </p>
      </div>

      <div
        class="
          grid gap-12 divide-y
          md:grid-cols-2 md:gap-2 md:divide-x md:divide-y-0
        "
      >
        <div class="space-y-4 text-center">
          <Skeleton
            v-if="status === 'pending'"
            class="mx-auto h-12 w-24"
          />
          <div
            v-else
            class="text-5xl font-bold tabular-nums"
          >
            {{ stats.stars }}
          </div>
          <p class="text-muted-foreground">
            {{ $t('home.stats.stars') }}
          </p>
        </div>
        <div
          class="
            space-y-4 pt-12 text-center
            md:pt-0
          "
        >
          <Skeleton
            v-if="status === 'pending'"
            class="mx-auto h-12 w-24"
          />
          <div
            v-else
            class="text-5xl font-bold tabular-nums"
          >
            {{ stats.forks }}
          </div>
          <p class="text-muted-foreground">
            {{ $t('home.stats.forks') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
