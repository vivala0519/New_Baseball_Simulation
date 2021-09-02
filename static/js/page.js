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
            position_set += '<option>중견수</option> <option>우익수</option> <option>지명타자</option> <option>투수</option>';
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
    console.log(Year_and_Team)
    Year_and_Team = Year_and_Team.substring(2, 8);
    console.log(Year_and_Team);
    console.log(selected_H_A);
    selectedPlayer = Year_and_Team + '  ' + selectedPlayer
    if(selectedPosition != 'P'){
        for(var i = 1; i<=9; i++){
            console.log('position', selectedPosition)
            if(selected_H_A == 'Home') {
                // 포지션 중복 시
                for(var j = 2; j < 11; j++){
                    if($('#home_table > tbody > tr:nth-child('+ j +') > td:nth-child(3)').text() == selectedPosition){
                        selectedPosition = 'DH';
                    }
                    if($('#home_table > tbody > tr:nth-child('+ j +') > td:nth-child(3)').text() == 'DH' & $('#home_table > tbody > tr:nth-child('+ j +') > td:nth-child(3)').text() == selectedPosition){
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
                        'color': '#00008B', 'text-shadow':'2px 2px 2px gray'
                    })
                    $('#home_table tr:eq('+i+')>td:eq(1)').css({
                        'color': '#00008B', 'text-shadow':'2px 2px 2px gray'
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
                    if($('#away_table > tbody > tr:nth-child('+ j +') > td:nth-child(3)').text() == 'DH' & $('#away_table > tbody > tr:nth-child('+ j +') > td:nth-child(3)').text() == selectedPosition){
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
                        'color': '#00008B', 'text-shadow':'2px 2px 2px gray'
                    })
                    $('#away_table tr:eq('+i+')>td:eq(1)').css({
                        'color': '#00008B', 'text-shadow':'2px 2px 2px gray'
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
                        'color': '#8B0000', 'text-shadow':'2px 2px 2px gray'
                    })
                    $('#home_table tr:eq('+i+')>td:eq(1)').css({
                        'color': '#8B0000', 'text-shadow':'2px 2px 2px gray'
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
                        'color': '#8B0000', 'text-shadow':'2px 2px 2px gray'
                    })
                    $('#away_table tr:eq('+i+')>td:eq(1)').css({
                        'color': '#8B0000', 'text-shadow':'2px 2px 2px gray'
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
        swal({
            title: '홈/어웨이 선택하고 선수 추가해주세여',
            icon: 'error',
            button: 'Ok 확인~'
        })
    }
    else if($('#yearSelect option:selected').val() == '--'){
        swal({
            title: '연도 선택해',
            icon: 'error',
            button: 'Ok 확인~'
        })
    }
    else if($('#team option:selected').val() == '팀 선택'){
        swal({
            title: '팀 선택해',
            icon: 'error',
            button: 'Ok 확인~'
        })
    }
    else if($('#player option:selected').val() == '선수 선택'){
        swal({
            title: '선수 선택해',
            icon: 'error',
            button: 'Ok 확인~'
        })
    }
    else {
        let selected_H_A = $('#sel_home_away option:selected').val();
        let selectedYear = $('#yearSelect option:selected').val();
        let selectedTeam = $('#team option:selected').val();
        let selectedPlayer = $('#player option:selected').val();
//        console.log(selectedYear, selectedTeam, selectedPlayer)
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
//    console.log(i);
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
//        console.log(selected_H_A, selectedPlayer, selectedPosition);
        add_player_common(selectedPlayer, selectedPosition, selected_H_A, selectedYear, selectedTeam);
        off()
    }
}
// 선수 선택 취소
function cancel_click(clicked_value){
//    console.log(clicked_value)
    arr = []
    arr.push(clicked_value.split('_'))
    if(arr[0][0] == 'home'){
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(1)').empty();
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(2)').empty();
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(1)').append('player');
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(0)').css({
            'color': '', 'text-shadow': ''
        })
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(1)').css({
            'color': '', 'text-shadow': ''
        })
//        console.log('complete')
    }
    else{
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(1)').empty();
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(2)').empty();
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(1)').append('player');
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(0)').css({
            'color': '', 'text-shadow': ''
        })
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(1)').css({
            'color': '', 'text-shadow': ''
        })
//        console.log('complete')
    }
}

// 선수 검색 오버레이
$(document).on("click", "#search_button", function(){
    str = $('#searchStr').val()
    str = str.trim()
//    console.log(str)
    $.ajax({
        url:'/searchByStr',
        type:'POST',
        data : {'str' : str},
        success: function(data) {
//            console.log(data)
            if(data.length < 1) {
                $('#overlay_in').append('<br><br><br><br><br><br><br><br><br><br><h1>검색 결과가 없습니당;</h1>');
            }
            for (let i = 0; i < data.length; i++) {
                let year = data[i]['year']
                let team = data[i]['team']
                let name = data[i]['name']
                let position = data[i]['position']
//                console.log(year, team, name, position)
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
function overlay_off() {
//    console.log('close')
    document.getElementById("overlay").style.display = "none";
//    console.log('hi')
    $('#overlay_in').empty();
    $('#searchStr').focus();
    }
// 선수검색 키워드 엔터 눌렀을때
function enterkey() {
    if(window.event.keyCode == 13){
//        console.log('enter')
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


// Live_Board Section
// 이닝 버튼 눌렀을 때
let inning_on_off = document.getElementsByClassName('inning_button');
let record = document.getElementsByClassName('record_board');
function handleClick(event){
    console.log('hi')
    if($('#record_board_0').css("display") == "block"){
        return
    }
    else{
        if(event.target.classList[1] === 'clicked'){
            event.target.classList.remove('clicked');
        } else{
            for(var i = 0; i < inning_on_off.length; i++){
                inning_on_off[i].classList.remove('clicked');
            }
            event.target.classList.add('clicked');
            var clicked_button = $(this).attr("id");
            clicked_button = clicked_button.split('_')[2]
            $('#record_board_' + clicked_button).css({'display': 'block'});
            for(var i=1; i <14; i++){
                if(i == clicked_button){
                    continue
                }
                $('#record_board_' + i).css({'display': 'none'});
            }
        }
    }

}
function inning_button() {
    for (var i = 0; i < inning_on_off.length; i++){
        inning_on_off[i].addEventListener('click', handleClick);
    }
}


// play ball 눌렀을 때
function play_button(){
    home_list = ''
    away_list = ''
    for(var i = 1; i <= 12; i++){
        player = $('#home_table tr:eq('+ i +')>td:eq(1)').text()
        home_list += i + '-' + player.replace("  ", "-") + ','
        player = $('#away_table tr:eq('+ i +')>td:eq(1)').text()
        away_list += i + '-' + player.replace("  ", "-") + ','
        if(player == 'player'){
            swal({
                title: '경기 진행 불가',
                text: '선수들이 출근을 안함; 라인업에 추가해주셈.',
                icon: 'error',
                button: 'Ok 확인~'
            })
            break;
        }
    }
    $.ajax({
        url:'/playBall',
        type:'POST',
        data : {'home_list' : home_list, 'away_list': away_list},
        success: function(data) {
//            $('#record_board_0').remove();
            document.getElementById("record_board_0").style.display = "none";
            for(var i = 0; i < 13; i++){
                $('#record_board_'+ i).empty();
            }
            cut_arr = data.split('score_board')[0];
            cut_arr = cut_arr.split('inning_cut_line');
            cut_report = data.split('report')[1];
            away_report_str = cut_report.split('home')[0];
            home_report_str = cut_report.split('home')[1];
            score_board = data.split('score_board')[1];
            score_board_total = data.split('here_total')[1]
            pitcher_report_str = data.split('pitchers')[1]

            score_board_append(score_board, score_board_total);
            report_arrange(away_report_str, home_report_str, home_list, away_list);
            pitcher_report_append(pitcher_report_str)

            for(var i = 0; i < 14; i++){
                if(cut_arr[i] == undefined){
                    continue;
                }
                else{
                    cut_arr[i] = cut_arr[i].split('\n');
                }
            }
            for(var i = 1; i < 14; i++){
                for(var j = 0; j < 300; j++){
                    if(cut_arr[i-1][j] == undefined){
                        continue;
                    }
                    else{
                        cut_arr[i-1][j] = cut_arr[i-1][j].replaceAll('-------------------', '<hr align="center" style="border:ridge 7px #9ACD32;">')
                        $('#record_board_' + i).append('<p>' + cut_arr[i-1][j] + '</p>');
                    }
                }
                $('#record_board_1').css({'display': 'block'});
                document.getElementById('inning_button_1').className += ' clicked';
            }
        }
    });
}

// 스코어보드 attach
function score_board_append(){
    away_score = [];
    home_score = [];
    for(var i = 0; i < 24; i++){
        if(score_board[i] == undefined){
            continue;
        }
        else{
            if(i % 2 == 0){
                away_score.push(score_board.split(' ')[i]);
            }
            else{
                home_score.push(score_board.split(' ')[i]);
            }
        }
    }
    for(var i = 1; i < 13; i++){
        $('#score_board_table tr:eq(1)>td:eq('+ i +')').empty();
        $('#score_board_table tr:eq(2)>td:eq('+ i +')').empty();
        $('#score_board_table tr:eq(1)>td:eq('+ i +')').append(away_score[i-1]);
        $('#score_board_table tr:eq(2)>td:eq('+ i +')').append(home_score[i-1]);
    }
    $('#score_board_table tr:eq(1)>td:eq(13)').empty()
    $('#score_board_table tr:eq(2)>td:eq(13)').empty()
    $('#score_board_table tr:eq(1)>td:eq(13)').append(score_board_total.split(' ')[0])
    $('#score_board_table tr:eq(2)>td:eq(13)').append(score_board_total.split(' ')[1])
}

// 타자기록 기록창 attach
function report_arrange(){
    // 1~9번까지 기록 저장
    away_report_arr = away_report_str.split('\n')
    away_report_arr = away_report_arr.filter(function(item) {
      return item !== null && item !== undefined && item !== '';
    });
    home_report_arr = home_report_str.split('\n')
    home_report_arr = home_report_arr.filter(function(item) {
      return item !== null && item !== undefined && item !== '';
    });
    away_num_1_hitter = []
    away_num_2_hitter = []
    away_num_3_hitter = []
    away_num_4_hitter = []
    away_num_5_hitter = []
    away_num_6_hitter = []
    away_num_7_hitter = []
    away_num_8_hitter = []
    away_num_9_hitter = []
    for(var i = 0; i < away_report_arr.length; i+=9){
        away_num_1_hitter.push(away_report_arr[i]);
        away_num_1_hitter = away_num_1_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        away_num_2_hitter.push(away_report_arr[i+1]);
        away_num_2_hitter = away_num_2_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        away_num_3_hitter.push(away_report_arr[i+2]);
        away_num_3_hitter = away_num_3_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        away_num_4_hitter.push(away_report_arr[i+3]);
        away_num_4_hitter = away_num_4_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        away_num_5_hitter.push(away_report_arr[i+4]);
        away_num_5_hitter = away_num_5_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        away_num_6_hitter.push(away_report_arr[i+5]);
        away_num_6_hitter = away_num_6_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        away_num_7_hitter.push(away_report_arr[i+6]);
        away_num_7_hitter = away_num_7_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        away_num_8_hitter.push(away_report_arr[i+7]);
        away_num_8_hitter = away_num_8_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        away_num_9_hitter.push(away_report_arr[i+8]);
        away_num_9_hitter = away_num_9_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
    }
    away_report_dic = []
    away_report_dic.push(away_num_1_hitter, away_num_2_hitter, away_num_3_hitter, away_num_4_hitter, away_num_5_hitter, away_num_6_hitter,
        away_num_7_hitter, away_num_8_hitter, away_num_9_hitter);
    home_num_1_hitter = []
    home_num_2_hitter = []
    home_num_3_hitter = []
    home_num_4_hitter = []
    home_num_5_hitter = []
    home_num_6_hitter = []
    home_num_7_hitter = []
    home_num_8_hitter = []
    home_num_9_hitter = []
    for(var i = 0; i < away_report_arr.length; i+=9){
        home_num_1_hitter.push(home_report_arr[i]);
        home_num_1_hitter = home_num_1_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        home_num_2_hitter.push(home_report_arr[i+1]);
        home_num_2_hitter = home_num_2_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        home_num_3_hitter.push(home_report_arr[i+2]);
        home_num_3_hitter = home_num_3_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        home_num_4_hitter.push(home_report_arr[i+3]);
        home_num_4_hitter = home_num_4_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        home_num_5_hitter.push(home_report_arr[i+4]);
        home_num_5_hitter = home_num_5_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        home_num_6_hitter.push(home_report_arr[i+5]);
        home_num_6_hitter = home_num_6_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        home_num_7_hitter.push(home_report_arr[i+6]);
        home_num_7_hitter = home_num_7_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        home_num_8_hitter.push(home_report_arr[i+7]);
        home_num_8_hitter = home_num_8_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
        home_num_9_hitter.push(home_report_arr[i+8]);
        home_num_9_hitter = home_num_9_hitter.filter(function(item) {
          return item !== null && item !== undefined && item !== '';
        });
    }
    home_report_dic = []
    home_report_dic.push(home_num_1_hitter, home_num_2_hitter, home_num_3_hitter, home_num_4_hitter, home_num_5_hitter,
        home_num_6_hitter, home_num_7_hitter, home_num_8_hitter, home_num_9_hitter);


    // 1~9번 별 타수, 안타, 아웃, 볼넷
    away_report_out = []
    away_report_hit = []
    away_report_bb = []
    away_report_number = []
    away_total_hit = 0
    away_total_bb = 0
    for(var i = 0; i < away_report_dic.length; i++){
        out = 0;
        hit = 0;
        bb = 0;
        number = 0;
        for(var j = 0; j < away_report_dic[i].length; j++){
            away_report_dic[i][j] = away_report_dic[i][j].substring(3,5);
            if(away_report_dic[i][j] == '아웃'){
                out += 1
                number += 1
            }
            if(away_report_dic[i][j] == '안타'){
                hit += 1
                number += 1
                away_total_hit += 1
            }
            if(away_report_dic[i][j] == '볼넷'){
                bb += 1
                away_total_bb += 1
            }
        }
        away_report_out.push(out)
        away_report_hit.push(hit)
        away_report_bb.push(bb)
        away_report_number.push(number)
    }

    home_report_out = []
    home_report_hit = []
    home_report_bb = []
    home_report_number = []
    home_total_hit = 0
    home_total_bb = 0
    for(var i = 0; i < home_report_dic.length; i++){
        out = 0;
        hit = 0;
        bb = 0;
        number = 0;
        for(var j = 0; j < home_report_dic[i].length; j++){
            home_report_dic[i][j] = home_report_dic[i][j].substring(3,5);
            if(home_report_dic[i][j] == '아웃'){
                out += 1
                number += 1
            }
            if(home_report_dic[i][j] == '안타'){
                hit += 1
                number += 1
                home_total_hit += 1
            }
            if(home_report_dic[i][j] == '볼넷'){
                bb += 1
                home_total_bb += 1
            }
        }
        home_report_out.push(out)
        home_report_hit.push(hit)
        home_report_bb.push(bb)
        home_report_number.push(number)
    }

//    console.log('away_report_number : ', away_report_number, 'away_report_hit : ', away_report_hit, 'away_report_out', away_report_out, 'away_report_bb', away_report_bb, 'away_report_dic', away_report_dic)
//    console.log(home_report_number, home_report_hit, home_report_out, home_report_bb, home_report_dic)


    // 선수별 기록 정제
    home_list = home_list.split(',')
    home_list[0] = home_list[0].replace('-','번 ')
    home_list[0] = home_list[0].replace('-',' ')
    for(var i = 0; i < 9; i++){
        home_list[i] = home_list[i].replace('-','번 ')
        home_list[i] = home_list[i].replace('-',' ')
        if(home_report_bb[i] == 0){
            home_list[i] = home_list[i] + ' : <span class="record">' + home_report_number[i] + '타수 ' + home_report_hit[i] + '안타</span>'
        }
        else{
            home_list[i] = home_list[i] + ' : <span class="record">' + home_report_number[i] + '타수 ' + home_report_hit[i] + '안타 ' + home_report_bb[i] + '볼넷</span>'
        }

    }
    away_list = away_list.split(',')
    away_list[0] = away_list[0].replace('-','번 ')
    away_list[0] = away_list[0].replace('-',' ')
    for(var i = 0; i < 9; i++){
        away_list[i] = away_list[i].replace('-','번 ')
        away_list[i] = away_list[i].replace('-',' ')
        if(away_report_bb[i] == 0){
            away_list[i] = away_list[i] + ' : <span class="record">' + away_report_number[i] + '타수 ' + away_report_hit[i] + '안타</span>'
        }
        else{
            away_list[i] = away_list[i] + ' : <span class="record">' + away_report_number[i] + '타수 ' + away_report_hit[i] + '안타 ' + away_report_bb[i] + '볼넷</span>'
        }

    }
    // 스코어보드 H, B attach
    $('#score_board_table tr:eq(1)>td:eq(14)').empty()
    $('#score_board_table tr:eq(1)>td:eq(14)').append(away_total_hit)
    $('#score_board_table tr:eq(2)>td:eq(14)').empty()
    $('#score_board_table tr:eq(2)>td:eq(14)').append(home_total_hit)
    $('#score_board_table tr:eq(1)>td:eq(16)').empty()
    $('#score_board_table tr:eq(1)>td:eq(16)').append(away_total_bb)
    $('#score_board_table tr:eq(2)>td:eq(16)').empty()
    $('#score_board_table tr:eq(2)>td:eq(16)').append(home_total_bb)

    // 기록창 attach
    $('#in_report').empty();
    score_board = $('#score_board').clone()
    $('#in_report').append(score_board);
    $('#in_report_home').append('<h4 > Home </h4>')
    $('#in_report_away').append('<h4 > Away </h4>')

    for(var i = 0; i < 9; i++) {
        $('#in_report_home').append('<p class="report_font">' + home_list[i] + '</p>');
    }
    for(var i = 0; i < 9; i++) {
        $('#in_report_away').append('<p class="report_font">' + away_list[i] + '</p>');
    }

    document.getElementById("report").style.display = "block";
}

// 투수기록 기록창 attach
function pitcher_report_append(){
//    console.log(pitcher_report_str)
    // 선발, 중계, 마무리 분류
    home_pitcher_list = pitcher_report_str.split(']]')[0].split('[[')[1].split('], [')
    away_pitcher_list = pitcher_report_str.split(']]')[1].split('[[')[1].split('], [')
    to_replace = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
    for(var i = 0; i < 3; i++){
        home_pitcher_list[i] = home_pitcher_list[i].replaceAll(to_replace, '').substring(2)
        away_pitcher_list[i] = away_pitcher_list[i].replaceAll(to_replace, '').substring(2)
    }
    home_pitcher_sp = home_pitcher_list[0]
    home_pitcher_sp = home_pitcher_sp.substring(0,4) + ' ' + home_pitcher_sp.substring(4)
    home_pitcher_rp = home_pitcher_list[1]
    home_pitcher_rp = home_pitcher_rp.substring(0,4) + ' ' + home_pitcher_rp.substring(4)
    home_pitcher_cp = home_pitcher_list[2]
    home_pitcher_cp = home_pitcher_cp.substring(0,4) + ' ' + home_pitcher_cp.substring(4)
    away_pitcher_sp = away_pitcher_list[0]
    away_pitcher_sp = away_pitcher_sp.substring(0,4) + ' ' + away_pitcher_sp.substring(4)
    away_pitcher_rp = away_pitcher_list[1]
    away_pitcher_rp = away_pitcher_rp.substring(0,4) + ' ' + away_pitcher_rp.substring(4)
    away_pitcher_cp = away_pitcher_list[2]
    away_pitcher_cp = away_pitcher_cp.substring(0,4) + ' ' + away_pitcher_cp.substring(4)

    // 이닝 도출하기
    home_pitcher_inning = pitcher_report_str.split('in')[1].split(', ')[0].split('change')
    away_pitcher_inning = pitcher_report_str.split('in')[1].split(', ')[1].split('change')
    end_inning = away_pitcher_inning.pop()
    if(end_inning.length == 7){ // 9초에 경기가 끝나면 홈, 어웨이 투수 끝이닝
        end_inning_away = 8
        end_inning_home = 9
    }
    else{
        end_inning_home = end_inning.split(' ')[1]
        end_inning_away = String(Number(end_inning.split(' ')[1]) - 1)
        dot = Number(end_inning.split(' ')[3])
        if(dot == 3){
            end_inning_away = Number(end_inning_away) + 1
        }
        else if(dot == 0){
            end_inning_away = end_inning_away
        }
        else{
            end_inning_away += '.' + String(dot)
        }
    }

    // home
    if (home_pitcher_inning.length > 1) { // 완봉이 아닐경우
        home_pitcher_inning.splice(0, 1);
        // 선발투수 부문
        home_sp_inning_arr = home_pitcher_inning[0].split('이닝')
        home_sp_inning = String(Number(home_sp_inning_arr[1]) - 1)
        if(Number(home_sp_inning_arr[2]) != 0){
            home_sp_inning += '.' + home_sp_inning_arr[2] + '이닝'
        }
        else{
            home_sp_inning += '이닝'
        }
        // 중계, 마무리 부문
        if(home_pitcher_inning.length == 1){    // 선발과 중계만 나온 경우
            to_cal = home_pitcher_inning[0].split('이닝')
            console.log(to_cal)
            front = to_cal[1]
            console.log(front)
            back = to_cal[2]
            console.log(back)
            sum = Number(front * 3) + Number(back)
            console.log(sum)
            to_cal = ((end_inning_home + 1) * 3) - sum
            console.log(to_cal)
            front = Math.floor(to_cal / 3)
            console.log(front)
            back = to_cal % 3
            console.log(back)
            if(back == 0){
                home_rp_inning = front + '이닝'
            }
            else{
                home_rp_inning = front + '.' + back
                home_rp_inning += '이닝'
            }
            home_cp_inning = ''
        }
        else{   // 중계, 마무리 부문
            home_rp_inning_arr = home_pitcher_inning[1].split('이닝')
            to_cal = home_pitcher_inning[0].split('이닝')
            to_cal = (Number(home_rp_inning_arr[1]) * 3 + Number(home_rp_inning_arr[2])) - (Number(to_cal[1]) * 3 + Number(to_cal[2]))
            if(to_cal % 3 == 0){
                home_rp_inning = to_cal / 3
            }
            else{
                home_rp_inning = String(parseInt(to_cal / 3)) + '.' + String(to_cal % 3)
            }
            home_rp_inning += '이닝'
            // 마무리 부문
            cut_sp = home_sp_inning.split('이닝')[0]
            cut_rp = home_rp_inning.split('이닝')[0]
            sum = Number(cut_sp) + Number(cut_rp)
            sum = sum.toFixed(1)
            sum = String(sum).split('.')
            home_cp_inning = (end_inning_home * 3) - (Number(sum[0] * 3) + Number(sum[1]))
            front = Math.floor(home_cp_inning / 3)
            back = home_cp_inning % 3
            if(back == 0){
                home_cp_inning = front + '이닝'
            }
            else{
                home_cp_inning = front + '.' + back
                home_cp_inning += '이닝'
            }
        }
    }
    else{   // 완봉일 경우
        home_sp_inning = end_inning
    }
    // Away-------------------------------------------------------------------------------
    if (away_pitcher_inning.length > 1) {
        away_pitcher_inning.splice(0, 1);
        // 선발투수 부문
        away_sp_inning_arr = away_pitcher_inning[0].split('이닝')
        away_sp_inning = String(Number(away_sp_inning_arr[1]) - 1)
        if(Number(away_sp_inning_arr[2]) != 0){
            away_sp_inning += '.' + away_sp_inning_arr[2] + '이닝'
        }
        else{
            away_sp_inning += '이닝'
        }
        // 중계, 마무리 부문
        if(away_pitcher_inning.length == 1){    // 선발과 중계만 나온 경우
            to_cal = away_pitcher_inning[0].split('이닝')
            front = to_cal[1] - 1
            back = to_cal[2]
            sum = Number(front * 3) + Number(back)
            end_inning_away = String(end_inning_away).split('.')
            ending_front = end_inning_away[0]
            ending_back = end_inning_away[1]
            to_cal = ((ending_front * 3) + ending_back) - ((front * 3) + back)
            front = Math.floor(to_cal / 3)
            back = to_cal % 3
            if(back == 0){
                away_rp_inning = front + '이닝'
            }
            else{
                away_rp_inning = front + '.' + back
                away_rp_inning += '이닝'
            }
            away_cp_inning = ''
        }
        else{   // 중계, 마무리 부문
            away_rp_inning_arr = away_pitcher_inning[1].split('이닝')
            to_cal = away_pitcher_inning[0].split('이닝')
            to_cal = (Number(away_rp_inning_arr[1]) * 3 + Number(away_rp_inning_arr[2])) - (Number(to_cal[1]) * 3 + Number(to_cal[2]))
            if(to_cal % 3 == 0){
                away_rp_inning = to_cal / 3
            }
            else{
                away_rp_inning = String(parseInt(to_cal / 3)) + '.' + String(to_cal % 3)
            }
            away_rp_inning += '이닝'
            // 마무리 부문
            cut_sp = away_sp_inning.split('이닝')[0]
            cut_rp = away_rp_inning.split('이닝')[0]
            sum = Number(cut_sp) + Number(cut_rp)
            sum = sum.toFixed(1)
            sum = String(sum).split('.')
            end_inning_away = Number(end_inning_away).toFixed(1)
            end_inning_away = String(end_inning_away)
            end_inning_away = end_inning_away.split('.')
            ending_front = Number(end_inning_away[0])
            ending_back = Number(end_inning_away[1])
            away_cp_inning = ((ending_front * 3) + ending_back) - (Number(sum[0] * 3) + Number(sum[1]))
            front = Math.floor(away_cp_inning / 3)
            back = away_cp_inning % 3
            if(back == 0){
                away_cp_inning = front + '이닝'
            }
            else{
                away_cp_inning = front + '.' + back
                away_cp_inning += '이닝'
            }
        }
    }
    else{   // 완봉일 경우
        away_sp_inning = end_inning
    }

    // 실점 attach
    /// str 정제
    lost_str = pitcher_report_str.split('lost ')[1]
    lost_str_home = lost_str.split(',and ')[0]
    lost_str_away = lost_str.split(',and ')[1]
    lost_str_home_arr = lost_str_home.split(',')
    lost_str_away_arr = lost_str_away.split(',')
    lost_str_home_arr[0] = lost_str_home_arr[0].substring(4)
    lost_str_away_arr[0] = lost_str_away_arr[0].substring(4)
    lost_str_home_arr = lost_str_home_arr.filter((element) => element !== '');
    lost_str_away_arr = lost_str_away_arr.filter((element) => element !== '');
//    console.log(lost_str_home_arr, lost_str_away_arr)
    /// sp, rp, cp 나누기
    home_sp_lost = 0
    home_rp_lost = 0
    home_cp_lost = 0
    away_sp_lost = 0
    away_rp_lost = 0
    away_cp_lost = 0
    for(i = 0; i < lost_str_home_arr.length; i++){
        if(lost_str_home_arr[i].split('-')[0] == '10'){     // 선발
            home_sp_lost += Number(lost_str_home_arr[i].split('-')[1])
        }
        if(lost_str_home_arr[i].split('-')[0] == '11'){     // 중계
            home_rp_lost += Number(lost_str_home_arr[i].split('-')[1])
        }
        if(lost_str_home_arr[i].split('-')[0] == '12'){    // 마무리
            home_cp_lost += Number(lost_str_home_arr[i].split('-')[1])
        }
    }
    for(i = 0; i < lost_str_away_arr.length; i++){
        if(lost_str_away_arr[i].split('-')[0] == '10'){     // 선발
            away_sp_lost += Number(lost_str_away_arr[i].split('-')[1])
        }
        if(lost_str_away_arr[i].split('-')[0] == '11'){     // 중계
            away_rp_lost += Number(lost_str_away_arr[i].split('-')[1])
        }
        if(lost_str_away_arr[i].split('-')[0] == '12'){     // 마무리
            away_cp_lost += Number(lost_str_away_arr[i].split('-')[1])
        }
    }
//    console.log(home_sp_lost, home_rp_lost, home_cp_lost, away_sp_lost, away_rp_lost, away_cp_lost)

    // 삼진 attach
    /// str 정제
    k_str = pitcher_report_str.split('k ')[1]
    k_str = k_str.split(',')[0]
    k_str_home = k_str.split('and ')[0].substring(4)
    k_str_away = k_str.split('and ')[1].substring(4)
//    console.log(k_str_home, k_str_away)
    home_sp_k = 0
    home_rp_k = 0
    home_cp_k = 0
    away_sp_k = 0
    away_rp_k = 0
    away_cp_k = 0
    for(i = 0; i < k_str_home.length; i += 3){
        if(k_str_home.substring(i, i + 2) == '10'){
            home_sp_k += 1
        }
        if(k_str_home.substring(i, i + 2) == '11'){
            home_rp_k += 1
          }
        if(k_str_home.substring(i, i + 2) == '12'){
            home_cp_k += 1
        }
    }
    for(i = 0; i < k_str_away.length; i += 3){
        if(k_str_away.substring(i, i + 2) == '10'){
            away_sp_k += 1
        }
        if(k_str_away.substring(i, i + 2) == '11'){
            away_rp_k += 1
          }
        if(k_str_away.substring(i, i + 2) == '12'){
            away_cp_k += 1
        }
    }
//    console.log(home_sp_k, home_rp_k, home_cp_k, away_sp_k, away_rp_k, away_cp_k)


    // report 창 send
    $('#in_report_home').append('<hr><p class="report_font"> 선발 ' + home_pitcher_sp + ' : <span class="record">' + home_sp_inning + ' ' + home_sp_lost + '실점 ' + home_sp_k + '삼진</span></p>');
    if(home_rp_inning == ''){
        $('#in_report_home').append('<p class="report_font"> 중계 ' + home_pitcher_rp + ' : <span class="record">' + home_rp_inning + '</span></p>');
    }
    else{
        $('#in_report_home').append('<p class="report_font"> 중계 ' + home_pitcher_rp + ' : <span class="record">' + home_rp_inning + ' ' + home_rp_lost + '실점 ' + home_rp_k + '삼진</span></p>');
    }
    if(home_cp_inning == ''){
        $('#in_report_home').append('<p class="report_font"> 마무리 ' + home_pitcher_cp + ' : <span class="record">' + home_cp_inning + '</span></p>');
    }
    else{
        $('#in_report_home').append('<p class="report_font"> 마무리 ' + home_pitcher_cp + ' : <span class="record">' + home_cp_inning + ' ' + home_cp_lost + '실점 ' + home_cp_k + '삼진</span></p>');
    }

    $('#in_report_away').append('<hr><p class="report_font"> 선발 ' + away_pitcher_sp + ' : <span class="record">' + away_sp_inning + ' ' + away_sp_lost + '실점 ' + away_sp_k + '삼진</span></p>');
    if(away_rp_inning == ''){
        $('#in_report_away').append('<p class="report_font"> 중계 ' + away_pitcher_rp + ' : <span class="record">' + away_rp_inning + '</span></p>');
    }
    else{
        $('#in_report_away').append('<p class="report_font"> 중계 ' + away_pitcher_rp + ' : <span class="record">' + away_rp_inning + ' ' + away_rp_lost + '실점 ' + away_rp_k + '삼진</span></p>');
    }
    if(away_cp_inning == ''){
        $('#in_report_away').append('<p class="report_font"> 마무리 ' + away_pitcher_cp + ' : <span class="record">' + away_cp_inning + '</span></p>');
    }
    else{
        $('#in_report_away').append('<p class="report_font"> 마무리 ' + away_pitcher_cp + ' : <span class="record">' + away_cp_inning + ' ' + away_cp_lost + '실점 ' + away_cp_k + '삼진</span></p>');
    }
    document.getElementById("re_game").style.display = "block";
    $('#to_gap').append('<br>')
}
// 기록창 off
function off() {
    console.log('close')
    document.getElementById("report").style.display = "none";
    $('#searchStr').focus();
    }
// 기록창 on
$(document).on("click", "#inning_button_13", function(){
    document.getElementById("report").style.display = "block";
});

// 재경기
function re_game(){
    $('#in_report_home').empty();
    $('#in_report_away').empty();
    $('#to_gap').empty();
    play_button();
};