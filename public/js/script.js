function initListeners(socket) {
    socket.on("Start_Chat", function () {
        //Setting Message On Connection..
        $("#stat").html("<strong>Status:</strong>Connected");
        $("#field").focus();
    });

    socket.on("connect", function () {
        socket.emit(registerRoom, $("#room").val());
    });

    socket.on("disconnect", function () {
        //Setting Message On Disconnection
        $("#stat").html("<strong>Status:</strong>Disconnected From Server Refresh!");
    });

    socket.on("r_name", function (data) {
        $("ul").append("<li>" + data + "</li>");
    });

    socket.on(receiveMessage, function (data) {
        $("ul").append("<li>" + data + "</li>");
    });
}

$(function () {
    var socket;

    $("#btn").click(function () {
        var $field = $("#field");
        if ($field.attr("placeholder") === "Your Room..") {
            $("#room").val($field.val());
            socket = io.connect(window.location.host);
            initListeners(socket);
            $field.val("");
            $field.attr("placeholder", "Your Name..");
        } else if ($field.attr("placeholder") === "Your Name..") {
            socket.emit(registerName, {name: $field.val(), room: $("#room").val()});
            $("#name").val($field.val());
            $field.val("");
            $field.attr("placeholder", "Your Text..");
        } else if ($field.attr("placeholder") === "Your Text..") {
            socket.emit(sendMessage,
                {
                    name: $("#name").val(),
                    room: $("#room").val(),
                    message: $field.val()
                });
            $field.val("");
        } else alert("Wait...");
        $field.focus();
    });
});