function initShaders(gl, vShader_s, fShader_s) {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vShader_s)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fShader_s)
   
    const program = createProgram(gl, vertexShader, fragmentShader)
    // 使用程序对象
    gl.useProgram(program)

    gl.program = program
}

function createShader(gl, type, shaderSource) {
    // 创建shader
    const shader = gl.createShader(type)
    // 填充source
    gl.shaderSource(shader, shaderSource)
    // 编译shader
    gl.compileShader(shader)

    return shader
}

function createProgram(gl, vShader, fShader) {
    // 创建程序对象
    const program = gl.createProgram()

    // 为程序对象分配着色器对象
    gl.attachShader(program, vShader)
    gl.attachShader(program, fShader)

    // 连接程序对象
    gl.linkProgram(program)
    return program
}