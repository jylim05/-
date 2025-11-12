let osc, fft;
let pianoImg;
let piano = 0;

function preload(){
  // 피아노 이미지 로드 (piano.png는 같은 폴더에)
  pianoImg = loadImage('piano.png');
}

function setup(){
  let cnv = createCanvas(800, 200); // 건반 넓이에 맞게 조정
  cnv.mousePressed(startSound);
  osc = new p5.Oscillator();
  osc.amp(0);
  fft = new p5.FFT();
}

function draw(){
  background(220);

  // 피아노 이미지 표시
  image(pianoImg, 0, 0, width, 150);

  // 마우스로 클릭한 구간에 따라 음정 결정
  if (mouseIsPressed === true) {
    // 도 ~ 도 (한 옥타브)
    if (mouseX >   0 && mouseX <  80)  { piano = 261.6256; } // 도 (C4)
    else if (mouseX >  80 && mouseX < 160) { piano = 293.6648; } // 레 (D4)
    else if (mouseX > 160 && mouseX < 240) { piano = 329.6276; } // 미 (E4)
    else if (mouseX > 240 && mouseX < 320) { piano = 349.2282; } // 파 (F4)
    else if (mouseX > 320 && mouseX < 400) { piano = 391.9954; } // 솔 (G4)
    else if (mouseX > 400 && mouseX < 480) { piano = 440.0000; } // 라 (A4)
    else if (mouseX > 480 && mouseX < 560) { piano = 493.8833; } // 시 (B4)
    else if (mouseX > 560 && mouseX < 640) { piano = 523.2511; } // 높은 도 (C5)
  }

  osc.freq(piano);

  // FFT 시각화 그대로 유지
  let spectrum = fft.analyze();
  noStroke();
  fill(255, 0, 255);
  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h );
  }

  stroke(255);
  if (!osc.started) {
    text('OKOK', 10, 20, width - 20);
  } else {
    text(round(piano)+' Hz', 10, 20);
  }
}

function startSound() {
  osc.start();
  osc.amp(0.5, 0.2);
}

function mouseReleased() {
  osc.amp(0, 0.2);
}
