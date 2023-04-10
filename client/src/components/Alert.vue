<template>
    <div class="d-flex position-absolute w-100 justify-content-end top-0 alert">
        <div class="alert d-flex mx-4"
            :class="{ 'alert-success': alertData.status === 200, 'alert-danger': alertData.status !== 200 }"
            role="alert">
            <!-- <Icon name="Check"></Icon> -->
            <div>
                {{ alertData.message }}
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
    props: {
        alertData: Object
    },
    setup(props) {
        var alertData = reactive(props.alertData)
        return {
            alertData
        }
    },
}
</script>

<style lang="scss" scoped>
.alert {
    z-index: 1000;
}
</style>