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
    Year_and_Team = Year_and_Team.substring(2, 7);
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
                        'color': '#483D8B', 'text-shadow':'2px 2px 2px gray'
                    })
                    $('#home_table tr:eq('+i+')>td:eq(1)').css({
                        'color': '#483D8B', 'text-shadow':'2px 2px 2px gray'
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
                        'color': '#483D8B', 'text-shadow':'2px 2px 2px gray'
                    })
                    $('#away_table tr:eq('+i+')>td:eq(1)').css({
                        'color': '#483D8B', 'text-shadow':'2px 2px 2px gray'
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


// Live_Board Section
// 이닝 버튼 눌렀을 때
let inning_on_off = document.getElementsByClassName('inning_button');
let record = document.getElementsByClassName('record_board');
function handleClick(event){
    if($('#record_board_0').length == 1){
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
$(document).on("click", "#play_ball", function(){
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
            $('#record_board_0').remove();
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

            score_board_append(score_board, score_board_total);
            report_arrange(away_report_str, home_report_str, home_list, away_list);

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
})

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
        $('#score_board_table tr:eq(1)>td:eq('+ i +')').append(away_score[i-1]);
        $('#score_board_table tr:eq(2)>td:eq('+ i +')').append(home_score[i-1]);
    }
    $('#score_board_table tr:eq(1)>td:eq(13)').empty()
    $('#score_board_table tr:eq(2)>td:eq(13)').empty()
    $('#score_board_table tr:eq(1)>td:eq(13)').append(score_board_total.split(' ')[0])
    $('#score_board_table tr:eq(2)>td:eq(13)').append(score_board_total.split(' ')[1])
}

// 기록창 attach
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

//    console.log(away_report_number, away_report_hit, away_report_out, away_report_bb, away_report_dic)
//    console.log(home_report_number, home_report_hit, home_report_out, home_report_bb, home_report_dic)


    // 선수별 기록 정제
    home_list = home_list.split(',')
    home_list[0] = home_list[0].replace('-','번 ')
    home_list[0] = home_list[0].replace('-',' ')
    for(var i = 0; i < 9; i++){
        home_list[i] = home_list[i].replace('-','번 ')
        home_list[i] = home_list[i].replace('-',' ')
        home_list[i] = home_list[i] + ' : ' + home_report_number[i] + '타수 ' + home_report_hit[i] + '안타'
    }
    away_list = away_list.split(',')
    away_list[0] = away_list[0].replace('-','번 ')
    away_list[0] = away_list[0].replace('-',' ')
    for(var i = 0; i < 9; i++){
        away_list[i] = away_list[i].replace('-','번 ')
        away_list[i] = away_list[i].replace('-',' ')
        away_list[i] = away_list[i] + ' : ' + away_report_number[i] + '타수 ' + away_report_hit[i] + '안타'
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

    for(var i = 0; i < 9; i++) {
        $('#in_report_home').append('<p>' + home_list[i] + '</p>');
    }
    for(var i = 0; i < 9; i++) {
        $('#in_report_away').append('<p>' + away_list[i] + '</p>');
    }

    document.getElementById("report").style.display = "block";
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
})