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
// 선수 추가
function add_click() {
    if($('#sel_home_away option:selected').val() == '홈/어웨이'){
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
                if(data[0] != 'P'){
                    for(var i = 1; i<=9; i++){
                        if(selected_H_A == 'Home') {
                            p = $('#home_table tr:eq('+i+')>td:eq(1)').html();
                            if(p == 'player'){
                                $('#home_table tr:eq('+i+')>td:eq(1)').empty();
                                $('#home_table tr:eq('+i+')>td:eq(2)').empty();
                                $('#home_table tr:eq('+i+')>td:eq(1)').append(selectedPlayer);
                                $('#home_table tr:eq('+i+')>td:eq(2)').append(data[0]);
                                break
                            }
                        }
                        else {
                            p = $('#away_table tr:eq('+i+')>td:eq(1)').html();
                            if(p == 'player'){
                                $('#away_table tr:eq('+i+')>td:eq(1)').empty();
                                $('#away_table tr:eq('+i+')>td:eq(2)').empty();
                                $('#away_table tr:eq('+i+')>td:eq(1)').append(selectedPlayer);
                                $('#away_table tr:eq('+i+')>td:eq(2)').append(data[0]);
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
                                $('#home_table tr:eq('+i+')>td:eq(2)').append(data[0]);
                                break
                            }
                        }
                        else {
                            p = $('#away_table tr:eq('+i+')>td:eq(1)').html();
                            if(p == 'player'){
                                $('#away_table tr:eq('+i+')>td:eq(1)').empty();
                                $('#away_table tr:eq('+i+')>td:eq(2)').empty();
                                $('#away_table tr:eq('+i+')>td:eq(1)').append(selectedPlayer);
                                $('#away_table tr:eq('+i+')>td:eq(2)').append(data[0]);
                                break
                            }
                        }
                    }
                }

            }
        })
    }
}

// 선수 선택 취소
function cancel_click(clicked_value){
    console.log(clicked_value)
    arr = []
    arr.push(clicked_value.split('_'))
    if(arr[0][0] == 'home'){
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(1)').empty();
        $('#home_table tr:eq('+arr[0][1]+')>td:eq(1)').append('player');
        console.log('complete')
    }
    else{
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(1)').empty();
        $('#away_table tr:eq('+arr[0][1]+')>td:eq(1)').append('player');
        console.log('complete')
    }
}
