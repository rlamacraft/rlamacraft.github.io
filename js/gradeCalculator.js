$(document).ready(onLoad);

var selectedYear = 0;
var nonOneModuleWeightings = {
  "SEG" : 2,
  "PRJ" : 2,
};
var yearWeightings = [11, 33, 56];

function onLoad() {

  $('.yearSelect').click(function() {
    $('.yearSelect').removeClass('selected');
    $(this).addClass('selected');
    selectedYear = parseInt($(this).attr('data-year'));
    hideAllYearBlocks();
    switch(selectedYear) {
      case 3:  showYearSection('#year3');
      case 2:  showYearSection('#year2');
      default: showYearSection('#year1');
    }

    if(selectedYear == 2) {
      $('.change-background').addClass('white');
    } else {
      $('.change-background').removeClass('white');
    }

    $('.calculate').show();
    $('.output').hide();
  });

  $('#done').click(calculate);

}

function showYearSection(yearClass) {
  block = $(yearClass);
  block.css('display', 'block');
  block.css('opacity', '1');
}

function hideAllYearBlocks() {
  $('.yearBlock').css('display', 'none');
  $('.yearBlock').css('opacity', '0');
}

function calculate() {
  yearOneGrades   = getGrades('year1');
  yearTwoGrades   = getGrades('year2');
  yearThreeGrades = getGrades('year3');
  allGrades = yearOneGrades.concat(yearTwoGrades).concat(yearThreeGrades);

  if( checkErrors(yearOneGrades, yearTwoGrades, yearThreeGrades) ) {
    alert("you must fill out all fields");
    return;
  }

  max = findMax(allGrades);
  console.log("max = " + max);
  $('#maxOutput').html(max);

  min = findMin(allGrades);
  console.log("min = " + min);
  $('#minOutput').html(min);

  avg = findAverage(yearOneGrades, yearTwoGrades, yearThreeGrades);
  console.log("avg = " + avg);
  $('#avgOutput').html(avg + "%");

  word = readableOutput(avg);
  $('#wordsOutput').html("You're on track for a " + word + ".");

  $('.calculate').hide();
  $('.output').show();
}

function getGrades(yearID) {
  allInputFields = $('.yearBlock#' + yearID + ' .input-group');
  allGrades = [];
  for ( inputFieldIndex = 0; inputFieldIndex < allInputFields.length; ++inputFieldIndex ) {
    eachInputField = $(allInputFields[inputFieldIndex]);
    allGrades[inputFieldIndex] = {
      name  : $(eachInputField.children()[0]).text(),
      value : parseInt($(eachInputField.children()[1]).val()),
    };
  }
  return( allGrades );
}

function findMax(gradesList) {
  max = gradesList[0].value;
  for ( eachGradeIndex = 1; eachGradeIndex < gradesList.length; ++eachGradeIndex ) {
    eachGrade = gradesList[eachGradeIndex];
    if(eachGrade.value != "" && eachGrade.value > max) {
      max = eachGrade.value;
    }
  }
  return(max);
}

function findMin(gradesList) {
  min = gradesList[0].value;
  for ( eachGradeIndex = 1; eachGradeIndex < gradesList.length; ++eachGradeIndex ) {
    eachGrade = gradesList[eachGradeIndex];
    if(eachGrade.value != "" && eachGrade.value < min) {
      min = eachGrade.value;
    }
  }
  return(min);
}

function findAverage(firstYear, secondYear, thirdYear) {
  eachYearAverage    = [];
  eachYearAverage[0] = calcAverage(firstYear);
  eachYearAverage[1] = calcAverage(secondYear);
  eachYearAverage[2] = calcAverage(thirdYear);
  totalAverage   = 0;
  totalWeighting = 0;

  for( eachYear = 0; eachYear < selectedYear; eachYear++ ) {
    totalWeighting += yearWeightings[eachYear];
    totalAverage   += eachYearAverage[eachYear] * yearWeightings[eachYear];
  }
  return( Math.round(totalAverage / totalWeighting));
}

function calcAverage(gradesList) {
  total = 0;
  for ( eachGradeIndex = 0; eachGradeIndex < gradesList.length; ++eachGradeIndex ) {
    eachGrade = gradesList[eachGradeIndex];
    if(eachGrade.name in nonOneModuleWeightings) {
      total += eachGrade.value * nonOneModuleWeightings[eachGrade.name];
    } else {
      total += eachGrade.value;
    }
  }
  return(total / 8);
}

function readableOutput(percentage) {
  var singleDigit = Math.floor( percentage / 10 );
  switch(singleDigit) {
    case 10 : return "1st";
    case 9  : return "1st";
    case 8  : return "1st";
    case 7  : return "1st";
    case 6  : return "2:1";
    case 5  : return "2:2";
    case 4  : return "3rd";
    case 3  : return "fail";
    case 2  : return "fail";
    case 1  : return "fail";
    case 0  : return "fail";
  }
  return "error";
}

function checkErrors(firstYearGrades, secondYearGrades, thirdYearGrades) {
  yearGrades = [firstYearGrades, secondYearGrades, thirdYearGrades];
  for(eachSelectedYear = 0; eachSelectedYear < selectedYear; ++eachSelectedYear) {
    if( hasError(yearGrades[eachSelectedYear]) )
      return true;
  }
  return false;
}

function hasError(allGrades) {
  for(eachGradeIndex = 0; eachGradeIndex < allGrades.length; ++eachGradeIndex) {
    if(isNaN(allGrades[eachGradeIndex].value)) {
      return true;
    }
  }
  return false;
}
