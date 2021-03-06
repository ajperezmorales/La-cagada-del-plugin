var universidades;
var ciudades;
var comites;
var carreras;

var searchIntoJson = function (obj, column, value) {
    var results = [];
    var valueField;
    var searchField = column;
    for (var i = 0 ; i < obj.length ; i++) {
        valueField = obj[i][searchField].toString();
        if (valueField === value) {
            results.push(obj[i]);
	    }
    }
    return results;
};


var loadCiudades = function () {
    $("#ciudad").empty();
    $("#ciudad").append('<option value="0" selected="selected">Seleccione</option>');
    $.each(ciudades, function (i, valor) {
        $("#ciudad").append("<option value='" + valor.id_ciudad + "'>" + valor.nombre_ciudad + "</option>");
    });
};

var loadUniversidades = function (id_ciudad) {
    var universidad_ciudad = searchIntoJson(universidades, "id_ciudad", id_ciudad);
    $("#universidad").empty();
    $("#universidad").append('<option value="0" selected="selected">Seleccione Universidad</option>');
    $.each(universidad_ciudad, function (i, valor) {
        $("#universidad").append('<option value="' + valor.id_universidad + '">' + valor.nombre_universidad + '</option>');
    });
};

var loadComite = function (id_universidad) {
	var comite = searchIntoJson(universidades, "id_universidad", id_universidad);

$("#localcommittee").empty();
$("#universidad_expa").empty();

    $.each(comite, function (i, valor) {
        var id_comite = valor.c_id_podio;
	var id_expa =  valor.id_universidad_expa;

		$("#localcommittee").append("<option value='" + valor.c_id_podio + "|"+ valor.c_id_expa+ "'>" + valor.c_id_podio + "</option>");
		$("#localcommittee").value=id_comite;

                $("#universidad_expa").append("<option value='" + valor.id_universidad_expa + "'>" + valor.id_universidad_expa + "</option>");
		$("#universidad_expa").value=id_expa;
    });
};

var loadCarreras = function () {
    $("#carrera").empty();
    $("#carrera").append('<option value="0" selected="selected">Seleccione Carrera</option>');
    $.each(carreras, function (i, valor) {
        $("#carrera").append("<option value='" + valor.id_carrera + "'>" + valor.carrera + "</option>");
    });
};


$(document).ready(function () 
	{
   		$.getJSON("https://www.aiesec.cl/wp-content/plugins/expa/data/ciudades.json",function (data) {
			ciudades = data; 
			});
	 $.getJSON("https://www.aiesec.cl/wp-content/plugins/expa/data/comites.json",function (data) {
		comites = data; 
		});	
    
		$.getJSON("https://www.aiesec.cl/wp-content/plugins/expa/data/universidades.json", function (data) {
        universidades = data;
        setTimeout(function () {
            if (universidades !== undefined) {
                loadCiudades();
            }
        }, 2000);
		
		$.getJSON("https://www.aiesec.cl/wp-content/plugins/expa/data/carreras.json",function (data) 
			{
			carreras = data; 
	    	});
		setTimeout(function () {
             loadCarreras();	        
        }, 2000);	
		
    });

    $("#ciudad").change(function () {
        var id_ciudad = $("#ciudad").val();
        loadUniversidades(id_ciudad);
    });
	
	$("#universidad").change(function () {
        var id_universidad = $("#universidad").val();
		setTimeout(function () {loadComite(id_universidad);},2000);
			
		});
});
