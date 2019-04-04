<template>
    <div>
        404错误
    </div>
</template>

<script>
export default {
    name:'error',
    created(){
        setTimeout(() => {
            this.$router.push('/login')
        }, 1000);
    }
}
</script>

<style>

</style>
