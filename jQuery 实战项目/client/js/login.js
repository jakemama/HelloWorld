//获取页面元素操作对象
var $userName = $(".userName"),
    $userPass = $(".userPass"),
    $btn = $(".submit");

//绑定提交事件
$btn.click(function(){
    var account = $userName.val(),
        password =  md5($userPass.val());
    //非空验证
    if($.trim(account)==''){
        alert("账号不能为空");
        return;
    }
    axios.post('/user/login',{
        account,
        password
    }).then(function(result){
        if(result.code!=0){
            alert("用户名或密码错误");
            return;
        }
        window.location.href="index.html";
    })
})