let customeraddModule = (function () {
    let customerId = null;
    //获取表单提交元素
    let $username = $(".username"),
        $sex = $("input:radio[name='sex']"),
        $useremail = $(".useremail"),
        $userphone = $(".userphone"),
        $userqq = $(".userqq"),
        $userweixin = $(".userweixin"),
        $customerType = $("#customerType"),
        $customerAddress = $("#customerAddress"),
        $submit = $(".submit");
    //获取提示错误信息元素
    let $userNameErr = $(".userNameErr"),
        $userEmailErr = $(".userEmailErr"),
        $userPhoneErr = $(".userEmailErr"),
        $userAddrErr = $(".userAddrErr");
    //name=xxx&sex=xxx&email=xxx&phone=xxx&QQ=xxx&weixin=xxx&type=xxx&address=xxx

    //非空判断
    function checkName() {
        if ($.trim($username.val()) == "") {
            $userNameErr.html('用户名未填写');
            return false;
        }
        $userNameErr.html('');
        return true;
    }

    function checkEmail() {
        if ($.trim($useremail.val()) == "") {
            $userEmailErr.html('邮箱未填写');
            return false;
        }
        $userEmailErr.html('');
        return true;
    }
    function checkPhone() {
        if ($.trim($userphone.val()) == "") {
            $userPhoneErr.html('电话未填写');
            return false;
        }
        $userPhoneErr.html('');
        return true;
    }

    function checkAddr() {
        if ($.trim($customerAddress.val()) == "") {
            $userAddrErr.html('客户地址未填写');
            return false;
        }
        $userAddrErr.html('');
        return true;
    }
    //事件逻辑处理(数据提交)
    function handlEvent() {
        if (!checkName() || !checkEmail() || !checkPhone() || !checkAddr()) {
            return;
        }
        //获取提交元素的值
        var params = {
            name: $username.val(),
            sex: $sex.filter(":checked").val(),
            email: $useremail.val(),
            phone: $userphone.val(),
            QQ: $userqq.val(),
            weixin: $userweixin.val(),
            type: $customerType.val(),
            address: $customerAddress.val()
        };

        if (customerId == null) {
            //新增数据
            axios.post('/customer/add', params).then(function (result) {
                if (result.code != 0) {
                    alert("保存失败");
                    return;
                }
                alert("保存成功");
            })
        } else {
            //修改数据
            params.customerId = customerId;
            axios.post('/customer/update', params).then(function (result) {
                if (result.code != 0) {
                    alert("修改失败");
                    return;
                }
                alert("修改成功");
            })
        }
    }

    //查询客户信息
    async function queryInfo(params) {
        let result = await axios.get('/customer/info', { params: { customerId } });
        if (result.code == 0) {
            $username.val(result.data.name);
            result.data.sex == 0 ? $("#women").attr("checked", true) :$("#man").attr("checked", true);
            $useremail.val(result.data.email);
            $userphone.val(result.data.phone);
            $userqq.val(result.data.QQ);
            $userweixin.val(result.data.weixin);
            $customerType.val(result.data.type);
            $customerAddress.val(result.data.address);
            return;
        }
        alert("当前要编辑的客户信息不存在或已删除");
        customerId = null;
    }

    return {
        init: function () {
            let urlParams = window.location.href.queryURLParams();
            customerId = urlParams.id;
            if (customerId) {
                //查询客户信息
                queryInfo();
            }
            $submit.click(handlEvent);
            $username.blur(checkName);
            $useremail.blur(checkEmail);
            $userphone.blur(checkPhone);
            $customerAddress.blur(checkAddr);
        }
    }
})();
customeraddModule.init();