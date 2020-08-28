let userlistModule = (function(){
   
    let $selectBox = $(".selectBox"),
        $searchInp = $(".searchInp"),
        $tbody = $('tbody'),
        $checkAll = $("#checkAll"),
        $deleteAll = $(".deleteAll"),
        $checkList = null;

    //获取列表数据
     //departmentId=0&search=''
    async function getList() {
        let params={
            departmentId:$selectBox.val(),
            search:$searchInp.val()
        };
        // console.log(params);
        let result = await axios.get('/user/list',{params});
        if(result.code == 0){
            let str=``;
            result.data.forEach(item => {
                str+=`<tr>
				<td class="w3"><input type="checkbox" uid="${item.id}"></td>
				<td class="w10">${item.name}</td>
				<td class="w5">${item.sex==1?"男":"女"}</td>
				<td class="w10">${item.department}</td>
				<td class="w10">${item.job}</td>
				<td class="w15">${item.email}</td>
				<td class="w15">${item.phone}</td>
				<td class="w20">${item.desc}</td>
				<td class="w12" uid="${item.id}">
					<a href="javascript:;">编辑</a>
					<a href="javascript:;">删除</a>
					<a href="javascript:;">重置密码</a>
				</td>
			</tr>`;
            });
            $tbody.html(str);
            $checkList = $tbody.find('input[type="checkbox"]');
        }else{
            $tbody.html("");
        }
    }

    //获取部门信息(下拉列表)
    async function bindDepart() {
        let str=``;
        let result = await axios.get('/department/list');
        if(result.code ==0){
            result.data.forEach(item=>{
                str+=`<option value="${item.id}">${item.name}</option>`;
            })
        }
        $selectBox.append(str);
    }

    //条件搜索
    function searchHandle() {
        $selectBox.change(getList);
        $searchInp.on("keydown",ev=>{
            if(ev.keyCode == 13){
                getList();
            }
        })
    }
    //列表操作事件(编辑、删除、重置密码)
    function delegate() {
        $tbody.click(async ev=>{
            let target = ev.target,
                $target = $(target),
                tag = target.tagName,
                text = target.innerText;
                console.log(target);
                console.log($target);
                console.log(tag,text);
                if(tag == 'A'){
                    let userId= $target.parent().attr("uid");
                    if(text == '编辑'){
                        window.location.href=`useradd.html?id=${userId}`;
                        return;
                    }
                    if(text == '删除'){
                        if(confirm('确认删除?')){
                            let result = await axios.get('/user/delete',{params:{userId}});
                            if(result.code == 0){
                                alert(删除成功);
                                getList();
                                return;
                            }
                            alert("删除失败");
                        }
                    }
                    if(text == '重置密码'){
                        if(confirm('确认重置当前人员密码?')){
                            let result = await axios.post('/user/resetpassword',{userId});
                            if(result.code ==0){
                                alert("密码已重置");
                                return;
                            }
                            alert("密码重置失败");
                        }
                    }
                }
        })
    }
    //批量删除
    function batchDele() {
        //全选点击事件
        $checkAll.click(ev=>{
            let checked = $checkAll.prop("checked");
            $checkList.prop('checked',checked);
        });
        // 单项点击事件(控制全选按钮变化)
        $tbody.click(ev=>{
            let target = ev.target,
            $target = $(target),
            tag = target.tagName;
            if(tag == 'INPUT'){
                let flag = true;
                [].forEach.call($checkList,item=>{
                    if(!$(item).prop('checked')){
                        flag = false;
                    }
                    $checkAll.prop('checked',flag);
                })
            }
        })
        //批量删除按钮点击事件
        $deleteAll.click(async ev=>{
            //存储被选中的数据id
            let delList =[];
             //获取复选框选中数据
            [].forEach.call($checkList,item=>{
                if($(item).prop('checked')){
                    delList.push($(item).attr('uid'));
                }
            });
            if(delList.length==0){
                alert("未勾选删除项");
                return;
            }
            if(confirm(`确认删除${delList.length}条数据吗?`)){
                for (let val of delList) {
                    let userId = val;
                     let result = await axios.get('/user/delete',{params:{userId}});
                    if(result.code == 0){
                        alert("批量删除成功");
                        return;
                    }
                    alert("批量删除失败");
                }
            }
        })

       

    }
    return {
        init(){
            getList();
            bindDepart();
            searchHandle();
            delegate();
            batchDele();
        }
    }
})();
userlistModule.init();