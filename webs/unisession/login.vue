<template>
    <el-form label-width="100px" class="handylink-session-form">
        <el-form-item label="用户名：">
            <el-input v-model="userinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密  码：">
            <el-input v-model="userinfo.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="clear">清 空</el-button>
            <el-button type="primary" @click="login">登 陆</el-button>
            <el-button type="primary" @click="register">注 册</el-button>
        </el-form-item>
    </el-form>
</template>

<script></script>