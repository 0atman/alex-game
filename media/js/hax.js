var hax = new Object();
hax.server = 'http://alex-game.herokuapp.com';

//Provides basic templating for strings
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

//Loads templates from the HTML into variables
function loadTemplates(){
    hax.templates = new Object();
    hax.templates.entryPointTemplate = $("#entryPointTemplate").html();
    hax.templates.cardTemplate = $("#cardTemplate").html();
    hax.templates.cardFlipTemplate = $("#cardFlipTemplate").html();
}

//Makes an ajax request to get all companies and calls generateCompanyDropdown()
function getCompanyList(){
    $.ajax({
        url: hax.server+'/api/v1/company/?format=jsonp',
        dataType: 'jsonp',
        success: function(data){
                    var rawCompanies = data.objects;
                    var companies = new Array();                 
                    
                    for (var i=0; i<rawCompanies.length; i++){
                        companies[i] = new Array(rawCompanies[i].id, rawCompanies[i].name);
                    }
                    hax.companies = companies;
                    generateCompanyDropdown();
                 }
    });
}

//Empties the wrapper div and calls generateCompanyList
function reset(){
    $("#wrapper").empty();
    getCompanyList();
}

//Updates hax.selectedCompany with the specified id
function getCompany(id){ 
    $.ajax({
        url: hax.server+'/api/v1/company/' + id + '?format=jsonp',
        dataType: 'jsonp',
        success: function(data){
                    hax.selectedCompany = data;
                 }
    });
}

//Renders the cards for the company selected by the user
function renderGrid(){
    var id = $("#companySelect").val();
    $.ajax({
        url: hax.server+'/api/v1/company/' + id + '?format=jsonp',
        dataType: 'jsonp',
        success: function(data){
                    $("#wrapper").empty();
                    hax.selectedCompany = data;
                    for (var key in hax.selectedCompany.entry_points){
                        renderEntryPoint(hax.selectedCompany.entry_points[key]);
                    }
                 }
    });
}

//Fills in and renders the tempalte for a given entry point
function renderEntryPoint(entryPoint){
    var entryPointHTML = '';
    var cardsHTML = hax.templates.cardTemplate.format(
            'entry_' + entryPoint.id,
            hax.server+entryPoint.file,
            entryPoint.name,
            "",
            "entry_" + entryPoint.id + "_stage",
            "entry_" + entryPoint.id + "_stage"
        );
    for (iceKey in entryPoint.ice){
        cardsHTML += hax.templates.cardFlipTemplate.format(
            entryPoint.id + '_' + entryPoint.ice[iceKey].id,
            entryPoint.id + '_' + entryPoint.ice[iceKey].id,
            hax.server+entryPoint.ice[iceKey].file,
            entryPoint.ice[iceKey].name,
            entryPoint.ice[iceKey].name,
            "images/card-back.png",
            "ICE",
            "ICE",
            entryPoint.id + '_' + entryPoint.ice[iceKey].id + "_stage",
            entryPoint.id + '_' + entryPoint.ice[iceKey].id + "_stage"
        );
    }
    entryPointHTML = hax.templates.entryPointTemplate.format(
        "",
        cardsHTML
    );
    $("#wrapper").append(entryPointHTML);
}

//Renders the company selector form elements
function generateCompanyDropdown(){
    var dropdown = $('<select id="companySelect" class="companySelect" />');
    for(var key in hax.companies) {
        $('<option />', {value: hax.companies[key][0], text: hax.companies[key][1]}).appendTo(dropdown);
    }
    var button = $('<button />', {onclick: 'renderGrid();', text: 'HACK'});
    $("#wrapper").append(dropdown).append(button);
}

//Changed the flipped state for a given card
function flipCard(card){
    $('#' + card).addClass('flipped');
}



