saved_data = [];

function read_data() {
  if (typeof(Storage) !== "undefined") {
    saved_data = JSON.parse(localStorage.getItem("saved_resolutions"));
    if(saved_data === null) {
      saved_data = [];
    }
  } else {
      alert("Could not read data.");
  }
}

function write_data() {
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem("saved_resolutions", JSON.stringify(saved_data));
  } else {
      alert("Could not write data.");
  }
}

function clear_data() {
  if (typeof(Storage) !== "undefined") {
    localStorage.clear();
    saved_data = [];
  } else {
      alert("Could not clear data.");
  }
}

function render_data() {
  $('.section_table_output table').DataTable().clear().rows.add(saved_data).draw()
}

function calculate_ppi() {
  var horizontal = $(".calculation_input_horizontal").val();
  var vertical = $(".calculation_input_vertical").val();
  var diagonal = $(".calculation_input_diagonal").val();

  var aspect_ratio = horizontal / vertical;
  var angle = Math.atan(vertical/horizontal);

  var height = Math.sin(angle) * diagonal;
  var width = Math.cos(angle) * diagonal;
  var area = height * width;

  var num_of_pixels = horizontal * vertical;
  var pixels_per_square_inch = Math.sqrt(num_of_pixels / area );
  return( Math.round( pixels_per_square_inch * 100 ) / 100 );
}

$(document).ready( function() {

  $('.section_table_output table').DataTable( {
        "columns": [
            { "data": "name" },
            { "data": "horizontal" },
            { "data": "vertical" },
            { "data": "diagonal" },
            { "data": "ppi" },
            { "data": "price" },
            { "data": "note" }
        ],
        "paging" : false,
        "bFilter": false,
        "bInfo": false
    } );

  read_data();
  render_data();

  $(".section_calculation_input input").keyup(function() {
    $(".calculation_output_value").text(calculate_ppi());
  });

  $(".calculation_clear_button").click(function() {
    $(".section_calculation_input input").val("");
    $(".calculation_output_value").text("0");
  });

  $(".calculation_save_button").click(function() {
    $(".section_calculation_default").removeClass("visible");
    $(".section_calculation_save").addClass("visible");
  });

  $(".calculation_cancel_button").click(function() {
    $(".section_calculation_default").addClass("visible");
    $(".section_calculation_save").removeClass("visible");
  })

  $(".calculation_done_button").click(function() {
    saved_data.push({
      horizontal : $(".calculation_input_horizontal").val(),
      vertical   : $(".calculation_input_vertical").val(),
      diagonal   : $(".calculation_input_diagonal").val(),
      name       : $(".calculation_input_name").val(),
      price      : $(".calculation_input_price").val(),
      note       : $(".calculation_input_note").val(),
      ppi        : calculate_ppi()
    });
    render_data();
    write_data();
    $(".section_calculation_default").addClass("visible");
    $(".section_calculation_save").removeClass("visible");
  });

  $(".table_clear_button").click(function() {
    if(confirm("This will delete all table data. Are you sure?")) {
      clear_data();
      render_data();
    }
  })

} );
