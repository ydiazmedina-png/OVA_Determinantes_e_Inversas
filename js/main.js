document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // NAVEGACIÓN DE CONTENIDO
  // =========================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetTab = button.dataset.tab;
      
      // Remover clase active de todos los botones y contenidos
      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabContents.forEach(content => content.classList.remove("active"));
      
      // Agregar clase active al botón clickeado y su contenido
      button.classList.add("active");
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // =========================
  // LECTURA POR VOZ
  // =========================
  let currentUtterance = null;

  function speakText(text, rate = 1) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = "es-ES";
    currentUtterance.rate = rate;
    window.speechSynthesis.speak(currentUtterance);
  }

  function togglePauseSpeech() {
    if (!("speechSynthesis" in window)) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }

  function stopSpeech() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
  }

  const introText = `
    Los determinantes y las matrices inversas constituyen herramientas fundamentales en el álgebra lineal,
    ya que permiten analizar propiedades de las matrices y resolver sistemas de ecuaciones lineales de manera eficiente.
    El determinante es un valor numérico asociado a una matriz cuadrada que proporciona información importante
    sobre sus características, como la existencia de soluciones en un sistema de ecuaciones o la posibilidad de calcular su inversa.
    Por su parte, la matriz inversa permite resolver sistemas de ecuaciones mediante operaciones matriciales.
  `;

  const objectivesText = `
    Objetivos de aprendizaje.
    Comprender el concepto de determinante y su importancia en el álgebra lineal.
    Calcular determinantes de matrices de orden 2 y 3.
    Analizar las propiedades de los determinantes.
    Determinar la inversa de una matriz cuadrada.
    Aplicar determinantes e inversas en la resolución de sistemas de ecuaciones lineales.
  `;

  const speakBtn = document.getElementById("speak-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const stopBtn = document.getElementById("stop-btn");
  const speedRange = document.getElementById("speed-range");

  if (speakBtn) {
    speakBtn.addEventListener("click", () => {
      const rate = speedRange ? Number(speedRange.value) : 1;
      speakText(introText, rate);
    });
  }

  if (pauseBtn) pauseBtn.addEventListener("click", togglePauseSpeech);
  if (stopBtn) stopBtn.addEventListener("click", stopSpeech);

  const speakObjBtn = document.getElementById("speak-obj-btn");
  const pauseObjBtn = document.getElementById("pause-obj-btn");
  const stopObjBtn = document.getElementById("stop-obj-btn");
  const speedObjRange = document.getElementById("speed-obj-range");

  if (speakObjBtn) {
    speakObjBtn.addEventListener("click", () => {
      const rate = speedObjRange ? Number(speedObjRange.value) : 1;
      speakText(objectivesText, rate);
    });
  }

  if (pauseObjBtn) pauseObjBtn.addEventListener("click", togglePauseSpeech);
  if (stopObjBtn) stopObjBtn.addEventListener("click", stopSpeech);

  // =========================
  // ACORDEÓN GEOMÉTRICO
  // =========================
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  const accordionItems = document.querySelectorAll(".accordion-item");

  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      const targetId = accordionItem.dataset.target;
      const targetContent = document.getElementById(targetId);
      
      // Cerrar otros acordeones
      accordionItems.forEach(item => {
        if (item !== accordionItem) {
          item.classList.remove("active");
          const otherContent = document.getElementById(item.dataset.target);
          if (otherContent) {
            otherContent.classList.remove("active");
          }
        }
      });
      
      // Toggle acordeón actual
      accordionItem.classList.toggle("active");
      if (targetContent) {
        targetContent.classList.toggle("active");
      }
    });
  });

  // =========================
  // VISUALIZACIONES INTERACTIVAS
  // =========================
  const vizCards = document.querySelectorAll(".viz-card");
  
  vizCards.forEach(card => {
    const image = card.querySelector(".viz-image");
    
    image.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px) scale(1.05) rotateY(5deg)";
    });
    
    image.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1) rotateY(0deg)";
    });
    
    image.addEventListener("click", () => {
      // Efecto de pulso al hacer clic
      card.style.animation = "pulseGreen 0.6s ease-in-out";
      setTimeout(() => {
        card.style.animation = "";
      }, 600);
    });
  });

  // Efecto de seguimiento del mouse para cajas dinámicas
  const dynamicBoxes = document.querySelectorAll(".dynamic-box");
  
  dynamicBoxes.forEach(box => {
    box.addEventListener("mousemove", (e) => {
      const rect = box.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      box.style.setProperty("--mouse-x", `${x}%`);
      box.style.setProperty("--mouse-y", `${y}%`);
    });
    
    box.addEventListener("mouseleave", () => {
      box.style.setProperty("--mouse-x", "50%");
      box.style.setProperty("--mouse-y", "50%");
    });
  });

  // =========================
  // ACTIVIDAD 1: SOPA DE LETRAS CON ARRASTRE
  // =========================
  const wordGrid = document.getElementById("wordsearch-grid");
  const wordListItems = document.querySelectorAll("#word-list li");
  const checkWordsearchBtn = document.getElementById("check-wordsearch-btn");
  const resetWordsearchBtn = document.getElementById("reset-wordsearch-btn");
  const wordsearchFeedback = document.getElementById("wordsearch-feedback");

  const wordsToFind = ["DETERMINANTE", "INVERSA", "MATRIZ", "SARRUS", "DIAGONAL"];

  const gridData = [
    ["D","E","T","E","R","M","I","N","A","N","T","E","Q"],
    ["A","Q","W","E","R","T","Y","U","I","O","P","A","W"],
    ["G","I","A","K","L","M","N","B","V","C","X","Z","E"],
    ["O","N","Q","R","S","A","R","R","U","S","J","H","R"],
    ["N","V","T","Y","U","I","O","P","A","S","D","F","T"],
    ["A","E","J","K","L","M","N","B","V","C","X","Z","Y"],
    ["L","R","T","M","A","T","R","I","Z","P","Q","R","U"],
    ["A","S","G","H","J","K","L","Ñ","M","N","B","V","I"],
    ["I","A","C","V","B","N","M","Q","W","E","R","T","O"],
    ["D","H","D","F","G","H","J","K","L","Z","X","Y","P"],
    ["J","I","A","Q","W","E","R","T","Y","U","I","O","L"],
    ["K","D","W","S","X","C","V","B","N","M","P","Q","M"],
    ["L","E","R","S","N","O","I","R","B","A","F","C","N"]
  ];

  const cellMap = new Map();
  let foundWords = new Set();
  let isDragging = false;
  let dragStartCell = null;
  let currentDragCells = [];

  function cellKey(row, col) {
    return `${row}-${col}`;
  }

  function getCellByPosition(row, col) {
    return cellMap.get(cellKey(row, col)) || null;
  }

  function clearTemporarySelection() {
    currentDragCells.forEach((cell) => {
      if (!cell.classList.contains("found")) {
        cell.classList.remove("selected");
      }
    });
    currentDragCells = [];
  }

  function getLineCells(startCell, endCell) {
    if (!startCell || !endCell) return [];

    const startRow = Number(startCell.dataset.row);
    const startCol = Number(startCell.dataset.col);
    const endRow = Number(endCell.dataset.row);
    const endCol = Number(endCell.dataset.col);

    const rowDiff = endRow - startRow;
    const colDiff = endCol - startCol;

    const sameRow = rowDiff === 0;
    const sameCol = colDiff === 0;
    const diagonal = Math.abs(rowDiff) === Math.abs(colDiff);

    if (!(sameRow || sameCol || diagonal)) {
      return [];
    }

    const stepRow = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
    const stepCol = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

    const length = Math.max(Math.abs(rowDiff), Math.abs(colDiff)) + 1;
    const cells = [];

    for (let i = 0; i < length; i++) {
      const row = startRow + i * stepRow;
      const col = startCol + i * stepCol;
      const cell = getCellByPosition(row, col);
      if (!cell) return [];
      cells.push(cell);
    }

    return cells;
  }

  function markTemporarySelection(cells) {
    clearTemporarySelection();
    currentDragCells = cells;

    currentDragCells.forEach((cell) => {
      if (!cell.classList.contains("found")) {
        cell.classList.add("selected");
      }
    });
  }

  function getSelectedWord(cells) {
    const forward = cells.map((cell) => cell.dataset.letter).join("");
    const backward = [...cells].reverse().map((cell) => cell.dataset.letter).join("");
    return { forward, backward };
  }

  function createWordGrid() {
    if (!wordGrid) return;
    wordGrid.innerHTML = "";
    cellMap.clear();

    gridData.forEach((row, rowIndex) => {
      row.forEach((letter, colIndex) => {
        const cell = document.createElement("button");
        cell.className = "word-cell";
        cell.type = "button";
        cell.textContent = letter;
        cell.dataset.letter = letter;
        cell.dataset.row = String(rowIndex);
        cell.dataset.col = String(colIndex);

        cellMap.set(cellKey(rowIndex, colIndex), cell);

        cell.addEventListener("mousedown", (e) => {
          e.preventDefault();
          if (cell.classList.contains("found")) return;

          isDragging = true;
          dragStartCell = cell;
          markTemporarySelection([cell]);
        });

        cell.addEventListener("mouseenter", () => {
          if (!isDragging || !dragStartCell) return;
          const cells = getLineCells(dragStartCell, cell);
          if (cells.length > 0) {
            markTemporarySelection(cells);
          }
        });

        wordGrid.appendChild(cell);
      });
    });
  }

  function finishDragSelection() {
    if (!isDragging) return;
    isDragging = false;
    dragStartCell = null;
  }

  if (wordGrid) {
    createWordGrid();

    document.addEventListener("mouseup", finishDragSelection);
    wordGrid.addEventListener("mouseleave", () => {
      if (isDragging) {
        finishDragSelection();
      }
    });
  }

  if (checkWordsearchBtn && wordsearchFeedback) {
    checkWordsearchBtn.addEventListener("click", () => {
      if (currentDragCells.length < 2) {
        wordsearchFeedback.className = "activity-feedback incorrect";
        wordsearchFeedback.textContent =
          "Selecciona una palabra arrastrando el cursor en línea recta.";
        return;
      }

      const { forward, backward } = getSelectedWord(currentDragCells);
      const matchedWord = wordsToFind.find(
        (word) => word === forward || word === backward
      );

      if (!matchedWord) {
        wordsearchFeedback.className = "activity-feedback incorrect";
        wordsearchFeedback.textContent =
          "La secuencia seleccionada no coincide con una palabra válida.";
        clearTemporarySelection();
        return;
      }

      if (foundWords.has(matchedWord)) {
        wordsearchFeedback.className = "activity-feedback incorrect";
        wordsearchFeedback.textContent =
          "Esa palabra ya fue encontrada. Busca otra diferente.";
        clearTemporarySelection();
        return;
      }

      foundWords.add(matchedWord);

      currentDragCells.forEach((cell) => {
        cell.classList.remove("selected");
        cell.classList.add("found");
      });

      wordListItems.forEach((item) => {
        if (item.dataset.word === matchedWord) {
          item.classList.add("found-word");
        }
      });

      currentDragCells = [];

      if (foundWords.size === wordsToFind.length) {
        wordsearchFeedback.className = "activity-feedback correct";
        wordsearchFeedback.textContent =
          "¡Excelente! Encontraste todas las palabras clave del tema.";
      } else {
        wordsearchFeedback.className = "activity-feedback correct";
        wordsearchFeedback.textContent =
          `¡Muy bien! Encontraste la palabra ${matchedWord}.`;
      }
    });
  }

  if (resetWordsearchBtn && wordsearchFeedback) {
    resetWordsearchBtn.addEventListener("click", () => {
      document.querySelectorAll(".word-cell").forEach((cell) => {
        cell.classList.remove("selected", "found");
      });

      wordListItems.forEach((item) => item.classList.remove("found-word"));
      foundWords.clear();
      currentDragCells = [];
      dragStartCell = null;
      isDragging = false;
      wordsearchFeedback.className = "activity-feedback";
      wordsearchFeedback.textContent = "";
    });
  }

  // =========================
  // ACTIVIDAD 2: COMPLETAR DETERMINANTE
  // =========================
  const checkDetBtn = document.getElementById("check-det-btn");
  const resetDetBtn = document.getElementById("reset-det-btn");
  const detFeedback = document.getElementById("det-feedback");

  function normalizeMathText(text) {
    return text.replace(/\s+/g, "").toLowerCase();
  }

  if (checkDetBtn && detFeedback) {
    checkDetBtn.addEventListener("click", () => {
      const v1 = normalizeMathText(document.getElementById("det-fill-1")?.value || "");
      const v2 = normalizeMathText(document.getElementById("det-fill-2")?.value || "");
      const v3 = normalizeMathText(document.getElementById("det-fill-3")?.value || "");

      const ok1 = v1 === "ad-bc";
      const ok2 =
        v2 === "(3×4)-(2×1)" ||
        v2 === "(3x4)-(2x1)" ||
        v2 === "3×4-2×1" ||
        v2 === "3x4-2x1";
      const ok3 = v3 === "10";

      if (ok1 && ok2 && ok3) {
        detFeedback.className = "activity-feedback correct";
        detFeedback.textContent =
          "¡Muy bien! Aplicaste correctamente la fórmula del determinante 2×2 y obtuviste el valor final.";
      } else {
        detFeedback.className = "activity-feedback incorrect";
        detFeedback.textContent =
          "Revisa la fórmula del determinante 2×2, la sustitución de valores y el resultado final.";
      }
    });
  }

  if (resetDetBtn && detFeedback) {
    resetDetBtn.addEventListener("click", () => {
      ["det-fill-1", "det-fill-2", "det-fill-3"].forEach((id) => {
        const input = document.getElementById(id);
        if (input) input.value = "";
      });

      detFeedback.className = "activity-feedback";
      detFeedback.textContent = "";
    });
  }

  // =========================
  // ACTIVIDAD 3: TIENE INVERSA O NO
  // =========================
  const inverseCards = document.querySelectorAll(".inverse-card");
  const checkInverseBtn = document.getElementById("check-inverse-btn");
  const resetInverseBtn = document.getElementById("reset-inverse-btn");
  const inverseSummary = document.getElementById("inverse-summary");

  inverseCards.forEach((card) => {
    const buttons = card.querySelectorAll(".inverse-btn");
    const feedback = card.querySelector(".inverse-feedback");
    const correct = card.dataset.correct;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (card.dataset.answered === "true") return;

        const value = btn.dataset.value;
        card.dataset.answered = "true";
        card.dataset.selected = value;

        buttons.forEach((b) => b.classList.add("disabled"));

        if (value === correct) {
          btn.classList.add("correct");
          feedback.textContent = "✅ Correcto.";
          feedback.className = "inverse-feedback correct";
        } else {
          btn.classList.add("incorrect");
          buttons.forEach((b) => {
            if (b.dataset.value === correct) {
              b.classList.add("correct");
            }
          });
          feedback.textContent = "❌ Incorrecto.";
          feedback.className = "inverse-feedback incorrect";
        }
      });
    });
  });

  if (checkInverseBtn && inverseSummary) {
    checkInverseBtn.addEventListener("click", () => {
      let correctCount = 0;
      let answered = 0;

      inverseCards.forEach((card) => {
        const selected = card.dataset.selected;
        const correct = card.dataset.correct;

        if (selected) {
          answered++;
          if (selected === correct) correctCount++;
        }
      });

      if (answered < inverseCards.length) {
        inverseSummary.className = "activity-feedback incorrect";
        inverseSummary.textContent =
          "Debes responder todas las matrices antes de finalizar.";
        return;
      }

      if (correctCount === inverseCards.length) {
        inverseSummary.className = "activity-feedback correct";
        inverseSummary.textContent =
          "¡Excelente! Reconociste correctamente cuándo una matriz tiene inversa.";
      } else {
        inverseSummary.className = "activity-feedback incorrect";
        inverseSummary.textContent =
          `Obtuviste ${correctCount} de ${inverseCards.length}. Recuerda: una matriz tiene inversa si su determinante es distinto de cero.`;
      }
    });
  }

  if (resetInverseBtn && inverseSummary) {
    resetInverseBtn.addEventListener("click", () => {
      inverseCards.forEach((card) => {
        card.dataset.answered = "false";
        card.dataset.selected = "";

        const buttons = card.querySelectorAll(".inverse-btn");
        const feedback = card.querySelector(".inverse-feedback");

        buttons.forEach((btn) => {
          btn.classList.remove("correct", "incorrect", "disabled");
        });

        feedback.textContent = "";
        feedback.className = "inverse-feedback";
      });

      inverseSummary.className = "activity-feedback";
      inverseSummary.textContent = "";
    });
  }

  // =========================
  // EVALUACIÓN
  // =========================
  const quizQuestions = document.querySelectorAll(".quiz-question");
  const finishQuizBtn = document.getElementById("finish-quiz-btn");
  const resetQuizBtn = document.getElementById("reset-quiz-btn");
  const quizResult = document.getElementById("quiz-result");

  quizQuestions.forEach((question) => {
    const options = question.querySelectorAll(".quiz-option");
    const feedbackBox = question.querySelector(".quiz-feedback");
    const correctFeedback =
      question.querySelector(".feedback-correct")?.textContent.trim() || "";
    const incorrectFeedback =
      question.querySelector(".feedback-incorrect")?.textContent.trim() || "";
    const correctAnswer = question.dataset.correct;

    options.forEach((option) => {
      option.addEventListener("click", () => {
        if (question.dataset.answered === "true") return;

        const selected = option.dataset.option;
        question.dataset.answered = "true";
        question.dataset.selected = selected;

        options.forEach((btn) => btn.classList.add("disabled"));

        if (selected === correctAnswer) {
          option.classList.add("correct");
          if (feedbackBox) {
            feedbackBox.textContent = `✅ Correcta. ${correctFeedback}`;
            feedbackBox.className = "quiz-feedback correct";
          }
        } else {
          option.classList.add("incorrect");

          options.forEach((btn) => {
            if (btn.dataset.option === correctAnswer) {
              btn.classList.add("correct");
            }
          });

          if (feedbackBox) {
            feedbackBox.textContent = `❌ Incorrecta. ${incorrectFeedback}`;
            feedbackBox.className = "quiz-feedback incorrect";
          }
        }
      });
    });
  });

  if (finishQuizBtn && quizResult) {
    finishQuizBtn.addEventListener("click", () => {
      let correctCount = 0;
      let answeredCount = 0;

      quizQuestions.forEach((question) => {
        const selected = question.dataset.selected;
        const correct = question.dataset.correct;

        if (selected) {
          answeredCount++;
          if (selected === correct) {
            correctCount++;
          }
        }
      });

      const total = quizQuestions.length;
      const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

      quizResult.classList.add("show");
      quizResult.classList.remove("high", "medium", "low");

      if (answeredCount < total) {
        quizResult.classList.add("medium");
        quizResult.textContent =
          `Has respondido ${answeredCount} de ${total} preguntas. Puntaje actual: ${correctCount}/${total}. Completa las restantes para obtener el resultado final.`;
        return;
      }

      if (percent >= 80) {
        quizResult.classList.add("high");
        quizResult.textContent =
          `¡Excelente! Puntaje final: ${correctCount}/${total} (${percent}%). Has comprendido muy bien el tema.`;
      } else if (percent >= 60) {
        quizResult.classList.add("medium");
        quizResult.textContent =
          `Buen trabajo. Puntaje final: ${correctCount}/${total} (${percent}%). Vas bien, pero aún puedes reforzar algunos conceptos.`;
      } else {
        quizResult.classList.add("low");
        quizResult.textContent =
          `Puntaje final: ${correctCount}/${total} (${percent}%). Te recomiendo repasar el contenido y volver a intentarlo.`;
      }
    });
  }

  if (resetQuizBtn && quizResult) {
    resetQuizBtn.addEventListener("click", () => {
      quizQuestions.forEach((question) => {
        question.dataset.answered = "false";
        question.dataset.selected = "";

        const options = question.querySelectorAll(".quiz-option");
        const feedbackBox = question.querySelector(".quiz-feedback");

        options.forEach((option) => {
          option.classList.remove("correct", "incorrect", "disabled");
        });

        if (feedbackBox) {
          feedbackBox.textContent = "";
          feedbackBox.className = "quiz-feedback";
        }
      });

      quizResult.textContent = "";
      quizResult.className = "quiz-result";
    });
  }
});