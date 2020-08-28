/**
 * queryURLParams: 获取 URL 地址中问号后面的参数信息(可能包含 HASH 值)
 *  @params
 *  @return
 *      [object] 把所有问号后面的参数信息以键值对的方式存储并返回
 */
function queryURLParams() {
    let obj = {};
    this.replace(/([^?=&#]+)=([^?=&#]+)/g, (...[_, $1, $2]) => obj[$1] = $2);
    this.replace(/#([^?=&#])+/g, (...[_, $1]) => obj['HASH'] = $1);
    return obj;
}
String.prototype.queryURLParams = queryURLParams;

/**
 * 缓存部门信息
 */
async function queryDepart() {
    let result,
        department = localStorage.getItem('department');
    if (department) {
        department = JSON.parse(department);
        if (new Date().getTime() - department.time <= 86400000) {
            return department.data;
        }
    }
    result = await axios.get('/department/list');
    localStorage.setItem('department', JSON.stringify({
        time: new Date().getTime(),
        data: result
    }))
    return result;
}

/**
 * 缓存职务信息
 */

async function queryJob() {
    let result,
        job = localStorage.getItem('job');
    if (job) {
        job = JSON.parse(job);
        if (new Date().getTime() - job.time <= 86400000) {
            return job.data;
        }
    }
    result = await axios.get('/job/list');
    localStorage.setItem('job', JSON.stringify({
        time: new Date().getTime(),
        data: result
    }))
    return result;
}