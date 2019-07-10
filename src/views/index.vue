<template>
    <div class="index">
        <h1>
            <img src="../images/logo.png">
        </h1>
        <h2>
            <p>Hello, Welcome to your Vue Project!</p>
        </h2>
    </div>
</template>
<script>
    import API from "../api";
    export default {
        data() {
            return {
                number: 1
            }
        },
        methods: {
            getregister() {
                API.getUserList().then( res => {
                    console.log('response', res);
                });
            }
        },
        mounted() {
            API.getUserList().then( res => {
                console.log('response666', res);
            });
        }
    }
</script>
<style lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
