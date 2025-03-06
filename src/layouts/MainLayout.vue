<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="absolute-center">
          <q-icon name="savings" />
          MoneyBalls
        </div>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary"
      :width=250
      :breakpoint=767
    >
      <q-list>
        <q-item-label
          header
          class="text-white"
        >
          Tools Tasks
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'src/components/Nav/EssentialLink.vue'

const linksList = [
  {
    title: 'Home Entries',
    caption: 'Home Page',
    icon: 'chevron_right',
    link: '/'
  },
  {
    title: 'Home Entries Store',
    caption: 'Home Page Store',
    icon: 'chevron_right',
    link: '/entry'
  },
  {
    title: 'Page Entries',
    caption: 'Entries Page',
    icon: 'chevron_right',
    link: '/entries'
  },
  {
    title: 'Page Settings',
    caption: 'Settings Page',
    icon: 'chevron_right',
    link: '/settings'
  },
  {
    title: 'Dynamic Page',
    caption: 'Settings Page',
    icon: 'chevron_right',
    link: '/dynamic'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
