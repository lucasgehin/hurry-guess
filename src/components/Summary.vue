<template>
  <div>
    Hello

    <logo></logo>

    <router-link to="/demo">Demo</router-link>
  </div>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  components: {
    Logo
  }
}
</script>
