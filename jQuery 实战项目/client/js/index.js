let indexModule = ( function(){
    let $baseBox = $(".baseBox"),
        $loginout = $(".loginout"),
        $menuBox = $(".menuBox"),
        $navBox = $(".navBox")
        $iframeBox = $(".iframeBox"),
        $itemBoxs = [];

      let $plan = $.Callbacks(); 
      //设置登录人员信息和绑定退出按钮事件 
      $plan.add(
          (_,userInfo)=>{
            $baseBox.find("span").text(`您好：${userInfo.name || ""}`);
            $loginout.click(async()=>{
                let result = await axios.get('/user/signout');
                if(result.code ==0){
                    window.location.href="login.html";
                }
            })
          }
      );
      //动态加载左侧菜单
      //userhandle|departhandle|jobhandle|customerall
      $plan.add(
          (powerInfo)=>{
              let str=``;
            if(powerInfo.includes('userhandle')){
                str+=`<div class="itemBox"  pw="group1">
				<h3>
					<i class="iconfont icon-yuangong"></i>
					员工管理
				</h3>
				<nav class="item">
					<a href="page/userlist.html" target="iframeBox">员工列表</a>
					<a href="page/useradd.html" target="iframeBox">新增员工</a>
				</nav>
			</div>`;
            }
            if(powerInfo.includes('departhandle')){
                str+=`<div class="itemBox" pw="group1">
				<h3>
					<i class="iconfont icon-guanliyuan"></i>
					部门管理
				</h3>
				<nav class="item">
					<a href="page/departmentlist.html" target="iframeBox">部门列表</a>
					<a href="page/departmentadd.html" target="iframeBox">新增部门</a>
				</nav>
			</div>`;
            }
            if(powerInfo.includes('jobhandle')){
                str+=`<div class="itemBox" pw="group1">
				<h3>
					<i class="iconfont icon-zhiwuguanli"></i>
					职务管理
				</h3>
				<nav class="item">
					<a href="page/joblist.html" target="iframeBox">职务列表</a>
					<a href="page/jobadd.html" target="iframeBox">新增职务</a>
				</nav>
			</div>`;
            }
            if(powerInfo.includes('customerall')){
                str+=`<div class="itemBox" pw="group2">
				<h3>
					<i class="iconfont icon-kehuguanli"></i>
					客户管理
				</h3>
				<nav class="item">
					<a href="page/customerlist.html?lx=my" target="iframeBox">我的客户</a>
					<a href="page/customerlist.html?lx=all" target="iframeBox">全部客户</a>
					<a href="page/customeradd.html" target="iframeBox">新增客户</a>
				</nav>
			</div>`;
            }
            $menuBox.html(str);
            $itemBoxs = $menuBox.find(".itemBox");
          });
          //动态加载顶部菜单和交互效果
          //userhandle|departhandle|jobhandle|customerall
          $plan.add(
              (powerInfo)=>{
                let str=``;
                if(powerInfo.includes("userhandle")||powerInfo.includes("departhandle")||powerInfo.includes("jobhandle")){
                    str+=`<a href="javascript:;">组织结构</a>`;
                }
                if(powerInfo.includes("customerall")){
                    str+=`<a href="javascript:;">客户管理</a>`;
                }
                $navBox.html(str);
                let $group1 = $itemBoxs.filter((_,item)=>{
                    return  $(item).attr("pw") == "group1";
                });
                let $group2 = $itemBoxs.filter((_,item)=>{
                    return  $(item).attr("pw") == "group2";
                });
                let $navBoxA = $navBox.find("a");
                let initIndex =0;
                if($navBoxA.length>0){
                    $navBoxA.eq(0).addClass('active').siblings().removeClass("active");
                }
                if($navBoxA.eq(0).text()=="组织结构"){
                    $group1.css("display","block");
                    $group2.css("display","none");
                    $iframeBox.attr("src","page/userlist.html");
                }else{
                    $group2.css("display","block");
                    $group1.css("display","none");
                    $iframeBox.attr("src","page/customerlist.html?lx=my");
                }
                $navBoxA.click(function(){
                    let that = $(this);
                    let index = that.index();
                    if(index == initIndex) return;
                    that.addClass("active").siblings().removeClass("active");
                    initIndex = index;
                    if(that.text()=="组织结构"){
                        $group1.css("display","block");
                        $group2.css("display","none");
                        $iframeBox.attr("src","page/userlist.html");
                    }else{
                        $group2.css("display","block");
                        $group1.css("display","none");
                        $iframeBox.attr("src","page/customerlist.html?lx=my");
                    }
                })
              }
      )
    return {
        async init(){
            //判断是否登录
            let result = await axios.get('/user/login');
            if(result.code != 0){
                window.location.href = 'login.html';
                return;
            }

            let [powerInfo,userInfo] = await axios.all([
                axios.get('/user/power'), 
                axios.get('/user/info')
            ]);
            powerInfo = powerInfo.code ==0?powerInfo.power:null;
            userInfo = userInfo.code == 0?userInfo.data:null;
            console.log(powerInfo);
            $plan.fire(powerInfo,userInfo);
          
        }
    }
})();
indexModule.init();