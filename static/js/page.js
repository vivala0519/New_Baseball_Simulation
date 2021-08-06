// Select section
// 연도 선택 시
$(document).on('change', '#yearSelect', function () {
    let selectedYear = $(this).find('option:selected').text();
    console.log(selectedYear);
    $.ajax({
        url:'/searchByYear',
        type:'POST',
        data : {'year' : selectedYear},
        success: function(data) {
            $('#yyyy').remove();
            $('#team').empty();
            $('#position').empty();
            $('#player').empty();
            $('#team').append('<option>팀 선택</option>')
            $('#position').append('<option>포지션 선택</option>')
            $('#player').append('<option>선수 선택</option>')
            console.log(data)
            $.each(data, function(index, item){
                let output = '<option>';
                output += item;
                output += '</option>';
                $('#team').append(output);
            });
        }
    })
});

// 팀 선택 시
$(document).on('change', '#team', function() {
    let selectedTeam = $(this).find('option:selected').text();
    let selectedYear = $('#yearSelect').find('option:selected').text();
    console.log(selectedTeam, selectedYear);
    $.ajax({
        url:'/searchByTeam',
        type:'POST',
        data : {'team' : selectedTeam, 'year': selectedYear},
        success: function(data) {
            $('#player').empty();
            $('#position').empty();
            let position_set = '<option>전체</option><option>포수</option> <option>1루수</option> <option>2루수</option>';
            position_set += '<option>3루수</option> <option>유격수</option> <option>좌익수</option>';
            position_set += '<option>우익수</option> <option>중견수</option> <option>지명타자</option> <option>투수</option>';
            $('#position').append(position_set);
            $('#player').append('<option>선수 선택</option>');
            console.log(data)
            $.each(data, function(index, item){
                   let output = '<option>';
                   output += item;
                   output += '</option>';
                   $('#player').append(output);
                });
        }
    })
});

// 포지션 선택 시
$(document).on('change', '#position', function() {
    let selectedPosition = $(this).find('option:selected').text();
    let selectedYear = $('#yearSelect').find('option:selected').text();
    let selectedTeam = $('#team').find('option:selected').text();
    console.log(selectedTeam, selectedYear, selectedPosition);
    $.ajax({
        url:'/searchByPosition',
        type:'POST',
        data : {'team' : selectedTeam, 'year': selectedYear, 'position': selectedPosition},
        success: function(data) {
            $('#player').empty();
            console.log(data)
            $.each(data, function(index, item){
                   let output = '<option>';
                   output += item;
                   output += '</option>';
                   $('#player').append(output);
                });
        }
    })
});

// 포지션 전체 선택 시
$(document).ready(function() {
    $('#position').change(function() {
        let selectedPosition = $('#position option:selected').val();
        let selectedYear = $('#yearSelect').find('option:selected').text();
        let selectedTeam = $('#team').find('option:selected').text();
        if (selectedPosition == '전체'){
            $.ajax({
                url:'/searchByTeam',
                type:'POST',
                data : {'team' : selectedTeam, 'year': selectedYear},
                success: function(data) {
                    $('#player').empty();
                    console.log(data)
                    $.each(data, function(index, item){
                           let output = '<option>';
                           output += item;
                           output += '</option>';
                           $('#player').append(output);
                        });
                }
            })
        }
    });
});

// Home,Away section
// 선수 추가(공통)
function add_player_common(selectedPlayer, selectedPosition, selected_H_A, selectedYear, selectedTeam){
    let Year_and_Team = selectedYear + selectedTeam;
    Year_and_Team = Year_and_Team.substring(2, 7);
    console.log(Year_and_Team);
    console.log(selected_H_A);
    selectedPlayer = Year_and_Team + '  ' + selectedPlayer
    if(selectedPosition != 'P'){
        for(var i = 1; i<=9; i++){
            console.log('i는 ', i)
            if(selected_H_A == 'Home') {
                // 포지션 중복 시
                for(var j = 2; j < 11; j++){
                    if($('#home_table > tbody > tr:nth-child('+ j +') > td:nth-child(3)').text() == selectedPosition){
                        selectedPosition = 'DH';
                    }
                    if($('#home_table > tbody > tr:nth-child('+ j +') > td:nth-child(3)').text() == 'DH'){
                        swal({
                            title: '포지션 중복!',
                            text: '더 이상 같은 포지션의 선수를 추가할 수 없습니다.',
                            icon: 'error',
                            button: 'Ok 확인~'
                        })
                        return false;
                    }
                }
                p = $('#home_table tr:eq('+i+')>td:eq(1)').html();
                if(p == 'player'){
                    $('#home_table tr:eq('+i+')>td:eq(1)').empty();
                    $('#home_table tr:eq('+i+')>td:eq(2)').empty();
                    $('#home_table tr:eq('+i+')>td:eq(1)').append(selectedPlayer);
                    $('#home_table tr:eq('+i+')>td:eq(2)').append(selectedPosition);
                    $('#home_table tr:eq('+i+')>td:eq(0)').css({
                        'color': 'black'
                    })
                    $('#home_table tr:eq('+i+')>td:eq(1)').css({
                        'color': 'black'
                    })
                    break
                }
            }
            else {
                // 포지션 중복 시
                for(var j = 2; j < 11; j++){
                    if($('#away_table > tbody > tr:nth-child('+ j +') > td:nth-child(3)').text() == selectedPosition){
                        selectedPosition = 'DH';
                    }
                    if($('#away_table > tbody > tr:nth-child('+ j +') > td:nth-child(3)').text() == 'DH'){
                        swal({
                            title: '포지션 중복!',
                            text: '더 이상 같은 포지션의 선수를 추가할 수 없습니다.',
                            icon: 'error',
                            button: 'Ok 확인~'
                        })
                        return false;
                    }
                }
                p = $('#away_table tr:eq('+i+')>td:eq(1)').html();
                console.log(p)
                if(p == 'player'){
                    $('#away_table tr:eq('+i+')>td:eq(1)').empty();
                    $('#away_table tr:eq('+i+')>td:eq(2)').empty();
                    $('#away_table tr:eq('+i+')>td:eq(1)').append(selectedPlayer);
                    $('#away_table tr:eq('+i+')>td:eq(2)').append(selectedPosition);
                    $('#away_table tr:eq('+i+')>td:eq(0)').css({
                        'color': 'black'
                    })
                    $('#away_table tr:eq('+i+')>td:eq(1)').css({
                        'color': 'black'
                    })
                    break
                }
            }
        }
    }
    else{
        for(var i = 10; i<=12; i++){
            if(selected_H_A == 'Home') {
                p = $('#home_table tr:eq('+i+')>td:eq(1)').html();
                if(p == 'player'){
                    $('#home_table tr:eq('+i+')>td:eq(1)').empty();
                    $('#home_table tr:eq('+i+')>td:eq(2)').empty();
                    $('#home_table tr:eq('+i+')>td:eq(1)').append(selectedPlayer);
                    $('#home_table tr:eq('+i+')>td:eq(2)').append(selectedPosition);
                    $('#home_table tr:eq('+i+')>td:eq(0)').css({
                        'color': 'black'
                    })
                    $('#home_table tr:eq('+i+')>td:eq(1)').css({
                        'color': 'black'
                    })
                    break
                }
            }
            else {
                p = $('#away_table tr:eq('+i+')>td:eq(1)').html();
                if(p == 'player'){
                    $('#away_table tr:eq('+i+')>td:eq(1)').empty();
                    $('#away_table tr:eq('+i+')>td:eq(2)').empty();
                    $('#away_table tr:eq('+i+')>td:eq(1)').append(selectedPlayer);
                    $('#away_table tr:eq('+i+')>td:eq(2)').append(selectedPosition);
                    $('#away_table tr:eq('+i+')>td:eq(0)').css({
                        'color': 'black'
                    })
                    $('#away_table tr:eq('+i+')>td:eq(1)').css({
                        'color': 'black'
                    })
                    break
                }
            }
        }
    }
}
// 셀렉해서 선수 추가
function add_click() {
    if($('#sel_home_away option:selected').val() == '홈/어웨이 선택'){
        alert('홈, 어웨이 선택해')
    }
    else if($('#yearSelect option:selected').val() == '--'){
        alert('연도 선택해')
    }
    else if($('#team option:selected').val() == '팀 선택'){
        alert('팀 선택해')
    }
    else if($('#player option:selected').val() == '선수 선택'){
        alert('선수 선택해')
    }
    else {
        let selected_H_A = $('#sel_home_away option:selected').val();
        let selectedYear = $('#yearSelect option:selected').val();
        let selectedTeam = $('#team option:selected').val();
        let selectedPlayer = $('#player option:selected').val();
        console.log(selectedYear, selectedTeam, selectedPlayer)
        $.ajax({
            url:'/addPlayer',
            type:'POST',
            data : {'year': selectedYear, 'team' : selectedTeam, 'player': selectedPlayer},
            success: function(data) {
                let selectedPosition = data[0]
                add_player_common(selectedPlayer, selectedPosition, selected_H_A, selectedYear, selectedTeam);
            }
        })
    }
}
// 오버레이창 선수 추가
function add_player_overlay(i){
    console.log(i);
    var kin = $('#added_player_' + i).text();
    var arr = kin.split('  ');
    let selected_H_A = $('#sel_home_away_' + i).find('option:selected').text();
    let selectedPlayer = arr[2];
    let selectedPosition = arr[3];
    let selectedYear = arr[0];
    let selectedTeam = arr[1];
    if(selected_H_A == '홈/어웨이 선택'){
        alert('홈/어웨이 선택해');
    }
    else{
        console.log(selected_H_A, selectedPlayer, selectedPosition);
        add_player_common(selectedPlayer, selectedPosition, selected_H_A, selectedYear, selectedTeam);
        off()
    }
}
// 선수 선택 취소
function cancel_click(clicked_value){
    console.log(clicked_value)
    arr = []
    arr.push(clicked_value.split('_'))
    if(arr[0][0] == 'home'){
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(1)').empty();
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(2)').empty();
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(1)').append('player');
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(0)').css({
            'color': '#aaa'
        })
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(1)').css({
            'color': '#aaa'
        })
        console.log('complete')
    }
    else{
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(1)').empty();
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(2)').empty();
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(1)').append('player');
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(0)').css({
            'color': '#aaa'
        })
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(1)').css({
            'color': '#aaa'
        })
        console.log('complete')
    }
}

// 선수 검색 오버레이
$(document).on("click", "#search_button", function(){
    str = $('#searchStr').val()
    str = str.trim()
    console.log(str)
    $.ajax({
        url:'/searchByStr',
        type:'POST',
        data : {'str' : str},
        success: function(data) {
            console.log(data)
            if(data.length < 1) {
                $('#overlay_in').append('<br><br><br><br><br><br><br><br><br><br><h1>검색 결과가 없습니당;</h1>');
            }
            for (let i = 0; i < data.length; i++) {
                let year = data[i]['year']
                let team = data[i]['team']
                let name = data[i]['name']
                let position = data[i]['position']
                console.log(year, team, name, position)
                let output = '<div id="added_player_'+ i +'" style="display:inline;">';
                output += year;
                output += '  ' + team;
                output += '  ' + name;
                output += '  ' + position + '  ';
                output += '</div><select id="sel_home_away_'+ i +'"><option value="홈/어웨이" selected="" disabled="" hidden="">홈/어웨이 선택</option>';
                output += '<option name="1">Home</option><option name="2">Away</option></select>&nbsp;';
                output += '<button onclick="add_player_overlay(' + i + ')" class="overlay_add_button" style="display:inline">추가</button><br><br>';
                $('#overlay_in').append(output);
            }
        }
    });
    document.getElementById("overlay").style.display = "block";
})
// 오버레이 닫기
function off() {
    console.log('close')
    document.getElementById("overlay").style.display = "none";
    $('#overlay_in').empty();
    $('#searchStr').focus();
    }
// 선수검색 키워드 엔터 눌렀을때
function enterkey() {
    if(window.event.keyCode == 13){
        console.log('enter')
        $('#search_button').click()
    }
}
// 오버레이 창에서 esc 눌렀을때
window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;
	if(key == 27) {
		$(".search_overlay_button").click();
	}
}


//Live_Board Section
// 이닝 버튼 눌렀을 때
let inning_on_off = document.getElementsByClassName('inning_button');
function handleClick(event){
    if(event.target.classList[1] === 'clicked'){
        event.target.classList.remove('clicked');
    } else{
        for(var i = 0; i < inning_on_off.length; i++){
            inning_on_off[i].classList.remove('clicked');
        }
        event.target.classList.add('clicked');
    }
}
function inning_button() {
    for (var i = 0; i < inning_on_off.length; i++){
        inning_on_off[i].addEventListener('click', handleClick);
    }
}
