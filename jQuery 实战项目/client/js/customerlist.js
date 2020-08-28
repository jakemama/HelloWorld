let customerlistModule = (function () {
    let $selectBox = $(".selectBox"),
        $searchInp = $(".searchInp"),
        $tbody = $("tbody"),
        $pageBox = $(".pageBox");
    let urlParams = window.location.href.queryURLParams();
    let page = 1,
        limit = 10,
        lx = urlParams.lx;
    //获取列表数据
    async function getList() {
        //lx=my&type=''&search=''&limit=10&page=1
        let type = $selectBox.val(),
            search = $searchInp.val();
        let params = {
            lx: lx,
            type: type,
            search: search,
            limit: limit,
            page: page
        }

        let result = await axios.get('/customer/list', { params });
        let str = ``;
        if (result.code == 0) {
            result.data.forEach(item => {
                str += `<tr>
				<td class="w8">${item.name}</td>
				<td class="w5">${item.sex==0?"女":"男"}</td>
				<td class="w10">${item.email}</td>
				<td class="w10">${item.phone}</td>
				<td class="w10">${item.weixin}</td>
				<td class="w10">${item.QQ}</td>
				<td class="w5">${item.type}</td>
                <td class="w8">${item.userName}</td>
                <td class="w20">${item.address}</td>
				<td class="w14" cid="${item.id}">
					<a href="javascript:;" >编辑</a>
					<a href="javascript:;">删除</a>
					<a href="javascript:;">回访记录</a>
				</td>
			</tr>`
            });
            $tbody.html(str);
            
            if (result.totalPage > 1) {
                $pageBox.show();
                //拼接页码
                let pageStr = ``;
                for (let index = 1; index <= result.totalPage; index++) {
                    pageStr += `<li>${index}</li>`;
                }
                $pageBox.find(".pageNum").html(pageStr);
                //在第一页时隐藏上一页按钮
                if (page == 1) {
                    $pageBox.find("a").eq(0).hide();
                } else {
                    $pageBox.find("a").eq(0).show();
                }
                //到最后一页时隐藏下一页按钮
                if (page == result.totalPage) {
                    $pageBox.find("a").eq(1).hide();
                } else {
                    $pageBox.find("a").eq(1).show();
                }
                //页码点击逻辑
                let $li = $pageBox.find(".pageNum").find("li");
                $li.removeClass('active');
                $li.eq(page - 1).addClass('active');
                $pageBox.unbind('click');
                $pageBox.bind('click',function (ev) {
                    let target = ev.target,
                        $target = $(target),
                        tag = target.tagName;
                    if(tag == "LI"){
                        if (page != $target.text()) {
                            page = $target.text();
                            getList();
                        }
                    }
                    if(tag == "A"){
                        if($target.hasClass("prev")){
                            page = page > 1 ? --page : page;
                        }
                        if($target.hasClass("next")){
                            page = page < result.totalPage ? ++page  : page;
                        }
                        getList();
                    }

                })
            }else{
                $pageBox.hide();
            }
        }
    }

    //查询逻辑
    function searchHandle() {
        $selectBox.change(getList);
        $searchInp.on('keydown', function (ev) {
            if (ev.keyCode == 13) {
                getList();
            }
        })
    }

    //按钮操作
    function delegate() {
        $tbody.click(function (ev) {
            let target = ev.target,
                $target = $(target),
                tag = target.tagName,
                text = target.innerHTML;
            if (tag == 'A') {
                let customerId = $target.parent().attr("cid");
                if (text == "编辑") {
                    window.location.href = `customeradd.html?id=${customerId}`;
                    return;
                }
                if (text == "删除") {
                    axios.get('/customer/delete', { params: { customerId } })
                        .then(function (result) {
                            if (result.code == 0) {
                                alert("删除成功");
                                getList();
                                return;
                            }
                        })
                }
                if(text =="回访记录"){
                    window.location.href = `visit.html?id=${customerId}`;
                    return;
                }
            }
        })
    }

    return {
        init: function () {
            getList();
            searchHandle();
            delegate();
        }
    }
})();
customerlistModule.init();