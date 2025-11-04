// Anda bisa letakkan ini di file script.js Anda

document.addEventListener("DOMContentLoaded", function () {
  const allNoDragElements = document.querySelectorAll(".no-drag");
  const navLinks = document.querySelectorAll("#navbar-PC a");
  const nav = document.querySelector("nav");
  const allToolSelection = document.querySelectorAll(".tools-selection");
  // tools Temperature
  const fromTempInput = document.getElementById("fromTemp");
  const fromTempSelect = document.getElementById("selectFromTemp");
  const toTempInput = document.getElementById("toTemp");
  const toTempSelect = document.getElementById("selectToTemp");
  // tools Lenght
  const fromLengthInput = document.getElementById("fromLength");
  const fromLengthSelect = document.getElementById("selectFromLength");
  const toLengthInput = document.getElementById("toLength");
  const toLengthSelect = document.getElementById("selectToLength");
  // tools Money
  const apiKeyConvert = "5595dfbd1cc7077cc505dc31";
  const apiUrlConvert = `https://v6.exchangerate-api.com/v6/${apiKeyConvert}`;

  const jumlahUangIput = document.getElementById("jumlahUang");
  const selectFromMoney = document.getElementById("selectFromMoney");
  const selectToMoney = document.getElementById("selectToMoney");
  const resultConvert = document.getElementById("hasilKurs");
  // tools Resistor Converter
  let dataResistor = {
    // <-- Gunakan kurung kurawal {} untuk Objek
    // Key pertama: digit
    digit: {
      black: 0,
      brown: 1,
      red: 2,
      orange: 3,
      yellow: 4,
      green: 5,
      blue: 6,
      violet: 7,
      grey: 8,
      white: 9,
    }, // <-- Tambahkan koma di sini untuk memisahkan properti/key

    // Key kedua: multiplier
    multiplier: {
      black: 1,
      brown: 10,
      red: 100,
      orange: 1000,
      yellow: 10000,
      green: 100000,
      blue: 1000000,
      gold: 0.1,
      silver: 0.01,
    }, // <-- Tambahkan koma di sini

    // Key ketiga: tolerance
    tolerance: {
      gold: "±5%",
      silver: "±10%",
      none: "±20%",
    }, // Koma opsional setelah yang terakhir
  };
  const band1 = document.getElementById("band1");
  const band2 = document.getElementById("band2");
  const band3 = document.getElementById("band3");
  const band4 = document.getElementById("band4");
  const calcBtnResistor = document.getElementById("hitungResistorBtn");
  const showResult = document.getElementById("hasilResistor");
  // Tools Kalkulator
  const calcDisplay = document.getElementById("calcResult");
  // PERUBAHAN: Disesuaikan dengan class ".calculator-grid" di dalam panel
  const calcGrid = document.getElementById("calculatorGrid");

  // 2. Variabel untuk menyimpan status kalkulator
  let currentInput = "0"; // Apa yang ditampilkan di layar
  let firstOperand = null;
  let operator = null;
  let shouldResetScreen = false;
  // Tool Resistor Calculate
  const addResistorBtn = document.getElementById("addR");
  const seriesBtn = document.getElementById("btnSeri");
  const pararelBtn = document.getElementById("btnParalel");
  const resultCalcResistor = document.getElementById("hasilCalcResistor");
  let newResistor = 3;

  allNoDragElements.forEach(function (element) {
    // 3. Tambahkan event listener 'dragstart' ke setiap elemen
    element.addEventListener("dragstart", function (event) {
      // Batalkan aksi default (yaitu 'drag')
      event.preventDefault();
    });
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // 1. Ambil tinggi navbar SAAT INI
        const navHeight = nav.offsetHeight;

        // 2. Ambil posisi target
        const targetPosition = targetSection.offsetTop;

        // 3. Hitung posisi akhir (Posisi Target - Tinggi Nav)
        const finalScrollPosition = targetPosition - navHeight;

        // 4. Scroll ke posisi yang sudah dihitung
        window.scrollTo({
          top: finalScrollPosition,
          behavior: "smooth",
        });

        // (Opsional: tambahkan class 'active' jika perlu)
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  function handleScroll() {
    const scrollY = window.scrollY;
    const threshold = 50;
    if (scrollY > threshold) {
      nav.classList.add("sticky-nav");
    } else {
      nav.classList.remove("sticky-nav");
    }
  }
  window.addEventListener("scroll", handleScroll);

  allToolSelection.forEach(function (tabGroup) {
    tabGroup.addEventListener("click", function (event) {
      if (event.target.tagName == "LI") {
        const clickedTab = event.target;
        const tabsInThisGroup = tabGroup.querySelectorAll("li");

        tabsInThisGroup.forEach(function (tab) {
          tab.classList.remove("active");
        });

        clickedTab.classList.add("active");

        const targetId = clickedTab.dataset.target;
        const utilityContainer = tabGroup.nextElementSibling;
        const allTools = utilityContainer.querySelectorAll(".tools");

        // --- PERBAIKAN DI SINI ---
        // Ganti 'toolpanel' menjadi 'toolPanel' agar konsisten
        allTools.forEach(function (toolPanel) {
          // <-- 'P' besar
          toolPanel.classList.remove("active-tool"); // <-- 'P' besar
        });
        // --- SELESAI PERBAIKAN ---

        const targetPanel = utilityContainer.querySelector(`#tool-${targetId}`);
        if (targetPanel) {
          targetPanel.classList.add("active-tool");
        }
      }
    });
  });
  function konversiSuhu() {
    const formValue = parseFloat(fromTempInput.value);
    const formUnit = fromTempSelect.value;
    const toUnit = toTempSelect.value;

    if (isNaN(formValue)) {
      toTempInput.value = "";
      return;
    }

    if (formUnit === toUnit) {
      toTempInput.value = formValue.toFixed(2);
      return;
    }
    let valueInCelcius;
    switch (formUnit) {
      case "F":
        valueInCelcius = ((formValue - 32) * 5) / 9;
        break;
      case "K":
        valueInCelcius = formValue - 273.15;
        break;
      case "R":
        valueInCelcius = (formValue * 5) / 4;
        break;
      default:
        valueInCelcius = formValue;
    }
    let result;
    switch (toUnit) {
      case "F":
        result = (valueInCelcius * 5) / 9 + 32;
        break;
      case "K":
        result = valueInCelcius + 273.15;
        break;
      case "R":
        result = (valueInCelcius * 4) / 5;
        break;
      default:
        result = valueInCelcius;
    }
    toTempInput.value = result.toFixed(2);
  }
  fromTempInput.addEventListener("input", konversiSuhu);
  // b. Pengguna mengubah unit "Dari"
  fromTempSelect.addEventListener("change", konversiSuhu);
  // c. Pengguna mengubah unit "Ke"
  toTempSelect.addEventListener("change", konversiSuhu);

  function konversiPanjang() {
    const formValue = parseFloat(fromLengthInput.value);
    const formUnit = fromLengthSelect.value;
    const toUnit = toLengthSelect.value;

    if (isNaN(formValue)) {
      toLengthInput.value = "";
      return;
    }
    if (formUnit === toUnit) {
      toLengthInput.value = formValue.toFixed(2);
      return;
    }
    let valueInMeters;
    switch (formUnit) {
      case "km":
        valueInMeters = formValue * 1000;
        break;
      case "cm":
        valueInMeters = formValue / 100;
        break;
      case "ft":
        valueInMeters = formValue / 3.28084; // PERBAIKAN: Dibagi
        break;
      case "in":
        valueInMeters = formValue / 39.3701; // PERBAIKAN: Dibagi
        break;
      default: // "m"
        valueInMeters = formValue;
    }

    let result;
    switch (toUnit) {
      case "km":
        result = valueInMeters / 1000;
        break;
      case "cm":
        result = valueInMeters * 100;
        break;
      case "ft":
        result = valueInMeters * 3.28084; // PERBAIKAN: Dikali
        break;
      case "in":
        result = valueInMeters * 39.3701; // PERBAIKAN: Dikali
        break;
      default: // "m"
        result = valueInMeters;
    }
    toLengthInput.value = result.toFixed(2);
  }
  fromLengthInput.addEventListener("input", konversiPanjang);
  fromLengthSelect.addEventListener("change", konversiPanjang);
  toLengthSelect.addEventListener("change", konversiPanjang);

  function ambilDataUang() {
    fetch(`${apiUrlConvert}/latest/IDR`)
      .then((response) => response.json())
      .then((database) => {
        if (database.result === "success") {
          const currencies = Object.keys(database.conversion_rates);
          //Hapus ...
          selectFromMoney.innerHTML = "";
          selectToMoney.innerHTML = "";
          currencies.forEach((currency) => {
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;

            const option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = currency;

            selectFromMoney.appendChild(option1);
            selectToMoney.appendChild(option2);
          });
          selectFromMoney.value = "IDR";
          selectToMoney.value = "USD";
        } else {
          resultConvert.textContent = "Gagal memuat data mata uang.";
        }
      });
  }
  ambilDataUang();
  tombolHitung.addEventListener("click", function () {
    const valueMoney = parseFloat(jumlahUangIput.value);
    const fromSelect = selectFromMoney.value;
    const toSelect = selectToMoney.value;

    if (isNaN(valueMoney) || valueMoney <= 0) {
      resultConvert.textContent = "Masukkan nilai yang valid";
      return;
    }

    resultConvert.textContent = "Mengkonversi...";

    fetch(`${apiUrlConvert}/pair/${fromSelect}/${toSelect}/${valueMoney}`)
      .then((response) => response.json())
      .then((database) => {
        if (database.result === "success") {
          const hasil = database.conversion_result;
          resultConvert.textContent = `${valueMoney} ${fromSelect} = ${hasil.toFixed(
            2
          )} ${toSelect}`;
        } else {
          resultConvert.textContent = "Gagal melakukan konversi.";
        }
      })
      .catch((error) => {
        resultConvert.textContent = "Terkendala Jaringan";
      });
  });

  function calcResistor() {
    const d1 = dataResistor.digit[band1.value];
    const d2 = dataResistor.digit[band2.value];
    const band = parseInt(String(d1) + String(d2));
    const mul = dataResistor.multiplier[band3.value];
    const tol = dataResistor.tolerance[band4.value];

    const final = band * mul;
    const finalFormat = formatOhms(final);

    showResult.textContent = `${finalFormat} ${tol}`;
  }
  function formatOhms(value) {
    if (value >= 1000000) {
      return value / 1000000 + " MΩ";
    } else if (value >= 1000) {
      return value / 1000 + " kΩ";
    } else {
      return value + " Ω";
    }
  }
  calcBtnResistor.addEventListener("click", calcResistor);
  calcBtnResistor.click();

  function handleCalcClick(event) {
    // Hanya proses jika yang diklik adalah BUTTON
    if (!event.target.matches("button")) return;

    const value = event.target.textContent; // Nilai tombol, misal "7", "+", "AC"

    // Panggil fungsi yang sesuai berdasarkan jenis tombol
    if (value >= "0" && value <= "9") {
      inputDigit(value);
    } else if (value === ".") {
      inputDecimal(value);
    } else if (
      value === "+" ||
      value === "-" ||
      value === "x" ||
      value === "/"
    ) {
      // PERUBAHAN: "x"
      handleOperator(value);
    } else if (value === "=") {
      handleEquals();
    } else if (value === "AC") {
      // PERUBAHAN: "AC"
      clearCalculator();
    } else if (value === "+/-") {
      // BARU
      toggleSign();
    } else if (value === "%") {
      // BARU
      handlePercentage();
    }

    // 4. Update tampilan layar kalkulator
    updateDisplay();
  }

  // 5. Fungsi untuk memperbarui layar
  function updateDisplay() {
    calcDisplay.value = currentInput;
  }

  // 6. Fungsi-fungsi pembantu

  function inputDigit(digit) {
    // Jika layar harus direset (setelah operator/equals), ganti angkanya
    if (shouldResetScreen || currentInput === "0") {
      currentInput = digit;
      shouldResetScreen = false;
    } else {
      // Selain itu, tambahkan angka ke belakang
      currentInput += digit;
    }
  }

  function inputDecimal(dot) {
    // Jika harus reset, mulai dengan "0."
    if (shouldResetScreen) {
      currentInput = "0.";
      shouldResetScreen = false;
      return;
    }
    // Cegah ada dua titik desimal
    if (!currentInput.includes(dot)) {
      currentInput += dot;
    }
  }

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    // Jika operator diklik 2x, ganti saja operatornya
    if (operator && shouldResetScreen) {
      operator = nextOperator;
      return;
    }

    // Jika operand pertama kosong, simpan
    if (firstOperand === null) {
      firstOperand = inputValue;
    } else if (operator) {
      // Jika operand pertama ADA, hitung dulu
      const result = performCalculation();
      currentInput = String(result);
      firstOperand = result;
    }

    operator = nextOperator;
    shouldResetScreen = true; // Siap untuk input angka kedua
  }

  function handleEquals() {
    // Hanya hitung jika ada operand pertama dan operator
    if (firstOperand === null || operator === null) return;

    // Lakukan perhitungan
    const result = performCalculation();
    currentInput = String(result);

    // Reset state
    firstOperand = null;
    operator = null;
    shouldResetScreen = true;
  }

  function performCalculation() {
    const secondOperand = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      case "-":
        result = firstOperand - secondOperand;
        break;
      case "x": // PERUBAHAN: "x"
        result = firstOperand * secondOperand;
        break;
      case "/":
        result = firstOperand / secondOperand;
        break;
      default:
        return;
    }
    // Bulatkan hasil jika desimal terlalu panjang
    return parseFloat(result.toFixed(7));
  }

  function clearCalculator() {
    currentInput = "0";
    firstOperand = null;
    operator = null;
    shouldResetScreen = false;
  }

  // FUNGSI BARU: Untuk tombol +/-
  function toggleSign() {
    if (currentInput === "0") return; // Jangan ubah "0"
    currentInput = (parseFloat(currentInput) * -1).toString();
  }

  // FUNGSI BARU: Untuk tombol %
  function handlePercentage() {
    // Mengubah angka di layar menjadi nilai persennya (dibagi 100)
    currentInput = (parseFloat(currentInput) / 100).toString();
  }

  // 7. Tambahkan Event Listener ke seluruh grid
  if (calcGrid) {
    calcGrid.addEventListener("click", handleCalcClick);
  }

  // 8. Inisialisasi tampilan saat pertama dimuat
  updateDisplay();

  function addResistor() {
    const newGroup = document.createElement("div");
    newGroup.classList.add("resistor-group");
    const newLabel = document.createElement("label");
    newLabel.textContent = `R${newResistor} (Ohm)`;
    newLabel.for = `R${newResistor}`;
    const newInput = document.createElement("input");
    newInput.classList.add("resistor-input");
    newInput.type = "number";
    newInput.placeholder = "100";

    newGroup.appendChild(newLabel);
    newGroup.appendChild(newInput);
    const allResistance = document.querySelectorAll(`.resistor-group`);
    const lastResistance = allResistance[allResistance.length - 1];
    if (lastResistance) {
      lastResistance.after(newGroup);
    }
    newResistor++;
  }
  addResistorBtn.addEventListener("click", addResistor);

  function getValue() {
    const values = [];
    const allResistance = document.querySelectorAll(".resistor-input");
    for (const input of allResistance) {
      const val = parseFloat(input.value);

      if (isNaN(val) || val <= 0) {
        alert(
          `Nilai resistor tidak valid (error di input '${input.value}'). Harap isi semua dan pastikan > 0.`
        );
        return null;
      }
      values.push(val);
    }
    if (values.length < 2) {
      alert("Butuh setidaknya 2 resistor untuk dihitung");
      return null;
    }
    return values;
  }
  seriesBtn.addEventListener("click", function () {
    const Nilai = getValue();
    if (!Nilai) return;
    const rTotal = Nilai.reduce((total, nilaiskrg) => total + nilaiskrg, 0);
    resultCalcResistor.textContent = `Total Resistansi: ${rTotal.toFixed(2)} Ω`;
  });
  // PERBAIKAN FUNGSI PARALEL
  pararelBtn.addEventListener("click", function () {
    const Nilai = getValue();
    if (!Nilai) return;

    // 1. Tambahkan nilai awal , 0
    let sumR = Nilai.reduce(
      (total, nilaiskrg) => total + 1 / nilaiskrg,
      0 // <-- Tambahkan nilai awal ini
    );

    // 2. 'rTotal' sekarang adalah 'let' dan bisa diubah
    const rTotal = 1 / sumR;

    resultCalcResistor.textContent = `Total Resistansi: ${rTotal.toFixed(2)} Ω`;
  });
});
