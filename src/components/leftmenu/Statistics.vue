<template>
  <div>
    <a-collapse accordion>
      <a-collapse-panel header="统计信息1" key="1">
        <p>{{text}}</p>
      </a-collapse-panel>
      <a-collapse-panel header="统计信息2" key="2">
        <p>{{text}}</p>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>

export default {
  data() {
    return {
      text: '狗是一种驯养的动物。它以其忠诚和忠诚而闻名，它可以在世界各地的许多家庭中成为受欢迎的客人。',
    };
  },
};
</script>
