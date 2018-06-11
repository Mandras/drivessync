function get_drives() {
	$.get("/drives", function(data) {
		var drives = eval(data);

		$("#source").html('<option value="">-</option>');
		$("#destination").html('<option value="">-</option>');
		for (var i = 0; i < drives.length; i++) {

			$("#source").append('<option value="' + drives[i] + '">' + drives[i] + '</option>');
			$("#destination").append('<option value="' + drives[i] + '">' + drives[i] + '</option>');
		}

		$("#source").val('M:');
	});
}

function sync() {
	var destextra = $("#dest-extra").attr('data-checked');
	var source = $("#source").val();
	var destination = $("#destination").val();

	if (source.length <= 0) {
		alert('Source can not be empty !');
		return ;
	}

	if (destination.length <= 0) {
		alert('Destination can not be empty !');
		return ;
	}

	if (source == destination) {
		alert('Source can not be Destination !');
		return ;
	}

	if (destination == 'C:') {
		alert('Destination can not be C: !');
		return ;
	}

	$("#output").append('<span class="warning">This may take a while ... please be patient.</span><br />');

	$.post("/sync", {
		destination : destination,
		destextra: destextra,
		source: source
	}).done(function(data) {
		$("#output").append(data);
		var outp = document.getElementById("output");
		outp.scrollTop = outp.scrollHeight;
	}).fail(function(data) {
		alert(data.responseText);
	});
}

$(document).ready(function() {
	$(".checkbox").click(function() {
		if ($(this).attr('data-checked') == '0') {
			$(this).attr('data-checked', '1');
		}
		else {
			$(this).attr('data-checked', '0');
		}
	});

	window.setInterval(function() {
		$.get("/msg", function(data) {
			$("#output").append(data);
		});
	}, 500);

	get_drives();
});