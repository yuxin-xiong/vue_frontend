<template>
  <div class="Footer">
    <p>{{ msg }}</p>
  </div>
</template>
<script>
  export default {
    name: "Footer",
    data() {
      return {
        msg: "Copyright 2023",
      };
    },
  };
</script>
<style scoped>
.Footer{
  border-radius: 5px;
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: -50%;
}

p {
  color: #21b3b9;
  text-align: center;
  margin: 30px auto;
  font-size: 1.1em;
}
</style>


