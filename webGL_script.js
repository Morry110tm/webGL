var gl;　//webGLコンテキスト用のグローバル変数

function start(){
	var canvas = document.getElementById('canvas1');
	//GLコンテキストを初期化
	gl = initWebGL(canvas);

	gl.viewport(0, 0, canvas1.width, canvas1.height);

	//webGLを使用できる場合に限り処理を継続

	if(gl){
		//クリアカラーを黒色、不透明に設定する
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		//深度テストを有効化
		gl.enable(gl.DEPTH_TEST);
		//近くにある物体は遠くに有る物体を覆い隠す
		gl.depthFunc(gl.LEQUAL);
		//カラーバッファや深度バッファをクリアする
		gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT);
	}
}

function initWebGL(canvas){
		gl = null;
		try {
			gl = canvas.getContext("wengl") || canvas.getContext("experimental-webgl");
		} catch (e) {
			//
		}

		if(!gl){
			alert("webGLを初期化出来ません。このブラウザはサポートしていません");
			gl = null;
		}

		return gl;
}

function initShaders(){
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		alert("シェーダープログラムを初期化出来ません");
	}

	gl.useProgram(shaderProgram);

	vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);
}

function getShader(gl, id){
	var shaderScript, theSource, currentChild, shader;

	shaderScript = document.getElementById(id);

	if(!shaderScript){
		return null;
	}

	theSource = "";
	currentChild = shaderScript.firstChild;

	while (currentChild) {
		if (currentChild.nodeType == currentChild.TEXT_NODE) {
			theSource += currentChild.textContent;
		}
		currentChild = currentChild.nextSibling;
	}

	if (shaderScript.type == "x-shader/x-fragment") {
		shader - gl.createShader(gl.FRAGMENT_SHADER);
	}else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	}else {
		//未知のシェーダータイプの場合
		return null;
	}

	gl.shaderSource(shader, theSource);

	gl.compileShader(shader);

	if(!gl.getshaderParameter(shader, gl.COMPILE_STATUS)){
		alert("シェーダーのコンパイルでエラーが発生しました：" + gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

var horizonAspect = 480.0/640.0;

function initBuffers(){
	squareVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

	var vertices = [
		1.0, 1.0, 0.0,
		-1.0, 1.0, 0.0,
		1.0, -1.0, 0.0,
		-1.0, -1.0, 0.0
	];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}
