$(function () {
    var socket = io.connect(window.location.host);
    socket.on("Start_Chat", function () {
        //Setting Message On Connection..
        $("#stat").html("<strong>Status:</strong>Connected");
        $("#field").attr("placeholder", "Your Name..");
        $("#field").focus();
    });

    socket.on("disconnect",function(){
        //Setting Message On Disconnection
        $("#stat").html("<strong>Status:</strong>Disconnected From Server Refresh!");
    })

    $("#btn").click(function(){
        if($("#field").attr("placeholder") ==="Your Name.."){
            socket.emit("Register_Name",$("#field").val());
            $("#field").val("");
            $("#field").attr("placeholder","Your Text..");
        } else if($("#field").attr("placeholder") == "Your Text.."){
            socket.emit("Send_msg",$("#field").val());
            $("#field").val("");
            $("#field").focus();
        }else alert("Wait...");
    })
});