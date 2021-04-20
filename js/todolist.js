$(function() {
    // 按下回车 把完整数据存储到本地存储里面
    // 存储的数据格式  var todolist = [{title:"xxx",done:false}]
    // 每次页面加载就会显示数据
    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入你要的操作")
            } else {
                // 读取本地原来的数据 声明数组拿到数据
                var local = getDate();
                // console.log(local);
                // 把local数组进行更新数据，把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                // 把这个数组存储给本地存储
                saveDate(local);
                // 本地存储数据渲染加载到页面
                load();
                //按了回车之后清空文本框
                $(this).val("");
            }
        }
    });
    // 删除操作
    $("ol,ul").on("click", "a", function() {
        // 先获取本地存储
        var data = getDate();
        // 修改数据
        var index = $(this).attr("id"); //点了哪个a，通过id获取它的值
        data.splice(index, 1);
        // 保存到本地数据
        saveDate(data);
        // 重新渲染页面
        load();
    });

    // 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function() {
        // 先获取本地存储数据
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id"); //复选框获得的是兄弟a的id值
        data[index].done = $(this).prop("checked"); //done修改为复选框的选定状态
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });

    // 读取本地存储的数据的函数
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储数据是字符串格式 ，需要转换
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 保存本地存储数据函数
    // 不能直接用local 因为local是一个内部的变量，外部函数没有办法使用，所以需要传递过来
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载函数
    function load() {
        // 获取本地数据
        var data = getDate();
        // 每次渲染之前 先清空ol和ul里面的数据，然后再加载
        $("ol,ul").empty();
        var todoCount = 0; //正在进行的个数
        var doneCount = 0; //已经完成的个数
        // 遍历数据
        $.each(data, function(i, n) {
            //  有几条数据，就生成几个li添加到ol中
            //如果已完成的也就是true，那就放在ul里面，否则放在ol里面
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>"); //遍历的时候给每个a一个索引号
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>"); //遍历的时候给每个a一个索引号
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})