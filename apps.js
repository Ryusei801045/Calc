document.addEventListener('DOMContentLoaded', () => {
    // 国と首都のデータ（一部抜粋）
    const countries = [
       
        { country: "アイスランド", capital: "レイキャビク" },
  { country: "アイルランド", capital: "ダブリン" },
  { country: "アゼルバイジャン", capital: "バクー" },
  { country: "アルバニア", capital: "ティラナ" },
  { country: "アンドラ", capital: "アンドラ・ラ・ベリャ" },
  { country: "イギリス", capital: "ロンドン" },
  { country: "イタリア", capital: "ローマ" },
  { country: "ウクライナ", capital: "キーウ" },
  { country: "エストニア", capital: "タリン" },
  { country: "オーストリア", capital: "ウィーン" },
  { country: "オランダ", capital: "アムステルダム" },
  { country: "ギリシャ", capital: "アテネ" },
  { country: "クロアチア", capital: "ザグレブ" },
  { country: "コソボ", capital: "プリシュティナ" },
  { country: "サンマリノ", capital: "サンマリノ" },
  { country: "ジョージア", capital: "トビリシ" },
  { country: "スイス", capital: "ベルン" },
  { country: "スウェーデン", capital: "ストックホルム" },
  { country: "スペイン", capital: "マドリード" },
  { country: "スロバキア", capital: "ブラチスラヴァ" },
  { country: "スロベニア", capital: "リュブリャナ" },
  { country: "セルビア", capital: "ベオグラード" },
  { country: "チェコ", capital: "プラハ" },
  { country: "デンマーク", capital: "コペンハーゲン" },
  { country: "ドイツ", capital: "ベルリン" },
  { country: "トルコ", capital: "アンカラ" },
  { country: "ノルウェー", capital: "オスロ" },
  { country: "バチカン市国", capital: "バチカン市国" },
  { country: "ハンガリー", capital: "ブダペスト" },
  { country: "フィンランド", capital: "ヘルシンキ" },
  { country: "フランス", capital: "パリ" },
  { country: "ブルガリア", capital: "ソフィア" },
  { country: "ベラルーシ", capital: "ミンスク" },
  { country: "ベルギー", capital: "ブリュッセル" },
  { country: "ポーランド", capital: "ワルシャワ" },
  { country: "ボスニア・ヘルツェゴビナ", capital: "サラエヴォ" },
  { country: "ポルトガル", capital: "リスボン" },
  { country: "北マケドニア", capital: "スコピエ" },
  { country: "マルタ", capital: "バレッタ" },
  { country: "モナコ", capital: "モナコ" },
  { country: "モルドバ", capital: "キシナウ" },
  { country: "モンテネグロ", capital: "ポドゴリツァ" },
  { country: "ラトビア", capital: "リガ" },
  { country: "リトアニア", capital: "ヴィリニュス" },
  { country: "リヒテンシュタイン", capital: "ファドゥーツ" },
  { country: "ルーマニア", capital: "ブカレスト" },
  { country: "ルクセンブルク", capital: "ルクセンブルク市" },
  { country: "ロシア", capital: "モスクワ" }

  
        
        // さらに多くの国を追加できます
    ];

    let currentQuestionIndex = 0;
    let correctAnswersCount = 0;
    const questionsToAsk = 20// 何問出題するか

    let shuffledCountries = [];

    const countryNameSpan = document.getElementById('country-name');
    const userAnswerInput = document.getElementById('user-answer');
    const submitButton = document.getElementById('submit-button');
    const nextButton = document.getElementById('next-button');
    const feedbackParagraph = document.getElementById('feedback');
    const quizArea = document.getElementById('quiz-area');
    const scoreArea = document.getElementById('score-area');
    const correctCountSpan = document.getElementById('correct-count');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const restartButton = document.getElementById('restart-button');

    // 配列をシャッフルする関数 (フィッシャー・イェーツ・シャッフル)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // クイズを開始/リスタートする関数
    function startQuiz() {
        shuffledCountries = shuffleArray([...countries]).slice(0, questionsToAsk); // 出題数だけ取得
        currentQuestionIndex = 0;
        correctAnswersCount = 0;
        quizArea.classList.remove('hidden');
        scoreArea.classList.add('hidden');
        nextQuestion();
    }

    // 次の質問を表示する関数
    function nextQuestion() {
        userAnswerInput.value = ''; // 入力欄をクリア
        feedbackParagraph.textContent = ''; // フィードバックをクリア
        feedbackParagraph.classList.remove('correct', 'incorrect'); // クラスをリセット
        submitButton.classList.remove('hidden'); // 回答ボタンを表示
        nextButton.classList.add('hidden'); // 次へボタンを非表示
        userAnswerInput.disabled = false; // 入力欄を有効化

        if (currentQuestionIndex < questionsToAsk) {
            const currentCountry = shuffledCountries[currentQuestionIndex];
            countryNameSpan.textContent = currentCountry.country;
            userAnswerInput.focus(); // 入力欄にフォーカス
        } else {
            // クイズ終了
            endQuiz();
        }
    }

    // 回答をチェックする関数
    function checkAnswer() {
        const userAnswer = userAnswerInput.value.trim();
        const correctAnswer = shuffledCountries[currentQuestionIndex].capital;

        // 大文字小文字、全角半角スペース、カタカナ表記の揺れをある程度許容するために正規化
        const normalize = (str) => {
            return str
                .normalize('NFKC') // 全角カタカナを半角カナに、全角英数を半角英数に変換など
                .toLowerCase()
                .replace(/\s+/g, ''); // 連続するスペースを1つに、前後のスペースを削除
        };

        if (normalize(userAnswer) === normalize(correctAnswer)) {
            feedbackParagraph.textContent = '正解です！';
            feedbackParagraph.classList.add('correct');
            correctAnswersCount++;
        } else {
            feedbackParagraph.textContent = `不正解です。正解は「${correctAnswer}」でした。`;
            feedbackParagraph.classList.add('incorrect');
        }

        userAnswerInput.disabled = true; // 回答後は入力欄を無効化
        submitButton.classList.add('hidden'); // 回答ボタンを非表示
        nextButton.classList.remove('hidden'); // 次へボタンを表示
        currentQuestionIndex++;
    }

    // クイズ終了時の処理
    function endQuiz() {
        quizArea.classList.add('hidden');
        scoreArea.classList.remove('hidden');
        correctCountSpan.textContent = correctAnswersCount;
        totalQuestionsSpan.textContent = questionsToAsk;
    }

    // イベントリスナー
    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', startQuiz);

    // Enterキーで回答
    userAnswerInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !userAnswerInput.disabled) {
            checkAnswer();
        }
    });

    // 初期化
    startQuiz();
});
