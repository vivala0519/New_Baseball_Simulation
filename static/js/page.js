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