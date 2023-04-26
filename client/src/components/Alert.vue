<template>
    <div class="alert-comp d-flex position-fixed w-100 justify-content-end top-0">
        <div class="alert d-flex mx-4"
            :class="[ this.alertData.status >199 && this.alertData.status < 300 ? 'alert-success' : 'alert-danger' ]"
            role="alert">
            <!-- <Icon name="Check"></Icon> -->
            <div>
                {{ this.alertData.message }}
            </div>
        </div>
    </div>
</template>
    
<script>
//   import Icon from "@/components/Icon"
export default {
    name: "Alert",
    // components: {Icon},
    props: ['alertData']
}
</script>
    
<style lang="scss" scoped>
.alert-comp {
    z-index: 1000;

    .alert {
        position: absolute;
        top: 10px;
        z-index: 5;
    }
}
</style>