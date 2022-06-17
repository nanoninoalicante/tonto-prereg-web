<template>
  <div class="alerts">
    <teleport to="body">
      <section class="fixed bottom-0 left-0 z-10 w-full py-4">
        <div class="container mx-auto px-8">
          <TransitionGroup name="list" tag="div" mode="in-out">
            <Alert v-for="alert in filteredAlerts" :key="alert.id" :alert="alert" />
          </TransitionGroup>
        </div>
      </section>
    </teleport>
  </div>
</template>
<script setup>
import { useAlerts } from "~/composables/alerts";
import Alert from "./Alert";
import { computed } from "vue";

const { alerts } = useAlerts();
const filteredAlerts = computed(() => {
  return useUniqBy(alerts.value, (a) => a.id);
});
</script>
