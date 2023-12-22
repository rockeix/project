(function() {
    var questions = [{
      question: "약은 식사전후 몇분 이내로 먹어야하는가?",
      choices: ['식후 10분', '약마다 다르다', '식전 20분', '식사와 동시에', '식후 30분'],
      correctAnswer: 1
    }, {
      question: "What is 3*6?",
      choices: [3, 6, 9, 12, 18],
      correctAnswer: 4
    }, {
      question: "What is 8*9?",
      choices: [72, 99, 108, 134, 156],
      correctAnswer: 0
    }, {
      question: "What is 1*7?",
      choices: [4, 5, 6, 7, 8],
      correctAnswer: 3
    }, {
      question: "What is 8*8?",
      choices: [20, 30, 40, 50, 64],
      correctAnswer: 4
    }];
    
    var questionCounter = 0; //질문 번호를 추적합니다
    var selections = []; //사용자의 정답을 배열로 저장합니다
    var quiz = $('#quiz'); //퀴즈 오브젝트
    
    // 질문을 보여주는 메소드
    displayNext();
    
    // 다음버튼 누를 시 일어나는 이벤트 제어
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      // 애니메이션 실행중 클릭 중단 메서드
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
      // 아무것도 선택하지 않았을때 팝업 메서드
      if (isNaN(selections[questionCounter])) {
        alert('정답을 선택해 주세요!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    // 이전 버튼 누를 시 일어나는 이벤트 제어
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    // 메인 화면 버튼 누를 시 일어나는 이벤트 제어
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    // 버튼 호버링 이벤트
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });
    
    // 질문이 포함된 div생성
    // 답안 생성지
    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>문제 ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    
    // 입력으로 생성된 답안을 작성하는 메서드
    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
    
    // 사용자의 입력을 읽고 값으로 푸쉬하는 메서드
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    
    // 다음 버튼에 따른 요소들을 표시하는 구문
    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
          // 이전 버튼에 따른 요소들을 표시하는 구문
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    // 점수 계산 및 결과 문단을 표시하는 구문 
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('당신은 ' + questions.length + ' 개의 문제중에 ' +
      numCorrect + ' 개를 맞췄습니다!!!');
      return score;
    }
  })();

  questions.length